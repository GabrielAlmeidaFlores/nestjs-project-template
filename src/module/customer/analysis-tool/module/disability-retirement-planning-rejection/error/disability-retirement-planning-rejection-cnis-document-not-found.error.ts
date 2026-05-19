import { NotFoundError } from '@core/error/not-found.error';

export class DisabilityRetirementPlanningRejectionCnisDocumentNotFoundError extends NotFoundError {
  protected override readonly _type =
    DisabilityRetirementPlanningRejectionCnisDocumentNotFoundError.name;

  public constructor() {
    super(
      'Documento CNIS da análise de indeferimento não encontrado. Por favor, faça o upload do CNIS antes de prosseguir.',
    );
  }
}
