import { Body, HttpStatus, RequestMethod } from '@nestjs/common';

import { AnalyzePeriodDocumentRequestDto } from '@module/generic/period-document-analysis/dto/request/analyze-period-document.request.dto';
import { AnalyzePeriodDocumentResponseDto } from '@module/generic/period-document-analysis/dto/response/analyze-period-document.response.dto';
import { AnalyzePeriodDocumentUseCase } from '@module/generic/period-document-analysis/use-case/analyze-period-document.use-case';
import { AuthGuard } from '@shared/api/gateway/guard/auth/auth.guard';
import { OrganizationSessionGuard } from '@shared/api/gateway/guard/organization-session/organization-session.guard';
import { GenericControllerRoute } from '@shared/api/util/decorator/class/controller-route/generic-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { GetOrganizationSessionData } from '@shared/api/util/decorator/property/get-organization-session-data/get-organization-session-data.decorator';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { GetSessionData } from '@shared/api/util/decorator/property/get-session-data/get-session-data.decorator';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@GenericControllerRoute('period-document-analysis')
export class PeriodDocumentAnalysisController {
  protected readonly _type = PeriodDocumentAnalysisController.name;

  public constructor(
    private readonly analyzePeriodDocumentUseCase: AnalyzePeriodDocumentUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Analisar documento de período',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'analyze-without-end-date',
      method: RequestMethod.POST,
      type: AnalyzePeriodDocumentRequestDto,
    },
    tag: ['analise-documento-periodo-sem-data-fim'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise do documento retornada com sucesso.',
      type: AnalyzePeriodDocumentResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async analyze(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: AnalyzePeriodDocumentRequestDto,
  ): Promise<AnalyzePeriodDocumentResponseDto> {
    return await this.analyzePeriodDocumentUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }
}
