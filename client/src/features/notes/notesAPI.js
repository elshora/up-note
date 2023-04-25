import axios from "axios";
const notesAPI = "http://localhost:4000/api/posts";

export const getNotesByAuthor = async (user, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await axios.get(
      notesAPI,
      {
        params: {
          username: user,
        },
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (err) {
    const message = () => {
      if (!err?.response) {
        return "No Server Response";
      } else if (err.response?.status === 400) {
        return "Required login";
      } else if (err.response?.status === 401) {
        return "Username Wrong";
      } else {
        return "get notes Failed";
      }
    };
    return rejectWithValue(message);
  }
};
