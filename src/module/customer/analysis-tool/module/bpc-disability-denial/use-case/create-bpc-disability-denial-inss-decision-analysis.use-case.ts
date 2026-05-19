import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { BpcDisabilityDenialQueryRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/repository/bpc-disability-denial/query/bpc-disability-denial.query.repository.gateway';
import { BpcDisabilityDenialResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/repository/bpc-disability-denial-result/command/bpc-disability-denial-result.command.repository.gateway';
import { BpcDisabilityDenialId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial/value-object/bpc-disability-denial-id/bpc-disability-denial-id.value-object';
import { BpcDisabilityDenialDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-document/enum/bpc-disability-denial-document-type.enum';
import { BpcDisabilityDenialResultEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-result/bpc-disability-denial-result.entity';
import { CreateBpcDisabilityDenialInssDecisionAnalysisResponseDto } from '@module/customer/analysis-tool/module/bpc-disability-denial/dto/response/create-bpc-disability-denial-inss-decision-analysis.response.dto';
import { BpcDisabilityDenialAdministrativeProcedureNotPresentError } from '@module/customer/analysis-tool/module/bpc-disability-denial/error/bpc-disability-denial-administrative-procedure-not-present.error';
import { BpcDisabilityDenialNotFoundError } from '@module/customer/analysis-tool/module/bpc-disability-denial/error/bpc-disability-denial-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateBpcDisabilityDenialInssDecisionAnalysisUseCase {
  protected readonly _type =
    CreateBpcDisabilityDenialInssDecisionAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(BpcDisabilityDenialQueryRepositoryGateway)
    private readonly bpcDisabilityDenialQueryRepositoryGateway: BpcDisabilityDenialQueryRepositoryGateway,
    @Inject(BpcDisabilityDenialResultCommandRepositoryGateway)
    private readonly bpcDisabilityDenialResultCommandRepositoryGateway: BpcDisabilityDenialResultCommandRepositoryGateway,
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
    bpcDisabilityDenialId: BpcDisabilityDenialId,
  ): Promise<CreateBpcDisabilityDenialInssDecisionAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByBpcDisabilityDenialIdAndOrganizationIdAndAuthIdentityIdOrFail(
      bpcDisabilityDenialId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      BpcDisabilityDenialNotFoundError,
    );

    const bpcDisabilityDenial =
      await this.bpcDisabilityDenialQueryRepositoryGateway.findOneByBpcDisabilityDenialIdAndOrganizationIdOrFail(
        bpcDisabilityDenialId,
        organizationSessionData.organizationId,
        BpcDisabilityDenialNotFoundError,
      );

    const administrativeProcedureDocuments =
      bpcDisabilityDenial.bpcDisabilityDenialDocument.filter(
        (document) =>
          document.type ===
          BpcDisabilityDenialDocumentTypeEnum.ADMINISTRATIVE_PROCEDURE,
      );

    if (administrativeProcedureDocuments.length === 0) {
      throw new BpcDisabilityDenialAdministrativeProcedureNotPresentError();
    }

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.BPC_DISABILITY_DENIAL_INSS_DECISION_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.BPC_DISABILITY_DENIAL_INSS_DECISION_ANALYSIS,
        organizationMember.id,
      );

    const documentBuffers = await Promise.all(
      administrativeProcedureDocuments.map((document) =>
        this.fileProcessorGateway.getFileBuffer(document.document),
      ),
    );

    const inssDecisionAnalysis =
      await this.analysisProcessorGateway.getBpcDisabilityDenialInssDecisionAnalysis(
        promptResponse.prompt,
        documentBuffers,
      );

    const existingResult = bpcDisabilityDenial.bpcDisabilityDenialResult;
    const resultEntity = new BpcDisabilityDenialResultEntity({
      ...(existingResult !== null && { id: existingResult.id }),
      inssDecisionAnalysis: inssDecisionAnalysis ?? '',
      firstAnalysis: existingResult?.firstAnalysis ?? null,
      completeAnalysis: existingResult?.completeAnalysis ?? null,
      completeAnalysisDownload:
        existingResult?.completeAnalysisDownload ?? null,
      simplifiedAnalysis: existingResult?.simplifiedAnalysis ?? null,
      applicableRules: existingResult?.applicableRules ?? null,
      benefitSummaries: existingResult?.benefitSummaries ?? null,
      analysisDetailedText: existingResult?.analysisDetailedText ?? null,
    });

    const resultTransaction =
      existingResult !== null
        ? this.bpcDisabilityDenialResultCommandRepositoryGateway.updateBpcDisabilityDenialResult(
            existingResult.id,
            resultEntity,
          )
        : this.bpcDisabilityDenialResultCommandRepositoryGateway.createBpcDisabilityDenialResult(
            resultEntity,
            bpcDisabilityDenialId,
          );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      consumeCreditTransaction,
      resultTransaction,
    ]);

    await transaction.commit();

    return CreateBpcDisabilityDenialInssDecisionAnalysisResponseDto.build({
      inssDecisionAnalysis: inssDecisionAnalysis ?? '',
    });
  }
}
