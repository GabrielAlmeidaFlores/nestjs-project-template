import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { MedicalQuestionGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-question-generator.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { MedicalQuestionGeneratorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/medical-question-generator/domain/repository/medical-question-generator/command/medical-question-generator.command.repository.gateway';
import { MedicalQuestionGeneratorEntity } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator/medical-question-generator.entity';
import { MedicalQuestionGeneratorId } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator/value-object/medical-question-generator-id/medical-question-generator-id.value-object';

@Injectable()
export class MedicalQuestionGeneratorTypeormCommandRepository
  extends BaseTypeormCommandRepository<MedicalQuestionGeneratorTypeormEntity>
  implements MedicalQuestionGeneratorCommandRepositoryGateway
{
  protected readonly _type =
    MedicalQuestionGeneratorTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(MedicalQuestionGeneratorTypeormEntity)
    repository: Repository<MedicalQuestionGeneratorTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createMedicalQuestionGenerator(
    props: MedicalQuestionGeneratorEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      MedicalQuestionGeneratorEntity,
      MedicalQuestionGeneratorTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateMedicalQuestionGenerator(
    id: MedicalQuestionGeneratorId,
    props: MedicalQuestionGeneratorEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      MedicalQuestionGeneratorEntity,
      MedicalQuestionGeneratorTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public deleteMedicalQuestionGenerator(
    id: MedicalQuestionGeneratorId,
  ): TransactionType {
    return this.update(id.toString(), {
      deletedAt: new Date(),
    });
  }
}
