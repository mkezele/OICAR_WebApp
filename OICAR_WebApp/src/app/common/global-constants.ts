export class GlobalConstants {

    public static appTitle: string = "TeamUp";
    
    // api endpoints
    private static scheme = 'http://';
    private static host = 'localhost:';
    // change port if needed
    private static port = '5131';

    private static usersFileName = '/User';
    private static authFileName = '/Auth';
    private static categoriesFileName = '/Category';
    private static servicePostsFileName = '/ServicePost';
    private static projectPostsFileName = '/ProjectPost';
    private static profileFileName = '/Profile';
    private static usersPostsFileName = '/UsersPosts';
    private static reportReasonsFileName = '/ReportReason';
    private static reportsFileName = '/Report';
    private static reviewsFileName = '/Review';    

    public static urlBase = `${ this.scheme }${ this.host }${ this.port }`;
    
    public static usersUrl = `${ this.urlBase }${ this.usersFileName }`;
    public static authUrl = `${ this.urlBase }${ this.authFileName }`;
    public static categoriesUrl = `${ this.urlBase }${ this.categoriesFileName }`;
    public static servicePostsUrl = `${ this.urlBase }${ this.servicePostsFileName }`;
    public static projectPostsUrl = `${ this.urlBase }${ this.projectPostsFileName }`;
    public static profileUserPostsUrl = `${ this.urlBase }${ this.profileFileName }${ this.usersPostsFileName }`;
    public static reportReasonsUrl = `${ this.urlBase }${ this.reportReasonsFileName }`;
    public static reportsUrl = `${ this.urlBase }${ this.reportsFileName }`;
    public static reviewsUrl = `${ this.urlBase }${ this.reviewsFileName }`;

    // local storage keys
    public static userId = 'userId';

}