import { Action } from 'redux';

import { RootState } from '@/types/redux';

declare function useDispatch(): <T>(action: Action<T>) => void;

declare function useSelector<Result>(
  selector: (state: RootState) => Result,
): Result;

declare function useSelector<Result, Arg1>(
  selector: (state: RootState, arg: Arg1) => Result,
  deps: [Arg1],
): Result;

declare function useSelector<Result, Arg1, Arg2>(
  selector: (state: RootState, arg: Arg1, arg2: Arg2) => Result,
  deps: [Arg1, Arg2],
): Result;
