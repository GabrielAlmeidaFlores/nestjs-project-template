import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { SurvivorPensionAnalysisDeceasedBenefitDependentsQueryRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-deceased-benefit-dependents/query/survivor-pension-analysis-deceased-benefit-dependents.query.repository.gateway';
import { SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-deceased-benefit-dependents-document/command/survivor-pension-analysis-deceased-benefit-dependents-document.command.repository.gateway';
import { SurvivorPensionAnalysisDeceasedBenefitDependentsId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-benefit-dependents/value-object/survivor-pension-analysis-deceased-benefit-dependents-id/survivor-pension-analysis-deceased-benefit-dependents-id.value-object';
import { SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-benefit-dependents-document/survivor-pension-analysis-deceased-benefit-dependents-document.entity';
import { PutSurvivorPensionAnalysisDeceasedBenefitDependentsDocumentsRequestDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/request/put-survivor-pension-analysis-deceased-benefit-dependents-documents.request.dto';
import { PutSurvivorPensionAnalysisDeceasedBenefitDependentsDocumentsResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/put-survivor-pension-analysis-deceased-benefit-dependents-documents.response.dto';
import { SurvivorPensionAnalysisDbdNotFoundError } from '@module/customer/analysis-tool/module/survivor-pension-analysis/error/survivor-pension-analysis-deceased-benefit-dependents-not-found.error';
import { SurvivorPensionAnalysisNotFoundError } from '@module/customer/analysis-tool/module/survivor-pension-analysis/error/survivor-pension-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class PutSurvivorPensionAnalysisDeceasedBenefitDependentsDocumentsUseCase {
  protected readonly _type =
    PutSurvivorPensionAnalysisDeceasedBenefitDependentsDocumentsUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(
      SurvivorPensionAnalysisDeceasedBenefitDependentsQueryRepositoryGateway,
    )
    private readonly survivorPensionAnalysisDeceasedBenefitDependentsQueryRepositoryGateway: SurvivorPensionAnalysisDeceasedBenefitDependentsQueryRepositoryGateway,
    @Inject(
      SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentCommandRepositoryGateway,
    )
    private readonly survivorPensionAnalysisDeceasedBenefitDependentsDocumentCommandRepositoryGateway: SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    survivorPensionAnalysisDbdId: SurvivorPensionAnalysisDeceasedBenefitDependentsId,
    dto: PutSurvivorPensionAnalysisDeceasedBenefitDependentsDocumentsRequestDto,
  ): Promise<PutSurvivorPensionAnalysisDeceasedBenefitDependentsDocumentsResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const dbdResult =
      await this.survivorPensionAnalysisDeceasedBenefitDependentsQueryRepositoryGateway.findOneByIdOrFail(
        survivorPensionAnalysisDbdId,
        SurvivorPensionAnalysisDbdNotFoundError,
      );

    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsBySurvivorPensionAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
      dbdResult.survivorPensionAnalysisId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      SurvivorPensionAnalysisNotFoundError,
    );

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
        new SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentEntity({
          survivorPensionAnalysisDeceasedBenefitDependentsId:
            survivorPensionAnalysisDbdId,
          documentType: uploaded.documentType,
          documentName: uploaded.documentName,
        }),
    );

    const txn = await this.baseTransactionRepositoryGateway.execute([
      this.survivorPensionAnalysisDeceasedBenefitDependentsDocumentCommandRepositoryGateway.deleteAllBySurvivorPensionAnalysisDeceasedBenefitDependentsId(
        survivorPensionAnalysisDbdId,
      ),
      ...documentEntities.map((entity) =>
        this.survivorPensionAnalysisDeceasedBenefitDependentsDocumentCommandRepositoryGateway.createSurvivorPensionAnalysisDeceasedBenefitDependentsDocument(
          entity,
        ),
      ),
    ]);

    await txn.commit();

    return PutSurvivorPensionAnalysisDeceasedBenefitDependentsDocumentsResponseDto.build(
      { survivorPensionAnalysisDbdId },
    );
  }
}
