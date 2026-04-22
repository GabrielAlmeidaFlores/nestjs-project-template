import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { DeathBenefitRejectionTimeAcceleratorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection-time-accelerator/command/death-benefit-rejection-time-accelerator.command.repository.gateway';
import { DeathBenefitRejectionTimeAcceleratorQueryRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection-time-accelerator/query/death-benefit-rejection-time-accelerator.query.repository.gateway';
import { DeathBenefitRejectionId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/value-object/death-benefit-rejection-id.value-object';
import { DeathBenefitRejectionTimeAcceleratorEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-time-accelerator/death-benefit-rejection-time-accelerator.entity';
import { DeathBenefitRejectionTimeAcceleratorId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-time-accelerator/value-object/death-benefit-rejection-time-accelerator-id.value-object';
import { DeleteDeathBenefitRejectionTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/death-benefit-rejection/dto/response/delete-death-benefit-rejection-time-accelerator.response.dto';
import { DeathBenefitRejectionTimeAcceleratorNotFoundError } from '@module/customer/analysis-tool/module/death-benefit-rejection/error/death-benefit-rejection-time-accelerator-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DeleteDeathBenefitRejectionTimeAcceleratorUseCase {
  protected readonly _type =
    DeleteDeathBenefitRejectionTimeAcceleratorUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(DeathBenefitRejectionTimeAcceleratorQueryRepositoryGateway)
    private readonly deathBenefitRejectionTimeAcceleratorQueryRepositoryGateway: DeathBenefitRejectionTimeAcceleratorQueryRepositoryGateway,
    @Inject(DeathBenefitRejectionTimeAcceleratorCommandRepositoryGateway)
    private readonly deathBenefitRejectionTimeAcceleratorCommandRepositoryGateway: DeathBenefitRejectionTimeAcceleratorCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    deathBenefitRejectionId: DeathBenefitRejectionId,
    deathBenefitRejectionTimeAcceleratorId: DeathBenefitRejectionTimeAcceleratorId,
  ): Promise<DeleteDeathBenefitRejectionTimeAcceleratorResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const existingTimeAccelerator =
      await this.deathBenefitRejectionTimeAcceleratorQueryRepositoryGateway.findOneByDeathBenefitRejectionTimeAcceleratorIdOrFail(
        deathBenefitRejectionTimeAcceleratorId,
        DeathBenefitRejectionTimeAcceleratorNotFoundError,
      );

    const deletedTimeAccelerator =
      new DeathBenefitRejectionTimeAcceleratorEntity({
        id: deathBenefitRejectionTimeAcceleratorId,
        type: existingTimeAccelerator.type,
        recognitionInss: existingTimeAccelerator.recognitionInss,
        recognitionJudicial: existingTimeAccelerator.recognitionJudicial,
        viability: existingTimeAccelerator.viability,
        technicalNote: existingTimeAccelerator.technicalNote,
        startDate: existingTimeAccelerator.startDate,
        endDate: existingTimeAccelerator.endDate,
        institution: existingTimeAccelerator.institution,
        affectsQualifyingPeriod:
          existingTimeAccelerator.affectsQualifyingPeriod,
        deathBenefitRejectionId,
        deletedAt: new Date(),
      });

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      this.deathBenefitRejectionTimeAcceleratorCommandRepositoryGateway.updateDeathBenefitRejectionTimeAccelerator(
        deathBenefitRejectionTimeAcceleratorId,
        deletedTimeAccelerator,
      ),
    );

    await transaction.commit();

    return DeleteDeathBenefitRejectionTimeAcceleratorResponseDto.build({
      deathBenefitRejectionId,
    });
  }
}
