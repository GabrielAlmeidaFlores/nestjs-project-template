import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { SpecialRetirementGrantLegalProceedingEntityPropsInterface } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-legal-proceeding/special-retirement-grant-legal-proceeding.entity.props.interface';
import { SpecialRetirementGrantLegalProceedingId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-legal-proceeding/value-object/special-retirement-grant-legal-proceeding-id/special-retirement-grant-legal-proceeding-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class SpecialRetirementGrantLegalProceedingEntity extends BaseEntity<SpecialRetirementGrantLegalProceedingId> {
  @Description('Número do processo informado pelo cliente.')
  public readonly legalProceedingNumber: string;

  protected readonly _type = SpecialRetirementGrantLegalProceedingEntity.name;

  public constructor(
    props: SpecialRetirementGrantLegalProceedingEntityPropsInterface,
  ) {
    super(SpecialRetirementGrantLegalProceedingId, props);
    this.legalProceedingNumber = props.legalProceedingNumber;
  }
}
