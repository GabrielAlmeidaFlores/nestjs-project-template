import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { BpcDisabilityGrantFamilyMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-grant-family-member.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { BpcDisabilityGrantFamilyMemberCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/repository/bpc-disability-grant-family-member/command/bpc-disability-grant-family-member.command.repository.gateway';
import { BpcDisabilityGrantId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant/value-object/bpc-disability-grant-id/bpc-disability-grant-id.value-object';
import { BpcDisabilityGrantFamilyMemberEntity } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-family-member/bpc-disability-grant-family-member.entity';
import { BpcDisabilityGrantFamilyMemberId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-family-member/value-object/bpc-disability-grant-family-member-id/bpc-disability-grant-family-member-id.value-object';

@Injectable()
export class BpcDisabilityGrantFamilyMemberTypeormCommandRepository
  extends BaseTypeormCommandRepository<BpcDisabilityGrantFamilyMemberTypeormEntity>
  implements BpcDisabilityGrantFamilyMemberCommandRepositoryGateway
{
  protected readonly _type =
    BpcDisabilityGrantFamilyMemberTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(BpcDisabilityGrantFamilyMemberTypeormEntity)
    repository: Repository<BpcDisabilityGrantFamilyMemberTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createBpcDisabilityGrantFamilyMember(
    props: BpcDisabilityGrantFamilyMemberEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      BpcDisabilityGrantFamilyMemberEntity,
      BpcDisabilityGrantFamilyMemberTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateBpcDisabilityGrantFamilyMember(
    bpcDisabilityGrantFamilyMemberId: BpcDisabilityGrantFamilyMemberId,
    props: BpcDisabilityGrantFamilyMemberEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      BpcDisabilityGrantFamilyMemberEntity,
      BpcDisabilityGrantFamilyMemberTypeormEntity,
    );

    return this.update(bpcDisabilityGrantFamilyMemberId.toString(), mappedData);
  }

  public deleteBpcDisabilityGrantFamilyMember(
    bpcDisabilityGrantFamilyMemberId: BpcDisabilityGrantFamilyMemberId,
  ): TransactionType {
    return this.delete(bpcDisabilityGrantFamilyMemberId.toString());
  }

  public deleteAllByBpcDisabilityGrantId(
    bpcDisabilityGrantId: BpcDisabilityGrantId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(BpcDisabilityGrantFamilyMemberTypeormEntity)
        .softDelete({
          BpcDisabilityGrant: { id: bpcDisabilityGrantId.toString() },
        });
    };
  }
}
