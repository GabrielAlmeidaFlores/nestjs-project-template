import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { GeneralUrbanRetirementAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-analysis.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GeneralUrbanRetirementAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis/command/general-urban-retirement-analysis.command.repository.gateway';
import { GeneralUrbanRetirementAnalysisEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/general-urban-retirement-analysis-entity';
import { GeneralUrbanRetirementAnalysisId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/value-object/general-urban-retirement-analysis-id.value-object';

@Injectable()
export class GeneralUrbanRetirementAnalysisTypeormCommandRepository
  extends BaseTypeormCommandRepository<GeneralUrbanRetirementAnalysisTypeormEntity>
  implements GeneralUrbanRetirementAnalysisCommandRepositoryGateway
{
  protected readonly _type =
    GeneralUrbanRetirementAnalysisTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(GeneralUrbanRetirementAnalysisTypeormEntity)
    repository: Repository<GeneralUrbanRetirementAnalysisTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public deleteGeneralUrbanRetirementAnalysis(
    id: GeneralUrbanRetirementAnalysisId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  public updateGeneralUrbanRetirementAnalysis(
    id: GeneralUrbanRetirementAnalysisId,
    props: GeneralUrbanRetirementAnalysisEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      GeneralUrbanRetirementAnalysisEntity,
      GeneralUrbanRetirementAnalysisTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public createGeneralUrbanRetirementAnalysis(
    props: GeneralUrbanRetirementAnalysisEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      GeneralUrbanRetirementAnalysisEntity,
      GeneralUrbanRetirementAnalysisTypeormEntity,
    );

    return this.create(mappedData);
  }
}
