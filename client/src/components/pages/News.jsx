import Location from "../global/Location";
import { Link, useLocation } from "react-router-dom";
import { IoGrid } from "react-icons/io5";
import { FaList } from "react-icons/fa";
import NewsArticleThumbnail from "../global/NewsArticleThumbnail";
import { useEffect, useState } from "react";
import { getAllNews } from "../../Api";
import LoadingBall from "../global/LoadingBall";

const News = () => {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [perPage, setPerPage] = useState("");

  const [news, setNews] = useState([]);
  const [isGrid, setIsGrid] = useState(false);
  const disableGrid = () => {
    setIsGrid(false);
  };
  const enableGrid = () => {
    setIsGrid(true);
  };
  const location = useLocation();
  useEffect(() => {
    allNews();
  }, [currentPage, searchQuery, perPage]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const allNews = async () => {
    try {
      const res = await getAllNews(currentPage, searchQuery, perPage);
      if (res?.data?.success) {
        setLoading(false);
        setNews(res?.data?.paginatedNews);
        setCurrentPage(res?.data?.totalPages);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };
  return (
    <div>
      {loading ? (
        <LoadingBall />
      ) : (
        <div className="bg-gray-100 flex flex-col gap-2 w-full min-h-screen p-3">
          <Location location={location} />
          <div className="flex justify-end">
            <Link to="/news/create-news">
              <button className="p-2 font-semibold text-sm uppercase text-white rounded-md bg-blue-600 hover:bg-blue-900 transition-colors w-max h-max">
                <span className="text-md">+</span> Add New News
              </button>
            </Link>
          </div>

          <div
            id="news-list"
            className="mt-2 flex flex-col gap-2 bg-white rounded-md shadow-md p-3"
          >
            <h2 className="mt-4 text-lg font-semibold">News List</h2>
            <div className="flex justify-between">
              <input
                type="text"
                name="search"
                onChange={(e) => handleSearchChange(e)}
                className="p-1 text-sm bg-gray-100 rounded-md border-2 border-gray-300 w-[200px] focus:w-[300px] transition-width"
                placeholder="Search by name or ID"
              />

              <div className="flex gap-2">
                <div className="p-1 h-max w-max bg-gray-100 rounded-md">
                  <IoGrid className="cursor-pointer" onClick={enableGrid} />
                </div>
                <div className="p-1 h-max w-max bg-gray-100 rounded-md">
                  <FaList className="cursor-pointer" onClick={disableGrid} />
                </div>
                <div className="flex gap-3">
                  <p className="text-sm">Page Size: </p>
                  <input
                    type="number"
                    name="number"
                    className="bg-gray-100 rounded-md p-1 w-[40px] border-2 border-black h-max text-sm"
                    min="1"
                    onChange={(e) => setPerPage(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div
              className={`mt-2 flex ${isGrid ? "flex-row" : "flex-col"} gap-2`}
            >
              {news?.map((obj, _) => (
                <div key={obj._id}>
                  <NewsArticleThumbnail data={obj} isGrid={isGrid} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default News;
