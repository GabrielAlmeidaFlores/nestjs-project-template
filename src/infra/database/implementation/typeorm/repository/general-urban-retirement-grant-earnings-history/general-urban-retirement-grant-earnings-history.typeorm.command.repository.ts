import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { GeneralUrbanRetirementGrantEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant-earnings-history.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GeneralUrbanRetirementGrantEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-earnings-history/command/general-urban-retirement-grant-earnings-history.command.repository.gateway';
import { GeneralUrbanRetirementGrantEarningsHistoryEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-earnings-history/general-urban-retirement-grant-earnings-history.entity';
import { GeneralUrbanRetirementGrantEarningsHistoryId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-earnings-history/value-object/general-urban-retirement-grant-earnings-history-id.value-object';

@Injectable()
export class GeneralUrbanRetirementGrantEarningsHistoryTypeormCommandRepository
  extends BaseTypeormCommandRepository<GeneralUrbanRetirementGrantEarningsHistoryTypeormEntity>
  implements GeneralUrbanRetirementGrantEarningsHistoryCommandRepositoryGateway
{
  protected readonly _type =
    GeneralUrbanRetirementGrantEarningsHistoryTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(GeneralUrbanRetirementGrantEarningsHistoryTypeormEntity)
    repository: Repository<GeneralUrbanRetirementGrantEarningsHistoryTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createGeneralUrbanRetirementGrantEarningsHistory(
    props: GeneralUrbanRetirementGrantEarningsHistoryEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      GeneralUrbanRetirementGrantEarningsHistoryEntity,
      GeneralUrbanRetirementGrantEarningsHistoryTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteGeneralUrbanRetirementGrantEarningsHistory(
    id: GeneralUrbanRetirementGrantEarningsHistoryId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
