import { Body, HttpStatus, Param, Query, RequestMethod } from '@nestjs/common';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { CreateCreditPackRequestDto } from '@module/admin/credit-pack/dto/request/create-credit-pack.request.dto';
import { UpdateCreditPackRequestDto } from '@module/admin/credit-pack/dto/request/update-credit-pack.request.dto';
import { GetCreditPackResponseDto } from '@module/admin/credit-pack/dto/response/get-credit-pack.response.dto';
import { ListCreditPacksResponseDto } from '@module/admin/credit-pack/dto/response/list-credit-packs.response.dto';
import { CreateCreditPackUseCase } from '@module/admin/credit-pack/use-case/create-credit-pack.use-case';
import { DeleteCreditPackUseCase } from '@module/admin/credit-pack/use-case/delete-credit-pack.use-case';
import { GetCreditPackUseCase } from '@module/admin/credit-pack/use-case/get-credit-pack.use-case';
import { ListCreditPacksUseCase } from '@module/admin/credit-pack/use-case/list-credit-packs.use-case';
import { UpdateCreditPackUseCase } from '@module/admin/credit-pack/use-case/update-credit-pack.use-case';
import { CreditPackId } from '@module/customer/credit-pack/domain/schema/entity/credit-pack/value-object/credit-pack-id/credit-pack-id.value-object';
import { AuthGuard } from '@shared/api/gateway/guard/auth/auth.guard';
import { AdminControllerRoute } from '@shared/api/util/decorator/class/controller-route/admin-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';
import { ParseValueObjectPipe } from '@shared/api/util/pipe/parse-value-object.pipe';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@AdminControllerRoute('credit-pack')
export class CreditPackController {
  protected readonly _type = CreditPackController.name;

  public constructor(
    private readonly createCreditPackUseCase: CreateCreditPackUseCase,
    private readonly updateCreditPackUseCase: UpdateCreditPackUseCase,
    private readonly deleteCreditPackUseCase: DeleteCreditPackUseCase,
    private readonly getCreditPackUseCase: GetCreditPackUseCase,
    private readonly listCreditPacksUseCase: ListCreditPacksUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Criar pacote de créditos',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateCreditPackRequestDto,
    },
    tag: ['pacote-de-creditos'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Pacote de créditos criado com sucesso.',
      type: GetCreditPackResponseDto,
    },
    guard: [AuthGuard],
  })
  public async createCreditPack(
    @Body() dto: CreateCreditPackRequestDto,
  ): Promise<GetCreditPackResponseDto> {
    return this.createCreditPackUseCase.execute(dto);
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar pacote de créditos',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: ':creditPackId',
      method: RequestMethod.PATCH,
      type: UpdateCreditPackRequestDto,
    },
    tag: ['pacote-de-creditos'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Pacote de créditos atualizado com sucesso.',
      type: GetCreditPackResponseDto,
    },
    guard: [AuthGuard],
  })
  public async updateCreditPack(
    @Param('creditPackId', new ParseValueObjectPipe(CreditPackId))
    creditPackId: CreditPackId,
    @Body() dto: UpdateCreditPackRequestDto,
  ): Promise<GetCreditPackResponseDto> {
    return this.updateCreditPackUseCase.execute(creditPackId, dto);
  }

  @BuildEndpointSpecification({
    summary: 'Remover pacote de créditos',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: ':creditPackId',
      method: RequestMethod.DELETE,
    },
    tag: ['pacote-de-creditos'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Pacote de créditos removido com sucesso.',
      type: GetCreditPackResponseDto,
    },
    guard: [AuthGuard],
  })
  public async deleteCreditPack(
    @Param('creditPackId', new ParseValueObjectPipe(CreditPackId))
    creditPackId: CreditPackId,
  ): Promise<GetCreditPackResponseDto> {
    return this.deleteCreditPackUseCase.execute(creditPackId);
  }

  @BuildEndpointSpecification({
    summary: 'Obter pacote de créditos por ID',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: ':creditPackId',
      method: RequestMethod.GET,
    },
    tag: ['pacote-de-creditos'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Pacote de créditos encontrado com sucesso.',
      type: GetCreditPackResponseDto,
    },
    guard: [AuthGuard],
  })
  public async getCreditPack(
    @Param('creditPackId', new ParseValueObjectPipe(CreditPackId))
    creditPackId: CreditPackId,
  ): Promise<GetCreditPackResponseDto> {
    return this.getCreditPackUseCase.execute(creditPackId);
  }

  @BuildEndpointSpecification({
    summary: 'Listar pacotes de créditos',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: '',
      method: RequestMethod.GET,
    },
    tag: ['pacote-de-creditos'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Lista paginada de pacotes de créditos.',
      type: ListCreditPacksResponseDto,
    },
    guard: [AuthGuard],
  })
  public async listCreditPacks(
    @Query() dto: ListDataRequestDto,
  ): Promise<ListCreditPacksResponseDto> {
    return this.listCreditPacksUseCase.execute(new ListDataInputModel(dto));
  }
}
