import type { MigrationInterface, QueryRunner } from 'typeorm';

export class MakeMiniAdvisorStandalone1774400000000
  implements MigrationInterface
{
  public readonly name = 'MakeMiniAdvisorStandalone1774400000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_analysis_tool_record_mini_advisor\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_analysis_tool_record_mini_advisor\` ON \`analysis_tool_record\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP COLUMN \`mini_advisor_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`mini_advisor\` ADD \`created_by_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`mini_advisor\` ADD \`updated_by_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`mini_advisor\` ADD CONSTRAINT \`FK_mini_advisor_created_by\` FOREIGN KEY (\`created_by_id\`) REFERENCES \`organization_member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`mini_advisor\` ADD CONSTRAINT \`FK_mini_advisor_updated_by\` FOREIGN KEY (\`updated_by_id\`) REFERENCES \`organization_member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`mini_advisor\` DROP FOREIGN KEY \`FK_mini_advisor_updated_by\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`mini_advisor\` DROP FOREIGN KEY \`FK_mini_advisor_created_by\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`mini_advisor\` DROP COLUMN \`updated_by_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`mini_advisor\` DROP COLUMN \`created_by_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD \`mini_advisor_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_analysis_tool_record_mini_advisor\` ON \`analysis_tool_record\` (\`mini_advisor_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_analysis_tool_record_mini_advisor\` FOREIGN KEY (\`mini_advisor_id\`) REFERENCES \`mini_advisor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
