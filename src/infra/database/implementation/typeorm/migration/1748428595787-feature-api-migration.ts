import type { MigrationInterface, QueryRunner } from 'typeorm';

export class _FeatureApiMigration1748428595787 implements MigrationInterface {
  public name = 'FeatureApiMigration1748428595787';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`customer\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(100) NOT NULL, \`email\` varchar(100) NOT NULL, \`federal_document\` varchar(255) NOT NULL, \`phone_number\` varchar(20) NOT NULL, \`password\` char(60) NOT NULL, \`profile_picture\` varchar(255) NULL, \`mfa_secret\` varchar(255) NULL, \`city\` varchar(255) NOT NULL, \`neighborhood\` varchar(255) NOT NULL, \`country_state\` varchar(255) NOT NULL, \`postal_code\` varchar(255) NOT NULL, \`address_number\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_fdb2f3ad8115da4c7718109a6e\` (\`email\`), UNIQUE INDEX \`IDX_86643f75d08d74510c3c850cda\` (\`federal_document\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_86643f75d08d74510c3c850cda\` ON \`customer\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_fdb2f3ad8115da4c7718109a6e\` ON \`customer\``,
    );
    await queryRunner.query(`DROP TABLE \`customer\``);
  }
}
