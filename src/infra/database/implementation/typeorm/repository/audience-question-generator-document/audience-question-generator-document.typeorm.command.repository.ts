import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { AudienceQuestionGeneratorDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/audience-question-generator-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { AudienceQuestionGeneratorDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/audience-question-generator/domain/repository/audience-question-generator-document/command/audience-question-generator-document.command.repository.gateway';
import { AudienceQuestionGeneratorDocumentEntity } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-document/audience-question-generator-document.entity';
import { AudienceQuestionGeneratorDocumentId } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-document/value-object/audience-question-generator-document-id/audience-question-generator-document-id.value-object';

@Injectable()
export class AudienceQuestionGeneratorDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<AudienceQuestionGeneratorDocumentTypeormEntity>
  implements AudienceQuestionGeneratorDocumentCommandRepositoryGateway
{
  protected readonly _type =
    AudienceQuestionGeneratorDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(AudienceQuestionGeneratorDocumentTypeormEntity)
    repository: Repository<AudienceQuestionGeneratorDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createAudienceQuestionGeneratorDocument(
    props: AudienceQuestionGeneratorDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AudienceQuestionGeneratorDocumentEntity,
      AudienceQuestionGeneratorDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAudienceQuestionGeneratorDocument(
    id: AudienceQuestionGeneratorDocumentId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
