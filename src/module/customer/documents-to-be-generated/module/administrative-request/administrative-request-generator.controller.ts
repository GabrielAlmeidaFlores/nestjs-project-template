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
import { AdministrativeRequestGeneratorId } from '@module/customer/documents-to-be-generated/module/administrative-request/domain/schema/entity/administrative-request-generator-analysis-result/value-object/administrative-request-generator-id/administrative-request-generator-id.value-object';
import { CreateAdministrativeRequestGeneratorRequestDto } from '@module/customer/documents-to-be-generated/module/administrative-request/dto/request/create-administrative-request-generator-analysis-result.request.dto';
import { CreateAdministrativeRequestGeneratorResponseDto } from '@module/customer/documents-to-be-generated/module/administrative-request/dto/response/create-administrative-request-generator-analysis-result.response.dto';
import { CreateAdministrativeRequestGeneratorUseCase } from '@module/customer/documents-to-be-generated/module/administrative-request/use-case/create-administrative-request-generator.use-case';
import { DownloadAdministrativeRequestGeneratorCompleteAnalysisUseCase } from '@module/customer/documents-to-be-generated/module/administrative-request/use-case/download-administrative-request-generator-complete-analysis.use-case';
import { DownloadAdministrativeRequestGeneratorSimplifiedAnalysisUseCase } from '@module/customer/documents-to-be-generated/module/administrative-request/use-case/download-administrative-request-generator-simplified-analysis.use-case';
import { CustomerControllerRoute } from '@shared/api/util/decorator/class/controller-route/customer-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { ParseValueObjectPipe } from '@shared/api/util/pipe/parse-value-object.pipe';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@CustomerControllerRoute(
  'documents-to-be-generated/generate-administrative-request',
)
export class AdministrativeRequestGeneratorController {
  protected readonly _type = AdministrativeRequestGeneratorController.name;

  public constructor(
    private readonly createAdministrativeRequestGeneratorUseCase: CreateAdministrativeRequestGeneratorUseCase,
    private readonly downloadAdministrativeRequestGeneratorCompleteAnalysisUseCase: DownloadAdministrativeRequestGeneratorCompleteAnalysisUseCase,
    private readonly downloadAdministrativeRequestGeneratorSimplifiedAnalysisUseCase: DownloadAdministrativeRequestGeneratorSimplifiedAnalysisUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Criar análise completa do gerador de requerimento administrativo',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateAdministrativeRequestGeneratorRequestDto,
    },
    tag: ['gerador-requerimento-administrativo'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description:
        'Análise do gerador de requerimento administrativo criada com sucesso.',
      type: CreateAdministrativeRequestGeneratorResponseDto,
    },
    guard: [],
  })
  public async createAdministrativeRequestGenerator(
    @Body()
    dto: CreateAdministrativeRequestGeneratorRequestDto,
  ): Promise<CreateAdministrativeRequestGeneratorResponseDto> {
    return await this.createAdministrativeRequestGeneratorUseCase.execute(dto);
  }

  @BuildEndpointSpecification({
    summary:
      'Baixar análise simplificada do gerador de requerimento administrativo',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':administrativeRequestGeneratorId/download/simplified-version',
      method: RequestMethod.GET,
    },
    tag: ['gerador-requerimento-administrativo'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Arquivo da análise simplificada do gerador de requerimento administrativo retornado para download.',
      type: Buffer,
    },
    guard: [],
  })
  public async downloadAdministrativeRequestGeneratorSimplifiedAnalysisById(
    @Param(
      'administrativeRequestGeneratorId',
      new ParseValueObjectPipe(AdministrativeRequestGeneratorId),
    )
    administrativeRequestGeneratorId: AdministrativeRequestGeneratorId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum = ExportDocumentFormatEnum.PDF,
  ): Promise<StreamableFile> {
    return await this.downloadAdministrativeRequestGeneratorSimplifiedAnalysisUseCase.execute(
      administrativeRequestGeneratorId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Baixar análise completa do gerador de requerimento administrativo',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':administrativeRequestGeneratorId/download/complete-version',
      method: RequestMethod.GET,
    },
    tag: ['gerador-requerimento-administrativo'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Arquivo da análise completa do gerador de requerimento administrativo retornado para download.',
      type: Buffer,
    },
    guard: [],
  })
  public async downloadAdministrativeRequestGeneratorCompleteAnalysisById(
    @Param(
      'administrativeRequestGeneratorId',
      new ParseValueObjectPipe(AdministrativeRequestGeneratorId),
    )
    administrativeRequestGeneratorId: AdministrativeRequestGeneratorId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum = ExportDocumentFormatEnum.PDF,
  ): Promise<StreamableFile> {
    return await this.downloadAdministrativeRequestGeneratorCompleteAnalysisUseCase.execute(
      administrativeRequestGeneratorId,
      format,
    );
  }
}
