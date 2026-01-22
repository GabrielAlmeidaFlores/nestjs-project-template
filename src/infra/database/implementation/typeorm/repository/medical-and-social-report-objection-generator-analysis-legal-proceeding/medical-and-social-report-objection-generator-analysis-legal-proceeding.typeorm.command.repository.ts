import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-and-social-report-objection-generator-analysis-legal-proceeding.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/repository/medical-and-social-report-objection-generator-analysis-legal-proceeding/command/medical-and-social-report-objection-generator-analysis-legal-proceeding.command.repository.gateway';
import { MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingEntity } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-legal-proceeding/medical-and-social-report-objection-generator-analysis-legal-proceeding.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingId } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-legal-proceeding/value-object/medical-and-social-report-objection-generator-analysis-legal-proceeding-id/medical-and-social-report-objection-generator-analysis-legal-proceeding-id.value-object';

@Injectable()
export class MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingTypeormCommandRepository
  extends BaseTypeormCommandRepository<MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingTypeormEntity>
  implements
    MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingCommandRepositoryGateway
{
  protected readonly _type =
    MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingTypeormEntity,
    )
    repository: Repository<MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public deleteMedicalAndSocialReportObjectionGeneratorAnalysisLegalProceeding(
    id: MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  public createMedicalAndSocialReportObjectionGeneratorAnalysisLegalProceeding(
    props: MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingEntity,
      MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingTypeormEntity,
    );

    return this.create(mappedData);
  }
}
