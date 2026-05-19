import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TemporaryDisabilityBenefitsGrantInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-inss-benefit.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { TemporaryDisabilityBenefitsGrantInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/repository/temporary-disability-benefits-grant-inss-benefit/command/temporary-disability-benefits-grant-inss-benefit.command.repository.gateway';
import { TemporaryDisabilityBenefitsGrantId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/value-object/temporary-disability-benefits-grant-id.value-object';
import { TemporaryDisabilityBenefitsGrantInssBenefitEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-inss-benefit/temporary-disability-benefits-grant-inss-benefit.entity';

@Injectable()
export class TemporaryDisabilityBenefitsGrantInssBenefitTypeormCommandRepository
  extends BaseTypeormCommandRepository<TemporaryDisabilityBenefitsGrantInssBenefitTypeormEntity>
  implements TemporaryDisabilityBenefitsGrantInssBenefitCommandRepositoryGateway
{
  protected readonly _type =
    TemporaryDisabilityBenefitsGrantInssBenefitTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(TemporaryDisabilityBenefitsGrantInssBenefitTypeormEntity)
    repository: Repository<TemporaryDisabilityBenefitsGrantInssBenefitTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createTemporaryDisabilityBenefitsGrantInssBenefit(
    props: TemporaryDisabilityBenefitsGrantInssBenefitEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TemporaryDisabilityBenefitsGrantInssBenefitEntity,
      TemporaryDisabilityBenefitsGrantInssBenefitTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllByTemporaryDisabilityBenefitsGrantId(
    temporaryDisabilityBenefitsGrantId: TemporaryDisabilityBenefitsGrantId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(TemporaryDisabilityBenefitsGrantInssBenefitTypeormEntity)
        .createQueryBuilder()
        .softDelete()
        .where(
          'temporary_disability_benefits_grant_id = :temporaryDisabilityBenefitsGrantId',
          {
            temporaryDisabilityBenefitsGrantId:
              temporaryDisabilityBenefitsGrantId.toString(),
          },
        )
        .execute();
    };
  }
}
