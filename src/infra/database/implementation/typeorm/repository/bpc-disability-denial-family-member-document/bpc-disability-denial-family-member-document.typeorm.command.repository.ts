import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { BpcDisabilityDenialFamilyMemberDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial-family-member-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { BpcDisabilityDenialFamilyMemberDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/repository/bpc-disability-denial-family-member-document/command/bpc-disability-denial-family-member-document.command.repository.gateway';
import { BpcDisabilityDenialFamilyMemberDocumentEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-family-member-document/bpc-disability-denial-family-member-document.entity';

@Injectable()
export class BpcDisabilityDenialFamilyMemberDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<BpcDisabilityDenialFamilyMemberDocumentTypeormEntity>
  implements BpcDisabilityDenialFamilyMemberDocumentCommandRepositoryGateway
{
  protected readonly _type =
    BpcDisabilityDenialFamilyMemberDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(BpcDisabilityDenialFamilyMemberDocumentTypeormEntity)
    repository: Repository<BpcDisabilityDenialFamilyMemberDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createBpcDisabilityDenialFamilyMemberDocument(
    props: BpcDisabilityDenialFamilyMemberDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      BpcDisabilityDenialFamilyMemberDocumentEntity,
      BpcDisabilityDenialFamilyMemberDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public createManyBpcDisabilityDenialFamilyMemberDocument(
    props: BpcDisabilityDenialFamilyMemberDocumentEntity[],
  ): TransactionType[] {
    return props.map((item) =>
      this.createBpcDisabilityDenialFamilyMemberDocument(item),
    );
  }
}
