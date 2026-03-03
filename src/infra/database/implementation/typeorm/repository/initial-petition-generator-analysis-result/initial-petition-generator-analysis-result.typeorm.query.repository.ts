import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { InitialPetitionGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/initial-petition-generator.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { InitialPetitionGeneratorQueryRepositoryGateway } from '@module/customer/documents-to-be-generated/module/initial-petition/domain/repository/initial-petition-generator-analysis-result/query/initial-petition-generator.query.repository.gateway';
import { InitialPetitionGeneratorEntity } from '@module/customer/documents-to-be-generated/module/initial-petition/domain/schema/entity/initial-petition-generator-analysis-result/initial-petition-generator.entity';
import { InitialPetitionGeneratorId } from '@module/customer/documents-to-be-generated/module/initial-petition/domain/schema/entity/initial-petition-generator-analysis-result/value-object/initial-petition-generator-id/initial-petition-generator-id.value-object';

import type { NotFoundError } from '@core/error/not-found.error';
import type { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class InitialPetitionGeneratorTypeormQueryRepository implements InitialPetitionGeneratorQueryRepositoryGateway {
  protected readonly _type =
    InitialPetitionGeneratorTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(InitialPetitionGeneratorTypeormEntity)
    private readonly repository: Repository<InitialPetitionGeneratorTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {}

  public async findOneByIdOrFail(
    id: InitialPetitionGeneratorId,
    err: ConstructorType<NotFoundError>,
  ): Promise<InitialPetitionGeneratorEntity> {
    const result = await this.repository.findOneBy({
      id: id.toString(),
    });

    if (!result) {
      throw new err();
    }

    return this.mapperGateway.map(
      result,
      InitialPetitionGeneratorTypeormEntity,
      InitialPetitionGeneratorEntity,
    );
  }
}
