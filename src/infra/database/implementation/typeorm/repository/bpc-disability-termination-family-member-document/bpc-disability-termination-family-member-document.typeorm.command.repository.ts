import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { BpcDisabilityTerminationFamilyMemberDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination-family-member-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { BpcDisabilityTerminationFamilyMemberDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination-family-member-document/command/bpc-disability-termination-family-member-document.command.repository.gateway';
import { BpcDisabilityTerminationFamilyMemberDocumentEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-family-member-document/bpc-disability-termination-family-member-document.entity';

@Injectable()
export class BpcDisabilityTerminationFamilyMemberDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<BpcDisabilityTerminationFamilyMemberDocumentTypeormEntity>
  implements
    BpcDisabilityTerminationFamilyMemberDocumentCommandRepositoryGateway
{
  protected readonly _type =
    BpcDisabilityTerminationFamilyMemberDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(BpcDisabilityTerminationFamilyMemberDocumentTypeormEntity)
    repository: Repository<BpcDisabilityTerminationFamilyMemberDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createBpcDisabilityTerminationFamilyMemberDocument(
    props: BpcDisabilityTerminationFamilyMemberDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      BpcDisabilityTerminationFamilyMemberDocumentEntity,
      BpcDisabilityTerminationFamilyMemberDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public createManyBpcDisabilityTerminationFamilyMemberDocument(
    props: BpcDisabilityTerminationFamilyMemberDocumentEntity[],
  ): TransactionType[] {
    return props.map((item) =>
      this.createBpcDisabilityTerminationFamilyMemberDocument(item),
    );
  }
}
