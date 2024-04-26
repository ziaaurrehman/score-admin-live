import { FaTrash } from "react-icons/fa";
import "../styles/toggleBtn.css";
import { useState } from "react";

const SettingForms = ({ form }) => {
  const [dragging, setDragging] = useState(false);

  // Handle Drag enter
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    const files = Array.from(e.dataTransfer.files);
    console.log(files);
    alert(files[0].name);
  };

  return form === "AppInformation" ? (
    <div className="w-full">
      <form className="flex flex-col gap-3">
        <div className="flex w-full">
          <div className="w-1/2 m-2">
            <label className="text-sm font-bold">
              App Name <span className="text-red-600">*</span>
            </label>
            <input
              className="w-full p-1 rounded-md block border-2 border-gray-500"
              type="text"
              placeholder="Zeem Sports"
            />
          </div>
          <div className="w-1/2 m-2">
            <label className="text-sm font-bold">
              App Unique ID <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              className="w-full p-1 rounded-md block border-2 border-gray-500"
              placeholder="15371eF127AH6wG1618631sM66"
            />
          </div>
        </div>

        <div className="flex justify-around">
          <div className="w-1/2 m-2">
            <label className="text-sm font-bold">
              Sports API Base Url <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              className="w-full p-1 rounded-md block border-2 border-gray-500"
              placeholder="https://zeemsports.live/api/football/v3"
            />
          </div>
          <div className="w-1/2 m-2">
            <label className="text-sm font-bold">
              Sport API Key <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              className="w-full p-1 rounded-md block border-2 border-gray-500"
              placeholder="9a169af32aa04a79b49ad2a7776b26e2"
            />
          </div>
        </div>

        <div className="p-1">
          <h3 className="mb-2 text-sm font-bold">App Logo</h3>
          <div className="bg-gray-400 rounded-md p-3 flex gap-3 items-center">
            <img
              src="https://placehold.jp/300x300.png"
              alt="app-icon"
              className="w-[150px] h-[150px] rounded-md"
            />
            <FaTrash className="text-red-600 text-2xl cursor-pointer hover:text-red-900" />
          </div>
        </div>

        <div className="p-2">
          <label className="font-bold text-sm">Status</label>
          <input type="checkbox" id="switch" />
          <label htmlFor="switch" id="toggle-btn">
            Toggle
          </label>
        </div>
      </form>
    </div>
  ) : form === "AndroidSettings" ? (
    <div className="w-full rounded-md flex flex-col gap-2 bg-gray-300 p-2">
      <div className="w-full bg-white rounded-md p-2 flex flex-col gap-2">
        <h2 className="text-sm font-semibold">GENERAL SETTINGS</h2>
        <div className="w-full flex gap-2">
          <div className="w-1/4">
            <label className="text-xs font-bold">Android Privacy Policy</label>
            <input
              type="text"
              className="border-2 block w-full rounded-md border-gray-200 p-1 text-xs"
              placeholder="N/A"
            />
          </div>

          <div className="w-1/4">
            <label className="text-xs font-bold">
              Android Terms Conditions
            </label>
            <input
              type="text"
              className="border-2 block w-full rounded-md border-gray-200 p-1 text-xs"
              placeholder="N/A"
            />
          </div>

          <div className="w-1/4">
            <label className="text-xs font-bold">Android App Share Link</label>
            <input
              type="text"
              className="border-2 block w-full rounded-md border-gray-200 p-1 text-xs"
              placeholder="N/A"
            />
          </div>

          <div className="w-1/4">
            <label className="text-xs font-bold">App Default Page</label>
            <input
              type="text"
              className="border-2 block w-full rounded-md border-gray-200 p-1 text-xs"
              placeholder="Home"
            />
          </div>
        </div>
      </div>

      <div className="w-full bg-white rounded-md p-2 flex flex-col gap-2">
        <h2 className="text-sm font-semibold">REQUIRED APP</h2>
        <div className="w-full flex gap-2">
          <div className="w-1/4">
            <label className="text-xs font-bold">Required Enable App</label>
            <input
              type="text"
              className="border-2 block w-full rounded-md border-gray-200 p-1 text-xs"
              placeholder="No"
            />
          </div>

          <div className="w-1/4">
            <label className="text-xs font-bold">Application ID</label>
            <input
              type="text"
              className="border-2 block w-full rounded-md border-gray-200 p-1 text-xs"
              placeholder="N/A"
            />
          </div>

          <div className="w-1/4">
            <label className="text-xs font-bold">App URL</label>
            <input
              type="text"
              className="border-2 block w-full rounded-md border-gray-200 p-1 text-xs"
              placeholder="N/A"
            />
          </div>

          <div className="w-1/4">
            <label className="text-xs font-bold">App Name</label>
            <input
              type="text"
              className="border-2 block w-full rounded-md border-gray-200 p-1 text-xs"
              placeholder="N/A"
            />
          </div>
        </div>
        <div className="mt-3 w-full flex flex-col gap-1">
          <label className="text-xs font-bold">DESCRIPTION</label>
          <textarea className="rounded-md w-full border-2 border-gray-300" />
        </div>
      </div>

      <div
        id="drag-and-drop"
        className="w-full bg-white rounded-md p-2 flex flex-col gap-2"
      >
        <h2 className="text-sm font-semibold">LOGO</h2>
        <div
          className={`w-full flex justify-center transition-all items-center border-2 border-dashed border-gray-400 rounded-md ${
            dragging ? "bg-blue-400" : "bg-blue-200"
          }`}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col justify-center items-center gap-2 p-2">
            <h4 className="text-sm font-semibold text-gray-600">
              Drag & Drop Image here
            </h4>
            <p className="text-gray-400 text-center">OR</p>
            <input
              type="file"
              name="upload"
              id="upload-img"
              className="text-sm text-white bg-blue-600 hover:bg-blue-800
              rounded-md p-1 w-3/4"
            />
            <p className="text-xs text-orange-500 text-center">
              Maximum Size: 1MB
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : form === "SocialLinks" ? (
    <div>SocialLinks</div>
  ) : form === "iOSSettings" ? (
    <div>iOS Settings</div>
  ) : form === "NotificationSettings" ? (
    <div>Notification Settings</div>
  ) : (
    <div>Other Settings</div>
  );
};

export default SettingForms;
