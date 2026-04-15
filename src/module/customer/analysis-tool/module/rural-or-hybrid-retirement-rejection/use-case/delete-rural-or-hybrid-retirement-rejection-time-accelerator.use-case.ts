import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { RuralOrHybridRetirementRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection/query/rural-or-hybrid-retirement-rejection.query.repository.gateway';
import { RuralOrHybridRetirementRejectionTimeAcceleratorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection-time-accelerator/command/rural-or-hybrid-retirement-rejection-time-accelerator.command.repository.gateway';
import { RuralOrHybridRetirementRejectionId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id.value-object';
import { RuralOrHybridRetirementRejectionTimeAcceleratorId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-time-accelerator/value-object/rural-or-hybrid-retirement-rejection-time-accelerator-id.value-object';
import { DeleteRuralOrHybridRetirementRejectionTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/response/delete-rural-or-hybrid-retirement-rejection-time-accelerator.response.dto';
import { RuralOrHybridRetirementRejectionNotFoundError } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/error/rural-or-hybrid-retirement-rejection-not-found.error';
import { RuralOrHybridRetirementRejectionTimeAcceleratorNotFoundError } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/error/rural-or-hybrid-retirement-rejection-time-accelerator-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DeleteRuralOrHybridRetirementRejectionTimeAcceleratorUseCase {
  protected readonly _type =
    DeleteRuralOrHybridRetirementRejectionTimeAcceleratorUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(RuralOrHybridRetirementRejectionQueryRepositoryGateway)
    private readonly ruralOrHybridRetirementRejectionQueryRepositoryGateway: RuralOrHybridRetirementRejectionQueryRepositoryGateway,
    @Inject(
      RuralOrHybridRetirementRejectionTimeAcceleratorCommandRepositoryGateway,
    )
    private readonly ruralOrHybridRetirementRejectionTimeAcceleratorCommandRepositoryGateway: RuralOrHybridRetirementRejectionTimeAcceleratorCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId,
    ruralOrHybridRetirementRejectionTimeAcceleratorId: RuralOrHybridRetirementRejectionTimeAcceleratorId,
  ): Promise<DeleteRuralOrHybridRetirementRejectionTimeAcceleratorResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const existingRejection =
      await this.ruralOrHybridRetirementRejectionQueryRepositoryGateway.findOneByRuralOrHybridRetirementRejectionIdOrFailWithRelations(
        ruralOrHybridRetirementRejectionId,
        RuralOrHybridRetirementRejectionNotFoundError,
      );

    const existingTimeAccelerator = (
      existingRejection.ruralOrHybridRetirementRejectionTimeAccelerator ?? []
    ).find(
      (timeAccelerator) =>
        timeAccelerator.id.toString() ===
        ruralOrHybridRetirementRejectionTimeAcceleratorId.toString(),
    );

    if (!existingTimeAccelerator) {
      throw new RuralOrHybridRetirementRejectionTimeAcceleratorNotFoundError();
    }

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      this.ruralOrHybridRetirementRejectionTimeAcceleratorCommandRepositoryGateway.deleteRuralOrHybridRetirementRejectionTimeAccelerator(
        ruralOrHybridRetirementRejectionTimeAcceleratorId,
      ),
    ]);

    await transaction.commit();

    return DeleteRuralOrHybridRetirementRejectionTimeAcceleratorResponseDto.build(
      {
        ruralOrHybridRetirementRejectionId,
      },
    );
  }
}
