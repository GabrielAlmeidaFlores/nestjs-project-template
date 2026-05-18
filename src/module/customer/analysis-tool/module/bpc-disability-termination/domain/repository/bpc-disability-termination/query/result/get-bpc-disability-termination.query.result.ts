import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { BpcDisabilityTerminationCategoryEnum } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/enum/bpc-disability-termination-category.enum';
import type { BpcDisabilityTerminationDisabilityDegreeEnum } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/enum/bpc-disability-termination-disability-degree.enum';
import type { BpcDisabilityTerminationDisabilityTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/enum/bpc-disability-termination-disability-type.enum';
import type { BpcDisabilityTerminationId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/value-object/bpc-disability-termination-id/bpc-disability-termination-id.value-object';

export class GetBpcDisabilityTerminationQueryResult extends BaseBuildableObject {
  public readonly id: BpcDisabilityTerminationId;
  public readonly analysisName: string | null;
  public readonly category: BpcDisabilityTerminationCategoryEnum | null;
  public readonly disabilityType: BpcDisabilityTerminationDisabilityTypeEnum | null;
  public readonly disabilityDegree: BpcDisabilityTerminationDisabilityDegreeEnum | null;
  public readonly benefitCessationReason: string | null;
  public readonly livesAlone: boolean | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetBpcDisabilityTerminationQueryResult.name;
}
