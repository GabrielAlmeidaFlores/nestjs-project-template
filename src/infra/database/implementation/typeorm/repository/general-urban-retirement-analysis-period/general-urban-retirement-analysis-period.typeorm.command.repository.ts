import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { GeneralUrbanRetirementAnalysisPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-analysis-period.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GeneralUrbanRetirementAnalysisPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis-period/command/general-urban-retirement-analysis-period.command.repository.gateway';
import { GeneralUrbanRetirementAnalysisPeriodEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period/general-urban-retirement-analysis-period.entity';
import { GeneralUrbanRetirementAnalysisPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period/value-object/general-urban-retirement-analysis-period-id.value-object';

@Injectable()
export class GeneralUrbanRetirementAnalysisPeriodTypeormCommandRepository
  extends BaseTypeormCommandRepository<GeneralUrbanRetirementAnalysisPeriodTypeormEntity>
  implements GeneralUrbanRetirementAnalysisPeriodCommandRepositoryGateway
{
  protected readonly _type =
    GeneralUrbanRetirementAnalysisPeriodTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(GeneralUrbanRetirementAnalysisPeriodTypeormEntity)
    repository: Repository<GeneralUrbanRetirementAnalysisPeriodTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createGeneralUrbanRetirementAnalysisPeriod(
    props: GeneralUrbanRetirementAnalysisPeriodEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      GeneralUrbanRetirementAnalysisPeriodEntity,
      GeneralUrbanRetirementAnalysisPeriodTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteGeneralUrbanRetirementAnalysisPeriod(
    id: GeneralUrbanRetirementAnalysisPeriodId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
