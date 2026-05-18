import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { GeneralUrbanRetirementDenialDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-denial-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GeneralUrbanRetirementDenialDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/repository/general-urban-retirement-denial-document/command/general-urban-retirement-denial-document.command.repository.gateway';
import { GeneralUrbanRetirementDenialId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial/value-object/general-urban-retirement-denial-id/general-urban-retirement-denial-id.value-object';
import { GeneralUrbanRetirementDenialDocumentEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-document/general-urban-retirement-denial-document.entity';

@Injectable()
export class GeneralUrbanRetirementDenialDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<GeneralUrbanRetirementDenialDocumentTypeormEntity>
  implements GeneralUrbanRetirementDenialDocumentCommandRepositoryGateway
{
  protected readonly _type =
    GeneralUrbanRetirementDenialDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(GeneralUrbanRetirementDenialDocumentTypeormEntity)
    repository: Repository<GeneralUrbanRetirementDenialDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createGeneralUrbanRetirementDenialDocument(
    props: GeneralUrbanRetirementDenialDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      GeneralUrbanRetirementDenialDocumentEntity,
      GeneralUrbanRetirementDenialDocumentTypeormEntity,
    );
    return this.create(mappedData);
  }

  public deleteAllByGeneralUrbanRetirementDenialId(
    generalUrbanRetirementDenialId: GeneralUrbanRetirementDenialId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(GeneralUrbanRetirementDenialDocumentTypeormEntity)
        .softDelete({
          generalUrbanRetirementDenial: {
            id: generalUrbanRetirementDenialId.toString(),
          },
        });
    };
  }
}
