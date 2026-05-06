import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { ElderlyBpcRejectionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/elderly-bpc-rejection-result.typeorm.entity';
import { ElderlyBpcRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/elderly-bpc-rejection.typeorm.entity';
import { ElderlyBpcRejectionResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/repository/elderly-bpc-rejection-result/command/elderly-bpc-rejection-result.command.repository.gateway';
import { ElderlyBpcRejectionResultEntity } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-result/elderly-bpc-rejection-result.entity';

@Injectable()
export class ElderlyBpcRejectionResultTypeormCommandRepository
  extends BaseTypeormCommandRepository<ElderlyBpcRejectionResultTypeormEntity>
  implements ElderlyBpcRejectionResultCommandRepositoryGateway
{
  protected readonly _type =
    ElderlyBpcRejectionResultTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(ElderlyBpcRejectionResultTypeormEntity)
    repository: Repository<ElderlyBpcRejectionResultTypeormEntity>,
  ) {
    super(repository);
  }

  public createElderlyBpcRejectionResult(
    props: ElderlyBpcRejectionResultEntity,
  ): TransactionType {
    const mappedData = this.mapToTypeormEntity(props);

    return this.create(mappedData);
  }

  public updateElderlyBpcRejectionResult(
    props: ElderlyBpcRejectionResultEntity,
  ): TransactionType {
    const mappedData = this.mapToTypeormEntity(props);

    return this.update(props.id.toString(), mappedData);
  }

  private mapToTypeormEntity(
    props: ElderlyBpcRejectionResultEntity,
  ): ElderlyBpcRejectionResultTypeormEntity {
    return ElderlyBpcRejectionResultTypeormEntity.build({
      id: props.id.toString(),
      completeAnalysis: props.completeAnalysis,
      simplifiedAnalysis: props.simplifiedAnalysis,
      completeAnalysisDownload: props.completeAnalysisDownload,
      simplifiedAnalysisDownload: props.simplifiedAnalysisDownload,
      elderlyBpcRejection: ElderlyBpcRejectionTypeormEntity.build({
        id: props.elderlyBpcRejectionId.toString(),
      } as ElderlyBpcRejectionTypeormEntity),
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      deletedAt: props.deletedAt,
    } as ElderlyBpcRejectionResultTypeormEntity);
  }
}
