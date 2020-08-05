import {MigrationInterface, QueryRunner} from "typeorm";

export class gen1596628858348 implements MigrationInterface {
    name = 'gen1596628858348'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "varsta" TO "age"`, undefined);
        await queryRunner.query(`CREATE TABLE "company" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "city" character varying NOT NULL, CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "company"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "age" TO "varsta"`, undefined);
    }

}
