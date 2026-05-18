import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { DisabilityRetirementPlanningRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/repository/disability-retirement-planning-rejection/query/disability-retirement-planning-rejection.query.repository.gateway';
import { DisabilityRetirementPlanningRejectionTimeAcceleratorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/repository/disability-retirement-planning-rejection-time-accelerator/command/disability-retirement-planning-rejection-time-accelerator.command.repository.gateway';
import { DisabilityRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/value-object/disability-retirement-planning-rejection-id/disability-retirement-planning-rejection-id.value-object';
import { DisabilityRetirementPlanningRejectionTimeAcceleratorEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-time-accelerator/disability-retirement-planning-rejection-time-accelerator.entity';
import { DisabilityRetirementPlanningRejectionTimeAcceleratorId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-time-accelerator/value-object/disability-retirement-planning-rejection-time-accelerator-id/disability-retirement-planning-rejection-time-accelerator-id.value-object';
import { UpdateDisabilityRetirementPlanningRejectionTimeAcceleratorRequestDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/dto/request/update-disability-retirement-planning-rejection-time-accelerator.request.dto';
import { UpdateDisabilityRetirementPlanningRejectionTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/dto/response/update-disability-retirement-planning-rejection-time-accelerator.response.dto';
import { DisabilityRetirementPlanningRejectionNotFoundError } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/error/disability-retirement-planning-rejection-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class UpdateDisabilityRetirementPlanningRejectionTimeAcceleratorUseCase {
  protected readonly _type =
    UpdateDisabilityRetirementPlanningRejectionTimeAcceleratorUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(DisabilityRetirementPlanningRejectionQueryRepositoryGateway)
    private readonly disabilityRetirementPlanningRejectionQueryRepositoryGateway: DisabilityRetirementPlanningRejectionQueryRepositoryGateway,
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
    dto: UpdateDisabilityRetirementPlanningRejectionTimeAcceleratorRequestDto,
  ): Promise<UpdateDisabilityRetirementPlanningRejectionTimeAcceleratorResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const existingDenial =
      await this.disabilityRetirementPlanningRejectionQueryRepositoryGateway.findOneByDisabilityRetirementPlanningRejectionIdOrFailWithRelations(
        disabilityRetirementPlanningRejectionId,
        DisabilityRetirementPlanningRejectionNotFoundError,
      );

    const existingTimeAccelerators =
      existingDenial.disabilityRetirementPlanningRejectionTimeAccelerator ?? [];
    const transactions: TransactionType[] = [];

    for (const existingTimeAccelerator of existingTimeAccelerators) {
      transactions.push(
        this.disabilityRetirementPlanningRejectionTimeAcceleratorCommandRepositoryGateway.updateDisabilityRetirementPlanningRejectionTimeAccelerator(
          existingTimeAccelerator.id,
          new DisabilityRetirementPlanningRejectionTimeAcceleratorEntity({
            id: existingTimeAccelerator.id,
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
          }),
        ),
      );
    }

    for (const timeAcceleratorDto of dto.timeAccelerators) {
      const disabilityRetirementPlanningRejectionTimeAcceleratorId =
        new DisabilityRetirementPlanningRejectionTimeAcceleratorId();

      transactions.push(
        this.disabilityRetirementPlanningRejectionTimeAcceleratorCommandRepositoryGateway.createDisabilityRetirementPlanningRejectionTimeAccelerator(
          new DisabilityRetirementPlanningRejectionTimeAcceleratorEntity({
            id: disabilityRetirementPlanningRejectionTimeAcceleratorId,
            type: timeAcceleratorDto.type,
            recognitionInss: timeAcceleratorDto.recognitionInss,
            recognitionJudicial: timeAcceleratorDto.recognitionJudicial,
            viability: timeAcceleratorDto.viability,
            technicalNote: timeAcceleratorDto.technicalNote ?? null,
            startDate: timeAcceleratorDto.startDate ?? null,
            endDate: timeAcceleratorDto.endDate ?? null,
            institution: timeAcceleratorDto.institution ?? null,
            affectsQualifyingPeriod: timeAcceleratorDto.affectsQualifyingPeriod,
            disabilityRetirementPlanningRejectionId,
          }),
        ),
      );
    }

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return UpdateDisabilityRetirementPlanningRejectionTimeAcceleratorResponseDto.build(
      {
        disabilityRetirementPlanningRejectionId,
      },
    );
  }
}
