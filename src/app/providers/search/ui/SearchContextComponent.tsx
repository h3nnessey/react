import { Component, type ContextType } from 'react';
import { SearchContext } from './SearchProvider';

export class SearchContextComponent<
  Props = unknown,
  State = unknown,
> extends Component<Props, State> {
  declare context: ContextType<typeof SearchContext>;
  static contextType = SearchContext;
}
