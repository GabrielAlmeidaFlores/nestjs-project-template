import {
  Body,
  DefaultValuePipe,
  HttpStatus,
  Param,
  ParseEnumPipe,
  Query,
  RequestMethod,
  StreamableFile,
} from '@nestjs/common';

import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { SpeechGeneratorId } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator/value-object/speech-generator-id/speech-generator-id.value-object';
import { CreateSpeechGeneratorRequestDto } from '@module/customer/analysis-tool/module/speech-generator/dto/request/create-speech-generator.request.dto';
import { UpdateSpeechGeneratorRequestDto } from '@module/customer/analysis-tool/module/speech-generator/dto/request/update-speech-generator.request.dto';
import { CreateSpeechGeneratorResultResponseDto } from '@module/customer/analysis-tool/module/speech-generator/dto/response/create-speech-generator-result.response.dto';
import { CreateSpeechGeneratorResponseDto } from '@module/customer/analysis-tool/module/speech-generator/dto/response/create-speech-generator.response.dto';
import { DeleteSpeechGeneratorResponseDto } from '@module/customer/analysis-tool/module/speech-generator/dto/response/delete-speech-generator.response';
import { GetSpeechGeneratorResponseDto } from '@module/customer/analysis-tool/module/speech-generator/dto/response/get-speech-generator.response.dto';
import { UpdateSpeechGeneratorResponseDto } from '@module/customer/analysis-tool/module/speech-generator/dto/response/update-speech-generator.response.dto';
import { CreateSpeechGeneratorResultUseCase } from '@module/customer/analysis-tool/module/speech-generator/use-case/create-speech-generator-result.use-case';
import { CreateSpeechGeneratorUseCase } from '@module/customer/analysis-tool/module/speech-generator/use-case/create-speech-generator.use-case';
import { DeleteSpeechGeneratorUseCase } from '@module/customer/analysis-tool/module/speech-generator/use-case/delete-speech-generator.use-case';
import { DownloadSpeechGeneratorCompleteContentUseCase } from '@module/customer/analysis-tool/module/speech-generator/use-case/download-speech-generator-complete-content.use-case';
import { DownloadSpeechGeneratorSimplifiedContentUseCase } from '@module/customer/analysis-tool/module/speech-generator/use-case/download-speech-generator-simplified-content.use-case';
import { GetSpeechGeneratorUseCase } from '@module/customer/analysis-tool/module/speech-generator/use-case/get-speech-generator.use-case';
import { UpdateSpeechGeneratorUseCase } from '@module/customer/analysis-tool/module/speech-generator/use-case/update-speech-generator.use-case';
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

@CustomerControllerRoute('analysis-tool/speech-generator')
export class SpeechGeneratorController {
  protected readonly _type = SpeechGeneratorController.name;

  public constructor(
    private readonly createSpeechGeneratorUseCase: CreateSpeechGeneratorUseCase,
    private readonly createSpeechGeneratorResultUseCase: CreateSpeechGeneratorResultUseCase,
    private readonly getSpeechGeneratorUseCase: GetSpeechGeneratorUseCase,
    private readonly downloadSpeechGeneratorCompleteContentUseCase: DownloadSpeechGeneratorCompleteContentUseCase,
    private readonly downloadSpeechGeneratorSimplifiedContentUseCase: DownloadSpeechGeneratorSimplifiedContentUseCase,
    private readonly updateSpeechGeneratorUseCase: UpdateSpeechGeneratorUseCase,
    private readonly deleteSpeechGeneratorUseCase: DeleteSpeechGeneratorUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Criar gerador de discurso',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateSpeechGeneratorRequestDto,
    },
    tag: ['gerador-discurso'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Gerador de discurso criado com sucesso.',
      type: CreateSpeechGeneratorResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createSpeechGenerator(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateSpeechGeneratorRequestDto,
  ): Promise<CreateSpeechGeneratorResponseDto> {
    return await this.createSpeechGeneratorUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar gerador de discurso',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':speechGeneratorId',
      method: RequestMethod.PATCH,
      type: UpdateSpeechGeneratorRequestDto,
    },
    tag: ['gerador-discurso'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Gerador de discurso atualizado com sucesso.',
      type: UpdateSpeechGeneratorResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateSpeechGenerator(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('speechGeneratorId', new ParseValueObjectPipe(SpeechGeneratorId))
    speechGeneratorId: SpeechGeneratorId,
    @Body() dto: UpdateSpeechGeneratorRequestDto,
  ): Promise<UpdateSpeechGeneratorResponseDto> {
    return await this.updateSpeechGeneratorUseCase.execute(
      sessionData,
      organizationSessionData,
      speechGeneratorId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter gerador de discurso por ID',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':speechGeneratorId',
      method: RequestMethod.GET,
    },
    tag: ['gerador-discurso'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Dados do gerador de discurso retornados com sucesso.',
      type: GetSpeechGeneratorResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getSpeechGenerator(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('speechGeneratorId', new ParseValueObjectPipe(SpeechGeneratorId))
    speechGeneratorId: SpeechGeneratorId,
  ): Promise<GetSpeechGeneratorResponseDto> {
    return await this.getSpeechGeneratorUseCase.execute(
      sessionData,
      organizationSessionData,
      speechGeneratorId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar resultado do gerador de discurso',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':speechGeneratorId/result',
      method: RequestMethod.POST,
    },
    tag: ['gerador-discurso'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Resultado do gerador de discurso criado com sucesso.',
      type: CreateSpeechGeneratorResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createSpeechGeneratorResult(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('speechGeneratorId', new ParseValueObjectPipe(SpeechGeneratorId))
    speechGeneratorId: SpeechGeneratorId,
  ): Promise<CreateSpeechGeneratorResultResponseDto> {
    return await this.createSpeechGeneratorResultUseCase.execute(
      sessionData,
      organizationSessionData,
      speechGeneratorId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Baixar conteúdo completo do gerador de discurso',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':speechGeneratorId/download/complete-version',
      method: RequestMethod.GET,
    },
    tag: ['gerador-discurso'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Arquivo do discurso completo retornado para download.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadSpeechGeneratorCompleteContent(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('speechGeneratorId', new ParseValueObjectPipe(SpeechGeneratorId))
    speechGeneratorId: SpeechGeneratorId,
    @Query(
      'format',
      new DefaultValuePipe(ExportDocumentFormatEnum.PDF),
      new ParseEnumPipe(ExportDocumentFormatEnum),
    )
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    return await this.downloadSpeechGeneratorCompleteContentUseCase.execute(
      sessionData,
      organizationSessionData,
      speechGeneratorId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Baixar conteúdo simplificado do gerador de discurso',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':speechGeneratorId/download/simplified-version',
      method: RequestMethod.GET,
    },
    tag: ['gerador-discurso'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Arquivo do discurso simplificado retornado para download.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadSpeechGeneratorSimplifiedContent(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('speechGeneratorId', new ParseValueObjectPipe(SpeechGeneratorId))
    speechGeneratorId: SpeechGeneratorId,
    @Query(
      'format',
      new DefaultValuePipe(ExportDocumentFormatEnum.PDF),
      new ParseEnumPipe(ExportDocumentFormatEnum),
    )
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    return await this.downloadSpeechGeneratorSimplifiedContentUseCase.execute(
      sessionData,
      organizationSessionData,
      speechGeneratorId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Deletar gerador de discurso',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':speechGeneratorId',
      method: RequestMethod.DELETE,
    },
    tag: ['gerador-discurso'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Gerador de discurso deletado com sucesso.',
      type: DeleteSpeechGeneratorResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async deleteSpeechGenerator(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('speechGeneratorId', new ParseValueObjectPipe(SpeechGeneratorId))
    speechGeneratorId: SpeechGeneratorId,
  ): Promise<DeleteSpeechGeneratorResponseDto> {
    return await this.deleteSpeechGeneratorUseCase.execute(
      sessionData,
      organizationSessionData,
      speechGeneratorId,
    );
  }
}
