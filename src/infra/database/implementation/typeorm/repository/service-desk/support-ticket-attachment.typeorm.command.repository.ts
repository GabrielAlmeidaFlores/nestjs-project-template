import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SupportTicketAttachmentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-ticket-attachment.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { SupportTicketAttachmentCommandRepositoryGateway } from '@module/customer/service-desk/domain/repository/support-ticket-attachment/command/support-ticket-attachment.command.repository.gateway';
import { SupportTicketAttachmentEntity } from '@module/customer/service-desk/domain/schema/entity/support-ticket-attachment/support-ticket-attachment.entity';

@Injectable()
export class SupportTicketAttachmentTypeormCommandRepository
  extends BaseTypeormCommandRepository<SupportTicketAttachmentTypeormEntity>
  implements SupportTicketAttachmentCommandRepositoryGateway
{
  protected readonly _type =
    SupportTicketAttachmentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(SupportTicketAttachmentTypeormEntity)
    repository: Repository<SupportTicketAttachmentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createSupportTicketAttachment(
    props: SupportTicketAttachmentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SupportTicketAttachmentEntity,
      SupportTicketAttachmentTypeormEntity,
    );

    return this.create(mappedData);
  }
}
