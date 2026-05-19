import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TemporaryDisabilityBenefitsTerminatedPreviousBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-previous-benefit.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { TemporaryDisabilityBenefitsTerminatedPreviousBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/repository/temporary-disability-benefits-terminated-previous-benefit/command/temporary-disability-benefits-terminated-previous-benefit.command.repository.gateway';
import { TemporaryDisabilityBenefitsTerminatedPreviousBenefitEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-previous-benefit/temporary-disability-benefits-terminated-previous-benefit.entity';
import { TemporaryDisabilityBenefitsTerminatedPreviousBenefitId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-previous-benefit/value-object/temporary-disability-benefits-terminated-previous-benefit-id.value-object';

@Injectable()
export class TemporaryDisabilityBenefitsTerminatedPreviousBenefitTypeormCommandRepository
  extends BaseTypeormCommandRepository<TemporaryDisabilityBenefitsTerminatedPreviousBenefitTypeormEntity>
  implements
    TemporaryDisabilityBenefitsTerminatedPreviousBenefitCommandRepositoryGateway
{
  protected readonly _type =
    TemporaryDisabilityBenefitsTerminatedPreviousBenefitTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      TemporaryDisabilityBenefitsTerminatedPreviousBenefitTypeormEntity,
    )
    repository: Repository<TemporaryDisabilityBenefitsTerminatedPreviousBenefitTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createTemporaryDisabilityBenefitsTerminatedPreviousBenefit(
    props: TemporaryDisabilityBenefitsTerminatedPreviousBenefitEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TemporaryDisabilityBenefitsTerminatedPreviousBenefitEntity,
      TemporaryDisabilityBenefitsTerminatedPreviousBenefitTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteTemporaryDisabilityBenefitsTerminatedPreviousBenefit(
    id: TemporaryDisabilityBenefitsTerminatedPreviousBenefitId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(
          TemporaryDisabilityBenefitsTerminatedPreviousBenefitTypeormEntity,
        )
        .softDelete(id.toString());
    };
  }
}
