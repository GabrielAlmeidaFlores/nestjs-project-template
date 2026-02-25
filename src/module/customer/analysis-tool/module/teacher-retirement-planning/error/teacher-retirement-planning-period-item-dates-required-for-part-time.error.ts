import { InvalidInputError } from '@core/error/invalid-input.error';

export class TeacherRetirementPlanningPeriodItemDatesRequiredForPartTimeError extends InvalidInputError {
  protected override readonly _type =
    TeacherRetirementPlanningPeriodItemDatesRequiredForPartTimeError.name;

  public constructor() {
    super('Para itens part-time, as datas de início e fim são obrigatórias.');
  }
}
