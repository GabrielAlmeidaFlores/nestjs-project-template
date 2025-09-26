import { Test } from '@nestjs/testing';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { PostalCode } from '@core/domain/schema/value-object/postal-code/postal-code.value-object';
import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { GetCustomerWithCustomerAddressRelationQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer-with-customer-address-relation.query.result';
import { GetCustomerAddressQueryResult } from '@module/customer/account/domain/repository/customer-address/query/result/get-customer-address.query.result';
import { OrganizationQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization/query/organization.query.repository.gateway';
import { GetOrganizationQueryResult } from '@module/customer/account/domain/repository/organization/query/result/get-organization.query.result';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { StateCodeEnum } from '@module/customer/account/domain/schema/entity/customer-address/enum/state-code.enum';
import { CustomerAddressId } from '@module/customer/account/domain/schema/entity/customer-address/value-object/customer-address-id/customer-address-id.value-object';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { ListCustomerOrganizationsResponseDto } from '@module/customer/account/dto/response/list-customer-organizations.response.dto';
import { CustomerNotFoundError } from '@module/customer/account/error/customer-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/account/lib/file-processor/file-processor.gateway';
import { ListCustomerOrganizationsUseCase } from '@module/customer/account/use-case/list-customer-organizations.use-case';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

const makeCustomerAddressQuery = (): GetCustomerAddressQueryResult =>
  GetCustomerAddressQueryResult.build({
    id: new CustomerAddressId(),
    postalCode: new PostalCode('01001000'),
    stateCode: StateCodeEnum.SP,
    city: 'São Paulo',
    neighborhood: 'Centro',
    addressNumber: 123,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  });

const makeCustomerQuery = (): GetCustomerWithCustomerAddressRelationQueryResult =>
  GetCustomerWithCustomerAddressRelationQueryResult.build({
    id: new CustomerId(),
    name: 'Maria Silva',
    phoneNumber: new PhoneNumber('5511999999999'),
    profilePicture: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    customerAddress: makeCustomerAddressQuery(),
  });

const makeOrgRow = (
  id: OrganizationId,
  name: string,
  logo: string | null,
): GetOrganizationQueryResult =>
  GetOrganizationQueryResult.build({
    id,
    name,
    organizationLogo: logo,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  });

describe(ListCustomerOrganizationsUseCase.name, () => {
  let useCase: ListCustomerOrganizationsUseCase;

  const customerQueryRepo: jest.Mocked<CustomerQueryRepositoryGateway> = {
    findOneByAuthIdentityIdOrFail: jest.fn(),
  } as unknown as jest.Mocked<CustomerQueryRepositoryGateway>;

  const organizationQueryRepo: jest.Mocked<OrganizationQueryRepositoryGateway> =
    {
      listOrganizationsByCustomerId: jest.fn(),
    } as unknown as jest.Mocked<OrganizationQueryRepositoryGateway>;

  const fileProcessor: jest.Mocked<FileProcessorGateway> = {
    getOrganizationLogo: jest.fn(),
  } as unknown as jest.Mocked<FileProcessorGateway>;

  const sessionData = SessionDataModel.build({
    authIdentityId: new AuthIdentityId(),
    sessionId: new Guid(),
    userLevel: UserLevelEnum.CUSTOMER,
  });

  const dto = ListDataRequestDto.build({ page: 1, limit: 25 });

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ListCustomerOrganizationsUseCase,
        {
          provide: CustomerQueryRepositoryGateway,
          useValue: customerQueryRepo,
        },
        {
          provide: OrganizationQueryRepositoryGateway,
          useValue: organizationQueryRepo,
        },
        { provide: FileProcessorGateway, useValue: fileProcessor },
      ],
    }).compile();

    useCase = module.get(ListCustomerOrganizationsUseCase);
    jest.clearAllMocks();
  });

  it('should list organizations, map logo URL, and preserve pagination fields', async () => {
    const customer = makeCustomerQuery();
    customerQueryRepo.findOneByAuthIdentityIdOrFail.mockResolvedValueOnce(
      customer,
    );

    const orgId1 = new OrganizationId();
    const orgId2 = new OrganizationId();

    const rows: GetOrganizationQueryResult[] = [
      makeOrgRow(orgId1, 'Org One', 'logo-key-1'),
      makeOrgRow(orgId2, 'Org Two', null),
    ];

    const EXPECTED_PAGE = 2;
    const EXPECTED_LIMIT = 10;
    const EXPECTED_TOTAL_ITEMS = 23;
    const EXPECTED_AMOUNT_PAGE = 2;

    const list = new ListDataOutputModel<GetOrganizationQueryResult>({
      page: EXPECTED_PAGE,
      limit: EXPECTED_LIMIT,
      totalItems: EXPECTED_TOTAL_ITEMS,
      resource: rows,
    });

    organizationQueryRepo.listOrganizationsByCustomerId.mockResolvedValueOnce(
      list,
    );

    const finalLogoUrl = new URL('https://cdn.example.com/logo-1.png');
    fileProcessor.getOrganizationLogo.mockResolvedValueOnce(finalLogoUrl);

    const result = await useCase.execute(sessionData, dto);

    expect(
      customerQueryRepo.findOneByAuthIdentityIdOrFail,
    ).toHaveBeenCalledWith(sessionData.authIdentityId, CustomerNotFoundError);

    expect(
      organizationQueryRepo.listOrganizationsByCustomerId,
    ).toHaveBeenCalledTimes(1);

    const calls =
      organizationQueryRepo.listOrganizationsByCustomerId.mock.calls;
    expect(calls.length).toBeGreaterThan(0);

    const args0 = calls[0];
    if (!args0) {
      throw new Error('Expected at least one call');
    }
    const passedListData = args0[1];
    expect(passedListData).toBeInstanceOf(ListDataInputModel);
    expect(passedListData).toEqual(new ListDataInputModel(dto));

    expect(fileProcessor.getOrganizationLogo).toHaveBeenCalledWith(
      'logo-key-1',
    );

    expect(result).toBeInstanceOf(ListCustomerOrganizationsResponseDto);
    expect(result.page).toBe(EXPECTED_PAGE);
    expect(result.limit).toBe(EXPECTED_LIMIT);
    expect(result.totalItems).toBe(EXPECTED_TOTAL_ITEMS);
    expect(result.amountItemsCurrentPage).toBe(EXPECTED_AMOUNT_PAGE);

    const first = result.resource[0];
    const second = result.resource[1];
    if (!first || !second) {
      throw new Error('Expected two items in resource');
    }

    expect(first.organizationName).toBe('Org One');
    expect(first.organizationLogo).toBe(finalLogoUrl.toString());

    expect(second.organizationName).toBe('Org Two');
    expect(second.organizationLogo).toBeUndefined();
  });

  it('should propagate CustomerNotFoundError and not query organizations', async () => {
    customerQueryRepo.findOneByAuthIdentityIdOrFail.mockRejectedValueOnce(
      new CustomerNotFoundError(),
    );

    await expect(useCase.execute(sessionData, dto)).rejects.toBeInstanceOf(
      CustomerNotFoundError,
    );

    expect(
      organizationQueryRepo.listOrganizationsByCustomerId,
    ).not.toHaveBeenCalled();
    expect(fileProcessor.getOrganizationLogo).not.toHaveBeenCalled();
  });

  it('should map multiple logos concurrently and keep order', async () => {
    const customer = makeCustomerQuery();
    customerQueryRepo.findOneByAuthIdentityIdOrFail.mockResolvedValueOnce(
      customer,
    );

    const orgA = new OrganizationId();
    const orgB = new OrganizationId();
    const orgC = new OrganizationId();

    const rows: GetOrganizationQueryResult[] = [
      makeOrgRow(orgA, 'Alpha', 'logoA'),
      makeOrgRow(orgB, 'Beta', 'logoB'),
      makeOrgRow(orgC, 'Gamma', null),
    ];

    const list = new ListDataOutputModel<GetOrganizationQueryResult>({
      page: 1,
      limit: 3,
      totalItems: 3,
      resource: rows,
    });

    organizationQueryRepo.listOrganizationsByCustomerId.mockResolvedValueOnce(
      list,
    );

    fileProcessor.getOrganizationLogo.mockImplementation((key: string) =>
      Promise.resolve(new URL(`https://cdn.example.com/${key}.png`)),
    );

    const result = await useCase.execute(sessionData, dto);

    expect(result.resource.map((r) => r.organizationName)).toEqual([
      'Alpha',
      'Beta',
      'Gamma',
    ]);

    expect(result.resource[0]?.organizationLogo).toBe(
      'https://cdn.example.com/logoA.png',
    );
    expect(result.resource[1]?.organizationLogo).toBe(
      'https://cdn.example.com/logoB.png',
    );
    expect(result.resource[2]?.organizationLogo).toBeUndefined();
  });
});
