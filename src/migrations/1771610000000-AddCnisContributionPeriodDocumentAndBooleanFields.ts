import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCnisContributionPeriodDocumentAndBooleanFields1771610000000 implements MigrationInterface {
  name = 'AddCnisContributionPeriodDocumentAndBooleanFields1771610000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`rural_timeline_cnis_contribution_period\` ADD \`should_consider_period\` tinyint NOT NULL DEFAULT 1`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_timeline_cnis_contribution_period\` ADD \`should_consider_last_remuneration_as_exit_date\` tinyint NOT NULL DEFAULT 0`,
    );
    await queryRunner.query(
      `CREATE TABLE \`rural_timeline_cnis_contribution_period_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`type\` varchar(255) NOT NULL, \`document\` varchar(500) NOT NULL, \`rural_timeline_cnis_contribution_period_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_timeline_cnis_contribution_period_document\` ADD CONSTRAINT \`FK_cnis_contribution_period_document_period\` FOREIGN KEY (\`rural_timeline_cnis_contribution_period_id\`) REFERENCES \`rural_timeline_cnis_contribution_period\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`rural_timeline_cnis_contribution_period_document\` DROP FOREIGN KEY \`FK_cnis_contribution_period_document_period\``,
    );
    await queryRunner.query(
      `DROP TABLE \`rural_timeline_cnis_contribution_period_document\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_timeline_cnis_contribution_period\` DROP COLUMN \`should_consider_last_remuneration_as_exit_date\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_timeline_cnis_contribution_period\` DROP COLUMN \`should_consider_period\``,
    );
  }
}
