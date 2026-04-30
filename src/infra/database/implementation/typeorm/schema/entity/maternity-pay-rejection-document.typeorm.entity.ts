import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { MaternityPayRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-document/enum/maternity-pay-rejection-document-type.enum';

import type { MaternityPayRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-rejection.typeorm.entity';

@Entity({ name: 'maternity_pay_rejection_document' })
export class MaternityPayRejectionDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document', type: 'varchar', length: 255, nullable: true })
  public document: string | null;

  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: MaternityPayRejectionDocumentTypeEnum,
    nullable: true,
  })
  public type: MaternityPayRejectionDocumentTypeEnum | null;

  @ManyToOne(
    'MaternityPayRejectionTypeormEntity',
    'maternityPayRejectionDocument',
    { eager: false },
  )
  @JoinColumn({ name: 'maternity_pay_rejection_id' })
  public maternityPayRejection?: MaternityPayRejectionTypeormEntity;

  protected override readonly _type =
    MaternityPayRejectionDocumentTypeormEntity.name;
}
