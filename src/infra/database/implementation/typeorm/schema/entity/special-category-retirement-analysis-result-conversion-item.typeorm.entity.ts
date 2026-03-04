import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { SpecialCategoryRetirementAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-category-retirement-analysis-result.typeorm.entity';
import { RecognitionStatusEnum } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-result-conversion-item/enum/recognition-status.enum';

@Entity({ name: 'special_category_retirement_analysis_result_conversion_item' })
export class SpecialCategoryRetirementAnalysisResultConversionItemTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'origin_job_title_description',
    type: 'varchar',
    length: 500,
    nullable: false,
  })
  public originJobTitleDescription: string;

  @Column({
    name: 'period_date_range_text',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  public periodDateRangeText: string;

  @Column({
    name: 'harmful_exposure_agents_text',
    type: 'varchar',
    length: 500,
    nullable: false,
  })
  public harmfulExposureAgentsText: string;

  @Column({
    name: 'special_time_duration_text',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  public specialTimeDurationText: string;

  @Column({
    name: 'converted_time_duration_text',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  public convertedTimeDurationText: string;

  @Column({
    name: 'conversion_factor_value',
    type: 'decimal',
    precision: 5,
    scale: 2,
    nullable: false,
  })
  public conversionFactorValue: number;

  @Column({
    name: 'recognition_status_enum',
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  public recognitionStatusEnum: RecognitionStatusEnum;

  @ManyToOne(
    () => SpecialCategoryRetirementAnalysisResultTypeormEntity,
    (entity) => entity.conversionItems,
  )
  @JoinColumn({ name: 'special_category_retirement_analysis_result_id' })
  public analysisResult?:
    | SpecialCategoryRetirementAnalysisResultTypeormEntity
    | undefined;

  protected override readonly _type =
    SpecialCategoryRetirementAnalysisResultConversionItemTypeormEntity.name;
}
