import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { RetirementPermanentDisabilityRevisionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision/query/retirement-permanent-disability-revision.query.repository.gateway';
import { RetirementPermanentDisabilityRevisionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/value-object/retirement-permanent-disability-revision-id.value-object';
import {
  GetRetirementPermanentDisabilityRevisionResponseDto,
  GetRetirementPermanentDisabilityRevisionClientResponseDto,
  GetRetirementPermanentDisabilityRevisionResultResponseDto,
  GetRetirementPermanentDisabilityRevisionResponsibleResponseDto,
  GetRetirementPermanentDisabilityRevisionDocumentResponseDto,
} from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/dto/response/get-retirement-permanent-disability-revision.response.dto';
import { RetirementPermanentDisabilityRevisionNotFoundError } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/error/retirement-permanent-disability-revision-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetRetirementPermanentDisabilityRevisionUseCase {
  protected readonly _type =
    GetRetirementPermanentDisabilityRevisionUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(RetirementPermanentDisabilityRevisionQueryRepositoryGateway)
    private readonly retirementPermanentDisabilityRevisionQueryRepositoryGateway: RetirementPermanentDisabilityRevisionQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    retirementPermanentDisabilityRevisionId: RetirementPermanentDisabilityRevisionId,
  ): Promise<GetRetirementPermanentDisabilityRevisionResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByRetirementPermanentDisabilityRevisionIdAndOrganizationIdAndAuthIdentityIdOrFail(
        retirementPermanentDisabilityRevisionId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        RetirementPermanentDisabilityRevisionNotFoundError,
      );

    const analysisQueryResult =
      await this.retirementPermanentDisabilityRevisionQueryRepositoryGateway.findOneByRetirementPermanentDisabilityRevisionIdOrFailWithRelations(
        retirementPermanentDisabilityRevisionId,
        RetirementPermanentDisabilityRevisionNotFoundError,
      );

    const response = GetRetirementPermanentDisabilityRevisionResponseDto.build({
      id: analysisQueryResult.id,
      status: analysisToolRecordQueryResult.status,
      createdAt: analysisToolRecordQueryResult.createdAt,
      updatedAt: analysisToolRecordQueryResult.updatedAt,
      analysisToolClient:
        GetRetirementPermanentDisabilityRevisionClientResponseDto.build({
          ...analysisToolRecordQueryResult.analysisToolClient,
        }),
      ...(analysisQueryResult.legalProceeding.length > 0 && {
        legalProceedingNumber: analysisQueryResult.legalProceeding.map(
          (l) => l.legalProceedingNumber,
        ),
      }),
      ...(analysisQueryResult.benefit.length > 0 && {
        inssBenefitNumber: analysisQueryResult.benefit.map(
          (b) => b.inssBenefitNumber,
        ),
      }),
      ...(analysisQueryResult.result !== null && {
        retirementPermanentDisabilityRevisionResult:
          GetRetirementPermanentDisabilityRevisionResultResponseDto.build({
            createdAt: analysisQueryResult.result.createdAt,
            updatedAt: analysisQueryResult.result.updatedAt,
            ...(analysisQueryResult.result
              .retirementPermanentDisabilityRevisionCompleteAnalysis !==
              null && {
              retirementPermanentDisabilityRevisionCompleteAnalysis:
                analysisQueryResult.result
                  .retirementPermanentDisabilityRevisionCompleteAnalysis,
            }),
            ...(analysisQueryResult.result
              .retirementPermanentDisabilityRevisionSimplifiedAnalysis !==
              null && {
              retirementPermanentDisabilityRevisionSimplifiedAnalysis:
                analysisQueryResult.result
                  .retirementPermanentDisabilityRevisionSimplifiedAnalysis,
            }),
          }),
      }),
      createdBy:
        GetRetirementPermanentDisabilityRevisionResponsibleResponseDto.build({
          ...analysisToolRecordQueryResult.createdBy.customer,
        }),
      updatedBy:
        GetRetirementPermanentDisabilityRevisionResponsibleResponseDto.build({
          ...analysisToolRecordQueryResult.updatedBy.customer,
        }),
    });

    if (analysisQueryResult.document.length > 0) {
      const documents = await Promise.all(
        analysisQueryResult.document.map(async (doc) => {
          const url = await this.fileProcessorGateway.getFileSignedUrl(
            doc.document,
          );
          const originalFileName =
            await this.fileProcessorGateway.getOriginalFileName(doc.document);

          return { url, originalFileName };
        }),
      );

      response.documents = documents.map((doc) =>
        GetRetirementPermanentDisabilityRevisionDocumentResponseDto.build({
          url: doc.url.toString(),
          originalFileName: doc.originalFileName.toString(),
        }),
      );
    }

    if (
      analysisToolRecordQueryResult.createdBy.customer.profilePicture !== null
    ) {
      const profilePicture = await this.fileProcessorGateway.getFileSignedUrl(
        analysisToolRecordQueryResult.createdBy.customer.profilePicture,
      );
      response.createdBy.profilePicture = profilePicture.toString();
    }

    if (
      analysisToolRecordQueryResult.updatedBy.customer.profilePicture !== null
    ) {
      const profilePicture = await this.fileProcessorGateway.getFileSignedUrl(
        analysisToolRecordQueryResult.updatedBy.customer.profilePicture,
      );
      response.updatedBy.profilePicture = profilePicture.toString();
    }

    return response;
  }
}
