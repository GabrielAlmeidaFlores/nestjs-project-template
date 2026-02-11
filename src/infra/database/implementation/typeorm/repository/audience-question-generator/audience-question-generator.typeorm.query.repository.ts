import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { Repository } from 'typeorm';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { AudienceQuestionGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/audience-question-generator.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { AudienceQuestionGeneratorQueryRepositoryGateway } from '@module/customer/analysis-tool/module/audience-question-generator/domain/repository/audience-question-generator/query/audience-question-generator.query.repository.gateway';
import { GetAudienceQuestionGeneratorWithRelationsQueryResult } from '@module/customer/analysis-tool/module/audience-question-generator/domain/repository/audience-question-generator/query/result/get-audience-question-generator-with-relations.query.result';

import type { AudienceQuestionGeneratorId } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator/value-object/audience-question-generator-id/audience-question-generator-id.value-object';

@Injectable()
export class AudienceQuestionGeneratorTypeormQueryRepository
  extends BaseTypeormQueryRepository<AudienceQuestionGeneratorTypeormEntity>
  implements AudienceQuestionGeneratorQueryRepositoryGateway
{
  protected readonly _type =
    AudienceQuestionGeneratorTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(AudienceQuestionGeneratorTypeormEntity)
    repository: Repository<AudienceQuestionGeneratorTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async listByOrganizationId(
    organizationId: OrganizationId,
    listData: ListDataInputModel,
  ): Promise<
    ListDataOutputModel<GetAudienceQuestionGeneratorWithRelationsQueryResult>
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
        audienceQuestionGeneratorDocument: true,
        audienceQuestionGeneratorResult: true,
        audienceQuestionGeneratorBenefit: true,
        audienceQuestionGeneratorLegalProceeding: true,
      },
    });

    const mappedData = this.mapperGateway.mapArray(
      data.resource,
      AudienceQuestionGeneratorTypeormEntity,
      GetAudienceQuestionGeneratorWithRelationsQueryResult,
    );

    return new ListDataOutputModel<GetAudienceQuestionGeneratorWithRelationsQueryResult>(
      {
        ...data,
        resource: mappedData,
      },
    );
  }

  public async findOneByAudienceQuestionGeneratorIdAndOrganizationIdOrFail(
    audienceQuestionGeneratorId: AudienceQuestionGeneratorId,
    organizationId: OrganizationId,
    err: Constructor<NotFoundError>,
  ): Promise<GetAudienceQuestionGeneratorWithRelationsQueryResult> {
    const result = await this.findOneOrFail(
      {
        where: {
          id: audienceQuestionGeneratorId.toString(),
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
          audienceQuestionGeneratorDocument: true,
          audienceQuestionGeneratorResult: true,
          audienceQuestionGeneratorBenefit: true,
          audienceQuestionGeneratorLegalProceeding: true,
        },
      },
      err,
    );

    return this.mapperGateway.map(
      result,
      AudienceQuestionGeneratorTypeormEntity,
      GetAudienceQuestionGeneratorWithRelationsQueryResult,
    );
  }
}
