import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantPreviousBenefitsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-previous-benefits.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-previous-benefits-document/enum/temporary-disability-benefits-grant-previous-benefits-document-type.enum';

@Entity({
  name: 'temporary_disability_benefits_grant_previous_benefits_document',
})
export class TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'file_name',
    type: 'varchar',
    length: 255,
  })
  public fileName: string;

  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentTypeEnum,
  })
  public type: TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentTypeEnum;

  @ManyToOne(
    () => TemporaryDisabilityBenefitsGrantPreviousBenefitsTypeormEntity,
    (entity) => entity.temporaryDisabilityBenefitsGrantPreviousBenefitsDocument,
    { nullable: true },
  )
  @JoinColumn({
    name: 'temporary_disability_benefits_grant_previous_benefits_id',
  })
  public temporaryDisabilityBenefitsGrantPreviousBenefits?: TemporaryDisabilityBenefitsGrantPreviousBenefitsTypeormEntity | null;

  protected override readonly _type =
    TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentTypeormEntity.name;
}
