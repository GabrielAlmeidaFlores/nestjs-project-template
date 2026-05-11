import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { SpecialRetirementGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-period.typeorm.entity';
import { SpecialRetirementGrantPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period-document/enum/special-retirement-grant-period-document-type.enum';

@Entity({ name: 'special_retirement_grant_period_document' })
export class SpecialRetirementGrantPeriodDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'type',
    type: 'varchar',
    length: 50,
  })
  public type: SpecialRetirementGrantPeriodDocumentTypeEnum;

  @Column({
    name: 'document',
    type: 'varchar',
    length: 255,
  })
  public document: string;

  @ManyToOne(
    () => SpecialRetirementGrantPeriodTypeormEntity,
    (entity) => entity.specialRetirementGrantPeriodDocument,
    { nullable: true },
  )
  @JoinColumn({ name: 'special_retirement_grant_period_id' })
  public specialRetirementGrantPeriod?: SpecialRetirementGrantPeriodTypeormEntity | null;

  protected override readonly _type =
    SpecialRetirementGrantPeriodDocumentTypeormEntity.name;
}
