import { Body, HttpStatus, Param, RequestMethod, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';

import { AffiliateCustomerId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/value-object/affiliate-customer-id/affiliate-customer-id.value-object';
import { UpdateMyAffiliatePixKeyRequestDto } from '@module/customer/affiliate-customer/dto/request/update-my-affiliate-pix-key.request.dto';
import { GetMyAffiliateCustomerSummaryResponseDto } from '@module/customer/affiliate-customer/dto/response/get-my-affiliate-customer-summary.response.dto';
import { GetMyAffiliateCustomerResponseDto } from '@module/customer/affiliate-customer/dto/response/get-my-affiliate-customer.response.dto';
import { GetPublicAffiliateCustomerResponseDto } from '@module/customer/affiliate-customer/dto/response/get-public-affiliate-customer.response.dto';
import { ListMyAffiliateCommissionsResponseDto } from '@module/customer/affiliate-customer/dto/response/list-my-affiliate-commissions.response.dto';
import { GetMyAffiliateCustomerSummaryUseCase } from '@module/customer/affiliate-customer/use-case/get-my-affiliate-customer-summary.use-case';
import { GetMyAffiliateCustomerUseCase } from '@module/customer/affiliate-customer/use-case/get-my-affiliate-customer.use-case';
import { GetPublicAffiliateCustomerUseCase } from '@module/customer/affiliate-customer/use-case/get-public-affiliate-customer.use-case';
import { ListMyAffiliateCommissionsUseCase } from '@module/customer/affiliate-customer/use-case/list-my-affiliate-commissions.use-case';
import { UpdateMyAffiliatePixKeyUseCase } from '@module/customer/affiliate-customer/use-case/update-my-affiliate-pix-key.use-case';
import { AuthGuard } from '@shared/api/gateway/guard/auth/auth.guard';
import { CustomerControllerRoute } from '@shared/api/util/decorator/class/controller-route/customer-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { GetSessionData } from '@shared/api/util/decorator/property/get-session-data/get-session-data.decorator';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { ParseValueObjectPipe } from '@shared/api/util/pipe/parse-value-object.pipe';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@CustomerControllerRoute('affiliate-customer')
export class AffiliateCustomerController {
  protected readonly _type = AffiliateCustomerController.name;

  public constructor(
    private readonly getPublicAffiliateCustomerUseCase: GetPublicAffiliateCustomerUseCase,
    private readonly getMyAffiliateCustomerUseCase: GetMyAffiliateCustomerUseCase,
    private readonly getMyAffiliateCustomerSummaryUseCase: GetMyAffiliateCustomerSummaryUseCase,
    private readonly updateMyAffiliatePixKeyUseCase: UpdateMyAffiliatePixKeyUseCase,
    private readonly listMyAffiliateCommissionsUseCase: ListMyAffiliateCommissionsUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Buscar meus dados de afiliado',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'me',
      method: RequestMethod.GET,
    },
    tag: ['affiliate-customer'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Dados do afiliado autenticado retornados com sucesso.',
      type: GetMyAffiliateCustomerResponseDto,
    },
    guard: [AuthGuard],
  })
  public async getMyAffiliateCustomer(
    @GetSessionData() sessionData: SessionDataModel,
  ): Promise<GetMyAffiliateCustomerResponseDto> {
    return this.getMyAffiliateCustomerUseCase.execute(sessionData);
  }

  @BuildEndpointSpecification({
    summary: 'Listar minhas comissões de afiliado com dados de transferência',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'me/commissions',
      method: RequestMethod.GET,
    },
    tag: ['affiliate-customer'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Comissões do afiliado autenticado retornadas com sucesso.',
      type: ListMyAffiliateCommissionsResponseDto,
    },
    guard: [AuthGuard],
  })
  public async listMyAffiliateCommissions(
    @GetSessionData() sessionData: SessionDataModel,
  ): Promise<ListMyAffiliateCommissionsResponseDto> {
    return this.listMyAffiliateCommissionsUseCase.execute(sessionData);
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar chave Pix do afiliado autenticado',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'me/pix-key',
      method: RequestMethod.PATCH,
      type: UpdateMyAffiliatePixKeyRequestDto,
    },
    tag: ['affiliate-customer'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Chave Pix do afiliado atualizada com sucesso.',
      type: GetMyAffiliateCustomerResponseDto,
    },
    guard: [AuthGuard],
  })
  public async updateMyPixKey(
    @GetSessionData() sessionData: SessionDataModel,
    @Body() body: UpdateMyAffiliatePixKeyRequestDto,
  ): Promise<GetMyAffiliateCustomerResponseDto> {
    return this.updateMyAffiliatePixKeyUseCase.execute(sessionData, body);
  }

  @BuildEndpointSpecification({
    summary: 'Buscar resumo dos dados do afiliado autenticado',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'me/summary',
      method: RequestMethod.GET,
    },
    tag: ['affiliate-customer'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Resumo dos dados do afiliado retornado com sucesso.',
      type: GetMyAffiliateCustomerSummaryResponseDto,
    },
    guard: [AuthGuard],
  })
  public async getMyAffiliateCustomerSummary(
    @GetSessionData() sessionData: SessionDataModel,
  ): Promise<GetMyAffiliateCustomerSummaryResponseDto> {
    return this.getMyAffiliateCustomerSummaryUseCase.execute(sessionData);
  }

  @BuildEndpointSpecification({
    summary:
      'Buscar informações públicas do afiliado e registrar cookie de indicação',
    http: {
      path: ':affiliateCustomerId',
      method: RequestMethod.GET,
    },
    tag: ['affiliate-customer'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Informações públicas do afiliado retornadas e cookie de indicação registrado.',
      type: GetPublicAffiliateCustomerResponseDto,
    },
  })
  public async getPublicAffiliateCustomer(
    @Res({ passthrough: true }) reply: FastifyReply,
    @Param('affiliateCustomerId', new ParseValueObjectPipe(AffiliateCustomerId))
    affiliateCustomerId: AffiliateCustomerId,
  ): Promise<GetPublicAffiliateCustomerResponseDto> {
    return this.getPublicAffiliateCustomerUseCase.execute(
      reply,
      affiliateCustomerId,
    );
  }
}
