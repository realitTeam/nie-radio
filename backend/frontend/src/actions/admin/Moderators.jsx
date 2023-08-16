import axios from 'axios'

// viewing all moderators
export const viewModerators = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/admin/moderators');
        return response.data;
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

