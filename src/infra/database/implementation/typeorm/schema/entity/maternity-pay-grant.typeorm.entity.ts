import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { MaternityPayGrantDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-grant-document.typeorm.entity';
import { MaternityPayGrantEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-grant-earnings-history.typeorm.entity';
import { MaternityPayGrantInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-grant-inss-benefit.typeorm.entity';
import { MaternityPayGrantLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-grant-legal-proceeding.typeorm.entity';
import { MaternityPayGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-grant-period.typeorm.entity';
import { MaternityPayGrantResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-grant-result.typeorm.entity';
import { CryptographyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/cryptography.transformer';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { MaternityPayGrantTriggeringEventEnum } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/enum/maternity-pay-grant-triggering-event.enum';
import { MaternityPayGrantCategoryEnum } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/enum/maternity-pay-grant-category.enum';

@Entity({ name: 'maternity_pay_grant' })
export class MaternityPayGrantTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'analysis_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public analysisName: string | null;

  @Column({
    name: 'category',
    type: 'simple-enum',
    enum: MaternityPayGrantCategoryEnum,
    nullable: true,
  })
  public category: MaternityPayGrantCategoryEnum | null;

  @Column({
    name: 'triggering_event',
    type: 'simple-enum',
    enum: MaternityPayGrantTriggeringEventEnum,
    nullable: true,
  })
  public triggeringEvent: MaternityPayGrantTriggeringEventEnum | null;

  @Column({
    name: 'triggering_event_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public triggeringEventDate: Date | null;

  @Column({
    name: 'cnis_document',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public cnisDocument: string | null;

  @Column({
    name: 'my_inss_password',
    type: 'varchar',
    length: 500,
    nullable: true,
    transformer: CryptographyTransformer,
  })
  public myInssPassword: string | null;

  @Column({
    name: 'is_triggering_event_date_valid',
    type: 'boolean',
    nullable: true,
  })
  public isTriggeringEventDateValid: boolean | null;

  @Column({
    name: 'is_currently_unemployed',
    type: 'boolean',
    nullable: true,
  })
  public isCurrentlyUnemployed: boolean | null;

  @Column({
    name: 'is_unemployed_at_triggering_event_date',
    type: 'boolean',
    nullable: true,
  })
  public isUnemployedAtTriggeringEventDate: boolean | null;

  @Column({
    name: 'is_rural_insured',
    type: 'boolean',
    nullable: true,
  })
  public isRuralInsured: boolean | null;

  @Column({
    name: 'rural_period_start_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public ruralPeriodStartDate: Date | null;

  @Column({
    name: 'rural_period_end_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public ruralPeriodEndDate: Date | null;

  @Column({
    name: 'rural_period_document_description',
    type: 'text',
    nullable: true,
  })
  public ruralPeriodDocumentDescription: string | null;

  @OneToOne(
    () => MaternityPayGrantResultTypeormEntity,
    (entity) => entity.maternityPayGrant,
    { nullable: true },
  )
  @JoinColumn({ name: 'maternity_pay_grant_result_id' })
  public maternityPayGrantResult?:
    | MaternityPayGrantResultTypeormEntity
    | null
    | undefined;

  @OneToMany(
    () => MaternityPayGrantInssBenefitTypeormEntity,
    (entity) => entity.maternityPayGrant,
  )
  public maternityPayGrantInssBenefit?:
    | MaternityPayGrantInssBenefitTypeormEntity[]
    | undefined;

  @OneToMany(
    () => MaternityPayGrantLegalProceedingTypeormEntity,
    (entity) => entity.maternityPayGrant,
  )
  public maternityPayGrantLegalProceeding?:
    | MaternityPayGrantLegalProceedingTypeormEntity[]
    | undefined;

  @OneToMany(
    () => MaternityPayGrantDocumentTypeormEntity,
    (entity) => entity.maternityPayGrant,
  )
  public maternityPayGrantDocument?:
    | MaternityPayGrantDocumentTypeormEntity[]
    | undefined;

  @OneToMany(
    () => MaternityPayGrantPeriodTypeormEntity,
    (entity) => entity.maternityPayGrant,
  )
  public maternityPayGrantPeriod?:
    | MaternityPayGrantPeriodTypeormEntity[]
    | undefined;

  @OneToMany(
    () => MaternityPayGrantEarningsHistoryTypeormEntity,
    (entity) => entity.maternityPayGrant,
  )
  public maternityPayGrantEarningsHistory?:
    | MaternityPayGrantEarningsHistoryTypeormEntity[]
    | undefined;

  protected override readonly _type = MaternityPayGrantTypeormEntity.name;
}
