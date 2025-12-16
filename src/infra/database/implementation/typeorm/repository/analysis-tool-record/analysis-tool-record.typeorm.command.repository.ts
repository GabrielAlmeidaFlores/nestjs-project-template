import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import { AnalysisToolRecordId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-id/analysis-tool-record-id.value-objects';

@Injectable()
export class AnalysisToolRecordTypeormCommandRepository
  extends BaseTypeormCommandRepository<AnalysisToolRecordTypeormEntity>
  implements AnalysisToolRecordCommandRepositoryGateway
{
  protected readonly _type = AnalysisToolRecordTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(AnalysisToolRecordTypeormEntity)
    repository: Repository<AnalysisToolRecordTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createAnalysisToolRecord(
    props: AnalysisToolRecordEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AnalysisToolRecordEntity,
      AnalysisToolRecordTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAnalysisToolRecord(
    id: AnalysisToolRecordId,
    updatedBy: OrganizationMemberId,
  ): TransactionType {
    return this.update(id.toString(), {
      deletedAt: new Date(),
      updatedBy: {
        id: updatedBy.toString(),
      },
    });
  }

  public updateAnalysisToolRecord(
    id: AnalysisToolRecordId,
    props: AnalysisToolRecordEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AnalysisToolRecordEntity,
      AnalysisToolRecordTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }
}
