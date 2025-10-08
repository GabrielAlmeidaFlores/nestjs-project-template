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
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { DeleteAnalysisToolClientResponseDto } from '@module/customer/analysis-tool/dto/response/delete-analysis-tool-client.response';
import { AnalysisToolClientNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-client-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { DeleteAnalysisToolClientUseCase } from '@module/customer/analysis-tool/use-case/delete-analysis-tool-client.use-case';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { GetOrganizationMemberQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member.query.result';

describe(DeleteAnalysisToolClientUseCase.name, () => {
  let useCase: DeleteAnalysisToolClientUseCase;

  const organizationMemberQueryRepositoryGateway: jest.Mocked<OrganizationMemberQueryRepositoryGateway> =
    {
      findOneByCustomerAndAuthIdentityId: jest.fn(),
    } as unknown as jest.Mocked<OrganizationMemberQueryRepositoryGateway>;

  const analysisToolClientQueryRepositoryGateway: jest.Mocked<AnalysisToolClientQueryRepositoryGateway> =
    {
      findOneByAnalysisToolClientAndOrganizationIdOrFail: jest.fn(),
    } as unknown as jest.Mocked<AnalysisToolClientQueryRepositoryGateway>;

  const analysisToolClientCommandRepositoryGateway: jest.Mocked<AnalysisToolClientCommandRepositoryGateway> =
    {
      updateAnalysisToolClient: jest.fn(),
      deleteAnalysisToolClient: jest.fn(),
    } as unknown as jest.Mocked<AnalysisToolClientCommandRepositoryGateway>;

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
    }) as GetOrganizationMemberQueryResult;

  const buildAnalysisToolClientQueryResult =
    (): GetAnalysisToolClientWithRelationsQueryResult => {
      const responsible =
        GetOrganizationMemberWithCustomerRelationQueryResult.build({
          id: new OrganizationMemberId(),
          customer: GetCustomerQueryResult.build({
            id: new CustomerId(),
            name: 'Creator User',
            profilePicture: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
          }),
          owner: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        });

      return GetAnalysisToolClientWithRelationsQueryResult.build({
        id: new AnalysisToolClientId(),
        name: 'Client to Delete',
        createdBy: responsible,
        updatedBy: responsible,
        federalDocument: null,
        email: null,
        phoneNumber: null,
        birthDate: null,
        gender: null,
        clientType: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      });
    };

  const buildTransaction = (): jest.Mocked<TransactionOutputModel> =>
    new TransactionOutputModel(
      jest.fn().mockResolvedValue(undefined),
      jest.fn().mockResolvedValue(undefined),
    ) as jest.Mocked<TransactionOutputModel>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        DeleteAnalysisToolClientUseCase,
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
          provide: BaseTransactionRepositoryGateway,
          useValue: baseTransactionRepositoryGateway,
        },
      ],
    }).compile();

    useCase = module.get(DeleteAnalysisToolClientUseCase);
    jest.clearAllMocks();
  });

  it('should successfully delete an analysis tool client', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const analysisToolClientId = new AnalysisToolClientId();
    const organizationMember = buildOrganizationMember();
    const clientQueryResult = buildAnalysisToolClientQueryResult();
    const transaction = buildTransaction();

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      organizationMember,
    );
    analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientAndOrganizationIdOrFail.mockResolvedValueOnce(
      clientQueryResult,
    );
    analysisToolClientCommandRepositoryGateway.updateAnalysisToolClient.mockReturnValue(
      {} as TransactionType,
    );
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
      analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientAndOrganizationIdOrFail,
    ).toHaveBeenCalledWith(
      analysisToolClientId,
      orgSessionData.organizationId,
      AnalysisToolClientNotFoundError,
    );

    expect(
      analysisToolClientCommandRepositoryGateway.updateAnalysisToolClient,
    ).toHaveBeenCalledTimes(1);
    const [[, capturedClient]] = analysisToolClientCommandRepositoryGateway
      .updateAnalysisToolClient.mock.calls as [
      [AnalysisToolClientId, AnalysisToolClientEntity],
    ];
    expect(capturedClient).toBeInstanceOf(AnalysisToolClientEntity);
    expect(capturedClient.updatedBy).toEqual(organizationMember.id);

    expect(
      analysisToolClientCommandRepositoryGateway.deleteAnalysisToolClient,
    ).toHaveBeenCalledTimes(1);
    expect(
      analysisToolClientCommandRepositoryGateway.deleteAnalysisToolClient,
    ).toHaveBeenCalledWith(clientQueryResult.id);

    expect(baseTransactionRepositoryGateway.execute).toHaveBeenCalledTimes(1);
    const [[transactions]] = baseTransactionRepositoryGateway.execute.mock
      .calls as [[TransactionType[]]];
    expect(transactions).toHaveLength(2);

    expect(transaction.commit).toHaveBeenCalledTimes(1);
  });

  it('throws OrganizationMemberNotFoundError when organization member is not found', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const analysisToolClientId = new AnalysisToolClientId();

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      null,
    );

    await expect(
      useCase.execute(sessionData, orgSessionData, analysisToolClientId),
    ).rejects.toBeInstanceOf(OrganizationMemberNotFoundError);

    expect(
      analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientAndOrganizationIdOrFail,
    ).not.toHaveBeenCalled();
    expect(baseTransactionRepositoryGateway.execute).not.toHaveBeenCalled();
  });

  it('throws AnalysisToolClientNotFoundError when client to delete is not found', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const analysisToolClientId = new AnalysisToolClientId();
    const organizationMember = buildOrganizationMember();

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      organizationMember,
    );
    analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientAndOrganizationIdOrFail.mockRejectedValueOnce(
      new AnalysisToolClientNotFoundError(),
    );

    await expect(
      useCase.execute(sessionData, orgSessionData, analysisToolClientId),
    ).rejects.toBeInstanceOf(AnalysisToolClientNotFoundError);

    expect(
      analysisToolClientCommandRepositoryGateway.deleteAnalysisToolClient,
    ).not.toHaveBeenCalled();
    expect(baseTransactionRepositoryGateway.execute).not.toHaveBeenCalled();
  });
});
