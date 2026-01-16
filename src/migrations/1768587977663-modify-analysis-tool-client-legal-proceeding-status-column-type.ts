import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyAnalysisToolClientLegalProceedingStatusColumnType1768587977663 implements MigrationInterface {
    name = 'ModifyAnalysisToolClientLegalProceedingStatusColumnType1768587977663'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`analysis_tool_client_legal_proceeding\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`analysis_tool_client_legal_proceeding\` ADD \`status\` enum ('IN_PROGRESS', 'COMPLETED') NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`analysis_tool_client_legal_proceeding\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`analysis_tool_client_legal_proceeding\` ADD \`status\` varchar(100) NULL`);
    }

}
