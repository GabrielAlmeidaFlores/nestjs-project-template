import { Inject, Injectable } from '@nestjs/common';

import { CurrentYearUsersCountResponseDto } from '@module/admin/dashboard-metrics/dto/response/current-year-users-count.response.dto';
import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';

@Injectable()
export class GetCurrentYearUsersCountUseCase {
  protected readonly _type = GetCurrentYearUsersCountUseCase.name;

  public constructor(
    @Inject(CustomerQueryRepositoryGateway)
    private readonly customerQueryRepository: CustomerQueryRepositoryGateway,
  ) {}

  public async execute(): Promise<CurrentYearUsersCountResponseDto> {
    const year = new Date().getFullYear();
    const allCustomers = await this.customerQueryRepository.listAll();

    const JANUARY = 0;
    const DECEMBER = 11;
    const LAST_DAY_OF_MONTH = 31;
    const LAST_HOUR = 23;
    const LAST_MINUTE = 59;
    const LAST_SECOND = 59;
    const LAST_MILLISECOND = 999;

    const startOfYear = new Date(year, JANUARY, 1, 0, 0, 0, 0);
    const endOfYear = new Date(
      year,
      DECEMBER,
      LAST_DAY_OF_MONTH,
      LAST_HOUR,
      LAST_MINUTE,
      LAST_SECOND,
      LAST_MILLISECOND,
    );

    const totalUsers = allCustomers.filter(
      (customer) =>
        customer.createdAt >= startOfYear && customer.createdAt <= endOfYear,
    ).length;

    return CurrentYearUsersCountResponseDto.build({
      totalUsers,
      year,
    });
  }
}
