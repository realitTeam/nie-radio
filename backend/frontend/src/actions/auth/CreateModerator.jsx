import axios from 'axios'

// creating new client
export const createModerator = async (formData) => {
    try {
        const response = await axios.post('http://localhost:8000/api/m', formData);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

