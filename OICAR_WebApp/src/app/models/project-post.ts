import { JsonProperty } from "json-object-mapper";
import { Category } from "./category";
import { DateSerializerDeserializer } from "./date-serializer-deserializer";
import { User } from "./user";

export class ProjectPost { 

    @JsonProperty({ name: "idprojectPost" })
    private _idprojectPost: number | undefined;

    @JsonProperty({ name: "appUserId" })
    private _appUserId: number;

    @JsonProperty({ name: "categoryId" })
    private _categoryId: number;

    @JsonProperty({ name: "active" })
    private _active: boolean;

    @JsonProperty({ name: "title" })
    private _title: string;

    @JsonProperty({ name: "comment" })
    private _comment: string;

    @JsonProperty({ name: "place" })
    private _place: string;
    
    @JsonProperty({ name: "dateOfCreation", type: Date, serializer: DateSerializerDeserializer, deserializer: DateSerializerDeserializer })
    private _dateOfCreation: Date;

    @JsonProperty({ name: "durationInMonths" })
    private _durationInMonths: number;

    @JsonProperty({ name: "numberOfTeammates" })
    private _numberOfTeammates: number;

    @JsonProperty({ name: "deleted" })
    private _deleted: boolean;

    @JsonProperty({ name: "appUser" })
    private _appUser: User;

    @JsonProperty({ name: "category" })
    private _category: Category;

    constructor(
        appUserId: number,
        categoryId: number,
        active: boolean,
        title: string,
        comment: string,
        place: string,
        dateOfCreation: Date,
        durationInMonths: number,
        numberOfTeammates: number,
        deleted: boolean,
        appUser: User,
        category: Category) {
            this._appUserId = appUserId;
            this._categoryId = categoryId;
            this._active = active;
            this._title = title;
            this._comment = comment;
            this._place = place;
            this._dateOfCreation = dateOfCreation;
            this._durationInMonths = durationInMonths;
            this._numberOfTeammates = numberOfTeammates;
            this._deleted = deleted;
            this._appUser = appUser;
            this._category = category;
    }


    // constructor(
    //     idprojectPost: number, 
    //     appUserId: number,
    //     categoryId: number,
    //     active: boolean,
    //     title: string,
    //     comment: string,
    //     place: string,
    //     dateOfCreation: Date,
    //     durationInMonths: number,
    //     numberOfTeammates: number,
    //     deleted: boolean,
    //     appUser: User,
    //     category: Category) {
    //         this._idprojectPost = idprojectPost;
    //         this._appUserId = appUserId;
    //         this._categoryId = categoryId;
    //         this._active = active;
    //         this._title = title;
    //         this._comment = comment;
    //         this._place = place;
    //         this._dateOfCreation = dateOfCreation;
    //         this._durationInMonths = durationInMonths;
    //         this._numberOfTeammates = numberOfTeammates;
    //         this._deleted = deleted;
    //         this._appUser = appUser;
    //         this._category = category;
    // }

    // getters
    get idprojectPost(): number | undefined {
        return this._idprojectPost;
    }
    
    get appUserId(): number {
        return this._appUserId;
    }

    get categoryId(): number {
        return this._categoryId;
    }

    get active(): boolean {
        return this._active;
    }

    get title(): string {
        return this._title;
    }

    get comment(): string {
        return this._comment;
    }

    get place(): string {
        return this._place;
    }

    get dateOfCreation(): Date {
        return this._dateOfCreation;
    }
    
    get durationInMonths(): number {
        return this._durationInMonths;
    }

    get numberOfTeammates(): number {
        return this._numberOfTeammates;
    }

    get deleted(): boolean {
        return this._deleted;
    }

    get appUser(): User {
        return this._appUser;
    }

    get category(): Category {
        return this._category;
    }

    // setters
    set idprojectPost(idprojectPost: number | undefined) {
        this._idprojectPost = idprojectPost;
    }
    
    set appUserId(appUserId: number) {
        this._appUserId = appUserId;
    }

    set categoryId(categoryId: number) {
        this._categoryId = categoryId;
    }

    set active(active: boolean) {
        this._active = active;
    }

    set title(title: string) {
        this._title = title;
    }

    set comment(comment: string) {
        this._comment = comment;
    }

    set place(place: string) {
        this._place = place;
    }

    set dateOfCreation(dateOfCreation: Date) {
        this._dateOfCreation = dateOfCreation;
    }
    
    set durationInMonths(durationInMonths: number) {
        this._durationInMonths = durationInMonths;
    }

    set numberOfTeammates(numberOfTeammates: number) {
        this._numberOfTeammates = numberOfTeammates;
    }

    set deleted(deleted: boolean) {
        this._deleted = deleted;
    }

    set appUser(appUser: User) {
        this._appUser = appUser;
    }

    set category(category: Category) {
        this._category = category;
    }

}