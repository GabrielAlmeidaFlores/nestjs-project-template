import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { DeathBenefitQueryRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit/domain/repository/death-benefit/query/death-benefit.query.repository.gateway';
import { DeathBenefitDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit/domain/repository/death-benefit-document/command/death-benefit-document.command.repository.gateway';
import { DeathBenefitId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit/value-object/death-benefit-id.value-object';
import { DeathBenefitDocumentEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-document/death-benefit-document.entity';
import { DeathBenefitDocumentId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-document/value-object/death-benefit-document-id.value-object';
import { CreateDeathBenefitDocumentRequestDto } from '@module/customer/analysis-tool/module/death-benefit/dto/request/create-death-benefit.request.dto';
import { UpdateDeathBenefitRequestDto } from '@module/customer/analysis-tool/module/death-benefit/dto/request/update-death-benefit.request.dto';
import { UpdateDeathBenefitResponseDto } from '@module/customer/analysis-tool/module/death-benefit/dto/response/update-death-benefit.response.dto';
import { DeathBenefitNotFoundError } from '@module/customer/analysis-tool/module/death-benefit/error/death-benefit-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UpdateDeathBenefitDocumentUseCase {
  protected readonly _type = UpdateDeathBenefitDocumentUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(DeathBenefitQueryRepositoryGateway)
    private readonly deathBenefitQueryRepositoryGateway: DeathBenefitQueryRepositoryGateway,
    @Inject(DeathBenefitDocumentCommandRepositoryGateway)
    private readonly deathBenefitDocumentCommandRepositoryGateway: DeathBenefitDocumentCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    deathBenefitId: DeathBenefitId,
    dto: UpdateDeathBenefitRequestDto,
  ): Promise<UpdateDeathBenefitResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    await this.deathBenefitQueryRepositoryGateway.findOneByDeathBenefitIdOrFailWithRelations(
      deathBenefitId,
      DeathBenefitNotFoundError,
    );

    const transactions: TransactionType[] = [
      this.deathBenefitDocumentCommandRepositoryGateway.deleteAllByDeathBenefitId(
        deathBenefitId,
      ),
    ];

    if (dto.documents && dto.documents.length > 0) {
      const documentEntities = await this.buildDocumentEntities(
        deathBenefitId,
        dto.documents,
      );

      documentEntities.forEach((entity) => {
        transactions.push(
          this.deathBenefitDocumentCommandRepositoryGateway.createDeathBenefitDocument(
            entity,
          ),
        );
      });
    }

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return UpdateDeathBenefitResponseDto.build({ deathBenefitId });
  }

  private async buildDocumentEntities(
    deathBenefitId: DeathBenefitId,
    documents: CreateDeathBenefitDocumentRequestDto[],
  ): Promise<DeathBenefitDocumentEntity[]> {
    return Promise.all(
      documents.map(async (documentDto) => {
        const buffer = documentDto.file.base64.decodeToBuffer();

        const fileModel = FileModel.build({
          buffer,
          originalName: documentDto.file.originalFileName,
          size: buffer.length,
          encoding: '7bit',
        });

        const documentUrl =
          await this.fileProcessorGateway.uploadFile(fileModel);

        return new DeathBenefitDocumentEntity({
          id: new DeathBenefitDocumentId(),
          document: documentUrl,
          type: documentDto.type,
          deathBenefitId,
        });
      }),
    );
  }
}
