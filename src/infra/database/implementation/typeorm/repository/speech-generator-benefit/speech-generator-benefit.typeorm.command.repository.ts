import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SpeechGeneratorBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/speech-generator-benefit.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { SpeechGeneratorBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/speech-generator/domain/repository/speech-generator-benefit/command/speech-generator-benefit.command.repository.gateway';
import { SpeechGeneratorBenefitEntity } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-benefit/speech-generator-benefit.entity';
import { SpeechGeneratorBenefitId } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-benefit/value-object/speech-generator-benefit-id/speech-generator-benefit-id.value-object';

@Injectable()
export class SpeechGeneratorBenefitTypeormCommandRepository
  extends BaseTypeormCommandRepository<SpeechGeneratorBenefitTypeormEntity>
  implements SpeechGeneratorBenefitCommandRepositoryGateway
{
  protected readonly _type =
    SpeechGeneratorBenefitTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(SpeechGeneratorBenefitTypeormEntity)
    repository: Repository<SpeechGeneratorBenefitTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public deleteSpeechGeneratorBenefit(
    id: SpeechGeneratorBenefitId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  public createSpeechGeneratorBenefit(
    props: SpeechGeneratorBenefitEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SpeechGeneratorBenefitEntity,
      SpeechGeneratorBenefitTypeormEntity,
    );

    return this.create(mappedData);
  }
}
