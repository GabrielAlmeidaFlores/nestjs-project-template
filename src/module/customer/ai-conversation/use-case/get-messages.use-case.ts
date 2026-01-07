import { Injectable, Inject } from '@nestjs/common';
import { marked } from 'marked';

import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { ConversationCacheGateway } from '@module/customer/ai-conversation/conversation-cache/conversation-cache.gateway';
import {
  GetMessagesResponseDto,
  MessageDto,
} from '@module/customer/ai-conversation/dto/response/get-messages.response.dto';
import { ConversationAccessDeniedError } from '@module/customer/ai-conversation/error/conversation-access-denied.error';
import { ConversationNotFoundError } from '@module/customer/ai-conversation/error/conversation-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetMessagesUseCase {
  protected readonly _type = GetMessagesUseCase.name;

  public constructor(
    @Inject(ConversationCacheGateway)
    private readonly conversationCacheGateway: ConversationCacheGateway,
  ) {}

  public async execute(
    conversationId: Guid,
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    limit?: number,
  ): Promise<GetMessagesResponseDto> {
    const conversation =
      await this.conversationCacheGateway.getConversation(conversationId);

    if (conversation === null) {
      throw new ConversationNotFoundError();
    }

    if (
      !conversation.organizationId.equals(
        organizationSessionData.organizationId,
      ) ||
      !conversation.authIdentityId.equals(sessionData.authIdentityId)
    ) {
      throw new ConversationAccessDeniedError();
    }

    const messages = await this.conversationCacheGateway.getMessages(
      conversationId,
      limit,
    );

    const messagesWithHtml = messages.map((msg) => {
      const isHtml =
        msg.content.includes('<strong>') ||
        msg.content.includes('<em>') ||
        msg.content.includes('<ul>') ||
        msg.content.includes('<p>');

      const htmlContent = isHtml
        ? msg.content
        : this.convertMarkdownToHtml(msg.content);

      return {
        ...msg,
        content: htmlContent.trim(),
      };
    });

    return GetMessagesResponseDto.build({
      conversationId,
      messages: messagesWithHtml.map((msg) =>
        MessageDto.build({
          content: msg.content,
          id: msg.id,
          role: msg.role,
          timestamp: msg.timestamp,
        }),
      ),
      total: messagesWithHtml.length,
    });
  }

  private convertMarkdownToHtml(markdown: string): string {
    let html = marked.parse(markdown, {
      breaks: true,
      gfm: true,
      async: false,
    });

    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');

    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    html = html.replace(/_(.+?)_/g, '<em>$1</em>');

    const lines = html.split('\n');
    let inList = false;
    const processedLines: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line === undefined) {
        continue;
      }

      const trimmedLine = line.trim();

      if (trimmedLine.startsWith('* ') || trimmedLine.startsWith('- ')) {
        if (!inList) {
          processedLines.push('<ul>');
          inList = true;
        }
        const content = trimmedLine.substring(2);
        processedLines.push(`<li>${content}</li>`);
      } else {
        if (inList) {
          processedLines.push('</ul>');
          inList = false;
        }
        if (trimmedLine === '') {
          processedLines.push('<br>');
        } else {
          processedLines.push(line);
        }
      }
    }

    if (inList) {
      processedLines.push('</ul>');
    }

    html = processedLines.join('\n');

    html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');

    html = html.replace(/\n\n/g, '</p><p>');

    if (!html.startsWith('<')) {
      html = `<p>${html}</p>`;
    }

    return html;
  }
}
