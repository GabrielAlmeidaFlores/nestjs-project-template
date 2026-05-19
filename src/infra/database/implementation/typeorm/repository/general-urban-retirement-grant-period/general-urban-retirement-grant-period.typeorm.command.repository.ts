import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { GeneralUrbanRetirementGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant-period.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GeneralUrbanRetirementGrantPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-period/command/general-urban-retirement-grant-period.command.repository.gateway';
import { GeneralUrbanRetirementGrantPeriodEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-period/general-urban-retirement-grant-period.entity';
import { GeneralUrbanRetirementGrantPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-period/value-object/general-urban-retirement-grant-period-id.value-object';

@Injectable()
export class GeneralUrbanRetirementGrantPeriodTypeormCommandRepository
  extends BaseTypeormCommandRepository<GeneralUrbanRetirementGrantPeriodTypeormEntity>
  implements GeneralUrbanRetirementGrantPeriodCommandRepositoryGateway
{
  protected readonly _type =
    GeneralUrbanRetirementGrantPeriodTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(GeneralUrbanRetirementGrantPeriodTypeormEntity)
    repository: Repository<GeneralUrbanRetirementGrantPeriodTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public updateGeneralUrbanRetirementGrantPeriod(
    id: GeneralUrbanRetirementGrantPeriodId,
    props: GeneralUrbanRetirementGrantPeriodEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      GeneralUrbanRetirementGrantPeriodEntity,
      GeneralUrbanRetirementGrantPeriodTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public createGeneralUrbanRetirementGrantPeriod(
    props: GeneralUrbanRetirementGrantPeriodEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      GeneralUrbanRetirementGrantPeriodEntity,
      GeneralUrbanRetirementGrantPeriodTypeormEntity,
    );

    return this.create(mappedData);
  }
}
