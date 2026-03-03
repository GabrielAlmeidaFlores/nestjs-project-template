import { NotFoundError } from '@core/error/not-found.error';

export class RuralTimelineAnalysisPeriodFamilyGroupMemberNotFoundError extends NotFoundError {
  protected override readonly _type =
    RuralTimelineAnalysisPeriodFamilyGroupMemberNotFoundError.name;

  public constructor() {
    super('Membro do grupo familiar não encontrado');
  }
}
