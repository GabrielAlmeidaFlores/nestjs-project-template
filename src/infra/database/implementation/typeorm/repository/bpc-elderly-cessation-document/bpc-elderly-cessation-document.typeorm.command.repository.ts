import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { BpcElderlyCessationDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-cessation-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { BpcElderlyCessationDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/repository/bpc-elderly-cessation-document/command/bpc-elderly-cessation-document.command.repository.gateway';
import { BpcElderlyCessationDocumentEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-document/bpc-elderly-cessation-document.entity';

@Injectable()
export class BpcElderlyCessationDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<BpcElderlyCessationDocumentTypeormEntity>
  implements BpcElderlyCessationDocumentCommandRepositoryGateway
{
  protected readonly _type =
    BpcElderlyCessationDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(BpcElderlyCessationDocumentTypeormEntity)
    repository: Repository<BpcElderlyCessationDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createBpcElderlyCessationDocument(
    props: BpcElderlyCessationDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      BpcElderlyCessationDocumentEntity,
      BpcElderlyCessationDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public createManyBpcElderlyCessationDocument(
    props: BpcElderlyCessationDocumentEntity[],
  ): TransactionType[] {
    return props.map((item) => this.createBpcElderlyCessationDocument(item));
  }
}
