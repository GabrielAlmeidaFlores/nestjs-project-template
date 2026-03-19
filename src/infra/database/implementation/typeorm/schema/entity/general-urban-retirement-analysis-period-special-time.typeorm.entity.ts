import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { GeneralUrbanRetirementAnalysisPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-analysis-period-document.typeorm.entity';
import { GeneralUrbanRetirementAnalysisPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-analysis-period.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { GeneralUrbanRetirementAnalysisPeriodSpecialTimeTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period/enum/general-urban-retirement-analysis-period-special-time-type.enum';

@Entity({ name: 'general_urban_retirement_analysis_period_special_time' })
export class GeneralUrbanRetirementAnalysisPeriodSpecialTimeTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: GeneralUrbanRetirementAnalysisPeriodSpecialTimeTypeEnum,
    nullable: false,
  })
  public type: GeneralUrbanRetirementAnalysisPeriodSpecialTimeTypeEnum;

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
    name: 'lawyer_observations',
    type: 'text',
    nullable: true,
  })
  public lawyerObservations: string | null;

  @OneToMany(
    () => GeneralUrbanRetirementAnalysisPeriodDocumentTypeormEntity,
    (entity) => entity.generalUrbanRetirementAnalysisPeriodSpecialTime,
  )
  public specialTimeDocuments:
    | GeneralUrbanRetirementAnalysisPeriodDocumentTypeormEntity[]
    | null;

  @OneToOne(
    () => GeneralUrbanRetirementAnalysisPeriodTypeormEntity,
    (entity) => entity.specialTimePeriod,
  )
  @JoinColumn({ name: 'general_urban_retirement_analysis_period_id' })
  public generalUrbanRetirementAnalysisPeriod: GeneralUrbanRetirementAnalysisPeriodTypeormEntity | null;

  protected override readonly _type =
    GeneralUrbanRetirementAnalysisPeriodSpecialTimeTypeormEntity.name;
}
