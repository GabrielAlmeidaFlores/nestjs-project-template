import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SupportTicketMessageTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-ticket-message.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { SupportTicketMessageCommandRepositoryGateway } from '@module/customer/service-desk/domain/repository/support-ticket-message/command/support-ticket-message.command.repository.gateway';
import { SupportTicketMessageEntity } from '@module/customer/service-desk/domain/schema/entity/support-ticket-message/support-ticket-message.entity';

@Injectable()
export class SupportTicketMessageTypeormCommandRepository
  extends BaseTypeormCommandRepository<SupportTicketMessageTypeormEntity>
  implements SupportTicketMessageCommandRepositoryGateway
{
  protected readonly _type = SupportTicketMessageTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(SupportTicketMessageTypeormEntity)
    repository: Repository<SupportTicketMessageTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createSupportTicketMessage(
    props: SupportTicketMessageEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SupportTicketMessageEntity,
      SupportTicketMessageTypeormEntity,
    );

    return this.create(mappedData);
  }
}
