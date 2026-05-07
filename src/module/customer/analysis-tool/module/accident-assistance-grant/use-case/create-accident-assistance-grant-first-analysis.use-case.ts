import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { CnisAnalyzerGateway } from '@lib/cnis-analyzer/cnis-analyzer-gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolClientNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-client-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { AccidentAssistanceGrantCommandRepositoryGateway } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/repository/accident-assistance-grant/command/accident-assistance-grant.command.repository.gateway';
import { AccidentAssistanceGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/repository/accident-assistance-grant/query/accident-assistance-grant.query.repository.gateway';
import { AccidentAssistanceGrantResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/repository/accident-assistance-grant-result/command/accident-assistance-grant-result.command.repository.gateway';
import { AccidentAssistanceGrantId } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant/value-object/accident-assistance-grant-id.value-object';
import { AccidentAssistanceGrantDocumentTypeEnum } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant-document/enum/accident-assistance-grant-document-type.enum';
import { AccidentAssistanceGrantResultEntity } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant-result/accident-assistance-grant-result.entity';
import { CreateAccidentAssistanceGrantFirstAnalysisResponseDto } from '@module/customer/analysis-tool/module/accident-assistance-grant/dto/response/create-accident-assistance-grant-first-analysis.response.dto';
import { AccidentAssistanceGrantCnisDocumentNotFoundError } from '@module/customer/analysis-tool/module/accident-assistance-grant/error/accident-assistance-grant-cnis-document-not-found.error';
import { AccidentAssistanceGrantNotFoundError } from '@module/customer/analysis-tool/module/accident-assistance-grant/error/accident-assistance-grant-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateAccidentAssistanceGrantFirstAnalysisUseCase {
  protected readonly _type =
    CreateAccidentAssistanceGrantFirstAnalysisUseCase.name;

  public constructor(
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(CnisAnalyzerGateway)
    private readonly cnisAnalyzerGateway: CnisAnalyzerGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(AccidentAssistanceGrantCommandRepositoryGateway)
    private readonly accidentAssistanceGrantCommandRepositoryGateway: AccidentAssistanceGrantCommandRepositoryGateway,
    @Inject(AccidentAssistanceGrantQueryRepositoryGateway)
    private readonly accidentAssistanceGrantQueryRepositoryGateway: AccidentAssistanceGrantQueryRepositoryGateway,
    @Inject(AccidentAssistanceGrantResultCommandRepositoryGateway)
    private readonly accidentAssistanceGrantResultCommandRepositoryGateway: AccidentAssistanceGrantResultCommandRepositoryGateway,
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
    accidentAssistanceGrantId: AccidentAssistanceGrantId,
  ): Promise<CreateAccidentAssistanceGrantFirstAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const grant =
      await this.accidentAssistanceGrantQueryRepositoryGateway.findOneByAccidentAssistanceGrantIdOrFailWithRelations(
        accidentAssistanceGrantId,
        AccidentAssistanceGrantNotFoundError,
      );

    const cnisDoc =
      (grant.accidentAssistanceGrantDocument ?? []).find(
        (d) => d.type === AccidentAssistanceGrantDocumentTypeEnum.CNIS,
      ) ?? null;

    if (!cnisDoc) {
      throw new AccidentAssistanceGrantCnisDocumentNotFoundError();
    }

    if (cnisDoc.document === null) {
      throw new AccidentAssistanceGrantCnisDocumentNotFoundError();
    }

    const analysisToolClientQueryResult =
      await this.analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientIdAndOrganizationIdOrFail(
        grant.analysisToolClientId,
        organizationSessionData.organizationId,
        AnalysisToolClientNotFoundError,
      );

    const analysisToolClient = new AnalysisToolClientEntity({
      ...analysisToolClientQueryResult,
      createdBy: analysisToolClientQueryResult.createdBy.id,
      updatedBy: analysisToolClientQueryResult.updatedBy.id,
    });

    const cnisBuffer = await this.fileProcessorGateway.getFileBuffer(
      cnisDoc.document,
    );

    const cnisData =
      await this.analysisProcessorGateway.parseCnisDocument(cnisBuffer);

    const cnisAnalysis = await this.cnisAnalyzerGateway.analyzeCnisDocument(
      cnisData,
      analysisToolClient,
    );

    const otherDocumentBuffers = await Promise.all(
      (grant.accidentAssistanceGrantDocument ?? [])
        .filter((d) => d.document !== null && d.document !== cnisDoc.document)
        .map((d) => this.fileProcessorGateway.getFileBuffer(d.document!)),
    );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.ACCIDENT_ASSISTANCE_GRANT_FIRST_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.ACCIDENT_ASSISTANCE_GRANT_FIRST_ANALYSIS,
        organizationMember.id,
      );

    const firstAnalysisResponse =
      await this.analysisProcessorGateway.getAccidentAssistanceGrantFirstAnalysis(
        promptResponse.prompt,
        JSON.stringify(cnisAnalysis),
        [cnisBuffer, ...otherDocumentBuffers],
      );

    if (firstAnalysisResponse === null) {
      throw new AccidentAssistanceGrantNotFoundError();
    }

    let detailedAnalysis = firstAnalysisResponse;
    let rulesSummary = firstAnalysisResponse;
    let expectedRmi: string | null = null;
    let estimatedCaseValue: string | null = null;

    try {
      const parsed = JSON.parse(firstAnalysisResponse) as { firstAnalysis?: string; analysisConclusion?: string; expectedRmi?: string | null; estimatedCaseValue?: string | null };
      if (parsed.firstAnalysis) detailedAnalysis = parsed.firstAnalysis;
      if (parsed.analysisConclusion) rulesSummary = parsed.analysisConclusion;
      expectedRmi = parsed.expectedRmi ?? null;
      estimatedCaseValue = parsed.estimatedCaseValue ?? null;
    } catch {}

    const existingResult = grant.accidentAssistanceGrantResult;

    const resultEntity = new AccidentAssistanceGrantResultEntity({
      ...(existingResult !== null && { id: existingResult.id }),
      firstAnalysis: firstAnalysisResponse,
      simplifiedAnalysis: existingResult?.simplifiedAnalysis ?? null,
      completeAnalysis: existingResult?.completeAnalysis ?? null,
    });

    const resultTransaction =
      existingResult !== null
        ? this.accidentAssistanceGrantResultCommandRepositoryGateway.updateAccidentAssistanceGrantResult(
            resultEntity,
          )
        : this.accidentAssistanceGrantResultCommandRepositoryGateway.createAccidentAssistanceGrantResult(
            resultEntity,
          );

    const transactionOperations = [consumeCreditTransaction, resultTransaction];

    if (existingResult === null) {
      transactionOperations.push(
        this.accidentAssistanceGrantCommandRepositoryGateway.updateAccidentAssistanceGrantResultId(
          accidentAssistanceGrantId,
          resultEntity.id,
        ),
      );
    }

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionOperations,
    );

    await transaction.commit();

    return CreateAccidentAssistanceGrantFirstAnalysisResponseDto.build({
      firstAnalysis: detailedAnalysis,
      analysisConclusion: rulesSummary,
      expectedRmi,
      estimatedCaseValue,
    });
  }
}
