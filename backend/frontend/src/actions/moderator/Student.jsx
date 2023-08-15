import axios from 'axios'

// viewing all students
export const viewStudents = async () => {
    try {
        const response = await axios.get('http://localhost:80/api/moderator/students');
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
