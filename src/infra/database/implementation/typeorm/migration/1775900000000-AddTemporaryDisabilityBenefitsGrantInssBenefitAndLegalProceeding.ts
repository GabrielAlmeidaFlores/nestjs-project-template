import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTemporaryDisabilityBenefitsGrantInssBenefitAndLegalProceeding1775900000000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`temporary_disability_benefits_grant_inss_benefit\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`inss_benefit\` varchar(100) NOT NULL, \`temporary_disability_benefits_grant_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`temporary_disability_benefits_grant_legal_proceeding\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`legal_proceeding_number\` varchar(100) NOT NULL, \`temporary_disability_benefits_grant_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );

    const inssBenefitTable = await queryRunner.getTable(
      'temporary_disability_benefits_grant_inss_benefit',
    );

    if (
      !inssBenefitTable?.foreignKeys.find(
        (fk) => fk.name === 'FK_tdbg_inss_benefit_to_tdbg',
      )
    ) {
      await queryRunner.query(
        `ALTER TABLE \`temporary_disability_benefits_grant_inss_benefit\` ADD CONSTRAINT \`FK_tdbg_inss_benefit_to_tdbg\` FOREIGN KEY (\`temporary_disability_benefits_grant_id\`) REFERENCES \`temporary_disability_benefits_grant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
      );
    }

    const legalProceedingTable = await queryRunner.getTable(
      'temporary_disability_benefits_grant_legal_proceeding',
    );

    if (
      !legalProceedingTable?.foreignKeys.find(
        (fk) => fk.name === 'FK_tdbg_legal_proceeding_to_tdbg',
      )
    ) {
      await queryRunner.query(
        `ALTER TABLE \`temporary_disability_benefits_grant_legal_proceeding\` ADD CONSTRAINT \`FK_tdbg_legal_proceeding_to_tdbg\` FOREIGN KEY (\`temporary_disability_benefits_grant_id\`) REFERENCES \`temporary_disability_benefits_grant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const legalProceedingTable = await queryRunner.getTable(
      'temporary_disability_benefits_grant_legal_proceeding',
    );

    if (
      legalProceedingTable?.foreignKeys.find(
        (fk) => fk.name === 'FK_tdbg_legal_proceeding_to_tdbg',
      )
    ) {
      await queryRunner.query(
        `ALTER TABLE \`temporary_disability_benefits_grant_legal_proceeding\` DROP FOREIGN KEY \`FK_tdbg_legal_proceeding_to_tdbg\``,
      );
    }

    const inssBenefitTable = await queryRunner.getTable(
      'temporary_disability_benefits_grant_inss_benefit',
    );

    if (
      inssBenefitTable?.foreignKeys.find(
        (fk) => fk.name === 'FK_tdbg_inss_benefit_to_tdbg',
      )
    ) {
      await queryRunner.query(
        `ALTER TABLE \`temporary_disability_benefits_grant_inss_benefit\` DROP FOREIGN KEY \`FK_tdbg_inss_benefit_to_tdbg\``,
      );
    }

    await queryRunner.query(
      `DROP TABLE IF EXISTS \`temporary_disability_benefits_grant_legal_proceeding\``,
    );

    await queryRunner.query(
      `DROP TABLE IF EXISTS \`temporary_disability_benefits_grant_inss_benefit\``,
    );
  }
}
