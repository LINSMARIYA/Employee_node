"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_ROLES = void 0;
const APP_CONSTANTS = {
    apiPrefix: "/api",
    params: "params",
    query: "query",
    body: "body",
    authorizationHeader: "Authorization",
    bearer: "Bearer",
    basePath: `http://localhost:${process.env.PORT}`,
    service: "employee-app"
};
exports.USER_ROLES = {
    admin: "admin",
    developer: "developer",
    manager: "manager",
    engineer: "engineer",
    guest: "guest"
};
exports.default = APP_CONSTANTS;
//# sourceMappingURL=index.js.map