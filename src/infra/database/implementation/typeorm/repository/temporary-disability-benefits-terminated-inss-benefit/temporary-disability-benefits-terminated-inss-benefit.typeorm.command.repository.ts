import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TemporaryDisabilityBenefitsTerminatedInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-inss-benefit.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { TemporaryDisabilityBenefitsTerminatedInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/repository/temporary-disability-benefits-terminated-inss-benefit/command/temporary-disability-benefits-terminated-inss-benefit.command.repository.gateway';
import { TemporaryDisabilityBenefitsTerminatedId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/value-object/temporary-disability-benefits-terminated-id.value-object';
import { TemporaryDisabilityBenefitsTerminatedInssBenefitEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-inss-benefit/temporary-disability-benefits-terminated-inss-benefit.entity';

@Injectable()
export class TemporaryDisabilityBenefitsTerminatedInssBenefitTypeormCommandRepository
  extends BaseTypeormCommandRepository<TemporaryDisabilityBenefitsTerminatedInssBenefitTypeormEntity>
  implements
    TemporaryDisabilityBenefitsTerminatedInssBenefitCommandRepositoryGateway
{
  protected readonly _type =
    TemporaryDisabilityBenefitsTerminatedInssBenefitTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      TemporaryDisabilityBenefitsTerminatedInssBenefitTypeormEntity,
    )
    repository: Repository<TemporaryDisabilityBenefitsTerminatedInssBenefitTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createTemporaryDisabilityBenefitsTerminatedInssBenefit(
    props: TemporaryDisabilityBenefitsTerminatedInssBenefitEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TemporaryDisabilityBenefitsTerminatedInssBenefitEntity,
      TemporaryDisabilityBenefitsTerminatedInssBenefitTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllByTemporaryDisabilityBenefitsTerminatedId(
    temporaryDisabilityBenefitsTerminatedId: TemporaryDisabilityBenefitsTerminatedId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(
          TemporaryDisabilityBenefitsTerminatedInssBenefitTypeormEntity,
        )
        .softDelete({
          temporaryDisabilityBenefitsTerminated: {
            id: temporaryDisabilityBenefitsTerminatedId.toString(),
          },
        });
    };
  }
}
