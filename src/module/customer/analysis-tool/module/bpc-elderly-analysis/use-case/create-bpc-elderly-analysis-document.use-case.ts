import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisActivityTrackerGateway } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/analysis-activity-tracker.gateway';
import { AnalysisActivityActionEnum } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/enum/analysis-activity-action.enum';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { BpcElderlyAnalysisDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/repository/bpc-elderly-analysis-document/command/bpc-elderly-analysis-document.command.repository.gateway';
import { BpcElderlyAnalysisEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis/bpc-elderly-analysis.entity';
import { BpcElderlyAnalysisId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis/value-object/bpc-elderly-analysis-id/bpc-elderly-analysis-id.value-object';
import { BpcElderlyAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-document/bpc-elderly-analysis-document.entity';
import { BpcElderlyAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-document/enum/bpc-elderly-analysis-document-type.enum';
import { CreateBpcElderlyAnalysisDocumentRequestDto } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/dto/request/create-bpc-elderly-analysis-document.request.dto';
import { CreateBpcElderlyAnalysisDocumentResponseDto } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/dto/response/create-bpc-elderly-analysis-document.response.dto';
import { BpcElderlyAnalysisDocumentRequiredError } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/error/bpc-elderly-analysis-document-required.error';
import { BpcElderlyAnalysisNotFoundError } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/error/bpc-elderly-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class CreateBpcElderlyAnalysisDocumentUseCase {
  protected readonly _type = CreateBpcElderlyAnalysisDocumentUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(BpcElderlyAnalysisDocumentCommandRepositoryGateway)
    private readonly bpcElderlyAnalysisDocumentCommandRepositoryGateway: BpcElderlyAnalysisDocumentCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(AnalysisActivityTrackerGateway)
    private readonly analysisActivityTrackerGateway: AnalysisActivityTrackerGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    bpcElderlyAnalysisId: BpcElderlyAnalysisId,
    dto: CreateBpcElderlyAnalysisDocumentRequestDto,
  ): Promise<CreateBpcElderlyAnalysisDocumentResponseDto> {
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
      analysisToolRecordQueryResult.bpcElderlyAnalysis;

    if (bpcElderlyAnalysisQueryResult === null) {
      throw new BpcElderlyAnalysisNotFoundError();
    }

    const bpcElderlyAnalysis = new BpcElderlyAnalysisEntity({
      id: bpcElderlyAnalysisQueryResult.id,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    const hasCnisDocument = dto.cnisDocument !== undefined;
    const hasCadUnicoDocuments =
      dto.cadUnicoDocuments !== undefined && dto.cadUnicoDocuments.length > 0;

    if (!hasCnisDocument && !hasCadUnicoDocuments) {
      throw new BpcElderlyAnalysisDocumentRequiredError();
    }

    const documentEntities: BpcElderlyAnalysisDocumentEntity[] = [];

    if (hasCnisDocument) {
      const cnisBuffer = Buffer.from(
        dto.cnisDocument.base64.toString(),
        'base64',
      );

      const cnisFileModel = FileModel.build({
        buffer: cnisBuffer,
        originalName: dto.cnisDocument.originalFileName,
        size: cnisBuffer.length,
        encoding: '7bit',
      });

      const uploadedCnis =
        await this.fileProcessorGateway.uploadFile(cnisFileModel);

      documentEntities.push(
        new BpcElderlyAnalysisDocumentEntity({
          document: uploadedCnis,
          type: BpcElderlyAnalysisDocumentTypeEnum.CNIS,
          bpcElderlyAnalysis,
        }),
      );
    }

    if (hasCadUnicoDocuments) {
      for (const cadUnicoFile of dto.cadUnicoDocuments) {
        const cadUnicoBuffer = Buffer.from(
          cadUnicoFile.base64.toString(),
          'base64',
        );

        const cadUnicoFileModel = FileModel.build({
          buffer: cadUnicoBuffer,
          originalName: cadUnicoFile.originalFileName,
          size: cadUnicoBuffer.length,
          encoding: '7bit',
        });

        const uploadedCadUnico =
          await this.fileProcessorGateway.uploadFile(cadUnicoFileModel);

        documentEntities.push(
          new BpcElderlyAnalysisDocumentEntity({
            document: uploadedCadUnico,
            type: BpcElderlyAnalysisDocumentTypeEnum.CAD_UNICO,
            bpcElderlyAnalysis,
          }),
        );
      }
    }

    const createDocumentsTransactions =
      this.bpcElderlyAnalysisDocumentCommandRepositoryGateway.createManyBpcElderlyAnalysisDocument(
        documentEntities,
      );

    const transactionsWithActivity =
      this.analysisActivityTrackerGateway.appendActivityTransaction({
        action: AnalysisActivityActionEnum.UPDATED,
        analysisType: analysisToolRecordQueryResult.type,
        organizationMemberId: organizationMember.id,
        analysisToolClientId:
          analysisToolRecordQueryResult.analysisToolClient.id,
        analysisToolRecordId: analysisToolRecordQueryResult.id,
        transactions: createDocumentsTransactions,
      });

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionsWithActivity,
    );
    await transaction.commit();

    return CreateBpcElderlyAnalysisDocumentResponseDto.build({
      bpcElderlyAnalysisId: bpcElderlyAnalysis.id,
    });
  }
}
