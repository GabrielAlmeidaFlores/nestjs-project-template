export abstract class DocumentAnalysisGateway {
  public abstract analyzeCnis(files: Buffer[]): Promise<string | null>;
}
