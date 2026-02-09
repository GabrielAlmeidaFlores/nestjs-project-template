import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeBenefitNumberNullable1770374676000 implements MigrationInterface {
    name = 'MakeBenefitNumberNullable1770374676000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`rural_timeline_period_family_group_member\` CHANGE \`benefit_number\` \`benefit_number\` varchar(100) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`rural_timeline_period_family_group_member\` CHANGE \`benefit_number\` \`benefit_number\` varchar(100) NOT NULL`);
    }

}
