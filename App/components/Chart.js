import { eur, usd } from "../storeDataClass/Prices.js"

let options = {

        chart: {
                height: 350,
                type: "line",
                stacked: false
        },
        colors: ["#FF1654", "#247BA0"],
        stroke: { width: [1] },
        series: [{
                        name: usd.currency,
                        data: [...usd.prices]
                },
                {
                        name: eur.currency,
                        data: [...eur.prices]
                }
        ],
        xaxis: { categories: [...usd.times] },

}

let chart = new ApexCharts(document.getElementById("chart"), options);
chart.render()

setInterval(() => {
        chart.updateOptions({
                series: [{
                                name: usd.currency,
                                data: [...usd.prices]
                        },
                        {
                                name: eur.currency,
                                data: [...eur.prices]
                        }
                ],
                xaxis: { categories: [...usd.times] },
        }, true, true)
}, 60000)
