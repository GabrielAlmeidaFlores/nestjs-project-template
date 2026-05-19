import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { GeneralUrbanRetirementGrantSpecialPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant-special-period.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GeneralUrbanRetirementGrantSpecialPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-special-period/command/general-urban-retirement-grant-special-period.command.repository.gateway';
import { GeneralUrbanRetirementGrantSpecialPeriodEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-special-period/general-urban-retirement-grant-special-period.entity';
import { GeneralUrbanRetirementGrantSpecialPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-special-period/value-object/general-urban-retirement-grant-special-period-id.value-object';

@Injectable()
export class GeneralUrbanRetirementGrantSpecialPeriodTypeormCommandRepository
  extends BaseTypeormCommandRepository<GeneralUrbanRetirementGrantSpecialPeriodTypeormEntity>
  implements GeneralUrbanRetirementGrantSpecialPeriodCommandRepositoryGateway
{
  protected readonly _type =
    GeneralUrbanRetirementGrantSpecialPeriodTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(GeneralUrbanRetirementGrantSpecialPeriodTypeormEntity)
    repository: Repository<GeneralUrbanRetirementGrantSpecialPeriodTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public updateGeneralUrbanRetirementGrantSpecialPeriod(
    id: GeneralUrbanRetirementGrantSpecialPeriodId,
    props: GeneralUrbanRetirementGrantSpecialPeriodEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      GeneralUrbanRetirementGrantSpecialPeriodEntity,
      GeneralUrbanRetirementGrantSpecialPeriodTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public createGeneralUrbanRetirementGrantSpecialPeriod(
    props: GeneralUrbanRetirementGrantSpecialPeriodEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      GeneralUrbanRetirementGrantSpecialPeriodEntity,
      GeneralUrbanRetirementGrantSpecialPeriodTypeormEntity,
    );

    return this.create(mappedData);
  }
}
