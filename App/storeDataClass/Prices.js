import fetchPrice from '../func/fetchPrice.js'
class Prices {
        prices_data = []
        averagePrices = []

        /**
         * 
         * @param {string} currency 
         */
        constructor(currency) {
                this.__currency = currency
        }

        set_prices(price) {
                if (this.prices.length < 60) {
                        this.prices_data.push(price)
                } else {
                        this.prices_data.shift()
                        this.prices_data.push(price)
                }
        }

        get currency() {
                return this.__currency
        }

        get prices() {
                let prices = []
                for (let priceObj of this.prices_data) {
                        prices.push(priceObj.price)
                }
                return prices
        }

        get times() {
                let times = []
                for (let priceObj of this.prices_data) {
                        times.push(priceObj.time)
                }
                return times
        }

        get average() {
                return this.averagePrices
        }

        // Get average price of the array
        // As params get one of the three timeframes, default -> 60 or arr.length and currency which prices we have to calculate 
        // also use setInterval for update price if array length is correct for this timeframe
        /**
         * 
         * @param {number} timeframe 
         */
        get_avrerage_price(timeframe) {
                if (timeframe <= 0 && timeframe > 60) throw Error;

                if (timeframe > this.prices.length) {
                        return 0
                } else {
                        const timeframeArr = this.prices.slice(this.prices.length - timeframe)
                        const averagePrice = timeframeArr.reduce((a, b) => a + b) / timeframeArr.length
                        return averagePrice.toFixed(2)
                }
        }

        /**
         * 
         * @param {Prices} currency 
         */
        updateAverage() {
                this.averagePrices = [
                        this.get_avrerage_price(5),
                        this.get_avrerage_price(30),
                        this.get_avrerage_price(60),
                ]
        }

        async fetchAndSetPrice() {
                const data = await fetchPrice(this.__currency);

                const date = new Date()
                const time = `${date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`

                this.set_prices({ time: time, price: Number(data.amount) })
        }

}

const usd = new Prices('USD');
const eur = new Prices('EUR');

// start fetching data for user every 1 min
setInterval(() => {
        usd.fetchAndSetPrice()
        eur.fetchAndSetPrice()
}, 60000)

export { usd, eur };
