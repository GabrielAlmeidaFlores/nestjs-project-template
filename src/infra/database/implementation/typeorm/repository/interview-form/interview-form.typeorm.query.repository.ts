import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { InterviewFormTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/interview-form.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { InterviewFormQueryRepositoryGateway } from '@module/customer/analysis-tool/module/interview-form/domain/repository/interview-form/query/interview-form.query.repository.gateway';
import { GetInterviewFormQueryResult } from '@module/customer/analysis-tool/module/interview-form/domain/repository/interview-form/query/result/get-interview-form.query.result';
import { InterviewFormId } from '@module/customer/analysis-tool/module/interview-form/domain/schema/entity/interview-form/value-object/interview-form-id/interview-form-id.value-object';

@Injectable()
export class InterviewFormTypeormQueryRepository
  extends BaseTypeormQueryRepository<InterviewFormTypeormEntity>
  implements InterviewFormQueryRepositoryGateway
{
  protected readonly _type = InterviewFormTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(InterviewFormTypeormEntity)
    repository: Repository<InterviewFormTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByInterviewFormIdAndOrganizationIdOrFail(
    id: InterviewFormId,
    organizationId: OrganizationId,
    err: Constructor<NotFoundError>,
  ): Promise<GetInterviewFormQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          id: id.toString(),
          createdBy: {
            organization: { id: organizationId.toString() },
          },
        },
        relations: {
          analysisToolClient: true,
          createdBy: { customer: true },
          updatedBy: { customer: true },
        },
      },
      err,
    );

    return this.mapperGateway.map(
      data,
      InterviewFormTypeormEntity,
      GetInterviewFormQueryResult,
    );
  }

  public async findOneByAnalysisToolClientIdAndOrganizationId(
    analysisToolClientId: AnalysisToolClientId,
    organizationId: OrganizationId,
  ): Promise<GetInterviewFormQueryResult | null> {
    const data = await this.findOne({
      where: {
        analysisToolClient: { id: analysisToolClientId.toString() },
        createdBy: {
          organization: { id: organizationId.toString() },
        },
      },
      relations: {
        analysisToolClient: true,
        createdBy: { customer: true },
        updatedBy: { customer: true },
      },
    });

    if (data === null) {
      return null;
    }

    return this.mapperGateway.map(
      data,
      InterviewFormTypeormEntity,
      GetInterviewFormQueryResult,
    );
  }
}
