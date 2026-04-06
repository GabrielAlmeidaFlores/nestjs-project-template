import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { DisabilityRetirementPlanningGrantTimeAcceleratorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant-time-accelerator/command/disability-retirement-planning-grant-time-accelerator.command.repository.gateway';
import { DisabilityRetirementPlanningGrantTimeAcceleratorQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant-time-accelerator/query/disability-retirement-planning-grant-time-accelerator.query.repository.gateway';
import { DisabilityRetirementPlanningGrantId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/value-object/disability-retirement-planning-grant-id.value-object';
import { DisabilityRetirementPlanningGrantTimeAcceleratorEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-time-accelerator/disability-retirement-planning-grant-time-accelerator.entity';
import { DisabilityRetirementPlanningGrantTimeAcceleratorId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-time-accelerator/value-object/disability-retirement-planning-grant-time-accelerator-id.value-object';
import { DeleteDisabilityRetirementPlanningGrantTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/dto/response/delete-disability-retirement-planning-grant-time-accelerator.response.dto';
import { DisabilityRetirementPlanningGrantTimeAcceleratorNotFoundError } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/error/disability-retirement-planning-grant-time-accelerator-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DeleteDisabilityRetirementPlanningGrantTimeAcceleratorUseCase {
  protected readonly _type =
    DeleteDisabilityRetirementPlanningGrantTimeAcceleratorUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(
      DisabilityRetirementPlanningGrantTimeAcceleratorQueryRepositoryGateway,
    )
    private readonly disabilityRetirementPlanningGrantTimeAcceleratorQueryRepositoryGateway: DisabilityRetirementPlanningGrantTimeAcceleratorQueryRepositoryGateway,
    @Inject(
      DisabilityRetirementPlanningGrantTimeAcceleratorCommandRepositoryGateway,
    )
    private readonly disabilityRetirementPlanningGrantTimeAcceleratorCommandRepositoryGateway: DisabilityRetirementPlanningGrantTimeAcceleratorCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    disabilityRetirementPlanningGrantId: DisabilityRetirementPlanningGrantId,
    disabilityRetirementPlanningGrantTimeAcceleratorId: DisabilityRetirementPlanningGrantTimeAcceleratorId,
  ): Promise<DeleteDisabilityRetirementPlanningGrantTimeAcceleratorResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const existingTimeAccelerator =
      await this.disabilityRetirementPlanningGrantTimeAcceleratorQueryRepositoryGateway.findOneByDisabilityRetirementPlanningGrantTimeAcceleratorIdOrFail(
        disabilityRetirementPlanningGrantTimeAcceleratorId,
        DisabilityRetirementPlanningGrantTimeAcceleratorNotFoundError,
      );

    const deletedTimeAccelerator =
      new DisabilityRetirementPlanningGrantTimeAcceleratorEntity({
        id: disabilityRetirementPlanningGrantTimeAcceleratorId,
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
        disabilityRetirementPlanningGrantId,
        deletedAt: new Date(),
      });

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      this.disabilityRetirementPlanningGrantTimeAcceleratorCommandRepositoryGateway.updateDisabilityRetirementPlanningGrantTimeAccelerator(
        disabilityRetirementPlanningGrantTimeAcceleratorId,
        deletedTimeAccelerator,
      ),
    );

    await transaction.commit();

    return DeleteDisabilityRetirementPlanningGrantTimeAcceleratorResponseDto.build(
      {
        disabilityRetirementPlanningGrantId,
      },
    );
  }
}
