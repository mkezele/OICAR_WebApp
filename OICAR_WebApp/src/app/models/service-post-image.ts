import { JsonProperty } from "json-object-mapper";
import { ServicePost } from "./service-post";

export class ServicePostImage {
    @JsonProperty({ name: "idservicePostImage" })
    private _idservicePostImage: number;

    @JsonProperty({ name: "servicePostId" })
    private _servicePostId: number;

    @JsonProperty({ name: "filePath" })
    private _filePath: string;

    @JsonProperty({ name: "servicePost" })
    private _servicePost: ServicePost;

    constructor(
        idservicePostImage: number, 
        servicePostId: number, 
        filePath: string,
        servicePost: ServicePost,) {
            this._idservicePostImage = idservicePostImage;
            this._servicePostId = servicePostId;
            this._filePath = filePath;
            this._servicePost = servicePost;
    }

    // getters
    get idservicePostImage(): number {
        return this._idservicePostImage;
    }

    get servicePostId(): number {
        return this._servicePostId;
    }

    get filePath(): string {
        return this._filePath;
    }

    get servicePost(): ServicePost {
        return this._servicePost;
    }
}
