import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { ElderlyBpcRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/elderly-bpc-rejection.typeorm.entity';

@Entity({ name: 'elderly_bpc_rejection_legal_proceeding' })
export class ElderlyBpcRejectionLegalProceedingTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'legal_proceeding_number',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public legalProceedingNumber: string | null;

  @ManyToOne(
    () => ElderlyBpcRejectionTypeormEntity,
    (entity) => entity.elderlyBpcRejectionLegalProceeding,
  )
  @JoinColumn({ name: 'elderly_bpc_rejection_id' })
  public elderlyBpcRejection?: ElderlyBpcRejectionTypeormEntity | undefined;

  protected override readonly _type =
    ElderlyBpcRejectionLegalProceedingTypeormEntity.name;
}
