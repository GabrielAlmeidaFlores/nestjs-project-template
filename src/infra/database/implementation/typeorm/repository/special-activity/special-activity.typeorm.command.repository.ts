import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SpecialActivityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-activity.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { SpecialActivityEntity } from '@module/customer/analysis-tool/domain/schema/entity/special-activity/special-activity-entity';
import { SpecialActivityId } from '@module/customer/analysis-tool/domain/schema/entity/special-activity/value-object/special-activity-id.value-object';
import { SpecialActivityCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-activity/domain/repository/special-activity/command/special-activity.command.repository.gateway';

@Injectable()
export class SpecialActivityTypeormCommandRepository
  extends BaseTypeormCommandRepository<SpecialActivityTypeormEntity>
  implements SpecialActivityCommandRepositoryGateway
{
  protected readonly _type = SpecialActivityTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(SpecialActivityTypeormEntity)
    repository: Repository<SpecialActivityTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public updateSpecialActivity(
    id: SpecialActivityId,
    props: SpecialActivityEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SpecialActivityEntity,
      SpecialActivityTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public createSpecialActivity(props: SpecialActivityEntity): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SpecialActivityEntity,
      SpecialActivityTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteSpecialActivity(id: SpecialActivityId): TransactionType {
    return this.update(id.toString(), {
      deletedAt: new Date(),
    });
  }
}
