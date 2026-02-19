import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRuralTimelineAnalysisInssBenefitAndLegalProceeding1771531697637 implements MigrationInterface {
  name = 'AddRuralTimelineAnalysisInssBenefitAndLegalProceeding1771531697637';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`rural_timeline_inss_benefit\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`inss_benefit_number\` varchar(100) NOT NULL, \`rural_timeline_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`rural_timeline_legal_proceeding\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`legal_proceeding_number\` varchar(100) NOT NULL, \`rural_timeline_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_timeline_inss_benefit\` ADD CONSTRAINT \`FK_rural_timeline_inss_benefit_rural_timeline\` FOREIGN KEY (\`rural_timeline_id\`) REFERENCES \`rural_timeline\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_timeline_legal_proceeding\` ADD CONSTRAINT \`FK_rural_timeline_legal_proceeding_rural_timeline\` FOREIGN KEY (\`rural_timeline_id\`) REFERENCES \`rural_timeline\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`rural_timeline_legal_proceeding\` DROP FOREIGN KEY \`FK_rural_timeline_legal_proceeding_rural_timeline\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rural_timeline_inss_benefit\` DROP FOREIGN KEY \`FK_rural_timeline_inss_benefit_rural_timeline\``,
    );
    await queryRunner.query(`DROP TABLE \`rural_timeline_legal_proceeding\``);
    await queryRunner.query(`DROP TABLE \`rural_timeline_inss_benefit\``);
  }
}
