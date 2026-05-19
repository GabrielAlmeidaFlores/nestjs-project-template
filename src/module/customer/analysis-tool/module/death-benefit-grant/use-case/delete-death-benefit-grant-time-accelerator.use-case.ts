import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { DeathBenefitGrantTimeAcceleratorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-time-accelerator/command/death-benefit-grant-time-accelerator.command.repository.gateway';
import { DeathBenefitGrantTimeAcceleratorQueryRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-time-accelerator/query/death-benefit-grant-time-accelerator.query.repository.gateway';
import { DeathBenefitGrantId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/value-object/death-benefit-grant-id.value-object';
import { DeathBenefitGrantTimeAcceleratorEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-time-accelerator/death-benefit-grant-time-accelerator.entity';
import { DeathBenefitGrantTimeAcceleratorId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-time-accelerator/value-object/death-benefit-grant-time-accelerator-id.value-object';
import { DeleteDeathBenefitGrantTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/death-benefit-grant/dto/response/delete-death-benefit-grant-time-accelerator.response.dto';
import { DeathBenefitGrantTimeAcceleratorNotFoundError } from '@module/customer/analysis-tool/module/death-benefit-grant/error/death-benefit-grant-time-accelerator-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DeleteDeathBenefitGrantTimeAcceleratorUseCase {
  protected readonly _type = DeleteDeathBenefitGrantTimeAcceleratorUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(DeathBenefitGrantTimeAcceleratorQueryRepositoryGateway)
    private readonly deathBenefitGrantTimeAcceleratorQueryRepositoryGateway: DeathBenefitGrantTimeAcceleratorQueryRepositoryGateway,
    @Inject(DeathBenefitGrantTimeAcceleratorCommandRepositoryGateway)
    private readonly deathBenefitGrantTimeAcceleratorCommandRepositoryGateway: DeathBenefitGrantTimeAcceleratorCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    deathBenefitGrantId: DeathBenefitGrantId,
    deathBenefitGrantTimeAcceleratorId: DeathBenefitGrantTimeAcceleratorId,
  ): Promise<DeleteDeathBenefitGrantTimeAcceleratorResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const existingTimeAccelerator =
      await this.deathBenefitGrantTimeAcceleratorQueryRepositoryGateway.findOneByDeathBenefitGrantTimeAcceleratorIdOrFail(
        deathBenefitGrantTimeAcceleratorId,
        DeathBenefitGrantTimeAcceleratorNotFoundError,
      );

    const deletedTimeAccelerator = new DeathBenefitGrantTimeAcceleratorEntity({
      id: deathBenefitGrantTimeAcceleratorId,
      type: existingTimeAccelerator.type,
      recognitionInss: existingTimeAccelerator.recognitionInss,
      recognitionJudicial: existingTimeAccelerator.recognitionJudicial,
      viability: existingTimeAccelerator.viability,
      technicalNote: existingTimeAccelerator.technicalNote,
      startDate: existingTimeAccelerator.startDate,
      endDate: existingTimeAccelerator.endDate,
      institution: existingTimeAccelerator.institution,
      affectsQualifyingPeriod: existingTimeAccelerator.affectsQualifyingPeriod,
      deathBenefitGrantId,
      deletedAt: new Date(),
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      this.deathBenefitGrantTimeAcceleratorCommandRepositoryGateway.updateDeathBenefitGrantTimeAccelerator(
        deathBenefitGrantTimeAcceleratorId,
        deletedTimeAccelerator,
      ),
    );

    await transaction.commit();

    return DeleteDeathBenefitGrantTimeAcceleratorResponseDto.build({
      deathBenefitGrantId,
    });
  }
}
