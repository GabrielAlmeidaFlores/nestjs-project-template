export abstract class CnisAnalysisGateway {
  public abstract analyzeCnis(files: Buffer[]): Promise<string | null>;
}
