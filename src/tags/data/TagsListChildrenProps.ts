import type { SelectedServer } from '../../servers/data';
import type { Order } from '../../utils/helpers/ordering';
import type { SimplifiedTag } from './index';

export const TAGS_ORDERABLE_FIELDS = {
  tag: 'Tag',
  shortUrls: 'Short URLs',
  visits: 'Visits',
};

export type TagsOrderableFields = keyof typeof TAGS_ORDERABLE_FIELDS;

export type TagsOrder = Order<TagsOrderableFields>;

export interface TagsListChildrenProps {
  sortedTags: SimplifiedTag[];
  selectedServer: SelectedServer;
}
