export abstract class GenerativeIaGateway {
  public abstract generateHighQualityResponseFromPromptAndFiles(
    prompt: string,
    files: Buffer[],
  ): Promise<string | null>;
}
