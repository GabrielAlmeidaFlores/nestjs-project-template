import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { AccidentAssistanceTerminatedBenefitId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-benefit/value-object/accident-assistance-terminated-benefit-id/accident-assistance-terminated-benefit-id.value-object';

export class GetAccidentAssistanceTerminatedBenefitQueryResult extends BaseBuildableObject {
  public readonly id: AccidentAssistanceTerminatedBenefitId;
  public readonly inssBenefitNumber: string;

  protected override readonly _type =
    GetAccidentAssistanceTerminatedBenefitQueryResult.name;
}
