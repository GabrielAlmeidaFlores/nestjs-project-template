import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { MedicalAndSocialReportObjectionGeneratorAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-and-social-report-objection-generator-analysis-document.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { MedicalAndSocialReportObjectionGeneratorAnalysisDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/repository/medical-and-social-report-objection-generator-analysis-document/command/medical-and-social-report-objection-generator-analysis-document.command.repository.gateway';
import { MedicalAndSocialReportObjectionGeneratorAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-document/medical-and-social-report-objection-generator-analysis-document.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisDocumentId } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-document/value-object/medical-and-social-report-objection-generator-analysis-document-id/medical-and-social-report-objection-generator-analysis-document-id.value-object';

@Injectable()
export class MedicalAndSocialReportObjectionGeneratorAnalysisDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<MedicalAndSocialReportObjectionGeneratorAnalysisDocumentTypeormEntity>
  implements MedicalAndSocialReportObjectionGeneratorAnalysisDocumentCommandRepositoryGateway
{
  protected readonly _type =
    MedicalAndSocialReportObjectionGeneratorAnalysisDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(MedicalAndSocialReportObjectionGeneratorAnalysisDocumentTypeormEntity)
    repository: Repository<MedicalAndSocialReportObjectionGeneratorAnalysisDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createMedicalAndSocialReportObjectionGeneratorAnalysisDocument(
    props: MedicalAndSocialReportObjectionGeneratorAnalysisDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      MedicalAndSocialReportObjectionGeneratorAnalysisDocumentEntity,
      MedicalAndSocialReportObjectionGeneratorAnalysisDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteMedicalAndSocialReportObjectionGeneratorAnalysisDocument(
    id: MedicalAndSocialReportObjectionGeneratorAnalysisDocumentId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}

