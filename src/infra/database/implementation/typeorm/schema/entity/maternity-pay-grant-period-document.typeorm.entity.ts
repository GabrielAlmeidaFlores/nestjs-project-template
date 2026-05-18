import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { MaternityPayGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-grant-period.typeorm.entity';

@Entity({ name: 'maternity_pay_grant_period_document' })
export class MaternityPayGrantPeriodDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document', type: 'varchar', length: 255 })
  public document: string;

  @ManyToOne(
    () => MaternityPayGrantPeriodTypeormEntity,
    (entity) => entity.maternityPayGrantPeriodDocument,
    { nullable: true },
  )
  @JoinColumn({ name: 'maternity_pay_grant_period_id' })
  public maternityPayGrantPeriod?: MaternityPayGrantPeriodTypeormEntity | null;

  protected override readonly _type =
    MaternityPayGrantPeriodDocumentTypeormEntity.name;
}
