import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { RetirementPermanentDisabilityRejectionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/repository/retirement-permanent-disability-rejection/command/retirement-permanent-disability-rejection.command.repository.gateway';
import { RetirementPermanentDisabilityRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/repository/retirement-permanent-disability-rejection/query/retirement-permanent-disability-rejection.query.repository.gateway';
import { RetirementPermanentDisabilityRejectionInsuredQualityCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/repository/retirement-permanent-disability-rejection-insured-quality/command/retirement-permanent-disability-rejection-insured-quality.command.repository.gateway';
import { RetirementPermanentDisabilityRejectionInsuredQualityDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/repository/retirement-permanent-disability-rejection-insured-quality-document/command/retirement-permanent-disability-rejection-insured-quality-document.command.repository.gateway';
import { RetirementPermanentDisabilityRejectionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection/value-object/retirement-permanent-disability-rejection-id/retirement-permanent-disability-rejection-id.value-object';
import { RetirementPermanentDisabilityRejectionInsuredQualityEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-insured-quality/retirement-permanent-disability-rejection-insured-quality.entity';
import { RetirementPermanentDisabilityRejectionInsuredQualityId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-insured-quality/value-object/retirement-permanent-disability-rejection-insured-quality-id/retirement-permanent-disability-rejection-insured-quality-id.value-object';
import { RetirementPermanentDisabilityRejectionInsuredQualityDocumentTypeEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-insured-quality-document/enum/retirement-permanent-disability-rejection-insured-quality-document-type.enum';
import { RetirementPermanentDisabilityRejectionInsuredQualityDocumentEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-insured-quality-document/retirement-permanent-disability-rejection-insured-quality-document.entity';
import { RetirementPermanentDisabilityRejectionInsuredQualityDocumentId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-insured-quality-document/value-object/retirement-permanent-disability-rejection-insured-quality-document-id/retirement-permanent-disability-rejection-insured-quality-document-id.value-object';
import { SaveRetirementPermanentDisabilityRejectionInsuredQualityRequestDto } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/dto/request/save-retirement-permanent-disability-rejection-insured-quality.request.dto';
import { SaveRetirementPermanentDisabilityRejectionInsuredQualityResponseDto } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/dto/response/save-retirement-permanent-disability-rejection-insured-quality.response.dto';
import { RetirementPermanentDisabilityRejectionNotFoundError } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/error/retirement-permanent-disability-rejection-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class SaveRetirementPermanentDisabilityRejectionInsuredQualityUseCase {
  protected readonly _type =
    SaveRetirementPermanentDisabilityRejectionInsuredQualityUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(RetirementPermanentDisabilityRejectionQueryRepositoryGateway)
    private readonly retirementPermanentDisabilityRejectionQueryRepositoryGateway: RetirementPermanentDisabilityRejectionQueryRepositoryGateway,
    @Inject(RetirementPermanentDisabilityRejectionCommandRepositoryGateway)
    private readonly retirementPermanentDisabilityRejectionCommandRepositoryGateway: RetirementPermanentDisabilityRejectionCommandRepositoryGateway,
    @Inject(
      RetirementPermanentDisabilityRejectionInsuredQualityCommandRepositoryGateway,
    )
    private readonly retirementPermanentDisabilityRejectionInsuredQualityCommandRepositoryGateway: RetirementPermanentDisabilityRejectionInsuredQualityCommandRepositoryGateway,
    @Inject(
      RetirementPermanentDisabilityRejectionInsuredQualityDocumentCommandRepositoryGateway,
    )
    private readonly retirementPermanentDisabilityRejectionInsuredQualityDocumentCommandRepositoryGateway: RetirementPermanentDisabilityRejectionInsuredQualityDocumentCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    retirementPermanentDisabilityRejectionId: RetirementPermanentDisabilityRejectionId,
    dto: SaveRetirementPermanentDisabilityRejectionInsuredQualityRequestDto,
  ): Promise<SaveRetirementPermanentDisabilityRejectionInsuredQualityResponseDto> {
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

    const existingInsuredQuality =
      existing.retirementPermanentDisabilityRejectionInsuredQuality;

    const insuredQualityId =
      existingInsuredQuality?.id ??
      new RetirementPermanentDisabilityRejectionInsuredQualityId();

    const insuredQualityEntity =
      new RetirementPermanentDisabilityRejectionInsuredQualityEntity({
        id: insuredQualityId,
        isInvoluntaryUnemployed: dto.isInvoluntaryUnemployed,
        intendsToProveInvoluntaryUnemployment:
          dto.intendsToProveInvoluntaryUnemployment ?? null,
        isRuralInsuredAtGeneratingFact: dto.isRuralInsuredAtGeneratingFact,
        ruralInsuredStartDate: dto.ruralInsuredStartDate ?? null,
        ruralInsuredEndDate: dto.ruralInsuredEndDate ?? null,
        ruralInsuredDescription: dto.ruralInsuredDescription ?? null,
      });

    const transactions: TransactionType[] = [];

    if (existingInsuredQuality !== null) {
      transactions.push(
        this.retirementPermanentDisabilityRejectionInsuredQualityDocumentCommandRepositoryGateway.deleteAllRetirementPermanentDisabilityRejectionInsuredQualityDocumentsByInsuredQualityId(
          insuredQualityId,
        ),
        this.retirementPermanentDisabilityRejectionInsuredQualityCommandRepositoryGateway.updateRetirementPermanentDisabilityRejectionInsuredQuality(
          insuredQualityId,
          insuredQualityEntity,
        ),
      );
    } else {
      transactions.push(
        this.retirementPermanentDisabilityRejectionInsuredQualityCommandRepositoryGateway.createRetirementPermanentDisabilityRejectionInsuredQuality(
          insuredQualityEntity,
        ),
        this.retirementPermanentDisabilityRejectionCommandRepositoryGateway.updateRetirementPermanentDisabilityRejectionInsuredQualityId(
          retirementPermanentDisabilityRejectionId,
          insuredQualityId,
        ),
      );
    }

    const unemploymentProofDocTransactions =
      await this.buildInsuredQualityDocumentTransactions(
        dto.involuntaryUnemploymentProofDocuments ?? [],
        insuredQualityId,
        RetirementPermanentDisabilityRejectionInsuredQualityDocumentTypeEnum.UNEMPLOYMENT_PROOF,
      );

    const ruralActivityDocTransactions =
      await this.buildInsuredQualityDocumentTransactions(
        dto.ruralActivityDocuments ?? [],
        insuredQualityId,
        RetirementPermanentDisabilityRejectionInsuredQualityDocumentTypeEnum.RURAL_ACTIVITY,
      );

    transactions.push(
      ...unemploymentProofDocTransactions,
      ...ruralActivityDocTransactions,
    );

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return SaveRetirementPermanentDisabilityRejectionInsuredQualityResponseDto.build(
      {
        retirementPermanentDisabilityRejectionId,
      },
    );
  }

  private async buildInsuredQualityDocumentTransactions(
    files: SaveRetirementPermanentDisabilityRejectionInsuredQualityRequestDto['involuntaryUnemploymentProofDocuments'],
    insuredQualityId: RetirementPermanentDisabilityRejectionInsuredQualityId,
    type: RetirementPermanentDisabilityRejectionInsuredQualityDocumentTypeEnum,
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

        return this.retirementPermanentDisabilityRejectionInsuredQualityDocumentCommandRepositoryGateway.createRetirementPermanentDisabilityRejectionInsuredQualityDocument(
          new RetirementPermanentDisabilityRejectionInsuredQualityDocumentEntity(
            {
              id: new RetirementPermanentDisabilityRejectionInsuredQualityDocumentId(),
              document: documentUrl,
              type,
              retirementPermanentDisabilityRejectionInsuredQualityId:
                insuredQualityId,
            },
          ),
        );
      }),
    );
  }
}
