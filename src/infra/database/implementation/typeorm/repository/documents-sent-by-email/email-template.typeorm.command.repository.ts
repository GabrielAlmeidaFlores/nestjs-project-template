import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { EmailTemplateTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/email-template.typeorm.entity';
import { EmailTemplateCommandRepositoryGateway } from '@module/customer/documents-sent-by-email/domain/repository/documents-sent-by-email/email-template/command/email-template.command.repository.gateway';

import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { EmailTemplateEntity } from '@module/customer/documents-sent-by-email/domain/schema/entity/email-template/email-template.entity';
import type { EmailTemplateId } from '@module/customer/documents-sent-by-email/domain/schema/entity/email-template/value-object/email-template-id/email-template-id.value-object';
import type { Repository } from 'typeorm';

@Injectable()
export class EmailTemplateTypeormCommandRepository
  extends BaseTypeormCommandRepository<EmailTemplateTypeormEntity>
  implements EmailTemplateCommandRepositoryGateway
{
  protected readonly _type = EmailTemplateTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(EmailTemplateTypeormEntity)
    repository: Repository<EmailTemplateTypeormEntity>,
  ) {
    super(repository);
  }

  public createEmailTemplate(props: EmailTemplateEntity): TransactionType {
    return this.create({
      id: props.id.toString(),
      owner: { id: props.owner.toString() },
      title: props.title,
      description: props.description,
      htmlContent: props.htmlContent,
    });
  }

  public updateEmailTemplate(
    id: EmailTemplateId,
    props: EmailTemplateEntity,
  ): TransactionType {
    return this.update(id.toString(), {
      title: props.title,
      description: props.description,
      htmlContent: props.htmlContent,
    });
  }

  public deleteEmailTemplate(id: EmailTemplateId): TransactionType {
    return this.delete(id.toString());
  }
}
