import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';

import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { BankGateway } from '@infra/bank/bank.gateway';
import { CreateAsaasCustomerInputModel } from '@infra/bank/implementation/asaas/model/input/create-asaas-customer.input.model';
import { CreateAsaasCustomerOutputModel } from '@infra/bank/implementation/asaas/model/output/create-asaas-customer.output.model';
import { CreateBankCustomerOutputModel } from '@infra/bank/model/output/create-bank-customer.output.model';
import { AsaasApplicationVariable } from '@shared/system/constant/application-variable/asaas.application-variable copy';

import type { CreateBankCustomerInputModel } from '@infra/bank/model/input/create-bank-customer.input.model';
import type { CreateBankPaymentPlanInputModel } from '@infra/bank/model/input/create-bank-payment-plan.input.model';
import type { CreateBankPaymentInputModel } from '@infra/bank/model/input/create-bank-payment.input.model';
import type { CreateBankPaymentPlanOutputModel } from '@infra/bank/model/output/create-bank-payment-plan.output.model';
import type { CreateBankPaymentOutputModel } from '@infra/bank/model/output/create-bank-payment.output.model';

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

    const customer = new CreateAsaasCustomerInputModel({
      name: props.name,
      email,
      mobilePhone,
      cpfCnpj,
    });

    const endpoint = new URL('/customer', this.asaasUrl).toString();

    const request = this.httpService.request<CreateAsaasCustomerOutputModel>({
      url: endpoint,
      method: 'POST',
      data: customer,
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

  public createPayment(
    props: CreateBankPaymentInputModel,
  ): Promise<CreateBankPaymentOutputModel> {
    throw new Error('Method not implemented.');
  }

  public createPaymentPlan(
    props: CreateBankPaymentPlanInputModel,
  ): Promise<CreateBankPaymentPlanOutputModel> {
    throw new Error('Method not implemented.');
  }
}
