import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSpecialRetirementRejectionTechnicalDiagnosis1778529015193 implements MigrationInterface {
    name = 'AddSpecialRetirementRejectionTechnicalDiagnosis1778529015193'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`special_retirement_rejection_technical_diagnosis\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`period_start_date\` date NOT NULL, \`period_end_date\` date NOT NULL, \`recognized\` tinyint NOT NULL, \`justification\` varchar(1000) NOT NULL, \`company\` varchar(255) NOT NULL, \`cnpj\` varchar(20) NOT NULL, \`role\` varchar(255) NOT NULL, \`supporting_document\` varchar(255) NOT NULL, \`recorded_in_cnis\` tinyint NOT NULL, \`remuneration_recorded_in_cnis\` tinyint NOT NULL, \`hazardous_agents\` varchar(2000) NOT NULL, \`information_source\` varchar(255) NOT NULL, \`legal_framework\` varchar(2000) NOT NULL, \`epi_eficaz\` tinyint NULL, \`observations\` varchar(2000) NULL, \`special_retirement_rejection_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`special_retirement_rejection_technical_diagnosis\` ADD CONSTRAINT \`FK_c6f753ccaa9f60f2e128b94010e\` FOREIGN KEY (\`special_retirement_rejection_id\`) REFERENCES \`special_retirement_rejection\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`special_retirement_rejection_technical_diagnosis\` DROP FOREIGN KEY \`FK_c6f753ccaa9f60f2e128b94010e\``);
        await queryRunner.query(`DROP TABLE \`special_retirement_rejection_technical_diagnosis\``);
    }

}
