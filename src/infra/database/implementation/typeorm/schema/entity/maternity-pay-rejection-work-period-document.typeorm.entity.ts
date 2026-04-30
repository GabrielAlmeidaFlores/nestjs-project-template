import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { MaternityPayRejectionWorkPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period-document/enum/maternity-pay-rejection-work-period-document-type.enum';

import type { MaternityPayRejectionWorkPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-rejection-work-period.typeorm.entity';

@Entity({ name: 'maternity_pay_rejection_work_period_document' })
export class MaternityPayRejectionWorkPeriodDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document', type: 'varchar', length: 255, nullable: true })
  public document: string | null;

  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: MaternityPayRejectionWorkPeriodDocumentTypeEnum,
    nullable: true,
  })
  public type: MaternityPayRejectionWorkPeriodDocumentTypeEnum | null;

  @ManyToOne(
    'MaternityPayRejectionWorkPeriodTypeormEntity',
    'maternityPayRejectionWorkPeriodDocument',
    { eager: false },
  )
  @JoinColumn({ name: 'maternity_pay_rejection_work_period_id' })
  public maternityPayRejectionWorkPeriod?: MaternityPayRejectionWorkPeriodTypeormEntity;

  protected override readonly _type =
    MaternityPayRejectionWorkPeriodDocumentTypeormEntity.name;
}
