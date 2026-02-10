import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SpeechGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/speech-generator.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { SpeechGeneratorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/speech-generator/domain/repository/speech-generator/command/speech-generator.command.repository.gateway';
import { SpeechGeneratorEntity } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator/speech-generator.entity';
import { SpeechGeneratorId } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator/value-object/speech-generator-id/speech-generator-id.value-object';

@Injectable()
export class SpeechGeneratorTypeormCommandRepository
  extends BaseTypeormCommandRepository<SpeechGeneratorTypeormEntity>
  implements SpeechGeneratorCommandRepositoryGateway
{
  protected readonly _type = SpeechGeneratorTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(SpeechGeneratorTypeormEntity)
    repository: Repository<SpeechGeneratorTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createSpeechGenerator(props: SpeechGeneratorEntity): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SpeechGeneratorEntity,
      SpeechGeneratorTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateSpeechGenerator(
    id: SpeechGeneratorId,
    props: SpeechGeneratorEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SpeechGeneratorEntity,
      SpeechGeneratorTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public deleteSpeechGenerator(
    id: SpeechGeneratorId,
    updatedBy: OrganizationMemberId,
  ): TransactionType {
    return this.update(id.toString(), {
      deletedAt: new Date(),
      updatedBy: { id: updatedBy.toString() } as { id: string },
    });
  }
}
