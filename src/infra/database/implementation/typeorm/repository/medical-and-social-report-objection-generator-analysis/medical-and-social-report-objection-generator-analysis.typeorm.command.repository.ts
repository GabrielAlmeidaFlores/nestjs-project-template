import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-and-social-report-objection-generator-analysis.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { MedicalAndSocialReportObjectionGeneratorAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/repository/medical-and-social-report-objection-generator-analysis/command/medical-and-social-report-objection-generator-analysis.command.repository.gateway';
import { MedicalAndSocialReportObjectionGeneratorAnalysisEntity } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis/medical-and-social-report-objection-generator-analysis.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisId } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis/value-object/medical-and-social-report-objection-generator-analysis-id/medical-and-social-report-objection-generator-analysis-id.value-object';

@Injectable()
export class MedicalAndSocialReportObjectionGeneratorAnalysisTypeormCommandRepository
  extends BaseTypeormCommandRepository<MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity>
  implements
    MedicalAndSocialReportObjectionGeneratorAnalysisCommandRepositoryGateway
{
  protected readonly _type =
    MedicalAndSocialReportObjectionGeneratorAnalysisTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity,
    )
    repository: Repository<MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createMedicalAndSocialReportObjectionGeneratorAnalysis(
    props: MedicalAndSocialReportObjectionGeneratorAnalysisEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      MedicalAndSocialReportObjectionGeneratorAnalysisEntity,
      MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateMedicalAndSocialReportObjectionGeneratorAnalysis(
    id: MedicalAndSocialReportObjectionGeneratorAnalysisId,
    props: MedicalAndSocialReportObjectionGeneratorAnalysisEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      MedicalAndSocialReportObjectionGeneratorAnalysisEntity,
      MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public deleteMedicalAndSocialReportObjectionGeneratorAnalysis(
    id: MedicalAndSocialReportObjectionGeneratorAnalysisId,
    updatedBy: OrganizationMemberId,
  ): TransactionType {
    return this.update(id.toString(), {
      deletedAt: new Date(),
      updatedBy: {
        id: updatedBy.toString(),
      },
    });
  }
}
