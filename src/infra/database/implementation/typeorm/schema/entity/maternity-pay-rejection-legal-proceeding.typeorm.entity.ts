import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';

import type { MaternityPayRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-rejection.typeorm.entity';

@Entity({ name: 'maternity_pay_rejection_legal_proceeding' })
export class MaternityPayRejectionLegalProceedingTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'legal_proceeding_number',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public legalProceedingNumber: string | null;

  @ManyToOne(
    'MaternityPayRejectionTypeormEntity',
    'maternityPayRejectionLegalProceeding',
    { eager: false },
  )
  @JoinColumn({ name: 'maternity_pay_rejection_id' })
  public maternityPayRejection?: MaternityPayRejectionTypeormEntity;

  protected override readonly _type =
    MaternityPayRejectionLegalProceedingTypeormEntity.name;
}
