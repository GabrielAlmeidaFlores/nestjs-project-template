import { ServiceUnavailableError } from '@core/error/service-unavailable.error';

export class GenerativeIaFunctionHandlerNotFoundError extends ServiceUnavailableError {
  protected override readonly _type =
    GenerativeIaFunctionHandlerNotFoundError.name;

  public constructor(props: { functionName: string }) {
    super(
      `Função "${props.functionName}" não possui um handler configurado. ` +
        'Este é um erro de configuração do sistema. ' +
        'Por favor, contate o suporte técnico.',
    );
  }
}
