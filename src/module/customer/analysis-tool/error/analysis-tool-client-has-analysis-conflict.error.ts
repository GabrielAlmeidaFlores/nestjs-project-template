import { ConflictError } from '@core/error/conflict.error';

export class AnalysisToolClientHasAnalysis extends ConflictError {
  protected override readonly _type = AnalysisToolClientHasAnalysis.name;

  public constructor() {
    super('O cliente possui análises em seu nome.');
  }
}
