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
import { SupportAttendantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-attendant.typeorm.entity';
import { SupportTicketTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-ticket.typeorm.entity';
import { SupportAccountNotFoundError } from '@module/support/account/error/support-account-not-found.error';
import { ListSupportTicketsRequestDto } from '@module/support/service-desk/dto/request/list-support-tickets.request.dto';
import { ListSupportTicketsResponseDto } from '@module/support/service-desk/dto/response/list-support-tickets.response.dto';
import { SupportTicketItemResponseDto } from '@module/support/service-desk/dto/response/support-ticket-item.response.dto';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class ListSupportTicketsUseCase {
  protected readonly _type = ListSupportTicketsUseCase.name;

  public constructor(
    @InjectRepository(SupportAttendantTypeormEntity)
    private readonly supportAttendantRepository: Repository<SupportAttendantTypeormEntity>,
    @InjectRepository(SupportTicketTypeormEntity)
    private readonly supportTicketRepository: Repository<SupportTicketTypeormEntity>,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    dto: ListSupportTicketsRequestDto,
  ): Promise<ListSupportTicketsResponseDto> {
    const page = dto.page;
    const limit = dto.limit;
    const skip = (page - 1) * limit;

    const { startDate, endDate } = this.normalizeDateRange(
      dto.startDate,
      dto.endDate,
    );
    const search = dto.search?.trim();
    const baseWhere: FindOptionsWhere<SupportTicketTypeormEntity> = {};
    const supportAttendant = await this.supportAttendantRepository.findOne({
      where: {
        authIdentity: {
          id: sessionData.authIdentityId.toString(),
        },
      },
      relations: {
        authIdentity: true,
      },
    });

    if (!supportAttendant) {
      throw new SupportAccountNotFoundError();
    }

    baseWhere.supportType = supportAttendant.supportType;

    if (dto.status !== undefined) {
      baseWhere.status = dto.status;
    }

    if (startDate && endDate) {
      baseWhere.createdAt = Between(startDate, endDate);
    } else if (startDate) {
      baseWhere.createdAt = MoreThanOrEqual(startDate);
    } else if (endDate) {
      baseWhere.createdAt = LessThanOrEqual(endDate);
    }

    const hasSearch = search !== undefined && search !== '';

    const where = hasSearch
      ? [
          { ...baseWhere, ticketNumber: Like(`%${search}%`) },
          { ...baseWhere, requesterName: Like(`%${search}%`) },
          { ...baseWhere, requesterEmail: Like(`%${search}%`) },
        ]
      : baseWhere;

    const [tickets, totalItems] =
      await this.supportTicketRepository.findAndCount({
        where,
        order: {
          createdAt: 'DESC',
        },
        skip,
        take: limit,
      });

    const resource = tickets.map((ticket) =>
      SupportTicketItemResponseDto.build({
        ticketNumber: ticket.ticketNumber,
        requesterName: ticket.requesterName,
        requesterEmail: ticket.requesterEmail,
        subject: ticket.subject,
        requestDate: ticket.createdAt,
        status: ticket.status,
      }),
    );

    const listResult = new ListDataOutputModel<SupportTicketItemResponseDto>({
      page,
      limit,
      totalItems,
      resource,
    });

    return ListSupportTicketsResponseDto.build({
      page: listResult.page,
      limit: listResult.limit,
      totalItems: listResult.totalItems,
      totalPages: listResult.totalPages,
      amountItemsCurrentPage: listResult.amountItemsCurrentPage,
      resource: listResult.resource,
    });
  }

  private normalizeDateRange(
    start?: Date,
    end?: Date,
  ): { startDate: Date | null; endDate: Date | null } {
    let startDate: Date | null = null;
    let endDate: Date | null = null;

    if (start instanceof Date && !Number.isNaN(start.getTime())) {
      startDate = new Date(
        start.toISOString().split('T')[0] + 'T00:00:00.000Z',
      );
    }

    if (end instanceof Date && !Number.isNaN(end.getTime())) {
      endDate = new Date(end.toISOString().split('T')[0] + 'T23:59:59.999Z');
    }

    return { startDate, endDate };
  }
}
