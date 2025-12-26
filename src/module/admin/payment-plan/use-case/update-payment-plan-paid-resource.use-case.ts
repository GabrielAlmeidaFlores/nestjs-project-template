import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { UpdatePaymentPlanPaidResourceRequestDto } from '@module/admin/payment-plan/dto/request/update-payment-plan-paid-resource.request.dto';
import { GetPaymentPlanPaidResourceResponseDto } from '@module/admin/payment-plan/dto/response/get-payment-plan-paid-resource.response.dto';
import { PaymentPlanPaidResourceNotFoundError } from '@module/admin/payment-plan/error/payment-plan-paid-resource-not-found.error';
import { PaymentPlanPaidResourceCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan-paid-resource/command/payment-plan-paid-resource.command.repository.gateway';
import { PaymentPlanPaidResourceQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan-paid-resource/query/payment-plan-paid-resource.query.repository.gateway';
import { PaymentPlanPaidResourceIaConfigCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan-paid-resource-ia-config/command/payment-plan-paid-resource-ia-config.command.repository.gateway';
import { PaymentPlanPaidResourceIaConfigQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan-paid-resource-ia-config/query/payment-plan-paid-resource-ia-config.query.repository.gateway';
import { PaymentPlanPaidResourceEntity } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/payment-plan-paid-resource.entity';
import { PaymentPlanPaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/value-object/payment-plan-paid-resource-id/payment-plan-paid-resource-id.value-object';
import { PaymentPlanPaidResourceIaConfigEntity } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource-ia-config/payment-plan-paid-resource-ia-config.entity';
import { PaymentPlanPaidResourceIaConfigId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource-ia-config/value-object/payment-plan-paid-resource-ia-config-id/payment-plan-paid-resource-ia-config-id.value-object';

@Injectable()
export class UpdatePaymentPlanPaidResourceUseCase {
  protected readonly _type = UpdatePaymentPlanPaidResourceUseCase.name;

  public constructor(
    @Inject(PaymentPlanPaidResourceQueryRepositoryGateway)
    private readonly paymentPlanPaidResourceQueryRepository: PaymentPlanPaidResourceQueryRepositoryGateway,
    @Inject(PaymentPlanPaidResourceCommandRepositoryGateway)
    private readonly paymentPlanPaidResourceCommandRepository: PaymentPlanPaidResourceCommandRepositoryGateway,
    @Inject(PaymentPlanPaidResourceIaConfigQueryRepositoryGateway)
    private readonly paymentPlanPaidResourceIaConfigQueryRepository: PaymentPlanPaidResourceIaConfigQueryRepositoryGateway,
    @Inject(PaymentPlanPaidResourceIaConfigCommandRepositoryGateway)
    private readonly paymentPlanPaidResourceIaConfigCommandRepository: PaymentPlanPaidResourceIaConfigCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    paymentPlanPaidResourceId: PaymentPlanPaidResourceId,
    dto: UpdatePaymentPlanPaidResourceRequestDto,
  ): Promise<GetPaymentPlanPaidResourceResponseDto> {
    const paidResource =
      await this.paymentPlanPaidResourceQueryRepository.findOnePaymentPlanPaidResourceByIdOrFail(
        paymentPlanPaidResourceId,
        PaymentPlanPaidResourceNotFoundError,
      );

    const transactions: TransactionType[] = [];

    if (dto.creditCost !== undefined || dto.description !== undefined) {
      const entity = new PaymentPlanPaidResourceEntity({
        id: paidResource.id,
        resource: paidResource.resource,
        creditCost: dto.creditCost ?? paidResource.creditCost,
        description: dto.description ?? paidResource.description,
      });

      transactions.push(
        this.paymentPlanPaidResourceCommandRepository.updatePaymentPlanPaidResource(
          paymentPlanPaidResourceId,
          entity,
        ),
      );
    }

    let finalPrompt: string | undefined;
    if (dto.prompt !== undefined) {
      const existingIaConfig =
        await this.paymentPlanPaidResourceIaConfigQueryRepository.findOnePaymentPlanPaidResourceIaConfigByPaidResourceId(
          paymentPlanPaidResourceId,
        );

      const paidResourceEntity = new PaymentPlanPaidResourceEntity({
        id: paidResource.id,
        resource: paidResource.resource,
        creditCost: dto.creditCost ?? paidResource.creditCost,
        description: dto.description ?? paidResource.description,
      });

      if (existingIaConfig) {
        const iaConfigEntity = new PaymentPlanPaidResourceIaConfigEntity({
          id: existingIaConfig.id,
          prompt: dto.prompt,
          paymentPlanPaidResource: paidResourceEntity,
        });

        transactions.push(
          this.paymentPlanPaidResourceIaConfigCommandRepository.updatePaymentPlanPaidResourceIaConfig(
            existingIaConfig.id,
            iaConfigEntity,
          ),
        );
      } else {
        const iaConfigId = new PaymentPlanPaidResourceIaConfigId();
        const iaConfigEntity = new PaymentPlanPaidResourceIaConfigEntity({
          id: iaConfigId,
          prompt: dto.prompt,
          paymentPlanPaidResource: paidResourceEntity,
        });

        transactions.push(
          this.paymentPlanPaidResourceIaConfigCommandRepository.createPaymentPlanPaidResourceIaConfig(
            iaConfigEntity,
          ),
        );
      }

      finalPrompt = dto.prompt;
    } else {
      const existingIaConfig =
        await this.paymentPlanPaidResourceIaConfigQueryRepository.findOnePaymentPlanPaidResourceIaConfigByPaidResourceId(
          paymentPlanPaidResourceId,
        );
      finalPrompt = existingIaConfig?.prompt;
    }

    if (transactions.length > 0) {
      const transactionOutput =
        await this.baseTransactionRepositoryGateway.execute(transactions);
      await transactionOutput.commit();
    }

    const response = GetPaymentPlanPaidResourceResponseDto.build({
      id: paidResource.id.toString(),
      resource: paidResource.resource,
      creditCost: dto.creditCost ?? paidResource.creditCost,
      description: dto.description ?? paidResource.description,
    });

    if (finalPrompt !== undefined) {
      response.prompt = finalPrompt;
    }

    return response;
  }
}
