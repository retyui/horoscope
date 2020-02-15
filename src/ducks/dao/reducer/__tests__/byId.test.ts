import { indexResources } from '../../actions';
import byId from '../index';

const USERS_TYPE = 'users';
const LOCATIONS_TYPE = 'locations';

const locationItems = [{ coords: 99, id: 'C' }];
const items = [
  { name: 'User A', id: 'A' },
  { name: 'User B', id: 'B' },
  { name: 'User D', id: 'D' },
];

type UserAttr = {
  name: string;
};

const reducer = byId<typeof USERS_TYPE, UserAttr>({
  getRoot: () => ({}),
  idProp: ({ id }) => id,
  type: USERS_TYPE,
});

describe('INDEX_RESOURCES', () => {
  it("should return prev state when passed data haven't users items", () => {
    const action = indexResources({ [LOCATIONS_TYPE]: locationItems });
    const prevState = { A: { id: 'A', name: 'none' } };
    const state = reducer(prevState, action);

    expect(state).toBe(prevState);
  });

  it('should ignore items with location type', () => {
    const action = indexResources({
      [USERS_TYPE]: items,
      [LOCATIONS_TYPE]: locationItems,
    });
    const initialState = {};
    const state = reducer(initialState, action);

    expect(state.C).toBeUndefined();
    expect(state).not.toEqual(initialState);
  });

  it('should add new items', () => {
    const action = indexResources({
      [USERS_TYPE]: items,
      [LOCATIONS_TYPE]: locationItems,
    });
    const state = reducer({}, action);

    expect(state.A).toEqual(items[0]);
    expect(state.B).toEqual(items[1]);
    expect(state.D).toEqual(items[2]);
  });

  it('should replace if exists', () => {
    const action = indexResources({
      [USERS_TYPE]: items,
      [LOCATIONS_TYPE]: locationItems,
    });
    const prevState = { A: { id: 'A', name: 'none' } };
    const state = reducer(prevState, action);

    expect(state.A).toEqual(items[0]);
    expect(state.B).toEqual(items[1]);
    expect(state.D).toEqual(items[2]);
  });
});
