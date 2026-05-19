import { NotFoundError } from '@core/error/not-found.error';

export class ElderlyBpcRejectionCnisDocumentNotFoundError extends NotFoundError {
  protected override readonly _type =
    ElderlyBpcRejectionCnisDocumentNotFoundError.name;

  public constructor() {
    super(
      'Documento CNIS não encontrado no Indeferimento de BPC Idoso. Por favor, adicione o documento CNIS.',
    );
  }
}
