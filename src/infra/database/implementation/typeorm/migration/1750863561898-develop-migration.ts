import { MigrationInterface, QueryRunner } from "typeorm";

export class DevelopMigration1750863561898 implements MigrationInterface {
    name = 'DevelopMigration1750863561898'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`application_paid_resource\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`resource\` enum ('ELOY_CHAT') NOT NULL, \`credit_cost\` int NOT NULL, \`description\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`customer_address\` ADD CONSTRAINT \`FK_1f5ed21a5f3390cdbafb6f22452\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`organization_member\` ADD CONSTRAINT \`FK_ce08825728e5afefdc6e682b8d7\` FOREIGN KEY (\`organization_id\`) REFERENCES \`organization\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`organization_member\` ADD CONSTRAINT \`FK_3f0d0a6437c3b29f3b3741c8a7f\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`available_payment_plan_enable_paid_resource\` ADD CONSTRAINT \`FK_84ce3f0db13edcf71f445b0b8a8\` FOREIGN KEY (\`application_paid_resource_id\`) REFERENCES \`application_paid_resource\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`available_payment_plan_enable_paid_resource\` ADD CONSTRAINT \`FK_1e36c44c501c6579ade2dfeccfe\` FOREIGN KEY (\`available_payment_plan_id\`) REFERENCES \`available_payment_plan\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`available_payment_plan_enable_paid_resource\` DROP FOREIGN KEY \`FK_1e36c44c501c6579ade2dfeccfe\``);
        await queryRunner.query(`ALTER TABLE \`available_payment_plan_enable_paid_resource\` DROP FOREIGN KEY \`FK_84ce3f0db13edcf71f445b0b8a8\``);
        await queryRunner.query(`ALTER TABLE \`organization_member\` DROP FOREIGN KEY \`FK_3f0d0a6437c3b29f3b3741c8a7f\``);
        await queryRunner.query(`ALTER TABLE \`organization_member\` DROP FOREIGN KEY \`FK_ce08825728e5afefdc6e682b8d7\``);
        await queryRunner.query(`ALTER TABLE \`customer_address\` DROP FOREIGN KEY \`FK_1f5ed21a5f3390cdbafb6f22452\``);
        await queryRunner.query(`DROP TABLE \`application_paid_resource\``);
    }

}
