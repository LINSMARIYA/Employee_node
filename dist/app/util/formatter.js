"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Formatter = void 0;
class Formatter {
    constructor() {
        this.formatResponse = (result, time, message, total) => {
            let numRecords = 0;
            let errors = null;
            let data = null;
            if (result && result instanceof Array) {
                numRecords = result.length;
                data = result;
            }
            else if (result && result instanceof Error) {
                errors = result;
            }
            else if (result || result === 0) {
                numRecords = 1;
                data = result;
            }
            const response = {
                data,
                errors,
                message: message ? message : null,
                meta: {
                    length: numRecords,
                    took: time,
                    total: total ? total : numRecords,
                },
            };
            return response;
        };
    }
}
exports.Formatter = Formatter;
//# sourceMappingURL=formatter.js.map