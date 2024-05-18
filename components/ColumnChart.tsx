'use client'
import dynamic from "next/dynamic";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function ColumnChart(props: { state: { options: ApexCharts.ApexOptions, series: any[] } }) {

    return (
        <div className="donut">
            <ApexChart
                options={props.state.options || {}}
                series={props.state.series ||  []}
                type="bar"
                width="380"
                height='380'
            />
        </div>
    );
}
