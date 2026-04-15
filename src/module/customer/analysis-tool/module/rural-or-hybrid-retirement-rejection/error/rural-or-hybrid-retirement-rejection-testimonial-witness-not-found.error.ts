import { NotFoundError } from '@core/error/not-found.error';

export class RuralOrHybridRetirementRejectionTestimonialWitnessNotFoundError extends NotFoundError {
  protected override readonly _type =
    RuralOrHybridRetirementRejectionTestimonialWitnessNotFoundError.name;

  public constructor() {
    super('Testemunha da análise de indeferimento de aposentadoria rural ou híbrida não encontrada.');
  }
}
