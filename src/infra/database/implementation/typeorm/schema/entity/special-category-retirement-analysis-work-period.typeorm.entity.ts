import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { SpecialCategoryRetirementAnalysisPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-category-retirement-analysis-period-document.typeorm.entity';
import { SpecialCategoryRetirementAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-category-retirement-analysis.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { PublicServiceTypeCategoryEnum } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-work-period/enum/public-service-type-category.enum';
import { SpecialTimeRegistrationTypeEnum } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-work-period/enum/special-time-registration-type.enum';

@Entity({ name: 'special_category_retirement_analysis_work_period' })
export class SpecialCategoryRetirementAnalysisWorkPeriodTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'public_service_admission_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public publicServiceAdmissionDate: Date | null;

  @Column({
    name: 'public_service_career_start_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public publicServiceCareerStartDate: Date | null;

  @Column({
    name: 'work_period_start_date',
    type: 'date',
    nullable: false,
    transformer: DateOnlyTransformer,
  })
  public workPeriodStartDate: Date;

  @Column({
    name: 'work_period_end_date',
    type: 'date',
    nullable: false,
    transformer: DateOnlyTransformer,
  })
  public workPeriodEndDate: Date;

  @Column({
    name: 'job_position_title',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public jobPositionTitle: string | null;

  @Column({
    name: 'career_path_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public careerPathName: string | null;

  @Column({
    name: 'public_service_type_category',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  public publicServiceTypeCategory: PublicServiceTypeCategoryEnum | null;

  @Column({
    name: 'special_time_registration_type',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  public specialTimeRegistrationType: SpecialTimeRegistrationTypeEnum;

  @Column({
    name: 'effective_special_work_start_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public effectiveSpecialWorkStartDate: Date | null;

  @Column({
    name: 'effective_special_work_end_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public effectiveSpecialWorkEndDate: Date | null;

  @ManyToOne(
    () => SpecialCategoryRetirementAnalysisTypeormEntity,
    (entity) => entity.workPeriods,
  )
  @JoinColumn({ name: 'special_category_retirement_analysis_id' })
  public specialCategoryRetirementAnalysis?:
    | SpecialCategoryRetirementAnalysisTypeormEntity
    | undefined;

  @OneToMany(
    () => SpecialCategoryRetirementAnalysisPeriodDocumentTypeormEntity,
    (entity) => entity.specialCategoryRetirementAnalysisWorkPeriod,
  )
  public periodDocuments?:
    | SpecialCategoryRetirementAnalysisPeriodDocumentTypeormEntity[]
    | undefined;

  protected override readonly _type =
    SpecialCategoryRetirementAnalysisWorkPeriodTypeormEntity.name;
}
