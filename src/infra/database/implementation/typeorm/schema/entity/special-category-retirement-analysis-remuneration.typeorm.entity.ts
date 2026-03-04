import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { SpecialCategoryRetirementAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-category-retirement-analysis.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

@Entity({ name: 'special_category_retirement_analysis_remuneration' })
export class SpecialCategoryRetirementAnalysisRemunerationTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'remuneration_reference_month_year',
    type: 'date',
    nullable: false,
    transformer: DateOnlyTransformer,
  })
  public remunerationReferenceMonthYear: Date;

  @Column({
    name: 'remuneration_gross_amount',
    type: 'decimal',
    precision: 15,
    scale: 2,
    nullable: true,
  })
  public remunerationGrossAmount: number | null;

  @ManyToOne(
    () => SpecialCategoryRetirementAnalysisTypeormEntity,
    (entity) => entity.remunerations,
  )
  @JoinColumn({ name: 'special_category_retirement_analysis_id' })
  public specialCategoryRetirementAnalysis?: SpecialCategoryRetirementAnalysisTypeormEntity | undefined;

  protected override readonly _type = SpecialCategoryRetirementAnalysisRemunerationTypeormEntity.name;
}
