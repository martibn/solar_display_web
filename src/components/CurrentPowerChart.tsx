import axios from 'axios';
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import { SolarData } from 'model/SolarData';
import React, { useEffect, useRef, useState } from "react";
import { Line } from 'react-chartjs-2';
import DataToChartMapper from "../mapper/DataToChartMapper";

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
            label: 'Power Generated',
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
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    useEffect(() => {
      updateChart();
      intervl.current = setInterval(() => {
        updateChart();
      }, 300000);

      return () => clearInterval(intervl.current);
    }, [startDate,endDate]);

    const updateChart = ()=>{
      axios
      .get<SolarData[]>("/solar_data/?start=" + startDate.getTime() + "&end=" + endDate.getTime(), {
        headers: {
          "Content-Type": "application/json"
        },
      })
      .then(response => {
          setChartData(DataToChartMapper.arrToTodayData(response.data));
      })
      ;
    };

    const onChangeStartDate = (newDate: Date) => {
      setStartDate(newDate);

      if(newDate.getTime() > endDate.getTime()){
        setEndDate(newDate);
      }
    };

    const onChangeEndDate = (newDate: Date) => {
      setEndDate(newDate);

      if(newDate.getTime() < startDate.getTime()){
        setStartDate(newDate);
      }
    };

    return(
    <div className="power_chart">
      <div className="dateContainer">
        <span className="startDateRangeContainer">
          Start Date: <input  type="date" 
                              className="startDateRange" 
                              value={startDate.toISOString().substring(0,10)}
                              onChange={(ev) => {onChangeStartDate(new Date(ev.target.value))}}
                              />
        </span>
        <span className="endDateRangeContainer">
          End Date: <input  type="date" 
                              className="endDateRange" 
                              value={endDate.toISOString().substring(0,10)}
                              onChange={(ev) => {onChangeEndDate(new Date(ev.target.value))}}
                              />
        </span>
      </div>
      <Line options={options} data={chartData} />
    </div>);
};

export default CurrentPowerChart;