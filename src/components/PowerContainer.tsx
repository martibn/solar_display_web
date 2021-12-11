import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useRef, useState } from "react";
import { GetInverterRealtimeData } from "../model/GetInverterRealtimeData";

const PowerContainer = ({initialVal}) => {
    const [generatedPower, setGeneratedPower] = useState(initialVal);
    const [consumedPower, setConsumedPower] = useState(initialVal);
    const [lastRequest, setLastRequest] = useState(initialVal);
    const intervl = useRef(null);

    const updateData = () => {
        const inverter : Promise<AxiosResponse<GetInverterRealtimeData, any>> = axios.get<GetInverterRealtimeData>("http://localhost:4200/solar_api/v1/GetInverterRealtimeData.cgi?Scope=System", {
            headers: {
            "Content-Type": "application/json"
        }});

        const meter : Promise<AxiosResponse<GetInverterRealtimeData, any>> = axios.get<GetInverterRealtimeData>("http://localhost:4200/solar_api/v1/GetMeterRealtimeData.cgi?Scope=System", {
            headers: {
                "Content-Type": "application/json"
        }});

        axios.all([inverter, meter])
            .then(
                axios.spread((...responses) => {
                    setGeneratedPower(responses[0].data.Body.Data.PAC.Values[1] + " " + responses[0].data.Body.Data.PAC.Unit);
                    setConsumedPower((responses[0].data.Body.Data.PAC.Values[1] + responses[1].data.Body.Data["0"].PowerReal_P_Sum).toFixed(2) + " W");
                    setLastRequest(responses[1].data.Head.Timestamp);
                })
        );

        // axios.get("http://localhost:4200/Chart/GetChartNew").then(response => {

        //         console.log(response);
        //     })


        // mirar si http://localhost:4200/solar_api/v1/GetPowerFlowRealtimeData.fcgi retorna la info dels 2 endpoints
        
    }


    useEffect(() => {
        updateData();

        intervl.current = setInterval(() => {
            updateData();
        }, 5000);

        return () => clearInterval(intervl.current);
        }, []);

    return(<div className="power-container">
        <div>
            Generated Power: {generatedPower}
        </div>
        <div>
            Comsumed Power: {consumedPower}
        </div>
        <div>
            Last Request: {lastRequest}
        </div>
    </div>);
};

export default PowerContainer;