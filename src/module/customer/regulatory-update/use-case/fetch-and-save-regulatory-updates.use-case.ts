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
    const systemInstruction = await this.fetchSystemInstruction();

    if (systemInstruction === null) {
      this.logger.warn(
        'No system instruction found for REGULATORY_UPDATES. Aborting.',
      );
      return [];
    }

    const activeSources =
      await this.monitoredSourceQueryRepository.listActiveMonitoredSources();

    if (activeSources.length === 0) {
      this.logger.warn(
        'No active monitored source found. Aborting regulatory updates fetch.',
      );
      return [];
    }

    const existingTitlesAndDates =
      await this.regulatoryUpdateQueryRepository.findAllTitlesAndDates();

    const prompt = this.buildPrompt(
      existingTitlesAndDates,
      activeSources.map((s) => ({ name: s.name, url: s.url })),
    );

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
                  summary: {
                    type: 'string',
                    description: 'Resumo objetivo da atualização normativa',
                  },
                  mainChanges: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Lista das principais alterações introduzidas',
                  },
                  implementationStatus: {
                    type: 'string',
                    description:
                      'Status de implementação da norma (ex: em vigor, aguardando regulamentação)',
                  },
                  beneficiaryImpact: {
                    type: 'string',
                    description: 'Impacto para os beneficiários do RGPS/RPPS',
                  },
                  fullText: {
                    type: 'string',
                    description:
                      'Texto integral ou transcição relevante da norma',
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
      this.logger.warn(
        'AI returned no response for regulatory updates.',
      );
      return [];
    }

    const newUpdates = this.parseAiResponse(aiResponse);

    if (newUpdates.length === 0) {
      this.logger.log('No new regulatory updates found.');
      return [];
    }

    const savedEntities = await this.saveNewUpdates(newUpdates);

    this.logger.log(
      `${savedEntities.length} new regulatory update(s) saved.`,
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

    return `Hoje é ${currentDate}. Busque as atualizações normativas previdenciárias brasileiras publicadas entre ${startDate} e ${currentDate}.${sourcesSection}

Atualizações já registradas no sistema (NÃO repetir estas):
${existingJson}

Retorne APENAS novas atualizações não listadas acima. Se não houver novas atualizações no período, retorne um array vazio.`;
  }

  private parseAiResponse(response: string): AiRegulatoryUpdateItemInterface[] {
    try {
      const parsed = JSON.parse(response) as unknown;

      if (!Array.isArray(parsed)) {
        return [];
      }

      return parsed.filter(
        (item): item is AiRegulatoryUpdateItemInterface =>
          typeof item === 'object' &&
          item !== null &&
          typeof (item as AiRegulatoryUpdateItemInterface).title === 'string' &&
          typeof (item as AiRegulatoryUpdateItemInterface).summary === 'string',
      );
    } catch {
      this.logger.error('Failed to parse AI response as JSON.');
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

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      entities.map((entity) =>
        this.regulatoryUpdateCommandRepository.createRegulatoryUpdate(entity),
      ),
    );

    await transaction.commit();

    return entities;
  }
}
