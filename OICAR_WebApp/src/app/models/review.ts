import { JsonProperty } from "json-object-mapper";
import { DateSerializerDeserializer } from "./date-serializer-deserializer";
import { ReportReason } from "./report-reason";
import { User } from "./user";

export class Review {

    @JsonProperty({ name: "idreview" })
    private _idreview: number;

    @JsonProperty({ name: "reviewingUserId" })
    private _reviewingUserId: number;

    @JsonProperty({ name: "reviewedUserId" })
    private _reviewedUserId: number;

    @JsonProperty({ name: "dateOfCreation", type: Date, serializer: DateSerializerDeserializer, deserializer: DateSerializerDeserializer })
    private _dateOfCreation: Date;

    @JsonProperty({ name: "comment" })
    private _comment: string;

    @JsonProperty({ name: "reviewedUser" })
    private _reviewedUser: User;

    @JsonProperty({ name: "reviewingUser" })
    private _reviewingUser: User;

    constructor(
        idreview: number, 
        reviewingUserId: number,
        reviewedUserId: number,
        dateOfCreation: Date,
        comment: string,
        reviewedUser: User,
        reviewingUser: User,){
        this._idreview = idreview;
        this._reviewingUserId = reviewingUserId;
        this._reviewedUserId = reviewedUserId;
        this._dateOfCreation = dateOfCreation;
        this._comment = comment;
        this._reviewedUser = reviewedUser;
        this._reviewingUser = reviewingUser;
    }

    // getters
    get idreview(): number {
        return this._idreview;
    }

    get reviewingUserId(): number {
        return this._reviewingUserId;
    }

    get reviewedUserId(): number {
        return this._reviewedUserId;
    }

    get dateOfCreation(): Date {
        return this._dateOfCreation;
    }

    get comment(): string {
        return this._comment;
    }

    get reviewedUser(): User {
        return this._reviewedUser;
    }

    get reviewingUser(): User {
        return this._reviewingUser;
    }

    // setters
    set reviewingUser(reviewingUser: User) {
        this._reviewingUser = reviewingUser;
    }
}