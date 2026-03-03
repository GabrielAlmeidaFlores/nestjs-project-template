import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { MedicalAndSocialReportObjectionGeneratorAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-and-social-report-objection-generator-analysis-result.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { MedicalAndSocialReportObjectionGeneratorAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/repository/medical-and-social-report-objection-generator-analysis-result/command/medical-and-social-report-objection-generator-analysis-result.command.repository.gateway';
import { MedicalAndSocialReportObjectionGeneratorAnalysisResultEntity } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-result/medical-and-social-report-objection-generator-analysis-result.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisResultId } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-result/value-object/medical-and-social-report-objection-generator-analysis-result-id/medical-and-social-report-objection-generator-analysis-result-id.value-object';

@Injectable()
export class MedicalAndSocialReportObjectionGeneratorAnalysisResultTypeormCommandRepository
  extends BaseTypeormCommandRepository<MedicalAndSocialReportObjectionGeneratorAnalysisResultTypeormEntity>
  implements
    MedicalAndSocialReportObjectionGeneratorAnalysisResultCommandRepositoryGateway
{
  protected readonly _type =
    MedicalAndSocialReportObjectionGeneratorAnalysisResultTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      MedicalAndSocialReportObjectionGeneratorAnalysisResultTypeormEntity,
    )
    repository: Repository<MedicalAndSocialReportObjectionGeneratorAnalysisResultTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public updateMedicalAndSocialReportObjectionGeneratorAnalysisResult(
    id: MedicalAndSocialReportObjectionGeneratorAnalysisResultId,
    props: MedicalAndSocialReportObjectionGeneratorAnalysisResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      MedicalAndSocialReportObjectionGeneratorAnalysisResultEntity,
      MedicalAndSocialReportObjectionGeneratorAnalysisResultTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public createMedicalAndSocialReportObjectionGeneratorAnalysisResult(
    props: MedicalAndSocialReportObjectionGeneratorAnalysisResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      MedicalAndSocialReportObjectionGeneratorAnalysisResultEntity,
      MedicalAndSocialReportObjectionGeneratorAnalysisResultTypeormEntity,
    );

    return this.create(mappedData);
  }
}
