import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { BpcDisabilityDenialDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { BpcDisabilityDenialDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/repository/bpc-disability-denial-document/command/bpc-disability-denial-document.command.repository.gateway';
import { BpcDisabilityDenialDocumentEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-document/bpc-disability-denial-document.entity';

@Injectable()
export class BpcDisabilityDenialDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<BpcDisabilityDenialDocumentTypeormEntity>
  implements BpcDisabilityDenialDocumentCommandRepositoryGateway
{
  protected readonly _type =
    BpcDisabilityDenialDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(BpcDisabilityDenialDocumentTypeormEntity)
    repository: Repository<BpcDisabilityDenialDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createBpcDisabilityDenialDocument(
    props: BpcDisabilityDenialDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      BpcDisabilityDenialDocumentEntity,
      BpcDisabilityDenialDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public createManyBpcDisabilityDenialDocument(
    props: BpcDisabilityDenialDocumentEntity[],
  ): TransactionType[] {
    return props.map((item) => this.createBpcDisabilityDenialDocument(item));
  }
}
