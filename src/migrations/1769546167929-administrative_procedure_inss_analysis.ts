import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AdministrativeProcedureInssAnalysis1769546167929 implements MigrationInterface {
  name = 'AdministrativeProcedureInssAnalysis1769546167929';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD \`administrative_procedure_inss_analysis_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD UNIQUE INDEX \`IDX_29b868778be09b98fc6df81c10\` (\`administrative_procedure_inss_analysis_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_29b868778be09b98fc6df81c10\` ON \`analysis_tool_record\` (\`administrative_procedure_inss_analysis_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_29b868778be09b98fc6df81c10c\` FOREIGN KEY (\`administrative_procedure_inss_analysis_id\`) REFERENCES \`administrative_procedure_inss_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_29b868778be09b98fc6df81c10c\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_29b868778be09b98fc6df81c10\` ON \`analysis_tool_record\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP INDEX \`IDX_29b868778be09b98fc6df81c10\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP COLUMN \`administrative_procedure_inss_analysis_id\``,
    );
  }
}
