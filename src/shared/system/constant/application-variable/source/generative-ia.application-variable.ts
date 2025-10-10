import { EnvironmentVariableService } from '@shared/system/constant/application-variable/implementation/environment-variable/environment-variable.service';

export class GenerativeIaApplicationVariable {
  public static readonly source = new EnvironmentVariableService();

  public static readonly GENERATIVE_IA_GEMINI_API_KEY =
    GenerativeIaApplicationVariable.source.getValueOrThrow<string>(
      'GENERATIVE_IA_GEMINI_API_KEY',
      String,
    );

  public static readonly SYSTEM_PROMPT_CNIS_FAST_ANALYSIS =
    GenerativeIaApplicationVariable.source.getValueOrThrow<string>(
      'SYSTEM_PROMPT_CNIS_FAST_ANALYSIS',
      String,
    );

  protected readonly _type = GenerativeIaApplicationVariable.name;
}
