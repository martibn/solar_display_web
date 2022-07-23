import { SolarData } from "model/SolarData";
import { TodayData } from "model/TodayData";

export default class DataToChartMapper{

    static arrToTodayData(model: SolarData[], periodicity: string, chartType: string) : TodayData{

        const vals :TodayData = {
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
                  }
            ],
        };

        if(periodicity === "hour"){
          vals.datasets[0].stack = "a";
          vals.datasets[1].stack = "b";
          vals.datasets[2].stack = "c";
          vals.datasets[3].stack = "d";
        }else{
          vals.datasets[0].stack = "a";
          vals.datasets[1].stack = "a";
          vals.datasets[2].stack = "b";
          vals.datasets[3].stack = "b";
        }

        model.forEach(element => {
          vals.datasets[0].data.push(element.power_generated);
          vals.datasets[1].data.push(periodicity === "hour" ? element.power_consumption : -Math.abs(element.power_consumption));
          vals.datasets[2].data.push(element.grid_injection);
          vals.datasets[3].data.push(periodicity === "hour" ? element.grid_consumption : -Math.abs(element.grid_consumption));
          
          const date = new Date(element.time);
          let opts = {};
          if(periodicity === "month"){
            opts = {month: "numeric", year: "numeric"};
          }else if(periodicity === "year"){
            opts = {year: "numeric"};
          }

          let label: string = date.toLocaleDateString(navigator.language, opts);

          if(periodicity === "hour"){
            label += " " + date.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})
          }

          vals.labels.push(label);
        });

        return vals;
    }
};