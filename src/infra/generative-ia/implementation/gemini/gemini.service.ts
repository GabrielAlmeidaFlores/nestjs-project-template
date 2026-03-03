import { GenerateContentParameters, GoogleGenAI, Part } from '@google/genai';
import { Inject, Injectable } from '@nestjs/common';
import * as fileType from 'file-type';

import { GenerativeIaApiKeyInvalidError } from '@infra/generative-ia/error/generative-ia-api-key-invalid.error';
import { GenerativeIaConnectionError } from '@infra/generative-ia/error/generative-ia-connection.error';
import { GenerativeIaFunctionHandlerNotFoundError } from '@infra/generative-ia/error/generative-ia-function-handler-not-found.error';
import { GenerativeIaQuotaExceededError } from '@infra/generative-ia/error/generative-ia-quota-exceeded.error';
import { GenerativeIaGateway } from '@infra/generative-ia/generative-ia.gateway';
import { GeminiResultOutputModel } from '@infra/generative-ia/implementation/gemini/model/output/gemini-result.output.model';
import { GenerateResponseInputModel } from '@infra/generative-ia/model/input/generate-response.input.model';
import { GenerativeIaPartType } from '@infra/generative-ia/type/generative-ia-part.type';
import { GenerativeIaApplicationVariable } from '@shared/system/constant/application-variable/source/generative-ia.application-variable';
import { ObservabilityLogInputModel } from '@shared/system/observability/model/input/observability-log.input.model';
import { ObservabilityGateway } from '@shared/system/observability/observability.gateway';
import { withSpan } from '@shared/system/tracing/tracer';

@Injectable()
export class GeminiService implements GenerativeIaGateway {
  private static readonly TEMPERATURE_FOR_JSON_MODE = 0;
  private static readonly TEMPERATURE_FOR_MARKDOWN_MODE = 0.1;
  private static readonly TOP_P_VALUE = 0.95;
  private static readonly TOP_K_VALUE = 40;

  protected readonly _type = GeminiService.name;

  private readonly FALLBACK_MODELS: Record<string, string>;

  private readonly GENERATIVE_IA_RULES: string[];

  private readonly googleGenerativeAI: GoogleGenAI;
  private readonly urlRegex: RegExp;
  private readonly fileTypeCache: Map<string, string>;
  private readonly hashSubstringLength: number;

  public constructor(
    @Inject(ObservabilityGateway)
    private readonly observabilityGateway: ObservabilityGateway,
  ) {
    this.hashSubstringLength = 32;
    this.urlRegex = /\bhttps?:\/\/[^\s"'<>]+/i;
    this.fileTypeCache = new Map<string, string>();
    this.googleGenerativeAI = new GoogleGenAI({
      apiKey: GenerativeIaApplicationVariable.GENERATIVE_IA_GEMINI_API_KEY,
    });
    this.FALLBACK_MODELS = {
      'gemini-3-pro-preview': 'gemini-3-flash-preview',
      'gemini-3-flash-preview': 'gemini-2.0-flash',
    };
    this.GENERATIVE_IA_RULES = [
      `
Role: Act as a Technical Documentation Specialist.
Task: Generate all responses exclusively in Standard Semantic Markdown optimized for direct HTML parsing.
Formatting Rules:
1. Strict Hierarchy: Use Markdown headers (#, ##, ###) to define the report structure. Never skip levels.
2. Data Presentation: Use Markdown Tables (| column |) for all structured data. Do not use spaces, dashes, or tabs to visually simulate tables.
3. Lists: Use standard bullet points (-) or numbered lists (1.) for sequential items.
4. No ASCII Art/Visual Drawings: STRICTLY FORBIDDEN - Do not use ANY of the following to draw borders, boxes, diagrams or flowcharts: pipes (|), slashes (/\\), dashes (-), plus signs (+), equals signs (=), or Unicode box-drawing characters (┌ ┐ └ ┘ │ ─ ├ ┤ ┬ ┴ ┼ ╔ ╗ ╚ ╝ ║ ═ ╠ ╣ ╦ ╩ ╬ and similar). Use Markdown headers, bullet points and tables instead.
5. Clean Text Focus: Avoid wrapping the response in JSON blocks unless explicitly requested. Provide raw Markdown text.
6. Report Tone: Organize content with a clear Introduction, Body, and Conclusion.
`,
    ];
  }

  public async generateFlashLiteResponseFromPromptAndFiles(
    props: GenerateResponseInputModel,
  ): Promise<string | null> {
    const MAX_OUTPUT_TOKENS_FOR_JSON_RESPONSE = 6_000;
    const MAX_OUTPUT_TOKENS_FOR_MARKDOWN_RESPONSE = 2_000;

    const maxOutputTokens = props.responseConfig
      ? MAX_OUTPUT_TOKENS_FOR_JSON_RESPONSE
      : MAX_OUTPUT_TOKENS_FOR_MARKDOWN_RESPONSE;

    return await this.generateResponseFromPromptAndFiles(
      props,
      'gemini-3-flash-preview',
      maxOutputTokens,
    );
  }

  public async generateFlashResponseFromPromptAndFiles(
    props: GenerateResponseInputModel,
  ): Promise<string | null> {
    const MAX_OUTPUT_TOKENS_FOR_JSON_RESPONSE = 6_000;
    const MAX_OUTPUT_TOKENS_FOR_MARKDOWN_RESPONSE = 4_000;

    const maxOutputTokens = props.responseConfig
      ? MAX_OUTPUT_TOKENS_FOR_JSON_RESPONSE
      : MAX_OUTPUT_TOKENS_FOR_MARKDOWN_RESPONSE;

    return await this.generateResponseFromPromptAndFiles(
      props,
      'gemini-3-flash-preview',
      maxOutputTokens,
    );
  }

  public async generateHighQualityResponseFromPromptAndFiles(
    props: GenerateResponseInputModel,
  ): Promise<string | null> {
    const MAX_OUTPUT_TOKENS_FOR_JSON_RESPONSE = 16_000;
    const MAX_OUTPUT_TOKENS_FOR_MARKDOWN_RESPONSE = 8_192;

    const maxOutputTokens = props.responseConfig
      ? MAX_OUTPUT_TOKENS_FOR_JSON_RESPONSE
      : MAX_OUTPUT_TOKENS_FOR_MARKDOWN_RESPONSE;

    return await this.generateResponseFromPromptAndFiles(
      props,
      'gemini-3-pro-preview',
      maxOutputTokens,
    );
  }

  private async generateResponseFromPromptAndFiles(
    props: GenerateResponseInputModel,
    model: string,
    maxOutputTokens: number,
    isRetry = false,
  ): Promise<string | null> {
    const startedAt = Date.now();

    return withSpan(`Gemini.generateContent`, async (span) => {
      span.setAttributes({
        'llm.provider': 'google',
        'llm.model': model,
        'llm.max_output_tokens': maxOutputTokens,
        'llm.is_retry': isRetry,
        'llm.has_files': (props.promptFiles?.length ?? 0) > 0,
        'llm.has_tools': (props.tools?.length ?? 0) > 0,
        'llm.has_conversation_history':
          (props.conversationHistory?.length ?? 0) > 0,
        'llm.structured_json_mode': props.responseConfig !== undefined,
      });

      const result = await this.executeGenerateResponseFromPromptAndFiles(
        props,
        model,
        maxOutputTokens,
        isRetry,
      );

      span.setAttributes({
        'llm.token.input': result.inputTokens,
        'llm.token.output': result.outputTokens,
        'llm.token.total': result.totalTokens,
        'llm.model.used': result.model,
      });

      this.observabilityGateway.emitInfo(
        ObservabilityLogInputModel.build({
          scope: GeminiService.name,
          message: `Gemini.generateContent [${result.model}]`,
          attributes: {
            'llm.model': result.model,
            'llm.token.input': result.inputTokens,
            'llm.token.output': result.outputTokens,
            'llm.token.total': result.totalTokens,
            'llm.duration_ms': Date.now() - startedAt,
            'llm.is_retry': isRetry,
          },
        }),
      );

      return result.text;
    });
  }

  private async executeGenerateResponseFromPromptAndFiles(
    props: GenerateResponseInputModel,
    model: string,
    maxOutputTokens: number,
    isRetry = false,
  ): Promise<GeminiResultOutputModel> {
    const promptPart: Part[] = [];
    const systemInstructionParts: Part[] = [];

    if (props.prompt !== undefined) {
      promptPart.push({ text: props.prompt });
    }

    if (props.systemInstruction !== undefined) {
      systemInstructionParts.push({ text: props.systemInstruction });
    }

    this.GENERATIVE_IA_RULES.forEach((rule) => {
      systemInstructionParts.push({ text: rule });
    });

    if (props.promptFiles !== undefined) {
      const fileParts = await this.buildPartWithFileContent(props.promptFiles);
      promptPart.push(...fileParts);
    }

    const contents: Array<{ role: string; parts: Part[] }> = [];

    if (
      props.conversationHistory !== undefined &&
      props.conversationHistory.length > 0
    ) {
      for (const msg of props.conversationHistory) {
        contents.push({
          role: msg.role,
          parts: [{ text: msg.content }],
        });
      }
    }

    if (promptPart.length > 0) {
      contents.push({
        role: 'user',
        parts: promptPart,
      });
    }

    const isStructuredJsonMode = props.responseConfig !== undefined;
    const temperature = isStructuredJsonMode
      ? GeminiService.TEMPERATURE_FOR_JSON_MODE
      : GeminiService.TEMPERATURE_FOR_MARKDOWN_MODE;

    const contentConfig = {
      model,
      contents: contents.length > 0 ? contents : { role: 'user', parts: [] },
      config: isStructuredJsonMode
        ? { temperature, maxOutputTokens }
        : {
            temperature,
            maxOutputTokens,
            topP: GeminiService.TOP_P_VALUE,
            topK: GeminiService.TOP_K_VALUE,
          },
    } as GenerateContentParameters;

    if (props.responseConfig !== undefined) {
      if (
        props.responseConfig.jsonSchema !== undefined &&
        contentConfig.config !== undefined
      ) {
        contentConfig.config.responseJsonSchema =
          props.responseConfig.jsonSchema;
      }

      if (
        props.responseConfig.responseMimeType !== undefined &&
        contentConfig.config !== undefined
      ) {
        contentConfig.config.responseMimeType =
          props.responseConfig.responseMimeType;
      }
    }

    const hasUrl =
      (props.systemInstruction !== undefined &&
        this.urlRegex.test(props.systemInstruction)) ||
      (props.prompt !== undefined && this.urlRegex.test(props.prompt));

    if (contentConfig.config) {
      const toolsList: Array<unknown> = [];

      if (hasUrl) {
        toolsList.push({
          urlContext: {},
        });
      }

      if (props.tools !== undefined && props.tools.length > 0) {
        const functionDeclarations = props.tools.map((tool) => ({
          name: tool.name,
          description: tool.description,
          parameters: tool.parameters,
        }));

        toolsList.push({
          functionDeclarations,
        });
      }

      if (toolsList.length > 0) {
        contentConfig.config.tools = toolsList as never;
      }
    }

    if (systemInstructionParts.length > 0 && contentConfig.config) {
      contentConfig.config.systemInstruction = {
        parts: systemInstructionParts,
      };
    }

    try {
      if (
        props.tools !== undefined &&
        props.toolHandlers !== undefined &&
        props.tools.length > 0
      ) {
        return await this.generateWithFunctionCalling(
          contentConfig,
          props.toolHandlers,
          model,
        );
      }

      const result =
        await this.googleGenerativeAI.models.generateContent(contentConfig);

      return GeminiResultOutputModel.build({
        text:
          typeof result.text === 'string'
            ? this.stripCodeFence(result.text)
            : null,
        model,
        inputTokens: result.usageMetadata?.promptTokenCount ?? 0,
        outputTokens: result.usageMetadata?.candidatesTokenCount ?? 0,
        totalTokens: result.usageMetadata?.totalTokenCount ?? 0,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message.includes('fetch failed')) {
          throw new GenerativeIaConnectionError({
            originalError: error.message,
          });
        }

        if (
          error.message.includes('API key') ||
          error.message.includes('api key')
        ) {
          throw new GenerativeIaApiKeyInvalidError();
        }

        if (
          error.message.includes('quota') ||
          error.message.includes('limit')
        ) {
          throw new GenerativeIaQuotaExceededError();
        }

        if (
          error.message.includes('UNAVAILABLE') ||
          error.message.includes('503')
        ) {
          const fallbackModel = this.FALLBACK_MODELS[model];

          if (fallbackModel !== undefined && !isRetry) {
            const fallbackText = await this.generateResponseFromPromptAndFiles(
              props,
              fallbackModel,
              maxOutputTokens,
              true,
            );
            return GeminiResultOutputModel.build({
              text: fallbackText,
              model: fallbackModel,
              inputTokens: 0,
              outputTokens: 0,
              totalTokens: 0,
            });
          }
        }
      }

      throw error;
    }
  }

  private async generateWithFunctionCalling(
    contentConfig: GenerateContentParameters,
    toolHandlers: Record<
      string,
      (params: Record<string, unknown>) => Promise<unknown>
    >,
    model: string,
  ): Promise<GeminiResultOutputModel> {
    const MAX_FUNCTION_CALLS = 10;
    let callCount = 0;
    let totalInputTokens = 0;
    let totalOutputTokens = 0;
    let totalTokens = 0;
    const conversationHistory: Array<unknown> = Array.isArray(
      contentConfig.contents,
    )
      ? [...contentConfig.contents]
      : [contentConfig.contents];

    while (callCount < MAX_FUNCTION_CALLS) {
      try {
        const result = await this.googleGenerativeAI.models.generateContent({
          ...contentConfig,
          contents: conversationHistory as never,
        });

        totalInputTokens += result.usageMetadata?.promptTokenCount ?? 0;
        totalOutputTokens += result.usageMetadata?.candidatesTokenCount ?? 0;
        totalTokens += result.usageMetadata?.totalTokenCount ?? 0;

        const functionCalls = result.functionCalls;

        if (functionCalls === undefined || functionCalls.length === 0) {
          return GeminiResultOutputModel.build({
            text: result.text ?? null,
            model,
            inputTokens: totalInputTokens,
            outputTokens: totalOutputTokens,
            totalTokens,
          });
        }

        const candidates = result.candidates;
        if (candidates?.[0]?.content !== undefined) {
          conversationHistory.push(candidates[0].content);
        }

        const functionResponses: Array<unknown> = [];

        for (const functionCall of functionCalls) {
          const functionName = functionCall.name ?? '';
          const functionParams = functionCall.args ?? {};

          try {
            const handler = toolHandlers[functionName] as
              | ((params: Record<string, unknown>) => Promise<unknown>)
              | undefined;

            if (handler === undefined) {
              throw new GenerativeIaFunctionHandlerNotFoundError({
                functionName,
              });
            }

            const functionResult = await handler(functionParams);

            functionResponses.push({
              functionResponse: {
                name: functionName,
                response: functionResult,
              },
            });
          } catch (error: unknown) {
            let errorMessage = 'Unknown error';
            const MAX_ERROR_MESSAGE_LENGTH = 200;

            if (error instanceof Error) {
              errorMessage = error.message
                .replace(/["']/g, '')
                .replace(/\\/g, '/')
                .substring(0, MAX_ERROR_MESSAGE_LENGTH);
            }

            functionResponses.push({
              functionResponse: {
                name: functionName,
                response: {
                  success: false,
                  error: errorMessage,
                  message:
                    'Erro ao executar a ferramenta. Por favor, tente novamente ou reformule sua pergunta.',
                },
              },
            });
          }
        }

        conversationHistory.push({
          role: 'user',
          parts: functionResponses,
        });

        callCount++;
      } catch (error: unknown) {
        if (error instanceof Error) {
          if (error.message.includes('fetch failed')) {
            throw new GenerativeIaConnectionError({
              originalError: error.message,
            });
          }

          if (
            error.message.includes('API key') ||
            error.message.includes('api key')
          ) {
            throw new GenerativeIaApiKeyInvalidError();
          }

          if (
            error.message.includes('quota') ||
            error.message.includes('limit')
          ) {
            throw new GenerativeIaQuotaExceededError();
          }
        }

        throw error;
      }
    }

    return GeminiResultOutputModel.build({
      text: 'Houve um erro ao processar sua mensagem. Por favor, tente novamente.',
      model,
      inputTokens: totalInputTokens,
      outputTokens: totalOutputTokens,
      totalTokens,
    });
  }

  private async buildPartWithFileContent(
    contentList: GenerativeIaPartType[],
  ): Promise<Part[]> {
    const results = await Promise.all(
      contentList.map(async (content) => {
        if (typeof content === 'string') {
          return { text: content } as Part;
        }

        // Cria hash simples do buffer para cache
        const contentHash = Buffer.from(content)
          .toString('base64')
          .substring(0, this.hashSubstringLength);

        let mimeType = this.fileTypeCache.get(contentHash);

        if (mimeType === undefined) {
          const fileData = await fileType.fileTypeFromBuffer(content);

          if (fileData !== undefined) {
            mimeType = fileData.mime;
          } else {
            mimeType = 'text/plain';
          }

          this.fileTypeCache.set(contentHash, mimeType);
        }

        return {
          inlineData: {
            mimeType,
            data: content.toString('base64'),
          },
        } as Part;
      }),
    );

    return results;
  }

  private stripCodeFence(text: string | null): string | null {
    if (text === null) {
      return text;
    }

    return text
      .replace(/^```(?:\w+)?\n/gm, '')
      .replace(/\n```$/gm, '')
      .replace(/```/g, '')
      .trim();
  }
}
