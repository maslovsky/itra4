import LineChart from './src/line-chart/line-chart.js';
import DataService from './src/services/data-service.js';

(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', onReady);

    function onReady() {
        new DataService()
            .getData()
            .then(data => {
                initializeChart(data);

                window.addEventListener('resize', () => {
                    initializeChart(data);
                });
            });
    }

    function initializeChart(data) {
        const chartContainer = document.body.querySelector('.chart-container');

        chartContainer.innerHTML = null;
        new LineChart(chartContainer, data, chartContainer.clientWidth, chartContainer.clientHeight);
    }
}());