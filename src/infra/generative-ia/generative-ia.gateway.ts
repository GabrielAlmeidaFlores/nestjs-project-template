import type { SchemaUnion } from '@google/genai';
import type { GenerateResponseInputModel } from '@infra/generative-ia/implementation/model/input/generate-response.input.model';

export abstract class GenerativeIaGateway {
  public abstract generateHighQualityResponseFromPromptAndFiles(
    props: GenerateResponseInputModel,
  ): Promise<string | null>;

  public abstract generateFlashResponseFromPromptAndFiles(
    props: GenerateResponseInputModel,
  ): Promise<string | null>;

  public abstract generateHighQualityResponseFromPromptAndFilesWithContract(
    props: GenerateResponseInputModel,
    responseSchema?: SchemaUnion,
  ): Promise<string | null>;
}
