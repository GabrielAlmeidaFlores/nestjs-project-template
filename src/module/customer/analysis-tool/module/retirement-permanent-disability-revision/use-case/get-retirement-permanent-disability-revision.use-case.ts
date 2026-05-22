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
  GetRetirementPermanentDisabilityRevisionWorkPeriodResponseDto,
  GetRetirementPermanentDisabilityRevisionConcessionLetterBreakdownResponseDto,
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
      ...(analysisQueryResult.analysisName !== null && {
        analysisName: analysisQueryResult.analysisName,
      }),
      ...(analysisQueryResult.category !== null && {
        category: analysisQueryResult.category,
      }),
      ...(analysisQueryResult.myInssPassword !== null && {
        myInssPassword: analysisQueryResult.myInssPassword,
      }),
      analysisToolClient:
        GetRetirementPermanentDisabilityRevisionClientResponseDto.build({
          id: analysisToolRecordQueryResult.analysisToolClient.id,
          ...(analysisToolRecordQueryResult.analysisToolClient.name !==
            null && {
            name: analysisToolRecordQueryResult.analysisToolClient.name,
          }),
          ...(analysisToolRecordQueryResult.analysisToolClient
            .federalDocument !== null && {
            federalDocument:
              analysisToolRecordQueryResult.analysisToolClient.federalDocument,
          }),
          ...(analysisToolRecordQueryResult.analysisToolClient.email !==
            null && {
            email: analysisToolRecordQueryResult.analysisToolClient.email,
          }),
          ...(analysisToolRecordQueryResult.analysisToolClient.phoneNumber !==
            null && {
            phoneNumber:
              analysisToolRecordQueryResult.analysisToolClient.phoneNumber,
          }),
          ...(analysisToolRecordQueryResult.analysisToolClient.birthDate !==
            null && {
            birthDate:
              analysisToolRecordQueryResult.analysisToolClient.birthDate,
          }),
          ...(analysisToolRecordQueryResult.analysisToolClient.gender !==
            null && {
            gender: analysisToolRecordQueryResult.analysisToolClient.gender,
          }),
          ...(analysisToolRecordQueryResult.analysisToolClient.clientType !==
            null && {
            clientType:
              analysisToolRecordQueryResult.analysisToolClient.clientType,
          }),
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
      ...(analysisQueryResult.retirementPermanentDisabilityRevisionWorkPeriods
        .length > 0 && {
        workPeriods:
          analysisQueryResult.retirementPermanentDisabilityRevisionWorkPeriods.map(
            (wp) =>
              GetRetirementPermanentDisabilityRevisionWorkPeriodResponseDto.build(
                {
                  retirementPermanentDisabilityRevisionWorkPeriodsId:
                    wp.retirementPermanentDisabilityRevisionWorkPeriodsId,
                  bondOrigin: wp.bondOrigin,
                  startDate: wp.startDate,
                  ...(wp.endDate !== null && { endDate: wp.endDate }),
                  category: wp.category,
                  competenceBelowTheMinimum: wp.competenceBelowTheMinimum,
                  ...(wp.pendencyReason !== null && {
                    pendencyReason: wp.pendencyReason,
                  }),
                  ...(wp.periodConsideration !== null && {
                    periodConsideration: wp.periodConsideration,
                  }),
                  ...(wp.contributionAverage !== null && {
                    contributionAverage: wp.contributionAverage,
                  }),
                  status: wp.status,
                  gracePeriod: wp.gracePeriod,
                  createdAt: wp.createdAt,
                  updatedAt: wp.updatedAt,
                },
              ),
          ),
      }),
      ...(analysisQueryResult.concessionLetterBreakdown.length > 0 && {
        concessionLetterBreakdown:
          analysisQueryResult.concessionLetterBreakdown.map((clb) =>
            GetRetirementPermanentDisabilityRevisionConcessionLetterBreakdownResponseDto.build(
              {
                retirementPermanentDisabilityRevisionConcessionLetterBreakdownId:
                  clb.id,
                competence: clb.competence,
                amount: clb.amount,
                reasonNotConsidered: clb.reasonNotConsidered,
                action: clb.action,
                createdAt: clb.createdAt,
                updatedAt: clb.updatedAt,
              },
            ),
          ),
      }),
      ...(analysisQueryResult.result !== null && {
        retirementPermanentDisabilityRevisionResult:
          GetRetirementPermanentDisabilityRevisionResultResponseDto.build({
            createdAt: analysisQueryResult.result.createdAt,
            updatedAt: analysisQueryResult.result.updatedAt,
            ...(analysisQueryResult.result
              .retirementPermanentDisabilityRevisionFirstAnalysis !== null && {
              retirementPermanentDisabilityRevisionFirstAnalysis:
                analysisQueryResult.result
                  .retirementPermanentDisabilityRevisionFirstAnalysis,
            }),
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
          id: analysisToolRecordQueryResult.createdBy.customer.id,
          name: analysisToolRecordQueryResult.createdBy.customer.name,
        }),
      updatedBy:
        GetRetirementPermanentDisabilityRevisionResponsibleResponseDto.build({
          id: analysisToolRecordQueryResult.updatedBy.customer.id,
          name: analysisToolRecordQueryResult.updatedBy.customer.name,
        }),
    });

    if (analysisQueryResult.document.length > 0) {
      const documents = await Promise.all(
        analysisQueryResult.document.map(async (doc) => {
          const buffer = await this.fileProcessorGateway.getFileBuffer(
            doc.document,
          );
          const originalFileName =
            await this.fileProcessorGateway.getOriginalFileName(doc.document);

          return {
            base64: buffer.toString('base64'),
            originalFileName,
            type: doc.type,
          };
        }),
      );

      response.documents = documents.map((doc) =>
        GetRetirementPermanentDisabilityRevisionDocumentResponseDto.build({
          base64: doc.base64,
          originalFileName: doc.originalFileName.toString(),
          type: doc.type,
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
