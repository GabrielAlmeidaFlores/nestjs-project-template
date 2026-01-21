import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { GenerativeIaGateway } from '@infra/generative-ia/generative-ia.gateway';
import { GenerateResponseInputModel } from '@infra/generative-ia/model/input/generate-response.input.model';
import { ResponseConfigInputModel } from '@infra/generative-ia/model/input/response-config.input.model';
import { CnisAnalyzerGateway } from '@lib/cnis-analyzer/cnis-analyzer-gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { RetirementPlanningRgpsQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps/query/retirement-planning-rgps.query.repository.gateway';
import { RetirementPlanningRgpsResultCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-result/command/retirement-planning-rgps-result.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { RetirementPlanningRgpsEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps/retirement-planning-rgps.entity';
import { RetirementPlanningRgpsId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps/value-object/retirement-planning-rgps-id.value-object';
import { RetirementPlanningRgpsResultEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-result/retirement-planning-rgps-result.entity';
import { CreateRetirementPlanningRgpsResultResponseDto } from '@module/customer/analysis-tool/dto/response/create-retirement-planning-rgps-result.response.dto';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { RetirementPlanningRgpsNotFoundError } from '@module/customer/analysis-tool/error/retirement-planning-rgps-not-found.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateRetirementPlanningRgpsResultUseCase {
  protected readonly _type = CreateRetirementPlanningRgpsResultUseCase.name;

  public constructor(
    @Inject(RetirementPlanningRgpsQueryRepositoryGateway)
    private readonly retirementPlanningRgpsQueryRepositoryGateway: RetirementPlanningRgpsQueryRepositoryGateway,
    @Inject(RetirementPlanningRgpsResultCommandRepositoryGateway)
    private readonly retirementPlanningRgpsResultCommandRepositoryGateway: RetirementPlanningRgpsResultCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(GenerativeIaGateway)
    private readonly generativeIaGateway: GenerativeIaGateway,
    @Inject(CnisAnalyzerGateway)
    private readonly cnisAnalysisGateway: CnisAnalyzerGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(ConsumeOrganizationCreditUseCaseGateway)
    private readonly consumeOrganizationCreditUseCase: ConsumeOrganizationCreditUseCaseGateway,
    @Inject(GetPaymentPlanPaidResourcePromptUseCaseGateway)
    private readonly getPaymentPlanPaidResourcePromptUseCase: GetPaymentPlanPaidResourcePromptUseCaseGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
  ) {}

  public async execute(
    retirementPlanningRgpsId: RetirementPlanningRgpsId,
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
  ): Promise<CreateRetirementPlanningRgpsResultResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const retirementPlanningRgps =
      await this.retirementPlanningRgpsQueryRepositoryGateway.findOneByRetirementPlanningRgpsIdOrFailWithRelations(
        retirementPlanningRgpsId,
        RetirementPlanningRgpsNotFoundError,
      );

    if (!retirementPlanningRgps.retirementPlanningRgpsResult) {
      throw new RetirementPlanningRgpsNotFoundError();
    }

    const analysisRecord =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByRetirementPlanningRgpsIdAndOrganizationIdAndAuthIdentityIdOrFail(
        retirementPlanningRgpsId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        RetirementPlanningRgpsNotFoundError,
      );

    const cnisDocumentBuffer = await this.fileProcessorGateway.getFileBuffer(
      retirementPlanningRgps.cnisDocument as unknown as string,
    );
    const cnisDocumentData =
      await this.analysisProcessorGateway.parseCnisDocument(cnisDocumentBuffer);

    const cnisAnalyzerResponse =
      await this.cnisAnalysisGateway.analyzeCnisDocument(
        cnisDocumentData,
        new AnalysisToolClientEntity({
          ...analysisRecord.analysisToolClient,
          createdBy: analysisRecord.analysisToolClient.createdBy.id,
          updatedBy: analysisRecord.analysisToolClient.updatedBy.id,
        }),
      );

    const jsonCnisAnalyzerResponse = JSON.stringify(
      cnisAnalyzerResponse,
      null,
      2,
    );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PLANNING_RGPS_FINAL_RULES_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PLANNING_RGPS_FINAL_RULES_ANALYSIS,
        organizationMember.id,
      );

    const result =
      (await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
        GenerateResponseInputModel.build({
          systemInstruction: promptResponse.prompt,
          promptFiles: [],
          prompt: [
            JSON.stringify(retirementPlanningRgps.retirementPlanningRgpsPeriod),
            jsonCnisAnalyzerResponse,
          ].join('\n\n'),
          responseConfig: ResponseConfigInputModel.build({
            jsonSchema: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  regraDeAposentadoria: {
                    type: 'string',
                    description:
                      'Aposentadoria por tempo de contribuiçãos, aposentadoria por idade, etc.',
                    enum: [
                      'APOSENTADORIA_TEMPO_CONTRIBUICAO_DIREITO_ADQUIRIDO_EC103',
                      'APOSENTADORIA_IDADE_URBANA_DIREITO_ADQUIRIDO_EC103',
                      'APOSENTADORIA_TEMPO_CONTRIBUICAO_TRANSICAO_ART15_EC103',
                      'APOSENTADORIA_TEMPO_CONTRIBUICAO_TRANSICAO_ART16_EC103',
                      'APOSENTADORIA_TEMPO_CONTRIBUICAO_TRANSICAO_ART17_EC103',
                      'APOSENTADORIA_TEMPO_CONTRIBUICAO_TRANSICAO_ART20_EC103',
                      'APOSENTADORIA_IDADE_HIBRIDA_DIREITO_ADQUIRIDO_EC103',
                      'APOSENTADORIA_IDADE_URBANA_TRANSICAO_ART18_EC103',
                      'APOSENTADORIA_IDADE_HIBRIDA_TRANSICAO_ART18_EC103',
                      'APOSENTADORIA_PROGRAMADA_COMUM_ART19_EC103',
                      'APOSENTADORIA_PROGRAMADA_PROFESSOR_ART19_II_EC103',
                      'APOSENTADORIA_PROGRAMADA_PROFESSOR_DIREITO_ADQUIRIDO_EC103',
                      'APOSENTADORIA_PROGRAMADA_ESPECIAL_ART19_I_EC103',
                      'APOSENTADORIA_PROGRAMADA_ESPECIAL_TRANSICAO_ART21_EC103',
                      'APOSENTADORIA_PROGRAMADA_ESPECIAL_DIREITO_ADQUIRIDO_EC103',
                    ],
                  },
                  resultado: {
                    type: 'string',
                    enum: ['Atingido', 'Aguardando'],
                    description:
                      'Indica se o cliente já atingiu os requisitos para essa aposentadoria ou se ainda está aguardando.',
                  },
                  dataDoDireito: {
                    type: 'string',
                    description:
                      'Data em que o cliente atingiu ou atingirá os requisitos para essa aposentadoria, formatada como "DD de mês de AAAA".',
                  },
                  rmiPrevista: {
                    type: 'string',
                    description:
                      'Valor da Renda Mensal Inicial (RMI) prevista para essa aposentadoria, formatada como moeda brasileira (R$ X.XXX,XX).',
                  },
                  melhorRmi: {
                    type: 'boolean',
                    description:
                      'Indica se essa aposentadoria oferece a melhor RMI entre todas as opções disponíveis.',
                  },
                  maiorValorCausa: {
                    type: 'boolean',
                    description:
                      'Indica se essa aposentadoria oferece o maior valor de causa entre todas as opções disponíveis.',
                  },
                  detalhes: {
                    type: 'string',
                    description:
                      'Detalhes adicionais relevantes sobre essa aposentadoria, como vantagens, desvantagens, tempo de espera, etc. Ex.  Requisitos analisados:Tempo mínimo: 35 anos ➔ Idade mínima: 65 anos ➔ Carência mínima: 180 contribuições ➔ Cálculo da RMI:Média salarial: R$3.500,00 Coeficiente: 85% RMI estimada: R$ 2.980,00 Valor da causa: DIB: 15/12/2023 DER: 10/06/2024 Atrasados: 6 meses Valor da causa: R$ 17.880,00 (Estes detalhes devem ser sempre entregue em formato markdown)',
                  },
                },
                required: [
                  'regraDeAposentadoria',
                  'resultado',
                  'dataDoDireito',
                  'rmiPrevista',
                  'melhorRmi',
                  'maiorValorCausa',
                  'detalhes',
                ],
              },
            },
          }),
        }),
      )) ?? '';

    const retirementPlanningRgpsResult = new RetirementPlanningRgpsResultEntity(
      {
        ...retirementPlanningRgps.retirementPlanningRgpsResult,
        result,
      },
    );

    const retirementPlanningRgpsEntity = new RetirementPlanningRgpsEntity({
      ...retirementPlanningRgps,
      retirementPlanningRgpsResult,
    });

    const analysisToolClient = new AnalysisToolClientEntity({
      ...analysisRecord.analysisToolClient,
      createdBy: analysisRecord.createdBy.id,
      updatedBy: analysisRecord.updatedBy.id,
    });

    const analysisToolRecordUpdated = new AnalysisToolRecordEntity({
      ...analysisRecord,
      cnisFastAnalysis: null,
      analysisToolClient,
      retirementPlanningRpps: null,
      status: AnalysisStatusEnum.COMPLETED,
      createdBy: analysisRecord.createdBy.id,
      updatedBy: organizationMember.id,
      retirementPlanningRgps: retirementPlanningRgpsEntity,
      judicialCaseAnalysis: null,
      administrativeProcedureInssAnalysis: null,
    });
    const updateAnalysisRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecord(
        analysisRecord.id,
        analysisToolRecordUpdated,
      );

    const transaction =
      this.retirementPlanningRgpsResultCommandRepositoryGateway.updateRetirementPlanningRgpsResult(
        retirementPlanningRgpsResult.id,
        retirementPlanningRgpsResult,
      );

    const transactions = await this.baseTransactionRepositoryGateway.execute([
      transaction,
      consumeCreditTransaction,
      updateAnalysisRecordTransaction,
    ]);

    await transactions.commit();

    return CreateRetirementPlanningRgpsResultResponseDto.build({
      response: result,
    });
  }
}
