import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { TemporaryIncapacityBenefitTerminationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination.typeorm.entity';

import type { TemporaryIncapacityBenefitTerminationDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-document/enum/temporary-incapacity-benefit-termination-document-type.enum';

@Entity({ name: 'temporary_incapacity_benefit_termination_document' })
export class TemporaryIncapacityBenefitTerminationDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'file_name', type: 'varchar', length: 255 })
  public fileName: string;

  @Column({ name: 'type', type: 'varchar', length: 100 })
  public type: TemporaryIncapacityBenefitTerminationDocumentTypeEnum;

  @ManyToOne(
    () => TemporaryIncapacityBenefitTerminationTypeormEntity,
    (entity) => entity.documents,
  )
  @JoinColumn({ name: 'temporary_incapacity_benefit_termination_id' })
  public temporaryIncapacityBenefitTermination?: TemporaryIncapacityBenefitTerminationTypeormEntity;

  protected override readonly _type =
    TemporaryIncapacityBenefitTerminationDocumentTypeormEntity.name;
}
