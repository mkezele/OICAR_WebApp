import { JsonProperty } from "json-object-mapper";
import { ProjectPost } from "./project-post";
import { ServicePost } from "./service-post";

export class Category {

    @JsonProperty({ name: "idcategory" })
    private _idcategory: number;

    @JsonProperty({ name: "title" })
    private _title: string;

    @JsonProperty({ name: "projectPosts" })
    private _projectPosts: ProjectPost[];

    @JsonProperty({ name: "servicePosts" })
    private _servicePosts: ServicePost[];

    constructor(
        idcategory: number, 
        title: string, 
        projectPosts: ProjectPost[],
        servicePosts: ServicePost[]) {
            this._idcategory = idcategory;
            this._title = title;
            this._projectPosts = projectPosts;
            this._servicePosts = servicePosts;
    }

    // getters
    get idcategory(): number {
        return this._idcategory;
    }

    get title(): string {
        return this._title;
    }

    get projectPosts(): ProjectPost[] {
        return this._projectPosts;
    }

    get servicePosts(): ServicePost[]{
        return this._servicePosts;
    }

    // setters
    set idcategory(idcategory: number) {
        this._idcategory = idcategory;
    }

}