import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { PermanentIncapacityBenefitTerminatedTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated.typeorm.entity';

import type { PermanentIncapacityBenefitTerminatedDocumentTypeEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-document/enum/permanent-incapacity-benefit-terminated-document-type.enum';

@Entity({ name: 'permanent_incapacity_benefit_terminated_document' })
export class PermanentIncapacityBenefitTerminatedDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'file_name', type: 'varchar', length: 255 })
  public fileName: string;

  @Column({ name: 'type', type: 'varchar', length: 100 })
  public type: PermanentIncapacityBenefitTerminatedDocumentTypeEnum;

  @ManyToOne(
    () => PermanentIncapacityBenefitTerminatedTypeormEntity,
    (entity) => entity.documents,
  )
  @JoinColumn({ name: 'permanent_incapacity_benefit_terminated_id' })
  public permanentIncapacityBenefitTerminated?: PermanentIncapacityBenefitTerminatedTypeormEntity;

  protected override readonly _type =
    PermanentIncapacityBenefitTerminatedDocumentTypeormEntity.name;
}
