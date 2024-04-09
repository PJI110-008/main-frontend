'use client'
import dynamic from "next/dynamic";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function DonutChart(props: { state: { options: ApexCharts.ApexOptions, series: number[] } }) {

    return (
        <div className="donut">
            <ApexChart
                options={props.state.options || {}}
                series={props.state.series ||  [44, 55, 41, 17, 15]}
                type="donut"
                width="380"
            />
        </div>
    );
}
