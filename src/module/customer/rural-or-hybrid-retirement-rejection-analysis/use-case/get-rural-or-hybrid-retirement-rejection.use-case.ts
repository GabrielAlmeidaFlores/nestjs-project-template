import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { RuralOrHybridRetirementRejectionQueryRepositoryGateway } from '@module/customer/rural-or-hybrid-retirement-rejection-analysis/domain/repository/rural-or-hybrid-retirement-rejection/query/rural-or-hybrid-retirement-rejection.query.repository.gateway';
import { RuralOrHybridRetirementRejectionId } from '@module/customer/rural-or-hybrid-retirement-rejection-analysis/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id/rural-or-hybrid-retirement-rejection-id.value-object';
import { GetRuralOrHybridRetirementRejectionResponseDto } from '@module/customer/rural-or-hybrid-retirement-rejection-analysis/dto/response/rural-or-hybrid-retirement-rejection.response.dto';
import { RuralOrHybridRetirementRejectionNotFoundError } from '@module/customer/rural-or-hybrid-retirement-rejection-analysis/error/rural-or-hybrid-retirement-rejection-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetRuralOrHybridRetirementRejectionUseCase {
  protected readonly _type = GetRuralOrHybridRetirementRejectionUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(RuralOrHybridRetirementRejectionQueryRepositoryGateway)
    private readonly queryRepositoryGateway: RuralOrHybridRetirementRejectionQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    rejectionId: RuralOrHybridRetirementRejectionId,
  ): Promise<GetRuralOrHybridRetirementRejectionResponseDto> {
    // 1. Validate organization member
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new Error('Organization member not found');
    }

    // 2. Load rejection with relations
    const rejection =
      await this.queryRepositoryGateway.findOneByIdWithRelations(rejectionId);

    if (rejection === null) {
      throw new RuralOrHybridRetirementRejectionNotFoundError();
    }

    // 3. Return response
    return GetRuralOrHybridRetirementRejectionResponseDto.build({
      id: rejection.id,
      analysisName: rejection.analysisName,
      federativeEntity: rejection.federativeEntity,
      ...(rejection.state !== null && { state: rejection.state }),
      ...(rejection.municipality !== null && {
        municipality: rejection.municipality,
      }),
      ...(rejection.currentPosition !== null && {
        currentPosition: rejection.currentPosition,
      }),
      ...(rejection.activityType !== null && {
        activityType: rejection.activityType,
      }),
      ...(rejection.publicServiceStartDate !== null && {
        publicServiceStartDate: rejection.publicServiceStartDate,
      }),
      ...(rejection.careerStartDate !== null && {
        careerStartDate: rejection.careerStartDate,
      }),
      createdAt: rejection.createdAt!,
      updatedAt: rejection.updatedAt!,
    });
  }
}
