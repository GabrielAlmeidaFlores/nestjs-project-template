import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { TemporaryIncapacityBenefitRejectionInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection-inss-benefit.typeorm.entity';
import { TemporaryIncapacityBenefitRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { TemporaryIncapacityBenefitRejectionId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/value-object/temporary-incapacity-benefit-rejection-id.value-object';
import { TemporaryIncapacityBenefitRejectionInssBenefitEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-inss-benefit/temporary-incapacity-benefit-rejection-inss-benefit.entity';
import { TemporaryIncapacityBenefitRejectionInssBenefitId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-inss-benefit/value-object/temporary-incapacity-benefit-rejection-inss-benefit-id.value-object';

@Injectable()
export class TemporaryIncapacityBenefitRejectionInssBenefitEntityAutoMapperProfile {
  protected readonly _type =
    TemporaryIncapacityBenefitRejectionInssBenefitEntityAutoMapperProfile.name;

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
      TemporaryIncapacityBenefitRejectionInssBenefitTypeormEntity,
      TemporaryIncapacityBenefitRejectionInssBenefitEntity,
      constructUsing(
        (
          source: TemporaryIncapacityBenefitRejectionInssBenefitTypeormEntity,
        ): TemporaryIncapacityBenefitRejectionInssBenefitEntity => {
          if (!source.temporaryIncapacityBenefitRejection) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                TemporaryIncapacityBenefitRejectionInssBenefitEntity.name,
              sourceClass:
                TemporaryIncapacityBenefitRejectionInssBenefitTypeormEntity.name,
            });
          }

          return new TemporaryIncapacityBenefitRejectionInssBenefitEntity({
            id: new TemporaryIncapacityBenefitRejectionInssBenefitId(source.id),
            inssBenefit: source.inssBenefit,
            temporaryIncapacityBenefitRejectionId:
              new TemporaryIncapacityBenefitRejectionId(
                source.temporaryIncapacityBenefitRejection.id,
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
      TemporaryIncapacityBenefitRejectionInssBenefitEntity,
      TemporaryIncapacityBenefitRejectionInssBenefitTypeormEntity,
      constructUsing(
        (
          source: TemporaryIncapacityBenefitRejectionInssBenefitEntity,
        ): TemporaryIncapacityBenefitRejectionInssBenefitTypeormEntity =>
          TemporaryIncapacityBenefitRejectionInssBenefitTypeormEntity.build({
            id: source.id.toString(),
            inssBenefit: source.inssBenefit,
            temporaryIncapacityBenefitRejection:
              TemporaryIncapacityBenefitRejectionTypeormEntity.build({
                id: source.temporaryIncapacityBenefitRejectionId.toString(),
              } as TemporaryIncapacityBenefitRejectionTypeormEntity),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
