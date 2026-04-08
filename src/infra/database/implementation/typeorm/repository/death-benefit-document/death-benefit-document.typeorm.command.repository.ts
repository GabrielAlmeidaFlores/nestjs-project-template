import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DeathBenefitDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DeathBenefitDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit/domain/repository/death-benefit-document/command/death-benefit-document.command.repository.gateway';
import { DeathBenefitDocumentEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-document/death-benefit-document.entity';
import { DeathBenefitId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit/value-object/death-benefit-id.value-object';

@Injectable()
export class DeathBenefitDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<DeathBenefitDocumentTypeormEntity>
  implements DeathBenefitDocumentCommandRepositoryGateway
{
  protected readonly _type = DeathBenefitDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(DeathBenefitDocumentTypeormEntity)
    repository: Repository<DeathBenefitDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDeathBenefitDocument(props: DeathBenefitDocumentEntity): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DeathBenefitDocumentEntity,
      DeathBenefitDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllByDeathBenefitId(deathBenefitId: DeathBenefitId): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(DeathBenefitDocumentTypeormEntity)
        .createQueryBuilder()
        .softDelete()
        .where('death_benefit_id = :deathBenefitId', {
          deathBenefitId: deathBenefitId.toString(),
        })
        .execute();
    };
  }
}
