import { Entity, JoinColumn, OneToMany, OneToOne, Column } from 'typeorm';

import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { TemporaryIncapacityBenefitTerminationDisabilityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination-disability-analysis.typeorm.entity';
import { TemporaryIncapacityBenefitTerminationDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination-document.typeorm.entity';
import { TemporaryIncapacityBenefitTerminationInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination-inss-benefit.typeorm.entity';
import { TemporaryIncapacityBenefitTerminationInsuredStatusTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination-insured-status.typeorm.entity';
import { TemporaryIncapacityBenefitTerminationResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination-result.typeorm.entity';
import { TemporaryIncapacityBenefitTerminationWorkPeriodsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination-work-periods.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

import type { TemporaryIncapacityBenefitTerminationCategoryEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/enum/temporary-incapacity-benefit-termination-category.enum';
import type { TemporaryIncapacityBenefitTerminationReasonEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/enum/temporary-incapacity-benefit-termination-reason.enum';

@Entity({ name: 'temporary_incapacity_benefit_termination' })
export class TemporaryIncapacityBenefitTerminationTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'analysis_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public analysisName: string | null;

  @Column({
    name: 'benefit_termination_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public benefitTerminationDate: Date | null;

  @Column({ name: 'category', type: 'varchar', length: 100, nullable: true })
  public category: TemporaryIncapacityBenefitTerminationCategoryEnum | null;

  @Column({
    name: 'termination_reason',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public terminationReason: TemporaryIncapacityBenefitTerminationReasonEnum | null;

  @Column({
    name: 'termination_reason_description',
    type: 'text',
    nullable: true,
  })
  public terminationReasonDescription: string | null;

  @OneToOne(() => TemporaryIncapacityBenefitTerminationResultTypeormEntity, {
    nullable: true,
    eager: false,
  })
  @JoinColumn({ name: 'temporary_incapacity_benefit_termination_result_id' })
  public temporaryIncapacityBenefitTerminationResult?: TemporaryIncapacityBenefitTerminationResultTypeormEntity | null;

  @OneToMany(
    () => TemporaryIncapacityBenefitTerminationDocumentTypeormEntity,
    (entity) => entity.temporaryIncapacityBenefitTermination,
  )
  public documents?: TemporaryIncapacityBenefitTerminationDocumentTypeormEntity[];

  @OneToMany(
    () => TemporaryIncapacityBenefitTerminationInssBenefitTypeormEntity,
    (entity) => entity.temporaryIncapacityBenefitTermination,
  )
  public inssBenefits?: TemporaryIncapacityBenefitTerminationInssBenefitTypeormEntity[];

  @OneToMany(
    () => TemporaryIncapacityBenefitTerminationDisabilityAnalysisTypeormEntity,
    (entity) => entity.temporaryIncapacityBenefitTermination,
  )
  public disabilityAnalysis?: TemporaryIncapacityBenefitTerminationDisabilityAnalysisTypeormEntity[];

  @OneToMany(
    () => TemporaryIncapacityBenefitTerminationInsuredStatusTypeormEntity,
    (entity) => entity.temporaryIncapacityBenefitTermination,
  )
  public insuredStatus?: TemporaryIncapacityBenefitTerminationInsuredStatusTypeormEntity[];

  @OneToMany(
    () => TemporaryIncapacityBenefitTerminationWorkPeriodsTypeormEntity,
    (entity) => entity.temporaryIncapacityBenefitTermination,
  )
  public workPeriods?: TemporaryIncapacityBenefitTerminationWorkPeriodsTypeormEntity[];

  @OneToOne(() => AnalysisToolRecordTypeormEntity, {
    nullable: true,
    eager: false,
  })
  public analysisToolRecord?: AnalysisToolRecordTypeormEntity;

  protected override readonly _type =
    TemporaryIncapacityBenefitTerminationTypeormEntity.name;
}
