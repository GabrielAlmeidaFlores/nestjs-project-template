import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { BpcElderlyAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { BpcElderlyAnalysisDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/repository/bpc-elderly-analysis-document/command/bpc-elderly-analysis-document.command.repository.gateway';
import { BpcElderlyAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-document/bpc-elderly-analysis-document.entity';

@Injectable()
export class BpcElderlyAnalysisDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<BpcElderlyAnalysisDocumentTypeormEntity>
  implements BpcElderlyAnalysisDocumentCommandRepositoryGateway
{
  protected readonly _type =
    BpcElderlyAnalysisDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(BpcElderlyAnalysisDocumentTypeormEntity)
    repository: Repository<BpcElderlyAnalysisDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createBpcElderlyAnalysisDocument(
    props: BpcElderlyAnalysisDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      BpcElderlyAnalysisDocumentEntity,
      BpcElderlyAnalysisDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public createManyBpcElderlyAnalysisDocument(
    props: BpcElderlyAnalysisDocumentEntity[],
  ): TransactionType[] {
    return props.map((item) => this.createBpcElderlyAnalysisDocument(item));
  }
}
