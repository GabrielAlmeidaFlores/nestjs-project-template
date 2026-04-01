import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AuthIdentityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/auth-identity.typeorm.entity';
import { SupportTicketMessageTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-ticket-message.typeorm.entity';
import { SupportTicketTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-ticket.typeorm.entity';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { SupportTicketId } from '@module/support/service-desk/domain/schema/entity/support-ticket/value-object/support-ticket-id/support-ticket-id.value-object';
import { SupportTicketMessageEntity } from '@module/support/service-desk/domain/schema/entity/support-ticket-message/support-ticket-message.entity';
import { SupportTicketMessageId } from '@module/support/service-desk/domain/schema/entity/support-ticket-message/value-object/support-ticket-message-id/support-ticket-message-id.value-object';

@Injectable()
export class SupportTicketMessageEntityAutoMapperProfile {
  protected readonly _type = SupportTicketMessageEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: SupportTicketMessageTypeormEntity,
    ): SupportTicketMessageEntity => {
      return new SupportTicketMessageEntity({
        id: new SupportTicketMessageId(source.id),
        supportTicketId: new SupportTicketId(source.supportTicket.id),
        senderAuthIdentityId: new AuthIdentityId(source.senderAuthIdentity.id),
        senderName: source.senderName,
        content: source.content,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      SupportTicketMessageTypeormEntity,
      SupportTicketMessageEntity,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: SupportTicketMessageEntity,
    ): SupportTicketMessageTypeormEntity => {
      const supportTicket = {
        id: source.supportTicketId.toString(),
      } as SupportTicketTypeormEntity;

      const senderAuthIdentity = {
        id: source.senderAuthIdentityId.toString(),
      } as AuthIdentityTypeormEntity;

      return SupportTicketMessageTypeormEntity.build({
        id: source.id.toString(),
        supportTicket,
        senderAuthIdentity,
        senderName: source.senderName,
        content: source.content,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      SupportTicketMessageEntity,
      SupportTicketMessageTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
