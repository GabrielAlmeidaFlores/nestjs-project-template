import type { GenerateResponseInputModel } from '@infra/generative-ia/model/input/generate-response.input.model';

export abstract class GenerativeIaGateway {
  public abstract generateHighQualityResponseFromPromptAndFiles(
    props: GenerateResponseInputModel,
  ): Promise<string | null>;

  public abstract generateFlashLiteResponseFromPromptAndFiles(
    props: GenerateResponseInputModel,
  ): Promise<string | null>;

  public abstract generateFlashResponseFromPromptAndFiles(
    props: GenerateResponseInputModel,
  ): Promise<string | null>;
}
