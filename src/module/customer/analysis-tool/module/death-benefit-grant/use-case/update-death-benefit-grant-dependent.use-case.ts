import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/account/error/organization-member-not-found.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { DeathBenefitGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant/query/death-benefit-grant.query.repository.gateway';
import { DeathBenefitGrantDependentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-dependent/command/death-benefit-grant-dependent.command.repository.gateway';
import { DeathBenefitGrantDependentDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-dependent-document/command/death-benefit-grant-dependent-document.command.repository.gateway';
import { DeathBenefitGrantId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/value-object/death-benefit-grant-id.value-object';
import { DeathBenefitGrantDependentEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-dependent/death-benefit-grant-dependent.entity';
import { DeathBenefitGrantDependentId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-dependent/value-object/death-benefit-grant-dependent-id.value-object';
import { DeathBenefitGrantDependentDocumentEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-dependent-document/death-benefit-grant-dependent-document.entity';
import { DeathBenefitGrantDependentDocumentId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-dependent-document/value-object/death-benefit-grant-dependent-document-id.value-object';
import { UpdateDeathBenefitGrantDependentRequestDto } from '@module/customer/analysis-tool/module/death-benefit-grant/dto/request/update-death-benefit-grant-dependent.request.dto';
import { UpdateDeathBenefitGrantDependentResponseDto } from '@module/customer/analysis-tool/module/death-benefit-grant/dto/response/update-death-benefit-grant-dependent.response.dto';
import { DeathBenefitGrantNotFoundError } from '@module/customer/analysis-tool/module/death-benefit-grant/error/death-benefit-grant-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UpdateDeathBenefitGrantDependentUseCase {
  protected readonly _type = UpdateDeathBenefitGrantDependentUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(DeathBenefitGrantQueryRepositoryGateway)
    private readonly deathBenefitGrantQueryRepositoryGateway: DeathBenefitGrantQueryRepositoryGateway,
    @Inject(DeathBenefitGrantDependentCommandRepositoryGateway)
    private readonly deathBenefitGrantDependentCommandRepositoryGateway: DeathBenefitGrantDependentCommandRepositoryGateway,
    @Inject(DeathBenefitGrantDependentDocumentCommandRepositoryGateway)
    private readonly deathBenefitGrantDependentDocumentCommandRepositoryGateway: DeathBenefitGrantDependentDocumentCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    deathBenefitGrantId: DeathBenefitGrantId,
    dto: UpdateDeathBenefitGrantDependentRequestDto,
  ): Promise<UpdateDeathBenefitGrantDependentResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    if (!dto.dependents || dto.dependents.length === 0) {
      return UpdateDeathBenefitGrantDependentResponseDto.build({
        deathBenefitGrantId,
      });
    }

    const existingAnalysis =
      await this.deathBenefitGrantQueryRepositoryGateway.findOneByDeathBenefitGrantIdOrFailWithRelations(
        deathBenefitGrantId,
        DeathBenefitGrantNotFoundError,
      );

    const existingDependents =
      existingAnalysis.deathBenefitGrantDependent ?? [];
    const transactions: TransactionType[] = [];

    for (const existingDependent of existingDependents) {
      transactions.push(
        this.deathBenefitGrantDependentDocumentCommandRepositoryGateway.deleteAllByDeathBenefitGrantDependentId(
          existingDependent.id,
        ),
      );
      transactions.push(
        this.deathBenefitGrantDependentCommandRepositoryGateway.deleteDeathBenefitGrantDependent(
          existingDependent.id,
        ),
      );
    }

    for (const dependentDto of dto.dependents) {
      const dependentId = new DeathBenefitGrantDependentId();

      transactions.push(
        this.deathBenefitGrantDependentCommandRepositoryGateway.createDeathBenefitGrantDependent(
          new DeathBenefitGrantDependentEntity({
            id: dependentId,
            name: dependentDto.name,
            dependentClass: dependentDto.dependentClass,
            dependentType: dependentDto.dependentType,
            gender: dependentDto.sex,
            birthDate: dependentDto.birthDate,
            hasDisabilityOrInvalidism: dependentDto.hasDisabilityOrInvalidism,
            isMinorUnder16: dependentDto.isMinorUnder16,
            stableUnionOrMarriageStartDate:
              dependentDto.stableUnionOrMarriageStartDate ?? null,
            deathBenefitGrantId,
          }),
        ),
      );

      if (dependentDto.documents && dependentDto.documents.length > 0) {
        const documentTransactions = await Promise.all(
          dependentDto.documents.map(async (documentDto) => {
            const buffer = documentDto.file.base64.decodeToBuffer();

            const fileModel = FileModel.build({
              buffer,
              originalName: documentDto.file.originalFileName,
              size: buffer.length,
              encoding: '7bit',
            });

            const documentUrl =
              await this.fileProcessorGateway.uploadFile(fileModel);

            return this.deathBenefitGrantDependentDocumentCommandRepositoryGateway.createDeathBenefitGrantDependentDocument(
              new DeathBenefitGrantDependentDocumentEntity({
                id: new DeathBenefitGrantDependentDocumentId(),
                document: documentUrl,
                deathBenefitGrantDependentId: dependentId,
              }),
            );
          }),
        );

        transactions.push(...documentTransactions);
      }
    }

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return UpdateDeathBenefitGrantDependentResponseDto.build({
      deathBenefitGrantId,
    });
  }
}
