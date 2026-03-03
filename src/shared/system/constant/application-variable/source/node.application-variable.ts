import { EnvironmentVariableService } from '@shared/system/constant/application-variable/implementation/environment-variable/environment-variable.service';

export class NodeApplicationVariable {
  public static readonly source = new EnvironmentVariableService();

  public static readonly PRODUCTION_ENVIRONMENT =
    NodeApplicationVariable.source.getValueOrDefault<boolean>(
      'PRODUCTION_ENVIRONMENT',
      Boolean,
      true,
    );

  protected readonly _type = NodeApplicationVariable.name;
}
