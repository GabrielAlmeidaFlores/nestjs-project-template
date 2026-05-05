import { Entity, JoinColumn, OneToMany, OneToOne, Column } from 'typeorm';

import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-disability-analysis.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-document.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-inss-benefit.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedInsuredStatusTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-insured-status.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-result.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-work-periods.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

import type { TemporaryDisabilityBenefitsTerminatedCategoryEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/enum/temporary-disability-benefits-terminated-category.enum';

@Entity({ name: 'temporary_disability_benefits_terminated' })
export class TemporaryDisabilityBenefitsTerminatedTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'analysis_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public analysisName: string | null;

  @Column({
    name: 'request_entry_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public requestEntryDate: Date | null;

  @Column({
    name: 'benefit_cessation_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public benefitCessationDate: Date | null;

  @Column({ name: 'category', type: 'varchar', length: 100, nullable: true })
  public category: TemporaryDisabilityBenefitsTerminatedCategoryEnum | null;

  @Column({
    name: 'my_inss_password',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public myInssPassword: string | null;

  @Column({ name: 'benefit_cessation_reason', type: 'text', nullable: true })
  public benefitCessationReason: string | null;

  @OneToOne(() => TemporaryDisabilityBenefitsTerminatedResultTypeormEntity, {
    nullable: true,
    eager: false,
  })
  @JoinColumn({ name: 'temporary_disability_benefits_terminated_result_id' })
  public temporaryDisabilityBenefitsTerminatedResult?: TemporaryDisabilityBenefitsTerminatedResultTypeormEntity | null;

  @OneToMany(
    () => TemporaryDisabilityBenefitsTerminatedDocumentTypeormEntity,
    (entity) => entity.temporaryDisabilityBenefitsTerminated,
  )
  public documents?: TemporaryDisabilityBenefitsTerminatedDocumentTypeormEntity[];

  @OneToMany(
    () => TemporaryDisabilityBenefitsTerminatedInssBenefitTypeormEntity,
    (entity) => entity.temporaryDisabilityBenefitsTerminated,
  )
  public inssBenefits?: TemporaryDisabilityBenefitsTerminatedInssBenefitTypeormEntity[];

  @OneToMany(
    () => TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisTypeormEntity,
    (entity) => entity.temporaryDisabilityBenefitsTerminated,
  )
  public disabilityAnalysis?: TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisTypeormEntity[];

  @OneToMany(
    () => TemporaryDisabilityBenefitsTerminatedInsuredStatusTypeormEntity,
    (entity) => entity.temporaryDisabilityBenefitsTerminated,
  )
  public insuredStatus?: TemporaryDisabilityBenefitsTerminatedInsuredStatusTypeormEntity[];

  @OneToMany(
    () => TemporaryDisabilityBenefitsTerminatedWorkPeriodsTypeormEntity,
    (entity) => entity.temporaryDisabilityBenefitsTerminated,
  )
  public workPeriods?: TemporaryDisabilityBenefitsTerminatedWorkPeriodsTypeormEntity[];

  @OneToOne(
    () => AnalysisToolRecordTypeormEntity,
    (entity) => entity.temporaryDisabilityBenefitsTerminated,
    {
      nullable: true,
      eager: false,
    },
  )
  public analysisToolRecord?: AnalysisToolRecordTypeormEntity | null;

  protected override readonly _type =
    TemporaryDisabilityBenefitsTerminatedTypeormEntity.name;
}
