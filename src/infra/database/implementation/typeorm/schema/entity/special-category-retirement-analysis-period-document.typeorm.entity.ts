import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { SpecialCategoryRetirementAnalysisWorkPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-category-retirement-analysis-work-period.typeorm.entity';
import { RetirementDocumentTypeCategoryEnum } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-period-document/enum/retirement-document-type-category.enum';

@Entity({ name: 'special_category_retirement_analysis_period_document' })
export class SpecialCategoryRetirementAnalysisPeriodDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'stored_file_external_name',
    type: 'varchar',
    length: 500,
    nullable: false,
  })
  public storedFileExternalName: string;

  @Column({
    name: 'original_file_upload_name',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  public originalFileUploadName: string;

  @Column({
    name: 'retirement_document_type_category',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  public retirementDocumentTypeCategory: RetirementDocumentTypeCategoryEnum;

  @ManyToOne(
    () => SpecialCategoryRetirementAnalysisWorkPeriodTypeormEntity,
    (entity) => entity.periodDocuments,
  )
  @JoinColumn({ name: 'special_category_retirement_analysis_work_period_id' })
  public workPeriod?: SpecialCategoryRetirementAnalysisWorkPeriodTypeormEntity | undefined;

  protected override readonly _type = SpecialCategoryRetirementAnalysisPeriodDocumentTypeormEntity.name;
}
