import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { GeneralUrbanRetirementDenialPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-denial-period-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GeneralUrbanRetirementDenialPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/repository/general-urban-retirement-denial-period-document/command/general-urban-retirement-denial-period-document.command.repository.gateway';
import { GeneralUrbanRetirementDenialPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/value-object/general-urban-retirement-denial-period-id/general-urban-retirement-denial-period-id.value-object';
import { GeneralUrbanRetirementDenialPeriodDocumentEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period-document/general-urban-retirement-denial-period-document.entity';

@Injectable()
export class GeneralUrbanRetirementDenialPeriodDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<GeneralUrbanRetirementDenialPeriodDocumentTypeormEntity>
  implements GeneralUrbanRetirementDenialPeriodDocumentCommandRepositoryGateway
{
  protected readonly _type =
    GeneralUrbanRetirementDenialPeriodDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(GeneralUrbanRetirementDenialPeriodDocumentTypeormEntity)
    repository: Repository<GeneralUrbanRetirementDenialPeriodDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createGeneralUrbanRetirementDenialPeriodDocument(
    props: GeneralUrbanRetirementDenialPeriodDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      GeneralUrbanRetirementDenialPeriodDocumentEntity,
      GeneralUrbanRetirementDenialPeriodDocumentTypeormEntity,
    );
    return this.create(mappedData);
  }

  public deleteAllByGeneralUrbanRetirementDenialPeriodId(
    generalUrbanRetirementDenialPeriodId: GeneralUrbanRetirementDenialPeriodId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(GeneralUrbanRetirementDenialPeriodDocumentTypeormEntity)
        .softDelete({
          generalUrbanRetirementDenialPeriod: {
            id: generalUrbanRetirementDenialPeriodId.toString(),
          },
        });
    };
  }
}
