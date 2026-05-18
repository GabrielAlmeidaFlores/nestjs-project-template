import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRetirementPerDisRevBenefitDeclarationTable1783000000000
  implements MigrationInterface
{
  name = 'AddRetirementPerDisRevBenefitDeclarationTable1783000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`retirement_per_dis_rev_dis_analysis_benefit_decl\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`file_name\` varchar(500) NOT NULL, \`retirement_per_dis_rev_dis_analysis_benefit_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`retirement_per_dis_rev_dis_analysis_benefit_decl\` ADD CONSTRAINT \`FK_ret_per_dis_rev_benefit_decl_to_benefit\` FOREIGN KEY (\`retirement_per_dis_rev_dis_analysis_benefit_id\`) REFERENCES \`retirement_per_dis_rev_dis_analysis_benefit\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`retirement_per_dis_rev_dis_analysis_benefit_decl\` DROP FOREIGN KEY \`FK_ret_per_dis_rev_benefit_decl_to_benefit\``,
    );
    await queryRunner.query(
      `DROP TABLE \`retirement_per_dis_rev_dis_analysis_benefit_decl\``,
    );
  }
}
