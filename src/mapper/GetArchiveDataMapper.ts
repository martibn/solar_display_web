import { GetArchiveData } from "model/GetArchiveData";
import { TodayData } from "model/TodayData";

export default class GetArchiveDataMapper{

    static arrToTodayData(model : GetArchiveData) : TodayData{
        let currentTime : number = new Date(model.Body.Data["inverter/1"].Start).getTime();
        const watts = model.Body.Data["inverter/1"].Data.PowerReal_PAC_Sum.Values;
        const secs = model.Body.Data["inverter/1"].Data.TimeSpanInSec.Values;
        const absolute = model.Body.Data["meter:IME - Smart Meter 63A-1 - 19120744"].Data.EnergyReal_WAC_Plus_Absolute.Values;
        const minus = model.Body.Data["meter:IME - Smart Meter 63A-1 - 19120744"].Data.EnergyReal_WAC_Minus_Absolute.Values;

        let lastAbsolute = absolute["0"];
        let lastMinus = minus["0"];

        const vals :TodayData = {
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
        };

        for(const props in watts){
            const powerGenerated = watts[props];
            const gridInjected = (minus[props] - lastMinus) * 12;
            const gridConsumed = (absolute[props] - lastAbsolute) * 12;
            currentTime = currentTime + (secs[props] * 1000);

            vals.datasets[0].data.push(powerGenerated);
            vals.datasets[1].data.push(powerGenerated - gridInjected + gridConsumed);
            vals.datasets[2].data.push(gridConsumed);
            vals.datasets[3].data.push(gridInjected);
            
            vals.labels.push(new Date(currentTime).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}));

            lastAbsolute = absolute[props];
            lastMinus = minus[props];
        }
        
        return vals;
    }
};