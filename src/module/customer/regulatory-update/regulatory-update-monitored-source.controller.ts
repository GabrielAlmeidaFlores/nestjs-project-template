import { Body, HttpStatus, Param, RequestMethod } from '@nestjs/common';

import { RegulatoryUpdateMonitoredSourceId } from '@module/customer/regulatory-update/domain/schema/entity/regulatory-update-monitored-source/value-object/regulatory-update-monitored-source-id/regulatory-update-monitored-source-id.value-object';
import { CreateRegulatoryUpdateMonitoredSourceRequestDto } from '@module/customer/regulatory-update/dto/request/create-regulatory-update-monitored-source.request.dto';
import { UpdateRegulatoryUpdateMonitoredSourceRequestDto } from '@module/customer/regulatory-update/dto/request/update-regulatory-update-monitored-source.request.dto';
import { RegulatoryUpdateMonitoredSourceResponseDto } from '@module/customer/regulatory-update/dto/response/regulatory-update-monitored-source.response.dto';
import { CreateRegulatoryUpdateMonitoredSourceUseCase } from '@module/customer/regulatory-update/use-case/create-regulatory-update-monitored-source.use-case';
import { DeleteRegulatoryUpdateMonitoredSourceUseCase } from '@module/customer/regulatory-update/use-case/delete-regulatory-update-monitored-source.use-case';
import { ListRegulatoryUpdateMonitoredSourcesUseCase } from '@module/customer/regulatory-update/use-case/list-regulatory-update-monitored-sources.use-case';
import { UpdateRegulatoryUpdateMonitoredSourceUseCase } from '@module/customer/regulatory-update/use-case/update-regulatory-update-monitored-source.use-case';
import { AuthGuard } from '@shared/api/gateway/guard/auth/auth.guard';
import { AdminControllerRoute } from '@shared/api/util/decorator/class/controller-route/admin-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { ParseValueObjectPipe } from '@shared/api/util/pipe/parse-value-object.pipe';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@AdminControllerRoute('regulatory-updates/monitored-sources')
export class RegulatoryUpdateMonitoredSourceController {
  protected readonly _type = RegulatoryUpdateMonitoredSourceController.name;

  public constructor(
    private readonly listRegulatoryUpdateMonitoredSourcesUseCase: ListRegulatoryUpdateMonitoredSourcesUseCase,
    private readonly createRegulatoryUpdateMonitoredSourceUseCase: CreateRegulatoryUpdateMonitoredSourceUseCase,
    private readonly updateRegulatoryUpdateMonitoredSourceUseCase: UpdateRegulatoryUpdateMonitoredSourceUseCase,
    private readonly deleteRegulatoryUpdateMonitoredSourceUseCase: DeleteRegulatoryUpdateMonitoredSourceUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Listar fontes monitoradas de atualizações normativas',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: '',
      method: RequestMethod.GET,
    },
    tag: ['fontes-monitoradas-atualizacoes-normativas'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Fontes monitoradas listadas com sucesso.',
      type: RegulatoryUpdateMonitoredSourceResponseDto,
    },
    guard: [AuthGuard],
  })
  public async list(): Promise<RegulatoryUpdateMonitoredSourceResponseDto[]> {
    return this.listRegulatoryUpdateMonitoredSourcesUseCase.execute();
  }

  @BuildEndpointSpecification({
    summary: 'Criar fonte monitorada de atualizações normativas',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateRegulatoryUpdateMonitoredSourceRequestDto,
    },
    tag: ['fontes-monitoradas-atualizacoes-normativas'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Fonte monitorada criada com sucesso.',
      type: RegulatoryUpdateMonitoredSourceResponseDto,
    },
    guard: [AuthGuard],
  })
  public async create(
    @Body() dto: CreateRegulatoryUpdateMonitoredSourceRequestDto,
  ): Promise<RegulatoryUpdateMonitoredSourceResponseDto> {
    return this.createRegulatoryUpdateMonitoredSourceUseCase.execute(dto);
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar fonte monitorada de atualizações normativas',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: ':regulatoryUpdateMonitoredSourceId',
      method: RequestMethod.PATCH,
      type: UpdateRegulatoryUpdateMonitoredSourceRequestDto,
    },
    tag: ['fontes-monitoradas-atualizacoes-normativas'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Fonte monitorada atualizada com sucesso.',
      type: RegulatoryUpdateMonitoredSourceResponseDto,
    },
    guard: [AuthGuard],
  })
  public async update(
    @Param(
      'regulatoryUpdateMonitoredSourceId',
      new ParseValueObjectPipe(RegulatoryUpdateMonitoredSourceId),
    )
    regulatoryUpdateMonitoredSourceId: RegulatoryUpdateMonitoredSourceId,
    @Body() dto: UpdateRegulatoryUpdateMonitoredSourceRequestDto,
  ): Promise<RegulatoryUpdateMonitoredSourceResponseDto> {
    return this.updateRegulatoryUpdateMonitoredSourceUseCase.execute(
      regulatoryUpdateMonitoredSourceId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Remover fonte monitorada de atualizações normativas',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: ':regulatoryUpdateMonitoredSourceId',
      method: RequestMethod.DELETE,
    },
    tag: ['fontes-monitoradas-atualizacoes-normativas'],
    successResponse: {
      statusCode: HttpStatus.NO_CONTENT,
      description: 'Fonte monitorada removida com sucesso.',
    },
    guard: [AuthGuard],
  })
  public async delete(
    @Param(
      'regulatoryUpdateMonitoredSourceId',
      new ParseValueObjectPipe(RegulatoryUpdateMonitoredSourceId),
    )
    regulatoryUpdateMonitoredSourceId: RegulatoryUpdateMonitoredSourceId,
  ): Promise<void> {
    return this.deleteRegulatoryUpdateMonitoredSourceUseCase.execute(
      regulatoryUpdateMonitoredSourceId,
    );
  }
}
