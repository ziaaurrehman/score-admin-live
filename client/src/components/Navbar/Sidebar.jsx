import NavList from "./NavList";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <div
      className={` shadow-md h-[100%] transition-width duration-200 ${
        isOpen ? "w-[250px]" : "w-[0]"
      }`}
    >
      <div
        className={`flex justify-between p-3 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } transition-opacity`}
      >
        <div className="font-bold rounded-full w-[40px] h-[40px] text-white text-xl bg-black flex justify-center items-center m-1 cursor-pointer shadow-sm">
          ZS
        </div>
        <FaRegArrowAltCircleLeft
          className="text-4xl p-1 m-2 hover:text-gray-500 transition-colors cursor-pointer"
          onClick={onClose}
        />
      </div>
      <div
        className={`mt-3 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } transition-opacity`}
      >
        <NavList />
      </div>
    </div>
  );
};

export default Sidebar;
