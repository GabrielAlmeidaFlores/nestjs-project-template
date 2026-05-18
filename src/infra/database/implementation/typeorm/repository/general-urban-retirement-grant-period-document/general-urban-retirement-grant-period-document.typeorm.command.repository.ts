import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { GeneralUrbanRetirementGrantPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant-period-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GeneralUrbanRetirementGrantPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-period-document/command/general-urban-retirement-grant-period-document.command.repository.gateway';
import { GeneralUrbanRetirementGrantPeriodDocumentEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-period-document/general-urban-retirement-grant-period-document.entity';
import { GeneralUrbanRetirementGrantPeriodDocumentId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-period-document/value-object/general-urban-retirement-grant-period-document-id.value-object';

@Injectable()
export class GeneralUrbanRetirementGrantPeriodDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<GeneralUrbanRetirementGrantPeriodDocumentTypeormEntity>
  implements GeneralUrbanRetirementGrantPeriodDocumentCommandRepositoryGateway
{
  protected readonly _type =
    GeneralUrbanRetirementGrantPeriodDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(GeneralUrbanRetirementGrantPeriodDocumentTypeormEntity)
    repository: Repository<GeneralUrbanRetirementGrantPeriodDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public updateGeneralUrbanRetirementGrantPeriodDocument(
    id: GeneralUrbanRetirementGrantPeriodDocumentId,
    props: GeneralUrbanRetirementGrantPeriodDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      GeneralUrbanRetirementGrantPeriodDocumentEntity,
      GeneralUrbanRetirementGrantPeriodDocumentTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public createGeneralUrbanRetirementGrantPeriodDocument(
    props: GeneralUrbanRetirementGrantPeriodDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      GeneralUrbanRetirementGrantPeriodDocumentEntity,
      GeneralUrbanRetirementGrantPeriodDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }
}
