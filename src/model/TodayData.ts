interface Dataset {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    hidden?: boolean;
}

export interface TodayData {
    labels: string[];
    datasets: Dataset[];
};