import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-work-periods-earnings-history.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/repository/temporary-disability-benefits-grant-work-periods-earnings-history/command/temporary-disability-benefits-grant-work-periods-earnings-history.command.repository.gateway';
import { TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-work-periods-earnings-history/temporary-disability-benefits-grant-work-periods-earnings-history.entity';

@Injectable()
export class TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryTypeormCommandRepository
  extends BaseTypeormCommandRepository<TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryTypeormEntity>
  implements
    TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryCommandRepositoryGateway
{
  protected readonly _type =
    TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryTypeormEntity,
    )
    repository: Repository<TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createTemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistory(
    props: TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryEntity,
      TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryTypeormEntity,
    );

    return this.create(mappedData);
  }
}
