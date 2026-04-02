import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError, AxiosRequestConfig } from 'axios';

import { Base64 } from '@core/domain/schema/value-object/base64/base64.value-object';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { PixAddressKeyTypeEnum } from '@infra/payment-gateway/enum/pix-address-key-type.enum';
import { TransferStatusEnum } from '@infra/payment-gateway/enum/transfer-status.enum';
import { InvalidBankCustomerDataError } from '@infra/payment-gateway/implementation/asaas/error/invalid-bank-customer-data.error';
import { PaymentNotApprovedError } from '@infra/payment-gateway/implementation/asaas/error/payment-not-approved.error';
import { TransferFailedError } from '@infra/payment-gateway/implementation/asaas/error/transfer-failed.error';
import { AsaasApiErrorResponseType } from '@infra/payment-gateway/implementation/asaas/type/asaas-api-error-response.type';
import { CreateBillingInputModel } from '@infra/payment-gateway/model/input/create-billing.input.model';
import { CreateCustomerInputModel } from '@infra/payment-gateway/model/input/create-customer.input.model';
import { CreateSubscriptionInputModel } from '@infra/payment-gateway/model/input/create-subscription.input.model';
import { CreateTransferInputModel } from '@infra/payment-gateway/model/input/create-transfer.input.model';
import { PayBillingInputModel } from '@infra/payment-gateway/model/input/pay-billing.input.model';
import { CreateBillingOutputModel } from '@infra/payment-gateway/model/output/create-billing.output.model';
import { CreateCustomerOutputModel } from '@infra/payment-gateway/model/output/create-customer.output.model';
import { CreateSubscriptionOutputModel } from '@infra/payment-gateway/model/output/create-subscription.output.model';
import { CreateTransferOutputModel } from '@infra/payment-gateway/model/output/create-transfer.output.model';
import { PayBillingOutputModel } from '@infra/payment-gateway/model/output/pay-billing.output.model';
import { PaymentGateway } from '@infra/payment-gateway/payment-gateway.gateway';
import { PaymentPlanCycleEnum } from '@module/customer/payment-plan/domain/schema/enum/payment-plan-cycle.enum';
import { PaymentGatewayApplicationVariable } from '@shared/system/constant/application-variable/source/payment-gateway.application-variable';

@Injectable()
export class AsaasService extends PaymentGateway {
  protected readonly _type = AsaasService.name;

  private readonly logger;
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

    this.logger = new Logger(AsaasService.name);
  }

  public async createCustomer(
    props: CreateCustomerInputModel,
  ): Promise<CreateCustomerOutputModel> {
    try {
      const data = {
        name: props.name,
        email: props.email.toString(),
        mobilePhone: props.phoneNumber.toStringWithoutCountryCode(),
        cpfCnpj: props.federalDocument.toString(),
        externalReference: props.externalReference,
        notificationDisabled: true,
      };

      const customer = await this.makeRequest<
        Record<string, unknown>,
        { id: string }
      >('customers', 'post', data);

      return CreateCustomerOutputModel.build({
        id: customer.id,
      });
    } catch (error) {
      this.handleAsaasApiError(
        error,
        (message) => new InvalidBankCustomerDataError({ message }),
      );
    }
  }

  public async cancelSubscription(subscriptionId: string): Promise<void> {
    await this.makeRequest(`subscriptions/${subscriptionId}`, 'delete');
  }

  public async payBilling(
    props: PayBillingInputModel,
  ): Promise<PayBillingOutputModel> {
    try {
      const data = {
        creditCard: {
          holderName: props.creditCardInfo.holderName,
          number: props.creditCardInfo.number,
          expiryMonth: props.creditCardInfo.expiryMonth,
          expiryYear: props.creditCardInfo.expiryYear,
          ccv: props.creditCardInfo.ccv,
        },
        creditCardHolderInfo: {
          name: props.creditCardHolderInfo.name,
          email: props.creditCardHolderInfo.email.toString(),
          cpfCnpj: props.creditCardHolderInfo.federalDocument.toString(),
          postalCode: props.creditCardHolderInfo.postalCode.toString(),
          addressNumber: props.creditCardHolderInfo.addressNumber,
          phone: props.creditCardHolderInfo.phone.toString(),
        },
      };

      const response = await this.makeRequest<
        Record<string, unknown>,
        { id: string; value: number }
      >(`payments/${props.billingId}/payWithCreditCard`, 'post', data);

      return PayBillingOutputModel.build({
        id: props.billingId,
        value: new DecimalValue(response.value),
      });
    } catch (error) {
      this.handleAsaasApiError(
        error,
        (message) => new PaymentNotApprovedError({ message }),
      );
    }
  }

  public async cancelBilling(billingId: string): Promise<void> {
    await this.makeRequest(`payments/${billingId}`, 'delete');
  }

  public async createBilling(
    props: CreateBillingInputModel,
  ): Promise<CreateBillingOutputModel> {
    const data: Record<string, unknown> = {
      customer: props.customerId,
      value: props.value.toNumber(),
      dueDate: props.dueDate,
      description: props.description,
      externalReference: props.externalReference,
      installmentCount: props.installmentCount,
      billingType: 'UNDEFINED',
    };

    if (props.installmentCount !== undefined) {
      data['totalValue'] = props.value.toNumber();
    }

    const billing = await this.makeRequest<
      Record<string, unknown>,
      {
        id: string;
        installment?: string;
        value: number;
        bankSlipUrl?: string;
      }
    >('payments', 'post', data);

    let billingPixData:
      | {
          encodedImage: string;
          payload: string;
        }
      | undefined = undefined;

    try {
      billingPixData = await this.makeRequest<
        Record<string, unknown>,
        { encodedImage: string; payload: string }
      >(`payments/${billing.id}/pixQrCode`, 'get');
    } catch {}

    let billingIdentificationData:
      | {
          identificationField: string;
          nossoNumero: string;
          barCode: string;
        }
      | undefined = undefined;

    try {
      billingIdentificationData = await this.makeRequest<
        Record<string, unknown>,
        {
          identificationField: string;
          nossoNumero: string;
          barCode: string;
        }
      >(`payments/${billing.id}/identificationField`, 'get');
    } catch {}

    const outputData: {
      id: string;
      value: DecimalValue;
      pixQrCode?: Base64;
      pixCopyPaste?: string;
      installment?: string;
      bankSlipCode?: string;
      bankSlipUrl?: string;
    } = {
      id: billing.id,
      value: new DecimalValue(billing.value),
    };

    if (billingPixData !== undefined) {
      outputData.pixQrCode = new Base64(billingPixData.encodedImage);
      outputData.pixCopyPaste = billingPixData.payload;
    }

    if (billing.installment !== undefined) {
      outputData.installment = billing.installment;
    }

    if (billing.bankSlipUrl !== undefined) {
      outputData.bankSlipUrl = billing.bankSlipUrl;
    }

    if (billingIdentificationData !== undefined) {
      outputData.bankSlipCode = billingIdentificationData.identificationField;
    }

    return CreateBillingOutputModel.build(outputData);
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
        Record<string, unknown>,
        { id: string }
      >('subscriptions', 'post', data);

      return CreateSubscriptionOutputModel.build({
        id: subscription.id,
      });
    } catch (error) {
      this.handleAsaasApiError(
        error,
        (message) => new PaymentNotApprovedError({ message }),
      );
    }
  }

  public async transfer(
    props: CreateTransferInputModel,
  ): Promise<CreateTransferOutputModel> {
    const isHmlEnvironment =
      PaymentGatewayApplicationVariable.BANK_ACCESS_TOKEN.includes('hml');

    if (isHmlEnvironment) {
      const evpKey = new Guid().toString();

      const hmlData: Record<string, unknown> = {
        value: props.value.toNumber(),
        pixAddressKey: evpKey,
        pixAddressKeyType: 'EVP',
        operationType: 'PIX',
      };

      if (props.scheduleDate !== undefined) {
        hmlData['scheduleDate'] = props.scheduleDate;
      }

      if (props.description !== undefined) {
        hmlData['description'] = props.description;
      }

      if (props.externalReference !== undefined) {
        hmlData['externalReference'] = props.externalReference;
      }

      const hmlResponse = await this.makeRequest<
        Record<string, unknown>,
        { id: string; value: number; status: TransferStatusEnum }
      >('transfers', 'post', hmlData);

      return CreateTransferOutputModel.build({
        id: hmlResponse.id,
        value: new DecimalValue(hmlResponse.value),
        status: hmlResponse.status,
        pixAddressKey: evpKey,
        pixAddressKeyType: PixAddressKeyTypeEnum.RANDOM,
      });
    }

    const pixAddressKeyTypeMap: Record<PixAddressKeyTypeEnum, string> = {
      [PixAddressKeyTypeEnum.CPF]: 'CPF',
      [PixAddressKeyTypeEnum.CNPJ]: 'CNPJ',
      [PixAddressKeyTypeEnum.EMAIL]: 'EMAIL',
      [PixAddressKeyTypeEnum.PHONE]: 'PHONE',
      [PixAddressKeyTypeEnum.RANDOM]: 'EVP',
    };

    try {
      const data: Record<string, unknown> = {
        value: props.value.toNumber(),
        pixAddressKey: props.pixAddressKey,
        pixAddressKeyType: pixAddressKeyTypeMap[props.pixAddressKeyType],
        operationType: 'PIX',
      };

      if (props.scheduleDate !== undefined) {
        data['scheduleDate'] = props.scheduleDate;
      }

      if (props.description !== undefined) {
        data['description'] = props.description;
      }

      if (props.externalReference !== undefined) {
        data['externalReference'] = props.externalReference;
      }

      const response = await this.makeRequest<
        Record<string, unknown>,
        { id: string; value: number; status: TransferStatusEnum }
      >('transfers', 'post', data);

      return CreateTransferOutputModel.build({
        id: response.id,
        value: new DecimalValue(response.value),
        status: response.status,
        pixAddressKey: props.pixAddressKey,
        pixAddressKeyType: props.pixAddressKeyType,
      });
    } catch (error) {
      this.handleAsaasApiError(
        error,
        (message) => new TransferFailedError({ message }),
      );
    }
  }

  private handleAsaasApiError(
    error: unknown,
    errorFactory: (message: string) => Error,
  ): never {
    if (
      error instanceof AxiosError &&
      error.status?.toString().startsWith('4') === true
    ) {
      const apiError = error.response?.data as
        | AsaasApiErrorResponseType
        | undefined;

      if (
        apiError?.errors &&
        apiError.errors.length > 0 &&
        apiError.errors[0]?.description !== undefined
      ) {
        throw errorFactory(apiError.errors[0].description);
      }
    }

    throw error;
  }

  private async makeRequest<RequestBody, ResponseBody>(
    path: string,
    method: 'get' | 'post' | 'put' | 'delete',
    data?: RequestBody,
  ): Promise<ResponseBody> {
    try {
      const url = `${PaymentGatewayApplicationVariable.BANK_API_DOMAIN}/${path}`;
      const response = await this.httpService
        .request<ResponseBody>({
          url,
          method,
          data,
          ...this.config,
        })
        .toPromise();

      return response?.data as ResponseBody;
    } catch (error) {
      if (error instanceof AxiosError) {
        this.logger.error(error.message, error.stack);
      }
      throw error;
    }
  }
}
