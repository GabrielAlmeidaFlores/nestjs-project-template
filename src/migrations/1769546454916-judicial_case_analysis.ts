import type { MigrationInterface, QueryRunner } from 'typeorm';

export class JudicialCaseAnalysis1769546454916 implements MigrationInterface {
  name = 'JudicialCaseAnalysis1769546454916';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD \`judicial_case_analysis_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD UNIQUE INDEX \`IDX_965494fcf176d3c874f0f89c65\` (\`judicial_case_analysis_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_965494fcf176d3c874f0f89c65\` ON \`analysis_tool_record\` (\`judicial_case_analysis_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_965494fcf176d3c874f0f89c658\` FOREIGN KEY (\`judicial_case_analysis_id\`) REFERENCES \`judicial_case_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_965494fcf176d3c874f0f89c658\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_965494fcf176d3c874f0f89c65\` ON \`analysis_tool_record\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP INDEX \`IDX_965494fcf176d3c874f0f89c65\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP COLUMN \`judicial_case_analysis_id\``,
    );
  }
}
