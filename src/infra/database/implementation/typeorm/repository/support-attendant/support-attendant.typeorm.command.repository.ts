import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SupportAttendantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-attendant.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { SupportAttendantCommandRepositoryGateway } from '@module/support/account/domain/repository/support-attendant/command/support-attendant.command.repository.gateway';
import { SupportAttendantEntity } from '@module/support/account/domain/schema/entity/support-attendant/support-attendant.entity';
import { SupportAttendantId } from '@module/support/account/domain/schema/entity/support-attendant/value-object/support-attendant-id/support-attendant-id.value-object';

@Injectable()
export class SupportAttendantTypeormCommandRepository
  extends BaseTypeormCommandRepository<SupportAttendantTypeormEntity>
  implements SupportAttendantCommandRepositoryGateway
{
  protected readonly _type = SupportAttendantTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(SupportAttendantTypeormEntity)
    repository: Repository<SupportAttendantTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createSupportAttendant(
    props: SupportAttendantEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SupportAttendantEntity,
      SupportAttendantTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateSupportAttendant(
    id: SupportAttendantId,
    props: SupportAttendantEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SupportAttendantEntity,
      SupportAttendantTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }
}
