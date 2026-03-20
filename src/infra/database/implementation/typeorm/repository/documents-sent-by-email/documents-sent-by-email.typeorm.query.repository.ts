import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Between,
  Like,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';

import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { CustomerEmailSentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer-email-sent.typeorm.entity';
import { DocumentsSentByEmailQueryRepositoryGateway } from '@module/customer/documents-sent-by-email/domain/repository/documents-sent-by-email/query/documents-sent-by-email.query.repository.gateway';
import { ListDocumentsSentByEmailQueryParamGateway } from '@module/customer/documents-sent-by-email/domain/repository/documents-sent-by-email/query/param/list-documents-sent-by-email.query.param.gateway';
import { GetDocumentsSentByEmailQueryResult } from '@module/customer/documents-sent-by-email/domain/repository/documents-sent-by-email/query/result/get-documents-sent-by-email.query.result';

import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';

@Injectable()
export class DocumentsSentByEmailTypeormQueryRepository
  extends BaseTypeormQueryRepository<CustomerEmailSentTypeormEntity>
  implements DocumentsSentByEmailQueryRepositoryGateway
{
  protected readonly _type = DocumentsSentByEmailTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(CustomerEmailSentTypeormEntity)
    repository: Repository<CustomerEmailSentTypeormEntity>,
  ) {
    super(repository);
  }

  public async listDocumentsSentByEmailByOrganizationIdAndAuthIdentityId(
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    listData: ListDocumentsSentByEmailQueryParamGateway,
  ): Promise<ListDataOutputModel<GetDocumentsSentByEmailQueryResult>> {
    const page = Math.max(1, listData.page);
    const limit = Math.max(1, listData.limit);

    const filters = {
      search: listData.search ?? null,
      startDate: listData.startDate instanceof Date ? listData.startDate : null,
      endDate: listData.endDate instanceof Date ? listData.endDate : null,
    };

    const createdAtWhere =
      filters.startDate && filters.endDate
        ? Between(filters.startDate, filters.endDate)
        : filters.startDate
          ? MoreThanOrEqual(filters.startDate)
          : filters.endDate
            ? LessThanOrEqual(filters.endDate)
            : undefined;

    const sentByWhere = {
      sentBy: {
        organization: {
          id: organizationId.toString(),
        },
        customer: {
          authIdentity: {
            id: authIdentityId.toString(),
          },
        },
      },
    };

    let where = {};
    const baseWhere = {
      ...sentByWhere,
      ...(createdAtWhere ? { createdAt: createdAtWhere } : {}),
    };

    if (filters.search === null) {
      where = baseWhere;
    }

    if (filters.search !== null) {
      where = [
        {
          ...baseWhere,
          subject: Like(`%${filters.search}%`),
        },
        {
          ...baseWhere,
          emails: Like(`%${filters.search}%`),
        },
      ];
    }

    const [items, totalItems] = await this.repository.findAndCount({
      where,
      relations: {
        sentBy: {
          organization: true,
          customer: {
            authIdentity: true,
          },
        },
      },
      order: {
        createdAt: 'DESC',
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    const resource = items.map((item) => {
      return GetDocumentsSentByEmailQueryResult.build({
        emails: item.emails,
        subject: item.subject,
        createdAt: item.createdAt,
        sentBy: item.sentBy?.customer?.authIdentity?.email ?? '',
      });
    });

    return new ListDataOutputModel<GetDocumentsSentByEmailQueryResult>({
      page,
      limit,
      totalItems,
      resource,
    });
  }
}
