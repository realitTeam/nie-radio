import axios from 'axios'

// viewing all students
export const viewStudents = async () => {
    try {
        const response = await axios.get('/api/admin/students');
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

// changing student status
export const changeStudentStatus = async (student_id) => {
    try {
        const response = await axios.put(`/api/admin/students/${student_id}/status`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}