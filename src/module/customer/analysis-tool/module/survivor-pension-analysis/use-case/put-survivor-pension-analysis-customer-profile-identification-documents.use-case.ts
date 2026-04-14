import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { SurvivorPensionAnalysisCustomerProfileIdentificationQueryRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-customer-profile-identification/query/survivor-pension-analysis-customer-profile-identification.query.repository.gateway';
import { SurvivorPensionAnalysisCustomerProfileIdentificationDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-customer-profile-identification-document/command/survivor-pension-analysis-customer-profile-identification-document.command.repository.gateway';
import { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';
import { SurvivorPensionAnalysisCustomerProfileIdentificationDocumentEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-customer-profile-identification-document/survivor-pension-analysis-customer-profile-identification-document.entity';
import { PutSurvivorPensionAnalysisCustomerProfileIdentificationDocumentsRequestDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/request/put-survivor-pension-analysis-customer-profile-identification-documents.request.dto';
import { PutSurvivorPensionAnalysisCustomerProfileIdentificationDocumentsResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/put-survivor-pension-analysis-customer-profile-identification-documents.response.dto';
import { SurvivorPensionAnalysisCustomerProfileIdentificationNotFoundError } from '@module/customer/analysis-tool/module/survivor-pension-analysis/error/survivor-pension-analysis-customer-profile-identification-not-found.error';
import { SurvivorPensionAnalysisNotFoundError } from '@module/customer/analysis-tool/module/survivor-pension-analysis/error/survivor-pension-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class PutSurvivorPensionAnalysisCustomerProfileIdentificationDocumentsUseCase {
  protected readonly _type =
    PutSurvivorPensionAnalysisCustomerProfileIdentificationDocumentsUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(
      SurvivorPensionAnalysisCustomerProfileIdentificationQueryRepositoryGateway,
    )
    private readonly survivorPensionAnalysisCustomerProfileIdentificationQueryRepositoryGateway: SurvivorPensionAnalysisCustomerProfileIdentificationQueryRepositoryGateway,
    @Inject(
      SurvivorPensionAnalysisCustomerProfileIdentificationDocumentCommandRepositoryGateway,
    )
    private readonly survivorPensionAnalysisCustomerProfileIdentificationDocumentCommandRepositoryGateway: SurvivorPensionAnalysisCustomerProfileIdentificationDocumentCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    survivorPensionAnalysisId: SurvivorPensionAnalysisId,
    dto: PutSurvivorPensionAnalysisCustomerProfileIdentificationDocumentsRequestDto,
  ): Promise<PutSurvivorPensionAnalysisCustomerProfileIdentificationDocumentsResponseDto> {
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

    const cpiResult =
      await this.survivorPensionAnalysisCustomerProfileIdentificationQueryRepositoryGateway.findOneBySurvivorPensionAnalysisId(
        survivorPensionAnalysisId,
      );

    if (cpiResult === null) {
      throw new SurvivorPensionAnalysisCustomerProfileIdentificationNotFoundError();
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
        new SurvivorPensionAnalysisCustomerProfileIdentificationDocumentEntity({
          survivorPensionAnalysisCustomerProfileIdentificationId: cpiResult.id,
          documentType: uploaded.documentType,
          documentName: uploaded.documentName,
        }),
    );

    const txn = await this.baseTransactionRepositoryGateway.execute([
      this.survivorPensionAnalysisCustomerProfileIdentificationDocumentCommandRepositoryGateway.deleteAllBySurvivorPensionAnalysisCustomerProfileIdentificationId(
        cpiResult.id,
      ),
      ...documentEntities.map((entity) =>
        this.survivorPensionAnalysisCustomerProfileIdentificationDocumentCommandRepositoryGateway.createSurvivorPensionAnalysisCustomerProfileIdentificationDocument(
          entity,
        ),
      ),
    ]);

    await txn.commit();

    return PutSurvivorPensionAnalysisCustomerProfileIdentificationDocumentsResponseDto.build(
      { survivorPensionAnalysisCustomerProfileIdentificationId: cpiResult.id },
    );
  }
}
