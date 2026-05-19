import { Body, HttpStatus, Param, RequestMethod } from '@nestjs/common';

import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { UpsertInterviewFormRequestDto } from '@module/customer/analysis-tool/module/interview-form/dto/request/upsert-interview-form.request.dto';
import { GetInterviewFormResponseDto } from '@module/customer/analysis-tool/module/interview-form/dto/response/get-interview-form.response.dto';
import { UpsertInterviewFormResponseDto } from '@module/customer/analysis-tool/module/interview-form/dto/response/upsert-interview-form.response.dto';
import { GetInterviewFormByAnalysisToolClientIdUseCase } from '@module/customer/analysis-tool/module/interview-form/use-case/get-interview-form-by-analysis-tool-client-id.use-case';
import { UpsertInterviewFormUseCase } from '@module/customer/analysis-tool/module/interview-form/use-case/upsert-interview-form.use-case';
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

@CustomerControllerRoute('analysis-tool/interview-form')
export class InterviewFormController {
  protected readonly _type = InterviewFormController.name;

  public constructor(
    private readonly upsertInterviewFormUseCase: UpsertInterviewFormUseCase,
    private readonly getInterviewFormByAnalysisToolClientIdUseCase: GetInterviewFormByAnalysisToolClientIdUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Criar ou atualizar ficha de entrevista',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.PUT,
      type: UpsertInterviewFormRequestDto,
    },
    tag: ['ficha-entrevista'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Ficha de entrevista salva com sucesso.',
      type: UpsertInterviewFormResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async upsertInterviewForm(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: UpsertInterviewFormRequestDto,
  ): Promise<UpsertInterviewFormResponseDto> {
    return await this.upsertInterviewFormUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter ficha de entrevista por ID do cliente',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'client/:analysisToolClientId',
      method: RequestMethod.GET,
    },
    tag: ['ficha-entrevista'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Ficha de entrevista obtida com sucesso.',
      type: GetInterviewFormResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getInterviewFormByAnalysisToolClientId(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'analysisToolClientId',
      new ParseValueObjectPipe(AnalysisToolClientId),
    )
    analysisToolClientId: AnalysisToolClientId,
  ): Promise<GetInterviewFormResponseDto> {
    return await this.getInterviewFormByAnalysisToolClientIdUseCase.execute(
      sessionData,
      organizationSessionData,
      analysisToolClientId,
    );
  }
}
