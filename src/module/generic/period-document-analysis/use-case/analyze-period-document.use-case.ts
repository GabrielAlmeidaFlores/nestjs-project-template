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

interface AnalyzePeriodDocumentAiResult {
  observacaoTecnica: string;
  dataFim?: string;
}

@Injectable()
export class AnalyzePeriodDocumentUseCase {
  protected readonly _type = AnalyzePeriodDocumentUseCase.name;

  private readonly resourceType =
    PaymentPlanPaidResourceTypeEnum.PERIOD_NO_END_DATE_DOCUMENT_ANALYSIS;

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
  ) {}

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
      ...(result.dataFim != null &&
        result.dataFim !== '' && { endDate: result.dataFim }),
    });
  }

  private buildJsonSchema(): object {
    return {
      type: 'object',
      properties: {
        observacaoTecnica: {
          type: 'string',
          description:
            'Observação técnica sobre o período analisado, em formato markdown, com todos os detalhes relevantes.',
        },
        dataFim: {
          type: 'string',
          description:
            'Data de fim do período sugerida com base nos documentos analisados, formato YYYY-MM-DD. Retorne string vazia se não for possível determinar.',
        },
      },
      required: ['observacaoTecnica', 'dataFim'],
    };
  }

  private parseResult(rawResult: string): AnalyzePeriodDocumentAiResult {
    let cleaned = rawResult.trim();

    if (cleaned.startsWith('```')) {
      cleaned = cleaned
        .replace(/^```(?:json)?\n?/, '')
        .replace(/\n?```$/, '')
        .trim();
    }

    const parsed = JSON.parse(cleaned) as AnalyzePeriodDocumentAiResult;
    return parsed;
  }
}
