import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { RuralOrHybridRetirementRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection/query/rural-or-hybrid-retirement-rejection.query.repository.gateway';
import { RuralOrHybridRetirementRejectionPeriodMemberCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection-period-member/command/rural-or-hybrid-retirement-rejection-period-member.command.repository.gateway';
import { RuralOrHybridRetirementRejectionPeriodMemberDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection-period-member-document/command/rural-or-hybrid-retirement-rejection-period-member-document.command.repository.gateway';
import { RuralOrHybridRetirementRejectionId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id.value-object';
import { RuralOrHybridRetirementRejectionPeriodId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period/value-object/rural-or-hybrid-retirement-rejection-period-id.value-object';
import { RuralOrHybridRetirementRejectionPeriodMemberEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period-member/rural-or-hybrid-retirement-rejection-period-member.entity';
import { RuralOrHybridRetirementRejectionPeriodMemberId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period-member/value-object/rural-or-hybrid-retirement-rejection-period-member-id.value-object';
import { RuralOrHybridRetirementRejectionPeriodMemberDocumentEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period-member-document/rural-or-hybrid-retirement-rejection-period-member-document.entity';
import { RuralOrHybridRetirementRejectionPeriodMemberDocumentId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period-member-document/value-object/rural-or-hybrid-retirement-rejection-period-member-document-id.value-object';
import { RuralOrHybridRetirementRejectionPeriodMemberItemRequestDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/request/create-rural-or-hybrid-retirement-rejection-period-member.request.dto';
import { UpdateRuralOrHybridRetirementRejectionPeriodMemberRequestDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/request/update-rural-or-hybrid-retirement-rejection-period-member.request.dto';
import { UpdateRuralOrHybridRetirementRejectionPeriodMemberResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/response/update-rural-or-hybrid-retirement-rejection-period-member.response.dto';
import { RuralOrHybridRetirementRejectionNotFoundError } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/error/rural-or-hybrid-retirement-rejection-not-found.error';
import { RuralOrHybridRetirementRejectionPeriodNotFoundError } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/error/rural-or-hybrid-retirement-rejection-period-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UpdateRuralOrHybridRetirementRejectionPeriodMemberUseCase {
  protected readonly _type =
    UpdateRuralOrHybridRetirementRejectionPeriodMemberUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(RuralOrHybridRetirementRejectionQueryRepositoryGateway)
    private readonly ruralOrHybridRetirementRejectionQueryRepositoryGateway: RuralOrHybridRetirementRejectionQueryRepositoryGateway,
    @Inject(
      RuralOrHybridRetirementRejectionPeriodMemberCommandRepositoryGateway,
    )
    private readonly ruralOrHybridRetirementRejectionPeriodMemberCommandRepositoryGateway: RuralOrHybridRetirementRejectionPeriodMemberCommandRepositoryGateway,
    @Inject(
      RuralOrHybridRetirementRejectionPeriodMemberDocumentCommandRepositoryGateway,
    )
    private readonly ruralOrHybridRetirementRejectionPeriodMemberDocumentCommandRepositoryGateway: RuralOrHybridRetirementRejectionPeriodMemberDocumentCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId,
    ruralOrHybridRetirementRejectionPeriodId: RuralOrHybridRetirementRejectionPeriodId,
    dto: UpdateRuralOrHybridRetirementRejectionPeriodMemberRequestDto,
  ): Promise<UpdateRuralOrHybridRetirementRejectionPeriodMemberResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const existingRejection =
      await this.ruralOrHybridRetirementRejectionQueryRepositoryGateway.findOneByRuralOrHybridRetirementRejectionIdOrFailWithRelations(
        ruralOrHybridRetirementRejectionId,
        RuralOrHybridRetirementRejectionNotFoundError,
      );

    const existingPeriod = (
      existingRejection.ruralOrHybridRetirementRejectionPeriod ?? []
    ).find(
      (period) =>
        period.id.toString() ===
        ruralOrHybridRetirementRejectionPeriodId.toString(),
    );

    if (!existingPeriod) {
      throw new RuralOrHybridRetirementRejectionPeriodNotFoundError();
    }

    const existingMembers = (
      existingRejection.ruralOrHybridRetirementRejectionPeriodMember ?? []
    ).filter(
      (member) =>
        member.ruralOrHybridRetirementRejectionPeriodId.toString() ===
        ruralOrHybridRetirementRejectionPeriodId.toString(),
    );
    const existingMemberDocuments =
      existingRejection.ruralOrHybridRetirementRejectionPeriodMemberDocument ??
      [];
    const transactions: TransactionType[] = [];

    for (const existingMember of existingMembers) {
      const memberDocuments = existingMemberDocuments.filter(
        (document) =>
          document.ruralOrHybridRetirementRejectionPeriodMemberId.toString() ===
          existingMember.id.toString(),
      );

      for (const memberDocument of memberDocuments) {
        transactions.push(
          this.ruralOrHybridRetirementRejectionPeriodMemberDocumentCommandRepositoryGateway.deleteRuralOrHybridRetirementRejectionPeriodMemberDocument(
            memberDocument.id,
          ),
        );
      }

      transactions.push(
        this.ruralOrHybridRetirementRejectionPeriodMemberCommandRepositoryGateway.deleteRuralOrHybridRetirementRejectionPeriodMember(
          existingMember.id,
        ),
      );
    }

    for (const memberDto of dto.members) {
      const memberId = new RuralOrHybridRetirementRejectionPeriodMemberId();

      transactions.push(
        this.ruralOrHybridRetirementRejectionPeriodMemberCommandRepositoryGateway.createRuralOrHybridRetirementRejectionPeriodMember(
          this.buildMemberEntity(
            memberId,
            ruralOrHybridRetirementRejectionPeriodId,
            memberDto,
          ),
        ),
      );

      if (memberDto.documents && memberDto.documents.length > 0) {
        const documentTransactions = await Promise.all(
          memberDto.documents.map(async (documentDto) => {
            const buffer = documentDto.file.base64.decodeToBuffer();

            const fileModel = FileModel.build({
              buffer,
              originalName: documentDto.file.originalFileName,
              size: buffer.length,
              encoding: '7bit',
            });

            const document =
              await this.fileProcessorGateway.uploadFile(fileModel);

            return this.ruralOrHybridRetirementRejectionPeriodMemberDocumentCommandRepositoryGateway.createRuralOrHybridRetirementRejectionPeriodMemberDocument(
              new RuralOrHybridRetirementRejectionPeriodMemberDocumentEntity({
                id: new RuralOrHybridRetirementRejectionPeriodMemberDocumentId(),
                document,
                type: documentDto.type,
                ruralOrHybridRetirementRejectionPeriodMemberId: memberId,
              }),
            );
          }),
        );

        transactions.push(...documentTransactions);
      }
    }

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return UpdateRuralOrHybridRetirementRejectionPeriodMemberResponseDto.build({
      ruralOrHybridRetirementRejectionId,
    });
  }

  private buildMemberEntity(
    memberId: RuralOrHybridRetirementRejectionPeriodMemberId,
    ruralOrHybridRetirementRejectionPeriodId: RuralOrHybridRetirementRejectionPeriodId,
    memberDto: RuralOrHybridRetirementRejectionPeriodMemberItemRequestDto,
  ): RuralOrHybridRetirementRejectionPeriodMemberEntity {
    return new RuralOrHybridRetirementRejectionPeriodMemberEntity({
      id: memberId,
      name: memberDto.name ?? null,
      federalDocument: memberDto.federalDocument ?? null,
      kinship: memberDto.kinship ?? null,
      hasReceivedRuralBenefit: memberDto.hasReceivedRuralBenefit ?? null,
      benefitNumber: memberDto.benefitNumber ?? null,
      ruralOrHybridRetirementRejectionPeriodId,
    });
  }
}
