import { Injectable, Inject } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { AdministrativeProcedureInssAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/repository/administrative-procedure-inss-analysis/query/administrative-procedure-inss-analysis.query.repository.gateway';
import { AdministrativeProcedureInssAnalysisId } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis/value-object/administrative-procedure-inss-analysis-id/administrative-procedure-inss-analysis-id.value-object';
import {
  GetAdministrativeProcedureInssAnalysisResponseDto,
  GetAdministrativeProcedureInssAnalysisClientResponseDto,
  GetAdministrativeProcedureInssAnalysisResultResponseDto,
  GetAdministrativeProcedureInssAnalysisResponsibleResponseDto,
  GetAdministrativeProcedureInssAnalysisDocumentResponseDto,
} from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/dto/response/get-administrative-procedure-inss-analysis.response.dto';
import { AdministrativeProcedureInssAnalysisNotFoundError } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/error/administrative-procedure-inss-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetAdministrativeProcedureInssAnalysisUseCase {
  protected readonly _type = GetAdministrativeProcedureInssAnalysisUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AdministrativeProcedureInssAnalysisQueryRepositoryGateway)
    private readonly administrativeProcedureInssAnalysisQueryRepositoryGateway: AdministrativeProcedureInssAnalysisQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    administrativeProcedureInssAnalysisId: AdministrativeProcedureInssAnalysisId,
  ): Promise<GetAdministrativeProcedureInssAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByAdministrativeProcedureInssAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
        administrativeProcedureInssAnalysisId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        AdministrativeProcedureInssAnalysisNotFoundError,
      );

    const administrativeProcedureInssAnalysisQueryResult =
      await this.administrativeProcedureInssAnalysisQueryRepositoryGateway.findOneByAdministrativeProcedureInssAnalysisIdAndOrganizationIdOrFail(
        administrativeProcedureInssAnalysisId,
        organizationSessionData.organizationId,
        AdministrativeProcedureInssAnalysisNotFoundError,
      );

    const response = GetAdministrativeProcedureInssAnalysisResponseDto.build({
      ...administrativeProcedureInssAnalysisQueryResult,
      status: analysisToolRecordQueryResult.status,
      updatedAt: analysisToolRecordQueryResult.updatedAt,
      createdAt: analysisToolRecordQueryResult.createdAt,
      analysisToolClient:
        GetAdministrativeProcedureInssAnalysisClientResponseDto.build({
          ...analysisToolRecordQueryResult.analysisToolClient,
        }),
      legalProceedingNumber:
        administrativeProcedureInssAnalysisQueryResult.administrativeProcedureInssAnalysisLegalProceeding.map(
          (t) => t.legalProceedingNumber,
        ),
      inssBenefitNumber:
        administrativeProcedureInssAnalysisQueryResult.administrativeProcedureInssAnalysisBenefit.map(
          (t) => t.inssBenefitNumber,
        ),
      administrativeProcedureInssAnalysisResult:
        administrativeProcedureInssAnalysisQueryResult.administrativeProcedureInssAnalysisResult !==
        null
          ? GetAdministrativeProcedureInssAnalysisResultResponseDto.build({
              ...administrativeProcedureInssAnalysisQueryResult.administrativeProcedureInssAnalysisResult,
            })
          : null,
      createdBy:
        GetAdministrativeProcedureInssAnalysisResponsibleResponseDto.build({
          ...analysisToolRecordQueryResult.createdBy.customer,
        }),
      updatedBy:
        GetAdministrativeProcedureInssAnalysisResponsibleResponseDto.build({
          ...analysisToolRecordQueryResult.updatedBy.customer,
        }),
    });

    if (
      administrativeProcedureInssAnalysisQueryResult
        .administrativeProcedureInssAnalysisDocument.length > 0
    ) {
      {
        const administrativeProcedureDocuments = await Promise.all(
          administrativeProcedureInssAnalysisQueryResult.administrativeProcedureInssAnalysisDocument.map(
            async (document) => {
              const url = await this.fileProcessorGateway.getFileSignedUrl(
                document.document,
              );

              const originalFileName =
                await this.fileProcessorGateway.getOriginalFileName(
                  document.document,
                );

              return {
                url,
                originalFileName,
              };
            },
          ),
        );

        response.administrativeProcedureDocuments =
          administrativeProcedureDocuments.map((document) =>
            GetAdministrativeProcedureInssAnalysisDocumentResponseDto.build({
              url: document.url.toString(),
              originalFileName: document.originalFileName.toString(),
            }),
          );
      }
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
