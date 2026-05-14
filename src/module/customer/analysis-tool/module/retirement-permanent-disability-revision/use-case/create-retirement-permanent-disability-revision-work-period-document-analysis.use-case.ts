import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { GenerativeIaResponseMimeTypeEnum } from '@infra/generative-ia/enum/generative-ia-response-mime-type.enum';
import { GenerativeIaGateway } from '@infra/generative-ia/generative-ia.gateway';
import { GenerateResponseInputModel } from '@infra/generative-ia/model/input/generate-response.input.model';
import { ResponseConfigInputModel } from '@infra/generative-ia/model/input/response-config.input.model';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { CreateRetirementPermanentDisabilityRevisionWorkPeriodDocumentAnalysisRequestDto } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/dto/request/create-retirement-permanent-disability-revision-work-period-document-analysis.request.dto';
import { CreateRetirementPermanentDisabilityRevisionWorkPeriodDocumentAnalysisResponseDto } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/dto/response/create-retirement-permanent-disability-revision-work-period-document-analysis.response.dto';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class CreateRetirementPermanentDisabilityRevisionWorkPeriodDocumentAnalysisUseCase {
  protected readonly _type =
    CreateRetirementPermanentDisabilityRevisionWorkPeriodDocumentAnalysisUseCase.name;

  public constructor(
    @Inject(GenerativeIaGateway)
    private readonly generativeIaGateway: GenerativeIaGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(ConsumeOrganizationCreditUseCaseGateway)
    private readonly consumeOrganizationCreditUseCase: ConsumeOrganizationCreditUseCaseGateway,
    @Inject(GetPaymentPlanPaidResourcePromptUseCaseGateway)
    private readonly getPaymentPlanPaidResourcePromptUseCase: GetPaymentPlanPaidResourcePromptUseCaseGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: CreateRetirementPermanentDisabilityRevisionWorkPeriodDocumentAnalysisRequestDto,
  ): Promise<CreateRetirementPermanentDisabilityRevisionWorkPeriodDocumentAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    await Promise.all(
      dto.documents.map(async (d) => {
        const buffer = d.file.base64.decodeToBuffer();

        const fileModel = FileModel.build({
          buffer,
          originalName: d.file.originalFileName,
          size: buffer.length,
          encoding: '7bit',
        });

        await this.fileProcessorGateway.uploadFile(fileModel);
      }),
    );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PERMANENT_DISABILITY_REVISION_WORK_PERIOD_NO_END_DATE_DOCUMENT_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PERMANENT_DISABILITY_REVISION_WORK_PERIOD_NO_END_DATE_DOCUMENT_ANALYSIS,
        organizationMember.id,
      );

    const files: Buffer[] = [];

    dto.documents.forEach((doc) => {
      files.push(Buffer.from(doc.file.base64.toString(), 'base64'));
    });

    const result =
      (await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
        GenerateResponseInputModel.build({
          systemInstruction: promptResponse.prompt,
          promptFiles: files,
          responseConfig: ResponseConfigInputModel.build({
            responseMimeType: GenerativeIaResponseMimeTypeEnum.APPLICATION_JSON,
            jsonSchema: {
              type: 'object',
              properties: {
                tempoContribuicao: {
                  type: 'string',
                  description:
                    'Tempo de contribuição reconhecido. Ex. 2 anos e 3 meses e 20 dias.',
                },
                observacaoTecnica: {
                  type: 'string',
                  description:
                    'Observações técnicas sobre a análise realizada com todos os detalhes.',
                },
                dataFinalDoVinculo: {
                  type: 'string',
                  description:
                    'Data final do vínculo trabalhista que foi analisado. Formato DD/MM/AAAA. Se não for possível determinar, retorne uma string vazia.',
                },
              },
              required: [
                'tempoContribuicao',
                'observacaoTecnica',
                'dataFinalDoVinculo',
              ],
            },
          }),
        }),
      )) ?? '';

    const transactionCredit =
      await this.baseTransactionRepositoryGateway.execute([
        consumeCreditTransaction,
      ]);

    await transactionCredit.commit();

    return CreateRetirementPermanentDisabilityRevisionWorkPeriodDocumentAnalysisResponseDto.build({
      result,
    });
  }
}
