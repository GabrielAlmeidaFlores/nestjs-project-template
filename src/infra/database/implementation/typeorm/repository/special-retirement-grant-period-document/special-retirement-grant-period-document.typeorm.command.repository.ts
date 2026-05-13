import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SpecialRetirementGrantPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-period-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { SpecialRetirementGrantPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-period-document/command/special-retirement-grant-period-document.command.repository.gateway';
import { SpecialRetirementGrantPeriodDocumentEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period-document/special-retirement-grant-period-document.entity';
import { SpecialRetirementGrantPeriodDocumentId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period-document/value-object/special-retirement-grant-period-document-id/special-retirement-grant-period-document-id.value-object';

@Injectable()
export class SpecialRetirementGrantPeriodDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<SpecialRetirementGrantPeriodDocumentTypeormEntity>
  implements SpecialRetirementGrantPeriodDocumentCommandRepositoryGateway
{
  protected readonly _type =
    SpecialRetirementGrantPeriodDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(SpecialRetirementGrantPeriodDocumentTypeormEntity)
    repository: Repository<SpecialRetirementGrantPeriodDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createSpecialRetirementGrantPeriodDocument(
    props: SpecialRetirementGrantPeriodDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SpecialRetirementGrantPeriodDocumentEntity,
      SpecialRetirementGrantPeriodDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteSpecialRetirementGrantPeriodDocument(
    id: SpecialRetirementGrantPeriodDocumentId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
