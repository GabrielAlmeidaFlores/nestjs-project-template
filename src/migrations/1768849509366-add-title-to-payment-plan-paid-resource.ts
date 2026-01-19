import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTitleToPaymentPlanPaidResource1768849509366 implements MigrationInterface {
    name = 'AddTitleToPaymentPlanPaidResource1768849509366'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`payment_plan_paid_resource\` ADD \`title\` varchar(100) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`payment_plan_paid_resource\` DROP COLUMN \`title\``);
    }

}
