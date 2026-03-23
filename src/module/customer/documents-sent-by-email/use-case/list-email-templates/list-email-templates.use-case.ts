import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { EmailTemplateQueryRepositoryGateway } from '@module/customer/documents-sent-by-email/domain/repository/documents-sent-by-email/email-template/query/email-template.query.repository.gateway';
import { ListEmailTemplatesQueryParamGateway } from '@module/customer/documents-sent-by-email/domain/repository/documents-sent-by-email/email-template/query/param/list-email-templates.query.param.gateway';
import { ListEmailTemplatesQueryRequestDto } from '@module/customer/documents-sent-by-email/dto/request/list-email-templates.query.request.dto';
import { EmailTemplateItemResponseDto } from '@module/customer/documents-sent-by-email/dto/response/email-template-item.response.dto';
import { ListEmailTemplatesResponseDto } from '@module/customer/documents-sent-by-email/dto/response/list-email-templates.response.dto';

import type { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import type { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class ListEmailTemplatesUseCase {
  protected readonly _type = ListEmailTemplatesUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(EmailTemplateQueryRepositoryGateway)
    private readonly emailTemplateQueryRepositoryGateway: EmailTemplateQueryRepositoryGateway,
  ) {}

  public async execute(
    organizationSessionData: OrganizationSessionDataModel,
    sessionData: SessionDataModel,
    dto: ListEmailTemplatesQueryRequestDto,
  ): Promise<ListEmailTemplatesResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const queryResult =
      await this.emailTemplateQueryRepositoryGateway.listEmailTemplatesByOwnerId(
        organizationMember.id,
        new ListEmailTemplatesQueryParamGateway({
          page: dto.page,
          limit: dto.limit,
        }),
      );

    const mapped = queryResult.resource.map((item) => {
      return EmailTemplateItemResponseDto.build({
        id: item.id,
        nome: item.nome,
        descricao: item.descricao,
        htmlContent: item.htmlContent,
      });
    });

    return ListEmailTemplatesResponseDto.build({
      page: queryResult.page,
      limit: queryResult.limit,
      totalItems: queryResult.totalItems,
      totalPages: queryResult.totalPages,
      amountItemsCurrentPage: mapped.length,
      resource: mapped,
    });
  }
}
