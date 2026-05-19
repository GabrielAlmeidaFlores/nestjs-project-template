import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { ElderlyBpcRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/elderly-bpc-rejection.typeorm.entity';
import { ElderlyBpcRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/repository/elderly-bpc-rejection/query/elderly-bpc-rejection.query.repository.gateway';
import { GetElderlyBpcRejectionWithRelationsQueryResult } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/repository/elderly-bpc-rejection/query/result/get-elderly-bpc-rejection-with-relations.query.result';
import { ElderlyBpcRejectionId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection/value-object/elderly-bpc-rejection-id/elderly-bpc-rejection-id.value-object';

import type { NotFoundError } from '@core/error/not-found.error';

@Injectable()
export class ElderlyBpcRejectionTypeormQueryRepository
  extends BaseTypeormQueryRepository<ElderlyBpcRejectionTypeormEntity>
  implements ElderlyBpcRejectionQueryRepositoryGateway
{
  protected readonly _type = ElderlyBpcRejectionTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(ElderlyBpcRejectionTypeormEntity)
    repository: Repository<ElderlyBpcRejectionTypeormEntity>,
  ) {
    super(repository);
  }

  public async findOneByElderlyBpcRejectionIdOrFailWithRelations<
    E extends new (...args: unknown[]) => Error,
  >(
    id: ElderlyBpcRejectionId,
    err: E,
  ): Promise<GetElderlyBpcRejectionWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: { id: id.toString() },
        relations: {
          elderlyBpcRejectionResult: true,
          elderlyBpcRejectionDocument: true,
          elderlyBpcRejectionInssBenefit: true,
          elderlyBpcRejectionLegalProceeding: true,
          elderlyBpcRejectionFamiliarGroup: {
            elderlyBpcRejectionFamiliarGroupDocument: true,
          },
        },
      },
      err as unknown as new () => NotFoundError,
    );

    return this.mapToQueryResult(data);
  }

  private mapToQueryResult(
    data: ElderlyBpcRejectionTypeormEntity,
  ): GetElderlyBpcRejectionWithRelationsQueryResult {
    const familiarGroups = data.elderlyBpcRejectionFamiliarGroup ?? [];

    const familiarGroupDocuments = familiarGroups.flatMap((group) =>
      (group.elderlyBpcRejectionFamiliarGroupDocument ?? []).map((doc) => ({
        ...doc,
        elderlyBpcRejectionFamiliarGroupId: group.id,
      })),
    );

    return GetElderlyBpcRejectionWithRelationsQueryResult.build({
      elderlyBpcRejectionId: new ElderlyBpcRejectionId(data.id),
      analysisName: data.analysisName,
      category: data.category,
      maritalStatus: data.maritalStatus,
      applicantLivesAlone: data.applicantLivesAlone,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt,
      elderlyBpcRejectionResult: data.elderlyBpcRejectionResult ?? null,
      elderlyBpcRejectionDocument: data.elderlyBpcRejectionDocument ?? null,
      elderlyBpcRejectionInssBenefit:
        data.elderlyBpcRejectionInssBenefit ?? null,
      elderlyBpcRejectionLegalProceeding:
        data.elderlyBpcRejectionLegalProceeding ?? null,
      elderlyBpcRejectionFamiliarGroup: familiarGroups,
      elderlyBpcRejectionFamiliarGroupDocument: familiarGroupDocuments,
    } as unknown as GetElderlyBpcRejectionWithRelationsQueryResult);
  }
}
