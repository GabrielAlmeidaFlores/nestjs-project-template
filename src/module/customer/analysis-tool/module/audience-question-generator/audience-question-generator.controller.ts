import {
  RequestMethod,
  HttpStatus,
  Body,
  Param,
} from '@nestjs/common';

import { AudienceQuestionGeneratorId } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator/value-object/audience-question-generator-id/audience-question-generator-id.value-object';
import { CreateAudienceQuestionGeneratorRequestDto } from '@module/customer/analysis-tool/module/audience-question-generator/dto/request/create-audience-question-generator.request.dto';
import { CreateAudienceQuestionGeneratorResultResponseDto } from '@module/customer/analysis-tool/module/audience-question-generator/dto/response/create-audience-question-generator-result.response.dto';
import { CreateAudienceQuestionGeneratorResponseDto } from '@module/customer/analysis-tool/module/audience-question-generator/dto/response/create-audience-question-generator.response.dto';
import { CreateAudienceQuestionGeneratorResultUseCase } from '@module/customer/analysis-tool/module/audience-question-generator/use-case/create-audience-question-generator-result.use-case';
import { CreateAudienceQuestionGeneratorUseCase } from '@module/customer/analysis-tool/module/audience-question-generator/use-case/create-audience-question-generator.use-case';
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

@CustomerControllerRoute('analysis-tool/audience-question-generator')
export class AudienceQuestionGeneratorController {
  protected readonly _type = AudienceQuestionGeneratorController.name;

  public constructor(
    private readonly createAudienceQuestionGeneratorUseCase: CreateAudienceQuestionGeneratorUseCase,
    private readonly createAudienceQuestionGeneratorResultUseCase: CreateAudienceQuestionGeneratorResultUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Criar gerador de perguntas para audiência',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateAudienceQuestionGeneratorRequestDto,
    },
    tag: ['gerador-perguntas-audiencia'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Gerador de perguntas para audiência criado com sucesso.',
      type: CreateAudienceQuestionGeneratorResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createAudienceQuestionGenerator(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateAudienceQuestionGeneratorRequestDto,
  ): Promise<CreateAudienceQuestionGeneratorResponseDto> {
    return await this.createAudienceQuestionGeneratorUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar resultado do gerador de perguntas para audiência',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':audienceQuestionGeneratorId/result',
      method: RequestMethod.POST,
    },
    tag: ['gerador-perguntas-audiencia'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Resultado do gerador de perguntas para audiência criado com sucesso.',
      type: CreateAudienceQuestionGeneratorResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createAudienceQuestionGeneratorResult(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'audienceQuestionGeneratorId',
      new ParseValueObjectPipe(AudienceQuestionGeneratorId),
    )
    audienceQuestionGeneratorId: AudienceQuestionGeneratorId,
  ): Promise<CreateAudienceQuestionGeneratorResultResponseDto> {
    return await this.createAudienceQuestionGeneratorResultUseCase.execute(
      sessionData,
      organizationSessionData,
      audienceQuestionGeneratorId,
    );
  }
}
