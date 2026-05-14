import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnShouldConsiderLastRemunerationAsExitDateInGeneralUrbanRetDenialPeriod1778797216499 implements MigrationInterface {
    name = 'AddColumnShouldConsiderLastRemunerationAsExitDateInGeneralUrbanRetDenialPeriod1778797216499'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`general_urban_retirement_denial_period\` ADD \`should_consider_last_remuneration_as_exit_date\` tinyint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`general_urban_retirement_denial_period\` DROP COLUMN \`should_consider_last_remuneration_as_exit_date\``);
    }

}
