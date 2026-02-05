import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { MedicalQuestionGeneratorResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-question-generator-result.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { MedicalQuestionGeneratorResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/medical-question-generator/domain/repository/medical-question-generator-result/command/medical-question-generator-result.command.repository.gateway';
import { MedicalQuestionGeneratorResultEntity } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-result/medical-question-generator-result.entity';
import { MedicalQuestionGeneratorResultId } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-result/value-object/medical-question-generator-result-id/medical-question-generator-result-id.value-object';

@Injectable()
export class MedicalQuestionGeneratorResultTypeormCommandRepository
  extends BaseTypeormCommandRepository<MedicalQuestionGeneratorResultTypeormEntity>
  implements MedicalQuestionGeneratorResultCommandRepositoryGateway
{
  protected readonly _type =
    MedicalQuestionGeneratorResultTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(MedicalQuestionGeneratorResultTypeormEntity)
    repository: Repository<MedicalQuestionGeneratorResultTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createMedicalQuestionGeneratorResult(
    props: MedicalQuestionGeneratorResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      MedicalQuestionGeneratorResultEntity,
      MedicalQuestionGeneratorResultTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateMedicalQuestionGeneratorResult(
    id: MedicalQuestionGeneratorResultId,
    props: MedicalQuestionGeneratorResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      MedicalQuestionGeneratorResultEntity,
      MedicalQuestionGeneratorResultTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }
}
