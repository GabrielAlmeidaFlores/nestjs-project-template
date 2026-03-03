import { Inject, Injectable } from '@nestjs/common';

import { TotalSubscribersCountResponseDto } from '@module/admin/dashboard-metrics/dto/response/total-subscribers-count.response.dto';
import { OrganizationPaymentPlanQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan/query/organization-payment-plan.query.repository.gateway';

@Injectable()
export class GetTotalSubscribersCountUseCase {
  protected readonly _type = GetTotalSubscribersCountUseCase.name;

  public constructor(
    @Inject(OrganizationPaymentPlanQueryRepositoryGateway)
    private readonly organizationPaymentPlanQueryRepository: OrganizationPaymentPlanQueryRepositoryGateway,
  ) {}

  public async execute(): Promise<TotalSubscribersCountResponseDto> {
    const totalSubscribers =
      await this.organizationPaymentPlanQueryRepository.countActiveSubscriptions();

    return TotalSubscribersCountResponseDto.build({
      totalSubscribers,
    });
  }
}
