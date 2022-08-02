export default interface ApiResponse {
    data?: any;
    meta?: {
        [key: string]: any;
    };
    errors?: Error;
    message?: string;
}
