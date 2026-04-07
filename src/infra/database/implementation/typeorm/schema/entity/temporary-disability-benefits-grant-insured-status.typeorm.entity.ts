import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantInsuredStatusDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-insured-status-document.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

@Entity({ name: 'temporary_disability_benefits_grant_insured_status' })
export class TemporaryDisabilityBenefitsGrantInsuredStatusTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'involuntary_unemployment',
    type: 'boolean',
  })
  public involuntaryUnemployment: boolean;

  @Column({
    name: 'intention_to_prove_involuntary_unemployment',
    type: 'boolean',
  })
  public intentionToProveInvoluntaryUnemployment: boolean;

  @Column({
    name: 'rural_insured_client',
    type: 'boolean',
  })
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

  @Column({
    name: 'documents_description',
    type: 'text',
    nullable: true,
  })
  public documentsDescription: string | null;

  @ManyToOne(
    () => TemporaryDisabilityBenefitsGrantTypeormEntity,
    (entity) => entity.temporaryDisabilityBenefitsGrantInsuredStatus,
    { nullable: true },
  )
  @JoinColumn({ name: 'temporary_disability_benefits_grant_id' })
  public temporaryDisabilityBenefitsGrant?: TemporaryDisabilityBenefitsGrantTypeormEntity | null;

  @OneToMany(
    () => TemporaryDisabilityBenefitsGrantInsuredStatusDocumentTypeormEntity,
    (entity) => entity.temporaryDisabilityBenefitsGrantInsuredStatus,
  )
  public temporaryDisabilityBenefitsGrantInsuredStatusDocument?:
    | TemporaryDisabilityBenefitsGrantInsuredStatusDocumentTypeormEntity[]
    | undefined;

  protected override readonly _type =
    TemporaryDisabilityBenefitsGrantInsuredStatusTypeormEntity.name;
}
