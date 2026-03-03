import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class GeminiResultOutputModel extends BaseBuildableObject {
  public readonly text: string | null;
  public readonly model: string;
  public readonly inputTokens: number;
  public readonly outputTokens: number;
  public readonly totalTokens: number;

  protected override readonly _type = GeminiResultOutputModel.name;
}
