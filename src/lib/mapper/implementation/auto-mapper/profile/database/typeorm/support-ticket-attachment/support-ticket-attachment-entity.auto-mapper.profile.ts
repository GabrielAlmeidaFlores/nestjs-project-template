import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { SupportTicketAttachmentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-ticket-attachment.typeorm.entity';
import { SupportTicketTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-ticket.typeorm.entity';
import { SupportTicketId } from '@module/support/service-desk/domain/schema/entity/support-ticket/value-object/support-ticket-id/support-ticket-id.value-object';
import { SupportTicketAttachmentEntity } from '@module/support/service-desk/domain/schema/entity/support-ticket-attachment/support-ticket-attachment.entity';
import { SupportTicketAttachmentId } from '@module/support/service-desk/domain/schema/entity/support-ticket-attachment/value-object/support-ticket-attachment-id/support-ticket-attachment-id.value-object';

@Injectable()
export class SupportTicketAttachmentEntityAutoMapperProfile {
  protected readonly _type =
    SupportTicketAttachmentEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: SupportTicketAttachmentTypeormEntity,
    ): SupportTicketAttachmentEntity => {
      return new SupportTicketAttachmentEntity({
        id: new SupportTicketAttachmentId(source.id),
        supportTicketId: new SupportTicketId(source.supportTicket.id),
        fileName: source.fileName,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      SupportTicketAttachmentTypeormEntity,
      SupportTicketAttachmentEntity,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: SupportTicketAttachmentEntity,
    ): SupportTicketAttachmentTypeormEntity => {
      const supportTicket = {
        id: source.supportTicketId.toString(),
      } as SupportTicketTypeormEntity;

      return SupportTicketAttachmentTypeormEntity.build({
        id: source.id.toString(),
        supportTicket,
        fileName: source.fileName,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      SupportTicketAttachmentEntity,
      SupportTicketAttachmentTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
