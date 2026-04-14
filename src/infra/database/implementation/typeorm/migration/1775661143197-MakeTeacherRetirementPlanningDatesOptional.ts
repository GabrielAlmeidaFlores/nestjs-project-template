import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeTeacherRetirementPlanningDatesOptional1775661143197 implements MigrationInterface {
    name = 'MakeTeacherRetirementPlanningDatesOptional1775661143197'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`teacher_retirement_planning\` CHANGE \`public_service_start_date\` \`public_service_start_date\` date NULL`);
        await queryRunner.query(`ALTER TABLE \`teacher_retirement_planning\` CHANGE \`career_start_date\` \`career_start_date\` date NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`teacher_retirement_planning\` CHANGE \`career_start_date\` \`career_start_date\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`teacher_retirement_planning\` CHANGE \`public_service_start_date\` \`public_service_start_date\` date NOT NULL`);
    }

}
