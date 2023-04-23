import fetchPrice from "../func/fetchPrice.js"
import { usd, eur } from '../storeDataClass/Prices.js'

const app = Vue.createApp({
        setup() {
                const average = Vue.reactive([{
                                name: usd.currency,
                                averagePrices: [...usd.average]
                        },
                        {
                                name: eur.currency,
                                averagePrices: [...eur.average]
                        },

                ])

                setInterval(() => {
                        usd.updateAverage()
                        eur.updateAverage()
                        average[0].averagePrices.value = [...usd.average]
                        average[1].averagePrices.value = [...eur.average]

                }, 60000)

                Vue.watchEffect(() => console.log(average))

                return { average }
        },
        data() {
                return {
                        currencyValues: [
                                { id: 0, value: 'USD' },
                                { id: 1, value: 'EUR' }
                        ],
                        choice: { name: '', price: 0 },
                        tableHeaders: ['', '5 min', '30 min', '60 min'],
                        submittedForm: false
                }
        },
        methods: {
                async fetchCurrentPrice() {
                        const data = await fetchPrice(this.choice.name)
                        this.choice.price = data.amount
                        this.submittedForm = false
                },
                submitFlag() {
                        this.submittedForm = !this.submittedForm
                        console.log(this.submittedForm)
                }
        },
})

const vm = app.mount('#app')
