import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { GeneralUrbanRetirementDenialResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-denial-result.typeorm.entity';
import { GeneralUrbanRetirementDenialTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-denial.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GeneralUrbanRetirementDenialCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/repository/general-urban-retirement-denial/command/general-urban-retirement-denial.command.repository.gateway';
import { GeneralUrbanRetirementDenialEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial/general-urban-retirement-denial.entity';
import { GeneralUrbanRetirementDenialId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial/value-object/general-urban-retirement-denial-id/general-urban-retirement-denial-id.value-object';
import { GeneralUrbanRetirementDenialResultId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-result/value-object/general-urban-retirement-denial-result-id/general-urban-retirement-denial-result-id.value-object';

@Injectable()
export class GeneralUrbanRetirementDenialTypeormCommandRepository
  extends BaseTypeormCommandRepository<GeneralUrbanRetirementDenialTypeormEntity>
  implements GeneralUrbanRetirementDenialCommandRepositoryGateway
{
  protected readonly _type =
    GeneralUrbanRetirementDenialTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(GeneralUrbanRetirementDenialTypeormEntity)
    repository: Repository<GeneralUrbanRetirementDenialTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createGeneralUrbanRetirementDenial(
    props: GeneralUrbanRetirementDenialEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      GeneralUrbanRetirementDenialEntity,
      GeneralUrbanRetirementDenialTypeormEntity,
    );
    return this.create(mappedData);
  }

  public updateGeneralUrbanRetirementDenial(
    id: GeneralUrbanRetirementDenialId,
    props: GeneralUrbanRetirementDenialEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      GeneralUrbanRetirementDenialEntity,
      GeneralUrbanRetirementDenialTypeormEntity,
    );
    return this.update(id.toString(), mappedData);
  }

  public updateGeneralUrbanRetirementDenialResultId(
    id: GeneralUrbanRetirementDenialId,
    resultId: GeneralUrbanRetirementDenialResultId,
  ): TransactionType {
    return this.update(id.toString(), {
      generalUrbanRetirementDenialResult:
        GeneralUrbanRetirementDenialResultTypeormEntity.build({
          id: resultId.toString(),
        } as GeneralUrbanRetirementDenialResultTypeormEntity),
    });
  }
}
