import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { DeathBenefitGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant/query/death-benefit-grant.query.repository.gateway';
import { DeathBenefitGrantDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-document/command/death-benefit-grant-document.command.repository.gateway';
import { DeathBenefitGrantId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/value-object/death-benefit-grant-id.value-object';
import { DeathBenefitGrantDocumentEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-document/death-benefit-grant-document.entity';
import { DeathBenefitGrantDocumentId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-document/value-object/death-benefit-grant-document-id.value-object';
import { CreateDeathBenefitGrantDocumentRequestDto } from '@module/customer/analysis-tool/module/death-benefit-grant/dto/request/create-death-benefit-grant.request.dto';
import { UpdateDeathBenefitGrantRequestDto } from '@module/customer/analysis-tool/module/death-benefit-grant/dto/request/update-death-benefit-grant.request.dto';
import { UpdateDeathBenefitGrantResponseDto } from '@module/customer/analysis-tool/module/death-benefit-grant/dto/response/update-death-benefit-grant.response.dto';
import { DeathBenefitGrantNotFoundError } from '@module/customer/analysis-tool/module/death-benefit-grant/error/death-benefit-grant-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UpdateDeathBenefitGrantDocumentUseCase {
  protected readonly _type = UpdateDeathBenefitGrantDocumentUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(DeathBenefitGrantQueryRepositoryGateway)
    private readonly deathBenefitGrantQueryRepositoryGateway: DeathBenefitGrantQueryRepositoryGateway,
    @Inject(DeathBenefitGrantDocumentCommandRepositoryGateway)
    private readonly deathBenefitGrantDocumentCommandRepositoryGateway: DeathBenefitGrantDocumentCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    deathBenefitGrantId: DeathBenefitGrantId,
    dto: UpdateDeathBenefitGrantRequestDto,
  ): Promise<UpdateDeathBenefitGrantResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    await this.deathBenefitGrantQueryRepositoryGateway.findOneByDeathBenefitGrantIdOrFailWithRelations(
      deathBenefitGrantId,
      DeathBenefitGrantNotFoundError,
    );

    const transactions: TransactionType[] = [
      this.deathBenefitGrantDocumentCommandRepositoryGateway.deleteAllByDeathBenefitGrantId(
        deathBenefitGrantId,
      ),
    ];

    if (dto.documents && dto.documents.length > 0) {
      const documentEntities = await this.buildDocumentEntities(
        deathBenefitGrantId,
        dto.documents,
      );

      documentEntities.forEach((entity) => {
        transactions.push(
          this.deathBenefitGrantDocumentCommandRepositoryGateway.createDeathBenefitGrantDocument(
            entity,
          ),
        );
      });
    }

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return UpdateDeathBenefitGrantResponseDto.build({ deathBenefitGrantId });
  }

  private async buildDocumentEntities(
    deathBenefitGrantId: DeathBenefitGrantId,
    documents: CreateDeathBenefitGrantDocumentRequestDto[],
  ): Promise<DeathBenefitGrantDocumentEntity[]> {
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

        return new DeathBenefitGrantDocumentEntity({
          id: new DeathBenefitGrantDocumentId(),
          document: documentUrl,
          type: documentDto.type,
          deathBenefitGrantId,
        });
      }),
    );
  }
}
