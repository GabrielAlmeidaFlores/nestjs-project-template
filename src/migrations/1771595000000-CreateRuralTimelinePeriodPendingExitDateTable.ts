import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRuralTimelinePeriodPendingExitDateTable1771595000000 implements MigrationInterface {
  name = 'CreateRuralTimelinePeriodPendingExitDateTable1771595000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`rural_timeline_period_pending_exit_date\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`pending_date\` date NOT NULL, \`pending_amount\` decimal(10,2) NOT NULL, \`rural_timeline_cnis_contribution_period_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_timeline_period_pending_exit_date\` ADD CONSTRAINT \`FK_pending_exit_date_cnis_contribution_period\` FOREIGN KEY (\`rural_timeline_cnis_contribution_period_id\`) REFERENCES \`rural_timeline_cnis_contribution_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`rural_timeline_period_pending_exit_date\` DROP FOREIGN KEY \`FK_pending_exit_date_cnis_contribution_period\``,
    );
    await queryRunner.query(
      `DROP TABLE \`rural_timeline_period_pending_exit_date\``,
    );
  }
}
