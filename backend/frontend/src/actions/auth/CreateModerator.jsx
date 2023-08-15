// createModerator.jsx
import axios from "axios";

export const createModerator = async (formData) => {
  try {
    const response = await axios.post("http://localhost:80/api/m", formData);
    return response.data; //Return the response data
  } catch (error) {
    throw error; //Rethrow the error
  }
};