import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { MdSpaceDashboard, MdLiveTv, MdContactPage } from "react-icons/md";
import { FaCalendarWeek, FaAppStoreIos } from "react-icons/fa";
import { BsCameraReelsFill } from "react-icons/bs";
import { FaNewspaper } from "react-icons/fa6";
import {
  IoNotifications,
  IoOptionsSharp,
  IoSettings,
  IoTrophySharp,
} from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { MdHorizontalRule } from "react-icons/md";
import "../styles/navlist.css";

const NavList = () => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [openSubSection, setOpenSubSection] = useState(null);

  const itemList = [
    {
      name: "Dashboard",
      icon: <MdSpaceDashboard />,
      path: "/dashboard",
    },
    {
      name: "Manage Live",
      icon: <MdLiveTv />,
      path: "/manage-live",
    },
    {
      name: "Fixtures",
      icon: <FaCalendarWeek />,
      path: "/fixtures",
    },
    {
      name: "Manage Apps",
      icon: <FaAppStoreIos />,
      path: "/manage-apps",
    },
    {
      name: "Selected Leagues",
      icon: <IoTrophySharp />,
      path: "/selected-leagues",
    },
    {
      name: "Highlights",
      icon: <BsCameraReelsFill />,
      path: "/highlights",
    },
    {
      name: "News",
      icon: <FaNewspaper />,
      path: "/news",
    },
    {
      name: "Contact Us",
      icon: <MdContactPage />,
      path: "/contact-us",
    },
    {
      name: "Notifications",
      icon: <IoNotifications />,
      path: "/notifications",
    },
    {
      name: "Types",
      icon: <IoOptionsSharp />,
      path: "/types",
      subSection: [
        {
          name: "Ads",
          icon: <MdHorizontalRule />,
          path: "/types/ads",
        },
        {
          name: "Sports",
          icon: <MdHorizontalRule />,
          path: "/types/sports",
        },
        {
          name: "Leagues",
          icon: <MdHorizontalRule />,
          path: "/types/leagues",
        },
      ],
    },
    {
      name: "Administration",
      icon: <IoSettings />,
      path: "/administration",
    },
  ];

  const handleItemClick = (index) => {
    if (openSubSection === index) {
      setOpenSubSection(null);
    } else {
      setOpenSubSection(index);
    }
  };

  return (
    <div className="m-2 p-2 flex flex-col gap-2">
      {itemList.map((item, index) => (
        <div key={index}>
          <NavLink
            to={item.path}
            className={`flex justify-between items-center gap-3 p-1 h-10 text-gray-600 text-start transition-all hover:bg-gray-200 rounded-md ${
              location.pathname === item.path ? "bg-gray-200" : ""
            }`}
            onMouseEnter={() => setHoveredItem(index)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className="flex items-center gap-2">
              <div
                className={`text-2xl ${
                  hoveredItem === index || location.pathname === item.path
                    ? "text-blue-600"
                    : ""
                }`}
              >
                {item.icon}
              </div>
              <p
                className={`text-xs font-semibold ${
                  location.pathname === item.path
                    ? "text-blue-600"
                    : "text-gray-800"
                }`}
              >
                {item.name}
              </p>
            </div>
            {item.subSection && (
              <div onClick={() => handleItemClick(index)}>
                <IoIosArrowDown className="hover:text-black transition-colors" />
              </div>
            )}
          </NavLink>
          {openSubSection === index && (
            <div
              className={`transition-all ml-2 p-2 ${
                openSubSection ? "h-max" : "h-0"
              }`}
            >
              {item.subSection.map((subItem, subIndex) => (
                <NavLink
                  to={subItem.path}
                  key={subIndex}
                  className={`flex items-center gap-2 p-1 h-10 text-gray-600 text-start transition-all hover:bg-gray-200 rounded-md ${
                    location.pathname === subItem.path ? "bg-gray-200" : ""
                  }`}
                >
                  <div className={`text-xl`}>{subItem.icon}</div>
                  <p
                    className={`text-xs font-semibold ${
                      location.pathname === subItem.path
                        ? "text-blue-600"
                        : "text-gray-800"
                    }`}
                  >
                    {subItem.name}
                  </p>
                </NavLink>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default NavList;
