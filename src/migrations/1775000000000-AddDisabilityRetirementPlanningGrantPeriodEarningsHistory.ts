import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDisabilityRetirementPlanningGrantPeriodEarningsHistory1775000000000
  implements MigrationInterface
{
  name =
    'AddDisabilityRetirementPlanningGrantPeriodEarningsHistory1775000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`disability_retirement_planning_grant_period_earnings_history\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`competence\` date NULL, \`remuneration\` longtext NULL, \`indicators\` varchar(255) NULL, \`payment_date\` date NULL, \`contribution\` varchar(255) NULL, \`contribution_salary\` varchar(255) NULL, \`analysis\` longtext NULL, \`competence_below_the_minimum\` tinyint NULL, \`disability_retirement_planning_grant_period_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_grant_period_earnings_history\` ADD CONSTRAINT \`FK_drpg_period_earnings_history_period\` FOREIGN KEY (\`disability_retirement_planning_grant_period_id\`) REFERENCES \`disability_retirement_planning_grant_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`disability_retirement_planning_grant_period_earnings_history\` DROP FOREIGN KEY \`FK_drpg_period_earnings_history_period\``,
    );

    await queryRunner.query(
      `DROP TABLE \`disability_retirement_planning_grant_period_earnings_history\``,
    );
  }
}
