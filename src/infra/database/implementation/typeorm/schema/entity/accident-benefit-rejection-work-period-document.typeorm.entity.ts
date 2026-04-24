import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { AccidentBenefitRejectionWorkPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection-work-period.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { AccidentBenefitRejectionWorkPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period-document/enum/accident-benefit-rejection-work-period-document-type.enum';

@Entity({ name: 'accident_benefit_rejection_work_period_document' })
export class AccidentBenefitRejectionWorkPeriodDocumentTypeormEntity extends BaseTypeormEntity {
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
    enum: AccidentBenefitRejectionWorkPeriodDocumentTypeEnum,
    nullable: true,
  })
  public type: AccidentBenefitRejectionWorkPeriodDocumentTypeEnum | null;

  @ManyToOne(
    () => AccidentBenefitRejectionWorkPeriodTypeormEntity,
    (entity) => entity.accidentBenefitRejectionWorkPeriodDocument,
    { nullable: true },
  )
  @JoinColumn({ name: 'accident_benefit_rejection_work_period_id' })
  public accidentBenefitRejectionWorkPeriod?: AccidentBenefitRejectionWorkPeriodTypeormEntity | null;

  protected override readonly _type =
    AccidentBenefitRejectionWorkPeriodDocumentTypeormEntity.name;
}
