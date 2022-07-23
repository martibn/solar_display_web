export interface SolarData {
    time: Date;
    
    power_generated?: number;
    
    grid_injection?: number;
    
    grid_consumption?: number;

    power_consumption?: number;
};