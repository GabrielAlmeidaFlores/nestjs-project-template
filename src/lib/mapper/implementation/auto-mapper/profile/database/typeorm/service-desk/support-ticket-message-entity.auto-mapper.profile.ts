import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { SupportTicketMessageTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-ticket-message.typeorm.entity';
import { SupportTicketTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-ticket.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { SupportTicketId } from '@module/customer/service-desk/domain/schema/entity/support-ticket/value-object/support-ticket-id/support-ticket-id.value-object';
import { SupportTicketMessageEntity } from '@module/customer/service-desk/domain/schema/entity/support-ticket-message/support-ticket-message.entity';
import { SupportTicketMessageId } from '@module/customer/service-desk/domain/schema/entity/support-ticket-message/value-object/support-ticket-message-id/support-ticket-message-id.value-object';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';

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
    const convert = (
      source: SupportTicketMessageTypeormEntity,
    ): SupportTicketMessageEntity => {
      if (!source.supportTicket) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: SupportTicketMessageEntity.name,
          sourceClass: SupportTicketMessageTypeormEntity.name,
        });
      }

      return new SupportTicketMessageEntity({
        id: new SupportTicketMessageId(source.id),
        supportTicketId: new SupportTicketId(source.supportTicket.id),
        senderAuthIdentityId: new AuthIdentityId(source.senderAuthIdentityId),
        senderName: source.senderName,
        senderType: source.senderType,
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
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: SupportTicketMessageEntity,
    ): SupportTicketMessageTypeormEntity => {
      return SupportTicketMessageTypeormEntity.build({
        id: source.id.toString(),
        supportTicket: {
          id: source.supportTicketId.toString(),
        } as SupportTicketTypeormEntity,
        senderAuthIdentityId: source.senderAuthIdentityId.toString(),
        senderName: source.senderName,
        senderType: source.senderType,
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
      constructUsing(convert),
    );
  }
}
