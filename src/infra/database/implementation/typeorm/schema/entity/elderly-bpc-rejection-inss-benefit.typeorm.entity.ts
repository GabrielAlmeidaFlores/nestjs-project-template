import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { ElderlyBpcRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/elderly-bpc-rejection.typeorm.entity';

@Entity({ name: 'elderly_bpc_rejection_inss_benefit' })
export class ElderlyBpcRejectionInssBenefitTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'inss_benefit',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public inssBenefit: string | null;

  @ManyToOne(
    () => ElderlyBpcRejectionTypeormEntity,
    (entity) => entity.elderlyBpcRejectionInssBenefit,
  )
  @JoinColumn({ name: 'elderly_bpc_rejection_id' })
  public elderlyBpcRejection?: ElderlyBpcRejectionTypeormEntity | undefined;

  protected override readonly _type =
    ElderlyBpcRejectionInssBenefitTypeormEntity.name;
}
