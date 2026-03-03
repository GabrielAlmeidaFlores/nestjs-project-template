import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLastAffiliationDateToSpeechGeneratorResult1771610000000 implements MigrationInterface {
  name = 'AddLastAffiliationDateToSpeechGeneratorResult1771610000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`speech_generator_result\` ADD \`client_last_affiliation_date\` date NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`speech_generator_result\` DROP COLUMN \`client_last_affiliation_date\``,
    );
  }
}
