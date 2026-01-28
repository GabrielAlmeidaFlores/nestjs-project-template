import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { AdministrativeProcedureInssAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/repository/administrative-procedure-inss-analysis/command/administrative-procedure-inss-analysis.command.repository.gateway';
import { AdministrativeProcedureInssAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/repository/administrative-procedure-inss-analysis-result/command/administrative-procedure-inss-analysis-result.command.repository.gateway';
import { AdministrativeProcedureInssAnalysisEntity } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis/administrative-procedure-inss-analysis.entity';
import { AdministrativeProcedureInssAnalysisId } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis/value-object/administrative-procedure-inss-analysis-id/administrative-procedure-inss-analysis-id.value-object';
import { AdministrativeProcedureInssAnalysisResultEntity } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis-result/administrative-procedure-inss-analysis-result.entity';
import { CreateAdministrativeProcedureInssAnalysisResultResponseDto } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/dto/response/create-administrative-procedure-inss-analysis-result.response.dto';
import { AdministrativeProcedureDocumentRequiredError } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/error/administrative-procedure-document-required.error';
import { AdministrativeProcedureInssAnalysisNotFoundError } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/error/administrative-procedure-inss-analysis-not-found.error';
import { AdministrativeProcedureInssAnalysisResultAlreadyExistsError } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/error/administrative-procedure-inss-analysis-result-already-exists.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateAdministrativeProcedureInssAnalysisResultUseCase {
  protected readonly _type =
    CreateAdministrativeProcedureInssAnalysisResultUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AdministrativeProcedureInssAnalysisCommandRepositoryGateway)
    private readonly administrativeProcedureInssAnalysisCommandRepositoryGateway: AdministrativeProcedureInssAnalysisCommandRepositoryGateway,
    @Inject(AdministrativeProcedureInssAnalysisResultCommandRepositoryGateway)
    private readonly administrativeProcedureInssAnalysisResultCommandRepositoryGateway: AdministrativeProcedureInssAnalysisResultCommandRepositoryGateway,
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
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    administrativeProcedureInssAnalysisId: AdministrativeProcedureInssAnalysisId,
  ): Promise<CreateAdministrativeProcedureInssAnalysisResultResponseDto> {
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
        PaymentPlanPaidResourceTypeEnum.ADMINISTRATIVE_PROCEDURE_INSS_ANALYSIS_COMPLETE_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.ADMINISTRATIVE_PROCEDURE_INSS_ANALYSIS_COMPLETE_ANALYSIS,
        organizationMember.id,
      );

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByAdministrativeProcedureInssAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
        administrativeProcedureInssAnalysisId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        AdministrativeProcedureInssAnalysisNotFoundError,
      );

    const administrativeProcedureInssAnalysisQueryResult =
      analysisToolRecordQueryResult.administrativeProcedureInssAnalysis;

    if (administrativeProcedureInssAnalysisQueryResult === null) {
      throw new AdministrativeProcedureInssAnalysisNotFoundError();
    }

    if (
      analysisToolRecordQueryResult.administrativeProcedureInssAnalysis
        ?.administrativeProcedureInssAnalysisResult !== null
    ) {
      throw new AdministrativeProcedureInssAnalysisResultAlreadyExistsError();
    }

    if (
      administrativeProcedureInssAnalysisQueryResult
        .administrativeProcedureInssAnalysisDocument.length === 0
    ) {
      throw new AdministrativeProcedureDocumentRequiredError();
    }

    const clientDataBuffer = Buffer.from(
      JSON.stringify(analysisToolRecordQueryResult.analysisToolClient, null, 2),
      'utf-8',
    );
    const administrativeProcedureDocumentsBuffer = await Promise.all(
      administrativeProcedureInssAnalysisQueryResult.administrativeProcedureInssAnalysisDocument.map(
        async (document) => {
          return await this.fileProcessorGateway.getFileBuffer(
            document.document,
          );
        },
      ),
    );

    const administrativeProcedureCompleteAnalysis =
      await this.analysisProcessorGateway.getAdministrativeProcedureInssAnalysisCompleteAnalysis(
        promptResponse.prompt,
        [...administrativeProcedureDocumentsBuffer, clientDataBuffer],
      );

    const administrativeProcedureInssAnalysisResult =
      new AdministrativeProcedureInssAnalysisResultEntity({
        administrativeProcedureInssCompleteAnalysis:
          administrativeProcedureCompleteAnalysis,
      });

    const administrativeProcedureInssAnalysis =
      new AdministrativeProcedureInssAnalysisEntity({
        ...administrativeProcedureInssAnalysisQueryResult,
        administrativeProcedureInssAnalysisResult,
        createdBy: analysisToolRecordQueryResult.createdBy.id,
        updatedBy: organizationMember.id,
      });

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
      administrativeProcedureInssAnalysis,
      retirementPlanningRpps: null,
      createdBy: analysisToolRecordQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
      retirementPlanningRgps: null,
      cnisFastAnalysis: null,
      judicialCaseAnalysis: null,
      medicalAndSocialReportObjectionGeneratorAnalysis: null,
      speechGenerator: null,
    });

    const updateAnalysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecord(
        analysisToolRecord.id,
        analysisToolRecord,
      );

    const createAdministrativeProcedureInssAnalysisResultTransaction =
      this.administrativeProcedureInssAnalysisResultCommandRepositoryGateway.createAdministrativeProcedureInssAnalysisResult(
        administrativeProcedureInssAnalysisResult,
      );
    const updateAdministrativeProcedureInssAnalysisTransaction =
      this.administrativeProcedureInssAnalysisCommandRepositoryGateway.updateAdministrativeProcedureInssAnalysis(
        administrativeProcedureInssAnalysis.id,
        administrativeProcedureInssAnalysis,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      consumeCreditTransaction,
      createAdministrativeProcedureInssAnalysisResultTransaction,
      updateAdministrativeProcedureInssAnalysisTransaction,
      updateAnalysisToolRecordTransaction,
    ]);
    await transaction.commit();

    return CreateAdministrativeProcedureInssAnalysisResultResponseDto.build({
      ...administrativeProcedureInssAnalysisResult,
    });
  }
}
