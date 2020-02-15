import { ItemId } from '@/types/jsonApi';

export type JsonApiData = Array<{}> | {} | null | undefined;

export type IdPropOptions = {
  idProp: (item: any) => ItemId;
};
