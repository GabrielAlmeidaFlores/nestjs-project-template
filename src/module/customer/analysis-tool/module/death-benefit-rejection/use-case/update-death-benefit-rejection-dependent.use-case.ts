import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/account/error/organization-member-not-found.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { DeathBenefitRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection/query/death-benefit-rejection.query.repository.gateway';
import { DeathBenefitRejectionDependentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection-dependent/command/death-benefit-rejection-dependent.command.repository.gateway';
import { DeathBenefitRejectionDependentDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection-dependent-document/command/death-benefit-rejection-dependent-document.command.repository.gateway';
import { DeathBenefitRejectionId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/value-object/death-benefit-rejection-id.value-object';
import { DeathBenefitRejectionDependentEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-dependent/death-benefit-rejection-dependent.entity';
import { DeathBenefitRejectionDependentId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-dependent/value-object/death-benefit-rejection-dependent-id.value-object';
import { DeathBenefitRejectionDependentDocumentEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-dependent-document/death-benefit-rejection-dependent-document.entity';
import { DeathBenefitRejectionDependentDocumentId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-dependent-document/value-object/death-benefit-rejection-dependent-document-id.value-object';
import { UpdateDeathBenefitRejectionDependentRequestDto } from '@module/customer/analysis-tool/module/death-benefit-rejection/dto/request/update-death-benefit-rejection-dependent.request.dto';
import { UpdateDeathBenefitRejectionDependentResponseDto } from '@module/customer/analysis-tool/module/death-benefit-rejection/dto/response/update-death-benefit-rejection-dependent.response.dto';
import { DeathBenefitRejectionNotFoundError } from '@module/customer/analysis-tool/module/death-benefit-rejection/error/death-benefit-rejection-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UpdateDeathBenefitRejectionDependentUseCase {
  protected readonly _type = UpdateDeathBenefitRejectionDependentUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(DeathBenefitRejectionQueryRepositoryGateway)
    private readonly deathBenefitRejectionQueryRepositoryGateway: DeathBenefitRejectionQueryRepositoryGateway,
    @Inject(DeathBenefitRejectionDependentCommandRepositoryGateway)
    private readonly deathBenefitRejectionDependentCommandRepositoryGateway: DeathBenefitRejectionDependentCommandRepositoryGateway,
    @Inject(DeathBenefitRejectionDependentDocumentCommandRepositoryGateway)
    private readonly deathBenefitRejectionDependentDocumentCommandRepositoryGateway: DeathBenefitRejectionDependentDocumentCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    deathBenefitRejectionId: DeathBenefitRejectionId,
    dto: UpdateDeathBenefitRejectionDependentRequestDto,
  ): Promise<UpdateDeathBenefitRejectionDependentResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    if (!dto.dependents || dto.dependents.length === 0) {
      return UpdateDeathBenefitRejectionDependentResponseDto.build({
        deathBenefitRejectionId,
      });
    }

    const existingAnalysis =
      await this.deathBenefitRejectionQueryRepositoryGateway.findOneByDeathBenefitRejectionIdOrFailWithRelations(
        deathBenefitRejectionId,
        DeathBenefitRejectionNotFoundError,
      );

    const existingDependents =
      existingAnalysis.deathBenefitRejectionDependent ?? [];
    const transactions: TransactionType[] = [];

    for (const existingDependent of existingDependents) {
      transactions.push(
        this.deathBenefitRejectionDependentDocumentCommandRepositoryGateway.deleteAllByDeathBenefitRejectionDependentId(
          existingDependent.id,
        ),
      );
      transactions.push(
        this.deathBenefitRejectionDependentCommandRepositoryGateway.deleteDeathBenefitRejectionDependent(
          existingDependent.id,
        ),
      );
    }

    for (const dependentDto of dto.dependents) {
      const dependentId = new DeathBenefitRejectionDependentId();

      transactions.push(
        this.deathBenefitRejectionDependentCommandRepositoryGateway.createDeathBenefitRejectionDependent(
          new DeathBenefitRejectionDependentEntity({
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
            deathBenefitRejectionId,
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

            return this.deathBenefitRejectionDependentDocumentCommandRepositoryGateway.createDeathBenefitRejectionDependentDocument(
              new DeathBenefitRejectionDependentDocumentEntity({
                id: new DeathBenefitRejectionDependentDocumentId(),
                document: documentUrl,
                deathBenefitRejectionDependentId: dependentId,
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

    return UpdateDeathBenefitRejectionDependentResponseDto.build({
      deathBenefitRejectionId,
    });
  }
}
