import { Body, HttpStatus, Param, Query, RequestMethod } from '@nestjs/common';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { OrganizationCustomizationDocumentFooterTemplateId } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-footer-template/value-object/organization-customization-document-footer-template-id/organization-customization-document-footer-template-id.value-object';
import { OrganizationCustomizationDocumentHeaderTemplateId } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-header-template/value-object/organization-customization-document-header-template-id/organization-customization-document-header-template-id.value-object';
import { CreateOrganizationCustomizationRequestDto } from '@module/customer/organization-customization/dto/request/create-organization-customization.request.dto';
import { PatchOrganizationCustomizationRequestDto } from '@module/customer/organization-customization/dto/request/patch-organization-customization.request.dto';
import { UploadOrganizationCustomizationLogoRequestDto } from '@module/customer/organization-customization/dto/request/upload-organization-customization-logo.request.dto';
import { GetOrganizationCustomizationResponseDto } from '@module/customer/organization-customization/dto/response/get-organization-customization.response.dto';
import { ListOrganizationCustomizationDocumentFooterTemplatesResponseDto } from '@module/customer/organization-customization/dto/response/list-organization-customization-document-footer-templates.response.dto';
import { ListOrganizationCustomizationDocumentHeaderTemplatesResponseDto } from '@module/customer/organization-customization/dto/response/list-organization-customization-document-header-templates.response.dto';
import { PreviewOrganizationCustomizationDocumentFooterTemplateResponseDto } from '@module/customer/organization-customization/dto/response/preview-organization-customization-document-footer-template.response.dto';
import { PreviewOrganizationCustomizationDocumentHeaderTemplateResponseDto } from '@module/customer/organization-customization/dto/response/preview-organization-customization-document-header-template.response.dto';
import { CreateOrganizationCustomizationUseCase } from '@module/customer/organization-customization/use-case/create-organization-customization.use-case';
import { GetOrganizationCustomizationUseCase } from '@module/customer/organization-customization/use-case/get-organization-customization.use-case';
import { ListOrganizationCustomizationDocumentFooterTemplatesUseCase } from '@module/customer/organization-customization/use-case/list-organization-customization-document-footer-templates.use-case';
import { ListOrganizationCustomizationDocumentHeaderTemplatesUseCase } from '@module/customer/organization-customization/use-case/list-organization-customization-document-header-templates.use-case';
import { PatchOrganizationCustomizationUseCase } from '@module/customer/organization-customization/use-case/patch-organization-customization.use-case';
import { PreviewOrganizationCustomizationDocumentFooterTemplateUseCase } from '@module/customer/organization-customization/use-case/preview-organization-customization-document-footer-template.use-case';
import { PreviewOrganizationCustomizationDocumentHeaderTemplateUseCase } from '@module/customer/organization-customization/use-case/preview-organization-customization-document-header-template.use-case';
import { UploadOrganizationCustomizationLogoUseCase } from '@module/customer/organization-customization/use-case/upload-organization-customization-logo.use-case';
import { AuthGuard } from '@shared/api/gateway/guard/auth/auth.guard';
import { OrganizationOwnerGuard } from '@shared/api/gateway/guard/organization-owner/organization-owner.guard';
import { OrganizationSessionGuard } from '@shared/api/gateway/guard/organization-session/organization-session.guard';
import { CustomerControllerRoute } from '@shared/api/util/decorator/class/controller-route/customer-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { GetOrganizationSessionData } from '@shared/api/util/decorator/property/get-organization-session-data/get-organization-session-data.decorator';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';
import { ParseValueObjectPipe } from '@shared/api/util/pipe/parse-value-object.pipe';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@CustomerControllerRoute('organization-customization')
export class OrganizationCustomizationController {
  protected readonly _type = OrganizationCustomizationController.name;

  public constructor(
    private readonly createOrganizationCustomizationUseCase: CreateOrganizationCustomizationUseCase,
    private readonly getOrganizationCustomizationUseCase: GetOrganizationCustomizationUseCase,
    private readonly patchOrganizationCustomizationUseCase: PatchOrganizationCustomizationUseCase,
    private readonly uploadOrganizationCustomizationLogoUseCase: UploadOrganizationCustomizationLogoUseCase,
    private readonly listHeaderTemplatesUseCase: ListOrganizationCustomizationDocumentHeaderTemplatesUseCase,
    private readonly listFooterTemplatesUseCase: ListOrganizationCustomizationDocumentFooterTemplatesUseCase,
    private readonly previewHeaderTemplateUseCase: PreviewOrganizationCustomizationDocumentHeaderTemplateUseCase,
    private readonly previewFooterTemplateUseCase: PreviewOrganizationCustomizationDocumentFooterTemplateUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Criar personalização da organização',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateOrganizationCustomizationRequestDto,
    },
    tag: ['personalizacao-organizacao'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Personalização da organização criada com sucesso.',
      type: GetOrganizationCustomizationResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard, OrganizationOwnerGuard],
  })
  public async createOrganizationCustomization(
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateOrganizationCustomizationRequestDto,
  ): Promise<GetOrganizationCustomizationResponseDto> {
    return this.createOrganizationCustomizationUseCase.execute(
      organizationSessionData.organizationId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter personalização da organização',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: { path: '', method: RequestMethod.GET },
    tag: ['personalizacao-organizacao'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Personalização da organização obtida com sucesso.',
      type: GetOrganizationCustomizationResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getOrganizationCustomization(
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
  ): Promise<GetOrganizationCustomizationResponseDto> {
    return this.getOrganizationCustomizationUseCase.execute(
      organizationSessionData.organizationId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar personalização da organização',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.PATCH,
      type: PatchOrganizationCustomizationRequestDto,
    },
    tag: ['personalizacao-organizacao'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Personalização da organização atualizada com sucesso.',
      type: GetOrganizationCustomizationResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard, OrganizationOwnerGuard],
  })
  public async patchOrganizationCustomization(
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: PatchOrganizationCustomizationRequestDto,
  ): Promise<GetOrganizationCustomizationResponseDto> {
    return this.patchOrganizationCustomizationUseCase.execute(
      organizationSessionData.organizationId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Upload do logo da organização',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'logo',
      method: RequestMethod.PATCH,
      type: UploadOrganizationCustomizationLogoRequestDto,
    },
    tag: ['personalizacao-organizacao'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Logo da organização enviado com sucesso.',
      type: GetOrganizationCustomizationResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard, OrganizationOwnerGuard],
  })
  public async uploadOrganizationCustomizationLogo(
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: UploadOrganizationCustomizationLogoRequestDto,
  ): Promise<GetOrganizationCustomizationResponseDto> {
    return this.uploadOrganizationCustomizationLogoUseCase.execute(
      organizationSessionData.organizationId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Listar templates de cabeçalho de documento',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'document-header-template',
      method: RequestMethod.GET,
    },
    tag: ['personalizacao-organizacao'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Lista de templates de cabeçalho obtida com sucesso.',
      type: ListOrganizationCustomizationDocumentHeaderTemplatesResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async listDocumentHeaderTemplates(
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Query() dto: ListDataRequestDto,
  ): Promise<ListOrganizationCustomizationDocumentHeaderTemplatesResponseDto> {
    return this.listHeaderTemplatesUseCase.execute(
      new ListDataInputModel(dto),
      organizationSessionData.organizationId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Preview de template de cabeçalho de documento',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'document-header-template/:organizationCustomizationDocumentHeaderTemplateId/preview',
      method: RequestMethod.GET,
    },
    tag: ['personalizacao-organizacao'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Preview do template de cabeçalho obtido com sucesso.',
      type: PreviewOrganizationCustomizationDocumentHeaderTemplateResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async previewDocumentHeaderTemplate(
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'organizationCustomizationDocumentHeaderTemplateId',
      new ParseValueObjectPipe(
        OrganizationCustomizationDocumentHeaderTemplateId,
      ),
    )
    id: OrganizationCustomizationDocumentHeaderTemplateId,
  ): Promise<PreviewOrganizationCustomizationDocumentHeaderTemplateResponseDto> {
    return this.previewHeaderTemplateUseCase.execute(
      id,
      organizationSessionData.organizationId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Listar templates de rodapé de documento',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'document-footer-template',
      method: RequestMethod.GET,
    },
    tag: ['personalizacao-organizacao'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Lista de templates de rodapé obtida com sucesso.',
      type: ListOrganizationCustomizationDocumentFooterTemplatesResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async listDocumentFooterTemplates(
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Query() dto: ListDataRequestDto,
  ): Promise<ListOrganizationCustomizationDocumentFooterTemplatesResponseDto> {
    return this.listFooterTemplatesUseCase.execute(
      new ListDataInputModel(dto),
      organizationSessionData.organizationId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Preview de template de rodapé de documento',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'document-footer-template/:organizationCustomizationDocumentFooterTemplateId/preview',
      method: RequestMethod.GET,
    },
    tag: ['personalizacao-organizacao'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Preview do template de rodapé obtido com sucesso.',
      type: PreviewOrganizationCustomizationDocumentFooterTemplateResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async previewDocumentFooterTemplate(
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'organizationCustomizationDocumentFooterTemplateId',
      new ParseValueObjectPipe(
        OrganizationCustomizationDocumentFooterTemplateId,
      ),
    )
    id: OrganizationCustomizationDocumentFooterTemplateId,
  ): Promise<PreviewOrganizationCustomizationDocumentFooterTemplateResponseDto> {
    return this.previewFooterTemplateUseCase.execute(
      id,
      organizationSessionData.organizationId,
    );
  }
}
