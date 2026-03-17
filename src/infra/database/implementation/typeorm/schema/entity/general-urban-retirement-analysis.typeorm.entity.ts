import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { GeneralUrbanRetirementAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-analysis-document.typeorm.entity';
import { GeneralUrbanRetirementAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-analysis-legal-proceeding.typeorm.entity';
import { GeneralUrbanRetirementAnalysisPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-analysis-period-document.typeorm.entity';
import { GeneralUrbanRetirementAnalysisPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-analysis-period.typeorm.entity';
import { GeneralUrbanRetirementAnalysisRemunerationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-analysis-remuneration.typeorm.entity';
import { GeneralUrbanRetirementAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-analysis-result.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { GeneralUrbanRetirementAnalysisBenefitTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/enum/general-urban-retirement-analysis-benefit-type.enum';
import { GeneralUrbanRetirementAnalysisFederativeEntityEnum } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/enum/general-urban-retirement-analysis-federative-entity.enum';

@Entity({ name: 'general_urban_retirement_analysis' })
export class GeneralUrbanRetirementAnalysisTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'career_start_date',
    type: 'date',
    transformer: DateOnlyTransformer,
    nullable: true,
  })
  public careerStartDate: Date | null;

  @Column({
    name: 'public_service_start_date',
    type: 'date',
    transformer: DateOnlyTransformer,
    nullable: true,
  })
  public publicServiceStartDate: Date | null;

  @Column({
    name: 'general_urban_retirement_benefit_analysis',
    type: 'longtext',
    nullable: true,
  })
  public generalUrbanRetirementBenefitAnalysis: string | null;

  @Column({
    name: 'federative_entity',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  public federativeEntity: GeneralUrbanRetirementAnalysisFederativeEntityEnum | null;

  @Column({
    name: 'state',
    type: 'varchar',
    length: 2,
    nullable: true,
  })
  public state: StateCodeEnum | null;

  @Column({
    name: 'municipality',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public municipality: string | null;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public name: string | null;

  @Column({
    name: 'benefit_type',
    type: 'simple-enum',
    nullable: true,
    enum: GeneralUrbanRetirementAnalysisBenefitTypeEnum,
  })
  public benefitType: GeneralUrbanRetirementAnalysisBenefitTypeEnum | null;

  @Column({
    name: 'current_position',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public currentPosition: string | null;

  @OneToOne(
    () => GeneralUrbanRetirementAnalysisResultTypeormEntity,
    (entity) => entity.generalUrbanRetirementAnalysis,
  )
  @JoinColumn({ name: 'general_urban_retirement_analysis_result_id' })
  public generalUrbanRetirementAnalysisResult?:
    | GeneralUrbanRetirementAnalysisResultTypeormEntity
    | undefined;

  @OneToOne(
    () => AnalysisToolRecordTypeormEntity,
    (entity) => entity.generalUrbanRetirementAnalysis,
  )
  public analysisToolRecord?: AnalysisToolRecordTypeormEntity | undefined;

  @OneToMany(
    () => GeneralUrbanRetirementAnalysisDocumentTypeormEntity,
    (entity) => entity.generalUrbanRetirementAnalysis,
  )
  public documents?:
    | GeneralUrbanRetirementAnalysisDocumentTypeormEntity[]
    | undefined;

  @OneToMany(
    () => GeneralUrbanRetirementAnalysisRemunerationTypeormEntity,
    (entity) => entity.generalUrbanRetirementAnalysis,
  )
  public remunerations?:
    | GeneralUrbanRetirementAnalysisRemunerationTypeormEntity[]
    | undefined;

  @OneToMany(
    () => GeneralUrbanRetirementAnalysisLegalProceedingTypeormEntity,
    (entity) => entity.generalUrbanRetirementAnalysis,
  )
  public legalProceedings?:
    | GeneralUrbanRetirementAnalysisLegalProceedingTypeormEntity[]
    | undefined;

  @OneToMany(
    () => GeneralUrbanRetirementAnalysisPeriodTypeormEntity,
    (entity) => entity.generalUrbanRetirementAnalysis,
  )
  public periods?:
    | GeneralUrbanRetirementAnalysisPeriodTypeormEntity[]
    | undefined;

  @OneToMany(
    () => GeneralUrbanRetirementAnalysisPeriodDocumentTypeormEntity,
    (entity) => entity.generalUrbanRetirementAnalysis,
  )
  public periodDocuments?:
    | GeneralUrbanRetirementAnalysisPeriodDocumentTypeormEntity[]
    | undefined;

  protected override readonly _type =
    GeneralUrbanRetirementAnalysisTypeormEntity.name;
}
