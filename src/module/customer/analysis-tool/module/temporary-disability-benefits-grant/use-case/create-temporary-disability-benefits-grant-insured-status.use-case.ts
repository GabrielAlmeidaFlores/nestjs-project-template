import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { TemporaryDisabilityBenefitsGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/repository/temporary-disability-benefits-grant/query/temporary-disability-benefits-grant.query.repository.gateway';
import { TemporaryDisabilityBenefitsGrantInsuredStatusCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/repository/temporary-disability-benefits-grant-insured-status/command/temporary-disability-benefits-grant-insured-status.command.repository.gateway';
import { TemporaryDisabilityBenefitsGrantInsuredStatusDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/repository/temporary-disability-benefits-grant-insured-status-document/command/temporary-disability-benefits-grant-insured-status-document.command.repository.gateway';
import { TemporaryDisabilityBenefitsGrantId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/value-object/temporary-disability-benefits-grant-id.value-object';
import { TemporaryDisabilityBenefitsGrantInsuredStatusEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-insured-status/temporary-disability-benefits-grant-insured-status.entity';
import { TemporaryDisabilityBenefitsGrantInsuredStatusId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-insured-status/value-object/temporary-disability-benefits-grant-insured-status-id.value-object';
import { TemporaryDisabilityBenefitsGrantInsuredStatusDocumentEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-insured-status-document/temporary-disability-benefits-grant-insured-status-document.entity';
import { TemporaryDisabilityBenefitsGrantInsuredStatusDocumentId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-insured-status-document/value-object/temporary-disability-benefits-grant-insured-status-document-id.value-object';
import { CreateTemporaryDisabilityBenefitsGrantInsuredStatusRequestDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/dto/request/create-temporary-disability-benefits-grant-insured-status.request.dto';
import { CreateTemporaryDisabilityBenefitsGrantInsuredStatusResponseDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/dto/response/create-temporary-disability-benefits-grant-insured-status.response.dto';
import { TemporaryDisabilityBenefitsGrantNotFoundError } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/error/temporary-disability-benefits-grant-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class CreateTemporaryDisabilityBenefitsGrantInsuredStatusUseCase {
  protected readonly _type =
    CreateTemporaryDisabilityBenefitsGrantInsuredStatusUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(TemporaryDisabilityBenefitsGrantQueryRepositoryGateway)
    private readonly temporaryDisabilityBenefitsGrantQueryRepositoryGateway: TemporaryDisabilityBenefitsGrantQueryRepositoryGateway,
    @Inject(
      TemporaryDisabilityBenefitsGrantInsuredStatusCommandRepositoryGateway,
    )
    private readonly temporaryDisabilityBenefitsGrantInsuredStatusCommandRepositoryGateway: TemporaryDisabilityBenefitsGrantInsuredStatusCommandRepositoryGateway,
    @Inject(
      TemporaryDisabilityBenefitsGrantInsuredStatusDocumentCommandRepositoryGateway,
    )
    private readonly temporaryDisabilityBenefitsGrantInsuredStatusDocumentCommandRepositoryGateway: TemporaryDisabilityBenefitsGrantInsuredStatusDocumentCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    temporaryDisabilityBenefitsGrantId: TemporaryDisabilityBenefitsGrantId,
    dto: CreateTemporaryDisabilityBenefitsGrantInsuredStatusRequestDto,
  ): Promise<CreateTemporaryDisabilityBenefitsGrantInsuredStatusResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    await this.temporaryDisabilityBenefitsGrantQueryRepositoryGateway.findOneByTemporaryDisabilityBenefitsGrantIdOrFailWithRelations(
      temporaryDisabilityBenefitsGrantId,
      TemporaryDisabilityBenefitsGrantNotFoundError,
    );

    const insuredStatusId =
      new TemporaryDisabilityBenefitsGrantInsuredStatusId();

    const insuredStatus =
      new TemporaryDisabilityBenefitsGrantInsuredStatusEntity({
        id: insuredStatusId,
        involuntaryUnemployment: dto.involuntaryUnemployment,
        intentionToProveInvoluntaryUnemployment:
          dto.intentionToProveInvoluntaryUnemployment,
        ruralInsuredClient: dto.ruralInsuredClient,
        ruralPeriodStartDate: dto.ruralPeriodStartDate ?? null,
        ruralPeriodEndDate: dto.ruralPeriodEndDate ?? null,
        documentsDescription: dto.documentsDescription ?? null,
        temporaryDisabilityBenefitsGrantId,
      });

    const transactions: TransactionType[] = [
      this.temporaryDisabilityBenefitsGrantInsuredStatusCommandRepositoryGateway.createTemporaryDisabilityBenefitsGrantInsuredStatus(
        insuredStatus,
      ),
    ];

    if (dto.documents && dto.documents.length > 0) {
      const documentTransactions = await Promise.all(
        dto.documents.map(async (documentDto) => {
          const buffer = documentDto.file.base64.decodeToBuffer();

          const fileModel = FileModel.build({
            buffer,
            originalName: documentDto.file.originalFileName,
            size: buffer.length,
            encoding: '7bit',
          });

          const fileName =
            await this.fileProcessorGateway.uploadFile(fileModel);

          return this.temporaryDisabilityBenefitsGrantInsuredStatusDocumentCommandRepositoryGateway.createTemporaryDisabilityBenefitsGrantInsuredStatusDocument(
            new TemporaryDisabilityBenefitsGrantInsuredStatusDocumentEntity({
              id: new TemporaryDisabilityBenefitsGrantInsuredStatusDocumentId(),
              fileName,
              type: documentDto.type,
              temporaryDisabilityBenefitsGrantInsuredStatusId: insuredStatusId,
            }),
          );
        }),
      );

      transactions.push(...documentTransactions);
    }

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return CreateTemporaryDisabilityBenefitsGrantInsuredStatusResponseDto.build(
      {
        temporaryDisabilityBenefitsGrantId,
      },
    );
  }
}
