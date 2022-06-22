import { JsonProperty } from "json-object-mapper";
import { Category } from "./category";
import { DateSerializerDeserializer } from "./date-serializer-deserializer";
import { ServicePostImage } from "./service-post-image";
import { User } from "./user";

export class ServicePost { 

    @JsonProperty({ name: "idservicePost" })
    private _idservicePost: number;

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

    @JsonProperty({ name: "deleted" })
    private _deleted: boolean;

    @JsonProperty({ name: "appUser" })
    private _appUser: User;

    @JsonProperty({ name: "category" })
    private _category: Category;

    @JsonProperty({ name: "servicePostImages" })
    private _servicePostImages: ServicePostImage[];

    constructor(
        idservicePost: number, 
        appUserId: number,
        categoryId: number,
        active: boolean,
        title: string,
        comment: string,
        place: string,
        dateOfCreation: Date,
        deleted: boolean,
        appUser: User,
        category: Category,) {
            this._idservicePost = idservicePost;
            this._appUserId = appUserId;
            this._categoryId = categoryId;
            this._active = active;
            this._title = title;
            this._comment = comment;
            this._place = place;
            this._dateOfCreation = dateOfCreation;
            this._deleted = deleted;
            this._appUser = appUser;
            this._category = category;
            this._servicePostImages = new Array<ServicePostImage>();
    }

    // getters
    get idservicePost(): number {
        return this._idservicePost;
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

    get deleted(): boolean {
        return this._deleted;
    }

    get appUser(): User {
        return this._appUser;
    }

    get category(): Category {
        return this._category;
    }

    get servicePostImages(): ServicePostImage[] {
        return this._servicePostImages;
    }


    // setters
    set idservicePost(idservicePost: number) {
        this._idservicePost = idservicePost;
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

    set deleted(deleted: boolean) {
        this._deleted = deleted;
    }

    set appUser(appUser: User) {
        this._appUser = appUser;
    }

    set category(category: Category) {
        this._category = category;
    }

    set servicePostImages(servicePostImages: ServicePostImage[]) {
        this._servicePostImages = servicePostImages;
    }
}