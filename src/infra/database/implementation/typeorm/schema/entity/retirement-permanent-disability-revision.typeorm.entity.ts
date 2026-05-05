import { Entity, JoinColumn, OneToOne, OneToMany, Column } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RetirementPermanentDisabilityRevisionDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-document.typeorm.entity';
import { RetirementPermanentDisabilityRevisionInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-inss-benefit.typeorm.entity';
import { RetirementPermanentDisabilityRevisionLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-legal-proceeding.typeorm.entity';
import { RetirementPermanentDisabilityRevisionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-result.typeorm.entity';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-disability-analysis.typeorm.entity';
import { RetirementPermanentDisabilityRevisionCategoryEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/enum/retirement-permanent-disability-revision-category.enum';

@Entity({ name: 'retirement_permanent_disability_revision' })
export class RetirementPermanentDisabilityRevisionTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'analysis_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public analysisName: string | null;

  @Column({
    name: 'category',
    type: 'simple-enum',
    enum: RetirementPermanentDisabilityRevisionCategoryEnum,
    nullable: true,
  })
  public category: RetirementPermanentDisabilityRevisionCategoryEnum | null;

  @OneToOne(
    () => RetirementPermanentDisabilityRevisionResultTypeormEntity,
    (entity) => entity.retirementPermanentDisabilityRevision,
    { nullable: true },
  )
  @JoinColumn({ name: 'retirement_permanent_disability_revision_result_id' })
  public retirementPermanentDisabilityRevisionResult?:
    | RetirementPermanentDisabilityRevisionResultTypeormEntity
    | undefined;

  @OneToMany(
    () => RetirementPermanentDisabilityRevisionInssBenefitTypeormEntity,
    (entity) => entity.retirementPermanentDisabilityRevision,
  )
  public retirementPermanentDisabilityRevisionInssBenefit?:
    | RetirementPermanentDisabilityRevisionInssBenefitTypeormEntity[]
    | undefined;

  @OneToMany(
    () => RetirementPermanentDisabilityRevisionLegalProceedingTypeormEntity,
    (entity) => entity.retirementPermanentDisabilityRevision,
  )
  public retirementPermanentDisabilityRevisionLegalProceeding?:
    | RetirementPermanentDisabilityRevisionLegalProceedingTypeormEntity[]
    | undefined;

  @OneToMany(
    () => RetirementPermanentDisabilityRevisionDocumentTypeormEntity,
    (entity) => entity.retirementPermanentDisabilityRevision,
  )
  public retirementPermanentDisabilityRevisionDocument?:
    | RetirementPermanentDisabilityRevisionDocumentTypeormEntity[]
    | undefined;

  @OneToMany(
    () => RetirementPermanentDisabilityRevisionDisabilityAnalysisTypeormEntity,
    (entity) => entity.retirementPermanentDisabilityRevision,
  )
  public retirementPermanentDisabilityRevisionDisabilityAnalysis?:
    | RetirementPermanentDisabilityRevisionDisabilityAnalysisTypeormEntity[]
    | undefined;

  protected override readonly _type =
    RetirementPermanentDisabilityRevisionTypeormEntity.name;
}
