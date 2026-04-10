import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DeathBenefitGrantInstitorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-institutor.typeorm.entity';
import { DeathBenefitGrantDocumentTypeEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/enum/death-benefit-grant-document-type.enum';

@Entity({ name: 'death_benefit_grant_document' })
export class DeathBenefitGrantDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document', type: 'varchar', length: 255 })
  public document: string;

  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: DeathBenefitGrantDocumentTypeEnum,
  })
  public type: DeathBenefitGrantDocumentTypeEnum;

  @ManyToOne(
    () => DeathBenefitGrantInstitorTypeormEntity,
    (entity) => entity.deathBenefitGrantDocument,
    { nullable: true },
  )
  @JoinColumn({ name: 'death_benefit_grant_institutor_id' })
  public deathBenefitGrantInstitutor?: DeathBenefitGrantInstitorTypeormEntity | null;

  protected override readonly _type =
    DeathBenefitGrantDocumentTypeormEntity.name;
}
