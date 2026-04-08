import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TemporaryDisabilityBenefitsGrantWorkPeriodsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-work-periods.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { TemporaryDisabilityBenefitsGrantWorkPeriodsCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/repository/temporary-disability-benefits-grant-work-periods/command/temporary-disability-benefits-grant-work-periods.command.repository.gateway';
import { TemporaryDisabilityBenefitsGrantId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/value-object/temporary-disability-benefits-grant-id.value-object';
import { TemporaryDisabilityBenefitsGrantWorkPeriodsEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-work-periods/temporary-disability-benefits-grant-work-periods.entity';
import { TemporaryDisabilityBenefitsGrantWorkPeriodsId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-work-periods/value-object/temporary-disability-benefits-grant-work-periods-id.value-object';

@Injectable()
export class TemporaryDisabilityBenefitsGrantWorkPeriodsTypeormCommandRepository
  extends BaseTypeormCommandRepository<TemporaryDisabilityBenefitsGrantWorkPeriodsTypeormEntity>
  implements TemporaryDisabilityBenefitsGrantWorkPeriodsCommandRepositoryGateway
{
  protected readonly _type =
    TemporaryDisabilityBenefitsGrantWorkPeriodsTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(TemporaryDisabilityBenefitsGrantWorkPeriodsTypeormEntity)
    repository: Repository<TemporaryDisabilityBenefitsGrantWorkPeriodsTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createTemporaryDisabilityBenefitsGrantWorkPeriods(
    props: TemporaryDisabilityBenefitsGrantWorkPeriodsEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TemporaryDisabilityBenefitsGrantWorkPeriodsEntity,
      TemporaryDisabilityBenefitsGrantWorkPeriodsTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateTemporaryDisabilityBenefitsGrantWorkPeriods(
    id: TemporaryDisabilityBenefitsGrantWorkPeriodsId,
    props: TemporaryDisabilityBenefitsGrantWorkPeriodsEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TemporaryDisabilityBenefitsGrantWorkPeriodsEntity,
      TemporaryDisabilityBenefitsGrantWorkPeriodsTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public deleteAllByTemporaryDisabilityBenefitsGrantId(
    temporaryDisabilityBenefitsGrantId: TemporaryDisabilityBenefitsGrantId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(TemporaryDisabilityBenefitsGrantWorkPeriodsTypeormEntity)
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
