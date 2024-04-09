'use client'

import React, { Component, useEffect } from 'react';
import Chart from 'react-apexcharts'

export default function DonutChart(props: { state: { options: ApexCharts.ApexOptions, series: number[] } }) {

    return (
        <div className="donut">
            <Chart
                options={props.state.options || {}}
                series={props.state.series ||  [44, 55, 41, 17, 15]}
                type="donut"
                width="380"
            />
        </div>
    );
}
