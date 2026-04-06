import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class GetSystemActivityQueryResult extends BaseBuildableObject {
  public readonly id: string;
  public readonly title: string;
  public readonly description: string;
  public readonly createdAt: Date;
  public readonly organizationMemberId: string | null;
  public readonly collaboratorName: string | null;
  public readonly collaboratorEmail: string | null;
  public readonly analysisToolRecordId: string | null;
  public readonly analysisCode: string | null;
  public readonly analysisToolClientId: string | null;
  public readonly clientName: string | null;

  protected override readonly _type = GetSystemActivityQueryResult.name;
}
