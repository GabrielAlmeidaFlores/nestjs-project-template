import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GeneralUrbanRetirementGrantResultId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-result/value-object/general-urban-retirement-grant-result-id.value-object';

export class GetGeneralUrbanRetirementGrantResultQueryResult extends BaseBuildableObject {
  public readonly id: GeneralUrbanRetirementGrantResultId;
  public readonly clientName: string | null;
  public readonly clientFederalDocument: string | null;
  public readonly clientBirthDate: Date | null;
  public readonly clientLastAffiliationDate: Date | null;
  public readonly compareCnisCtps: string | null;
  public readonly compareCnisCtpsRaw: string | null;
  public readonly result: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetGeneralUrbanRetirementGrantResultQueryResult.name;
}
