import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { SurvivorPensionAnalysisBenefitOriginatorIdentificationQueryRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-benefit-originator-identification/query/survivor-pension-analysis-benefit-originator-identification.query.repository.gateway';
import { SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-benefit-originator-identification-document/command/survivor-pension-analysis-benefit-originator-identification-document.command.repository.gateway';
import { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';
import { SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-benefit-originator-identification-document/survivor-pension-analysis-benefit-originator-identification-document.entity';
import { PutSurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentsRequestDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/request/put-survivor-pension-analysis-benefit-originator-identification-documents.request.dto';
import { PutSurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentsResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/put-survivor-pension-analysis-benefit-originator-identification-documents.response.dto';
import { SurvivorPensionAnalysisBenefitOriginatorIdentificationNotFoundError } from '@module/customer/analysis-tool/module/survivor-pension-analysis/error/survivor-pension-analysis-benefit-originator-identification-not-found.error';
import { SurvivorPensionAnalysisNotFoundError } from '@module/customer/analysis-tool/module/survivor-pension-analysis/error/survivor-pension-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class PutSurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentsUseCase {
  protected readonly _type =
    PutSurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentsUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(
      SurvivorPensionAnalysisBenefitOriginatorIdentificationQueryRepositoryGateway,
    )
    private readonly survivorPensionAnalysisBenefitOriginatorIdentificationQueryRepositoryGateway: SurvivorPensionAnalysisBenefitOriginatorIdentificationQueryRepositoryGateway,
    @Inject(
      SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentCommandRepositoryGateway,
    )
    private readonly survivorPensionAnalysisBenefitOriginatorIdentificationDocumentCommandRepositoryGateway: SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    survivorPensionAnalysisId: SurvivorPensionAnalysisId,
    dto: PutSurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentsRequestDto,
  ): Promise<PutSurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentsResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsBySurvivorPensionAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
      survivorPensionAnalysisId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      SurvivorPensionAnalysisNotFoundError,
    );

    const boiResult =
      await this.survivorPensionAnalysisBenefitOriginatorIdentificationQueryRepositoryGateway.findOneBySurvivorPensionAnalysisId(
        survivorPensionAnalysisId,
      );

    if (boiResult === null) {
      throw new SurvivorPensionAnalysisBenefitOriginatorIdentificationNotFoundError();
    }

    const uploadedDocuments = await Promise.all(
      dto.documents.map(async (doc) => {
        const buffer = doc.file.base64.decodeToBuffer();
        const fileModel = FileModel.build({
          buffer,
          originalName: doc.file.originalFileName,
          size: buffer.length,
          encoding: '7bit',
        });
        const documentName =
          await this.fileProcessorGateway.uploadFile(fileModel);
        return { documentType: doc.documentType, documentName };
      }),
    );

    const documentEntities = uploadedDocuments.map(
      (uploaded) =>
        new SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentEntity(
          {
            survivorPensionAnalysisBenefitOriginatorIdentificationId:
              boiResult.id,
            documentType: uploaded.documentType,
            documentName: uploaded.documentName,
          },
        ),
    );

    const txn = await this.baseTransactionRepositoryGateway.execute([
      this.survivorPensionAnalysisBenefitOriginatorIdentificationDocumentCommandRepositoryGateway.deleteAllBySurvivorPensionAnalysisBenefitOriginatorIdentificationId(
        boiResult.id,
      ),
      ...documentEntities.map((entity) =>
        this.survivorPensionAnalysisBenefitOriginatorIdentificationDocumentCommandRepositoryGateway.createSurvivorPensionAnalysisBenefitOriginatorIdentificationDocument(
          entity,
        ),
      ),
    ]);

    await txn.commit();

    return PutSurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentsResponseDto.build(
      { survivorPensionAnalysisBenefitOriginatorIdentificationId: boiResult.id },
    );
  }
}
