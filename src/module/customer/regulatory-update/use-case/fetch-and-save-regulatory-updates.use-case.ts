import { Inject, Injectable, Logger } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { GenerativeIaResponseMimeTypeEnum } from '@infra/generative-ia/enum/generative-ia-response-mime-type.enum';
import { GenerativeIaGateway } from '@infra/generative-ia/generative-ia.gateway';
import { GenerateResponseInputModel } from '@infra/generative-ia/model/input/generate-response.input.model';
import { ResponseConfigInputModel } from '@infra/generative-ia/model/input/response-config.input.model';
import { PaymentPlanPaidResourceQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan-paid-resource/query/payment-plan-paid-resource.query.repository.gateway';
import { PaymentPlanPaidResourceIaConfigQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan-paid-resource-ia-config/query/payment-plan-paid-resource-ia-config.query.repository.gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { RegulatoryUpdateCommandRepositoryGateway } from '@module/customer/regulatory-update/domain/repository/regulatory-update/command/regulatory-update.command.repository.gateway';
import { RegulatoryUpdateQueryRepositoryGateway } from '@module/customer/regulatory-update/domain/repository/regulatory-update/query/regulatory-update.query.repository.gateway';
import { RegulatoryUpdateMonitoredSourceQueryRepositoryGateway } from '@module/customer/regulatory-update/domain/repository/regulatory-update-monitored-source/query/regulatory-update-monitored-source.query.repository.gateway';
import { RegulatoryUpdateEntity } from '@module/customer/regulatory-update/domain/schema/entity/regulatory-update/regulatory-update.entity';

interface AiRegulatoryUpdateItemInterface {
  title: string;
  legalIdentifier?: string | null;
  summary: string;
  mainChanges?: string[];
  implementationStatus?: string;
  beneficiaryImpact?: string;
  fullText?: string;
  sourceUrl?: string | null;
  publishedAt?: string | null;
}

@Injectable()
export class FetchAndSaveRegulatoryUpdatesUseCase {
  protected readonly _type = FetchAndSaveRegulatoryUpdatesUseCase.name;
  private readonly logger: Logger;

  public constructor(
    @Inject(GenerativeIaGateway)
    private readonly generativeIaGateway: GenerativeIaGateway,
    @Inject(RegulatoryUpdateQueryRepositoryGateway)
    private readonly regulatoryUpdateQueryRepository: RegulatoryUpdateQueryRepositoryGateway,
    @Inject(RegulatoryUpdateCommandRepositoryGateway)
    private readonly regulatoryUpdateCommandRepository: RegulatoryUpdateCommandRepositoryGateway,
    @Inject(PaymentPlanPaidResourceQueryRepositoryGateway)
    private readonly paymentPlanPaidResourceQueryRepository: PaymentPlanPaidResourceQueryRepositoryGateway,
    @Inject(PaymentPlanPaidResourceIaConfigQueryRepositoryGateway)
    private readonly paidResourceIaConfigQueryRepository: PaymentPlanPaidResourceIaConfigQueryRepositoryGateway,
    @Inject(RegulatoryUpdateMonitoredSourceQueryRepositoryGateway)
    private readonly monitoredSourceQueryRepository: RegulatoryUpdateMonitoredSourceQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {
    this.logger = new Logger(FetchAndSaveRegulatoryUpdatesUseCase.name);
  }

  public async execute(): Promise<RegulatoryUpdateEntity[]> {
    this.logger.log('Starting regulatory updates fetch...');

    const systemInstruction = await this.fetchSystemInstruction();

    if (systemInstruction === null) {
      this.logger.warn(
        'No system instruction found for REGULATORY_UPDATES. Aborting.',
      );
      return [];
    }

    this.logger.log('System instruction loaded.');

    const activeSources =
      await this.monitoredSourceQueryRepository.listActiveMonitoredSources();

    if (activeSources.length === 0) {
      this.logger.warn(
        'No active monitored source found. Aborting regulatory updates fetch.',
      );
      return [];
    }

    this.logger.log(
      `Found ${activeSources.length} active source(s): ${activeSources.map((s) => s.name).join(', ')}`,
    );

    const existingTitlesAndDates =
      await this.regulatoryUpdateQueryRepository.findAllTitlesAndDates();

    this.logger.log(
      `Found ${existingTitlesAndDates.length} existing regulatory update(s) in the database.`,
    );

    const existingTitlesLower = new Set(
      existingTitlesAndDates.map((item) => item.title.trim().toLowerCase()),
    );

    const prompt = this.buildPrompt(
      existingTitlesAndDates,
      activeSources.map((s) => ({ name: s.name, url: s.url })),
    );

    this.logger.log('Sending prompt to AI. Waiting for response...');

    const aiResponse =
      await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
        GenerateResponseInputModel.build({
          systemInstruction,
          prompt,
          responseConfig: ResponseConfigInputModel.build({
            responseMimeType: GenerativeIaResponseMimeTypeEnum.APPLICATION_JSON,
            jsonSchema: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  title: {
                    type: 'string',
                    description: 'Título da norma ou atualização normativa',
                  },
                  legalIdentifier: {
                    type: 'string',
                    description:
                      'Número de identificação da norma no formato padrão brasileiro. Exemplos: "Lei nº 14.698/2023", "Portaria PRES/INSS nº 1.660/2026", "Resolução CNPS nº 1.369/2023", "Decreto nº 11.936/2024". Inclua o tipo da norma, número e ano.',
                  },
                  summary: {
                    type: 'string',
                    description:
                      'Resumo detalhado da atualização normativa com no mínimo 3 parágrafos. Explique o contexto da norma, o problema que ela resolve, o que ela determina e quais são suas implicações práticas para advogados previdenciários e beneficiários do INSS.',
                  },
                  mainChanges: {
                    type: 'array',
                    items: { type: 'string' },
                    description:
                      'Lista das principais alterações introduzidas. Cada item deve ser uma frase completa e detalhada (mínimo 30 palavras) descrevendo: o que mudou, como era antes, como ficou agora e qual o impacto prático da mudança. Inclua no mínimo 5 itens.',
                  },
                  implementationStatus: {
                    type: 'string',
                    description:
                      'Descrição detalhada do status de implementação da norma. Inclua: se já está em vigor ou aguardando regulamentação, a data de entrada em vigor, prazos de adaptação se houver, e possíveis pendências regulatórias ou infralegais necessárias para plena aplicação.',
                  },
                  beneficiaryImpact: {
                    type: 'string',
                    description:
                      'Análise detalhada do impacto para os beneficiários do RGPS/RPPS, com no mínimo 3 parágrafos. Aborde: quais beneficiários são afetados (aposentados, pensionistas, segurados em atividade, BPC/LOAS etc.), quais direitos ou obrigações mudam na prática, exemplos concretos de como a norma afeta o dia a dia do segurado, e orientações práticas para advogados previdenciários.',
                  },
                  fullText: {
                    type: 'string',
                    minLength: 800,
                    description:
                      'Texto integral ou transcrição completa e fiel da norma. OBRIGATÓRIO ter no mínimo 800 caracteres. Inclua todos os artigos, parágrafos, incisos, alíneas e disposições finais. Se a norma for extensa, inclua ao menos os dispositivos mais relevantes na íntegra, sem resumir ou parafrasear.',
                  },
                  sourceUrl: {
                    type: 'string',
                    description: 'URL da fonte original da norma (ou null)',
                  },
                  publishedAt: {
                    type: 'string',
                    description:
                      'Data de publicação no formato YYYY-MM-DD (ou null se desconhecida)',
                  },
                },
                required: [
                  'title',
                  'summary',
                  'mainChanges',
                  'implementationStatus',
                  'beneficiaryImpact',
                  'fullText',
                ],
              },
            },
          }),
        }),
      );

    if (aiResponse === null) {
      this.logger.warn('AI returned no response for regulatory updates.');
      return [];
    }

    this.logger.log(
      `AI response received (${aiResponse.length} chars). Parsing...`,
    );

    const parsedUpdates = this.parseAiResponse(aiResponse);

    this.logger.log(
      `Parsed ${parsedUpdates.length} update(s) from AI response.`,
    );

    const newUpdates = this.deduplicateAgainstExisting(
      parsedUpdates,
      existingTitlesLower,
    );

    if (newUpdates.length === 0) {
      this.logger.log('No new regulatory updates found after deduplication.');
      return [];
    }

    this.logger.log(
      `Saving ${newUpdates.length} new update(s): ${newUpdates.map((u) => `"${u.title}"`).join(', ')}`,
    );

    const savedEntities = await this.saveNewUpdates(newUpdates);

    this.logger.log(
      `✓ ${savedEntities.length} regulatory update(s) saved successfully.`,
    );

    return savedEntities;
  }

  private async fetchSystemInstruction(): Promise<string | null> {
    const paidResource =
      await this.paymentPlanPaidResourceQueryRepository.findOnePaymentPlanPaidResourceByResourceType(
        PaymentPlanPaidResourceTypeEnum.REGULATORY_UPDATES,
      );

    if (!paidResource) {
      return null;
    }

    const iaConfig =
      await this.paidResourceIaConfigQueryRepository.findOnePaymentPlanPaidResourceIaConfigByPaidResourceId(
        paidResource.id,
      );

    return iaConfig?.prompt ?? null;
  }

  private buildPrompt(
    existingTitlesAndDates: Array<{ title: string; publishedAt: Date | null }>,
    monitoredSources: Array<{ name: string; url: string }>,
  ): string {
    const now = new Date();
    const monthsAgo = new Date(now);
    const numberOfMonths = 6;
    monthsAgo.setMonth(monthsAgo.getMonth() - numberOfMonths);

    const formatDate = (date: Date): string =>
      date.toISOString().split('T')[0] ?? '';

    const currentDate = formatDate(now);
    const startDate = formatDate(monthsAgo);

    const existingJson = JSON.stringify(
      existingTitlesAndDates.map((item) => ({
        title: item.title,
        publishedAt: item.publishedAt ? formatDate(item.publishedAt) : null,
      })),
    );

    const sourcesSection =
      monitoredSources.length > 0
        ? `\nFontes a consultar obrigatoriamente:\n${monitoredSources.map((s) => `- ${s.name}: ${s.url}`).join('\n')}\n`
        : '';

    return `Hoje é ${currentDate}. Você é um especialista em direito previdenciário brasileiro. Busque as atualizações normativas previdenciárias brasileiras publicadas entre ${startDate} e ${currentDate}.${sourcesSection}

Atualizações já registradas no sistema (NÃO repetir estas):
${existingJson}

Retorne APENAS novas atualizações não listadas acima. Se não houver novas atualizações no período, retorne um array vazio.

DIRETRIZES DE QUALIDADE — OBRIGATÓRIO SEGUIR:
1. "summary": mínimo 3 parágrafos, contextualize a norma, explique o problema que ela resolve e suas implicações práticas.
2. "mainChanges": mínimo 5 itens, cada um com frase completa e detalhada (≥ 30 palavras) indicando o que mudou, como era antes e como ficou.
3. "implementationStatus": descreva data de vigência, prazos de adaptação e pendências regulatórias — não use apenas "Em vigor".
4. "beneficiaryImpact": mínimo 3 parágrafos com análise de quais beneficiários são afetados, exemplos concretos e orientações práticas para advogados previdenciários.
5. "fullText": mínimo 800 caracteres, transcreva fielmente todos os artigos, parágrafos, incisos e alíneas da norma sem resumir.`;
  }

  private deduplicateAgainstExisting(
    updates: AiRegulatoryUpdateItemInterface[],
    existingTitlesLower: Set<string>,
  ): AiRegulatoryUpdateItemInterface[] {
    const seen = new Set<string>();

    return updates.filter((update) => {
      const normalizedTitle = update.title.trim().toLowerCase();

      if (
        existingTitlesLower.has(normalizedTitle) ||
        seen.has(normalizedTitle)
      ) {
        this.logger.warn(
          `Skipping duplicate regulatory update: "${update.title}"`,
        );
        return false;
      }

      seen.add(normalizedTitle);
      return true;
    });
  }

  private parseAiResponse(response: string): AiRegulatoryUpdateItemInterface[] {
    try {
      const parsed = JSON.parse(response) as unknown;

      if (!Array.isArray(parsed)) {
        this.logger.warn(
          `AI response is not an array. Received type: ${typeof parsed}`,
        );
        return [];
      }

      const valid = parsed.filter(
        (item): item is AiRegulatoryUpdateItemInterface =>
          typeof item === 'object' &&
          item !== null &&
          typeof (item as AiRegulatoryUpdateItemInterface).title === 'string' &&
          typeof (item as AiRegulatoryUpdateItemInterface).summary === 'string',
      );

      const invalid = parsed.length - valid.length;
      if (invalid > 0) {
        this.logger.warn(
          `Discarded ${invalid} item(s) from AI response due to missing required fields.`,
        );
      }

      return valid;
    } catch {
      const previewLength = 500;
      this.logger.error(
        'Failed to parse AI response as JSON. Raw response (first 500 chars): ' +
          response.substring(0, previewLength),
      );
      return [];
    }
  }

  private async saveNewUpdates(
    updates: AiRegulatoryUpdateItemInterface[],
  ): Promise<RegulatoryUpdateEntity[]> {
    const entities = updates.map(
      (update) =>
        new RegulatoryUpdateEntity({
          title: update.title,
          legalIdentifier: update.legalIdentifier ?? null,
          summary: update.summary,
          mainChanges: update.mainChanges ?? [],
          implementationStatus: update.implementationStatus ?? '',
          beneficiaryImpact: update.beneficiaryImpact ?? '',
          fullText: update.fullText ?? '',
          sourceUrl: update.sourceUrl ?? null,
          publishedAt:
            update.publishedAt !== null && update.publishedAt !== undefined
              ? new Date(update.publishedAt)
              : null,
        }),
    );

    try {
      const transaction = await this.baseTransactionRepositoryGateway.execute(
        entities.map((entity) =>
          this.regulatoryUpdateCommandRepository.createRegulatoryUpdate(entity),
        ),
      );

      await transaction.commit();

      return entities;
    } catch (error) {
      this.logger.error(
        `Failed to save regulatory updates to database: ${String(error)}`,
      );
      throw error;
    }
  }
}
