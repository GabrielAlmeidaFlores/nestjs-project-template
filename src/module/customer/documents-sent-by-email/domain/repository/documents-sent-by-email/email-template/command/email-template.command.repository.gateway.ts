import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { EmailTemplateEntity } from '@module/customer/documents-sent-by-email/domain/schema/entity/email-template/email-template.entity';
import type { EmailTemplateId } from '@module/customer/documents-sent-by-email/domain/schema/entity/email-template/value-object/email-template-id/email-template-id.value-object';

export abstract class EmailTemplateCommandRepositoryGateway {
  public abstract createEmailTemplate(
    props: EmailTemplateEntity,
  ): TransactionType;

  public abstract updateEmailTemplate(
    id: EmailTemplateId,
    props: EmailTemplateEntity,
  ): TransactionType;

  public abstract deleteEmailTemplate(id: EmailTemplateId): TransactionType;
}
