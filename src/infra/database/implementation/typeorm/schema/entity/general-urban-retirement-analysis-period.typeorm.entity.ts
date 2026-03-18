import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { GeneralUrbanRetirementAnalysisPeriodDisabilityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-analysis-period-disability.typeorm.entity';
import { GeneralUrbanRetirementAnalysisPeriodSpecialTimeTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-analysis-period-special-time.typeorm.entity';
import { GeneralUrbanRetirementAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-analysis.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { GeneralUrbanRetirementAnalysisPeriodServiceTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period/enum/general-urban-retirement-analysis-period-service-type.enum';

@Entity({ name: 'general_urban_retirement_analysis_period' })
export class GeneralUrbanRetirementAnalysisPeriodTypeormEntity extends BaseTypeormEntity {
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
    name: 'job_position',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  public jobPosition: string;

  @Column({
    name: 'career',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  public career: string;

  @Column({
    name: 'service_type',
    type: 'simple-enum',
    nullable: false,
    enum: GeneralUrbanRetirementAnalysisPeriodServiceTypeEnum,
  })
  public serviceType: GeneralUrbanRetirementAnalysisPeriodServiceTypeEnum;

  @Column({
    name: 'department',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  public department: string;

  @OneToOne(
    () => GeneralUrbanRetirementAnalysisPeriodSpecialTimeTypeormEntity,
    (entity) => entity.generalUrbanRetirementAnalysisPeriod,
  )
  public specialTimePeriod: GeneralUrbanRetirementAnalysisPeriodSpecialTimeTypeormEntity | null;

  @OneToOne(
    () => GeneralUrbanRetirementAnalysisPeriodDisabilityTypeormEntity,
    (entity) => entity.generalUrbanRetirementAnalysisPeriod,
  )
  public disabilityPeriod: GeneralUrbanRetirementAnalysisPeriodDisabilityTypeormEntity | null;

  @ManyToOne(
    () => GeneralUrbanRetirementAnalysisTypeormEntity,
    (entity) => entity.periods,
  )
  @JoinColumn({ name: 'general_urban_retirement_analysis_id' })
  public generalUrbanRetirementAnalysis: GeneralUrbanRetirementAnalysisTypeormEntity | null;

  protected override readonly _type =
    GeneralUrbanRetirementAnalysisPeriodTypeormEntity.name;
}
