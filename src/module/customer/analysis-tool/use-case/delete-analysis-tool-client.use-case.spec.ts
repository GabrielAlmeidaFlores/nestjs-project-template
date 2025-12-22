import { Test } from '@nestjs/testing';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionOutputModel } from '@core/domain/repository/base/transaction/model/output/transaction.output.model';
import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { GetCustomerQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer.query.result';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { GetOrganizationMemberWithCustomerRelationQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-customer-relation.query.result';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { AnalysisToolClientCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/command/analysis-tool-client.command.repository.gateway';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { GetAnalysisToolClientWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/result/get-analysis-tool-client-with-relations.query.result';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { LegalPleadingQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading/query/legal-pleading.query.repository.gateway';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { AnalysisToolRecordId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-id/analysis-tool-record-id.value-objects';
import { LegalPleadingId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/value-object/legal-pleading-id/legal-pleading-id.value-object';
import { DeleteAnalysisToolClientResponseDto } from '@module/customer/analysis-tool/dto/response/delete-analysis-tool-client.response';
import { AnalysisToolClientNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-client-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { DeleteAnalysisToolClientUseCase } from '@module/customer/analysis-tool/use-case/delete-analysis-tool-client.use-case';
import { DeleteAnalysisToolRecordUseCase } from '@module/customer/analysis-tool/use-case/delete-analysis-tool-record.use-case';
import { DeleteLegalPleadingUseCase } from '@module/customer/analysis-tool/use-case/delete-legal-pleading.use-case';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { GetOrganizationMemberQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member.query.result';
import type { GetAnalysisToolRecordWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/result/get-analysis-tool-record-with-relations.query.result';
import type { GetLegalPleadingWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/legal-pleading/query/result/get-legal-pleading-with-relations.query.result';

const mockDeleteAnalysisToolRecordUseCase = {
  execute: jest.fn(),
};
const mockDeleteLegalPleadingUseCase = {
  execute: jest.fn(),
};

describe(DeleteAnalysisToolClientUseCase.name, () => {
  let useCase: DeleteAnalysisToolClientUseCase;

  const organizationMemberQueryRepositoryGateway: jest.Mocked<OrganizationMemberQueryRepositoryGateway> =
    {
      findOneByCustomerIdAndAuthIdentityId: jest.fn(),
      findOneByOrganizationMemberId: jest.fn(),
      findOneByCustomerIdAndOrganizationId: jest.fn(),
      findOneByCustomerIdAndOrganizationIdWithRelations: jest.fn(),
    };

  const analysisToolClientQueryRepositoryGateway: jest.Mocked<AnalysisToolClientQueryRepositoryGateway> =
    {
      findOneByAnalysisToolClientIdAndOrganizationIdOrFail: jest.fn(),
      findOneByEmailAndOrganizationId: jest.fn(),
      findOneByFederalDocumentAndOrganizationId: jest.fn(),
      listByOrganizationId: jest.fn(),
    };

  const analysisToolClientCommandRepositoryGateway: jest.Mocked<AnalysisToolClientCommandRepositoryGateway> =
    {
      deleteAnalysisToolClient: jest.fn(),
      createAnalysisToolClient: jest.fn(),
      updateAnalysisToolClient: jest.fn(),
    };

  const analysisToolRecordQueryRepositoryGateway: jest.Mocked<AnalysisToolRecordQueryRepositoryGateway> =
    {
      findWithRelationsByClientIdAndOrganizationIdAndAuthIdentityId: jest.fn(),
      findOneByAnalysisToolRecordIdAndAuthIdentityIdAndOrganizationIdWithRelationsOrFail:
        jest.fn(),
      countByOrganizationIdAndAuthIdentityId: jest.fn(),
      listByOrganizationIdAndAuthIdentityId: jest.fn(),
      countByOrganizationIdAndAnalysisToolClientIdAndAuthIdentityId: jest.fn(),
    };

  const legalPleadingQueryRepositoryGateway: jest.Mocked<LegalPleadingQueryRepositoryGateway> =
    {
      findByAnalysisToolClientIdAndOrganizationIdAndAuthIdentityId: jest.fn(),
      findOneByLegalPleadingIdAndOrganizationIdAndAuthIdentityIdOrFail:
        jest.fn(),
      countByOrganizationIdAndAuthIdentityId: jest.fn(),
      listByOrganizationIdAndAuthIdentityId: jest.fn(),
      countByLegalPleadingIdAndOrganizationIdAndAuthIdentityId: jest.fn(),
    };

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
      owner: true,
      organizationId: new OrganizationId(),
    });

  const buildOrganizationMember = (): GetOrganizationMemberQueryResult =>
    ({
      id: new OrganizationMemberId(),
    }) as GetOrganizationMemberQueryResult;

  const buildAnalysisToolClientQueryResult =
    (): GetAnalysisToolClientWithRelationsQueryResult => {
      const responsible =
        GetOrganizationMemberWithCustomerRelationQueryResult.build({
          id: new OrganizationMemberId(),
          owner: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
          customer: GetCustomerQueryResult.build({
            id: new CustomerId(),
            name: 'Test Customer',
            profilePicture: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
          }),
        });

      return GetAnalysisToolClientWithRelationsQueryResult.build({
        id: new AnalysisToolClientId(),
        name: 'Client to Delete',
        createdBy: responsible,
        updatedBy: responsible,
        federalDocument: null,
        email: null,
        inssPassword: null,
        phoneNumber: null,
        birthDate: null,
        gender: null,
        clientType: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        analysisToolClientInssBenefit: [],
        analysisToolClientLegalProceeding: [],
      });
    };

  const buildTransaction = (): jest.Mocked<TransactionOutputModel> =>
    new TransactionOutputModel(
      jest.fn().mockResolvedValue(undefined),
      jest.fn().mockResolvedValue(undefined),
    ) as jest.Mocked<TransactionOutputModel>;

  const analysisToolRecords = [
    { id: new AnalysisToolRecordId() },
  ] as GetAnalysisToolRecordWithRelationsQueryResult[];
  const legalPleadings = [
    { id: new LegalPleadingId() },
    { id: new LegalPleadingId() },
  ] as GetLegalPleadingWithRelationsQueryResult[];

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        DeleteAnalysisToolClientUseCase,
        {
          provide: DeleteAnalysisToolRecordUseCase,
          useValue: mockDeleteAnalysisToolRecordUseCase,
        },
        {
          provide: DeleteLegalPleadingUseCase,
          useValue: mockDeleteLegalPleadingUseCase,
        },
        {
          provide: OrganizationMemberQueryRepositoryGateway,
          useValue: organizationMemberQueryRepositoryGateway,
        },
        {
          provide: AnalysisToolClientQueryRepositoryGateway,
          useValue: analysisToolClientQueryRepositoryGateway,
        },
        {
          provide: AnalysisToolClientCommandRepositoryGateway,
          useValue: analysisToolClientCommandRepositoryGateway,
        },
        {
          provide: AnalysisToolRecordQueryRepositoryGateway,
          useValue: analysisToolRecordQueryRepositoryGateway,
        },
        {
          provide: LegalPleadingQueryRepositoryGateway,
          useValue: legalPleadingQueryRepositoryGateway,
        },
        {
          provide: BaseTransactionRepositoryGateway,
          useValue: baseTransactionRepositoryGateway,
        },
      ],
    }).compile();

    useCase = module.get(DeleteAnalysisToolClientUseCase);
    jest.clearAllMocks();
  });

  it('should delete client and its associated analyses and pleadings', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const analysisToolClientId = new AnalysisToolClientId();
    const organizationMember = buildOrganizationMember();
    const clientQueryResult = buildAnalysisToolClientQueryResult();
    const transaction = buildTransaction();

    organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId.mockResolvedValueOnce(
      organizationMember,
    );
    analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientIdAndOrganizationIdOrFail.mockResolvedValueOnce(
      clientQueryResult,
    );
    analysisToolRecordQueryRepositoryGateway.findWithRelationsByClientIdAndOrganizationIdAndAuthIdentityId.mockResolvedValueOnce(
      analysisToolRecords,
    );
    legalPleadingQueryRepositoryGateway.findByAnalysisToolClientIdAndOrganizationIdAndAuthIdentityId.mockResolvedValueOnce(
      legalPleadings,
    );
    mockDeleteAnalysisToolRecordUseCase.execute.mockResolvedValue(undefined);
    mockDeleteLegalPleadingUseCase.execute.mockResolvedValue(undefined);
    analysisToolClientCommandRepositoryGateway.deleteAnalysisToolClient.mockReturnValue(
      {} as TransactionType,
    );
    baseTransactionRepositoryGateway.execute.mockResolvedValueOnce(transaction);

    const result = await useCase.execute(
      sessionData,
      orgSessionData,
      analysisToolClientId,
    );

    expect(result).toBeInstanceOf(DeleteAnalysisToolClientResponseDto);
    expect(result.analysisToolClientId).toBe(clientQueryResult.id);

    expect(
      analysisToolRecordQueryRepositoryGateway.findWithRelationsByClientIdAndOrganizationIdAndAuthIdentityId,
    ).toHaveBeenCalledWith(
      clientQueryResult.id,
      orgSessionData.organizationId,
      sessionData.authIdentityId,
    );

    expect(
      legalPleadingQueryRepositoryGateway.findByAnalysisToolClientIdAndOrganizationIdAndAuthIdentityId,
    ).toHaveBeenCalledWith(
      clientQueryResult.id,
      orgSessionData.organizationId,
      sessionData.authIdentityId,
    );
    expect(mockDeleteAnalysisToolRecordUseCase.execute).toHaveBeenCalledTimes(
      analysisToolRecords.length,
    );
    expect(mockDeleteLegalPleadingUseCase.execute).toHaveBeenCalledTimes(
      legalPleadings.length,
    );

    expect(
      analysisToolClientCommandRepositoryGateway.deleteAnalysisToolClient,
    ).toHaveBeenCalledWith(clientQueryResult.id, organizationMember.id);
    expect(transaction.commit).toHaveBeenCalledTimes(1);
  });

  it('should delete client without associated records or pleadings', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const analysisToolClientId = new AnalysisToolClientId();
    const organizationMember = buildOrganizationMember();
    const clientQueryResult = buildAnalysisToolClientQueryResult();
    const transaction = buildTransaction();

    organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId.mockResolvedValueOnce(
      organizationMember,
    );
    analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientIdAndOrganizationIdOrFail.mockResolvedValueOnce(
      clientQueryResult,
    );
    analysisToolRecordQueryRepositoryGateway.findWithRelationsByClientIdAndOrganizationIdAndAuthIdentityId.mockResolvedValueOnce(
      [],
    );
    legalPleadingQueryRepositoryGateway.findByAnalysisToolClientIdAndOrganizationIdAndAuthIdentityId.mockResolvedValueOnce(
      [],
    );
    analysisToolClientCommandRepositoryGateway.deleteAnalysisToolClient.mockReturnValue(
      {} as TransactionType,
    );
    baseTransactionRepositoryGateway.execute.mockResolvedValueOnce(transaction);

    await useCase.execute(sessionData, orgSessionData, analysisToolClientId);

    expect(mockDeleteAnalysisToolRecordUseCase.execute).not.toHaveBeenCalled();
    expect(mockDeleteLegalPleadingUseCase.execute).not.toHaveBeenCalled();
    expect(
      analysisToolClientCommandRepositoryGateway.deleteAnalysisToolClient,
    ).toHaveBeenCalledTimes(1);
    expect(transaction.commit).toHaveBeenCalledTimes(1);
  });

  it('should throw OrganizationMemberNotFoundError when member is not found', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const analysisToolClientId = new AnalysisToolClientId();

    organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId.mockResolvedValueOnce(
      null,
    );

    await expect(
      useCase.execute(sessionData, orgSessionData, analysisToolClientId),
    ).rejects.toBeInstanceOf(OrganizationMemberNotFoundError);
  });

  it('should throw AnalysisToolClientNotFoundError when client to be deleted is not found', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const analysisToolClientId = new AnalysisToolClientId();
    const organizationMember = buildOrganizationMember();

    organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId.mockResolvedValueOnce(
      organizationMember,
    );
    analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientIdAndOrganizationIdOrFail.mockRejectedValueOnce(
      new AnalysisToolClientNotFoundError(),
    );

    await expect(
      useCase.execute(sessionData, orgSessionData, analysisToolClientId),
    ).rejects.toBeInstanceOf(AnalysisToolClientNotFoundError);
  });
});
