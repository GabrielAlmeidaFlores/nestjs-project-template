import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { BpcElderlyCessationFamilyMemberDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-cessation-family-member-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { BpcElderlyCessationFamilyMemberDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/repository/bpc-elderly-cessation-family-member-document/command/bpc-elderly-cessation-family-member-document.command.repository.gateway';
import { BpcElderlyCessationFamilyMemberDocumentEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-family-member-document/bpc-elderly-cessation-family-member-document.entity';

@Injectable()
export class BpcElderlyCessationFamilyMemberDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<BpcElderlyCessationFamilyMemberDocumentTypeormEntity>
  implements BpcElderlyCessationFamilyMemberDocumentCommandRepositoryGateway
{
  protected readonly _type =
    BpcElderlyCessationFamilyMemberDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(BpcElderlyCessationFamilyMemberDocumentTypeormEntity)
    repository: Repository<BpcElderlyCessationFamilyMemberDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createBpcElderlyCessationFamilyMemberDocument(
    props: BpcElderlyCessationFamilyMemberDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      BpcElderlyCessationFamilyMemberDocumentEntity,
      BpcElderlyCessationFamilyMemberDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public createManyBpcElderlyCessationFamilyMemberDocument(
    props: BpcElderlyCessationFamilyMemberDocumentEntity[],
  ): TransactionType[] {
    return props.map((item) =>
      this.createBpcElderlyCessationFamilyMemberDocument(item),
    );
  }
}
