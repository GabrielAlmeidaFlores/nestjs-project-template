import { NotFoundError } from '@core/error/not-found.error';

export class MaternityPayGrantCnisDocumentNotFoundError extends NotFoundError {
  protected override readonly _type =
    MaternityPayGrantCnisDocumentNotFoundError.name;

  public constructor() {
    super(
      'Documento CNIS da concessão de salário-maternidade não encontrado. Por favor, faça o upload do CNIS antes de gerar a análise.',
    );
  }
}
