import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedPreviousBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-previous-benefit.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-previous-benefit-document/enum/temporary-disability-benefits-terminated-previous-benefit-document-type.enum';

@Entity({
  name: 'temp_disability_benefits_terminated_previous_benefit_document',
})
export class TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'file_name',
    type: 'varchar',
    length: 255,
  })
  public fileName: string;

  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentTypeEnum,
  })
  public type: TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentTypeEnum;

  @ManyToOne(
    () => TemporaryDisabilityBenefitsTerminatedPreviousBenefitTypeormEntity,
    (entity) =>
      entity.temporaryDisabilityBenefitsTerminatedPreviousBenefitDocument,
    { nullable: true },
  )
  @JoinColumn({
    name: 'temporary_disability_benefits_terminated_previous_benefit_id',
  })
  public temporaryDisabilityBenefitsTerminatedPreviousBenefit?: TemporaryDisabilityBenefitsTerminatedPreviousBenefitTypeormEntity | null;

  protected override readonly _type =
    TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentTypeormEntity.name;
}
