import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { DisabilityRetirementPlanningQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning/query/disability-retirement-planning.query.repository.gateway';
import { DisabilityRetirementPlanningResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-result/command/disability-retirement-planning-result.command.repository.gateway';
import { DisabilityRetirementPlanningId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/value-object/disability-retirement-planning-id.value-object';
import { DisabilityRetirementPlanningEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/disability-retirement-planning.entity';
import { DisabilityRetirementPlanningResultEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-result/disability-retirement-planning-result.entity';
import { DisabilityRetirementPlanningResultId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-result/value-object/disability-retirement-planning-result-id.value-object';
import { DisabilityRetirementPlanningDoesNotContainCompleteAnalysisError } from '@module/customer/analysis-tool/module/disability-retirement-planning/error/disability-retirement-planning-does-not-contain-complete-analysis.error';
import { DisabilityRetirementPlanningNotFoundError } from '@module/customer/analysis-tool/module/disability-retirement-planning/error/disability-retirement-planning-not-found.error';
import { DisabilityRetirementPlanningResultQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-result/query/disability-retirement-planning-result.query.repository.gateway';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DownloadDisabilityRetirementPlanningCompleteAnalysisUseCase {
  protected readonly _type =
    DownloadDisabilityRetirementPlanningCompleteAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(DisabilityRetirementPlanningQueryRepositoryGateway)
    private readonly disabilityRetirementPlanningQueryRepositoryGateway: DisabilityRetirementPlanningQueryRepositoryGateway,
    @Inject(DisabilityRetirementPlanningResultQueryRepositoryGateway)
    private readonly disabilityRetirementPlanningResultQueryRepositoryGateway: DisabilityRetirementPlanningResultQueryRepositoryGateway,
    @Inject(DisabilityRetirementPlanningResultCommandRepositoryGateway)
    private readonly disabilityRetirementPlanningResultCommandRepositoryGateway: DisabilityRetirementPlanningResultCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
    @Inject(GetPaymentPlanPaidResourcePromptUseCaseGateway)
    private readonly getPaymentPlanPaidResourcePromptUseCase: GetPaymentPlanPaidResourcePromptUseCaseGateway,
    @Inject(ConsumeOrganizationCreditUseCaseGateway)
    private readonly consumeOrganizationCreditUseCase: ConsumeOrganizationCreditUseCaseGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    disabilityRetirementPlanningId: DisabilityRetirementPlanningId,
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const queryResult =
      await this.disabilityRetirementPlanningQueryRepositoryGateway.findOneDisabilityRetirementPlanningByIdWithRelations(
        disabilityRetirementPlanningId,
      );

    if (!queryResult) {
      throw new DisabilityRetirementPlanningNotFoundError();
    }

    if (!queryResult.result) {
      throw new DisabilityRetirementPlanningDoesNotContainCompleteAnalysisError();
    }

    const completeAnalysisJson =
      queryResult.result
        .disabilityRetirementPlanningCompleteAnalysis;

    if (completeAnalysisJson === null) {
      throw new DisabilityRetirementPlanningDoesNotContainCompleteAnalysisError();
    }

    let downloadContent =
      queryResult.result
        .disabilityRetirementPlanningCompleteAnalysisDownload;

    if (downloadContent === null) {
      const promptResponse =
        await this.getPaymentPlanPaidResourcePromptUseCase.execute(
          PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_COMPLETE_ANALYSIS,
        );

      const consumeCreditTransaction =
        await this.consumeOrganizationCreditUseCase.execute(
          organizationSessionData.organizationId,
          PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_COMPLETE_ANALYSIS,
          organizationMember.id,
        );

      const aiResponse =
        await this.analysisProcessorGateway.getDisabilityRetirementPlanningCompleteAnalysis(
          promptResponse.prompt,
          [Buffer.from(completeAnalysisJson, 'utf-8')],
          false,
        );

      if (aiResponse === null) {
        throw new DisabilityRetirementPlanningDoesNotContainCompleteAnalysisError();
      }

      downloadContent = aiResponse;

      const existingResultId =
        await this.disabilityRetirementPlanningResultQueryRepositoryGateway.findOneIdByDisabilityRetirementPlanningId(
          disabilityRetirementPlanningId,
        );

      if (existingResultId) {
        const planningEntity = new DisabilityRetirementPlanningEntity({
          id: queryResult.id,
          currentPosition: queryResult.currentPosition,
          federativeEntity: queryResult.federativeEntity,
          state: queryResult.state,
          municipality: queryResult.municipality,
          publicServiceStartDate: queryResult.publicServiceStartDate,
          careerStartDate: queryResult.careerStartDate,
          analysisName: queryResult.analysisName,
          longTimeDisability: queryResult.longTimeDisability,
        });

        const updatedResult = new DisabilityRetirementPlanningResultEntity({
          id: new DisabilityRetirementPlanningResultId(queryResult.result.id),
          disabilityRetirementPlanning: planningEntity,
          disabilityRetirementPlanningCompleteAnalysis: queryResult.result.disabilityRetirementPlanningCompleteAnalysis,
          disabilityRetirementPlanningSimplifiedAnalysis: queryResult.result.disabilityRetirementPlanningSimplifiedAnalysis,
          disabilityRetirementPlanningCompleteAnalysisDownload: downloadContent,
        });

        const transaction = await this.baseTransactionRepositoryGateway.execute([
          consumeCreditTransaction,
          this.disabilityRetirementPlanningResultCommandRepositoryGateway.updateDisabilityRetirementPlanningResult(
            existingResultId,
            updatedResult,
          ),
        ]);
        await transaction.commit();
      }
    }

    return this.exportDocumentGateway.downloadFileAsStreamable(
      downloadContent,
      format,
      'analise_completa_aposentadoria_pcd',
    );
  }
}
