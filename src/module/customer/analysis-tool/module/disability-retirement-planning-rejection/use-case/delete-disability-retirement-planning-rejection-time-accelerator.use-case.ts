import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { DisabilityRetirementPlanningRejectionTimeAcceleratorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/repository/disability-retirement-planning-rejection-time-accelerator/command/disability-retirement-planning-rejection-time-accelerator.command.repository.gateway';
import { DisabilityRetirementPlanningRejectionTimeAcceleratorQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/repository/disability-retirement-planning-rejection-time-accelerator/query/disability-retirement-planning-rejection-time-accelerator.query.repository.gateway';
import { DisabilityRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/value-object/disability-retirement-planning-rejection-id/disability-retirement-planning-rejection-id.value-object';
import { DisabilityRetirementPlanningRejectionTimeAcceleratorEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-time-accelerator/disability-retirement-planning-rejection-time-accelerator.entity';
import { DisabilityRetirementPlanningRejectionTimeAcceleratorId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-time-accelerator/value-object/disability-retirement-planning-rejection-time-accelerator-id/disability-retirement-planning-rejection-time-accelerator-id.value-object';
import { DeleteDisabilityRetirementPlanningRejectionTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/dto/response/delete-disability-retirement-planning-rejection-time-accelerator.response.dto';
import { DisabilityRetirementPlanningRejectionTimeAcceleratorNotFoundError } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/error/disability-retirement-planning-rejection-time-accelerator-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DeleteDisabilityRetirementPlanningRejectionTimeAcceleratorUseCase {
  protected readonly _type =
    DeleteDisabilityRetirementPlanningRejectionTimeAcceleratorUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(
      DisabilityRetirementPlanningRejectionTimeAcceleratorQueryRepositoryGateway,
    )
    private readonly disabilityRetirementPlanningRejectionTimeAcceleratorQueryRepositoryGateway: DisabilityRetirementPlanningRejectionTimeAcceleratorQueryRepositoryGateway,
    @Inject(
      DisabilityRetirementPlanningRejectionTimeAcceleratorCommandRepositoryGateway,
    )
    private readonly disabilityRetirementPlanningRejectionTimeAcceleratorCommandRepositoryGateway: DisabilityRetirementPlanningRejectionTimeAcceleratorCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    disabilityRetirementPlanningRejectionId: DisabilityRetirementPlanningRejectionId,
    disabilityRetirementPlanningRejectionTimeAcceleratorId: DisabilityRetirementPlanningRejectionTimeAcceleratorId,
  ): Promise<DeleteDisabilityRetirementPlanningRejectionTimeAcceleratorResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const existingTimeAccelerator =
      await this.disabilityRetirementPlanningRejectionTimeAcceleratorQueryRepositoryGateway.findOneByDisabilityRetirementPlanningRejectionTimeAcceleratorIdOrFail(
        disabilityRetirementPlanningRejectionTimeAcceleratorId,
        DisabilityRetirementPlanningRejectionTimeAcceleratorNotFoundError,
      );

    const deletedTimeAccelerator =
      new DisabilityRetirementPlanningRejectionTimeAcceleratorEntity({
        id: disabilityRetirementPlanningRejectionTimeAcceleratorId,
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
        disabilityRetirementPlanningRejectionId,
        deletedAt: new Date(),
      });

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      this.disabilityRetirementPlanningRejectionTimeAcceleratorCommandRepositoryGateway.updateDisabilityRetirementPlanningRejectionTimeAccelerator(
        disabilityRetirementPlanningRejectionTimeAcceleratorId,
        deletedTimeAccelerator,
      ),
    );

    await transaction.commit();

    return DeleteDisabilityRetirementPlanningRejectionTimeAcceleratorResponseDto.build(
      {
        disabilityRetirementPlanningRejectionId,
      },
    );
  }
}
