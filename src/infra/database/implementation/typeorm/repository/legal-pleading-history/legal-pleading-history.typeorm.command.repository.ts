import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { LegalPleadingHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading-history.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { LegalPleadingHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading-history/command/legal-pleading-history.command.repository.gateway';
import { LegalPleadingHistoryEntity } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-history/legal-pleading-history.entity';
import { LegalPleadingHistoryId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-history/value-object/legal-pleading-history-id/legal-pleading-history-id.value-object';

@Injectable()
export class LegalPleadingHistoryTypeormCommandRepository
  extends BaseTypeormCommandRepository<LegalPleadingHistoryTypeormEntity>
  implements LegalPleadingHistoryCommandRepositoryGateway
{
  protected readonly _type = LegalPleadingHistoryTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(LegalPleadingHistoryTypeormEntity)
    repository: Repository<LegalPleadingHistoryTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createLegalPleadingHistory(
    entity: LegalPleadingHistoryEntity,
  ): TransactionType {
    const data = this.mapperGateway.map(
      entity,
      LegalPleadingHistoryEntity,
      LegalPleadingHistoryTypeormEntity,
    );

    return this.create(data);
  }

  public updateLegalPleadingHistory(
    id: LegalPleadingHistoryId,
    entity: LegalPleadingHistoryEntity,
  ): TransactionType {
    const data = this.mapperGateway.map(
      entity,
      LegalPleadingHistoryEntity,
      LegalPleadingHistoryTypeormEntity,
    );

    return this.update(id.toString(), data);
  }

  public deleteLegalPleadingHistory(
    id: LegalPleadingHistoryId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
