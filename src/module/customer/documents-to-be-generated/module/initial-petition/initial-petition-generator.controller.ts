import {
  RequestMethod,
  HttpStatus,
  Body,
  Param,
  Query,
  StreamableFile,
  ParseEnumPipe,
} from '@nestjs/common';

import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { InitialPetitionGeneratorId } from '@module/customer/documents-to-be-generated/module/initial-petition/domain/schema/entity/initial-petition-generator-analysis-result/value-object/initial-petition-generator-id/initial-petition-generator-id.value-object';
import { CreateInitialPetitionGeneratorRequestDto } from '@module/customer/documents-to-be-generated/module/initial-petition/dto/request/create-initial-petition-generator-analysis-result.request.dto';
import { UpdateInitialPetitionGeneratorCompleteAnalysisRequestDto } from '@module/customer/documents-to-be-generated/module/initial-petition/dto/request/update-initial-petition-generator-complete-analysis.request.dto';
import { CreateInitialPetitionGeneratorResponseDto } from '@module/customer/documents-to-be-generated/module/initial-petition/dto/response/create-initial-petition-generator-analysis-result.response.dto';
import { UpdateInitialPetitionGeneratorCompleteAnalysisResponseDto } from '@module/customer/documents-to-be-generated/module/initial-petition/dto/response/update-initial-petition-generator-complete-analysis.response.dto';
import { CreateInitialPetitionGeneratorUseCase } from '@module/customer/documents-to-be-generated/module/initial-petition/use-case/create-initial-petition-generator.use-case';
import { DownloadInitialPetitionGeneratorCompleteAnalysisUseCase } from '@module/customer/documents-to-be-generated/module/initial-petition/use-case/download-initial-petition-generator-complete-analysis.use-case';
import { DownloadInitialPetitionGeneratorSimplifiedAnalysisUseCase } from '@module/customer/documents-to-be-generated/module/initial-petition/use-case/download-initial-petition-generator-simplified-analysis.use-case';
import { UpdateInitialPetitionGeneratorCompleteAnalysisUseCase } from '@module/customer/documents-to-be-generated/module/initial-petition/use-case/update-initial-petition-generator-complete-analysis.use-case';
import { CustomerControllerRoute } from '@shared/api/util/decorator/class/controller-route/customer-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { ParseValueObjectPipe } from '@shared/api/util/pipe/parse-value-object.pipe';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@CustomerControllerRoute('documents-to-be-generated/generate-initial-petition')
export class InitialPetitionGeneratorController {
  protected readonly _type = InitialPetitionGeneratorController.name;

  public constructor(
    private readonly createInitialPetitionGeneratorUseCase: CreateInitialPetitionGeneratorUseCase,
    private readonly downloadInitialPetitionGeneratorCompleteAnalysisUseCase: DownloadInitialPetitionGeneratorCompleteAnalysisUseCase,
    private readonly downloadInitialPetitionGeneratorSimplifiedAnalysisUseCase: DownloadInitialPetitionGeneratorSimplifiedAnalysisUseCase,
    private readonly updateInitialPetitionGeneratorCompleteAnalysisUseCase: UpdateInitialPetitionGeneratorCompleteAnalysisUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Criar análise completa do gerador de petição inicial',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateInitialPetitionGeneratorRequestDto,
    },
    tag: ['gerador-petição-inicial'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise do gerador de petição inicial criada com sucesso.',
      type: CreateInitialPetitionGeneratorResponseDto,
    },
    guard: [],
  })
  public async createInitialPetitionGenerator(
    @Body()
    dto: CreateInitialPetitionGeneratorRequestDto,
  ): Promise<CreateInitialPetitionGeneratorResponseDto> {
    return await this.createInitialPetitionGeneratorUseCase.execute(dto);
  }

  @BuildEndpointSpecification({
    summary: 'Baixar análise simplificada do gerador de petição inicial',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':initialPetitionGeneratorId/download/simplified-version',
      method: RequestMethod.GET,
    },
    tag: ['gerador-petição-inicial'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Arquivo da análise simplificada do gerador de petição inicial retornado para download.',
      type: Buffer,
    },
    guard: [],
  })
  public async downloadInitialPetitionGeneratorSimplifiedAnalysisById(
    @Param(
      'initialPetitionGeneratorId',
      new ParseValueObjectPipe(InitialPetitionGeneratorId),
    )
    initialPetitionGeneratorId: InitialPetitionGeneratorId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum = ExportDocumentFormatEnum.PDF,
  ): Promise<StreamableFile> {
    return await this.downloadInitialPetitionGeneratorSimplifiedAnalysisUseCase.execute(
      initialPetitionGeneratorId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Baixar análise completa do gerador de petição inicial',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':initialPetitionGeneratorId/download/complete-version',
      method: RequestMethod.GET,
    },
    tag: ['gerador-petição-inicial'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Arquivo da análise completa do gerador de petição inicial retornado para download.',
      type: Buffer,
    },
    guard: [],
  })
  public async downloadInitialPetitionGeneratorCompleteAnalysisById(
    @Param(
      'initialPetitionGeneratorId',
      new ParseValueObjectPipe(InitialPetitionGeneratorId),
    )
    initialPetitionGeneratorId: InitialPetitionGeneratorId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum = ExportDocumentFormatEnum.PDF,
  ): Promise<StreamableFile> {
    return await this.downloadInitialPetitionGeneratorCompleteAnalysisUseCase.execute(
      initialPetitionGeneratorId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar análise completa do gerador de petição inicial',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':initialPetitionGeneratorId/complete-analysis',
      method: RequestMethod.PATCH,
      type: UpdateInitialPetitionGeneratorCompleteAnalysisRequestDto,
    },
    tag: ['gerador-petição-inicial'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Análise completa do gerador de petição inicial atualizada com sucesso.',
      type: UpdateInitialPetitionGeneratorCompleteAnalysisResponseDto,
    },
    guard: [],
  })
  public async updateInitialPetitionGeneratorCompleteAnalysis(
    @Param(
      'initialPetitionGeneratorId',
      new ParseValueObjectPipe(InitialPetitionGeneratorId),
    )
    initialPetitionGeneratorId: InitialPetitionGeneratorId,
    @Body()
    dto: UpdateInitialPetitionGeneratorCompleteAnalysisRequestDto,
  ): Promise<UpdateInitialPetitionGeneratorCompleteAnalysisResponseDto> {
    return await this.updateInitialPetitionGeneratorCompleteAnalysisUseCase.execute(
      initialPetitionGeneratorId,
      dto,
    );
  }
}
