import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { EmailTemplateTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/email-template.typeorm.entity';
import { EmailTemplateQueryRepositoryGateway } from '@module/customer/documents-sent-by-email/domain/repository/documents-sent-by-email/email-template/query/email-template.query.repository.gateway';
import { ListEmailTemplatesQueryParamGateway } from '@module/customer/documents-sent-by-email/domain/repository/documents-sent-by-email/email-template/query/param/list-email-templates.query.param.gateway';
import { GetEmailTemplateQueryResult } from '@module/customer/documents-sent-by-email/domain/repository/documents-sent-by-email/email-template/query/result/get-email-template.query.result';

import type { NotFoundError } from '@core/error/not-found.error';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { EmailTemplateId } from '@module/customer/documents-sent-by-email/domain/schema/entity/email-template/value-object/email-template-id/email-template-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class EmailTemplateTypeormQueryRepository
  extends BaseTypeormQueryRepository<EmailTemplateTypeormEntity>
  implements EmailTemplateQueryRepositoryGateway
{
  protected readonly _type = EmailTemplateTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(EmailTemplateTypeormEntity)
    repository: Repository<EmailTemplateTypeormEntity>,
  ) {
    super(repository);
  }

  public async listEmailTemplatesByOwnerId(
    ownerId: OrganizationMemberId,
    listData: ListEmailTemplatesQueryParamGateway,
  ): Promise<ListDataOutputModel<GetEmailTemplateQueryResult>> {
    const page = Math.max(1, listData.page);
    const limit = Math.max(1, listData.limit);

    const [items, totalItems] = await this.repository.findAndCount({
      where: {
        owner: {
          id: ownerId.toString(),
        },
        deletedAt: IsNull(),
      },
      order: {
        updatedAt: 'DESC',
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    const resource = items.map((item) => {
      return GetEmailTemplateQueryResult.build({
        id: item.id,
        nome: item.title,
        descricao: item.description,
        htmlContent: item.htmlContent,
      });
    });

    return new ListDataOutputModel<GetEmailTemplateQueryResult>({
      page,
      limit,
      totalItems,
      resource,
    });
  }

  public async countActiveEmailTemplatesByOwnerId(
    ownerId: OrganizationMemberId,
  ): Promise<number> {
    return await this.repository.count({
      where: {
        owner: { id: ownerId.toString() },
        deletedAt: IsNull(),
      },
    });
  }

  public async findOneEmailTemplateByIdAndOwnerIdOrFail(
    id: EmailTemplateId,
    ownerId: OrganizationMemberId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetEmailTemplateQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          id: id.toString(),
          owner: {
            id: ownerId.toString(),
          },
          deletedAt: IsNull(),
        },
      },
      err,
    );

    return GetEmailTemplateQueryResult.build({
      id: data.id,
      nome: data.title,
      descricao: data.description,
      htmlContent: data.htmlContent,
    });
  }
}
