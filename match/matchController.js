import Matches from "./matchModel.js";

const createMatch = async (req, res) => {
  const {
    sport_type,
    league_type,
    match_title,
    match_time,
    status,
    fixture_id,
    hot_match,
    team_one,
    team_two,
    streaming_source,
  } = req.body;
  // console.log(req.body);
  if (
    sport_type &&
    league_type &&
    match_time &&
    status &&
    match_title &&
    team_one &&
    team_two &&
    streaming_source
  ) {
    try {
      const newMatch = new Matches({
        sport_type: sport_type,
        match_time: match_time,
        status: status,
        league_type: league_type,
        match_title: match_title,
        fixture_id: fixture_id,
        hot_match: hot_match,
        team_one: team_one,
        team_two: team_two,
        streaming_source: streaming_source,
      });
      const match = await newMatch.save();

      res.status(200).json({
        success: true,
        message: "Match created successfully",
        match,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        success: false,
        mesaage: `${error?.message}`,
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: "Please fill empty fields",
    });
  }
};

const getMatches = async (req, res) => {
  // const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 8;
  // const skip = (page - 1) * perPage;
  const searchQuery = req.query.search || "";

  try {
    let query = {};
    if (req.query.search) {
      query.league_type = { $regex: searchQuery, $options: "i" };
    }

    // Count the total number of matches based on the query
    const totalCount = await Matches.countDocuments(query);
    // Fetch the paginated matches based on the query, sorting by league_type
    const matches = await Matches.find(query)
      .sort({ league_type: 1 })
      // .skip(skip)
      .limit(perPage);

    const totalPages = Math.ceil(totalCount / perPage);

    res.status(200).json({
      success: true,
      message: "Matches",
      totalPages,
      paginatedMatches: matches,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getMatchById = async (req, res) => {
  const { id } = req.params;
  try {
    const match = await Matches.findById(id);

    res.status(200).json({
      success: true,
      message: "Single match",
      match,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      mesaage: `${error?.message}`,
    });
  }
};

const updateMatch = async (req, res) => {
  const { id } = req.params;
  const {
    sport_type,
    league_type,
    match_title,
    match_time,
    status,
    fixture_id,
    hot_match,
    team_one,
    team_two,
    streaming_source,
  } = req.body;
  if (id) {
    if (
      sport_type ||
      league_type ||
      match_time ||
      status ||
      match_title ||
      team_one ||
      team_two ||
      streaming_source ||
      fixture_id ||
      hot_match
    ) {
      try {
        await Matches.findByIdAndUpdate(id, {
          sport_type: sport_type,
          match_time: match_time,
          status: status,
          league_type: league_type,
          match_title: match_title,
          fixture_id: fixture_id,
          hot_match: hot_match,
          team_one: team_one,
          team_two: team_two,
          streaming_source: streaming_source,
        });
        res.status(200).json({
          success: true,
          message: "Match Updated Successfully",
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          message: `${error?.message}`,
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: "Please enter field you need to update",
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: "Something wents wrong",
    });
  }
};

const deleteMatchById = async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      await Matches.findByIdAndDelete({ _id: id });
      res.status(200).json({
        success: true,
        message: "Match deleted successfully",
      });
    } else {
      res.status(500).json({
        success: false,
        message: "You are not able to delete this",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `${error?.message}`,
    });
  }
};

export { createMatch, getMatches, updateMatch, deleteMatchById, getMatchById };
