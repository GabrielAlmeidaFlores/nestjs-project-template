import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SpecialRetirementGrantLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-legal-proceeding.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { SpecialRetirementGrantLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-legal-proceeding/command/special-retirement-grant-legal-proceeding.command.repository.gateway';
import { SpecialRetirementGrantLegalProceedingEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-legal-proceeding/special-retirement-grant-legal-proceeding.entity';
import { SpecialRetirementGrantLegalProceedingId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-legal-proceeding/value-object/special-retirement-grant-legal-proceeding-id/special-retirement-grant-legal-proceeding-id.value-object';

@Injectable()
export class SpecialRetirementGrantLegalProceedingTypeormCommandRepository
  extends BaseTypeormCommandRepository<SpecialRetirementGrantLegalProceedingTypeormEntity>
  implements SpecialRetirementGrantLegalProceedingCommandRepositoryGateway
{
  protected readonly _type =
    SpecialRetirementGrantLegalProceedingTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(SpecialRetirementGrantLegalProceedingTypeormEntity)
    repository: Repository<SpecialRetirementGrantLegalProceedingTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createSpecialRetirementGrantLegalProceeding(
    props: SpecialRetirementGrantLegalProceedingEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SpecialRetirementGrantLegalProceedingEntity,
      SpecialRetirementGrantLegalProceedingTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteSpecialRetirementGrantLegalProceeding(
    id: SpecialRetirementGrantLegalProceedingId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
