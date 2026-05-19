import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { GeneralUrbanRetirementGrantResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant-result.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GeneralUrbanRetirementGrantResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-result/command/general-urban-retirement-grant-result.command.repository.gateway';
import { GeneralUrbanRetirementGrantResultEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-result/general-urban-retirement-grant-result.entity';
import { GeneralUrbanRetirementGrantResultId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-result/value-object/general-urban-retirement-grant-result-id.value-object';

@Injectable()
export class GeneralUrbanRetirementGrantResultTypeormCommandRepository
  extends BaseTypeormCommandRepository<GeneralUrbanRetirementGrantResultTypeormEntity>
  implements GeneralUrbanRetirementGrantResultCommandRepositoryGateway
{
  protected readonly _type =
    GeneralUrbanRetirementGrantResultTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(GeneralUrbanRetirementGrantResultTypeormEntity)
    repository: Repository<GeneralUrbanRetirementGrantResultTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public updateGeneralUrbanRetirementGrantResult(
    id: GeneralUrbanRetirementGrantResultId,
    props: GeneralUrbanRetirementGrantResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      GeneralUrbanRetirementGrantResultEntity,
      GeneralUrbanRetirementGrantResultTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public createGeneralUrbanRetirementGrantResult(
    props: GeneralUrbanRetirementGrantResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      GeneralUrbanRetirementGrantResultEntity,
      GeneralUrbanRetirementGrantResultTypeormEntity,
    );

    return this.create(mappedData);
  }
}
