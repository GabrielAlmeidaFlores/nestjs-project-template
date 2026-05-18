import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { BpcDisabilityTerminationFamilyMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination-family-member.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { BpcDisabilityTerminationFamilyMemberCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination-family-member/command/bpc-disability-termination-family-member.command.repository.gateway';
import { BpcDisabilityTerminationId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/value-object/bpc-disability-termination-id/bpc-disability-termination-id.value-object';
import { BpcDisabilityTerminationFamilyMemberEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-family-member/bpc-disability-termination-family-member.entity';
import { BpcDisabilityTerminationFamilyMemberId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-family-member/value-object/bpc-disability-termination-family-member-id/bpc-disability-termination-family-member-id.value-object';

@Injectable()
export class BpcDisabilityTerminationFamilyMemberTypeormCommandRepository
  extends BaseTypeormCommandRepository<BpcDisabilityTerminationFamilyMemberTypeormEntity>
  implements BpcDisabilityTerminationFamilyMemberCommandRepositoryGateway
{
  protected readonly _type =
    BpcDisabilityTerminationFamilyMemberTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(BpcDisabilityTerminationFamilyMemberTypeormEntity)
    repository: Repository<BpcDisabilityTerminationFamilyMemberTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createBpcDisabilityTerminationFamilyMember(
    props: BpcDisabilityTerminationFamilyMemberEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      BpcDisabilityTerminationFamilyMemberEntity,
      BpcDisabilityTerminationFamilyMemberTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateBpcDisabilityTerminationFamilyMember(
    bpcDisabilityTerminationFamilyMemberId: BpcDisabilityTerminationFamilyMemberId,
    props: BpcDisabilityTerminationFamilyMemberEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      BpcDisabilityTerminationFamilyMemberEntity,
      BpcDisabilityTerminationFamilyMemberTypeormEntity,
    );

    return this.update(
      bpcDisabilityTerminationFamilyMemberId.toString(),
      mappedData,
    );
  }

  public deleteBpcDisabilityTerminationFamilyMember(
    bpcDisabilityTerminationFamilyMemberId: BpcDisabilityTerminationFamilyMemberId,
  ): TransactionType {
    return this.delete(bpcDisabilityTerminationFamilyMemberId.toString());
  }

  public deleteAllByBpcDisabilityTerminationId(
    bpcDisabilityTerminationId: BpcDisabilityTerminationId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(BpcDisabilityTerminationFamilyMemberTypeormEntity)
        .softDelete({
          bpcDisabilityTermination: {
            id: bpcDisabilityTerminationId.toString(),
          },
        });
    };
  }
}
