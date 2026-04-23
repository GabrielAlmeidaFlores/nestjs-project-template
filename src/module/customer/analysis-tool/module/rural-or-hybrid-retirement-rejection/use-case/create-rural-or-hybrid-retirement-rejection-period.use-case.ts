import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { RuralOrHybridRetirementRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection/query/rural-or-hybrid-retirement-rejection.query.repository.gateway';
import { RuralOrHybridRetirementRejectionPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection-period/command/rural-or-hybrid-retirement-rejection-period.command.repository.gateway';
import { RuralOrHybridRetirementRejectionPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection-period-document/command/rural-or-hybrid-retirement-rejection-period-document.command.repository.gateway';
import { RuralOrHybridRetirementRejectionPeriodMemberCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection-period-member/command/rural-or-hybrid-retirement-rejection-period-member.command.repository.gateway';
import { RuralOrHybridRetirementRejectionPeriodMemberDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection-period-member-document/command/rural-or-hybrid-retirement-rejection-period-member-document.command.repository.gateway';
import { RuralOrHybridRetirementRejectionId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id.value-object';
import { RuralOrHybridRetirementRejectionPeriodEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period/rural-or-hybrid-retirement-rejection-period.entity';
import { RuralOrHybridRetirementRejectionPeriodId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period/value-object/rural-or-hybrid-retirement-rejection-period-id.value-object';
import { RuralOrHybridRetirementRejectionPeriodDocumentEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period-document/rural-or-hybrid-retirement-rejection-period-document.entity';
import { RuralOrHybridRetirementRejectionPeriodDocumentId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period-document/value-object/rural-or-hybrid-retirement-rejection-period-document-id.value-object';
import { RuralOrHybridRetirementRejectionPeriodMemberEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period-member/rural-or-hybrid-retirement-rejection-period-member.entity';
import { RuralOrHybridRetirementRejectionPeriodMemberId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period-member/value-object/rural-or-hybrid-retirement-rejection-period-member-id.value-object';
import { RuralOrHybridRetirementRejectionPeriodMemberDocumentEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period-member-document/rural-or-hybrid-retirement-rejection-period-member-document.entity';
import { RuralOrHybridRetirementRejectionPeriodMemberDocumentId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period-member-document/value-object/rural-or-hybrid-retirement-rejection-period-member-document-id.value-object';
import { RuralOrHybridRetirementRejectionPeriodMemberItemRequestDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/request/create-rural-or-hybrid-retirement-rejection-period-member.request.dto';
import {
  CreateRuralOrHybridRetirementRejectionPeriodRequestDto,
  RuralOrHybridRetirementRejectionPeriodItemRequestDto,
} from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/request/create-rural-or-hybrid-retirement-rejection-period.request.dto';
import { CreateRuralOrHybridRetirementRejectionPeriodResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/response/create-rural-or-hybrid-retirement-rejection-period.response.dto';
import { RuralOrHybridRetirementRejectionNotFoundError } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/error/rural-or-hybrid-retirement-rejection-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class CreateRuralOrHybridRetirementRejectionPeriodUseCase {
  protected readonly _type =
    CreateRuralOrHybridRetirementRejectionPeriodUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(RuralOrHybridRetirementRejectionQueryRepositoryGateway)
    private readonly ruralOrHybridRetirementRejectionQueryRepositoryGateway: RuralOrHybridRetirementRejectionQueryRepositoryGateway,
    @Inject(RuralOrHybridRetirementRejectionPeriodCommandRepositoryGateway)
    private readonly ruralOrHybridRetirementRejectionPeriodCommandRepositoryGateway: RuralOrHybridRetirementRejectionPeriodCommandRepositoryGateway,
    @Inject(
      RuralOrHybridRetirementRejectionPeriodDocumentCommandRepositoryGateway,
    )
    private readonly ruralOrHybridRetirementRejectionPeriodDocumentCommandRepositoryGateway: RuralOrHybridRetirementRejectionPeriodDocumentCommandRepositoryGateway,
    @Inject(
      RuralOrHybridRetirementRejectionPeriodMemberCommandRepositoryGateway,
    )
    private readonly ruralOrHybridRetirementRejectionPeriodMemberCommandRepositoryGateway: RuralOrHybridRetirementRejectionPeriodMemberCommandRepositoryGateway,
    @Inject(
      RuralOrHybridRetirementRejectionPeriodMemberDocumentCommandRepositoryGateway,
    )
    private readonly ruralOrHybridRetirementRejectionPeriodMemberDocumentCommandRepositoryGateway: RuralOrHybridRetirementRejectionPeriodMemberDocumentCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId,
    dto: CreateRuralOrHybridRetirementRejectionPeriodRequestDto,
  ): Promise<CreateRuralOrHybridRetirementRejectionPeriodResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    await this.ruralOrHybridRetirementRejectionQueryRepositoryGateway.findOneByRuralOrHybridRetirementRejectionIdOrFailWithRelations(
      ruralOrHybridRetirementRejectionId,
      RuralOrHybridRetirementRejectionNotFoundError,
    );

    const transactions: TransactionType[] = [];

    for (const periodDto of dto.periods) {
      const periodId = new RuralOrHybridRetirementRejectionPeriodId();

      transactions.push(
        this.ruralOrHybridRetirementRejectionPeriodCommandRepositoryGateway.createRuralOrHybridRetirementRejectionPeriod(
          this.buildPeriodEntity(
            periodId,
            ruralOrHybridRetirementRejectionId,
            periodDto,
          ),
        ),
      );

      if (periodDto.documents && periodDto.documents.length > 0) {
        const documentTransactions = await Promise.all(
          periodDto.documents.map(async (documentDto) => {
            const buffer = documentDto.file.base64.decodeToBuffer();

            const fileModel = FileModel.build({
              buffer,
              originalName: documentDto.file.originalFileName,
              size: buffer.length,
              encoding: '7bit',
            });

            const document =
              await this.fileProcessorGateway.uploadFile(fileModel);

            return this.ruralOrHybridRetirementRejectionPeriodDocumentCommandRepositoryGateway.createRuralOrHybridRetirementRejectionPeriodDocument(
              new RuralOrHybridRetirementRejectionPeriodDocumentEntity({
                id: new RuralOrHybridRetirementRejectionPeriodDocumentId(),
                document,
                type: documentDto.type,
                ruralOrHybridRetirementRejectionPeriodId: periodId,
              }),
            );
          }),
        );

        transactions.push(...documentTransactions);
      }

      if (periodDto.members && periodDto.members.length > 0) {
        for (const memberDto of periodDto.members) {
          const memberId = new RuralOrHybridRetirementRejectionPeriodMemberId();

          transactions.push(
            this.ruralOrHybridRetirementRejectionPeriodMemberCommandRepositoryGateway.createRuralOrHybridRetirementRejectionPeriodMember(
              this.buildMemberEntity(memberId, periodId, memberDto),
            ),
          );

          if (memberDto.documents && memberDto.documents.length > 0) {
            const memberDocumentTransactions = await Promise.all(
              memberDto.documents.map(async (documentDto) => {
                const buffer = documentDto.file.base64.decodeToBuffer();

                const fileModel = FileModel.build({
                  buffer,
                  originalName: documentDto.file.originalFileName,
                  size: buffer.length,
                  encoding: '7bit',
                });

                const document =
                  await this.fileProcessorGateway.uploadFile(fileModel);

                return this.ruralOrHybridRetirementRejectionPeriodMemberDocumentCommandRepositoryGateway.createRuralOrHybridRetirementRejectionPeriodMemberDocument(
                  new RuralOrHybridRetirementRejectionPeriodMemberDocumentEntity(
                    {
                      id: new RuralOrHybridRetirementRejectionPeriodMemberDocumentId(),
                      document,
                      type: documentDto.type,
                      ruralOrHybridRetirementRejectionPeriodMemberId: memberId,
                    },
                  ),
                );
              }),
            );

            transactions.push(...memberDocumentTransactions);
          }
        }
      }
    }

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return CreateRuralOrHybridRetirementRejectionPeriodResponseDto.build({
      ruralOrHybridRetirementRejectionId,
    });
  }

  private buildMemberEntity(
    memberId: RuralOrHybridRetirementRejectionPeriodMemberId,
    ruralOrHybridRetirementRejectionPeriodId: RuralOrHybridRetirementRejectionPeriodId,
    memberDto: RuralOrHybridRetirementRejectionPeriodMemberItemRequestDto,
  ): RuralOrHybridRetirementRejectionPeriodMemberEntity {
    return new RuralOrHybridRetirementRejectionPeriodMemberEntity({
      id: memberId,
      name: memberDto.name ?? null,
      federalDocument: memberDto.federalDocument ?? null,
      kinship: memberDto.kinship ?? null,
      hasReceivedRuralBenefit: memberDto.hasReceivedRuralBenefit ?? null,
      benefitNumber: memberDto.benefitNumber ?? null,
      ruralOrHybridRetirementRejectionPeriodId,
    });
  }

  private buildPeriodEntity(
    periodId: RuralOrHybridRetirementRejectionPeriodId,
    ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId,
    periodDto: RuralOrHybridRetirementRejectionPeriodItemRequestDto,
  ): RuralOrHybridRetirementRejectionPeriodEntity {
    return new RuralOrHybridRetirementRejectionPeriodEntity({
      id: periodId,
      startDate: periodDto.startDate ?? null,
      endDate: periodDto.endDate ?? null,
      workerType: periodDto.workerType ?? null,
      workSchedule: periodDto.workSchedule ?? null,
      propertyName: periodDto.propertyName ?? null,
      propertyCategory: periodDto.propertyCategory ?? null,
      propertyOwner: periodDto.propertyOwner ?? null,
      propertyCep: periodDto.propertyCep ?? null,
      propertyState: periodDto.propertyState ?? null,
      propertyCity: periodDto.propertyCity ?? null,
      propertyNeighbourhood: periodDto.propertyNeighbourhood ?? null,
      propertyStreet: periodDto.propertyStreet ?? null,
      propertyNumber: periodDto.propertyNumber ?? null,
      productionDestination: periodDto.productionDestination ?? null,
      employee: periodDto.employee ?? null,
      employeeAmount: periodDto.employeeAmount ?? null,
      agriculturalMachinery: periodDto.agriculturalMachinery ?? null,
      agriculturalMachineryDescription:
        periodDto.agriculturalMachineryDescription ?? null,
      farmVehicles: periodDto.farmVehicles ?? null,
      farmVehiclesDescription: periodDto.farmVehiclesDescription ?? null,
      incomeBesidesRuralProduction:
        periodDto.incomeBesidesRuralProduction ?? null,
      incomeBesidesRuralProductionDescription:
        periodDto.incomeBesidesRuralProductionDescription ?? null,
      clientHasOrHadCnpj: periodDto.clientHasOrHadCnpj ?? null,
      clientHasOrHadCnpjDescription:
        periodDto.clientHasOrHadCnpjDescription ?? null,
      clientLivesInUrbanArea: periodDto.clientLivesInUrbanArea ?? null,
      clientMunicipality: periodDto.clientMunicipality ?? null,
      clientState: periodDto.clientState ?? null,
      distance: periodDto.distance ?? null,
      ruralOrHybridRetirementRejectionId,
    });
  }
}
