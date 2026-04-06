import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { DisabilityRetirementPlanningGrantCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant/command/disability-retirement-planning-grant.command.repository.gateway';
import { DisabilityRetirementPlanningGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant/query/disability-retirement-planning-grant.query.repository.gateway';
import { DisabilityRetirementPlanningGrantDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant-document/command/disability-retirement-planning-grant-document.command.repository.gateway';
import { DisabilityRetirementPlanningGrantInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant-inss-benefit/command/disability-retirement-planning-grant-inss-benefit.command.repository.gateway';
import { DisabilityRetirementPlanningGrantLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant-legal-proceeding/command/disability-retirement-planning-grant-legal-proceeding.command.repository.gateway';
import { DisabilityRetirementPlanningGrantEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/disability-retirement-planning-grant.entity';
import { DisabilityRetirementPlanningGrantId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/value-object/disability-retirement-planning-grant-id.value-object';
import { DisabilityRetirementPlanningGrantDocumentEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-document/disability-retirement-planning-grant-document.entity';
import { DisabilityRetirementPlanningGrantDocumentId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-document/value-object/disability-retirement-planning-grant-document-id.value-object';
import { DisabilityRetirementPlanningGrantInssBenefitEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-inss-benefit/disability-retirement-planning-grant-inss-benefit.entity';
import { DisabilityRetirementPlanningGrantInssBenefitId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-inss-benefit/value-object/disability-retirement-planning-grant-inss-benefit-id.value-object';
import { DisabilityRetirementPlanningGrantLegalProceedingEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-legal-proceeding/disability-retirement-planning-grant-legal-proceeding.entity';
import { DisabilityRetirementPlanningGrantLegalProceedingId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-legal-proceeding/value-object/disability-retirement-planning-grant-legal-proceeding-id.value-object';
import { UpdateDisabilityRetirementPlanningGrantRequestDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/dto/request/update-disability-retirement-planning-grant.request.dto';
import { UpdateDisabilityRetirementPlanningGrantResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/dto/response/update-disability-retirement-planning-grant.response.dto';
import { DisabilityRetirementPlanningGrantNotFoundError } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/error/disability-retirement-planning-grant-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UpdateDisabilityRetirementPlanningGrantUseCase {
  protected readonly _type =
    UpdateDisabilityRetirementPlanningGrantUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(DisabilityRetirementPlanningGrantQueryRepositoryGateway)
    private readonly disabilityRetirementPlanningGrantQueryRepositoryGateway: DisabilityRetirementPlanningGrantQueryRepositoryGateway,
    @Inject(DisabilityRetirementPlanningGrantCommandRepositoryGateway)
    private readonly disabilityRetirementPlanningGrantCommandRepositoryGateway: DisabilityRetirementPlanningGrantCommandRepositoryGateway,
    @Inject(DisabilityRetirementPlanningGrantDocumentCommandRepositoryGateway)
    private readonly disabilityRetirementPlanningGrantDocumentCommandRepositoryGateway: DisabilityRetirementPlanningGrantDocumentCommandRepositoryGateway,
    @Inject(
      DisabilityRetirementPlanningGrantInssBenefitCommandRepositoryGateway,
    )
    private readonly disabilityRetirementPlanningGrantInssBenefitCommandRepositoryGateway: DisabilityRetirementPlanningGrantInssBenefitCommandRepositoryGateway,
    @Inject(
      DisabilityRetirementPlanningGrantLegalProceedingCommandRepositoryGateway,
    )
    private readonly disabilityRetirementPlanningGrantLegalProceedingCommandRepositoryGateway: DisabilityRetirementPlanningGrantLegalProceedingCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    disabilityRetirementPlanningGrantId: DisabilityRetirementPlanningGrantId,
    dto: UpdateDisabilityRetirementPlanningGrantRequestDto,
  ): Promise<UpdateDisabilityRetirementPlanningGrantResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const existingGrant =
      await this.disabilityRetirementPlanningGrantQueryRepositoryGateway.findOneByDisabilityRetirementPlanningGrantIdOrFailWithRelations(
        disabilityRetirementPlanningGrantId,
        DisabilityRetirementPlanningGrantNotFoundError,
      );

    const updatedGrant = new DisabilityRetirementPlanningGrantEntity({
      id: disabilityRetirementPlanningGrantId,
      category: dto.category ?? existingGrant.category,
      analysisName: dto.analysisName ?? existingGrant.analysisName,
      longPrizeDisability:
        dto.longPrizeDisability ?? existingGrant.longPrizeDisability,
      disabilityRetirementPlanningGrantResultId:
        existingGrant.disabilityRetirementPlanningGrantResult?.id ?? null,
    });

    const transactions: TransactionType[] = [
      this.disabilityRetirementPlanningGrantCommandRepositoryGateway.updateDisabilityRetirementPlanningGrant(
        disabilityRetirementPlanningGrantId,
        updatedGrant,
      ),
    ];

    if (dto.documents !== undefined) {
      transactions.push(
        this.disabilityRetirementPlanningGrantDocumentCommandRepositoryGateway.deleteAllByDisabilityRetirementPlanningGrantId(
          disabilityRetirementPlanningGrantId,
        ),
      );

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

            return this.disabilityRetirementPlanningGrantDocumentCommandRepositoryGateway.createDisabilityRetirementPlanningGrantDocument(
              new DisabilityRetirementPlanningGrantDocumentEntity({
                id: new DisabilityRetirementPlanningGrantDocumentId(),
                document: documentUrl,
                type: documentDto.type,
                disabilityRetirementPlanningGrantId,
              }),
            );
          }),
        );

        transactions.push(...documentTransactions);
      }
    }

    if (dto.inssBenefitNumber !== undefined) {
      transactions.push(
        this.disabilityRetirementPlanningGrantInssBenefitCommandRepositoryGateway.deleteAllByDisabilityRetirementPlanningGrantId(
          disabilityRetirementPlanningGrantId,
        ),
      );

      transactions.push(
        ...dto.inssBenefitNumber.map((inssBenefit) =>
          this.disabilityRetirementPlanningGrantInssBenefitCommandRepositoryGateway.createDisabilityRetirementPlanningGrantInssBenefit(
            new DisabilityRetirementPlanningGrantInssBenefitEntity({
              id: new DisabilityRetirementPlanningGrantInssBenefitId(),
              inssBenefit,
              disabilityRetirementPlanningGrantId,
            }),
          ),
        ),
      );
    }

    if (dto.legalProceedingNumber !== undefined) {
      transactions.push(
        this.disabilityRetirementPlanningGrantLegalProceedingCommandRepositoryGateway.deleteAllByDisabilityRetirementPlanningGrantId(
          disabilityRetirementPlanningGrantId,
        ),
      );

      transactions.push(
        ...dto.legalProceedingNumber.map((legalProceedingNumber) =>
          this.disabilityRetirementPlanningGrantLegalProceedingCommandRepositoryGateway.createDisabilityRetirementPlanningGrantLegalProceeding(
            new DisabilityRetirementPlanningGrantLegalProceedingEntity({
              id: new DisabilityRetirementPlanningGrantLegalProceedingId(),
              legalProceedingNumber,
              disabilityRetirementPlanningGrantId,
            }),
          ),
        ),
      );
    }

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return UpdateDisabilityRetirementPlanningGrantResponseDto.build({
      disabilityRetirementPlanningGrantId,
    });
  }
}
