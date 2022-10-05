import {
    IErrorResponse,
    IValidationErrorDetails,
} from "../@types/IValidationErrorDetails";

// Processes an error sent by the JOI signup validator
// Takes a JOI validationError array, defined by the JOI error response as "details"
// Returns a new array errorResponse, that signals the signup page what error types and messages it needs.
export default function displayValidationErrors(
    errorDetails: IValidationErrorDetails[]
) {
    const errorResponse: IErrorResponse[] = [];

    // if there are no errors, JOI returns error as undefined, no need to process.
    if (errorDetails !== undefined) {
        // console.log(errorDetails);

        // loops through the JOI array, pushes each new error object into our errorResponse
        errorDetails.forEach((error) => {
            if (error.path[0] === "emailAddress") {
                errorResponse.push({
                    isError: true,
                    errorType: "emailAddress",
                    message: error.message,
                });
            } else if (error.path[0] === "password") {
                errorResponse.push({
                    isError: true,
                    errorType: "password",
                    message: error.message,
                });
            } else if (error.path[0] === "lastName") {
                errorResponse.push({
                    isError: true,
                    errorType: "lastName",
                    message: error.message,
                });
            } else if (error.path[0] === "firstName") {
                errorResponse.push({
                    isError: true,
                    errorType: "firstName",
                    message: error.message,
                });
            }
        });
    }
    return errorResponse;
}
