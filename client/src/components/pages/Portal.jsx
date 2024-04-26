import Sidebar from "../Navbar/Sidebar.jsx";
import { GiHamburgerMenu } from "react-icons/gi";
import User from "../Navbar/User.jsx";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import {
  Dashboard,
  Fixtures,
  ManageApp,
  ManageLive,
  Leagues,
  News,
  Administration,
  Types,
  CreateMatch,
  EditMatch,
  ContactUs,
  Highlights,
  Notification,
} from "./index.js";
import AddNews from "../News/AddNews";
import EditNews from "../News/EditNews.jsx";

const Portal = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  return (
    <div className="flex w-full">
      <div>
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      </div>

      <div className="h-max w-full shadow-sm">
        <div className="bg-gray-300 p-2">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 justify-center items-center">
              {isSidebarOpen ? (
                ""
              ) : (
                <GiHamburgerMenu
                  className="text-3xl border-2 border-black rounded-full p-1 hover:text-gray-600 hover:border-gray-600 transition-colors cursor-pointer"
                  onClick={toggleSidebar}
                />
              )}
              <div className="font-bold text-md">
                <p className="p-2 m-2 border-2 border-black rounded-md">
                  Welcome Back: <span className="text-blue-600">Admin</span>
                </p>
              </div>
            </div>
            <User
              name="Moiz Khan"
              imgSrc="https://picsum.photos/200/200?grayscale"
            />
          </div>
        </div>
        <div>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/manage-live" element={<ManageLive />} />
            <Route path="/fixtures" element={<Fixtures />} />
            <Route path="/manage-apps" element={<ManageApp />} />
            <Route path="/selected-leagues" element={<Leagues />} />
            <Route path="/news" element={<News />} />
            <Route path="/administration" element={<Administration />} />
            <Route path="/types" element={<Types />} />
            <Route path="/manage-live/edit/:id" element={<EditMatch />} />
            <Route path="/manage-live/create-match" element={<CreateMatch />} />
            <Route path="/news/create-news" element={<AddNews />} />
            <Route path="/news/edit-news/:id" element={<EditNews />} />
            <Route path="/highlights" element={<Highlights />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/notifications" element={<Notification />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Portal;
