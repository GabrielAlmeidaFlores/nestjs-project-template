import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { SpecialCategoryRetirementAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-category-retirement-analysis.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { GetSpecialCategoryRetirementAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis/query/result/get-special-category-retirement-analysis-with-relations.query.result';
import { SpecialCategoryRetirementAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis/query/special-category-retirement-analysis.query.repository.gateway';
import { SpecialCategoryRetirementAnalysisId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/value-object/special-category-retirement-analysis-id/special-category-retirement-analysis-id.value-object';

@Injectable()
export class SpecialCategoryRetirementAnalysisTypeormQueryRepository
  extends BaseTypeormQueryRepository<SpecialCategoryRetirementAnalysisTypeormEntity>
  implements SpecialCategoryRetirementAnalysisQueryRepositoryGateway
{
  protected readonly _type =
    SpecialCategoryRetirementAnalysisTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(SpecialCategoryRetirementAnalysisTypeormEntity)
    repository: Repository<SpecialCategoryRetirementAnalysisTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByIdAndOrganizationIdWithRelationsOrFail(
    id: SpecialCategoryRetirementAnalysisId,
    organizationId: OrganizationId,
    err: Constructor<NotFoundError>,
  ): Promise<GetSpecialCategoryRetirementAnalysisWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          id: id.toString(),
          analysisToolRecord: {
            createdBy: {
              organization: {
                id: organizationId.toString(),
              },
            },
          },
        },
        relations: {
          analysisToolClient: true,
          workPeriods: {
            periodDocuments: true,
            specialCategoryRetirementAnalysis: true,
          },
          remunerations: true,
          analysisResult: {
            conversionItems: true,
            ruleItems: true,
          },
          analysisToolRecord: {
            createdBy: true,
            updatedBy: true,
          },
        },
      },
      err,
    );

    return this.mapperGateway.map(
      data,
      SpecialCategoryRetirementAnalysisTypeormEntity,
      GetSpecialCategoryRetirementAnalysisWithRelationsQueryResult,
    );
  }
}
