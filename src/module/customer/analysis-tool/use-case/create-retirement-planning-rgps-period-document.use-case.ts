import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { GenerativeIaGateway } from '@infra/generative-ia/generative-ia.gateway';
import { GenerateResponseInputModel } from '@infra/generative-ia/model/input/generate-response.input.model';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { RetirementPlanningRgpsPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-period-document/command/retirement-planning-rgps-period-document.repository.gateway';
import { RetirementPlanningRgpsPeriodEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-period/retirement-planning-rgps-period.entity';
import { RetirementPlanningRgpsPeriodDocumentEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-period-document/retirement-planning-rgps-period-document.entity';
import { CreateRetirementPlanningRgpsPeriodDocumentRequestDto } from '@module/customer/analysis-tool/dto/request/create-retirement-planning-rgps-period-document.request.dto';
import { CreateRetirementPlanningRgpsPeriodDocumentResponseDto } from '@module/customer/analysis-tool/dto/response/create-retirement-planning-rgps-period-document.response.dto';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateRetirementPlanningRgpsPeriodDocumentUseCase {
  protected readonly _type =
    CreateRetirementPlanningRgpsPeriodDocumentUseCase.name;

  public constructor(
    @Inject(GenerativeIaGateway)
    private readonly generativeIaGateway: GenerativeIaGateway,
    @Inject(RetirementPlanningRgpsPeriodDocumentCommandRepositoryGateway)
    private readonly retirementPlanningRgpsPeriodDocumentCommandRepositoryGateway: RetirementPlanningRgpsPeriodDocumentCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(ConsumeOrganizationCreditUseCaseGateway)
    private readonly consumeOrganizationCreditUseCase: ConsumeOrganizationCreditUseCaseGateway,
    @Inject(GetPaymentPlanPaidResourcePromptUseCaseGateway)
    private readonly getPaymentPlanPaidResourcePromptUseCase: GetPaymentPlanPaidResourcePromptUseCaseGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: CreateRetirementPlanningRgpsPeriodDocumentRequestDto,
  ): Promise<CreateRetirementPlanningRgpsPeriodDocumentResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const period = new RetirementPlanningRgpsPeriodEntity({
      id: dto.json.retirementPlanningRgpsPeriodId,
    });

    const documents = dto.documents.map(
      (d) =>
        new RetirementPlanningRgpsPeriodDocumentEntity({
          document: d.file.toString(),
          retirementPlanningRgpsPeriod: period,
        }),
    );

    const transactions = documents.map((doc) =>
      this.retirementPlanningRgpsPeriodDocumentCommandRepositoryGateway.createRetirementPlanningRgpsPeriodDocument(
        doc,
      ),
    );

    if (transactions.length > 0) {
      const tx =
        await this.baseTransactionRepositoryGateway.execute(transactions);
      await tx.commit();
    }

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PLANNING_RGPS_NO_END_DATE_DOCUMENTS_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PLANNING_RGPS_NO_END_DATE_DOCUMENTS_ANALYSIS,
        organizationMember.id,
      );

    const files: Buffer[] = [];

    dto.documents.forEach((doc) => {
      files.push(Buffer.from(doc.file.toString(), 'base64'));
    });

    const result =
      (await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
        GenerateResponseInputModel.build({
          systemInstruction: promptResponse.prompt,
          promptFiles: files,
          responseJsonSchema: {
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
      )) ?? '';

    const transactionCredit =
      await this.baseTransactionRepositoryGateway.execute([
        consumeCreditTransaction,
      ]);

    await transactionCredit.commit();

    return CreateRetirementPlanningRgpsPeriodDocumentResponseDto.build({
      result,
    });
  }
}
