import { Inject, Injectable } from '@nestjs/common';

import { ConversationCacheGateway } from '@module/customer/ai-conversation/conversation-cache/conversation-cache.gateway';
import { CreateConversationRequestDto } from '@module/customer/ai-conversation/dto/request/create-conversation.request.dto';
import { CreateConversationResponseDto } from '@module/customer/ai-conversation/dto/response/create-conversation.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateConversationUseCase {
  protected readonly _type = CreateConversationUseCase.name;

  public constructor(
    @Inject(ConversationCacheGateway)
    private readonly conversationCacheGateway: ConversationCacheGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: CreateConversationRequestDto,
  ): Promise<CreateConversationResponseDto> {
    const conversation = await this.conversationCacheGateway.createConversation(
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      dto.title,
    );

    return CreateConversationResponseDto.build({
      conversationId: conversation.id,
      createdAt: conversation.createdAt,
      title: conversation.title,
    });
  }
}
