import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { GeneralUrbanRetirementReviewPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review-period-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GeneralUrbanRetirementReviewPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-period-document/command/general-urban-retirement-review-period-document.command.repository.gateway';
import { GeneralUrbanRetirementReviewPeriodDocumentEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period-document/general-urban-retirement-review-period-document.entity';
import { GeneralUrbanRetirementReviewPeriodDocumentId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period-document/value-object/general-urban-retirement-review-period-document-id.value-object';

@Injectable()
export class GeneralUrbanRetirementReviewPeriodDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<GeneralUrbanRetirementReviewPeriodDocumentTypeormEntity>
  implements GeneralUrbanRetirementReviewPeriodDocumentCommandRepositoryGateway
{
  protected readonly _type =
    GeneralUrbanRetirementReviewPeriodDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(GeneralUrbanRetirementReviewPeriodDocumentTypeormEntity)
    repository: Repository<GeneralUrbanRetirementReviewPeriodDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public updateGeneralUrbanRetirementReviewPeriodDocument(
    id: GeneralUrbanRetirementReviewPeriodDocumentId,
    props: GeneralUrbanRetirementReviewPeriodDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      GeneralUrbanRetirementReviewPeriodDocumentEntity,
      GeneralUrbanRetirementReviewPeriodDocumentTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public createGeneralUrbanRetirementReviewPeriodDocument(
    props: GeneralUrbanRetirementReviewPeriodDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      GeneralUrbanRetirementReviewPeriodDocumentEntity,
      GeneralUrbanRetirementReviewPeriodDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }
}
