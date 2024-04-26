import Location from "../global/Location";
import { useEffect, useState } from "react";
import { updateMatch, getMatch } from "../../Api.js";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import Calendar from "react-calendar";
import { format } from "date-fns";

const EditMatch = () => {
  const location = useLocation();
  const [showCal, setShowCal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isClicked, setIsClicked] = useState(false);

  const defaultPortraitWatermark = {
    top: 1.1,
    bottom: null,
    left: null,
    right: 1.1,
    height: 2.0,
    width: 10.0,
    image: "http://windfootball.com/logo/logo1.png",
  };
  const [data, setData] = useState({
    sport_type: "",
    league_type: "",
    match_title: "",
    match_time: "",
    fixture_id: "",
    hot_match: false,
    status: "active",
    team_one: {
      name: "",
      image: "",
    },
    team_two: {
      name: "",
      image: "",
    },
    streaming_source: {
      streaming_title: "Server SD",
      is_premium: false,
      resolution: "480p",
      platform: "both",
      portrait_watermark: JSON.stringify(defaultPortraitWatermark, null, 2),
      landscape_watermark: JSON.stringify(defaultPortraitWatermark, null, 2),
      status: "active",
      stream_type: "",
      stream_url: "",
    },
  });
  const { id } = useParams();
  useEffect(() => {
    getSingleMatch();
  }, []);
  const {
    sport_type,
    league_type,
    match_title,
    fixture_id,
    hot_match,
    status,
    team_one,
    team_two,
    streaming_source,
  } = data;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTeamChange = (team, e) => {
    const { name, value } = e.target;

    setData((prevState) => ({
      ...prevState,
      [team]: {
        ...prevState[team],
        [name]: value,
      },
    }));
  };

  const handleStreamingChange = (e) => {
    const { name, value } = e.target;

    setData((prevState) => ({
      ...prevState,
      streaming_source: {
        ...prevState.streaming_source,
        [name]: value,
      },
    }));
  };

  const navigation = useNavigate();

  // show calendar handler
  const handleShowCal = () => {
    setShowCal((prevState) => !prevState);
  };

  // set date handler
  const handleDateChange = (date) => {
    const currentTime = new Date();
    date.setHours(currentTime.getHours(), currentTime.getMinutes());
    const formattedDate = format(date, "yyyy:MM:dd hh:mm a");
    setSelectedDate(formattedDate);
    setData({
      ...data,
      match_time: formattedDate,
    });
    setShowCal((prevState) => !prevState);
  };
  // scroll to top button
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const getSingleMatch = async () => {
    const res = await getMatch(id);
    if (res?.data?.success) {
      const value = res?.data?.match;
      // Remove extra backslashes and parse JSON for portrait_watermark
      const portraitWatermark = JSON.parse(
        value.streaming_source.portrait_watermark.replace(/\\/g, "")
      );
      // Remove extra backslashes and parse JSON for landscape_watermark
      const landscapeWatermark = JSON.parse(
        value.streaming_source.landscape_watermark.replace(/\\/g, "")
      );
      value.streaming_source.portrait_watermark = JSON.stringify(
        portraitWatermark,
        null,
        2
      );
      value.streaming_source.landscape_watermark = JSON.stringify(
        landscapeWatermark,
        null,
        2
      );

      setData(value);
    }
  };

  // submits the form to the api
  const handleSubmit = async (e) => {
    setIsClicked(true);
    e.preventDefault();
    try {
      const res = await updateMatch(id, data);
      if (res?.data?.success) {
        navigation("/manage-live");
      }
      // console.log(res);
    } catch (error) {
      console.error("Error creating match:", error);
    }
  };
  return (
    <div className="relative w-full">
      <div className="h-max w-[95%]mx-auto bg-gray-100 rounded-md p-3">
        <h2 className="py-2">
          <Location location={location} />
        </h2>
        <form
          action="submit"
          id="match-info"
          className="w-full bg-white rounded-md p-2"
        >
          <h2 className="font-bold text-lg p-1">Match Information</h2>

          <div className="flex gap-5 w-full">
            <div className="p-2 w-1/2">
              <label htmlFor="sports-type" className="text-xs font-bold">
                Sports Type <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <select
                  className="border rounded-md py-1 focus:outline-blue focus:ring-1 focus:ring-indigo-500 w-full"
                  name="sport_type"
                  value={sport_type}
                  onChange={handleChange}
                >
                  <option value="">Select a Sport</option>
                  <option value="football">Football</option>
                  <option value="sports">Sports</option>
                </select>
              </div>
            </div>
            <div className="p-2 w-1/2">
              <label htmlFor="sports-type" className="text-xs font-bold">
                League Type <span className="text-red-500">*</span>
              </label>
              <div className="mt-2 text-xs">
                <select
                  className="border rounded-md py-1 focus:outline-blue focus:ring-1 focus:ring-indigo-500 w-full text-sm"
                  name="league_type"
                  value={league_type}
                  onChange={handleChange}
                >
                  <option value="">Select a League</option>
                  <option value="la-liga">La Liga</option>
                  <option value="bundesliga">Bundesliga</option>
                  <option value="ligue-1">Ligue 1</option>
                  <option value="serie-a">Serie A</option>
                  <option value="pro-league">Pro League</option>
                  <option value="premier-league">Premier League</option>
                  <option value="uefa-champions-league">
                    UEFA Champions League
                  </option>
                  <option value="major-league-soccer">
                    Major League Soccer
                  </option>
                  <option value="uefa-europa-league">UEFA Europa League</option>
                  <option value="fifa-club-world-cup">
                    FIFA Club World Cup
                  </option>
                  <option value="fa-cup">FA Cup</option>
                  <option value="copa-del-ray">Copa Del Ray</option>
                  <option value="uefa-super-cup">UEFA Super Cup</option>
                  <option value="euro-championship">EURO Championshiip</option>
                  <option value="fifa-world-cup">FIFA World Cup</option>
                  <option value="arab-club-champions-cup">
                    Arab Club Champions Cup
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex gap-5 w-full">
            <div className="p-2 w-[33.3%]">
              <label htmlFor="sports-type" className="text-xs font-bold">
                Match Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full block p-1 rounded-md border-2 border-gray-200"
                name="match_title"
                value={match_title}
                onChange={handleChange}
              />
            </div>

            <div className="p-2 w-[33.3%] relative">
              <label htmlFor="sports-type" className="text-xs font-bold">
                Match Time <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="cursor-pointer w-full block p-1 rounded-md border-2 border-gray-300"
                placeholder="YYYY-MM-DD HH:MM"
                name="match_time"
                value={selectedDate}
                onClick={handleShowCal}
              />
              {showCal && (
                <Calendar
                  className="absolute bg-purple-900 p-2 rounded-md text-white"
                  onChange={handleDateChange}
                  value={selectedDate}
                />
              )}
            </div>

            <div className="p-2 w-[33.3%]">
              <label htmlFor="sports-type" className="text-xs font-bold">
                Fixture ID
              </label>
              <input
                type="text"
                className="w-full block p-1 rounded-md border-2 border-gray-300"
                name="fixture_id"
                value={fixture_id}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex gap-5">
            <div className="p-2 w-1/2">
              <label htmlFor="sports-type" className="text-xs font-bold">
                Is Hot Match? <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <select
                  className="border-2 border-gray-300 rounded-md py-1 focus:outline-blue focus:ring-1 focus:ring-indigo-500 w-full"
                  name="hot_match"
                  value={hot_match}
                  onChange={handleChange}
                >
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
            </div>

            <div className="p-2 w-1/2">
              <label htmlFor="sports-type" className="text-xs font-bold">
                Status <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <select
                  className="border-2 border-gray-300 rounded-md py-1 focus:outline-blue focus:ring-1 focus:ring-indigo-500 w-full"
                  name="status"
                  value={status}
                  onChange={handleChange}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>
        </form>

        <form
          action="submit"
          className="mt-3 w-full bg-white rounded-md px-2 py-4 flex"
        >
          <div className="p-3 border-r-2 border-gray-200 w-1/2">
            <h2 className="font-bold text-lg mb-4">Team One</h2>
            <label htmlFor="sports-type" className="text-xs font-bold">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full block p-1 rounded-md border-2 border-gray-200"
              name="name"
              value={team_one.name}
              onChange={(e) => handleTeamChange("team_one", e)}
            />

            <label htmlFor="sports-type" className="text-xs font-bold">
              Image URL
            </label>
            <input
              type="text"
              className="w-full block p-1 rounded-md border-2 border-gray-200"
              name="image"
              value={team_one.image}
              onChange={(e) => handleTeamChange("team_one", e)}
            />
          </div>

          <div className="p-3 w-1/2">
            <h2 className="font-bold text-lg mb-4">Team Two</h2>
            <label className="text-xs font-bold">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full block p-1 rounded-md border-2 border-gray-200"
              name="name"
              value={team_two.name}
              onChange={(e) => handleTeamChange("team_two", e)}
            />

            <label className="text-xs font-bold">Image URL</label>
            <input
              type="text"
              className="w-full block p-1 rounded-md border-2 border-gray-200"
              name="image"
              value={team_two.image}
              onChange={(e) => handleTeamChange("team_two", e)}
            />
          </div>
        </form>

        <form
          action="submit"
          className="mt-3 w-full bg-white rounded-md px-2 py-4 flex flex-col"
        >
          <h2 className="text-lg font-bold p-1">Streaming Source</h2>
          <div className="flex flex-col p-2 border-2 border-gray-200 rounded-md">
            <p className="p-1 text-blue-700 text-sm font-bold">
              Streaming Source: 1
            </p>
            <div className="p-3 flex gap-5 w-full">
              <div className="w-1/2">
                <label htmlFor="sports-type" className="text-xs font-bold">
                  Streaming Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full block p-1 rounded-md border-2 border-gray-200"
                  name="streaming_title"
                  value={streaming_source.streaming_title}
                  onChange={handleStreamingChange}
                />
              </div>

              <div className="w-1/2">
                <label htmlFor="sports-type" className="text-xs font-bold">
                  Is Premium? <span className="text-red-500">*</span>
                </label>
                <div>
                  <select
                    className="border-2 border-gray-300 rounded-md py-1 focus:outline-blue focus:ring-1 focus:ring-indigo-500 w-full"
                    name="is_premium"
                    value={streaming_source.is_premium}
                    onChange={handleStreamingChange}
                  >
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="p-3 flex gap-5">
              <div className="w-1/2">
                <label htmlFor="sports-type" className="text-xs font-bold">
                  Resolution <span className="text-red-500">*</span>
                </label>
                <div>
                  <select
                    className="border-2 border-gray-300 rounded-md py-1 focus:outline-blue focus:ring-1 focus:ring-indigo-500 w-full"
                    name="resolution"
                    value={streaming_source.resolution}
                    onChange={handleStreamingChange}
                  >
                    <option value="">Select One</option>
                    <option value="1080p">1080p</option>
                    <option value="720p">720p</option>
                    <option value="480p">480p</option>
                    <option value="360p">360p</option>
                  </select>
                </div>
              </div>

              <div className="w-1/2">
                <label htmlFor="sports-type" className="text-xs font-bold">
                  Platform <span className="text-red-500">*</span>
                </label>
                <div>
                  <select
                    className="border-2 border-gray-300 rounded-md py-1 focus:outline-blue focus:ring-1 focus:ring-indigo-500 w-full"
                    name="platform"
                    onChange={handleStreamingChange}
                    value={streaming_source.platform}
                  >
                    <option value="">Both</option>
                    <option value="Android">Android</option>
                    <option value="iOS">iOS</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="p-3 flex gap-5">
              <div className="w-1/2">
                <label htmlFor="potrait" className="text-xs font-bold">
                  Portrait Watermark(json)
                </label>
                <textarea
                  placeholder="Enter json object..."
                  className="block border-2 border-gray-300 rounded-md p-2 w-full"
                  name="potrait_watermark"
                  rows={5}
                  value={streaming_source.portrait_watermark}
                  onChange={handleStreamingChange}
                ></textarea>
              </div>

              <div className="w-1/2">
                <label htmlFor="landscape" className="text-xs font-bold">
                  Landscape Watermark(json)
                </label>
                <textarea
                  placeholder="Enter json object..."
                  className="block border-2 border-gray-300 rounded-md p-2 w-full"
                  name="landscape_watermark"
                  rows={5}
                  value={streaming_source.landscape_watermark}
                  onChange={handleStreamingChange}
                ></textarea>
              </div>
            </div>

            <div className="p-3 flex gap-5">
              <div className="w-1/2">
                <label htmlFor="sports-type" className="text-xs font-bold">
                  Status <span className="text-red-500">*</span>
                </label>
                <div>
                  <select
                    className="border-2 border-gray-300 rounded-md py-1 focus:outline-blue focus:ring-1 focus:ring-indigo-500 w-full"
                    name="status"
                    onChange={handleStreamingChange}
                    value={streaming_source.status}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="w-1/2">
                <label htmlFor="sports-type" className="text-xs font-bold">
                  Stream Type <span className="text-red-500">*</span>
                </label>
                <div>
                  <select
                    className="border-2 border-gray-300 rounded-md py-1 focus:outline-blue focus:ring-1 focus:ring-indigo-500 w-full"
                    name="stream_type"
                    onChange={handleStreamingChange}
                    value={streaming_source.stream_type}
                  >
                    <option value="">Select One</option>
                    <option value="root stream">Root Stream</option>
                    <option value="restricted">Restricted</option>
                    <option value="m3u8">M3u8</option>
                    <option value="web">Web</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="p-3 flex gap-5">
              <div className="w-full">
                <label htmlFor="sports-type" className="text-xs font-bold">
                  Stream URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full block p-1 rounded-md border-2 border-gray-200"
                  name="stream_url"
                  value={streaming_source.stream_url}
                  onChange={handleStreamingChange}
                />
              </div>
            </div>
          </div>
        </form>
      </div>

      <button
        onClick={handleSubmit}
        isClicked={isClicked}
        className="absolute text-sm font-semibold right-12 bottom-5 bg-blue-600 py-2 px-4 text-white uppercase animate-bounce hover:bg-blue-800 transition active:scale-95 rounded-md shadow-lg"
      >
        Create Match
      </button>
      <FaRegArrowAltCircleUp
        className="absolute h-6 w-6 bottom-3 right-2 text-blue-600 hover:text-blue-800 transition cursor-pointer"
        onClick={scrollToTop}
      />
    </div>
  );
};

export default EditMatch;
