import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisActivityTrackerGateway } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/analysis-activity-tracker.gateway';
import { AnalysisActivityActionEnum } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/enum/analysis-activity-action.enum';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { BpcDisabilityDenialFamilyMemberCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/repository/bpc-disability-denial-family-member/command/bpc-disability-denial-family-member.command.repository.gateway';
import { BpcDisabilityDenialFamilyMemberDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/repository/bpc-disability-denial-family-member-document/command/bpc-disability-denial-family-member-document.command.repository.gateway';
import { BpcDisabilityDenialEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial/bpc-disability-denial.entity';
import { BpcDisabilityDenialId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial/value-object/bpc-disability-denial-id/bpc-disability-denial-id.value-object';
import { BpcDisabilityDenialFamilyMemberEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-family-member/bpc-disability-denial-family-member.entity';
import { BpcDisabilityDenialFamilyMemberDocumentEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-family-member-document/bpc-disability-denial-family-member-document.entity';
import { UpdateBpcDisabilityDenialFamilyMemberRequestDto } from '@module/customer/analysis-tool/module/bpc-disability-denial/dto/request/update-bpc-disability-denial-family-member.request.dto';
import { UpdateBpcDisabilityDenialResponseDto } from '@module/customer/analysis-tool/module/bpc-disability-denial/dto/response/update-bpc-disability-denial.response.dto';
import { BpcDisabilityDenialNotFoundError } from '@module/customer/analysis-tool/module/bpc-disability-denial/error/bpc-disability-denial-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UpdateBpcDisabilityDenialFamilyMemberUseCase {
  protected readonly _type = UpdateBpcDisabilityDenialFamilyMemberUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(BpcDisabilityDenialFamilyMemberCommandRepositoryGateway)
    private readonly bpcDisabilityDenialFamilyMemberCommandRepositoryGateway: BpcDisabilityDenialFamilyMemberCommandRepositoryGateway,
    @Inject(BpcDisabilityDenialFamilyMemberDocumentCommandRepositoryGateway)
    private readonly bpcDisabilityDenialFamilyMemberDocumentCommandRepositoryGateway: BpcDisabilityDenialFamilyMemberDocumentCommandRepositoryGateway,
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
    bpcDisabilityDenialId: BpcDisabilityDenialId,
    dto: UpdateBpcDisabilityDenialFamilyMemberRequestDto,
  ): Promise<UpdateBpcDisabilityDenialResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByBpcDisabilityDenialIdAndOrganizationIdAndAuthIdentityIdOrFail(
        bpcDisabilityDenialId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        BpcDisabilityDenialNotFoundError,
      );

    if (analysisToolRecordQueryResult.bpcDisabilityDenial === null) {
      throw new BpcDisabilityDenialNotFoundError();
    }

    const transactions = await this.buildFamilyMemberTransactions(
      bpcDisabilityDenialId,
      dto,
      organizationMember.id,
    );

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

    return UpdateBpcDisabilityDenialResponseDto.build({
      bpcDisabilityDenialId,
    });
  }

  private async buildFamilyMemberTransactions(
    bpcDisabilityDenialId: BpcDisabilityDenialId,
    dto: UpdateBpcDisabilityDenialFamilyMemberRequestDto,
    organizationMemberId: OrganizationMemberId,
  ): Promise<TransactionType[]> {
    const transactions: TransactionType[] = [
      this.bpcDisabilityDenialFamilyMemberCommandRepositoryGateway.deleteAllByBpcDisabilityDenialId(
        bpcDisabilityDenialId,
      ),
    ];

    const bpcDisabilityDenial = new BpcDisabilityDenialEntity({
      id: bpcDisabilityDenialId,
      createdBy: organizationMemberId,
      updatedBy: organizationMemberId,
    });

    for (const familyMemberDto of dto.familyMembers) {
      const familyMemberEntity = new BpcDisabilityDenialFamilyMemberEntity({
        fullName: familyMemberDto.fullName,
        birthDate: familyMemberDto.birthDate,
        kinship: familyMemberDto.kinship,
        livesInSameResidence: familyMemberDto.livesInSameResidence,
        hasIncome: familyMemberDto.hasIncome,
        monthlyIncomeAmount: familyMemberDto.monthlyIncomeAmount ?? null,
        incomeType: familyMemberDto.incomeType ?? null,
        hasExpenseProofs: familyMemberDto.hasExpenseProofs ?? null,
        bpcDisabilityDenial,
      });

      transactions.push(
        this.bpcDisabilityDenialFamilyMemberCommandRepositoryGateway.createBpcDisabilityDenialFamilyMember(
          familyMemberEntity,
        ),
      );

      for (const documentDto of familyMemberDto.documents ?? []) {
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

        transactions.push(
          this.bpcDisabilityDenialFamilyMemberDocumentCommandRepositoryGateway.createBpcDisabilityDenialFamilyMemberDocument(
            new BpcDisabilityDenialFamilyMemberDocumentEntity({
              document: documentFile,
              type: documentDto.type,
              bpcDisabilityDenialFamilyMember: familyMemberEntity,
            }),
          ),
        );
      }
    }

    return transactions;
  }
}
