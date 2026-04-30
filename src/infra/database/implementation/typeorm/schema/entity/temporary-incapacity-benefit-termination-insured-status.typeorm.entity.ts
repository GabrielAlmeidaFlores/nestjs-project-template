import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { TemporaryIncapacityBenefitTerminationInsuredStatusDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination-insured-status-document.typeorm.entity';
import { TemporaryIncapacityBenefitTerminationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

@Entity({ name: 'temporary_incapacity_benefit_termination_insured_status' })
export class TemporaryIncapacityBenefitTerminationInsuredStatusTypeormEntity extends BaseTypeormEntity {
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
    () => TemporaryIncapacityBenefitTerminationTypeormEntity,
    (entity) => entity.insuredStatus,
  )
  @JoinColumn({ name: 'temporary_incapacity_benefit_termination_id' })
  public temporaryIncapacityBenefitTermination?: TemporaryIncapacityBenefitTerminationTypeormEntity;

  @OneToMany(
    () =>
      TemporaryIncapacityBenefitTerminationInsuredStatusDocumentTypeormEntity,
    (entity) => entity.temporaryIncapacityBenefitTerminationInsuredStatus,
  )
  public documents?: TemporaryIncapacityBenefitTerminationInsuredStatusDocumentTypeormEntity[];

  protected override readonly _type =
    TemporaryIncapacityBenefitTerminationInsuredStatusTypeormEntity.name;
}
