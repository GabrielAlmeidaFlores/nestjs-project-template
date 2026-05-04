import { InvalidInputError } from '@core/error/invalid-input.error';

export class AccidentAssistanceTerminatedDocumentRequiredError extends InvalidInputError {
  protected override readonly _type =
    AccidentAssistanceTerminatedDocumentRequiredError.name;

  public constructor() {
    super(
      'É necessário ao menos um documento para gerar o diagnóstico para auxílio-acidente (RGPS)',
    );
  }
}
