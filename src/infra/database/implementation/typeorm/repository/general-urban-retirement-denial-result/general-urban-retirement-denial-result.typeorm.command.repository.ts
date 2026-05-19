import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { GeneralUrbanRetirementDenialResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-denial-result.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GeneralUrbanRetirementDenialResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/repository/general-urban-retirement-denial-result/command/general-urban-retirement-denial-result.command.repository.gateway';
import { GeneralUrbanRetirementDenialResultEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-result/general-urban-retirement-denial-result.entity';
import { GeneralUrbanRetirementDenialResultId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-result/value-object/general-urban-retirement-denial-result-id/general-urban-retirement-denial-result-id.value-object';

@Injectable()
export class GeneralUrbanRetirementDenialResultTypeormCommandRepository
  extends BaseTypeormCommandRepository<GeneralUrbanRetirementDenialResultTypeormEntity>
  implements GeneralUrbanRetirementDenialResultCommandRepositoryGateway
{
  protected readonly _type =
    GeneralUrbanRetirementDenialResultTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(GeneralUrbanRetirementDenialResultTypeormEntity)
    repository: Repository<GeneralUrbanRetirementDenialResultTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createGeneralUrbanRetirementDenialResult(
    props: GeneralUrbanRetirementDenialResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      GeneralUrbanRetirementDenialResultEntity,
      GeneralUrbanRetirementDenialResultTypeormEntity,
    );
    return this.create(mappedData);
  }

  public updateGeneralUrbanRetirementDenialResult(
    id: GeneralUrbanRetirementDenialResultId,
    props: GeneralUrbanRetirementDenialResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      GeneralUrbanRetirementDenialResultEntity,
      GeneralUrbanRetirementDenialResultTypeormEntity,
    );
    return this.update(id.toString(), mappedData);
  }
}
