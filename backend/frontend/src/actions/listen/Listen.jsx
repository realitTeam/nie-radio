import axios from 'axios'

// listen audio live
export const Listen = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/listen/live');
        return response.data;
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

