import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FeeContractGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/fee-contract-generator.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { FeeContractGeneratorQueryRepositoryGateway } from '@module/customer/documents-to-be-generated/module/fee-contract/domain/repository/fee-contract-generator-analysis-result/query/fee-contract-generator.query.repository.gateway';
import { FeeContractGeneratorEntity } from '@module/customer/documents-to-be-generated/module/fee-contract/domain/schema/entity/fee-contract-generator-analysis-result/fee-contract-generator.entity';
import { FeeContractGeneratorId } from '@module/customer/documents-to-be-generated/module/fee-contract/domain/schema/entity/fee-contract-generator-analysis-result/value-object/fee-contract-generator-id/fee-contract-generator-id.value-object';

import type { NotFoundError } from '@core/error/not-found.error';
import type { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class FeeContractGeneratorTypeormQueryRepository implements FeeContractGeneratorQueryRepositoryGateway {
  protected readonly _type = FeeContractGeneratorTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(FeeContractGeneratorTypeormEntity)
    private readonly repository: Repository<FeeContractGeneratorTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {}

  public async findOneByIdOrFail(
    id: FeeContractGeneratorId,
    err: ConstructorType<NotFoundError>,
  ): Promise<FeeContractGeneratorEntity> {
    const result = await this.repository.findOneBy({ id: id.toString() });
    if (!result) {
      throw new err();
    }
    return this.mapperGateway.map(
      result,
      FeeContractGeneratorTypeormEntity,
      FeeContractGeneratorEntity,
    );
  }
}
