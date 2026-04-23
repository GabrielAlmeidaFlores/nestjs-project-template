import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { AccidentBenefitRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { AccidentBenefitRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-document/enum/accident-benefit-rejection-document-type.enum';

@Entity({ name: 'accident_benefit_rejection_document' })
export class AccidentBenefitRejectionDocumentTypeormEntity extends BaseTypeormEntity {
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
    enum: AccidentBenefitRejectionDocumentTypeEnum,
    nullable: true,
  })
  public type: AccidentBenefitRejectionDocumentTypeEnum | null;

  @ManyToOne(
    () => AccidentBenefitRejectionTypeormEntity,
    (entity) => entity.accidentBenefitRejectionDocument,
    { nullable: true },
  )
  @JoinColumn({ name: 'accident_benefit_rejection_id' })
  public accidentBenefitRejection?: AccidentBenefitRejectionTypeormEntity | null;

  protected override readonly _type =
    AccidentBenefitRejectionDocumentTypeormEntity.name;
}
