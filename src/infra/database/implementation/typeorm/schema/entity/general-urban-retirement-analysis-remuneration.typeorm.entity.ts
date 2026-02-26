import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { GeneralUrbanRetirementAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-analysis.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

@Entity({ name: 'general_urban_retirement_analysis_remuneration' })
export class GeneralUrbanRetirementAnalysisRemunerationTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'remuneration_date',
    type: 'date',
    transformer: DateOnlyTransformer,
    nullable: false,
  })
  public remunerationDate: Date;

  @Column({
    name: 'remuneration_amount',
    type: 'decimal',
    precision: 15,
    scale: 2,
    nullable: false,
  })
  public remunerationAmount: string;

  @ManyToOne(
    () => GeneralUrbanRetirementAnalysisTypeormEntity,
    (entity) => entity.remunerations,
  )
  @JoinColumn({ name: 'general_urban_retirement_analysis_id' })
  public generalUrbanRetirementAnalysis?:
    | GeneralUrbanRetirementAnalysisTypeormEntity
    | undefined;

  protected override readonly _type =
    GeneralUrbanRetirementAnalysisRemunerationTypeormEntity.name;
}
