import { Report } from "./report";
import { Suspension } from "./suspension";

export class ReportReason { 
    private _idreportReason: number;
    private _title: string;
    private _reports: Report[];
    private _suspensions: Suspension[];

    constructor(
        idreportReason: number, 
        title: string,
        reports: Report[],
        suspensions: Suspension[],){
            this._idreportReason = idreportReason;
            this._title = title;
            this._reports = reports;
            this._suspensions = suspensions;
    }

    // getters
    get idreportReason(): number {
        return this._idreportReason;
    }

    get title(): string {
        return this._title;
    }

    get reports(): Report[] {
        return this._reports;
    }

    get suspensions(): Suspension[] {
        return this._suspensions;
    }
}