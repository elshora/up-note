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
    return response.data.reverse();
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

export const postNote = async (note, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await axios.post(notesAPI, note, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (err) {
    const message = () => {
      if (!err?.response) {
        return "No Server Response";
      } else if (err.response?.status === 400) {
        return "Missing Data";
      } else {
        return "Failed";
      }
    };
    return rejectWithValue(message);
  }
};

export const deleteNote = async (noteID, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await axios.delete(`${notesAPI}/${noteID}`, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (err) {
    const message = () => {
      if (!err?.response) {
        return "No Server Response";
      } else if (err.response?.status === 400) {
        return "Missing ID";
      } else {
        return "Failed";
      }
    };
    return rejectWithValue(message);
  }
};
export const updateNote = async (updatedNote, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await axios.put(
      `${notesAPI}/${updatedNote._id}`,
      updatedNote,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (err) {
    const message = () => {
      if (!err?.response) {
        return "No Server Response";
      } else if (err.response?.status === 401) {
        return "not authorized to this action";
      } else {
        return "Failed";
      }
    };
    return rejectWithValue(message);
  }
};
