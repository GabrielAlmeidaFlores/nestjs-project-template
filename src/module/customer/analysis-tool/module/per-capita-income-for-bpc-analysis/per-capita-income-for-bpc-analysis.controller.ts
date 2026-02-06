import { Body, HttpStatus, Param, RequestMethod } from '@nestjs/common';

import { PerCapitaIncomeForBpcAnalysisId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis/value-object/per-capita-income-for-bpc-analysis-id/per-capita-income-for-bpc-analysis-id.value-object';
import { CreatePerCapitaIncomeForBpcAnalysisFamilyMemberRequestDto } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/dto/request/create-per-capita-income-for-bpc-analysis-family-member.request.dto';
import { CreatePerCapitaIncomeForBpcAnalysisRequestDto } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/dto/request/create-per-capita-income-for-bpc-analysis.request.dto';
import { UpdatePerCapitaIncomeForBpcAnalysisFamilyMemberRequestDto } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/dto/request/update-per-capita-income-for-bpc-analysis-family-member.request.dto';
import { CreatePerCapitaIncomeForBpcAnalysisFamilyMemberResponseDto } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/dto/response/create-per-capita-income-for-bpc-analysis-family-member.response.dto';
import { CreatePerCapitaIncomeForBpcAnalysisResultResponseDto } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/dto/response/create-per-capita-income-for-bpc-analysis-result.response.dto';
import { CreatePerCapitaIncomeForBpcAnalysisResponseDto } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/dto/response/create-per-capita-income-for-bpc-analysis.response.dto';
import { UpdatePerCapitaIncomeForBpcAnalysisFamilyMemberResponseDto } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/dto/response/update-per-capita-income-for-bpc-analysis-family-member.response.dto';
import { CreatePerCapitaIncomeForBpcAnalysisFamilyMemberUseCase } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/use-case/create-per-capita-income-for-bpc-analysis-family-member.use-case';
import { CreatePerCapitaIncomeForBpcAnalysisResultUseCase } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/use-case/create-per-capita-income-for-bpc-analysis-result.use-case';
import { CreatePerCapitaIncomeForBpcAnalysisUseCase } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/use-case/create-per-capita-income-for-bpc-analysis.use-case';
import { AuthGuard } from '@shared/api/gateway/guard/auth/auth.guard';
import { OrganizationSessionGuard } from '@shared/api/gateway/guard/organization-session/organization-session.guard';
import { CustomerControllerRoute } from '@shared/api/util/decorator/class/controller-route/customer-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { GetOrganizationSessionData } from '@shared/api/util/decorator/property/get-organization-session-data/get-organization-session-data.decorator';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { GetSessionData } from '@shared/api/util/decorator/property/get-session-data/get-session-data.decorator';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';
import { UpdatePerCapitaIncomeForBpcAnalysisFamilyMemberUseCase } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/use-case/update-per-capita-income-for-bpc-analysis-family-member.use-case';

@CustomerControllerRoute('analysis-tool/per-capita-income-for-bpc-analysis')
export class PerCapitaIncomeForBpcAnalysisController {
  protected readonly _type = PerCapitaIncomeForBpcAnalysisController.name;

  public constructor(
    private readonly createPerCapitaIncomeForBpcAnalysisUseCase: CreatePerCapitaIncomeForBpcAnalysisUseCase,
    private readonly createPerCapitaIncomeForBpcAnalysisFamilyMemberUseCase: CreatePerCapitaIncomeForBpcAnalysisFamilyMemberUseCase,
    private readonly createPerCapitaIncomeForBpcAnalysisResultUseCase: CreatePerCapitaIncomeForBpcAnalysisResultUseCase,
    private readonly updatePerCapitaIncomeForBpcAnalysisFamilyMemberUseCase: UpdatePerCapitaIncomeForBpcAnalysisFamilyMemberUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Criar análise de renda per capita para BPC',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreatePerCapitaIncomeForBpcAnalysisRequestDto,
    },
    tag: ['analise-de-renda-per-capita-para-bpc'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise de renda per capita para BPC criada com sucesso.',
      type: CreatePerCapitaIncomeForBpcAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createPerCapitaIncomeForBpcAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreatePerCapitaIncomeForBpcAnalysisRequestDto,
  ): Promise<CreatePerCapitaIncomeForBpcAnalysisResponseDto> {
    return await this.createPerCapitaIncomeForBpcAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Criar membros da família para análise de renda per capita para BPC',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '/:perCapitaIncomeForBpcAnalysisId/family-member',
      method: RequestMethod.POST,
      type: CreatePerCapitaIncomeForBpcAnalysisFamilyMemberRequestDto,
    },
    tag: ['analise-de-renda-per-capita-para-bpc'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Membros da família criados com sucesso.',
      type: CreatePerCapitaIncomeForBpcAnalysisFamilyMemberResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createPerCapitaIncomeForBpcAnalysisFamilyMember(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('perCapitaIncomeForBpcAnalysisId')
    perCapitaIncomeForBpcAnalysisId: PerCapitaIncomeForBpcAnalysisId,
    @Body() dto: CreatePerCapitaIncomeForBpcAnalysisFamilyMemberRequestDto,
  ): Promise<CreatePerCapitaIncomeForBpcAnalysisFamilyMemberResponseDto> {
    return await this.createPerCapitaIncomeForBpcAnalysisFamilyMemberUseCase.execute(
      sessionData,
      organizationSessionData,
      perCapitaIncomeForBpcAnalysisId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar resultado da análise de renda per capita para BPC',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '/:perCapitaIncomeForBpcAnalysisId/result',
      method: RequestMethod.PATCH,
    },
    tag: ['analise-de-renda-per-capita-para-bpc'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Resultado da análise criado com sucesso.',
      type: CreatePerCapitaIncomeForBpcAnalysisResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createPerCapitaIncomeForBpcAnalysisResult(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('perCapitaIncomeForBpcAnalysisId')
    perCapitaIncomeForBpcAnalysisId: PerCapitaIncomeForBpcAnalysisId,
  ): Promise<CreatePerCapitaIncomeForBpcAnalysisResultResponseDto> {
    return await this.createPerCapitaIncomeForBpcAnalysisResultUseCase.execute(
      sessionData,
      organizationSessionData,
      perCapitaIncomeForBpcAnalysisId,
    );
  }



  @BuildEndpointSpecification({
    summary:
      'Atualizar membros da família para análise de renda per capita para BPC',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '/:perCapitaIncomeForBpcAnalysisId/family-member',
      method: RequestMethod.PATCH,
      type: UpdatePerCapitaIncomeForBpcAnalysisFamilyMemberRequestDto,
    },
    tag: ['analise-de-renda-per-capita-para-bpc'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Membros da família atualizados com sucesso.',
      type: UpdatePerCapitaIncomeForBpcAnalysisFamilyMemberResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updatePerCapitaIncomeForBpcAnalysisFamilyMember(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('perCapitaIncomeForBpcAnalysisId')
    perCapitaIncomeForBpcAnalysisId: PerCapitaIncomeForBpcAnalysisId,
    @Body() dto: UpdatePerCapitaIncomeForBpcAnalysisFamilyMemberRequestDto,
  ): Promise<UpdatePerCapitaIncomeForBpcAnalysisFamilyMemberResponseDto> {
    return await this.updatePerCapitaIncomeForBpcAnalysisFamilyMemberUseCase.execute(
      sessionData,
      organizationSessionData,
      perCapitaIncomeForBpcAnalysisId,
      dto,
    );
  }
}
