import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError, AxiosRequestConfig } from 'axios';

import { PaymentNotApprovedError } from '@infra/payment-gateway/error/payment-not-approved.error';
import { CreateCustomerInputModel } from '@infra/payment-gateway/model/input/create-customer.input.model';
import { CreateSubscriptionInputModel } from '@infra/payment-gateway/model/input/create-subscription.input.model';
import { CreateCustomerOutputModel } from '@infra/payment-gateway/model/output/create-customer.output.model';
import { CreateSubscriptionOutputModel } from '@infra/payment-gateway/model/output/create-subscription.output.model';
import { PaymentGateway } from '@infra/payment-gateway/payment-gateway.gateway';
import { PaymentPlanCycleEnum } from '@module/customer/payment-plan/domain/schema/enum/payment-plan-cycle.enum';
import { PaymentGatewayApplicationVariable } from '@shared/system/constant/application-variable/source/payment-gateway.application-variable';

@Injectable()
export class AsaasService extends PaymentGateway {
  protected readonly _type = AsaasService.name;

  private readonly config: AxiosRequestConfig;

  public constructor(private readonly httpService: HttpService) {
    super();

    this.config = {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        access_token: PaymentGatewayApplicationVariable.BANK_ACCESS_TOKEN,
      },
    };
  }

  public async createCustomer(
    props: CreateCustomerInputModel,
  ): Promise<CreateCustomerOutputModel> {
    const data = {
      name: props.name,
      email: props.email.toString(),
      mobilePhone: props.phoneNumber.toString(),
      cpfCnpj: props.federalDocument.toString(),
      externalReference: props.externalReference,
      notificationDisabled: true,
    };

    const customer = await this.makeRequest<
      {
        name: string;
        email: string;
        mobilePhone: string;
        cpfCnpj: string;
        externalReference: string;
      },
      { id: string }
    >('customers', 'post', data);

    return CreateCustomerOutputModel.build({
      id: customer.id,
    });
  }

  public async cancelSubscription(subscriptionId: string): Promise<void> {
    await this.makeRequest(`subscriptions/${subscriptionId}`, 'delete');
  }

  public async createSubscription(
    props: CreateSubscriptionInputModel,
  ): Promise<CreateSubscriptionOutputModel> {
    const cycleMap = {
      [PaymentPlanCycleEnum.MONTHLY_RECURRING]: 'MONTHLY',
    };

    const data = {
      customer: props.customerId,
      value: props.value.toNumber(),
      nextDueDate: props.nextDueDate,
      cycle: cycleMap[props.cycle],
      description: props.description,
      billingType: 'UNDEFINED',
      externalReference: props.externalReference,
      creditCard: {
        holderName: props.creditCardInfo.holderName,
        number: props.creditCardInfo.number,
        expiryMonth: props.creditCardInfo.expiryMonth,
        expiryYear: props.creditCardInfo.expiryYear,
        ccv: props.creditCardInfo.ccv,
      },
      creditCardHolder: {
        name: props.creditCardHolderInfo.name,
        email: props.creditCardHolderInfo.email.toString(),
        cpfCnpj: props.creditCardHolderInfo.federalDocument.toString(),
        postalCode: props.creditCardHolderInfo.postalCode.toString(),
        addressNumber: props.creditCardHolderInfo.addressNumber,
        phone: props.creditCardHolderInfo.phone.toString(),
      },
    };

    try {
      const subscription = await this.makeRequest<
        {
          customer: string;
          value: number;
          nextDueDate: Date;
          cycle: string;
          description: string;
        },
        { id: string }
      >('subscriptions', 'post', data);

      return CreateSubscriptionOutputModel.build({
        id: subscription.id,
      });
    } catch (error) {
      if (
        error instanceof AxiosError &&
        error.status?.toString().startsWith('4') === true
      ) {
        throw new PaymentNotApprovedError();
      }

      throw error;
    }
  }

  private async makeRequest<RequestBody, ResponseBody>(
    path: string,
    method: 'get' | 'post' | 'put' | 'delete',
    dto?: RequestBody,
  ): Promise<ResponseBody> {
    try {
      const response = await this.httpService
        .request<ResponseBody>({
          url: `${PaymentGatewayApplicationVariable.BANK_API_DOMAIN}/${path}`,
          method,
          data: dto,
          ...this.config,
        })
        .toPromise();

      return response?.data as ResponseBody;
    } catch (error) {
      throw error;
    }
  }
}
