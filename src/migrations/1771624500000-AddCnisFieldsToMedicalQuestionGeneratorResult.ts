import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCnisFieldsToMedicalQuestionGeneratorResult1771624500000 implements MigrationInterface {
  name = 'AddCnisFieldsToMedicalQuestionGeneratorResult1771624500000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`medical_question_generator_result\` ADD \`client_name\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`medical_question_generator_result\` ADD \`client_federal_document\` varchar(50) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`medical_question_generator_result\` ADD \`client_birth_date\` date NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`medical_question_generator_result\` ADD \`client_last_affiliation_date\` date NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`medical_question_generator_result\` DROP COLUMN \`client_last_affiliation_date\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`medical_question_generator_result\` DROP COLUMN \`client_birth_date\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`medical_question_generator_result\` DROP COLUMN \`client_federal_document\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`medical_question_generator_result\` DROP COLUMN \`client_name\``,
    );
  }
}
