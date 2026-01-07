import { Body, HttpStatus, Param, Query, RequestMethod } from '@nestjs/common';

import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { CreateConversationRequestDto } from '@module/customer/ai-conversation/dto/request/create-conversation.request.dto';
import { SendMessageRequestDto } from '@module/customer/ai-conversation/dto/request/send-message.request.dto';
import { CreateConversationResponseDto } from '@module/customer/ai-conversation/dto/response/create-conversation.response.dto';
import { GetMessagesResponseDto } from '@module/customer/ai-conversation/dto/response/get-messages.response.dto';
import { SendMessageResponseDto } from '@module/customer/ai-conversation/dto/response/send-message.response.dto';
import { CreateConversationUseCase } from '@module/customer/ai-conversation/use-case/create-conversation.use-case';
import { GetMessagesUseCase } from '@module/customer/ai-conversation/use-case/get-messages.use-case';
import { SendMessageUseCase } from '@module/customer/ai-conversation/use-case/send-message.use-case';
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

@CustomerControllerRoute('ai-conversation')
export class AiConversationController {
  protected readonly _type = AiConversationController.name;

  public constructor(
    private readonly createConversationUseCase: CreateConversationUseCase,
    private readonly sendMessageUseCase: SendMessageUseCase,
    private readonly getMessagesUseCase: GetMessagesUseCase,
  ) {}

  @BuildEndpointSpecification({
    guard: [AuthGuard, OrganizationSessionGuard],
    http: {
      method: RequestMethod.POST,
      path: '',
      type: CreateConversationRequestDto,
    },
    successResponse: {
      description: 'Conversa criada com sucesso',
      statusCode: HttpStatus.CREATED,
      type: CreateConversationResponseDto,
    },
    summary: 'Criar nova conversa com a IA',
    tag: ['ai-conversation'],
    userLevel: [UserLevelEnum.CUSTOMER],
  })
  public async createConversation(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateConversationRequestDto,
  ): Promise<CreateConversationResponseDto> {
    return await this.createConversationUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    guard: [AuthGuard, OrganizationSessionGuard],
    http: {
      method: RequestMethod.POST,
      path: ':conversationId/message',
      type: SendMessageRequestDto,
    },
    successResponse: {
      description: 'Mensagem enviada com sucesso',
      statusCode: HttpStatus.OK,
      type: SendMessageResponseDto,
    },
    summary: 'Enviar mensagem em uma conversa',
    tag: ['ai-conversation'],
    userLevel: [UserLevelEnum.CUSTOMER],
  })
  public async sendMessage(
    @Param('conversationId', new ParseValueObjectPipe(Guid))
    conversationId: Guid,
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: SendMessageRequestDto,
  ): Promise<SendMessageResponseDto> {
    return await this.sendMessageUseCase.execute(
      conversationId,
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    guard: [AuthGuard, OrganizationSessionGuard],
    http: {
      method: RequestMethod.GET,
      path: ':conversationId/messages',
    },
    successResponse: {
      description: 'Mensagens listadas com sucesso',
      statusCode: HttpStatus.OK,
      type: GetMessagesResponseDto,
    },
    summary: 'Listar mensagens de uma conversa',
    tag: ['ai-conversation'],
    userLevel: [UserLevelEnum.CUSTOMER],
  })
  public async getMessages(
    @Param('conversationId', new ParseValueObjectPipe(Guid))
    conversationId: Guid,
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Query('limit') limit?: number,
  ): Promise<GetMessagesResponseDto> {
    return await this.getMessagesUseCase.execute(
      conversationId,
      sessionData,
      organizationSessionData,
      limit,
    );
  }
}
