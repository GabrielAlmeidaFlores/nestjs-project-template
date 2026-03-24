import { Body, HttpStatus, Param, Query, RequestMethod } from '@nestjs/common';

import { CreateAffiliateCustomerRequestDto } from '@module/admin/affiliate-customer/dto/request/create-affiliate-customer.request.dto';
import { ListAffiliateCustomersRequestDto } from '@module/admin/affiliate-customer/dto/request/list-affiliate-customers.request.dto';
import { UpdateAffiliateCustomerRequestDto } from '@module/admin/affiliate-customer/dto/request/update-affiliate-customer.request.dto';
import { UpsertAffiliateCustomerConfigRequestDto } from '@module/admin/affiliate-customer/dto/request/upsert-affiliate-customer-config.request.dto';
import { AffiliateCustomerConfigItemResponseDto } from '@module/admin/affiliate-customer/dto/response/affiliate-customer-config-item.response.dto';
import { GetAffiliateCustomerSummaryResponseDto } from '@module/admin/affiliate-customer/dto/response/get-affiliate-customer-summary.response.dto';
import { GetAffiliateCustomerResponseDto } from '@module/admin/affiliate-customer/dto/response/get-affiliate-customer.response.dto';
import { ListAffiliateCommissionsResponseDto } from '@module/admin/affiliate-customer/dto/response/list-affiliate-commissions.response.dto';
import { ListAffiliateCustomerConfigsResponseDto } from '@module/admin/affiliate-customer/dto/response/list-affiliate-customer-configs.response.dto';
import { ListAffiliateCustomersResponseDto } from '@module/admin/affiliate-customer/dto/response/list-affiliate-customers.response.dto';
import { ListAffiliateTransfersResponseDto } from '@module/admin/affiliate-customer/dto/response/list-affiliate-transfers.response.dto';
import { CreateAffiliateCustomerUseCase } from '@module/admin/affiliate-customer/use-case/create-affiliate-customer.use-case';
import { DeleteAffiliateCustomerUseCase } from '@module/admin/affiliate-customer/use-case/delete-affiliate-customer.use-case';
import { GetAffiliateCustomerSummaryUseCase } from '@module/admin/affiliate-customer/use-case/get-affiliate-customer-summary.use-case';
import { GetAffiliateCustomerUseCase } from '@module/admin/affiliate-customer/use-case/get-affiliate-customer.use-case';
import { ListAffiliateCommissionsUseCase } from '@module/admin/affiliate-customer/use-case/list-affiliate-commissions.use-case';
import { ListAffiliateCustomerConfigsUseCase } from '@module/admin/affiliate-customer/use-case/list-affiliate-customer-configs.use-case';
import { ListAffiliateCustomersUseCase } from '@module/admin/affiliate-customer/use-case/list-affiliate-customers.use-case';
import { ListAffiliateTransfersUseCase } from '@module/admin/affiliate-customer/use-case/list-affiliate-transfers.use-case';
import { UpdateAffiliateCustomerUseCase } from '@module/admin/affiliate-customer/use-case/update-affiliate-customer.use-case';
import { UpsertAffiliateCustomerConfigUseCase } from '@module/admin/affiliate-customer/use-case/upsert-affiliate-customer-config.use-case';
import { AffiliateCustomerId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/value-object/affiliate-customer-id/affiliate-customer-id.value-object';
import { AffiliateCustomerConfigConfigEnum } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer-config/enum/affiliate-customer-config-config.enum';
import { AuthGuard } from '@shared/api/gateway/guard/auth/auth.guard';
import { AdminControllerRoute } from '@shared/api/util/decorator/class/controller-route/admin-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { ParseValueObjectPipe } from '@shared/api/util/pipe/parse-value-object.pipe';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@AdminControllerRoute('affiliate-customer')
export class AffiliateCustomerController {
  protected readonly _type = AffiliateCustomerController.name;

  public constructor(
    private readonly createAffiliateCustomerUseCase: CreateAffiliateCustomerUseCase,
    private readonly listAffiliateCustomersUseCase: ListAffiliateCustomersUseCase,
    private readonly getAffiliateCustomerUseCase: GetAffiliateCustomerUseCase,
    private readonly updateAffiliateCustomerUseCase: UpdateAffiliateCustomerUseCase,
    private readonly deleteAffiliateCustomerUseCase: DeleteAffiliateCustomerUseCase,
    private readonly listAffiliateTransfersUseCase: ListAffiliateTransfersUseCase,
    private readonly listAffiliateCommissionsUseCase: ListAffiliateCommissionsUseCase,
    private readonly getAffiliateCustomerSummaryUseCase: GetAffiliateCustomerSummaryUseCase,
    private readonly listAffiliateCustomerConfigsUseCase: ListAffiliateCustomerConfigsUseCase,
    private readonly upsertAffiliateCustomerConfigUseCase: UpsertAffiliateCustomerConfigUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Criar afiliado',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateAffiliateCustomerRequestDto,
    },
    tag: ['affiliate-customer'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Afiliado criado com sucesso.',
      type: GetAffiliateCustomerResponseDto,
    },
    guard: [AuthGuard],
  })
  public async createAffiliateCustomer(
    @Body() dto: CreateAffiliateCustomerRequestDto,
  ): Promise<GetAffiliateCustomerResponseDto> {
    return this.createAffiliateCustomerUseCase.execute(dto);
  }

  @BuildEndpointSpecification({
    summary: 'Listar afiliados',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: '',
      method: RequestMethod.GET,
    },
    tag: ['affiliate-customer'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Lista de afiliados obtida com sucesso.',
      type: ListAffiliateCustomersResponseDto,
    },
    guard: [AuthGuard],
  })
  public async listAffiliateCustomers(
    @Query() dto: ListAffiliateCustomersRequestDto,
  ): Promise<ListAffiliateCustomersResponseDto> {
    return this.listAffiliateCustomersUseCase.execute(dto);
  }

  @BuildEndpointSpecification({
    summary: 'Obter afiliado por ID',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: ':affiliateCustomerId',
      method: RequestMethod.GET,
    },
    tag: ['affiliate-customer'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Afiliado obtido com sucesso.',
      type: GetAffiliateCustomerResponseDto,
    },
    guard: [AuthGuard],
  })
  public async getAffiliateCustomer(
    @Param('affiliateCustomerId', new ParseValueObjectPipe(AffiliateCustomerId))
    affiliateCustomerId: AffiliateCustomerId,
  ): Promise<GetAffiliateCustomerResponseDto> {
    return this.getAffiliateCustomerUseCase.execute(affiliateCustomerId);
  }

  @BuildEndpointSpecification({
    summary: 'Editar afiliado',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: ':affiliateCustomerId',
      method: RequestMethod.PATCH,
      type: UpdateAffiliateCustomerRequestDto,
    },
    tag: ['affiliate-customer'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Afiliado atualizado com sucesso.',
      type: GetAffiliateCustomerResponseDto,
    },
    guard: [AuthGuard],
  })
  public async updateAffiliateCustomer(
    @Param('affiliateCustomerId', new ParseValueObjectPipe(AffiliateCustomerId))
    affiliateCustomerId: AffiliateCustomerId,
    @Body() dto: UpdateAffiliateCustomerRequestDto,
  ): Promise<GetAffiliateCustomerResponseDto> {
    return this.updateAffiliateCustomerUseCase.execute(
      affiliateCustomerId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Remover afiliado (o cliente é preservado)',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: ':affiliateCustomerId',
      method: RequestMethod.DELETE,
    },
    tag: ['affiliate-customer'],
    successResponse: {
      statusCode: HttpStatus.NO_CONTENT,
      description: 'Afiliado removido com sucesso. O cliente não é afetado.',
    },
    guard: [AuthGuard],
  })
  public async deleteAffiliateCustomer(
    @Param('affiliateCustomerId', new ParseValueObjectPipe(AffiliateCustomerId))
    affiliateCustomerId: AffiliateCustomerId,
  ): Promise<void> {
    return this.deleteAffiliateCustomerUseCase.execute(affiliateCustomerId);
  }

  @BuildEndpointSpecification({
    summary: 'Listar transferências realizadas para o afiliado',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: ':affiliateCustomerId/transfers',
      method: RequestMethod.GET,
    },
    tag: ['affiliate-customer'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Transferências do afiliado retornadas com sucesso.',
      type: ListAffiliateTransfersResponseDto,
    },
    guard: [AuthGuard],
  })
  public async listAffiliateTransfers(
    @Param('affiliateCustomerId', new ParseValueObjectPipe(AffiliateCustomerId))
    affiliateCustomerId: AffiliateCustomerId,
  ): Promise<ListAffiliateTransfersResponseDto> {
    return this.listAffiliateTransfersUseCase.execute(affiliateCustomerId);
  }

  @BuildEndpointSpecification({
    summary: 'Listar comissões geradas pelo afiliado',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: ':affiliateCustomerId/commissions',
      method: RequestMethod.GET,
    },
    tag: ['affiliate-customer'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Comissões do afiliado retornadas com sucesso.',
      type: ListAffiliateCommissionsResponseDto,
    },
    guard: [AuthGuard],
  })
  public async listAffiliateCommissions(
    @Param('affiliateCustomerId', new ParseValueObjectPipe(AffiliateCustomerId))
    affiliateCustomerId: AffiliateCustomerId,
  ): Promise<ListAffiliateCommissionsResponseDto> {
    return this.listAffiliateCommissionsUseCase.execute(affiliateCustomerId);
  }

  @BuildEndpointSpecification({
    summary: 'Obter resumo financeiro do afiliado',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: ':affiliateCustomerId/summary',
      method: RequestMethod.GET,
    },
    tag: ['affiliate-customer'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Resumo financeiro do afiliado retornado com sucesso.',
      type: GetAffiliateCustomerSummaryResponseDto,
    },
    guard: [AuthGuard],
  })
  public async getAffiliateCustomerSummary(
    @Param('affiliateCustomerId', new ParseValueObjectPipe(AffiliateCustomerId))
    affiliateCustomerId: AffiliateCustomerId,
  ): Promise<GetAffiliateCustomerSummaryResponseDto> {
    return this.getAffiliateCustomerSummaryUseCase.execute(affiliateCustomerId);
  }

  @BuildEndpointSpecification({
    summary: 'Listar configurações de afiliados',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: 'config',
      method: RequestMethod.GET,
    },
    tag: ['affiliate-customer-config'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Configurações de afiliados retornadas com sucesso.',
      type: ListAffiliateCustomerConfigsResponseDto,
    },
    guard: [AuthGuard],
  })
  public async listAffiliateCustomerConfigs(): Promise<ListAffiliateCustomerConfigsResponseDto> {
    return this.listAffiliateCustomerConfigsUseCase.execute();
  }

  @BuildEndpointSpecification({
    summary: 'Criar ou atualizar configuração de afiliados',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: 'config/:config',
      method: RequestMethod.PUT,
      type: UpsertAffiliateCustomerConfigRequestDto,
    },
    tag: ['affiliate-customer-config'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Configuração de afiliados salva com sucesso.',
      type: AffiliateCustomerConfigItemResponseDto,
    },
    guard: [AuthGuard],
  })
  public async upsertAffiliateCustomerConfig(
    @Param('config') config: AffiliateCustomerConfigConfigEnum,
    @Body() dto: UpsertAffiliateCustomerConfigRequestDto,
  ): Promise<AffiliateCustomerConfigItemResponseDto> {
    return this.upsertAffiliateCustomerConfigUseCase.execute(config, dto);
  }
}
