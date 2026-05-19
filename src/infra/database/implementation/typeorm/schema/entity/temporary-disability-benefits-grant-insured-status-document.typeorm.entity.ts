import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantInsuredStatusTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-insured-status.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantInsuredStatusDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-insured-status-document/enum/temporary-disability-benefits-grant-insured-status-document-type.enum';

@Entity({ name: 'temporary_disability_benefits_grant_insured_status_document' })
export class TemporaryDisabilityBenefitsGrantInsuredStatusDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'file_name',
    type: 'varchar',
    length: 255,
  })
  public fileName: string;

  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: TemporaryDisabilityBenefitsGrantInsuredStatusDocumentTypeEnum,
  })
  public type: TemporaryDisabilityBenefitsGrantInsuredStatusDocumentTypeEnum;

  @ManyToOne(
    () => TemporaryDisabilityBenefitsGrantInsuredStatusTypeormEntity,
    (entity) => entity.temporaryDisabilityBenefitsGrantInsuredStatusDocument,
    { nullable: true },
  )
  @JoinColumn({ name: 'temporary_disability_benefits_grant_insured_status_id' })
  public temporaryDisabilityBenefitsGrantInsuredStatus?: TemporaryDisabilityBenefitsGrantInsuredStatusTypeormEntity | null;

  protected override readonly _type =
    TemporaryDisabilityBenefitsGrantInsuredStatusDocumentTypeormEntity.name;
}
