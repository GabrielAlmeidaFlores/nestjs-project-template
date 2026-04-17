import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { GeneralUrbanRetirementDenialInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-denial-inss-benefit.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GeneralUrbanRetirementDenialInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/repository/general-urban-retirement-denial-inss-benefit/command/general-urban-retirement-denial-inss-benefit.command.repository.gateway';
import { GeneralUrbanRetirementDenialId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial/value-object/general-urban-retirement-denial-id/general-urban-retirement-denial-id.value-object';
import { GeneralUrbanRetirementDenialInssBenefitEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-inss-benefit/general-urban-retirement-denial-inss-benefit.entity';

@Injectable()
export class GeneralUrbanRetirementDenialInssBenefitTypeormCommandRepository
  extends BaseTypeormCommandRepository<GeneralUrbanRetirementDenialInssBenefitTypeormEntity>
  implements GeneralUrbanRetirementDenialInssBenefitCommandRepositoryGateway
{
  protected readonly _type =
    GeneralUrbanRetirementDenialInssBenefitTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(GeneralUrbanRetirementDenialInssBenefitTypeormEntity)
    repository: Repository<GeneralUrbanRetirementDenialInssBenefitTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createGeneralUrbanRetirementDenialInssBenefit(
    props: GeneralUrbanRetirementDenialInssBenefitEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      GeneralUrbanRetirementDenialInssBenefitEntity,
      GeneralUrbanRetirementDenialInssBenefitTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllByGeneralUrbanRetirementDenialId(
    generalUrbanRetirementDenialId: GeneralUrbanRetirementDenialId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(GeneralUrbanRetirementDenialInssBenefitTypeormEntity)
        .softDelete({
          generalUrbanRetirementDenial: {
            id: generalUrbanRetirementDenialId.toString(),
          },
        });
    };
  }
}
