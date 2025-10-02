export abstract class CnisIaAnalysisGateway {
  public abstract analyzeCnis(files: Buffer[]): Promise<string | null>;
}
