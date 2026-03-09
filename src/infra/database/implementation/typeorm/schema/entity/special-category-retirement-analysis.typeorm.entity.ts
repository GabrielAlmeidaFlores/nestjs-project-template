import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

import { AnalysisToolClientTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client.typeorm.entity';
import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { SpecialCategoryRetirementAnalysisRemunerationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-category-retirement-analysis-remuneration.typeorm.entity';
import { SpecialCategoryRetirementAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-category-retirement-analysis-result.typeorm.entity';
import { SpecialCategoryRetirementAnalysisWorkPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-category-retirement-analysis-work-period.typeorm.entity';
import { RetirementAnalysisObjectiveTypeEnum } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/enum/retirement-analysis-objective-type.enum';

@Entity({ name: 'special_category_retirement_analysis' })
export class SpecialCategoryRetirementAnalysisTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'analysis_custom_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public analysisCustomName: string | null;

  @Column({
    name: 'retirement_analysis_objective_type',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  public retirementAnalysisObjectiveType: RetirementAnalysisObjectiveTypeEnum | null;

  @Column({
    name: 'public_service_federative_entity_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public publicServiceFederativeEntityName: string | null;

  @Column({
    name: 'public_service_state_abbreviation',
    type: 'char',
    length: 2,
    nullable: true,
  })
  public publicServiceStateAbbreviation: string | null;

  @Column({
    name: 'has_confirmed_exposure_to_harmful_agents',
    type: 'boolean',
    default: false,
  })
  public hasConfirmedExposureToHarmfulAgents: boolean;

  @ManyToOne(() => AnalysisToolClientTypeormEntity)
  @JoinColumn({ name: 'analysis_tool_client_id' })
  public analysisToolClient?: AnalysisToolClientTypeormEntity | undefined;

  @OneToMany(
    () => SpecialCategoryRetirementAnalysisWorkPeriodTypeormEntity,
    (entity) => entity.specialCategoryRetirementAnalysis,
  )
  public workPeriods?:
    | SpecialCategoryRetirementAnalysisWorkPeriodTypeormEntity[]
    | undefined;

  @OneToMany(
    () => SpecialCategoryRetirementAnalysisRemunerationTypeormEntity,
    (entity) => entity.specialCategoryRetirementAnalysis,
  )
  public remunerations?:
    | SpecialCategoryRetirementAnalysisRemunerationTypeormEntity[]
    | undefined;

  @OneToOne(
    () => SpecialCategoryRetirementAnalysisResultTypeormEntity,
    (entity) => entity.specialCategoryRetirementAnalysis,
  )
  public analysisResult?:
    | SpecialCategoryRetirementAnalysisResultTypeormEntity
    | undefined;

  @OneToOne(
    () => AnalysisToolRecordTypeormEntity,
    (entity) => entity.specialCategoryRetirementAnalysis,
  )
  public analysisToolRecord?: AnalysisToolRecordTypeormEntity | undefined;

  protected override readonly _type =
    SpecialCategoryRetirementAnalysisTypeormEntity.name;
}
