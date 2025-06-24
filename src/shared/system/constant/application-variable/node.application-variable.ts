import { EnvironmentVariable } from '@shared/system/constant/application-variable/utils/environment-variable.object';

export class NodeApplicationVariable {
  public static readonly source = new EnvironmentVariable();

  public static readonly PRODUCTION_ENVIRONMENT =
    NodeApplicationVariable.source.getValueOrDefault<boolean>(
      'PRODUCTION_ENVIRONMENT',
      Boolean,
      false,
    );

  protected readonly _type = NodeApplicationVariable.name;
}
