import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { GeneralUrbanRetirementAnalysisPeriodDisabilityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-analysis-period-disability.typeorm.entity';
import { GeneralUrbanRetirementAnalysisPeriodSpecialTimeTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-analysis-period-special-time.typeorm.entity';
import { GeneralUrbanRetirementAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-analysis.typeorm.entity';
import { GeneralUrbanRetirementAnalysisPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-document/enum/general-urban-retirement-analysis-period-document-type.enum';

@Entity({ name: 'general_urban_retirement_analysis_period_document' })
export class GeneralUrbanRetirementAnalysisPeriodDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'document_type',
    type: 'simple-enum',
    enum: GeneralUrbanRetirementAnalysisPeriodDocumentTypeEnum,
    nullable: false,
    default: GeneralUrbanRetirementAnalysisPeriodDocumentTypeEnum.OTHER,
  })
  public documentType: GeneralUrbanRetirementAnalysisPeriodDocumentTypeEnum;

  @Column({
    name: 'document',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  public document: string;

  @ManyToOne(
    () => GeneralUrbanRetirementAnalysisPeriodSpecialTimeTypeormEntity,
    (entity) => entity.specialTimeDocuments,
    { nullable: true },
  )
  @JoinColumn({
    name: 'general_urban_retirement_analysis_period_special_time_id',
  })
  public generalUrbanRetirementAnalysisPeriodSpecialTime?:
    | GeneralUrbanRetirementAnalysisPeriodSpecialTimeTypeormEntity
    | undefined;

  @ManyToOne(
    () => GeneralUrbanRetirementAnalysisPeriodDisabilityTypeormEntity,
    (entity) => entity.disabilityDocuments,
    { nullable: true },
  )
  @JoinColumn({
    name: 'general_urban_retirement_analysis_period_disability_id',
  })
  public generalUrbanRetirementAnalysisPeriodDisability?:
    | GeneralUrbanRetirementAnalysisPeriodDisabilityTypeormEntity
    | undefined;

  @ManyToOne(
    () => GeneralUrbanRetirementAnalysisTypeormEntity,
    (entity) => entity.periodDocuments,
    { nullable: true },
  )
  @JoinColumn({ name: 'general_urban_retirement_analysis_id' })
  public generalUrbanRetirementAnalysis?:
    | GeneralUrbanRetirementAnalysisTypeormEntity
    | undefined;

  protected override readonly _type =
    GeneralUrbanRetirementAnalysisPeriodDocumentTypeormEntity.name;
}
