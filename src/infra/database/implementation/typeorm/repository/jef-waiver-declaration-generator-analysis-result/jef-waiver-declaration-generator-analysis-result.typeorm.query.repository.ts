import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { JefWaiverDeclarationGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/jef-waiver-declaration-generator.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { JefWaiverDeclarationGeneratorQueryRepositoryGateway } from '@module/customer/documents-to-be-generated/module/jef-waiver-declaration/domain/repository/jef-waiver-declaration-generator-analysis-result/query/jef-waiver-declaration-generator.query.repository.gateway';
import { JefWaiverDeclarationGeneratorEntity } from '@module/customer/documents-to-be-generated/module/jef-waiver-declaration/domain/schema/entity/jef-waiver-declaration-generator-analysis-result/jef-waiver-declaration-generator.entity';
import { JefWaiverDeclarationGeneratorId } from '@module/customer/documents-to-be-generated/module/jef-waiver-declaration/domain/schema/entity/jef-waiver-declaration-generator-analysis-result/value-object/jef-waiver-declaration-generator-id/jef-waiver-declaration-generator-id.value-object';

import type { NotFoundError } from '@core/error/not-found.error';
import type { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class JefWaiverDeclarationGeneratorTypeormQueryRepository implements JefWaiverDeclarationGeneratorQueryRepositoryGateway {
  protected readonly _type = JefWaiverDeclarationGeneratorTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(JefWaiverDeclarationGeneratorTypeormEntity)
    private readonly repository: Repository<JefWaiverDeclarationGeneratorTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {}

  public async findOneByIdOrFail(
    id: JefWaiverDeclarationGeneratorId,
    err: ConstructorType<NotFoundError>,
  ): Promise<JefWaiverDeclarationGeneratorEntity> {
    const result = await this.repository.findOneBy({ id: id.toString() });
    if (!result) {
      throw new err();
    }
    return this.mapperGateway.map(
      result,
      JefWaiverDeclarationGeneratorTypeormEntity,
      JefWaiverDeclarationGeneratorEntity,
    );
  }
}
