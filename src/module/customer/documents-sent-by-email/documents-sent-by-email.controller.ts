import { Body, HttpStatus, Param, Query, RequestMethod } from '@nestjs/common';

import { EmailTemplateId } from '@module/customer/documents-sent-by-email/domain/schema/entity/email-template/value-object/email-template-id/email-template-id.value-object';
import { CreateEmailTemplateRequestDto } from '@module/customer/documents-sent-by-email/dto/request/create-email-template.request.dto';
import { ListDocumentsSentByEmailQueryRequestDto } from '@module/customer/documents-sent-by-email/dto/request/list-documents-sent-by-email.query.request.dto';
import { ListEmailTemplatesQueryRequestDto } from '@module/customer/documents-sent-by-email/dto/request/list-email-templates.query.request.dto';
import { SendDocumentsByEmailRequestDto } from '@module/customer/documents-sent-by-email/dto/request/send-documents-by-email.request.dto';
import { UpdateEmailTemplateRequestDto } from '@module/customer/documents-sent-by-email/dto/request/update-email-template.request.dto';
import { EmailTemplateItemResponseDto } from '@module/customer/documents-sent-by-email/dto/response/email-template-item.response.dto';
import { ListDocumentsSentByEmailResponseDto } from '@module/customer/documents-sent-by-email/dto/response/list-documents-sent-by-email.response.dto';
import { ListEmailTemplatesResponseDto } from '@module/customer/documents-sent-by-email/dto/response/list-email-templates.response.dto';
import { SendDocumentsByEmailResponseDto } from '@module/customer/documents-sent-by-email/dto/response/send-documents-by-email.response.dto';
import { CreateEmailTemplateUseCase } from '@module/customer/documents-sent-by-email/use-case/create-email-template.use-case';
import { DeleteEmailTemplateUseCase } from '@module/customer/documents-sent-by-email/use-case/delete-email-template.use-case';
import { GetEmailTemplateUseCase } from '@module/customer/documents-sent-by-email/use-case/get-email-template.use-case';
import { ListDocumentsSentByEmailUseCase } from '@module/customer/documents-sent-by-email/use-case/list-documents-sent-by-email.use-case';
import { ListEmailTemplatesUseCase } from '@module/customer/documents-sent-by-email/use-case/list-email-templates.use-case';
import { SendDocumentsByEmailUseCase } from '@module/customer/documents-sent-by-email/use-case/send-documents-by-email.use-case';
import { UpdateEmailTemplateUseCase } from '@module/customer/documents-sent-by-email/use-case/update-email-template.use-case';
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

@CustomerControllerRoute('documents-sent-by-email')
export class DocumentsSentByEmailController {
  protected readonly _type = DocumentsSentByEmailController.name;

  public constructor(
    private readonly sendDocumentsByEmailUseCase: SendDocumentsByEmailUseCase,
    private readonly listDocumentsSentByEmailUseCase: ListDocumentsSentByEmailUseCase,
    private readonly listEmailTemplatesUseCase: ListEmailTemplatesUseCase,
    private readonly createEmailTemplateUseCase: CreateEmailTemplateUseCase,
    private readonly getEmailTemplateUseCase: GetEmailTemplateUseCase,
    private readonly updateEmailTemplateUseCase: UpdateEmailTemplateUseCase,
    private readonly deleteEmailTemplateUseCase: DeleteEmailTemplateUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Enviar documentos por e-mail',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'send',
      method: RequestMethod.POST,
    },
    tag: ['documentos-enviados-por-email'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'E-mail enviado e histórico salvo com sucesso.',
      type: SendDocumentsByEmailResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
    throttle: {
      limit: 8,
      ttlInMinutes: 1,
    },
  })
  public async sendDocumentsByEmail(
    @Body() dto: SendDocumentsByEmailRequestDto,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @GetSessionData() sessionData: SessionDataModel,
  ): Promise<SendDocumentsByEmailResponseDto> {
    return await this.sendDocumentsByEmailUseCase.execute(
      organizationSessionData,
      sessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Listar documentos enviados por e-mail (paginado)',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.GET,
    },
    tag: ['documentos-enviados-por-email'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Lista paginada de documentos enviados por e-mail.',
      type: ListDocumentsSentByEmailResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async listDocumentsSentByEmail(
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @GetSessionData() sessionData: SessionDataModel,
    @Query() dto: ListDocumentsSentByEmailQueryRequestDto,
  ): Promise<ListDocumentsSentByEmailResponseDto> {
    return await this.listDocumentsSentByEmailUseCase.execute(
      organizationSessionData,
      sessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Listar templates de email',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'templates',
      method: RequestMethod.GET,
    },
    tag: ['templates-email'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Lista paginada de templates de email.',
      type: ListEmailTemplatesResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async listEmailTemplates(
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @GetSessionData() sessionData: SessionDataModel,
    @Query() dto: ListEmailTemplatesQueryRequestDto,
  ): Promise<ListEmailTemplatesResponseDto> {
    return await this.listEmailTemplatesUseCase.execute(
      organizationSessionData,
      sessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar template de email',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'templates',
      method: RequestMethod.POST,
      type: CreateEmailTemplateRequestDto,
    },
    tag: ['templates-email'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Template de email criado com sucesso.',
      type: EmailTemplateItemResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createEmailTemplate(
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @GetSessionData() sessionData: SessionDataModel,
    @Body() dto: CreateEmailTemplateRequestDto,
  ): Promise<EmailTemplateItemResponseDto> {
    return await this.createEmailTemplateUseCase.execute(
      organizationSessionData,
      sessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter template de email por ID',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'templates/:emailTemplateId',
      method: RequestMethod.GET,
    },
    tag: ['templates-email'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Template de email retornado com sucesso.',
      type: EmailTemplateItemResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getEmailTemplate(
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @GetSessionData() sessionData: SessionDataModel,
    @Param('emailTemplateId', new ParseValueObjectPipe(EmailTemplateId))
    emailTemplateId: EmailTemplateId,
  ): Promise<EmailTemplateItemResponseDto> {
    return await this.getEmailTemplateUseCase.execute(
      organizationSessionData,
      sessionData,
      emailTemplateId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar template de email',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'templates/:emailTemplateId',
      method: RequestMethod.PATCH,
      type: UpdateEmailTemplateRequestDto,
    },
    tag: ['templates-email'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Template de email atualizado com sucesso.',
      type: EmailTemplateItemResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateEmailTemplate(
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @GetSessionData() sessionData: SessionDataModel,
    @Param('emailTemplateId', new ParseValueObjectPipe(EmailTemplateId))
    emailTemplateId: EmailTemplateId,
    @Body() dto: UpdateEmailTemplateRequestDto,
  ): Promise<EmailTemplateItemResponseDto> {
    return await this.updateEmailTemplateUseCase.execute(
      organizationSessionData,
      sessionData,
      emailTemplateId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Excluir template de email (lógico)',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'templates/:emailTemplateId',
      method: RequestMethod.DELETE,
    },
    tag: ['templates-email'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Template de email deletado com sucesso.',
      type: EmailTemplateItemResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async deleteEmailTemplate(
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @GetSessionData() sessionData: SessionDataModel,
    @Param('emailTemplateId', new ParseValueObjectPipe(EmailTemplateId))
    emailTemplateId: EmailTemplateId,
  ): Promise<EmailTemplateItemResponseDto> {
    return await this.deleteEmailTemplateUseCase.execute(
      organizationSessionData,
      sessionData,
      emailTemplateId,
    );
  }
}
