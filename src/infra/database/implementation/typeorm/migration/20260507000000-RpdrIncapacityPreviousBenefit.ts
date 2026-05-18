import type { MigrationInterface, QueryRunner } from 'typeorm';

export class RpdrIncapacityPreviousBenefit20260507000000 implements MigrationInterface {
  name = 'RpdrIncapacityPreviousBenefit20260507000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`retirement_permanent_disability_rejection_incapacity\` DROP COLUMN \`previous_benefit_number\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`retirement_permanent_disability_rejection_incapacity\` DROP COLUMN \`previous_benefit_start_date\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`retirement_permanent_disability_rejection_incapacity\` DROP COLUMN \`previous_benefit_end_date\``,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`retirement_permanent_disability_rejection_incapacity_prev_ben\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`benefit_number\` varchar(100) NOT NULL, \`start_date\` date NULL, \`end_date\` date NULL, \`retirement_permanent_disability_rejection_incapacity_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`retirement_permanent_disability_rejection_incapacity_prev_ben\` ADD CONSTRAINT \`FK_rpdr_incapacity_prev_ben_incapacity\` FOREIGN KEY (\`retirement_permanent_disability_rejection_incapacity_id\`) REFERENCES \`retirement_permanent_disability_rejection_incapacity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`retirement_permanent_disability_rejection_incapacity_prev_ben\` DROP FOREIGN KEY \`FK_rpdr_incapacity_prev_ben_incapacity\``,
    );
    await queryRunner.query(
      `DROP TABLE IF EXISTS \`retirement_permanent_disability_rejection_incapacity_prev_ben\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`retirement_permanent_disability_rejection_incapacity\` ADD \`previous_benefit_end_date\` date NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`retirement_permanent_disability_rejection_incapacity\` ADD \`previous_benefit_start_date\` date NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`retirement_permanent_disability_rejection_incapacity\` ADD \`previous_benefit_number\` varchar(100) NULL`,
    );
  }
}
