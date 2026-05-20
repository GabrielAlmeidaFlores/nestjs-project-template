import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { FeeContractGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/fee-contract-generator.typeorm.entity';
import { FeeContractGeneratorEntity } from '@module/customer/documents-to-be-generated/module/fee-contract/domain/schema/entity/fee-contract-generator-analysis-result/fee-contract-generator.entity';
import { FeeContractGeneratorId } from '@module/customer/documents-to-be-generated/module/fee-contract/domain/schema/entity/fee-contract-generator-analysis-result/value-object/fee-contract-generator-id/fee-contract-generator-id.value-object';

@Injectable()
export class FeeContractGeneratorEntityAutoMapperProfile {
  protected readonly _type = FeeContractGeneratorEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: FeeContractGeneratorTypeormEntity,
    ): FeeContractGeneratorEntity => {
      return new FeeContractGeneratorEntity({
        ...source,
        id: new FeeContractGeneratorId(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      FeeContractGeneratorTypeormEntity,
      FeeContractGeneratorEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: FeeContractGeneratorEntity,
    ): FeeContractGeneratorTypeormEntity => {
      return FeeContractGeneratorTypeormEntity.build({
        ...source,
        id: source.id.toString(),
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      FeeContractGeneratorEntity,
      FeeContractGeneratorTypeormEntity,
      mappingFunction,
    );
  }
}
