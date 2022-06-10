export interface InfoTableRow {
    key: string;
    value: string;
}

export interface InfoRowProps {
    k: string;
    v: string;
    rowIndex: number;
}

export type InfoTableData = InfoTableRow[];
