import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { BpcElderlyAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis-result.typeorm.entity';
import { BpcElderlyAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { BpcElderlyAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/repository/bpc-elderly-analysis-result/command/bpc-elderly-analysis-result.command.repository.gateway';
import { BpcElderlyAnalysisId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis/value-object/bpc-elderly-analysis-id/bpc-elderly-analysis-id.value-object';
import { BpcElderlyAnalysisResultEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-result/bpc-elderly-analysis-result.entity';

@Injectable()
export class BpcElderlyAnalysisResultTypeormCommandRepository
  extends BaseTypeormCommandRepository<BpcElderlyAnalysisResultTypeormEntity>
  implements BpcElderlyAnalysisResultCommandRepositoryGateway
{
  protected readonly _type =
    BpcElderlyAnalysisResultTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(BpcElderlyAnalysisResultTypeormEntity)
    repository: Repository<BpcElderlyAnalysisResultTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createBpcElderlyAnalysisResult(
    props: BpcElderlyAnalysisResultEntity,
    bpcElderlyAnalysisId: BpcElderlyAnalysisId,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      BpcElderlyAnalysisResultEntity,
      BpcElderlyAnalysisResultTypeormEntity,
    );

    mappedData.bpcElderlyAnalysis = {
      id: bpcElderlyAnalysisId.toString(),
    } as BpcElderlyAnalysisTypeormEntity;

    return this.create(mappedData);
  }
}
