import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { AudienceQuestionGeneratorResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/audience-question-generator-result.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { AudienceQuestionGeneratorResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/audience-question-generator/domain/repository/audience-question-generator-result/command/audience-question-generator-result.command.repository.gateway';
import { AudienceQuestionGeneratorResultEntity } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-result/audience-question-generator-result.entity';
import { AudienceQuestionGeneratorResultId } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-result/value-object/audience-question-generator-result-id/audience-question-generator-result-id.value-object';

@Injectable()
export class AudienceQuestionGeneratorResultTypeormCommandRepository
  extends BaseTypeormCommandRepository<AudienceQuestionGeneratorResultTypeormEntity>
  implements AudienceQuestionGeneratorResultCommandRepositoryGateway
{
  protected readonly _type =
    AudienceQuestionGeneratorResultTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(AudienceQuestionGeneratorResultTypeormEntity)
    repository: Repository<AudienceQuestionGeneratorResultTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createAudienceQuestionGeneratorResult(
    props: AudienceQuestionGeneratorResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AudienceQuestionGeneratorResultEntity,
      AudienceQuestionGeneratorResultTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateAudienceQuestionGeneratorResult(
    id: AudienceQuestionGeneratorResultId,
    props: AudienceQuestionGeneratorResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AudienceQuestionGeneratorResultEntity,
      AudienceQuestionGeneratorResultTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }
}
