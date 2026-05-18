import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { PermanentIncapacityBenefitTerminatedInsuredStatusTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated-insured-status.typeorm.entity';

import type { PermanentIncapacityBenefitTerminatedInsuredStatusDocumentTypeEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-insured-status-document/enum/permanent-incapacity-benefit-terminated-insured-status-document-type.enum';

@Entity({
  name: 'perm_incapacity_benefit_terminated_insured_status_document',
})
export class PermanentIncapacityBenefitTerminatedInsuredStatusDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'file_name', type: 'varchar', length: 255 })
  public fileName: string;

  @Column({ name: 'type', type: 'varchar', length: 100 })
  public type: PermanentIncapacityBenefitTerminatedInsuredStatusDocumentTypeEnum;

  @ManyToOne(
    () => PermanentIncapacityBenefitTerminatedInsuredStatusTypeormEntity,
    (entity) => entity.documents,
  )
  @JoinColumn({
    name: 'permanent_incapacity_benefit_terminated_insured_status_id',
  })
  public permanentIncapacityBenefitTerminatedInsuredStatus?: PermanentIncapacityBenefitTerminatedInsuredStatusTypeormEntity;

  protected override readonly _type =
    PermanentIncapacityBenefitTerminatedInsuredStatusDocumentTypeormEntity.name;
}
