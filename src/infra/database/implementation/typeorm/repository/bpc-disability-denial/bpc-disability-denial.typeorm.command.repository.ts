import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { BpcDisabilityDenialTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { BpcDisabilityDenialCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/repository/bpc-disability-denial/command/bpc-disability-denial.command.repository.gateway';
import { BpcDisabilityDenialEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial/bpc-disability-denial.entity';
import { BpcDisabilityDenialId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial/value-object/bpc-disability-denial-id/bpc-disability-denial-id.value-object';

@Injectable()
export class BpcDisabilityDenialTypeormCommandRepository
  extends BaseTypeormCommandRepository<BpcDisabilityDenialTypeormEntity>
  implements BpcDisabilityDenialCommandRepositoryGateway
{
  protected readonly _type = BpcDisabilityDenialTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(BpcDisabilityDenialTypeormEntity)
    repository: Repository<BpcDisabilityDenialTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createBpcDisabilityDenial(
    props: BpcDisabilityDenialEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      BpcDisabilityDenialEntity,
      BpcDisabilityDenialTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateBpcDisabilityDenial(
    id: BpcDisabilityDenialId,
    props: BpcDisabilityDenialEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      BpcDisabilityDenialEntity,
      BpcDisabilityDenialTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public deleteBpcDisabilityDenial(
    id: BpcDisabilityDenialId,
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
