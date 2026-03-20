import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TutorialTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/tutorial.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { TutorialCommandRepositoryGateway } from '@module/customer/tutorial/domain/repository/tutorial/command/tutorial.command.repository.gateway';
import { TutorialEntity } from '@module/customer/tutorial/domain/schema/entity/tutorial/tutorial.entity';
import { TutorialId } from '@module/customer/tutorial/domain/schema/entity/tutorial/value-object/tutorial-id/tutorial-id.value-object';

@Injectable()
export class TutorialTypeormCommandRepository
  extends BaseTypeormCommandRepository<TutorialTypeormEntity>
  implements TutorialCommandRepositoryGateway
{
  protected readonly _type = TutorialTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(TutorialTypeormEntity)
    repository: Repository<TutorialTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createTutorial(props: TutorialEntity): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TutorialEntity,
      TutorialTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateTutorial(
    id: TutorialId,
    props: TutorialEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TutorialEntity,
      TutorialTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public deleteTutorial(id: TutorialId): TransactionType {
    return this.delete(id.toString());
  }
}
