import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { SpecialRetirementGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant.typeorm.entity';
import { SpecialRetirementGrantDocumentTypeEnum } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-document/enum/special-retirement-grant-document-type.enum';

@Entity({ name: 'special_retirement_grant_document' })
export class SpecialRetirementGrantDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document', type: 'varchar' })
  public document: string;

  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: SpecialRetirementGrantDocumentTypeEnum,
  })
  public type: SpecialRetirementGrantDocumentTypeEnum;

  @ManyToOne(() => SpecialRetirementGrantTypeormEntity)
  @JoinColumn({ name: 'special_retirement_grant_id' })
  public specialRetirementGrant?:
    | SpecialRetirementGrantTypeormEntity
    | undefined;

  protected override readonly _type =
    SpecialRetirementGrantDocumentTypeormEntity.name;
}
