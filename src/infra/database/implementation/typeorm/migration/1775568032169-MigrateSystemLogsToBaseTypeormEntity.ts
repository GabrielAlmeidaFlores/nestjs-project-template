import type { MigrationInterface, QueryRunner } from 'typeorm';

export class MigrateSystemLogsToBaseTypeormEntity1775568032169 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`system_logs\` CHANGE \`data\` \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );

    await queryRunner.query(
      `ALTER TABLE \`system_logs\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );

    await queryRunner.query(
      `ALTER TABLE \`system_logs\` ADD \`deleted_at\` datetime(6) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`system_logs\` DROP COLUMN \`deleted_at\``,
    );

    await queryRunner.query(
      `ALTER TABLE \`system_logs\` DROP COLUMN \`updated_at\``,
    );

    await queryRunner.query(
      `ALTER TABLE \`system_logs\` CHANGE \`created_at\` \`data\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
  }
}
