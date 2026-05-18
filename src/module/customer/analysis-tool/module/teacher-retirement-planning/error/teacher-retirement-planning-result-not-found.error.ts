import { NotFoundError } from '@core/error/not-found.error';

export class TeacherRetirementPlanningResultNotFoundError extends NotFoundError {
  protected override readonly _type =
    TeacherRetirementPlanningResultNotFoundError.name;

  public constructor() {
    super(
      'Resultado do planejamento previdenciário de professor não encontrado. Por favor, gere o resultado antes de fazer o download.',
    );
  }
}
