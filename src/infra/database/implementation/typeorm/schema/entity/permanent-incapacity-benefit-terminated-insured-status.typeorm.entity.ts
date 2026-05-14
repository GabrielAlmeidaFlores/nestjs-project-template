import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { PermanentIncapacityBenefitTerminatedInsuredStatusDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated-insured-status-document.typeorm.entity';
import { PermanentIncapacityBenefitTerminatedTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

@Entity({ name: 'permanent_incapacity_benefit_terminated_insured_status' })
export class PermanentIncapacityBenefitTerminatedInsuredStatusTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'involuntary_unemployment', type: 'boolean' })
  public involuntaryUnemployment: boolean;

  @Column({
    name: 'intention_to_prove_involuntary_unemployment',
    type: 'boolean',
  })
  public intentionToProveInvoluntaryUnemployment: boolean;

  @Column({ name: 'rural_insured_client', type: 'boolean' })
  public ruralInsuredClient: boolean;

  @Column({
    name: 'rural_period_start_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public ruralPeriodStartDate: Date | null;

  @Column({
    name: 'rural_period_end_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public ruralPeriodEndDate: Date | null;

  @Column({ name: 'documents_description', type: 'text', nullable: true })
  public documentsDescription: string | null;

  @ManyToOne(
    () => PermanentIncapacityBenefitTerminatedTypeormEntity,
    (entity) => entity.insuredStatus,
  )
  @JoinColumn({ name: 'permanent_incapacity_benefit_terminated_id' })
  public permanentIncapacityBenefitTerminated?: PermanentIncapacityBenefitTerminatedTypeormEntity;

  @OneToMany(
    () =>
      PermanentIncapacityBenefitTerminatedInsuredStatusDocumentTypeormEntity,
    (entity) => entity.permanentIncapacityBenefitTerminatedInsuredStatus,
  )
  public documents?: PermanentIncapacityBenefitTerminatedInsuredStatusDocumentTypeormEntity[];

  protected override readonly _type =
    PermanentIncapacityBenefitTerminatedInsuredStatusTypeormEntity.name;
}
