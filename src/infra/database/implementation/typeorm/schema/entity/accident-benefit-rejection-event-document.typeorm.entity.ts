import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { AccidentBenefitRejectionEventTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection-event.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { AccidentBenefitRejectionEventDocumentTypeEnum } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-event-document/enum/accident-benefit-rejection-event-document-type.enum';

@Entity({ name: 'accident_benefit_rejection_event_document' })
export class AccidentBenefitRejectionEventDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'file_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public fileName: string | null;

  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: AccidentBenefitRejectionEventDocumentTypeEnum,
    nullable: true,
  })
  public type: AccidentBenefitRejectionEventDocumentTypeEnum | null;

  @ManyToOne(
    () => AccidentBenefitRejectionEventTypeormEntity,
    (entity) => entity.accidentBenefitRejectionEventDocument,
    { nullable: true },
  )
  @JoinColumn({ name: 'accident_benefit_rejection_event_id' })
  public accidentBenefitRejectionEvent?: AccidentBenefitRejectionEventTypeormEntity | null;

  protected override readonly _type =
    AccidentBenefitRejectionEventDocumentTypeormEntity.name;
}
