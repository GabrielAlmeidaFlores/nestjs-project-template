import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';

import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-and-social-report-objection-generator-analysis-benefit.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-and-social-report-objection-generator-analysis-document.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-and-social-report-objection-generator-analysis-legal-proceeding.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-and-social-report-objection-generator-analysis-result.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';

@Entity({ name: 'ms_report_objection_analysis' })
export class MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity extends BaseTypeormEntity {
  @OneToOne(
    () => MedicalAndSocialReportObjectionGeneratorAnalysisResultTypeormEntity,
    (entity) => entity.medicalAndSocialReportObjectionGeneratorAnalysis,
    { nullable: true },
  )
  @JoinColumn({
    // eslint-disable-next-line typeorm-rule/require-column-name-and-match
    name: 'ms_report_objection_analysis_result_id',
  })
  public medicalAndSocialReportObjectionGeneratorAnalysisResult?:
    | MedicalAndSocialReportObjectionGeneratorAnalysisResultTypeormEntity
    | undefined;

  @OneToMany(
    () => MedicalAndSocialReportObjectionGeneratorAnalysisBenefitTypeormEntity,
    (entity) => entity.medicalAndSocialReportObjectionGeneratorAnalysis,
  )
  public medicalAndSocialReportObjectionGeneratorAnalysisBenefit?:
    | MedicalAndSocialReportObjectionGeneratorAnalysisBenefitTypeormEntity[]
    | undefined;

  @OneToMany(
    () =>
      MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingTypeormEntity,
    (entity) => entity.medicalAndSocialReportObjectionGeneratorAnalysis,
  )
  public medicalAndSocialReportObjectionGeneratorAnalysisLegalProceeding?:
    | MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingTypeormEntity[]
    | undefined;

  @OneToMany(
    () => MedicalAndSocialReportObjectionGeneratorAnalysisDocumentTypeormEntity,
    (entity) => entity.medicalAndSocialReportObjectionGeneratorAnalysis,
  )
  public medicalAndSocialReportObjectionGeneratorAnalysisDocument?:
    | MedicalAndSocialReportObjectionGeneratorAnalysisDocumentTypeormEntity[]
    | undefined;

  @OneToOne(
    () => AnalysisToolRecordTypeormEntity,
    (entity) => entity.medicalAndSocialReportObjectionGeneratorAnalysis,
    { nullable: true },
  )
  public analysisToolRecord?: AnalysisToolRecordTypeormEntity | undefined;

  @ManyToOne(() => OrganizationMemberTypeormEntity)
  @JoinColumn({ name: 'created_by_id' })
  public createdBy?: OrganizationMemberTypeormEntity | undefined;

  @ManyToOne(() => OrganizationMemberTypeormEntity)
  @JoinColumn({ name: 'updated_by_id' })
  public updatedBy?: OrganizationMemberTypeormEntity | undefined;

  protected override readonly _type =
    MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity.name;
}
