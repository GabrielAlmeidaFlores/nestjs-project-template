import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { BpcDisabilityTerminationQueryRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination/query/bpc-disability-termination.query.repository.gateway';
import { BpcDisabilityTerminationResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination-result/command/bpc-disability-termination-result.command.repository.gateway';
import { BpcDisabilityTerminationId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/value-object/bpc-disability-termination-id/bpc-disability-termination-id.value-object';
import { BpcDisabilityTerminationDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-document/enum/bpc-disability-termination-document-type.enum';
import { BpcDisabilityTerminationResultEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-result/bpc-disability-termination-result.entity';
import { CreateBpcDisabilityTerminationInssDecisionAnalysisResponseDto } from '@module/customer/analysis-tool/module/bpc-disability-termination/dto/response/create-bpc-disability-termination-inss-decision-analysis.response.dto';
import { BpcDisabilityTerminationAdministrativeProcedureNotPresentError } from '@module/customer/analysis-tool/module/bpc-disability-termination/error/bpc-disability-termination-administrative-procedure-not-present.error';
import { BpcDisabilityTerminationNotFoundError } from '@module/customer/analysis-tool/module/bpc-disability-termination/error/bpc-disability-termination-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateBpcDisabilityTerminationInssDecisionAnalysisUseCase {
  protected readonly _type =
    CreateBpcDisabilityTerminationInssDecisionAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(BpcDisabilityTerminationQueryRepositoryGateway)
    private readonly bpcDisabilityTerminationQueryRepositoryGateway: BpcDisabilityTerminationQueryRepositoryGateway,
    @Inject(BpcDisabilityTerminationResultCommandRepositoryGateway)
    private readonly bpcDisabilityTerminationResultCommandRepositoryGateway: BpcDisabilityTerminationResultCommandRepositoryGateway,
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
    bpcDisabilityTerminationId: BpcDisabilityTerminationId,
  ): Promise<CreateBpcDisabilityTerminationInssDecisionAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByBpcDisabilityTerminationIdAndOrganizationIdAndAuthIdentityIdOrFail(
      bpcDisabilityTerminationId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      BpcDisabilityTerminationNotFoundError,
    );

    const bpcDisabilityTermination =
      await this.bpcDisabilityTerminationQueryRepositoryGateway.findOneByBpcDisabilityTerminationIdAndOrganizationIdOrFail(
        bpcDisabilityTerminationId,
        organizationSessionData.organizationId,
        BpcDisabilityTerminationNotFoundError,
      );

    const administrativeProcedureDocuments =
      bpcDisabilityTermination.bpcDisabilityTerminationDocument.filter(
        (document) =>
          document.type ===
            BpcDisabilityTerminationDocumentTypeEnum.ADMINISTRATIVE_PROCEDURE_DENIAL ||
          document.type ===
            BpcDisabilityTerminationDocumentTypeEnum.ADMINISTRATIVE_PROCEDURE_SUSPENSION,
      );

    if (administrativeProcedureDocuments.length === 0) {
      throw new BpcDisabilityTerminationAdministrativeProcedureNotPresentError();
    }

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.BPC_DISABILITY_TERMINATION_INSS_DECISION_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.BPC_DISABILITY_TERMINATION_INSS_DECISION_ANALYSIS,
        organizationMember.id,
      );

    const documentBuffers = await Promise.all(
      administrativeProcedureDocuments.map((document) =>
        this.fileProcessorGateway.getFileBuffer(document.document),
      ),
    );

    const inssDecisionAnalysis =
      await this.analysisProcessorGateway.getBpcDisabilityTerminationInssDecisionAnalysis(
        promptResponse.prompt,
        documentBuffers,
      );

    const existingResult =
      bpcDisabilityTermination.bpcDisabilityTerminationResult;
    const resultEntity = new BpcDisabilityTerminationResultEntity({
      ...(existingResult !== null && { id: existingResult.id }),
      inssDecisionAnalysis: inssDecisionAnalysis ?? '',
      completeAnalysis: existingResult?.completeAnalysis ?? null,
      completeAnalysisDownload:
        existingResult?.completeAnalysisDownload ?? null,
      simplifiedAnalysis: existingResult?.simplifiedAnalysis ?? null,
    });

    const resultTransaction =
      existingResult !== null
        ? this.bpcDisabilityTerminationResultCommandRepositoryGateway.updateBpcDisabilityTerminationResult(
            existingResult.id,
            resultEntity,
          )
        : this.bpcDisabilityTerminationResultCommandRepositoryGateway.createBpcDisabilityTerminationResult(
            resultEntity,
            bpcDisabilityTerminationId,
          );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      consumeCreditTransaction,
      resultTransaction,
    ]);

    await transaction.commit();

    return CreateBpcDisabilityTerminationInssDecisionAnalysisResponseDto.build({
      inssDecisionAnalysis: inssDecisionAnalysis ?? '',
    });
  }
}
