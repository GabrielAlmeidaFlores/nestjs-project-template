import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddClientDataToSpeechGeneratorResult1771541000000 implements MigrationInterface {
  name = 'AddClientDataToSpeechGeneratorResult1771541000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`speech_generator_result\` ADD \`client_name\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`speech_generator_result\` ADD \`client_federal_document\` varchar(50) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`speech_generator_result\` ADD \`client_birth_date\` date NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`speech_generator_result\` DROP COLUMN \`client_birth_date\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`speech_generator_result\` DROP COLUMN \`client_federal_document\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`speech_generator_result\` DROP COLUMN \`client_name\``,
    );
  }
}
