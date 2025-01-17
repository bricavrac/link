import { Mock } from 'ts-mockery';
import type { ShlinkApiClient } from '../../../src/api/services/ShlinkApiClient';
import type { ShlinkDomainRedirects } from '../../../src/api/types';
import type { EditDomainRedirects } from '../../../src/domains/reducers/domainRedirects';
import { editDomainRedirects } from '../../../src/domains/reducers/domainRedirects';

describe('domainRedirectsReducer', () => {
  beforeEach(jest.clearAllMocks);

  describe('editDomainRedirects', () => {
    const domain = 'example.com';
    const redirects = Mock.all<ShlinkDomainRedirects>();
    const dispatch = jest.fn();
    const getState = jest.fn();
    const editDomainRedirectsCall = jest.fn();
    const buildShlinkApiClient = () => Mock.of<ShlinkApiClient>({ editDomainRedirects: editDomainRedirectsCall });
    const editDomainRedirectsAction = editDomainRedirects(buildShlinkApiClient);

    it('dispatches domain and redirects once loaded', async () => {
      editDomainRedirectsCall.mockResolvedValue(redirects);

      await editDomainRedirectsAction(Mock.of<EditDomainRedirects>({ domain }))(dispatch, getState, {});

      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenLastCalledWith(expect.objectContaining({
        payload: { domain, redirects },
      }));
      expect(editDomainRedirectsCall).toHaveBeenCalledTimes(1);
    });
  });
});
