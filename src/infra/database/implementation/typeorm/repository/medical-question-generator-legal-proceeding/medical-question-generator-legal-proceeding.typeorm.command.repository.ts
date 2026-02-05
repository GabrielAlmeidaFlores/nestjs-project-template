import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { MedicalQuestionGeneratorLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-question-generator-legal-proceeding.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { MedicalQuestionGeneratorLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/medical-question-generator/domain/repository/medical-question-generator-legal-proceeding/command/medical-question-generator-legal-proceeding.command.repository.gateway';
import { MedicalQuestionGeneratorLegalProceedingEntity } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-legal-proceeding/medical-question-generator-legal-proceeding.entity';
import { MedicalQuestionGeneratorLegalProceedingId } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-legal-proceeding/value-object/medical-question-generator-legal-proceeding-id/medical-question-generator-legal-proceeding-id.value-object';

@Injectable()
export class MedicalQuestionGeneratorLegalProceedingTypeormCommandRepository
  extends BaseTypeormCommandRepository<MedicalQuestionGeneratorLegalProceedingTypeormEntity>
  implements MedicalQuestionGeneratorLegalProceedingCommandRepositoryGateway
{
  protected readonly _type =
    MedicalQuestionGeneratorLegalProceedingTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(MedicalQuestionGeneratorLegalProceedingTypeormEntity)
    repository: Repository<MedicalQuestionGeneratorLegalProceedingTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public deleteMedicalQuestionGeneratorLegalProceeding(
    id: MedicalQuestionGeneratorLegalProceedingId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  public createMedicalQuestionGeneratorLegalProceeding(
    props: MedicalQuestionGeneratorLegalProceedingEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      MedicalQuestionGeneratorLegalProceedingEntity,
      MedicalQuestionGeneratorLegalProceedingTypeormEntity,
    );

    return this.create(mappedData);
  }
}
