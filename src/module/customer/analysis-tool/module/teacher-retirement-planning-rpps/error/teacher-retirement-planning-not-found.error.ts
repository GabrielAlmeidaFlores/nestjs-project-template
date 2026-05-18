import { NotFoundError } from '@core/error/not-found.error';

export class TeacherRetirementPlanningRppsNotFoundError extends NotFoundError {
  protected override readonly _type =
    TeacherRetirementPlanningRppsNotFoundError.name;

  public constructor() {
    super('Planejamento previdenciário de professor não encontrado.');
  }
}
