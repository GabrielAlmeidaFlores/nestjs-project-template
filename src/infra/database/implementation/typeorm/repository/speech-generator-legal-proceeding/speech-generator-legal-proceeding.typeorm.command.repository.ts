import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SpeechGeneratorLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/speech-generator-legal-proceeding.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { SpeechGeneratorLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/speech-generator/domain/repository/speech-generator-legal-proceeding/command/speech-generator-legal-proceeding.command.repository.gateway';
import { SpeechGeneratorLegalProceedingEntity } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-legal-proceeding/speech-generator-legal-proceeding.entity';
import { SpeechGeneratorLegalProceedingId } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-legal-proceeding/value-object/speech-generator-legal-proceeding-id/speech-generator-legal-proceeding-id.value-object';

@Injectable()
export class SpeechGeneratorLegalProceedingTypeormCommandRepository
  extends BaseTypeormCommandRepository<SpeechGeneratorLegalProceedingTypeormEntity>
  implements SpeechGeneratorLegalProceedingCommandRepositoryGateway
{
  protected readonly _type =
    SpeechGeneratorLegalProceedingTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(SpeechGeneratorLegalProceedingTypeormEntity)
    repository: Repository<SpeechGeneratorLegalProceedingTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public deleteSpeechGeneratorLegalProceeding(
    id: SpeechGeneratorLegalProceedingId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  public createSpeechGeneratorLegalProceeding(
    props: SpeechGeneratorLegalProceedingEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SpeechGeneratorLegalProceedingEntity,
      SpeechGeneratorLegalProceedingTypeormEntity,
    );

    return this.create(mappedData);
  }
}
