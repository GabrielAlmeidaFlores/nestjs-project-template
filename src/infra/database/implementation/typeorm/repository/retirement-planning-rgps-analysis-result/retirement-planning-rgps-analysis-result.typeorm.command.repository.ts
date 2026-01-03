import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RetirementPlanningRgpsAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps-analysis-result.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RetirementPlanningRgpsAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-analysis-result/command/retirement-planning-rgps-analysis-result.repository.gateway';
import { RetirementPlanningRgpsAnalysisResultEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-analysis-result/retirement-planning-rgps-analysis-result.entity';
import { RetirementPlanningRgpsAnalysisResultId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-analysis-result/value-object/retirement-planning-rgps-analysis-result-id.value-object';

@Injectable()
export class RetirementPlanningRgpsAnalysisResultTypeormCommandRepository
  extends BaseTypeormCommandRepository<RetirementPlanningRgpsAnalysisResultTypeormEntity>
  implements RetirementPlanningRgpsAnalysisResultCommandRepositoryGateway
{
  protected readonly _type =
    RetirementPlanningRgpsAnalysisResultTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RetirementPlanningRgpsAnalysisResultTypeormEntity)
    repository: Repository<RetirementPlanningRgpsAnalysisResultTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public updateRetirementPlanningRgpsAnalysisResult(
    id: RetirementPlanningRgpsAnalysisResultId,
    props: RetirementPlanningRgpsAnalysisResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RetirementPlanningRgpsAnalysisResultEntity,
      RetirementPlanningRgpsAnalysisResultTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public createRetirementPlanningRgpsAnalysisResult(
    props: RetirementPlanningRgpsAnalysisResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RetirementPlanningRgpsAnalysisResultEntity,
      RetirementPlanningRgpsAnalysisResultTypeormEntity,
    );

    return this.create(mappedData);
  }
}
