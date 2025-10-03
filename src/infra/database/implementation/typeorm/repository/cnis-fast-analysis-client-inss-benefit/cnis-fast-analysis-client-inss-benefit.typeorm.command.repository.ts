import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { CnisFastAnalysisClientInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis-client-inss-benefit.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { CnisFastAnalysisClientInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tools/domain/repository/cnis-fast-analysis-client-inss-benefit/command/cnis-fast-analysis-client-inss-benefit.command.repository.gateway';
import { CnisFastAnalysisClientInssBenefitEntity } from '@module/customer/analysis-tools/domain/schema/entity/cnis-fast-analysis-client-inss-benefit/cnis-fast-analysis-client-inss-benefit.entity';
import { CnisFastAnalysisClientInssBenefitId } from '@module/customer/analysis-tools/domain/schema/entity/cnis-fast-analysis-client-inss-benefit/value-object/cnis-fast-analysis-client-inss-benefit-id/cnis-fast-analysis-client-inss-benefit-id.value-object';

@Injectable()
export class CnisFastAnalysisClientInssBenefitTypeormCommandRepository
  extends BaseTypeormCommandRepository<CnisFastAnalysisClientInssBenefitTypeormEntity>
  implements CnisFastAnalysisClientInssBenefitCommandRepositoryGateway
{
  protected readonly _type =
    CnisFastAnalysisClientInssBenefitTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(CnisFastAnalysisClientInssBenefitTypeormEntity)
    repository: Repository<CnisFastAnalysisClientInssBenefitTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public deleteCnisFastAnalysisClientInssBenefit(
    id: CnisFastAnalysisClientInssBenefitId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  public createCnisFastAnalysisClientInssBenefit(
    props: CnisFastAnalysisClientInssBenefitEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      CnisFastAnalysisClientInssBenefitEntity,
      CnisFastAnalysisClientInssBenefitTypeormEntity,
    );

    return this.create(mappedData);
  }
}
