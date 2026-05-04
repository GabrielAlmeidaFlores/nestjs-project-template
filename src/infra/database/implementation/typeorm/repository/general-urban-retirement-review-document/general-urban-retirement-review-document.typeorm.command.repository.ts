import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { GeneralUrbanRetirementReviewDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GeneralUrbanRetirementReviewDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-document/command/general-urban-retirement-review-document.command.repository.gateway';
import { GeneralUrbanRetirementReviewId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/value-object/general-urban-retirement-review-id.value-object';
import { GeneralUrbanRetirementReviewDocumentEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-document/general-urban-retirement-review-document.entity';

@Injectable()
export class GeneralUrbanRetirementReviewDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<GeneralUrbanRetirementReviewDocumentTypeormEntity>
  implements GeneralUrbanRetirementReviewDocumentCommandRepositoryGateway
{
  protected readonly _type =
    GeneralUrbanRetirementReviewDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(GeneralUrbanRetirementReviewDocumentTypeormEntity)
    repository: Repository<GeneralUrbanRetirementReviewDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createGeneralUrbanRetirementReviewDocument(
    props: GeneralUrbanRetirementReviewDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      GeneralUrbanRetirementReviewDocumentEntity,
      GeneralUrbanRetirementReviewDocumentTypeormEntity,
    );
    return this.create(mappedData);
  }

  public deleteAllByGeneralUrbanRetirementReviewId(
    generalUrbanRetirementReviewId: GeneralUrbanRetirementReviewId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(GeneralUrbanRetirementReviewDocumentTypeormEntity)
        .softDelete({
          generalUrbanRetirementReview: {
            id: generalUrbanRetirementReviewId.toString(),
          },
        });
    };
  }
}
