import { Inject, Injectable } from '@nestjs/common';

import { Base64 } from '@core/domain/schema/value-object/base64/base64.value-object';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { BpcElderlyAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/repository/bpc-elderly-analysis/query/bpc-elderly-analysis.query.repository.gateway';
import { GetBpcElderlyAnalysisDocumentQueryResult } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/repository/bpc-elderly-analysis/query/result/get-bpc-elderly-analysis-document.query.result';
import { GetBpcElderlyAnalysisFamilyMemberDocumentQueryResult } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/repository/bpc-elderly-analysis/query/result/get-bpc-elderly-analysis-family-member-document.query.result';
import { GetBpcElderlyAnalysisFamilyMemberQueryResult } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/repository/bpc-elderly-analysis/query/result/get-bpc-elderly-analysis-family-member.query.result';
import { BpcElderlyAnalysisId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis/value-object/bpc-elderly-analysis-id/bpc-elderly-analysis-id.value-object';
import {
  GetBpcElderlyAnalysisResponseDto,
  GetBpcElderlyAnalysisClientResponseDto,
  GetBpcElderlyAnalysisResultResponseDto,
  GetBpcElderlyAnalysisResponsibleResponseDto,
  GetBpcElderlyAnalysisDocumentResponseDto,
  GetBpcElderlyAnalysisFamilyMemberResponseDto,
  GetBpcElderlyAnalysisFamilyMemberDocumentResponseDto,
} from '@module/customer/analysis-tool/module/bpc-elderly-analysis/dto/response/get-bpc-elderly-analysis.response.dto';
import { BpcElderlyAnalysisNotFoundError } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/error/bpc-elderly-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetBpcElderlyAnalysisUseCase {
  protected readonly _type = GetBpcElderlyAnalysisUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(BpcElderlyAnalysisQueryRepositoryGateway)
    private readonly bpcElderlyAnalysisQueryRepositoryGateway: BpcElderlyAnalysisQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    bpcElderlyAnalysisId: BpcElderlyAnalysisId,
  ): Promise<GetBpcElderlyAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByBpcElderlyAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
        bpcElderlyAnalysisId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        BpcElderlyAnalysisNotFoundError,
      );

    const bpcElderlyAnalysisQueryResult =
      await this.bpcElderlyAnalysisQueryRepositoryGateway.findOneByBpcElderlyAnalysisIdAndOrganizationIdOrFail(
        bpcElderlyAnalysisId,
        organizationSessionData.organizationId,
        BpcElderlyAnalysisNotFoundError,
      );

    const familyMembers = await Promise.all(
      bpcElderlyAnalysisQueryResult.bpcElderlyAnalysisFamilyMember.map(
        async (familyMember: GetBpcElderlyAnalysisFamilyMemberQueryResult) => {
          const documents = await Promise.all(
            familyMember.bpcElderlyAnalysisFamilyMemberDocument.map(
              async (
                doc: GetBpcElderlyAnalysisFamilyMemberDocumentQueryResult,
              ) => {
                const document = await this.fileProcessorGateway.getFileBuffer(
                  doc.document,
                );

                const originalFileName =
                  await this.fileProcessorGateway.getOriginalFileName(
                    doc.document,
                  );

                return GetBpcElderlyAnalysisFamilyMemberDocumentResponseDto.build(
                  {
                    document: Base64.encodeBuffer(document).toString(),
                    originalFileName: originalFileName.toString(),
                    type: doc.type,
                  },
                );
              },
            ),
          );

          return GetBpcElderlyAnalysisFamilyMemberResponseDto.build({
            fullName: familyMember.fullName,
            birthDate: familyMember.birthDate,
            kinship: familyMember.kinship,
            livesInSameResidence: familyMember.livesInSameResidence,
            hasIncome: familyMember.hasIncome,
            ...(familyMember.monthlyIncomeAmount !== null && {
              monthlyIncomeAmount: familyMember.monthlyIncomeAmount,
            }),
            ...(familyMember.incomeType !== null && {
              incomeType: familyMember.incomeType,
            }),
            documents,
          });
        },
      ),
    );

    const response = GetBpcElderlyAnalysisResponseDto.build({
      id: bpcElderlyAnalysisQueryResult.id,
      status: analysisToolRecordQueryResult.status,
      updatedAt: analysisToolRecordQueryResult.updatedAt,
      createdAt: analysisToolRecordQueryResult.createdAt,
      analysisToolClient: GetBpcElderlyAnalysisClientResponseDto.build({
        ...analysisToolRecordQueryResult.analysisToolClient,
      }),
      ...(bpcElderlyAnalysisQueryResult.bpcElderlyAnalysisResult !== null && {
        bpcElderlyAnalysisResult: GetBpcElderlyAnalysisResultResponseDto.build({
          ...bpcElderlyAnalysisQueryResult.bpcElderlyAnalysisResult,
          ...(bpcElderlyAnalysisQueryResult.bpcElderlyAnalysisResult
            .completeAnalysis !== null && {
            completeAnalysis:
              bpcElderlyAnalysisQueryResult.bpcElderlyAnalysisResult
                .completeAnalysis,
          }),
        }),
      }),
      familyMembers,
      createdBy: GetBpcElderlyAnalysisResponsibleResponseDto.build({
        ...analysisToolRecordQueryResult.createdBy.customer,
      }),
      updatedBy: GetBpcElderlyAnalysisResponsibleResponseDto.build({
        ...analysisToolRecordQueryResult.updatedBy.customer,
      }),
    });

    if (bpcElderlyAnalysisQueryResult.bpcElderlyAnalysisDocument.length > 0) {
      const documents = await Promise.all(
        bpcElderlyAnalysisQueryResult.bpcElderlyAnalysisDocument.map(
          async (document: GetBpcElderlyAnalysisDocumentQueryResult) => {
            const url = await this.fileProcessorGateway.getFileSignedUrl(
              document.document,
            );

            const originalFileName =
              await this.fileProcessorGateway.getOriginalFileName(
                document.document,
              );

            return GetBpcElderlyAnalysisDocumentResponseDto.build({
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
