interface Dataset {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    hidden?: boolean;
    pointRadius: number;
    stack?: string;
}

export interface TodayData {
    labels: string[];
    datasets: Dataset[];
};