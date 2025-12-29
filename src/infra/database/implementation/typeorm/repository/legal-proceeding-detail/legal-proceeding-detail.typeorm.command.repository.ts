import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { LegalProceedingDetailTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-proceeding-detail.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { LegalProceedingDetailCommandRepositoryGateway } from '@module/customer/legal-proceeding/domain/repository/legal-proceeding-detail/command/legal-proceeding-detail.command.repository.gateway';
import { LegalProceedingDetailEntity } from '@module/customer/legal-proceeding/domain/schema/entity/legal-proceeding-detail/legal-proceeding-detail.entity';
import { LegalProceedingDetailId } from '@module/customer/legal-proceeding/domain/schema/entity/legal-proceeding-detail/value-object/analysis-tool-client-legal-proceeding-detail-id/legal-proceeding-detail-id.value-object';

@Injectable()
export class LegalProceedingDetailTypeormCommandRepository
  extends BaseTypeormCommandRepository<LegalProceedingDetailTypeormEntity>
  implements LegalProceedingDetailCommandRepositoryGateway
{
  protected readonly _type = LegalProceedingDetailTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(LegalProceedingDetailTypeormEntity)
    repository: Repository<LegalProceedingDetailTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createLegalProceedingDetail(
    props: LegalProceedingDetailEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      LegalProceedingDetailEntity,
      LegalProceedingDetailTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateLegalProceedingDetail(
    id: LegalProceedingDetailId,
    props: LegalProceedingDetailEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      LegalProceedingDetailEntity,
      LegalProceedingDetailTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }
}
