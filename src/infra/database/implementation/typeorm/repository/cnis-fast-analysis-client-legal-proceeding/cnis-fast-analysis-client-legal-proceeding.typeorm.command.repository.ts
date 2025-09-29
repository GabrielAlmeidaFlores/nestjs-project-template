import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { CnisFastAnalysisClientLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis-client-legal-proceeding.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { CnisFastAnalysisClientLegalProceedingCommandRepositoryGateway } from '@module/customer/cnis-fast-analysis/domain/repository/cnis-fast-analysis-client-legal-proceeding/command/cnis-fast-analysis-client-legal-proceeding.command.repository.gateway';
import { CnisFastAnalysisClientLegalProceedingEntity } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-client-legal-proceeding/cnis-fast-analysis-client-legal-proceeding.entity';

@Injectable()
export class CnisFastAnalysisClientLegalProceedingTypeormCommandRepository
  extends BaseTypeormCommandRepository<CnisFastAnalysisClientLegalProceedingTypeormEntity>
  implements CnisFastAnalysisClientLegalProceedingCommandRepositoryGateway
{
  protected readonly _type =
    CnisFastAnalysisClientLegalProceedingTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(CnisFastAnalysisClientLegalProceedingTypeormEntity)
    repository: Repository<CnisFastAnalysisClientLegalProceedingTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createCnisFastAnalysisClientLegalProceeding(
    props: CnisFastAnalysisClientLegalProceedingEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      CnisFastAnalysisClientLegalProceedingEntity,
      CnisFastAnalysisClientLegalProceedingTypeormEntity,
    );

    return this.create(mappedData);
  }
}
