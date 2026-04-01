import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { SupportTicketMessageTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-ticket-message.typeorm.entity';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { GetSupportTicketMessageQueryResult } from '@module/support/service-desk/domain/repository/support-ticket-message/query/result/get-support-ticket-message.query.result';
import { SupportTicketMessageQueryRepositoryGateway } from '@module/support/service-desk/domain/repository/support-ticket-message/query/support-ticket-message.query.repository.gateway';
import { ListSupportTicketMessagesQueryParamType } from '@module/support/service-desk/domain/repository/support-ticket-message/query/type/input/list-support-ticket-messages.query.param';

@Injectable()
export class SupportTicketMessageTypeormQueryRepository
  extends BaseTypeormQueryRepository<SupportTicketMessageTypeormEntity>
  implements SupportTicketMessageQueryRepositoryGateway
{
  protected readonly _type = SupportTicketMessageTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(SupportTicketMessageTypeormEntity)
    repository: Repository<SupportTicketMessageTypeormEntity>,
  ) {
    super(repository);
  }

  public async listPaginatedBySupportTicketId(
    param: ListSupportTicketMessagesQueryParamType,
  ): Promise<ListDataOutputModel<GetSupportTicketMessageQueryResult>> {
    const maxItemsPerQuery = 100;
    const limit = Math.min(Math.max(param.limit, 1), maxItemsPerQuery);
    const page = Math.max(param.page, 1);
    const skip = (page - 1) * limit;

    const [messages, totalItems] = await this.repository.findAndCount({
      where: {
        supportTicket: {
          id: param.supportTicketId.toString(),
        },
      },
      order: {
        createdAt: 'ASC',
      },
      relations: {
        senderAuthIdentity: true,
      },
      skip,
      take: limit,
    });

    return new ListDataOutputModel<GetSupportTicketMessageQueryResult>({
      page,
      limit,
      totalItems,
      resource: messages.map((message) =>
        GetSupportTicketMessageQueryResult.build({
          senderAuthIdentityId: new AuthIdentityId(
            message.senderAuthIdentity.id,
          ),
          senderName: message.senderName,
          content: message.content,
          createdAt: message.createdAt,
        }),
      ),
    });
  }
}
