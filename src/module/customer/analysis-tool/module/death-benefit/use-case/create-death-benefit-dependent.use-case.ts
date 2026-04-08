import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { DeathBenefitId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit/value-object/death-benefit-id.value-object';
import { DeathBenefitDependentId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-dependent/value-object/death-benefit-dependent-id.value-object';
import { CreateDeathBenefitDependentRequestDto } from '@module/customer/analysis-tool/module/death-benefit/dto/request/create-death-benefit-dependent.request.dto';
import { CreateDeathBenefitDependentResponseDto } from '@module/customer/analysis-tool/module/death-benefit/dto/response/create-death-benefit-dependent.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateDeathBenefitDependentUseCase {
  protected readonly _type = CreateDeathBenefitDependentUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    _deathBenefitId: DeathBenefitId,
    _dto: CreateDeathBenefitDependentRequestDto,
  ): Promise<CreateDeathBenefitDependentResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    return CreateDeathBenefitDependentResponseDto.build({
      deathBenefitDependentId: new DeathBenefitDependentId(),
    });
  }
}
