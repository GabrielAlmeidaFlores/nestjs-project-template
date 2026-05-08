import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBelowTheMinimumAndLeaveDateAndDocumentToSpecialRetirementGrantPeriod1778261653852 implements MigrationInterface {
    name = 'AddBelowTheMinimumAndLeaveDateAndDocumentToSpecialRetirementGrantPeriod1778261653852'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_d7043a5efeae6804ab0199241d\` ON \`accident_assistance_grant\``);
        await queryRunner.query(`CREATE TABLE \`special_retirement_grant_period_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`type\` varchar(50) NOT NULL, \`document\` varchar(255) NOT NULL, \`special_retirement_grant_period_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`special_retirement_grant_period\` ADD \`below_the_minimum\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`special_retirement_grant_period\` ADD \`leave_date\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`special_retirement_grant_period_document\` ADD CONSTRAINT \`FK_460a8ee5d984b9eb0e8ef3c2bdc\` FOREIGN KEY (\`special_retirement_grant_period_id\`) REFERENCES \`special_retirement_grant_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`special_retirement_grant_period_document\` DROP FOREIGN KEY \`FK_460a8ee5d984b9eb0e8ef3c2bdc\``);
        await queryRunner.query(`ALTER TABLE \`special_retirement_grant_period\` DROP COLUMN \`leave_date\``);
        await queryRunner.query(`ALTER TABLE \`special_retirement_grant_period\` DROP COLUMN \`below_the_minimum\``);
        await queryRunner.query(`DROP TABLE \`special_retirement_grant_period_document\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_d7043a5efeae6804ab0199241d\` ON \`accident_assistance_grant\` (\`accident_assistance_grant_result_id\`)`);
    }

}
