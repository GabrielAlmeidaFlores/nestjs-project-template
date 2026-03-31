import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Between,
  FindOptionsWhere,
  LessThanOrEqual,
  Like,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';

import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { SupportTicketTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-ticket.typeorm.entity';
import { GetSupportTicketAttachmentQueryResult } from '@module/support/service-desk/domain/repository/support-ticket/query/result/get-support-ticket-attachment.query.result';
import { GetSupportTicketQueryResult } from '@module/support/service-desk/domain/repository/support-ticket/query/result/get-support-ticket.query.result';
import { SupportTicketQueryRepositoryGateway } from '@module/support/service-desk/domain/repository/support-ticket/query/support-ticket.query.repository.gateway';
import { ListSupportTicketsQueryParamType } from '@module/support/service-desk/domain/repository/support-ticket/query/type/input/list-support-tickets.query.param';
import { SupportTicketId } from '@module/support/service-desk/domain/schema/entity/support-ticket/value-object/support-ticket-id/support-ticket-id.value-object';
import { SupportTypeEnum } from '@shared/system/enum/support-type.enum';

@Injectable()
export class SupportTicketTypeormQueryRepository
  extends BaseTypeormQueryRepository<SupportTicketTypeormEntity>
  implements SupportTicketQueryRepositoryGateway
{
  protected readonly _type = SupportTicketTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(SupportTicketTypeormEntity)
    repository: Repository<SupportTicketTypeormEntity>,
  ) {
    super(repository);
  }

  public async listPaginated(
    param: ListSupportTicketsQueryParamType,
  ): Promise<ListDataOutputModel<GetSupportTicketQueryResult>> {
    const maxItemsPerQuery = 100;
    const limit = Math.min(Math.max(param.limit, 1), maxItemsPerQuery);
    const page = Math.max(param.page, 1);
    const skip = (page - 1) * limit;

    const baseWhere: FindOptionsWhere<SupportTicketTypeormEntity> = {
      supportType: param.supportType,
    };

    if (param.status !== null) {
      baseWhere.status = param.status;
    }

    if (param.startDate !== null && param.endDate !== null) {
      baseWhere.createdAt = Between(param.startDate, param.endDate);
    } else if (param.startDate !== null) {
      baseWhere.createdAt = MoreThanOrEqual(param.startDate);
    } else if (param.endDate !== null) {
      baseWhere.createdAt = LessThanOrEqual(param.endDate);
    }

    const search = (param.search ?? '').trim();
    const where:
      | FindOptionsWhere<SupportTicketTypeormEntity>
      | FindOptionsWhere<SupportTicketTypeormEntity>[] =
      search !== ''
        ? [
            { ...baseWhere, ticketNumber: Like(`%${search}%`) },
            { ...baseWhere, requesterName: Like(`%${search}%`) },
            { ...baseWhere, requesterEmail: Like(`%${search}%`) },
          ]
        : baseWhere;

    const [items, totalItems] = await this.repository.findAndCount({
      where,
      order: { createdAt: 'DESC' },
      skip,
      take: limit,
    });

    return new ListDataOutputModel<GetSupportTicketQueryResult>({
      page,
      limit,
      totalItems,
      resource: items.map((item) => this.mapToQueryResult(item)),
    });
  }

  public async findOneByIdAndSupportType(
    supportTicketId: SupportTicketId,
    supportType: SupportTypeEnum,
  ): Promise<GetSupportTicketQueryResult | null> {
    const supportTicket = await this.findOne({
      where: {
        id: supportTicketId.toString(),
        supportType,
      },
    });

    if (supportTicket === null) {
      return null;
    }

    return this.mapToQueryResult(supportTicket);
  }

  public async findOneByIdAndSupportTypeWithAttachments(
    supportTicketId: SupportTicketId,
    supportType: SupportTypeEnum,
  ): Promise<GetSupportTicketQueryResult | null> {
    const supportTicket = await this.findOne({
      where: {
        id: supportTicketId.toString(),
        supportType,
      },
      relations: {
        attachments: true,
      },
    });

    if (supportTicket === null) {
      return null;
    }

    return this.mapToQueryResult(supportTicket);
  }

  private mapToQueryResult(
    supportTicket: SupportTicketTypeormEntity,
  ): GetSupportTicketQueryResult {
    return GetSupportTicketQueryResult.build({
      id: new SupportTicketId(supportTicket.id),
      ticketNumber: supportTicket.ticketNumber,
      supportType: supportTicket.supportType,
      requesterName: supportTicket.requesterName,
      requesterEmail: supportTicket.requesterEmail,
      subject: supportTicket.subject,
      problem: supportTicket.problem,
      description: supportTicket.description,
      status: supportTicket.status,
      createdAt: supportTicket.createdAt,
      updatedAt: supportTicket.updatedAt,
      attachments:
        supportTicket.attachments?.map((attachment) =>
          GetSupportTicketAttachmentQueryResult.build({
            bucketKey: attachment.bucketKey,
            originalFileName: attachment.originalFileName,
          }),
        ) ?? null,
    });
  }
}
