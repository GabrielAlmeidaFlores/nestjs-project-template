import { ServiceUnavailableError } from '@core/error/service-unavailable.error';
export class McpGetAvailableToolsError extends ServiceUnavailableError {
  protected override readonly _type = McpGetAvailableToolsError.name;

  public constructor() {
    super('Erro ao se comunicar com o Eloy');
  }
}
