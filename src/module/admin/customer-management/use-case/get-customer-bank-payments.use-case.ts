import { Inject, Injectable } from '@nestjs/common';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { CustomerNotFoundError } from '@module/customer/account/error/customer-not-found-error.error';
import { GetBankPaymentResponseDto } from '@module/customer/payment-plan/dto/response/get-bank-payment.response.dto';
import { PaginatedBankPaymentsResponseDto } from '@module/customer/payment-plan/dto/response/paginated-bank-payments.response.dto';
import { BankPaymentQueryRepositoryGateway } from '@module/generic/bank/domain/repository/bank-payment/query/bank-payment.query.repository.gateway';
import { GetBankPaymentQueryResult } from '@module/generic/bank/domain/repository/bank-payment/query/result/get-bank-payment.query.result';

@Injectable()
export class GetCustomerBankPaymentsUseCase {
  protected readonly _type = GetCustomerBankPaymentsUseCase.name;

  public constructor(
    @Inject(CustomerQueryRepositoryGateway)
    private readonly customerQueryRepository: CustomerQueryRepositoryGateway,
    @Inject(BankPaymentQueryRepositoryGateway)
    private readonly bankPaymentQueryRepository: BankPaymentQueryRepositoryGateway,
  ) {}

  public async execute(
    customerId: CustomerId,
    listData: ListDataInputModel,
  ): Promise<PaginatedBankPaymentsResponseDto> {
    // Verify customer exists
    const customer =
      await this.customerQueryRepository.findOneByCustomerId(customerId);

    if (!customer) {
      throw new CustomerNotFoundError();
    }

    // Get bank payments paginated
    const bankPayments =
      await this.bankPaymentQueryRepository.listBankPaymentByCustomerId(
        customerId,
        listData,
      );

    // Map to response DTOs
    const mappedPayments = bankPayments.resource.map((payment) =>
      this.mapBankPaymentToDto(payment),
    );

    return PaginatedBankPaymentsResponseDto.build({
      page: bankPayments.page,
      limit: bankPayments.limit,
      totalPages: bankPayments.totalPages,
      totalItems: bankPayments.totalItems,
      amountItemsCurrentPage: bankPayments.amountItemsCurrentPage,
      resource: mappedPayments,
    });
  }

  private mapBankPaymentToDto(
    payment: GetBankPaymentQueryResult,
  ): GetBankPaymentResponseDto {
    return GetBankPaymentResponseDto.build({
      id: payment.id,
      ...(payment.planName !== undefined && {
        planName: payment.planName,
      }),
      status: payment.status,
      paymentMethod: payment.paymentMethod,
      amount: payment.amount,
      dueDate: payment.dueDate,
      ...(payment.paymentDate !== null && {
        paymentDate: payment.paymentDate,
      }),
      ...(payment.description !== null && {
        description: payment.description,
      }),
      ...(payment.paymentReceipt !== null && {
        paymentReceipt: payment.paymentReceipt,
      }),
      ...(payment.bankSlipUrl !== null && {
        bankSlipUrl: payment.bankSlipUrl,
      }),
      ...(payment.bankSlipCode !== null && {
        bankSlipCode: payment.bankSlipCode,
      }),
    });
  }
}
