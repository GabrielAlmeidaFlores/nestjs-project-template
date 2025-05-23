import { EnvironmentVariable } from '@shared/system/constant/application-variable/utils/environment-variable.object';

export class NodeApplicationVariable {
  public static readonly source = new EnvironmentVariable();

  public static readonly NODE_ENV: 'development' | 'production' =
    NodeApplicationVariable.source.getOrDefault(
      'NODE_ENV',
      String,
      'development',
    );

  protected readonly _type = NodeApplicationVariable.name;
}
