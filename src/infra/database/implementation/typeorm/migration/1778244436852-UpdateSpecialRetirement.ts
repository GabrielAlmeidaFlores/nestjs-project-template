import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSpecialRetirement1778244436852 implements MigrationInterface {
    name = 'UpdateSpecialRetirement1778244436852'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`accident_assistance_grant_document\` DROP FOREIGN KEY \`FK_aag_document_to_grant\``);
        await queryRunner.query(`ALTER TABLE \`accident_assistance_grant\` DROP FOREIGN KEY \`FK_aag_result_id\``);
        await queryRunner.query(`ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_analysis_tool_record_accident_assistance_grant\``);
        await queryRunner.query(`DROP INDEX \`REL_aag_result_id\` ON \`accident_assistance_grant\``);
        await queryRunner.query(`DROP INDEX \`IDX_045faed019e8b3ad94fdab7856\` ON \`analysis_tool_record\``);
        await queryRunner.query(`DROP INDEX \`IDX_0537095eb4deadf0665a1ed51d\` ON \`analysis_tool_record\``);
        await queryRunner.query(`DROP INDEX \`IDX_4bf0d6a2aa0890f504095a6986\` ON \`analysis_tool_record\``);
        await queryRunner.query(`DROP INDEX \`IDX_9c14e626ecabe8689c5b276334\` ON \`accident_assistance_terminated\``);
        await queryRunner.query(`CREATE TABLE \`special_retirement_grant_technical_diagnosis\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`period_start_date\` date NOT NULL, \`period_end_date\` date NOT NULL, \`recognized\` tinyint NOT NULL, \`justification\` varchar(1000) NOT NULL, \`company\` varchar(255) NOT NULL, \`cnpj\` varchar(20) NOT NULL, \`role\` varchar(255) NOT NULL, \`supporting_document\` varchar(255) NOT NULL, \`recorded_in_cnis\` tinyint NOT NULL, \`remuneration_recorded_in_cnis\` tinyint NOT NULL, \`hazardous_agents\` varchar(2000) NOT NULL, \`information_source\` varchar(255) NOT NULL, \`legal_framework\` varchar(2000) NOT NULL, \`epi_eficaz\` tinyint NULL, \`observations\` varchar(2000) NULL, \`special_retirement_grant_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`accident_assistance_grant\` ADD UNIQUE INDEX \`IDX_d7043a5efeae6804ab0199241d\` (\`accident_assistance_grant_result_id\`)`);
        await queryRunner.query(`ALTER TABLE \`teacher_retirement_planning_rejection_time_accelerator\` CHANGE \`recognition_inss\` \`recognition_inss\` enum ('provavel', 'imparcial', 'improvavel') NULL`);
        await queryRunner.query(`ALTER TABLE \`teacher_retirement_planning_rejection_time_accelerator\` CHANGE \`viability\` \`viability\` enum ('baixa', 'media', 'alta') NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_d7043a5efeae6804ab0199241d\` ON \`accident_assistance_grant\` (\`accident_assistance_grant_result_id\`)`);
        await queryRunner.query(`ALTER TABLE \`accident_assistance_grant_document\` ADD CONSTRAINT \`FK_04316d0c0fd8a0556d7836fb130\` FOREIGN KEY (\`accident_assistance_grant_id\`) REFERENCES \`accident_assistance_grant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`accident_assistance_grant\` ADD CONSTRAINT \`FK_d7043a5efeae6804ab0199241d7\` FOREIGN KEY (\`accident_assistance_grant_result_id\`) REFERENCES \`accident_assistance_grant_result\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`special_retirement_grant_technical_diagnosis\` ADD CONSTRAINT \`FK_0a7cba5e95d2c99b4f4c40910e0\` FOREIGN KEY (\`special_retirement_grant_id\`) REFERENCES \`special_retirement_grant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_5af99ee5a985818cff039d3c48e\` FOREIGN KEY (\`accident_assistance_grant_id\`) REFERENCES \`accident_assistance_grant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_5af99ee5a985818cff039d3c48e\``);
        await queryRunner.query(`ALTER TABLE \`special_retirement_grant_technical_diagnosis\` DROP FOREIGN KEY \`FK_0a7cba5e95d2c99b4f4c40910e0\``);
        await queryRunner.query(`ALTER TABLE \`accident_assistance_grant\` DROP FOREIGN KEY \`FK_d7043a5efeae6804ab0199241d7\``);
        await queryRunner.query(`ALTER TABLE \`accident_assistance_grant_document\` DROP FOREIGN KEY \`FK_04316d0c0fd8a0556d7836fb130\``);
        await queryRunner.query(`DROP INDEX \`REL_d7043a5efeae6804ab0199241d\` ON \`accident_assistance_grant\``);
        await queryRunner.query(`ALTER TABLE \`teacher_retirement_planning_rejection_time_accelerator\` CHANGE \`viability\` \`viability\` enum ('BAIXA', 'MEDIA', 'ALTA') NULL`);
        await queryRunner.query(`ALTER TABLE \`teacher_retirement_planning_rejection_time_accelerator\` CHANGE \`recognition_inss\` \`recognition_inss\` enum ('PROVAVEL', 'IMPARCIAL', 'IMPROVAVEL') NULL`);
        await queryRunner.query(`ALTER TABLE \`accident_assistance_grant\` DROP INDEX \`IDX_d7043a5efeae6804ab0199241d\``);
        await queryRunner.query(`DROP TABLE \`special_retirement_grant_technical_diagnosis\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_9c14e626ecabe8689c5b276334\` ON \`accident_assistance_terminated\` (\`accident_assistance_terminated_result_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_4bf0d6a2aa0890f504095a6986\` ON \`analysis_tool_record\` (\`accident_assistance_terminated_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_0537095eb4deadf0665a1ed51d\` ON \`analysis_tool_record\` (\`bpc_elderly_cessation_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_045faed019e8b3ad94fdab7856\` ON \`analysis_tool_record\` (\`temporary_disability_benefits_terminated_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_aag_result_id\` ON \`accident_assistance_grant\` (\`accident_assistance_grant_result_id\`)`);
        await queryRunner.query(`ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_analysis_tool_record_accident_assistance_grant\` FOREIGN KEY (\`accident_assistance_grant_id\`) REFERENCES \`accident_assistance_grant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`accident_assistance_grant\` ADD CONSTRAINT \`FK_aag_result_id\` FOREIGN KEY (\`accident_assistance_grant_result_id\`) REFERENCES \`accident_assistance_grant_result\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`accident_assistance_grant_document\` ADD CONSTRAINT \`FK_aag_document_to_grant\` FOREIGN KEY (\`accident_assistance_grant_id\`) REFERENCES \`accident_assistance_grant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
