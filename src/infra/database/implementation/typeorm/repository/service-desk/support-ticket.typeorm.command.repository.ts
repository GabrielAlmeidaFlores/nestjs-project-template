import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SupportAttendantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-attendant.typeorm.entity';
import { SupportTicketTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-ticket.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { SupportTicketCommandRepositoryGateway } from '@module/customer/service-desk/domain/repository/support-ticket/command/support-ticket.command.repository.gateway';
import { SupportAttendantId } from '@module/customer/service-desk/domain/schema/entity/support-attendant/value-object/support-attendant-id/support-attendant-id.value-object';
import { SupportTicketStatusEnum } from '@module/customer/service-desk/domain/schema/entity/support-ticket/enum/support-ticket-status.enum';
import { SupportTicketEntity } from '@module/customer/service-desk/domain/schema/entity/support-ticket/support-ticket.entity';
import { SupportTicketId } from '@module/customer/service-desk/domain/schema/entity/support-ticket/value-object/support-ticket-id/support-ticket-id.value-object';

@Injectable()
export class SupportTicketTypeormCommandRepository
  extends BaseTypeormCommandRepository<SupportTicketTypeormEntity>
  implements SupportTicketCommandRepositoryGateway
{
  protected readonly _type = SupportTicketTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(SupportTicketTypeormEntity)
    repository: Repository<SupportTicketTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createSupportTicket(props: SupportTicketEntity): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SupportTicketEntity,
      SupportTicketTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateSupportTicketStatus(
    supportTicketId: SupportTicketId,
    status: SupportTicketStatusEnum,
  ): TransactionType {
    return this.update(supportTicketId.toString(), { status });
  }

  public updateSupportTicketStatusAndAssignedAttendant(
    supportTicketId: SupportTicketId,
    status: SupportTicketStatusEnum,
    assignedAttendantId: SupportAttendantId,
  ): TransactionType {
    return this.update(supportTicketId.toString(), {
      status,
      assignedAttendant: {
        id: assignedAttendantId.toString(),
      } as SupportAttendantTypeormEntity,
    });
  }

  public resolveSupportTicket(
    supportTicketId: SupportTicketId,
    assignedAttendantId: SupportAttendantId,
  ): TransactionType {
    return this.update(supportTicketId.toString(), {
      status: SupportTicketStatusEnum.RESOLVED,
      assignedAttendant: {
        id: assignedAttendantId.toString(),
      } as SupportAttendantTypeormEntity,
    });
  }

  public unassignTicketsByAttendantId(
    assignedAttendantId: SupportAttendantId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as {
        query: (sql: string, params: unknown[]) => Promise<unknown>;
      };

      await manager.query(
        `UPDATE support_ticket
         SET status = ?, assigned_attendant_id = NULL
         WHERE assigned_attendant_id = ?
           AND status IN (?, ?)
           AND deleted_at IS NULL`,
        [
          SupportTicketStatusEnum.WAITING,
          assignedAttendantId.toString(),
          SupportTicketStatusEnum.IN_PROGRESS,
          SupportTicketStatusEnum.AWAITING_RESPONSE,
        ],
      );
    };
  }
}
