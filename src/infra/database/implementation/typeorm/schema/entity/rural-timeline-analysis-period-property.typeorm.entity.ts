import { Column, Entity, OneToOne } from 'typeorm';

import { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RuralTimelineAnalysisPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-period.typeorm.entity';
import { RuralTimelineAnalysisPeriodLandOwnershipTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-property/enum/rural-timeline-analysis-period-land-ownership-type.enum';

@Entity({ name: 'rural_timeline_period_property' })
export class RuralTimelineAnalysisPeriodPropertyTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'property_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public propertyName?: string | null;

  @Column({
    name: 'owner_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public ownerName?: string | null;

  @Column({
    name: 'postal_code',
    type: 'varchar',
    length: 8,
    nullable: true,
  })
  public postalCode?: string | null;

  @Column({
    name: 'state_code',
    type: 'varchar',
    length: 2,
    nullable: true,
  })
  public stateCode?: StateCodeEnum | null;

  @Column({
    name: 'city',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public city?: string | null;

  @Column({
    name: 'neighborhood',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public neighborhood?: string | null;

  @Column({
    name: 'street',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public street?: string | null;

  @Column({
    name: 'street_number',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  public streetNumber?: string | null;

  @Column({
    name: 'land_ownership_type',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  public landOwnershipType?: RuralTimelineAnalysisPeriodLandOwnershipTypeEnum | null;

  @OneToOne(
    () => RuralTimelineAnalysisPeriodTypeormEntity,
    (entity) => entity.ruralTimelinePeriodProperty,
  )
  public ruralTimelinePeriod?:
    | RuralTimelineAnalysisPeriodTypeormEntity
    | undefined;

  protected override readonly _type =
    RuralTimelineAnalysisPeriodPropertyTypeormEntity.name;
}
