import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSystemActivitiesTable1774060000000
  implements MigrationInterface
{
  name = 'CreateSystemActivitiesTable1774060000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`system_activities\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`title\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`organization_member_id\` varchar(36) NULL, \`analysis_tool_client_id\` varchar(36) NULL, \`analysis_tool_record_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`system_activities\` ADD CONSTRAINT \`FK_system_activities_organization_member\` FOREIGN KEY (\`organization_member_id\`) REFERENCES \`organization_member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`system_activities\` ADD CONSTRAINT \`FK_system_activities_analysis_tool_client\` FOREIGN KEY (\`analysis_tool_client_id\`) REFERENCES \`analysis_tool_client\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`system_activities\` ADD CONSTRAINT \`FK_system_activities_analysis_tool_record\` FOREIGN KEY (\`analysis_tool_record_id\`) REFERENCES \`analysis_tool_record\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`system_activities\` DROP FOREIGN KEY \`FK_system_activities_analysis_tool_record\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`system_activities\` DROP FOREIGN KEY \`FK_system_activities_analysis_tool_client\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`system_activities\` DROP FOREIGN KEY \`FK_system_activities_organization_member\``,
    );
    await queryRunner.query(`DROP TABLE \`system_activities\``);
  }
}
