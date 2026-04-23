import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';
import { AccidentAssistanceTerminatedLegalProceedingId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-legal-proceeding/value-object/accident-assistance-terminated-legal-proceeding-id/accident-assistance-terminated-legal-proceeding-id.value-object';

export class GetAccidentAssistanceTerminatedLegalProceedingQueryResult extends BaseBuildableObject {
  public readonly id: AccidentAssistanceTerminatedLegalProceedingId;
  public readonly legalProceedingNumber: string;

  protected override readonly _type =
    GetAccidentAssistanceTerminatedLegalProceedingQueryResult.name;
}
