import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-and-social-report-objection-generator-analysis.entity';

@Entity({
  name: 'ms_report_objection_analysis_legal_proc',
})
export class MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'legal_proceeding_number',
    type: 'varchar',
    length: 100,
  })
  public legalProceedingNumber: string;

  @ManyToOne(
    () => MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity,
    (entity) =>
      entity.medicalAndSocialReportObjectionGeneratorAnalysisLegalProceeding,
  )
  // eslint-disable-next-line typeorm-rule/require-column-name-and-match
  @JoinColumn({ name: 'ms_report_objection_analysis_id' })
  public medicalAndSocialReportObjectionGeneratorAnalysis:
    | MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity
    | undefined;

  protected override readonly _type =
    MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingTypeormEntity.name;
}
