import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { BpcElderlyCessationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-cessation.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { BpcElderlyCessationCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/repository/bpc-elderly-cessation/command/bpc-elderly-cessation.command.repository.gateway';
import { BpcElderlyCessationEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/bpc-elderly-cessation.entity';
import { BpcElderlyCessationId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/value-object/bpc-elderly-cessation-id/bpc-elderly-cessation-id.value-object';

@Injectable()
export class BpcElderlyCessationTypeormCommandRepository
  extends BaseTypeormCommandRepository<BpcElderlyCessationTypeormEntity>
  implements BpcElderlyCessationCommandRepositoryGateway
{
  protected readonly _type = BpcElderlyCessationTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(BpcElderlyCessationTypeormEntity)
    repository: Repository<BpcElderlyCessationTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createBpcElderlyCessation(
    props: BpcElderlyCessationEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      BpcElderlyCessationEntity,
      BpcElderlyCessationTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateBpcElderlyCessation(
    id: BpcElderlyCessationId,
    props: BpcElderlyCessationEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      BpcElderlyCessationEntity,
      BpcElderlyCessationTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public deleteBpcElderlyCessation(
    id: BpcElderlyCessationId,
    updatedBy: OrganizationMemberId,
  ): TransactionType {
    return this.update(id.toString(), {
      deletedAt: new Date(),
      updatedBy: {
        id: updatedBy.toString(),
      },
    });
  }
}
