import { Injectable } from '@nestjs/common';

import { GetBankPaymentResponseDto } from '@module/customer/analysis-tool/dto/response/get-bank-payment.response.dto';
import { BankPaymentNotFoundError } from '@module/customer/payment-plan/error/bank-payment-not-found.error';
import { BankPaymentQueryRepositoryGateway } from '@module/generic/bank/domain/repository/bank-payment/query/bank-payment.query.repository.gateway';
import { BankPaymentId } from '@module/generic/bank/domain/schema/entity/bank-payment/value-object/bank-payment-id/bank-payment-id.value-object';

@Injectable()
export class GetBankPaymentDetailsUseCase {
  protected readonly _type = GetBankPaymentDetailsUseCase.name;

  public constructor(
    private readonly bankPaymentQueryRepository: BankPaymentQueryRepositoryGateway,
  ) {}

  public async execute(
    bankPaymentId: BankPaymentId,
  ): Promise<GetBankPaymentResponseDto> {
    const payment =
      await this.bankPaymentQueryRepository.findOneBankPaymentByIdOrFail(
        bankPaymentId,
        BankPaymentNotFoundError,
      );

    return GetBankPaymentResponseDto.build({ ...payment });
  }
}
