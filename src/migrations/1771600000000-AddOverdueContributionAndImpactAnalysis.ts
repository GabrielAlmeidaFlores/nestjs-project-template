import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOverdueContributionAndImpactAnalysis1771600000000 implements MigrationInterface {
  name = 'AddOverdueContributionAndImpactAnalysis1771600000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`rural_timeline_cnis_contribution_period\` ADD \`impact_analysis\` text NULL`,
    );
    await queryRunner.query(
      `CREATE TABLE \`rural_timeline_cnis_contribution_period_overdue_contribution\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`overdue_date\` date NOT NULL, \`payment_date\` date NULL, \`rural_timeline_cnis_contribution_period_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_timeline_cnis_contribution_period_overdue_contribution\` ADD CONSTRAINT \`FK_overdue_contribution_cnis_contribution_period\` FOREIGN KEY (\`rural_timeline_cnis_contribution_period_id\`) REFERENCES \`rural_timeline_cnis_contribution_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`rural_timeline_cnis_contribution_period_overdue_contribution\` DROP FOREIGN KEY \`FK_overdue_contribution_cnis_contribution_period\``,
    );
    await queryRunner.query(
      `DROP TABLE \`rural_timeline_cnis_contribution_period_overdue_contribution\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_timeline_cnis_contribution_period\` DROP COLUMN \`impact_analysis\``,
    );
  }
}
