import {getGradient, getTimestampDate, getAnnotation} from "@/utils/functions";

export function getChartData(data, labels) {
    return {
        labels,
        datasets: [
            {
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
                beginAtZero: true,
            },
        },
        plugins: {
            tooltip: {
                enabled: true,
                titleAlign: "center",
                titleColor: "#FFFFFF",
                bodyAlign: "center",
                bodySpacing: 8,
                displayColors: false,
                callbacks: {
                    title: function (context) {
                        const [element] = context;

                        return getTimestampDate(
                            parseInt(element.label),
                            tooltipFormat
                        );
                    },
                    label: function ({raw}) {
                        return `${raw} ${unit}`;
                    },
                },
            },
            legend: {
                display: false,
            },
            annotation: {
                annotations: {
                    hashrate: getAnnotation(value, unit),
                },
            },
        },
    };
}
