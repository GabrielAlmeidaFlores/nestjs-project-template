import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisActivityTrackerGateway } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/analysis-activity-tracker.gateway';
import { AnalysisActivityActionEnum } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/enum/analysis-activity-action.enum';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { BpcDisabilityTerminationDisabilityAssessmentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination-disability-assessment/command/bpc-disability-termination-disability-assessment.command.repository.gateway';
import { BpcDisabilityTerminationDisabilityAssessmentDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination-disability-assessment-document/command/bpc-disability-termination-disability-assessment-document.command.repository.gateway';
import { BpcDisabilityTerminationId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/value-object/bpc-disability-termination-id/bpc-disability-termination-id.value-object';
import { BpcDisabilityTerminationDisabilityAssessmentEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-disability-assessment/bpc-disability-termination-disability-assessment.entity';
import { BpcDisabilityTerminationDisabilityAssessmentDocumentEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-disability-assessment-document/bpc-disability-termination-disability-assessment-document.entity';
import { SaveBpcDisabilityTerminationDisabilityAssessmentRequestDto } from '@module/customer/analysis-tool/module/bpc-disability-termination/dto/request/save-bpc-disability-termination-disability-assessment.request.dto';
import { SaveBpcDisabilityTerminationDisabilityAssessmentResponseDto } from '@module/customer/analysis-tool/module/bpc-disability-termination/dto/response/save-bpc-disability-termination-disability-assessment.response.dto';
import { BpcDisabilityTerminationNotFoundError } from '@module/customer/analysis-tool/module/bpc-disability-termination/error/bpc-disability-termination-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class SaveBpcDisabilityTerminationDisabilityAssessmentUseCase {
  protected readonly _type =
    SaveBpcDisabilityTerminationDisabilityAssessmentUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(
      BpcDisabilityTerminationDisabilityAssessmentCommandRepositoryGateway,
    )
    private readonly bpcDisabilityTerminationDisabilityAssessmentCommandRepositoryGateway: BpcDisabilityTerminationDisabilityAssessmentCommandRepositoryGateway,
    @Inject(
      BpcDisabilityTerminationDisabilityAssessmentDocumentCommandRepositoryGateway,
    )
    private readonly bpcDisabilityTerminationDisabilityAssessmentDocumentCommandRepositoryGateway: BpcDisabilityTerminationDisabilityAssessmentDocumentCommandRepositoryGateway,
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
    bpcDisabilityTerminationId: BpcDisabilityTerminationId,
    dto: SaveBpcDisabilityTerminationDisabilityAssessmentRequestDto,
  ): Promise<SaveBpcDisabilityTerminationDisabilityAssessmentResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByBpcDisabilityTerminationIdAndOrganizationIdAndAuthIdentityIdOrFail(
        bpcDisabilityTerminationId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        BpcDisabilityTerminationNotFoundError,
      );

    const bpcDisabilityTerminationQueryResult =
      analysisToolRecordQueryResult.bpcDisabilityTermination;

    if (bpcDisabilityTerminationQueryResult === null) {
      throw new BpcDisabilityTerminationNotFoundError();
    }

    const transactions: TransactionType[] = [];

    const assessmentEntity =
      new BpcDisabilityTerminationDisabilityAssessmentEntity({
        estimatedDisabilityStartDate: dto.estimatedDisabilityStartDate ?? null,
        attendsSchoolOrTechnicalCourse:
          dto.attendsSchoolOrTechnicalCourse ?? null,
        performsLaborActivity: dto.performsLaborActivity ?? null,
        needsThirdPartyHelp: dto.needsThirdPartyHelp ?? null,
        hasAccessToBasicServices: dto.hasAccessToBasicServices ?? null,
        otherBarriersDescription: dto.otherBarriersDescription ?? null,
      });

    const currentAssessment =
      bpcDisabilityTerminationQueryResult.bpcDisabilityTerminationDisabilityAssessment;

    if (currentAssessment !== null) {
      transactions.push(
        this.bpcDisabilityTerminationDisabilityAssessmentCommandRepositoryGateway.updateBpcDisabilityTerminationDisabilityAssessment(
          currentAssessment.id,
          assessmentEntity,
        ),
      );
    } else {
      transactions.push(
        this.bpcDisabilityTerminationDisabilityAssessmentCommandRepositoryGateway.createBpcDisabilityTerminationDisabilityAssessment(
          assessmentEntity,
          bpcDisabilityTerminationId,
        ),
      );
    }

    if (dto.documents && dto.documents.length > 0) {
      for (const documentDto of dto.documents) {
        const fileBuffer = Buffer.from(documentDto.base64.toString(), 'base64');

        const fileModel = FileModel.build({
          buffer: fileBuffer,
          originalName: documentDto.originalFileName,
          size: fileBuffer.length,
          encoding: '7bit',
        });

        const uploadedDocument =
          await this.fileProcessorGateway.uploadFile(fileModel);

        const documentEntity =
          new BpcDisabilityTerminationDisabilityAssessmentDocumentEntity({
            document: uploadedDocument,
            bpcDisabilityTerminationDisabilityAssessment: assessmentEntity,
          });

        transactions.push(
          this.bpcDisabilityTerminationDisabilityAssessmentDocumentCommandRepositoryGateway.createBpcDisabilityTerminationDisabilityAssessmentDocument(
            documentEntity,
          ),
        );
      }
    }

    const transactionsWithActivity =
      this.analysisActivityTrackerGateway.appendActivityTransaction({
        action: AnalysisActivityActionEnum.UPDATED,
        analysisType: analysisToolRecordQueryResult.type,
        organizationMemberId: organizationMember.id,
        analysisToolClientId:
          analysisToolRecordQueryResult.analysisToolClient.id,
        analysisToolRecordId: analysisToolRecordQueryResult.id,
        transactions,
      });

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionsWithActivity,
    );
    await transaction.commit();

    return SaveBpcDisabilityTerminationDisabilityAssessmentResponseDto.build({
      bpcDisabilityTerminationId: bpcDisabilityTerminationQueryResult.id,
    });
  }
}
