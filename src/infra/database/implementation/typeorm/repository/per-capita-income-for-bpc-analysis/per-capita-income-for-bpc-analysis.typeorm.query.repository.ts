import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { PerCapitaIncomeForBpcAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { PerCapitaIncomeForBpcAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis/query/per-capita-income-for-bpc-analysis.query.repository.gateway';
import { GetPerCapitaIncomeForBpcAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis/query/result/get-per-capita-income-for-bpc-analysis-with-relations.query.result';
import { PerCapitaIncomeForBpcAnalysisId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis/value-object/per-capita-income-for-bpc-analysis-id/per-capita-income-for-bpc-analysis-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class PerCapitaIncomeForBpcAnalysisTypeormQueryRepository
  extends BaseTypeormQueryRepository<PerCapitaIncomeForBpcAnalysisTypeormEntity>
  implements PerCapitaIncomeForBpcAnalysisQueryRepositoryGateway
{
  protected readonly _type =
    PerCapitaIncomeForBpcAnalysisTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(PerCapitaIncomeForBpcAnalysisTypeormEntity)
    repository: Repository<PerCapitaIncomeForBpcAnalysisTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async listByOrganizationId(
    organizationId: OrganizationId,
    listData: ListDataInputModel,
  ): Promise<
    ListDataOutputModel<GetPerCapitaIncomeForBpcAnalysisWithRelationsQueryResult>
  > {
    const data = await this.list(listData, {
      where: {
        createdBy: {
          organization: {
            id: organizationId.toString(),
          },
        },
        updatedBy: {
          organization: {
            id: organizationId.toString(),
          },
        },
      },
      relations: {
        createdBy: {
          customer: true,
          organization: true,
        },
        updatedBy: {
          customer: true,
          organization: true,
        },
        perCapitaIncomeForBpcAnalysisFamilyMember: true,
        perCapitaIncomeForBpcAnalysisDocument: true,
        perCapitaIncomeForBpcAnalysisResult: true,
      },
    });

    const mappedData = this.mapperGateway.mapArray(
      data.resource,
      PerCapitaIncomeForBpcAnalysisTypeormEntity,
      GetPerCapitaIncomeForBpcAnalysisWithRelationsQueryResult,
    );

    return new ListDataOutputModel<GetPerCapitaIncomeForBpcAnalysisWithRelationsQueryResult>(
      {
        ...data,
        resource: mappedData,
      },
    );
  }

  public async findOneByPerCapitaIncomeForBpcAnalysisIdAndOrganizationIdOrFail(
    perCapitaIncomeForBpcAnalysisId: PerCapitaIncomeForBpcAnalysisId,
    organizationId: OrganizationId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetPerCapitaIncomeForBpcAnalysisWithRelationsQueryResult> {
    const result = await this.repository.findOne({
      where: {
        id: perCapitaIncomeForBpcAnalysisId.toString(),
        createdBy: { organization: { id: organizationId.toString() } },
      },
      relations: [
        'perCapitaIncomeForBpcAnalysisFamilyMember',
        'perCapitaIncomeForBpcAnalysisDocument',
        'perCapitaIncomeForBpcAnalysisResult',
      ],
    });

    if (result === null) {
      throw new err();
    }

    return this.mapperGateway.map(
      result,
      PerCapitaIncomeForBpcAnalysisTypeormEntity,
      GetPerCapitaIncomeForBpcAnalysisWithRelationsQueryResult,
    );
  }
}
