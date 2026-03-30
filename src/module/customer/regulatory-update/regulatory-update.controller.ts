import { Body, HttpStatus, Param, Query, RequestMethod } from '@nestjs/common';

import { ListRegulatoryUpdatesQueryParam } from '@module/customer/regulatory-update/domain/repository/regulatory-update/query/param/list-regulatory-updates.query.param';
import { RegulatoryUpdateId } from '@module/customer/regulatory-update/domain/schema/entity/regulatory-update/value-object/regulatory-update-id/regulatory-update-id.value-object';
import { ListRegulatoryUpdatesRequestDto } from '@module/customer/regulatory-update/dto/request/list-regulatory-updates.request.dto';
import { UpdateRegulatoryUpdateEmailPreferenceRequestDto } from '@module/customer/regulatory-update/dto/request/update-regulatory-update-email-preference.request.dto';
import { GetRegulatoryUpdateEmailPreferenceResponseDto } from '@module/customer/regulatory-update/dto/response/get-regulatory-update-email-preference.response.dto';
import { GetRegulatoryUpdateStatsResponseDto } from '@module/customer/regulatory-update/dto/response/get-regulatory-update-stats.response.dto';
import { GetRegulatoryUpdateResponseDto } from '@module/customer/regulatory-update/dto/response/get-regulatory-update.response.dto';
import { ListCustomerMonitoredSourcesResponseDto } from '@module/customer/regulatory-update/dto/response/list-customer-monitored-sources.response.dto';
import { ListRegulatoryUpdatesResponseDto } from '@module/customer/regulatory-update/dto/response/list-regulatory-updates.response.dto';
import { UpdateRegulatoryUpdateEmailPreferenceResponseDto } from '@module/customer/regulatory-update/dto/response/update-regulatory-update-email-preference.response.dto';
import { GetRegulatoryUpdateEmailPreferenceUseCase } from '@module/customer/regulatory-update/use-case/get-regulatory-update-email-preference.use-case';
import { GetRegulatoryUpdateStatsUseCase } from '@module/customer/regulatory-update/use-case/get-regulatory-update-stats.use-case';
import { GetRegulatoryUpdateUseCase } from '@module/customer/regulatory-update/use-case/get-regulatory-update.use-case';
import { ListCustomerMonitoredSourcesUseCase } from '@module/customer/regulatory-update/use-case/list-customer-monitored-sources.use-case';
import { ListRegulatoryUpdatesUseCase } from '@module/customer/regulatory-update/use-case/list-regulatory-updates.use-case';
import { UpdateRegulatoryUpdateEmailPreferenceUseCase } from '@module/customer/regulatory-update/use-case/update-regulatory-update-email-preference.use-case';
import { AuthGuard } from '@shared/api/gateway/guard/auth/auth.guard';
import { OrganizationSessionGuard } from '@shared/api/gateway/guard/organization-session/organization-session.guard';
import { CustomerControllerRoute } from '@shared/api/util/decorator/class/controller-route/customer-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { GetOrganizationSessionData } from '@shared/api/util/decorator/property/get-organization-session-data/get-organization-session-data.decorator';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { GetSessionData } from '@shared/api/util/decorator/property/get-session-data/get-session-data.decorator';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { ParseValueObjectPipe } from '@shared/api/util/pipe/parse-value-object.pipe';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@CustomerControllerRoute('regulatory-update')
export class RegulatoryUpdateController {
  protected readonly _type = RegulatoryUpdateController.name;

  public constructor(
    private readonly listRegulatoryUpdatesUseCase: ListRegulatoryUpdatesUseCase,
    private readonly getRegulatoryUpdateUseCase: GetRegulatoryUpdateUseCase,
    private readonly getRegulatoryUpdateEmailPreferenceUseCase: GetRegulatoryUpdateEmailPreferenceUseCase,
    private readonly updateRegulatoryUpdateEmailPreferenceUseCase: UpdateRegulatoryUpdateEmailPreferenceUseCase,
    private readonly getRegulatoryUpdateStatsUseCase: GetRegulatoryUpdateStatsUseCase,
    private readonly listCustomerMonitoredSourcesUseCase: ListCustomerMonitoredSourcesUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Listar atualizações normativas',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.GET,
    },
    tag: ['atualizacoes-normativas'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Atualizações normativas listadas com sucesso.',
      type: ListRegulatoryUpdatesResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async list(
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Query() dto: ListRegulatoryUpdatesRequestDto,
  ): Promise<ListRegulatoryUpdatesResponseDto> {
    return this.listRegulatoryUpdatesUseCase.execute(
      organizationSessionData,
      new ListRegulatoryUpdatesQueryParam(dto),
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter estatísticas de atualizações normativas',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'stats',
      method: RequestMethod.GET,
    },
    tag: ['atualizacoes-normativas'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Estatísticas de atualizações normativas retornadas com sucesso.',
      type: GetRegulatoryUpdateStatsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getStats(
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
  ): Promise<GetRegulatoryUpdateStatsResponseDto> {
    return this.getRegulatoryUpdateStatsUseCase.execute(
      organizationSessionData,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Listar portais monitorados para clientes',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'monitored-sources',
      method: RequestMethod.GET,
    },
    tag: ['atualizacoes-normativas'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Portais monitorados listados com sucesso.',
      type: ListCustomerMonitoredSourcesResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getMonitoredSources(
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
  ): Promise<ListCustomerMonitoredSourcesResponseDto> {
    return this.listCustomerMonitoredSourcesUseCase.execute(
      organizationSessionData,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter detalhe de atualização normativa',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':regulatoryUpdateId',
      method: RequestMethod.GET,
    },
    tag: ['atualizacoes-normativas'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Atualização normativa encontrada com sucesso.',
      type: GetRegulatoryUpdateResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getById(
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('regulatoryUpdateId', new ParseValueObjectPipe(RegulatoryUpdateId))
    regulatoryUpdateId: RegulatoryUpdateId,
  ): Promise<GetRegulatoryUpdateResponseDto> {
    return this.getRegulatoryUpdateUseCase.execute(
      organizationSessionData,
      regulatoryUpdateId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter preferência de e-mail de atualizações normativas',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'email-preference',
      method: RequestMethod.GET,
    },
    tag: ['atualizacoes-normativas'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Preferência de e-mail retornada com sucesso.',
      type: GetRegulatoryUpdateEmailPreferenceResponseDto,
    },
    guard: [AuthGuard],
  })
  public async getEmailPreference(
    @GetSessionData() sessionData: SessionDataModel,
  ): Promise<GetRegulatoryUpdateEmailPreferenceResponseDto> {
    return this.getRegulatoryUpdateEmailPreferenceUseCase.execute(sessionData);
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar preferência de e-mail de atualizações normativas',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'email-preference',
      method: RequestMethod.PATCH,
      type: UpdateRegulatoryUpdateEmailPreferenceRequestDto,
    },
    tag: ['atualizacoes-normativas'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Preferência de e-mail atualizada com sucesso.',
      type: UpdateRegulatoryUpdateEmailPreferenceResponseDto,
    },
    guard: [AuthGuard],
  })
  public async updateEmailPreference(
    @GetSessionData() sessionData: SessionDataModel,
    @Body() dto: UpdateRegulatoryUpdateEmailPreferenceRequestDto,
  ): Promise<UpdateRegulatoryUpdateEmailPreferenceResponseDto> {
    return this.updateRegulatoryUpdateEmailPreferenceUseCase.execute(
      sessionData,
      dto,
    );
  }
}
