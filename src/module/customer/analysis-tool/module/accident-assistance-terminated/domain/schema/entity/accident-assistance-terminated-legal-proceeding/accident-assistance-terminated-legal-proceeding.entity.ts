import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { Description } from '@shared/system/decorator/property/description/description.decorator';
import { AccidentAssistanceTerminatedLegalProceedingId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-legal-proceeding/value-object/accident-assistance-terminated-legal-proceeding-id/accident-assistance-terminated-legal-proceeding-id.value-object';

import type { AccidentAssistanceTerminatedLegalProceedingEntityPropsInterface } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-legal-proceeding/accident-assistance-terminated-legal-proceeding.entity.props.interface';

export class AccidentAssistanceTerminatedLegalProceedingEntity extends BaseEntity<AccidentAssistanceTerminatedLegalProceedingId> {
  @Description('Número do processo judicial.')
  public readonly legalProceedingNumber: string;

  protected readonly _type =
    AccidentAssistanceTerminatedLegalProceedingEntity.name;

  public constructor(
    props: AccidentAssistanceTerminatedLegalProceedingEntityPropsInterface,
  ) {
    super(AccidentAssistanceTerminatedLegalProceedingId, props);

    this.legalProceedingNumber = props.legalProceedingNumber;
  }
}
