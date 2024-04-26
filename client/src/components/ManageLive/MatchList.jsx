import { BsSortUpAlt } from "react-icons/bs";
import { IoCopyOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdDragIndicator } from "react-icons/md";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Reorder } from "framer-motion";
import { fetchAllMatches, deleteMatch, duplicateMatch } from "../../Api";
import { toast } from "react-toastify";
import LoadingBall from "../global/LoadingBall.jsx";

const MatchList = ({ isGrid }) => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAllMatches();
        const { paginatedMatches } = response.data;
        const extractedMatches = paginatedMatches.map((match) => ({
          id: match._id,
          status: match.status,
          league_type: match.league_type,
          hot_match: match.hot_match,
          match_title: match.match_title,
          match_time: match.match_time,
          sports_type: match.sports_type,
          team_one: match.team_one.name,
          team_two: match.team_two.name,
          stream_title: match.streaming_source.streaming_title,
        }));
        setMatches(extractedMatches);
      } catch (error) {
        toast.error("Error fetching matches:", error);
        console.log(error)
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleMoveUp = (index) => {
    if (index > 0) {
      const newItems = [...matches];
      [newItems[index - 1], newItems[index]] = [
        newItems[index],
        newItems[index - 1],
      ];
      setMatches(newItems);
    }
  };

  const handleDelete = async (id) => {
    const res = await deleteMatch(id);
    setMatches(matches.filter((match) => match.id !== id));
    console.log(res);
  };
  const handleDuplicate = async (id) => {
    const res = await duplicateMatch(id);
    console.log(res);
  };

  return (
    <main>
      {loading ? (
        <LoadingBall />
      ) : (
        <Reorder.Group
          values={matches}
          onReorder={setMatches}
          className={`${isGrid ? "flex flex-row w-1/4" : ""}`}
        >
          {matches.map((match, index) => (
            <Reorder.Item value={match} key={match.id}>
              {!isGrid ? (
                <div className="w-[100%] flex border-2 bg-white rounded-md">
                  <div className="flex justify-between items-center p-1 w-[49%]">
                    <div id="team-1" className="flex gap-3 items-center">
                      <div className="bg-white rounded-md border-2 border-gray-100 w-max p-2">
                        <img src="" alt="" className="h-[50px] w-[40px]" />
                      </div>
                      <h4 className="text-sm font-semibold">
                        {match.team_one}
                      </h4>
                    </div>

                    <div id="match-info" className="flex flex-col text-center">
                      <h3 className="text-sm font-semibold">
                        {match.league_type}
                      </h3>
                      <p className="text-gray-500 text-xs">
                        {match.match_time}
                      </p>
                      <p className="text-gray-500 text-sm">VS</p>
                    </div>

                    <div id="team-2" className="flex gap-3 items-center">
                      <h4 className="text-sm font-semibold">
                        {match.team_two}
                      </h4>
                      <div className="bg-white rounded-md border-2 border-gray-100 w-max p-2">
                        <img src="" alt="" className="h-[50px] w-[40px]" />
                      </div>
                    </div>
                  </div>

                  <div className="border-l-2 border-gray-100 w-[48%] flex justify-between items-center pl-2 text-sm">
                    <p className="w-[35%] overflow-hidden">
                      {match.stream_title}
                    </p>
                    <div
                      className={`w-max h-max p-1 rounded-md text-center shadow-md ${
                        match.status === "active"
                          ? "bg-green-400"
                          : "bg-red-400"
                      }`}
                    >
                      <p className=" text-white text-xs font-semibold">
                        {match.status === "active" ? "Active" : "Inactive"}
                      </p>
                    </div>
                    <div className="p-1 flex gap-4 text-xl w-max">
                      <BsSortUpAlt
                        className="cursor-pointer"
                        onClick={() => handleMoveUp(index)}
                      />
                      <IoCopyOutline
                        className="text-blue-400 cursor-pointer"
                        onClick={() => handleDuplicate(match.id)}
                      />
                      <Link to={`/manage-live/edit/${match.id}`}>
                        <FiEdit className="text-blue-400 cursor-pointer" />
                      </Link>
                      <RiDeleteBin5Line
                        className="text-red-400 cursor-pointer"
                        onClick={() => handleDelete(match.id)}
                      />
                      <MdDragIndicator className="cursor-grab" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-[250px] flex flex-col items-center border-2 bg-white rounded-md">
                  <div className="flex gap-2 items-center p-2">
                    <div id="team-1" className="flex flex-col items-center">
                      <h4 className="text-xs font-semibold">
                        {match.team_one}
                      </h4>
                      <div className="bg-white rounded-md border-2 border-gray-100 w-max p-2">
                        <img src="" alt="" className="h-[80px] w-[70px]" />
                      </div>
                    </div>
                    <p className="text-xs text-center">VS</p>
                    <div id="team-2" className="flex flex-col items-center">
                      <h4 className="text-xs font-semibold">
                        {match.team_two}
                      </h4>
                      <div className="bg-white rounded-md border-2 border-gray-100 w-max p-2">
                        <img src="" alt="" className="h-[80px] w-[70px]" />
                      </div>
                    </div>
                  </div>

                  <div id="match-info" className="flex flex-col text-center">
                    <h3 className="text-sm font-semibold uppercase">
                      {match.league_type}
                    </h3>
                    <p className="text-gray-500 text-xs">{match.match_time}</p>
                    <p className="text-xs">Stream 1</p>
                  </div>

                  <div className="p-2 border-l-2 border-gray-100 w-full flex justify-between items-center pl-2 text-xs">
                    <div
                      className={`w-max h-max p-1 rounded-md text-center shadow-md ${
                        match.status === "active"
                          ? "bg-green-400"
                          : "bg-red-400"
                      }`}
                    >
                      <p className=" text-white text-xs font-semibold">
                        {match.status === "active" ? "Active" : "Inactive"}
                      </p>
                    </div>
                    <div className="ml-3 p-1 flex gap-2 text-xl">
                      <BsSortUpAlt
                        className="cursor-pointer"
                        onClick={() => handleMoveUp(index)}
                      />
                      <IoCopyOutline
                        className="text-blue-400 cursor-pointer"
                        onClick={() => handleDuplicate(match.id)}
                      />
                      <Link to={`/manage-live/edit?id=${match.id}`}>
                        <FiEdit className="text-blue-400 cursor-pointer" />
                      </Link>
                      <RiDeleteBin5Line
                        className="text-red-400 cursor-pointer"
                        onClick={() => handleDelete(match.id)}
                      />
                      <MdDragIndicator className="cursor-grab" />
                    </div>
                  </div>
                </div>
              )}
            </Reorder.Item>
          ))}
        </Reorder.Group>
      )}
    </main>
  );
};

export default MatchList;
