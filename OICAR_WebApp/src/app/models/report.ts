import { JsonProperty } from "json-object-mapper";
import { ReportReason } from "./report-reason";
import { User } from "./user";

export class Report { 

    @JsonProperty({ name: "idreport" })
    private _idreport: number;

    @JsonProperty({ name: "reportingUserId" })
    private _reportingUserId: number;

    @JsonProperty({ name: "reportedUserId" })
    private _reportedUserId: number;

    @JsonProperty({ name: "reportReasonId" })
    private _reportReasonId: number;

    @JsonProperty({ name: "reportReason" })
    private _reportReason: ReportReason;

    @JsonProperty({ name: "reportedUser" })
    private _reportedUser: User;

    @JsonProperty({ name: "reportingUser" })
    private _reportingUser: User;

    constructor(
        idreport: number, 
        reportingUserId: number,
        reportedUserId: number,
        reportReasonId: number,
        reportReason: ReportReason,
        reportedUser: User,
        reportingUser: User,){
            this._idreport = idreport;
            this._reportingUserId = reportingUserId;
            this._reportedUserId = reportedUserId;
            this._reportReasonId = reportReasonId;
            this._reportReason = reportReason;
            this._reportedUser = reportedUser;
            this._reportingUser = reportingUser;
    }

    // getters
    get idreport(): number {
        return this._idreport;
    }

    get reportingUserId(): number {
        return this._reportingUserId;
    }

    get reportedUserId(): number {
        return this._reportedUserId;
    }

    get reportReasonId(): number {
        return this._reportReasonId;
    }

    get reportReason(): ReportReason {
        return this._reportReason;
    }

    get reportedUser(): User {
        return this._reportedUser;
    }

    get reportingUser(): User {
        return this._reportingUser;
    }

    // setters
    set reportingUser(reportingUser: User) {
        this._reportingUser = reportingUser;
    }

    set reportedUser(reportedUser: User) {
        this._reportedUser = reportedUser;
    }

    set reportReason(reportReason: ReportReason) {
        this._reportReason = reportReason;
    }
}
