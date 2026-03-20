import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { GeneralUrbanRetirementGrantLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant-legal-proceeding.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GeneralUrbanRetirementGrantLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-legal-proceeding/command/general-urban-retirement-grant-legal-proceeding.command.repository.gateway';
import { GeneralUrbanRetirementGrantLegalProceedingEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-legal-proceeding/general-urban-retirement-grant-legal-proceeding.entity';
import { GeneralUrbanRetirementGrantLegalProceedingId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-legal-proceeding/value-object/general-urban-retirement-grant-legal-proceeding-id.value-object';

@Injectable()
export class GeneralUrbanRetirementGrantLegalProceedingTypeormCommandRepository
  extends BaseTypeormCommandRepository<GeneralUrbanRetirementGrantLegalProceedingTypeormEntity>
  implements GeneralUrbanRetirementGrantLegalProceedingCommandRepositoryGateway
{
  protected readonly _type =
    GeneralUrbanRetirementGrantLegalProceedingTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(GeneralUrbanRetirementGrantLegalProceedingTypeormEntity)
    repository: Repository<GeneralUrbanRetirementGrantLegalProceedingTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createGeneralUrbanRetirementGrantLegalProceeding(
    props: GeneralUrbanRetirementGrantLegalProceedingEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      GeneralUrbanRetirementGrantLegalProceedingEntity,
      GeneralUrbanRetirementGrantLegalProceedingTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteGeneralUrbanRetirementGrantLegalProceeding(
    id: GeneralUrbanRetirementGrantLegalProceedingId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
