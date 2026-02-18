import { Inject, Injectable } from '@nestjs/common';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
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

    // Get all bank payments and calculate revenue for current year
    const MAX_ITEMS = 100000;
    const allPayments = await this.bankPaymentQueryRepository.listBankPayment(
      new ListDataInputModel({ page: 1, limit: MAX_ITEMS }),
    );

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

    const totalRevenue = allPayments.resource
      .filter((payment) => {
        if (!payment.paymentDate) {
          return false;
        }
        return (
          payment.paymentDate >= startOfYear && payment.paymentDate <= endOfYear
        );
      })
      .reduce((sum, payment) => sum + parseFloat(payment.amount.toString()), 0);

    return CurrentYearRevenueResponseDto.build({
      totalRevenue,
      year,
    });
  }
}
