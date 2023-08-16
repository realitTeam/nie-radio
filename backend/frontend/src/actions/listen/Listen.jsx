import axios from 'axios'

// listen audio live
export const Listen = async () => {
    try {
        const response = await axios.get('/api/listen/live');
        return response.data;
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

