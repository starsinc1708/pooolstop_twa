import {getDate} from "@/utils/functions";

const CHARTS = {
    Emcd: {
        borderColor: "#795EFC",
        backgroundColor: "#795EFC",
    },
    f2pool: {
        borderColor: "#2850FF",
        backgroundColor: "#2850FF",
    },
    luxor: {
        borderColor: "#EBBE4C",
        backgroundColor: "#EBBE4C",
    },
    sbicrypto: {
        borderColor: "#578AFF",
        backgroundColor: "#578AFF",
    },
    viabtc: {
        borderColor: "#2CC7BD",
        backgroundColor: "#2CC7BD",
    },
    poolin: {
        borderColor: "#96D5F2",
        backgroundColor: "#96D5F2",
    },
    binance: {
        borderColor: "#FA9233",
        backgroundColor: "#FA9233",
    },
    AntPool: {
        borderColor: "#46DB8B",
        backgroundColor: "#46DB8B",
    },
    "btc.com": {
        borderColor: "#89A8DC",
        backgroundColor: "#89A8DC",
    },
    slushpool: {
        borderColor: "#005E5E",
        backgroundColor: "#005E5E",
    },
};

export function getChartData(charts, labels) {
    return {
        labels,
        datasets: charts.map((chart) => {
            const {rates, pool} = chart;

            return {
                label: pool,
                data: labels.map((label) => rates[label]),
                pointRadius: 0,
                hoverRadius: 6,
                borderWidth: 4,
                pointBorderColor: "#ffffff",
                pointBorderWidth: 4,
                pointHoverBorderWidth: 4,
                pointHoverBorderColor: "#ffffff",
                tension: 0.4,
                borderColor: CHARTS[pool].borderColor,
                backgroundColor: CHARTS[pool].backgroundColor,
            };
        }),
    };
}

export function getChartOptions(labels, legend) {
    return {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            intersect: false,
        },
        scales: {
            x: {
                ticks: {
                    font: {
                        size: 12,
                    },
                    color: "#CCCDD2",
                    callback: function (value, index) {
                        return getDate(labels[index], "DD MMM");
                    },
                },
            },
            y: {
                ticks: {
                    font: {
                        size: 12,
                    },
                    color: "#CCCDD2",
                },
            },
        },
        plugins: {
            tooltip: {
                enabled: true,
                titleAlign: "left",
                titleColor: "#FFFFFF",
                usePointStyle: true,
                pointStyle: "circle",
                boxWidth: 8,
                boxHeight: 8,
                boxPadding: 8,
                padding: {
                    top: 10,
                    bottom: 10,
                    right: 12,
                    left: 16,
                },
                callbacks: {
                    title: function (context) {
                        const [element] = context;

                        return getDate(element.label, "DD.MM.YYYY");
                    },
                    label: function ({dataset, raw}) {
                        return `${dataset.label}: ${raw} BTC`;
                    },
                },
            },
            legend: {
                display: legend,
                position: "bottom",
                labels: {
                    boxWidth: 10,
                    boxHeight: 10,
                    color: "#9E9FA8",
                    font: {
                        size: 12,
                        weight: 500,
                    },
                    usePointStyle: true,
                    pointStyle: "circle",
                },
            },
        },
    };
}
