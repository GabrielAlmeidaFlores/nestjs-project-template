import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { GeneralUrbanRetirementGrantAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant-analysis-result.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GeneralUrbanRetirementGrantAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-analysis-result/command/general-urban-retirement-grant-analysis-result.command.repository.gateway';
import { GeneralUrbanRetirementGrantAnalysisResultEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-analysis-result/general-urban-retirement-grant-analysis-result.entity';
import { GeneralUrbanRetirementGrantAnalysisResultId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-analysis-result/value-object/general-urban-retirement-grant-analysis-result-id.value-object';

@Injectable()
export class GeneralUrbanRetirementGrantAnalysisResultTypeormCommandRepository
  extends BaseTypeormCommandRepository<GeneralUrbanRetirementGrantAnalysisResultTypeormEntity>
  implements GeneralUrbanRetirementGrantAnalysisResultCommandRepositoryGateway
{
  protected readonly _type =
    GeneralUrbanRetirementGrantAnalysisResultTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(GeneralUrbanRetirementGrantAnalysisResultTypeormEntity)
    repository: Repository<GeneralUrbanRetirementGrantAnalysisResultTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public updateGeneralUrbanRetirementGrantAnalysisResult(
    id: GeneralUrbanRetirementGrantAnalysisResultId,
    props: GeneralUrbanRetirementGrantAnalysisResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      GeneralUrbanRetirementGrantAnalysisResultEntity,
      GeneralUrbanRetirementGrantAnalysisResultTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public createGeneralUrbanRetirementGrantAnalysisResult(
    props: GeneralUrbanRetirementGrantAnalysisResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      GeneralUrbanRetirementGrantAnalysisResultEntity,
      GeneralUrbanRetirementGrantAnalysisResultTypeormEntity,
    );

    return this.create(mappedData);
  }
}
