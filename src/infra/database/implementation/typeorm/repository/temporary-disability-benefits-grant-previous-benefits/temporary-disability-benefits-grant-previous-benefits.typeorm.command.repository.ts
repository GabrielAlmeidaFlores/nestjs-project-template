import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TemporaryDisabilityBenefitsGrantPreviousBenefitsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-previous-benefits.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { TemporaryDisabilityBenefitsGrantPreviousBenefitsCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/repository/temporary-disability-benefits-grant-previous-benefits/command/temporary-disability-benefits-grant-previous-benefits.command.repository.gateway';
import { TemporaryDisabilityBenefitsGrantPreviousBenefitsEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-previous-benefits/temporary-disability-benefits-grant-previous-benefits.entity';
import { TemporaryDisabilityBenefitsGrantPreviousBenefitsId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-previous-benefits/value-object/temporary-disability-benefits-grant-previous-benefits-id.value-object';

@Injectable()
export class TemporaryDisabilityBenefitsGrantPreviousBenefitsTypeormCommandRepository
  extends BaseTypeormCommandRepository<TemporaryDisabilityBenefitsGrantPreviousBenefitsTypeormEntity>
  implements
    TemporaryDisabilityBenefitsGrantPreviousBenefitsCommandRepositoryGateway
{
  protected readonly _type =
    TemporaryDisabilityBenefitsGrantPreviousBenefitsTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      TemporaryDisabilityBenefitsGrantPreviousBenefitsTypeormEntity,
    )
    repository: Repository<TemporaryDisabilityBenefitsGrantPreviousBenefitsTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createTemporaryDisabilityBenefitsGrantPreviousBenefits(
    props: TemporaryDisabilityBenefitsGrantPreviousBenefitsEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TemporaryDisabilityBenefitsGrantPreviousBenefitsEntity,
      TemporaryDisabilityBenefitsGrantPreviousBenefitsTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteTemporaryDisabilityBenefitsGrantPreviousBenefits(
    id: TemporaryDisabilityBenefitsGrantPreviousBenefitsId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(
          TemporaryDisabilityBenefitsGrantPreviousBenefitsTypeormEntity,
        )
        .softDelete(id.toString());
    };
  }
}
