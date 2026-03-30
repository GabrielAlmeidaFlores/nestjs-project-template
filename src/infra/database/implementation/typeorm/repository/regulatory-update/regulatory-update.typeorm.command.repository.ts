import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RegulatoryUpdateMainChangeTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/regulatory-update-main-change.typeorm.entity';
import { RegulatoryUpdateTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/regulatory-update.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RegulatoryUpdateCommandRepositoryGateway } from '@module/customer/regulatory-update/domain/repository/regulatory-update/command/regulatory-update.command.repository.gateway';
import { RegulatoryUpdateEntity } from '@module/customer/regulatory-update/domain/schema/entity/regulatory-update/regulatory-update.entity';

@Injectable()
export class RegulatoryUpdateTypeormCommandRepository
  extends BaseTypeormCommandRepository<RegulatoryUpdateTypeormEntity>
  implements RegulatoryUpdateCommandRepositoryGateway
{
  protected readonly _type = RegulatoryUpdateTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RegulatoryUpdateTypeormEntity)
    repository: Repository<RegulatoryUpdateTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createRegulatoryUpdate(
    props: RegulatoryUpdateEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RegulatoryUpdateEntity,
      RegulatoryUpdateTypeormEntity,
    );

    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      const ruRepo = manager.getRepository(RegulatoryUpdateTypeormEntity);
      const mcRepo = manager.getRepository(
        RegulatoryUpdateMainChangeTypeormEntity,
      );

      const { mainChanges, ...ruData } = mappedData;
      const newRu = ruRepo.create(ruData);
      const savedRu = await ruRepo.save(newRu);

      if (mainChanges.length > 0) {
        const mcEntities = mainChanges.map((mc) =>
          mcRepo.create({ ...mc, regulatoryUpdate: savedRu }),
        );
        await mcRepo.save(mcEntities);
      }
    };
  }
}
