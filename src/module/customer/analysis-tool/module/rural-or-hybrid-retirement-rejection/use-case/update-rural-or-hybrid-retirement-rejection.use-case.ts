import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { RuralOrHybridRetirementRejectionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection/command/rural-or-hybrid-retirement-rejection.command.repository.gateway';
import { RuralOrHybridRetirementRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection/query/rural-or-hybrid-retirement-rejection.query.repository.gateway';
import { RuralOrHybridRetirementRejectionDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection-document/command/rural-or-hybrid-retirement-rejection-document.command.repository.gateway';
import { RuralOrHybridRetirementRejectionInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection-inss-benefit/command/rural-or-hybrid-retirement-rejection-inss-benefit.command.repository.gateway';
import { RuralOrHybridRetirementRejectionLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection-legal-proceeding/command/rural-or-hybrid-retirement-rejection-legal-proceeding.command.repository.gateway';
import { RuralOrHybridRetirementRejectionEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/rural-or-hybrid-retirement-rejection.entity';
import { RuralOrHybridRetirementRejectionId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id.value-object';
import { RuralOrHybridRetirementRejectionDocumentEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-document/rural-or-hybrid-retirement-rejection-document.entity';
import { RuralOrHybridRetirementRejectionDocumentId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-document/value-object/rural-or-hybrid-retirement-rejection-document-id.value-object';
import { RuralOrHybridRetirementRejectionInssBenefitEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-inss-benefit/rural-or-hybrid-retirement-rejection-inss-benefit.entity';
import { RuralOrHybridRetirementRejectionInssBenefitId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-inss-benefit/value-object/rural-or-hybrid-retirement-rejection-inss-benefit-id.value-object';
import { RuralOrHybridRetirementRejectionLegalProceedingEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-legal-proceeding/rural-or-hybrid-retirement-rejection-legal-proceeding.entity';
import { RuralOrHybridRetirementRejectionLegalProceedingId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-legal-proceeding/value-object/rural-or-hybrid-retirement-rejection-legal-proceeding-id.value-object';
import { UpdateRuralOrHybridRetirementRejectionRequestDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/request/update-rural-or-hybrid-retirement-rejection.request.dto';
import { UpdateRuralOrHybridRetirementRejectionResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/response/update-rural-or-hybrid-retirement-rejection.response.dto';
import { RuralOrHybridRetirementRejectionNotFoundError } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/error/rural-or-hybrid-retirement-rejection-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UpdateRuralOrHybridRetirementRejectionUseCase {
  protected readonly _type = UpdateRuralOrHybridRetirementRejectionUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(RuralOrHybridRetirementRejectionQueryRepositoryGateway)
    private readonly ruralOrHybridRetirementRejectionQueryRepositoryGateway: RuralOrHybridRetirementRejectionQueryRepositoryGateway,
    @Inject(RuralOrHybridRetirementRejectionCommandRepositoryGateway)
    private readonly ruralOrHybridRetirementRejectionCommandRepositoryGateway: RuralOrHybridRetirementRejectionCommandRepositoryGateway,
    @Inject(RuralOrHybridRetirementRejectionDocumentCommandRepositoryGateway)
    private readonly ruralOrHybridRetirementRejectionDocumentCommandRepositoryGateway: RuralOrHybridRetirementRejectionDocumentCommandRepositoryGateway,
    @Inject(RuralOrHybridRetirementRejectionInssBenefitCommandRepositoryGateway)
    private readonly ruralOrHybridRetirementRejectionInssBenefitCommandRepositoryGateway: RuralOrHybridRetirementRejectionInssBenefitCommandRepositoryGateway,
    @Inject(
      RuralOrHybridRetirementRejectionLegalProceedingCommandRepositoryGateway,
    )
    private readonly ruralOrHybridRetirementRejectionLegalProceedingCommandRepositoryGateway: RuralOrHybridRetirementRejectionLegalProceedingCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId,
    dto: UpdateRuralOrHybridRetirementRejectionRequestDto,
  ): Promise<UpdateRuralOrHybridRetirementRejectionResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const existing =
      await this.ruralOrHybridRetirementRejectionQueryRepositoryGateway.findOneByRuralOrHybridRetirementRejectionIdOrFailWithRelations(
        ruralOrHybridRetirementRejectionId,
        RuralOrHybridRetirementRejectionNotFoundError,
      );

    const updated = new RuralOrHybridRetirementRejectionEntity({
      id: ruralOrHybridRetirementRejectionId,
      analysisName: dto.analysisName ?? existing.analysisName,
      activityType: dto.activityType ?? existing.activityType,
      requestedBenefit: dto.requestedBenefit ?? existing.requestedBenefit,
      applicationSubmissionDate:
        dto.applicationSubmissionDate ?? existing.applicationSubmissionDate,
      dateOfRejection: dto.dateOfRejection ?? existing.dateOfRejection,
      ruralOrHybridRetirementRejectionResultId:
        existing.ruralOrHybridRetirementRejectionResult?.id ?? null,
    });

    const transactions: TransactionType[] = [
      this.ruralOrHybridRetirementRejectionCommandRepositoryGateway.updateRuralOrHybridRetirementRejection(
        ruralOrHybridRetirementRejectionId,
        updated,
      ),
    ];

    if (dto.documents !== undefined) {
      for (const doc of existing.ruralOrHybridRetirementRejectionDocument ?? []) {
        transactions.push(
          this.ruralOrHybridRetirementRejectionDocumentCommandRepositoryGateway.deleteRuralOrHybridRetirementRejectionDocument(
            doc.id,
          ),
        );
      }

      if (dto.documents.length > 0) {
        const documentTransactions = await Promise.all(
          dto.documents.map(async (documentDto) => {
            const buffer = documentDto.file.base64.decodeToBuffer();

            const fileModel = FileModel.build({
              buffer,
              originalName: documentDto.file.originalFileName,
              size: buffer.length,
              encoding: '7bit',
            });

            const documentUrl =
              await this.fileProcessorGateway.uploadFile(fileModel);

            return this.ruralOrHybridRetirementRejectionDocumentCommandRepositoryGateway.createRuralOrHybridRetirementRejectionDocument(
              new RuralOrHybridRetirementRejectionDocumentEntity({
                id: new RuralOrHybridRetirementRejectionDocumentId(),
                document: documentUrl,
                type: documentDto.type,
                ruralOrHybridRetirementRejectionId,
              }),
            );
          }),
        );

        transactions.push(...documentTransactions);
      }
    }

    if (dto.inssBenefitNumber !== undefined) {
      for (const benefit of existing.ruralOrHybridRetirementRejectionInssBenefit ?? []) {
        transactions.push(
          this.ruralOrHybridRetirementRejectionInssBenefitCommandRepositoryGateway.deleteRuralOrHybridRetirementRejectionInssBenefit(
            benefit.id,
          ),
        );
      }

      transactions.push(
        ...dto.inssBenefitNumber.map((inssBenefit) =>
          this.ruralOrHybridRetirementRejectionInssBenefitCommandRepositoryGateway.createRuralOrHybridRetirementRejectionInssBenefit(
            new RuralOrHybridRetirementRejectionInssBenefitEntity({
              id: new RuralOrHybridRetirementRejectionInssBenefitId(),
              inssBenefit,
              ruralOrHybridRetirementRejectionId,
            }),
          ),
        ),
      );
    }

    if (dto.legalProceedingNumber !== undefined) {
      for (const lp of existing.ruralOrHybridRetirementRejectionLegalProceeding ?? []) {
        transactions.push(
          this.ruralOrHybridRetirementRejectionLegalProceedingCommandRepositoryGateway.deleteRuralOrHybridRetirementRejectionLegalProceeding(
            lp.id,
          ),
        );
      }

      transactions.push(
        ...dto.legalProceedingNumber.map((legalProceedingNumber) =>
          this.ruralOrHybridRetirementRejectionLegalProceedingCommandRepositoryGateway.createRuralOrHybridRetirementRejectionLegalProceeding(
            new RuralOrHybridRetirementRejectionLegalProceedingEntity({
              id: new RuralOrHybridRetirementRejectionLegalProceedingId(),
              legalProceedingNumber,
              ruralOrHybridRetirementRejectionId,
            }),
          ),
        ),
      );
    }

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return UpdateRuralOrHybridRetirementRejectionResponseDto.build({
      ruralOrHybridRetirementRejectionId,
    });
  }
}
