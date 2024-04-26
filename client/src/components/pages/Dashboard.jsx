import LoadingBall from "../global/LoadingBall";
import PropTypes from "prop-types";
import { useState } from "react";

const Dashboard = ({ list }) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleLoading = () => {
    setIsLoading(!false);
  };
  return (
    <div>
      {isLoading ? <LoadingBall /> : ""}
      <div className="flex gap-5 min-h-screen bg-gray-100 p-5">
        <div className="flex flex-col bg-purple-800 p-5 rounded-md m-1 justify-center items-center text-white h-[100px] w-[150px] cursor-pointer hover:bg-purple-600 transition-colors">
          <h3 className="text-3xl">7</h3>
          <p className="mt-2 text-sm">Total Matches</p>
        </div>

        <div className="flex flex-col bg-purple-800 p-5 rounded-md m-1 justify-center items-center text-white h-[100px] w-[150px] cursor-pointer hover:bg-purple-600 transition-colors">
          <h3 className="text-3xl">0</h3>
          <p className="mt-2 text-sm">Total Apps</p>
        </div>

        <div className="flex flex-col bg-purple-800 p-5 rounded-md m-1 justify-center items-center text-white h-[100px] w-[150px] cursor-pointer hover:bg-purple-600 transition-colors">
          <h3 className="text-3xl">13</h3>
          <p className="mt-2 text-sm">Total Live</p>
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  list: PropTypes.array,
};

export default Dashboard;
