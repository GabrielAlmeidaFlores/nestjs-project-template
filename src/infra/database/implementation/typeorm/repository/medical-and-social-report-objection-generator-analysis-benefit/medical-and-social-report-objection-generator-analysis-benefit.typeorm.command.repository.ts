import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { MedicalAndSocialReportObjectionGeneratorAnalysisBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-and-social-report-objection-generator-analysis-benefit.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { MedicalAndSocialReportObjectionGeneratorAnalysisBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/repository/medical-and-social-report-objection-generator-analysis-benefit/command/medical-and-social-report-objection-generator-analysis-benefit.command.repository.gateway';
import { MedicalAndSocialReportObjectionGeneratorAnalysisBenefitEntity } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-benefit/medical-and-social-report-objection-generator-analysis-benefit.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisBenefitId } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-benefit/value-object/medical-and-social-report-objection-generator-analysis-benefit-id/medical-and-social-report-objection-generator-analysis-benefit-id.value-object';

@Injectable()
export class MedicalAndSocialReportObjectionGeneratorAnalysisBenefitTypeormCommandRepository
  extends BaseTypeormCommandRepository<MedicalAndSocialReportObjectionGeneratorAnalysisBenefitTypeormEntity>
  implements MedicalAndSocialReportObjectionGeneratorAnalysisBenefitCommandRepositoryGateway
{
  protected readonly _type =
    MedicalAndSocialReportObjectionGeneratorAnalysisBenefitTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(MedicalAndSocialReportObjectionGeneratorAnalysisBenefitTypeormEntity)
    repository: Repository<MedicalAndSocialReportObjectionGeneratorAnalysisBenefitTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public deleteMedicalAndSocialReportObjectionGeneratorAnalysisBenefit(
    id: MedicalAndSocialReportObjectionGeneratorAnalysisBenefitId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  public createMedicalAndSocialReportObjectionGeneratorAnalysisBenefit(
    props: MedicalAndSocialReportObjectionGeneratorAnalysisBenefitEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      MedicalAndSocialReportObjectionGeneratorAnalysisBenefitEntity,
      MedicalAndSocialReportObjectionGeneratorAnalysisBenefitTypeormEntity,
    );

    return this.create(mappedData);
  }
}

