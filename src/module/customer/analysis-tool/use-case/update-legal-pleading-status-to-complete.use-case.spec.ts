import { Test } from '@nestjs/testing';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionOutputModel } from '@core/domain/repository/base/transaction/model/output/transaction.output.model';
import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { LegalPleadingCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading/command/legal-pleading.repository.gateway';
import { LegalPleadingQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading/query/legal-pleading.query.repository.gateway';
import { LegalPleadingEntity } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/legal-pleading.entity';
import { LegalPleadingId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/value-object/legal-pleading-id/legal-pleading-id.value-object';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/enum/analysis-status.enum';
import { UpdateLegalPleadingStatusToCompleteResponseDto } from '@module/customer/analysis-tool/dto/response/update-legal-pleading-to-complete-status.response.dto';
import { LegalPleadingNotFoundError } from '@module/customer/analysis-tool/error/legal-pleading-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { UpdateLegalPleadingStatusToCompleteUseCase } from '@module/customer/analysis-tool/use-case/update-legal-pleading-status-to-complete.use-case';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { GetOrganizationMemberWithCustomerRelationQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-customer-relation.query.result';
import type { GetOrganizationMemberQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member.query.result';
import type { GetLegalPleadingWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/legal-pleading/query/result/get-legal-pleading-with-relations.query.result';
import type { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';

describe(UpdateLegalPleadingStatusToCompleteUseCase.name, () => {
  let useCase: UpdateLegalPleadingStatusToCompleteUseCase;

  const organizationMemberQueryRepositoryGateway: jest.Mocked<OrganizationMemberQueryRepositoryGateway> =
    {
      findOneByCustomerIdAndAuthIdentityId: jest.fn(),
      findOneByOrganizationMemberId: jest.fn(),
      findOneByCustomerIdAndOrganizationId: jest.fn(),
      findOneByCustomerIdAndOrganizationIdWithRelations: jest.fn(),
    } as unknown as jest.Mocked<OrganizationMemberQueryRepositoryGateway>;

  const legalPleadingQueryRepositoryGateway: jest.Mocked<LegalPleadingQueryRepositoryGateway> =
    {
      findOneByLegalPleadingIdAndOrganizationIdAndAuthIdentityIdOrFail:
        jest.fn(),
      findByAnalysisToolClientAndOrganizationId: jest.fn(),
      countByOrganizationId: jest.fn(),
      listByOrganizationId: jest.fn(),
      countByLegalPleadingIdAndOrganizationId: jest.fn(),
    } as unknown as jest.Mocked<LegalPleadingQueryRepositoryGateway>;

  const legalPleadingCommandRepositoryGateway: jest.Mocked<LegalPleadingCommandRepositoryGateway> =
    {
      updateLegalPleading: jest.fn(),
      createLegalPleading: jest.fn(),
      deleteLegalPleading: jest.fn(),
    } as unknown as jest.Mocked<LegalPleadingCommandRepositoryGateway>;

  const baseTransactionRepositoryGateway: jest.Mocked<BaseTransactionRepositoryGateway> =
    {
      execute: jest.fn(),
    } as unknown as jest.Mocked<BaseTransactionRepositoryGateway>;

  const buildSessionData = (): SessionDataModel =>
    SessionDataModel.build({
      authIdentityId: new AuthIdentityId(),
      sessionId: new Guid(),
      userLevel: UserLevelEnum.CUSTOMER,
    });

  const buildOrganizationSessionData = (): OrganizationSessionDataModel =>
    OrganizationSessionDataModel.build({
      organizationId: new OrganizationId(),
    });

  const buildOrganizationMember = (): GetOrganizationMemberQueryResult =>
    ({
      id: new OrganizationMemberId(),
    }) as unknown as GetOrganizationMemberQueryResult;

  const buildLegalPleadingQueryResult = (
    id: LegalPleadingId,
    currentStatus: AnalysisStatusEnum,
  ): GetLegalPleadingWithRelationsQueryResult =>
    ({
      id: id,
      status: currentStatus,
      analysisToolClient: {
        createdBy: new OrganizationMemberId(),
        updatedBy: new OrganizationMemberId(),
      } as AnalysisToolClientEntity,
      createdBy: {
        id: new Guid(),
      } as GetOrganizationMemberWithCustomerRelationQueryResult,
      updatedBy: {
        id: new Guid(),
      } as GetOrganizationMemberWithCustomerRelationQueryResult,
      legalPleadingAddress: null,
      legalPleadingResult: null,
    }) as unknown as GetLegalPleadingWithRelationsQueryResult;

  const buildTransaction = (): jest.Mocked<TransactionOutputModel> =>
    new TransactionOutputModel(
      jest.fn().mockResolvedValue(undefined),
      jest.fn().mockResolvedValue(undefined),
    ) as jest.Mocked<TransactionOutputModel>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UpdateLegalPleadingStatusToCompleteUseCase,
        {
          provide: OrganizationMemberQueryRepositoryGateway,
          useValue: organizationMemberQueryRepositoryGateway,
        },
        {
          provide: LegalPleadingQueryRepositoryGateway,
          useValue: legalPleadingQueryRepositoryGateway,
        },
        {
          provide: BaseTransactionRepositoryGateway,
          useValue: baseTransactionRepositoryGateway,
        },
        {
          provide: LegalPleadingCommandRepositoryGateway,
          useValue: legalPleadingCommandRepositoryGateway,
        },
      ],
    }).compile();

    useCase = module.get(UpdateLegalPleadingStatusToCompleteUseCase);
    jest.clearAllMocks();
  });

  it('should update legal pleading status to COMPLETED and commit transaction', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const legalPleadingId = new LegalPleadingId();
    const organizationMember = buildOrganizationMember();
    const legalPleadingResult = buildLegalPleadingQueryResult(
      legalPleadingId,
      AnalysisStatusEnum.IN_PROGRESS,
    );
    const transaction = buildTransaction();

    organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId.mockResolvedValueOnce(
      organizationMember,
    );
    legalPleadingQueryRepositoryGateway.findOneByLegalPleadingIdAndOrganizationIdAndAuthIdentityIdOrFail.mockResolvedValueOnce(
      legalPleadingResult,
    );
    legalPleadingCommandRepositoryGateway.updateLegalPleading.mockReturnValue(
      {} as TransactionType,
    );
    baseTransactionRepositoryGateway.execute.mockResolvedValueOnce(transaction);

    const result = await useCase.execute(
      sessionData,
      orgSessionData,
      legalPleadingId,
    );

    expect(result).toBeInstanceOf(
      UpdateLegalPleadingStatusToCompleteResponseDto,
    );
    expect(result.legalPleadingId).toEqual(legalPleadingId);

    expect(
      legalPleadingCommandRepositoryGateway.updateLegalPleading,
    ).toHaveBeenCalledTimes(1);

    const updateCall =
      legalPleadingCommandRepositoryGateway.updateLegalPleading.mock.calls[0];

    expect(updateCall).toBeDefined();

    const [capturedId, capturedEntity] = updateCall as [
      LegalPleadingId,
      LegalPleadingEntity,
    ];

    expect(capturedId).toBe(legalPleadingId);

    expect(capturedEntity).toBeInstanceOf(LegalPleadingEntity);
    expect(capturedEntity.status).toBe(AnalysisStatusEnum.COMPLETED);
    expect(capturedEntity.updatedBy).toBe(organizationMember.id);

    expect(baseTransactionRepositoryGateway.execute).toHaveBeenCalledTimes(1);
    expect(transaction.commit).toHaveBeenCalledTimes(1);
  });

  it('should throw OrganizationMemberNotFoundError when member is not found', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const legalPleadingId = new LegalPleadingId();

    organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId.mockResolvedValueOnce(
      null,
    );

    await expect(
      useCase.execute(sessionData, orgSessionData, legalPleadingId),
    ).rejects.toBeInstanceOf(OrganizationMemberNotFoundError);
  });

  it('should throw LegalPleadingNotFoundError when pleading is not found by query', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const legalPleadingId = new LegalPleadingId();
    const organizationMember = buildOrganizationMember();

    organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId.mockResolvedValueOnce(
      organizationMember,
    );
    legalPleadingQueryRepositoryGateway.findOneByLegalPleadingIdAndOrganizationIdAndAuthIdentityIdOrFail.mockRejectedValueOnce(
      new LegalPleadingNotFoundError(),
    );

    await expect(
      useCase.execute(sessionData, orgSessionData, legalPleadingId),
    ).rejects.toBeInstanceOf(LegalPleadingNotFoundError);
  });
});
