import { Body, HttpStatus, Param, Query, RequestMethod } from '@nestjs/common';

import { CreateAffiliateCustomerRequestDto } from '@module/admin/affiliate-customer/dto/request/create-affiliate-customer.request.dto';
import { ListAffiliateCustomersRequestDto } from '@module/admin/affiliate-customer/dto/request/list-affiliate-customers.request.dto';
import { UpdateAffiliateCustomerRequestDto } from '@module/admin/affiliate-customer/dto/request/update-affiliate-customer.request.dto';
import { GetAffiliateCustomerResponseDto } from '@module/admin/affiliate-customer/dto/response/get-affiliate-customer.response.dto';
import { ListAffiliateCustomersResponseDto } from '@module/admin/affiliate-customer/dto/response/list-affiliate-customers.response.dto';
import { CreateAffiliateCustomerUseCase } from '@module/admin/affiliate-customer/use-case/create-affiliate-customer.use-case';
import { DeleteAffiliateCustomerUseCase } from '@module/admin/affiliate-customer/use-case/delete-affiliate-customer.use-case';
import { GetAffiliateCustomerUseCase } from '@module/admin/affiliate-customer/use-case/get-affiliate-customer.use-case';
import { ListAffiliateCustomersUseCase } from '@module/admin/affiliate-customer/use-case/list-affiliate-customers.use-case';
import { UpdateAffiliateCustomerUseCase } from '@module/admin/affiliate-customer/use-case/update-affiliate-customer.use-case';
import { AffiliateCustomerId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/value-object/affiliate-customer-id/affiliate-customer-id.value-object';
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
}
