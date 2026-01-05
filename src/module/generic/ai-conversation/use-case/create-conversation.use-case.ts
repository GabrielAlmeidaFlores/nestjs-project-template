import { Inject, Injectable } from '@nestjs/common';

import { CreateConversationRequestDto } from '@module/generic/ai-conversation/dto/request/create-conversation.request.dto';
import { CreateConversationResponseDto } from '@module/generic/ai-conversation/dto/response/create-conversation.response.dto';
import { ConversationCacheRepository } from '@module/generic/ai-conversation/repository/conversation-cache.repository';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateConversationUseCase {
  protected readonly _type = CreateConversationUseCase.name;

  public constructor(
    @Inject(ConversationCacheRepository)
    private readonly conversationCacheRepository: ConversationCacheRepository,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: CreateConversationRequestDto,
  ): Promise<CreateConversationResponseDto> {
    const conversation =
      await this.conversationCacheRepository.createConversation(
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
