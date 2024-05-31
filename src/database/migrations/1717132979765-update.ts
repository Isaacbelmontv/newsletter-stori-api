import { MigrationInterface, QueryRunner } from "typeorm";

export class Update1717132979765 implements MigrationInterface {
    name = 'Update1717132979765'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "newsletters" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "content" character varying(255) NOT NULL, "assets" bytea, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "PK_b63ff3417bbaa6c92061b9f6934" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subscribers" ("id" SERIAL NOT NULL, "email" character varying(255) NOT NULL, "active" boolean NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_cbe0a7a9256c826f403c0236b67" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "newsletters_delivery" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_03912fbe9a10ad0ae8848abeed8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "role" character varying(100) NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subscribers_deliveries" ("delivery_id" integer NOT NULL, "subscriber_id" integer NOT NULL, CONSTRAINT "PK_bd52b5a7575da931e8b5f189028" PRIMARY KEY ("delivery_id", "subscriber_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ffa113f7d1f78a1f4bef8fa458" ON "subscribers_deliveries" ("delivery_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_598329216311b35c19f4b4e9fc" ON "subscribers_deliveries" ("subscriber_id") `);
        await queryRunner.query(`CREATE TABLE "newsletters_deliveries" ("delivery_id" integer NOT NULL, "newsletter_id" integer NOT NULL, CONSTRAINT "PK_393f99d8caf6e75f8ad7a94e0b1" PRIMARY KEY ("delivery_id", "newsletter_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_327c3bcd133570de5c5c502729" ON "newsletters_deliveries" ("delivery_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_6ce464cdb315df21f123afa5ab" ON "newsletters_deliveries" ("newsletter_id") `);
        await queryRunner.query(`ALTER TABLE "newsletters" ADD CONSTRAINT "FK_c590ddb312db9ab1b861fe4e954" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "newsletters_delivery" ADD CONSTRAINT "FK_70b5cc17b9c34bc845b7f53bab9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subscribers_deliveries" ADD CONSTRAINT "FK_ffa113f7d1f78a1f4bef8fa458d" FOREIGN KEY ("delivery_id") REFERENCES "newsletters_delivery"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "subscribers_deliveries" ADD CONSTRAINT "FK_598329216311b35c19f4b4e9fc4" FOREIGN KEY ("subscriber_id") REFERENCES "subscribers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "newsletters_deliveries" ADD CONSTRAINT "FK_327c3bcd133570de5c5c5027290" FOREIGN KEY ("delivery_id") REFERENCES "newsletters_delivery"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "newsletters_deliveries" ADD CONSTRAINT "FK_6ce464cdb315df21f123afa5abf" FOREIGN KEY ("newsletter_id") REFERENCES "newsletters"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "newsletters_deliveries" DROP CONSTRAINT "FK_6ce464cdb315df21f123afa5abf"`);
        await queryRunner.query(`ALTER TABLE "newsletters_deliveries" DROP CONSTRAINT "FK_327c3bcd133570de5c5c5027290"`);
        await queryRunner.query(`ALTER TABLE "subscribers_deliveries" DROP CONSTRAINT "FK_598329216311b35c19f4b4e9fc4"`);
        await queryRunner.query(`ALTER TABLE "subscribers_deliveries" DROP CONSTRAINT "FK_ffa113f7d1f78a1f4bef8fa458d"`);
        await queryRunner.query(`ALTER TABLE "newsletters_delivery" DROP CONSTRAINT "FK_70b5cc17b9c34bc845b7f53bab9"`);
        await queryRunner.query(`ALTER TABLE "newsletters" DROP CONSTRAINT "FK_c590ddb312db9ab1b861fe4e954"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6ce464cdb315df21f123afa5ab"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_327c3bcd133570de5c5c502729"`);
        await queryRunner.query(`DROP TABLE "newsletters_deliveries"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_598329216311b35c19f4b4e9fc"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ffa113f7d1f78a1f4bef8fa458"`);
        await queryRunner.query(`DROP TABLE "subscribers_deliveries"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "newsletters_delivery"`);
        await queryRunner.query(`DROP TABLE "subscribers"`);
        await queryRunner.query(`DROP TABLE "newsletters"`);
    }

}
