import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameRuralTimelineAnalysisColumns1769718781493 implements MigrationInterface {
    name = 'RenameRuralTimelineAnalysisColumns1769718781493'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`rural_timeline\` CHANGE \`rural_timeline_analysis\` \`rural_timeline_complete_analysis\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`rural_timeline\` ADD \`rural_timeline_simplified_analysis\` text NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`rural_timeline\` DROP COLUMN \`rural_timeline_simplified_analysis\``);
        await queryRunner.query(`ALTER TABLE \`rural_timeline\` CHANGE \`rural_timeline_complete_analysis\` \`rural_timeline_analysis\` text NULL`);
    }

}
