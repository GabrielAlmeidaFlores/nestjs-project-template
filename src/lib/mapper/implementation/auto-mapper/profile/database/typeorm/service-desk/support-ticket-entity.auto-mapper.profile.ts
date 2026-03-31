import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { SupportAttendantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-attendant.typeorm.entity';
import { SupportTicketTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-ticket.typeorm.entity';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { SupportAttendantId } from '@module/customer/service-desk/domain/schema/entity/support-attendant/value-object/support-attendant-id/support-attendant-id.value-object';
import { SupportTicketEntity } from '@module/customer/service-desk/domain/schema/entity/support-ticket/support-ticket.entity';
import { SupportTicketId } from '@module/customer/service-desk/domain/schema/entity/support-ticket/value-object/support-ticket-id/support-ticket-id.value-object';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';

@Injectable()
export class SupportTicketEntityAutoMapperProfile {
  protected readonly _type = SupportTicketEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: SupportTicketTypeormEntity,
    ): SupportTicketEntity => {
      return new SupportTicketEntity({
        id: new SupportTicketId(source.id),
        organizationId: new OrganizationId(source.organizationId),
        requesterAuthIdentityId: new AuthIdentityId(
          source.requesterAuthIdentityId,
        ),
        requesterEmail: source.requesterEmail,
        requesterName: source.requesterName,
        ticketNumber: source.ticketNumber,
        supportType: source.supportType,
        subject: source.subject,
        problem: source.problem,
        description: source.description,
        status: source.status,
        assignedAttendantId:
          source.assignedAttendant?.id !== undefined
            ? new SupportAttendantId(source.assignedAttendant.id)
            : null,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      SupportTicketTypeormEntity,
      SupportTicketEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: SupportTicketEntity,
    ): SupportTicketTypeormEntity => {
      return SupportTicketTypeormEntity.build({
        id: source.id.toString(),
        organizationId: source.organizationId.toString(),
        requesterAuthIdentityId: source.requesterAuthIdentityId.toString(),
        requesterEmail: source.requesterEmail,
        requesterName: source.requesterName,
        ticketNumber: source.ticketNumber,
        supportType: source.supportType,
        subject: source.subject,
        problem: source.problem,
        description: source.description,
        status: source.status,
        ...(source.assignedAttendantId !== null && {
          assignedAttendant: {
            id: source.assignedAttendantId.toString(),
          } as SupportAttendantTypeormEntity,
        }),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      SupportTicketEntity,
      SupportTicketTypeormEntity,
      constructUsing(convert),
    );
  }
}
