import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { TemporaryIncapacityBenefitRejectionInsuredStatusTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection-insured-status.typeorm.entity';

import type { TemporaryIncapacityBenefitRejectionInsuredStatusDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-insured-status-document/enum/temporary-incapacity-benefit-rejection-insured-status-document-type.enum';

@Entity({ name: 'temp_incapacity_benefit_rejection_insured_status_document' })
export class TemporaryIncapacityBenefitRejectionInsuredStatusDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'file_name', type: 'varchar', length: 255 })
  public fileName: string;

  @Column({ name: 'type', type: 'varchar', length: 100 })
  public type: TemporaryIncapacityBenefitRejectionInsuredStatusDocumentTypeEnum;

  @ManyToOne(
    () => TemporaryIncapacityBenefitRejectionInsuredStatusTypeormEntity,
    (entity) => entity.documents,
  )
  @JoinColumn({
    name: 'temporary_incapacity_benefit_rejection_insured_status_id',
  })
  public temporaryIncapacityBenefitRejectionInsuredStatus?: TemporaryIncapacityBenefitRejectionInsuredStatusTypeormEntity;

  protected override readonly _type =
    TemporaryIncapacityBenefitRejectionInsuredStatusDocumentTypeormEntity.name;
}
