import { Body, HttpStatus, Param, RequestMethod } from '@nestjs/common';

import { AccidentAssistanceGrantId } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant/value-object/accident-assistance-grant-id.value-object';
import { CreateAccidentAssistanceGrantRequestDto } from '@module/customer/analysis-tool/module/accident-assistance-grant/dto/request/create-accident-assistance-grant.request.dto';
import { UpdateAccidentAssistanceGrantRequestDto } from '@module/customer/analysis-tool/module/accident-assistance-grant/dto/request/update-accident-assistance-grant.request.dto';
import { CreateAccidentAssistanceGrantFirstAnalysisResponseDto } from '@module/customer/analysis-tool/module/accident-assistance-grant/dto/response/create-accident-assistance-grant-first-analysis.response.dto';
import { CreateAccidentAssistanceGrantResponseDto } from '@module/customer/analysis-tool/module/accident-assistance-grant/dto/response/create-accident-assistance-grant.response.dto';
import { GetAccidentAssistanceGrantResponseDto } from '@module/customer/analysis-tool/module/accident-assistance-grant/dto/response/get-accident-assistance-grant.response.dto';
import { UpdateAccidentAssistanceGrantResponseDto } from '@module/customer/analysis-tool/module/accident-assistance-grant/dto/response/update-accident-assistance-grant.response.dto';
import { CreateAccidentAssistanceGrantFirstAnalysisUseCase } from '@module/customer/analysis-tool/module/accident-assistance-grant/use-case/create-accident-assistance-grant-first-analysis.use-case';
import { CreateAccidentAssistanceGrantUseCase } from '@module/customer/analysis-tool/module/accident-assistance-grant/use-case/create-accident-assistance-grant.use-case';
import { GetAccidentAssistanceGrantUseCase } from '@module/customer/analysis-tool/module/accident-assistance-grant/use-case/get-accident-assistance-grant.use-case';
import { UpdateAccidentAssistanceGrantUseCase } from '@module/customer/analysis-tool/module/accident-assistance-grant/use-case/update-accident-assistance-grant.use-case';
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

@CustomerControllerRoute('analysis-tool/accident-assistance-grant')
export class AccidentAssistanceGrantController {
  protected readonly _type = AccidentAssistanceGrantController.name;

  public constructor(
    private readonly createAccidentAssistanceGrantUseCase: CreateAccidentAssistanceGrantUseCase,
    private readonly getAccidentAssistanceGrantUseCase: GetAccidentAssistanceGrantUseCase,
    private readonly updateAccidentAssistanceGrantUseCase: UpdateAccidentAssistanceGrantUseCase,
    private readonly createAccidentAssistanceGrantFirstAnalysisUseCase: CreateAccidentAssistanceGrantFirstAnalysisUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Criar análise de concessão de auxílio-acidente',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateAccidentAssistanceGrantRequestDto,
    },
    tag: ['concessao-auxilio-acidente'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise criada com sucesso.',
      type: CreateAccidentAssistanceGrantResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async create(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateAccidentAssistanceGrantRequestDto,
  ): Promise<CreateAccidentAssistanceGrantResponseDto> {
    return await this.createAccidentAssistanceGrantUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter análise de concessão de auxílio-acidente',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':accidentAssistanceGrantId',
      method: RequestMethod.GET,
    },
    tag: ['concessao-auxilio-acidente'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise obtida com sucesso.',
      type: GetAccidentAssistanceGrantResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getById(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'accidentAssistanceGrantId',
      new ParseValueObjectPipe(AccidentAssistanceGrantId),
    )
    accidentAssistanceGrantId: AccidentAssistanceGrantId,
  ): Promise<GetAccidentAssistanceGrantResponseDto> {
    return await this.getAccidentAssistanceGrantUseCase.execute(
      sessionData,
      organizationSessionData,
      accidentAssistanceGrantId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar análise de concessão de auxílio-acidente',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':accidentAssistanceGrantId',
      method: RequestMethod.PATCH,
      type: UpdateAccidentAssistanceGrantRequestDto,
    },
    tag: ['concessao-auxilio-acidente'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise atualizada com sucesso.',
      type: UpdateAccidentAssistanceGrantResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async update(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'accidentAssistanceGrantId',
      new ParseValueObjectPipe(AccidentAssistanceGrantId),
    )
    accidentAssistanceGrantId: AccidentAssistanceGrantId,
    @Body() dto: UpdateAccidentAssistanceGrantRequestDto,
  ): Promise<UpdateAccidentAssistanceGrantResponseDto> {
    return await this.updateAccidentAssistanceGrantUseCase.execute(
      sessionData,
      organizationSessionData,
      accidentAssistanceGrantId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Gerar pré-análise de concessão de auxílio-acidente',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':accidentAssistanceGrantId/first-analysis',
      method: RequestMethod.POST,
    },
    tag: ['concessao-auxilio-acidente'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Pré-análise gerada com sucesso.',
      type: CreateAccidentAssistanceGrantFirstAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createFirstAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'accidentAssistanceGrantId',
      new ParseValueObjectPipe(AccidentAssistanceGrantId),
    )
    accidentAssistanceGrantId: AccidentAssistanceGrantId,
  ): Promise<CreateAccidentAssistanceGrantFirstAnalysisResponseDto> {
    return await this.createAccidentAssistanceGrantFirstAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      accidentAssistanceGrantId,
    );
  }
}
