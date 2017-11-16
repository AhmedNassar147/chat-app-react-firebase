/**
 *
 * Asynchronously loads the component for RightSide
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
