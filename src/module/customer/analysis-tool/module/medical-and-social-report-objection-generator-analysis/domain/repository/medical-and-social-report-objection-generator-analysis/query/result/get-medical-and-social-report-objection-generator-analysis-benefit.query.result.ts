import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class GetMedicalAndSocialReportObjectionGeneratorAnalysisBenefitQueryResult extends BaseBuildableObject {
  public readonly id: Guid;
  public readonly inssBenefitNumber: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetMedicalAndSocialReportObjectionGeneratorAnalysisBenefitQueryResult.name;
}
