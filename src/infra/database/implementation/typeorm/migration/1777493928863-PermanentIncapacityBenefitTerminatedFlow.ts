import { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';

import type { MigrationInterface, QueryRunner } from 'typeorm';

export class PermanentIncapacityBenefitTerminatedFlow1777493928863 implements MigrationInterface {
  name = 'PermanentIncapacityBenefitTerminatedFlow1777493928863';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`permanent_incapacity_benefit_terminated_disability_analysis_cid\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`cid_ten_id\` varchar(50) NOT NULL, \`permanent_incapacity_benefit_terminated_disability_analysis_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`perm_incapacity_benefit_terminated_disability_analysis_doc\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`file_name\` varchar(255) NOT NULL, \`type\` varchar(100) NOT NULL, \`permanent_incapacity_benefit_terminated_disability_analysis_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`permanent_incapacity_benefit_terminated_disability_analysis\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`estimated_disability_start_date\` date NOT NULL, \`short_disability_description\` text NULL, \`disability_from_accident\` tinyint NOT NULL, \`disabling_condition_description\` text NULL, \`disability_from_severe_disease\` tinyint NOT NULL, \`severe_disease\` varchar(100) NULL, \`disease_custom_name\` varchar(255) NULL, \`disease_start_date\` date NULL, \`needs_constant_assistance_from_another_person\` tinyint NOT NULL, \`previous_disability_benefit\` tinyint NOT NULL, \`previous_benefit_number\` varchar(100) NULL, \`permanent_incapacity_benefit_terminated_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`permanent_incapacity_benefit_terminated_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`file_name\` varchar(255) NOT NULL, \`type\` varchar(100) NOT NULL, \`permanent_incapacity_benefit_terminated_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`permanent_incapacity_benefit_terminated_inss_benefit\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`inss_benefit\` varchar(255) NOT NULL, \`permanent_incapacity_benefit_terminated_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`perm_incapacity_benefit_terminated_insured_status_document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`file_name\` varchar(255) NOT NULL, \`type\` varchar(100) NOT NULL, \`permanent_incapacity_benefit_terminated_insured_status_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`permanent_incapacity_benefit_terminated_insured_status\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`involuntary_unemployment\` tinyint NOT NULL, \`intention_to_prove_involuntary_unemployment\` tinyint NOT NULL, \`rural_insured_client\` tinyint NOT NULL, \`rural_period_start_date\` date NULL, \`rural_period_end_date\` date NULL, \`documents_description\` text NULL, \`permanent_incapacity_benefit_terminated_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`permanent_incapacity_benefit_terminated_result\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`inss_decision_analysis\` longtext NULL, \`first_analysis\` longtext NULL, \`complete_analysis\` longtext NULL, \`complete_analysis_download\` longtext NULL, \`simplified_analysis\` longtext NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`perm_incap_benefit_term_work_periods_earnings_history\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`competence\` date NULL, \`remuneration\` longtext NULL, \`indicators\` longtext NULL, \`payment_date\` date NULL, \`contribution\` longtext NULL, \`contribution_salary\` longtext NULL, \`competence_below_the_minimum\` tinyint NULL, \`permanent_incapacity_benefit_terminated_work_periods_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`permanent_incapacity_benefit_terminated_work_periods\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`bond_origin\` varchar(255) NULL, \`start_date\` date NOT NULL, \`end_date\` date NULL, \`category\` varchar(100) NULL, \`activity_description\` text NULL, \`competence_below_the_minimum\` tinyint NOT NULL, \`pendency_reason\` varchar(100) NULL, \`period_consideration\` varchar(50) NULL, \`contribution_average\` decimal(15,2) NULL, \`impact_months\` int NULL, \`grace_period\` int NULL, \`is_pendency\` tinyint NOT NULL, \`wants_to_complement_via_meu_inss\` tinyint NULL, \`status\` tinyint NOT NULL, \`permanent_incapacity_benefit_terminated_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`permanent_incapacity_benefit_terminated\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`analysis_name\` varchar(255) NULL, \`benefit_termination_date\` date NULL, \`category\` varchar(100) NULL, \`termination_reason\` varchar(255) NULL, \`termination_reason_description\` text NULL, \`permanent_incapacity_benefit_terminated_result_id\` varchar(36) NULL, UNIQUE INDEX \`REL_2aa6487eb982db09ee51ab3598\` (\`permanent_incapacity_benefit_terminated_result_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    if (
      !(await queryRunner.hasColumn(
        'analysis_tool_record',
        'permanent_incapacity_benefit_terminated_id',
      ))
    ) {
      await queryRunner.query(
        `ALTER TABLE \`analysis_tool_record\` ADD \`permanent_incapacity_benefit_terminated_id\` varchar(36) NULL`,
      );
    }
    await this.changeAnalysisToolRecordTypeEnum(
      queryRunner,
      Object.values(AnalysisToolRecordTypeEnum),
    );
    await this.changePaymentResourceEnum(queryRunner, [
      ...Object.values(PaymentPlanPaidResourceTypeEnum),
      ...this.legacyTemporaryIncapacityBenefitTerminationResources,
    ]);
    await this.migrateLegacyPaymentPlanPaidResources(queryRunner);
    await this.upsertPermanentPaymentPlanPaidResources(queryRunner);
    await this.changePaymentResourceEnum(
      queryRunner,
      Object.values(PaymentPlanPaidResourceTypeEnum),
    );
    await queryRunner.query(
      `ALTER TABLE \`permanent_incapacity_benefit_terminated_disability_analysis_cid\` ADD CONSTRAINT \`FK_e38f95f346a7f5be3a4d2953676\` FOREIGN KEY (\`permanent_incapacity_benefit_terminated_disability_analysis_id\`) REFERENCES \`permanent_incapacity_benefit_terminated_disability_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`perm_incapacity_benefit_terminated_disability_analysis_doc\` ADD CONSTRAINT \`FK_1b1814bd22687b3811814192f00\` FOREIGN KEY (\`permanent_incapacity_benefit_terminated_disability_analysis_id\`) REFERENCES \`permanent_incapacity_benefit_terminated_disability_analysis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`permanent_incapacity_benefit_terminated_disability_analysis\` ADD CONSTRAINT \`FK_24045e4be93f5355120ab405dcb\` FOREIGN KEY (\`permanent_incapacity_benefit_terminated_id\`) REFERENCES \`permanent_incapacity_benefit_terminated\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`permanent_incapacity_benefit_terminated_document\` ADD CONSTRAINT \`FK_273deac9a1b9d2e90cd2344474c\` FOREIGN KEY (\`permanent_incapacity_benefit_terminated_id\`) REFERENCES \`permanent_incapacity_benefit_terminated\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`permanent_incapacity_benefit_terminated_inss_benefit\` ADD CONSTRAINT \`FK_1fbdaa0461d848898872550b981\` FOREIGN KEY (\`permanent_incapacity_benefit_terminated_id\`) REFERENCES \`permanent_incapacity_benefit_terminated\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`perm_incapacity_benefit_terminated_insured_status_document\` ADD CONSTRAINT \`FK_74b119624c0ae319556ead779a7\` FOREIGN KEY (\`permanent_incapacity_benefit_terminated_insured_status_id\`) REFERENCES \`permanent_incapacity_benefit_terminated_insured_status\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`permanent_incapacity_benefit_terminated_insured_status\` ADD CONSTRAINT \`FK_eab65c7041541e900b981b49a06\` FOREIGN KEY (\`permanent_incapacity_benefit_terminated_id\`) REFERENCES \`permanent_incapacity_benefit_terminated\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`perm_incap_benefit_term_work_periods_earnings_history\` ADD CONSTRAINT \`FK_a36ce6345d5fd1f98dec30ff31f\` FOREIGN KEY (\`permanent_incapacity_benefit_terminated_work_periods_id\`) REFERENCES \`permanent_incapacity_benefit_terminated_work_periods\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`permanent_incapacity_benefit_terminated_work_periods\` ADD CONSTRAINT \`FK_4e60abfc6b9fe306f23b74bbf69\` FOREIGN KEY (\`permanent_incapacity_benefit_terminated_id\`) REFERENCES \`permanent_incapacity_benefit_terminated\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`permanent_incapacity_benefit_terminated\` ADD CONSTRAINT \`FK_2aa6487eb982db09ee51ab35987\` FOREIGN KEY (\`permanent_incapacity_benefit_terminated_result_id\`) REFERENCES \`permanent_incapacity_benefit_terminated_result\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` ADD CONSTRAINT \`FK_c7c16cdd5a55b0cbef6ee6b4a16\` FOREIGN KEY (\`permanent_incapacity_benefit_terminated_id\`) REFERENCES \`permanent_incapacity_benefit_terminated\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  private async upsertPermanentPaymentPlanPaidResources(
    queryRunner: QueryRunner,
  ): Promise<void> {
    for (const resource of this.permanentPaymentPlanPaidResources) {
      await queryRunner.query(
        `INSERT INTO \`payment_plan_paid_resource\` (\`id\`, \`created_at\`, \`updated_at\`, \`deleted_at\`, \`resource\`, \`credit_cost\`, \`title\`, \`description\`)
         VALUES (?, CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6), NULL, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
           \`deleted_at\` = NULL,
           \`credit_cost\` = VALUES(\`credit_cost\`),
           \`title\` = VALUES(\`title\`),
           \`description\` = VALUES(\`description\`),
           \`updated_at\` = CURRENT_TIMESTAMP(6)`,
        [
          resource.id,
          resource.resource,
          resource.creditCost,
          resource.title,
          resource.description,
        ],
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP FOREIGN KEY \`FK_c7c16cdd5a55b0cbef6ee6b4a16\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`permanent_incapacity_benefit_terminated\` DROP FOREIGN KEY \`FK_2aa6487eb982db09ee51ab35987\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`permanent_incapacity_benefit_terminated_work_periods\` DROP FOREIGN KEY \`FK_4e60abfc6b9fe306f23b74bbf69\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`perm_incap_benefit_term_work_periods_earnings_history\` DROP FOREIGN KEY \`FK_a36ce6345d5fd1f98dec30ff31f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`permanent_incapacity_benefit_terminated_insured_status\` DROP FOREIGN KEY \`FK_eab65c7041541e900b981b49a06\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`perm_incapacity_benefit_terminated_insured_status_document\` DROP FOREIGN KEY \`FK_74b119624c0ae319556ead779a7\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`permanent_incapacity_benefit_terminated_inss_benefit\` DROP FOREIGN KEY \`FK_1fbdaa0461d848898872550b981\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`permanent_incapacity_benefit_terminated_document\` DROP FOREIGN KEY \`FK_273deac9a1b9d2e90cd2344474c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`permanent_incapacity_benefit_terminated_disability_analysis\` DROP FOREIGN KEY \`FK_24045e4be93f5355120ab405dcb\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`perm_incapacity_benefit_terminated_disability_analysis_doc\` DROP FOREIGN KEY \`FK_1b1814bd22687b3811814192f00\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`permanent_incapacity_benefit_terminated_disability_analysis_cid\` DROP FOREIGN KEY \`FK_e38f95f346a7f5be3a4d2953676\``,
    );
    await this.changeAnalysisToolRecordTypeEnum(
      queryRunner,
      Object.values(AnalysisToolRecordTypeEnum).filter(
        (value) =>
          value !==
          AnalysisToolRecordTypeEnum.PERMANENT_INCAPACITY_BENEFIT_TERMINATED,
      ),
    );
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` DROP COLUMN \`permanent_incapacity_benefit_terminated_id\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_2aa6487eb982db09ee51ab3598\` ON \`permanent_incapacity_benefit_terminated\``,
    );
    await queryRunner.query(
      `DROP TABLE \`permanent_incapacity_benefit_terminated\``,
    );
    await queryRunner.query(
      `DROP TABLE \`permanent_incapacity_benefit_terminated_work_periods\``,
    );
    await queryRunner.query(
      `DROP TABLE \`perm_incap_benefit_term_work_periods_earnings_history\``,
    );
    await queryRunner.query(
      `DROP TABLE \`permanent_incapacity_benefit_terminated_result\``,
    );
    await queryRunner.query(
      `DROP TABLE \`permanent_incapacity_benefit_terminated_insured_status\``,
    );
    await queryRunner.query(
      `DROP TABLE \`perm_incapacity_benefit_terminated_insured_status_document\``,
    );
    await queryRunner.query(
      `DROP TABLE \`permanent_incapacity_benefit_terminated_inss_benefit\``,
    );
    await queryRunner.query(
      `DROP TABLE \`permanent_incapacity_benefit_terminated_document\``,
    );
    await queryRunner.query(
      `DROP TABLE \`permanent_incapacity_benefit_terminated_disability_analysis\``,
    );
    await queryRunner.query(
      `DROP TABLE \`perm_incapacity_benefit_terminated_disability_analysis_doc\``,
    );
    await queryRunner.query(
      `DROP TABLE \`permanent_incapacity_benefit_terminated_disability_analysis_cid\``,
    );
  }

  private async changePaymentResourceEnum(
    queryRunner: QueryRunner,
    values: string[],
  ): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`payment_plan_paid_resource\` CHANGE \`resource\` \`resource\` enum(${this.toSqlEnum(values)}) NOT NULL`,
    );
  }

  private async migrateLegacyPaymentPlanPaidResources(
    queryRunner: QueryRunner,
  ): Promise<void> {
    for (const [legacyResource, permanentResource] of Object.entries(
      this.legacyToPermanentPaymentResourceMap,
    )) {
      await queryRunner.query(
        `UPDATE \`payment_plan_paid_resource\` SET \`resource\` = ? WHERE \`resource\` = ?`,
        [permanentResource, legacyResource],
      );
    }
  }

  private async changeAnalysisToolRecordTypeEnum(
    queryRunner: QueryRunner,
    values: AnalysisToolRecordTypeEnum[],
  ): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` CHANGE \`type\` \`type\` enum(${this.toSqlEnum(values)}) NOT NULL`,
    );
  }

  private toSqlEnum(values: string[]): string {
    return [...new Set(values)]
      .map((value) => `'${value.replace(/'/g, "''")}'`)
      .join(', ');
  }

  private readonly legacyToPermanentPaymentResourceMap: Record<
    string,
    PaymentPlanPaidResourceTypeEnum
  > = {
    TEMPORARY_INCAPACITY_BENEFIT_TERMINATION_INSS_DECISION_ANALYSIS:
      PaymentPlanPaidResourceTypeEnum.PERMANENT_INCAPACITY_BENEFIT_TERMINATED_INSS_DECISION_ANALYSIS,
    TEMPORARY_INCAPACITY_BENEFIT_TERMINATION_FIRST_ANALYSIS:
      PaymentPlanPaidResourceTypeEnum.PERMANENT_INCAPACITY_BENEFIT_TERMINATED_FIRST_ANALYSIS,
    TEMPORARY_INCAPACITY_BENEFIT_TERMINATION_COMPLETE_ANALYSIS:
      PaymentPlanPaidResourceTypeEnum.PERMANENT_INCAPACITY_BENEFIT_TERMINATED_COMPLETE_ANALYSIS,
    TEMPORARY_INCAPACITY_BENEFIT_TERMINATION_SIMPLIFIED_ANALYSIS:
      PaymentPlanPaidResourceTypeEnum.PERMANENT_INCAPACITY_BENEFIT_TERMINATED_SIMPLIFIED_ANALYSIS,
  };

  private readonly legacyTemporaryIncapacityBenefitTerminationResources =
    Object.keys(this.legacyToPermanentPaymentResourceMap);

  private readonly permanentPaymentPlanPaidResources = [
    {
      id: 'a1b2c3d4-e5f6-4a7b-9c8d-1e2f3a4b5c6d',
      resource:
        PaymentPlanPaidResourceTypeEnum.PERMANENT_INCAPACITY_BENEFIT_TERMINATED_INSS_DECISION_ANALYSIS,
      creditCost: 5,
      title:
        'Análise de Decisão do INSS (Cessação Aposentadoria por Incapacidade Permanente)',
      description:
        'Análise da carta de cessação e documentos do processo administrativo do INSS com IA para aposentadoria por incapacidade permanente. Examina o fundamento da cessação, identifica erros de cálculo ou enquadramento legal, aponta eventuais irregularidades processuais e orienta sobre a melhor estratégia de reversão — administrativa ou judicial.',
    },
    {
      id: 'b2c3d4e5-f6a7-4b8c-ad9e-2f3a4b5c6d7e',
      resource:
        PaymentPlanPaidResourceTypeEnum.PERMANENT_INCAPACITY_BENEFIT_TERMINATED_FIRST_ANALYSIS,
      creditCost: 5,
      title:
        'Primeira Análise (Cessação Aposentadoria por Incapacidade Permanente)',
      description:
        'Primeira análise de cessação de aposentadoria por incapacidade permanente com IA, combinando os dados estruturados do caso com a leitura e interpretação do CNIS. Gera parecer inicial técnico sobre tempo de contribuição, carência, períodos relevantes, pontos de atenção e viabilidade preliminar de reversão da cessação.',
    },
    {
      id: 'c3d4e5f6-a7b8-4c9d-be1f-3a4b5c6d7e8f',
      resource:
        PaymentPlanPaidResourceTypeEnum.PERMANENT_INCAPACITY_BENEFIT_TERMINATED_COMPLETE_ANALYSIS,
      creditCost: 8,
      title:
        'Análise Completa (Cessação Aposentadoria por Incapacidade Permanente)',
      description:
        'Análise completa de cessação de aposentadoria por incapacidade permanente com IA. Consolida o histórico contributivo, os períodos analisados, a decisão de cessação do INSS e a condição de incapacidade, gerando parecer técnico detalhado com enquadramento nas regras aplicáveis, fundamentação jurídica, estratégia processual recomendada e perspectivas do caso.',
    },
    {
      id: 'd4e5f6a7-b8c9-4d0e-8f2a-4b5c6d7e8f9a',
      resource:
        PaymentPlanPaidResourceTypeEnum.PERMANENT_INCAPACITY_BENEFIT_TERMINATED_SIMPLIFIED_ANALYSIS,
      creditCost: 3,
      title:
        'Análise Simplificada (Cessação Aposentadoria por Incapacidade Permanente)',
      description:
        'Análise simplificada de cessação de aposentadoria por incapacidade permanente com IA. Resume os principais achados da análise completa, indica a viabilidade geral do caso, os pontos críticos e os próximos passos recomendados, em linguagem acessível para apresentação ao cliente.',
    },
  ];
}
