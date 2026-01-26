import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-and-social-report-objection-generator-analysis.entity';

@Entity({
  name: 'ms_report_objection_analysis_benefit',
})
export class MedicalAndSocialReportObjectionGeneratorAnalysisBenefitTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'inss_benefit_number',
    type: 'varchar',
    length: 100,
  })
  public inssBenefitNumber: string;

  @ManyToOne(
    () => MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity,
    (entity) => entity.medicalAndSocialReportObjectionGeneratorAnalysisBenefit,
  )
  @JoinColumn({
    name: 'ms_report_objection_analysis_id',
  })
  public msReportObjectionAnalysis:
    | MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity
    | undefined;

  protected override readonly _type =
    MedicalAndSocialReportObjectionGeneratorAnalysisBenefitTypeormEntity.name;
}
