import { MigrationInterface, QueryRunner } from 'typeorm';

import { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';

export class BpcElderlyCessation1779000000003 implements MigrationInterface {
  public readonly name = 'BpcElderlyCessation1779000000003';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`bpc_elderly_cessation_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`document\` varchar(255) NOT NULL, \`type\` enum ('cnis', 'cad_unico', 'procedimento_administrativo', 'despacho_cessacao_ou_suspensao', 'procedimento_administrativo_suspensao_ou_cessacao', 'documentos_medicos_e_sociais', 'outro') NOT NULL, \`bpc_elderly_cessation_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`bpc_elderly_cessation_family_member_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`document\` varchar(255) NOT NULL, \`type\` enum ('cnis_individual', 'consulta_medica', 'medicamento', 'alimentacao_especial', 'fraldas_descartaveis') NOT NULL, \`bpc_elderly_cessation_family_member_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`bpc_elderly_cessation_family_member\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`full_name\` varchar(255) NOT NULL, \`birth_date\` date NOT NULL, \`kinship\` enum ('spouse', 'child', 'parent', 'sibling', 'other') NOT NULL, \`lives_in_same_residence\` tinyint NOT NULL, \`has_income\` tinyint NOT NULL, \`monthly_income_amount\` decimal(10,2) NULL, \`income_type\` enum ('retirement', 'death_pension', 'bpc', 'bolsa_familia', 'other_inss_benefits', 'salaries', 'others') NULL, \`has_expense_proofs\` tinyint NULL, \`bpc_elderly_cessation_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`bpc_elderly_cessation_inss_benefit\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`inss_benefit_number\` varchar(100) NOT NULL, \`bpc_elderly_cessation_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`bpc_elderly_cessation_legal_proceeding\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`legal_proceeding_number\` varchar(100) NOT NULL, \`bpc_elderly_cessation_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`bpc_elderly_cessation_result\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`inss_decision_analysis\` text NULL, \`first_analysis\` longtext NULL, \`complete_analysis\` longtext NULL, \`complete_analysis_download\` longtext NULL, \`simplified_analysis\` text NULL, \`applicable_rules\` longtext NULL, \`benefit_summaries\` longtext NULL, \`analysis_detailed_text\` longtext NULL, \`diagnosis\` text NULL, \`total_household_income\` decimal(14,2) NULL, \`per_capita_income\` decimal(14,2) NULL, \`legal_requirements_met\` text NULL, \`per_capita_income_below_quarter_minimum_wage\` text NULL, \`age_equal_or_above_65_years\` text NULL, \`bpc_elderly_cessation_id\` varchar(36) NULL, UNIQUE INDEX \`REL_bec_result_analysis\` (\`bpc_elderly_cessation_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`bpc_elderly_cessation\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`analysis_name\` varchar(255) NULL, \`decision_date\` date NULL, \`previous_inss_benefit_number\` varchar(255) NULL, \`category\` enum ('urban_employee', 'rural_employee', 'domestic_employee', 'avulso_worker', 'individual_contributor_autonomous', 'individual_contributor_service_provider', 'mei', 'special_insured', 'optional_insured') NULL, \`cessation_reason\` enum ('renda_familiar_superior_ao_limite', 'cad_unico_desatualizado_ou_inconsistente', 'nao_atendimento_a_convocacao_revisao', 'idade_nao_comprovada', 'acumulacao_indevida_beneficio', 'inconsistencia_cadastral_ou_residencia', 'outro') NULL, \`cessation_reason_description\` text NULL, \`is_appeal_deadline_expired\` tinyint NULL, \`my_inss_password\` varchar(255) NULL, \`civil_status\` enum ('solteiro', 'casado', 'uniao_estavel', 'divorciado', 'viuvo', 'separado') NULL, \`education_level\` enum ('analfabeto', 'fundamental_incompleto', 'fundamental_completo', 'medio_incompleto', 'medio_completo', 'superior_incompleto', 'superior_completo', 'pos_graduacao') NULL, \`current_address\` text NULL, \`previous_address\` text NULL, \`has_address_changed_since_decision\` tinyint NULL, \`lives_alone\` tinyint NULL, \`created_by_id\` varchar(36) NULL, \`updated_by_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD \`bpc_elderly_cessation_id\` varchar(36) NULL`,
    );
    await this.changePaymentResourceEnum(queryRunner, [
      ...Object.values(PaymentPlanPaidResourceTypeEnum),
    ]);
    await this.changeAnalysisToolRecordTypeEnum(queryRunner, [
      ...Object.values(AnalysisToolRecordTypeEnum),
    ]);
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD UNIQUE INDEX \`IDX_atr_bpc_elderly_cessation\` (\`bpc_elderly_cessation_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_atr_bpc_elderly_cessation\` ON \`analysis_tool_record\` (\`bpc_elderly_cessation_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bpc_elderly_cessation_document\` ADD CONSTRAINT \`FK_bec_document_analysis\` FOREIGN KEY (\`bpc_elderly_cessation_id\`) REFERENCES \`bpc_elderly_cessation\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bpc_elderly_cessation_family_member_document\` ADD CONSTRAINT \`FK_bec_family_document_member\` FOREIGN KEY (\`bpc_elderly_cessation_family_member_id\`) REFERENCES \`bpc_elderly_cessation_family_member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bpc_elderly_cessation_family_member\` ADD CONSTRAINT \`FK_bec_family_member_analysis\` FOREIGN KEY (\`bpc_elderly_cessation_id\`) REFERENCES \`bpc_elderly_cessation\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bpc_elderly_cessation_inss_benefit\` ADD CONSTRAINT \`FK_bec_inss_benefit_analysis\` FOREIGN KEY (\`bpc_elderly_cessation_id\`) REFERENCES \`bpc_elderly_cessation\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bpc_elderly_cessation_legal_proceeding\` ADD CONSTRAINT \`FK_bec_legal_proceeding_analysis\` FOREIGN KEY (\`bpc_elderly_cessation_id\`) REFERENCES \`bpc_elderly_cessation\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bpc_elderly_cessation_result\` ADD CONSTRAINT \`FK_bec_result_analysis\` FOREIGN KEY (\`bpc_elderly_cessation_id\`) REFERENCES \`bpc_elderly_cessation\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bpc_elderly_cessation\` ADD CONSTRAINT \`FK_bec_created_by\` FOREIGN KEY (\`created_by_id\`) REFERENCES \`organization_member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bpc_elderly_cessation\` ADD CONSTRAINT \`FK_bec_updated_by\` FOREIGN KEY (\`updated_by_id\`) REFERENCES \`organization_member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_atr_bpc_elderly_cessation\` FOREIGN KEY (\`bpc_elderly_cessation_id\`) REFERENCES \`bpc_elderly_cessation\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_atr_bpc_elderly_cessation\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`bpc_elderly_cessation\` DROP FOREIGN KEY \`FK_bec_updated_by\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`bpc_elderly_cessation\` DROP FOREIGN KEY \`FK_bec_created_by\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`bpc_elderly_cessation_result\` DROP FOREIGN KEY \`FK_bec_result_analysis\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`bpc_elderly_cessation_legal_proceeding\` DROP FOREIGN KEY \`FK_bec_legal_proceeding_analysis\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`bpc_elderly_cessation_inss_benefit\` DROP FOREIGN KEY \`FK_bec_inss_benefit_analysis\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`bpc_elderly_cessation_family_member\` DROP FOREIGN KEY \`FK_bec_family_member_analysis\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`bpc_elderly_cessation_family_member_document\` DROP FOREIGN KEY \`FK_bec_family_document_member\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`bpc_elderly_cessation_document\` DROP FOREIGN KEY \`FK_bec_document_analysis\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_atr_bpc_elderly_cessation\` ON \`analysis_tool_record\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP INDEX \`IDX_atr_bpc_elderly_cessation\``,
    );
    await this.changeAnalysisToolRecordTypeEnum(
      queryRunner,
      Object.values(AnalysisToolRecordTypeEnum).filter(
        (value) => value !== AnalysisToolRecordTypeEnum.BPC_ELDERLY_CESSATION,
      ),
    );
    await this.changePaymentResourceEnum(
      queryRunner,
      Object.values(PaymentPlanPaidResourceTypeEnum).filter(
        (value) =>
          ![
            PaymentPlanPaidResourceTypeEnum.BPC_ELDERLY_CESSATION_INSS_DECISION_ANALYSIS,
            PaymentPlanPaidResourceTypeEnum.BPC_ELDERLY_CESSATION_FIRST_ANALYSIS,
            PaymentPlanPaidResourceTypeEnum.BPC_ELDERLY_CESSATION_COMPLETE_ANALYSIS,
            PaymentPlanPaidResourceTypeEnum.BPC_ELDERLY_CESSATION_SIMPLIFIED_ANALYSIS,
          ].includes(value),
      ),
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP COLUMN \`bpc_elderly_cessation_id\``,
    );
    await queryRunner.query(`DROP TABLE \`bpc_elderly_cessation\``);
    await queryRunner.query(
      `DROP INDEX \`REL_bec_result_analysis\` ON \`bpc_elderly_cessation_result\``,
    );
    await queryRunner.query(`DROP TABLE \`bpc_elderly_cessation_result\``);
    await queryRunner.query(
      `DROP TABLE \`bpc_elderly_cessation_legal_proceeding\``,
    );
    await queryRunner.query(
      `DROP TABLE \`bpc_elderly_cessation_inss_benefit\``,
    );
    await queryRunner.query(
      `DROP TABLE \`bpc_elderly_cessation_family_member\``,
    );
    await queryRunner.query(
      `DROP TABLE \`bpc_elderly_cessation_family_member_document\``,
    );
    await queryRunner.query(`DROP TABLE \`bpc_elderly_cessation_document\``);
  }

  private async changePaymentResourceEnum(
    queryRunner: QueryRunner,
    values: string[],
  ): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`payment_plan_paid_resource\` CHANGE \`resource\` \`resource\` enum (${this.toSqlEnum(values)}) NOT NULL`,
    );
  }

  private async changeAnalysisToolRecordTypeEnum(
    queryRunner: QueryRunner,
    values: string[],
  ): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` CHANGE \`type\` \`type\` enum (${this.toSqlEnum(values)}) NOT NULL`,
    );
  }

  private toSqlEnum(values: string[]): string {
    return values.map((value) => `'${value.replace(/'/g, "''")}'`).join(', ');
  }
}
