import { Inject, Injectable } from '@nestjs/common';

import { CurrentYearRevenueResponseDto } from '@module/admin/dashboard-metrics/dto/response/current-year-revenue.response.dto';
import { BankPaymentQueryRepositoryGateway } from '@module/generic/bank/domain/repository/bank-payment/query/bank-payment.query.repository.gateway';

@Injectable()
export class GetCurrentYearRevenueUseCase {
  protected readonly _type = GetCurrentYearRevenueUseCase.name;

  public constructor(
    @Inject(BankPaymentQueryRepositoryGateway)
    private readonly bankPaymentQueryRepository: BankPaymentQueryRepositoryGateway,
  ) {}

  public async execute(): Promise<CurrentYearRevenueResponseDto> {
    const year = new Date().getFullYear();

    const totalRevenue =
      await this.bankPaymentQueryRepository.sumBankPaymentAmountByYear(year);

    return CurrentYearRevenueResponseDto.build({
      totalRevenue,
      year,
    });
  }
}
