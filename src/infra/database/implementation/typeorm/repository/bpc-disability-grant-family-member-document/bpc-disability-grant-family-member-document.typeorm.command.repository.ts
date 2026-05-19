import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { BpcDisabilityGrantFamilyMemberDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-grant-family-member-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { BpcDisabilityGrantFamilyMemberDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/repository/bpc-disability-grant-family-member-document/command/bpc-disability-grant-family-member-document.command.repository.gateway';
import { BpcDisabilityGrantFamilyMemberDocumentEntity } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-family-member-document/bpc-disability-grant-family-member-document.entity';

@Injectable()
export class BpcDisabilityGrantFamilyMemberDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<BpcDisabilityGrantFamilyMemberDocumentTypeormEntity>
  implements BpcDisabilityGrantFamilyMemberDocumentCommandRepositoryGateway
{
  protected readonly _type =
    BpcDisabilityGrantFamilyMemberDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(BpcDisabilityGrantFamilyMemberDocumentTypeormEntity)
    repository: Repository<BpcDisabilityGrantFamilyMemberDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createBpcDisabilityGrantFamilyMemberDocument(
    props: BpcDisabilityGrantFamilyMemberDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      BpcDisabilityGrantFamilyMemberDocumentEntity,
      BpcDisabilityGrantFamilyMemberDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public createManyBpcDisabilityGrantFamilyMemberDocument(
    props: BpcDisabilityGrantFamilyMemberDocumentEntity[],
  ): TransactionType[] {
    return props.map((item) =>
      this.createBpcDisabilityGrantFamilyMemberDocument(item),
    );
  }
}
