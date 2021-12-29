import axios from 'axios';
import { BarController, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import { SolarData } from 'model/SolarData';
import { TodayData } from 'model/TodayData';
import React, { useEffect, useRef, useState } from "react";
import { Chart } from 'react-chartjs-2';
import DataToChartMapper from "../mapper/DataToChartMapper";


  
export const defaultOptions = {
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
    }
};

export const defaultChartData: TodayData = {
  labels: [],
  datasets: [
    {
      label: 'Power Generated',
      data: [],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      pointRadius: 0,
      stack: 'a'
    },
    {
      label: 'Power Consumed',
      data: [],
      borderColor: 'rgb(99, 99, 255)',
      backgroundColor: 'rgba(99, 99, 255, 0.5)',
      pointRadius: 0,
      stack: 'a'
    },
    {
      label: 'Grid Injected',
      data: [],
      borderColor: 'rgb(255, 155, 0)',
      backgroundColor: 'rgba(255, 155, 0, 0.5)',
      hidden: true,
      pointRadius: 0,
      stack: 'b'
    },
    {
      label: 'Grid Consumed',
      data: [],
      borderColor: 'rgb(99, 255, 99)',
      backgroundColor: 'rgba(99, 255, 99, 0.5)',
      hidden: true,
      pointRadius: 0,
      stack: 'b'
    },
  ],
}

const PowerChart = () => {
    ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend, BarElement, BarController);
    
    const [chartData, setChartData] = useState<TodayData>(defaultChartData);

    const intervl = useRef(null);
    const chartRef = useRef<any>();

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [periodicity, setPeriodicity] = useState("hour");
    const [inputDateType, setInputDateType] = useState("date");
    const [options] = useState(defaultOptions);
    const [chartType, setChartType] = useState<string>("bar");

    useEffect(() => {
      chartRef.current.config.type = chartType;

    }, [chartType]);

    useEffect(() => {
      updateChart();
      intervl.current = setInterval(() => {
        updateChart();
      }, 300000);

      return () => clearInterval(intervl.current);
    }, [startDate,endDate,periodicity]);

    const updateChart = ()=>{
      let URL: String = "/solar_data/";
      
      switch(periodicity){
        case "hour":
          options.plugins.title.text = 'Power Chart (W)';
          setInputDateType("date");
          setChartType("line");
          break;

        case "day":
          URL+="day_summary";
          options.plugins.title.text = 'Power Chart (Wh)';
          setInputDateType("date");
          setChartType("bar");
          break;

        case "month":
          URL+="month_summary";
          options.plugins.title.text = 'Power Chart (Wh)';
          setInputDateType("month");
          setChartType("bar");
          break;

        case "year":
          URL+="year_summary";
          options.plugins.title.text = 'Power Chart (Wh)';
          setInputDateType("month");
          setChartType("bar");
          break;
      }

      axios
      .get<SolarData[]>(URL + "?start=" + startDate.getTime() + "&end=" + endDate.getTime(), {
        headers: {
          "Content-Type": "application/json"
        },
      })
      .then(response => {
          setChartData(DataToChartMapper.arrToTodayData(response.data, periodicity, chartType));
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

    const onChangeSelector = (value: string) => {
      setPeriodicity(value);
    };

    return(
    <div className="power_chart">
      <div className="dateContainer">
        <span className="startDateRangeContainer">
          Start Date: <input  type={inputDateType} 
                              className="startDateRange" 
                              value={startDate.toISOString().substring(0,10)}
                              onChange={(ev) => {onChangeStartDate(new Date(ev.target.value))}}
                              />
        </span>
        <span className="endDateRangeContainer">
          End Date: <input    type={inputDateType} 
                              className="endDateRange" 
                              value={endDate.toISOString().substring(0,10)}
                              onChange={(ev) => {onChangeEndDate(new Date(ev.target.value))}}
                              />
        </span>
        <span className="chartPeriodRange">
          Chart type: <select onChange={(ev) => {onChangeSelector(ev.target.value)}}>
              <option value="hour">Day hours</option>
              <option value="day">Summary per days</option>
              <option value="month">Summary per months</option>
              <option value="year">Summary per Years</option>
          </select>
        </span>
      </div>

      <Chart ref={chartRef} options={options} data={chartData} type={chartType as any} />

    </div>);
};

export default PowerChart;