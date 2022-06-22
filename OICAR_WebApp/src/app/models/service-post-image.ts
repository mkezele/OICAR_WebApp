import { JsonProperty } from "json-object-mapper";

export class ServicePostImage {

    @JsonProperty({ name: "idservicePostImage" })
    private _idservicePostImage: number;

    @JsonProperty({ name: "servicePostId" })
    private _servicePostId: number;

    @JsonProperty({ name: "picture" })
    private _picture: string | ArrayBuffer | null;

    constructor(
        idservicePostImage: number, 
        servicePostId: number, 
        picture: string | ArrayBuffer | null,) {
            this._idservicePostImage = idservicePostImage;
            this._servicePostId = servicePostId;
            this._picture = picture;
    }

    // getters
    get idservicePostImage(): number {
        return this._idservicePostImage;
    }

    get servicePostId(): number {
        return this._servicePostId;
    }

    get picture(): string | ArrayBuffer | null {
        return this._picture;
    }
}
