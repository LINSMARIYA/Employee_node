"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.thirdMigration1659418393942 = void 0;
class thirdMigration1659418393942 {
    constructor() {
        this.name = 'thirdMigration1659418393942';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "employee" ADD "role" character varying NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "employee" ADD "status" character varying NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "employee" ADD "experience" character varying NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "employee" ADD "doj" character varying NOT NULL`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "doj"`);
            yield queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "experience"`);
            yield queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "status"`);
            yield queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "role"`);
        });
    }
}
exports.thirdMigration1659418393942 = thirdMigration1659418393942;
//# sourceMappingURL=1659418393942-third-migration.js.map