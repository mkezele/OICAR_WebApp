import { JsonProperty } from "json-object-mapper";
import { ChatMessage } from "./chat-message";
import { ProjectPost } from "./project-post";
import { Report } from "./report";
import { Review } from "./review";
import { ServicePost } from "./service-post";
import { Suspension } from "./suspension";

export class User {  
    @JsonProperty({ name: "idappUser" })
    private _idAppUser: number;

    @JsonProperty({ name: "firstName" })
    private _firstName: string;

    @JsonProperty({ name: "lastName" })
    private _lastName: string;

    @JsonProperty({ name: "email" })
    private _email: string;

    @JsonProperty({ name: "passwordHash" })
    private _passwordHash: string;

    @JsonProperty({ name: "salt" })
    private _salt: string;

    @JsonProperty({ name: "deleted" })
    private _deleted: boolean;

    @JsonProperty({ name: "chatMessageReceivingUsers" })
    private _chatMessageReceivingUsers: ChatMessage[];

    @JsonProperty({ name: "chatMessageSendingUsers" })
    private _chatMessageSendingUsers: ChatMessage[];

    @JsonProperty({ name: "projectPosts" })
    private _projectPosts: ProjectPost[];

    @JsonProperty({ name: "reportReportedUsers" })
    private _reportReportedUsers: Report[];

    @JsonProperty({ name: "reportReportingUsers" })
    private _reportReportingUsers: Report[];

    @JsonProperty({ name: "reviewReviewedUsers" })
    private _reviewReviewedUsers: Review[];

    @JsonProperty({ name: "reviewReviewingUsers" })
    private _reviewReviewingUsers: Review[];

    @JsonProperty({ name: "servicePosts" })
    private _servicePosts: ServicePost[];

    @JsonProperty({ name: "suspensions" })
    private _suspensions: Suspension[];

    constructor(
        idAppUser: number, 
        firstName: string, 
        lastName: string,
        email: string,
        passwordHash: string,
        salt: string,
        deleted: boolean,
        chatMessageReceivingUsers: ChatMessage[],
        chatMessageSendingUsers: ChatMessage[],
        projectPosts: ProjectPost[],
        reportReportedUsers: Report[],
        reportReportingUsers: Report[],
        reviewReviewedUsers: Review[],
        reviewReviewingUsers: Review[],
        servicePosts: ServicePost[],
        suspensions: Suspension[]) {
            this._idAppUser = idAppUser;
            this._firstName = firstName;
            this._lastName = lastName;
            this._email = email;
            this._passwordHash = passwordHash;
            this._salt = salt;
            this._deleted = deleted;
            this._chatMessageReceivingUsers = chatMessageReceivingUsers;
            this._chatMessageSendingUsers = chatMessageSendingUsers;
            this._projectPosts = projectPosts;
            this._reportReportedUsers = reportReportedUsers;
            this._reportReportingUsers = reportReportingUsers;
            this._reviewReviewedUsers = reviewReviewedUsers;
            this._reviewReviewingUsers = reviewReviewingUsers;
            this._servicePosts = servicePosts;
            this._suspensions = suspensions;
    }
      
    // getters
    get idAppUser(): number {
        return this._idAppUser;
    }

    get firstName(): string {
    return this._firstName;
    }

    get lastName(): string {
    return this._lastName;
    }

    get email(): string {
    return this._email;
    }

    get passwordHash(): string {
    return this._passwordHash;
    }

    get salt(): string{
    return this._salt;
    }

    get deleted(): boolean{
    return this._deleted;
    }

    get chatMessageReceivingUsers(): ChatMessage[]{
    return this._chatMessageReceivingUsers;
    }

    get chatMessageSendingUsers(): ChatMessage[]{
    return this._chatMessageSendingUsers;
    }

    get projectPosts(): ProjectPost[]{
    return this._projectPosts;
    }

    get reportReportedUsers(): Report[]{
    return this._reportReportedUsers;
    }

    get reportReportingUsers(): Report[]{
    return this._reportReportingUsers;
    }

    get reviewReviewedUsers(): Review[]{
    return this._reviewReviewedUsers;
    }

    get reviewReviewingUsers(): Review[]{
    return this._reviewReviewingUsers;
    }

    get servicePosts(): ServicePost[]{
    return this._servicePosts;
    }

    get suspensions(): Suspension[]{
    return this._suspensions;
    }

    // setters
    set firstName(firstName: string) {
    this._firstName = firstName;
    }

    set lastName(lastName: string) {
    this._lastName = lastName;
    }
}