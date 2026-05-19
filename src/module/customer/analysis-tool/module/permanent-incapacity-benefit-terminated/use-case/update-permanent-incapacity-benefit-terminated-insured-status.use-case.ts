import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { PermanentIncapacityBenefitTerminatedQueryRepositoryGateway } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/repository/permanent-incapacity-benefit-terminated/query/permanent-incapacity-benefit-terminated.query.repository.gateway';
import { PermanentIncapacityBenefitTerminatedInsuredStatusCommandRepositoryGateway } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/repository/permanent-incapacity-benefit-terminated-insured-status/command/permanent-incapacity-benefit-terminated-insured-status.command.repository.gateway';
import { PermanentIncapacityBenefitTerminatedInsuredStatusDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/repository/permanent-incapacity-benefit-terminated-insured-status-document/command/permanent-incapacity-benefit-terminated-insured-status-document.command.repository.gateway';
import { PermanentIncapacityBenefitTerminatedId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/value-object/permanent-incapacity-benefit-terminated-id.value-object';
import { PermanentIncapacityBenefitTerminatedInsuredStatusEntity } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-insured-status/permanent-incapacity-benefit-terminated-insured-status.entity';
import { PermanentIncapacityBenefitTerminatedInsuredStatusId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-insured-status/value-object/permanent-incapacity-benefit-terminated-insured-status-id.value-object';
import { PermanentIncapacityBenefitTerminatedInsuredStatusDocumentEntity } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-insured-status-document/permanent-incapacity-benefit-terminated-insured-status-document.entity';
import { PermanentIncapacityBenefitTerminatedInsuredStatusDocumentId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-insured-status-document/value-object/permanent-incapacity-benefit-terminated-insured-status-document-id.value-object';
import { UpdatePermanentIncapacityBenefitTerminatedInsuredStatusRequestDto } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/dto/request/update-permanent-incapacity-benefit-terminated-insured-status.request.dto';
import { UpdatePermanentIncapacityBenefitTerminatedInsuredStatusResponseDto } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/dto/response/update-permanent-incapacity-benefit-terminated-insured-status.response.dto';
import { PermanentIncapacityBenefitTerminatedInsuredStatusNotFoundError } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/error/permanent-incapacity-benefit-terminated-insured-status-not-found.error';
import { PermanentIncapacityBenefitTerminatedNotFoundError } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/error/permanent-incapacity-benefit-terminated-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UpdatePermanentIncapacityBenefitTerminatedInsuredStatusUseCase {
  protected readonly _type =
    UpdatePermanentIncapacityBenefitTerminatedInsuredStatusUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(PermanentIncapacityBenefitTerminatedQueryRepositoryGateway)
    private readonly permanentIncapacityBenefitTerminatedQueryRepositoryGateway: PermanentIncapacityBenefitTerminatedQueryRepositoryGateway,
    @Inject(
      PermanentIncapacityBenefitTerminatedInsuredStatusCommandRepositoryGateway,
    )
    private readonly permanentIncapacityBenefitTerminatedInsuredStatusCommandRepositoryGateway: PermanentIncapacityBenefitTerminatedInsuredStatusCommandRepositoryGateway,
    @Inject(
      PermanentIncapacityBenefitTerminatedInsuredStatusDocumentCommandRepositoryGateway,
    )
    private readonly permanentIncapacityBenefitTerminatedInsuredStatusDocumentCommandRepositoryGateway: PermanentIncapacityBenefitTerminatedInsuredStatusDocumentCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    permanentIncapacityBenefitTerminatedId: PermanentIncapacityBenefitTerminatedId,
    dto: UpdatePermanentIncapacityBenefitTerminatedInsuredStatusRequestDto,
  ): Promise<UpdatePermanentIncapacityBenefitTerminatedInsuredStatusResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const queryResult =
      await this.permanentIncapacityBenefitTerminatedQueryRepositoryGateway.findOneByPermanentIncapacityBenefitTerminatedIdOrFailWithRelations(
        permanentIncapacityBenefitTerminatedId,
        PermanentIncapacityBenefitTerminatedNotFoundError,
      );

    if (queryResult.insuredStatus.length === 0) {
      throw new PermanentIncapacityBenefitTerminatedInsuredStatusNotFoundError();
    }

    const insuredStatusId =
      new PermanentIncapacityBenefitTerminatedInsuredStatusId();

    const insuredStatus =
      new PermanentIncapacityBenefitTerminatedInsuredStatusEntity({
        id: insuredStatusId,
        involuntaryUnemployment: dto.involuntaryUnemployment,
        intentionToProveInvoluntaryUnemployment:
          dto.intentionToProveInvoluntaryUnemployment,
        ruralInsuredClient: dto.ruralInsuredClient,
        ruralPeriodStartDate: dto.ruralPeriodStartDate ?? null,
        ruralPeriodEndDate: dto.ruralPeriodEndDate ?? null,
        documentsDescription: dto.documentsDescription ?? null,
        permanentIncapacityBenefitTerminatedId,
      });

    const transactions: TransactionType[] = [
      this.permanentIncapacityBenefitTerminatedInsuredStatusCommandRepositoryGateway.deleteAllByPermanentIncapacityBenefitTerminatedId(
        permanentIncapacityBenefitTerminatedId,
      ),
      this.permanentIncapacityBenefitTerminatedInsuredStatusCommandRepositoryGateway.createPermanentIncapacityBenefitTerminatedInsuredStatus(
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

          return this.permanentIncapacityBenefitTerminatedInsuredStatusDocumentCommandRepositoryGateway.createPermanentIncapacityBenefitTerminatedInsuredStatusDocument(
            new PermanentIncapacityBenefitTerminatedInsuredStatusDocumentEntity(
              {
                id: new PermanentIncapacityBenefitTerminatedInsuredStatusDocumentId(),
                fileName,
                type: documentDto.type,
                permanentIncapacityBenefitTerminatedInsuredStatusId:
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

    return UpdatePermanentIncapacityBenefitTerminatedInsuredStatusResponseDto.build(
      {
        permanentIncapacityBenefitTerminatedId,
      },
    );
  }
}
