import {
  Body,
  Controller,
  HttpStatus,
  Query,
  RequestMethod,
} from '@nestjs/common';

import { ChatMessagesToConversationRequestDto } from '@module/ai/infra/chat/dto/request/chat-messages-to-conversation.request.dto';
import { HistoryConversationRequestDto } from '@module/ai/infra/chat/dto/request/history-conversation.request.dto';
import { SendMessageToConversationRequestDto } from '@module/ai/infra/chat/dto/request/send-message-to-conversation.request.dto';
import { StartChatRequestDto } from '@module/ai/infra/chat/dto/request/start-chat.request.dto';
import { ListConversationMessageResponseDto } from '@module/ai/infra/chat/dto/response/list-conversation-message.response.dto';
import { ListConversationResponseDto } from '@module/ai/infra/chat/dto/response/list-conversation-response.dto';
import { SendMessageToConversationResponseDto } from '@module/ai/infra/chat/dto/response/send-message-to-conversation.response.dto';
import { StartChatResponseDto } from '@module/ai/infra/chat/dto/response/start-chat.response.dto';
import { ChatMessagesToConversationUseCase } from '@module/ai/infra/chat/use-case/chat-messages-to-conversation.use-case';
import { HistoryConversationUseCase } from '@module/ai/infra/chat/use-case/history-conversation.use-case';
import { SendMessageToConversationUseCase } from '@module/ai/infra/chat/use-case/send-message-to-conversation.use-case';
import { StartChatUseCase } from '@module/ai/infra/chat/use-case/start-chat.use-case';
import { AuthGuard } from '@shared/api/gateway/guard/auth/auth.guard';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { GetSessionData } from '@shared/api/util/decorator/property/get-session-data/get-session-data.decorator';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@Controller('ai/chat')
export class ChatController {
  protected readonly _type = ChatController.name;

  public constructor(
    private readonly startChatUseCase: StartChatUseCase,
    private readonly sendMessageToConversationUseCase: SendMessageToConversationUseCase,
    private readonly chatMessagesToConversationUseCase: ChatMessagesToConversationUseCase,
    private readonly historyConversationUseCase: HistoryConversationUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Iniciar um novo chat com a IA',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'start',
      method: RequestMethod.POST,
      type: StartChatRequestDto,
    },
    tag: ['chat-ia'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Chat iniciado com sucesso.',
      type: StartChatResponseDto,
    },
    guard: [AuthGuard],
  })
  public async startChat(
    @GetSessionData() sessionData: SessionDataModel,
    @Body() dto: StartChatRequestDto,
  ): Promise<StartChatResponseDto> {
    return await this.startChatUseCase.execute(sessionData, dto);
  }

  @BuildEndpointSpecification({
    summary:
      'Enviar mensagem para um chat existente (user -> IA -> tools -> IA)',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'message',
      method: RequestMethod.POST,
      type: SendMessageToConversationRequestDto,
    },
    tag: ['chat-ia'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Mensagem processada com sucesso.',
      type: SendMessageToConversationResponseDto,
    },
    guard: [AuthGuard],
  })
  public async sendMessage(
    @Body() dto: SendMessageToConversationRequestDto,
  ): Promise<SendMessageToConversationResponseDto> {
    return await this.sendMessageToConversationUseCase.execute(dto);
  }

  @BuildEndpointSpecification({
    summary: 'Listar mensagens de uma conversa do usuário',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'conversation',
      method: RequestMethod.GET,
    },
    tag: ['chat-ia'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Mensagens retornadas com sucesso.',
      type: ListConversationMessageResponseDto,
    },
    guard: [AuthGuard],
  })
  public async listMessages(
    @GetSessionData() sessionData: SessionDataModel,
    @Query() dto: ChatMessagesToConversationRequestDto,
  ): Promise<ListConversationMessageResponseDto> {
    return await this.chatMessagesToConversationUseCase.execute(
      sessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Listar os chats em aberto usuário',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'history',
      method: RequestMethod.GET,
    },
    tag: ['chat-ia'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Chats de conversa com Eloy.',
      type: ListConversationResponseDto,
    },
    guard: [AuthGuard],
  })
  public async historyConversation(
    @GetSessionData() sessionData: SessionDataModel,
    @Query() dto: HistoryConversationRequestDto,
  ): Promise<ListConversationResponseDto> {
    return await this.historyConversationUseCase.execute(sessionData, dto);
  }
}
