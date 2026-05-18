import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedInsuredStatusTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-insured-status.typeorm.entity';

import type { TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-insured-status-document/enum/temporary-disability-benefits-terminated-insured-status-document-type.enum';

@Entity({ name: 'temp_disability_benefits_terminated_insured_status_document' })
export class TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'file_name', type: 'varchar', length: 255 })
  public fileName: string;

  @Column({ name: 'type', type: 'varchar', length: 100 })
  public type: TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentTypeEnum;

  @ManyToOne(
    () => TemporaryDisabilityBenefitsTerminatedInsuredStatusTypeormEntity,
    (entity) => entity.documents,
  )
  @JoinColumn({
    name: 'temporary_disability_benefits_terminated_insured_status_id',
  })
  public temporaryDisabilityBenefitsTerminatedInsuredStatus?: TemporaryDisabilityBenefitsTerminatedInsuredStatusTypeormEntity;

  protected override readonly _type =
    TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentTypeormEntity.name;
}
