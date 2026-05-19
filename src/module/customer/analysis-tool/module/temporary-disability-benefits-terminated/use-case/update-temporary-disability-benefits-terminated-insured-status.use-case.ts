import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { TemporaryDisabilityBenefitsTerminatedQueryRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/repository/temporary-disability-benefits-terminated/query/temporary-disability-benefits-terminated.query.repository.gateway';
import { TemporaryDisabilityBenefitsTerminatedInsuredStatusCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/repository/temporary-disability-benefits-terminated-insured-status/command/temporary-disability-benefits-terminated-insured-status.command.repository.gateway';
import { TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/repository/temporary-disability-benefits-terminated-insured-status-document/command/temporary-disability-benefits-terminated-insured-status-document.command.repository.gateway';
import { TemporaryDisabilityBenefitsTerminatedId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/value-object/temporary-disability-benefits-terminated-id.value-object';
import { TemporaryDisabilityBenefitsTerminatedInsuredStatusEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-insured-status/temporary-disability-benefits-terminated-insured-status.entity';
import { TemporaryDisabilityBenefitsTerminatedInsuredStatusId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-insured-status/value-object/temporary-disability-benefits-terminated-insured-status-id.value-object';
import { TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-insured-status-document/temporary-disability-benefits-terminated-insured-status-document.entity';
import { TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-insured-status-document/value-object/temporary-disability-benefits-terminated-insured-status-document-id.value-object';
import { UpdateTemporaryDisabilityBenefitsTerminatedInsuredStatusRequestDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/dto/request/update-temporary-disability-benefits-terminated-insured-status.request.dto';
import { UpdateTemporaryDisabilityBenefitsTerminatedInsuredStatusResponseDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/dto/response/update-temporary-disability-benefits-terminated-insured-status.response.dto';
import { TemporaryDisabilityBenefitsTerminatedInsuredStatusNotFoundError } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/error/temporary-disability-benefits-terminated-insured-status-not-found.error';
import { TemporaryDisabilityBenefitsTerminatedNotFoundError } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/error/temporary-disability-benefits-terminated-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UpdateTemporaryDisabilityBenefitsTerminatedInsuredStatusUseCase {
  protected readonly _type =
    UpdateTemporaryDisabilityBenefitsTerminatedInsuredStatusUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(TemporaryDisabilityBenefitsTerminatedQueryRepositoryGateway)
    private readonly temporaryDisabilityBenefitsTerminatedQueryRepositoryGateway: TemporaryDisabilityBenefitsTerminatedQueryRepositoryGateway,
    @Inject(
      TemporaryDisabilityBenefitsTerminatedInsuredStatusCommandRepositoryGateway,
    )
    private readonly temporaryDisabilityBenefitsTerminatedInsuredStatusCommandRepositoryGateway: TemporaryDisabilityBenefitsTerminatedInsuredStatusCommandRepositoryGateway,
    @Inject(
      TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentCommandRepositoryGateway,
    )
    private readonly temporaryDisabilityBenefitsTerminatedInsuredStatusDocumentCommandRepositoryGateway: TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    temporaryDisabilityBenefitsTerminatedId: TemporaryDisabilityBenefitsTerminatedId,
    dto: UpdateTemporaryDisabilityBenefitsTerminatedInsuredStatusRequestDto,
  ): Promise<UpdateTemporaryDisabilityBenefitsTerminatedInsuredStatusResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const queryResult =
      await this.temporaryDisabilityBenefitsTerminatedQueryRepositoryGateway.findOneByTemporaryDisabilityBenefitsTerminatedIdOrFailWithRelations(
        temporaryDisabilityBenefitsTerminatedId,
        TemporaryDisabilityBenefitsTerminatedNotFoundError,
      );

    if (queryResult.insuredStatus.length === 0) {
      throw new TemporaryDisabilityBenefitsTerminatedInsuredStatusNotFoundError();
    }

    const insuredStatusId =
      new TemporaryDisabilityBenefitsTerminatedInsuredStatusId();

    const insuredStatus =
      new TemporaryDisabilityBenefitsTerminatedInsuredStatusEntity({
        id: insuredStatusId,
        involuntaryUnemployment: dto.involuntaryUnemployment,
        intentionToProveInvoluntaryUnemployment:
          dto.intentionToProveInvoluntaryUnemployment,
        ruralInsuredClient: dto.ruralInsuredClient,
        ruralPeriodStartDate: dto.ruralPeriodStartDate ?? null,
        ruralPeriodEndDate: dto.ruralPeriodEndDate ?? null,
        documentsDescription: dto.documentsDescription ?? null,
        temporaryDisabilityBenefitsTerminatedId,
      });

    const transactions: TransactionType[] = [
      this.temporaryDisabilityBenefitsTerminatedInsuredStatusCommandRepositoryGateway.deleteAllByTemporaryDisabilityBenefitsTerminatedId(
        temporaryDisabilityBenefitsTerminatedId,
      ),
      this.temporaryDisabilityBenefitsTerminatedInsuredStatusCommandRepositoryGateway.createTemporaryDisabilityBenefitsTerminatedInsuredStatus(
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

          return this.temporaryDisabilityBenefitsTerminatedInsuredStatusDocumentCommandRepositoryGateway.createTemporaryDisabilityBenefitsTerminatedInsuredStatusDocument(
            new TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentEntity(
              {
                id: new TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentId(),
                fileName,
                type: documentDto.type,
                temporaryDisabilityBenefitsTerminatedInsuredStatusId:
                  insuredStatusId,
              },
            ),
          );
        }),
      );

      transactions.push(...documentTransactions);
    }

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return UpdateTemporaryDisabilityBenefitsTerminatedInsuredStatusResponseDto.build(
      {
        temporaryDisabilityBenefitsTerminatedId,
      },
    );
  }
}
