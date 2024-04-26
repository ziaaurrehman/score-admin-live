import { useState, useEffect } from "react";

const LeagueFixtures = ({ leagueName }) => {
  const [fixture, setFixtures] = useState([]);

  const fetchFixtures = async () => {
    const apiKey = "80cd06aa5ee24b269ea9e9f194c58bd2";
    const response = await fetch(
      `https://api.football-data.org/v4/competitions/PL/matches`,
      {
        headers: {
          "X-Auth-Token": apiKey,
          "Accept-Encoding": "",
        },
      }
    );
    const data = await response.json();
    setFixtures(data.matches);
  };

  //   useEffect(() => {
  //     fetchFixtures();
  //     console.log(fixtures);
  //   }, []);
  const fixtures = [
    {
      id: 1,
      status: "Finished",
      homeTeam: {
        name: "Manchester United",
        crestUrl: "https://placehold.jp/150x150.png", // Replace with actual URL
      },
      awayTeam: {
        name: "Chelsea",
        crestUrl: "https://placehold.jp/150x150.png", // Replace with actual URL
      },
    },
    {
      id: 2,
      status: "Finished",
      homeTeam: {
        name: "Liverpool",
        crestUrl: "https://placehold.jp/150x150.png", // Replace with actual URL
      },
      awayTeam: {
        name: "Arsenal",
        crestUrl: "https://placehold.jp/150x150.png", // Replace with actual URL
      },
    },
    {
      id: 3,
      status: "Upcoming",
      homeTeam: {
        name: "Tottenham Hotspur",
        crestUrl: "https://placehold.jp/150x150.png", // Replace with actual URL
      },
      awayTeam: {
        name: "Newcastle United",
        crestUrl: "https://placehold.jp/150x150.png", // Replace with actual URL
      },
    },
    {
      id: 4,
      status: "Upcoming",
      homeTeam: {
        name: "Manchester City",
        crestUrl: "https://placehold.jp/150x150.png", // Replace with actual URL
      },
      awayTeam: {
        name: "Burnley",
        crestUrl: "https://placehold.jp/150x150.png", // Replace with actual URL
      },
    },
    {
      id: 5,
      status: "Postponed",
      homeTeam: {
        name: "Aston Villa",
        crestUrl: "https://placehold.jp/150x150.png", // Replace with actual URL
      },
      awayTeam: {
        name: "Everton",
        crestUrl: "https://placehold.jp/150x150.png", // Replace with actual URL
      },
    },
  ];

  return (
    <div className="flex flex-col gap-10 w-full">
      <div className="flex gap-2 items-center">
        <img
          src="https://placehold.jp/300x300.png"
          alt="league-emblem"
          width="30"
          height="30"
        />
        <h2 className="font-bold">{leagueName}</h2>
      </div>
      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>Team</th>
            <th>vs</th>
            <th>Team</th>
            <th>ID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {fixtures.map((fixture) => (
            <tr className="text-center" key={fixture.id}>
              <td>{fixture.status}</td>
              <td className="flex gap-2 justify-center">
                <img
                  src={fixture.homeTeam.crestUrl}
                  alt={fixture.homeTeam.name}
                  width="20"
                  height="20"
                />
                {fixture.homeTeam.name}
              </td>
              <td>vs</td>
              <td className="flex gap-2 justify-center">
                <img
                  src={fixture.awayTeam.crestUrl}
                  alt={fixture.awayTeam.name}
                  width="20"
                  height="20"
                />
                {fixture.awayTeam.name}
              </td>
              <td>{fixture.id}</td>
              <td>
                <button className="p-2 text-sm m-1 text-white rounded-md shadow-md cursor-pointer bg-blue-600 hover:bg-blue-800 transition-colors">
                  Add Live
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeagueFixtures;
