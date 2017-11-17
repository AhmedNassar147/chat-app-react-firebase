/**
 *
 * Asynchronously loads the component for RecentUsers
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
