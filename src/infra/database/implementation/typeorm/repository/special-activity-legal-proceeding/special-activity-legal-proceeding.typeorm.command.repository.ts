import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SpecialActivityLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-activity-inss-legal-proceeding.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { SpecialActivityAnalysisLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/repository/special-activity-analysis-legal-proceeding/command/special-activity-analysis-legal-proceeding.command.repository.gateway';
import { SpecialActivityLegalProceedingEntity } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/schema/entity/special-activity-legal-proceeding/special-activity-legal-proceeding.entity';
import { SpecialActivityLegalProceedingId } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/schema/entity/special-activity-legal-proceeding/value-object/special-activity-legal-proceeding-id.value-object';

@Injectable()
export class SpecialActivityLegalProceedingTypeormCommandRepository
  extends BaseTypeormCommandRepository<SpecialActivityLegalProceedingTypeormEntity>
  implements SpecialActivityAnalysisLegalProceedingCommandRepositoryGateway
{
  protected readonly _type =
    SpecialActivityLegalProceedingTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(SpecialActivityLegalProceedingTypeormEntity)
    repository: Repository<SpecialActivityLegalProceedingTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public deleteSpecialActivityLegalProceeding(
    id: SpecialActivityLegalProceedingId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  public createSpecialActivityLegalProceeding(
    props: SpecialActivityLegalProceedingEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SpecialActivityLegalProceedingEntity,
      SpecialActivityLegalProceedingTypeormEntity,
    );

    return this.create(mappedData);
  }
}
