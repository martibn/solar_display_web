interface Values {
    [key: string]: number;
};

interface PowerRealPACSum {
    Unit: string;
    Values: Values;
    _comment: string;
};

interface TimeSpanInSec {
    Unit: string;
    Values: Values;
    _comment: string;
};

interface Data2 {
    PowerReal_PAC_Sum: PowerRealPACSum;
    TimeSpanInSec: TimeSpanInSec;
};

interface Inverter1 {
    Data: Data2;
    DeviceType: number;
    End: Date;
    NodeType: number;
    Start: Date;
};

interface Data {
    "inverter/1": Inverter1;
};

interface Body {
    Data: Data;
};

interface RequestArguments {
    Channel: string[];
    EndDate: Date;
    HumanReadable: string;
    Scope: string;
    SeriesType: string;
    StartDate: Date;
};

interface ErrorDetail {
    Nodes: any[];
};

interface Status {
    Code: number;
    ErrorDetail: ErrorDetail;
    Reason: string;
    UserMessage: string;
};

interface Head {
    RequestArguments: RequestArguments;
    Status: Status;
    Timestamp: Date;
};

export interface GetArchiveData {
    Body: Body;
    Head: Head;
};