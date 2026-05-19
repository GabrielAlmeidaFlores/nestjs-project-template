import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-period.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-period-document/enum/temporary-disability-benefits-grant-period-document-type.enum';

@Entity({ name: 'temporary_disability_benefits_grant_period_document' })
export class TemporaryDisabilityBenefitsGrantPeriodDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'file_name',
    type: 'varchar',
    length: 255,
  })
  public fileName: string;

  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: TemporaryDisabilityBenefitsGrantPeriodDocumentTypeEnum,
  })
  public type: TemporaryDisabilityBenefitsGrantPeriodDocumentTypeEnum;

  @ManyToOne(
    () => TemporaryDisabilityBenefitsGrantPeriodTypeormEntity,
    (entity) => entity.temporaryDisabilityBenefitsGrantPeriodDocument,
    { nullable: true },
  )
  @JoinColumn({ name: 'temporary_disability_benefits_grant_period_id' })
  public temporaryDisabilityBenefitsGrantPeriod?: TemporaryDisabilityBenefitsGrantPeriodTypeormEntity | null;

  protected override readonly _type =
    TemporaryDisabilityBenefitsGrantPeriodDocumentTypeormEntity.name;
}
