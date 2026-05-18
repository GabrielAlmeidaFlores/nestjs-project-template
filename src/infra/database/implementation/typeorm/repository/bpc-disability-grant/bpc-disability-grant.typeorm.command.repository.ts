import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { BpcDisabilityGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-grant.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { BpcDisabilityGrantCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/repository/bpc-disability-grant/command/bpc-disability-grant.command.repository.gateway';
import { BpcDisabilityGrantEntity } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant/bpc-disability-grant.entity';
import { BpcDisabilityGrantId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant/value-object/bpc-disability-grant-id/bpc-disability-grant-id.value-object';

@Injectable()
export class BpcDisabilityGrantTypeormCommandRepository
  extends BaseTypeormCommandRepository<BpcDisabilityGrantTypeormEntity>
  implements BpcDisabilityGrantCommandRepositoryGateway
{
  protected readonly _type = BpcDisabilityGrantTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(BpcDisabilityGrantTypeormEntity)
    repository: Repository<BpcDisabilityGrantTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createBpcDisabilityGrant(
    props: BpcDisabilityGrantEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      BpcDisabilityGrantEntity,
      BpcDisabilityGrantTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateBpcDisabilityGrant(
    id: BpcDisabilityGrantId,
    props: BpcDisabilityGrantEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      BpcDisabilityGrantEntity,
      BpcDisabilityGrantTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public deleteBpcDisabilityGrant(
    id: BpcDisabilityGrantId,
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
