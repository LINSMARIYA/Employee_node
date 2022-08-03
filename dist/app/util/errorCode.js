"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCodes = void 0;
exports.ErrorCodes = {
    UNAUTHORIZED: {
        CODE: "UNAUTHORIZED",
        MESSAGE: "User is not allowed to perform this operation",
    },
    EMPLOYEE_NOT_FOUND: {
        CODE: "EMPLOYEE_NOT_FOUND",
        MESSAGE: "Employee not found",
    },
    EMPLOYEE_WITH_ID_NOT_FOUND: {
        CODE: "EMPLOYEE_WITH_ID_NOT_FOUND",
        MESSAGE: "Employee with given id not found",
    },
    DEPARTMENT_NOT_FOUND: {
        CODE: "DEPARTMENT_NOT_FOUND",
        MESSAGE: "Department  not found",
    },
    DEPARTMENT_WITH_ID_NOT_FOUND: {
        CODE: "DEPARTMENT_WITH_ID_NOT_FOUND",
        MESSAGE: "Department with given id not found",
    },
    VALIDATION_ERROR: {
        CODE: "VALIDATION_ERROR",
        MESSAGE: "Validation failed error",
    },
    INCORECT_USERNAME_PASSWORD_ERROR: {
        CODE: "INCORRECT_USERNAME_AND_PASSWORD_ERROR",
        MESSAGE: "Username or Password wrong",
    }
};
//# sourceMappingURL=errorCode.js.map