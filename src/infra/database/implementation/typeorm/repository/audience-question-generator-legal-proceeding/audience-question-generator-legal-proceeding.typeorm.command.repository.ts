import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { AudienceQuestionGeneratorLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/audience-question-generator-legal-proceeding.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { AudienceQuestionGeneratorLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/audience-question-generator/domain/repository/audience-question-generator-legal-proceeding/command/audience-question-generator-legal-proceeding.command.repository.gateway';
import { AudienceQuestionGeneratorLegalProceedingEntity } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-legal-proceeding/audience-question-generator-legal-proceeding.entity';
import { AudienceQuestionGeneratorLegalProceedingId } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-legal-proceeding/value-object/audience-question-generator-legal-proceeding-id/audience-question-generator-legal-proceeding-id.value-object';

@Injectable()
export class AudienceQuestionGeneratorLegalProceedingTypeormCommandRepository
  extends BaseTypeormCommandRepository<AudienceQuestionGeneratorLegalProceedingTypeormEntity>
  implements AudienceQuestionGeneratorLegalProceedingCommandRepositoryGateway
{
  protected readonly _type =
    AudienceQuestionGeneratorLegalProceedingTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(AudienceQuestionGeneratorLegalProceedingTypeormEntity)
    repository: Repository<AudienceQuestionGeneratorLegalProceedingTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public deleteAudienceQuestionGeneratorLegalProceeding(
    id: AudienceQuestionGeneratorLegalProceedingId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  public createAudienceQuestionGeneratorLegalProceeding(
    props: AudienceQuestionGeneratorLegalProceedingEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AudienceQuestionGeneratorLegalProceedingEntity,
      AudienceQuestionGeneratorLegalProceedingTypeormEntity,
    );

    return this.create(mappedData);
  }
}
