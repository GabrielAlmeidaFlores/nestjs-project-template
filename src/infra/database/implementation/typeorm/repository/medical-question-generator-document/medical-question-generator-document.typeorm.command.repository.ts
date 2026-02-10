import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { MedicalQuestionGeneratorDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-question-generator-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { MedicalQuestionGeneratorDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/medical-question-generator/domain/repository/medical-question-generator-document/command/medical-question-generator-document.command.repository.gateway';
import { MedicalQuestionGeneratorDocumentEntity } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-document/medical-question-generator-document.entity';
import { MedicalQuestionGeneratorDocumentId } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-document/value-object/medical-question-generator-document-id/medical-question-generator-document-id.value-object';

@Injectable()
export class MedicalQuestionGeneratorDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<MedicalQuestionGeneratorDocumentTypeormEntity>
  implements MedicalQuestionGeneratorDocumentCommandRepositoryGateway
{
  protected readonly _type =
    MedicalQuestionGeneratorDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(MedicalQuestionGeneratorDocumentTypeormEntity)
    repository: Repository<MedicalQuestionGeneratorDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public deleteMedicalQuestionGeneratorDocument(
    id: MedicalQuestionGeneratorDocumentId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  public createMedicalQuestionGeneratorDocument(
    props: MedicalQuestionGeneratorDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      MedicalQuestionGeneratorDocumentEntity,
      MedicalQuestionGeneratorDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }
}
