import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SystemActivitiesTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/system-activities.typeorm.entity';
import {
  CreateSystemActivitiesParamsType,
  SystemActivitiesCommandRepositoryGateway,
} from '@module/customer/analysis-tool/domain/repository/system-activities/command/system-activities.command.repository.gateway';

@Injectable()
export class SystemActivitiesTypeormCommandRepository
  extends BaseTypeormCommandRepository<SystemActivitiesTypeormEntity>
  implements SystemActivitiesCommandRepositoryGateway
{
  protected readonly _type = SystemActivitiesTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(SystemActivitiesTypeormEntity)
    repository: Repository<SystemActivitiesTypeormEntity>,
  ) {
    super(repository);
  }

  public createSystemActivity(
    params: CreateSystemActivitiesParamsType,
  ): TransactionType {
    return this.create({
      title: params.title,
      description: params.description,
      organizationMember:
        params.organizationMemberId !== undefined
          ? { id: params.organizationMemberId.toString() }
          : null,
      analysisToolClient:
        params.analysisToolClientId !== undefined
          ? { id: params.analysisToolClientId.toString() }
          : null,
      analysisToolRecord:
        params.analysisToolRecordId !== undefined
          ? { id: params.analysisToolRecordId.toString() }
          : null,
    });
  }
}
