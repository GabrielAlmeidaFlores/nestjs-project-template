import { Inject, Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { CustomerEmailSentAttachmentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer-email-sent-attachment.typeorm.entity';
import { CustomerEmailSentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer-email-sent.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { EmailGateway } from '@infra/email/email.gateway';
import {
  SendHTMLEmailAttachmentInputModelType,
  SendHTMLEmailInputModel,
} from '@infra/email/model/input/send-html-email.input.model';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';
import { AnalysisToolRecordId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-id/analysis-tool-record-id.value-objects';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { RetirementPlanningRppsQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/repository/retirement-planning-rpps/query/retirement-planning-rpps.query.repository.gateway';
import { RetirementPlanningRppsNotFoundError } from '@module/customer/analysis-tool/module/retirement-planning-rpps/error/retirement-planning-rpps-not-found.error';
import { CustomerEmailSentEntity } from '@module/customer/documents-sent-by-email/domain/schema/entity/customer-email-sent/customer-email-sent.entity';
import { SendDocumentsByEmailRequestDto } from '@module/customer/documents-sent-by-email/dto/request/send-documents-by-email.request.dto';
import { SendDocumentsByEmailResponseDto } from '@module/customer/documents-sent-by-email/dto/response/send-documents-by-email.response.dto';
import { AnalysisToolRecordDoesNotContainDocumentAnalysisError } from '@module/customer/documents-sent-by-email/error/analysis-tool-record-does-not-contain-document-analysis.error';
import { AnalysisToolRecordNotFoundError } from '@module/customer/documents-sent-by-email/error/analysis-tool-record-not-found.error';

import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { GetAnalysisToolRecordWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/result/get-analysis-tool-record-with-relations.query.result';
import type { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import type { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class SendDocumentsByEmailUseCase {
  protected readonly _type = SendDocumentsByEmailUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
    @Inject(EmailGateway)
    private readonly emailGateway: EmailGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(RetirementPlanningRppsQueryRepositoryGateway)
    private readonly retirementPlanningRppsQueryRepositoryGateway: RetirementPlanningRppsQueryRepositoryGateway,
  ) {}

  public async execute(
    organizationSessionData: OrganizationSessionDataModel,
    sessionData: SessionDataModel,
    dto: SendDocumentsByEmailRequestDto,
  ): Promise<SendDocumentsByEmailResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolRecordResults = await Promise.all(
      dto.analysisToolRecordIds.map(async (id) => {
        const analysisToolRecordId = new AnalysisToolRecordId(id);

        const baseRecord =
          await this.analysisToolRecordQueryRepositoryGateway.findOneByAnalysisToolRecordIdAndAuthIdentityIdAndOrganizationIdWithRelationsOrFail(
            analysisToolRecordId,
            organizationSessionData.organizationId,
            sessionData.authIdentityId,
            AnalysisToolRecordNotFoundError,
          );

        switch (baseRecord.type) {
          case AnalysisToolRecordTypeEnum.CNIS_FAST_ANALYSIS: {
            if (!baseRecord.cnisFastAnalysis?.id) {
              throw new AnalysisToolRecordNotFoundError();
            }

            return await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByCnisFastAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
              baseRecord.cnisFastAnalysis.id,
              organizationSessionData.organizationId,
              sessionData.authIdentityId,
              AnalysisToolRecordNotFoundError,
            );
          }
          case AnalysisToolRecordTypeEnum.RETIREMENT_PLANNING_RGPS: {
            if (!baseRecord.retirementPlanningRgps?.id) {
              throw new AnalysisToolRecordNotFoundError();
            }

            return await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByRetirementPlanningRgpsIdAndOrganizationIdAndAuthIdentityIdOrFail(
              baseRecord.retirementPlanningRgps.id,
              organizationSessionData.organizationId,
              sessionData.authIdentityId,
              AnalysisToolRecordNotFoundError,
            );
          }
          case AnalysisToolRecordTypeEnum.RETIREMENT_PLANNING_RPPS: {
            return baseRecord;
          }
          case AnalysisToolRecordTypeEnum.SPECIAL_ACTIVITY: {
            if (!baseRecord.specialActivity?.id) {
              throw new AnalysisToolRecordNotFoundError();
            }

            return await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsBySpecialActivityIdAndOrganizationIdAndAuthIdentityIdOrFail(
              baseRecord.specialActivity.id,
              organizationSessionData.organizationId,
              sessionData.authIdentityId,
              AnalysisToolRecordNotFoundError,
            );
          }
          case AnalysisToolRecordTypeEnum.JUDICIAL_CASE_ANALYSIS: {
            if (!baseRecord.judicialCaseAnalysis?.id) {
              throw new AnalysisToolRecordNotFoundError();
            }

            return await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByJudicialCaseAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
              baseRecord.judicialCaseAnalysis.id,
              organizationSessionData.organizationId,
              sessionData.authIdentityId,
              AnalysisToolRecordNotFoundError,
            );
          }
          case AnalysisToolRecordTypeEnum.ADMINISTRATIVE_PROCEDURE_INSS_ANALYSIS: {
            if (!baseRecord.administrativeProcedureInssAnalysis?.id) {
              throw new AnalysisToolRecordNotFoundError();
            }

            return await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByAdministrativeProcedureInssAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
              baseRecord.administrativeProcedureInssAnalysis.id,
              organizationSessionData.organizationId,
              sessionData.authIdentityId,
              AnalysisToolRecordNotFoundError,
            );
          }
          case AnalysisToolRecordTypeEnum.MEDICAL_QUESTION_GENERATOR: {
            if (!baseRecord.medicalQuestionGenerator?.id) {
              throw new AnalysisToolRecordNotFoundError();
            }

            return await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByMedicalQuestionGeneratorIdAndOrganizationIdAndAuthIdentityIdOrFail(
              baseRecord.medicalQuestionGenerator.id,
              organizationSessionData.organizationId,
              sessionData.authIdentityId,
              AnalysisToolRecordNotFoundError,
            );
          }
          case AnalysisToolRecordTypeEnum.MEDICAL_AND_SOCIAL_REPORT_OBJECTION_GENERATOR_ANALYSIS: {
            if (
              !baseRecord.medicalAndSocialReportObjectionGeneratorAnalysis?.id
            ) {
              throw new AnalysisToolRecordNotFoundError();
            }

            return await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByMedicalAndSocialReportObjectionGeneratorAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
              baseRecord.medicalAndSocialReportObjectionGeneratorAnalysis.id,
              organizationSessionData.organizationId,
              sessionData.authIdentityId,
              AnalysisToolRecordNotFoundError,
            );
          }
          case AnalysisToolRecordTypeEnum.SPEECH_GENERATOR: {
            if (!baseRecord.speechGenerator?.id) {
              throw new AnalysisToolRecordNotFoundError();
            }

            return await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsBySpeechGeneratorIdAndOrganizationIdAndAuthIdentityIdOrFail(
              baseRecord.speechGenerator.id,
              organizationSessionData.organizationId,
              sessionData.authIdentityId,
              AnalysisToolRecordNotFoundError,
            );
          }
          case AnalysisToolRecordTypeEnum.DISABILITY_ASSESSMENT_FOR_BPC_ANALYSIS: {
            if (!baseRecord.disabilityAssessmentForBpcAnalysis?.id) {
              throw new AnalysisToolRecordNotFoundError();
            }

            return await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByDisabilityAssessmentForBpcAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
              baseRecord.disabilityAssessmentForBpcAnalysis.id,
              organizationSessionData.organizationId,
              sessionData.authIdentityId,
              AnalysisToolRecordNotFoundError,
            );
          }
          case AnalysisToolRecordTypeEnum.PER_CAPITA_INCOME_FOR_BPC_ANALYSIS: {
            if (!baseRecord.perCapitaIncomeForBpcAnalysis?.id) {
              throw new AnalysisToolRecordNotFoundError();
            }

            return await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByPerCapitaIncomeForBpcAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
              baseRecord.perCapitaIncomeForBpcAnalysis.id,
              organizationSessionData.organizationId,
              sessionData.authIdentityId,
              AnalysisToolRecordNotFoundError,
            );
          }
          case AnalysisToolRecordTypeEnum.RURAL_TIMELINE_ANALYSIS: {
            if (!baseRecord.ruralTimelineAnalysis?.id) {
              throw new AnalysisToolRecordNotFoundError();
            }

            return await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByRuralTimelineAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
              baseRecord.ruralTimelineAnalysis.id,
              organizationSessionData.organizationId,
              sessionData.authIdentityId,
              AnalysisToolRecordNotFoundError,
            );
          }
          case AnalysisToolRecordTypeEnum.AUDIENCE_QUESTIONS_GENERATOR: {
            if (!baseRecord.audienceQuestionGenerator?.id) {
              throw new AnalysisToolRecordNotFoundError();
            }

            return await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByAudienceQuestionGeneratorIdAndOrganizationIdAndAuthIdentityIdOrFail(
              baseRecord.audienceQuestionGenerator.id,
              organizationSessionData.organizationId,
              sessionData.authIdentityId,
              AnalysisToolRecordNotFoundError,
            );
          }
          case AnalysisToolRecordTypeEnum.INSURANCE_QUALITY_ANALYSIS: {
            if (!baseRecord.insuranceQualityAnalysis?.id) {
              throw new AnalysisToolRecordNotFoundError();
            }

            return await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByInsuranceQualityAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
              baseRecord.insuranceQualityAnalysis.id,
              organizationSessionData.organizationId,
              sessionData.authIdentityId,
              AnalysisToolRecordNotFoundError,
            );
          }
          default:
            return baseRecord;
        }
      }),
    );

    const attachments: SendHTMLEmailAttachmentInputModelType[] =
      await Promise.all(
        analysisToolRecordResults.map(async (record) => {
          const content = await this.getAnalysisContentOrThrow(
            record,
            dto.isSimplified,
            organizationSessionData.organizationId,
          );

          const pdfBuffer = await this.exportDocumentGateway.downloadFile(
            content,
            ExportDocumentFormatEnum.PDF,
          );

          const versionSlug = dto.isSimplified ? 'simplificada' : 'padrao';

          const filename = `${record.code.toString()}_${versionSlug}.pdf`;

          return {
            filename,
            content: pdfBuffer,
            contentType: 'application/pdf',
          };
        }),
      );

    const customerEmailSent = new CustomerEmailSentEntity({
      emails: JSON.stringify(dto.emails),
      subject: dto.subject,
      htmlContent: dto.htmlContent,
      isSimplified: dto.isSimplified,
      sentBy: organizationMember.id,
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      this.createCustomerEmailSentTransaction(customerEmailSent),
      this.createAttachmentsTransaction(
        dto.analysisToolRecordIds,
        customerEmailSent.id.toString(),
      ),
    ]);

    await transaction.commit();

    await this.emailGateway.sendHTMLEmail(
      SendHTMLEmailInputModel.build({
        to: dto.emails,
        subject: dto.subject,
        emailTemplateName: 'customer-composed-email.html',
        emailTemplateParameters: {
          emailBody: dto.htmlContent,
          subject: dto.subject,
        },
        attachments,
      }),
    );

    return SendDocumentsByEmailResponseDto.build({
      customerEmailSentId: customerEmailSent.id.toString(),
      sentTo: dto.emails,
      subject: dto.subject,
    });
  }

  private async getAnalysisContentOrThrow(
    record: GetAnalysisToolRecordWithRelationsQueryResult,
    isSimplified: boolean,
    organizationId: OrganizationSessionDataModel['organizationId'],
  ): Promise<string> {
    const content =
      (await this.getAnalysisContentByType(
        record,
        record.type,
        isSimplified,
        organizationId,
      )) ?? null;

    if (
      content === null ||
      (typeof content === 'string' && content.trim() === '')
    ) {
      throw new AnalysisToolRecordDoesNotContainDocumentAnalysisError({
        analysisToolRecordCode: record.code,
        isSimplified,
      });
    }

    return content;
  }

  private async getAnalysisContentByType(
    record: GetAnalysisToolRecordWithRelationsQueryResult,
    type: AnalysisToolRecordTypeEnum,
    isSimplified: boolean,
    organizationId: OrganizationSessionDataModel['organizationId'],
  ): Promise<string | null | undefined> {
    switch (type) {
      case AnalysisToolRecordTypeEnum.CNIS_FAST_ANALYSIS: {
        const result = record.cnisFastAnalysis?.cnisFastAnalysisResult;
        return isSimplified
          ? result?.cnisSimplifiedAnalysis
          : result?.cnisCompleteAnalysis;
      }
      case AnalysisToolRecordTypeEnum.RETIREMENT_PLANNING_RGPS: {
        return (
          record.retirementPlanningRgps?.retirementPlanningRgpsResult?.result ??
          null
        );
      }
      case AnalysisToolRecordTypeEnum.RETIREMENT_PLANNING_RPPS: {
        const retirementPlanningRppsId = record.retirementPlanningRpps?.id;

        if (!retirementPlanningRppsId) {
          return null;
        }

        const rppsWithRelations =
          await this.retirementPlanningRppsQueryRepositoryGateway.findOneByRetirementPlanningIdAndOrganizationIdWithRelationsOrFail(
            retirementPlanningRppsId,
            organizationId,
            RetirementPlanningRppsNotFoundError,
          );

        const rppsResult =
          rppsWithRelations.retirementPlanningRppsResult ?? null;

        return isSimplified
          ? rppsResult?.retirementPlanningRppsSimplifiedAnalysis
          : rppsResult?.retirementPlanningRppsCompleteAnalysis;
      }
      case AnalysisToolRecordTypeEnum.SPECIAL_ACTIVITY: {
        const result = record.specialActivity?.specialActivityResult;

        return isSimplified
          ? result?.specialActivitySimplifiedAnalysis
          : result?.specialActivityCompleteAnalysisDownload;
      }
      case AnalysisToolRecordTypeEnum.JUDICIAL_CASE_ANALYSIS: {
        const result = record.judicialCaseAnalysis?.judicialCaseAnalysisResult;
        return isSimplified
          ? result?.judicialCaseSimplifiedAnalysis
          : result?.judicialCaseCompleteAnalysis;
      }
      case AnalysisToolRecordTypeEnum.ADMINISTRATIVE_PROCEDURE_INSS_ANALYSIS: {
        const result =
          record.administrativeProcedureInssAnalysis
            ?.administrativeProcedureInssAnalysisResult;
        return isSimplified
          ? result?.administrativeProcedureInssSimplifiedAnalysis
          : result?.administrativeProcedureInssCompleteAnalysis;
      }
      case AnalysisToolRecordTypeEnum.MEDICAL_QUESTION_GENERATOR: {
        const result =
          record.medicalQuestionGenerator?.medicalQuestionGeneratorResult;
        return isSimplified
          ? result?.medicalQuestionGeneratorSimplifiedAnalysis
          : result?.medicalQuestionGeneratorCompleteAnalysis;
      }
      case AnalysisToolRecordTypeEnum.MEDICAL_AND_SOCIAL_REPORT_OBJECTION_GENERATOR_ANALYSIS: {
        const result =
          record.medicalAndSocialReportObjectionGeneratorAnalysis
            ?.medicalAndSocialReportObjectionGeneratorAnalysisResult;
        return isSimplified
          ? result?.medicalAndSocialReportObjectionGeneratorSimplifiedAnalysis
          : result?.medicalAndSocialReportObjectionGeneratorCompleteAnalysis;
      }
      case AnalysisToolRecordTypeEnum.SPEECH_GENERATOR: {
        const result = record.speechGenerator?.speechGeneratorResult;
        return isSimplified
          ? result?.speechGeneratorSimplifiedContent
          : result?.speechGeneratorCompleteContent;
      }
      case AnalysisToolRecordTypeEnum.DISABILITY_ASSESSMENT_FOR_BPC_ANALYSIS: {
        const result =
          record.disabilityAssessmentForBpcAnalysis
            ?.disabilityAssessmentForBpcAnalysisResult;
        return isSimplified
          ? result?.disabilityAssessmentForBpcSimplifiedAnalysis
          : result?.disabilityAssessmentForBpcCompleteAnalysis;
      }
      case AnalysisToolRecordTypeEnum.PER_CAPITA_INCOME_FOR_BPC_ANALYSIS: {
        const result =
          record.perCapitaIncomeForBpcAnalysis
            ?.perCapitaIncomeForBpcAnalysisResult;
        return isSimplified
          ? result?.simplifiedAnalysis
          : result?.completeAnalysis;
      }
      case AnalysisToolRecordTypeEnum.RURAL_TIMELINE_ANALYSIS: {
        const result = record.ruralTimelineAnalysis;
        return isSimplified
          ? result?.ruralTimelineSimplifiedAnalysis
          : result?.ruralTimelineCompleteAnalysis;
      }
      case AnalysisToolRecordTypeEnum.AUDIENCE_QUESTIONS_GENERATOR: {
        const result =
          record.audienceQuestionGenerator?.audienceQuestionGeneratorResult;
        return isSimplified
          ? result?.audienceQuestionGeneratorSimplifiedAnalysis
          : result?.audienceQuestionGeneratorCompleteAnalysis;
      }
      case AnalysisToolRecordTypeEnum.INSURANCE_QUALITY_ANALYSIS: {
        const result =
          record.insuranceQualityAnalysis?.insuranceQualityAnalysisResult;

        // O banco guarda apenas a análise “resumida” no mesmo campo que o completo
        // para esta finalidade, então reaproveitamos.
        return result?.analysisSummary ?? null;
      }
      default:
        return null;
    }
  }

  private createCustomerEmailSentTransaction(
    customerEmailSent: CustomerEmailSentEntity,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      const repo = manager.getRepository(CustomerEmailSentTypeormEntity);

      await repo.save({
        id: customerEmailSent.id.toString(),
        emails: customerEmailSent.emails,
        subject: customerEmailSent.subject,
        htmlContent: customerEmailSent.htmlContent,
        isSimplified: customerEmailSent.isSimplified,
        sentBy: {
          id: customerEmailSent.sentBy?.toString() ?? '',
        } as OrganizationMemberTypeormEntity,
      });
    };
  }

  private createAttachmentsTransaction(
    analysisToolRecordIds: string[],
    customerEmailSentId: string,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      const repo = manager.getRepository(
        CustomerEmailSentAttachmentTypeormEntity,
      );

      await repo.save(
        analysisToolRecordIds.map((analysisToolRecordId) => {
          return {
            customerEmailSent: {
              id: customerEmailSentId,
            } as CustomerEmailSentTypeormEntity,
            analysisToolRecord: { id: analysisToolRecordId },
          };
        }),
      );
    };
  }
}
