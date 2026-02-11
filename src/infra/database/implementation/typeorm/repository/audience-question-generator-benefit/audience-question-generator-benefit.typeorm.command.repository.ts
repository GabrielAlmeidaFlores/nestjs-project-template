import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { AudienceQuestionGeneratorBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/audience-question-generator-benefit.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { AudienceQuestionGeneratorBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/audience-question-generator/domain/repository/audience-question-generator-benefit/command/audience-question-generator-benefit.command.repository.gateway';
import { AudienceQuestionGeneratorBenefitEntity } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-benefit/audience-question-generator-benefit.entity';
import { AudienceQuestionGeneratorBenefitId } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-benefit/value-object/audience-question-generator-benefit-id/audience-question-generator-benefit-id.value-object';

@Injectable()
export class AudienceQuestionGeneratorBenefitTypeormCommandRepository
  extends BaseTypeormCommandRepository<AudienceQuestionGeneratorBenefitTypeormEntity>
  implements AudienceQuestionGeneratorBenefitCommandRepositoryGateway
{
  protected readonly _type =
    AudienceQuestionGeneratorBenefitTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(AudienceQuestionGeneratorBenefitTypeormEntity)
    repository: Repository<AudienceQuestionGeneratorBenefitTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public deleteAudienceQuestionGeneratorBenefit(
    id: AudienceQuestionGeneratorBenefitId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  public createAudienceQuestionGeneratorBenefit(
    props: AudienceQuestionGeneratorBenefitEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AudienceQuestionGeneratorBenefitEntity,
      AudienceQuestionGeneratorBenefitTypeormEntity,
    );

    return this.create(mappedData);
  }
}
