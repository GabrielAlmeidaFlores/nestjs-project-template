import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { AnalysisToolClientTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { AnalysisToolClientCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/command/analysis-tool-client.command.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';

@Injectable()
export class AnalysisToolClientTypeormCommandRepository
  extends BaseTypeormCommandRepository<AnalysisToolClientTypeormEntity>
  implements AnalysisToolClientCommandRepositoryGateway
{
  protected readonly _type = AnalysisToolClientTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(AnalysisToolClientTypeormEntity)
    repository: Repository<AnalysisToolClientTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public updateAnalysisToolClient(
    id: AnalysisToolClientId,
    props: AnalysisToolClientEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AnalysisToolClientEntity,
      AnalysisToolClientTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public createAnalysisToolClient(
    props: AnalysisToolClientEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AnalysisToolClientEntity,
      AnalysisToolClientTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAnalysisToolClient(
    id: AnalysisToolClientId,
    updatedBy: OrganizationMemberId,
  ): TransactionType {
    return this.update(id.toString(), {
      deletedAt: new Date(),
      updatedBy: {
        id: updatedBy.toString(),
      },
    });
  }
}
