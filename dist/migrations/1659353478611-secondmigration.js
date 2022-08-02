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
exports.secondmigration1659353478611 = void 0;
class secondmigration1659353478611 {
    constructor() {
        this.name = 'secondmigration1659353478611';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "department" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
            yield queryRunner.query(`ALTER TABLE "department" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
            yield queryRunner.query(`ALTER TABLE "department" ADD "deleted_at" TIMESTAMP`);
            yield queryRunner.query(`ALTER TABLE "employee" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
            yield queryRunner.query(`ALTER TABLE "employee" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
            yield queryRunner.query(`ALTER TABLE "employee" ADD "deleted_at" TIMESTAMP`);
            yield queryRunner.query(`ALTER TABLE "employee" ADD "department_id" uuid NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_d62835db8c0aec1d18a5a927549" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_d62835db8c0aec1d18a5a927549"`);
            yield queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "department_id"`);
            yield queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "deleted_at"`);
            yield queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "updated_at"`);
            yield queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "created_at"`);
            yield queryRunner.query(`ALTER TABLE "department" DROP COLUMN "deleted_at"`);
            yield queryRunner.query(`ALTER TABLE "department" DROP COLUMN "updated_at"`);
            yield queryRunner.query(`ALTER TABLE "department" DROP COLUMN "created_at"`);
        });
    }
}
exports.secondmigration1659353478611 = secondmigration1659353478611;
//# sourceMappingURL=1659353478611-secondmigration.js.map