import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-and-social-report-objection-generator-analysis.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';

@Entity({ name: 'medical_and_social_report_objection_generator_analysis_legal_proceeding' })
export class MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'legal_proceeding_number',
    type: 'varchar',
    length: 100,
  })
  public legalProceedingNumber: string;

  @ManyToOne(
    () => MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity,
    (entity) => entity.medicalAndSocialReportObjectionGeneratorAnalysisLegalProceeding,
  )
  @JoinColumn({ name: 'medical_and_social_report_objection_generator_analysis_id' })
  public medicalAndSocialReportObjectionGeneratorAnalysis:
    | MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity
    | undefined;

  protected override readonly _type =
    MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingTypeormEntity.name;
}

