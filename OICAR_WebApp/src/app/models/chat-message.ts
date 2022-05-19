import { User } from "./user";

export class ChatMessage {
    private _idChatMessage: number;
    private _sendingUserId: number;
    private _receivingUserId: number;
    private _sentDateTime: string;
    private _content: string;
    private _receivingUser: User;
    private _sendingUser: User;

    constructor(
        idChatMessage: number, 
        sendingUserId: number,
        receivingUserId: number,
        sentDateTime: string,
        content: string,
        receivingUser: User,
        sendingUser: User,){
            this._idChatMessage = idChatMessage;
            this._sendingUserId = sendingUserId;
            this._receivingUserId = receivingUserId;
            this._sentDateTime = sentDateTime;
            this._content = content;
            this._sendingUser = sendingUser;
            this._receivingUser = receivingUser;

    }

    // getters
    get idChatMessage(): number {
        return this._idChatMessage;
    }

    get sendingUserId(): number {
        return this._sendingUserId;
    }
    
    get receivingUserId(): number {
        return this._receivingUserId;
    }

    get sentDateTime(): string {
        return this._sentDateTime;
    }

    get content(): string{
        return this._content;
    }

    get receivingUser(): User{
        return this._receivingUser;
    }

    get sendingUser(): User{
        return this._sendingUser;
    }
}