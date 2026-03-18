import { Inject, Injectable } from '@nestjs/common';

import { Base64 } from '@core/domain/schema/value-object/base64/base64.value-object';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import {
  GetAnalysisToolClientResponseDto,
  GetAnalysisToolClientResponsibleResponseDto,
} from '@module/customer/analysis-tool/dto/response/get-analysis-tool-client.response.dto';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { GeneralUrbanRetirementAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis/query/general-urban-retirement-analysis.query.repository.gateway';
import { GetGeneralUrbanRetirementAnalysisDocumentQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis-document/query/result/get-general-urban-retirement-analysis-document.query.result';
import { GetGeneralUrbanRetirementAnalysisPeriodDocumentQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis-period-document/query/result/get-general-urban-retirement-analysis-period-document.query.result';
import { GeneralUrbanRetirementAnalysisId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/value-object/general-urban-retirement-analysis-id.value-object';
import { GetGeneralUrbanRetirementAnalysisDocumentResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement/dto/response/get-general-urban-retirement-analysis-document.response.dto';
import {
  GetGeneralUrbanRetirementAnalysisPeriodDocumentResponseDto,
  GetGeneralUrbanRetirementAnalysisPeriodResponseDto,
  GetGeneralUrbanRetirementAnalysisPeriodSpecialTimeResponseDto,
  GetGeneralUrbanRetirementAnalysisPeriodDisabilityResponseDto,
  GetGeneralUrbanRetirementAnalysisPeriodCidResponseDto,
} from '@module/customer/analysis-tool/module/general-urban-retirement/dto/response/get-general-urban-retirement-analysis-period.response.dto';
import { GetGeneralUrbanRetirementAnalysisRemunerationResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement/dto/response/get-general-urban-retirement-analysis-remuneration.response.dto';
import {
  GetGeneralUrbanRetirementAnalysisResponseDto,
  GetGeneralUrbanRetirementAnalysisResultResponseDto,
} from '@module/customer/analysis-tool/module/general-urban-retirement/dto/response/get-general-urban-retirement-analysis.response.dto';
import { GeneralUrbanRetirementAnalysisNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement/error/general-urban-retirement-analysis-not-found.error';
import { parseGeneralUrbanRetirementCompleteAnalysis } from '@module/customer/analysis-tool/module/general-urban-retirement/model/general-urban-retirement-complete-analysis.model';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetGeneralUrbanRetirementAnalysisUseCase {
  protected readonly _type = GetGeneralUrbanRetirementAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(GeneralUrbanRetirementAnalysisQueryRepositoryGateway)
    private readonly generalUrbanRetirementAnalysisQueryRepositoryGateway: GeneralUrbanRetirementAnalysisQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    generalUrbanRetirementAnalysisId: GeneralUrbanRetirementAnalysisId,
  ): Promise<GetGeneralUrbanRetirementAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByGeneralUrbanRetirementAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
      generalUrbanRetirementAnalysisId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      GeneralUrbanRetirementAnalysisNotFoundError,
    );

    const analysisQueryResult =
      await this.generalUrbanRetirementAnalysisQueryRepositoryGateway.findOneByGeneralUrbanRetirementAnalysisIdAndOrganizationIdWithRelationsOrFail(
        generalUrbanRetirementAnalysisId,
        organizationSessionData.organizationId,
        GeneralUrbanRetirementAnalysisNotFoundError,
      );

    const recordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByGeneralUrbanRetirementAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
        generalUrbanRetirementAnalysisId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        GeneralUrbanRetirementAnalysisNotFoundError,
      );

    const client = recordQueryResult.analysisToolClient;
    const analysisToolClient = GetAnalysisToolClientResponseDto.build({
      ...client,
      analysisCount: 0,
      legalProceedingNumber: client.analysisToolClientLegalProceeding.map(
        (p) => p.legalProceedingNumber,
      ),
      inssBenefitNumber: client.analysisToolClientInssBenefit.map(
        (b) => b.inssBenefitNumber,
      ),
      createdBy: GetAnalysisToolClientResponsibleResponseDto.build({
        id: client.createdBy.customer.id,
        name: client.createdBy.customer.name,
      }),
      updatedBy: GetAnalysisToolClientResponsibleResponseDto.build({
        id: client.updatedBy.customer.id,
        name: client.updatedBy.customer.name,
      }),
    });

    const generalUrbanRetirementAnalysisResult =
      analysisQueryResult.generalUrbanRetirementAnalysisResult !== null
        ? GetGeneralUrbanRetirementAnalysisResultResponseDto.build({
            generalUrbanRetirementCompleteAnalysis:
              analysisQueryResult.generalUrbanRetirementAnalysisResult
                .generalUrbanRetirementCompleteAnalysis !== null
                ? parseGeneralUrbanRetirementCompleteAnalysis(
                    analysisQueryResult.generalUrbanRetirementAnalysisResult
                      .generalUrbanRetirementCompleteAnalysis,
                  )
                : null,
            generalUrbanRetirementSimplifiedAnalysis:
              parseGeneralUrbanRetirementSimplifiedAnalysis(
                analysisQueryResult.generalUrbanRetirementAnalysisResult
                  .generalUrbanRetirementSimplifiedAnalysis,
              ),
            createdAt:
              analysisQueryResult.generalUrbanRetirementAnalysisResult
                .createdAt,
            updatedAt:
              analysisQueryResult.generalUrbanRetirementAnalysisResult
                .updatedAt,
          })
        : null;

    const remunerations = analysisQueryResult.remunerations.map((r) =>
      GetGeneralUrbanRetirementAnalysisRemunerationResponseDto.build({
        remunerationDate: r.remunerationDate,
        remunerationAmount: r.remunerationAmount,
      }),
    );

    const periods = await Promise.all(
      analysisQueryResult.periods.map(async (p) => {
        let specialTimePeriod:
          | GetGeneralUrbanRetirementAnalysisPeriodSpecialTimeResponseDto
          | undefined;
        if (p.specialTimePeriod !== undefined) {
          const documents = await this.buildPeriodDocuments(
            p.specialTimePeriod.documents,
          );
          specialTimePeriod =
            GetGeneralUrbanRetirementAnalysisPeriodSpecialTimeResponseDto.build(
              {
                id: p.specialTimePeriod.id,
                type: p.specialTimePeriod.type,
                startDate: p.specialTimePeriod.startDate,
                endDate: p.specialTimePeriod.endDate,
                ...(documents.length > 0 && { documents }),
              },
            );
        }

        let disabilityPeriod:
          | GetGeneralUrbanRetirementAnalysisPeriodDisabilityResponseDto
          | undefined;
        if (p.disabilityPeriod !== undefined) {
          const documents = await this.buildPeriodDocuments(
            p.disabilityPeriod.documents,
          );
          disabilityPeriod =
            GetGeneralUrbanRetirementAnalysisPeriodDisabilityResponseDto.build({
              id: p.disabilityPeriod.id,
              type: p.disabilityPeriod.type,
              degree: p.disabilityPeriod.degree,
              startDate: p.disabilityPeriod.startDate,
              endDate: p.disabilityPeriod.endDate,
              category: p.disabilityPeriod.category,
              description: p.disabilityPeriod.description,
              dailyImpact: p.disabilityPeriod.dailyImpact,
              cid: GetGeneralUrbanRetirementAnalysisPeriodCidResponseDto.build({
                id: p.disabilityPeriod.cid.id,
                code: p.disabilityPeriod.cid.code,
                description: p.disabilityPeriod.cid.description,
              }),
              ...(documents.length > 0 && { documents }),
            });
        }

        return GetGeneralUrbanRetirementAnalysisPeriodResponseDto.build({
          id: p.id,
          startDate: p.startDate,
          endDate: p.endDate,
          jobPosition: p.jobPosition,
          career: p.career,
          serviceType: p.serviceType,
          department: p.department,
          ...(specialTimePeriod !== undefined && { specialTimePeriod }),
          ...(disabilityPeriod !== undefined && { disabilityPeriod }),
          createdAt: p.createdAt,
          updatedAt: p.updatedAt,
        });
      }),
    );

    const documents = await this.buildAnalysisDocuments(
      analysisQueryResult.documents,
    );

    return GetGeneralUrbanRetirementAnalysisResponseDto.build({
      id: analysisQueryResult.id,
      careerStartDate: analysisQueryResult.careerStartDate ?? null,
      publicServiceStartDate:
        analysisQueryResult.publicServiceStartDate ?? null,
      analysisToolClient,
      generalUrbanRetirementAnalysisResult,
      federativeEntity: analysisQueryResult.federativeEntity ?? null,
      state: analysisQueryResult.state ?? null,
      municipality: analysisQueryResult.municipality ?? null,
      name: analysisQueryResult.name ?? null,
      ...(analysisQueryResult.benefitType !== null && {
        benefitType: analysisQueryResult.benefitType,
      }),
      ...(analysisQueryResult.currentPosition !== null && {
        currentPosition: analysisQueryResult.currentPosition,
      }),
      ...(analysisQueryResult.generalUrbanRetirementBenefitAnalysis !==
        null && {
        generalUrbanRetirementBenefitAnalysis:
          analysisQueryResult.generalUrbanRetirementBenefitAnalysis,
      }),
      ...(analysisQueryResult.legalProceedings[0] !== undefined && {
        legalProceedingNumber:
          analysisQueryResult.legalProceedings[0].legalProceeding,
      }),
      remunerations,
      periods,
      documents,
      createdAt: analysisQueryResult.createdAt,
      updatedAt: analysisQueryResult.updatedAt,
    });
  }

  private async buildAnalysisDocuments(
    documents: GetGeneralUrbanRetirementAnalysisDocumentQueryResult[],
  ): Promise<GetGeneralUrbanRetirementAnalysisDocumentResponseDto[]> {
    return Promise.all(
      documents.map(async (doc) => {
        const buffer = await this.fileProcessorGateway.getFileBuffer(
          doc.document,
        );
        const originalFileName =
          await this.fileProcessorGateway.getOriginalFileName(doc.document);
        return GetGeneralUrbanRetirementAnalysisDocumentResponseDto.build({
          id: doc.id,
          type: doc.type,
          document: Base64.encodeBuffer(buffer),
          originalFileName,
          createdAt: doc.createdAt,
          updatedAt: doc.updatedAt,
        });
      }),
    );
  }

  private async buildPeriodDocuments(
    documents: GetGeneralUrbanRetirementAnalysisPeriodDocumentQueryResult[],
  ): Promise<GetGeneralUrbanRetirementAnalysisPeriodDocumentResponseDto[]> {
    return Promise.all(
      documents.map(async (doc) => {
        const buffer = await this.fileProcessorGateway.getFileBuffer(
          doc.document,
        );
        const originalFileName =
          await this.fileProcessorGateway.getOriginalFileName(doc.document);
        return GetGeneralUrbanRetirementAnalysisPeriodDocumentResponseDto.build(
          {
            type: doc.documentType,
            document: Base64.encodeBuffer(buffer),
            originalFileName,
          },
        );
      }),
    );
  }
}

/**
 * Parseia o campo generalUrbanRetirementSimplifiedAnalysis que pode vir como
 * JSON ou como texto puro (ex.: narrativa da IA). Retorna objeto em ambos os casos.
 */
function parseGeneralUrbanRetirementSimplifiedAnalysis(
  value: string | null,
): object | null {
  if (value === null) {
    return null;
  }
  try {
    const parsed = JSON.parse(value) as object | null;
    return typeof parsed === 'object' && parsed !== null
      ? parsed
      : { text: value };
  } catch {
    return { text: value };
  }
}
