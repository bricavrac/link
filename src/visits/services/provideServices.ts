import type Bottle from 'bottlejs';
import { prop } from 'ramda';
import type { ConnectDecorator } from '../../container/types';
import { DomainVisits } from '../DomainVisits';
import { MapModal } from '../helpers/MapModal';
import { NonOrphanVisits } from '../NonOrphanVisits';
import { OrphanVisits } from '../OrphanVisits';
import { domainVisitsReducerCreator, getDomainVisits } from '../reducers/domainVisits';
import { getNonOrphanVisits, nonOrphanVisitsReducerCreator } from '../reducers/nonOrphanVisits';
import { getOrphanVisits, orphanVisitsReducerCreator } from '../reducers/orphanVisits';
import { getShortUrlVisits, shortUrlVisitsReducerCreator } from '../reducers/shortUrlVisits';
import { getTagVisits, tagVisitsReducerCreator } from '../reducers/tagVisits';
import { createNewVisits } from '../reducers/visitCreation';
import { loadVisitsOverview, visitsOverviewReducerCreator } from '../reducers/visitsOverview';
import { ShortUrlVisits } from '../ShortUrlVisits';
import { TagVisits } from '../TagVisits';
import * as visitsParser from './VisitsParser';

export const provideServices = (bottle: Bottle, connect: ConnectDecorator) => {
  // Components
  bottle.serviceFactory('MapModal', () => MapModal);

  bottle.serviceFactory('ShortUrlVisits', ShortUrlVisits, 'ReportExporter');
  bottle.decorator('ShortUrlVisits', connect(
    ['shortUrlVisits', 'shortUrlDetail', 'mercureInfo', 'settings'],
    ['getShortUrlVisits', 'getShortUrlDetail', 'cancelGetShortUrlVisits', 'createNewVisits', 'loadMercureInfo'],
  ));

  bottle.serviceFactory('TagVisits', TagVisits, 'ColorGenerator', 'ReportExporter');
  bottle.decorator('TagVisits', connect(
    ['tagVisits', 'mercureInfo', 'settings'],
    ['getTagVisits', 'cancelGetTagVisits', 'createNewVisits', 'loadMercureInfo'],
  ));

  bottle.serviceFactory('DomainVisits', DomainVisits, 'ReportExporter');
  bottle.decorator('DomainVisits', connect(
    ['domainVisits', 'mercureInfo', 'settings'],
    ['getDomainVisits', 'cancelGetDomainVisits', 'createNewVisits', 'loadMercureInfo'],
  ));

  bottle.serviceFactory('OrphanVisits', OrphanVisits, 'ReportExporter');
  bottle.decorator('OrphanVisits', connect(
    ['orphanVisits', 'mercureInfo', 'settings'],
    ['getOrphanVisits', 'cancelGetOrphanVisits', 'createNewVisits', 'loadMercureInfo'],
  ));

  bottle.serviceFactory('NonOrphanVisits', NonOrphanVisits, 'ReportExporter');
  bottle.decorator('NonOrphanVisits', connect(
    ['nonOrphanVisits', 'mercureInfo', 'settings'],
    ['getNonOrphanVisits', 'cancelGetNonOrphanVisits', 'createNewVisits', 'loadMercureInfo'],
  ));

  // Services
  bottle.serviceFactory('VisitsParser', () => visitsParser);

  // Actions
  bottle.serviceFactory('getShortUrlVisits', getShortUrlVisits, 'buildShlinkApiClient');
  bottle.serviceFactory('cancelGetShortUrlVisits', prop('cancelGetVisits'), 'shortUrlVisitsReducerCreator');

  bottle.serviceFactory('getTagVisits', getTagVisits, 'buildShlinkApiClient');
  bottle.serviceFactory('cancelGetTagVisits', prop('cancelGetVisits'), 'tagVisitsReducerCreator');

  bottle.serviceFactory('getDomainVisits', getDomainVisits, 'buildShlinkApiClient');
  bottle.serviceFactory('cancelGetDomainVisits', prop('cancelGetVisits'), 'domainVisitsReducerCreator');

  bottle.serviceFactory('getOrphanVisits', getOrphanVisits, 'buildShlinkApiClient');
  bottle.serviceFactory('cancelGetOrphanVisits', prop('cancelGetVisits'), 'orphanVisitsReducerCreator');

  bottle.serviceFactory('getNonOrphanVisits', getNonOrphanVisits, 'buildShlinkApiClient');
  bottle.serviceFactory('cancelGetNonOrphanVisits', prop('cancelGetVisits'), 'nonOrphanVisitsReducerCreator');

  bottle.serviceFactory('createNewVisits', () => createNewVisits);
  bottle.serviceFactory('loadVisitsOverview', loadVisitsOverview, 'buildShlinkApiClient');

  // Reducers
  bottle.serviceFactory('visitsOverviewReducerCreator', visitsOverviewReducerCreator, 'loadVisitsOverview');
  bottle.serviceFactory('visitsOverviewReducer', prop('reducer'), 'visitsOverviewReducerCreator');

  bottle.serviceFactory('domainVisitsReducerCreator', domainVisitsReducerCreator, 'getDomainVisits');
  bottle.serviceFactory('domainVisitsReducer', prop('reducer'), 'domainVisitsReducerCreator');

  bottle.serviceFactory('nonOrphanVisitsReducerCreator', nonOrphanVisitsReducerCreator, 'getNonOrphanVisits');
  bottle.serviceFactory('nonOrphanVisitsReducer', prop('reducer'), 'nonOrphanVisitsReducerCreator');

  bottle.serviceFactory('orphanVisitsReducerCreator', orphanVisitsReducerCreator, 'getOrphanVisits');
  bottle.serviceFactory('orphanVisitsReducer', prop('reducer'), 'orphanVisitsReducerCreator');

  bottle.serviceFactory('shortUrlVisitsReducerCreator', shortUrlVisitsReducerCreator, 'getShortUrlVisits');
  bottle.serviceFactory('shortUrlVisitsReducer', prop('reducer'), 'shortUrlVisitsReducerCreator');

  bottle.serviceFactory('tagVisitsReducerCreator', tagVisitsReducerCreator, 'getTagVisits');
  bottle.serviceFactory('tagVisitsReducer', prop('reducer'), 'tagVisitsReducerCreator');
};
