import { JsonProperty } from "json-object-mapper";
import { DateSerializerDeserializer } from "./date-serializer-deserializer";

export class Suspension { 
    
    @JsonProperty({ name: "idsuspension" })
    private _idsuspension: number;

    @JsonProperty({ name: "appUserId" })
    private _appUserId: number;

    @JsonProperty({ name: "reportReasonId" })
    private _reportReasonId: number;

    @JsonProperty({ name: "startDate", type: Date, serializer: DateSerializerDeserializer, deserializer: DateSerializerDeserializer })
    private _startDate: Date;

    @JsonProperty({ name: "endDate", type: Date, serializer: DateSerializerDeserializer, deserializer: DateSerializerDeserializer })
    private _endDate: Date;

    constructor(
        idsuspension: number, 
        appUserId: number,
        reportReasonId: number,
        startDate: Date,
        endDate: Date,) {
            this._idsuspension = idsuspension;
            this._appUserId = appUserId;
            this._reportReasonId = reportReasonId;
            this._startDate = startDate;
            this._endDate = endDate;
    }

    // getters
    get idsuspension(): number {
        return this._idsuspension;
    }

    get appUserId(): number {
        return this._appUserId;
    }

    get reportReasonId(): number {
        return this._reportReasonId;
    }

    get startDate(): Date {
        return this._startDate;
    }

    get endDate(): Date {
        return this._endDate;
    }

    // setters
    set idsuspension(idsuspension: number) {
        this._idsuspension = idsuspension;
    }

    set appUserId(appUserId: number) {
        this._appUserId = appUserId;
    }

    set reportReasonId(reportReasonId: number) {
        this._reportReasonId = reportReasonId;
    }

    set startDate(startDate: Date) {
        this._startDate = startDate;
    }

    set endDate(endDate: Date) {
        this._endDate = endDate;
    }
}