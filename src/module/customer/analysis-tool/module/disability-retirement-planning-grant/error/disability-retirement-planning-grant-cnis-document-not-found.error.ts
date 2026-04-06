import { NotFoundError } from '@core/error/not-found.error';

export class DisabilityRetirementPlanningGrantCnisDocumentNotFoundError extends NotFoundError {
  protected override readonly _type =
    DisabilityRetirementPlanningGrantCnisDocumentNotFoundError.name;

  public constructor() {
    super(
      'Documento CNIS da análise não encontrado. Por favor, envie o documento antes de gerar a first analysis.',
    );
  }
}
