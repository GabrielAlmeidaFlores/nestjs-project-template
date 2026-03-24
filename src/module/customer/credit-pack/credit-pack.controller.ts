import { Body, HttpStatus, Param, Query, RequestMethod } from '@nestjs/common';

import { PurchaseCreditPackRequestDto } from '@module/customer/credit-pack/dto/request/purchase-credit-pack.request.dto';
import { ListCreditPacksResponseDto } from '@module/customer/credit-pack/dto/response/list-credit-packs.response.dto';
import { PayCreditPackBillingResponseDto } from '@module/customer/credit-pack/dto/response/pay-credit-pack-billing.response.dto';
import { PurchaseCreditPackResponseDto } from '@module/customer/credit-pack/dto/response/purchase-credit-pack.response.dto';
import { ListCreditPacksUseCase } from '@module/customer/credit-pack/use-case/list-credit-packs.use-case';
import { PayCreditPackBillingUseCase } from '@module/customer/credit-pack/use-case/pay-credit-pack-billing.use-case';
import { PurchaseCreditPackUseCase } from '@module/customer/credit-pack/use-case/purchase-credit-pack.use-case';
import { GetBankPaymentResponseDto } from '@module/customer/payment-plan/dto/response/get-bank-payment.response.dto';
import { GetBankPaymentDetailsUseCase } from '@module/customer/payment-plan/use-case/get-bank-payment-details.use-case';
import { PayBillingRequestDto } from '@module/customer/payment-plan/dto/request/pay-billing.request.dto';
import { BankPaymentId } from '@module/generic/bank/domain/schema/entity/bank-payment/value-object/bank-payment-id/bank-payment-id.value-object';
import { AuthGuard } from '@shared/api/gateway/guard/auth/auth.guard';
import { OrganizationOwnerGuard } from '@shared/api/gateway/guard/organization-owner/organization-owner.guard';
import { OrganizationSessionGuard } from '@shared/api/gateway/guard/organization-session/organization-session.guard';
import { CustomerControllerRoute } from '@shared/api/util/decorator/class/controller-route/customer-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { GetOrganizationSessionData } from '@shared/api/util/decorator/property/get-organization-session-data/get-organization-session-data.decorator';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { GetSessionData } from '@shared/api/util/decorator/property/get-session-data/get-session-data.decorator';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';
import { ParseValueObjectPipe } from '@shared/api/util/pipe/parse-value-object.pipe';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@CustomerControllerRoute('credit-pack')
export class CreditPackController {
  protected readonly _type = CreditPackController.name;

  public constructor(
    private readonly listCreditPacksUseCase: ListCreditPacksUseCase,
    private readonly purchaseCreditPackUseCase: PurchaseCreditPackUseCase,
    private readonly payCreditPackBillingUseCase: PayCreditPackBillingUseCase,
    private readonly getBankPaymentDetailsUseCase: GetBankPaymentDetailsUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Listar pacotes de créditos disponíveis',
    http: {
      path: '',
      method: RequestMethod.GET,
    },
    tag: ['pacote-de-creditos'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Lista paginada de pacotes de créditos disponíveis.',
      type: ListCreditPacksResponseDto,
    },
  })
  public async listCreditPacks(
    @Query() dto: ListDataRequestDto,
  ): Promise<ListCreditPacksResponseDto> {
    return this.listCreditPacksUseCase.execute(dto);
  }

  @BuildEndpointSpecification({
    summary: 'Comprar pacote de créditos',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: 'purchase',
      method: RequestMethod.POST,
      type: PurchaseCreditPackRequestDto,
    },
    tag: ['pacote-de-creditos'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Compra de pacote de créditos iniciada com sucesso.',
      type: PurchaseCreditPackResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard, OrganizationOwnerGuard],
  })
  public async purchaseCreditPack(
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @GetSessionData() sessionData: SessionDataModel,
    @Body() dto: PurchaseCreditPackRequestDto,
  ): Promise<PurchaseCreditPackResponseDto> {
    return this.purchaseCreditPackUseCase.execute(
      organizationSessionData,
      sessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Pagar cobrança de pacote de créditos com cartão de crédito',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: 'pay/billing/:bankPaymentId',
      method: RequestMethod.POST,
      type: PayBillingRequestDto,
    },
    tag: ['pacote-de-creditos'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Pagamento de pacote de créditos realizado com sucesso.',
      type: PayCreditPackBillingResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard, OrganizationOwnerGuard],
  })
  public async payCreditPackBilling(
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('bankPaymentId', new ParseValueObjectPipe(BankPaymentId))
    bankPaymentId: BankPaymentId,
    @Body() dto: PayBillingRequestDto,
  ): Promise<PayCreditPackBillingResponseDto> {
    return this.payCreditPackBillingUseCase.execute(
      organizationSessionData,
      bankPaymentId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Buscar status de pagamento de cobrança de pacote de créditos',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: 'bank-payment/:bankPaymentId',
      method: RequestMethod.GET,
    },
    tag: ['pacote-de-creditos'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Detalhes do pagamento bancário.',
      type: GetBankPaymentResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard, OrganizationOwnerGuard],
  })
  public async getCreditPackPaymentStatus(
    @Param('bankPaymentId', new ParseValueObjectPipe(BankPaymentId))
    bankPaymentId: BankPaymentId,
  ): Promise<GetBankPaymentResponseDto> {
    return this.getBankPaymentDetailsUseCase.execute(bankPaymentId);
  }
}
