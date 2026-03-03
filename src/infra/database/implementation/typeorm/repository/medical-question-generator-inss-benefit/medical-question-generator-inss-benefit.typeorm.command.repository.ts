import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { MedicalQuestionGeneratorInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-question-generator-inss-benefit.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { MedicalQuestionGeneratorInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/medical-question-generator/domain/repository/medical-question-generator-inss-benefit/command/medical-question-generator-inss-benefit.command.repository.gateway';
import { MedicalQuestionGeneratorInssBenefitEntity } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-inss-benefit/medical-question-generator-inss-benefit.entity';
import { MedicalQuestionGeneratorInssBenefitId } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-inss-benefit/value-object/medical-question-generator-inss-benefit-id/medical-question-generator-inss-benefit-id.value-object';

@Injectable()
export class MedicalQuestionGeneratorInssBenefitTypeormCommandRepository
  extends BaseTypeormCommandRepository<MedicalQuestionGeneratorInssBenefitTypeormEntity>
  implements MedicalQuestionGeneratorInssBenefitCommandRepositoryGateway
{
  protected readonly _type =
    MedicalQuestionGeneratorInssBenefitTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(MedicalQuestionGeneratorInssBenefitTypeormEntity)
    repository: Repository<MedicalQuestionGeneratorInssBenefitTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public deleteMedicalQuestionGeneratorInssBenefit(
    id: MedicalQuestionGeneratorInssBenefitId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  public createMedicalQuestionGeneratorInssBenefit(
    props: MedicalQuestionGeneratorInssBenefitEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      MedicalQuestionGeneratorInssBenefitEntity,
      MedicalQuestionGeneratorInssBenefitTypeormEntity,
    );

    return this.create(mappedData);
  }
}
