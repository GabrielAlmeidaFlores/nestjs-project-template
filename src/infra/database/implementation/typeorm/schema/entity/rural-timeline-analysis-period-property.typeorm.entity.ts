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
  })
  public propertyName: string;

  @Column({
    name: 'owner_name',
    type: 'varchar',
    length: 255,
  })
  public ownerName: string;

  @Column({
    name: 'postal_code',
    type: 'varchar',
    length: 20,
  })
  public postalCode: string;

  @Column({
    name: 'state_code',
    type: 'varchar',
    length: 2,
  })
  public stateCode: StateCodeEnum;

  @Column({
    name: 'city',
    type: 'varchar',
    length: 255,
  })
  public city: string;

  @Column({
    name: 'neighborhood',
    type: 'varchar',
    length: 255,
  })
  public neighborhood: string;

  @Column({
    name: 'street',
    type: 'varchar',
    length: 255,
  })
  public street: string;

  @Column({
    name: 'street_number',
    type: 'varchar',
    length: 50,
  })
  public streetNumber: string;

  @Column({
    name: 'land_ownership_type',
    type: 'varchar',
    length: 50,
  })
  public landOwnershipType: RuralTimelineAnalysisPeriodLandOwnershipTypeEnum;

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
