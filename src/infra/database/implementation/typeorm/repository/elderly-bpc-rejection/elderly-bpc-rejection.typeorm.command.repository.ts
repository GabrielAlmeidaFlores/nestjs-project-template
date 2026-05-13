import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { ElderlyBpcRejectionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/elderly-bpc-rejection-result.typeorm.entity';
import { ElderlyBpcRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/elderly-bpc-rejection.typeorm.entity';
import { ElderlyBpcRejectionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/repository/elderly-bpc-rejection/command/elderly-bpc-rejection.command.repository.gateway';
import { ElderlyBpcRejectionEntity } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection/elderly-bpc-rejection.entity';
import { ElderlyBpcRejectionId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection/value-object/elderly-bpc-rejection-id/elderly-bpc-rejection-id.value-object';
import { ElderlyBpcRejectionResultId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-result/value-object/elderly-bpc-rejection-result-id/elderly-bpc-rejection-result-id.value-object';

@Injectable()
export class ElderlyBpcRejectionTypeormCommandRepository
  extends BaseTypeormCommandRepository<ElderlyBpcRejectionTypeormEntity>
  implements ElderlyBpcRejectionCommandRepositoryGateway
{
  protected readonly _type = ElderlyBpcRejectionTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(ElderlyBpcRejectionTypeormEntity)
    repository: Repository<ElderlyBpcRejectionTypeormEntity>,
  ) {
    super(repository);
  }

  public createElderlyBpcRejection(
    props: ElderlyBpcRejectionEntity,
  ): TransactionType {
    const mappedData = this.mapToTypeormEntity(props);

    return this.create(mappedData);
  }

  public updateElderlyBpcRejection(
    elderlyBpcRejectionId: ElderlyBpcRejectionId,
    props: ElderlyBpcRejectionEntity,
  ): TransactionType {
    const mappedData = this.mapToTypeormEntity(props);

    return this.update(elderlyBpcRejectionId.toString(), mappedData);
  }

  public updateElderlyBpcRejectionResultId(
    id: ElderlyBpcRejectionId,
    resultId: ElderlyBpcRejectionResultId,
  ): TransactionType {
    return this.update(id.toString(), {
      elderlyBpcRejectionResult: ElderlyBpcRejectionResultTypeormEntity.build({
        id: resultId.toString(),
      } as ElderlyBpcRejectionResultTypeormEntity),
    });
  }

  public deleteElderlyBpcRejection(id: ElderlyBpcRejectionId): TransactionType {
    return this.delete(id.toString());
  }

  private mapToTypeormEntity(
    props: ElderlyBpcRejectionEntity,
  ): ElderlyBpcRejectionTypeormEntity {
    return ElderlyBpcRejectionTypeormEntity.build({
      id: props.id.toString(),
      analysisName: props.analysisName,
      category: props.category,
      maritalStatus: props.maritalStatus,
      applicantLivesAlone: props.applicantLivesAlone,
      elderlyBpcRejectionResult:
        props.elderlyBpcRejectionResultId !== null
          ? ElderlyBpcRejectionResultTypeormEntity.build({
              id: props.elderlyBpcRejectionResultId.toString(),
            } as ElderlyBpcRejectionResultTypeormEntity)
          : null,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      deletedAt: props.deletedAt,
    } as ElderlyBpcRejectionTypeormEntity);
  }
}
