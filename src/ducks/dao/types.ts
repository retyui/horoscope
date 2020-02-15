import { ItemId, JsonApiRelationship } from '@/types/jsonApi';

export type IdPropGetterFn = (item: any) => ItemId;

export type Options<Type, Attrs> = {
  type: Type;
  getRoot: (state: any) => Readonly<ReducerState<Attrs>>;
  idProp: IdPropGetterFn;
};

export type StoreItemDescription<Attrs> = Readonly<Attrs & { id: ItemId }>;

export type ReducerState<Attrs> = Record<ItemId, StoreItemDescription<Attrs>>;

export type GetDaoRelationships<T> = T extends JsonApiRelationship<
  infer Key,
  infer Id,
  any
>
  ? Record<Key, Array<Id>>
  : never;
