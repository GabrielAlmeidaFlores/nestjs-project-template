import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisActivityTrackerGateway } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/analysis-activity-tracker.gateway';
import { AnalysisActivityActionEnum } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/enum/analysis-activity-action.enum';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { AccidentAssistanceTerminatedCommandRepositoryGateway } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated/command/accident-assistance-terminated.command.repository.gateway';
import { AccidentAssistanceTerminatedResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated-result/command/accident-assistance-terminated-result.command.repository.gateway';
import { AccidentAssistanceTerminatedEntity } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated/accident-assistance-terminated.entity';
import { AccidentAssistanceTerminatedId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated/value-object/accident-assistance-terminated-id/accident-assistance-terminated-id.value-object';
import { AccidentAssistanceTerminatedResultEntity } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-result/accident-assistance-terminated-result.entity';
import { CreateAccidentAssistanceTerminatedResultResponseDto } from '@module/customer/analysis-tool/module/accident-assistance-terminated/dto/response/create-accident-assistance-terminated-result.response.dto';
import { AccidentAssistanceTerminatedDocumentRequiredError } from '@module/customer/analysis-tool/module/accident-assistance-terminated/error/accident-assistance-terminated-document-required.error';
import { AccidentAssistanceTerminatedNotFoundError } from '@module/customer/analysis-tool/module/accident-assistance-terminated/error/accident-assistance-terminated-not-found.error';
import { AccidentAssistanceTerminatedResultAlreadyExistsError } from '@module/customer/analysis-tool/module/accident-assistance-terminated/error/accident-assistance-terminated-result-already-exists.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateAccidentAssistanceTerminatedResultUseCase {
  protected readonly _type =
    CreateAccidentAssistanceTerminatedResultUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AccidentAssistanceTerminatedCommandRepositoryGateway)
    private readonly accidentAssistanceTerminatedCommandRepositoryGateway: AccidentAssistanceTerminatedCommandRepositoryGateway,
    @Inject(AccidentAssistanceTerminatedResultCommandRepositoryGateway)
    private readonly accidentAssistanceTerminatedResultCommandRepositoryGateway: AccidentAssistanceTerminatedResultCommandRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(ConsumeOrganizationCreditUseCaseGateway)
    private readonly consumeOrganizationCreditUseCase: ConsumeOrganizationCreditUseCaseGateway,
    @Inject(GetPaymentPlanPaidResourcePromptUseCaseGateway)
    private readonly getPaymentPlanPaidResourcePromptUseCase: GetPaymentPlanPaidResourcePromptUseCaseGateway,
    @Inject(AnalysisActivityTrackerGateway)
    private readonly analysisActivityTrackerGateway: AnalysisActivityTrackerGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    accidentAssistanceTerminatedId: AccidentAssistanceTerminatedId,
  ): Promise<CreateAccidentAssistanceTerminatedResultResponseDto> {
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
        PaymentPlanPaidResourceTypeEnum.ACCIDENT_ASSISTANCE_TERMINATED_COMPLETE_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.ACCIDENT_ASSISTANCE_TERMINATED_COMPLETE_ANALYSIS,
        organizationMember.id,
      );

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByAccidentAssistanceTerminatedIdAndOrganizationIdAndAuthIdentityIdOrFail(
        accidentAssistanceTerminatedId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        AccidentAssistanceTerminatedNotFoundError,
      );

    const accidentAssistanceTerminatedQueryResult =
      analysisToolRecordQueryResult.accidentAssistanceTerminated;

    if (accidentAssistanceTerminatedQueryResult === null) {
      throw new AccidentAssistanceTerminatedNotFoundError();
    }

    if (
      accidentAssistanceTerminatedQueryResult.accidentAssistanceTerminatedResult !==
      null
    ) {
      throw new AccidentAssistanceTerminatedResultAlreadyExistsError();
    }

    if (
      accidentAssistanceTerminatedQueryResult
        .accidentAssistanceTerminatedDocument.length === 0
    ) {
      throw new AccidentAssistanceTerminatedDocumentRequiredError();
    }

    const clientDataBuffer = Buffer.from(
      JSON.stringify(analysisToolRecordQueryResult.analysisToolClient, null, 2),
      'utf-8',
    );

    const documentBuffers = await Promise.all(
      accidentAssistanceTerminatedQueryResult.accidentAssistanceTerminatedDocument.map(
        async (document) => {
          return await this.fileProcessorGateway.getFileBuffer(
            document.document,
          );
        },
      ),
    );

    const completeAnalysis =
      await this.analysisProcessorGateway.getAccidentAssistanceTerminatedCompleteAnalysis(
        promptResponse.prompt,
        [...documentBuffers, clientDataBuffer],
      );

    const clientName =
      analysisToolRecordQueryResult.analysisToolClient.name ?? null;

    const accidentAssistanceTerminatedResult =
      new AccidentAssistanceTerminatedResultEntity({
        accidentAssistanceTerminatedCompleteAnalysis: completeAnalysis,
      });

    const accidentAssistanceTerminated = new AccidentAssistanceTerminatedEntity(
      {
        id: accidentAssistanceTerminatedQueryResult.id,
        der: accidentAssistanceTerminatedQueryResult.der,
        denialDate: accidentAssistanceTerminatedQueryResult.denialDate,
        category: accidentAssistanceTerminatedQueryResult.category,
        inssPassword: accidentAssistanceTerminatedQueryResult.inssPassword,
        analysisName: accidentAssistanceTerminatedQueryResult.analysisName,
        benefitCessationReason:
          accidentAssistanceTerminatedQueryResult.benefitCessationReason,
        hadPreviousIncapacityBenefit:
          accidentAssistanceTerminatedQueryResult.hadPreviousIncapacityBenefit,
        previousIncapacityBenefitNumber:
          accidentAssistanceTerminatedQueryResult.previousIncapacityBenefitNumber,
        previousIncapacityBenefitStartDate:
          accidentAssistanceTerminatedQueryResult.previousIncapacityBenefitStartDate,
        previousIncapacityBenefitEndDate:
          accidentAssistanceTerminatedQueryResult.previousIncapacityBenefitEndDate,
        extensionRequestStatus:
          accidentAssistanceTerminatedQueryResult.extensionRequestStatus,
        accidentAssistanceTerminatedResult,
        createdBy: analysisToolRecordQueryResult.createdBy.id,
        updatedBy: organizationMember.id,
      },
    );

    const analysisToolClient = new AnalysisToolClientEntity({
      ...analysisToolRecordQueryResult.analysisToolClient,
      createdBy: analysisToolRecordQueryResult.analysisToolClient.createdBy.id,
      updatedBy: analysisToolRecordQueryResult.analysisToolClient.updatedBy.id,
    });

    const analysisToolRecord = new AnalysisToolRecordEntity({
      id: analysisToolRecordQueryResult.id,
      code: analysisToolRecordQueryResult.code,
      type: analysisToolRecordQueryResult.type,
      status: AnalysisStatusEnum.COMPLETED,
      analysisToolClient,
      accidentAssistanceTerminated,
      createdBy: analysisToolRecordQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
    });

    const updateAnalysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecord(
        analysisToolRecord.id,
        analysisToolRecord,
      );

    const createResultTransaction =
      this.accidentAssistanceTerminatedResultCommandRepositoryGateway.createAccidentAssistanceTerminatedResult(
        accidentAssistanceTerminatedId,
        accidentAssistanceTerminatedResult,
      );

    const updateAccidentAssistanceTerminatedTransaction =
      this.accidentAssistanceTerminatedCommandRepositoryGateway.updateAccidentAssistanceTerminated(
        accidentAssistanceTerminated.id,
        accidentAssistanceTerminated,
      );

    const transactionsWithActivity =
      this.analysisActivityTrackerGateway.appendActivityTransaction({
        action: AnalysisActivityActionEnum.RESULT_ADDED,
        analysisType: AnalysisToolRecordTypeEnum.ACCIDENT_ASSISTANCE_TERMINATED,
        organizationMemberId: organizationMember.id,
        analysisToolClientId: analysisToolClient.id,
        analysisToolRecordId: analysisToolRecord.id,
        transactions: [
          consumeCreditTransaction,
          createResultTransaction,
          updateAccidentAssistanceTerminatedTransaction,
          updateAnalysisToolRecordTransaction,
        ],
      });

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionsWithActivity,
    );
    await transaction.commit();

    return CreateAccidentAssistanceTerminatedResultResponseDto.build({
      clientName,
      accidentAssistanceTerminatedCompleteAnalysis:
        accidentAssistanceTerminatedResult.accidentAssistanceTerminatedCompleteAnalysis,
    });
  }
}
