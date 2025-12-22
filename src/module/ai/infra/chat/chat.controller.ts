import { Body, Controller, HttpStatus, RequestMethod } from '@nestjs/common';

import { SendMessageToConversationRequestDto } from '@module/ai/infra/chat/dto/request/send-message-to-conversation.request.dto';
import { StartChatRequestDto } from '@module/ai/infra/chat/dto/request/start-chat.request.dto';
import { SendMessageToConversationResponseDto } from '@module/ai/infra/chat/dto/response/send-message-to-conversation.response.dto';
import { StartChatResponseDto } from '@module/ai/infra/chat/dto/response/start-chat.response.dto';
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
}
