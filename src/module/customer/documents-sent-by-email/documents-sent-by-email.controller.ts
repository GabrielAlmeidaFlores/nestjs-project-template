import { Body, HttpStatus, Query, RequestMethod } from '@nestjs/common';

import { ListDocumentsSentByEmailQueryRequestDto } from '@module/customer/documents-sent-by-email/dto/request/list-documents-sent-by-email.query.request.dto';
import { SendDocumentsByEmailRequestDto } from '@module/customer/documents-sent-by-email/dto/request/send-documents-by-email.request.dto';
import { ListDocumentsSentByEmailResponseDto } from '@module/customer/documents-sent-by-email/dto/response/list-documents-sent-by-email.response.dto';
import { SendDocumentsByEmailResponseDto } from '@module/customer/documents-sent-by-email/dto/response/send-documents-by-email.response.dto';
import { ListDocumentsSentByEmailUseCase } from '@module/customer/documents-sent-by-email/use-case/list-documents-sent-by-email/list-documents-sent-by-email.use-case';
import { SendDocumentsByEmailUseCase } from '@module/customer/documents-sent-by-email/use-case/send-documents-by-email/use-case/send-documents-by-email.use-case';
import { AuthGuard } from '@shared/api/gateway/guard/auth/auth.guard';
import { OrganizationSessionGuard } from '@shared/api/gateway/guard/organization-session/organization-session.guard';
import { CustomerControllerRoute } from '@shared/api/util/decorator/class/controller-route/customer-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { GetOrganizationSessionData } from '@shared/api/util/decorator/property/get-organization-session-data/get-organization-session-data.decorator';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { GetSessionData } from '@shared/api/util/decorator/property/get-session-data/get-session-data.decorator';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@CustomerControllerRoute('documents-sent-by-email')
export class DocumentsSentByEmailController {
  protected readonly _type = DocumentsSentByEmailController.name;

  public constructor(
    private readonly sendDocumentsByEmailUseCase: SendDocumentsByEmailUseCase,
    private readonly listDocumentsSentByEmailUseCase: ListDocumentsSentByEmailUseCase,
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
}
