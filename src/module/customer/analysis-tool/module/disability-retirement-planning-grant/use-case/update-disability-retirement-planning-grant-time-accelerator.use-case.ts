import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { DisabilityRetirementPlanningGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant/query/disability-retirement-planning-grant.query.repository.gateway';
import { DisabilityRetirementPlanningGrantTimeAcceleratorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant-time-accelerator/command/disability-retirement-planning-grant-time-accelerator.command.repository.gateway';
import { DisabilityRetirementPlanningGrantId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/value-object/disability-retirement-planning-grant-id.value-object';
import { DisabilityRetirementPlanningGrantTimeAcceleratorEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-time-accelerator/disability-retirement-planning-grant-time-accelerator.entity';
import { DisabilityRetirementPlanningGrantTimeAcceleratorId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-time-accelerator/value-object/disability-retirement-planning-grant-time-accelerator-id.value-object';
import { UpdateDisabilityRetirementPlanningGrantTimeAcceleratorRequestDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/dto/request/update-disability-retirement-planning-grant-time-accelerator.request.dto';
import { UpdateDisabilityRetirementPlanningGrantTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/dto/response/update-disability-retirement-planning-grant-time-accelerator.response.dto';
import { DisabilityRetirementPlanningGrantNotFoundError } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/error/disability-retirement-planning-grant-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class UpdateDisabilityRetirementPlanningGrantTimeAcceleratorUseCase {
  protected readonly _type =
    UpdateDisabilityRetirementPlanningGrantTimeAcceleratorUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(DisabilityRetirementPlanningGrantQueryRepositoryGateway)
    private readonly disabilityRetirementPlanningGrantQueryRepositoryGateway: DisabilityRetirementPlanningGrantQueryRepositoryGateway,
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
    dto: UpdateDisabilityRetirementPlanningGrantTimeAcceleratorRequestDto,
  ): Promise<UpdateDisabilityRetirementPlanningGrantTimeAcceleratorResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const existingGrant =
      await this.disabilityRetirementPlanningGrantQueryRepositoryGateway.findOneByDisabilityRetirementPlanningGrantIdOrFailWithRelations(
        disabilityRetirementPlanningGrantId,
        DisabilityRetirementPlanningGrantNotFoundError,
      );

    const existingTimeAccelerators =
      existingGrant.disabilityRetirementPlanningGrantTimeAccelerator ?? [];
    const transactions: TransactionType[] = [];

    for (const existingTimeAccelerator of existingTimeAccelerators) {
      transactions.push(
        this.disabilityRetirementPlanningGrantTimeAcceleratorCommandRepositoryGateway.updateDisabilityRetirementPlanningGrantTimeAccelerator(
          existingTimeAccelerator.id,
          new DisabilityRetirementPlanningGrantTimeAcceleratorEntity({
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
            disabilityRetirementPlanningGrantId,
            deletedAt: new Date(),
          }),
        ),
      );
    }

    for (const timeAcceleratorDto of dto.timeAccelerators) {
      const disabilityRetirementPlanningGrantTimeAcceleratorId =
        new DisabilityRetirementPlanningGrantTimeAcceleratorId();

      transactions.push(
        this.disabilityRetirementPlanningGrantTimeAcceleratorCommandRepositoryGateway.createDisabilityRetirementPlanningGrantTimeAccelerator(
          new DisabilityRetirementPlanningGrantTimeAcceleratorEntity({
            id: disabilityRetirementPlanningGrantTimeAcceleratorId,
            type: timeAcceleratorDto.type,
            recognitionInss: timeAcceleratorDto.recognitionInss,
            recognitionJudicial: timeAcceleratorDto.recognitionJudicial,
            viability: timeAcceleratorDto.viability,
            technicalNote: timeAcceleratorDto.technicalNote ?? null,
            startDate: timeAcceleratorDto.startDate ?? null,
            endDate: timeAcceleratorDto.endDate ?? null,
            institution: timeAcceleratorDto.institution ?? null,
            affectsQualifyingPeriod: timeAcceleratorDto.affectsQualifyingPeriod,
            disabilityRetirementPlanningGrantId,
          }),
        ),
      );
    }

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return UpdateDisabilityRetirementPlanningGrantTimeAcceleratorResponseDto.build(
      {
        disabilityRetirementPlanningGrantId,
      },
    );
  }
}
