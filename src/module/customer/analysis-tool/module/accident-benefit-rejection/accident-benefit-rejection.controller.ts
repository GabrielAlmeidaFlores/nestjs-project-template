import {
  Body,
  HttpStatus,
  Param,
  Query,
  RequestMethod,
  StreamableFile,
} from '@nestjs/common';
import { ParseEnumPipe } from '@nestjs/common/pipes';

import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { AccidentBenefitRejectionId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/value-object/accident-benefit-rejection-id.value-object';
import { CreateAccidentBenefitRejectionRequestDto } from '@module/customer/analysis-tool/module/accident-benefit-rejection/dto/request/create-accident-benefit-rejection.request.dto';
import { UpdateAccidentBenefitRejectionWorkPeriodsRequestDto } from '@module/customer/analysis-tool/module/accident-benefit-rejection/dto/request/update-accident-benefit-rejection-work-periods.request.dto';
import { UpdateAccidentBenefitRejectionRequestDto } from '@module/customer/analysis-tool/module/accident-benefit-rejection/dto/request/update-accident-benefit-rejection.request.dto';
import { CreateAccidentBenefitRejectionFirstAnalysisResponseDto } from '@module/customer/analysis-tool/module/accident-benefit-rejection/dto/response/create-accident-benefit-rejection-first-analysis.response.dto';
import { CreateAccidentBenefitRejectionResultResponseDto } from '@module/customer/analysis-tool/module/accident-benefit-rejection/dto/response/create-accident-benefit-rejection-result.response.dto';
import { CreateAccidentBenefitRejectionSecondAnalysisResponseDto } from '@module/customer/analysis-tool/module/accident-benefit-rejection/dto/response/create-accident-benefit-rejection-second-analysis.response.dto';
import { CreateAccidentBenefitRejectionResponseDto } from '@module/customer/analysis-tool/module/accident-benefit-rejection/dto/response/create-accident-benefit-rejection.response.dto';
import { GetAccidentBenefitRejectionResponseDto } from '@module/customer/analysis-tool/module/accident-benefit-rejection/dto/response/get-accident-benefit-rejection.response.dto';
import { UpdateAccidentBenefitRejectionWorkPeriodsResponseDto } from '@module/customer/analysis-tool/module/accident-benefit-rejection/dto/response/update-accident-benefit-rejection-work-periods.response.dto';
import { UpdateAccidentBenefitRejectionResponseDto } from '@module/customer/analysis-tool/module/accident-benefit-rejection/dto/response/update-accident-benefit-rejection.response.dto';
import { CreateAccidentBenefitRejectionFirstAnalysisUseCase } from '@module/customer/analysis-tool/module/accident-benefit-rejection/use-case/create-accident-benefit-rejection-first-analysis.use-case';
import { CreateAccidentBenefitRejectionResultUseCase } from '@module/customer/analysis-tool/module/accident-benefit-rejection/use-case/create-accident-benefit-rejection-result.use-case';
import { CreateAccidentBenefitRejectionSecondAnalysisUseCase } from '@module/customer/analysis-tool/module/accident-benefit-rejection/use-case/create-accident-benefit-rejection-second-analysis.use-case';
import { CreateAccidentBenefitRejectionUseCase } from '@module/customer/analysis-tool/module/accident-benefit-rejection/use-case/create-accident-benefit-rejection.use-case';
import { DownloadAccidentBenefitRejectionCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/accident-benefit-rejection/use-case/download-accident-benefit-rejection-complete-analysis.use-case';
import { DownloadAccidentBenefitRejectionSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/accident-benefit-rejection/use-case/download-accident-benefit-rejection-simplified-analysis.use-case';
import { GetAccidentBenefitRejectionUseCase } from '@module/customer/analysis-tool/module/accident-benefit-rejection/use-case/get-accident-benefit-rejection.use-case';
import { UpdateAccidentBenefitRejectionWorkPeriodsUseCase } from '@module/customer/analysis-tool/module/accident-benefit-rejection/use-case/update-accident-benefit-rejection-work-periods.use-case';
import { UpdateAccidentBenefitRejectionUseCase } from '@module/customer/analysis-tool/module/accident-benefit-rejection/use-case/update-accident-benefit-rejection.use-case';
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

@CustomerControllerRoute('analysis-tool/accident-benefit-rejection')
export class AccidentBenefitRejectionController {
  protected readonly _type = AccidentBenefitRejectionController.name;

  public constructor(
    private readonly createAccidentBenefitRejectionUseCase: CreateAccidentBenefitRejectionUseCase,
    private readonly getAccidentBenefitRejectionUseCase: GetAccidentBenefitRejectionUseCase,
    private readonly updateAccidentBenefitRejectionUseCase: UpdateAccidentBenefitRejectionUseCase,
    private readonly updateAccidentBenefitRejectionWorkPeriodsUseCase: UpdateAccidentBenefitRejectionWorkPeriodsUseCase,
    private readonly createAccidentBenefitRejectionFirstAnalysisUseCase: CreateAccidentBenefitRejectionFirstAnalysisUseCase,
    private readonly createAccidentBenefitRejectionSecondAnalysisUseCase: CreateAccidentBenefitRejectionSecondAnalysisUseCase,
    private readonly createAccidentBenefitRejectionResultUseCase: CreateAccidentBenefitRejectionResultUseCase,
    private readonly downloadAccidentBenefitRejectionCompleteAnalysisUseCase: DownloadAccidentBenefitRejectionCompleteAnalysisUseCase,
    private readonly downloadAccidentBenefitRejectionSimplifiedAnalysisUseCase: DownloadAccidentBenefitRejectionSimplifiedAnalysisUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Criar análise de indeferimento de acidente',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateAccidentBenefitRejectionRequestDto,
    },
    tag: ['indeferimento-acidente'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise criada com sucesso.',
      type: CreateAccidentBenefitRejectionResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async create(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateAccidentBenefitRejectionRequestDto,
  ): Promise<CreateAccidentBenefitRejectionResponseDto> {
    return await this.createAccidentBenefitRejectionUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter análise de indeferimento de acidente',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':accidentBenefitRejectionId',
      method: RequestMethod.GET,
    },
    tag: ['indeferimento-acidente'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise obtida com sucesso.',
      type: GetAccidentBenefitRejectionResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getById(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'accidentBenefitRejectionId',
      new ParseValueObjectPipe(AccidentBenefitRejectionId),
    )
    accidentBenefitRejectionId: AccidentBenefitRejectionId,
  ): Promise<GetAccidentBenefitRejectionResponseDto> {
    return await this.getAccidentBenefitRejectionUseCase.execute(
      sessionData,
      organizationSessionData,
      accidentBenefitRejectionId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar análise de indeferimento de acidente',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':accidentBenefitRejectionId',
      method: RequestMethod.PATCH,
      type: UpdateAccidentBenefitRejectionRequestDto,
    },
    tag: ['indeferimento-acidente'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise atualizada com sucesso.',
      type: UpdateAccidentBenefitRejectionResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async update(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'accidentBenefitRejectionId',
      new ParseValueObjectPipe(AccidentBenefitRejectionId),
    )
    accidentBenefitRejectionId: AccidentBenefitRejectionId,
    @Body() dto: UpdateAccidentBenefitRejectionRequestDto,
  ): Promise<UpdateAccidentBenefitRejectionResponseDto> {
    return await this.updateAccidentBenefitRejectionUseCase.execute(
      sessionData,
      organizationSessionData,
      accidentBenefitRejectionId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Atualizar vínculos empregatícios da análise de indeferimento de acidente',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':accidentBenefitRejectionId/work-periods',
      method: RequestMethod.PATCH,
      type: UpdateAccidentBenefitRejectionWorkPeriodsRequestDto,
    },
    tag: ['indeferimento-acidente'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Vínculos empregatícios atualizados com sucesso.',
      type: UpdateAccidentBenefitRejectionWorkPeriodsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateWorkPeriods(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'accidentBenefitRejectionId',
      new ParseValueObjectPipe(AccidentBenefitRejectionId),
    )
    accidentBenefitRejectionId: AccidentBenefitRejectionId,
    @Body() dto: UpdateAccidentBenefitRejectionWorkPeriodsRequestDto,
  ): Promise<UpdateAccidentBenefitRejectionWorkPeriodsResponseDto> {
    return await this.updateAccidentBenefitRejectionWorkPeriodsUseCase.execute(
      sessionData,
      organizationSessionData,
      accidentBenefitRejectionId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Gerar pré-análise de indeferimento de acidente',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':accidentBenefitRejectionId/first-analysis',
      method: RequestMethod.POST,
    },
    tag: ['indeferimento-acidente'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Pré-análise gerada com sucesso.',
      type: CreateAccidentBenefitRejectionFirstAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createFirstAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'accidentBenefitRejectionId',
      new ParseValueObjectPipe(AccidentBenefitRejectionId),
    )
    accidentBenefitRejectionId: AccidentBenefitRejectionId,
  ): Promise<CreateAccidentBenefitRejectionFirstAnalysisResponseDto> {
    return await this.createAccidentBenefitRejectionFirstAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      accidentBenefitRejectionId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Gerar segunda análise de indeferimento de acidente',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':accidentBenefitRejectionId/second-analysis',
      method: RequestMethod.POST,
    },
    tag: ['indeferimento-acidente'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Segunda análise gerada com sucesso.',
      type: CreateAccidentBenefitRejectionSecondAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createSecondAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'accidentBenefitRejectionId',
      new ParseValueObjectPipe(AccidentBenefitRejectionId),
    )
    accidentBenefitRejectionId: AccidentBenefitRejectionId,
  ): Promise<CreateAccidentBenefitRejectionSecondAnalysisResponseDto> {
    return await this.createAccidentBenefitRejectionSecondAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      accidentBenefitRejectionId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar resultado da análise de indeferimento de acidente',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':accidentBenefitRejectionId/result',
      method: RequestMethod.POST,
    },
    tag: ['indeferimento-acidente'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Resultado criado com sucesso.',
      type: CreateAccidentBenefitRejectionResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createResult(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'accidentBenefitRejectionId',
      new ParseValueObjectPipe(AccidentBenefitRejectionId),
    )
    accidentBenefitRejectionId: AccidentBenefitRejectionId,
  ): Promise<CreateAccidentBenefitRejectionResultResponseDto> {
    return await this.createAccidentBenefitRejectionResultUseCase.execute(
      sessionData,
      organizationSessionData,
      accidentBenefitRejectionId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Baixar análise completa de indeferimento de acidente',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':accidentBenefitRejectionId/download/complete-version',
      method: RequestMethod.GET,
    },
    tag: ['indeferimento-acidente'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Arquivo da análise completa de indeferimento de acidente retornado para download.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadCompleteAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'accidentBenefitRejectionId',
      new ParseValueObjectPipe(AccidentBenefitRejectionId),
    )
    accidentBenefitRejectionId: AccidentBenefitRejectionId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    return await this.downloadAccidentBenefitRejectionCompleteAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      accidentBenefitRejectionId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Baixar análise simplificada de indeferimento de acidente',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':accidentBenefitRejectionId/download/simplified-version',
      method: RequestMethod.GET,
    },
    tag: ['indeferimento-acidente'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Arquivo da análise simplificada de indeferimento de acidente retornado para download.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadSimplifiedAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'accidentBenefitRejectionId',
      new ParseValueObjectPipe(AccidentBenefitRejectionId),
    )
    accidentBenefitRejectionId: AccidentBenefitRejectionId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    return await this.downloadAccidentBenefitRejectionSimplifiedAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      accidentBenefitRejectionId,
      format,
    );
  }
}
