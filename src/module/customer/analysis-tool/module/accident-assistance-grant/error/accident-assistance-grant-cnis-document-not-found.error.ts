import { NotFoundError } from '@core/error/not-found.error';

export class AccidentAssistanceGrantCnisDocumentNotFoundError extends NotFoundError {
  protected override readonly _type =
    AccidentAssistanceGrantCnisDocumentNotFoundError.name;

  public constructor() {
    super(
      'Documento CNIS da análise de concessão de auxílio-acidente não encontrado.',
    );
  }
}
