import { Inject, Injectable } from '@nestjs/common';

import { CurrentYearUsersMonthCountItemResponseDto } from '@module/admin/dashboard-metrics/dto/response/current-year-users-monthly-count-item.response.dto';
import { CurrentYearUsersMonthCountResponseDto } from '@module/admin/dashboard-metrics/dto/response/current-year-users-monthly-count.response.dto';
import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';

@Injectable()
export class GetCurrentYearUsersMonthlyUseCase {
  protected readonly _type = GetCurrentYearUsersMonthlyUseCase.name;

  public constructor(
    @Inject(CustomerQueryRepositoryGateway)
    private readonly customerQueryRepository: CustomerQueryRepositoryGateway,
  ) {}

  public async execute(): Promise<CurrentYearUsersMonthCountResponseDto> {
    const year = new Date().getFullYear();

    const monthlyUsers =
      await this.customerQueryRepository.countAllMonthlyUsersForYear(year);

    const usersMonthly = monthlyUsers.map((item) =>
      CurrentYearUsersMonthCountItemResponseDto.build({
        month: item.month,
        totalUsers: item.totalCount,
      }),
    );

    return CurrentYearUsersMonthCountResponseDto.build({
      usersMonthly,
    });
  }
}
