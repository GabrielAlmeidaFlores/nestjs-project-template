import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { BankGateway } from '@infra/bank/bank.gateway';
import { AsaasBillingTypeEnum } from '@infra/bank/implementation/asaas/enum/asaas-billing-type.enum';
import { AsaasDiscountTypeEnum } from '@infra/bank/implementation/asaas/enum/asaas-discount-type.enum';
import { AsaasSubscriptionCycleEnum } from '@infra/bank/implementation/asaas/enum/asaas-subscription-cycle.enum';
import { AsaasCreditCardHolderInfoInputModel } from '@infra/bank/implementation/asaas/model/input/asaas-credit-card-holder-info.input.model';
import { AsaasCreditCardInfoInputModel } from '@infra/bank/implementation/asaas/model/input/asaas-credit-card-info.input.model';
import { AsaasDiscountInputModel } from '@infra/bank/implementation/asaas/model/input/asaas-discount.input.model';
import { CreateAsaasChargeInputModel } from '@infra/bank/implementation/asaas/model/input/create-asaas-charge.input.model';
import { CreateAsaasCustomerInputModel } from '@infra/bank/implementation/asaas/model/input/create-asaas-customer.input.model';
import { CreateAsaasSubscriptionInputModel } from '@infra/bank/implementation/asaas/model/input/create-asaas-subscription.input.model';
import { PayAsaasChargeInputModel } from '@infra/bank/implementation/asaas/model/input/pay-asaas-charge.input.model';
import { CreateAsaasChargeOutputModel } from '@infra/bank/implementation/asaas/model/output/create-asaas-charge.output.model';
import { CreateAsaasCustomerOutputModel } from '@infra/bank/implementation/asaas/model/output/create-asaas-customer.output.model';
import { CreateAsaasSubscriptionOutputModel } from '@infra/bank/implementation/asaas/model/output/create-asaas-subscription.output.model';
import { PayBankChargeInputModel } from '@infra/bank/model/input/pay-bank-charge.input.model';
import { CreateBankChargeOutputModel } from '@infra/bank/model/output/create-bank-charge.output.model';
import { CreateBankCustomerOutputModel } from '@infra/bank/model/output/create-bank-customer.output.model';
import { CreateBankPaymentPlanOutputModel } from '@infra/bank/model/output/create-bank-payment-plan.output.model';
import { GetBankChargePixInfoOutputModel } from '@infra/bank/model/output/get-bank-charge-pix-info.output.model';
import { AsaasApplicationVariable } from '@shared/system/constant/application-variable/asaas.application-variable';

import type { CreateBankChargeInputModel } from '@infra/bank/model/input/create-bank-charge.input.model';
import type { CreateBankCustomerInputModel } from '@infra/bank/model/input/create-bank-customer.input.model';
import type { CreateBankPaymentPlanInputModel } from '@infra/bank/model/input/create-bank-payment-plan.input.model';

@Injectable()
export class AsaasService implements BankGateway {
  protected readonly _type = AsaasService.name;

  private readonly asaasUrl: URL;
  private readonly asaasRequestHeaders: Record<string, string>;

  public constructor(private readonly httpService: HttpService) {
    this.asaasUrl = new URL(AsaasApplicationVariable.ASAAS_URL);
    this.asaasRequestHeaders = {
      accept: 'application/json',
      'content-type': 'application/json',
      access_token: AsaasApplicationVariable.BANK_ACCESS_TOKEN,
    };
  }

  public async createCustomer(
    props: CreateBankCustomerInputModel,
  ): Promise<CreateBankCustomerOutputModel> {
    const email = props.email.toString();
    const mobilePhone = props.phoneNumber.toString();
    const cpfCnpj = props.federalDocument.toString();

    const payload = new CreateAsaasCustomerInputModel({
      name: props.name,
      email,
      mobilePhone,
      cpfCnpj,
    });

    const endpoint = new URL('/customer', this.asaasUrl).toString();

    const request = this.httpService.request<CreateAsaasCustomerOutputModel>({
      url: endpoint,
      method: 'POST',
      data: payload,
      headers: this.asaasRequestHeaders,
    });

    const response =
      await firstValueFrom<AxiosResponse<CreateAsaasCustomerOutputModel>>(
        request,
      );

    return new CreateBankCustomerOutputModel({
      id: response.data.id,
      name: response.data.name,
      email: new Email(response.data.email),
      phoneNumber: new PhoneNumber(response.data.mobilePhone),
      federalDocument: new FederalDocument(response.data.cpfCnpj),
    });
  }

  public async createCharge(
    props: CreateBankChargeInputModel,
  ): Promise<CreateBankChargeOutputModel> {
    const value = props.value.toNumber();
    const externalReference = props.paymentPlan.toString();
    const billingType = AsaasBillingTypeEnum[props.billingMethod];

    let discount: AsaasDiscountInputModel | null = null;

    const hasDiscount = typeof props.discountPercentage === 'number';
    if (hasDiscount) {
      const discountValue = Number(props.discountPercentage);

      discount = new AsaasDiscountInputModel({
        type: AsaasDiscountTypeEnum.PERCENTAGE,
        value: discountValue,
        dueDateLimitDays: null,
      });
    }

    const payload = new CreateAsaasChargeInputModel({
      customer: props.customerId,
      description: props.description,
      dueDate: props.dueDate,
      value,
      externalReference,
      billingType,
      discount,
      installmentCount: props.installmentCount,
    });

    const endpoint = new URL('/payments', this.asaasUrl).toString();

    const request = this.httpService.request<CreateAsaasChargeOutputModel>({
      url: endpoint,
      method: 'POST',
      data: payload,
      headers: this.asaasRequestHeaders,
    });

    const response =
      await firstValueFrom<AxiosResponse<CreateAsaasChargeOutputModel>>(
        request,
      );

    const chargeValue = new DecimalValue(response.data.value);
    const chargeNetValue = new DecimalValue(response.data.netValue);
    const paymentPlan = new Guid(response.data.externalReference);
    const discountPercentage = response.data.discount?.value ?? null;
    let pixInfo: GetBankChargePixInfoOutputModel | null = null;

    try {
      pixInfo = await this.getChargePixInfo(response.data.id);
    } catch {}

    return new CreateBankChargeOutputModel({
      id: response.data.id,
      customer: response.data.customer,
      billingMethod: props.billingMethod,
      value: chargeValue,
      netValue: chargeNetValue,
      dueDate: response.data.dueDate,
      dateCreated: response.data.dateCreated,
      description: response.data.description,
      paymentPlan,
      discountPercentage,
      pixInfo,
    });
  }

  public async payCharge(props: PayBankChargeInputModel): Promise<void> {
    const email = props.creditCardHolderInfo.email.toString();
    const cpfCnpj = props.creditCardHolderInfo.federalDocument.toString();
    const postalCode = props.creditCardHolderInfo.postalCode.toString();
    const phone = props.creditCardHolderInfo.phone.toString();

    const payload = new PayAsaasChargeInputModel({
      creditCard: new AsaasCreditCardInfoInputModel(props.creditCard),
      creditCardHolderInfo: new AsaasCreditCardHolderInfoInputModel({
        name: props.creditCardHolderInfo.name,
        email,
        cpfCnpj,
        postalCode,
        addressNumber: props.creditCardHolderInfo.addressNumber,
        phone,
      }),
    });

    const endpoint = new URL(
      `/payments/${props.chargeId}/payWithCreditCard`,
      this.asaasUrl,
    ).toString();

    const request = this.httpService.request<CreateAsaasChargeOutputModel>({
      url: endpoint,
      method: 'POST',
      data: payload,
      headers: this.asaasRequestHeaders,
    });

    await firstValueFrom<AxiosResponse<CreateAsaasChargeOutputModel>>(request);
  }

  public async createBankPaymentPlan(
    props: CreateBankPaymentPlanInputModel,
  ): Promise<CreateBankPaymentPlanOutputModel> {
    const email = props.creditCardHolderInfo.email.toString();
    const cpfCnpj = props.creditCardHolderInfo.federalDocument.toString();
    const postalCode = props.creditCardHolderInfo.postalCode.toString();
    const phone = props.creditCardHolderInfo.phone.toString();
    const value = props.value.toNumber();
    const cycle = AsaasSubscriptionCycleEnum[props.cycle];
    let discount: AsaasDiscountInputModel | null = null;

    const hasDiscount = typeof props.discountPercentage === 'number';
    if (hasDiscount) {
      const discountValue = Number(props.discountPercentage);

      discount = new AsaasDiscountInputModel({
        type: AsaasDiscountTypeEnum.PERCENTAGE,
        value: discountValue,
        dueDateLimitDays: null,
      });
    }

    const payload = new CreateAsaasSubscriptionInputModel({
      customer: props.customerId,
      billingType: AsaasBillingTypeEnum.CREDIT_CARD,
      value,
      cycle,
      description: props.description,
      remoteIp: props.remoteIp,
      discount,
      creditCard: new AsaasCreditCardInfoInputModel(props.creditCard),
      creditCardHolderInfo: new AsaasCreditCardHolderInfoInputModel({
        name: props.creditCardHolderInfo.name,
        email,
        cpfCnpj,
        postalCode,
        addressNumber: props.creditCardHolderInfo.addressNumber,
        phone,
      }),
    });

    const endpoint = new URL(`/subscriptions`, this.asaasUrl).toString();

    const request =
      this.httpService.request<CreateAsaasSubscriptionOutputModel>({
        url: endpoint,
        method: 'POST',
        data: payload,
        headers: this.asaasRequestHeaders,
      });

    const response =
      await firstValueFrom<AxiosResponse<CreateAsaasSubscriptionOutputModel>>(
        request,
      );

    return new CreateBankPaymentPlanOutputModel({
      id: response.data.id,
      customer: response.data.customer,
      paymentMethod: props.paymentMethod,
      value: props.value,
      cycle: props.cycle,
      description: response.data.description,
    });
  }

  private async getChargePixInfo(
    chargeId: string,
  ): Promise<GetBankChargePixInfoOutputModel> {
    const endpoint = new URL(
      `/payments/${chargeId}/pixQrCode`,
      this.asaasUrl,
    ).toString();

    const request = this.httpService.request<GetBankChargePixInfoOutputModel>({
      url: endpoint,
      method: 'GET',
      headers: this.asaasRequestHeaders,
    });

    const response =
      await firstValueFrom<AxiosResponse<GetBankChargePixInfoOutputModel>>(
        request,
      );

    return response.data;
  }
}
