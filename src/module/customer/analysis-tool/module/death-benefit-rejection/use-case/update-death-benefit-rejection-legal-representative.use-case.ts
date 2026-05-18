import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { DeathBenefitRejectionId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/value-object/death-benefit-rejection-id.value-object';
import { UpdateDeathBenefitRejectionLegalRepresentativeRequestDto } from '@module/customer/analysis-tool/module/death-benefit-rejection/dto/request/update-death-benefit-rejection-legal-representative.request.dto';
import { UpdateDeathBenefitRejectionLegalRepresentativeResponseDto } from '@module/customer/analysis-tool/module/death-benefit-rejection/dto/response/update-death-benefit-rejection-legal-representative.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class UpdateDeathBenefitRejectionLegalRepresentativeUseCase {
  protected readonly _type =
    UpdateDeathBenefitRejectionLegalRepresentativeUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    deathBenefitRejectionId: DeathBenefitRejectionId,
    _dto: UpdateDeathBenefitRejectionLegalRepresentativeRequestDto,
  ): Promise<UpdateDeathBenefitRejectionLegalRepresentativeResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    return UpdateDeathBenefitRejectionLegalRepresentativeResponseDto.build({
      deathBenefitRejectionId,
    });
  }
}
