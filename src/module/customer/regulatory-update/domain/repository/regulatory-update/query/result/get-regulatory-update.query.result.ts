import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { RegulatoryUpdateId } from '@module/customer/regulatory-update/domain/schema/entity/regulatory-update/value-object/regulatory-update-id/regulatory-update-id.value-object';

export class GetRegulatoryUpdateQueryResult extends BaseBuildableObject {
  public readonly id: RegulatoryUpdateId;
  public readonly title: string;
  public readonly legalIdentifier: string | null;
  public readonly summary: string;
  public readonly mainChanges: string[];
  public readonly implementationStatus: string;
  public readonly beneficiaryImpact: string;
  public readonly fullText: string;
  public readonly sourceUrl: string | null;
  public readonly publishedAt: Date | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  protected override readonly _type = GetRegulatoryUpdateQueryResult.name;
}
