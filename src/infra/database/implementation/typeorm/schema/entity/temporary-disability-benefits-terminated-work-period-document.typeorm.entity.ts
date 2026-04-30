import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-work-periods.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-period-document/enum/temporary-disability-benefits-terminated-work-period-document-type.enum';

@Entity({
  name: 'temporary_disability_benefits_terminated_work_period_document',
})
export class TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'file_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public fileName: string | null;

  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentTypeEnum,
    nullable: true,
  })
  public type: TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentTypeEnum | null;

  @ManyToOne(
    () => TemporaryDisabilityBenefitsTerminatedWorkPeriodsTypeormEntity,
    (entity) => entity.temporaryDisabilityBenefitsTerminatedWorkPeriodDocument,
    { nullable: true },
  )
  @JoinColumn({
    name: 'temporary_disability_benefits_terminated_work_periods_id',
  })
  public temporaryDisabilityBenefitsTerminatedWorkPeriods?: TemporaryDisabilityBenefitsTerminatedWorkPeriodsTypeormEntity | null;

  protected override readonly _type =
    TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentTypeormEntity.name;
}
