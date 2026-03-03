import { Injectable, Inject } from '@nestjs/common';

import { Base64 } from '@core/domain/schema/value-object/base64/base64.value-object';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { PerCapitaIncomeForBpcAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis/query/per-capita-income-for-bpc-analysis.query.repository.gateway';
import { PerCapitaIncomeForBpcAnalysisId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis/value-object/per-capita-income-for-bpc-analysis-id/per-capita-income-for-bpc-analysis-id.value-object';
import {
  GetPerCapitaIncomeForBpcAnalysisResponseDto,
  GetPerCapitaIncomeForBpcAnalysisClientResponseDto,
  GetPerCapitaIncomeForBpcAnalysisResultResponseDto,
  GetPerCapitaIncomeForBpcAnalysisResponsibleResponseDto,
  GetPerCapitaIncomeForBpcAnalysisDocumentResponseDto,
  GetPerCapitaIncomeForBpcAnalysisFamilyMemberResponseDto,
  GetPerCapitaIncomeForBpcAnalysisFamilyMemberDocumentResponseDto,
} from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/dto/response/get-per-capita-income-for-bpc-analysis.response.dto';
import { PerCapitaIncomeForBpcAnalysisNotFoundError } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/error/per-capita-income-for-bpc-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetPerCapitaIncomeForBpcAnalysisUseCase {
  protected readonly _type = GetPerCapitaIncomeForBpcAnalysisUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(PerCapitaIncomeForBpcAnalysisQueryRepositoryGateway)
    private readonly perCapitaIncomeForBpcAnalysisQueryRepositoryGateway: PerCapitaIncomeForBpcAnalysisQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    perCapitaIncomeForBpcAnalysisId: PerCapitaIncomeForBpcAnalysisId,
  ): Promise<GetPerCapitaIncomeForBpcAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByPerCapitaIncomeForBpcAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
        perCapitaIncomeForBpcAnalysisId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        PerCapitaIncomeForBpcAnalysisNotFoundError,
      );

    const perCapitaIncomeForBpcAnalysisQueryResult =
      await this.perCapitaIncomeForBpcAnalysisQueryRepositoryGateway.findOneByPerCapitaIncomeForBpcAnalysisIdAndOrganizationIdOrFail(
        perCapitaIncomeForBpcAnalysisId,
        organizationSessionData.organizationId,
        PerCapitaIncomeForBpcAnalysisNotFoundError,
      );

    const familyMembers = await Promise.all(
      perCapitaIncomeForBpcAnalysisQueryResult.perCapitaIncomeForBpcAnalysisFamilyMember.map(
        async (familyMember) => {
          const documents = await Promise.all(
            familyMember.perCapitaIncomeForBpcAnalysisFamilyMemberDocument.map(
              async (doc) => {
                const document = await this.fileProcessorGateway.getFileBuffer(
                  doc.document,
                );

                const originalFileName =
                  await this.fileProcessorGateway.getOriginalFileName(
                    doc.document,
                  );

                return GetPerCapitaIncomeForBpcAnalysisFamilyMemberDocumentResponseDto.build(
                  {
                    document: Base64.encodeBuffer(document).toString(),
                    originalFileName: originalFileName.toString(),
                    type: doc.type,
                  },
                );
              },
            ),
          );

          return GetPerCapitaIncomeForBpcAnalysisFamilyMemberResponseDto.build({
            fullName: familyMember.fullName,
            birthDate: familyMember.birthDate,
            kinship: familyMember.kinship,
            livesInSameResidence: familyMember.livesInSameResidence,
            hasIncome: familyMember.hasIncome,
            monthlyIncomeAmount: familyMember.monthlyIncomeAmount,
            incomeType: familyMember.incomeType,
            documents,
          });
        },
      ),
    );

    const response = GetPerCapitaIncomeForBpcAnalysisResponseDto.build({
      id: perCapitaIncomeForBpcAnalysisQueryResult.id,
      status: analysisToolRecordQueryResult.status,
      updatedAt: analysisToolRecordQueryResult.updatedAt,
      createdAt: analysisToolRecordQueryResult.createdAt,
      analysisToolClient:
        GetPerCapitaIncomeForBpcAnalysisClientResponseDto.build({
          ...analysisToolRecordQueryResult.analysisToolClient,
        }),
      legalProceedingNumber:
        perCapitaIncomeForBpcAnalysisQueryResult.perCapitaIncomeForBpcAnalysisLegalProceeding.map(
          (t) => t.legalProceedingNumber,
        ),
      inssBenefitNumber:
        perCapitaIncomeForBpcAnalysisQueryResult.perCapitaIncomeForBpcAnalysisBenefit.map(
          (t) => t.inssBenefitNumber,
        ),
      perCapitaIncomeForBpcAnalysisResult:
        perCapitaIncomeForBpcAnalysisQueryResult.perCapitaIncomeForBpcAnalysisResult !==
        null
          ? GetPerCapitaIncomeForBpcAnalysisResultResponseDto.build({
              ...perCapitaIncomeForBpcAnalysisQueryResult.perCapitaIncomeForBpcAnalysisResult,
            })
          : null,
      familyMembers,
      createdBy: GetPerCapitaIncomeForBpcAnalysisResponsibleResponseDto.build({
        ...analysisToolRecordQueryResult.createdBy.customer,
      }),
      updatedBy: GetPerCapitaIncomeForBpcAnalysisResponsibleResponseDto.build({
        ...analysisToolRecordQueryResult.updatedBy.customer,
      }),
    });

    if (
      perCapitaIncomeForBpcAnalysisQueryResult
        .perCapitaIncomeForBpcAnalysisDocument.length > 0
    ) {
      const documents = await Promise.all(
        perCapitaIncomeForBpcAnalysisQueryResult.perCapitaIncomeForBpcAnalysisDocument.map(
          async (document) => {
            const url = await this.fileProcessorGateway.getFileSignedUrl(
              document.document,
            );

            const originalFileName =
              await this.fileProcessorGateway.getOriginalFileName(
                document.document,
              );

            return GetPerCapitaIncomeForBpcAnalysisDocumentResponseDto.build({
              url: url.toString(),
              originalFileName: originalFileName.toString(),
              type: document.type,
            });
          },
        ),
      );

      response.documents = documents;
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
