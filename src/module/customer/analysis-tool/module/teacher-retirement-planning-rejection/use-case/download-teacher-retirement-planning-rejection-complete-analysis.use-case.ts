import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { TeacherRetirementPlanningRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/repository/teacher-retirement-planning-rejection/query/teacher-retirement-planning-rejection.query.repository.gateway';
import { TeacherRetirementPlanningRejectionResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/repository/teacher-retirement-planning-rejection-result/command/teacher-retirement-planning-rejection-result.command.repository.gateway';
import { TeacherRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/value-object/teacher-retirement-planning-rejection-id.value-object';
import { TeacherRetirementPlanningRejectionResultEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-result/teacher-retirement-planning-rejection-result.entity';
import { TeacherRetirementPlanningRejectionResultId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-result/value-object/teacher-retirement-planning-rejection-result-id.value-object';
import { TeacherRetirementPlanningRejectionCompleteAnalysisDownloadNotFoundError } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/error/teacher-retirement-planning-rejection-complete-analysis-download-not-found.error';
import { TeacherRetirementPlanningRejectionNotFoundError } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/error/teacher-retirement-planning-rejection-not-found.error';
import { TeacherRetirementPlanningRejectionResultNotFoundError } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/error/teacher-retirement-planning-rejection-result-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

import type { TeacherRetirementPlanningRejectionResultInterface } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/interface/teacher-retirement-planning-rejection-result.interface';

@Injectable()
export class DownloadTeacherRetirementPlanningRejectionCompleteAnalysisUseCase {
  protected readonly _type =
    DownloadTeacherRetirementPlanningRejectionCompleteAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(TeacherRetirementPlanningRejectionQueryRepositoryGateway)
    private readonly teacherRetirementPlanningRejectionQueryRepositoryGateway: TeacherRetirementPlanningRejectionQueryRepositoryGateway,
    @Inject(TeacherRetirementPlanningRejectionResultCommandRepositoryGateway)
    private readonly teacherRetirementPlanningRejectionResultCommandRepositoryGateway: TeacherRetirementPlanningRejectionResultCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    teacherRetirementPlanningRejectionId: TeacherRetirementPlanningRejectionId,
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByTeacherRetirementPlanningRejectionIdAndOrganizationIdAndAuthIdentityIdOrFail(
      teacherRetirementPlanningRejectionId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      TeacherRetirementPlanningRejectionNotFoundError,
    );

    const rejection =
      await this.teacherRetirementPlanningRejectionQueryRepositoryGateway.findOneByTeacherRetirementPlanningRejectionIdOrFailWithRelations(
        teacherRetirementPlanningRejectionId,
        TeacherRetirementPlanningRejectionNotFoundError,
      );

    const currentResult = rejection.result;

    if (currentResult === null) {
      throw new TeacherRetirementPlanningRejectionResultNotFoundError();
    }

    let downloadContent = currentResult.completeAnalysisDownload;

    if (downloadContent === null) {
      if (currentResult.completeAnalysis === null) {
        throw new TeacherRetirementPlanningRejectionCompleteAnalysisDownloadNotFoundError();
      }

      const parsedResult = this.parseCompleteAnalysis(
        currentResult.completeAnalysis,
      );

      downloadContent = this.buildCompleteAnalysisDownload(parsedResult);

      if (downloadContent === null) {
        throw new TeacherRetirementPlanningRejectionCompleteAnalysisDownloadNotFoundError();
      }

      const updatedResult = new TeacherRetirementPlanningRejectionResultEntity({
        id: new TeacherRetirementPlanningRejectionResultId(currentResult.id),
        inssDecisionAnalysis: currentResult.inssDecisionAnalysis,
        firstAnalysis: currentResult.firstAnalysis,
        completeAnalysis: currentResult.completeAnalysis,
        completeAnalysisDownload: downloadContent,
        simplifiedAnalysis: currentResult.simplifiedAnalysis,
      });

      const transaction = await this.baseTransactionRepositoryGateway.execute([
        this.teacherRetirementPlanningRejectionResultCommandRepositoryGateway.updateTeacherRetirementPlanningRejectionResult(
          updatedResult,
        ),
      ]);

      await transaction.commit();
    }

    const htmlContent =
      await this.exportDocumentGateway.convertMarkdownToHtml(downloadContent);

    return this.exportDocumentGateway.downloadFileAsStreamable(
      htmlContent,
      format,
      'analise_completa_indeferimento_aposentadoria_professor',
    );
  }

  private parseCompleteAnalysis(
    raw: string,
  ): TeacherRetirementPlanningRejectionResultInterface {
    let cleanedJson = raw;

    if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
      cleanedJson = JSON.parse(cleanedJson) as string;
    }

    return JSON.parse(
      cleanedJson,
    ) as TeacherRetirementPlanningRejectionResultInterface;
  }

  private buildCompleteAnalysisDownload(
    parsedResult: TeacherRetirementPlanningRejectionResultInterface,
  ): string | null {
    if (parsedResult.analysisResult.trim() === '') {
      return null;
    }

    return parsedResult.analysisResult;
  }
}
