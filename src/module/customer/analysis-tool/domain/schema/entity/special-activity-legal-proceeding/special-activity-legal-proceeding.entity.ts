import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { SpecialActivityEntity } from '@module/customer/analysis-tool/domain/schema/entity/special-activity/special-activity-entity';
import { SpecialActivityLegalProceedingEntityPropsInterface } from '@module/customer/analysis-tool/domain/schema/entity/special-activity-legal-proceeding/special-activity-legal-proceeding-entity.props.interface';
import { SpecialActivityLegalProceedingId } from '@module/customer/analysis-tool/domain/schema/entity/special-activity-legal-proceeding/value-object/special-activity-legal-proceeding-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class SpecialActivityLegalProceedingEntity extends BaseEntity<SpecialActivityLegalProceedingId> {
  @Description('Número do processo judicial')
  public readonly legalProceedingNumber: string;

  @Description('Atividade especial relacionada')
  public readonly specialActivity: SpecialActivityEntity;

  protected readonly _type = SpecialActivityLegalProceedingEntity.name;

  public constructor(
    props: SpecialActivityLegalProceedingEntityPropsInterface,
  ) {
    super(SpecialActivityLegalProceedingId, props);

    this.legalProceedingNumber = props.legalProceedingNumber;
    this.specialActivity = props.specialActivity;
  }
}
