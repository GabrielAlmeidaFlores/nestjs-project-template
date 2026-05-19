import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddInterviewFormNewClientFields20260518000000 implements MigrationInterface {
  name = 'AddInterviewFormNewClientFields20260518000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`interview_form\` ADD \`client_registration_date\` varchar(20) NULL`);
    await queryRunner.query(`ALTER TABLE \`interview_form\` ADD \`client_age\` varchar(20) NULL`);
    await queryRunner.query(`ALTER TABLE \`interview_form\` ADD \`client_neighborhood\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`interview_form\` ADD \`client_street\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`interview_form\` ADD \`client_street_number\` varchar(20) NULL`);
    await queryRunner.query(`ALTER TABLE \`interview_form\` ADD \`client_is_married_or_in_union\` boolean NULL`);
    await queryRunner.query(`ALTER TABLE \`interview_form\` ADD \`client_has_children\` boolean NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`interview_form\` DROP COLUMN \`client_registration_date\``);
    await queryRunner.query(`ALTER TABLE \`interview_form\` DROP COLUMN \`client_age\``);
    await queryRunner.query(`ALTER TABLE \`interview_form\` DROP COLUMN \`client_neighborhood\``);
    await queryRunner.query(`ALTER TABLE \`interview_form\` DROP COLUMN \`client_street\``);
    await queryRunner.query(`ALTER TABLE \`interview_form\` DROP COLUMN \`client_street_number\``);
    await queryRunner.query(`ALTER TABLE \`interview_form\` DROP COLUMN \`client_is_married_or_in_union\``);
    await queryRunner.query(`ALTER TABLE \`interview_form\` DROP COLUMN \`client_has_children\``);
  }
}
