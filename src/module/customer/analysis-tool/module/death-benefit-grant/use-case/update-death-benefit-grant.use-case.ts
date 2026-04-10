import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { DeathBenefitGrantCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant/command/death-benefit-grant.command.repository.gateway';
import { DeathBenefitGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant/query/death-benefit-grant.query.repository.gateway';
import { DeathBenefitGrantDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-document/command/death-benefit-grant-document.command.repository.gateway';
import { DeathBenefitGrantInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-inss-benefit/command/death-benefit-grant-inss-benefit.command.repository.gateway';
import { DeathBenefitGrantLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-legal-proceeding/command/death-benefit-grant-legal-proceeding.command.repository.gateway';
import { DeathBenefitGrantEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/death-benefit-grant.entity';
import { DeathBenefitGrantId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/value-object/death-benefit-grant-id.value-object';
import { DeathBenefitGrantDocumentEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-document/death-benefit-grant-document.entity';
import { DeathBenefitGrantDocumentId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-document/value-object/death-benefit-grant-document-id.value-object';
import { DeathBenefitGrantInssBenefitEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-inss-benefit/death-benefit-grant-inss-benefit.entity';
import { DeathBenefitGrantInssBenefitId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-inss-benefit/value-object/death-benefit-grant-inss-benefit-id.value-object';
import { DeathBenefitGrantLegalProceedingEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-legal-proceeding/death-benefit-grant-legal-proceeding.entity';
import { DeathBenefitGrantLegalProceedingId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-legal-proceeding/value-object/death-benefit-grant-legal-proceeding-id.value-object';
import { UpdateDeathBenefitGrantRequestDto } from '@module/customer/analysis-tool/module/death-benefit-grant/dto/request/update-death-benefit-grant.request.dto';
import { UpdateDeathBenefitGrantResponseDto } from '@module/customer/analysis-tool/module/death-benefit-grant/dto/response/update-death-benefit-grant.response.dto';
import { DeathBenefitGrantNotFoundError } from '@module/customer/analysis-tool/module/death-benefit-grant/error/death-benefit-grant-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UpdateDeathBenefitGrantUseCase {
  protected readonly _type = UpdateDeathBenefitGrantUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(DeathBenefitGrantQueryRepositoryGateway)
    private readonly deathBenefitGrantQueryRepositoryGateway: DeathBenefitGrantQueryRepositoryGateway,
    @Inject(DeathBenefitGrantCommandRepositoryGateway)
    private readonly deathBenefitGrantCommandRepositoryGateway: DeathBenefitGrantCommandRepositoryGateway,
    @Inject(DeathBenefitGrantDocumentCommandRepositoryGateway)
    private readonly deathBenefitGrantDocumentCommandRepositoryGateway: DeathBenefitGrantDocumentCommandRepositoryGateway,
    @Inject(DeathBenefitGrantInssBenefitCommandRepositoryGateway)
    private readonly deathBenefitGrantInssBenefitCommandRepositoryGateway: DeathBenefitGrantInssBenefitCommandRepositoryGateway,
    @Inject(DeathBenefitGrantLegalProceedingCommandRepositoryGateway)
    private readonly deathBenefitGrantLegalProceedingCommandRepositoryGateway: DeathBenefitGrantLegalProceedingCommandRepositoryGateway,
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

    const existingDeathBenefitGrant =
      await this.deathBenefitGrantQueryRepositoryGateway.findOneByDeathBenefitGrantIdOrFailWithRelations(
        deathBenefitGrantId,
        DeathBenefitGrantNotFoundError,
      );

    const updatedDeathBenefitGrant = new DeathBenefitGrantEntity({
      id: deathBenefitGrantId,
      analysisName: dto.analysisName ?? existingDeathBenefitGrant.analysisName,
      deathBenefitGrantResultId:
        existingDeathBenefitGrant.deathBenefitGrantResult?.id ?? null,
    });

    const transactions: TransactionType[] = [
      this.deathBenefitGrantCommandRepositoryGateway.updateDeathBenefitGrant(
        deathBenefitGrantId,
        updatedDeathBenefitGrant,
      ),
    ];

    if (dto.documents !== undefined) {
      transactions.push(
        this.deathBenefitGrantDocumentCommandRepositoryGateway.deleteAllByDeathBenefitGrantId(
          deathBenefitGrantId,
        ),
      );

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

    if (dto.inssBenefitNumber !== undefined) {
      transactions.push(
        this.deathBenefitGrantInssBenefitCommandRepositoryGateway.deleteAllByDeathBenefitGrantId(
          deathBenefitGrantId,
        ),
      );

      dto.inssBenefitNumber.forEach((value) => {
        transactions.push(
          this.deathBenefitGrantInssBenefitCommandRepositoryGateway.createDeathBenefitGrantInssBenefit(
            new DeathBenefitGrantInssBenefitEntity({
              id: new DeathBenefitGrantInssBenefitId(),
              inssBenefit: value,
              deathBenefitGrantId,
            }),
          ),
        );
      });
    }

    if (dto.legalProceedingNumber !== undefined) {
      transactions.push(
        this.deathBenefitGrantLegalProceedingCommandRepositoryGateway.deleteAllByDeathBenefitGrantId(
          deathBenefitGrantId,
        ),
      );

      dto.legalProceedingNumber.forEach((value) => {
        transactions.push(
          this.deathBenefitGrantLegalProceedingCommandRepositoryGateway.createDeathBenefitGrantLegalProceeding(
            new DeathBenefitGrantLegalProceedingEntity({
              id: new DeathBenefitGrantLegalProceedingId(),
              legalProceedingNumber: value,
              deathBenefitGrantId,
            }),
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
    documents: UpdateDeathBenefitGrantRequestDto['documents'] & object[],
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
