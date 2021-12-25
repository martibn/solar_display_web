interface Dataset {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    hidden?: boolean;
    pointRadius: number;
}

export interface TodayData {
    labels: string[];
    datasets: Dataset[];
};