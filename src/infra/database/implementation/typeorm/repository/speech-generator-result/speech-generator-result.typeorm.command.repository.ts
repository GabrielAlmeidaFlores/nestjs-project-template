import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SpeechGeneratorResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/speech-generator-result.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { SpeechGeneratorResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/speech-generator/domain/repository/speech-generator-result/command/speech-generator-result.command.repository.gateway';
import { SpeechGeneratorResultEntity } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-result/speech-generator-result.entity';
import { SpeechGeneratorResultId } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-result/value-object/speech-generator-result-id/speech-generator-result-id.value-object';

@Injectable()
export class SpeechGeneratorResultTypeormCommandRepository
  extends BaseTypeormCommandRepository<SpeechGeneratorResultTypeormEntity>
  implements SpeechGeneratorResultCommandRepositoryGateway
{
  protected readonly _type = SpeechGeneratorResultTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(SpeechGeneratorResultTypeormEntity)
    repository: Repository<SpeechGeneratorResultTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createSpeechGeneratorResult(
    props: SpeechGeneratorResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SpeechGeneratorResultEntity,
      SpeechGeneratorResultTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateSpeechGeneratorResult(
    id: SpeechGeneratorResultId,
    props: SpeechGeneratorResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SpeechGeneratorResultEntity,
      SpeechGeneratorResultTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }
}
