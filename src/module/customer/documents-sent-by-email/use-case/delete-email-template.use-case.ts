import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { EmailTemplateCommandRepositoryGateway } from '@module/customer/documents-sent-by-email/domain/repository/documents-sent-by-email/email-template/command/email-template.command.repository.gateway';
import { EmailTemplateQueryRepositoryGateway } from '@module/customer/documents-sent-by-email/domain/repository/documents-sent-by-email/email-template/query/email-template.query.repository.gateway';
import { EmailTemplateId } from '@module/customer/documents-sent-by-email/domain/schema/entity/email-template/value-object/email-template-id/email-template-id.value-object';
import { EmailTemplateItemResponseDto } from '@module/customer/documents-sent-by-email/dto/response/email-template-item.response.dto';
import { EmailTemplateNotFoundError } from '@module/customer/documents-sent-by-email/error/email-template-not-found.error';

import type { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import type { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DeleteEmailTemplateUseCase {
  protected readonly _type = DeleteEmailTemplateUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(EmailTemplateCommandRepositoryGateway)
    private readonly emailTemplateCommandRepositoryGateway: EmailTemplateCommandRepositoryGateway,
    @Inject(EmailTemplateQueryRepositoryGateway)
    private readonly emailTemplateQueryRepositoryGateway: EmailTemplateQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
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

    const existing =
      await this.emailTemplateQueryRepositoryGateway.findOneEmailTemplateByIdAndOwnerIdOrFail(
        emailTemplateId,
        organizationMember.id,
        EmailTemplateNotFoundError,
      );

    const transactions: TransactionType[] = [
      this.emailTemplateCommandRepositoryGateway.deleteEmailTemplate(
        emailTemplateId,
      ),
    ];

    const execute =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await execute.commit();

    return EmailTemplateItemResponseDto.build({
      id: existing.id,
      nome: existing.nome,
      descricao: existing.descricao,
      htmlContent: existing.htmlContent,
    });
  }
}
