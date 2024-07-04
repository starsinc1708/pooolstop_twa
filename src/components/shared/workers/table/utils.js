import {getGradient, getTimestampDate, getAnnotation} from "@/utils/functions";

const DATASETS = {
    line: 0,
    bar: 1,
};

export function getChartData(data, labels, barData) {
    return {
        labels,
        datasets: [
            {
                type: "line",
                label: "HASHRATE",
                data,
                pointRadius: 0,
                hoverRadius: 6,
                fill: true,
                borderWidth: 2,
                pointBorderColor: "#ffffff",
                pointBorderWidth: 4,
                pointHoverBorderWidth: 4,
                pointHoverBorderColor: "#ffffff",
                tension: 0.4,
                borderColor: function (context) {
                    const {ctx, chartArea} = context.chart;

                    if (!chartArea) {
                        return;
                    }

                    return getGradient(
                        ctx,
                        chartArea,
                        "#F0533E",
                        "#F0933E",
                        "#F0C93E"
                    );
                },
                backgroundColor: function (context) {
                    const {ctx, chartArea} = context.chart;

                    if (!chartArea) {
                        return;
                    }

                    return getGradient(
                        ctx,
                        chartArea,
                        "rgba(240, 147, 62, 0)",
                        null,
                        "rgba(240, 147, 62, 0.2)"
                    );
                },
            },
            {
                label: "REJECT RATE",
                data: barData,
                backgroundColor: "#F13F3F",
                yAxisID: "y1",
            },
        ],
    };
}

export function getChartOptions(
    labels,
    scaleFormat,
    tooltipFormat,
    unit = "",
    value
) {
    return {
        responsive: true,
        maintainAspectRatio: false,
        pointBackgroundColor: "#F1C83F",
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
                        return getTimestampDate(
                            parseInt(labels[index]),
                            scaleFormat
                        );
                    },
                },
            },
            y: {
                ticks: {
                    font: {
                        size: 12,
                    },
                    color: "#CCCDD2",
                    callback: function (value) {
                        return `${value} ${unit}`;
                    },
                },
            },
            y1: {
                position: "right",
                ticks: {
                    font: {
                        size: 12,
                    },
                    color: "#CCCDD2",
                    callback: function (value) {
                        return `${value} %`;
                    },
                },
                grid: {
                    display: false
                },
                suggestedMax: 100,
                beginAtZero: true,
            },
        },
        plugins: {
            tooltip: {
                enabled: true,
                titleAlign: "left",
                titleColor: "#FFFFFF",
                bodyAlign: "left",
                displayColors: false,
                callbacks: {
                    title: function (context) {
                        const [element] = context;

                        return getTimestampDate(
                            parseInt(element.label),
                            tooltipFormat
                        );
                    },
                    label: function ({datasetIndex, raw}) {
                        switch (datasetIndex) {
                            case DATASETS.line:
                                return `Hashrate: ${raw}${unit}`;
                            case DATASETS.bar:
                                return `Reject rate: ${raw}%`;
                            default:
                                return "";
                        }
                    },
                },
            },
            legend: {
                display: true,
                position: "bottom",
                labels: {
                    boxWidth: 10,
                    boxHeight: 10,
                    color: "#222327",
                    font: {
                        size: 12,
                        weight: 500,
                    },
                    usePointStyle: true,
                    pointStyle: "circle",
                },
            },
            annotation: {
                annotations: {
                    nominal: getAnnotation(value, unit),
                },
            },
        },
    };
}
