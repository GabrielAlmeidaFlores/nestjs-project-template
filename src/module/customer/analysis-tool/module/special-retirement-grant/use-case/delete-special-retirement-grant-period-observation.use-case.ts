import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { SpecialRetirementGrantPeriodObservationCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-period-observation/command/special-retirement-grant-period-observation.command.repository.gateway';
import { SpecialRetirementGrantPeriodObservationId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period-observation/value-object/special-retirement-grant-period-observation-id/special-retirement-grant-period-observation-id.value-object';
import { DeleteSpecialRetirementGrantPeriodObservationResponseDto } from '@module/customer/analysis-tool/module/special-retirement-grant/dto/response/delete-special-retirement-grant-period-observation.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DeleteSpecialRetirementGrantPeriodObservationUseCase {
  protected readonly _type =
    DeleteSpecialRetirementGrantPeriodObservationUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(SpecialRetirementGrantPeriodObservationCommandRepositoryGateway)
    private readonly observationCommandRepositoryGateway: SpecialRetirementGrantPeriodObservationCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    observationId: SpecialRetirementGrantPeriodObservationId,
  ): Promise<DeleteSpecialRetirementGrantPeriodObservationResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      this.observationCommandRepositoryGateway.deleteSpecialRetirementGrantPeriodObservation(
        observationId,
      ),
    ]);
    await transaction.commit();

    return DeleteSpecialRetirementGrantPeriodObservationResponseDto.build({
      specialRetirementGrantPeriodObservationId: observationId,
    });
  }
}
