import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { SpeechGeneratorBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/speech-generator-benefit.typeorm.entity';
import { SpeechGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/speech-generator.typeorm.entity';
import { SpeechGeneratorBenefitEntity } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-benefit/speech-generator-benefit.entity';

@Injectable()
export class SpeechGeneratorBenefitEntityAutoMapperProfile {
  protected readonly _type = SpeechGeneratorBenefitEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapDomainEntityToOrmEntity();
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: SpeechGeneratorBenefitEntity,
    ): SpeechGeneratorBenefitTypeormEntity => {
      const speechGenerator = {
        id: source.speechGenerator.id.toString(),
      } as SpeechGeneratorTypeormEntity;

      return SpeechGeneratorBenefitTypeormEntity.build({
        id: source.id.toString(),
        inssBenefitNumber: source.inssBenefitNumber,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
        speechGenerator,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      SpeechGeneratorBenefitEntity,
      SpeechGeneratorBenefitTypeormEntity,
      mappingFunction,
    );
  }
}
