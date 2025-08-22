import axios from 'axios';

const fetchPrices = async () => {
    try {
        axios.get('http://api.naflows.com:3001/get-prices/global').then((response) => {
            const data = response.data;
            return data;
        });
    } catch (error) {
        console.error("Error fetching prices:", error);
    }
};


export default fetchPrices;