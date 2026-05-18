import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DeathBenefitRejectionInstitorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-institutor.typeorm.entity';
import { DeathBenefitRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/enum/death-benefit-rejection-document-type.enum';

@Entity({ name: 'death_benefit_rejection_document' })
export class DeathBenefitRejectionDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document', type: 'varchar', length: 255 })
  public document: string;

  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: DeathBenefitRejectionDocumentTypeEnum,
  })
  public type: DeathBenefitRejectionDocumentTypeEnum;

  @ManyToOne(
    () => DeathBenefitRejectionInstitorTypeormEntity,
    (entity) => entity.deathBenefitRejectionDocument,
    { nullable: true },
  )
  @JoinColumn({ name: 'death_benefit_rejection_institutor_id' })
  public deathBenefitRejectionInstitutor?: DeathBenefitRejectionInstitorTypeormEntity | null;

  protected override readonly _type =
    DeathBenefitRejectionDocumentTypeormEntity.name;
}
