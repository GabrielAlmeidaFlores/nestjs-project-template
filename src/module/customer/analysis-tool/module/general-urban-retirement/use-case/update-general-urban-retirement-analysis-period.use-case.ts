import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { CidTenQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cid-ten/query/cid-ten.query.repository.gateway';
import { CidTenEntity } from '@module/customer/analysis-tool/domain/schema/entity/cid-ten/cid-ten-entity';
import { CidTenNotFoundError } from '@module/customer/analysis-tool/error/cid-ten-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { GeneralUrbanRetirementAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis/query/general-urban-retirement-analysis.query.repository.gateway';
import { GeneralUrbanRetirementAnalysisPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis-period/command/general-urban-retirement-analysis-period.command.repository.gateway';
import { GeneralUrbanRetirementAnalysisPeriodDisabilityCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis-period-disability/command/general-urban-retirement-analysis-period-disability.command.repository.gateway';
import { GeneralUrbanRetirementAnalysisPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis-period-document/command/general-urban-retirement-analysis-period-document.command.repository.gateway';
import { GeneralUrbanRetirementAnalysisPeriodSpecialTimeCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis-period-special-time/command/general-urban-retirement-analysis-period-special-time.command.repository.gateway';
import { GeneralUrbanRetirementAnalysisEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/general-urban-retirement-analysis-entity';
import { GeneralUrbanRetirementAnalysisId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/value-object/general-urban-retirement-analysis-id.value-object';
import { GeneralUrbanRetirementAnalysisPeriodSpecialTimeTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period/enum/general-urban-retirement-analysis-period-special-time-type.enum';
import { GeneralUrbanRetirementAnalysisPeriodEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period/general-urban-retirement-analysis-period.entity';
import { GeneralUrbanRetirementAnalysisPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period/value-object/general-urban-retirement-analysis-period-id.value-object';
import { GeneralUrbanRetirementAnalysisPeriodDisabilityTimeTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-disability/enum/general-urban-retirement-analysis-period-disability-time-type.enum';
import { GeneralUrbanRetirementAnalysisPeriodDisabilityEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-disability/general-urban-retirement-analysis-period-disability.entity';
import { GeneralUrbanRetirementAnalysisPeriodDisabilityId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-disability/value-object/general-urban-retirement-analysis-period-disability-id.value-object';
import { GeneralUrbanRetirementAnalysisPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-document/enum/general-urban-retirement-analysis-period-document-type.enum';
import { GeneralUrbanRetirementAnalysisPeriodDocumentEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-document/general-urban-retirement-analysis-period-document.entity';
import { GeneralUrbanRetirementAnalysisPeriodDocumentId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-document/value-object/general-urban-retirement-analysis-period-document-id.value-object';
import { GeneralUrbanRetirementAnalysisPeriodSpecialTimeEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-special-time/general-urban-retirement-analysis-period-special-time.entity';
import { GeneralUrbanRetirementAnalysisPeriodSpecialTimeId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-special-time/value-object/general-urban-retirement-analysis-period-special-time-id.value-object';
import { CreateGeneralUrbanRetirementAnalysisPeriodItemRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement/dto/request/create-general-urban-retirement-analysis-period.request.dto';
import { UpdateGeneralUrbanRetirementAnalysisPeriodRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement/dto/request/update-general-urban-retirement-analysis-period.request.dto';
import { UpdateGeneralUrbanRetirementAnalysisPeriodResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement/dto/response/update-general-urban-retirement-analysis-period.response.dto';
import { GeneralUrbanRetirementAnalysisNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement/error/general-urban-retirement-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UpdateGeneralUrbanRetirementAnalysisPeriodUseCase {
  protected readonly _type =
    UpdateGeneralUrbanRetirementAnalysisPeriodUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(GeneralUrbanRetirementAnalysisQueryRepositoryGateway)
    private readonly generalUrbanRetirementAnalysisQueryRepositoryGateway: GeneralUrbanRetirementAnalysisQueryRepositoryGateway,
    @Inject(GeneralUrbanRetirementAnalysisPeriodCommandRepositoryGateway)
    private readonly generalUrbanRetirementAnalysisPeriodCommandRepositoryGateway: GeneralUrbanRetirementAnalysisPeriodCommandRepositoryGateway,
    @Inject(
      GeneralUrbanRetirementAnalysisPeriodSpecialTimeCommandRepositoryGateway,
    )
    private readonly generalUrbanRetirementAnalysisPeriodSpecialTimeCommandRepositoryGateway: GeneralUrbanRetirementAnalysisPeriodSpecialTimeCommandRepositoryGateway,
    @Inject(
      GeneralUrbanRetirementAnalysisPeriodDisabilityCommandRepositoryGateway,
    )
    private readonly generalUrbanRetirementAnalysisPeriodDisabilityCommandRepositoryGateway: GeneralUrbanRetirementAnalysisPeriodDisabilityCommandRepositoryGateway,
    @Inject(
      GeneralUrbanRetirementAnalysisPeriodDocumentCommandRepositoryGateway,
    )
    private readonly generalUrbanRetirementAnalysisPeriodDocumentCommandRepositoryGateway: GeneralUrbanRetirementAnalysisPeriodDocumentCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(CidTenQueryRepositoryGateway)
    private readonly cidTenQueryRepositoryGateway: CidTenQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    generalUrbanRetirementAnalysisId: GeneralUrbanRetirementAnalysisId,
    dto: UpdateGeneralUrbanRetirementAnalysisPeriodRequestDto,
  ): Promise<UpdateGeneralUrbanRetirementAnalysisPeriodResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysis =
      await this.generalUrbanRetirementAnalysisQueryRepositoryGateway.findOneByGeneralUrbanRetirementAnalysisIdAndOrganizationIdWithRelationsOrFail(
        generalUrbanRetirementAnalysisId,
        organizationSessionData.organizationId,
        GeneralUrbanRetirementAnalysisNotFoundError,
      );

    const transactionOperations: TransactionType[] = [];

    for (const period of analysis.periods) {
      if (
        period.specialTimePeriod?.documents !== undefined &&
        period.specialTimePeriod.documents.length > 0
      ) {
        for (const doc of period.specialTimePeriod.documents) {
          transactionOperations.push(
            this.generalUrbanRetirementAnalysisPeriodDocumentCommandRepositoryGateway.deleteGeneralUrbanRetirementAnalysisPeriodDocument(
              doc.id,
            ),
          );
        }
      }
      if (
        period.disabilityPeriod?.documents !== undefined &&
        period.disabilityPeriod.documents.length > 0
      ) {
        for (const doc of period.disabilityPeriod.documents) {
          transactionOperations.push(
            this.generalUrbanRetirementAnalysisPeriodDocumentCommandRepositoryGateway.deleteGeneralUrbanRetirementAnalysisPeriodDocument(
              doc.id,
            ),
          );
        }
      }
      if (period.specialTimePeriod !== undefined) {
        transactionOperations.push(
          this.generalUrbanRetirementAnalysisPeriodSpecialTimeCommandRepositoryGateway.deleteGeneralUrbanRetirementAnalysisPeriodSpecialTime(
            period.specialTimePeriod.id,
          ),
        );
      }
      if (period.disabilityPeriod !== undefined) {
        transactionOperations.push(
          this.generalUrbanRetirementAnalysisPeriodDisabilityCommandRepositoryGateway.deleteGeneralUrbanRetirementAnalysisPeriodDisability(
            period.disabilityPeriod.id,
          ),
        );
      }
      transactionOperations.push(
        this.generalUrbanRetirementAnalysisPeriodCommandRepositoryGateway.deleteGeneralUrbanRetirementAnalysisPeriod(
          period.id,
        ),
      );
    }

    const analysisEntity = new GeneralUrbanRetirementAnalysisEntity({
      id: analysis.id,
      careerStartDate: analysis.careerStartDate,
      publicServiceStartDate: analysis.publicServiceStartDate,
    });

    for (const periodDto of dto.periods) {
      const period = new GeneralUrbanRetirementAnalysisPeriodEntity({
        id: new GeneralUrbanRetirementAnalysisPeriodId(),
        startDate: periodDto.startDate,
        endDate: periodDto.endDate,
        jobPosition: periodDto.jobPosition,
        career: periodDto.career,
        serviceType: periodDto.serviceType,
        department: periodDto.department,
        generalUrbanRetirementAnalysis: analysisEntity,
      });

      transactionOperations.push(
        this.generalUrbanRetirementAnalysisPeriodCommandRepositoryGateway.createGeneralUrbanRetirementAnalysisPeriod(
          period,
        ),
      );

      if (
        periodDto.specialTime !== undefined &&
        periodDto.specialTime.type !==
          GeneralUrbanRetirementAnalysisPeriodSpecialTimeTypeEnum.NONE
      ) {
        const { startDate, endDate } = this.resolveSpecialTimeDates(
          periodDto,
          periodDto.specialTime,
        );
        const specialTime =
          new GeneralUrbanRetirementAnalysisPeriodSpecialTimeEntity({
            id: new GeneralUrbanRetirementAnalysisPeriodSpecialTimeId(),
            type: periodDto.specialTime.type,
            startDate,
            endDate,
            generalUrbanRetirementAnalysisPeriod: period,
          });
        transactionOperations.push(
          this.generalUrbanRetirementAnalysisPeriodSpecialTimeCommandRepositoryGateway.createGeneralUrbanRetirementAnalysisPeriodSpecialTime(
            specialTime,
          ),
        );

        const docs = periodDto.specialTime.documents;
        if (docs !== undefined) {
          const specialTimeDocEntries: Array<{
            type: GeneralUrbanRetirementAnalysisPeriodDocumentTypeEnum;
            files: Array<{
              base64: { decodeToBuffer: () => Buffer };
              originalFileName: string;
            }>;
          }> = [
            {
              type: GeneralUrbanRetirementAnalysisPeriodDocumentTypeEnum.PPP,
              files: docs.ppp ?? [],
            },
            {
              type: GeneralUrbanRetirementAnalysisPeriodDocumentTypeEnum.CTPS,
              files: docs.ctps ?? [],
            },
            {
              type: GeneralUrbanRetirementAnalysisPeriodDocumentTypeEnum.LTCAT,
              files: docs.ltcat ?? [],
            },
            {
              type: GeneralUrbanRetirementAnalysisPeriodDocumentTypeEnum.JUDICIAL,
              files: docs.judicial ?? [],
            },
            {
              type: GeneralUrbanRetirementAnalysisPeriodDocumentTypeEnum.OTHER,
              files: docs.outros ?? [],
            },
          ];
          for (const entry of specialTimeDocEntries) {
            for (const file of entry.files) {
              const documentUrl = await this.uploadBase64File(
                file.base64.decodeToBuffer(),
                file.originalFileName,
              );
              const docEntity =
                new GeneralUrbanRetirementAnalysisPeriodDocumentEntity({
                  id: new GeneralUrbanRetirementAnalysisPeriodDocumentId(),
                  document: documentUrl,
                  documentType: entry.type,
                  generalUrbanRetirementAnalysisPeriodSpecialTime: specialTime,
                  generalUrbanRetirementAnalysisPeriodDisability: null,
                  generalUrbanRetirementAnalysis: null,
                });
              transactionOperations.push(
                this.generalUrbanRetirementAnalysisPeriodDocumentCommandRepositoryGateway.createGeneralUrbanRetirementAnalysisPeriodDocument(
                  docEntity,
                ),
              );
            }
          }
        }
      }

      if (
        periodDto.disability !== undefined &&
        periodDto.disability.type !==
          GeneralUrbanRetirementAnalysisPeriodDisabilityTimeTypeEnum.NONE
      ) {
        const { startDate, endDate } = this.resolveDisabilityDates(
          periodDto,
          periodDto.disability,
        );
        const cidTenResult =
          await this.cidTenQueryRepositoryGateway.findOneByIdOrFail(
            periodDto.disability.cidTenId,
            CidTenNotFoundError,
          );
        const cidTenEntity = new CidTenEntity({
          id: cidTenResult.id,
          code: cidTenResult.code,
          description: cidTenResult.description,
        });
        const disability =
          new GeneralUrbanRetirementAnalysisPeriodDisabilityEntity({
            id: new GeneralUrbanRetirementAnalysisPeriodDisabilityId(),
            type: periodDto.disability.type,
            degree: periodDto.disability.degree,
            startDate,
            endDate,
            category: periodDto.disability.category,
            description: periodDto.disability.description,
            dailyImpact: periodDto.disability.dailyImpact,
            cidTen: cidTenEntity,
            generalUrbanRetirementAnalysisPeriod: period,
          });
        transactionOperations.push(
          this.generalUrbanRetirementAnalysisPeriodDisabilityCommandRepositoryGateway.createGeneralUrbanRetirementAnalysisPeriodDisability(
            disability,
          ),
        );

        const docs = periodDto.disability.documents;
        if (docs !== undefined) {
          const disabilityDocEntries: Array<{
            type: GeneralUrbanRetirementAnalysisPeriodDocumentTypeEnum;
            files: Array<{
              base64: { decodeToBuffer: () => Buffer };
              originalFileName: string;
            }>;
          }> = [
            {
              type: GeneralUrbanRetirementAnalysisPeriodDocumentTypeEnum.MEDICAL,
              files: docs.medico ?? [],
            },
            {
              type: GeneralUrbanRetirementAnalysisPeriodDocumentTypeEnum.OTHER_MEDICAL,
              files: docs.outros_medicos ?? [],
            },
          ];
          for (const entry of disabilityDocEntries) {
            for (const file of entry.files) {
              const documentUrl = await this.uploadBase64File(
                file.base64.decodeToBuffer(),
                file.originalFileName,
              );
              const docEntity =
                new GeneralUrbanRetirementAnalysisPeriodDocumentEntity({
                  id: new GeneralUrbanRetirementAnalysisPeriodDocumentId(),
                  document: documentUrl,
                  documentType: entry.type,
                  generalUrbanRetirementAnalysisPeriodSpecialTime: null,
                  generalUrbanRetirementAnalysisPeriodDisability: disability,
                  generalUrbanRetirementAnalysis: null,
                });
              transactionOperations.push(
                this.generalUrbanRetirementAnalysisPeriodDocumentCommandRepositoryGateway.createGeneralUrbanRetirementAnalysisPeriodDocument(
                  docEntity,
                ),
              );
            }
          }
        }
      }
    }

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionOperations,
    );
    await transaction.commit();

    return UpdateGeneralUrbanRetirementAnalysisPeriodResponseDto.build({
      generalUrbanRetirementAnalysisId,
    });
  }

  private resolveSpecialTimeDates(
    periodDto: CreateGeneralUrbanRetirementAnalysisPeriodItemRequestDto,
    specialTimeDto: {
      type: GeneralUrbanRetirementAnalysisPeriodSpecialTimeTypeEnum;
      startDate?: Date;
      endDate?: Date;
    },
  ): { startDate: Date; endDate: Date } {
    if (
      specialTimeDto.type ===
      GeneralUrbanRetirementAnalysisPeriodSpecialTimeTypeEnum.TOTAL
    ) {
      return { startDate: periodDto.startDate, endDate: periodDto.endDate };
    }
    if (
      specialTimeDto.startDate !== undefined &&
      specialTimeDto.endDate !== undefined
    ) {
      return {
        startDate: specialTimeDto.startDate,
        endDate: specialTimeDto.endDate,
      };
    }
    return { startDate: periodDto.startDate, endDate: periodDto.endDate };
  }

  private resolveDisabilityDates(
    periodDto: CreateGeneralUrbanRetirementAnalysisPeriodItemRequestDto,
    disabilityDto: {
      type: GeneralUrbanRetirementAnalysisPeriodDisabilityTimeTypeEnum;
      startDate?: Date;
      endDate?: Date;
    },
  ): { startDate: Date; endDate: Date } {
    if (
      disabilityDto.type ===
      GeneralUrbanRetirementAnalysisPeriodDisabilityTimeTypeEnum.TOTAL
    ) {
      return { startDate: periodDto.startDate, endDate: periodDto.endDate };
    }
    if (
      disabilityDto.startDate !== undefined &&
      disabilityDto.endDate !== undefined
    ) {
      return {
        startDate: disabilityDto.startDate,
        endDate: disabilityDto.endDate,
      };
    }
    return { startDate: periodDto.startDate, endDate: periodDto.endDate };
  }

  private async uploadBase64File(
    buffer: Buffer,
    originalFileName: string,
  ): Promise<string> {
    const fileModel = FileModel.build({
      buffer,
      originalName: originalFileName,
      size: buffer.length,
      encoding: '7bit',
    });
    return this.fileProcessorGateway.uploadFile(fileModel);
  }
}
