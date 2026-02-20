import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddClientDataToSpeechGeneratorResult1771541000000 implements MigrationInterface {
  name = 'AddClientDataToSpeechGeneratorResult1771541000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('speech_generator_result');

    if (!table?.findColumnByName('client_name')) {
      await queryRunner.query(
        `ALTER TABLE \`speech_generator_result\` ADD \`client_name\` varchar(255) NULL`,
      );
    }

    if (!table?.findColumnByName('client_federal_document')) {
      await queryRunner.query(
        `ALTER TABLE \`speech_generator_result\` ADD \`client_federal_document\` varchar(50) NULL`,
      );
    }

    if (!table?.findColumnByName('client_birth_date')) {
      await queryRunner.query(
        `ALTER TABLE \`speech_generator_result\` ADD \`client_birth_date\` date NULL`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('speech_generator_result');

    if (table?.findColumnByName('client_birth_date')) {
      await queryRunner.query(
        `ALTER TABLE \`speech_generator_result\` DROP COLUMN \`client_birth_date\``,
      );
    }

    if (table?.findColumnByName('client_federal_document')) {
      await queryRunner.query(
        `ALTER TABLE \`speech_generator_result\` DROP COLUMN \`client_federal_document\``,
      );
    }

    if (table?.findColumnByName('client_name')) {
      await queryRunner.query(
        `ALTER TABLE \`speech_generator_result\` DROP COLUMN \`client_name\``,
      );
    }
  }
}
