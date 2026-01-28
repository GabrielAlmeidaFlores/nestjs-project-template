import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { Repository } from 'typeorm';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { SpeechGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/speech-generator.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { GetSpeechGeneratorWithRelationsQueryResult } from '@module/customer/analysis-tool/module/speech-generator/domain/repository/speech-generator/query/result/get-speech-generator-with-relations.query.result';
import { SpeechGeneratorQueryRepositoryGateway } from '@module/customer/analysis-tool/module/speech-generator/domain/repository/speech-generator/query/speech-generator.query.repository.gateway';
import { SpeechGeneratorId } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator/value-object/speech-generator-id/speech-generator-id.value-object';

@Injectable()
export class SpeechGeneratorTypeormQueryRepository
  extends BaseTypeormQueryRepository<SpeechGeneratorTypeormEntity>
  implements SpeechGeneratorQueryRepositoryGateway
{
  protected readonly _type = SpeechGeneratorTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(SpeechGeneratorTypeormEntity)
    repository: Repository<SpeechGeneratorTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async listByOrganizationId(
    organizationId: OrganizationId,
    listData: ListDataInputModel,
  ): Promise<ListDataOutputModel<GetSpeechGeneratorWithRelationsQueryResult>> {
    const data = await this.list(listData, {
      where: {
        analysisToolRecord: {
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
      },
      relations: {
        speechGeneratorDocument: true,
        speechGeneratorResult: true,
        analysisToolRecord: {
          analysisToolClient: true,
          createdBy: { customer: true },
          updatedBy: { customer: true },
        },
        createdBy: { customer: true },
        updatedBy: { customer: true },
      },
    });

    const mappedData = this.mapperGateway.mapArray(
      data.resource,
      SpeechGeneratorTypeormEntity,
      GetSpeechGeneratorWithRelationsQueryResult,
    );

    return new ListDataOutputModel<GetSpeechGeneratorWithRelationsQueryResult>({
      ...data,
      resource: mappedData,
    });
  }

  public async findOneBySpeechGeneratorIdAndOrganizationIdWithRelationsOrFail(
    id: SpeechGeneratorId,
    organizationId: OrganizationId,
    err: Constructor<NotFoundError>,
  ): Promise<GetSpeechGeneratorWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          id: id.toString(),
          analysisToolRecord: {
            createdBy: {
              organization: { id: organizationId.toString() },
            },
            updatedBy: {
              organization: { id: organizationId.toString() },
            },
          },
        },
        relations: {
          speechGeneratorDocument: true,
          speechGeneratorResult: true,
          analysisToolRecord: {
            analysisToolClient: true,
            createdBy: { customer: true },
            updatedBy: { customer: true },
          },
          createdBy: { customer: true },
          updatedBy: { customer: true },
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      SpeechGeneratorTypeormEntity,
      GetSpeechGeneratorWithRelationsQueryResult,
    );

    return mappedData;
  }
}
