import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRuralTimelineAnalysisCnisContributionPeriodAdjustment1771710000000
  implements MigrationInterface
{
  name =
    'AddRuralTimelineAnalysisCnisContributionPeriodAdjustment1771710000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`rural_timeline_cnis_contribution_period_adjustment\` (
        \`id\` varchar(36) NOT NULL,
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        \`deleted_at\` datetime(6) NULL,
        \`technical_observation\` text NOT NULL,
        \`contribution_time_gained_years\` int NOT NULL,
        \`contribution_time_gained_months\` int NOT NULL,
        \`contribution_time_gained_days\` int NOT NULL,
        \`conventional_period_start_date\` date NOT NULL,
        \`conventional_period_end_date\` date NOT NULL,
        \`rural_timeline_cnis_contribution_period_id\` varchar(36) NULL,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_timeline_cnis_contribution_period_adjustment\`
        ADD CONSTRAINT \`FK_rtccp_adjustment_period\`
        FOREIGN KEY (\`rural_timeline_cnis_contribution_period_id\`)
        REFERENCES \`rural_timeline_cnis_contribution_period\`(\`id\`)
        ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`rural_timeline_cnis_contribution_period_adjustment\`
        DROP FOREIGN KEY \`FK_rtccp_adjustment_period\``,
    );
    await queryRunner.query(
      `DROP TABLE \`rural_timeline_cnis_contribution_period_adjustment\``,
    );
  }
}
