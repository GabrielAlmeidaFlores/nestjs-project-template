import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddClientDocumentGeneratorTables20260519000000 implements MigrationInterface {
  name = 'AddClientDocumentGeneratorTables20260519000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE \`fee_contract_generator_analysis\` (\`id\` varchar(36) NOT NULL, \`fee_contract_generator_complete_analysis\` text NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    await queryRunner.query(`CREATE TABLE \`power_of_attorney_generator_analysis\` (\`id\` varchar(36) NOT NULL, \`power_of_attorney_generator_complete_analysis\` text NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    await queryRunner.query(`CREATE TABLE \`jef_waiver_declaration_generator_analysis\` (\`id\` varchar(36) NOT NULL, \`jef_waiver_declaration_generator_complete_analysis\` text NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    await queryRunner.query(`CREATE TABLE \`poverty_declaration_generator_analysis\` (\`id\` varchar(36) NOT NULL, \`poverty_declaration_generator_complete_analysis\` text NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`poverty_declaration_generator_analysis\``);
    await queryRunner.query(`DROP TABLE \`jef_waiver_declaration_generator_analysis\``);
    await queryRunner.query(`DROP TABLE \`power_of_attorney_generator_analysis\``);
    await queryRunner.query(`DROP TABLE \`fee_contract_generator_analysis\``);
  }
}
