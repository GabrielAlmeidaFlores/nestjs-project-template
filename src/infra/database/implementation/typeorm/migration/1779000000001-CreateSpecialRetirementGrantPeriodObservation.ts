import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSpecialRetirementGrantPeriodObservation1779000000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE \`special_retirement_grant_period_observation\` (
        \`id\` varchar(36) NOT NULL,
        \`created_at\` datetime(6) NOT NULL,
        \`updated_at\` datetime(6) NOT NULL,
        \`deleted_at\` datetime(6) NULL,
        \`observation\` longtext NOT NULL,
        \`special_retirement_grant_period_id\` varchar(36) NULL,
        PRIMARY KEY (\`id\`),
        KEY \`IDX_special_retirement_grant_period_observation_period\` (\`special_retirement_grant_period_id\`),
        CONSTRAINT \`FK_special_retirement_grant_period_observation_period\` FOREIGN KEY (\`special_retirement_grant_period_id\`) REFERENCES \`special_retirement_grant_period\` (\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
      ) ENGINE=InnoDB;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP TABLE \`special_retirement_grant_period_observation\``,
    );
  }
}
