import { useLocation } from "react-router-dom";
import Location from "../global/Location";
import { useState } from "react";

const Administration = () => {
  const location = useLocation();
  const [isActive, setIsActive] = useState(1);
  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <Location location={location} />
      <div className="flex flex-col">
        <div className="flex gap-2 mt-5">
          <div className="flex flex-col w-[20%] gap-2">
            <div
              className={`p-2 font-semibold text-sm rounded-md shadow-sm transition-colors cursor-pointer ${
                isActive === 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-800 hover:text-white hover:bg-blue-400"
              }`}
              onClick={() => setIsActive(1)}
            >
              <p>General Settings</p>
            </div>

            <div
              className={`p-2 font-semibold text-sm  rounded-md shadow-sm transition-color cursor-pointer ${
                isActive === 2
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-800 hover:text-white hover:bg-blue-400"
              }`}
              onClick={() => setIsActive(2)}
            >
              <p>App & Social Links</p>
            </div>

            <div
              className={`p-2 font-semibold text-sm  rounded-md shadow-sm transition-color cursor-pointer ${
                isActive === 3
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-800 hover:text-white hover:bg-blue-400"
              }`}
              onClick={() => setIsActive(3)}
            >
              <p>Logo & Icon</p>
            </div>

            <div
              className={`p-2 font-semibold text-sm  rounded-md shadow-sm transition-colors cursor-pointer ${
                isActive === 4
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-800 hover:text-white hover:bg-blue-400"
              }`}
              onClick={() => setIsActive(4)}
            >
              <p>Privacy Policy</p>
            </div>

            <div
              className={`p-2 font-semibold text-sm  rounded-md shadow-sm  transition-colors  cursor-pointer ${
                isActive === 5
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-800 hover:text-white hover:bg-blue-400"
              }`}
              onClick={() => setIsActive(5)}
            >
              <p>Terms & Conditions</p>
            </div>
          </div>
          <div className="border-l-2 border-blue-600 w-[80%] bg-white rounded-r-md shadow-md">
            {isActive === 1 ? (
              <div className="w-full flex flex-col gap-2 m-3">
                <h2 className="font-semibold">General Settings</h2>

                <div className="mt-4 flex mx-2 gap-2">
                  <div className="text-sm flex flex-col w-1/2 gap-1">
                    <label className="font-semibold text-xs">
                      Company Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-[90%] appearance-none bg-white border border-gray-300 text-gray-700 py-1 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500 text-xs"
                      placeholder="Type something here..."
                    />
                  </div>

                  <div className="text-sm flex flex-col w-1/2 gap-1">
                    <label className="font-semibold text-xs">
                      Site Title <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-[90%] appearance-none bg-white border border-gray-300 text-gray-700 py-1 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500 text-xs"
                      placeholder="Type something here..."
                    />
                  </div>
                </div>

                <div className="mt-2 flex mx-2 gap-2">
                  <div className="text-sm flex flex-col w-1/2 gap-1">
                    <label className="font-semibold text-xs">
                      Time Zone <span className="text-red-600">*</span>
                    </label>
                    <div className="relative w-[90%] text-xs cursor-pointer">
                      <select className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-1 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500">
                        <option value="volvo">Khatmandu</option>
                        <option value="saab">Astana</option>
                        <option value="mercedes">Berlin</option>
                        <option value="audi">London</option>
                      </select>
                      <div className="my-1 absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none border-l border-gray-300">
                        <svg
                          className="h-4 w-4 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="text-sm flex flex-col w-1/2 gap-1">
                    <label className="font-semibold text-xs">
                      Language <span className="text-red-600">*</span>
                    </label>
                    <div className="relative w-[90%] text-xs cursor-pointer">
                      <select className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-1 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500">
                        <option value="volvo">English</option>
                        <option value="saab">Arabic</option>
                        <option value="mercedes">German</option>
                        <option value="audi">Urdu</option>
                      </select>
                      <div className="my-1 absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none border-l border-gray-300">
                        <svg
                          className="h-4 w-4 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="mt-5 flex justify-end">
          <button className="p-2 bg-blue-600 text-sm text-white font-semibold rounded-md shadow-md hover:bg-blue-900 transition-colors">
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Administration;
