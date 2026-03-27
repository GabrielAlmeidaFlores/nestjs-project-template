import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { GeneralUrbanRetirementAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-analysis-result.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GeneralUrbanRetirementAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis-result/command/general-urban-retirement-analysis-result.command.repository.gateway';
import { GeneralUrbanRetirementAnalysisResultEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-result/general-urban-retirement-analysis-result.entity';
import { GeneralUrbanRetirementAnalysisResultId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-result/value-object/general-urban-retirement-analysis-result-id.value-object';

@Injectable()
export class GeneralUrbanRetirementAnalysisResultTypeormCommandRepository
  extends BaseTypeormCommandRepository<GeneralUrbanRetirementAnalysisResultTypeormEntity>
  implements GeneralUrbanRetirementAnalysisResultCommandRepositoryGateway
{
  protected readonly _type =
    GeneralUrbanRetirementAnalysisResultTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(GeneralUrbanRetirementAnalysisResultTypeormEntity)
    repository: Repository<GeneralUrbanRetirementAnalysisResultTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public updateGeneralUrbanRetirementAnalysisResult(
    id: GeneralUrbanRetirementAnalysisResultId,
    props: GeneralUrbanRetirementAnalysisResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      GeneralUrbanRetirementAnalysisResultEntity,
      GeneralUrbanRetirementAnalysisResultTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public createGeneralUrbanRetirementAnalysisResult(
    props: GeneralUrbanRetirementAnalysisResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      GeneralUrbanRetirementAnalysisResultEntity,
      GeneralUrbanRetirementAnalysisResultTypeormEntity,
    );

    return this.create(mappedData);
  }
}
