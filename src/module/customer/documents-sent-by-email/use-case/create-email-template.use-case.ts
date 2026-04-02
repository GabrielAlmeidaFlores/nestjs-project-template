import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { EmailTemplateCommandRepositoryGateway } from '@module/customer/documents-sent-by-email/domain/repository/documents-sent-by-email/email-template/command/email-template.command.repository.gateway';
import { EmailTemplateQueryRepositoryGateway } from '@module/customer/documents-sent-by-email/domain/repository/documents-sent-by-email/email-template/query/email-template.query.repository.gateway';
import { EmailTemplateEntity } from '@module/customer/documents-sent-by-email/domain/schema/entity/email-template/email-template.entity';
import { CreateEmailTemplateRequestDto } from '@module/customer/documents-sent-by-email/dto/request/create-email-template.request.dto';
import { EmailTemplateItemResponseDto } from '@module/customer/documents-sent-by-email/dto/response/email-template-item.response.dto';
import { EmailTemplateNotFoundError } from '@module/customer/documents-sent-by-email/error/email-template-not-found.error';
import { MaxEmailTemplatesReachedError } from '@module/customer/documents-sent-by-email/error/max-email-templates-reached.error';

import type { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import type { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateEmailTemplateUseCase {
  protected readonly _type = CreateEmailTemplateUseCase.name;

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
    dto: CreateEmailTemplateRequestDto,
  ): Promise<EmailTemplateItemResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const MAX_TEMPLATES = 5;
    const activeCount =
      await this.emailTemplateQueryRepositoryGateway.countActiveEmailTemplatesByOwnerId(
        organizationMember.id,
      );

    if (activeCount >= MAX_TEMPLATES) {
      throw new MaxEmailTemplatesReachedError({ maxTemplates: MAX_TEMPLATES });
    }

    const emailTemplate = new EmailTemplateEntity({
      owner: organizationMember.id,
      title: dto.nome,
      description: dto.descricao,
      htmlContent: dto.htmlContent,
    });

    const transactions: TransactionType[] = [
      this.emailTemplateCommandRepositoryGateway.createEmailTemplate(
        emailTemplate,
      ),
    ];

    const execute =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await execute.commit();

    const created =
      await this.emailTemplateQueryRepositoryGateway.findOneEmailTemplateByIdAndOwnerIdOrFail(
        emailTemplate.id,
        organizationMember.id,
        EmailTemplateNotFoundError,
      );

    return EmailTemplateItemResponseDto.build({
      id: created.id,
      nome: created.nome,
      descricao: created.descricao,
      htmlContent: created.htmlContent,
    });
  }
}
