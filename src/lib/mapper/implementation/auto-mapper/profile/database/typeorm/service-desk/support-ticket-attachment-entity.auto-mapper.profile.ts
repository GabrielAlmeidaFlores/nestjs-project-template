import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { SupportTicketAttachmentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-ticket-attachment.typeorm.entity';
import { SupportTicketTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-ticket.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { SupportTicketId } from '@module/customer/service-desk/domain/schema/entity/support-ticket/value-object/support-ticket-id/support-ticket-id.value-object';
import { SupportTicketAttachmentEntity } from '@module/customer/service-desk/domain/schema/entity/support-ticket-attachment/support-ticket-attachment.entity';
import { SupportTicketAttachmentId } from '@module/customer/service-desk/domain/schema/entity/support-ticket-attachment/value-object/support-ticket-attachment-id/support-ticket-attachment-id.value-object';

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
    const convert = (
      source: SupportTicketAttachmentTypeormEntity,
    ): SupportTicketAttachmentEntity => {
      if (!source.supportTicket) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: SupportTicketAttachmentEntity.name,
          sourceClass: SupportTicketAttachmentTypeormEntity.name,
        });
      }

      return new SupportTicketAttachmentEntity({
        id: new SupportTicketAttachmentId(source.id),
        supportTicketId: new SupportTicketId(source.supportTicket.id),
        bucketKey: source.bucketKey,
        originalFileName: source.originalFileName,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      SupportTicketAttachmentTypeormEntity,
      SupportTicketAttachmentEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: SupportTicketAttachmentEntity,
    ): SupportTicketAttachmentTypeormEntity => {
      return SupportTicketAttachmentTypeormEntity.build({
        id: source.id.toString(),
        supportTicket: {
          id: source.supportTicketId.toString(),
        } as SupportTicketTypeormEntity,
        bucketKey: source.bucketKey,
        originalFileName: source.originalFileName,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      SupportTicketAttachmentEntity,
      SupportTicketAttachmentTypeormEntity,
      constructUsing(convert),
    );
  }
}
