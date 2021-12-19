import { SolarData } from "model/SolarData";
import { TodayData } from "model/TodayData";

export default class DataToChartMapper{

    static arrToTodayData(model : SolarData[]) : TodayData{

        const vals :TodayData = {
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
        };

        model.forEach(element => {
            vals.datasets[0].data.push(element.power_generated);
            vals.datasets[1].data.push(element.power_consumption);
            vals.datasets[2].data.push(element.grid_consumption);
            vals.datasets[3].data.push(element.grid_injection);
            
            vals.labels.push(new Date(element.timestamp).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}));
        });

        return vals;
    }
};