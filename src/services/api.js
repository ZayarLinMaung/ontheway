import axios from "axios";

const API_URL = "http://54.206.54.0:8000";

// Function to handle user registration
export const registerUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/register.php`, {
      username: username,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    return {
      success: false,
      message: "Registration failed. Please try again.",
    };
  }
};

// Function to handle user login
export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login.php`, {
      username: username,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    return {
      success: false,
      message: "Login failed. Please check your credentials.",
    };
  }
};
