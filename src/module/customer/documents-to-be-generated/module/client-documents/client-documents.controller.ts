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
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { FeeContractGeneratorId } from '@module/customer/documents-to-be-generated/module/fee-contract/domain/schema/entity/fee-contract-generator-analysis-result/value-object/fee-contract-generator-id/fee-contract-generator-id.value-object';
import { UpdateFeeContractGeneratorCompleteAnalysisRequestDto } from '@module/customer/documents-to-be-generated/module/fee-contract/dto/request/update-fee-contract-generator-complete-analysis.request.dto';
import { CreateFeeContractGeneratorResponseDto } from '@module/customer/documents-to-be-generated/module/fee-contract/dto/response/create-fee-contract-generator-analysis-result.response.dto';
import { UpdateFeeContractGeneratorCompleteAnalysisResponseDto } from '@module/customer/documents-to-be-generated/module/fee-contract/dto/response/update-fee-contract-generator-complete-analysis.response.dto';
import { CreateFeeContractGeneratorUseCase } from '@module/customer/documents-to-be-generated/module/fee-contract/use-case/create-fee-contract-generator.use-case';
import { DownloadFeeContractGeneratorCompleteAnalysisUseCase } from '@module/customer/documents-to-be-generated/module/fee-contract/use-case/download-fee-contract-generator-complete-analysis.use-case';
import { UpdateFeeContractGeneratorCompleteAnalysisUseCase } from '@module/customer/documents-to-be-generated/module/fee-contract/use-case/update-fee-contract-generator-complete-analysis.use-case';
import { JefWaiverDeclarationGeneratorId } from '@module/customer/documents-to-be-generated/module/jef-waiver-declaration/domain/schema/entity/jef-waiver-declaration-generator-analysis-result/value-object/jef-waiver-declaration-generator-id/jef-waiver-declaration-generator-id.value-object';
import { UpdateJefWaiverDeclarationGeneratorCompleteAnalysisRequestDto } from '@module/customer/documents-to-be-generated/module/jef-waiver-declaration/dto/request/update-jef-waiver-declaration-generator-complete-analysis.request.dto';
import { CreateJefWaiverDeclarationGeneratorResponseDto } from '@module/customer/documents-to-be-generated/module/jef-waiver-declaration/dto/response/create-jef-waiver-declaration-generator-analysis-result.response.dto';
import { UpdateJefWaiverDeclarationGeneratorCompleteAnalysisResponseDto } from '@module/customer/documents-to-be-generated/module/jef-waiver-declaration/dto/response/update-jef-waiver-declaration-generator-complete-analysis.response.dto';
import { CreateJefWaiverDeclarationGeneratorUseCase } from '@module/customer/documents-to-be-generated/module/jef-waiver-declaration/use-case/create-jef-waiver-declaration-generator.use-case';
import { DownloadJefWaiverDeclarationGeneratorCompleteAnalysisUseCase } from '@module/customer/documents-to-be-generated/module/jef-waiver-declaration/use-case/download-jef-waiver-declaration-generator-complete-analysis.use-case';
import { UpdateJefWaiverDeclarationGeneratorCompleteAnalysisUseCase } from '@module/customer/documents-to-be-generated/module/jef-waiver-declaration/use-case/update-jef-waiver-declaration-generator-complete-analysis.use-case';
import { PowerOfAttorneyGeneratorId } from '@module/customer/documents-to-be-generated/module/power-of-attorney/domain/schema/entity/power-of-attorney-generator-analysis-result/value-object/power-of-attorney-generator-id/power-of-attorney-generator-id.value-object';
import { UpdatePowerOfAttorneyGeneratorCompleteAnalysisRequestDto } from '@module/customer/documents-to-be-generated/module/power-of-attorney/dto/request/update-power-of-attorney-generator-complete-analysis.request.dto';
import { CreatePowerOfAttorneyGeneratorResponseDto } from '@module/customer/documents-to-be-generated/module/power-of-attorney/dto/response/create-power-of-attorney-generator-analysis-result.response.dto';
import { UpdatePowerOfAttorneyGeneratorCompleteAnalysisResponseDto } from '@module/customer/documents-to-be-generated/module/power-of-attorney/dto/response/update-power-of-attorney-generator-complete-analysis.response.dto';
import { CreatePowerOfAttorneyGeneratorUseCase } from '@module/customer/documents-to-be-generated/module/power-of-attorney/use-case/create-power-of-attorney-generator.use-case';
import { DownloadPowerOfAttorneyGeneratorCompleteAnalysisUseCase } from '@module/customer/documents-to-be-generated/module/power-of-attorney/use-case/download-power-of-attorney-generator-complete-analysis.use-case';
import { UpdatePowerOfAttorneyGeneratorCompleteAnalysisUseCase } from '@module/customer/documents-to-be-generated/module/power-of-attorney/use-case/update-power-of-attorney-generator-complete-analysis.use-case';
import { PovertyDeclarationGeneratorId } from '@module/customer/documents-to-be-generated/module/poverty-declaration/domain/schema/entity/poverty-declaration-generator-analysis-result/value-object/poverty-declaration-generator-id/poverty-declaration-generator-id.value-object';
import { UpdatePovertyDeclarationGeneratorCompleteAnalysisRequestDto } from '@module/customer/documents-to-be-generated/module/poverty-declaration/dto/request/update-poverty-declaration-generator-complete-analysis.request.dto';
import { CreatePovertyDeclarationGeneratorResponseDto } from '@module/customer/documents-to-be-generated/module/poverty-declaration/dto/response/create-poverty-declaration-generator-analysis-result.response.dto';
import { UpdatePovertyDeclarationGeneratorCompleteAnalysisResponseDto } from '@module/customer/documents-to-be-generated/module/poverty-declaration/dto/response/update-poverty-declaration-generator-complete-analysis.response.dto';
import { CreatePovertyDeclarationGeneratorUseCase } from '@module/customer/documents-to-be-generated/module/poverty-declaration/use-case/create-poverty-declaration-generator.use-case';
import { DownloadPovertyDeclarationGeneratorCompleteAnalysisUseCase } from '@module/customer/documents-to-be-generated/module/poverty-declaration/use-case/download-poverty-declaration-generator-complete-analysis.use-case';
import { UpdatePovertyDeclarationGeneratorCompleteAnalysisUseCase } from '@module/customer/documents-to-be-generated/module/poverty-declaration/use-case/update-poverty-declaration-generator-complete-analysis.use-case';
import { OrganizationSessionGuard } from '@shared/api/gateway/guard/organization-session/organization-session.guard';
import { CustomerControllerRoute } from '@shared/api/util/decorator/class/controller-route/customer-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { GetOrganizationSessionData } from '@shared/api/util/decorator/property/get-organization-session-data/get-organization-session-data.decorator';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { ParseValueObjectPipe } from '@shared/api/util/pipe/parse-value-object.pipe';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@CustomerControllerRoute('client-documents')
export class ClientDocumentsController {
  protected readonly _type = ClientDocumentsController.name;

  public constructor(
    private readonly createFeeContractGeneratorUseCase: CreateFeeContractGeneratorUseCase,
    private readonly downloadFeeContractGeneratorCompleteAnalysisUseCase: DownloadFeeContractGeneratorCompleteAnalysisUseCase,
    private readonly updateFeeContractGeneratorCompleteAnalysisUseCase: UpdateFeeContractGeneratorCompleteAnalysisUseCase,
    private readonly createPowerOfAttorneyGeneratorUseCase: CreatePowerOfAttorneyGeneratorUseCase,
    private readonly downloadPowerOfAttorneyGeneratorCompleteAnalysisUseCase: DownloadPowerOfAttorneyGeneratorCompleteAnalysisUseCase,
    private readonly updatePowerOfAttorneyGeneratorCompleteAnalysisUseCase: UpdatePowerOfAttorneyGeneratorCompleteAnalysisUseCase,
    private readonly createJefWaiverDeclarationGeneratorUseCase: CreateJefWaiverDeclarationGeneratorUseCase,
    private readonly downloadJefWaiverDeclarationGeneratorCompleteAnalysisUseCase: DownloadJefWaiverDeclarationGeneratorCompleteAnalysisUseCase,
    private readonly updateJefWaiverDeclarationGeneratorCompleteAnalysisUseCase: UpdateJefWaiverDeclarationGeneratorCompleteAnalysisUseCase,
    private readonly createPovertyDeclarationGeneratorUseCase: CreatePovertyDeclarationGeneratorUseCase,
    private readonly downloadPovertyDeclarationGeneratorCompleteAnalysisUseCase: DownloadPovertyDeclarationGeneratorCompleteAnalysisUseCase,
    private readonly updatePovertyDeclarationGeneratorCompleteAnalysisUseCase: UpdatePovertyDeclarationGeneratorCompleteAnalysisUseCase,
  ) {}

  // Fee Contract

  @BuildEndpointSpecification({
    summary: 'Gerar contrato de honorários',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':clientId/generate-fee-contract',
      method: RequestMethod.POST,
    },
    tag: ['documentos-cliente'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Contrato de honorários gerado com sucesso.',
      type: CreateFeeContractGeneratorResponseDto,
    },
    guard: [OrganizationSessionGuard],
  })
  public async generateFeeContract(
    @GetOrganizationSessionData() organizationSessionData: OrganizationSessionDataModel,
    @Param('clientId', new ParseValueObjectPipe(AnalysisToolClientId))
    clientId: AnalysisToolClientId,
  ): Promise<CreateFeeContractGeneratorResponseDto> {
    return await this.createFeeContractGeneratorUseCase.execute(
      clientId,
      organizationSessionData,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Baixar contrato de honorários',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'fee-contract/:documentId/download',
      method: RequestMethod.GET,
    },
    tag: ['documentos-cliente'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Arquivo do contrato de honorários retornado para download.',
      type: Buffer,
    },
    guard: [OrganizationSessionGuard],
  })
  public async downloadFeeContract(
    @GetOrganizationSessionData() organizationSessionData: OrganizationSessionDataModel,
    @Param('documentId', new ParseValueObjectPipe(FeeContractGeneratorId))
    documentId: FeeContractGeneratorId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum = ExportDocumentFormatEnum.PDF,
  ): Promise<StreamableFile> {
    return await this.downloadFeeContractGeneratorCompleteAnalysisUseCase.execute(
      organizationSessionData,
      documentId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar análise completa do contrato de honorários',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'fee-contract/:documentId/complete-analysis',
      method: RequestMethod.PATCH,
      type: UpdateFeeContractGeneratorCompleteAnalysisRequestDto,
    },
    tag: ['documentos-cliente'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise completa do contrato de honorários atualizada com sucesso.',
      type: UpdateFeeContractGeneratorCompleteAnalysisResponseDto,
    },
    guard: [],
  })
  public async updateFeeContractCompleteAnalysis(
    @Param('documentId', new ParseValueObjectPipe(FeeContractGeneratorId))
    documentId: FeeContractGeneratorId,
    @Body() dto: UpdateFeeContractGeneratorCompleteAnalysisRequestDto,
  ): Promise<UpdateFeeContractGeneratorCompleteAnalysisResponseDto> {
    return await this.updateFeeContractGeneratorCompleteAnalysisUseCase.execute(
      documentId,
      dto,
    );
  }

  // Power of Attorney

  @BuildEndpointSpecification({
    summary: 'Gerar procuração',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':clientId/generate-power-of-attorney',
      method: RequestMethod.POST,
    },
    tag: ['documentos-cliente'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Procuração gerada com sucesso.',
      type: CreatePowerOfAttorneyGeneratorResponseDto,
    },
    guard: [OrganizationSessionGuard],
  })
  public async generatePowerOfAttorney(
    @GetOrganizationSessionData() organizationSessionData: OrganizationSessionDataModel,
    @Param('clientId', new ParseValueObjectPipe(AnalysisToolClientId))
    clientId: AnalysisToolClientId,
  ): Promise<CreatePowerOfAttorneyGeneratorResponseDto> {
    return await this.createPowerOfAttorneyGeneratorUseCase.execute(
      clientId,
      organizationSessionData,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Baixar procuração',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'power-of-attorney/:documentId/download',
      method: RequestMethod.GET,
    },
    tag: ['documentos-cliente'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Arquivo da procuração retornado para download.',
      type: Buffer,
    },
    guard: [OrganizationSessionGuard],
  })
  public async downloadPowerOfAttorney(
    @GetOrganizationSessionData() organizationSessionData: OrganizationSessionDataModel,
    @Param('documentId', new ParseValueObjectPipe(PowerOfAttorneyGeneratorId))
    documentId: PowerOfAttorneyGeneratorId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum = ExportDocumentFormatEnum.PDF,
  ): Promise<StreamableFile> {
    return await this.downloadPowerOfAttorneyGeneratorCompleteAnalysisUseCase.execute(
      organizationSessionData,
      documentId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar análise completa da procuração',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'power-of-attorney/:documentId/complete-analysis',
      method: RequestMethod.PATCH,
      type: UpdatePowerOfAttorneyGeneratorCompleteAnalysisRequestDto,
    },
    tag: ['documentos-cliente'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise completa da procuração atualizada com sucesso.',
      type: UpdatePowerOfAttorneyGeneratorCompleteAnalysisResponseDto,
    },
    guard: [],
  })
  public async updatePowerOfAttorneyCompleteAnalysis(
    @Param('documentId', new ParseValueObjectPipe(PowerOfAttorneyGeneratorId))
    documentId: PowerOfAttorneyGeneratorId,
    @Body() dto: UpdatePowerOfAttorneyGeneratorCompleteAnalysisRequestDto,
  ): Promise<UpdatePowerOfAttorneyGeneratorCompleteAnalysisResponseDto> {
    return await this.updatePowerOfAttorneyGeneratorCompleteAnalysisUseCase.execute(
      documentId,
      dto,
    );
  }

  // JEF Waiver Declaration

  @BuildEndpointSpecification({
    summary: 'Gerar declaração de renúncia ao excedente do JEF',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':clientId/generate-jef-waiver-declaration',
      method: RequestMethod.POST,
    },
    tag: ['documentos-cliente'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Declaração de renúncia ao excedente do JEF gerada com sucesso.',
      type: CreateJefWaiverDeclarationGeneratorResponseDto,
    },
    guard: [OrganizationSessionGuard],
  })
  public async generateJefWaiverDeclaration(
    @GetOrganizationSessionData() organizationSessionData: OrganizationSessionDataModel,
    @Param('clientId', new ParseValueObjectPipe(AnalysisToolClientId))
    clientId: AnalysisToolClientId,
  ): Promise<CreateJefWaiverDeclarationGeneratorResponseDto> {
    return await this.createJefWaiverDeclarationGeneratorUseCase.execute(
      clientId,
      organizationSessionData,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Baixar declaração de renúncia ao excedente do JEF',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'jef-waiver-declaration/:documentId/download',
      method: RequestMethod.GET,
    },
    tag: ['documentos-cliente'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Arquivo da declaração de renúncia ao excedente do JEF retornado para download.',
      type: Buffer,
    },
    guard: [OrganizationSessionGuard],
  })
  public async downloadJefWaiverDeclaration(
    @GetOrganizationSessionData() organizationSessionData: OrganizationSessionDataModel,
    @Param('documentId', new ParseValueObjectPipe(JefWaiverDeclarationGeneratorId))
    documentId: JefWaiverDeclarationGeneratorId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum = ExportDocumentFormatEnum.PDF,
  ): Promise<StreamableFile> {
    return await this.downloadJefWaiverDeclarationGeneratorCompleteAnalysisUseCase.execute(
      organizationSessionData,
      documentId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar análise completa da declaração de renúncia ao excedente do JEF',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'jef-waiver-declaration/:documentId/complete-analysis',
      method: RequestMethod.PATCH,
      type: UpdateJefWaiverDeclarationGeneratorCompleteAnalysisRequestDto,
    },
    tag: ['documentos-cliente'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise completa da declaração de renúncia ao excedente do JEF atualizada com sucesso.',
      type: UpdateJefWaiverDeclarationGeneratorCompleteAnalysisResponseDto,
    },
    guard: [],
  })
  public async updateJefWaiverDeclarationCompleteAnalysis(
    @Param('documentId', new ParseValueObjectPipe(JefWaiverDeclarationGeneratorId))
    documentId: JefWaiverDeclarationGeneratorId,
    @Body() dto: UpdateJefWaiverDeclarationGeneratorCompleteAnalysisRequestDto,
  ): Promise<UpdateJefWaiverDeclarationGeneratorCompleteAnalysisResponseDto> {
    return await this.updateJefWaiverDeclarationGeneratorCompleteAnalysisUseCase.execute(
      documentId,
      dto,
    );
  }

  // Poverty Declaration

  @BuildEndpointSpecification({
    summary: 'Gerar declaração de hipossuficiência',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':clientId/generate-poverty-declaration',
      method: RequestMethod.POST,
    },
    tag: ['documentos-cliente'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Declaração de hipossuficiência gerada com sucesso.',
      type: CreatePovertyDeclarationGeneratorResponseDto,
    },
    guard: [OrganizationSessionGuard],
  })
  public async generatePovertyDeclaration(
    @GetOrganizationSessionData() organizationSessionData: OrganizationSessionDataModel,
    @Param('clientId', new ParseValueObjectPipe(AnalysisToolClientId))
    clientId: AnalysisToolClientId,
  ): Promise<CreatePovertyDeclarationGeneratorResponseDto> {
    return await this.createPovertyDeclarationGeneratorUseCase.execute(
      clientId,
      organizationSessionData,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Baixar declaração de hipossuficiência',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'poverty-declaration/:documentId/download',
      method: RequestMethod.GET,
    },
    tag: ['documentos-cliente'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Arquivo da declaração de hipossuficiência retornado para download.',
      type: Buffer,
    },
    guard: [OrganizationSessionGuard],
  })
  public async downloadPovertyDeclaration(
    @GetOrganizationSessionData() organizationSessionData: OrganizationSessionDataModel,
    @Param('documentId', new ParseValueObjectPipe(PovertyDeclarationGeneratorId))
    documentId: PovertyDeclarationGeneratorId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum = ExportDocumentFormatEnum.PDF,
  ): Promise<StreamableFile> {
    return await this.downloadPovertyDeclarationGeneratorCompleteAnalysisUseCase.execute(
      organizationSessionData,
      documentId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar análise completa da declaração de hipossuficiência',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'poverty-declaration/:documentId/complete-analysis',
      method: RequestMethod.PATCH,
      type: UpdatePovertyDeclarationGeneratorCompleteAnalysisRequestDto,
    },
    tag: ['documentos-cliente'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise completa da declaração de hipossuficiência atualizada com sucesso.',
      type: UpdatePovertyDeclarationGeneratorCompleteAnalysisResponseDto,
    },
    guard: [],
  })
  public async updatePovertyDeclarationCompleteAnalysis(
    @Param('documentId', new ParseValueObjectPipe(PovertyDeclarationGeneratorId))
    documentId: PovertyDeclarationGeneratorId,
    @Body() dto: UpdatePovertyDeclarationGeneratorCompleteAnalysisRequestDto,
  ): Promise<UpdatePovertyDeclarationGeneratorCompleteAnalysisResponseDto> {
    return await this.updatePovertyDeclarationGeneratorCompleteAnalysisUseCase.execute(
      documentId,
      dto,
    );
  }
}
