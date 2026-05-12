import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AccidentAssistanceGrantTables1783000000000
  implements MigrationInterface
{
  public readonly name = 'AccidentAssistanceGrantTables1783000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`accident_assistance_grant_result\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`first_analysis\` longtext NULL, \`simplified_analysis\` longtext NULL, \`complete_analysis\` longtext NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`accident_assistance_grant\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`analysis_tool_client_id\` varchar(36) NOT NULL, \`analysis_name\` varchar(255) NULL, \`category\` enum('segurado_empregado','segurado_contribuinte_individual','segurado_facultativo','segurado_especial','segurado_domestico','segurado_avulso') NULL, \`accident_date\` date NULL, \`had_previous_temporary_disability_assistance\` tinyint NULL, \`sequel_description\` text NULL, \`associated_cid_id\` varchar(50) NULL, \`accident_assistance_grant_result_id\` varchar(36) NULL, UNIQUE INDEX \`REL_aag_result_id\` (\`accident_assistance_grant_result_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`accident_assistance_grant_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`file_name\` varchar(255) NULL, \`type\` enum('cnis','medical','previous_medical','admin_process') NULL, \`accident_assistance_grant_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`accident_assistance_grant\` ADD CONSTRAINT \`FK_aag_result_id\` FOREIGN KEY (\`accident_assistance_grant_result_id\`) REFERENCES \`accident_assistance_grant_result\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`accident_assistance_grant_document\` ADD CONSTRAINT \`FK_aag_document_to_grant\` FOREIGN KEY (\`accident_assistance_grant_id\`) REFERENCES \`accident_assistance_grant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`accident_assistance_grant_document\` DROP FOREIGN KEY \`FK_aag_document_to_grant\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`accident_assistance_grant\` DROP FOREIGN KEY \`FK_aag_result_id\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_aag_result_id\` ON \`accident_assistance_grant\``,
    );
    await queryRunner.query(
      `DROP TABLE \`accident_assistance_grant_document\``,
    );
    await queryRunner.query(`DROP TABLE \`accident_assistance_grant\``);
    await queryRunner.query(
      `DROP TABLE \`accident_assistance_grant_result\``,
    );
  }
}
