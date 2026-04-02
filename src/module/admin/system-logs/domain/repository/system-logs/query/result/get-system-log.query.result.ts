import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class GetSystemLogQueryResult extends BaseBuildableObject {
  public readonly code: number;

  public readonly endpoint: string;

  public readonly data: Date;

  public readonly isError: boolean;

  public readonly stackTrace: string | null;

  public readonly requestBody: string | null;

  public readonly responseBody: string | null;

  protected override readonly _type = GetSystemLogQueryResult.name;
}
