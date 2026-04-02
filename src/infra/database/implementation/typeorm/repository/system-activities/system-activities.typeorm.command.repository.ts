import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SystemActivitiesTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/system-activities.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { SystemActivitiesCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/system-activities/command/system-activities.command.repository.gateway';
import { SystemActivityEntity } from '@module/customer/analysis-tool/domain/schema/entity/system-activity/system-activity.entity';

@Injectable()
export class SystemActivitiesTypeormCommandRepository
  extends BaseTypeormCommandRepository<SystemActivitiesTypeormEntity>
  implements SystemActivitiesCommandRepositoryGateway
{
  protected readonly _type = SystemActivitiesTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(SystemActivitiesTypeormEntity)
    repository: Repository<SystemActivitiesTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createSystemActivity(entity: SystemActivityEntity): TransactionType {
    const data = this.mapperGateway.map(
      entity,
      SystemActivityEntity,
      SystemActivitiesTypeormEntity,
    );

    return this.create(data);
  }
}
