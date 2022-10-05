export interface IValidationErrorDetails {
    context: object;
    message: string;
    path: string[];
    type: string;
}

export interface IErrorResponse {
    isError: boolean;
    errorType: "firstName" | "lastName" | "password" | "emailAddress";
    message: string;
}
