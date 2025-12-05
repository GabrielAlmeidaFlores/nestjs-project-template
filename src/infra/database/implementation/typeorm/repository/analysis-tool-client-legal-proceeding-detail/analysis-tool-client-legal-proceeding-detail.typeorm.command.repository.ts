import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { LegalProceedingDetailTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-proceeding-detail.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { AnalysisToolClientLegalProceedingDetailCoomandRepositoryGateway } from '@module/customer/legal-proceeding/domain/repository/legal-proceeding-detail/command/legal-proceeding-detail.command.repository.gateway';
import { LegalProceedingDetailEntity } from '@module/customer/legal-proceeding/domain/schema/entity/legal-proceeding-detail/legal-proceeding-detail.entity';

@Injectable()
export class AnalysisToolClientLegalProceedingDetailTypeormCommandRepository
  extends BaseTypeormCommandRepository<LegalProceedingDetailTypeormEntity>
  implements AnalysisToolClientLegalProceedingDetailCoomandRepositoryGateway
{
  protected readonly _type =
    AnalysisToolClientLegalProceedingDetailTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(LegalProceedingDetailTypeormEntity)
    repository: Repository<LegalProceedingDetailTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createAnalysisToolClientLegalProceedingDetail(
    props: LegalProceedingDetailEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      LegalProceedingDetailEntity,
      LegalProceedingDetailTypeormEntity,
    );

    return this.create(mappedData);
  }
}
