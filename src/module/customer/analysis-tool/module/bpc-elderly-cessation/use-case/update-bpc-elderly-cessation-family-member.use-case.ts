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
import { BpcElderlyCessationFamilyMemberCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/repository/bpc-elderly-cessation-family-member/command/bpc-elderly-cessation-family-member.command.repository.gateway';
import { BpcElderlyCessationFamilyMemberDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/repository/bpc-elderly-cessation-family-member-document/command/bpc-elderly-cessation-family-member-document.command.repository.gateway';
import { BpcElderlyCessationEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/bpc-elderly-cessation.entity';
import { BpcElderlyCessationId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/value-object/bpc-elderly-cessation-id/bpc-elderly-cessation-id.value-object';
import { BpcElderlyCessationFamilyMemberEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-family-member/bpc-elderly-cessation-family-member.entity';
import { BpcElderlyCessationFamilyMemberDocumentEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-family-member-document/bpc-elderly-cessation-family-member-document.entity';
import { UpdateBpcElderlyCessationFamilyMemberRequestDto } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/dto/request/update-bpc-elderly-cessation-family-member.request.dto';
import { UpdateBpcElderlyCessationResponseDto } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/dto/response/update-bpc-elderly-cessation.response.dto';
import { BpcElderlyCessationNotFoundError } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/error/bpc-elderly-cessation-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UpdateBpcElderlyCessationFamilyMemberUseCase {
  protected readonly _type = UpdateBpcElderlyCessationFamilyMemberUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(BpcElderlyCessationFamilyMemberCommandRepositoryGateway)
    private readonly bpcElderlyCessationFamilyMemberCommandRepositoryGateway: BpcElderlyCessationFamilyMemberCommandRepositoryGateway,
    @Inject(BpcElderlyCessationFamilyMemberDocumentCommandRepositoryGateway)
    private readonly bpcElderlyCessationFamilyMemberDocumentCommandRepositoryGateway: BpcElderlyCessationFamilyMemberDocumentCommandRepositoryGateway,
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
    bpcElderlyCessationId: BpcElderlyCessationId,
    dto: UpdateBpcElderlyCessationFamilyMemberRequestDto,
  ): Promise<UpdateBpcElderlyCessationResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByBpcElderlyCessationIdAndOrganizationIdAndAuthIdentityIdOrFail(
        bpcElderlyCessationId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        BpcElderlyCessationNotFoundError,
      );

    if (analysisToolRecordQueryResult.bpcElderlyCessation === null) {
      throw new BpcElderlyCessationNotFoundError();
    }

    const transactions = await this.buildFamilyMemberTransactions(
      bpcElderlyCessationId,
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

    return UpdateBpcElderlyCessationResponseDto.build({
      bpcElderlyCessationId,
    });
  }

  private async buildFamilyMemberTransactions(
    bpcElderlyCessationId: BpcElderlyCessationId,
    dto: UpdateBpcElderlyCessationFamilyMemberRequestDto,
    organizationMemberId: OrganizationMemberId,
  ): Promise<TransactionType[]> {
    const transactions: TransactionType[] = [
      this.bpcElderlyCessationFamilyMemberCommandRepositoryGateway.deleteAllByBpcElderlyCessationId(
        bpcElderlyCessationId,
      ),
    ];

    const bpcElderlyCessation = new BpcElderlyCessationEntity({
      id: bpcElderlyCessationId,
      createdBy: organizationMemberId,
      updatedBy: organizationMemberId,
    });

    for (const familyMemberDto of dto.familyMembers) {
      const familyMemberEntity = new BpcElderlyCessationFamilyMemberEntity({
        fullName: familyMemberDto.fullName,
        birthDate: familyMemberDto.birthDate,
        kinship: familyMemberDto.kinship,
        livesInSameResidence: familyMemberDto.livesInSameResidence,
        hasIncome: familyMemberDto.hasIncome,
        monthlyIncomeAmount: familyMemberDto.monthlyIncomeAmount ?? null,
        incomeType: familyMemberDto.incomeType ?? null,
        hasExpenseProofs: familyMemberDto.hasExpenseProofs ?? null,
        bpcElderlyCessation,
      });

      transactions.push(
        this.bpcElderlyCessationFamilyMemberCommandRepositoryGateway.createBpcElderlyCessationFamilyMember(
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
          this.bpcElderlyCessationFamilyMemberDocumentCommandRepositoryGateway.createBpcElderlyCessationFamilyMemberDocument(
            new BpcElderlyCessationFamilyMemberDocumentEntity({
              document: documentFile,
              type: documentDto.type,
              bpcElderlyCessationFamilyMember: familyMemberEntity,
            }),
          ),
        );
      }
    }

    return transactions;
  }
}
