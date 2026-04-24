import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { BpcDisabilityDenialFamilyMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial-family-member.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { BpcDisabilityDenialFamilyMemberCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/repository/bpc-disability-denial-family-member/command/bpc-disability-denial-family-member.command.repository.gateway';
import { BpcDisabilityDenialId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial/value-object/bpc-disability-denial-id/bpc-disability-denial-id.value-object';
import { BpcDisabilityDenialFamilyMemberEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-family-member/bpc-disability-denial-family-member.entity';
import { BpcDisabilityDenialFamilyMemberId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-family-member/value-object/bpc-disability-denial-family-member-id/bpc-disability-denial-family-member-id.value-object';

@Injectable()
export class BpcDisabilityDenialFamilyMemberTypeormCommandRepository
  extends BaseTypeormCommandRepository<BpcDisabilityDenialFamilyMemberTypeormEntity>
  implements BpcDisabilityDenialFamilyMemberCommandRepositoryGateway
{
  protected readonly _type =
    BpcDisabilityDenialFamilyMemberTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(BpcDisabilityDenialFamilyMemberTypeormEntity)
    repository: Repository<BpcDisabilityDenialFamilyMemberTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createBpcDisabilityDenialFamilyMember(
    props: BpcDisabilityDenialFamilyMemberEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      BpcDisabilityDenialFamilyMemberEntity,
      BpcDisabilityDenialFamilyMemberTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateBpcDisabilityDenialFamilyMember(
    bpcDisabilityDenialFamilyMemberId: BpcDisabilityDenialFamilyMemberId,
    props: BpcDisabilityDenialFamilyMemberEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      BpcDisabilityDenialFamilyMemberEntity,
      BpcDisabilityDenialFamilyMemberTypeormEntity,
    );

    return this.update(
      bpcDisabilityDenialFamilyMemberId.toString(),
      mappedData,
    );
  }

  public deleteBpcDisabilityDenialFamilyMember(
    bpcDisabilityDenialFamilyMemberId: BpcDisabilityDenialFamilyMemberId,
  ): TransactionType {
    return this.delete(bpcDisabilityDenialFamilyMemberId.toString());
  }

  public deleteAllByBpcDisabilityDenialId(
    bpcDisabilityDenialId: BpcDisabilityDenialId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(BpcDisabilityDenialFamilyMemberTypeormEntity)
        .softDelete({
          bpcDisabilityDenial: { id: bpcDisabilityDenialId.toString() },
        });
    };
  }
}
