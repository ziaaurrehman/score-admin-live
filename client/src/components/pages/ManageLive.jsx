import MatchList from "../ManageLive/MatchList";
import { Link, useLocation } from "react-router-dom";
import Location from "../global/Location";
import { IoGrid } from "react-icons/io5";
import { FaList } from "react-icons/fa";
import { useState } from "react";

const ManageLive = () => {
  const location = useLocation();
  const [isGrid, setIsGrid] = useState(false);
  const handleGrid = (gridValue) => {
    setIsGrid(gridValue);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-3">
      <div className="flex justify-between p-2">
        <Location location={location} />
        <Link to="/manage-live/create-match">
          <button className="py-2 px-4 text-sm uppercase bg-blue-500 text-white rounded-md hover:bg-blue-700 transition active:scale-95">
            + Create a Match
          </button>
        </Link>
      </div>

      <div className="p-2 flex justify-between">
        <input
          type="text"
          name="search"
          className="p-1 text-sm bg-white rounded-md border-2 border-gray-400 w-[200px] focus:w-[300px] transition-transform"
          placeholder="Search by name or ID"
        />

        <div className="flex gap-2 items-center p-2">
          <div className="p-1 h-max w-max bg-gray-100 rounded-md">
            <IoGrid
              className="cursor-pointer"
              onClick={() => handleGrid(true)}
            />
          </div>
          <div className="p-1 h-max w-max bg-gray-100 rounded-md">
            <FaList
              className="cursor-pointer"
              onClick={() => handleGrid(false)}
            />
          </div>
          <div className="flex gap-3">
            <p className="text-sm">Page Size: </p>
            <select className="bg-white rounded-md border-2 border-black h-max text-xs text-center pl-2">
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="200">200</option>
            </select>
          </div>
        </div>
      </div>
      <h3 className="text-xl m-3">ALL MATCHES</h3>
      <MatchList isGrid={isGrid} />
    </div>
  );
};

export default ManageLive;