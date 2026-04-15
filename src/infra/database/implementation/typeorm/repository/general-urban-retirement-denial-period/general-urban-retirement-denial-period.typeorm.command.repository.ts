import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { GeneralUrbanRetirementDenialPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-denial-period.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GeneralUrbanRetirementDenialPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/repository/general-urban-retirement-denial-period/command/general-urban-retirement-denial-period.command.repository.gateway';
import { GeneralUrbanRetirementDenialPeriodEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/general-urban-retirement-denial-period.entity';
import { GeneralUrbanRetirementDenialPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/value-object/general-urban-retirement-denial-period-id/general-urban-retirement-denial-period-id.value-object';

@Injectable()
export class GeneralUrbanRetirementDenialPeriodTypeormCommandRepository
  extends BaseTypeormCommandRepository<GeneralUrbanRetirementDenialPeriodTypeormEntity>
  implements GeneralUrbanRetirementDenialPeriodCommandRepositoryGateway
{
  protected readonly _type =
    GeneralUrbanRetirementDenialPeriodTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(GeneralUrbanRetirementDenialPeriodTypeormEntity)
    repository: Repository<GeneralUrbanRetirementDenialPeriodTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createGeneralUrbanRetirementDenialPeriod(
    props: GeneralUrbanRetirementDenialPeriodEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      GeneralUrbanRetirementDenialPeriodEntity,
      GeneralUrbanRetirementDenialPeriodTypeormEntity,
    );
    return this.create(mappedData);
  }

  public deleteGeneralUrbanRetirementDenialPeriod(
    id: GeneralUrbanRetirementDenialPeriodId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
