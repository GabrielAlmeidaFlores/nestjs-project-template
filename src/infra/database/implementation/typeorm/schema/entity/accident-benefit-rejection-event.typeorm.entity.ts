import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { AccidentBenefitRejectionEventDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection-event-document.typeorm.entity';
import { AccidentBenefitRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

@Entity({ name: 'accident_benefit_rejection_event' })
export class AccidentBenefitRejectionEventTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'accident_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public accidentDate: Date | null;

  @Column({
    name: 'accident_description',
    type: 'longtext',
    nullable: true,
  })
  public accidentDescription: string | null;

  @Column({
    name: 'cid_ten_id',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public cidTenId: string | null;

  @ManyToOne(
    () => AccidentBenefitRejectionTypeormEntity,
    (entity) => entity.accidentBenefitRejectionEvent,
    { nullable: true },
  )
  @JoinColumn({ name: 'accident_benefit_rejection_id' })
  public accidentBenefitRejection?: AccidentBenefitRejectionTypeormEntity | null;

  @OneToMany(
    () => AccidentBenefitRejectionEventDocumentTypeormEntity,
    (entity) => entity.accidentBenefitRejectionEvent,
  )
  public accidentBenefitRejectionEventDocument?:
    | AccidentBenefitRejectionEventDocumentTypeormEntity[]
    | undefined;

  protected override readonly _type =
    AccidentBenefitRejectionEventTypeormEntity.name;
}
