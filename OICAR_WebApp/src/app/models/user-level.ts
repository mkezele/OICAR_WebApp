import { JsonProperty } from "json-object-mapper";

export class UserLevel {
    @JsonProperty({ name: "iduserLevel" })
    private _iduserLevel: number;

    @JsonProperty({ name: "title" })
    private _title: string;

    constructor(
        iduserLevel: number, 
        title: string,) {
            this._iduserLevel = iduserLevel;
            this._title = title;
    }

    // getters
    get iduserLevel(): number {
        return this._iduserLevel;
    }

    get title(): string {
        return this._title;
    }

    // setters
    set iduserLevel(iduserLevel: number) {
        this._iduserLevel = iduserLevel;
    }

    set title(title: string) {
        this._title = title;
    }

}