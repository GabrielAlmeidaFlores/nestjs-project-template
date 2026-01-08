import {
  Body,
  HttpStatus,
  Param,
  ParseEnumPipe,
  Query,
  RequestMethod,
} from '@nestjs/common';

import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { CreateConversationRequestDto } from '@module/customer/ai-conversation/dto/request/create-conversation.request.dto';
import { SendMessageRequestDto } from '@module/customer/ai-conversation/dto/request/send-message.request.dto';
import { CalculateMessageCreditCostResponseDto } from '@module/customer/ai-conversation/dto/response/calculate-message-credit-cost.response.dto';
import { CreateConversationResponseDto } from '@module/customer/ai-conversation/dto/response/create-conversation.response.dto';
import { GetMessagesResponseDto } from '@module/customer/ai-conversation/dto/response/get-messages.response.dto';
import { ListConversationsResponseDto } from '@module/customer/ai-conversation/dto/response/list-conversations.response.dto';
import { SendMessageResponseDto } from '@module/customer/ai-conversation/dto/response/send-message.response.dto';
import { CalculateMessageCreditCostUseCase } from '@module/customer/ai-conversation/use-case/calculate-message-credit-cost.use-case';
import { CreateConversationUseCase } from '@module/customer/ai-conversation/use-case/create-conversation.use-case';
import { GetMessagesUseCase } from '@module/customer/ai-conversation/use-case/get-messages.use-case';
import { ListConversationsUseCase } from '@module/customer/ai-conversation/use-case/list-conversations.use-case';
import { SendMessageUseCase } from '@module/customer/ai-conversation/use-case/send-message.use-case';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { AuthGuard } from '@shared/api/gateway/guard/auth/auth.guard';
import { OrganizationSessionGuard } from '@shared/api/gateway/guard/organization-session/organization-session.guard';
import { CustomerControllerRoute } from '@shared/api/util/decorator/class/controller-route/customer-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { GetOrganizationSessionData } from '@shared/api/util/decorator/property/get-organization-session-data/get-organization-session-data.decorator';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { GetSessionData } from '@shared/api/util/decorator/property/get-session-data/get-session-data.decorator';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';
import { ParseValueObjectPipe } from '@shared/api/util/pipe/parse-value-object.pipe';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@CustomerControllerRoute('ai-conversation')
export class AiConversationController {
  protected readonly _type = AiConversationController.name;

  public constructor(
    private readonly createConversationUseCase: CreateConversationUseCase,
    private readonly sendMessageUseCase: SendMessageUseCase,
    private readonly getMessagesUseCase: GetMessagesUseCase,
    private readonly listConversationsUseCase: ListConversationsUseCase,
    private readonly calculateMessageCreditCostUseCase: CalculateMessageCreditCostUseCase,
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
      path: 'calculate-cost/:paymentPlanPaidResourceType/message/calculate-cost',
      type: SendMessageRequestDto,
    },
    successResponse: {
      description: 'Custo de créditos calculado com sucesso',
      statusCode: HttpStatus.OK,
      type: CalculateMessageCreditCostResponseDto,
    },
    summary: 'Calcular custo de créditos de uma mensagem',
    tag: ['ai-conversation'],
    userLevel: [UserLevelEnum.CUSTOMER],
  })
  public async calculateMessageCreditCost(
    @Param(
      'paymentPlanPaidResourceType',
      new ParseEnumPipe(PaymentPlanPaidResourceTypeEnum),
    )
    paymentPlanPaidResourceType: PaymentPlanPaidResourceTypeEnum,
    @Body() dto: SendMessageRequestDto,
  ): Promise<CalculateMessageCreditCostResponseDto> {
    return await this.calculateMessageCreditCostUseCase.execute(
      paymentPlanPaidResourceType,
      dto,
    );
  }

  @BuildEndpointSpecification({
    guard: [AuthGuard, OrganizationSessionGuard],
    http: {
      method: RequestMethod.POST,
      path: ':conversationId/:paymentPlanPaidResourceType/message',
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
    @Param(
      'paymentPlanPaidResourceType',
      new ParseEnumPipe(PaymentPlanPaidResourceTypeEnum),
    )
    paymentPlanPaidResourceType: PaymentPlanPaidResourceTypeEnum,
    @GetSessionData()
    sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: SendMessageRequestDto,
  ): Promise<SendMessageResponseDto> {
    return await this.sendMessageUseCase.execute(
      conversationId,
      paymentPlanPaidResourceType,
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

  @BuildEndpointSpecification({
    guard: [AuthGuard, OrganizationSessionGuard],
    http: {
      method: RequestMethod.GET,
      path: '',
    },
    successResponse: {
      description: 'Conversas listadas com sucesso',
      statusCode: HttpStatus.OK,
      type: ListConversationsResponseDto,
    },
    summary: 'Listar conversas do usuário',
    tag: ['ai-conversation'],
    userLevel: [UserLevelEnum.CUSTOMER],
  })
  public async listConversations(
    @GetSessionData() sessionData: SessionDataModel,
    @Query() dto: ListDataRequestDto,
  ): Promise<ListConversationsResponseDto> {
    return await this.listConversationsUseCase.execute(sessionData, dto);
  }
}
