import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { RuralOrHybridRetirementRejectionCommandRepositoryGateway } from '@module/customer/rural-or-hybrid-retirement-rejection-analysis/domain/repository/rural-or-hybrid-retirement-rejection/command/rural-or-hybrid-retirement-rejection.command.repository.gateway';
import { RuralOrHybridRetirementRejectionQueryRepositoryGateway } from '@module/customer/rural-or-hybrid-retirement-rejection-analysis/domain/repository/rural-or-hybrid-retirement-rejection/query/rural-or-hybrid-retirement-rejection.query.repository.gateway';
import { RuralOrHybridRetirementRejectionEntity } from '@module/customer/rural-or-hybrid-retirement-rejection-analysis/domain/schema/entity/rural-or-hybrid-retirement-rejection/rural-or-hybrid-retirement-rejection.entity';
import { RuralOrHybridRetirementRejectionId } from '@module/customer/rural-or-hybrid-retirement-rejection-analysis/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id/rural-or-hybrid-retirement-rejection-id.value-object';
import { UpdateRuralOrHybridRetirementRejectionResponseDto } from '@module/customer/rural-or-hybrid-retirement-rejection-analysis/dto/response/rural-or-hybrid-retirement-rejection.response.dto';
import { RuralOrHybridRetirementRejectionNotFoundError } from '@module/customer/rural-or-hybrid-retirement-rejection-analysis/error/rural-or-hybrid-retirement-rejection-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

interface UpdateRuralOrHybridRetirementRejectionInputModel {
  analysisName?: string;
  federativeEntity?: string;
  state?: string | null;
  municipality?: string | null;
  currentPosition?: string | null;
  activityType?: string | null;
  publicServiceStartDate?: Date | null;
  careerStartDate?: Date | null;
}

@Injectable()
export class UpdateRuralOrHybridRetirementRejectionUseCase {
  protected readonly _type = UpdateRuralOrHybridRetirementRejectionUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(RuralOrHybridRetirementRejectionQueryRepositoryGateway)
    private readonly queryRepositoryGateway: RuralOrHybridRetirementRejectionQueryRepositoryGateway,
    @Inject(RuralOrHybridRetirementRejectionCommandRepositoryGateway)
    private readonly commandRepositoryGateway: RuralOrHybridRetirementRejectionCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    rejectionId: RuralOrHybridRetirementRejectionId,
    input: UpdateRuralOrHybridRetirementRejectionInputModel,
  ): Promise<UpdateRuralOrHybridRetirementRejectionResponseDto> {
    // 1. Validate organization member
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new Error('Organization member not found');
    }

    // 2. Load rejection
    const rejection =
      await this.queryRepositoryGateway.findOneByIdWithRelations(rejectionId);

    if (rejection === null) {
      throw new RuralOrHybridRetirementRejectionNotFoundError();
    }

    // 3. Create updated entity
    const updatedEntity = new RuralOrHybridRetirementRejectionEntity({
      id: rejection.id,
      federativeEntity: input.federativeEntity ?? rejection.federativeEntity,
      state: input.state !== undefined ? input.state : rejection.state,
      municipality:
        input.municipality !== undefined
          ? input.municipality
          : rejection.municipality,
      analysisName: input.analysisName ?? rejection.analysisName,
      currentPosition:
        input.currentPosition !== undefined
          ? input.currentPosition
          : rejection.currentPosition,
      activityType:
        input.activityType !== undefined
          ? input.activityType
          : rejection.activityType,
      publicServiceStartDate:
        input.publicServiceStartDate !== undefined
          ? input.publicServiceStartDate
          : rejection.publicServiceStartDate,
      careerStartDate:
        input.careerStartDate !== undefined
          ? input.careerStartDate
          : rejection.careerStartDate,
      inssBenefitIds: rejection.inssBenefitIds,
      legalProceedingIds: rejection.legalProceedingIds,
      periodIds: rejection.periodIds,
      periodMemberIds: rejection.periodMemberIds,
      testimonialWitnessIds: rejection.testimonialWitnessIds,
      workPeriodIds: rejection.workPeriodIds,
      timeAcceleratorIds: rejection.timeAcceleratorIds,
      resultId: rejection.resultId,
      createdAt: rejection.createdAt,
      updatedAt: rejection.updatedAt,
      deletedAt: rejection.deletedAt,
    });

    // 4. Create transaction
    const transaction = await this.baseTransactionRepositoryGateway.execute([
      this.commandRepositoryGateway.updateRuralOrHybridRetirementRejection(
        rejectionId,
        updatedEntity,
      ),
    ]);

    // 5. Commit transaction
    await transaction.commit();

    // 6. Return response
    return UpdateRuralOrHybridRetirementRejectionResponseDto.build({
      id: rejectionId,
    });
  }
}
