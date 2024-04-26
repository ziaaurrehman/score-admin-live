import { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import Calendar from "react-calendar";

const DateSelector = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };
  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const generateDates = (selectedDate) => {
    const dates = [];
    const currentDate = new Date(selectedDate);

    for (let i = -3; i <= 3; i++) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + i);
      dates.push(date);
    }
    return dates;
  };
  return (
    <div className="flex gap-3 justify-center items-center">
      {generateDates(selectedDate).map((date, index) => (
        <div
          key={index}
          className={`flex flex-col font-semibold text-sm p-1 cursor-pointer rounded-full items-center  justify-center w-[6.5rem] h-[4rem] hover:bg-gray-400 transition-colors ${
            date.toDateString() === selectedDate.toDateString()
              ? "bg-blue-600 text-white font-bold"
              : "bg-gray-300 text-gray-600"
          }`}
          onClick={() => handleDateClick(date)}
        >
          {index === 3 ? (
            <p className="font-bold text-white block">Today</p>
          ) : (
            ""
          )}
          <p>
            {date.getDate()}{" "}
            {date.toLocaleString("default", { month: "short" })}
            {", "}
            {date.toLocaleString("default", { year: "2-digit" })}
          </p>{" "}
        </div>
      ))}
      <div className="relative">
        <FaCalendarAlt
          className="w-[6.5rem] h-[4rem] text-md p-4 rounded-full bg-gray-600 text-white cursor-pointer hover:bg-gray-500 transition-colors"
          onClick={toggleCalendar}
        />
        {showCalendar && (
          <div className="absolute bg-gray-800 rounded-xl text-white p-3 top-20 right-10 w-max h-max">
            <Calendar value={selectedDate} onChange={toggleCalendar} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DateSelector;
