import axios from 'axios'

// creating new client
export const createStudent = async (formData) => {
    try {
        const response = await axios.post('http://localhost:8000/api/register', formData);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

