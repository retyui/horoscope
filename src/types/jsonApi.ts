export type ItemId = string;

export type JsonApiLink<Id, Type> = {
  id: Id;
  type: Type;
};

export type JsonApiRelationship<
  Key extends string,
  Id extends string,
  Type extends string
> = Record<Key, { data: Array<JsonApiLink<Id, Type>> }>;

export type JsonApiRequest<Data> = Readonly<{
  data: Data;
}>;

export type JsonApiResponse<Data, Include = void> = Readonly<{
  data: Data;
  include: Include;
}>;

export type JsonApiDocument<
  Type extends string,
  Attributes extends {},
  Relationships = void
> = Readonly<{
  id: ItemId;
  type: Type;
  attributes: Attributes;
  relationships: Relationships;
}>;
export type JsonApiFailedResponse = {
  errors: Array<JsonApiError>;
};

export type JsonApiError = {
  code?: string;
  title: string;
  detail: string;
  source?: {
    pointer: string;
  };
};
