import { NotFoundError } from '@core/error/not-found.error';

export class TeacherRetirementPlanningNotFoundError extends NotFoundError {
  protected override readonly _type = TeacherRetirementPlanningNotFoundError.name;

  public constructor() {
    super('Planejamento previdenciário de professor não encontrado.');
  }
}
