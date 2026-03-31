import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { SupportAttendantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-attendant.typeorm.entity';
import { SupportTicketAttachmentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-ticket-attachment.typeorm.entity';
import { SupportTicketMessageTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-ticket-message.typeorm.entity';
import { SupportTicketTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-ticket.typeorm.entity';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { ListAdminSupportTicketsQueryParam } from '@module/customer/service-desk/domain/repository/support-ticket/query/param/list-admin-support-tickets.query.param';
import { ListSupportTicketsQueryParam } from '@module/customer/service-desk/domain/repository/support-ticket/query/param/list-support-tickets.query.param';
import { GetSupportTicketDetailAttachmentQueryResult } from '@module/customer/service-desk/domain/repository/support-ticket/query/result/get-support-ticket-detail-attachment.query.result';
import { GetSupportTicketDetailMessageQueryResult } from '@module/customer/service-desk/domain/repository/support-ticket/query/result/get-support-ticket-detail-message.query.result';
import { GetSupportTicketDetailQueryResult } from '@module/customer/service-desk/domain/repository/support-ticket/query/result/get-support-ticket-detail.query.result';
import { GetSupportTicketListItemQueryResult } from '@module/customer/service-desk/domain/repository/support-ticket/query/result/get-support-ticket-list-item.query.result';
import { SupportTicketQueryRepositoryGateway } from '@module/customer/service-desk/domain/repository/support-ticket/query/support-ticket.query.repository.gateway';
import { SupportAttendantId } from '@module/customer/service-desk/domain/schema/entity/support-attendant/value-object/support-attendant-id/support-attendant-id.value-object';
import { SupportTicketId } from '@module/customer/service-desk/domain/schema/entity/support-ticket/value-object/support-ticket-id/support-ticket-id.value-object';
import { SupportTicketAttachmentId } from '@module/customer/service-desk/domain/schema/entity/support-ticket-attachment/value-object/support-ticket-attachment-id/support-ticket-attachment-id.value-object';
import { SupportTicketMessageId } from '@module/customer/service-desk/domain/schema/entity/support-ticket-message/value-object/support-ticket-message-id/support-ticket-message-id.value-object';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';

@Injectable()
export class SupportTicketTypeormQueryRepository
  extends BaseTypeormQueryRepository<SupportTicketTypeormEntity>
  implements SupportTicketQueryRepositoryGateway
{
  protected readonly _type = SupportTicketTypeormQueryRepository.name;

  private readonly attachmentRepository: Repository<SupportTicketAttachmentTypeormEntity>;
  private readonly messageRepository: Repository<SupportTicketMessageTypeormEntity>;

  public constructor(
    @InjectRepository(SupportTicketTypeormEntity)
    repository: Repository<SupportTicketTypeormEntity>,
    @InjectRepository(SupportTicketAttachmentTypeormEntity)
    attachmentRepository: Repository<SupportTicketAttachmentTypeormEntity>,
    @InjectRepository(SupportTicketMessageTypeormEntity)
    messageRepository: Repository<SupportTicketMessageTypeormEntity>,
  ) {
    super(repository);
    this.attachmentRepository = attachmentRepository;
    this.messageRepository = messageRepository;
  }

  public async findOneSupportTicketById(
    id: SupportTicketId,
  ): Promise<GetSupportTicketDetailQueryResult | null> {
    const ticket = await this.findOne({
      where: { id: id.toString() },
      relations: { assignedAttendant: true },
    });

    if (!ticket) {
      return null;
    }

    return this.buildDetailResult(ticket);
  }

  public async listSupportTicketsByOrganizationId(
    organizationId: OrganizationId,
    param: ListSupportTicketsQueryParam,
  ): Promise<ListDataOutputModel<GetSupportTicketListItemQueryResult>> {
    return this.buildListQuery(organizationId.toString(), null, param);
  }

  public async listSupportTicketsByRequester(
    organizationId: OrganizationId,
    requesterAuthIdentityId: AuthIdentityId,
    param: ListSupportTicketsQueryParam,
  ): Promise<ListDataOutputModel<GetSupportTicketListItemQueryResult>> {
    return this.buildListQuery(
      organizationId.toString(),
      requesterAuthIdentityId.toString(),
      param,
    );
  }

  public async listSupportTicketsForAdmin(
    param: ListAdminSupportTicketsQueryParam,
  ): Promise<ListDataOutputModel<GetSupportTicketListItemQueryResult>> {
    return this.buildAdminListQuery(param);
  }

  public async countAllSupportTicketsByOrganizationId(
    organizationId: OrganizationId,
  ): Promise<number> {
    return this.count({
      where: { organizationId: organizationId.toString() },
      withDeleted: true,
    });
  }

  private async buildListQuery(
    organizationId: string,
    requesterAuthIdentityId: string | null,
    param: ListSupportTicketsQueryParam,
  ): Promise<ListDataOutputModel<GetSupportTicketListItemQueryResult>> {
    const queryBuilder = this.repository
      .createQueryBuilder('st')
      .leftJoin(
        SupportAttendantTypeormEntity,
        'sa',
        'sa.id = st.assigned_attendant_id',
      )
      .addSelect(['sa.name'])
      .where('st.organization_id = :organizationId', { organizationId })
      .andWhere('st.deleted_at IS NULL');

    if (requesterAuthIdentityId !== null) {
      queryBuilder.andWhere(
        'st.requester_auth_identity_id = :requesterAuthIdentityId',
        { requesterAuthIdentityId },
      );
    }

    if (param.status !== null) {
      queryBuilder.andWhere('st.status = :status', {
        status: param.status,
      });
    }

    if (param.supportType !== null) {
      queryBuilder.andWhere('st.support_type = :supportType', {
        supportType: param.supportType,
      });
    }

    if (param.ticketNumber !== null) {
      queryBuilder.andWhere('st.ticket_number LIKE :ticketNumber', {
        ticketNumber: `%${param.ticketNumber}%`,
      });
    }

    if (param.from !== null) {
      queryBuilder.andWhere('st.created_at >= :from', { from: param.from });
    }

    if (param.to !== null) {
      queryBuilder.andWhere('st.created_at <= :to', { to: param.to });
    }

    const maxItemsPerQuery = 100;
    const limit = Math.min(Math.max(param.limit, 1), maxItemsPerQuery);
    const page = Math.max(param.page, 1);
    const skip = (page - 1) * limit;

    queryBuilder.orderBy('st.createdAt', 'DESC').skip(skip).take(limit);

    const [rawAndEntities, totalItems] = await Promise.all([
      queryBuilder.getRawAndEntities(),
      queryBuilder.getCount(),
    ]);

    const resource = rawAndEntities.entities.map((entity, index) => {
      const rawRow = rawAndEntities.raw[index] as
        | { sa_name: string | null }
        | undefined;

      return GetSupportTicketListItemQueryResult.build({
        id: new SupportTicketId(entity.id),
        ticketNumber: entity.ticketNumber,
        requesterEmail: entity.requesterEmail,
        requesterName: entity.requesterName,
        subject: entity.subject,
        supportType: entity.supportType,
        status: entity.status,
        assignedAttendantName: rawRow?.sa_name ?? null,
        createdAt: entity.createdAt,
      });
    });

    return new ListDataOutputModel({
      page,
      limit,
      totalItems,
      resource,
    });
  }

  private async buildDetailResult(
    ticket: SupportTicketTypeormEntity,
  ): Promise<GetSupportTicketDetailQueryResult> {
    const [attachments, messages] = await Promise.all([
      this.attachmentRepository.find({
        where: { supportTicket: { id: ticket.id } },
      }),
      this.messageRepository.find({
        where: { supportTicket: { id: ticket.id } },
        order: { createdAt: 'ASC' },
      }),
    ]);

    const attachmentResults = attachments.map((a) =>
      GetSupportTicketDetailAttachmentQueryResult.build({
        id: new SupportTicketAttachmentId(a.id),
        originalFileName: a.originalFileName,
        bucketKey: a.bucketKey,
      }),
    );

    const messageResults = messages.map((m) =>
      GetSupportTicketDetailMessageQueryResult.build({
        id: new SupportTicketMessageId(m.id),
        senderName: m.senderName,
        senderType: m.senderType,
        content: m.content,
        createdAt: m.createdAt,
      }),
    );

    const attendant = ticket.assignedAttendant as
      | SupportAttendantTypeormEntity
      | null
      | undefined;

    return GetSupportTicketDetailQueryResult.build({
      id: new SupportTicketId(ticket.id),
      organizationId: new OrganizationId(ticket.organizationId),
      requesterAuthIdentityId: new AuthIdentityId(
        ticket.requesterAuthIdentityId,
      ),
      ticketNumber: ticket.ticketNumber,
      requesterEmail: ticket.requesterEmail,
      requesterName: ticket.requesterName,
      subject: ticket.subject,
      supportType: ticket.supportType,
      problem: ticket.problem,
      description: ticket.description,
      status: ticket.status,
      assignedAttendantId:
        ticket.assignedAttendant?.id !== undefined
          ? new SupportAttendantId(ticket.assignedAttendant.id)
          : null,
      assignedAttendantName: attendant?.name ?? null,
      createdAt: ticket.createdAt,
      attachments: attachmentResults,
      messages: messageResults,
    });
  }

  private async buildAdminListQuery(
    param: ListAdminSupportTicketsQueryParam,
  ): Promise<ListDataOutputModel<GetSupportTicketListItemQueryResult>> {
    const queryBuilder = this.repository
      .createQueryBuilder('st')
      .leftJoin(
        SupportAttendantTypeormEntity,
        'sa',
        'sa.id = st.assigned_attendant_id',
      )
      .addSelect(['sa.name'])
      .where('st.deleted_at IS NULL');

    if (param.assignedAttendantId !== null) {
      queryBuilder.andWhere('st.assigned_attendant_id = :attendantId', {
        attendantId: param.assignedAttendantId.toString(),
      });
    }

    if (param.status !== null) {
      queryBuilder.andWhere('st.status = :status', { status: param.status });
    }

    if (param.supportType !== null) {
      queryBuilder.andWhere('st.support_type = :supportType', {
        supportType: param.supportType,
      });
    }

    if (param.ticketNumber !== null && param.search === null) {
      queryBuilder.andWhere('st.ticket_number LIKE :ticketNumber', {
        ticketNumber: `%${param.ticketNumber}%`,
      });
    }

    if (param.search !== null) {
      queryBuilder.andWhere(
        '(st.requester_name LIKE :search OR st.requester_email LIKE :search OR sa.name LIKE :search OR st.ticket_number LIKE :search)',
        { search: `%${param.search}%` },
      );
    }

    if (param.from !== null) {
      queryBuilder.andWhere('st.created_at >= :from', { from: param.from });
    }

    if (param.to !== null) {
      queryBuilder.andWhere('st.created_at <= :to', { to: param.to });
    }

    const maxItemsPerQuery = 100;
    const limit = Math.min(Math.max(param.limit, 1), maxItemsPerQuery);
    const page = Math.max(param.page, 1);
    const skip = (page - 1) * limit;

    queryBuilder.orderBy('st.createdAt', 'DESC').skip(skip).take(limit);

    const [rawAndEntities, totalItems] = await Promise.all([
      queryBuilder.getRawAndEntities(),
      queryBuilder.getCount(),
    ]);

    const resource = rawAndEntities.entities.map((entity, index) => {
      const rawRow = rawAndEntities.raw[index] as
        | { sa_name: string | null }
        | undefined;

      return GetSupportTicketListItemQueryResult.build({
        id: new SupportTicketId(entity.id),
        ticketNumber: entity.ticketNumber,
        requesterEmail: entity.requesterEmail,
        requesterName: entity.requesterName,
        subject: entity.subject,
        supportType: entity.supportType,
        status: entity.status,
        assignedAttendantName: rawRow?.sa_name ?? null,
        createdAt: entity.createdAt,
      });
    });

    return new ListDataOutputModel({
      page,
      limit,
      totalItems,
      resource,
    });
  }
}
