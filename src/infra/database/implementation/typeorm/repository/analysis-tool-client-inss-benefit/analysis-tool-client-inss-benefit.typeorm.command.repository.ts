import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { AnalysisToolClientInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client-inss-benefit.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { AnalysisToolClientInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-inss-benefit/command/analysis-tool-client-inss-benefit.command.repository.gateway';
import { AnalysisToolClientInssBenefitEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-inss-benefit/analysis-tool-client-inss-benefit.entity';
import { AnalysisToolClientInssBenefitId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-inss-benefit/value-object/analysis-tool-client-inss-benefit-id/analysis-tool-client-inss-benefit-id.value-object';

@Injectable()
export class AnalysisToolClientInssBenefitTypeormCommandRepository
  extends BaseTypeormCommandRepository<AnalysisToolClientInssBenefitTypeormEntity>
  implements AnalysisToolClientInssBenefitCommandRepositoryGateway
{
  protected readonly _type =
    AnalysisToolClientInssBenefitTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(AnalysisToolClientInssBenefitTypeormEntity)
    repository: Repository<AnalysisToolClientInssBenefitTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public deleteAnalysisToolClientInssBenefit(
    id: AnalysisToolClientInssBenefitId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  public createAnalysisToolClientInssBenefit(
    props: AnalysisToolClientInssBenefitEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AnalysisToolClientInssBenefitEntity,
      AnalysisToolClientInssBenefitTypeormEntity,
    );

    return this.create(mappedData);
  }
}
