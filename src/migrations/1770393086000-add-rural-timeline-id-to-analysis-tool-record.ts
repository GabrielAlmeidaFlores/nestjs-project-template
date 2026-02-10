import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRuralTimelineIdToAnalysisToolRecord1770393086000 implements MigrationInterface {
    name = 'AddRuralTimelineIdToAnalysisToolRecord1770393086000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`analysis_tool_record\` ADD \`rural_timeline_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`analysis_tool_record\` ADD UNIQUE INDEX \`IDX_rural_timeline_id\` (\`rural_timeline_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_analysis_tool_record_rural_timeline\` ON \`analysis_tool_record\` (\`rural_timeline_id\`)`);
        await queryRunner.query(`ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_analysis_tool_record_rural_timeline\` FOREIGN KEY (\`rural_timeline_id\`) REFERENCES \`rural_timeline\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_analysis_tool_record_rural_timeline\``);
        await queryRunner.query(`DROP INDEX \`REL_analysis_tool_record_rural_timeline\` ON \`analysis_tool_record\``);
        await queryRunner.query(`ALTER TABLE \`analysis_tool_record\` DROP INDEX \`IDX_rural_timeline_id\``);
        await queryRunner.query(`ALTER TABLE \`analysis_tool_record\` DROP COLUMN \`rural_timeline_id\``);
    }

}
