export class GlobalConstants {

    public static appTitle: string = "TeamUp";
    
    // api endpoints
    private static scheme = 'http://';
    private static host = 'localhost:';
    // change port if needed
    private static port = '5131';

    private static usersFilename = '/User';
    private static authFilename = '/Auth';

    public static urlBase = `${ this.scheme }${ this.host }${ this.port }`;
    
    public static usersUrl = `${ this.urlBase }${ this.usersFilename }`;
    public static authUrl = `${ this.urlBase }${ this.authFilename }`;

    // local storage keys
    public static userId = 'userId';

}