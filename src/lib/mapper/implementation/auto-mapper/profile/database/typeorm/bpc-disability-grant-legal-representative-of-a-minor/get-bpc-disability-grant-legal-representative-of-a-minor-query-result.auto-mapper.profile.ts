import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { BpcDisabilityGrantLegalRepresentativeOfAMinorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-grant-legal-representative-of-a-minor.typeorm.entity';
import { GetBpcDisabilityGrantLegalRepresentativeOfAMinorQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/repository/bpc-disability-grant/query/result/get-bpc-disability-grant-legal-representative-of-a-minor.query.result';
import { BpcDisabilityGrantLegalRepresentativeOfAMinorId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-legal-representative-of-a-minor/value-object/bpc-disability-grant-legal-representative-of-a-minor-id/bpc-disability-grant-legal-representative-of-a-minor-id.value-object';

@Injectable()
export class GetBpcDisabilityGrantLegalRepresentativeOfAMinorQueryResultAutoMapperProfile {
  protected readonly _type =
    GetBpcDisabilityGrantLegalRepresentativeOfAMinorQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    createMap(
      this.mapper,
      BpcDisabilityGrantLegalRepresentativeOfAMinorTypeormEntity,
      GetBpcDisabilityGrantLegalRepresentativeOfAMinorQueryResult,
      constructUsing(
        (
          source: BpcDisabilityGrantLegalRepresentativeOfAMinorTypeormEntity,
        ): GetBpcDisabilityGrantLegalRepresentativeOfAMinorQueryResult =>
          GetBpcDisabilityGrantLegalRepresentativeOfAMinorQueryResult.build({
            id: new BpcDisabilityGrantLegalRepresentativeOfAMinorId(source.id),
            name: source.name,
            federalDocument:
              source.federalDocument !== null
                ? new FederalDocument(source.federalDocument)
                : null,
            birthDate: source.birthDate,
            minorUnderCustody: source.minorUnderCustody,
            kinship: source.kinship,
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt ?? null,
          }),
      ),
    );
  }
}
