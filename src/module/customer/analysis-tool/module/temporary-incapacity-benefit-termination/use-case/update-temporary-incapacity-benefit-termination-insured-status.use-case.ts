import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { TemporaryIncapacityBenefitTerminationQueryRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/repository/temporary-incapacity-benefit-termination/query/temporary-incapacity-benefit-termination.query.repository.gateway';
import { TemporaryIncapacityBenefitTerminationInsuredStatusCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/repository/temporary-incapacity-benefit-termination-insured-status/command/temporary-incapacity-benefit-termination-insured-status.command.repository.gateway';
import { TemporaryIncapacityBenefitTerminationInsuredStatusDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/repository/temporary-incapacity-benefit-termination-insured-status-document/command/temporary-incapacity-benefit-termination-insured-status-document.command.repository.gateway';
import { TemporaryIncapacityBenefitTerminationId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/value-object/temporary-incapacity-benefit-termination-id.value-object';
import { TemporaryIncapacityBenefitTerminationInsuredStatusEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-insured-status/temporary-incapacity-benefit-termination-insured-status.entity';
import { TemporaryIncapacityBenefitTerminationInsuredStatusId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-insured-status/value-object/temporary-incapacity-benefit-termination-insured-status-id.value-object';
import { TemporaryIncapacityBenefitTerminationInsuredStatusDocumentEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-insured-status-document/temporary-incapacity-benefit-termination-insured-status-document.entity';
import { TemporaryIncapacityBenefitTerminationInsuredStatusDocumentId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-insured-status-document/value-object/temporary-incapacity-benefit-termination-insured-status-document-id.value-object';
import { UpdateTemporaryIncapacityBenefitTerminationInsuredStatusRequestDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/dto/request/update-temporary-incapacity-benefit-termination-insured-status.request.dto';
import { UpdateTemporaryIncapacityBenefitTerminationInsuredStatusResponseDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/dto/response/update-temporary-incapacity-benefit-termination-insured-status.response.dto';
import { TemporaryIncapacityBenefitTerminationInsuredStatusNotFoundError } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/error/temporary-incapacity-benefit-termination-insured-status-not-found.error';
import { TemporaryIncapacityBenefitTerminationNotFoundError } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/error/temporary-incapacity-benefit-termination-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UpdateTemporaryIncapacityBenefitTerminationInsuredStatusUseCase {
  protected readonly _type =
    UpdateTemporaryIncapacityBenefitTerminationInsuredStatusUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(TemporaryIncapacityBenefitTerminationQueryRepositoryGateway)
    private readonly temporaryIncapacityBenefitTerminationQueryRepositoryGateway: TemporaryIncapacityBenefitTerminationQueryRepositoryGateway,
    @Inject(
      TemporaryIncapacityBenefitTerminationInsuredStatusCommandRepositoryGateway,
    )
    private readonly temporaryIncapacityBenefitTerminationInsuredStatusCommandRepositoryGateway: TemporaryIncapacityBenefitTerminationInsuredStatusCommandRepositoryGateway,
    @Inject(
      TemporaryIncapacityBenefitTerminationInsuredStatusDocumentCommandRepositoryGateway,
    )
    private readonly temporaryIncapacityBenefitTerminationInsuredStatusDocumentCommandRepositoryGateway: TemporaryIncapacityBenefitTerminationInsuredStatusDocumentCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    temporaryIncapacityBenefitTerminationId: TemporaryIncapacityBenefitTerminationId,
    dto: UpdateTemporaryIncapacityBenefitTerminationInsuredStatusRequestDto,
  ): Promise<UpdateTemporaryIncapacityBenefitTerminationInsuredStatusResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const queryResult =
      await this.temporaryIncapacityBenefitTerminationQueryRepositoryGateway.findOneByTemporaryIncapacityBenefitTerminationIdOrFailWithRelations(
        temporaryIncapacityBenefitTerminationId,
        TemporaryIncapacityBenefitTerminationNotFoundError,
      );

    if (queryResult.insuredStatus.length === 0) {
      throw new TemporaryIncapacityBenefitTerminationInsuredStatusNotFoundError();
    }

    const insuredStatusId =
      new TemporaryIncapacityBenefitTerminationInsuredStatusId();

    const insuredStatus =
      new TemporaryIncapacityBenefitTerminationInsuredStatusEntity({
        id: insuredStatusId,
        involuntaryUnemployment: dto.involuntaryUnemployment,
        intentionToProveInvoluntaryUnemployment:
          dto.intentionToProveInvoluntaryUnemployment,
        ruralInsuredClient: dto.ruralInsuredClient,
        ruralPeriodStartDate: dto.ruralPeriodStartDate ?? null,
        ruralPeriodEndDate: dto.ruralPeriodEndDate ?? null,
        documentsDescription: dto.documentsDescription ?? null,
        temporaryIncapacityBenefitTerminationId,
      });

    const transactions: TransactionType[] = [
      this.temporaryIncapacityBenefitTerminationInsuredStatusCommandRepositoryGateway.deleteAllByTemporaryIncapacityBenefitTerminationId(
        temporaryIncapacityBenefitTerminationId,
      ),
      this.temporaryIncapacityBenefitTerminationInsuredStatusCommandRepositoryGateway.createTemporaryIncapacityBenefitTerminationInsuredStatus(
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

          return this.temporaryIncapacityBenefitTerminationInsuredStatusDocumentCommandRepositoryGateway.createTemporaryIncapacityBenefitTerminationInsuredStatusDocument(
            new TemporaryIncapacityBenefitTerminationInsuredStatusDocumentEntity(
              {
                id: new TemporaryIncapacityBenefitTerminationInsuredStatusDocumentId(),
                fileName,
                type: documentDto.type,
                temporaryIncapacityBenefitTerminationInsuredStatusId:
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

    return UpdateTemporaryIncapacityBenefitTerminationInsuredStatusResponseDto.build(
      {
        temporaryIncapacityBenefitTerminationId,
      },
    );
  }
}
