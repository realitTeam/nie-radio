// Moderators.jsx
import axios from 'axios'

// viewing all moderators
export const viewModerators = async () => {
    try {
        const response = await axios.get('/api/admin/moderators');
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
// changing moderator status
export const changeModeratorStatus = async (moderatorId) => {
    try {
        const response = await axios.put(`/api/admin/moderators/${moderatorId}/status`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
// storing new moderator
export const storeModerator = async (formData) => {
    try {
      const response = await axios.post("/api/admin/moderators/store", formData);
      return response.data; //Return the response data
    } catch (error) {
      throw error; //Rethrow the error
    }
  };