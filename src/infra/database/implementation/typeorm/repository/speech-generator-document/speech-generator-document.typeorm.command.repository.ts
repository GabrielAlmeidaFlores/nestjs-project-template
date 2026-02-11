import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SpeechGeneratorDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/speech-generator-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { SpeechGeneratorDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/speech-generator/domain/repository/speech-generator-document/command/speech-generator-document.command.repository.gateway';
import { SpeechGeneratorDocumentEntity } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-document/speech-generator-document.entity';
import { SpeechGeneratorDocumentId } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-document/value-object/speech-generator-document-id/speech-generator-document-id.value-object';

@Injectable()
export class SpeechGeneratorDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<SpeechGeneratorDocumentTypeormEntity>
  implements SpeechGeneratorDocumentCommandRepositoryGateway
{
  protected readonly _type =
    SpeechGeneratorDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(SpeechGeneratorDocumentTypeormEntity)
    repository: Repository<SpeechGeneratorDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createSpeechGeneratorDocument(
    props: SpeechGeneratorDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SpeechGeneratorDocumentEntity,
      SpeechGeneratorDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteSpeechGeneratorDocument(
    id: SpeechGeneratorDocumentId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
