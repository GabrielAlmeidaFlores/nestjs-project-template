import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { GeneralUrbanRetirementGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GeneralUrbanRetirementGrantCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant/command/general-urban-retirement-grant.command.repository.gateway';
import { GeneralUrbanRetirementGrantEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/general-urban-retirement-grant.entity';
import { GeneralUrbanRetirementGrantId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/value-object/general-urban-retirement-grant-id.value-object';

@Injectable()
export class GeneralUrbanRetirementGrantTypeormCommandRepository
  extends BaseTypeormCommandRepository<GeneralUrbanRetirementGrantTypeormEntity>
  implements GeneralUrbanRetirementGrantCommandRepositoryGateway
{
  protected readonly _type =
    GeneralUrbanRetirementGrantTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(GeneralUrbanRetirementGrantTypeormEntity)
    repository: Repository<GeneralUrbanRetirementGrantTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public updateGeneralUrbanRetirementGrant(
    id: GeneralUrbanRetirementGrantId,
    props: GeneralUrbanRetirementGrantEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      GeneralUrbanRetirementGrantEntity,
      GeneralUrbanRetirementGrantTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public createGeneralUrbanRetirementGrant(
    props: GeneralUrbanRetirementGrantEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      GeneralUrbanRetirementGrantEntity,
      GeneralUrbanRetirementGrantTypeormEntity,
    );

    return this.create(mappedData);
  }
}
