export abstract class GenerativeIaGateway {
  public abstract generateHighQualityResponseFromPromptAndFiles(
    prompt: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract generateFlashResponseFromPromptAndFiles(
    prompt: string,
    files: Buffer[],
  ): Promise<string | null>;
}
