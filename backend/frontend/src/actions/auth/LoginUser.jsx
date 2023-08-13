import axios from 'axios'

export const login = async (formData) => {
    try {
        const response = await axios.post('http://localhost:8000/api/login', formData);

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role);

        switch (response.data.role) {
            case 'admin':
                window.location.href = '/admin';
                break;
            case 'moderator':
                window.location.href = '/moderator';
                break;
            default:
                window.location.href = '/student';
                break;
        }

        if (response.data) {
            console.log('success');
        }
    } catch (error) {
        console.error(error);
    }
}


