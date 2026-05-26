import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { GenerativeIaResponseMimeTypeEnum } from '@infra/generative-ia/enum/generative-ia-response-mime-type.enum';
import { GenerativeIaGateway } from '@infra/generative-ia/generative-ia.gateway';
import { GenerateResponseInputModel } from '@infra/generative-ia/model/input/generate-response.input.model';
import { ResponseConfigInputModel } from '@infra/generative-ia/model/input/response-config.input.model';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { AnalyzePeriodDocumentRequestDto } from '@module/generic/period-document-analysis/dto/request/analyze-period-document.request.dto';
import { AnalyzePeriodDocumentResponseDto } from '@module/generic/period-document-analysis/dto/response/analyze-period-document.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

interface AnalyzePeriodDocumentAiResultInterface {
  observacaoTecnica: string;
  dataFim?: string;
  tempoContribuicao?: string;
}

@Injectable()
export class AnalyzePeriodDocumentUseCase {
  protected readonly _type = AnalyzePeriodDocumentUseCase.name;

  private readonly resourceType: PaymentPlanPaidResourceTypeEnum;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(GenerativeIaGateway)
    private readonly generativeIaGateway: GenerativeIaGateway,
    @Inject(GetPaymentPlanPaidResourcePromptUseCaseGateway)
    private readonly getPaymentPlanPaidResourcePromptUseCase: GetPaymentPlanPaidResourcePromptUseCaseGateway,
    @Inject(ConsumeOrganizationCreditUseCaseGateway)
    private readonly consumeOrganizationCreditUseCase: ConsumeOrganizationCreditUseCaseGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {
    this.resourceType =
      PaymentPlanPaidResourceTypeEnum.PERIOD_NO_END_DATE_DOCUMENT_ANALYSIS;
  }

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: AnalyzePeriodDocumentRequestDto,
  ): Promise<AnalyzePeriodDocumentResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        this.resourceType,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        this.resourceType,
        organizationMember.id,
      );

    const fileBuffer = dto.file.base64.decodeToBuffer();

    const rawResult =
      await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
        GenerateResponseInputModel.build({
          systemInstruction: promptResponse.prompt,
          promptFiles: [fileBuffer],
          responseConfig: ResponseConfigInputModel.build({
            responseMimeType: GenerativeIaResponseMimeTypeEnum.APPLICATION_JSON,
            jsonSchema: this.buildJsonSchema(),
          }),
        }),
      );

    const result = this.parseResult(rawResult ?? '{}');

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      consumeCreditTransaction,
    );
    await transaction.commit();

    return AnalyzePeriodDocumentResponseDto.build({
      technicalObservation: result.observacaoTecnica,
      ...(result.dataFim !== undefined &&
        result.dataFim !== '' && { endDate: result.dataFim }),
      ...(result.tempoContribuicao !== undefined &&
        result.tempoContribuicao !== '' && {
          contributionTime: result.tempoContribuicao,
        }),
    });
  }

  private buildJsonSchema(): object {
    return {
      type: 'object',
      properties: {
        observacaoTecnica: {
          type: 'string',
          description:
            'Observação técnica em MARKDOWN estruturado. OBRIGATÓRIO conter: (1) seção "## Identificação do Vínculo em Aberto" com empresa, trabalhador e data de início; (2) seção "## Provas Analisadas" com lista "- " dos documentos e sua força probatória; (3) seção "## Conclusão sobre Data Fim" com a data provável de desligamento e fundamento; (4) seção "## Como Regularizar" com lista numerada de providências; (5) seção "## Riscos e Observações" com alertas em **negrito** para os pontos críticos. Use "**...**" para destacar datas, nomes e pontos críticos.',
        },
        dataFim: {
          type: 'string',
          description:
            'Data de fim do período sugerida com base nos documentos analisados, formato YYYY-MM-DD. Retorne string vazia se não for possível determinar.',
        },
        tempoContribuicao: {
          type: 'string',
          description:
            'Tempo de contribuição ganho no período analisado, calculado da data de início até a data fim sugerida. Formato "X anos, Y meses e Z dias" (ex: "1 ano, 1 mês e 1 dia"). Retorne string vazia se a data fim não puder ser determinada.',
        },
      },
      required: ['observacaoTecnica', 'dataFim', 'tempoContribuicao'],
    };
  }

  private parseResult(
    rawResult: string,
  ): AnalyzePeriodDocumentAiResultInterface {
    let cleaned = rawResult.trim();

    if (cleaned.startsWith('```')) {
      cleaned = cleaned
        .replace(/^```(?:json)?\n?/, '')
        .replace(/\n?```$/, '')
        .trim();
    }

    const parsed = JSON.parse(
      cleaned,
    ) as AnalyzePeriodDocumentAiResultInterface;
    return parsed;
  }
}
