import { MigrationInterface, QueryRunner } from "typeorm";

export class IncreasePromptMaxLength1768516343069 implements MigrationInterface {
    name = 'IncreasePromptMaxLength1768516343069'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`payment_plan_paid_resource_ia_config\` DROP COLUMN \`prompt\``);
        await queryRunner.query(`ALTER TABLE \`payment_plan_paid_resource_ia_config\` ADD \`prompt\` longtext NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`payment_plan_paid_resource_ia_config\` DROP COLUMN \`prompt\``);
        await queryRunner.query(`ALTER TABLE \`payment_plan_paid_resource_ia_config\` ADD \`prompt\` text NOT NULL`);
    }

}
