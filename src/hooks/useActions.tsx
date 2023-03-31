import { ActionCreator, ActionCreatorsMapObject, bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { DependencyList, useMemo } from 'react';

function useActions<A extends ActionCreator<any>>(actions: A[]): A[];
function useActions<A extends ActionCreatorsMapObject>(actions: A): A;

function useActions(actions: any, deps?: DependencyList): any {
  const dispatch = useDispatch();

  return useMemo(
    () => {
      if (Array.isArray(actions)) {
        return actions.map((a) => bindActionCreators(a, dispatch));
      }
      return bindActionCreators(actions, dispatch);
    },
    deps ? [dispatch, ...deps] : [dispatch],
  );
}

export default useActions;
