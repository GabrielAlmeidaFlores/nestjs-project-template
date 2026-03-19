import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { CidTenTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cid-ten.typeorm.entity';
import { GeneralUrbanRetirementAnalysisPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-analysis-period-document.typeorm.entity';
import { GeneralUrbanRetirementAnalysisPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-analysis-period.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { GeneralUrbanRetirementAnalysisPeriodDisabilityCategoryEnum } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-disability/enum/general-urban-retirement-analysis-period-disability-category.enum';
import { GeneralUrbanRetirementAnalysisPeriodDisabilityDegreeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-disability/enum/general-urban-retirement-analysis-period-disability-degree.enum';
import { GeneralUrbanRetirementAnalysisPeriodDisabilityTimeTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-disability/enum/general-urban-retirement-analysis-period-disability-time-type.enum';

@Entity({ name: 'general_urban_retirement_analysis_period_disability' })
export class GeneralUrbanRetirementAnalysisPeriodDisabilityTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: GeneralUrbanRetirementAnalysisPeriodDisabilityTimeTypeEnum,
    nullable: false,
  })
  public type: GeneralUrbanRetirementAnalysisPeriodDisabilityTimeTypeEnum;

  @Column({
    name: 'degree',
    type: 'simple-enum',
    enum: GeneralUrbanRetirementAnalysisPeriodDisabilityDegreeEnum,
    nullable: false,
  })
  public degree: GeneralUrbanRetirementAnalysisPeriodDisabilityDegreeEnum;

  @Column({
    name: 'start_date',
    type: 'date',
    transformer: DateOnlyTransformer,
    nullable: false,
  })
  public startDate: Date;

  @Column({
    name: 'end_date',
    type: 'date',
    transformer: DateOnlyTransformer,
    nullable: false,
  })
  public endDate: Date;

  @Column({
    name: 'category',
    type: 'simple-enum',
    enum: GeneralUrbanRetirementAnalysisPeriodDisabilityCategoryEnum,
    nullable: false,
  })
  public category: GeneralUrbanRetirementAnalysisPeriodDisabilityCategoryEnum;

  @Column({
    name: 'daily_impact',
    type: 'text',
    nullable: false,
  })
  public dailyImpact: string;

  @Column({
    name: 'description',
    type: 'text',
    nullable: false,
  })
  public description: string;

  @Column({
    name: 'lawyer_observations',
    type: 'text',
    nullable: true,
  })
  public lawyerObservations: string | null;

  @ManyToOne(() => CidTenTypeormEntity)
  @JoinColumn({ name: 'cid_id' })
  public cid: CidTenTypeormEntity | null;

  @OneToMany(
    () => GeneralUrbanRetirementAnalysisPeriodDocumentTypeormEntity,
    (entity) => entity.generalUrbanRetirementAnalysisPeriodDisability,
  )
  public disabilityDocuments: GeneralUrbanRetirementAnalysisPeriodDocumentTypeormEntity[] | null;

  @OneToOne(
    () => GeneralUrbanRetirementAnalysisPeriodTypeormEntity,
    (entity) => entity.disabilityPeriod,
  )
  @JoinColumn({ name: 'general_urban_retirement_analysis_period_id' })
  public generalUrbanRetirementAnalysisPeriod: GeneralUrbanRetirementAnalysisPeriodTypeormEntity | null;

  protected override readonly _type =
    GeneralUrbanRetirementAnalysisPeriodDisabilityTypeormEntity.name;
}
