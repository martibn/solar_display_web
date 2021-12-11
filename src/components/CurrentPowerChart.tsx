import axios from 'axios';
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import { GetArchiveData } from "model/GetArchiveData";
import React, { useEffect, useRef, useState } from "react";
import { Line } from 'react-chartjs-2';
import GetArchiveDataMapper from "../mapper/GetArchiveDataMapper";

ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend);
  
export const options = {
    responsive: true,
    plugins: {
        legend: {
        position: 'top' as const,
        },
        title: {
        display: true,
        text: 'Power Chart (W)',
        },
        tooltip: {
          mode: 'index' as const,
          intersect: false
        },
        hover: {
          mode: 'index' as const,
          intersect: false
        }
    },
    
};

const CurrentPowerChart = () => {
    const [chartData, setChartData] = useState<any>({
      labels: [],
      datasets: [
        {
          label: 'Power',
          data: [],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Power Consumed',
          data: [],
          borderColor: 'rgb(99, 99, 255)',
          backgroundColor: 'rgba(99, 99, 255, 0.5)',
        },
        {
          label: 'Grid Consumed',
          data: [],
          borderColor: 'rgb(255, 155, 0)',
          backgroundColor: 'rgba(255, 155, 0, 0.5)',
          hidden: true
        },
        {
          label: 'Grid Injected',
          data: [],
          borderColor: 'rgb(99, 255, 99)',
          backgroundColor: 'rgba(99, 255, 99, 0.5)',
          hidden: true
        }
      ],
  });
    const intervl = useRef(null);
    const today : String = new Date().toLocaleString(undefined, {year: 'numeric', month: 'numeric', day: 'numeric' }).replaceAll("/",".");

    const updateChart = ()=>{
      axios
      .get<GetArchiveData>("http://localhost:4200/solar_api/v1/GetArchiveData.cgi?Scope=System&StartDate=" + today + "&EndDate=" + today + "&Channel=PowerReal_PAC_Sum&Channel=TimeSpanInSec&Channel=EnergyReal_WAC_Plus_Absolute&Channel=EnergyReal_WAC_Minus_Absolute", {
        headers: {
          "Content-Type": "application/json"
        },
      })
      .then(response => {
          setChartData(GetArchiveDataMapper.arrToTodayData(response.data));
      })
      ;
    };

    useEffect(() => {
        updateChart();
        intervl.current = setInterval(() => {
          updateChart();
        }, 300000);

        return () => clearInterval(intervl.current);
    }, []);
    
    return(
    <div className="power_chart">
      <Line options={options} data={chartData} />
    </div>);
};

export default CurrentPowerChart;