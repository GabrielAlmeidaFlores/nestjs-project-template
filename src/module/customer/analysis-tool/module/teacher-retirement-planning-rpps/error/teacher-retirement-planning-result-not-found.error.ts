import { NotFoundError } from '@core/error/not-found.error';

export class TeacherRetirementPlanningRppsResultNotFoundError extends NotFoundError {
  protected override readonly _type =
    TeacherRetirementPlanningRppsResultNotFoundError.name;

  public constructor() {
    super(
      'Resultado do planejamento previdenciário de professor não encontrado. Por favor, gere o resultado antes de fazer o download.',
    );
  }
}
