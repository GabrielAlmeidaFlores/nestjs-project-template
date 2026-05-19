import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SpecialRetirementGrantDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { SpecialRetirementGrantDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-document/command/special-retirement-grant-document.command.repository.gateway';
import { SpecialRetirementGrantDocumentEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-document/special-retirement-grant-document.entity';
import { SpecialRetirementGrantDocumentId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-document/value-object/special-retirement-grant-document-id/special-retirement-grant-document-id.value-object';

@Injectable()
export class SpecialRetirementGrantDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<SpecialRetirementGrantDocumentTypeormEntity>
  implements SpecialRetirementGrantDocumentCommandRepositoryGateway
{
  protected readonly _type =
    SpecialRetirementGrantDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(SpecialRetirementGrantDocumentTypeormEntity)
    repository: Repository<SpecialRetirementGrantDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createSpecialRetirementGrantDocument(
    props: SpecialRetirementGrantDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SpecialRetirementGrantDocumentEntity,
      SpecialRetirementGrantDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteSpecialRetirementGrantDocument(
    id: SpecialRetirementGrantDocumentId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
