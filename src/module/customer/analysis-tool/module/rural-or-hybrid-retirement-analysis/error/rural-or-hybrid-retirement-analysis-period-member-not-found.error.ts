import { NotFoundError } from '@core/error/not-found.error';

export class RuralOrHybridRetirementAnalysisPeriodMemberNotFoundError extends NotFoundError {
  protected override readonly _type =
    RuralOrHybridRetirementAnalysisPeriodMemberNotFoundError.name;

  public constructor() {
    super(
      'Membro do período da análise de indeferimento de aposentadoria rural ou híbrida não encontrado.',
    );
  }
}
