import axios from 'axios';
import { SolarData } from 'model/SolarData';
import React, { useEffect, useRef, useState } from "react";

const PowerContainer = ({initialVal}) => {

    const [solarData, setSolarData] = useState<SolarData>({timestamp: null, power_generated: null, grid_injection : null, grid_consumption : null, power_consumption: null});

    const intervl = useRef(null);

    const updateData = () => {

        axios.get<SolarData>("/solar_data/current", {
            headers: {
            "Content-Type": "application/json"
            },
        })
        .then(response => {
            setSolarData(response.data);
        })
        ;

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
            Power Generated: {solarData.power_generated + " W"}
        </div>
        <div>
            Power Comsumed: {solarData.power_consumption + " W"}
        </div>
        <div hidden={solarData.grid_consumption===0}>
            Grid consumed: {solarData.grid_consumption + " W"}
        </div>
        <div hidden={solarData.grid_injection===0}>
            Grid injection: {solarData.grid_injection + " W"}
        </div>
        <div>
            Last Request: {new Date(solarData.timestamp).toLocaleString()}
        </div>
    </div>);
};

export default PowerContainer;