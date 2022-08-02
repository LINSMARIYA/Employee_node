import {MigrationInterface, QueryRunner} from "typeorm";

export class addingEmpPassword1659423129049 implements MigrationInterface {
    name = 'addingEmpPassword1659423129049'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "password" character varying NOT NULL DEFAULT 'password'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "password"`);
    }

}
