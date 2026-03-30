import { Inject, Injectable } from '@nestjs/common';

import { Base64 } from '@core/domain/schema/value-object/base64/base64.value-object';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { SpecialRetirementGrantId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/value-object/special-retirement-grant-id/special-retirement-grant-id.value-object';
import { SpecialRetirementGrantDocumentId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-document/value-object/special-retirement-grant-document-id/special-retirement-grant-document-id.value-object';
import {
  GetSpecialRetirementGrantClientResponseDto,
  GetSpecialRetirementGrantDocumentResponseDto,
  GetSpecialRetirementGrantResponseDto,
  GetSpecialRetirementGrantResultResponseDto,
} from '@module/customer/analysis-tool/module/special-retirement-grant/dto/response/get-special-retirement-grant.response.dto';
import { InvalidSpecialRetirementGrantCompleteAnalysisJsonError } from '@module/customer/analysis-tool/module/special-retirement-grant/error/invalid-special-retirement-grant-complete-analysis-json.error';
import { SpecialRetirementGrantNotFoundError } from '@module/customer/analysis-tool/module/special-retirement-grant/error/special-retirement-grant-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetSpecialRetirementGrantUseCase {
  protected readonly _type = GetSpecialRetirementGrantUseCase.name;

  public constructor(
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    specialRetirementGrantId: SpecialRetirementGrantId,
  ): Promise<GetSpecialRetirementGrantResponseDto> {
    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsBySpecialRetirementGrantIdAndOrganizationIdAndAuthIdentityIdOrFail(
        specialRetirementGrantId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        SpecialRetirementGrantNotFoundError,
      );

    const specialRetirementGrant = analysisToolRecordQueryResult.specialRetirementGrant;

    if (specialRetirementGrant === null) {
      throw new SpecialRetirementGrantNotFoundError();
    }

    const cnisBuffer = await this.fileProcessorGateway.getFileBuffer(
      specialRetirementGrant.cnisDocument,
    );
    const cnisOriginalName = await this.fileProcessorGateway.getOriginalFileName(
      specialRetirementGrant.cnisDocument,
    );

    const documents = await Promise.all(
      specialRetirementGrant.specialRetirementGrantDocument.map(async (doc) => {
        const buffer = await this.fileProcessorGateway.getFileBuffer(doc.document);
        const originalFileName = await this.fileProcessorGateway.getOriginalFileName(
          doc.document,
        );
        return GetSpecialRetirementGrantDocumentResponseDto.build({
          id: new SpecialRetirementGrantDocumentId(doc.id.toString()),
          document: Base64.encodeBuffer(buffer),
          documentOriginalFileName: originalFileName,
          type: doc.type,
          createdAt: doc.createdAt,
          updatedAt: doc.updatedAt,
        });
      }),
    );

    const completeRaw =
      specialRetirementGrant.specialRetirementGrantResult
        ?.specialRetirementGrantCompleteAnalysis ?? null;
    const simplifiedRaw =
      specialRetirementGrant.specialRetirementGrantResult
        ?.specialRetirementGrantSimplifiedAnalysis ?? null;

    const parsedComplete: Record<string, unknown> | null =
      completeRaw !== null && completeRaw !== undefined
        ? (this.safeJsonParseOrThrow(completeRaw) as Record<string, unknown>)
        : null;

    if (
      parsedComplete !== null &&
      typeof parsedComplete['analysisResult'] === 'string'
    ) {
      parsedComplete['analysisResult'] =
        await this.exportDocumentGateway.convertMarkdownToHtml(
          parsedComplete['analysisResult'],
        );
    }

    const parsedSimplified: object | null =
      simplifiedRaw !== null && simplifiedRaw !== undefined
        ? (this.safeJsonParseOrThrow(simplifiedRaw) as object)
        : null;

    return GetSpecialRetirementGrantResponseDto.build({
      id: specialRetirementGrant.id,
      name: specialRetirementGrant.name,
      specialActivity: specialRetirementGrant.specialActivity,
      cnisDocument: Base64.encodeBuffer(cnisBuffer),
      cnisDocumentOriginalFileName: cnisOriginalName,
      documents,
      status: analysisToolRecordQueryResult.status,
      analysisToolClient: GetSpecialRetirementGrantClientResponseDto.build({
        id: analysisToolRecordQueryResult.analysisToolClient.id,
        name: analysisToolRecordQueryResult.analysisToolClient.name,
        federalDocument: analysisToolRecordQueryResult.analysisToolClient.federalDocument,
        email: analysisToolRecordQueryResult.analysisToolClient.email,
        phoneNumber: analysisToolRecordQueryResult.analysisToolClient.phoneNumber,
        birthDate: analysisToolRecordQueryResult.analysisToolClient.birthDate,
        gender: analysisToolRecordQueryResult.analysisToolClient.gender,
        clientType: analysisToolRecordQueryResult.analysisToolClient.clientType,
      }),
      legalProceedingNumber: specialRetirementGrant.specialRetirementGrantLegalProceeding.map(
        (lp) => lp.legalProceedingNumber,
      ),
      inssBenefitNumber: specialRetirementGrant.specialRetirementGrantBenefit.map(
        (b) => b.inssBenefitNumber,
      ),
      specialRetirementGrantResult: specialRetirementGrant.specialRetirementGrantResult
        ? GetSpecialRetirementGrantResultResponseDto.build({
            specialRetirementGrantCompleteAnalysis: parsedComplete,
            specialRetirementGrantSimplifiedAnalysis: parsedSimplified,
            createdAt: specialRetirementGrant.specialRetirementGrantResult.createdAt,
            updatedAt: specialRetirementGrant.specialRetirementGrantResult.updatedAt,
          })
        : null,
      createdAt: analysisToolRecordQueryResult.createdAt,
      updatedAt: analysisToolRecordQueryResult.updatedAt,
    });
  }

  private safeJsonParseOrThrow(value: string): unknown {
    try {
      return JSON.parse(value) as unknown;
    } catch {
      throw new InvalidSpecialRetirementGrantCompleteAnalysisJsonError();
    }
  }
}

