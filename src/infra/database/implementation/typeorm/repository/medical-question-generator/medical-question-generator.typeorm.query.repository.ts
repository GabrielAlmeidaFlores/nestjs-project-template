import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { Repository, IsNull } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { MedicalQuestionGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-question-generator.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { MedicalQuestionGeneratorQueryRepositoryGateway } from '@module/customer/analysis-tool/module/medical-question-generator/domain/repository/medical-question-generator/query/medical-question-generator.query.repository.gateway';
import { GetMedicalQuestionGeneratorWithRelationsQueryResult } from '@module/customer/analysis-tool/module/medical-question-generator/domain/repository/medical-question-generator/query/result/get-medical-question-generator-with-relations.query.result';
import { MedicalQuestionGeneratorId } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator/value-object/medical-question-generator-id/medical-question-generator-id.value-object';

@Injectable()
export class MedicalQuestionGeneratorTypeormQueryRepository
  extends BaseTypeormQueryRepository<MedicalQuestionGeneratorTypeormEntity>
  implements MedicalQuestionGeneratorQueryRepositoryGateway
{
  protected readonly _type =
    MedicalQuestionGeneratorTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(MedicalQuestionGeneratorTypeormEntity)
    repository: Repository<MedicalQuestionGeneratorTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async getMedicalQuestionGeneratorById(
    id: MedicalQuestionGeneratorId,
  ): Promise<GetMedicalQuestionGeneratorWithRelationsQueryResult | null> {
    const medicalQuestionGenerator = await this.repository.findOne({
      where: { id: id.toString(), deletedAt: IsNull() },
      relations: [
        'medicalQuestionGeneratorResult',
        'medicalQuestionGeneratorInssBenefit',
        'medicalQuestionGeneratorLegalProceeding',
        'medicalQuestionGeneratorDocument',
        'createdBy',
        'createdBy.customer',
        'createdBy.organization',
        'updatedBy',
        'updatedBy.customer',
        'updatedBy.organization',
      ],
    });

    if (!medicalQuestionGenerator) {
      return null;
    }

    return this.mapperGateway.map(
      medicalQuestionGenerator,
      MedicalQuestionGeneratorTypeormEntity,
      GetMedicalQuestionGeneratorWithRelationsQueryResult,
    );
  }

  public async findOneByMedicalQuestionGeneratorIdAndOrganizationIdWithRelationsOrFail(
    medicalQuestionGeneratorId: MedicalQuestionGeneratorId,
    organizationId: OrganizationId,
    err: Constructor<NotFoundError>,
  ): Promise<GetMedicalQuestionGeneratorWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          id: medicalQuestionGeneratorId.toString(),
          analysisToolRecord: {
            createdBy: {
              organization: {
                id: organizationId.toString(),
              },
            },
          },
        },
        relations: {
          medicalQuestionGeneratorResult: true,
          medicalQuestionGeneratorInssBenefit: true,
          medicalQuestionGeneratorLegalProceeding: true,
          medicalQuestionGeneratorDocument: true,
          analysisToolRecord: {
            analysisToolClient: {
              createdBy: {
                customer: true,
                organization: true,
              },
              updatedBy: {
                customer: true,
                organization: true,
              },
              analysisToolClientInssBenefit: true,
              analysisToolClientLegalProceeding: true,
            },
            createdBy: {
              customer: true,
              organization: true,
            },
            updatedBy: {
              customer: true,
              organization: true,
            },
          },
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      MedicalQuestionGeneratorTypeormEntity,
      GetMedicalQuestionGeneratorWithRelationsQueryResult,
    );

    return mappedData;
  }

  public async findOneByMedicalQuestionGeneratorIdAndOrganizationIdOrFail(
    medicalQuestionGeneratorId: MedicalQuestionGeneratorId,
    organizationId: OrganizationId,
    err: Constructor<NotFoundError>,
  ): Promise<GetMedicalQuestionGeneratorWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          id: medicalQuestionGeneratorId.toString(),
          analysisToolRecord: {
            createdBy: {
              organization: {
                id: organizationId.toString(),
              },
            },
          },
        },
        relations: {
          medicalQuestionGeneratorResult: true,
          medicalQuestionGeneratorInssBenefit: true,
          medicalQuestionGeneratorLegalProceeding: true,
          medicalQuestionGeneratorDocument: true,
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      MedicalQuestionGeneratorTypeormEntity,
      GetMedicalQuestionGeneratorWithRelationsQueryResult,
    );

    return mappedData;
  }
}
