import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { AudienceQuestionGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/audience-question-generator.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { AudienceQuestionGeneratorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/audience-question-generator/domain/repository/audience-question-generator/command/audience-question-generator.command.repository.gateway';
import { AudienceQuestionGeneratorEntity } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator/audience-question-generator.entity';
import { AudienceQuestionGeneratorId } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator/value-object/audience-question-generator-id/audience-question-generator-id.value-object';

@Injectable()
export class AudienceQuestionGeneratorTypeormCommandRepository
  extends BaseTypeormCommandRepository<AudienceQuestionGeneratorTypeormEntity>
  implements AudienceQuestionGeneratorCommandRepositoryGateway
{
  protected readonly _type =
    AudienceQuestionGeneratorTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(AudienceQuestionGeneratorTypeormEntity)
    repository: Repository<AudienceQuestionGeneratorTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createAudienceQuestionGenerator(
    props: AudienceQuestionGeneratorEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AudienceQuestionGeneratorEntity,
      AudienceQuestionGeneratorTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateAudienceQuestionGenerator(
    id: AudienceQuestionGeneratorId,
    props: AudienceQuestionGeneratorEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AudienceQuestionGeneratorEntity,
      AudienceQuestionGeneratorTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public deleteAudienceQuestionGenerator(
    id: AudienceQuestionGeneratorId,
    updatedBy: OrganizationMemberId,
  ): TransactionType {
    return this.update(id.toString(), {
      deletedAt: new Date(),
      updatedBy: {
        id: updatedBy.toString(),
      },
    });
  }
}
