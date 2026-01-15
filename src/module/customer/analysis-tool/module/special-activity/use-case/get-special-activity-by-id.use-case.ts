import { Inject, Injectable } from '@nestjs/common';

import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { SpecialActivityId } from '@module/customer/analysis-tool/domain/schema/entity/special-activity/value-object/special-activity-id.value-object';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { SpecialActivityQueryRepositoryGateway } from '@module/customer/analysis-tool/module/special-activity/domain/repository/special-activity/query/special-activity.query.repository.gateway';
import {
  GetSpecialActivityResponseDto,
  GetSpecialActivityResultResponseDto,
  GetSpecialActivityClientResponseDto,
  GetSpecialActivityDocumentResponseDto,
} from '@module/customer/analysis-tool/module/special-activity/dto/response/get-special-activity.response.dto';
import { SpecialActivityNotFoundError } from '@module/customer/analysis-tool/module/special-activity/error/special-activity-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetSpecialActivityByIdUseCase {
  protected readonly _type = GetSpecialActivityByIdUseCase.name;

  public constructor(
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(SpecialActivityQueryRepositoryGateway)
    private readonly specialActivityQueryRepositoryGateway: SpecialActivityQueryRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    specialActivityId: SpecialActivityId,
  ): Promise<GetSpecialActivityResponseDto> {
    const specialActivityQueryResult =
      await this.specialActivityQueryRepositoryGateway.findOneBySpecialActivityIdAndOrganizationIdWithRelationsOrFail(
        specialActivityId,
        organizationSessionData.organizationId,
        SpecialActivityNotFoundError,
      );

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsBySpecialActivityIdAndOrganizationIdAndAuthIdentityIdOrFail(
        specialActivityId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        SpecialActivityNotFoundError,
      );

    const documents = await Promise.all(
      specialActivityQueryResult.specialActivityDocuments.map(async (doc) => {
        const originalFileName =
          await this.fileProcessorGateway.getOriginalFileName(doc.document);
        return GetSpecialActivityDocumentResponseDto.build({
          id: doc.id,
          document: doc.document,
          documentOriginalFileName: originalFileName,
          type: doc.type,
          createdAt: doc.createdAt,
          updatedAt: doc.updatedAt,
        });
      }),
    );

    return GetSpecialActivityResponseDto.build({
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
            specialActivityCompleteAnalysis: specialActivityQueryResult
              .specialActivityResult.specialActivityCompleteAnalysis
              ? JSON.parse(
                  specialActivityQueryResult.specialActivityResult
                    .specialActivityCompleteAnalysis,
                )
              : undefined,
            specialActivitySimplifiedAnalysis: specialActivityQueryResult
              .specialActivityResult.specialActivitySimplifiedAnalysis
              ? JSON.parse(
                  specialActivityQueryResult.specialActivityResult
                    .specialActivitySimplifiedAnalysis,
                )
              : undefined,
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
