import instance from "axios";
import { toast } from "react-toastify";

  //baseURL: import.meta.env.VITE_API_BASE_URL, temporarily removed from axios instance

const axios = instance.create({
  baseURL: 'https://score-admin-live.onrender.com/api',

  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthToken = (token, userId) => {
  if (token) {
    // Apply token and userId to headers
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.defaults.headers.common["UserId"] = userId;
  } else {
    // Delete token and userId from headers
    delete axios.defaults.headers.common["Authorization"];
    delete axios.defaults.headers.common["UserId"];
  }
};

axios.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.token && user?.userId) {
      // Set token and userId from local storage to headers
      config.headers.Authorization = `Bearer ${user.token}`;
      config.headers.UserId = user.userId;
      return config;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const signupUser = async (form) => {
  try {
    const res = await axios.post(`/signup`, form);
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};

export const loginUser = async (user) => {
  try {
    const res = await axios.post(`/login`, user);
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};

export const createMatch = async (formData) => {
  try {
    const res = await axios.post(`/create-match`, formData);
    if (res) {
      toast.success("Match created successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};

export const fetchAllMatches = async () => {
  try {
    const res = await axios.get("/all-matches");
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};

export const deleteMatch = async (id) => {
  try {
    const res = await axios.delete(`/delete-match/${id}`);
    toast.success("Match deleted successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};

export const createNews = async (data) => {
  try {
    const res = await axios.post(`/create/news`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};

export const editNews = async (id, data) => {
  try {
    const res = await axios.put(`/news/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};

export const getAllNews = async (currentPage, searchQuery, perPage) => {
  try {
    const res = await axios.get(
      `/all/news?page=${currentPage}&search=${searchQuery}&perPage=${perPage}`
    );
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};

export const getMatch = async (id) => {
  try {
    const res = await axios.get(`/${id}`);

    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};

export const updateMatch = async (id, formData) => {
  try {
    const res = await axios.put(`/match/${id}`, formData);
    if (res) {
      toast.success("Match updated successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};

export const deleteSingleNews = async (id) => {
  try {
    const res = await axios.delete(`/delete-news/${id}`);

    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};

export const getSingleNews = async (id) => {
  try {
    const res = await axios.get(`/news/${id}`);
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};

export const duplicateMatch = async (id) => {
  try {
    const res = await axios.post(`/duplicate/${id}`);
    if (res) {
      toast.success("Match duplicated successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};
