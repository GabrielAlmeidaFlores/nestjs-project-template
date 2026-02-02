import { Inject, Injectable } from '@nestjs/common';

import { Base64 } from '@core/domain/schema/value-object/base64/base64.value-object';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { SpecialActivityId } from '@module/customer/analysis-tool/domain/schema/entity/special-activity/value-object/special-activity-id.value-object';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { SpecialActivityAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/repository/special-activity-analysis/query/special-activity-analysis.query.repository.gateway';
import {
  GetSpecialActivityAnalysisResponseDto,
  GetSpecialActivityResultResponseDto,
  GetSpecialActivityClientResponseDto,
  GetSpecialActivityDocumentResponseDto,
} from '@module/customer/analysis-tool/module/special-activity-analysis/dto/response/get-special-activity-analysis.response.dto';
import { SpecialActivityAnalysisNotFoundError } from '@module/customer/analysis-tool/module/special-activity-analysis/error/special-activity-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetSpecialActivityAnalysisByIdUseCase {
  protected readonly _type = GetSpecialActivityAnalysisByIdUseCase.name;

  public constructor(
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(SpecialActivityAnalysisQueryRepositoryGateway)
    private readonly specialActivityQueryRepositoryGateway: SpecialActivityAnalysisQueryRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    specialActivityId: SpecialActivityId,
  ): Promise<GetSpecialActivityAnalysisResponseDto> {
    const specialActivityQueryResult =
      await this.specialActivityQueryRepositoryGateway.findOneBySpecialActivityIdAndOrganizationIdWithRelationsOrFail(
        specialActivityId,
        organizationSessionData.organizationId,
        SpecialActivityAnalysisNotFoundError,
      );

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsBySpecialActivityIdAndOrganizationIdAndAuthIdentityIdOrFail(
        specialActivityId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        SpecialActivityAnalysisNotFoundError,
      );

    const documents = await Promise.all(
      specialActivityQueryResult.specialActivityDocuments.map(async (doc) => {
        const document = await this.fileProcessorGateway.getFileBuffer(
          doc.document,
        );
        const originalFileName =
          await this.fileProcessorGateway.getOriginalFileName(doc.document);
        return GetSpecialActivityDocumentResponseDto.build({
          id: doc.id,
          document: Base64.encodeBuffer(document),
          documentOriginalFileName: originalFileName,
          type: doc.type,
          createdAt: doc.createdAt,
          updatedAt: doc.updatedAt,
        });
      }),
    );

    const parsedSpecialActivityCompleteAnalysis =
      specialActivityQueryResult.specialActivityResult
        ?.specialActivityCompleteAnalysis !== null &&
      specialActivityQueryResult.specialActivityResult
        ?.specialActivityCompleteAnalysis !== undefined
        ? (JSON.parse(
            specialActivityQueryResult.specialActivityResult
              .specialActivityCompleteAnalysis,
          ) as object)
        : null;

    const parsedSpecialActivitySimplifiedAnalysis =
      specialActivityQueryResult.specialActivityResult
        ?.specialActivitySimplifiedAnalysis !== null &&
      specialActivityQueryResult.specialActivityResult
        ?.specialActivitySimplifiedAnalysis !== undefined
        ? (JSON.parse(
            specialActivityQueryResult.specialActivityResult
              .specialActivitySimplifiedAnalysis,
          ) as object)
        : null;

    return GetSpecialActivityAnalysisResponseDto.build({
      id: specialActivityQueryResult.id,
      documents,
      status: analysisToolRecordQueryResult.status,
      analysisToolClient: GetSpecialActivityClientResponseDto.build({
        id: analysisToolRecordQueryResult.analysisToolClient.id,
        name: analysisToolRecordQueryResult.analysisToolClient.name,
        federalDocument:
          analysisToolRecordQueryResult.analysisToolClient.federalDocument,
        email: analysisToolRecordQueryResult.analysisToolClient.email,
        phoneNumber:
          analysisToolRecordQueryResult.analysisToolClient.phoneNumber,
        birthDate: analysisToolRecordQueryResult.analysisToolClient.birthDate,
        gender: analysisToolRecordQueryResult.analysisToolClient.gender,
        clientType: analysisToolRecordQueryResult.analysisToolClient.clientType,
      }),
      legalProceedingNumber:
        specialActivityQueryResult.specialActivityLegalProceeding.map(
          (lp) => lp.legalProceedingNumber,
        ),
      inssBenefitNumber:
        specialActivityQueryResult.specialActivityInssBenefit.map(
          (ib) => ib.inssBenefitNumber,
        ),
      specialActivityResult: specialActivityQueryResult.specialActivityResult
        ? GetSpecialActivityResultResponseDto.build({
            specialActivityCompleteAnalysis:
              parsedSpecialActivityCompleteAnalysis,
            specialActivitySimplifiedAnalysis:
              parsedSpecialActivitySimplifiedAnalysis,
            createdAt:
              specialActivityQueryResult.specialActivityResult.createdAt,
            updatedAt:
              specialActivityQueryResult.specialActivityResult.updatedAt,
          })
        : null,
      createdAt: analysisToolRecordQueryResult.createdAt,
      updatedAt: analysisToolRecordQueryResult.updatedAt,
    });
  }
}
