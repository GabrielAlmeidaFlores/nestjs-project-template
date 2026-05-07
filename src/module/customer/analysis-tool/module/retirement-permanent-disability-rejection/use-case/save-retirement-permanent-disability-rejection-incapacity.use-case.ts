import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { RetirementPermanentDisabilityRejectionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/repository/retirement-permanent-disability-rejection/command/retirement-permanent-disability-rejection.command.repository.gateway';
import { RetirementPermanentDisabilityRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/repository/retirement-permanent-disability-rejection/query/retirement-permanent-disability-rejection.query.repository.gateway';
import { RetirementPermanentDisabilityRejectionIncapacityCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/repository/retirement-permanent-disability-rejection-incapacity/command/retirement-permanent-disability-rejection-incapacity.command.repository.gateway';
import { RetirementPermanentDisabilityRejectionIncapacityCidCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/repository/retirement-permanent-disability-rejection-incapacity-cid/command/retirement-permanent-disability-rejection-incapacity-cid.command.repository.gateway';
import { RetirementPermanentDisabilityRejectionIncapacityDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/repository/retirement-permanent-disability-rejection-incapacity-document/command/retirement-permanent-disability-rejection-incapacity-document.command.repository.gateway';
import { RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/repository/retirement-permanent-disability-rejection-incapacity-previous-benefit/command/retirement-permanent-disability-rejection-incapacity-previous-benefit.command.repository.gateway';
import { RetirementPermanentDisabilityRejectionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection/value-object/retirement-permanent-disability-rejection-id/retirement-permanent-disability-rejection-id.value-object';
import { RetirementPermanentDisabilityRejectionIncapacityEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity/retirement-permanent-disability-rejection-incapacity.entity';
import { RetirementPermanentDisabilityRejectionIncapacityId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity/value-object/retirement-permanent-disability-rejection-incapacity-id/retirement-permanent-disability-rejection-incapacity-id.value-object';
import { RetirementPermanentDisabilityRejectionIncapacityCidTypeEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity-cid/enum/retirement-permanent-disability-rejection-incapacity-cid-type.enum';
import { RetirementPermanentDisabilityRejectionIncapacityCidEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity-cid/retirement-permanent-disability-rejection-incapacity-cid.entity';
import { RetirementPermanentDisabilityRejectionIncapacityCidId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity-cid/value-object/retirement-permanent-disability-rejection-incapacity-cid-id/retirement-permanent-disability-rejection-incapacity-cid-id.value-object';
import { RetirementPermanentDisabilityRejectionIncapacityDocumentTypeEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity-document/enum/retirement-permanent-disability-rejection-incapacity-document-type.enum';
import { RetirementPermanentDisabilityRejectionIncapacityDocumentEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity-document/retirement-permanent-disability-rejection-incapacity-document.entity';
import { RetirementPermanentDisabilityRejectionIncapacityDocumentId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity-document/value-object/retirement-permanent-disability-rejection-incapacity-document-id/retirement-permanent-disability-rejection-incapacity-document-id.value-object';
import { RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity-previous-benefit/retirement-permanent-disability-rejection-incapacity-previous-benefit.entity';
import { RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity-previous-benefit/value-object/retirement-permanent-disability-rejection-incapacity-previous-benefit-id/retirement-permanent-disability-rejection-incapacity-previous-benefit-id.value-object';
import { SaveRetirementPermanentDisabilityRejectionIncapacityRequestDto } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/dto/request/save-retirement-permanent-disability-rejection-incapacity.request.dto';
import { SaveRetirementPermanentDisabilityRejectionIncapacityResponseDto } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/dto/response/save-retirement-permanent-disability-rejection-incapacity.response.dto';
import { RetirementPermanentDisabilityRejectionNotFoundError } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/error/retirement-permanent-disability-rejection-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class SaveRetirementPermanentDisabilityRejectionIncapacityUseCase {
  protected readonly _type =
    SaveRetirementPermanentDisabilityRejectionIncapacityUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(RetirementPermanentDisabilityRejectionQueryRepositoryGateway)
    private readonly retirementPermanentDisabilityRejectionQueryRepositoryGateway: RetirementPermanentDisabilityRejectionQueryRepositoryGateway,
    @Inject(RetirementPermanentDisabilityRejectionCommandRepositoryGateway)
    private readonly retirementPermanentDisabilityRejectionCommandRepositoryGateway: RetirementPermanentDisabilityRejectionCommandRepositoryGateway,
    @Inject(
      RetirementPermanentDisabilityRejectionIncapacityCommandRepositoryGateway,
    )
    private readonly retirementPermanentDisabilityRejectionIncapacityCommandRepositoryGateway: RetirementPermanentDisabilityRejectionIncapacityCommandRepositoryGateway,
    @Inject(
      RetirementPermanentDisabilityRejectionIncapacityCidCommandRepositoryGateway,
    )
    private readonly retirementPermanentDisabilityRejectionIncapacityCidCommandRepositoryGateway: RetirementPermanentDisabilityRejectionIncapacityCidCommandRepositoryGateway,
    @Inject(
      RetirementPermanentDisabilityRejectionIncapacityDocumentCommandRepositoryGateway,
    )
    private readonly retirementPermanentDisabilityRejectionIncapacityDocumentCommandRepositoryGateway: RetirementPermanentDisabilityRejectionIncapacityDocumentCommandRepositoryGateway,
    @Inject(
      RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitCommandRepositoryGateway,
    )
    private readonly retirementPermanentDisabilityRejectionIncapacityPreviousBenefitCommandRepositoryGateway: RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    retirementPermanentDisabilityRejectionId: RetirementPermanentDisabilityRejectionId,
    dto: SaveRetirementPermanentDisabilityRejectionIncapacityRequestDto,
  ): Promise<SaveRetirementPermanentDisabilityRejectionIncapacityResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const existing =
      await this.retirementPermanentDisabilityRejectionQueryRepositoryGateway.findOneByRetirementPermanentDisabilityRejectionIdOrFailWithRelations(
        retirementPermanentDisabilityRejectionId,
        RetirementPermanentDisabilityRejectionNotFoundError,
      );

    const existingIncapacity =
      existing.retirementPermanentDisabilityRejectionIncapacity;

    const incapacityId =
      existingIncapacity?.id ??
      new RetirementPermanentDisabilityRejectionIncapacityId();

    const incapacityEntity =
      new RetirementPermanentDisabilityRejectionIncapacityEntity({
        id: incapacityId,
        incapacityStartDate: dto.incapacityStartDate ?? null,
        diseaseDescription: dto.diseaseDescription ?? null,
        isIncapacityFromAccident: dto.isIncapacityFromAccident,
        incapacitatingEventDescription:
          dto.incapacitatingEventDescription ?? null,
        isIncapacityFromSeriousDisease: dto.isIncapacityFromSeriousDisease,
        seriousDiseaseType: dto.seriousDiseaseType ?? null,
        seriousDiseaseOtherDescription:
          dto.seriousDiseaseOtherDescription ?? null,
        seriousDiseaseStartDate: dto.seriousDiseaseStartDate ?? null,
        needsPermanentAssistance: dto.needsPermanentAssistance,
        hasPreviousIncapacityBenefit: dto.hasPreviousIncapacityBenefit,
      });

    const transactions: TransactionType[] = [];

    if (existingIncapacity !== null) {
      transactions.push(
        this.retirementPermanentDisabilityRejectionIncapacityCidCommandRepositoryGateway.deleteAllRetirementPermanentDisabilityRejectionIncapacityCidsByIncapacityId(
          incapacityId,
        ),
        this.retirementPermanentDisabilityRejectionIncapacityDocumentCommandRepositoryGateway.deleteAllRetirementPermanentDisabilityRejectionIncapacityDocumentsByIncapacityId(
          incapacityId,
        ),
        this.retirementPermanentDisabilityRejectionIncapacityPreviousBenefitCommandRepositoryGateway.deleteAllRetirementPermanentDisabilityRejectionIncapacityPreviousBenefitsByIncapacityId(
          incapacityId,
        ),
        this.retirementPermanentDisabilityRejectionIncapacityCommandRepositoryGateway.updateRetirementPermanentDisabilityRejectionIncapacity(
          incapacityId,
          incapacityEntity,
        ),
      );
    } else {
      transactions.push(
        this.retirementPermanentDisabilityRejectionIncapacityCommandRepositoryGateway.createRetirementPermanentDisabilityRejectionIncapacity(
          incapacityEntity,
        ),
        this.retirementPermanentDisabilityRejectionCommandRepositoryGateway.updateRetirementPermanentDisabilityRejectionIncapacityId(
          retirementPermanentDisabilityRejectionId,
          incapacityId,
        ),
      );
    }

    for (const cid of dto.cids ?? []) {
      transactions.push(
        this.retirementPermanentDisabilityRejectionIncapacityCidCommandRepositoryGateway.createRetirementPermanentDisabilityRejectionIncapacityCid(
          new RetirementPermanentDisabilityRejectionIncapacityCidEntity({
            id: new RetirementPermanentDisabilityRejectionIncapacityCidId(),
            cid,
            type: RetirementPermanentDisabilityRejectionIncapacityCidTypeEnum.MAIN_INCAPACITY,
            retirementPermanentDisabilityRejectionIncapacityId: incapacityId,
          }),
        ),
      );
    }

    for (const cid of dto.previousBenefitCids ?? []) {
      transactions.push(
        this.retirementPermanentDisabilityRejectionIncapacityCidCommandRepositoryGateway.createRetirementPermanentDisabilityRejectionIncapacityCid(
          new RetirementPermanentDisabilityRejectionIncapacityCidEntity({
            id: new RetirementPermanentDisabilityRejectionIncapacityCidId(),
            cid,
            type: RetirementPermanentDisabilityRejectionIncapacityCidTypeEnum.PREVIOUS_BENEFIT,
            retirementPermanentDisabilityRejectionIncapacityId: incapacityId,
          }),
        ),
      );
    }

    for (const pb of dto.previousBenefits ?? []) {
      transactions.push(
        this.retirementPermanentDisabilityRejectionIncapacityPreviousBenefitCommandRepositoryGateway.createRetirementPermanentDisabilityRejectionIncapacityPreviousBenefit(
          new RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitEntity(
            {
              id: new RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitId(),
              benefitNumber: pb.benefitNumber,
              startDate: pb.startDate ?? null,
              endDate: pb.endDate ?? null,
              retirementPermanentDisabilityRejectionIncapacityId: incapacityId,
            },
          ),
        ),
      );
    }

    const permanentAssistanceDocTransactions =
      await this.buildIncapacityDocumentTransactions(
        dto.permanentAssistanceDocuments ?? [],
        incapacityId,
        RetirementPermanentDisabilityRejectionIncapacityDocumentTypeEnum.PERMANENT_ASSISTANCE,
      );

    const benefitDeclarationDocTransactions =
      await this.buildIncapacityDocumentTransactions(
        dto.previousBenefitDocuments ?? [],
        incapacityId,
        RetirementPermanentDisabilityRejectionIncapacityDocumentTypeEnum.BENEFIT_DECLARATION,
      );

    transactions.push(
      ...permanentAssistanceDocTransactions,
      ...benefitDeclarationDocTransactions,
    );

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return SaveRetirementPermanentDisabilityRejectionIncapacityResponseDto.build(
      {
        retirementPermanentDisabilityRejectionId,
      },
    );
  }

  private async buildIncapacityDocumentTransactions(
    files: SaveRetirementPermanentDisabilityRejectionIncapacityRequestDto['permanentAssistanceDocuments'],
    incapacityId: RetirementPermanentDisabilityRejectionIncapacityId,
    type: RetirementPermanentDisabilityRejectionIncapacityDocumentTypeEnum,
  ): Promise<TransactionType[]> {
    if (!files || files.length === 0) {
      return [];
    }

    return Promise.all(
      files.map(async (fileDto) => {
        const buffer = fileDto.base64.decodeToBuffer();

        const fileModel = FileModel.build({
          buffer,
          originalName: fileDto.originalFileName,
          size: buffer.length,
          encoding: '7bit',
        });

        const documentUrl =
          await this.fileProcessorGateway.uploadFile(fileModel);

        return this.retirementPermanentDisabilityRejectionIncapacityDocumentCommandRepositoryGateway.createRetirementPermanentDisabilityRejectionIncapacityDocument(
          new RetirementPermanentDisabilityRejectionIncapacityDocumentEntity({
            id: new RetirementPermanentDisabilityRejectionIncapacityDocumentId(),
            document: documentUrl,
            type,
            retirementPermanentDisabilityRejectionIncapacityId: incapacityId,
          }),
        );
      }),
    );
  }
}
