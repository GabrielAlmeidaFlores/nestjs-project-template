import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { BpcElderlyCessationFamilyMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-cessation-family-member.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { BpcElderlyCessationFamilyMemberCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/repository/bpc-elderly-cessation-family-member/command/bpc-elderly-cessation-family-member.command.repository.gateway';
import { BpcElderlyCessationId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/value-object/bpc-elderly-cessation-id/bpc-elderly-cessation-id.value-object';
import { BpcElderlyCessationFamilyMemberEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-family-member/bpc-elderly-cessation-family-member.entity';
import { BpcElderlyCessationFamilyMemberId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-family-member/value-object/bpc-elderly-cessation-family-member-id/bpc-elderly-cessation-family-member-id.value-object';

@Injectable()
export class BpcElderlyCessationFamilyMemberTypeormCommandRepository
  extends BaseTypeormCommandRepository<BpcElderlyCessationFamilyMemberTypeormEntity>
  implements BpcElderlyCessationFamilyMemberCommandRepositoryGateway
{
  protected readonly _type =
    BpcElderlyCessationFamilyMemberTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(BpcElderlyCessationFamilyMemberTypeormEntity)
    repository: Repository<BpcElderlyCessationFamilyMemberTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createBpcElderlyCessationFamilyMember(
    props: BpcElderlyCessationFamilyMemberEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      BpcElderlyCessationFamilyMemberEntity,
      BpcElderlyCessationFamilyMemberTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateBpcElderlyCessationFamilyMember(
    bpcElderlyCessationFamilyMemberId: BpcElderlyCessationFamilyMemberId,
    props: BpcElderlyCessationFamilyMemberEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      BpcElderlyCessationFamilyMemberEntity,
      BpcElderlyCessationFamilyMemberTypeormEntity,
    );

    return this.update(
      bpcElderlyCessationFamilyMemberId.toString(),
      mappedData,
    );
  }

  public deleteBpcElderlyCessationFamilyMember(
    bpcElderlyCessationFamilyMemberId: BpcElderlyCessationFamilyMemberId,
  ): TransactionType {
    return this.delete(bpcElderlyCessationFamilyMemberId.toString());
  }

  public deleteAllByBpcElderlyCessationId(
    bpcElderlyCessationId: BpcElderlyCessationId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(BpcElderlyCessationFamilyMemberTypeormEntity)
        .softDelete({
          bpcElderlyCessation: { id: bpcElderlyCessationId.toString() },
        });
    };
  }
}
