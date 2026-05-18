import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { BpcElderlyAnalysisFamilyMemberDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis-family-member-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { BpcElderlyAnalysisFamilyMemberDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/repository/bpc-elderly-analysis-family-member-document/command/bpc-elderly-analysis-family-member-document.command.repository.gateway';
import { BpcElderlyAnalysisFamilyMemberDocumentEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-family-member-document/bpc-elderly-analysis-family-member-document.entity';

@Injectable()
export class BpcElderlyAnalysisFamilyMemberDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<BpcElderlyAnalysisFamilyMemberDocumentTypeormEntity>
  implements BpcElderlyAnalysisFamilyMemberDocumentCommandRepositoryGateway
{
  protected readonly _type =
    BpcElderlyAnalysisFamilyMemberDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(BpcElderlyAnalysisFamilyMemberDocumentTypeormEntity)
    repository: Repository<BpcElderlyAnalysisFamilyMemberDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createBpcElderlyAnalysisFamilyMemberDocument(
    props: BpcElderlyAnalysisFamilyMemberDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      BpcElderlyAnalysisFamilyMemberDocumentEntity,
      BpcElderlyAnalysisFamilyMemberDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public createManyBpcElderlyAnalysisFamilyMemberDocument(
    props: BpcElderlyAnalysisFamilyMemberDocumentEntity[],
  ): TransactionType[] {
    return props.map((item) =>
      this.createBpcElderlyAnalysisFamilyMemberDocument(item),
    );
  }
}
