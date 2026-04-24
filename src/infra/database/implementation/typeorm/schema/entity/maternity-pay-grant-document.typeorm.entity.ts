import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { MaternityPayGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-grant.typeorm.entity';
import { MaternityPayGrantDocumentTypeEnum } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/enum/maternity-pay-grant-document-type.enum';

@Entity({ name: 'maternity_pay_grant_document' })
export class MaternityPayGrantDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document', type: 'varchar', length: 255 })
  public document: string;

  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: MaternityPayGrantDocumentTypeEnum,
  })
  public type: MaternityPayGrantDocumentTypeEnum;

  @ManyToOne(
    () => MaternityPayGrantTypeormEntity,
    (entity) => entity.maternityPayGrantDocument,
    { nullable: true },
  )
  @JoinColumn({ name: 'maternity_pay_grant_id' })
  public maternityPayGrant?: MaternityPayGrantTypeormEntity | null;

  protected override readonly _type =
    MaternityPayGrantDocumentTypeormEntity.name;
}
