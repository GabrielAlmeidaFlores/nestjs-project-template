import type { MigrationInterface, QueryRunner } from 'typeorm';

export class SpeechGeneratorBenefitLegalProceeding1769572212919
  implements MigrationInterface
{
  name = 'SpeechGeneratorBenefitLegalProceeding1769572212919';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`speech_generator_benefit\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`inss_benefit_number\` varchar(100) NOT NULL, \`speech_generator_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`speech_generator_legal_proceeding\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`legal_proceeding_number\` varchar(100) NOT NULL, \`speech_generator_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`speech_generator_benefit\` ADD CONSTRAINT \`FK_speech_generator_benefit_speech_generator_id\` FOREIGN KEY (\`speech_generator_id\`) REFERENCES \`speech_generator\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`speech_generator_legal_proceeding\` ADD CONSTRAINT \`FK_speech_generator_legal_proceeding_speech_generator_id\` FOREIGN KEY (\`speech_generator_id\`) REFERENCES \`speech_generator\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`speech_generator_legal_proceeding\` DROP FOREIGN KEY \`FK_speech_generator_legal_proceeding_speech_generator_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`speech_generator_benefit\` DROP FOREIGN KEY \`FK_speech_generator_benefit_speech_generator_id\``,
    );
    await queryRunner.query(
      `DROP TABLE \`speech_generator_legal_proceeding\``,
    );
    await queryRunner.query(`DROP TABLE \`speech_generator_benefit\``);
  }
}
