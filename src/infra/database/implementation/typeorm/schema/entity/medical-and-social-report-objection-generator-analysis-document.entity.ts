import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-and-social-report-objection-generator-analysis.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-document/enum/medical-and-social-report-objection-generator-analysis-document-type.enum';

@Entity({
  name: 'ms_report_objection_analysis_document',
})
export class MedicalAndSocialReportObjectionGeneratorAnalysisDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document', type: 'varchar' })
  public document: string;

  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: MedicalAndSocialReportObjectionGeneratorAnalysisDocumentTypeEnum,
  })
  public type: MedicalAndSocialReportObjectionGeneratorAnalysisDocumentTypeEnum;

  @ManyToOne(
    () => MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity,
  )
  @JoinColumn({
    // eslint-disable-next-line typeorm-rule/require-column-name-and-match
    name: 'ms_report_objection_analysis_id',
  })
  public medicalAndSocialReportObjectionGeneratorAnalysis?:
    | MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity
    | undefined;

  protected override readonly _type =
    MedicalAndSocialReportObjectionGeneratorAnalysisDocumentTypeormEntity.name;
}
