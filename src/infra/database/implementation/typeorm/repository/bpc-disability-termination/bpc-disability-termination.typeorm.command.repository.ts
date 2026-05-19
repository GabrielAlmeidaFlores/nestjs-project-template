import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { BpcDisabilityTerminationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { BpcDisabilityTerminationCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination/command/bpc-disability-termination.command.repository.gateway';
import { BpcDisabilityTerminationEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/bpc-disability-termination.entity';
import { BpcDisabilityTerminationId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/value-object/bpc-disability-termination-id/bpc-disability-termination-id.value-object';

@Injectable()
export class BpcDisabilityTerminationTypeormCommandRepository
  extends BaseTypeormCommandRepository<BpcDisabilityTerminationTypeormEntity>
  implements BpcDisabilityTerminationCommandRepositoryGateway
{
  protected readonly _type =
    BpcDisabilityTerminationTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(BpcDisabilityTerminationTypeormEntity)
    repository: Repository<BpcDisabilityTerminationTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createBpcDisabilityTermination(
    props: BpcDisabilityTerminationEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      BpcDisabilityTerminationEntity,
      BpcDisabilityTerminationTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateBpcDisabilityTermination(
    id: BpcDisabilityTerminationId,
    props: BpcDisabilityTerminationEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      BpcDisabilityTerminationEntity,
      BpcDisabilityTerminationTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public deleteBpcDisabilityTermination(
    id: BpcDisabilityTerminationId,
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
