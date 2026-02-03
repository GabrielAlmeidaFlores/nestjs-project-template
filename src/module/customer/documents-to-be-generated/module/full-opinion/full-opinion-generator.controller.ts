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
import { FullOpinionGeneratorId } from '@module/customer/documents-to-be-generated/module/full-opinion/domain/schema/entity/full-opinion-generator-analysis-result/value-object/full-opinion-generator-id/full-opinion-generator-id.value-object';
import { CreateFullOpinionGeneratorRequestDto } from '@module/customer/documents-to-be-generated/module/full-opinion/dto/request/create-full-opinion-generator-analysis-result.request.dto';
import { CreateFullOpinionGeneratorResponseDto } from '@module/customer/documents-to-be-generated/module/full-opinion/dto/response/create-full-opinion-generator-analysis-result.response.dto';
import { CreateFullOpinionGeneratorUseCase } from '@module/customer/documents-to-be-generated/module/full-opinion/use-case/create-full-opinion-generator.use-case';
import { DownloadFullOpinionGeneratorCompleteAnalysisUseCase } from '@module/customer/documents-to-be-generated/module/full-opinion/use-case/download-full-opinion-generator-complete-analysis.use-case';
import { DownloadFullOpinionGeneratorSimplifiedAnalysisUseCase } from '@module/customer/documents-to-be-generated/module/full-opinion/use-case/download-full-opinion-generator-simplified-analysis.use-case';
import { CustomerControllerRoute } from '@shared/api/util/decorator/class/controller-route/customer-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { ParseValueObjectPipe } from '@shared/api/util/pipe/parse-value-object.pipe';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@CustomerControllerRoute('documents-to-be-generated/generate-full-opinion')
export class FullOpinionGeneratorController {
  protected readonly _type = FullOpinionGeneratorController.name;

  public constructor(
    private readonly createFullOpinionGeneratorUseCase: CreateFullOpinionGeneratorUseCase,
    private readonly downloadFullOpinionGeneratorCompleteAnalysisUseCase: DownloadFullOpinionGeneratorCompleteAnalysisUseCase,
    private readonly downloadFullOpinionGeneratorSimplifiedAnalysisUseCase: DownloadFullOpinionGeneratorSimplifiedAnalysisUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Criar análise completa do gerador de parecer completo',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateFullOpinionGeneratorRequestDto,
    },
    tag: ['gerador-parecer-completo'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise do gerador de parecer completo criada com sucesso.',
      type: CreateFullOpinionGeneratorResponseDto,
    },
    guard: [],
  })
  public async createFullOpinionGenerator(
    @Body()
    dto: CreateFullOpinionGeneratorRequestDto,
  ): Promise<CreateFullOpinionGeneratorResponseDto> {
    return await this.createFullOpinionGeneratorUseCase.execute(dto);
  }

  @BuildEndpointSpecification({
    summary: 'Baixar análise simplificada do gerador de parecer completo',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':fullOpinionGeneratorId/download/simplified-version',
      method: RequestMethod.GET,
    },
    tag: ['gerador-parecer-completo'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Arquivo da análise simplificada do gerador de parecer completo retornado para download.',
      type: Buffer,
    },
    guard: [],
  })
  public async downloadFullOpinionGeneratorSimplifiedAnalysisById(
    @Param(
      'fullOpinionGeneratorId',
      new ParseValueObjectPipe(FullOpinionGeneratorId),
    )
    fullOpinionGeneratorId: FullOpinionGeneratorId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum = ExportDocumentFormatEnum.PDF,
  ): Promise<StreamableFile> {
    return await this.downloadFullOpinionGeneratorSimplifiedAnalysisUseCase.execute(
      fullOpinionGeneratorId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Baixar análise completa do gerador de parecer completo',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':fullOpinionGeneratorId/download/complete-version',
      method: RequestMethod.GET,
    },
    tag: ['gerador-parecer-completo'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Arquivo da análise completa do gerador de parecer completo retornado para download.',
      type: Buffer,
    },
    guard: [],
  })
  public async downloadFullOpinionGeneratorCompleteAnalysisById(
    @Param(
      'fullOpinionGeneratorId',
      new ParseValueObjectPipe(FullOpinionGeneratorId),
    )
    fullOpinionGeneratorId: FullOpinionGeneratorId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum = ExportDocumentFormatEnum.PDF,
  ): Promise<StreamableFile> {
    return await this.downloadFullOpinionGeneratorCompleteAnalysisUseCase.execute(
      fullOpinionGeneratorId,
      format,
    );
  }
}
