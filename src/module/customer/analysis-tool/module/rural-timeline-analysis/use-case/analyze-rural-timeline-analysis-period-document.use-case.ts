import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { GenerativeIaResponseMimeTypeEnum } from '@infra/generative-ia/enum/generative-ia-response-mime-type.enum';
import { GenerativeIaGateway } from '@infra/generative-ia/generative-ia.gateway';
import { GenerateResponseInputModel } from '@infra/generative-ia/model/input/generate-response.input.model';
import { ResponseConfigInputModel } from '@infra/generative-ia/model/input/response-config.input.model';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { RuralTimelineAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis/query/rural-timeline-analysis.query.repository.gateway';
import { RuralTimelineAnalysisPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period-document/command/rural-timeline-analysis-period-document.command.repository.gateway';
import { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';
import { RuralTimelineAnalysisPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/value-object/rural-timeline-analysis-period-id/rural-timeline-analysis-period-id.value-object';
import { RuralTimelineAnalysisPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-document/enum/rural-timeline-analysis-period-document-type.enum';
import { RuralTimelineAnalysisPeriodDocumentEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-document/rural-timeline-analysis-period-document.entity';
import { RuralTimelineAnalysisPeriodDocumentId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-document/value-object/rural-timeline-analysis-period-document-id/rural-timeline-analysis-period-document-id.value-object';
import {
  AnalyzeRuralTimelineAnalysisPeriodDocumentItemResponseDto,
  AnalyzeRuralTimelineAnalysisPeriodDocumentResponseDto,
} from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/response/analyze-rural-timeline-analysis-period-document.response.dto';
import { DocumentAnalysisFailedError } from '@module/customer/analysis-tool/module/rural-timeline-analysis/error/document-analysis-failed.error';
import { InvalidAnalysisResultError } from '@module/customer/analysis-tool/module/rural-timeline-analysis/error/invalid-analysis-result.error';
import { RuralTimelineAnalysisNotFoundError } from '@module/customer/analysis-tool/module/rural-timeline-analysis/error/rural-timeline-analysis-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class AnalyzeRuralTimelineAnalysisPeriodDocumentUseCase {
  protected readonly _type =
    AnalyzeRuralTimelineAnalysisPeriodDocumentUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(RuralTimelineAnalysisQueryRepositoryGateway)
    private readonly ruralTimelineAnalysisQueryRepositoryGateway: RuralTimelineAnalysisQueryRepositoryGateway,
    @Inject(RuralTimelineAnalysisPeriodDocumentCommandRepositoryGateway)
    private readonly ruralTimelineAnalysisPeriodDocumentCommandRepositoryGateway: RuralTimelineAnalysisPeriodDocumentCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(GenerativeIaGateway)
    private readonly generativeIaGateway: GenerativeIaGateway,
    @Inject(ConsumeOrganizationCreditUseCaseGateway)
    private readonly consumeOrganizationCreditUseCase: ConsumeOrganizationCreditUseCaseGateway,
    @Inject(GetPaymentPlanPaidResourcePromptUseCaseGateway)
    private readonly getPaymentPlanPaidResourcePromptUseCase: GetPaymentPlanPaidResourcePromptUseCaseGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    ruralTimelineAnalysisId: RuralTimelineAnalysisId,
    ruralTimelineAnalysisPeriodId: RuralTimelineAnalysisPeriodId,
  ): Promise<AnalyzeRuralTimelineAnalysisPeriodDocumentResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByRuralTimelineAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
        ruralTimelineAnalysisId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        RuralTimelineAnalysisNotFoundError,
      );

    const clientName = analysisToolRecordQueryResult.analysisToolClient.name;

    const ruralTimelineAnalysis =
      await this.ruralTimelineAnalysisQueryRepositoryGateway.findWithRelationsByRuralTimelineAnalysisIdOrFail(
        ruralTimelineAnalysisId,
      );

    const period = ruralTimelineAnalysis.ruralTimelineAnalysisPeriod.find(
      (p) => p.id.toString() === ruralTimelineAnalysisPeriodId.toString(),
    );

    if (!period) {
      throw new RuralTimelineAnalysisNotFoundError();
    }

    const documentsToAnalyze =
      period.ruralTimelineAnalysisPeriodDocument.filter(
        (doc) =>
          doc.type !== RuralTimelineAnalysisPeriodDocumentTypeEnum.CTPS &&
          doc.documentYear === null &&
          doc.probatoryPurpose === null,
      );

    if (documentsToAnalyze.length === 0) {
      return AnalyzeRuralTimelineAnalysisPeriodDocumentResponseDto.build({
        analyzedDocuments: [],
        totalAnalyzed: 0,
      });
    }

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.RURAL_TIMELINE_ANALYSIS_INDIVIDUAL_PERIOD_DOCUMENT_ANALYSIS,
      );

    const periodContext = JSON.stringify({
      cliente: {
        nome: clientName,
      },
      periodo: {
        dataInicio: period.startDate?.toISOString() ?? null,
        dataTermino: period.endDate?.toISOString() ?? null,
        tipoTrabalhador: period.workerType ?? null,
        regimeTrabalho: period.workRegimeType ?? null,
        destinoProducao: period.productionDestination ?? null,
        analiseDocumentos: period.documentAnalysis ?? null,
      },
      propriedade: period.ruralTimelineAnalysisPeriodProperty
        ? {
            nomePropriedade:
              period.ruralTimelineAnalysisPeriodProperty.propertyName ?? null,
            nomeProprietario:
              period.ruralTimelineAnalysisPeriodProperty.ownerName ?? null,
            cep:
              period.ruralTimelineAnalysisPeriodProperty.postalCode?.toString() ??
              null,
            estado:
              period.ruralTimelineAnalysisPeriodProperty.stateCode ?? null,
            cidade: period.ruralTimelineAnalysisPeriodProperty.city ?? null,
            bairro:
              period.ruralTimelineAnalysisPeriodProperty.neighborhood ?? null,
            rua: period.ruralTimelineAnalysisPeriodProperty.street ?? null,
            numero:
              period.ruralTimelineAnalysisPeriodProperty.streetNumber ?? null,
            tipoPosse:
              period.ruralTimelineAnalysisPeriodProperty.landOwnershipType ??
              null,
          }
        : null,
      residencia: period.ruralTimelineAnalysisPeriodResidence
        ? {
            cidade: period.ruralTimelineAnalysisPeriodResidence.city,
            estado: period.ruralTimelineAnalysisPeriodResidence.stateCode,
            distanciaPropriedadeKm:
              period.ruralTimelineAnalysisPeriodResidence.distanceToPropertyKm.toString(),
          }
        : null,
      aspectosEconomicos: period.ruralTimelineAnalysisPeriodEconomicAspects.map(
        (aspect) => ({
          tipo: aspect.type,
          conteudo: aspect.content ?? null,
        }),
      ),
      grupoFamiliar: period.ruralTimelineAnalysisPeriodFamilyGroupMember.map(
        (member) => ({
          nome: member.name,
          cpf: member.federalDocument.toString(),
          parentesco: member.kinship,
          recebeBeneficioRural: member.receivesRuralBenefit,
          numeroBeneficio: member.benefitNumber ?? null,
          documentoCnis: member.cnisDocument ?? null,
        }),
      ),
      documentos: period.ruralTimelineAnalysisPeriodDocument.map((doc) => ({
        id: doc.id.toString(),
        ano: doc.documentYear ?? null,
        tipoPossuidorDocumento: doc.documentHolderType ?? null,
        pertenceCliente: doc.selfOwned ?? null,
        finalidadeProbatoria: doc.probatoryPurpose ?? null,
        tipoDocumento: doc.type,
      })),
    });

    const systemInstruction = promptResponse.prompt;

    const analyzedDocuments: AnalyzeRuralTimelineAnalysisPeriodDocumentItemResponseDto[] =
      [];
    const updatedDocuments: RuralTimelineAnalysisPeriodDocumentEntity[] = [];
    const creditTransactions = [];

    for (const documentQueryResult of documentsToAnalyze) {
      const creditTransaction =
        await this.consumeOrganizationCreditUseCase.execute(
          organizationSessionData.organizationId,
          PaymentPlanPaidResourceTypeEnum.RURAL_TIMELINE_ANALYSIS_INDIVIDUAL_PERIOD_DOCUMENT_ANALYSIS,
          organizationMember.id,
        );

      creditTransactions.push(creditTransaction);

      const documentBuffer = await this.fileProcessorGateway.getFileBuffer(
        documentQueryResult.document,
      );

      const analysisResult =
        await this.generativeIaGateway.generateFlashResponseFromPromptAndFiles(
          GenerateResponseInputModel.build({
            systemInstruction,
            prompt: periodContext,
            promptFiles: [documentBuffer],
            responseConfig: ResponseConfigInputModel.build({
              responseMimeType:
                GenerativeIaResponseMimeTypeEnum.APPLICATION_JSON,
              jsonSchema: {
                type: 'object',
                properties: {
                  documentYear: {
                    type: ['number', 'null'],
                    description:
                      'Ano de emissão ou referência do documento (número ou null)',
                  },
                  probatoryPurpose: {
                    type: ['string', 'null'],
                    description:
                      'Finalidade probatória do documento (string ou null)',
                  },
                },
                required: ['documentYear', 'probatoryPurpose'],
              },
            }),
          }),
        );

      if (analysisResult === null) {
        throw new DocumentAnalysisFailedError();
      }

      let parsedResult: {
        documentYear: number | null;
        probatoryPurpose: string | null;
      };

      try {
        parsedResult = JSON.parse(analysisResult) as {
          documentYear: number | null;
          probatoryPurpose: string | null;
        };
      } catch {
        throw new InvalidAnalysisResultError();
      }

      const updatedDocument = new RuralTimelineAnalysisPeriodDocumentEntity({
        id: new RuralTimelineAnalysisPeriodDocumentId(
          documentQueryResult.id.toString(),
        ),
        documentYear: parsedResult.documentYear,
        documentHolderType: documentQueryResult.documentHolderType,
        selfOwned: documentQueryResult.selfOwned,
        probatoryPurpose: parsedResult.probatoryPurpose,
        document: documentQueryResult.document,
        type: documentQueryResult.type,
        ruralTimelinePeriodId: ruralTimelineAnalysisPeriodId,
      });

      updatedDocuments.push(updatedDocument);

      analyzedDocuments.push(
        AnalyzeRuralTimelineAnalysisPeriodDocumentItemResponseDto.build({
          documentId: documentQueryResult.id.toString(),
          ...(parsedResult.documentYear !== null && {
            documentYear: parsedResult.documentYear,
          }),
          ...(documentQueryResult.documentHolderType !== null && {
            documentHolderType: documentQueryResult.documentHolderType,
          }),
          ...(documentQueryResult.selfOwned !== null && {
            selfOwned: documentQueryResult.selfOwned,
          }),
          ...(parsedResult.probatoryPurpose !== null && {
            probatoryPurpose: parsedResult.probatoryPurpose,
          }),
        }),
      );
    }

    const allTransactions = [
      ...creditTransactions,
      ...updatedDocuments.map((doc) =>
        this.ruralTimelineAnalysisPeriodDocumentCommandRepositoryGateway.updateRuralTimelineAnalysisPeriodDocument(
          doc,
        ),
      ),
    ];

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(allTransactions);

    await transaction.commit();

    return AnalyzeRuralTimelineAnalysisPeriodDocumentResponseDto.build({
      analyzedDocuments,
      totalAnalyzed: analyzedDocuments.length,
    });
  }
}
