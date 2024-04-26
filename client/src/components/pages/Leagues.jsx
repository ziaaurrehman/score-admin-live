import { CiSearch } from "react-icons/ci";
import SelectedLeagues from "../global/SelectedLeagues";

const Leagues = () => {
  const leagues = [
    "Premier League",
    "Bundesliga",
    "Serie A",
    "Ligue 1",
    "Major League Soccer",
    "Saudi Pro League",
  ];
  return (
    <div className="bg-gray-100 w-full min-h-screen p-3">
      <div className="mt-4 p-5 w-[90%] mx-auto bg-white shadow-md rounded-md flex flex-col">
        <h3 className="font-bold text-gray-600">Search Popular Leagues</h3>
        <div className="relative w-1/2">
          <input
            type="text"
            placeholder="Type here..."
            className="border-2 border-gray-300 w-full p-1 rounded-md"
          />
          <CiSearch className="absolute text-gray-500 text-2xl top-1 right-4" />
        </div>
      </div>

      <div className="mt-[3rem] w-[87%] mx-auto">
        <h2 className="text-lg font-bold text-gray-500 mb-2">
          Selected Leagues
        </h2>
        <div className="flex flex-col gap-2">
          <SelectedLeagues leagues={leagues} />
        </div>
      </div>
    </div>
  );
};

export default Leagues;
