import { MigrationInterface, QueryRunner } from "typeorm";

export class Update1717783740820 implements MigrationInterface {
    name = 'Update1717783740820'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "role" character varying(100) NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "newsletters_delivery" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" integer, "subscriberId" integer, "newslettersId" integer, CONSTRAINT "PK_03912fbe9a10ad0ae8848abeed8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "newsletters" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "content" character varying(255) NOT NULL, "assetFile" bytea, "assetType" character varying, "assetName" character varying, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "PK_b63ff3417bbaa6c92061b9f6934" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subscribers" ("id" SERIAL NOT NULL, "email" character varying(255) NOT NULL, "active" boolean NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "newsletters_id" integer, CONSTRAINT "PK_cbe0a7a9256c826f403c0236b67" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "newsletters_delivery" ADD CONSTRAINT "FK_70b5cc17b9c34bc845b7f53bab9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "newsletters_delivery" ADD CONSTRAINT "FK_8dde016a271294e31619a388aaf" FOREIGN KEY ("subscriberId") REFERENCES "subscribers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "newsletters_delivery" ADD CONSTRAINT "FK_132e7ce42ddcc4628893d77ae83" FOREIGN KEY ("newslettersId") REFERENCES "newsletters"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "newsletters" ADD CONSTRAINT "FK_c590ddb312db9ab1b861fe4e954" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subscribers" ADD CONSTRAINT "FK_ca85dda3e016a7c72f23a4e0e9a" FOREIGN KEY ("newsletters_id") REFERENCES "newsletters"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscribers" DROP CONSTRAINT "FK_ca85dda3e016a7c72f23a4e0e9a"`);
        await queryRunner.query(`ALTER TABLE "newsletters" DROP CONSTRAINT "FK_c590ddb312db9ab1b861fe4e954"`);
        await queryRunner.query(`ALTER TABLE "newsletters_delivery" DROP CONSTRAINT "FK_132e7ce42ddcc4628893d77ae83"`);
        await queryRunner.query(`ALTER TABLE "newsletters_delivery" DROP CONSTRAINT "FK_8dde016a271294e31619a388aaf"`);
        await queryRunner.query(`ALTER TABLE "newsletters_delivery" DROP CONSTRAINT "FK_70b5cc17b9c34bc845b7f53bab9"`);
        await queryRunner.query(`DROP TABLE "subscribers"`);
        await queryRunner.query(`DROP TABLE "newsletters"`);
        await queryRunner.query(`DROP TABLE "newsletters_delivery"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
