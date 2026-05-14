import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { ElderlyBpcRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/repository/elderly-bpc-rejection/query/elderly-bpc-rejection.query.repository.gateway';
import { ElderlyBpcRejectionResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/repository/elderly-bpc-rejection-result/command/elderly-bpc-rejection-result.command.repository.gateway';
import { ElderlyBpcRejectionId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection/value-object/elderly-bpc-rejection-id/elderly-bpc-rejection-id.value-object';
import { ElderlyBpcRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-document/enum/elderly-bpc-rejection-document-type.enum';
import { ElderlyBpcRejectionResultEntity } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-result/elderly-bpc-rejection-result.entity';
import { CreateElderlyBpcRejectionInssDecisionAnalysisResponseDto } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/dto/response/create-elderly-bpc-rejection-inss-decision-analysis.response.dto';
import { ElderlyBpcRejectionAdministrativeProceedingsNotPresentError } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/error/elderly-bpc-rejection-administrative-proceedings-not-present.error';
import { ElderlyBpcRejectionNotFoundError } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/error/elderly-bpc-rejection-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateElderlyBpcRejectionInssDecisionAnalysisUseCase {
  protected readonly _type =
    CreateElderlyBpcRejectionInssDecisionAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(ElderlyBpcRejectionQueryRepositoryGateway)
    private readonly elderlyBpcRejectionQueryRepositoryGateway: ElderlyBpcRejectionQueryRepositoryGateway,
    @Inject(ElderlyBpcRejectionResultCommandRepositoryGateway)
    private readonly elderlyBpcRejectionResultCommandRepositoryGateway: ElderlyBpcRejectionResultCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
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
    elderlyBpcRejectionId: ElderlyBpcRejectionId,
  ): Promise<CreateElderlyBpcRejectionInssDecisionAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByElderlyBpcRejectionIdAndOrganizationIdAndAuthIdentityIdOrFail(
      elderlyBpcRejectionId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      ElderlyBpcRejectionNotFoundError,
    );

    const elderlyBpcRejection =
      await this.elderlyBpcRejectionQueryRepositoryGateway.findOneByElderlyBpcRejectionIdOrFailWithRelations(
        elderlyBpcRejectionId,
        ElderlyBpcRejectionNotFoundError,
      );

    const administrativeProceedingsDocuments = (
      elderlyBpcRejection.elderlyBpcRejectionDocument ?? []
    ).filter(
      (document) =>
        document.type ===
          ElderlyBpcRejectionDocumentTypeEnum.ADMINISTRATIVE_PROCEEDINGS &&
        document.document !== null,
    );

    if (administrativeProceedingsDocuments.length === 0) {
      throw new ElderlyBpcRejectionAdministrativeProceedingsNotPresentError();
    }

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.ELDERLY_BPC_REJECTION_INSS_DECISION_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.ELDERLY_BPC_REJECTION_INSS_DECISION_ANALYSIS,
        organizationMember.id,
      );

    const [administrativeProceedingsBuffer, rejectionDataBuffer] =
      await Promise.all([
        Promise.all(
          administrativeProceedingsDocuments.map((document) =>
            this.fileProcessorGateway.getFileBuffer(
              document.document as string,
            ),
          ),
        ),
        this.buildRejectionDataBuffer(elderlyBpcRejection),
      ]);

    const inssDecisionAnalysis =
      await this.analysisProcessorGateway.getElderlyBpcRejectionInssDecisionAnalysis(
        promptResponse.prompt,
        [rejectionDataBuffer, ...administrativeProceedingsBuffer],
      );

    const existingResult = elderlyBpcRejection.elderlyBpcRejectionResult;
    const resultEntity = new ElderlyBpcRejectionResultEntity({
      ...(existingResult !== null && { id: existingResult.id }),
      inssDecisionAnalysis: inssDecisionAnalysis ?? '',
      completeAnalysis: existingResult?.completeAnalysis ?? null,
      simplifiedAnalysis: existingResult?.simplifiedAnalysis ?? null,
      elderlyBpcRejectionId,
    });

    const resultTransaction =
      existingResult !== null
        ? this.elderlyBpcRejectionResultCommandRepositoryGateway.updateElderlyBpcRejectionResult(
            resultEntity,
          )
        : this.elderlyBpcRejectionResultCommandRepositoryGateway.createElderlyBpcRejectionResult(
            resultEntity,
          );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      consumeCreditTransaction,
      resultTransaction,
    ]);

    await transaction.commit();

    return CreateElderlyBpcRejectionInssDecisionAnalysisResponseDto.build({
      inssDecisionAnalysis: inssDecisionAnalysis ?? '',
    });
  }

  private buildRejectionDataBuffer(
    elderlyBpcRejection: Awaited<
      ReturnType<
        typeof this.elderlyBpcRejectionQueryRepositoryGateway.findOneByElderlyBpcRejectionIdOrFailWithRelations
      >
    >,
  ): Promise<Buffer> {
    const rejectionData = {
      analysisName: elderlyBpcRejection.analysisName,
      category: elderlyBpcRejection.category,
      maritalStatus: elderlyBpcRejection.maritalStatus,
      applicantLivesAlone: elderlyBpcRejection.applicantLivesAlone,
      inssBenefits: (elderlyBpcRejection.elderlyBpcRejectionInssBenefit ?? [])
        .map((item) => item.inssBenefit)
        .filter((value) => value !== null),
      legalProceedings: (
        elderlyBpcRejection.elderlyBpcRejectionLegalProceeding ?? []
      )
        .map((item) => item.legalProceedingNumber)
        .filter((value) => value !== null),
      familiarGroups: (
        elderlyBpcRejection.elderlyBpcRejectionFamiliarGroup ?? []
      ).map((group) => ({
        fullName: group.fullName,
        birthDate: group.birthDate,
        kinship: group.kinship,
        livesInSameResidence: group.livesInSameResidence,
        hasIncome: group.hasIncome,
        monthlyIncome: group.monthlyIncome,
        incomeType: group.incomeType,
        hasSupportingDocuments: group.hasSupportingDocuments,
      })),
      currentResult: {
        inssDecisionAnalysis:
          elderlyBpcRejection.elderlyBpcRejectionResult?.inssDecisionAnalysis ??
          null,
        completeAnalysis:
          elderlyBpcRejection.elderlyBpcRejectionResult?.completeAnalysis ??
          null,
        simplifiedAnalysis:
          elderlyBpcRejection.elderlyBpcRejectionResult?.simplifiedAnalysis ??
          null,
      },
    };

    return Promise.resolve(
      Buffer.from(JSON.stringify(rejectionData, null, 2), 'utf-8'),
    );
  }
}
