import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-insured-status-document.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

@Entity({ name: 'temporary_disability_benefits_terminated_insured_status' })
export class TemporaryDisabilityBenefitsTerminatedInsuredStatusTypeormEntity extends BaseTypeormEntity {
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
    () => TemporaryDisabilityBenefitsTerminatedTypeormEntity,
    (entity) => entity.insuredStatus,
  )
  @JoinColumn({ name: 'temporary_disability_benefits_terminated_id' })
  public temporaryDisabilityBenefitsTerminated?: TemporaryDisabilityBenefitsTerminatedTypeormEntity;

  @OneToMany(
    () =>
      TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentTypeormEntity,
    (entity) => entity.temporaryDisabilityBenefitsTerminatedInsuredStatus,
  )
  public documents?: TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentTypeormEntity[];

  protected override readonly _type =
    TemporaryDisabilityBenefitsTerminatedInsuredStatusTypeormEntity.name;
}
