import { Inject, Injectable } from '@nestjs/common';

import { ListAffiliateCustomersRequestDto } from '@module/admin/affiliate-customer/dto/request/list-affiliate-customers.request.dto';
import { GetAffiliateCustomerResponseDto } from '@module/admin/affiliate-customer/dto/response/get-affiliate-customer.response.dto';
import { ListAffiliateCustomersResponseDto } from '@module/admin/affiliate-customer/dto/response/list-affiliate-customers.response.dto';
import { AffiliateCustomerQueryRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer/query/affiliate-customer.query.repository.gateway';
import { ListAffiliateCustomersQueryParam } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer/query/param/list-affiliate-customers.query.param';
import { AffiliateCustomerPaymentPlanQueryRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer-payment-plan/query/affiliate-customer-payment-plan.query.repository.gateway';

@Injectable()
export class ListAffiliateCustomersUseCase {
  protected readonly _type = ListAffiliateCustomersUseCase.name;

  public constructor(
    @Inject(AffiliateCustomerQueryRepositoryGateway)
    private readonly affiliateCustomerQueryRepository: AffiliateCustomerQueryRepositoryGateway,
    @Inject(AffiliateCustomerPaymentPlanQueryRepositoryGateway)
    private readonly affiliateCustomerPaymentPlanQueryRepository: AffiliateCustomerPaymentPlanQueryRepositoryGateway,
  ) {}

  public async execute(
    dto: ListAffiliateCustomersRequestDto,
  ): Promise<ListAffiliateCustomersResponseDto> {
    const param = new ListAffiliateCustomersQueryParam({
      page: dto.page,
      limit: dto.limit,
      sortField: dto.sortField ?? null,
    });

    const paginatedResult =
      await this.affiliateCustomerQueryRepository.listWithPagination(param);

    const resource = await Promise.all(
      paginatedResult.resource.map(async (affiliate) => {
        const linkedPlans =
          await this.affiliateCustomerPaymentPlanQueryRepository.findManyByAffiliateCustomerId(
            affiliate.id,
          );

        return GetAffiliateCustomerResponseDto.build({
          ...affiliate,
          pixAddressKey: affiliate.pixAddressKey?.toString() ?? null,
          pixAddressKeyType: affiliate.pixAddressKeyType ?? null,
          paymentPlanIds: linkedPlans.map((p) => p.paymentPlanId),
        });
      }),
    );

    return ListAffiliateCustomersResponseDto.build({
      page: paginatedResult.page,
      limit: paginatedResult.limit,
      totalItems: paginatedResult.totalItems,
      totalPages: paginatedResult.totalPages,
      amountItemsCurrentPage: paginatedResult.amountItemsCurrentPage,
      resource,
    });
  }
}
