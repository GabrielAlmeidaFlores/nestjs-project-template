import { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';

import type { MigrationInterface, QueryRunner } from 'typeorm';

export class TemporaryDisabilityBenefitsTerminatedFlow1781000000000 implements MigrationInterface {
  public readonly name =
    'TemporaryDisabilityBenefitsTerminatedFlow1781000000000';

  private readonly analysisToolRecordTypeValues = Object.values(
    AnalysisToolRecordTypeEnum,
  );

  private readonly paymentPlanPaidResourceValues = Object.values(
    PaymentPlanPaidResourceTypeEnum,
  );

  private readonly terminatedPaymentPlanResources = [
    PaymentPlanPaidResourceTypeEnum.TEMPORARY_DISABILITY_BENEFITS_TERMINATED_INSS_DECISION_ANALYSIS,
    PaymentPlanPaidResourceTypeEnum.TEMPORARY_DISABILITY_BENEFITS_TERMINATED_FIRST_ANALYSIS,
    PaymentPlanPaidResourceTypeEnum.TEMPORARY_DISABILITY_BENEFITS_TERMINATED_COMPLETE_ANALYSIS,
    PaymentPlanPaidResourceTypeEnum.TEMPORARY_DISABILITY_BENEFITS_TERMINATED_SIMPLIFIED_ANALYSIS,
  ];

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD \`temporary_disability_benefits_terminated_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` CHANGE \`type\` \`type\` enum (${this.buildMysqlEnum(
        this.analysisToolRecordTypeValues,
      )}) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payment_plan_paid_resource\` CHANGE \`resource\` \`resource\` enum (${this.buildMysqlEnum(
        this.paymentPlanPaidResourceValues,
      )}) NOT NULL`,
    );

    await queryRunner.query(
      `CREATE TABLE \`temporary_disability_benefits_terminated_result\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`inss_decision_analysis\` longtext NULL, \`first_analysis\` longtext NULL, \`complete_analysis\` longtext NULL, \`complete_analysis_download\` longtext NULL, \`simplified_analysis\` longtext NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`temporary_disability_benefits_terminated\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`analysis_name\` varchar(255) NULL, \`request_entry_date\` date NULL, \`benefit_cessation_date\` date NULL, \`category\` varchar(100) NULL, \`my_inss_password\` varchar(255) NULL, \`benefit_cessation_reason\` text NULL, \`temporary_disability_benefits_terminated_result_id\` varchar(36) NULL, UNIQUE INDEX \`REL_tdbt_result_id\` (\`temporary_disability_benefits_terminated_result_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`temporary_disability_benefits_terminated_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`file_name\` varchar(255) NOT NULL, \`type\` varchar(100) NOT NULL, \`temporary_disability_benefits_terminated_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`temporary_disability_benefits_terminated_inss_benefit\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`inss_benefit\` varchar(255) NOT NULL, \`temporary_disability_benefits_terminated_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`temporary_disability_benefits_terminated_disability_analysis\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`estimated_disability_start_date\` date NOT NULL, \`short_disability_description\` text NULL, \`disability_from_accident\` tinyint NOT NULL, \`disabling_condition_description\` text NULL, \`disability_from_severe_disease\` tinyint NOT NULL, \`severe_disease\` varchar(100) NULL, \`disease_custom_name\` varchar(255) NULL, \`disease_start_date\` date NULL, \`needs_constant_assistance_from_another_person\` tinyint NOT NULL, \`previous_disability_benefit\` tinyint NOT NULL, \`temporary_disability_benefits_terminated_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`temporary_disability_benefits_terminated_disability_analysis_cid\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`cid_ten_id\` varchar(50) NOT NULL, \`temporary_disability_benefits_terminated_disability_analysis_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`temp_disability_benefits_terminated_disability_analysis_doc\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`file_name\` varchar(255) NOT NULL, \`type\` varchar(100) NOT NULL, \`temporary_disability_benefits_terminated_disability_analysis_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`temporary_disability_benefits_terminated_previous_benefit\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`benefit_number\` varchar(100) NOT NULL, \`temporary_disability_benefits_terminated_disability_analysis_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`temp_disability_benefits_terminated_previous_benefit_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`file_name\` varchar(255) NOT NULL, \`type\` varchar(100) NOT NULL, \`temporary_disability_benefits_terminated_previous_benefit_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`temporary_disability_benefits_terminated_insured_status\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`involuntary_unemployment\` tinyint NOT NULL, \`intention_to_prove_involuntary_unemployment\` tinyint NOT NULL, \`rural_insured_client\` tinyint NOT NULL, \`rural_period_start_date\` date NULL, \`rural_period_end_date\` date NULL, \`documents_description\` text NULL, \`temporary_disability_benefits_terminated_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`temp_disability_benefits_terminated_insured_status_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`file_name\` varchar(255) NOT NULL, \`type\` varchar(100) NOT NULL, \`temporary_disability_benefits_terminated_insured_status_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`temporary_disability_benefits_terminated_work_periods\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`bond_origin\` varchar(255) NULL, \`start_date\` date NOT NULL, \`end_date\` date NULL, \`category\` varchar(100) NULL, \`activity_description\` text NULL, \`competence_below_the_minimum\` tinyint NOT NULL, \`pendency_reason\` varchar(100) NULL, \`period_consideration\` varchar(50) NULL, \`contribution_average\` decimal(15,2) NULL, \`impact_months\` int NULL, \`grace_period\` int NULL, \`is_pendency\` tinyint NOT NULL, \`wants_to_complement_via_meu_inss\` tinyint NULL, \`status\` tinyint NOT NULL, \`is_manual_period\` tinyint NOT NULL DEFAULT 0, \`temporary_disability_benefits_terminated_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`temp_disability_benefits_terminated_work_periods_earnings_hist\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`competence\` date NULL, \`remuneration\` longtext NULL, \`indicators\` longtext NULL, \`payment_date\` date NULL, \`contribution\` longtext NULL, \`contribution_salary\` longtext NULL, \`competence_below_the_minimum\` tinyint NULL, \`temporary_disability_benefits_terminated_work_periods_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`temporary_disability_benefits_terminated_work_period_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`file_name\` varchar(255) NULL, \`type\` varchar(100) NULL, \`temporary_disability_benefits_terminated_work_periods_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_terminated\` ADD CONSTRAINT \`FK_tdbt_result\` FOREIGN KEY (\`temporary_disability_benefits_terminated_result_id\`) REFERENCES \`temporary_disability_benefits_terminated_result\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_terminated_document\` ADD CONSTRAINT \`FK_tdbt_document_to_flow\` FOREIGN KEY (\`temporary_disability_benefits_terminated_id\`) REFERENCES \`temporary_disability_benefits_terminated\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_terminated_inss_benefit\` ADD CONSTRAINT \`FK_tdbt_inss_benefit_to_flow\` FOREIGN KEY (\`temporary_disability_benefits_terminated_id\`) REFERENCES \`temporary_disability_benefits_terminated\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_terminated_disability_analysis\` ADD CONSTRAINT \`FK_tdbt_disability_analysis_to_flow\` FOREIGN KEY (\`temporary_disability_benefits_terminated_id\`) REFERENCES \`temporary_disability_benefits_terminated\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_terminated_disability_analysis_cid\` ADD CONSTRAINT \`FK_tdbt_disability_cid_to_analysis\` FOREIGN KEY (\`temporary_disability_benefits_terminated_disability_analysis_id\`) REFERENCES \`temporary_disability_benefits_terminated_disability_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`temp_disability_benefits_terminated_disability_analysis_doc\` ADD CONSTRAINT \`FK_tdbt_disability_document_to_analysis\` FOREIGN KEY (\`temporary_disability_benefits_terminated_disability_analysis_id\`) REFERENCES \`temporary_disability_benefits_terminated_disability_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_terminated_previous_benefit\` ADD CONSTRAINT \`FK_tdbt_previous_benefit_to_analysis\` FOREIGN KEY (\`temporary_disability_benefits_terminated_disability_analysis_id\`) REFERENCES \`temporary_disability_benefits_terminated_disability_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`temp_disability_benefits_terminated_previous_benefit_document\` ADD CONSTRAINT \`FK_tdbt_previous_benefit_document_to_previous_benefit\` FOREIGN KEY (\`temporary_disability_benefits_terminated_previous_benefit_id\`) REFERENCES \`temporary_disability_benefits_terminated_previous_benefit\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_terminated_insured_status\` ADD CONSTRAINT \`FK_tdbt_insured_status_to_flow\` FOREIGN KEY (\`temporary_disability_benefits_terminated_id\`) REFERENCES \`temporary_disability_benefits_terminated\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`temp_disability_benefits_terminated_insured_status_document\` ADD CONSTRAINT \`FK_tdbt_insured_status_document_to_status\` FOREIGN KEY (\`temporary_disability_benefits_terminated_insured_status_id\`) REFERENCES \`temporary_disability_benefits_terminated_insured_status\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_terminated_work_periods\` ADD CONSTRAINT \`FK_tdbt_work_periods_to_flow\` FOREIGN KEY (\`temporary_disability_benefits_terminated_id\`) REFERENCES \`temporary_disability_benefits_terminated\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`temp_disability_benefits_terminated_work_periods_earnings_hist\` ADD CONSTRAINT \`FK_tdbt_work_periods_earnings_history_to_period\` FOREIGN KEY (\`temporary_disability_benefits_terminated_work_periods_id\`) REFERENCES \`temporary_disability_benefits_terminated_work_periods\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_terminated_work_period_document\` ADD CONSTRAINT \`FK_tdbt_work_period_document_to_period\` FOREIGN KEY (\`temporary_disability_benefits_terminated_work_periods_id\`) REFERENCES \`temporary_disability_benefits_terminated_work_periods\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_tdbt_analysis_tool_record_to_flow\` FOREIGN KEY (\`temporary_disability_benefits_terminated_id\`) REFERENCES \`temporary_disability_benefits_terminated\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_tdbt_analysis_tool_record_to_flow\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_terminated_work_period_document\` DROP FOREIGN KEY \`FK_tdbt_work_period_document_to_period\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`temp_disability_benefits_terminated_work_periods_earnings_hist\` DROP FOREIGN KEY \`FK_tdbt_work_periods_earnings_history_to_period\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_terminated_work_periods\` DROP FOREIGN KEY \`FK_tdbt_work_periods_to_flow\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`temp_disability_benefits_terminated_insured_status_document\` DROP FOREIGN KEY \`FK_tdbt_insured_status_document_to_status\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_terminated_insured_status\` DROP FOREIGN KEY \`FK_tdbt_insured_status_to_flow\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`temp_disability_benefits_terminated_previous_benefit_document\` DROP FOREIGN KEY \`FK_tdbt_previous_benefit_document_to_previous_benefit\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_terminated_previous_benefit\` DROP FOREIGN KEY \`FK_tdbt_previous_benefit_to_analysis\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`temp_disability_benefits_terminated_disability_analysis_doc\` DROP FOREIGN KEY \`FK_tdbt_disability_document_to_analysis\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_terminated_disability_analysis_cid\` DROP FOREIGN KEY \`FK_tdbt_disability_cid_to_analysis\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_terminated_disability_analysis\` DROP FOREIGN KEY \`FK_tdbt_disability_analysis_to_flow\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_terminated_inss_benefit\` DROP FOREIGN KEY \`FK_tdbt_inss_benefit_to_flow\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_terminated_document\` DROP FOREIGN KEY \`FK_tdbt_document_to_flow\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`temporary_disability_benefits_terminated\` DROP FOREIGN KEY \`FK_tdbt_result\``,
    );

    await queryRunner.query(
      `DROP TABLE \`temporary_disability_benefits_terminated_work_period_document\``,
    );
    await queryRunner.query(
      `DROP TABLE \`temp_disability_benefits_terminated_work_periods_earnings_hist\``,
    );
    await queryRunner.query(
      `DROP TABLE \`temporary_disability_benefits_terminated_work_periods\``,
    );
    await queryRunner.query(
      `DROP TABLE \`temp_disability_benefits_terminated_insured_status_document\``,
    );
    await queryRunner.query(
      `DROP TABLE \`temporary_disability_benefits_terminated_insured_status\``,
    );
    await queryRunner.query(
      `DROP TABLE \`temp_disability_benefits_terminated_previous_benefit_document\``,
    );
    await queryRunner.query(
      `DROP TABLE \`temporary_disability_benefits_terminated_previous_benefit\``,
    );
    await queryRunner.query(
      `DROP TABLE \`temp_disability_benefits_terminated_disability_analysis_doc\``,
    );
    await queryRunner.query(
      `DROP TABLE \`temporary_disability_benefits_terminated_disability_analysis_cid\``,
    );
    await queryRunner.query(
      `DROP TABLE \`temporary_disability_benefits_terminated_disability_analysis\``,
    );
    await queryRunner.query(
      `DROP TABLE \`temporary_disability_benefits_terminated_inss_benefit\``,
    );
    await queryRunner.query(
      `DROP TABLE \`temporary_disability_benefits_terminated_document\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_tdbt_result_id\` ON \`temporary_disability_benefits_terminated\``,
    );
    await queryRunner.query(
      `DROP TABLE \`temporary_disability_benefits_terminated\``,
    );
    await queryRunner.query(
      `DROP TABLE \`temporary_disability_benefits_terminated_result\``,
    );

    await queryRunner.query(
      `ALTER TABLE \`payment_plan_paid_resource\` CHANGE \`resource\` \`resource\` enum (${this.buildMysqlEnum(
        this.paymentPlanPaidResourceValues.filter(
          (value) => !this.terminatedPaymentPlanResources.includes(value),
        ),
      )}) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` CHANGE \`type\` \`type\` enum (${this.buildMysqlEnum(
        this.analysisToolRecordTypeValues.filter(
          (value) =>
            value !==
            AnalysisToolRecordTypeEnum.TEMPORARY_DISABILITY_BENEFITS_TERMINATED,
        ),
      )}) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP COLUMN \`temporary_disability_benefits_terminated_id\``,
    );
  }

  private buildMysqlEnum(values: string[]): string {
    return values.map((value) => `'${value.replace(/'/g, "\\'")}'`).join(',');
  }
}
