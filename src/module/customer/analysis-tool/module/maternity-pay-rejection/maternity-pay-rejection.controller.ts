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
import { MaternityPayRejectionId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection/value-object/maternity-pay-rejection-id.value-object';
import { CreateMaternityPayRejectionRequestDto } from '@module/customer/analysis-tool/module/maternity-pay-rejection/dto/request/create-maternity-pay-rejection.request.dto';
import { UpdateMaternityPayRejectionWorkPeriodsRequestDto } from '@module/customer/analysis-tool/module/maternity-pay-rejection/dto/request/update-maternity-pay-rejection-work-periods.request.dto';
import { UpdateMaternityPayRejectionRequestDto } from '@module/customer/analysis-tool/module/maternity-pay-rejection/dto/request/update-maternity-pay-rejection.request.dto';
import { CreateMaternityPayRejectionFirstAnalysisResponseDto } from '@module/customer/analysis-tool/module/maternity-pay-rejection/dto/response/create-maternity-pay-rejection-first-analysis.response.dto';
import { CreateMaternityPayRejectionResultResponseDto } from '@module/customer/analysis-tool/module/maternity-pay-rejection/dto/response/create-maternity-pay-rejection-result.response.dto';
import { CreateMaternityPayRejectionSecondAnalysisResponseDto } from '@module/customer/analysis-tool/module/maternity-pay-rejection/dto/response/create-maternity-pay-rejection-second-analysis.response.dto';
import { CreateMaternityPayRejectionResponseDto } from '@module/customer/analysis-tool/module/maternity-pay-rejection/dto/response/create-maternity-pay-rejection.response.dto';
import { GetMaternityPayRejectionResponseDto } from '@module/customer/analysis-tool/module/maternity-pay-rejection/dto/response/get-maternity-pay-rejection.response.dto';
import { UpdateMaternityPayRejectionWorkPeriodsResponseDto } from '@module/customer/analysis-tool/module/maternity-pay-rejection/dto/response/update-maternity-pay-rejection-work-periods.response.dto';
import { UpdateMaternityPayRejectionResponseDto } from '@module/customer/analysis-tool/module/maternity-pay-rejection/dto/response/update-maternity-pay-rejection.response.dto';
import { CreateMaternityPayRejectionFirstAnalysisUseCase } from '@module/customer/analysis-tool/module/maternity-pay-rejection/use-case/create-maternity-pay-rejection-first-analysis.use-case';
import { CreateMaternityPayRejectionResultUseCase } from '@module/customer/analysis-tool/module/maternity-pay-rejection/use-case/create-maternity-pay-rejection-result.use-case';
import { CreateMaternityPayRejectionSecondAnalysisUseCase } from '@module/customer/analysis-tool/module/maternity-pay-rejection/use-case/create-maternity-pay-rejection-second-analysis.use-case';
import { CreateMaternityPayRejectionUseCase } from '@module/customer/analysis-tool/module/maternity-pay-rejection/use-case/create-maternity-pay-rejection.use-case';
import { DownloadMaternityPayRejectionCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/maternity-pay-rejection/use-case/download-maternity-pay-rejection-complete-analysis.use-case';
import { DownloadMaternityPayRejectionSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/maternity-pay-rejection/use-case/download-maternity-pay-rejection-simplified-analysis.use-case';
import { GetMaternityPayRejectionUseCase } from '@module/customer/analysis-tool/module/maternity-pay-rejection/use-case/get-maternity-pay-rejection.use-case';
import { UpdateMaternityPayRejectionWorkPeriodsUseCase } from '@module/customer/analysis-tool/module/maternity-pay-rejection/use-case/update-maternity-pay-rejection-work-periods.use-case';
import { UpdateMaternityPayRejectionUseCase } from '@module/customer/analysis-tool/module/maternity-pay-rejection/use-case/update-maternity-pay-rejection.use-case';
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

@CustomerControllerRoute('analysis-tool/maternity-pay-rejection')
export class MaternityPayRejectionController {
  protected readonly _type = MaternityPayRejectionController.name;

  public constructor(
    private readonly createMaternityPayRejectionUseCase: CreateMaternityPayRejectionUseCase,
    private readonly getMaternityPayRejectionUseCase: GetMaternityPayRejectionUseCase,
    private readonly updateMaternityPayRejectionUseCase: UpdateMaternityPayRejectionUseCase,
    private readonly updateMaternityPayRejectionWorkPeriodsUseCase: UpdateMaternityPayRejectionWorkPeriodsUseCase,
    private readonly createMaternityPayRejectionFirstAnalysisUseCase: CreateMaternityPayRejectionFirstAnalysisUseCase,
    private readonly createMaternityPayRejectionSecondAnalysisUseCase: CreateMaternityPayRejectionSecondAnalysisUseCase,
    private readonly createMaternityPayRejectionResultUseCase: CreateMaternityPayRejectionResultUseCase,
    private readonly downloadMaternityPayRejectionCompleteAnalysisUseCase: DownloadMaternityPayRejectionCompleteAnalysisUseCase,
    private readonly downloadMaternityPayRejectionSimplifiedAnalysisUseCase: DownloadMaternityPayRejectionSimplifiedAnalysisUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Criar análise de indeferimento de salário maternidade',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateMaternityPayRejectionRequestDto,
    },
    tag: ['indeferimento-salario-maternidade'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise criada com sucesso.',
      type: CreateMaternityPayRejectionResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async create(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateMaternityPayRejectionRequestDto,
  ): Promise<CreateMaternityPayRejectionResponseDto> {
    return await this.createMaternityPayRejectionUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter análise de indeferimento de salário maternidade',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':maternityPayRejectionId',
      method: RequestMethod.GET,
    },
    tag: ['indeferimento-salario-maternidade'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise obtida com sucesso.',
      type: GetMaternityPayRejectionResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getById(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'maternityPayRejectionId',
      new ParseValueObjectPipe(MaternityPayRejectionId),
    )
    maternityPayRejectionId: MaternityPayRejectionId,
  ): Promise<GetMaternityPayRejectionResponseDto> {
    return await this.getMaternityPayRejectionUseCase.execute(
      sessionData,
      organizationSessionData,
      maternityPayRejectionId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar análise de indeferimento de salário maternidade',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':maternityPayRejectionId',
      method: RequestMethod.PATCH,
      type: UpdateMaternityPayRejectionRequestDto,
    },
    tag: ['indeferimento-salario-maternidade'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise atualizada com sucesso.',
      type: UpdateMaternityPayRejectionResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async update(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'maternityPayRejectionId',
      new ParseValueObjectPipe(MaternityPayRejectionId),
    )
    maternityPayRejectionId: MaternityPayRejectionId,
    @Body() dto: UpdateMaternityPayRejectionRequestDto,
  ): Promise<UpdateMaternityPayRejectionResponseDto> {
    return await this.updateMaternityPayRejectionUseCase.execute(
      sessionData,
      organizationSessionData,
      maternityPayRejectionId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Atualizar vínculos empregatícios da análise de indeferimento de salário maternidade',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':maternityPayRejectionId/work-periods',
      method: RequestMethod.PATCH,
      type: UpdateMaternityPayRejectionWorkPeriodsRequestDto,
    },
    tag: ['indeferimento-salario-maternidade'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Vínculos empregatícios atualizados com sucesso.',
      type: UpdateMaternityPayRejectionWorkPeriodsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateWorkPeriods(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'maternityPayRejectionId',
      new ParseValueObjectPipe(MaternityPayRejectionId),
    )
    maternityPayRejectionId: MaternityPayRejectionId,
    @Body() dto: UpdateMaternityPayRejectionWorkPeriodsRequestDto,
  ): Promise<UpdateMaternityPayRejectionWorkPeriodsResponseDto> {
    return await this.updateMaternityPayRejectionWorkPeriodsUseCase.execute(
      sessionData,
      organizationSessionData,
      maternityPayRejectionId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Gerar pré-análise de indeferimento de salário maternidade',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':maternityPayRejectionId/first-analysis',
      method: RequestMethod.POST,
    },
    tag: ['indeferimento-salario-maternidade'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Pré-análise gerada com sucesso.',
      type: CreateMaternityPayRejectionFirstAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createFirstAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'maternityPayRejectionId',
      new ParseValueObjectPipe(MaternityPayRejectionId),
    )
    maternityPayRejectionId: MaternityPayRejectionId,
  ): Promise<CreateMaternityPayRejectionFirstAnalysisResponseDto> {
    return await this.createMaternityPayRejectionFirstAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      maternityPayRejectionId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Gerar segunda análise de indeferimento de salário maternidade',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':maternityPayRejectionId/second-analysis',
      method: RequestMethod.POST,
    },
    tag: ['indeferimento-salario-maternidade'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Segunda análise gerada com sucesso.',
      type: CreateMaternityPayRejectionSecondAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createSecondAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'maternityPayRejectionId',
      new ParseValueObjectPipe(MaternityPayRejectionId),
    )
    maternityPayRejectionId: MaternityPayRejectionId,
  ): Promise<CreateMaternityPayRejectionSecondAnalysisResponseDto> {
    return await this.createMaternityPayRejectionSecondAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      maternityPayRejectionId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Gerar análise completa de indeferimento de salário maternidade',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':maternityPayRejectionId/result',
      method: RequestMethod.POST,
    },
    tag: ['indeferimento-salario-maternidade'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise completa gerada com sucesso.',
      type: CreateMaternityPayRejectionResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createResult(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'maternityPayRejectionId',
      new ParseValueObjectPipe(MaternityPayRejectionId),
    )
    maternityPayRejectionId: MaternityPayRejectionId,
  ): Promise<CreateMaternityPayRejectionResultResponseDto> {
    return await this.createMaternityPayRejectionResultUseCase.execute(
      sessionData,
      organizationSessionData,
      maternityPayRejectionId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Baixar análise completa de indeferimento de salário maternidade',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':maternityPayRejectionId/download/complete-version',
      method: RequestMethod.GET,
    },
    tag: ['indeferimento-salario-maternidade'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise completa baixada com sucesso.',
      type: StreamableFile,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadCompleteAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'maternityPayRejectionId',
      new ParseValueObjectPipe(MaternityPayRejectionId),
    )
    maternityPayRejectionId: MaternityPayRejectionId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    return await this.downloadMaternityPayRejectionCompleteAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      maternityPayRejectionId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Baixar análise simplificada de indeferimento de salário maternidade',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':maternityPayRejectionId/download/simplified-version',
      method: RequestMethod.GET,
    },
    tag: ['indeferimento-salario-maternidade'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise simplificada baixada com sucesso.',
      type: StreamableFile,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadSimplifiedAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'maternityPayRejectionId',
      new ParseValueObjectPipe(MaternityPayRejectionId),
    )
    maternityPayRejectionId: MaternityPayRejectionId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    return await this.downloadMaternityPayRejectionSimplifiedAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      maternityPayRejectionId,
      format,
    );
  }
}
