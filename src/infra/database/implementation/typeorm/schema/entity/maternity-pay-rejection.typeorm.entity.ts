import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { MaternityPayRejectionCategoryEnum } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection/enum/maternity-pay-rejection-category.enum';
import { MaternityPayRejectionTriggeringEventEnum } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection/enum/maternity-pay-rejection-triggering-event.enum';

import type { MaternityPayRejectionDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-rejection-document.typeorm.entity';
import type { MaternityPayRejectionInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-rejection-inss-benefit.typeorm.entity';
import type { MaternityPayRejectionLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-rejection-legal-proceeding.typeorm.entity';
import type { MaternityPayRejectionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-rejection-result.typeorm.entity';
import type { MaternityPayRejectionWorkPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-rejection-work-period.typeorm.entity';

@Entity({ name: 'maternity_pay_rejection' })
export class MaternityPayRejectionTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'triggering_event',
    type: 'simple-enum',
    enum: MaternityPayRejectionTriggeringEventEnum,
    nullable: true,
  })
  public triggeringEvent: MaternityPayRejectionTriggeringEventEnum | null;

  @Column({
    name: 'analysis_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public analysisName: string | null;

  @Column({
    name: 'is_currently_unemployed',
    type: 'boolean',
    nullable: true,
  })
  public isCurrentlyUnemployed: boolean | null;

  @Column({
    name: 'category',
    type: 'simple-enum',
    enum: MaternityPayRejectionCategoryEnum,
    nullable: true,
  })
  public category: MaternityPayRejectionCategoryEnum | null;

  @Column({
    name: 'triggering_event_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public triggeringEventDate: Date | null;

  @OneToOne('MaternityPayRejectionResultTypeormEntity', {
    nullable: true,
    eager: false,
  })
  @JoinColumn({ name: 'maternity_pay_rejection_result_id' })
  public maternityPayRejectionResult?: MaternityPayRejectionResultTypeormEntity | null;

  @OneToMany(
    'MaternityPayRejectionDocumentTypeormEntity',
    'maternityPayRejection',
    { eager: false },
  )
  public maternityPayRejectionDocument?: MaternityPayRejectionDocumentTypeormEntity[];

  @OneToMany(
    'MaternityPayRejectionInssBenefitTypeormEntity',
    'maternityPayRejection',
    { eager: false },
  )
  public maternityPayRejectionInssBenefit?: MaternityPayRejectionInssBenefitTypeormEntity[];

  @OneToMany(
    'MaternityPayRejectionLegalProceedingTypeormEntity',
    'maternityPayRejection',
    { eager: false },
  )
  public maternityPayRejectionLegalProceeding?: MaternityPayRejectionLegalProceedingTypeormEntity[];

  @OneToMany(
    'MaternityPayRejectionWorkPeriodTypeormEntity',
    'maternityPayRejection',
    { eager: false },
  )
  public maternityPayRejectionWorkPeriod?: MaternityPayRejectionWorkPeriodTypeormEntity[];

  protected override readonly _type = MaternityPayRejectionTypeormEntity.name;
}
