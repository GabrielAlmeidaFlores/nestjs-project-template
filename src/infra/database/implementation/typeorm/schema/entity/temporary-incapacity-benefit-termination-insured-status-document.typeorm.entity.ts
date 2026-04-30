import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { TemporaryIncapacityBenefitTerminationInsuredStatusTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination-insured-status.typeorm.entity';

import type { TemporaryIncapacityBenefitTerminationInsuredStatusDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-insured-status-document/enum/temporary-incapacity-benefit-termination-insured-status-document-type.enum';

@Entity({
  name: 'temp_incapacity_benefit_termination_insured_status_document',
})
export class TemporaryIncapacityBenefitTerminationInsuredStatusDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'file_name', type: 'varchar', length: 255 })
  public fileName: string;

  @Column({ name: 'type', type: 'varchar', length: 100 })
  public type: TemporaryIncapacityBenefitTerminationInsuredStatusDocumentTypeEnum;

  @ManyToOne(
    () => TemporaryIncapacityBenefitTerminationInsuredStatusTypeormEntity,
    (entity) => entity.documents,
  )
  @JoinColumn({
    name: 'temporary_incapacity_benefit_termination_insured_status_id',
  })
  public temporaryIncapacityBenefitTerminationInsuredStatus?: TemporaryIncapacityBenefitTerminationInsuredStatusTypeormEntity;

  protected override readonly _type =
    TemporaryIncapacityBenefitTerminationInsuredStatusDocumentTypeormEntity.name;
}
