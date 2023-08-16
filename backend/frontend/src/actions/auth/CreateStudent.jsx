// CreateStudent.jsx
import axios from 'axios';

export const createStudent = async (formData) => {
    try {
        const response = await axios.post('http://localhost:8000/api/register', formData);
        return response.data; // Return the response data
    } catch (error) {
        console.error(error);
        throw error;
    }
};
