import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { BpcDisabilityGrantLegalRepresentativeOfAMinorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-grant-legal-representative-of-a-minor.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { BpcDisabilityGrantLegalRepresentativeOfAMinorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/repository/bpc-disability-grant-legal-representative-of-a-minor/command/bpc-disability-grant-legal-representative-of-a-minor.command.repository.gateway';
import { BpcDisabilityGrantId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant/value-object/bpc-disability-grant-id/bpc-disability-grant-id.value-object';
import { BpcDisabilityGrantLegalRepresentativeOfAMinorEntity } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-legal-representative-of-a-minor/bpc-disability-grant-legal-representative-of-a-minor.entity';
import { BpcDisabilityGrantLegalRepresentativeOfAMinorId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-legal-representative-of-a-minor/value-object/bpc-disability-grant-legal-representative-of-a-minor-id/bpc-disability-grant-legal-representative-of-a-minor-id.value-object';

@Injectable()
export class BpcDisabilityGrantLegalRepresentativeOfAMinorTypeormCommandRepository
  extends BaseTypeormCommandRepository<BpcDisabilityGrantLegalRepresentativeOfAMinorTypeormEntity>
  implements
    BpcDisabilityGrantLegalRepresentativeOfAMinorCommandRepositoryGateway
{
  protected readonly _type =
    BpcDisabilityGrantLegalRepresentativeOfAMinorTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      BpcDisabilityGrantLegalRepresentativeOfAMinorTypeormEntity,
    )
    repository: Repository<BpcDisabilityGrantLegalRepresentativeOfAMinorTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createBpcDisabilityGrantLegalRepresentativeOfAMinor(
    props: BpcDisabilityGrantLegalRepresentativeOfAMinorEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      BpcDisabilityGrantLegalRepresentativeOfAMinorEntity,
      BpcDisabilityGrantLegalRepresentativeOfAMinorTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateBpcDisabilityGrantLegalRepresentativeOfAMinor(
    bpcDisabilityGrantLegalRepresentativeOfAMinorId: BpcDisabilityGrantLegalRepresentativeOfAMinorId,
    props: BpcDisabilityGrantLegalRepresentativeOfAMinorEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      BpcDisabilityGrantLegalRepresentativeOfAMinorEntity,
      BpcDisabilityGrantLegalRepresentativeOfAMinorTypeormEntity,
    );

    return this.update(
      bpcDisabilityGrantLegalRepresentativeOfAMinorId.toString(),
      mappedData,
    );
  }

  public deleteBpcDisabilityGrantLegalRepresentativeOfAMinor(
    bpcDisabilityGrantLegalRepresentativeOfAMinorId: BpcDisabilityGrantLegalRepresentativeOfAMinorId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(
          BpcDisabilityGrantLegalRepresentativeOfAMinorTypeormEntity,
        )
        .delete(bpcDisabilityGrantLegalRepresentativeOfAMinorId.toString());
    };
  }

  public deleteAllByBpcDisabilityGrantId(
    bpcDisabilityGrantId: BpcDisabilityGrantId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(
          BpcDisabilityGrantLegalRepresentativeOfAMinorTypeormEntity,
        )
        .createQueryBuilder()
        .delete()
        .where('_bpc_disability_grant_id = :bpcDisabilityGrantId', {
          bpcDisabilityGrantId: bpcDisabilityGrantId.toString(),
        })
        .execute();
    };
  }
}
