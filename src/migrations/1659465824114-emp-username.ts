import {MigrationInterface, QueryRunner} from "typeorm";

export class empUsername1659465824114 implements MigrationInterface {
    name = 'empUsername1659465824114'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "username" character varying`);
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "username"`);
    }

}
