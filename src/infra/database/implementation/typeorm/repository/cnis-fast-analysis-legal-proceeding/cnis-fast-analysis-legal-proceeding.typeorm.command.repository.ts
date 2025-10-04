import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { CnisFastAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis-legal-proceeding.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { CnisFastAnalysisLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis-legal-proceeding/command/cnis-fast-analysis-legal-proceeding.command.repository.gateway';
import { CnisFastAnalysisLegalProceedingEntity } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis-legal-proceeding/cnis-fast-analysis-legal-proceeding.entity';
import { CnisFastAnalysisLegalProceedingId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis-legal-proceeding/value-object/cnis-fast-analysis-legal-proceeding-id/cnis-fast-analysis-legal-proceeding-id.value-object';

@Injectable()
export class CnisFastAnalysisLegalProceedingTypeormCommandRepository
  extends BaseTypeormCommandRepository<CnisFastAnalysisLegalProceedingTypeormEntity>
  implements CnisFastAnalysisLegalProceedingCommandRepositoryGateway
{
  protected readonly _type =
    CnisFastAnalysisLegalProceedingTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(CnisFastAnalysisLegalProceedingTypeormEntity)
    repository: Repository<CnisFastAnalysisLegalProceedingTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public deleteCnisFastAnalysisLegalProceeding(
    id: CnisFastAnalysisLegalProceedingId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  public createCnisFastAnalysisLegalProceeding(
    props: CnisFastAnalysisLegalProceedingEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      CnisFastAnalysisLegalProceedingEntity,
      CnisFastAnalysisLegalProceedingTypeormEntity,
    );

    return this.create(mappedData);
  }
}
