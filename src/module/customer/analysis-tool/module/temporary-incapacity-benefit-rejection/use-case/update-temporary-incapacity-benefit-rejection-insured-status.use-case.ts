import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { TemporaryIncapacityBenefitRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/repository/temporary-incapacity-benefit-rejection/query/temporary-incapacity-benefit-rejection.query.repository.gateway';
import { TemporaryIncapacityBenefitRejectionInsuredStatusCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/repository/temporary-incapacity-benefit-rejection-insured-status/command/temporary-incapacity-benefit-rejection-insured-status.command.repository.gateway';
import { TemporaryIncapacityBenefitRejectionInsuredStatusDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/repository/temporary-incapacity-benefit-rejection-insured-status-document/command/temporary-incapacity-benefit-rejection-insured-status-document.command.repository.gateway';
import { TemporaryIncapacityBenefitRejectionId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/value-object/temporary-incapacity-benefit-rejection-id.value-object';
import { TemporaryIncapacityBenefitRejectionInsuredStatusEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-insured-status/temporary-incapacity-benefit-rejection-insured-status.entity';
import { TemporaryIncapacityBenefitRejectionInsuredStatusId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-insured-status/value-object/temporary-incapacity-benefit-rejection-insured-status-id.value-object';
import { TemporaryIncapacityBenefitRejectionInsuredStatusDocumentEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-insured-status-document/temporary-incapacity-benefit-rejection-insured-status-document.entity';
import { TemporaryIncapacityBenefitRejectionInsuredStatusDocumentId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-insured-status-document/value-object/temporary-incapacity-benefit-rejection-insured-status-document-id.value-object';
import { UpdateTemporaryIncapacityBenefitRejectionInsuredStatusRequestDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/dto/request/update-temporary-incapacity-benefit-rejection-insured-status.request.dto';
import { UpdateTemporaryIncapacityBenefitRejectionInsuredStatusResponseDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/dto/response/update-temporary-incapacity-benefit-rejection-insured-status.response.dto';
import { TemporaryIncapacityBenefitRejectionInsuredStatusNotFoundError } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/error/temporary-incapacity-benefit-rejection-insured-status-not-found.error';
import { TemporaryIncapacityBenefitRejectionNotFoundError } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/error/temporary-incapacity-benefit-rejection-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UpdateTemporaryIncapacityBenefitRejectionInsuredStatusUseCase {
  protected readonly _type =
    UpdateTemporaryIncapacityBenefitRejectionInsuredStatusUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(TemporaryIncapacityBenefitRejectionQueryRepositoryGateway)
    private readonly temporaryIncapacityBenefitRejectionQueryRepositoryGateway: TemporaryIncapacityBenefitRejectionQueryRepositoryGateway,
    @Inject(
      TemporaryIncapacityBenefitRejectionInsuredStatusCommandRepositoryGateway,
    )
    private readonly temporaryIncapacityBenefitRejectionInsuredStatusCommandRepositoryGateway: TemporaryIncapacityBenefitRejectionInsuredStatusCommandRepositoryGateway,
    @Inject(
      TemporaryIncapacityBenefitRejectionInsuredStatusDocumentCommandRepositoryGateway,
    )
    private readonly temporaryIncapacityBenefitRejectionInsuredStatusDocumentCommandRepositoryGateway: TemporaryIncapacityBenefitRejectionInsuredStatusDocumentCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    temporaryIncapacityBenefitRejectionId: TemporaryIncapacityBenefitRejectionId,
    dto: UpdateTemporaryIncapacityBenefitRejectionInsuredStatusRequestDto,
  ): Promise<UpdateTemporaryIncapacityBenefitRejectionInsuredStatusResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const queryResult =
      await this.temporaryIncapacityBenefitRejectionQueryRepositoryGateway.findOneByTemporaryIncapacityBenefitRejectionIdOrFailWithRelations(
        temporaryIncapacityBenefitRejectionId,
        TemporaryIncapacityBenefitRejectionNotFoundError,
      );

    if (queryResult.insuredStatus.length === 0) {
      throw new TemporaryIncapacityBenefitRejectionInsuredStatusNotFoundError();
    }

    const insuredStatusId =
      new TemporaryIncapacityBenefitRejectionInsuredStatusId();

    const insuredStatus =
      new TemporaryIncapacityBenefitRejectionInsuredStatusEntity({
        id: insuredStatusId,
        involuntaryUnemployment: dto.involuntaryUnemployment,
        intentionToProveInvoluntaryUnemployment:
          dto.intentionToProveInvoluntaryUnemployment,
        ruralInsuredClient: dto.ruralInsuredClient,
        ruralPeriodStartDate: dto.ruralPeriodStartDate ?? null,
        ruralPeriodEndDate: dto.ruralPeriodEndDate ?? null,
        documentsDescription: dto.documentsDescription ?? null,
        temporaryIncapacityBenefitRejectionId,
      });

    const transactions: TransactionType[] = [
      this.temporaryIncapacityBenefitRejectionInsuredStatusCommandRepositoryGateway.deleteAllByTemporaryIncapacityBenefitRejectionId(
        temporaryIncapacityBenefitRejectionId,
      ),
      this.temporaryIncapacityBenefitRejectionInsuredStatusCommandRepositoryGateway.createTemporaryIncapacityBenefitRejectionInsuredStatus(
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

          return this.temporaryIncapacityBenefitRejectionInsuredStatusDocumentCommandRepositoryGateway.createTemporaryIncapacityBenefitRejectionInsuredStatusDocument(
            new TemporaryIncapacityBenefitRejectionInsuredStatusDocumentEntity({
              id: new TemporaryIncapacityBenefitRejectionInsuredStatusDocumentId(),
              fileName,
              type: documentDto.type,
              temporaryIncapacityBenefitRejectionInsuredStatusId:
                insuredStatusId,
            }),
          );
        }),
      );

      transactions.push(...documentTransactions);
    }

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return UpdateTemporaryIncapacityBenefitRejectionInsuredStatusResponseDto.build(
      {
        temporaryIncapacityBenefitRejectionId,
      },
    );
  }
}
