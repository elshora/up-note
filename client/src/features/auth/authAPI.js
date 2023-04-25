import axios from "axios";

export async function loginAPI(userData, thunkAPI) {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await axios.post(
      "http://localhost:4000/api/auth/login",
      { ...userData },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data.username));
    }
  } catch (err) {
    const message = () => {
      if (!err?.response) {
        return "No Server Response";
      } else if (err.response?.status === 400) {
        return "Missing Username or Password";
      } else if (err.response?.status === 401) {
        return "User not Found";
      } else {
        return "Login Failed";
      }
    };
    return rejectWithValue(message);
  }
}
export async function registerAPI(userData, thunkAPI) {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await axios.post(
      "http://localhost:4000/api/auth/register",
      userData
    );

    return response.data;
  } catch (err) {
    const message = () => {
      if (!err?.response) {
        return "No Server Response";
      } else if (err.response?.status === 409) {
        return "Username Taken";
      } else if (err.response?.status === 408) {
        return "email Used before";
      } else {
        return "Register Failed";
      }
    };
    return rejectWithValue(message);
  }
}
