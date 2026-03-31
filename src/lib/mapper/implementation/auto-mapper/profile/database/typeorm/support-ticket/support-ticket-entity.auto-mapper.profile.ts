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
    ): SupportTicketEntity =>
      new SupportTicketEntity({
        ...source,
        id: new SupportTicketId(source.id),
        organizationId: new OrganizationId(source.organization.id),
        requesterAuthIdentityId: new AuthIdentityId(
          source.requesterAuthIdentity.id,
        ),
        assignedAttendantId: source.assignedAttendant
          ? new SupportAttendantId(source.assignedAttendant.id)
          : null,
      });

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
        ...source,
        id: source.id.toString(),
        organization,
        requesterAuthIdentity,
        assignedAttendant,
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
