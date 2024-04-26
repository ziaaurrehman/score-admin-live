import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const Location = ({ location }) => {
  const getPathname = (pathname) => {
    const parts = pathname.split("/").filter((part) => part);
    const words = parts
      .map((part) => {
        const words = part
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1));
        return words.join(" ");
      })
      .join(" > ");
    return words;
  };
  const path = getPathname(location.pathname);
  return (
    <div className="p-2 flex text-sm font-semibold items-center gap-1">
      <Link to="/">
        <FaHome className="h-5 w-5 text-blue-600 cursor-pointer transition hover:text-gray-600" />
      </Link>
      <p className="font-semibold">&gt;</p>
      <p>{path}</p>
    </div>
  );
};

export default Location;
