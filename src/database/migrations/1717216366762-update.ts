import { MigrationInterface, QueryRunner } from "typeorm";

export class Update1717216366762 implements MigrationInterface {
    name = 'Update1717216366762'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "newsletters_delivery" DROP CONSTRAINT "FK_a82fda8762e5440df447fd31eb9"`);
        await queryRunner.query(`ALTER TABLE "newsletters_delivery" RENAME COLUMN "newsletterId" TO "newslettersId"`);
        await queryRunner.query(`ALTER TABLE "newsletters_delivery" ADD CONSTRAINT "FK_132e7ce42ddcc4628893d77ae83" FOREIGN KEY ("newslettersId") REFERENCES "newsletters"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "newsletters_delivery" DROP CONSTRAINT "FK_132e7ce42ddcc4628893d77ae83"`);
        await queryRunner.query(`ALTER TABLE "newsletters_delivery" RENAME COLUMN "newslettersId" TO "newsletterId"`);
        await queryRunner.query(`ALTER TABLE "newsletters_delivery" ADD CONSTRAINT "FK_a82fda8762e5440df447fd31eb9" FOREIGN KEY ("newsletterId") REFERENCES "newsletters"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
