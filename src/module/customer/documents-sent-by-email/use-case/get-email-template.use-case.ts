import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { EmailTemplateQueryRepositoryGateway } from '@module/customer/documents-sent-by-email/domain/repository/documents-sent-by-email/email-template/query/email-template.query.repository.gateway';
import { EmailTemplateId } from '@module/customer/documents-sent-by-email/domain/schema/entity/email-template/value-object/email-template-id/email-template-id.value-object';
import { EmailTemplateItemResponseDto } from '@module/customer/documents-sent-by-email/dto/response/email-template-item.response.dto';
import { EmailTemplateNotFoundError } from '@module/customer/documents-sent-by-email/error/email-template-not-found.error';

import type { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import type { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetEmailTemplateUseCase {
  protected readonly _type = GetEmailTemplateUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(EmailTemplateQueryRepositoryGateway)
    private readonly emailTemplateQueryRepositoryGateway: EmailTemplateQueryRepositoryGateway,
  ) {}

  public async execute(
    organizationSessionData: OrganizationSessionDataModel,
    sessionData: SessionDataModel,
    emailTemplateId: EmailTemplateId,
  ): Promise<EmailTemplateItemResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const template =
      await this.emailTemplateQueryRepositoryGateway.findOneEmailTemplateByIdAndOwnerIdOrFail(
        emailTemplateId,
        organizationMember.id,
        EmailTemplateNotFoundError,
      );

    return EmailTemplateItemResponseDto.build({
      id: template.id,
      nome: template.nome,
      descricao: template.descricao,
      htmlContent: template.htmlContent,
    });
  }
}
