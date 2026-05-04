import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisActivityTrackerGateway } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/analysis-activity-tracker.gateway';
import { AnalysisActivityActionEnum } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/enum/analysis-activity-action.enum';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { BpcDisabilityTerminationFamilyMemberCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination-family-member/command/bpc-disability-termination-family-member.command.repository.gateway';
import { BpcDisabilityTerminationFamilyMemberDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination-family-member-document/command/bpc-disability-termination-family-member-document.command.repository.gateway';
import { BpcDisabilityTerminationEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/bpc-disability-termination.entity';
import { BpcDisabilityTerminationId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/value-object/bpc-disability-termination-id/bpc-disability-termination-id.value-object';
import { BpcDisabilityTerminationFamilyMemberEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-family-member/bpc-disability-termination-family-member.entity';
import { BpcDisabilityTerminationFamilyMemberDocumentEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-family-member-document/bpc-disability-termination-family-member-document.entity';
import { SaveBpcDisabilityTerminationFamilyMemberRequestDto } from '@module/customer/analysis-tool/module/bpc-disability-termination/dto/request/save-bpc-disability-termination-family-member.request.dto';
import { SaveBpcDisabilityTerminationFamilyMemberResponseDto } from '@module/customer/analysis-tool/module/bpc-disability-termination/dto/response/save-bpc-disability-termination-family-member.response.dto';
import { BpcDisabilityTerminationNotFoundError } from '@module/customer/analysis-tool/module/bpc-disability-termination/error/bpc-disability-termination-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class SaveBpcDisabilityTerminationFamilyMembersUseCase {
  protected readonly _type =
    SaveBpcDisabilityTerminationFamilyMembersUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(BpcDisabilityTerminationFamilyMemberCommandRepositoryGateway)
    private readonly bpcDisabilityTerminationFamilyMemberCommandRepositoryGateway: BpcDisabilityTerminationFamilyMemberCommandRepositoryGateway,
    @Inject(
      BpcDisabilityTerminationFamilyMemberDocumentCommandRepositoryGateway,
    )
    private readonly bpcDisabilityTerminationFamilyMemberDocumentCommandRepositoryGateway: BpcDisabilityTerminationFamilyMemberDocumentCommandRepositoryGateway,
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
    dto: SaveBpcDisabilityTerminationFamilyMemberRequestDto,
  ): Promise<SaveBpcDisabilityTerminationFamilyMemberResponseDto> {
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

    const bpcDisabilityTermination = new BpcDisabilityTerminationEntity({
      id: bpcDisabilityTerminationQueryResult.id,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    const transactions: TransactionType[] = [];

    transactions.push(
      this.bpcDisabilityTerminationFamilyMemberCommandRepositoryGateway.deleteAllByBpcDisabilityTerminationId(
        bpcDisabilityTerminationId,
      ),
    );

    for (const familyMemberDto of dto.familyMembers) {
      const familyMemberEntity = new BpcDisabilityTerminationFamilyMemberEntity(
        {
          fullName: familyMemberDto.fullName,
          birthDate: familyMemberDto.birthDate,
          kinship: familyMemberDto.kinship,
          livesInSameResidence: familyMemberDto.livesInSameResidence,
          hasIncome: familyMemberDto.hasIncome,
          monthlyIncomeAmount: familyMemberDto.monthlyIncomeAmount ?? null,
          incomeType: familyMemberDto.incomeType ?? null,
          hasExpenseProofs: familyMemberDto.hasExpenseProofs ?? null,
          bpcDisabilityTermination,
        },
      );

      transactions.push(
        this.bpcDisabilityTerminationFamilyMemberCommandRepositoryGateway.createBpcDisabilityTerminationFamilyMember(
          familyMemberEntity,
        ),
      );

      if (familyMemberDto.documents && familyMemberDto.documents.length > 0) {
        for (const documentDto of familyMemberDto.documents) {
          const fileBuffer = Buffer.from(
            documentDto.document.base64.toString(),
            'base64',
          );

          const fileModel = FileModel.build({
            buffer: fileBuffer,
            originalName: documentDto.document.originalFileName,
            size: fileBuffer.length,
            encoding: '7bit',
          });

          const documentFile =
            await this.fileProcessorGateway.uploadFile(fileModel);

          const documentEntity =
            new BpcDisabilityTerminationFamilyMemberDocumentEntity({
              document: documentFile,
              type: documentDto.type,
              bpcDisabilityTerminationFamilyMember: familyMemberEntity,
            });

          transactions.push(
            this.bpcDisabilityTerminationFamilyMemberDocumentCommandRepositoryGateway.createBpcDisabilityTerminationFamilyMemberDocument(
              documentEntity,
            ),
          );
        }
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

    return SaveBpcDisabilityTerminationFamilyMemberResponseDto.build({
      bpcDisabilityTerminationId: bpcDisabilityTermination.id,
    });
  }
}
