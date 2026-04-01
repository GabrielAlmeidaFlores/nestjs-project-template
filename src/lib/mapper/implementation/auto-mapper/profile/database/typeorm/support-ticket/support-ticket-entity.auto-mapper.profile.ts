import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AuthIdentityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/auth-identity.typeorm.entity';
import { OrganizationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization.typeorm.entity';
import { SupportAttendantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-attendant.typeorm.entity';
import { SupportTicketTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-ticket.typeorm.entity';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { SupportAttendantId } from '@module/support/account/domain/schema/entity/support-attendant/value-object/support-attendant-id/support-attendant-id.value-object';
import { SupportTicketEntity } from '@module/support/service-desk/domain/schema/entity/support-ticket/support-ticket.entity';
import { SupportTicketId } from '@module/support/service-desk/domain/schema/entity/support-ticket/value-object/support-ticket-id/support-ticket-id.value-object';
import { SupportTicketNumber } from '@module/support/service-desk/domain/schema/entity/support-ticket/value-object/support-ticket-number/support-ticket-number.value-object';

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
    const convertOrmEntityToDomainEntity = (
      source: SupportTicketTypeormEntity,
    ): SupportTicketEntity => {
      return new SupportTicketEntity({
        id: new SupportTicketId(source.id),
        ticketNumber: new SupportTicketNumber(source.ticketNumber),
        organizationId: new OrganizationId(source.organization.id),
        requesterAuthIdentityId: new AuthIdentityId(
          source.requesterAuthIdentity.id,
        ),
        requesterEmail: source.requesterEmail,
        requesterName: source.requesterName,
        supportType: source.supportType,
        subject: source.subject,
        problem: source.problem,
        description: source.description,
        status: source.status,
        assignedAttendantId: source.assignedAttendant
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
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: SupportTicketEntity,
    ): SupportTicketTypeormEntity => {
      const organization = {
        id: source.organizationId.toString(),
      } as OrganizationTypeormEntity;

      const requesterAuthIdentity = {
        id: source.requesterAuthIdentityId.toString(),
      } as AuthIdentityTypeormEntity;

      const assignedAttendant = source.assignedAttendantId
        ? ({
            id: source.assignedAttendantId.toString(),
          } as SupportAttendantTypeormEntity)
        : undefined;

      return SupportTicketTypeormEntity.build({
        id: source.id.toString(),
        ticketNumber: source.ticketNumber.toString(),
        organization,
        requesterAuthIdentity,
        requesterEmail: source.requesterEmail,
        requesterName: source.requesterName,
        supportType: source.supportType,
        subject: source.subject,
        problem: source.problem,
        description: source.description,
        status: source.status,
        assignedAttendant,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      SupportTicketEntity,
      SupportTicketTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
