import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { TemporaryIncapacityBenefitTerminationInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination-inss-benefit.typeorm.entity';
import { TemporaryIncapacityBenefitTerminationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { TemporaryIncapacityBenefitTerminationId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/value-object/temporary-incapacity-benefit-termination-id.value-object';
import { TemporaryIncapacityBenefitTerminationInssBenefitEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-inss-benefit/temporary-incapacity-benefit-termination-inss-benefit.entity';
import { TemporaryIncapacityBenefitTerminationInssBenefitId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-inss-benefit/value-object/temporary-incapacity-benefit-termination-inss-benefit-id.value-object';

@Injectable()
export class TemporaryIncapacityBenefitTerminationInssBenefitEntityAutoMapperProfile {
  protected readonly _type =
    TemporaryIncapacityBenefitTerminationInssBenefitEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    createMap(
      this.mapper,
      TemporaryIncapacityBenefitTerminationInssBenefitTypeormEntity,
      TemporaryIncapacityBenefitTerminationInssBenefitEntity,
      constructUsing(
        (
          source: TemporaryIncapacityBenefitTerminationInssBenefitTypeormEntity,
        ): TemporaryIncapacityBenefitTerminationInssBenefitEntity => {
          if (!source.temporaryIncapacityBenefitTermination) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                TemporaryIncapacityBenefitTerminationInssBenefitEntity.name,
              sourceClass:
                TemporaryIncapacityBenefitTerminationInssBenefitTypeormEntity.name,
            });
          }

          return new TemporaryIncapacityBenefitTerminationInssBenefitEntity({
            id: new TemporaryIncapacityBenefitTerminationInssBenefitId(
              source.id,
            ),
            inssBenefit: source.inssBenefit,
            temporaryIncapacityBenefitTerminationId:
              new TemporaryIncapacityBenefitTerminationId(
                source.temporaryIncapacityBenefitTermination.id,
              ),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          });
        },
      ),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    createMap(
      this.mapper,
      TemporaryIncapacityBenefitTerminationInssBenefitEntity,
      TemporaryIncapacityBenefitTerminationInssBenefitTypeormEntity,
      constructUsing(
        (
          source: TemporaryIncapacityBenefitTerminationInssBenefitEntity,
        ): TemporaryIncapacityBenefitTerminationInssBenefitTypeormEntity =>
          TemporaryIncapacityBenefitTerminationInssBenefitTypeormEntity.build({
            id: source.id.toString(),
            inssBenefit: source.inssBenefit,
            temporaryIncapacityBenefitTermination:
              TemporaryIncapacityBenefitTerminationTypeormEntity.build({
                id: source.temporaryIncapacityBenefitTerminationId.toString(),
              } as TemporaryIncapacityBenefitTerminationTypeormEntity),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
