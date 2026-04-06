import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { GenerativeIaGateway } from '@infra/generative-ia/generative-ia.gateway';
import { GenerateResponseInputModel } from '@infra/generative-ia/model/input/generate-response.input.model';
import { ResponseConfigInputModel } from '@infra/generative-ia/model/input/response-config.input.model';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisActivityTrackerGateway } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/analysis-activity-tracker.gateway';
import { AnalysisActivityActionEnum } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/enum/analysis-activity-action.enum';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { SpecialRetirementGrantCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant/command/special-retirement-grant.command.repository.gateway';
import { SpecialRetirementGrantEarningsHistoryQueryRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-earnings-history/query/special-retirement-grant-earnings-history.query.repository.gateway';
import { SpecialRetirementGrantPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-period/query/special-retirement-grant-period.query.repository.gateway';
import { SpecialRetirementGrantResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-result/command/special-retirement-grant-result.command.repository.gateway';
import { SpecialRetirementGrantEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/special-retirement-grant.entity';
import { SpecialRetirementGrantId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/value-object/special-retirement-grant-id/special-retirement-grant-id.value-object';
import { SpecialRetirementGrantResultEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-result/special-retirement-grant-result.entity';
import { CreateSpecialRetirementGrantResultResponseDto } from '@module/customer/analysis-tool/module/special-retirement-grant/dto/response/create-special-retirement-grant-result.response.dto';
import { InvalidSpecialRetirementGrantCompleteAnalysisJsonError } from '@module/customer/analysis-tool/module/special-retirement-grant/error/invalid-special-retirement-grant-complete-analysis-json.error';
import { SpecialRetirementGrantNotFoundError } from '@module/customer/analysis-tool/module/special-retirement-grant/error/special-retirement-grant-not-found.error';
import { SpecialRetirementGrantResultAlreadyExistsError } from '@module/customer/analysis-tool/module/special-retirement-grant/error/special-retirement-grant-result-already-exists.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';

interface IaResponseInterface {
  regrasAplicaveis: object[];
  periodosReconhecidos: object[];
  resultadoDaAnalise: string;
}

@Injectable()
export class CreateSpecialRetirementGrantResultUseCase {
  protected readonly _type = CreateSpecialRetirementGrantResultUseCase.name;

  private readonly JSON_SCHEMA = {
    type: 'object',
    properties: {
      regrasAplicaveis: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            modalidade: { type: 'string' },
            cumprida: { type: 'boolean' },
            dataDaAposentadoria: { type: 'string' },
            rmiPrevista: { type: 'string' },
            valorDaCausaEstimada: { type: 'string' },
            melhorRmi: { type: 'boolean' },
            maiorValorDeCausa: { type: 'boolean' },
            analiseDetalhada: { type: 'string' },
          },
          required: [
            'modalidade',
            'cumprida',
            'dataDaAposentadoria',
            'rmiPrevista',
            'valorDaCausaEstimada',
            'melhorRmi',
            'maiorValorDeCausa',
            'analiseDetalhada',
          ],
        },
      },
      periodosReconhecidos: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            origemDoVinculo: { type: 'string' },
            periodo: { type: 'string' },
            categoria: { type: 'string' },
            agentes: { type: 'string' },
            tempoEspecial: { type: 'string' },
            tempoConvertido: { type: 'string' },
            status: { type: 'string' },
          },
          required: [
            'origemDoVinculo',
            'periodo',
            'categoria',
            'agentes',
            'tempoEspecial',
            'tempoConvertido',
            'status',
          ],
        },
      },
      resultadoDaAnalise: { type: 'string' },
    },
    required: [
      'regrasAplicaveis',
      'periodosReconhecidos',
      'resultadoDaAnalise',
    ],
  };

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(SpecialRetirementGrantCommandRepositoryGateway)
    private readonly specialRetirementGrantCommandRepositoryGateway: SpecialRetirementGrantCommandRepositoryGateway,
    @Inject(SpecialRetirementGrantResultCommandRepositoryGateway)
    private readonly specialRetirementGrantResultCommandRepositoryGateway: SpecialRetirementGrantResultCommandRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(GenerativeIaGateway)
    private readonly generativeIaGateway: GenerativeIaGateway,
    @Inject(ConsumeOrganizationCreditUseCaseGateway)
    private readonly consumeOrganizationCreditUseCase: ConsumeOrganizationCreditUseCaseGateway,
    @Inject(GetPaymentPlanPaidResourcePromptUseCaseGateway)
    private readonly getPaymentPlanPaidResourcePromptUseCase: GetPaymentPlanPaidResourcePromptUseCaseGateway,
    @Inject(SpecialRetirementGrantPeriodQueryRepositoryGateway)
    private readonly specialRetirementGrantPeriodQueryRepositoryGateway: SpecialRetirementGrantPeriodQueryRepositoryGateway,
    @Inject(SpecialRetirementGrantEarningsHistoryQueryRepositoryGateway)
    private readonly specialRetirementGrantEarningsHistoryQueryRepositoryGateway: SpecialRetirementGrantEarningsHistoryQueryRepositoryGateway,
    @Inject(AnalysisActivityTrackerGateway)
    private readonly analysisActivityTrackerGateway: AnalysisActivityTrackerGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    specialRetirementGrantId: SpecialRetirementGrantId,
  ): Promise<CreateSpecialRetirementGrantResultResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsBySpecialRetirementGrantIdAndOrganizationIdAndAuthIdentityIdOrFail(
        specialRetirementGrantId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        SpecialRetirementGrantNotFoundError,
      );

    if (
      analysisToolRecordQueryResult.specialRetirementGrant
        ?.specialRetirementGrantResult
        ?.specialRetirementGrantCompleteAnalysis !== null
    ) {
      throw new SpecialRetirementGrantResultAlreadyExistsError();
    }

    const specialRetirementGrantQueryResult =
      analysisToolRecordQueryResult.specialRetirementGrant;
    if (specialRetirementGrantQueryResult === null) {
      throw new SpecialRetirementGrantNotFoundError();
    }

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.SPECIAL_RETIREMENT_GRANT_COMPLETE_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.SPECIAL_RETIREMENT_GRANT_COMPLETE_ANALYSIS,
        organizationMember.id,
      );

    const [periodsWithChildren, earningsHistory] = await Promise.all([
      this.specialRetirementGrantPeriodQueryRepositoryGateway.listPeriodsWithChildrenBySpecialRetirementGrantId(
        specialRetirementGrantId,
      ),
      this.specialRetirementGrantEarningsHistoryQueryRepositoryGateway.listBySpecialRetirementGrantId(
        specialRetirementGrantId,
      ),
    ]);

    const promptData = JSON.stringify(
      {
        client: analysisToolRecordQueryResult.analysisToolClient,
        periods: periodsWithChildren,
        earningsHistory,
        benefits:
          specialRetirementGrantQueryResult.specialRetirementGrantBenefit,
        legalProceedings:
          specialRetirementGrantQueryResult.specialRetirementGrantLegalProceeding,
        firstAnalysis:
          specialRetirementGrantQueryResult.specialRetirementGrantResult
            ?.specialRetirementGrantFirstAnalysis ?? null,
      },
      null,
      2,
    );

    const cnisBuffer = await this.fileProcessorGateway.getFileBuffer(
      specialRetirementGrantQueryResult.cnisDocument,
    );

    const docBuffers = await Promise.all(
      specialRetirementGrantQueryResult.specialRetirementGrantDocument.map(
        async (doc) =>
          await this.fileProcessorGateway.getFileBuffer(doc.document),
      ),
    );

    const iaResponse =
      await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
        GenerateResponseInputModel.build({
          systemInstruction: promptResponse.prompt,
          prompt: promptData,
          promptFiles: [cnisBuffer, ...docBuffers],
          responseConfig: ResponseConfigInputModel.build({
            jsonSchema: this.JSON_SCHEMA,
          }),
        }),
      );

    if (iaResponse === null) {
      throw new InvalidSpecialRetirementGrantCompleteAnalysisJsonError();
    }

    const normalizedIaResponse = this.parseIaResponse(iaResponse);

    const regrasAplicaveis = Array.isArray(
      normalizedIaResponse?.regrasAplicaveis,
    )
      ? normalizedIaResponse.regrasAplicaveis
      : [];

    const periodosReconhecidos = Array.isArray(
      normalizedIaResponse?.periodosReconhecidos,
    )
      ? normalizedIaResponse.periodosReconhecidos
      : [];

    const specialRetirementGrantCompleteAnalysis = JSON.stringify(
      { regrasAplicaveis, periodosReconhecidos },
      null,
      2,
    );

    const specialRetirementGrantCompleteAnalysisDownload =
      typeof normalizedIaResponse?.resultadoDaAnalise === 'string'
        ? normalizedIaResponse.resultadoDaAnalise
        : '';

    let specialRetirementGrantResult: SpecialRetirementGrantResultEntity;
    if (analysisToolRecordQueryResult.specialRetirementGrant?.specialRetirementGrantResult === null) {
      specialRetirementGrantResult = new SpecialRetirementGrantResultEntity(
        {
          specialRetirementGrantCompleteAnalysis,
          specialRetirementGrantCompleteAnalysisDownload,
          specialRetirementGrantSimplifiedAnalysis: null,
        },
      );
    }

    if (analysisToolRecordQueryResult.specialRetirementGrant?.specialRetirementGrantResult !== null) {
      specialRetirementGrantResult = new SpecialRetirementGrantResultEntity(
        {
          ...analysisToolRecordQueryResult.specialRetirementGrant?.specialRetirementGrantResult,
          specialRetirementGrantCompleteAnalysis,
          specialRetirementGrantCompleteAnalysisDownload,
          specialRetirementGrantSimplifiedAnalysis: null,
        },
      );
    }

    const specialRetirementGrant = new SpecialRetirementGrantEntity({
      ...specialRetirementGrantQueryResult,
      specialRetirementGrantResult: specialRetirementGrantResult!,
      specialRetirementGrantBenefit: null,
      specialRetirementGrantLegalProceeding: null,
      specialRetirementGrantDocument: null,
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
      specialRetirementGrant,
      createdBy: analysisToolRecordQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
      cnisFastAnalysis: null,
      retirementPlanningRpps: null,
      retirementPlanningRgps: null,
      specialActivity: null,
      administrativeProcedureInssAnalysis: null,
      judicialCaseAnalysis: null,
      medicalQuestionGenerator: null,
      medicalAndSocialReportObjectionGeneratorAnalysis: null,
      speechGenerator: null,
      disabilityAssessmentForBpcAnalysis: null,
      audienceQuestionGenerator: null,
      perCapitaIncomeForBpcAnalysis: null,
      ruralTimelineAnalysis: null,
      insuranceQualityAnalysis: null,
      teacherRetirementPlanning: null,
      disabilityRetirementPlanning: null,
      generalUrbanRetirementGrant: null,
      generalUrbanRetirementAnalysis: null,
      specialCategoryRetirementAnalysis: null,
    });

    const updateAnalysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecord(
        analysisToolRecord.id,
        analysisToolRecord,
      );

    const updateSpecialRetirementGrantTransaction =
      this.specialRetirementGrantCommandRepositoryGateway.updateSpecialRetirementGrant(
        specialRetirementGrant.id,
        specialRetirementGrant,
      );

    let resultTransaction: TransactionType;
    if (analysisToolRecordQueryResult.specialRetirementGrant?.specialRetirementGrantResult === null) {
      resultTransaction = this.specialRetirementGrantResultCommandRepositoryGateway.createSpecialRetirementGrantResult(
        specialRetirementGrantResult!,
      );
    }

    if (analysisToolRecordQueryResult.specialRetirementGrant?.specialRetirementGrantResult !== null) {
      resultTransaction = this.specialRetirementGrantResultCommandRepositoryGateway.updateSpecialRetirementGrantResult(
        analysisToolRecordQueryResult.specialRetirementGrant?.specialRetirementGrantResult.id,
        specialRetirementGrantResult!,
      );
    }

    const transactionsWithActivity =
      this.analysisActivityTrackerGateway.appendActivityTransaction({
        action: AnalysisActivityActionEnum.RESULT_ADDED,
        analysisType: analysisToolRecordQueryResult.type,
        organizationMemberId: organizationMember.id,
        analysisToolClientId: analysisToolRecordQueryResult.analysisToolClient.id,
        analysisToolRecordId: analysisToolRecordQueryResult.id,
        transactions: [
          consumeCreditTransaction,
          resultTransaction!,
          updateSpecialRetirementGrantTransaction,
          updateAnalysisToolRecordTransaction,
        ],
      });

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(
        transactionsWithActivity,
      );
    await transaction.commit();

    return CreateSpecialRetirementGrantResultResponseDto.build({
      specialRetirementGrantCompleteAnalysis: {
        regrasAplicaveis,
        periodosReconhecidos,
      },
      specialRetirementGrantCompleteAnalysisDownload:
        specialRetirementGrantCompleteAnalysisDownload,
    });
  }

  private parseIaResponse(raw: string): IaResponseInterface | null {
    try {
      return JSON.parse(raw) as IaResponseInterface;
    } catch {
      throw new InvalidSpecialRetirementGrantCompleteAnalysisJsonError();
    }
  }
}
