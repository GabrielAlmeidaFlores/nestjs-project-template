import { Inject, Injectable } from '@nestjs/common';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { PaymentPlanQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan/query/payment-plan.query.repository.gateway';
import {
  ListPaymentPlansResponseDto,
  PaymentPlanPaidResourceDto,
} from '@module/customer/payment-plan/dto/response/list-payment-plans.response.dto';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';

@Injectable()
export class ListPaymentPlansUseCase {
  protected readonly _type = ListPaymentPlansUseCase.name;

  public constructor(
    @Inject(PaymentPlanQueryRepositoryGateway)
    private readonly paymentPlanQueryRepository: PaymentPlanQueryRepositoryGateway,
  ) {}

  public async execute(
    dto: ListDataRequestDto,
  ): Promise<ListPaymentPlansResponseDto[]> {
    const result = await this.paymentPlanQueryRepository.listPaymentPlan(
      new ListDataInputModel({
        ...dto,
      }),
    );

    return result.resource.map((plan) => {
      return ListPaymentPlansResponseDto.build({
        id: plan.id.toString(),
        name: plan.name,
        description: plan.description,
        price: plan.price.toNumber(),
        maxMemberCount: plan.maxMemberCount,
        monthlyCreditAmount: plan.monthlyCreditAmount,
        active: plan.active,
        cycle: plan.cycle,
        paidResources: plan.enabledPaidResources.map((resource) =>
          PaymentPlanPaidResourceDto.build({
            id: resource.id.toString(),
            resource: resource.resource,
            creditCost: resource.creditCost,
            description: resource.description,
          }),
        ),
      });
    });
  }
}
