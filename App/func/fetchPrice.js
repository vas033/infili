import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.6/+esm';;

const fetchPrice = async(currency) =>
        await axios
        .get(`https://api.coinbase.com/v2/prices/spot?currency=${currency}`)
        .then(response => {
                return response.data.data
        })

export default fetchPrice;
