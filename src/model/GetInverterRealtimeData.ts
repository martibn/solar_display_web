interface Values {
    [key: string]: number;
};

interface DAYENERGY {
    Unit: string;
    Values: Values;
};

interface PAC {
    Unit: string;
    Values: Values;
};

interface TOTALENERGY {
    Unit: string;
    Values: Values;
};

interface YEARENERGY {
    Unit: string;
    Values: Values;
};

interface Data {
    DAY_ENERGY: DAYENERGY;
    PAC: PAC;
    TOTAL_ENERGY: TOTALENERGY;
    YEAR_ENERGY: YEARENERGY;
};

interface Body {
    Data: Data;
};

interface RequestArguments {
    DeviceClass: string;
    Scope: string;
};

interface Status {
    Code: number;
    Reason: string;
    UserMessage: string;
};

interface Head {
    RequestArguments: RequestArguments;
    Status: Status;
    Timestamp: Date;
};

export interface GetInverterRealtimeData {
    Body: Body;
    Head: Head;
};