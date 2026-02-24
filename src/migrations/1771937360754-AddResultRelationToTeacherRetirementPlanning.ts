import { MigrationInterface, QueryRunner } from "typeorm";

export class AddResultRelationToTeacherRetirementPlanning1771937360754 implements MigrationInterface {
    name = 'AddResultRelationToTeacherRetirementPlanning1771937360754'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`teacher_retirement_planning\` ADD \`teacher_retirement_planning_result_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`teacher_retirement_planning\` ADD UNIQUE INDEX \`IDX_5490dafb2d15ebb5d70278f690\` (\`teacher_retirement_planning_result_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_5490dafb2d15ebb5d70278f690\` ON \`teacher_retirement_planning\` (\`teacher_retirement_planning_result_id\`)`);
        await queryRunner.query(`ALTER TABLE \`teacher_retirement_planning\` ADD CONSTRAINT \`FK_5490dafb2d15ebb5d70278f6906\` FOREIGN KEY (\`teacher_retirement_planning_result_id\`) REFERENCES \`teacher_retirement_planning_result\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`teacher_retirement_planning\` DROP FOREIGN KEY \`FK_5490dafb2d15ebb5d70278f6906\``);
        await queryRunner.query(`DROP INDEX \`REL_5490dafb2d15ebb5d70278f690\` ON \`teacher_retirement_planning\``);
        await queryRunner.query(`ALTER TABLE \`teacher_retirement_planning\` DROP INDEX \`IDX_5490dafb2d15ebb5d70278f690\``);
        await queryRunner.query(`ALTER TABLE \`teacher_retirement_planning\` DROP COLUMN \`teacher_retirement_planning_result_id\``);
    }

}
