import { NotFoundError } from '@core/error/not-found.error';

export class AccidentAssistanceTerminatedCnisDocumentNotFoundError extends NotFoundError {
  protected override readonly _type =
    AccidentAssistanceTerminatedCnisDocumentNotFoundError.name;

  public constructor() {
    super(
      'Documento CNIS não encontrado no diagnóstico para auxílio-acidente (RGPS). Por favor, faça o upload do CNIS antes de executar a primeira análise.',
    );
  }
}
