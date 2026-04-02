import { Inject, Injectable } from '@nestjs/common';

import { DocumentsSentByEmailQueryRepositoryGateway } from '@module/customer/documents-sent-by-email/domain/repository/documents-sent-by-email/query/documents-sent-by-email.query.repository.gateway';
import { ListDocumentsSentByEmailQueryParamGateway } from '@module/customer/documents-sent-by-email/domain/repository/documents-sent-by-email/query/param/list-documents-sent-by-email.query.param.gateway';
import { ListDocumentsSentByEmailQueryRequestDto } from '@module/customer/documents-sent-by-email/dto/request/list-documents-sent-by-email.query.request.dto';
import { ListDocumentsSentByEmailItemResponseDto } from '@module/customer/documents-sent-by-email/dto/response/list-documents-sent-by-email-item.response.dto';
import { ListDocumentsSentByEmailResponseDto } from '@module/customer/documents-sent-by-email/dto/response/list-documents-sent-by-email.response.dto';

import type { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import type { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class ListDocumentsSentByEmailUseCase {
  protected readonly _type = ListDocumentsSentByEmailUseCase.name;

  public constructor(
    @Inject(DocumentsSentByEmailQueryRepositoryGateway)
    private readonly documentsSentByEmailQueryRepositoryGateway: DocumentsSentByEmailQueryRepositoryGateway,
  ) {}

  public async execute(
    organizationSessionData: OrganizationSessionDataModel,
    sessionData: SessionDataModel,
    dto: ListDocumentsSentByEmailQueryRequestDto,
  ): Promise<ListDocumentsSentByEmailResponseDto> {
    const page = dto.page;
    const limit = dto.limit;

    const queryResult =
      await this.documentsSentByEmailQueryRepositoryGateway.listDocumentsSentByEmailByOrganizationIdAndAuthIdentityId(
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        new ListDocumentsSentByEmailQueryParamGateway({
          page,
          limit,
          search: dto.search ?? null,
          startDate: dto.startDate ?? null,
          endDate: dto.endDate ?? null,
        }),
      );

    const mapped = queryResult.resource.map((item) => {
      return ListDocumentsSentByEmailItemResponseDto.build({
        emails: this.parseEmails(item.emails),
        subject: item.subject,
        sentAt: item.createdAt,
        sentBy: item.sentBy,
      });
    });

    return ListDocumentsSentByEmailResponseDto.build({
      page: queryResult.page,
      limit: queryResult.limit,
      totalItems: queryResult.totalItems,
      totalPages: queryResult.totalPages,
      amountItemsCurrentPage: mapped.length,
      resource: mapped,
    });
  }

  private parseEmails(value: string): string[] {
    try {
      const parsed = JSON.parse(value) as unknown;
      if (Array.isArray(parsed)) {
        return parsed.map((e) => String(e));
      }
    } catch {
      // Fallback para caso `emails` não esteja como JSON.
    }

    return [value];
  }
}
