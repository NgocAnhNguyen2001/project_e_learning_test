import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type */
  Date: any;
  /** An arbitrary-precision Decimal type */
  Decimal: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AccessoryCatalog = {
  __typename?: 'AccessoryCatalog';
  catalogType: AccessoryCatalogType;
  createdAt: Scalars['Date'];
  eyes?: Maybe<Array<Scalars['JSON']>>;
  head?: Maybe<Array<Scalars['JSON']>>;
  id: Scalars['ID'];
  itemCatalog?: Maybe<ItemCatalog>;
  itemCatalogId?: Maybe<Scalars['String']>;
  items?: Maybe<Array<Scalars['JSON']>>;
  pet?: Maybe<Array<Scalars['JSON']>>;
  updatedAt: Scalars['Date'];
};

export type AccessoryCatalogListRelationFilter = {
  every?: InputMaybe<AccessoryCatalogWhereInput>;
  none?: InputMaybe<AccessoryCatalogWhereInput>;
  some?: InputMaybe<AccessoryCatalogWhereInput>;
};

export type AccessoryCatalogOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export enum AccessoryCatalogOrderByRelevanceFieldEnum {
  Id = 'id',
  ItemCatalogId = 'itemCatalogId'
}

export type AccessoryCatalogOrderByRelevanceInput = {
  fields: Array<AccessoryCatalogOrderByRelevanceFieldEnum>;
  search: Scalars['String'];
  sort: SortOrder;
};

export type AccessoryCatalogOrderByWithRelationAndSearchRelevanceInput = {
  _relevance?: InputMaybe<AccessoryCatalogOrderByRelevanceInput>;
  catalogType?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  eyes?: InputMaybe<SortOrder>;
  head?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  itemCatalog?: InputMaybe<ItemCatalogOrderByWithRelationAndSearchRelevanceInput>;
  itemCatalogId?: InputMaybe<SortOrder>;
  items?: InputMaybe<SortOrder>;
  pet?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum AccessoryCatalogScalarFieldEnum {
  CatalogType = 'catalogType',
  CreatedAt = 'createdAt',
  Eyes = 'eyes',
  Head = 'head',
  Id = 'id',
  ItemCatalogId = 'itemCatalogId',
  Items = 'items',
  Pet = 'pet',
  UpdatedAt = 'updatedAt'
}

export enum AccessoryCatalogType {
  Eyes = 'EYES',
  Head = 'HEAD',
  Item = 'ITEM',
  Pet = 'PET'
}

export type AccessoryCatalogWhereInput = {
  AND?: InputMaybe<Array<AccessoryCatalogWhereInput>>;
  NOT?: InputMaybe<Array<AccessoryCatalogWhereInput>>;
  OR?: InputMaybe<Array<AccessoryCatalogWhereInput>>;
  catalogType?: InputMaybe<EnumAccessoryCatalogTypeFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  eyes?: InputMaybe<JsonNullableListFilter>;
  head?: InputMaybe<JsonNullableListFilter>;
  id?: InputMaybe<StringFilter>;
  itemCatalog?: InputMaybe<ItemCatalogRelationFilter>;
  itemCatalogId?: InputMaybe<StringNullableFilter>;
  items?: InputMaybe<JsonNullableListFilter>;
  pet?: InputMaybe<JsonNullableListFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type AccessoryCatalogWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type AccessoryItem = {
  __typename?: 'AccessoryItem';
  accessoryType: AccessoryType;
  id: Scalars['ID'];
  item: AvatarItem;
};

export type AccessoryItemCreateNestedOneWithoutItemInput = {
  connect?: InputMaybe<AccessoryItemWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AccessoryItemCreateOrConnectWithoutItemInput>;
  create?: InputMaybe<AccessoryItemCreateWithoutItemInput>;
};

export type AccessoryItemCreateOrConnectWithoutItemInput = {
  create: AccessoryItemCreateWithoutItemInput;
  where: AccessoryItemWhereUniqueInput;
};

export type AccessoryItemCreateWithoutItemInput = {
  accessoryType: AccessoryType;
};

export enum AccessoryItemOrderByRelevanceFieldEnum {
  Id = 'id'
}

export type AccessoryItemOrderByRelevanceInput = {
  fields: Array<AccessoryItemOrderByRelevanceFieldEnum>;
  search: Scalars['String'];
  sort: SortOrder;
};

export type AccessoryItemOrderByWithRelationAndSearchRelevanceInput = {
  _relevance?: InputMaybe<AccessoryItemOrderByRelevanceInput>;
  accessoryType?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  item?: InputMaybe<AvatarItemOrderByWithRelationAndSearchRelevanceInput>;
};

export type AccessoryItemRelationFilter = {
  is?: InputMaybe<AccessoryItemWhereInput>;
  isNot?: InputMaybe<AccessoryItemWhereInput>;
};

export type AccessoryItemUpdateOneWithoutItemInput = {
  connect?: InputMaybe<AccessoryItemWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AccessoryItemCreateOrConnectWithoutItemInput>;
  create?: InputMaybe<AccessoryItemCreateWithoutItemInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<AccessoryItemUpdateWithoutItemInput>;
  upsert?: InputMaybe<AccessoryItemUpsertWithoutItemInput>;
};

export type AccessoryItemUpdateWithoutItemInput = {
  accessoryType?: InputMaybe<EnumAccessoryTypeFieldUpdateOperationsInput>;
};

export type AccessoryItemUpsertWithoutItemInput = {
  create: AccessoryItemCreateWithoutItemInput;
  update: AccessoryItemUpdateWithoutItemInput;
};

export type AccessoryItemWhereInput = {
  AND?: InputMaybe<Array<AccessoryItemWhereInput>>;
  NOT?: InputMaybe<Array<AccessoryItemWhereInput>>;
  OR?: InputMaybe<Array<AccessoryItemWhereInput>>;
  accessoryType?: InputMaybe<EnumAccessoryTypeFilter>;
  id?: InputMaybe<StringFilter>;
  item?: InputMaybe<AvatarItemRelationFilter>;
};

export type AccessoryItemWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export enum AccessoryType {
  Eyes = 'EYES',
  Head = 'HEAD',
  Item = 'ITEM',
  Pet = 'PET'
}

export type AcquiredItem = {
  __typename?: 'AcquiredItem';
  avatarItem: AvatarItem;
  avatarItemId: Scalars['String'];
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  updatedAt: Scalars['Date'];
  user: User;
  userId: Scalars['String'];
};

export type AcquiredItemCreateManyAvatarItemInput = {
  createdAt?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Date']>;
  userId: Scalars['String'];
};

export type AcquiredItemCreateManyAvatarItemInputEnvelope = {
  data: Array<AcquiredItemCreateManyAvatarItemInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type AcquiredItemCreateManyUserInput = {
  avatarItemId: Scalars['String'];
  createdAt?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type AcquiredItemCreateManyUserInputEnvelope = {
  data: Array<AcquiredItemCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type AcquiredItemCreateNestedManyWithoutAvatarItemInput = {
  connect?: InputMaybe<Array<AcquiredItemWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AcquiredItemCreateOrConnectWithoutAvatarItemInput>>;
  create?: InputMaybe<Array<AcquiredItemCreateWithoutAvatarItemInput>>;
  createMany?: InputMaybe<AcquiredItemCreateManyAvatarItemInputEnvelope>;
};

export type AcquiredItemCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<AcquiredItemWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AcquiredItemCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<AcquiredItemCreateWithoutUserInput>>;
  createMany?: InputMaybe<AcquiredItemCreateManyUserInputEnvelope>;
};

export type AcquiredItemCreateOrConnectWithoutAvatarItemInput = {
  create: AcquiredItemCreateWithoutAvatarItemInput;
  where: AcquiredItemWhereUniqueInput;
};

export type AcquiredItemCreateOrConnectWithoutUserInput = {
  create: AcquiredItemCreateWithoutUserInput;
  where: AcquiredItemWhereUniqueInput;
};

export type AcquiredItemCreateWithoutAvatarItemInput = {
  createdAt?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Date']>;
  user: UserCreateNestedOneWithoutAcquiredItemsInput;
};

export type AcquiredItemCreateWithoutUserInput = {
  avatarItem: AvatarItemCreateNestedOneWithoutAcquiredItemsInput;
  createdAt?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type AcquiredItemListRelationFilter = {
  every?: InputMaybe<AcquiredItemWhereInput>;
  none?: InputMaybe<AcquiredItemWhereInput>;
  some?: InputMaybe<AcquiredItemWhereInput>;
};

export type AcquiredItemOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export enum AcquiredItemOrderByRelevanceFieldEnum {
  AvatarItemId = 'avatarItemId',
  Id = 'id',
  UserId = 'userId'
}

export type AcquiredItemOrderByRelevanceInput = {
  fields: Array<AcquiredItemOrderByRelevanceFieldEnum>;
  search: Scalars['String'];
  sort: SortOrder;
};

export type AcquiredItemOrderByWithRelationAndSearchRelevanceInput = {
  _relevance?: InputMaybe<AcquiredItemOrderByRelevanceInput>;
  avatarItem?: InputMaybe<AvatarItemOrderByWithRelationAndSearchRelevanceInput>;
  avatarItemId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationAndSearchRelevanceInput>;
  userId?: InputMaybe<SortOrder>;
};

export enum AcquiredItemScalarFieldEnum {
  AvatarItemId = 'avatarItemId',
  CreatedAt = 'createdAt',
  Id = 'id',
  UpdatedAt = 'updatedAt',
  UserId = 'userId'
}

export type AcquiredItemScalarWhereInput = {
  AND?: InputMaybe<Array<AcquiredItemScalarWhereInput>>;
  NOT?: InputMaybe<Array<AcquiredItemScalarWhereInput>>;
  OR?: InputMaybe<Array<AcquiredItemScalarWhereInput>>;
  avatarItemId?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type AcquiredItemUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type AcquiredItemUpdateManyWithWhereWithoutAvatarItemInput = {
  data: AcquiredItemUpdateManyMutationInput;
  where: AcquiredItemScalarWhereInput;
};

export type AcquiredItemUpdateManyWithWhereWithoutUserInput = {
  data: AcquiredItemUpdateManyMutationInput;
  where: AcquiredItemScalarWhereInput;
};

export type AcquiredItemUpdateManyWithoutAvatarItemInput = {
  connect?: InputMaybe<Array<AcquiredItemWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AcquiredItemCreateOrConnectWithoutAvatarItemInput>>;
  create?: InputMaybe<Array<AcquiredItemCreateWithoutAvatarItemInput>>;
  createMany?: InputMaybe<AcquiredItemCreateManyAvatarItemInputEnvelope>;
  delete?: InputMaybe<Array<AcquiredItemWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<AcquiredItemScalarWhereInput>>;
  disconnect?: InputMaybe<Array<AcquiredItemWhereUniqueInput>>;
  set?: InputMaybe<Array<AcquiredItemWhereUniqueInput>>;
  update?: InputMaybe<Array<AcquiredItemUpdateWithWhereUniqueWithoutAvatarItemInput>>;
  updateMany?: InputMaybe<Array<AcquiredItemUpdateManyWithWhereWithoutAvatarItemInput>>;
  upsert?: InputMaybe<Array<AcquiredItemUpsertWithWhereUniqueWithoutAvatarItemInput>>;
};

export type AcquiredItemUpdateManyWithoutUserInput = {
  connect?: InputMaybe<Array<AcquiredItemWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AcquiredItemCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<AcquiredItemCreateWithoutUserInput>>;
  createMany?: InputMaybe<AcquiredItemCreateManyUserInputEnvelope>;
  delete?: InputMaybe<Array<AcquiredItemWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<AcquiredItemScalarWhereInput>>;
  disconnect?: InputMaybe<Array<AcquiredItemWhereUniqueInput>>;
  set?: InputMaybe<Array<AcquiredItemWhereUniqueInput>>;
  update?: InputMaybe<Array<AcquiredItemUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<AcquiredItemUpdateManyWithWhereWithoutUserInput>>;
  upsert?: InputMaybe<Array<AcquiredItemUpsertWithWhereUniqueWithoutUserInput>>;
};

export type AcquiredItemUpdateWithWhereUniqueWithoutAvatarItemInput = {
  data: AcquiredItemUpdateWithoutAvatarItemInput;
  where: AcquiredItemWhereUniqueInput;
};

export type AcquiredItemUpdateWithWhereUniqueWithoutUserInput = {
  data: AcquiredItemUpdateWithoutUserInput;
  where: AcquiredItemWhereUniqueInput;
};

export type AcquiredItemUpdateWithoutAvatarItemInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutAcquiredItemsInput>;
};

export type AcquiredItemUpdateWithoutUserInput = {
  avatarItem?: InputMaybe<AvatarItemUpdateOneRequiredWithoutAcquiredItemsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type AcquiredItemUpsertWithWhereUniqueWithoutAvatarItemInput = {
  create: AcquiredItemCreateWithoutAvatarItemInput;
  update: AcquiredItemUpdateWithoutAvatarItemInput;
  where: AcquiredItemWhereUniqueInput;
};

export type AcquiredItemUpsertWithWhereUniqueWithoutUserInput = {
  create: AcquiredItemCreateWithoutUserInput;
  update: AcquiredItemUpdateWithoutUserInput;
  where: AcquiredItemWhereUniqueInput;
};

export type AcquiredItemUserIdAvatarItemIdCompoundUniqueInput = {
  avatarItemId: Scalars['String'];
  userId: Scalars['String'];
};

export type AcquiredItemWhereInput = {
  AND?: InputMaybe<Array<AcquiredItemWhereInput>>;
  NOT?: InputMaybe<Array<AcquiredItemWhereInput>>;
  OR?: InputMaybe<Array<AcquiredItemWhereInput>>;
  avatarItem?: InputMaybe<AvatarItemRelationFilter>;
  avatarItemId?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type AcquiredItemWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  userId_avatarItemId?: InputMaybe<AcquiredItemUserIdAvatarItemIdCompoundUniqueInput>;
};

export type Address = {
  __typename?: 'Address';
  address1?: Maybe<Scalars['String']>;
  address2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  postalCode?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  teacher?: Maybe<Teacher>;
  teacherId?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Date'];
};

export type AddressCreateNestedOneWithoutTeacherInput = {
  connect?: InputMaybe<AddressWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AddressCreateOrConnectWithoutTeacherInput>;
  create?: InputMaybe<AddressCreateWithoutTeacherInput>;
};

export type AddressCreateOrConnectWithoutTeacherInput = {
  create: AddressCreateWithoutTeacherInput;
  where: AddressWhereUniqueInput;
};

export type AddressCreateWithoutTeacherInput = {
  address1?: InputMaybe<Scalars['String']>;
  address2?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  postalCode?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  teacherId?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export enum AddressOrderByRelevanceFieldEnum {
  Address1 = 'address1',
  Address2 = 'address2',
  City = 'city',
  Country = 'country',
  Id = 'id',
  PostalCode = 'postalCode',
  State = 'state',
  TeacherId = 'teacherId'
}

export type AddressOrderByRelevanceInput = {
  fields: Array<AddressOrderByRelevanceFieldEnum>;
  search: Scalars['String'];
  sort: SortOrder;
};

export type AddressOrderByWithRelationAndSearchRelevanceInput = {
  _relevance?: InputMaybe<AddressOrderByRelevanceInput>;
  address1?: InputMaybe<SortOrder>;
  address2?: InputMaybe<SortOrder>;
  city?: InputMaybe<SortOrder>;
  country?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  postalCode?: InputMaybe<SortOrder>;
  state?: InputMaybe<SortOrder>;
  teacher?: InputMaybe<TeacherOrderByWithRelationAndSearchRelevanceInput>;
  teacherId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type AddressRelationFilter = {
  is?: InputMaybe<AddressWhereInput>;
  isNot?: InputMaybe<AddressWhereInput>;
};

export type AddressUpdateOneWithoutTeacherInput = {
  connect?: InputMaybe<AddressWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AddressCreateOrConnectWithoutTeacherInput>;
  create?: InputMaybe<AddressCreateWithoutTeacherInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<AddressUpdateWithoutTeacherInput>;
  upsert?: InputMaybe<AddressUpsertWithoutTeacherInput>;
};

export type AddressUpdateWithoutTeacherInput = {
  address1?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  address2?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  city?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  country?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  postalCode?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  state?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  teacherId?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type AddressUpsertWithoutTeacherInput = {
  create: AddressCreateWithoutTeacherInput;
  update: AddressUpdateWithoutTeacherInput;
};

export type AddressWhereInput = {
  AND?: InputMaybe<Array<AddressWhereInput>>;
  NOT?: InputMaybe<Array<AddressWhereInput>>;
  OR?: InputMaybe<Array<AddressWhereInput>>;
  address1?: InputMaybe<StringNullableFilter>;
  address2?: InputMaybe<StringNullableFilter>;
  city?: InputMaybe<StringNullableFilter>;
  country?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  postalCode?: InputMaybe<StringNullableFilter>;
  state?: InputMaybe<StringNullableFilter>;
  teacher?: InputMaybe<TeacherRelationFilter>;
  teacherId?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type AddressWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  teacherId?: InputMaybe<Scalars['String']>;
};

export type Admin = {
  __typename?: 'Admin';
  createdAt: Scalars['Date'];
  email: Scalars['String'];
  id: Scalars['ID'];
  password: Scalars['String'];
  updatedAt: Scalars['Date'];
  user: User;
};

export type AdminChangePasswordInput = {
  id: Scalars['String'];
  password: Scalars['String'];
  role: Role;
};

export type AdminCreateNestedOneWithoutUserInput = {
  connect?: InputMaybe<AdminWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AdminCreateOrConnectWithoutUserInput>;
  create?: InputMaybe<AdminCreateWithoutUserInput>;
};

export type AdminCreateOrConnectWithoutUserInput = {
  create: AdminCreateWithoutUserInput;
  where: AdminWhereUniqueInput;
};

export type AdminCreateWithoutUserInput = {
  createdAt?: InputMaybe<Scalars['Date']>;
  email: Scalars['String'];
  password: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type AdminLoginAsInput = {
  role: Role;
  team: Scalars['String'];
  userId: Scalars['String'];
};

export enum AdminOrderByRelevanceFieldEnum {
  Email = 'email',
  Id = 'id',
  Password = 'password'
}

export type AdminOrderByRelevanceInput = {
  fields: Array<AdminOrderByRelevanceFieldEnum>;
  search: Scalars['String'];
  sort: SortOrder;
};

export type AdminOrderByWithRelationAndSearchRelevanceInput = {
  _relevance?: InputMaybe<AdminOrderByRelevanceInput>;
  createdAt?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  password?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationAndSearchRelevanceInput>;
};

export type AdminRelationFilter = {
  is?: InputMaybe<AdminWhereInput>;
  isNot?: InputMaybe<AdminWhereInput>;
};

export type AdminUpdateChildDetailsInput = {
  bio?: InputMaybe<Scalars['String']>;
  birthDate?: InputMaybe<Scalars['Date']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  loginPattern?: InputMaybe<Scalars['String']>;
  parentEmail?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type AdminUpdateOneWithoutUserInput = {
  connect?: InputMaybe<AdminWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AdminCreateOrConnectWithoutUserInput>;
  create?: InputMaybe<AdminCreateWithoutUserInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<AdminUpdateWithoutUserInput>;
  upsert?: InputMaybe<AdminUpsertWithoutUserInput>;
};

export type AdminUpdateWithoutUserInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type AdminUpsertWithoutUserInput = {
  create: AdminCreateWithoutUserInput;
  update: AdminUpdateWithoutUserInput;
};

export type AdminWhereInput = {
  AND?: InputMaybe<Array<AdminWhereInput>>;
  NOT?: InputMaybe<Array<AdminWhereInput>>;
  OR?: InputMaybe<Array<AdminWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  email?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  password?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
};

export type AdminWhereUniqueInput = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
};

export enum AnswerQuantityType {
  Multiple = 'MULTIPLE',
  Single = 'SINGLE'
}

export enum AnswerType {
  Image = 'IMAGE',
  Text = 'TEXT'
}

export type AssessmentBlock = {
  __typename?: 'AssessmentBlock';
  assessmentUser: AssessmentUser;
  assessmentUserId: Scalars['String'];
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  question: Block;
  questionId: Scalars['String'];
  result: AssessmentQuestionResult;
  status: AssessmentQuestionStatus;
  updatedAt: Scalars['Date'];
};

export type AssessmentBlockCreateInput = {
  assessmentUser: AssessmentUserCreateNestedOneWithoutAssessmentBlockInput;
  createdAt?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  question: BlockCreateNestedOneWithoutAssessmentBlockInput;
  result?: InputMaybe<AssessmentQuestionResult>;
  status?: InputMaybe<AssessmentQuestionStatus>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type AssessmentBlockCreateManyAssessmentUserInput = {
  createdAt?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  questionId: Scalars['String'];
  result?: InputMaybe<AssessmentQuestionResult>;
  status?: InputMaybe<AssessmentQuestionStatus>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type AssessmentBlockCreateManyAssessmentUserInputEnvelope = {
  data: Array<AssessmentBlockCreateManyAssessmentUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type AssessmentBlockCreateManyInput = {
  assessmentUserId: Scalars['String'];
  createdAt?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  questionId: Scalars['String'];
  result?: InputMaybe<AssessmentQuestionResult>;
  status?: InputMaybe<AssessmentQuestionStatus>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type AssessmentBlockCreateManyQuestionInput = {
  assessmentUserId: Scalars['String'];
  createdAt?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  result?: InputMaybe<AssessmentQuestionResult>;
  status?: InputMaybe<AssessmentQuestionStatus>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type AssessmentBlockCreateManyQuestionInputEnvelope = {
  data: Array<AssessmentBlockCreateManyQuestionInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type AssessmentBlockCreateNestedManyWithoutAssessmentUserInput = {
  connect?: InputMaybe<Array<AssessmentBlockWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AssessmentBlockCreateOrConnectWithoutAssessmentUserInput>>;
  create?: InputMaybe<Array<AssessmentBlockCreateWithoutAssessmentUserInput>>;
  createMany?: InputMaybe<AssessmentBlockCreateManyAssessmentUserInputEnvelope>;
};

export type AssessmentBlockCreateNestedManyWithoutQuestionInput = {
  connect?: InputMaybe<Array<AssessmentBlockWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AssessmentBlockCreateOrConnectWithoutQuestionInput>>;
  create?: InputMaybe<Array<AssessmentBlockCreateWithoutQuestionInput>>;
  createMany?: InputMaybe<AssessmentBlockCreateManyQuestionInputEnvelope>;
};

export type AssessmentBlockCreateOrConnectWithoutAssessmentUserInput = {
  create: AssessmentBlockCreateWithoutAssessmentUserInput;
  where: AssessmentBlockWhereUniqueInput;
};

export type AssessmentBlockCreateOrConnectWithoutQuestionInput = {
  create: AssessmentBlockCreateWithoutQuestionInput;
  where: AssessmentBlockWhereUniqueInput;
};

export type AssessmentBlockCreateWithoutAssessmentUserInput = {
  createdAt?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  question: BlockCreateNestedOneWithoutAssessmentBlockInput;
  result?: InputMaybe<AssessmentQuestionResult>;
  status?: InputMaybe<AssessmentQuestionStatus>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type AssessmentBlockCreateWithoutQuestionInput = {
  assessmentUser: AssessmentUserCreateNestedOneWithoutAssessmentBlockInput;
  createdAt?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  result?: InputMaybe<AssessmentQuestionResult>;
  status?: InputMaybe<AssessmentQuestionStatus>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type AssessmentBlockListRelationFilter = {
  every?: InputMaybe<AssessmentBlockWhereInput>;
  none?: InputMaybe<AssessmentBlockWhereInput>;
  some?: InputMaybe<AssessmentBlockWhereInput>;
};

export type AssessmentBlockOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export enum AssessmentBlockOrderByRelevanceFieldEnum {
  AssessmentUserId = 'assessmentUserId',
  Id = 'id',
  QuestionId = 'questionId'
}

export type AssessmentBlockOrderByRelevanceInput = {
  fields: Array<AssessmentBlockOrderByRelevanceFieldEnum>;
  search: Scalars['String'];
  sort: SortOrder;
};

export type AssessmentBlockOrderByWithRelationAndSearchRelevanceInput = {
  _relevance?: InputMaybe<AssessmentBlockOrderByRelevanceInput>;
  assessmentUser?: InputMaybe<AssessmentUserOrderByWithRelationAndSearchRelevanceInput>;
  assessmentUserId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  question?: InputMaybe<BlockOrderByWithRelationAndSearchRelevanceInput>;
  questionId?: InputMaybe<SortOrder>;
  result?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum AssessmentBlockScalarFieldEnum {
  AssessmentUserId = 'assessmentUserId',
  CreatedAt = 'createdAt',
  Id = 'id',
  QuestionId = 'questionId',
  Result = 'result',
  Status = 'status',
  UpdatedAt = 'updatedAt'
}

export type AssessmentBlockScalarWhereInput = {
  AND?: InputMaybe<Array<AssessmentBlockScalarWhereInput>>;
  NOT?: InputMaybe<Array<AssessmentBlockScalarWhereInput>>;
  OR?: InputMaybe<Array<AssessmentBlockScalarWhereInput>>;
  assessmentUserId?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  questionId?: InputMaybe<StringFilter>;
  result?: InputMaybe<EnumAssessmentQuestionResultFilter>;
  status?: InputMaybe<EnumAssessmentQuestionStatusFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type AssessmentBlockUncheckedCreateNestedManyWithoutQuestionInput = {
  connect?: InputMaybe<Array<AssessmentBlockWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AssessmentBlockCreateOrConnectWithoutQuestionInput>>;
  create?: InputMaybe<Array<AssessmentBlockCreateWithoutQuestionInput>>;
  createMany?: InputMaybe<AssessmentBlockCreateManyQuestionInputEnvelope>;
};

export type AssessmentBlockUpdateInput = {
  assessmentUser?: InputMaybe<AssessmentUserUpdateOneRequiredWithoutAssessmentBlockInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  question?: InputMaybe<BlockUpdateOneRequiredWithoutAssessmentBlockInput>;
  result?: InputMaybe<EnumAssessmentQuestionResultFieldUpdateOperationsInput>;
  status?: InputMaybe<EnumAssessmentQuestionStatusFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type AssessmentBlockUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  result?: InputMaybe<EnumAssessmentQuestionResultFieldUpdateOperationsInput>;
  status?: InputMaybe<EnumAssessmentQuestionStatusFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type AssessmentBlockUpdateManyWithWhereWithoutAssessmentUserInput = {
  data: AssessmentBlockUpdateManyMutationInput;
  where: AssessmentBlockScalarWhereInput;
};

export type AssessmentBlockUpdateManyWithWhereWithoutQuestionInput = {
  data: AssessmentBlockUpdateManyMutationInput;
  where: AssessmentBlockScalarWhereInput;
};

export type AssessmentBlockUpdateManyWithoutAssessmentUserInput = {
  connect?: InputMaybe<Array<AssessmentBlockWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AssessmentBlockCreateOrConnectWithoutAssessmentUserInput>>;
  create?: InputMaybe<Array<AssessmentBlockCreateWithoutAssessmentUserInput>>;
  createMany?: InputMaybe<AssessmentBlockCreateManyAssessmentUserInputEnvelope>;
  delete?: InputMaybe<Array<AssessmentBlockWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<AssessmentBlockScalarWhereInput>>;
  disconnect?: InputMaybe<Array<AssessmentBlockWhereUniqueInput>>;
  set?: InputMaybe<Array<AssessmentBlockWhereUniqueInput>>;
  update?: InputMaybe<Array<AssessmentBlockUpdateWithWhereUniqueWithoutAssessmentUserInput>>;
  updateMany?: InputMaybe<Array<AssessmentBlockUpdateManyWithWhereWithoutAssessmentUserInput>>;
  upsert?: InputMaybe<Array<AssessmentBlockUpsertWithWhereUniqueWithoutAssessmentUserInput>>;
};

export type AssessmentBlockUpdateManyWithoutQuestionInput = {
  connect?: InputMaybe<Array<AssessmentBlockWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AssessmentBlockCreateOrConnectWithoutQuestionInput>>;
  create?: InputMaybe<Array<AssessmentBlockCreateWithoutQuestionInput>>;
  createMany?: InputMaybe<AssessmentBlockCreateManyQuestionInputEnvelope>;
  delete?: InputMaybe<Array<AssessmentBlockWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<AssessmentBlockScalarWhereInput>>;
  disconnect?: InputMaybe<Array<AssessmentBlockWhereUniqueInput>>;
  set?: InputMaybe<Array<AssessmentBlockWhereUniqueInput>>;
  update?: InputMaybe<Array<AssessmentBlockUpdateWithWhereUniqueWithoutQuestionInput>>;
  updateMany?: InputMaybe<Array<AssessmentBlockUpdateManyWithWhereWithoutQuestionInput>>;
  upsert?: InputMaybe<Array<AssessmentBlockUpsertWithWhereUniqueWithoutQuestionInput>>;
};

export type AssessmentBlockUpdateWithWhereUniqueWithoutAssessmentUserInput = {
  data: AssessmentBlockUpdateWithoutAssessmentUserInput;
  where: AssessmentBlockWhereUniqueInput;
};

export type AssessmentBlockUpdateWithWhereUniqueWithoutQuestionInput = {
  data: AssessmentBlockUpdateWithoutQuestionInput;
  where: AssessmentBlockWhereUniqueInput;
};

export type AssessmentBlockUpdateWithoutAssessmentUserInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  question?: InputMaybe<BlockUpdateOneRequiredWithoutAssessmentBlockInput>;
  result?: InputMaybe<EnumAssessmentQuestionResultFieldUpdateOperationsInput>;
  status?: InputMaybe<EnumAssessmentQuestionStatusFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type AssessmentBlockUpdateWithoutQuestionInput = {
  assessmentUser?: InputMaybe<AssessmentUserUpdateOneRequiredWithoutAssessmentBlockInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  result?: InputMaybe<EnumAssessmentQuestionResultFieldUpdateOperationsInput>;
  status?: InputMaybe<EnumAssessmentQuestionStatusFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type AssessmentBlockUpsertWithWhereUniqueWithoutAssessmentUserInput = {
  create: AssessmentBlockCreateWithoutAssessmentUserInput;
  update: AssessmentBlockUpdateWithoutAssessmentUserInput;
  where: AssessmentBlockWhereUniqueInput;
};

export type AssessmentBlockUpsertWithWhereUniqueWithoutQuestionInput = {
  create: AssessmentBlockCreateWithoutQuestionInput;
  update: AssessmentBlockUpdateWithoutQuestionInput;
  where: AssessmentBlockWhereUniqueInput;
};

export type AssessmentBlockWhereInput = {
  AND?: InputMaybe<Array<AssessmentBlockWhereInput>>;
  NOT?: InputMaybe<Array<AssessmentBlockWhereInput>>;
  OR?: InputMaybe<Array<AssessmentBlockWhereInput>>;
  assessmentUser?: InputMaybe<AssessmentUserRelationFilter>;
  assessmentUserId?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  question?: InputMaybe<BlockRelationFilter>;
  questionId?: InputMaybe<StringFilter>;
  result?: InputMaybe<EnumAssessmentQuestionResultFilter>;
  status?: InputMaybe<EnumAssessmentQuestionStatusFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type AssessmentBlockWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export enum AssessmentQuestionResult {
  Correct = 'CORRECT',
  Incorrect = 'INCORRECT',
  Unanswered = 'UNANSWERED'
}

export enum AssessmentQuestionStatus {
  Completed = 'COMPLETED',
  Incomplete = 'INCOMPLETE',
  NotStarted = 'NOT_STARTED'
}

export type AssessmentScoreDto = {
  __typename?: 'AssessmentScoreDto';
  correct: Scalars['Int'];
  percentage: Scalars['Int'];
  totalQuestion: Scalars['Int'];
};

export type AssessmentUser = {
  __typename?: 'AssessmentUser';
  AssessmentBlock?: Maybe<Array<AssessmentBlock>>;
  EnrolledCheckpoint: EnrolledCheckpoint;
  _count: AssessmentUserCount;
  courseId: Scalars['String'];
  createdAt: Scalars['Date'];
  enrollCourse: EnrolledCourse;
  enrolledCheckpointId: Scalars['String'];
  grade: Scalars['Int'];
  id: Scalars['ID'];
  score?: Maybe<AssessmentScoreDto>;
  student: Student;
  studentId: Scalars['String'];
  totalBlocks: Scalars['Int'];
  updatedAt: Scalars['Date'];
};

export type AssessmentUserCount = {
  __typename?: 'AssessmentUserCount';
  AssessmentBlock: Scalars['Int'];
};

export type AssessmentUserCreateInput = {
  AssessmentBlock?: InputMaybe<AssessmentBlockCreateNestedManyWithoutAssessmentUserInput>;
  EnrolledCheckpoint: EnrolledCheckpointCreateNestedOneWithoutAssessmentUserInput;
  createdAt?: InputMaybe<Scalars['Date']>;
  enrollCourse: EnrolledCourseCreateNestedOneWithoutAssessmentUserInput;
  grade: Scalars['Int'];
  id?: InputMaybe<Scalars['String']>;
  student: StudentCreateNestedOneWithoutAssessmentUserInput;
  totalBlocks?: InputMaybe<Scalars['Int']>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type AssessmentUserCreateManyEnrollCourseInput = {
  createdAt?: InputMaybe<Scalars['Date']>;
  enrolledCheckpointId: Scalars['String'];
  grade: Scalars['Int'];
  id?: InputMaybe<Scalars['String']>;
  totalBlocks?: InputMaybe<Scalars['Int']>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type AssessmentUserCreateManyEnrollCourseInputEnvelope = {
  data: Array<AssessmentUserCreateManyEnrollCourseInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type AssessmentUserCreateManyEnrolledCheckpointInput = {
  courseId: Scalars['String'];
  createdAt?: InputMaybe<Scalars['Date']>;
  grade: Scalars['Int'];
  id?: InputMaybe<Scalars['String']>;
  studentId: Scalars['String'];
  totalBlocks?: InputMaybe<Scalars['Int']>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type AssessmentUserCreateManyEnrolledCheckpointInputEnvelope = {
  data: Array<AssessmentUserCreateManyEnrolledCheckpointInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type AssessmentUserCreateManyInput = {
  courseId: Scalars['String'];
  createdAt?: InputMaybe<Scalars['Date']>;
  enrolledCheckpointId: Scalars['String'];
  grade: Scalars['Int'];
  id?: InputMaybe<Scalars['String']>;
  studentId: Scalars['String'];
  totalBlocks?: InputMaybe<Scalars['Int']>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type AssessmentUserCreateManyStudentInput = {
  courseId: Scalars['String'];
  createdAt?: InputMaybe<Scalars['Date']>;
  enrolledCheckpointId: Scalars['String'];
  grade: Scalars['Int'];
  id?: InputMaybe<Scalars['String']>;
  totalBlocks?: InputMaybe<Scalars['Int']>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type AssessmentUserCreateManyStudentInputEnvelope = {
  data: Array<AssessmentUserCreateManyStudentInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type AssessmentUserCreateNestedManyWithoutEnrollCourseInput = {
  connect?: InputMaybe<Array<AssessmentUserWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AssessmentUserCreateOrConnectWithoutEnrollCourseInput>>;
  create?: InputMaybe<Array<AssessmentUserCreateWithoutEnrollCourseInput>>;
  createMany?: InputMaybe<AssessmentUserCreateManyEnrollCourseInputEnvelope>;
};

export type AssessmentUserCreateNestedManyWithoutEnrolledCheckpointInput = {
  connect?: InputMaybe<Array<AssessmentUserWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AssessmentUserCreateOrConnectWithoutEnrolledCheckpointInput>>;
  create?: InputMaybe<Array<AssessmentUserCreateWithoutEnrolledCheckpointInput>>;
  createMany?: InputMaybe<AssessmentUserCreateManyEnrolledCheckpointInputEnvelope>;
};

export type AssessmentUserCreateNestedManyWithoutStudentInput = {
  connect?: InputMaybe<Array<AssessmentUserWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AssessmentUserCreateOrConnectWithoutStudentInput>>;
  create?: InputMaybe<Array<AssessmentUserCreateWithoutStudentInput>>;
  createMany?: InputMaybe<AssessmentUserCreateManyStudentInputEnvelope>;
};

export type AssessmentUserCreateNestedOneWithoutAssessmentBlockInput = {
  connect?: InputMaybe<AssessmentUserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AssessmentUserCreateOrConnectWithoutAssessmentBlockInput>;
  create?: InputMaybe<AssessmentUserCreateWithoutAssessmentBlockInput>;
};

export type AssessmentUserCreateOrConnectWithoutAssessmentBlockInput = {
  create: AssessmentUserCreateWithoutAssessmentBlockInput;
  where: AssessmentUserWhereUniqueInput;
};

export type AssessmentUserCreateOrConnectWithoutEnrollCourseInput = {
  create: AssessmentUserCreateWithoutEnrollCourseInput;
  where: AssessmentUserWhereUniqueInput;
};

export type AssessmentUserCreateOrConnectWithoutEnrolledCheckpointInput = {
  create: AssessmentUserCreateWithoutEnrolledCheckpointInput;
  where: AssessmentUserWhereUniqueInput;
};

export type AssessmentUserCreateOrConnectWithoutStudentInput = {
  create: AssessmentUserCreateWithoutStudentInput;
  where: AssessmentUserWhereUniqueInput;
};

export type AssessmentUserCreateWithoutAssessmentBlockInput = {
  EnrolledCheckpoint: EnrolledCheckpointCreateNestedOneWithoutAssessmentUserInput;
  createdAt?: InputMaybe<Scalars['Date']>;
  enrollCourse: EnrolledCourseCreateNestedOneWithoutAssessmentUserInput;
  grade: Scalars['Int'];
  id?: InputMaybe<Scalars['String']>;
  student: StudentCreateNestedOneWithoutAssessmentUserInput;
  totalBlocks?: InputMaybe<Scalars['Int']>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type AssessmentUserCreateWithoutEnrollCourseInput = {
  AssessmentBlock?: InputMaybe<AssessmentBlockCreateNestedManyWithoutAssessmentUserInput>;
  EnrolledCheckpoint: EnrolledCheckpointCreateNestedOneWithoutAssessmentUserInput;
  createdAt?: InputMaybe<Scalars['Date']>;
  grade: Scalars['Int'];
  id?: InputMaybe<Scalars['String']>;
  student: StudentCreateNestedOneWithoutAssessmentUserInput;
  totalBlocks?: InputMaybe<Scalars['Int']>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type AssessmentUserCreateWithoutEnrolledCheckpointInput = {
  AssessmentBlock?: InputMaybe<AssessmentBlockCreateNestedManyWithoutAssessmentUserInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  enrollCourse: EnrolledCourseCreateNestedOneWithoutAssessmentUserInput;
  grade: Scalars['Int'];
  id?: InputMaybe<Scalars['String']>;
  student: StudentCreateNestedOneWithoutAssessmentUserInput;
  totalBlocks?: InputMaybe<Scalars['Int']>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type AssessmentUserCreateWithoutStudentInput = {
  AssessmentBlock?: InputMaybe<AssessmentBlockCreateNestedManyWithoutAssessmentUserInput>;
  EnrolledCheckpoint: EnrolledCheckpointCreateNestedOneWithoutAssessmentUserInput;
  createdAt?: InputMaybe<Scalars['Date']>;
  enrollCourse: EnrolledCourseCreateNestedOneWithoutAssessmentUserInput;
  grade: Scalars['Int'];
  id?: InputMaybe<Scalars['String']>;
  totalBlocks?: InputMaybe<Scalars['Int']>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type AssessmentUserListRelationFilter = {
  every?: InputMaybe<AssessmentUserWhereInput>;
  none?: InputMaybe<AssessmentUserWhereInput>;
  some?: InputMaybe<AssessmentUserWhereInput>;
};

export type AssessmentUserOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export enum AssessmentUserOrderByRelevanceFieldEnum {
  CourseId = 'courseId',
  EnrolledCheckpointId = 'enrolledCheckpointId',
  Id = 'id',
  StudentId = 'studentId'
}

export type AssessmentUserOrderByRelevanceInput = {
  fields: Array<AssessmentUserOrderByRelevanceFieldEnum>;
  search: Scalars['String'];
  sort: SortOrder;
};

export type AssessmentUserOrderByWithRelationAndSearchRelevanceInput = {
  AssessmentBlock?: InputMaybe<AssessmentBlockOrderByRelationAggregateInput>;
  EnrolledCheckpoint?: InputMaybe<EnrolledCheckpointOrderByWithRelationAndSearchRelevanceInput>;
  _relevance?: InputMaybe<AssessmentUserOrderByRelevanceInput>;
  courseId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  enrollCourse?: InputMaybe<EnrolledCourseOrderByWithRelationAndSearchRelevanceInput>;
  enrolledCheckpointId?: InputMaybe<SortOrder>;
  grade?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  student?: InputMaybe<StudentOrderByWithRelationAndSearchRelevanceInput>;
  studentId?: InputMaybe<SortOrder>;
  totalBlocks?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type AssessmentUserRelationFilter = {
  is?: InputMaybe<AssessmentUserWhereInput>;
  isNot?: InputMaybe<AssessmentUserWhereInput>;
};

export enum AssessmentUserScalarFieldEnum {
  CourseId = 'courseId',
  CreatedAt = 'createdAt',
  EnrolledCheckpointId = 'enrolledCheckpointId',
  Grade = 'grade',
  Id = 'id',
  StudentId = 'studentId',
  TotalBlocks = 'totalBlocks',
  UpdatedAt = 'updatedAt'
}

export type AssessmentUserScalarWhereInput = {
  AND?: InputMaybe<Array<AssessmentUserScalarWhereInput>>;
  NOT?: InputMaybe<Array<AssessmentUserScalarWhereInput>>;
  OR?: InputMaybe<Array<AssessmentUserScalarWhereInput>>;
  courseId?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  enrolledCheckpointId?: InputMaybe<StringFilter>;
  grade?: InputMaybe<IntFilter>;
  id?: InputMaybe<StringFilter>;
  studentId?: InputMaybe<StringFilter>;
  totalBlocks?: InputMaybe<IntFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type AssessmentUserUncheckedCreateNestedManyWithoutEnrollCourseInput = {
  connect?: InputMaybe<Array<AssessmentUserWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AssessmentUserCreateOrConnectWithoutEnrollCourseInput>>;
  create?: InputMaybe<Array<AssessmentUserCreateWithoutEnrollCourseInput>>;
  createMany?: InputMaybe<AssessmentUserCreateManyEnrollCourseInputEnvelope>;
};

export type AssessmentUserUpdateInput = {
  AssessmentBlock?: InputMaybe<AssessmentBlockUpdateManyWithoutAssessmentUserInput>;
  EnrolledCheckpoint?: InputMaybe<EnrolledCheckpointUpdateOneRequiredWithoutAssessmentUserInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  enrollCourse?: InputMaybe<EnrolledCourseUpdateOneRequiredWithoutAssessmentUserInput>;
  grade?: InputMaybe<IntFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  student?: InputMaybe<StudentUpdateOneRequiredWithoutAssessmentUserInput>;
  totalBlocks?: InputMaybe<IntFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type AssessmentUserUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  grade?: InputMaybe<IntFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  totalBlocks?: InputMaybe<IntFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type AssessmentUserUpdateManyWithWhereWithoutEnrollCourseInput = {
  data: AssessmentUserUpdateManyMutationInput;
  where: AssessmentUserScalarWhereInput;
};

export type AssessmentUserUpdateManyWithWhereWithoutEnrolledCheckpointInput = {
  data: AssessmentUserUpdateManyMutationInput;
  where: AssessmentUserScalarWhereInput;
};

export type AssessmentUserUpdateManyWithWhereWithoutStudentInput = {
  data: AssessmentUserUpdateManyMutationInput;
  where: AssessmentUserScalarWhereInput;
};

export type AssessmentUserUpdateManyWithoutEnrollCourseInput = {
  connect?: InputMaybe<Array<AssessmentUserWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AssessmentUserCreateOrConnectWithoutEnrollCourseInput>>;
  create?: InputMaybe<Array<AssessmentUserCreateWithoutEnrollCourseInput>>;
  createMany?: InputMaybe<AssessmentUserCreateManyEnrollCourseInputEnvelope>;
  delete?: InputMaybe<Array<AssessmentUserWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<AssessmentUserScalarWhereInput>>;
  disconnect?: InputMaybe<Array<AssessmentUserWhereUniqueInput>>;
  set?: InputMaybe<Array<AssessmentUserWhereUniqueInput>>;
  update?: InputMaybe<Array<AssessmentUserUpdateWithWhereUniqueWithoutEnrollCourseInput>>;
  updateMany?: InputMaybe<Array<AssessmentUserUpdateManyWithWhereWithoutEnrollCourseInput>>;
  upsert?: InputMaybe<Array<AssessmentUserUpsertWithWhereUniqueWithoutEnrollCourseInput>>;
};

export type AssessmentUserUpdateManyWithoutEnrolledCheckpointInput = {
  connect?: InputMaybe<Array<AssessmentUserWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AssessmentUserCreateOrConnectWithoutEnrolledCheckpointInput>>;
  create?: InputMaybe<Array<AssessmentUserCreateWithoutEnrolledCheckpointInput>>;
  createMany?: InputMaybe<AssessmentUserCreateManyEnrolledCheckpointInputEnvelope>;
  delete?: InputMaybe<Array<AssessmentUserWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<AssessmentUserScalarWhereInput>>;
  disconnect?: InputMaybe<Array<AssessmentUserWhereUniqueInput>>;
  set?: InputMaybe<Array<AssessmentUserWhereUniqueInput>>;
  update?: InputMaybe<Array<AssessmentUserUpdateWithWhereUniqueWithoutEnrolledCheckpointInput>>;
  updateMany?: InputMaybe<Array<AssessmentUserUpdateManyWithWhereWithoutEnrolledCheckpointInput>>;
  upsert?: InputMaybe<Array<AssessmentUserUpsertWithWhereUniqueWithoutEnrolledCheckpointInput>>;
};

export type AssessmentUserUpdateManyWithoutStudentInput = {
  connect?: InputMaybe<Array<AssessmentUserWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AssessmentUserCreateOrConnectWithoutStudentInput>>;
  create?: InputMaybe<Array<AssessmentUserCreateWithoutStudentInput>>;
  createMany?: InputMaybe<AssessmentUserCreateManyStudentInputEnvelope>;
  delete?: InputMaybe<Array<AssessmentUserWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<AssessmentUserScalarWhereInput>>;
  disconnect?: InputMaybe<Array<AssessmentUserWhereUniqueInput>>;
  set?: InputMaybe<Array<AssessmentUserWhereUniqueInput>>;
  update?: InputMaybe<Array<AssessmentUserUpdateWithWhereUniqueWithoutStudentInput>>;
  updateMany?: InputMaybe<Array<AssessmentUserUpdateManyWithWhereWithoutStudentInput>>;
  upsert?: InputMaybe<Array<AssessmentUserUpsertWithWhereUniqueWithoutStudentInput>>;
};

export type AssessmentUserUpdateOneRequiredWithoutAssessmentBlockInput = {
  connect?: InputMaybe<AssessmentUserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AssessmentUserCreateOrConnectWithoutAssessmentBlockInput>;
  create?: InputMaybe<AssessmentUserCreateWithoutAssessmentBlockInput>;
  update?: InputMaybe<AssessmentUserUpdateWithoutAssessmentBlockInput>;
  upsert?: InputMaybe<AssessmentUserUpsertWithoutAssessmentBlockInput>;
};

export type AssessmentUserUpdateWithWhereUniqueWithoutEnrollCourseInput = {
  data: AssessmentUserUpdateWithoutEnrollCourseInput;
  where: AssessmentUserWhereUniqueInput;
};

export type AssessmentUserUpdateWithWhereUniqueWithoutEnrolledCheckpointInput = {
  data: AssessmentUserUpdateWithoutEnrolledCheckpointInput;
  where: AssessmentUserWhereUniqueInput;
};

export type AssessmentUserUpdateWithWhereUniqueWithoutStudentInput = {
  data: AssessmentUserUpdateWithoutStudentInput;
  where: AssessmentUserWhereUniqueInput;
};

export type AssessmentUserUpdateWithoutAssessmentBlockInput = {
  EnrolledCheckpoint?: InputMaybe<EnrolledCheckpointUpdateOneRequiredWithoutAssessmentUserInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  enrollCourse?: InputMaybe<EnrolledCourseUpdateOneRequiredWithoutAssessmentUserInput>;
  grade?: InputMaybe<IntFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  student?: InputMaybe<StudentUpdateOneRequiredWithoutAssessmentUserInput>;
  totalBlocks?: InputMaybe<IntFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type AssessmentUserUpdateWithoutEnrollCourseInput = {
  AssessmentBlock?: InputMaybe<AssessmentBlockUpdateManyWithoutAssessmentUserInput>;
  EnrolledCheckpoint?: InputMaybe<EnrolledCheckpointUpdateOneRequiredWithoutAssessmentUserInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  grade?: InputMaybe<IntFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  student?: InputMaybe<StudentUpdateOneRequiredWithoutAssessmentUserInput>;
  totalBlocks?: InputMaybe<IntFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type AssessmentUserUpdateWithoutEnrolledCheckpointInput = {
  AssessmentBlock?: InputMaybe<AssessmentBlockUpdateManyWithoutAssessmentUserInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  enrollCourse?: InputMaybe<EnrolledCourseUpdateOneRequiredWithoutAssessmentUserInput>;
  grade?: InputMaybe<IntFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  student?: InputMaybe<StudentUpdateOneRequiredWithoutAssessmentUserInput>;
  totalBlocks?: InputMaybe<IntFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type AssessmentUserUpdateWithoutStudentInput = {
  AssessmentBlock?: InputMaybe<AssessmentBlockUpdateManyWithoutAssessmentUserInput>;
  EnrolledCheckpoint?: InputMaybe<EnrolledCheckpointUpdateOneRequiredWithoutAssessmentUserInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  enrollCourse?: InputMaybe<EnrolledCourseUpdateOneRequiredWithoutAssessmentUserInput>;
  grade?: InputMaybe<IntFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  totalBlocks?: InputMaybe<IntFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type AssessmentUserUpsertWithWhereUniqueWithoutEnrollCourseInput = {
  create: AssessmentUserCreateWithoutEnrollCourseInput;
  update: AssessmentUserUpdateWithoutEnrollCourseInput;
  where: AssessmentUserWhereUniqueInput;
};

export type AssessmentUserUpsertWithWhereUniqueWithoutEnrolledCheckpointInput = {
  create: AssessmentUserCreateWithoutEnrolledCheckpointInput;
  update: AssessmentUserUpdateWithoutEnrolledCheckpointInput;
  where: AssessmentUserWhereUniqueInput;
};

export type AssessmentUserUpsertWithWhereUniqueWithoutStudentInput = {
  create: AssessmentUserCreateWithoutStudentInput;
  update: AssessmentUserUpdateWithoutStudentInput;
  where: AssessmentUserWhereUniqueInput;
};

export type AssessmentUserUpsertWithoutAssessmentBlockInput = {
  create: AssessmentUserCreateWithoutAssessmentBlockInput;
  update: AssessmentUserUpdateWithoutAssessmentBlockInput;
};

export type AssessmentUserWhereInput = {
  AND?: InputMaybe<Array<AssessmentUserWhereInput>>;
  AssessmentBlock?: InputMaybe<AssessmentBlockListRelationFilter>;
  EnrolledCheckpoint?: InputMaybe<EnrolledCheckpointRelationFilter>;
  NOT?: InputMaybe<Array<AssessmentUserWhereInput>>;
  OR?: InputMaybe<Array<AssessmentUserWhereInput>>;
  courseId?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  enrollCourse?: InputMaybe<EnrolledCourseRelationFilter>;
  enrolledCheckpointId?: InputMaybe<StringFilter>;
  grade?: InputMaybe<IntFilter>;
  id?: InputMaybe<StringFilter>;
  student?: InputMaybe<StudentRelationFilter>;
  studentId?: InputMaybe<StringFilter>;
  totalBlocks?: InputMaybe<IntFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type AssessmentUserWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type Asset = {
  __typename?: 'Asset';
  Subtitles?: Maybe<Array<Subtitles>>;
  _count: AssetCount;
  attachmentBlock?: Maybe<AttachmentBlock>;
  avatarImage?: Maybe<Student>;
  avatarItems?: Maybe<AvatarItem>;
  bannerCourse?: Maybe<Course>;
  challenge?: Maybe<Challenge>;
  checkpointImage?: Maybe<Checkpoint>;
  courseId?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  fileType: FileType;
  forumPost?: Maybe<ForumPost>;
  forumPostId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  mediaBlock?: Maybe<MediaBlock>;
  name: Scalars['String'];
  questionBlock?: Maybe<QuestionBlock>;
  questionMediaBlock?: Maybe<QuestionBlock>;
  questionSelection?: Maybe<QuestionSelection>;
  teacherBanner?: Maybe<Teacher>;
  teacherPhoto?: Maybe<Teacher>;
  thumbnailCourse?: Maybe<Course>;
  updatedAt: Scalars['Date'];
  url: Scalars['String'];
};

export type AssetCount = {
  __typename?: 'AssetCount';
  Subtitles: Scalars['Int'];
};

export type AssetCreateManyBannerCourseInput = {
  createdAt?: InputMaybe<Scalars['Date']>;
  fileType: FileType;
  forumPostId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['Date']>;
  url: Scalars['String'];
};

export type AssetCreateManyBannerCourseInputEnvelope = {
  data: Array<AssetCreateManyBannerCourseInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type AssetCreateManyForumPostInput = {
  courseId?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['Date']>;
  fileType: FileType;
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['Date']>;
  url: Scalars['String'];
};

export type AssetCreateManyForumPostInputEnvelope = {
  data: Array<AssetCreateManyForumPostInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type AssetCreateNestedManyWithoutBannerCourseInput = {
  connect?: InputMaybe<Array<AssetWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AssetCreateOrConnectWithoutBannerCourseInput>>;
  create?: InputMaybe<Array<AssetCreateWithoutBannerCourseInput>>;
  createMany?: InputMaybe<AssetCreateManyBannerCourseInputEnvelope>;
};

export type AssetCreateNestedManyWithoutForumPostInput = {
  connect?: InputMaybe<Array<AssetWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AssetCreateOrConnectWithoutForumPostInput>>;
  create?: InputMaybe<Array<AssetCreateWithoutForumPostInput>>;
  createMany?: InputMaybe<AssetCreateManyForumPostInputEnvelope>;
};

export type AssetCreateNestedOneWithoutAttachmentBlockInput = {
  connect?: InputMaybe<AssetWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AssetCreateOrConnectWithoutAttachmentBlockInput>;
  create?: InputMaybe<AssetCreateWithoutAttachmentBlockInput>;
};

export type AssetCreateNestedOneWithoutAvatarImageInput = {
  connect?: InputMaybe<AssetWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AssetCreateOrConnectWithoutAvatarImageInput>;
  create?: InputMaybe<AssetCreateWithoutAvatarImageInput>;
};

export type AssetCreateNestedOneWithoutAvatarItemsInput = {
  connect?: InputMaybe<AssetWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AssetCreateOrConnectWithoutAvatarItemsInput>;
  create?: InputMaybe<AssetCreateWithoutAvatarItemsInput>;
};

export type AssetCreateNestedOneWithoutChallengeInput = {
  connect?: InputMaybe<AssetWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AssetCreateOrConnectWithoutChallengeInput>;
  create?: InputMaybe<AssetCreateWithoutChallengeInput>;
};

export type AssetCreateNestedOneWithoutCheckpointImageInput = {
  connect?: InputMaybe<AssetWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AssetCreateOrConnectWithoutCheckpointImageInput>;
  create?: InputMaybe<AssetCreateWithoutCheckpointImageInput>;
};

export type AssetCreateNestedOneWithoutMediaBlockInput = {
  connect?: InputMaybe<AssetWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AssetCreateOrConnectWithoutMediaBlockInput>;
  create?: InputMaybe<AssetCreateWithoutMediaBlockInput>;
};

export type AssetCreateNestedOneWithoutQuestionBlockInput = {
  connect?: InputMaybe<AssetWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AssetCreateOrConnectWithoutQuestionBlockInput>;
  create?: InputMaybe<AssetCreateWithoutQuestionBlockInput>;
};

export type AssetCreateNestedOneWithoutQuestionMediaBlockInput = {
  connect?: InputMaybe<AssetWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AssetCreateOrConnectWithoutQuestionMediaBlockInput>;
  create?: InputMaybe<AssetCreateWithoutQuestionMediaBlockInput>;
};

export type AssetCreateNestedOneWithoutQuestionSelectionInput = {
  connect?: InputMaybe<AssetWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AssetCreateOrConnectWithoutQuestionSelectionInput>;
  create?: InputMaybe<AssetCreateWithoutQuestionSelectionInput>;
};

export type AssetCreateNestedOneWithoutTeacherBannerInput = {
  connect?: InputMaybe<AssetWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AssetCreateOrConnectWithoutTeacherBannerInput>;
  create?: InputMaybe<AssetCreateWithoutTeacherBannerInput>;
};

export type AssetCreateNestedOneWithoutTeacherPhotoInput = {
  connect?: InputMaybe<AssetWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AssetCreateOrConnectWithoutTeacherPhotoInput>;
  create?: InputMaybe<AssetCreateWithoutTeacherPhotoInput>;
};

export type AssetCreateNestedOneWithoutThumbnailCourseInput = {
  connect?: InputMaybe<AssetWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AssetCreateOrConnectWithoutThumbnailCourseInput>;
  create?: InputMaybe<AssetCreateWithoutThumbnailCourseInput>;
};

export type AssetCreateOrConnectWithoutAttachmentBlockInput = {
  create: AssetCreateWithoutAttachmentBlockInput;
  where: AssetWhereUniqueInput;
};

export type AssetCreateOrConnectWithoutAvatarImageInput = {
  create: AssetCreateWithoutAvatarImageInput;
  where: AssetWhereUniqueInput;
};

export type AssetCreateOrConnectWithoutAvatarItemsInput = {
  create: AssetCreateWithoutAvatarItemsInput;
  where: AssetWhereUniqueInput;
};

export type AssetCreateOrConnectWithoutBannerCourseInput = {
  create: AssetCreateWithoutBannerCourseInput;
  where: AssetWhereUniqueInput;
};

export type AssetCreateOrConnectWithoutChallengeInput = {
  create: AssetCreateWithoutChallengeInput;
  where: AssetWhereUniqueInput;
};

export type AssetCreateOrConnectWithoutCheckpointImageInput = {
  create: AssetCreateWithoutCheckpointImageInput;
  where: AssetWhereUniqueInput;
};

export type AssetCreateOrConnectWithoutForumPostInput = {
  create: AssetCreateWithoutForumPostInput;
  where: AssetWhereUniqueInput;
};

export type AssetCreateOrConnectWithoutMediaBlockInput = {
  create: AssetCreateWithoutMediaBlockInput;
  where: AssetWhereUniqueInput;
};

export type AssetCreateOrConnectWithoutQuestionBlockInput = {
  create: AssetCreateWithoutQuestionBlockInput;
  where: AssetWhereUniqueInput;
};

export type AssetCreateOrConnectWithoutQuestionMediaBlockInput = {
  create: AssetCreateWithoutQuestionMediaBlockInput;
  where: AssetWhereUniqueInput;
};

export type AssetCreateOrConnectWithoutQuestionSelectionInput = {
  create: AssetCreateWithoutQuestionSelectionInput;
  where: AssetWhereUniqueInput;
};

export type AssetCreateOrConnectWithoutSubtitlesInput = {
  create: AssetCreateWithoutSubtitlesInput;
  where: AssetWhereUniqueInput;
};

export type AssetCreateOrConnectWithoutTeacherBannerInput = {
  create: AssetCreateWithoutTeacherBannerInput;
  where: AssetWhereUniqueInput;
};

export type AssetCreateOrConnectWithoutTeacherPhotoInput = {
  create: AssetCreateWithoutTeacherPhotoInput;
  where: AssetWhereUniqueInput;
};

export type AssetCreateOrConnectWithoutThumbnailCourseInput = {
  create: AssetCreateWithoutThumbnailCourseInput;
  where: AssetWhereUniqueInput;
};

export type AssetCreateWithoutAttachmentBlockInput = {
  Subtitles?: InputMaybe<SubtitlesCreateNestedManyWithoutVideoInput>;
  avatarImage?: InputMaybe<StudentCreateNestedOneWithoutAvatarImageInput>;
  avatarItems?: InputMaybe<AvatarItemCreateNestedOneWithoutAssetInput>;
  bannerCourse?: InputMaybe<CourseCreateNestedOneWithoutBannersInput>;
  challenge?: InputMaybe<ChallengeCreateNestedOneWithoutAssetInput>;
  checkpointImage?: InputMaybe<CheckpointCreateNestedOneWithoutImageInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  fileType: FileType;
  forumPost?: InputMaybe<ForumPostCreateNestedOneWithoutAssetInput>;
  id?: InputMaybe<Scalars['String']>;
  mediaBlock?: InputMaybe<MediaBlockCreateNestedOneWithoutAssetInput>;
  name: Scalars['String'];
  questionBlock?: InputMaybe<QuestionBlockCreateNestedOneWithoutAssetInput>;
  questionMediaBlock?: InputMaybe<QuestionBlockCreateNestedOneWithoutMediaAssetInput>;
  questionSelection?: InputMaybe<QuestionSelectionCreateNestedOneWithoutAssetInput>;
  teacherBanner?: InputMaybe<TeacherCreateNestedOneWithoutBannerInput>;
  teacherPhoto?: InputMaybe<TeacherCreateNestedOneWithoutPhotoInput>;
  thumbnailCourse?: InputMaybe<CourseCreateNestedOneWithoutThumbnailInput>;
  updatedAt?: InputMaybe<Scalars['Date']>;
  url: Scalars['String'];
};

export type AssetCreateWithoutAvatarImageInput = {
  Subtitles?: InputMaybe<SubtitlesCreateNestedManyWithoutVideoInput>;
  attachmentBlock?: InputMaybe<AttachmentBlockCreateNestedOneWithoutAssetInput>;
  avatarItems?: InputMaybe<AvatarItemCreateNestedOneWithoutAssetInput>;
  bannerCourse?: InputMaybe<CourseCreateNestedOneWithoutBannersInput>;
  challenge?: InputMaybe<ChallengeCreateNestedOneWithoutAssetInput>;
  checkpointImage?: InputMaybe<CheckpointCreateNestedOneWithoutImageInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  fileType: FileType;
  forumPost?: InputMaybe<ForumPostCreateNestedOneWithoutAssetInput>;
  id?: InputMaybe<Scalars['String']>;
  mediaBlock?: InputMaybe<MediaBlockCreateNestedOneWithoutAssetInput>;
  name: Scalars['String'];
  questionBlock?: InputMaybe<QuestionBlockCreateNestedOneWithoutAssetInput>;
  questionMediaBlock?: InputMaybe<QuestionBlockCreateNestedOneWithoutMediaAssetInput>;
  questionSelection?: InputMaybe<QuestionSelectionCreateNestedOneWithoutAssetInput>;
  teacherBanner?: InputMaybe<TeacherCreateNestedOneWithoutBannerInput>;
  teacherPhoto?: InputMaybe<TeacherCreateNestedOneWithoutPhotoInput>;
  thumbnailCourse?: InputMaybe<CourseCreateNestedOneWithoutThumbnailInput>;
  updatedAt?: InputMaybe<Scalars['Date']>;
  url: Scalars['String'];
};

export type AssetCreateWithoutAvatarItemsInput = {
  Subtitles?: InputMaybe<SubtitlesCreateNestedManyWithoutVideoInput>;
  attachmentBlock?: InputMaybe<AttachmentBlockCreateNestedOneWithoutAssetInput>;
  avatarImage?: InputMaybe<StudentCreateNestedOneWithoutAvatarImageInput>;
  bannerCourse?: InputMaybe<CourseCreateNestedOneWithoutBannersInput>;
  challenge?: InputMaybe<ChallengeCreateNestedOneWithoutAssetInput>;
  checkpointImage?: InputMaybe<CheckpointCreateNestedOneWithoutImageInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  fileType: FileType;
  forumPost?: InputMaybe<ForumPostCreateNestedOneWithoutAssetInput>;
  id?: InputMaybe<Scalars['String']>;
  mediaBlock?: InputMaybe<MediaBlockCreateNestedOneWithoutAssetInput>;
  name: Scalars['String'];
  questionBlock?: InputMaybe<QuestionBlockCreateNestedOneWithoutAssetInput>;
  questionMediaBlock?: InputMaybe<QuestionBlockCreateNestedOneWithoutMediaAssetInput>;
  questionSelection?: InputMaybe<QuestionSelectionCreateNestedOneWithoutAssetInput>;
  teacherBanner?: InputMaybe<TeacherCreateNestedOneWithoutBannerInput>;
  teacherPhoto?: InputMaybe<TeacherCreateNestedOneWithoutPhotoInput>;
  thumbnailCourse?: InputMaybe<CourseCreateNestedOneWithoutThumbnailInput>;
  updatedAt?: InputMaybe<Scalars['Date']>;
  url: Scalars['String'];
};

export type AssetCreateWithoutBannerCourseInput = {
  Subtitles?: InputMaybe<SubtitlesCreateNestedManyWithoutVideoInput>;
  attachmentBlock?: InputMaybe<AttachmentBlockCreateNestedOneWithoutAssetInput>;
  avatarImage?: InputMaybe<StudentCreateNestedOneWithoutAvatarImageInput>;
  avatarItems?: InputMaybe<AvatarItemCreateNestedOneWithoutAssetInput>;
  challenge?: InputMaybe<ChallengeCreateNestedOneWithoutAssetInput>;
  checkpointImage?: InputMaybe<CheckpointCreateNestedOneWithoutImageInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  fileType: FileType;
  forumPost?: InputMaybe<ForumPostCreateNestedOneWithoutAssetInput>;
  id?: InputMaybe<Scalars['String']>;
  mediaBlock?: InputMaybe<MediaBlockCreateNestedOneWithoutAssetInput>;
  name: Scalars['String'];
  questionBlock?: InputMaybe<QuestionBlockCreateNestedOneWithoutAssetInput>;
  questionMediaBlock?: InputMaybe<QuestionBlockCreateNestedOneWithoutMediaAssetInput>;
  questionSelection?: InputMaybe<QuestionSelectionCreateNestedOneWithoutAssetInput>;
  teacherBanner?: InputMaybe<TeacherCreateNestedOneWithoutBannerInput>;
  teacherPhoto?: InputMaybe<TeacherCreateNestedOneWithoutPhotoInput>;
  thumbnailCourse?: InputMaybe<CourseCreateNestedOneWithoutThumbnailInput>;
  updatedAt?: InputMaybe<Scalars['Date']>;
  url: Scalars['String'];
};

export type AssetCreateWithoutChallengeInput = {
  Subtitles?: InputMaybe<SubtitlesCreateNestedManyWithoutVideoInput>;
  attachmentBlock?: InputMaybe<AttachmentBlockCreateNestedOneWithoutAssetInput>;
  avatarImage?: InputMaybe<StudentCreateNestedOneWithoutAvatarImageInput>;
  avatarItems?: InputMaybe<AvatarItemCreateNestedOneWithoutAssetInput>;
  bannerCourse?: InputMaybe<CourseCreateNestedOneWithoutBannersInput>;
  checkpointImage?: InputMaybe<CheckpointCreateNestedOneWithoutImageInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  fileType: FileType;
  forumPost?: InputMaybe<ForumPostCreateNestedOneWithoutAssetInput>;
  id?: InputMaybe<Scalars['String']>;
  mediaBlock?: InputMaybe<MediaBlockCreateNestedOneWithoutAssetInput>;
  name: Scalars['String'];
  questionBlock?: InputMaybe<QuestionBlockCreateNestedOneWithoutAssetInput>;
  questionMediaBlock?: InputMaybe<QuestionBlockCreateNestedOneWithoutMediaAssetInput>;
  questionSelection?: InputMaybe<QuestionSelectionCreateNestedOneWithoutAssetInput>;
  teacherBanner?: InputMaybe<TeacherCreateNestedOneWithoutBannerInput>;
  teacherPhoto?: InputMaybe<TeacherCreateNestedOneWithoutPhotoInput>;
  thumbnailCourse?: InputMaybe<CourseCreateNestedOneWithoutThumbnailInput>;
  updatedAt?: InputMaybe<Scalars['Date']>;
  url: Scalars['String'];
};

export type AssetCreateWithoutCheckpointImageInput = {
  Subtitles?: InputMaybe<SubtitlesCreateNestedManyWithoutVideoInput>;
  attachmentBlock?: InputMaybe<AttachmentBlockCreateNestedOneWithoutAssetInput>;
  avatarImage?: InputMaybe<StudentCreateNestedOneWithoutAvatarImageInput>;
  avatarItems?: InputMaybe<AvatarItemCreateNestedOneWithoutAssetInput>;
  bannerCourse?: InputMaybe<CourseCreateNestedOneWithoutBannersInput>;
  challenge?: InputMaybe<ChallengeCreateNestedOneWithoutAssetInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  fileType: FileType;
  forumPost?: InputMaybe<ForumPostCreateNestedOneWithoutAssetInput>;
  id?: InputMaybe<Scalars['String']>;
  mediaBlock?: InputMaybe<MediaBlockCreateNestedOneWithoutAssetInput>;
  name: Scalars['String'];
  questionBlock?: InputMaybe<QuestionBlockCreateNestedOneWithoutAssetInput>;
  questionMediaBlock?: InputMaybe<QuestionBlockCreateNestedOneWithoutMediaAssetInput>;
  questionSelection?: InputMaybe<QuestionSelectionCreateNestedOneWithoutAssetInput>;
  teacherBanner?: InputMaybe<TeacherCreateNestedOneWithoutBannerInput>;
  teacherPhoto?: InputMaybe<TeacherCreateNestedOneWithoutPhotoInput>;
  thumbnailCourse?: InputMaybe<CourseCreateNestedOneWithoutThumbnailInput>;
  updatedAt?: InputMaybe<Scalars['Date']>;
  url: Scalars['String'];
};

export type AssetCreateWithoutForumPostInput = {
  Subtitles?: InputMaybe<SubtitlesCreateNestedManyWithoutVideoInput>;
  attachmentBlock?: InputMaybe<AttachmentBlockCreateNestedOneWithoutAssetInput>;
  avatarImage?: InputMaybe<StudentCreateNestedOneWithoutAvatarImageInput>;
  avatarItems?: InputMaybe<AvatarItemCreateNestedOneWithoutAssetInput>;
  bannerCourse?: InputMaybe<CourseCreateNestedOneWithoutBannersInput>;
  challenge?: InputMaybe<ChallengeCreateNestedOneWithoutAssetInput>;
  checkpointImage?: InputMaybe<CheckpointCreateNestedOneWithoutImageInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  fileType: FileType;
  id?: InputMaybe<Scalars['String']>;
  mediaBlock?: InputMaybe<MediaBlockCreateNestedOneWithoutAssetInput>;
  name: Scalars['String'];
  questionBlock?: InputMaybe<QuestionBlockCreateNestedOneWithoutAssetInput>;
  questionMediaBlock?: InputMaybe<QuestionBlockCreateNestedOneWithoutMediaAssetInput>;
  questionSelection?: InputMaybe<QuestionSelectionCreateNestedOneWithoutAssetInput>;
  teacherBanner?: InputMaybe<TeacherCreateNestedOneWithoutBannerInput>;
  teacherPhoto?: InputMaybe<TeacherCreateNestedOneWithoutPhotoInput>;
  thumbnailCourse?: InputMaybe<CourseCreateNestedOneWithoutThumbnailInput>;
  updatedAt?: InputMaybe<Scalars['Date']>;
  url: Scalars['String'];
};

export type AssetCreateWithoutMediaBlockInput = {
  Subtitles?: InputMaybe<SubtitlesCreateNestedManyWithoutVideoInput>;
  attachmentBlock?: InputMaybe<AttachmentBlockCreateNestedOneWithoutAssetInput>;
  avatarImage?: InputMaybe<StudentCreateNestedOneWithoutAvatarImageInput>;
  avatarItems?: InputMaybe<AvatarItemCreateNestedOneWithoutAssetInput>;
  bannerCourse?: InputMaybe<CourseCreateNestedOneWithoutBannersInput>;
  challenge?: InputMaybe<ChallengeCreateNestedOneWithoutAssetInput>;
  checkpointImage?: InputMaybe<CheckpointCreateNestedOneWithoutImageInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  fileType: FileType;
  forumPost?: InputMaybe<ForumPostCreateNestedOneWithoutAssetInput>;
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  questionBlock?: InputMaybe<QuestionBlockCreateNestedOneWithoutAssetInput>;
  questionMediaBlock?: InputMaybe<QuestionBlockCreateNestedOneWithoutMediaAssetInput>;
  questionSelection?: InputMaybe<QuestionSelectionCreateNestedOneWithoutAssetInput>;
  teacherBanner?: InputMaybe<TeacherCreateNestedOneWithoutBannerInput>;
  teacherPhoto?: InputMaybe<TeacherCreateNestedOneWithoutPhotoInput>;
  thumbnailCourse?: InputMaybe<CourseCreateNestedOneWithoutThumbnailInput>;
  updatedAt?: InputMaybe<Scalars['Date']>;
  url: Scalars['String'];
};

export type AssetCreateWithoutQuestionBlockInput = {
  Subtitles?: InputMaybe<SubtitlesCreateNestedManyWithoutVideoInput>;
  attachmentBlock?: InputMaybe<AttachmentBlockCreateNestedOneWithoutAssetInput>;
  avatarImage?: InputMaybe<StudentCreateNestedOneWithoutAvatarImageInput>;
  avatarItems?: InputMaybe<AvatarItemCreateNestedOneWithoutAssetInput>;
  bannerCourse?: InputMaybe<CourseCreateNestedOneWithoutBannersInput>;
  challenge?: InputMaybe<ChallengeCreateNestedOneWithoutAssetInput>;
  checkpointImage?: InputMaybe<CheckpointCreateNestedOneWithoutImageInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  fileType: FileType;
  forumPost?: InputMaybe<ForumPostCreateNestedOneWithoutAssetInput>;
  id?: InputMaybe<Scalars['String']>;
  mediaBlock?: InputMaybe<MediaBlockCreateNestedOneWithoutAssetInput>;
  name: Scalars['String'];
  questionMediaBlock?: InputMaybe<QuestionBlockCreateNestedOneWithoutMediaAssetInput>;
  questionSelection?: InputMaybe<QuestionSelectionCreateNestedOneWithoutAssetInput>;
  teacherBanner?: InputMaybe<TeacherCreateNestedOneWithoutBannerInput>;
  teacherPhoto?: InputMaybe<TeacherCreateNestedOneWithoutPhotoInput>;
  thumbnailCourse?: InputMaybe<CourseCreateNestedOneWithoutThumbnailInput>;
  updatedAt?: InputMaybe<Scalars['Date']>;
  url: Scalars['String'];
};

export type AssetCreateWithoutQuestionMediaBlockInput = {
  Subtitles?: InputMaybe<SubtitlesCreateNestedManyWithoutVideoInput>;
  attachmentBlock?: InputMaybe<AttachmentBlockCreateNestedOneWithoutAssetInput>;
  avatarImage?: InputMaybe<StudentCreateNestedOneWithoutAvatarImageInput>;
  avatarItems?: InputMaybe<AvatarItemCreateNestedOneWithoutAssetInput>;
  bannerCourse?: InputMaybe<CourseCreateNestedOneWithoutBannersInput>;
  challenge?: InputMaybe<ChallengeCreateNestedOneWithoutAssetInput>;
  checkpointImage?: InputMaybe<CheckpointCreateNestedOneWithoutImageInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  fileType: FileType;
  forumPost?: InputMaybe<ForumPostCreateNestedOneWithoutAssetInput>;
  id?: InputMaybe<Scalars['String']>;
  mediaBlock?: InputMaybe<MediaBlockCreateNestedOneWithoutAssetInput>;
  name: Scalars['String'];
  questionBlock?: InputMaybe<QuestionBlockCreateNestedOneWithoutAssetInput>;
  questionSelection?: InputMaybe<QuestionSelectionCreateNestedOneWithoutAssetInput>;
  teacherBanner?: InputMaybe<TeacherCreateNestedOneWithoutBannerInput>;
  teacherPhoto?: InputMaybe<TeacherCreateNestedOneWithoutPhotoInput>;
  thumbnailCourse?: InputMaybe<CourseCreateNestedOneWithoutThumbnailInput>;
  updatedAt?: InputMaybe<Scalars['Date']>;
  url: Scalars['String'];
};

export type AssetCreateWithoutQuestionSelectionInput = {
  Subtitles?: InputMaybe<SubtitlesCreateNestedManyWithoutVideoInput>;
  attachmentBlock?: InputMaybe<AttachmentBlockCreateNestedOneWithoutAssetInput>;
  avatarImage?: InputMaybe<StudentCreateNestedOneWithoutAvatarImageInput>;
  avatarItems?: InputMaybe<AvatarItemCreateNestedOneWithoutAssetInput>;
  bannerCourse?: InputMaybe<CourseCreateNestedOneWithoutBannersInput>;
  challenge?: InputMaybe<ChallengeCreateNestedOneWithoutAssetInput>;
  checkpointImage?: InputMaybe<CheckpointCreateNestedOneWithoutImageInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  fileType: FileType;
  forumPost?: InputMaybe<ForumPostCreateNestedOneWithoutAssetInput>;
  id?: InputMaybe<Scalars['String']>;
  mediaBlock?: InputMaybe<MediaBlockCreateNestedOneWithoutAssetInput>;
  name: Scalars['String'];
  questionBlock?: InputMaybe<QuestionBlockCreateNestedOneWithoutAssetInput>;
  questionMediaBlock?: InputMaybe<QuestionBlockCreateNestedOneWithoutMediaAssetInput>;
  teacherBanner?: InputMaybe<TeacherCreateNestedOneWithoutBannerInput>;
  teacherPhoto?: InputMaybe<TeacherCreateNestedOneWithoutPhotoInput>;
  thumbnailCourse?: InputMaybe<CourseCreateNestedOneWithoutThumbnailInput>;
  updatedAt?: InputMaybe<Scalars['Date']>;
  url: Scalars['String'];
};

export type AssetCreateWithoutSubtitlesInput = {
  attachmentBlock?: InputMaybe<AttachmentBlockCreateNestedOneWithoutAssetInput>;
  avatarImage?: InputMaybe<StudentCreateNestedOneWithoutAvatarImageInput>;
  avatarItems?: InputMaybe<AvatarItemCreateNestedOneWithoutAssetInput>;
  bannerCourse?: InputMaybe<CourseCreateNestedOneWithoutBannersInput>;
  challenge?: InputMaybe<ChallengeCreateNestedOneWithoutAssetInput>;
  checkpointImage?: InputMaybe<CheckpointCreateNestedOneWithoutImageInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  fileType: FileType;
  forumPost?: InputMaybe<ForumPostCreateNestedOneWithoutAssetInput>;
  id?: InputMaybe<Scalars['String']>;
  mediaBlock?: InputMaybe<MediaBlockCreateNestedOneWithoutAssetInput>;
  name: Scalars['String'];
  questionBlock?: InputMaybe<QuestionBlockCreateNestedOneWithoutAssetInput>;
  questionMediaBlock?: InputMaybe<QuestionBlockCreateNestedOneWithoutMediaAssetInput>;
  questionSelection?: InputMaybe<QuestionSelectionCreateNestedOneWithoutAssetInput>;
  teacherBanner?: InputMaybe<TeacherCreateNestedOneWithoutBannerInput>;
  teacherPhoto?: InputMaybe<TeacherCreateNestedOneWithoutPhotoInput>;
  thumbnailCourse?: InputMaybe<CourseCreateNestedOneWithoutThumbnailInput>;
  updatedAt?: InputMaybe<Scalars['Date']>;
  url: Scalars['String'];
};

export type AssetCreateWithoutTeacherBannerInput = {
  Subtitles?: InputMaybe<SubtitlesCreateNestedManyWithoutVideoInput>;
  attachmentBlock?: InputMaybe<AttachmentBlockCreateNestedOneWithoutAssetInput>;
  avatarImage?: InputMaybe<StudentCreateNestedOneWithoutAvatarImageInput>;
  avatarItems?: InputMaybe<AvatarItemCreateNestedOneWithoutAssetInput>;
  bannerCourse?: InputMaybe<CourseCreateNestedOneWithoutBannersInput>;
  challenge?: InputMaybe<ChallengeCreateNestedOneWithoutAssetInput>;
  checkpointImage?: InputMaybe<CheckpointCreateNestedOneWithoutImageInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  fileType: FileType;
  forumPost?: InputMaybe<ForumPostCreateNestedOneWithoutAssetInput>;
  id?: InputMaybe<Scalars['String']>;
  mediaBlock?: InputMaybe<MediaBlockCreateNestedOneWithoutAssetInput>;
  name: Scalars['String'];
  questionBlock?: InputMaybe<QuestionBlockCreateNestedOneWithoutAssetInput>;
  questionMediaBlock?: InputMaybe<QuestionBlockCreateNestedOneWithoutMediaAssetInput>;
  questionSelection?: InputMaybe<QuestionSelectionCreateNestedOneWithoutAssetInput>;
  teacherPhoto?: InputMaybe<TeacherCreateNestedOneWithoutPhotoInput>;
  thumbnailCourse?: InputMaybe<CourseCreateNestedOneWithoutThumbnailInput>;
  updatedAt?: InputMaybe<Scalars['Date']>;
  url: Scalars['String'];
};

export type AssetCreateWithoutTeacherPhotoInput = {
  Subtitles?: InputMaybe<SubtitlesCreateNestedManyWithoutVideoInput>;
  attachmentBlock?: InputMaybe<AttachmentBlockCreateNestedOneWithoutAssetInput>;
  avatarImage?: InputMaybe<StudentCreateNestedOneWithoutAvatarImageInput>;
  avatarItems?: InputMaybe<AvatarItemCreateNestedOneWithoutAssetInput>;
  bannerCourse?: InputMaybe<CourseCreateNestedOneWithoutBannersInput>;
  challenge?: InputMaybe<ChallengeCreateNestedOneWithoutAssetInput>;
  checkpointImage?: InputMaybe<CheckpointCreateNestedOneWithoutImageInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  fileType: FileType;
  forumPost?: InputMaybe<ForumPostCreateNestedOneWithoutAssetInput>;
  id?: InputMaybe<Scalars['String']>;
  mediaBlock?: InputMaybe<MediaBlockCreateNestedOneWithoutAssetInput>;
  name: Scalars['String'];
  questionBlock?: InputMaybe<QuestionBlockCreateNestedOneWithoutAssetInput>;
  questionMediaBlock?: InputMaybe<QuestionBlockCreateNestedOneWithoutMediaAssetInput>;
  questionSelection?: InputMaybe<QuestionSelectionCreateNestedOneWithoutAssetInput>;
  teacherBanner?: InputMaybe<TeacherCreateNestedOneWithoutBannerInput>;
  thumbnailCourse?: InputMaybe<CourseCreateNestedOneWithoutThumbnailInput>;
  updatedAt?: InputMaybe<Scalars['Date']>;
  url: Scalars['String'];
};

export type AssetCreateWithoutThumbnailCourseInput = {
  Subtitles?: InputMaybe<SubtitlesCreateNestedManyWithoutVideoInput>;
  attachmentBlock?: InputMaybe<AttachmentBlockCreateNestedOneWithoutAssetInput>;
  avatarImage?: InputMaybe<StudentCreateNestedOneWithoutAvatarImageInput>;
  avatarItems?: InputMaybe<AvatarItemCreateNestedOneWithoutAssetInput>;
  bannerCourse?: InputMaybe<CourseCreateNestedOneWithoutBannersInput>;
  challenge?: InputMaybe<ChallengeCreateNestedOneWithoutAssetInput>;
  checkpointImage?: InputMaybe<CheckpointCreateNestedOneWithoutImageInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  fileType: FileType;
  forumPost?: InputMaybe<ForumPostCreateNestedOneWithoutAssetInput>;
  id?: InputMaybe<Scalars['String']>;
  mediaBlock?: InputMaybe<MediaBlockCreateNestedOneWithoutAssetInput>;
  name: Scalars['String'];
  questionBlock?: InputMaybe<QuestionBlockCreateNestedOneWithoutAssetInput>;
  questionMediaBlock?: InputMaybe<QuestionBlockCreateNestedOneWithoutMediaAssetInput>;
  questionSelection?: InputMaybe<QuestionSelectionCreateNestedOneWithoutAssetInput>;
  teacherBanner?: InputMaybe<TeacherCreateNestedOneWithoutBannerInput>;
  teacherPhoto?: InputMaybe<TeacherCreateNestedOneWithoutPhotoInput>;
  updatedAt?: InputMaybe<Scalars['Date']>;
  url: Scalars['String'];
};

export type AssetListRelationFilter = {
  every?: InputMaybe<AssetWhereInput>;
  none?: InputMaybe<AssetWhereInput>;
  some?: InputMaybe<AssetWhereInput>;
};

export type AssetOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export enum AssetOrderByRelevanceFieldEnum {
  CourseId = 'courseId',
  ForumPostId = 'forumPostId',
  Id = 'id',
  Name = 'name',
  Url = 'url'
}

export type AssetOrderByRelevanceInput = {
  fields: Array<AssetOrderByRelevanceFieldEnum>;
  search: Scalars['String'];
  sort: SortOrder;
};

export type AssetOrderByWithRelationAndSearchRelevanceInput = {
  Subtitles?: InputMaybe<SubtitlesOrderByRelationAggregateInput>;
  _relevance?: InputMaybe<AssetOrderByRelevanceInput>;
  attachmentBlock?: InputMaybe<AttachmentBlockOrderByWithRelationAndSearchRelevanceInput>;
  avatarImage?: InputMaybe<StudentOrderByWithRelationAndSearchRelevanceInput>;
  avatarItems?: InputMaybe<AvatarItemOrderByWithRelationAndSearchRelevanceInput>;
  bannerCourse?: InputMaybe<CourseOrderByWithRelationAndSearchRelevanceInput>;
  challenge?: InputMaybe<ChallengeOrderByWithRelationAndSearchRelevanceInput>;
  checkpointImage?: InputMaybe<CheckpointOrderByWithRelationAndSearchRelevanceInput>;
  courseId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  fileType?: InputMaybe<SortOrder>;
  forumPost?: InputMaybe<ForumPostOrderByWithRelationAndSearchRelevanceInput>;
  forumPostId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  mediaBlock?: InputMaybe<MediaBlockOrderByWithRelationAndSearchRelevanceInput>;
  name?: InputMaybe<SortOrder>;
  questionBlock?: InputMaybe<QuestionBlockOrderByWithRelationAndSearchRelevanceInput>;
  questionMediaBlock?: InputMaybe<QuestionBlockOrderByWithRelationAndSearchRelevanceInput>;
  questionSelection?: InputMaybe<QuestionSelectionOrderByWithRelationAndSearchRelevanceInput>;
  teacherBanner?: InputMaybe<TeacherOrderByWithRelationAndSearchRelevanceInput>;
  teacherPhoto?: InputMaybe<TeacherOrderByWithRelationAndSearchRelevanceInput>;
  thumbnailCourse?: InputMaybe<CourseOrderByWithRelationAndSearchRelevanceInput>;
  updatedAt?: InputMaybe<SortOrder>;
  url?: InputMaybe<SortOrder>;
};

export type AssetRelationFilter = {
  is?: InputMaybe<AssetWhereInput>;
  isNot?: InputMaybe<AssetWhereInput>;
};

export type AssetScalarWhereInput = {
  AND?: InputMaybe<Array<AssetScalarWhereInput>>;
  NOT?: InputMaybe<Array<AssetScalarWhereInput>>;
  OR?: InputMaybe<Array<AssetScalarWhereInput>>;
  courseId?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  fileType?: InputMaybe<EnumFileTypeFilter>;
  forumPostId?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  url?: InputMaybe<StringFilter>;
};

export type AssetUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  fileType?: InputMaybe<EnumFileTypeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  url?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type AssetUpdateManyWithWhereWithoutBannerCourseInput = {
  data: AssetUpdateManyMutationInput;
  where: AssetScalarWhereInput;
};

export type AssetUpdateManyWithWhereWithoutForumPostInput = {
  data: AssetUpdateManyMutationInput;
  where: AssetScalarWhereInput;
};

export type AssetUpdateManyWithoutBannerCourseInput = {
  connect?: InputMaybe<Array<AssetWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AssetCreateOrConnectWithoutBannerCourseInput>>;
  create?: InputMaybe<Array<AssetCreateWithoutBannerCourseInput>>;
  createMany?: InputMaybe<AssetCreateManyBannerCourseInputEnvelope>;
  delete?: InputMaybe<Array<AssetWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<AssetScalarWhereInput>>;
  disconnect?: InputMaybe<Array<AssetWhereUniqueInput>>;
  set?: InputMaybe<Array<AssetWhereUniqueInput>>;
  update?: InputMaybe<Array<AssetUpdateWithWhereUniqueWithoutBannerCourseInput>>;
  updateMany?: InputMaybe<Array<AssetUpdateManyWithWhereWithoutBannerCourseInput>>;
  upsert?: InputMaybe<Array<AssetUpsertWithWhereUniqueWithoutBannerCourseInput>>;
};

export type AssetUpdateManyWithoutForumPostInput = {
  connect?: InputMaybe<Array<AssetWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AssetCreateOrConnectWithoutForumPostInput>>;
  create?: InputMaybe<Array<AssetCreateWithoutForumPostInput>>;
  createMany?: InputMaybe<AssetCreateManyForumPostInputEnvelope>;
  delete?: InputMaybe<Array<AssetWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<AssetScalarWhereInput>>;
  disconnect?: InputMaybe<Array<AssetWhereUniqueInput>>;
  set?: InputMaybe<Array<AssetWhereUniqueInput>>;
  update?: InputMaybe<Array<AssetUpdateWithWhereUniqueWithoutForumPostInput>>;
  updateMany?: InputMaybe<Array<AssetUpdateManyWithWhereWithoutForumPostInput>>;
  upsert?: InputMaybe<Array<AssetUpsertWithWhereUniqueWithoutForumPostInput>>;
};

export type AssetUpdateOneRequiredWithoutAvatarItemsInput = {
  connect?: InputMaybe<AssetWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AssetCreateOrConnectWithoutAvatarItemsInput>;
  create?: InputMaybe<AssetCreateWithoutAvatarItemsInput>;
  update?: InputMaybe<AssetUpdateWithoutAvatarItemsInput>;
  upsert?: InputMaybe<AssetUpsertWithoutAvatarItemsInput>;
};

export type AssetUpdateOneRequiredWithoutChallengeInput = {
  connect?: InputMaybe<AssetWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AssetCreateOrConnectWithoutChallengeInput>;
  create?: InputMaybe<AssetCreateWithoutChallengeInput>;
  update?: InputMaybe<AssetUpdateWithoutChallengeInput>;
  upsert?: InputMaybe<AssetUpsertWithoutChallengeInput>;
};

export type AssetUpdateOneRequiredWithoutSubtitlesInput = {
  connect?: InputMaybe<AssetWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AssetCreateOrConnectWithoutSubtitlesInput>;
  create?: InputMaybe<AssetCreateWithoutSubtitlesInput>;
  update?: InputMaybe<AssetUpdateWithoutSubtitlesInput>;
  upsert?: InputMaybe<AssetUpsertWithoutSubtitlesInput>;
};

export type AssetUpdateOneWithoutAttachmentBlockInput = {
  connect?: InputMaybe<AssetWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AssetCreateOrConnectWithoutAttachmentBlockInput>;
  create?: InputMaybe<AssetCreateWithoutAttachmentBlockInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<AssetUpdateWithoutAttachmentBlockInput>;
  upsert?: InputMaybe<AssetUpsertWithoutAttachmentBlockInput>;
};

export type AssetUpdateOneWithoutAvatarImageInput = {
  connect?: InputMaybe<AssetWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AssetCreateOrConnectWithoutAvatarImageInput>;
  create?: InputMaybe<AssetCreateWithoutAvatarImageInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<AssetUpdateWithoutAvatarImageInput>;
  upsert?: InputMaybe<AssetUpsertWithoutAvatarImageInput>;
};

export type AssetUpdateOneWithoutCheckpointImageInput = {
  connect?: InputMaybe<AssetWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AssetCreateOrConnectWithoutCheckpointImageInput>;
  create?: InputMaybe<AssetCreateWithoutCheckpointImageInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<AssetUpdateWithoutCheckpointImageInput>;
  upsert?: InputMaybe<AssetUpsertWithoutCheckpointImageInput>;
};

export type AssetUpdateOneWithoutMediaBlockInput = {
  connect?: InputMaybe<AssetWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AssetCreateOrConnectWithoutMediaBlockInput>;
  create?: InputMaybe<AssetCreateWithoutMediaBlockInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<AssetUpdateWithoutMediaBlockInput>;
  upsert?: InputMaybe<AssetUpsertWithoutMediaBlockInput>;
};

export type AssetUpdateOneWithoutQuestionBlockInput = {
  connect?: InputMaybe<AssetWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AssetCreateOrConnectWithoutQuestionBlockInput>;
  create?: InputMaybe<AssetCreateWithoutQuestionBlockInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<AssetUpdateWithoutQuestionBlockInput>;
  upsert?: InputMaybe<AssetUpsertWithoutQuestionBlockInput>;
};

export type AssetUpdateOneWithoutQuestionMediaBlockInput = {
  connect?: InputMaybe<AssetWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AssetCreateOrConnectWithoutQuestionMediaBlockInput>;
  create?: InputMaybe<AssetCreateWithoutQuestionMediaBlockInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<AssetUpdateWithoutQuestionMediaBlockInput>;
  upsert?: InputMaybe<AssetUpsertWithoutQuestionMediaBlockInput>;
};

export type AssetUpdateOneWithoutQuestionSelectionInput = {
  connect?: InputMaybe<AssetWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AssetCreateOrConnectWithoutQuestionSelectionInput>;
  create?: InputMaybe<AssetCreateWithoutQuestionSelectionInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<AssetUpdateWithoutQuestionSelectionInput>;
  upsert?: InputMaybe<AssetUpsertWithoutQuestionSelectionInput>;
};

export type AssetUpdateOneWithoutTeacherBannerInput = {
  connect?: InputMaybe<AssetWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AssetCreateOrConnectWithoutTeacherBannerInput>;
  create?: InputMaybe<AssetCreateWithoutTeacherBannerInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<AssetUpdateWithoutTeacherBannerInput>;
  upsert?: InputMaybe<AssetUpsertWithoutTeacherBannerInput>;
};

export type AssetUpdateOneWithoutTeacherPhotoInput = {
  connect?: InputMaybe<AssetWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AssetCreateOrConnectWithoutTeacherPhotoInput>;
  create?: InputMaybe<AssetCreateWithoutTeacherPhotoInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<AssetUpdateWithoutTeacherPhotoInput>;
  upsert?: InputMaybe<AssetUpsertWithoutTeacherPhotoInput>;
};

export type AssetUpdateOneWithoutThumbnailCourseInput = {
  connect?: InputMaybe<AssetWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AssetCreateOrConnectWithoutThumbnailCourseInput>;
  create?: InputMaybe<AssetCreateWithoutThumbnailCourseInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<AssetUpdateWithoutThumbnailCourseInput>;
  upsert?: InputMaybe<AssetUpsertWithoutThumbnailCourseInput>;
};

export type AssetUpdateWithWhereUniqueWithoutBannerCourseInput = {
  data: AssetUpdateWithoutBannerCourseInput;
  where: AssetWhereUniqueInput;
};

export type AssetUpdateWithWhereUniqueWithoutForumPostInput = {
  data: AssetUpdateWithoutForumPostInput;
  where: AssetWhereUniqueInput;
};

export type AssetUpdateWithoutAttachmentBlockInput = {
  Subtitles?: InputMaybe<SubtitlesUpdateManyWithoutVideoInput>;
  avatarImage?: InputMaybe<StudentUpdateOneWithoutAvatarImageInput>;
  avatarItems?: InputMaybe<AvatarItemUpdateOneWithoutAssetInput>;
  bannerCourse?: InputMaybe<CourseUpdateOneWithoutBannersInput>;
  challenge?: InputMaybe<ChallengeUpdateOneWithoutAssetInput>;
  checkpointImage?: InputMaybe<CheckpointUpdateOneWithoutImageInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  fileType?: InputMaybe<EnumFileTypeFieldUpdateOperationsInput>;
  forumPost?: InputMaybe<ForumPostUpdateOneWithoutAssetInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  mediaBlock?: InputMaybe<MediaBlockUpdateOneWithoutAssetInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  questionBlock?: InputMaybe<QuestionBlockUpdateOneWithoutAssetInput>;
  questionMediaBlock?: InputMaybe<QuestionBlockUpdateOneWithoutMediaAssetInput>;
  questionSelection?: InputMaybe<QuestionSelectionUpdateOneWithoutAssetInput>;
  teacherBanner?: InputMaybe<TeacherUpdateOneWithoutBannerInput>;
  teacherPhoto?: InputMaybe<TeacherUpdateOneWithoutPhotoInput>;
  thumbnailCourse?: InputMaybe<CourseUpdateOneWithoutThumbnailInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  url?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type AssetUpdateWithoutAvatarImageInput = {
  Subtitles?: InputMaybe<SubtitlesUpdateManyWithoutVideoInput>;
  attachmentBlock?: InputMaybe<AttachmentBlockUpdateOneWithoutAssetInput>;
  avatarItems?: InputMaybe<AvatarItemUpdateOneWithoutAssetInput>;
  bannerCourse?: InputMaybe<CourseUpdateOneWithoutBannersInput>;
  challenge?: InputMaybe<ChallengeUpdateOneWithoutAssetInput>;
  checkpointImage?: InputMaybe<CheckpointUpdateOneWithoutImageInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  fileType?: InputMaybe<EnumFileTypeFieldUpdateOperationsInput>;
  forumPost?: InputMaybe<ForumPostUpdateOneWithoutAssetInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  mediaBlock?: InputMaybe<MediaBlockUpdateOneWithoutAssetInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  questionBlock?: InputMaybe<QuestionBlockUpdateOneWithoutAssetInput>;
  questionMediaBlock?: InputMaybe<QuestionBlockUpdateOneWithoutMediaAssetInput>;
  questionSelection?: InputMaybe<QuestionSelectionUpdateOneWithoutAssetInput>;
  teacherBanner?: InputMaybe<TeacherUpdateOneWithoutBannerInput>;
  teacherPhoto?: InputMaybe<TeacherUpdateOneWithoutPhotoInput>;
  thumbnailCourse?: InputMaybe<CourseUpdateOneWithoutThumbnailInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  url?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type AssetUpdateWithoutAvatarItemsInput = {
  Subtitles?: InputMaybe<SubtitlesUpdateManyWithoutVideoInput>;
  attachmentBlock?: InputMaybe<AttachmentBlockUpdateOneWithoutAssetInput>;
  avatarImage?: InputMaybe<StudentUpdateOneWithoutAvatarImageInput>;
  bannerCourse?: InputMaybe<CourseUpdateOneWithoutBannersInput>;
  challenge?: InputMaybe<ChallengeUpdateOneWithoutAssetInput>;
  checkpointImage?: InputMaybe<CheckpointUpdateOneWithoutImageInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  fileType?: InputMaybe<EnumFileTypeFieldUpdateOperationsInput>;
  forumPost?: InputMaybe<ForumPostUpdateOneWithoutAssetInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  mediaBlock?: InputMaybe<MediaBlockUpdateOneWithoutAssetInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  questionBlock?: InputMaybe<QuestionBlockUpdateOneWithoutAssetInput>;
  questionMediaBlock?: InputMaybe<QuestionBlockUpdateOneWithoutMediaAssetInput>;
  questionSelection?: InputMaybe<QuestionSelectionUpdateOneWithoutAssetInput>;
  teacherBanner?: InputMaybe<TeacherUpdateOneWithoutBannerInput>;
  teacherPhoto?: InputMaybe<TeacherUpdateOneWithoutPhotoInput>;
  thumbnailCourse?: InputMaybe<CourseUpdateOneWithoutThumbnailInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  url?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type AssetUpdateWithoutBannerCourseInput = {
  Subtitles?: InputMaybe<SubtitlesUpdateManyWithoutVideoInput>;
  attachmentBlock?: InputMaybe<AttachmentBlockUpdateOneWithoutAssetInput>;
  avatarImage?: InputMaybe<StudentUpdateOneWithoutAvatarImageInput>;
  avatarItems?: InputMaybe<AvatarItemUpdateOneWithoutAssetInput>;
  challenge?: InputMaybe<ChallengeUpdateOneWithoutAssetInput>;
  checkpointImage?: InputMaybe<CheckpointUpdateOneWithoutImageInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  fileType?: InputMaybe<EnumFileTypeFieldUpdateOperationsInput>;
  forumPost?: InputMaybe<ForumPostUpdateOneWithoutAssetInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  mediaBlock?: InputMaybe<MediaBlockUpdateOneWithoutAssetInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  questionBlock?: InputMaybe<QuestionBlockUpdateOneWithoutAssetInput>;
  questionMediaBlock?: InputMaybe<QuestionBlockUpdateOneWithoutMediaAssetInput>;
  questionSelection?: InputMaybe<QuestionSelectionUpdateOneWithoutAssetInput>;
  teacherBanner?: InputMaybe<TeacherUpdateOneWithoutBannerInput>;
  teacherPhoto?: InputMaybe<TeacherUpdateOneWithoutPhotoInput>;
  thumbnailCourse?: InputMaybe<CourseUpdateOneWithoutThumbnailInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  url?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type AssetUpdateWithoutChallengeInput = {
  Subtitles?: InputMaybe<SubtitlesUpdateManyWithoutVideoInput>;
  attachmentBlock?: InputMaybe<AttachmentBlockUpdateOneWithoutAssetInput>;
  avatarImage?: InputMaybe<StudentUpdateOneWithoutAvatarImageInput>;
  avatarItems?: InputMaybe<AvatarItemUpdateOneWithoutAssetInput>;
  bannerCourse?: InputMaybe<CourseUpdateOneWithoutBannersInput>;
  checkpointImage?: InputMaybe<CheckpointUpdateOneWithoutImageInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  fileType?: InputMaybe<EnumFileTypeFieldUpdateOperationsInput>;
  forumPost?: InputMaybe<ForumPostUpdateOneWithoutAssetInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  mediaBlock?: InputMaybe<MediaBlockUpdateOneWithoutAssetInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  questionBlock?: InputMaybe<QuestionBlockUpdateOneWithoutAssetInput>;
  questionMediaBlock?: InputMaybe<QuestionBlockUpdateOneWithoutMediaAssetInput>;
  questionSelection?: InputMaybe<QuestionSelectionUpdateOneWithoutAssetInput>;
  teacherBanner?: InputMaybe<TeacherUpdateOneWithoutBannerInput>;
  teacherPhoto?: InputMaybe<TeacherUpdateOneWithoutPhotoInput>;
  thumbnailCourse?: InputMaybe<CourseUpdateOneWithoutThumbnailInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  url?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type AssetUpdateWithoutCheckpointImageInput = {
  Subtitles?: InputMaybe<SubtitlesUpdateManyWithoutVideoInput>;
  attachmentBlock?: InputMaybe<AttachmentBlockUpdateOneWithoutAssetInput>;
  avatarImage?: InputMaybe<StudentUpdateOneWithoutAvatarImageInput>;
  avatarItems?: InputMaybe<AvatarItemUpdateOneWithoutAssetInput>;
  bannerCourse?: InputMaybe<CourseUpdateOneWithoutBannersInput>;
  challenge?: InputMaybe<ChallengeUpdateOneWithoutAssetInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  fileType?: InputMaybe<EnumFileTypeFieldUpdateOperationsInput>;
  forumPost?: InputMaybe<ForumPostUpdateOneWithoutAssetInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  mediaBlock?: InputMaybe<MediaBlockUpdateOneWithoutAssetInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  questionBlock?: InputMaybe<QuestionBlockUpdateOneWithoutAssetInput>;
  questionMediaBlock?: InputMaybe<QuestionBlockUpdateOneWithoutMediaAssetInput>;
  questionSelection?: InputMaybe<QuestionSelectionUpdateOneWithoutAssetInput>;
  teacherBanner?: InputMaybe<TeacherUpdateOneWithoutBannerInput>;
  teacherPhoto?: InputMaybe<TeacherUpdateOneWithoutPhotoInput>;
  thumbnailCourse?: InputMaybe<CourseUpdateOneWithoutThumbnailInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  url?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type AssetUpdateWithoutForumPostInput = {
  Subtitles?: InputMaybe<SubtitlesUpdateManyWithoutVideoInput>;
  attachmentBlock?: InputMaybe<AttachmentBlockUpdateOneWithoutAssetInput>;
  avatarImage?: InputMaybe<StudentUpdateOneWithoutAvatarImageInput>;
  avatarItems?: InputMaybe<AvatarItemUpdateOneWithoutAssetInput>;
  bannerCourse?: InputMaybe<CourseUpdateOneWithoutBannersInput>;
  challenge?: InputMaybe<ChallengeUpdateOneWithoutAssetInput>;
  checkpointImage?: InputMaybe<CheckpointUpdateOneWithoutImageInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  fileType?: InputMaybe<EnumFileTypeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  mediaBlock?: InputMaybe<MediaBlockUpdateOneWithoutAssetInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  questionBlock?: InputMaybe<QuestionBlockUpdateOneWithoutAssetInput>;
  questionMediaBlock?: InputMaybe<QuestionBlockUpdateOneWithoutMediaAssetInput>;
  questionSelection?: InputMaybe<QuestionSelectionUpdateOneWithoutAssetInput>;
  teacherBanner?: InputMaybe<TeacherUpdateOneWithoutBannerInput>;
  teacherPhoto?: InputMaybe<TeacherUpdateOneWithoutPhotoInput>;
  thumbnailCourse?: InputMaybe<CourseUpdateOneWithoutThumbnailInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  url?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type AssetUpdateWithoutMediaBlockInput = {
  Subtitles?: InputMaybe<SubtitlesUpdateManyWithoutVideoInput>;
  attachmentBlock?: InputMaybe<AttachmentBlockUpdateOneWithoutAssetInput>;
  avatarImage?: InputMaybe<StudentUpdateOneWithoutAvatarImageInput>;
  avatarItems?: InputMaybe<AvatarItemUpdateOneWithoutAssetInput>;
  bannerCourse?: InputMaybe<CourseUpdateOneWithoutBannersInput>;
  challenge?: InputMaybe<ChallengeUpdateOneWithoutAssetInput>;
  checkpointImage?: InputMaybe<CheckpointUpdateOneWithoutImageInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  fileType?: InputMaybe<EnumFileTypeFieldUpdateOperationsInput>;
  forumPost?: InputMaybe<ForumPostUpdateOneWithoutAssetInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  questionBlock?: InputMaybe<QuestionBlockUpdateOneWithoutAssetInput>;
  questionMediaBlock?: InputMaybe<QuestionBlockUpdateOneWithoutMediaAssetInput>;
  questionSelection?: InputMaybe<QuestionSelectionUpdateOneWithoutAssetInput>;
  teacherBanner?: InputMaybe<TeacherUpdateOneWithoutBannerInput>;
  teacherPhoto?: InputMaybe<TeacherUpdateOneWithoutPhotoInput>;
  thumbnailCourse?: InputMaybe<CourseUpdateOneWithoutThumbnailInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  url?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type AssetUpdateWithoutQuestionBlockInput = {
  Subtitles?: InputMaybe<SubtitlesUpdateManyWithoutVideoInput>;
  attachmentBlock?: InputMaybe<AttachmentBlockUpdateOneWithoutAssetInput>;
  avatarImage?: InputMaybe<StudentUpdateOneWithoutAvatarImageInput>;
  avatarItems?: InputMaybe<AvatarItemUpdateOneWithoutAssetInput>;
  bannerCourse?: InputMaybe<CourseUpdateOneWithoutBannersInput>;
  challenge?: InputMaybe<ChallengeUpdateOneWithoutAssetInput>;
  checkpointImage?: InputMaybe<CheckpointUpdateOneWithoutImageInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  fileType?: InputMaybe<EnumFileTypeFieldUpdateOperationsInput>;
  forumPost?: InputMaybe<ForumPostUpdateOneWithoutAssetInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  mediaBlock?: InputMaybe<MediaBlockUpdateOneWithoutAssetInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  questionMediaBlock?: InputMaybe<QuestionBlockUpdateOneWithoutMediaAssetInput>;
  questionSelection?: InputMaybe<QuestionSelectionUpdateOneWithoutAssetInput>;
  teacherBanner?: InputMaybe<TeacherUpdateOneWithoutBannerInput>;
  teacherPhoto?: InputMaybe<TeacherUpdateOneWithoutPhotoInput>;
  thumbnailCourse?: InputMaybe<CourseUpdateOneWithoutThumbnailInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  url?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type AssetUpdateWithoutQuestionMediaBlockInput = {
  Subtitles?: InputMaybe<SubtitlesUpdateManyWithoutVideoInput>;
  attachmentBlock?: InputMaybe<AttachmentBlockUpdateOneWithoutAssetInput>;
  avatarImage?: InputMaybe<StudentUpdateOneWithoutAvatarImageInput>;
  avatarItems?: InputMaybe<AvatarItemUpdateOneWithoutAssetInput>;
  bannerCourse?: InputMaybe<CourseUpdateOneWithoutBannersInput>;
  challenge?: InputMaybe<ChallengeUpdateOneWithoutAssetInput>;
  checkpointImage?: InputMaybe<CheckpointUpdateOneWithoutImageInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  fileType?: InputMaybe<EnumFileTypeFieldUpdateOperationsInput>;
  forumPost?: InputMaybe<ForumPostUpdateOneWithoutAssetInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  mediaBlock?: InputMaybe<MediaBlockUpdateOneWithoutAssetInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  questionBlock?: InputMaybe<QuestionBlockUpdateOneWithoutAssetInput>;
  questionSelection?: InputMaybe<QuestionSelectionUpdateOneWithoutAssetInput>;
  teacherBanner?: InputMaybe<TeacherUpdateOneWithoutBannerInput>;
  teacherPhoto?: InputMaybe<TeacherUpdateOneWithoutPhotoInput>;
  thumbnailCourse?: InputMaybe<CourseUpdateOneWithoutThumbnailInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  url?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type AssetUpdateWithoutQuestionSelectionInput = {
  Subtitles?: InputMaybe<SubtitlesUpdateManyWithoutVideoInput>;
  attachmentBlock?: InputMaybe<AttachmentBlockUpdateOneWithoutAssetInput>;
  avatarImage?: InputMaybe<StudentUpdateOneWithoutAvatarImageInput>;
  avatarItems?: InputMaybe<AvatarItemUpdateOneWithoutAssetInput>;
  bannerCourse?: InputMaybe<CourseUpdateOneWithoutBannersInput>;
  challenge?: InputMaybe<ChallengeUpdateOneWithoutAssetInput>;
  checkpointImage?: InputMaybe<CheckpointUpdateOneWithoutImageInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  fileType?: InputMaybe<EnumFileTypeFieldUpdateOperationsInput>;
  forumPost?: InputMaybe<ForumPostUpdateOneWithoutAssetInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  mediaBlock?: InputMaybe<MediaBlockUpdateOneWithoutAssetInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  questionBlock?: InputMaybe<QuestionBlockUpdateOneWithoutAssetInput>;
  questionMediaBlock?: InputMaybe<QuestionBlockUpdateOneWithoutMediaAssetInput>;
  teacherBanner?: InputMaybe<TeacherUpdateOneWithoutBannerInput>;
  teacherPhoto?: InputMaybe<TeacherUpdateOneWithoutPhotoInput>;
  thumbnailCourse?: InputMaybe<CourseUpdateOneWithoutThumbnailInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  url?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type AssetUpdateWithoutSubtitlesInput = {
  attachmentBlock?: InputMaybe<AttachmentBlockUpdateOneWithoutAssetInput>;
  avatarImage?: InputMaybe<StudentUpdateOneWithoutAvatarImageInput>;
  avatarItems?: InputMaybe<AvatarItemUpdateOneWithoutAssetInput>;
  bannerCourse?: InputMaybe<CourseUpdateOneWithoutBannersInput>;
  challenge?: InputMaybe<ChallengeUpdateOneWithoutAssetInput>;
  checkpointImage?: InputMaybe<CheckpointUpdateOneWithoutImageInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  fileType?: InputMaybe<EnumFileTypeFieldUpdateOperationsInput>;
  forumPost?: InputMaybe<ForumPostUpdateOneWithoutAssetInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  mediaBlock?: InputMaybe<MediaBlockUpdateOneWithoutAssetInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  questionBlock?: InputMaybe<QuestionBlockUpdateOneWithoutAssetInput>;
  questionMediaBlock?: InputMaybe<QuestionBlockUpdateOneWithoutMediaAssetInput>;
  questionSelection?: InputMaybe<QuestionSelectionUpdateOneWithoutAssetInput>;
  teacherBanner?: InputMaybe<TeacherUpdateOneWithoutBannerInput>;
  teacherPhoto?: InputMaybe<TeacherUpdateOneWithoutPhotoInput>;
  thumbnailCourse?: InputMaybe<CourseUpdateOneWithoutThumbnailInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  url?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type AssetUpdateWithoutTeacherBannerInput = {
  Subtitles?: InputMaybe<SubtitlesUpdateManyWithoutVideoInput>;
  attachmentBlock?: InputMaybe<AttachmentBlockUpdateOneWithoutAssetInput>;
  avatarImage?: InputMaybe<StudentUpdateOneWithoutAvatarImageInput>;
  avatarItems?: InputMaybe<AvatarItemUpdateOneWithoutAssetInput>;
  bannerCourse?: InputMaybe<CourseUpdateOneWithoutBannersInput>;
  challenge?: InputMaybe<ChallengeUpdateOneWithoutAssetInput>;
  checkpointImage?: InputMaybe<CheckpointUpdateOneWithoutImageInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  fileType?: InputMaybe<EnumFileTypeFieldUpdateOperationsInput>;
  forumPost?: InputMaybe<ForumPostUpdateOneWithoutAssetInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  mediaBlock?: InputMaybe<MediaBlockUpdateOneWithoutAssetInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  questionBlock?: InputMaybe<QuestionBlockUpdateOneWithoutAssetInput>;
  questionMediaBlock?: InputMaybe<QuestionBlockUpdateOneWithoutMediaAssetInput>;
  questionSelection?: InputMaybe<QuestionSelectionUpdateOneWithoutAssetInput>;
  teacherPhoto?: InputMaybe<TeacherUpdateOneWithoutPhotoInput>;
  thumbnailCourse?: InputMaybe<CourseUpdateOneWithoutThumbnailInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  url?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type AssetUpdateWithoutTeacherPhotoInput = {
  Subtitles?: InputMaybe<SubtitlesUpdateManyWithoutVideoInput>;
  attachmentBlock?: InputMaybe<AttachmentBlockUpdateOneWithoutAssetInput>;
  avatarImage?: InputMaybe<StudentUpdateOneWithoutAvatarImageInput>;
  avatarItems?: InputMaybe<AvatarItemUpdateOneWithoutAssetInput>;
  bannerCourse?: InputMaybe<CourseUpdateOneWithoutBannersInput>;
  challenge?: InputMaybe<ChallengeUpdateOneWithoutAssetInput>;
  checkpointImage?: InputMaybe<CheckpointUpdateOneWithoutImageInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  fileType?: InputMaybe<EnumFileTypeFieldUpdateOperationsInput>;
  forumPost?: InputMaybe<ForumPostUpdateOneWithoutAssetInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  mediaBlock?: InputMaybe<MediaBlockUpdateOneWithoutAssetInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  questionBlock?: InputMaybe<QuestionBlockUpdateOneWithoutAssetInput>;
  questionMediaBlock?: InputMaybe<QuestionBlockUpdateOneWithoutMediaAssetInput>;
  questionSelection?: InputMaybe<QuestionSelectionUpdateOneWithoutAssetInput>;
  teacherBanner?: InputMaybe<TeacherUpdateOneWithoutBannerInput>;
  thumbnailCourse?: InputMaybe<CourseUpdateOneWithoutThumbnailInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  url?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type AssetUpdateWithoutThumbnailCourseInput = {
  Subtitles?: InputMaybe<SubtitlesUpdateManyWithoutVideoInput>;
  attachmentBlock?: InputMaybe<AttachmentBlockUpdateOneWithoutAssetInput>;
  avatarImage?: InputMaybe<StudentUpdateOneWithoutAvatarImageInput>;
  avatarItems?: InputMaybe<AvatarItemUpdateOneWithoutAssetInput>;
  bannerCourse?: InputMaybe<CourseUpdateOneWithoutBannersInput>;
  challenge?: InputMaybe<ChallengeUpdateOneWithoutAssetInput>;
  checkpointImage?: InputMaybe<CheckpointUpdateOneWithoutImageInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  fileType?: InputMaybe<EnumFileTypeFieldUpdateOperationsInput>;
  forumPost?: InputMaybe<ForumPostUpdateOneWithoutAssetInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  mediaBlock?: InputMaybe<MediaBlockUpdateOneWithoutAssetInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  questionBlock?: InputMaybe<QuestionBlockUpdateOneWithoutAssetInput>;
  questionMediaBlock?: InputMaybe<QuestionBlockUpdateOneWithoutMediaAssetInput>;
  questionSelection?: InputMaybe<QuestionSelectionUpdateOneWithoutAssetInput>;
  teacherBanner?: InputMaybe<TeacherUpdateOneWithoutBannerInput>;
  teacherPhoto?: InputMaybe<TeacherUpdateOneWithoutPhotoInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  url?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type AssetUpsertWithWhereUniqueWithoutBannerCourseInput = {
  create: AssetCreateWithoutBannerCourseInput;
  update: AssetUpdateWithoutBannerCourseInput;
  where: AssetWhereUniqueInput;
};

export type AssetUpsertWithWhereUniqueWithoutForumPostInput = {
  create: AssetCreateWithoutForumPostInput;
  update: AssetUpdateWithoutForumPostInput;
  where: AssetWhereUniqueInput;
};

export type AssetUpsertWithoutAttachmentBlockInput = {
  create: AssetCreateWithoutAttachmentBlockInput;
  update: AssetUpdateWithoutAttachmentBlockInput;
};

export type AssetUpsertWithoutAvatarImageInput = {
  create: AssetCreateWithoutAvatarImageInput;
  update: AssetUpdateWithoutAvatarImageInput;
};

export type AssetUpsertWithoutAvatarItemsInput = {
  create: AssetCreateWithoutAvatarItemsInput;
  update: AssetUpdateWithoutAvatarItemsInput;
};

export type AssetUpsertWithoutChallengeInput = {
  create: AssetCreateWithoutChallengeInput;
  update: AssetUpdateWithoutChallengeInput;
};

export type AssetUpsertWithoutCheckpointImageInput = {
  create: AssetCreateWithoutCheckpointImageInput;
  update: AssetUpdateWithoutCheckpointImageInput;
};

export type AssetUpsertWithoutMediaBlockInput = {
  create: AssetCreateWithoutMediaBlockInput;
  update: AssetUpdateWithoutMediaBlockInput;
};

export type AssetUpsertWithoutQuestionBlockInput = {
  create: AssetCreateWithoutQuestionBlockInput;
  update: AssetUpdateWithoutQuestionBlockInput;
};

export type AssetUpsertWithoutQuestionMediaBlockInput = {
  create: AssetCreateWithoutQuestionMediaBlockInput;
  update: AssetUpdateWithoutQuestionMediaBlockInput;
};

export type AssetUpsertWithoutQuestionSelectionInput = {
  create: AssetCreateWithoutQuestionSelectionInput;
  update: AssetUpdateWithoutQuestionSelectionInput;
};

export type AssetUpsertWithoutSubtitlesInput = {
  create: AssetCreateWithoutSubtitlesInput;
  update: AssetUpdateWithoutSubtitlesInput;
};

export type AssetUpsertWithoutTeacherBannerInput = {
  create: AssetCreateWithoutTeacherBannerInput;
  update: AssetUpdateWithoutTeacherBannerInput;
};

export type AssetUpsertWithoutTeacherPhotoInput = {
  create: AssetCreateWithoutTeacherPhotoInput;
  update: AssetUpdateWithoutTeacherPhotoInput;
};

export type AssetUpsertWithoutThumbnailCourseInput = {
  create: AssetCreateWithoutThumbnailCourseInput;
  update: AssetUpdateWithoutThumbnailCourseInput;
};

export type AssetWhereInput = {
  AND?: InputMaybe<Array<AssetWhereInput>>;
  NOT?: InputMaybe<Array<AssetWhereInput>>;
  OR?: InputMaybe<Array<AssetWhereInput>>;
  Subtitles?: InputMaybe<SubtitlesListRelationFilter>;
  attachmentBlock?: InputMaybe<AttachmentBlockRelationFilter>;
  avatarImage?: InputMaybe<StudentRelationFilter>;
  avatarItems?: InputMaybe<AvatarItemRelationFilter>;
  bannerCourse?: InputMaybe<CourseRelationFilter>;
  challenge?: InputMaybe<ChallengeRelationFilter>;
  checkpointImage?: InputMaybe<CheckpointRelationFilter>;
  courseId?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  fileType?: InputMaybe<EnumFileTypeFilter>;
  forumPost?: InputMaybe<ForumPostRelationFilter>;
  forumPostId?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  mediaBlock?: InputMaybe<MediaBlockRelationFilter>;
  name?: InputMaybe<StringFilter>;
  questionBlock?: InputMaybe<QuestionBlockRelationFilter>;
  questionMediaBlock?: InputMaybe<QuestionBlockRelationFilter>;
  questionSelection?: InputMaybe<QuestionSelectionRelationFilter>;
  teacherBanner?: InputMaybe<TeacherRelationFilter>;
  teacherPhoto?: InputMaybe<TeacherRelationFilter>;
  thumbnailCourse?: InputMaybe<CourseRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  url?: InputMaybe<StringFilter>;
};

export type AssetWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
};

export type AttachmentBlock = {
  __typename?: 'AttachmentBlock';
  asset?: Maybe<Asset>;
  assetId?: Maybe<Scalars['String']>;
  block: Block;
  createdAt: Scalars['Date'];
  deleted?: Maybe<Scalars['Date']>;
  id: Scalars['ID'];
  text?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Date'];
};

export type AttachmentBlockCreateNestedOneWithoutAssetInput = {
  connect?: InputMaybe<AttachmentBlockWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AttachmentBlockCreateOrConnectWithoutAssetInput>;
  create?: InputMaybe<AttachmentBlockCreateWithoutAssetInput>;
};

export type AttachmentBlockCreateNestedOneWithoutBlockInput = {
  connect?: InputMaybe<AttachmentBlockWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AttachmentBlockCreateOrConnectWithoutBlockInput>;
  create?: InputMaybe<AttachmentBlockCreateWithoutBlockInput>;
};

export type AttachmentBlockCreateOrConnectWithoutAssetInput = {
  create: AttachmentBlockCreateWithoutAssetInput;
  where: AttachmentBlockWhereUniqueInput;
};

export type AttachmentBlockCreateOrConnectWithoutBlockInput = {
  create: AttachmentBlockCreateWithoutBlockInput;
  where: AttachmentBlockWhereUniqueInput;
};

export type AttachmentBlockCreateWithoutAssetInput = {
  block: BlockCreateNestedOneWithoutAttachmentBlockInput;
  createdAt?: InputMaybe<Scalars['Date']>;
  deleted?: InputMaybe<Scalars['Date']>;
  text?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type AttachmentBlockCreateWithoutBlockInput = {
  asset?: InputMaybe<AssetCreateNestedOneWithoutAttachmentBlockInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  deleted?: InputMaybe<Scalars['Date']>;
  text?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export enum AttachmentBlockOrderByRelevanceFieldEnum {
  AssetId = 'assetId',
  Id = 'id',
  Text = 'text'
}

export type AttachmentBlockOrderByRelevanceInput = {
  fields: Array<AttachmentBlockOrderByRelevanceFieldEnum>;
  search: Scalars['String'];
  sort: SortOrder;
};

export type AttachmentBlockOrderByWithRelationAndSearchRelevanceInput = {
  _relevance?: InputMaybe<AttachmentBlockOrderByRelevanceInput>;
  asset?: InputMaybe<AssetOrderByWithRelationAndSearchRelevanceInput>;
  assetId?: InputMaybe<SortOrder>;
  block?: InputMaybe<BlockOrderByWithRelationAndSearchRelevanceInput>;
  createdAt?: InputMaybe<SortOrder>;
  deleted?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  text?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type AttachmentBlockRelationFilter = {
  is?: InputMaybe<AttachmentBlockWhereInput>;
  isNot?: InputMaybe<AttachmentBlockWhereInput>;
};

export type AttachmentBlockUncheckedCreateNestedOneWithoutBlockInput = {
  connect?: InputMaybe<AttachmentBlockWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AttachmentBlockCreateOrConnectWithoutBlockInput>;
  create?: InputMaybe<AttachmentBlockCreateWithoutBlockInput>;
};

export type AttachmentBlockUpdateOneWithoutAssetInput = {
  connect?: InputMaybe<AttachmentBlockWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AttachmentBlockCreateOrConnectWithoutAssetInput>;
  create?: InputMaybe<AttachmentBlockCreateWithoutAssetInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<AttachmentBlockUpdateWithoutAssetInput>;
  upsert?: InputMaybe<AttachmentBlockUpsertWithoutAssetInput>;
};

export type AttachmentBlockUpdateOneWithoutBlockInput = {
  connect?: InputMaybe<AttachmentBlockWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AttachmentBlockCreateOrConnectWithoutBlockInput>;
  create?: InputMaybe<AttachmentBlockCreateWithoutBlockInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<AttachmentBlockUpdateWithoutBlockInput>;
  upsert?: InputMaybe<AttachmentBlockUpsertWithoutBlockInput>;
};

export type AttachmentBlockUpdateWithoutAssetInput = {
  block?: InputMaybe<BlockUpdateOneRequiredWithoutAttachmentBlockInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deleted?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  text?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type AttachmentBlockUpdateWithoutBlockInput = {
  asset?: InputMaybe<AssetUpdateOneWithoutAttachmentBlockInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deleted?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  text?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type AttachmentBlockUpsertWithoutAssetInput = {
  create: AttachmentBlockCreateWithoutAssetInput;
  update: AttachmentBlockUpdateWithoutAssetInput;
};

export type AttachmentBlockUpsertWithoutBlockInput = {
  create: AttachmentBlockCreateWithoutBlockInput;
  update: AttachmentBlockUpdateWithoutBlockInput;
};

export type AttachmentBlockWhereInput = {
  AND?: InputMaybe<Array<AttachmentBlockWhereInput>>;
  NOT?: InputMaybe<Array<AttachmentBlockWhereInput>>;
  OR?: InputMaybe<Array<AttachmentBlockWhereInput>>;
  asset?: InputMaybe<AssetRelationFilter>;
  assetId?: InputMaybe<StringNullableFilter>;
  block?: InputMaybe<BlockRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  deleted?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<StringFilter>;
  text?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type AttachmentBlockWhereUniqueInput = {
  assetId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
};

export type Auth = {
  __typename?: 'Auth';
  /** JWT access token */
  accessToken: Scalars['String'];
  /** JWT refresh token */
  refreshToken: Scalars['String'];
  user: User;
};

export type Avatar = {
  __typename?: 'Avatar';
  _count: AvatarCount;
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  items?: Maybe<Array<AvatarItem>>;
  student: Student;
  studentId: Scalars['String'];
  updatedAt: Scalars['Date'];
};

export type AvatarAssetCatalogDto = {
  __typename?: 'AvatarAssetCatalogDto';
  categoryCatelog: Array<AvatarAssetCategory>;
  colourCatelog: AvatarAssetColourCatalogDto;
  colours: Array<AvatarAssetColour>;
};

export type AvatarAssetCategory = {
  __typename?: 'AvatarAssetCategory';
  _count: AvatarAssetCategoryCount;
  avatarAssetCatelog?: Maybe<Array<AvatarAssetCatelog>>;
  id: Scalars['ID'];
  label: Scalars['String'];
  parentCategory?: Maybe<AvatarAssetCategory>;
  parentCategoryId?: Maybe<Scalars['String']>;
  subCategories?: Maybe<Array<AvatarAssetCategory>>;
  type: ItemCatalogType;
};

export type AvatarAssetCategoryCount = {
  __typename?: 'AvatarAssetCategoryCount';
  avatarAssetCatelog: Scalars['Int'];
  subCategories: Scalars['Int'];
};

export type AvatarAssetCategoryCreateManyParentCategoryInput = {
  id?: InputMaybe<Scalars['String']>;
  label: Scalars['String'];
  type: ItemCatalogType;
};

export type AvatarAssetCategoryCreateManyParentCategoryInputEnvelope = {
  data: Array<AvatarAssetCategoryCreateManyParentCategoryInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type AvatarAssetCategoryCreateNestedManyWithoutParentCategoryInput = {
  connect?: InputMaybe<Array<AvatarAssetCategoryWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AvatarAssetCategoryCreateOrConnectWithoutParentCategoryInput>>;
  create?: InputMaybe<Array<AvatarAssetCategoryCreateWithoutParentCategoryInput>>;
  createMany?: InputMaybe<AvatarAssetCategoryCreateManyParentCategoryInputEnvelope>;
};

export type AvatarAssetCategoryCreateNestedOneWithoutAvatarAssetCatelogInput = {
  connect?: InputMaybe<AvatarAssetCategoryWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AvatarAssetCategoryCreateOrConnectWithoutAvatarAssetCatelogInput>;
  create?: InputMaybe<AvatarAssetCategoryCreateWithoutAvatarAssetCatelogInput>;
};

export type AvatarAssetCategoryCreateNestedOneWithoutSubCategoriesInput = {
  connect?: InputMaybe<AvatarAssetCategoryWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AvatarAssetCategoryCreateOrConnectWithoutSubCategoriesInput>;
  create?: InputMaybe<AvatarAssetCategoryCreateWithoutSubCategoriesInput>;
};

export type AvatarAssetCategoryCreateOrConnectWithoutAvatarAssetCatelogInput = {
  create: AvatarAssetCategoryCreateWithoutAvatarAssetCatelogInput;
  where: AvatarAssetCategoryWhereUniqueInput;
};

export type AvatarAssetCategoryCreateOrConnectWithoutParentCategoryInput = {
  create: AvatarAssetCategoryCreateWithoutParentCategoryInput;
  where: AvatarAssetCategoryWhereUniqueInput;
};

export type AvatarAssetCategoryCreateOrConnectWithoutSubCategoriesInput = {
  create: AvatarAssetCategoryCreateWithoutSubCategoriesInput;
  where: AvatarAssetCategoryWhereUniqueInput;
};

export type AvatarAssetCategoryCreateWithoutAvatarAssetCatelogInput = {
  id?: InputMaybe<Scalars['String']>;
  label: Scalars['String'];
  parentCategory?: InputMaybe<AvatarAssetCategoryCreateNestedOneWithoutSubCategoriesInput>;
  subCategories?: InputMaybe<AvatarAssetCategoryCreateNestedManyWithoutParentCategoryInput>;
  type: ItemCatalogType;
};

export type AvatarAssetCategoryCreateWithoutParentCategoryInput = {
  avatarAssetCatelog?: InputMaybe<AvatarAssetCatelogCreateNestedManyWithoutAvatarAssetCategoryInput>;
  id?: InputMaybe<Scalars['String']>;
  label: Scalars['String'];
  subCategories?: InputMaybe<AvatarAssetCategoryCreateNestedManyWithoutParentCategoryInput>;
  type: ItemCatalogType;
};

export type AvatarAssetCategoryCreateWithoutSubCategoriesInput = {
  avatarAssetCatelog?: InputMaybe<AvatarAssetCatelogCreateNestedManyWithoutAvatarAssetCategoryInput>;
  id?: InputMaybe<Scalars['String']>;
  label: Scalars['String'];
  parentCategory?: InputMaybe<AvatarAssetCategoryCreateNestedOneWithoutSubCategoriesInput>;
  type: ItemCatalogType;
};

export type AvatarAssetCategoryListRelationFilter = {
  every?: InputMaybe<AvatarAssetCategoryWhereInput>;
  none?: InputMaybe<AvatarAssetCategoryWhereInput>;
  some?: InputMaybe<AvatarAssetCategoryWhereInput>;
};

export type AvatarAssetCategoryOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export enum AvatarAssetCategoryOrderByRelevanceFieldEnum {
  Id = 'id',
  Label = 'label',
  ParentCategoryId = 'parentCategoryId'
}

export type AvatarAssetCategoryOrderByRelevanceInput = {
  fields: Array<AvatarAssetCategoryOrderByRelevanceFieldEnum>;
  search: Scalars['String'];
  sort: SortOrder;
};

export type AvatarAssetCategoryOrderByWithRelationAndSearchRelevanceInput = {
  _relevance?: InputMaybe<AvatarAssetCategoryOrderByRelevanceInput>;
  avatarAssetCatelog?: InputMaybe<AvatarAssetCatelogOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  label?: InputMaybe<SortOrder>;
  parentCategory?: InputMaybe<AvatarAssetCategoryOrderByWithRelationAndSearchRelevanceInput>;
  parentCategoryId?: InputMaybe<SortOrder>;
  subCategories?: InputMaybe<AvatarAssetCategoryOrderByRelationAggregateInput>;
  type?: InputMaybe<SortOrder>;
};

export type AvatarAssetCategoryRelationFilter = {
  is?: InputMaybe<AvatarAssetCategoryWhereInput>;
  isNot?: InputMaybe<AvatarAssetCategoryWhereInput>;
};

export enum AvatarAssetCategoryScalarFieldEnum {
  Id = 'id',
  Label = 'label',
  ParentCategoryId = 'parentCategoryId',
  Type = 'type'
}

export type AvatarAssetCategoryScalarWhereInput = {
  AND?: InputMaybe<Array<AvatarAssetCategoryScalarWhereInput>>;
  NOT?: InputMaybe<Array<AvatarAssetCategoryScalarWhereInput>>;
  OR?: InputMaybe<Array<AvatarAssetCategoryScalarWhereInput>>;
  id?: InputMaybe<StringFilter>;
  label?: InputMaybe<StringFilter>;
  parentCategoryId?: InputMaybe<StringNullableFilter>;
  type?: InputMaybe<EnumItemCatalogTypeFilter>;
};

export type AvatarAssetCategoryUpdateManyMutationInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  label?: InputMaybe<StringFieldUpdateOperationsInput>;
  type?: InputMaybe<EnumItemCatalogTypeFieldUpdateOperationsInput>;
};

export type AvatarAssetCategoryUpdateManyWithWhereWithoutParentCategoryInput = {
  data: AvatarAssetCategoryUpdateManyMutationInput;
  where: AvatarAssetCategoryScalarWhereInput;
};

export type AvatarAssetCategoryUpdateManyWithoutParentCategoryInput = {
  connect?: InputMaybe<Array<AvatarAssetCategoryWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AvatarAssetCategoryCreateOrConnectWithoutParentCategoryInput>>;
  create?: InputMaybe<Array<AvatarAssetCategoryCreateWithoutParentCategoryInput>>;
  createMany?: InputMaybe<AvatarAssetCategoryCreateManyParentCategoryInputEnvelope>;
  delete?: InputMaybe<Array<AvatarAssetCategoryWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<AvatarAssetCategoryScalarWhereInput>>;
  disconnect?: InputMaybe<Array<AvatarAssetCategoryWhereUniqueInput>>;
  set?: InputMaybe<Array<AvatarAssetCategoryWhereUniqueInput>>;
  update?: InputMaybe<Array<AvatarAssetCategoryUpdateWithWhereUniqueWithoutParentCategoryInput>>;
  updateMany?: InputMaybe<Array<AvatarAssetCategoryUpdateManyWithWhereWithoutParentCategoryInput>>;
  upsert?: InputMaybe<Array<AvatarAssetCategoryUpsertWithWhereUniqueWithoutParentCategoryInput>>;
};

export type AvatarAssetCategoryUpdateOneRequiredWithoutAvatarAssetCatelogInput = {
  connect?: InputMaybe<AvatarAssetCategoryWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AvatarAssetCategoryCreateOrConnectWithoutAvatarAssetCatelogInput>;
  create?: InputMaybe<AvatarAssetCategoryCreateWithoutAvatarAssetCatelogInput>;
  update?: InputMaybe<AvatarAssetCategoryUpdateWithoutAvatarAssetCatelogInput>;
  upsert?: InputMaybe<AvatarAssetCategoryUpsertWithoutAvatarAssetCatelogInput>;
};

export type AvatarAssetCategoryUpdateOneWithoutSubCategoriesInput = {
  connect?: InputMaybe<AvatarAssetCategoryWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AvatarAssetCategoryCreateOrConnectWithoutSubCategoriesInput>;
  create?: InputMaybe<AvatarAssetCategoryCreateWithoutSubCategoriesInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<AvatarAssetCategoryUpdateWithoutSubCategoriesInput>;
  upsert?: InputMaybe<AvatarAssetCategoryUpsertWithoutSubCategoriesInput>;
};

export type AvatarAssetCategoryUpdateWithWhereUniqueWithoutParentCategoryInput = {
  data: AvatarAssetCategoryUpdateWithoutParentCategoryInput;
  where: AvatarAssetCategoryWhereUniqueInput;
};

export type AvatarAssetCategoryUpdateWithoutAvatarAssetCatelogInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  label?: InputMaybe<StringFieldUpdateOperationsInput>;
  parentCategory?: InputMaybe<AvatarAssetCategoryUpdateOneWithoutSubCategoriesInput>;
  subCategories?: InputMaybe<AvatarAssetCategoryUpdateManyWithoutParentCategoryInput>;
  type?: InputMaybe<EnumItemCatalogTypeFieldUpdateOperationsInput>;
};

export type AvatarAssetCategoryUpdateWithoutParentCategoryInput = {
  avatarAssetCatelog?: InputMaybe<AvatarAssetCatelogUpdateManyWithoutAvatarAssetCategoryInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  label?: InputMaybe<StringFieldUpdateOperationsInput>;
  subCategories?: InputMaybe<AvatarAssetCategoryUpdateManyWithoutParentCategoryInput>;
  type?: InputMaybe<EnumItemCatalogTypeFieldUpdateOperationsInput>;
};

export type AvatarAssetCategoryUpdateWithoutSubCategoriesInput = {
  avatarAssetCatelog?: InputMaybe<AvatarAssetCatelogUpdateManyWithoutAvatarAssetCategoryInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  label?: InputMaybe<StringFieldUpdateOperationsInput>;
  parentCategory?: InputMaybe<AvatarAssetCategoryUpdateOneWithoutSubCategoriesInput>;
  type?: InputMaybe<EnumItemCatalogTypeFieldUpdateOperationsInput>;
};

export type AvatarAssetCategoryUpsertWithWhereUniqueWithoutParentCategoryInput = {
  create: AvatarAssetCategoryCreateWithoutParentCategoryInput;
  update: AvatarAssetCategoryUpdateWithoutParentCategoryInput;
  where: AvatarAssetCategoryWhereUniqueInput;
};

export type AvatarAssetCategoryUpsertWithoutAvatarAssetCatelogInput = {
  create: AvatarAssetCategoryCreateWithoutAvatarAssetCatelogInput;
  update: AvatarAssetCategoryUpdateWithoutAvatarAssetCatelogInput;
};

export type AvatarAssetCategoryUpsertWithoutSubCategoriesInput = {
  create: AvatarAssetCategoryCreateWithoutSubCategoriesInput;
  update: AvatarAssetCategoryUpdateWithoutSubCategoriesInput;
};

export type AvatarAssetCategoryWhereInput = {
  AND?: InputMaybe<Array<AvatarAssetCategoryWhereInput>>;
  NOT?: InputMaybe<Array<AvatarAssetCategoryWhereInput>>;
  OR?: InputMaybe<Array<AvatarAssetCategoryWhereInput>>;
  avatarAssetCatelog?: InputMaybe<AvatarAssetCatelogListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  label?: InputMaybe<StringFilter>;
  parentCategory?: InputMaybe<AvatarAssetCategoryRelationFilter>;
  parentCategoryId?: InputMaybe<StringNullableFilter>;
  subCategories?: InputMaybe<AvatarAssetCategoryListRelationFilter>;
  type?: InputMaybe<EnumItemCatalogTypeFilter>;
};

export type AvatarAssetCategoryWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type AvatarAssetCatelog = {
  __typename?: 'AvatarAssetCatelog';
  HandRelatedAvatarAsset?: Maybe<Array<HandRelatedAvatarAsset>>;
  _count: AvatarAssetCatelogCount;
  avatarAssetCategory: AvatarAssetCategory;
  avatarAssetCategoryId: Scalars['String'];
  createdAt: Scalars['Date'];
  hairAvatarAsset?: Maybe<Array<HairAvatarAsset>>;
  id: Scalars['ID'];
  imgUrl: Scalars['String'];
  isActive: Scalars['Boolean'];
  label: Scalars['String'];
  normalAvatarAsset?: Maybe<Array<NormalAvatarAsset>>;
  skinAvatarAsset?: Maybe<Array<SkinAvatarAsset>>;
  type: AvatarAssetCatelogType;
  updatedAt: Scalars['Date'];
};

export type AvatarAssetCatelogCount = {
  __typename?: 'AvatarAssetCatelogCount';
  HandRelatedAvatarAsset: Scalars['Int'];
  hairAvatarAsset: Scalars['Int'];
  normalAvatarAsset: Scalars['Int'];
  skinAvatarAsset: Scalars['Int'];
};

export type AvatarAssetCatelogCreateInput = {
  HandRelatedAvatarAsset?: InputMaybe<HandRelatedAvatarAssetCreateNestedManyWithoutAvatarAssetCatelogInput>;
  avatarAssetCategory: AvatarAssetCategoryCreateNestedOneWithoutAvatarAssetCatelogInput;
  createdAt?: InputMaybe<Scalars['Date']>;
  hairAvatarAsset?: InputMaybe<HairAvatarAssetCreateNestedManyWithoutAvatarAssetCatelogInput>;
  id?: InputMaybe<Scalars['String']>;
  imgUrl: Scalars['String'];
  isActive?: InputMaybe<Scalars['Boolean']>;
  label: Scalars['String'];
  normalAvatarAsset?: InputMaybe<NormalAvatarAssetCreateNestedManyWithoutAvatarAssetCatalogInput>;
  skinAvatarAsset?: InputMaybe<SkinAvatarAssetCreateNestedManyWithoutAvatarAssetCatelogInput>;
  type: AvatarAssetCatelogType;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type AvatarAssetCatelogCreateManyAvatarAssetCategoryInput = {
  createdAt?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  imgUrl: Scalars['String'];
  isActive?: InputMaybe<Scalars['Boolean']>;
  label: Scalars['String'];
  type: AvatarAssetCatelogType;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type AvatarAssetCatelogCreateManyAvatarAssetCategoryInputEnvelope = {
  data: Array<AvatarAssetCatelogCreateManyAvatarAssetCategoryInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type AvatarAssetCatelogCreateNestedManyWithoutAvatarAssetCategoryInput = {
  connect?: InputMaybe<Array<AvatarAssetCatelogWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AvatarAssetCatelogCreateOrConnectWithoutAvatarAssetCategoryInput>>;
  create?: InputMaybe<Array<AvatarAssetCatelogCreateWithoutAvatarAssetCategoryInput>>;
  createMany?: InputMaybe<AvatarAssetCatelogCreateManyAvatarAssetCategoryInputEnvelope>;
};

export type AvatarAssetCatelogCreateNestedOneWithoutHairAvatarAssetInput = {
  connect?: InputMaybe<AvatarAssetCatelogWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AvatarAssetCatelogCreateOrConnectWithoutHairAvatarAssetInput>;
  create?: InputMaybe<AvatarAssetCatelogCreateWithoutHairAvatarAssetInput>;
};

export type AvatarAssetCatelogCreateNestedOneWithoutNormalAvatarAssetInput = {
  connect?: InputMaybe<AvatarAssetCatelogWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AvatarAssetCatelogCreateOrConnectWithoutNormalAvatarAssetInput>;
  create?: InputMaybe<AvatarAssetCatelogCreateWithoutNormalAvatarAssetInput>;
};

export type AvatarAssetCatelogCreateNestedOneWithoutSkinAvatarAssetInput = {
  connect?: InputMaybe<AvatarAssetCatelogWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AvatarAssetCatelogCreateOrConnectWithoutSkinAvatarAssetInput>;
  create?: InputMaybe<AvatarAssetCatelogCreateWithoutSkinAvatarAssetInput>;
};

export type AvatarAssetCatelogCreateOrConnectWithoutAvatarAssetCategoryInput = {
  create: AvatarAssetCatelogCreateWithoutAvatarAssetCategoryInput;
  where: AvatarAssetCatelogWhereUniqueInput;
};

export type AvatarAssetCatelogCreateOrConnectWithoutHairAvatarAssetInput = {
  create: AvatarAssetCatelogCreateWithoutHairAvatarAssetInput;
  where: AvatarAssetCatelogWhereUniqueInput;
};

export type AvatarAssetCatelogCreateOrConnectWithoutNormalAvatarAssetInput = {
  create: AvatarAssetCatelogCreateWithoutNormalAvatarAssetInput;
  where: AvatarAssetCatelogWhereUniqueInput;
};

export type AvatarAssetCatelogCreateOrConnectWithoutSkinAvatarAssetInput = {
  create: AvatarAssetCatelogCreateWithoutSkinAvatarAssetInput;
  where: AvatarAssetCatelogWhereUniqueInput;
};

export type AvatarAssetCatelogCreateWithoutAvatarAssetCategoryInput = {
  HandRelatedAvatarAsset?: InputMaybe<HandRelatedAvatarAssetCreateNestedManyWithoutAvatarAssetCatelogInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  hairAvatarAsset?: InputMaybe<HairAvatarAssetCreateNestedManyWithoutAvatarAssetCatelogInput>;
  id?: InputMaybe<Scalars['String']>;
  imgUrl: Scalars['String'];
  isActive?: InputMaybe<Scalars['Boolean']>;
  label: Scalars['String'];
  normalAvatarAsset?: InputMaybe<NormalAvatarAssetCreateNestedManyWithoutAvatarAssetCatalogInput>;
  skinAvatarAsset?: InputMaybe<SkinAvatarAssetCreateNestedManyWithoutAvatarAssetCatelogInput>;
  type: AvatarAssetCatelogType;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type AvatarAssetCatelogCreateWithoutHairAvatarAssetInput = {
  HandRelatedAvatarAsset?: InputMaybe<HandRelatedAvatarAssetCreateNestedManyWithoutAvatarAssetCatelogInput>;
  avatarAssetCategory: AvatarAssetCategoryCreateNestedOneWithoutAvatarAssetCatelogInput;
  createdAt?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  imgUrl: Scalars['String'];
  isActive?: InputMaybe<Scalars['Boolean']>;
  label: Scalars['String'];
  normalAvatarAsset?: InputMaybe<NormalAvatarAssetCreateNestedManyWithoutAvatarAssetCatalogInput>;
  skinAvatarAsset?: InputMaybe<SkinAvatarAssetCreateNestedManyWithoutAvatarAssetCatelogInput>;
  type: AvatarAssetCatelogType;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type AvatarAssetCatelogCreateWithoutNormalAvatarAssetInput = {
  HandRelatedAvatarAsset?: InputMaybe<HandRelatedAvatarAssetCreateNestedManyWithoutAvatarAssetCatelogInput>;
  avatarAssetCategory: AvatarAssetCategoryCreateNestedOneWithoutAvatarAssetCatelogInput;
  createdAt?: InputMaybe<Scalars['Date']>;
  hairAvatarAsset?: InputMaybe<HairAvatarAssetCreateNestedManyWithoutAvatarAssetCatelogInput>;
  id?: InputMaybe<Scalars['String']>;
  imgUrl: Scalars['String'];
  isActive?: InputMaybe<Scalars['Boolean']>;
  label: Scalars['String'];
  skinAvatarAsset?: InputMaybe<SkinAvatarAssetCreateNestedManyWithoutAvatarAssetCatelogInput>;
  type: AvatarAssetCatelogType;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type AvatarAssetCatelogCreateWithoutSkinAvatarAssetInput = {
  HandRelatedAvatarAsset?: InputMaybe<HandRelatedAvatarAssetCreateNestedManyWithoutAvatarAssetCatelogInput>;
  avatarAssetCategory: AvatarAssetCategoryCreateNestedOneWithoutAvatarAssetCatelogInput;
  createdAt?: InputMaybe<Scalars['Date']>;
  hairAvatarAsset?: InputMaybe<HairAvatarAssetCreateNestedManyWithoutAvatarAssetCatelogInput>;
  id?: InputMaybe<Scalars['String']>;
  imgUrl: Scalars['String'];
  isActive?: InputMaybe<Scalars['Boolean']>;
  label: Scalars['String'];
  normalAvatarAsset?: InputMaybe<NormalAvatarAssetCreateNestedManyWithoutAvatarAssetCatalogInput>;
  type: AvatarAssetCatelogType;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type AvatarAssetCatelogListRelationFilter = {
  every?: InputMaybe<AvatarAssetCatelogWhereInput>;
  none?: InputMaybe<AvatarAssetCatelogWhereInput>;
  some?: InputMaybe<AvatarAssetCatelogWhereInput>;
};

export type AvatarAssetCatelogOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export enum AvatarAssetCatelogOrderByRelevanceFieldEnum {
  AvatarAssetCategoryId = 'avatarAssetCategoryId',
  Id = 'id',
  ImgUrl = 'imgUrl',
  Label = 'label'
}

export type AvatarAssetCatelogOrderByRelevanceInput = {
  fields: Array<AvatarAssetCatelogOrderByRelevanceFieldEnum>;
  search: Scalars['String'];
  sort: SortOrder;
};

export type AvatarAssetCatelogOrderByWithRelationAndSearchRelevanceInput = {
  HandRelatedAvatarAsset?: InputMaybe<HandRelatedAvatarAssetOrderByRelationAggregateInput>;
  _relevance?: InputMaybe<AvatarAssetCatelogOrderByRelevanceInput>;
  avatarAssetCategory?: InputMaybe<AvatarAssetCategoryOrderByWithRelationAndSearchRelevanceInput>;
  avatarAssetCategoryId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  hairAvatarAsset?: InputMaybe<HairAvatarAssetOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  imgUrl?: InputMaybe<SortOrder>;
  isActive?: InputMaybe<SortOrder>;
  label?: InputMaybe<SortOrder>;
  normalAvatarAsset?: InputMaybe<NormalAvatarAssetOrderByRelationAggregateInput>;
  skinAvatarAsset?: InputMaybe<SkinAvatarAssetOrderByRelationAggregateInput>;
  type?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type AvatarAssetCatelogRelationFilter = {
  is?: InputMaybe<AvatarAssetCatelogWhereInput>;
  isNot?: InputMaybe<AvatarAssetCatelogWhereInput>;
};

export enum AvatarAssetCatelogScalarFieldEnum {
  AvatarAssetCategoryId = 'avatarAssetCategoryId',
  CreatedAt = 'createdAt',
  Id = 'id',
  ImgUrl = 'imgUrl',
  IsActive = 'isActive',
  Label = 'label',
  Type = 'type',
  UpdatedAt = 'updatedAt'
}

export type AvatarAssetCatelogScalarWhereInput = {
  AND?: InputMaybe<Array<AvatarAssetCatelogScalarWhereInput>>;
  NOT?: InputMaybe<Array<AvatarAssetCatelogScalarWhereInput>>;
  OR?: InputMaybe<Array<AvatarAssetCatelogScalarWhereInput>>;
  avatarAssetCategoryId?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  imgUrl?: InputMaybe<StringFilter>;
  isActive?: InputMaybe<BoolFilter>;
  label?: InputMaybe<StringFilter>;
  type?: InputMaybe<EnumAvatarAssetCatelogTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export enum AvatarAssetCatelogType {
  Hair = 'HAIR',
  HandConfigurable = 'HAND_CONFIGURABLE',
  HandRelated = 'HAND_RELATED',
  Normal = 'NORMAL',
  Skin = 'SKIN'
}

export enum AvatarAssetCatelogTypes {
  Hair = 'HAIR',
  HandConfigurable = 'HAND_CONFIGURABLE',
  HandRelated = 'HAND_RELATED',
  Normal = 'NORMAL',
  Skin = 'SKIN'
}

export type AvatarAssetCatelogUpdateInput = {
  HandRelatedAvatarAsset?: InputMaybe<HandRelatedAvatarAssetUpdateManyWithoutAvatarAssetCatelogInput>;
  avatarAssetCategory?: InputMaybe<AvatarAssetCategoryUpdateOneRequiredWithoutAvatarAssetCatelogInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  hairAvatarAsset?: InputMaybe<HairAvatarAssetUpdateManyWithoutAvatarAssetCatelogInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  imgUrl?: InputMaybe<StringFieldUpdateOperationsInput>;
  isActive?: InputMaybe<BoolFieldUpdateOperationsInput>;
  label?: InputMaybe<StringFieldUpdateOperationsInput>;
  normalAvatarAsset?: InputMaybe<NormalAvatarAssetUpdateManyWithoutAvatarAssetCatalogInput>;
  skinAvatarAsset?: InputMaybe<SkinAvatarAssetUpdateManyWithoutAvatarAssetCatelogInput>;
  type?: InputMaybe<EnumAvatarAssetCatelogTypeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type AvatarAssetCatelogUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  imgUrl?: InputMaybe<StringFieldUpdateOperationsInput>;
  isActive?: InputMaybe<BoolFieldUpdateOperationsInput>;
  label?: InputMaybe<StringFieldUpdateOperationsInput>;
  type?: InputMaybe<EnumAvatarAssetCatelogTypeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type AvatarAssetCatelogUpdateManyWithWhereWithoutAvatarAssetCategoryInput = {
  data: AvatarAssetCatelogUpdateManyMutationInput;
  where: AvatarAssetCatelogScalarWhereInput;
};

export type AvatarAssetCatelogUpdateManyWithoutAvatarAssetCategoryInput = {
  connect?: InputMaybe<Array<AvatarAssetCatelogWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AvatarAssetCatelogCreateOrConnectWithoutAvatarAssetCategoryInput>>;
  create?: InputMaybe<Array<AvatarAssetCatelogCreateWithoutAvatarAssetCategoryInput>>;
  createMany?: InputMaybe<AvatarAssetCatelogCreateManyAvatarAssetCategoryInputEnvelope>;
  delete?: InputMaybe<Array<AvatarAssetCatelogWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<AvatarAssetCatelogScalarWhereInput>>;
  disconnect?: InputMaybe<Array<AvatarAssetCatelogWhereUniqueInput>>;
  set?: InputMaybe<Array<AvatarAssetCatelogWhereUniqueInput>>;
  update?: InputMaybe<Array<AvatarAssetCatelogUpdateWithWhereUniqueWithoutAvatarAssetCategoryInput>>;
  updateMany?: InputMaybe<Array<AvatarAssetCatelogUpdateManyWithWhereWithoutAvatarAssetCategoryInput>>;
  upsert?: InputMaybe<Array<AvatarAssetCatelogUpsertWithWhereUniqueWithoutAvatarAssetCategoryInput>>;
};

export type AvatarAssetCatelogUpdateOneRequiredWithoutHairAvatarAssetInput = {
  connect?: InputMaybe<AvatarAssetCatelogWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AvatarAssetCatelogCreateOrConnectWithoutHairAvatarAssetInput>;
  create?: InputMaybe<AvatarAssetCatelogCreateWithoutHairAvatarAssetInput>;
  update?: InputMaybe<AvatarAssetCatelogUpdateWithoutHairAvatarAssetInput>;
  upsert?: InputMaybe<AvatarAssetCatelogUpsertWithoutHairAvatarAssetInput>;
};

export type AvatarAssetCatelogUpdateOneWithoutNormalAvatarAssetInput = {
  connect?: InputMaybe<AvatarAssetCatelogWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AvatarAssetCatelogCreateOrConnectWithoutNormalAvatarAssetInput>;
  create?: InputMaybe<AvatarAssetCatelogCreateWithoutNormalAvatarAssetInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<AvatarAssetCatelogUpdateWithoutNormalAvatarAssetInput>;
  upsert?: InputMaybe<AvatarAssetCatelogUpsertWithoutNormalAvatarAssetInput>;
};

export type AvatarAssetCatelogUpdateOneWithoutSkinAvatarAssetInput = {
  connect?: InputMaybe<AvatarAssetCatelogWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AvatarAssetCatelogCreateOrConnectWithoutSkinAvatarAssetInput>;
  create?: InputMaybe<AvatarAssetCatelogCreateWithoutSkinAvatarAssetInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<AvatarAssetCatelogUpdateWithoutSkinAvatarAssetInput>;
  upsert?: InputMaybe<AvatarAssetCatelogUpsertWithoutSkinAvatarAssetInput>;
};

export type AvatarAssetCatelogUpdateWithWhereUniqueWithoutAvatarAssetCategoryInput = {
  data: AvatarAssetCatelogUpdateWithoutAvatarAssetCategoryInput;
  where: AvatarAssetCatelogWhereUniqueInput;
};

export type AvatarAssetCatelogUpdateWithoutAvatarAssetCategoryInput = {
  HandRelatedAvatarAsset?: InputMaybe<HandRelatedAvatarAssetUpdateManyWithoutAvatarAssetCatelogInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  hairAvatarAsset?: InputMaybe<HairAvatarAssetUpdateManyWithoutAvatarAssetCatelogInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  imgUrl?: InputMaybe<StringFieldUpdateOperationsInput>;
  isActive?: InputMaybe<BoolFieldUpdateOperationsInput>;
  label?: InputMaybe<StringFieldUpdateOperationsInput>;
  normalAvatarAsset?: InputMaybe<NormalAvatarAssetUpdateManyWithoutAvatarAssetCatalogInput>;
  skinAvatarAsset?: InputMaybe<SkinAvatarAssetUpdateManyWithoutAvatarAssetCatelogInput>;
  type?: InputMaybe<EnumAvatarAssetCatelogTypeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type AvatarAssetCatelogUpdateWithoutHairAvatarAssetInput = {
  HandRelatedAvatarAsset?: InputMaybe<HandRelatedAvatarAssetUpdateManyWithoutAvatarAssetCatelogInput>;
  avatarAssetCategory?: InputMaybe<AvatarAssetCategoryUpdateOneRequiredWithoutAvatarAssetCatelogInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  imgUrl?: InputMaybe<StringFieldUpdateOperationsInput>;
  isActive?: InputMaybe<BoolFieldUpdateOperationsInput>;
  label?: InputMaybe<StringFieldUpdateOperationsInput>;
  normalAvatarAsset?: InputMaybe<NormalAvatarAssetUpdateManyWithoutAvatarAssetCatalogInput>;
  skinAvatarAsset?: InputMaybe<SkinAvatarAssetUpdateManyWithoutAvatarAssetCatelogInput>;
  type?: InputMaybe<EnumAvatarAssetCatelogTypeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type AvatarAssetCatelogUpdateWithoutNormalAvatarAssetInput = {
  HandRelatedAvatarAsset?: InputMaybe<HandRelatedAvatarAssetUpdateManyWithoutAvatarAssetCatelogInput>;
  avatarAssetCategory?: InputMaybe<AvatarAssetCategoryUpdateOneRequiredWithoutAvatarAssetCatelogInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  hairAvatarAsset?: InputMaybe<HairAvatarAssetUpdateManyWithoutAvatarAssetCatelogInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  imgUrl?: InputMaybe<StringFieldUpdateOperationsInput>;
  isActive?: InputMaybe<BoolFieldUpdateOperationsInput>;
  label?: InputMaybe<StringFieldUpdateOperationsInput>;
  skinAvatarAsset?: InputMaybe<SkinAvatarAssetUpdateManyWithoutAvatarAssetCatelogInput>;
  type?: InputMaybe<EnumAvatarAssetCatelogTypeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type AvatarAssetCatelogUpdateWithoutSkinAvatarAssetInput = {
  HandRelatedAvatarAsset?: InputMaybe<HandRelatedAvatarAssetUpdateManyWithoutAvatarAssetCatelogInput>;
  avatarAssetCategory?: InputMaybe<AvatarAssetCategoryUpdateOneRequiredWithoutAvatarAssetCatelogInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  hairAvatarAsset?: InputMaybe<HairAvatarAssetUpdateManyWithoutAvatarAssetCatelogInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  imgUrl?: InputMaybe<StringFieldUpdateOperationsInput>;
  isActive?: InputMaybe<BoolFieldUpdateOperationsInput>;
  label?: InputMaybe<StringFieldUpdateOperationsInput>;
  normalAvatarAsset?: InputMaybe<NormalAvatarAssetUpdateManyWithoutAvatarAssetCatalogInput>;
  type?: InputMaybe<EnumAvatarAssetCatelogTypeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type AvatarAssetCatelogUpsertWithWhereUniqueWithoutAvatarAssetCategoryInput = {
  create: AvatarAssetCatelogCreateWithoutAvatarAssetCategoryInput;
  update: AvatarAssetCatelogUpdateWithoutAvatarAssetCategoryInput;
  where: AvatarAssetCatelogWhereUniqueInput;
};

export type AvatarAssetCatelogUpsertWithoutHairAvatarAssetInput = {
  create: AvatarAssetCatelogCreateWithoutHairAvatarAssetInput;
  update: AvatarAssetCatelogUpdateWithoutHairAvatarAssetInput;
};

export type AvatarAssetCatelogUpsertWithoutNormalAvatarAssetInput = {
  create: AvatarAssetCatelogCreateWithoutNormalAvatarAssetInput;
  update: AvatarAssetCatelogUpdateWithoutNormalAvatarAssetInput;
};

export type AvatarAssetCatelogUpsertWithoutSkinAvatarAssetInput = {
  create: AvatarAssetCatelogCreateWithoutSkinAvatarAssetInput;
  update: AvatarAssetCatelogUpdateWithoutSkinAvatarAssetInput;
};

export type AvatarAssetCatelogWhereInput = {
  AND?: InputMaybe<Array<AvatarAssetCatelogWhereInput>>;
  HandRelatedAvatarAsset?: InputMaybe<HandRelatedAvatarAssetListRelationFilter>;
  NOT?: InputMaybe<Array<AvatarAssetCatelogWhereInput>>;
  OR?: InputMaybe<Array<AvatarAssetCatelogWhereInput>>;
  avatarAssetCategory?: InputMaybe<AvatarAssetCategoryRelationFilter>;
  avatarAssetCategoryId?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  hairAvatarAsset?: InputMaybe<HairAvatarAssetListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  imgUrl?: InputMaybe<StringFilter>;
  isActive?: InputMaybe<BoolFilter>;
  label?: InputMaybe<StringFilter>;
  normalAvatarAsset?: InputMaybe<NormalAvatarAssetListRelationFilter>;
  skinAvatarAsset?: InputMaybe<SkinAvatarAssetListRelationFilter>;
  type?: InputMaybe<EnumAvatarAssetCatelogTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type AvatarAssetCatelogWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  imgUrl?: InputMaybe<Scalars['String']>;
};

export type AvatarAssetColour = {
  __typename?: 'AvatarAssetColour';
  HairAvatarAsset?: Maybe<Array<HairAvatarAsset>>;
  _count: AvatarAssetColourCount;
  assetType: AvatarAssetColourType;
  colourImgUrl: Scalars['String'];
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  label: Scalars['String'];
  skinAvatarAsset?: Maybe<Array<SkinAvatarAsset>>;
};

export type AvatarAssetColourCatalogDto = {
  __typename?: 'AvatarAssetColourCatalogDto';
  hair?: Maybe<Array<HairColourAvatarAsset>>;
  skin?: Maybe<Array<SkinColourAvatarAsset>>;
};

export type AvatarAssetColourCount = {
  __typename?: 'AvatarAssetColourCount';
  HairAvatarAsset: Scalars['Int'];
  skinAvatarAsset: Scalars['Int'];
};

export type AvatarAssetColourCreateInput = {
  HairAvatarAsset?: InputMaybe<HairAvatarAssetCreateNestedManyWithoutHairColourInput>;
  assetType: AvatarAssetColourType;
  colourImgUrl: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  label: Scalars['String'];
  skinAvatarAsset?: InputMaybe<SkinAvatarAssetCreateNestedManyWithoutSkinColourInput>;
};

export type AvatarAssetColourCreateNestedOneWithoutHairAvatarAssetInput = {
  connect?: InputMaybe<AvatarAssetColourWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AvatarAssetColourCreateOrConnectWithoutHairAvatarAssetInput>;
  create?: InputMaybe<AvatarAssetColourCreateWithoutHairAvatarAssetInput>;
};

export type AvatarAssetColourCreateNestedOneWithoutSkinAvatarAssetInput = {
  connect?: InputMaybe<AvatarAssetColourWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AvatarAssetColourCreateOrConnectWithoutSkinAvatarAssetInput>;
  create?: InputMaybe<AvatarAssetColourCreateWithoutSkinAvatarAssetInput>;
};

export type AvatarAssetColourCreateOrConnectWithoutHairAvatarAssetInput = {
  create: AvatarAssetColourCreateWithoutHairAvatarAssetInput;
  where: AvatarAssetColourWhereUniqueInput;
};

export type AvatarAssetColourCreateOrConnectWithoutSkinAvatarAssetInput = {
  create: AvatarAssetColourCreateWithoutSkinAvatarAssetInput;
  where: AvatarAssetColourWhereUniqueInput;
};

export type AvatarAssetColourCreateWithoutHairAvatarAssetInput = {
  assetType: AvatarAssetColourType;
  colourImgUrl: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  label: Scalars['String'];
  skinAvatarAsset?: InputMaybe<SkinAvatarAssetCreateNestedManyWithoutSkinColourInput>;
};

export type AvatarAssetColourCreateWithoutSkinAvatarAssetInput = {
  HairAvatarAsset?: InputMaybe<HairAvatarAssetCreateNestedManyWithoutHairColourInput>;
  assetType: AvatarAssetColourType;
  colourImgUrl: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  label: Scalars['String'];
};

export enum AvatarAssetColourOrderByRelevanceFieldEnum {
  ColourImgUrl = 'colourImgUrl',
  Id = 'id',
  Label = 'label'
}

export type AvatarAssetColourOrderByRelevanceInput = {
  fields: Array<AvatarAssetColourOrderByRelevanceFieldEnum>;
  search: Scalars['String'];
  sort: SortOrder;
};

export type AvatarAssetColourOrderByWithRelationAndSearchRelevanceInput = {
  HairAvatarAsset?: InputMaybe<HairAvatarAssetOrderByRelationAggregateInput>;
  _relevance?: InputMaybe<AvatarAssetColourOrderByRelevanceInput>;
  assetType?: InputMaybe<SortOrder>;
  colourImgUrl?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isActive?: InputMaybe<SortOrder>;
  label?: InputMaybe<SortOrder>;
  skinAvatarAsset?: InputMaybe<SkinAvatarAssetOrderByRelationAggregateInput>;
};

export type AvatarAssetColourRelationFilter = {
  is?: InputMaybe<AvatarAssetColourWhereInput>;
  isNot?: InputMaybe<AvatarAssetColourWhereInput>;
};

export enum AvatarAssetColourScalarFieldEnum {
  AssetType = 'assetType',
  ColourImgUrl = 'colourImgUrl',
  Id = 'id',
  IsActive = 'isActive',
  Label = 'label'
}

export enum AvatarAssetColourType {
  Hair = 'HAIR',
  Skin = 'SKIN'
}

export type AvatarAssetColourUpdateInput = {
  HairAvatarAsset?: InputMaybe<HairAvatarAssetUpdateManyWithoutHairColourInput>;
  assetType?: InputMaybe<EnumAvatarAssetColourTypeFieldUpdateOperationsInput>;
  colourImgUrl?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isActive?: InputMaybe<BoolFieldUpdateOperationsInput>;
  label?: InputMaybe<StringFieldUpdateOperationsInput>;
  skinAvatarAsset?: InputMaybe<SkinAvatarAssetUpdateManyWithoutSkinColourInput>;
};

export type AvatarAssetColourUpdateOneRequiredWithoutHairAvatarAssetInput = {
  connect?: InputMaybe<AvatarAssetColourWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AvatarAssetColourCreateOrConnectWithoutHairAvatarAssetInput>;
  create?: InputMaybe<AvatarAssetColourCreateWithoutHairAvatarAssetInput>;
  update?: InputMaybe<AvatarAssetColourUpdateWithoutHairAvatarAssetInput>;
  upsert?: InputMaybe<AvatarAssetColourUpsertWithoutHairAvatarAssetInput>;
};

export type AvatarAssetColourUpdateOneRequiredWithoutSkinAvatarAssetInput = {
  connect?: InputMaybe<AvatarAssetColourWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AvatarAssetColourCreateOrConnectWithoutSkinAvatarAssetInput>;
  create?: InputMaybe<AvatarAssetColourCreateWithoutSkinAvatarAssetInput>;
  update?: InputMaybe<AvatarAssetColourUpdateWithoutSkinAvatarAssetInput>;
  upsert?: InputMaybe<AvatarAssetColourUpsertWithoutSkinAvatarAssetInput>;
};

export type AvatarAssetColourUpdateWithoutHairAvatarAssetInput = {
  assetType?: InputMaybe<EnumAvatarAssetColourTypeFieldUpdateOperationsInput>;
  colourImgUrl?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isActive?: InputMaybe<BoolFieldUpdateOperationsInput>;
  label?: InputMaybe<StringFieldUpdateOperationsInput>;
  skinAvatarAsset?: InputMaybe<SkinAvatarAssetUpdateManyWithoutSkinColourInput>;
};

export type AvatarAssetColourUpdateWithoutSkinAvatarAssetInput = {
  HairAvatarAsset?: InputMaybe<HairAvatarAssetUpdateManyWithoutHairColourInput>;
  assetType?: InputMaybe<EnumAvatarAssetColourTypeFieldUpdateOperationsInput>;
  colourImgUrl?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isActive?: InputMaybe<BoolFieldUpdateOperationsInput>;
  label?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type AvatarAssetColourUpsertWithoutHairAvatarAssetInput = {
  create: AvatarAssetColourCreateWithoutHairAvatarAssetInput;
  update: AvatarAssetColourUpdateWithoutHairAvatarAssetInput;
};

export type AvatarAssetColourUpsertWithoutSkinAvatarAssetInput = {
  create: AvatarAssetColourCreateWithoutSkinAvatarAssetInput;
  update: AvatarAssetColourUpdateWithoutSkinAvatarAssetInput;
};

export type AvatarAssetColourWhereInput = {
  AND?: InputMaybe<Array<AvatarAssetColourWhereInput>>;
  HairAvatarAsset?: InputMaybe<HairAvatarAssetListRelationFilter>;
  NOT?: InputMaybe<Array<AvatarAssetColourWhereInput>>;
  OR?: InputMaybe<Array<AvatarAssetColourWhereInput>>;
  assetType?: InputMaybe<EnumAvatarAssetColourTypeFilter>;
  colourImgUrl?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  isActive?: InputMaybe<BoolFilter>;
  label?: InputMaybe<StringFilter>;
  skinAvatarAsset?: InputMaybe<SkinAvatarAssetListRelationFilter>;
};

export type AvatarAssetColourWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type AvatarCount = {
  __typename?: 'AvatarCount';
  items: Scalars['Int'];
};

export type AvatarCreateNestedManyWithoutItemsInput = {
  connect?: InputMaybe<Array<AvatarWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AvatarCreateOrConnectWithoutItemsInput>>;
  create?: InputMaybe<Array<AvatarCreateWithoutItemsInput>>;
};

export type AvatarCreateNestedOneWithoutStudentInput = {
  connect?: InputMaybe<AvatarWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AvatarCreateOrConnectWithoutStudentInput>;
  create?: InputMaybe<AvatarCreateWithoutStudentInput>;
};

export type AvatarCreateOrConnectWithoutItemsInput = {
  create: AvatarCreateWithoutItemsInput;
  where: AvatarWhereUniqueInput;
};

export type AvatarCreateOrConnectWithoutStudentInput = {
  create: AvatarCreateWithoutStudentInput;
  where: AvatarWhereUniqueInput;
};

export type AvatarCreateWithoutItemsInput = {
  createdAt?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  student: StudentCreateNestedOneWithoutAvatarInput;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type AvatarCreateWithoutStudentInput = {
  createdAt?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  items?: InputMaybe<AvatarItemCreateNestedManyWithoutAvatarsInput>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type AvatarItem = {
  __typename?: 'AvatarItem';
  _count: AvatarItemCount;
  accessoryItem?: Maybe<AccessoryItem>;
  acquiredItems?: Maybe<Array<AcquiredItem>>;
  asset: Asset;
  assetId: Scalars['String'];
  avatars?: Maybe<Array<Avatar>>;
  bodyPart: ItemType;
  cashPrice: Scalars['Int'];
  collection?: Maybe<Array<Scalars['String']>>;
  createdAt: Scalars['Date'];
  description: Scalars['String'];
  faceItem?: Maybe<FaceItem>;
  hairItem?: Maybe<HairItem>;
  hardPrice: Scalars['Int'];
  id: Scalars['ID'];
  name: Scalars['String'];
  publishDate: Scalars['Date'];
  rarity: ItemRarity;
  skinItem?: Maybe<SkinItem>;
  softPrice: Scalars['Int'];
  status: ItemStatus;
  topsItem?: Maybe<Array<TopsItem>>;
  updatedAt: Scalars['Date'];
  uploadDate: Scalars['Date'];
};

export type AvatarItemCount = {
  __typename?: 'AvatarItemCount';
  acquiredItems: Scalars['Int'];
  avatars: Scalars['Int'];
  topsItem: Scalars['Int'];
};

export type AvatarItemCreateNestedManyWithoutAvatarsInput = {
  connect?: InputMaybe<Array<AvatarItemWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AvatarItemCreateOrConnectWithoutAvatarsInput>>;
  create?: InputMaybe<Array<AvatarItemCreateWithoutAvatarsInput>>;
};

export type AvatarItemCreateNestedOneWithoutAcquiredItemsInput = {
  connect?: InputMaybe<AvatarItemWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AvatarItemCreateOrConnectWithoutAcquiredItemsInput>;
  create?: InputMaybe<AvatarItemCreateWithoutAcquiredItemsInput>;
};

export type AvatarItemCreateNestedOneWithoutAssetInput = {
  connect?: InputMaybe<AvatarItemWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AvatarItemCreateOrConnectWithoutAssetInput>;
  create?: InputMaybe<AvatarItemCreateWithoutAssetInput>;
};

export type AvatarItemCreateOrConnectWithoutAcquiredItemsInput = {
  create: AvatarItemCreateWithoutAcquiredItemsInput;
  where: AvatarItemWhereUniqueInput;
};

export type AvatarItemCreateOrConnectWithoutAssetInput = {
  create: AvatarItemCreateWithoutAssetInput;
  where: AvatarItemWhereUniqueInput;
};

export type AvatarItemCreateOrConnectWithoutAvatarsInput = {
  create: AvatarItemCreateWithoutAvatarsInput;
  where: AvatarItemWhereUniqueInput;
};

export type AvatarItemCreateWithoutAcquiredItemsInput = {
  accessoryItem?: InputMaybe<AccessoryItemCreateNestedOneWithoutItemInput>;
  asset: AssetCreateNestedOneWithoutAvatarItemsInput;
  avatars?: InputMaybe<AvatarCreateNestedManyWithoutItemsInput>;
  bodyPart: ItemType;
  cashPrice: Scalars['Int'];
  collection?: InputMaybe<AvatarItemCreatecollectionInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  description: Scalars['String'];
  faceItem?: InputMaybe<FaceItemCreateNestedOneWithoutItemInput>;
  hairItem?: InputMaybe<HairItemCreateNestedOneWithoutItemInput>;
  hardPrice: Scalars['Int'];
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  publishDate: Scalars['Date'];
  rarity?: InputMaybe<ItemRarity>;
  skinItem?: InputMaybe<SkinItemCreateNestedOneWithoutItemInput>;
  softPrice: Scalars['Int'];
  status?: InputMaybe<ItemStatus>;
  topsItem?: InputMaybe<TopsItemCreateNestedManyWithoutItemInput>;
  updatedAt?: InputMaybe<Scalars['Date']>;
  uploadDate?: InputMaybe<Scalars['Date']>;
};

export type AvatarItemCreateWithoutAssetInput = {
  accessoryItem?: InputMaybe<AccessoryItemCreateNestedOneWithoutItemInput>;
  acquiredItems?: InputMaybe<AcquiredItemCreateNestedManyWithoutAvatarItemInput>;
  avatars?: InputMaybe<AvatarCreateNestedManyWithoutItemsInput>;
  bodyPart: ItemType;
  cashPrice: Scalars['Int'];
  collection?: InputMaybe<AvatarItemCreatecollectionInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  description: Scalars['String'];
  faceItem?: InputMaybe<FaceItemCreateNestedOneWithoutItemInput>;
  hairItem?: InputMaybe<HairItemCreateNestedOneWithoutItemInput>;
  hardPrice: Scalars['Int'];
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  publishDate: Scalars['Date'];
  rarity?: InputMaybe<ItemRarity>;
  skinItem?: InputMaybe<SkinItemCreateNestedOneWithoutItemInput>;
  softPrice: Scalars['Int'];
  status?: InputMaybe<ItemStatus>;
  topsItem?: InputMaybe<TopsItemCreateNestedManyWithoutItemInput>;
  updatedAt?: InputMaybe<Scalars['Date']>;
  uploadDate?: InputMaybe<Scalars['Date']>;
};

export type AvatarItemCreateWithoutAvatarsInput = {
  accessoryItem?: InputMaybe<AccessoryItemCreateNestedOneWithoutItemInput>;
  acquiredItems?: InputMaybe<AcquiredItemCreateNestedManyWithoutAvatarItemInput>;
  asset: AssetCreateNestedOneWithoutAvatarItemsInput;
  bodyPart: ItemType;
  cashPrice: Scalars['Int'];
  collection?: InputMaybe<AvatarItemCreatecollectionInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  description: Scalars['String'];
  faceItem?: InputMaybe<FaceItemCreateNestedOneWithoutItemInput>;
  hairItem?: InputMaybe<HairItemCreateNestedOneWithoutItemInput>;
  hardPrice: Scalars['Int'];
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  publishDate: Scalars['Date'];
  rarity?: InputMaybe<ItemRarity>;
  skinItem?: InputMaybe<SkinItemCreateNestedOneWithoutItemInput>;
  softPrice: Scalars['Int'];
  status?: InputMaybe<ItemStatus>;
  topsItem?: InputMaybe<TopsItemCreateNestedManyWithoutItemInput>;
  updatedAt?: InputMaybe<Scalars['Date']>;
  uploadDate?: InputMaybe<Scalars['Date']>;
};

export type AvatarItemCreatecollectionInput = {
  set: Array<Scalars['String']>;
};

export type AvatarItemListRelationFilter = {
  every?: InputMaybe<AvatarItemWhereInput>;
  none?: InputMaybe<AvatarItemWhereInput>;
  some?: InputMaybe<AvatarItemWhereInput>;
};

export type AvatarItemOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export enum AvatarItemOrderByRelevanceFieldEnum {
  AssetId = 'assetId',
  Collection = 'collection',
  Description = 'description',
  Id = 'id',
  Name = 'name'
}

export type AvatarItemOrderByRelevanceInput = {
  fields: Array<AvatarItemOrderByRelevanceFieldEnum>;
  search: Scalars['String'];
  sort: SortOrder;
};

export type AvatarItemOrderByWithRelationAndSearchRelevanceInput = {
  _relevance?: InputMaybe<AvatarItemOrderByRelevanceInput>;
  accessoryItem?: InputMaybe<AccessoryItemOrderByWithRelationAndSearchRelevanceInput>;
  acquiredItems?: InputMaybe<AcquiredItemOrderByRelationAggregateInput>;
  asset?: InputMaybe<AssetOrderByWithRelationAndSearchRelevanceInput>;
  assetId?: InputMaybe<SortOrder>;
  avatars?: InputMaybe<AvatarOrderByRelationAggregateInput>;
  bodyPart?: InputMaybe<SortOrder>;
  cashPrice?: InputMaybe<SortOrder>;
  collection?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  faceItem?: InputMaybe<FaceItemOrderByWithRelationAndSearchRelevanceInput>;
  hairItem?: InputMaybe<HairItemOrderByWithRelationAndSearchRelevanceInput>;
  hardPrice?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  publishDate?: InputMaybe<SortOrder>;
  rarity?: InputMaybe<SortOrder>;
  skinItem?: InputMaybe<SkinItemOrderByWithRelationAndSearchRelevanceInput>;
  softPrice?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  topsItem?: InputMaybe<TopsItemOrderByRelationAggregateInput>;
  updatedAt?: InputMaybe<SortOrder>;
  uploadDate?: InputMaybe<SortOrder>;
};

export type AvatarItemRelationFilter = {
  is?: InputMaybe<AvatarItemWhereInput>;
  isNot?: InputMaybe<AvatarItemWhereInput>;
};

export enum AvatarItemScalarFieldEnum {
  AssetId = 'assetId',
  BodyPart = 'bodyPart',
  CashPrice = 'cashPrice',
  Collection = 'collection',
  CreatedAt = 'createdAt',
  Description = 'description',
  HardPrice = 'hardPrice',
  Id = 'id',
  Name = 'name',
  PublishDate = 'publishDate',
  Rarity = 'rarity',
  SoftPrice = 'softPrice',
  Status = 'status',
  UpdatedAt = 'updatedAt',
  UploadDate = 'uploadDate'
}

export type AvatarItemScalarWhereInput = {
  AND?: InputMaybe<Array<AvatarItemScalarWhereInput>>;
  NOT?: InputMaybe<Array<AvatarItemScalarWhereInput>>;
  OR?: InputMaybe<Array<AvatarItemScalarWhereInput>>;
  assetId?: InputMaybe<StringFilter>;
  bodyPart?: InputMaybe<EnumItemTypeFilter>;
  cashPrice?: InputMaybe<IntFilter>;
  collection?: InputMaybe<StringNullableListFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringFilter>;
  hardPrice?: InputMaybe<IntFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  publishDate?: InputMaybe<DateTimeFilter>;
  rarity?: InputMaybe<EnumItemRarityFilter>;
  softPrice?: InputMaybe<IntFilter>;
  status?: InputMaybe<EnumItemStatusFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  uploadDate?: InputMaybe<DateTimeFilter>;
};

export type AvatarItemUpdateManyMutationInput = {
  bodyPart?: InputMaybe<EnumItemTypeFieldUpdateOperationsInput>;
  cashPrice?: InputMaybe<IntFieldUpdateOperationsInput>;
  collection?: InputMaybe<AvatarItemUpdatecollectionInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  hardPrice?: InputMaybe<IntFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  publishDate?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  rarity?: InputMaybe<EnumItemRarityFieldUpdateOperationsInput>;
  softPrice?: InputMaybe<IntFieldUpdateOperationsInput>;
  status?: InputMaybe<EnumItemStatusFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploadDate?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type AvatarItemUpdateManyWithWhereWithoutAvatarsInput = {
  data: AvatarItemUpdateManyMutationInput;
  where: AvatarItemScalarWhereInput;
};

export type AvatarItemUpdateManyWithoutAvatarsInput = {
  connect?: InputMaybe<Array<AvatarItemWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AvatarItemCreateOrConnectWithoutAvatarsInput>>;
  create?: InputMaybe<Array<AvatarItemCreateWithoutAvatarsInput>>;
  delete?: InputMaybe<Array<AvatarItemWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<AvatarItemScalarWhereInput>>;
  disconnect?: InputMaybe<Array<AvatarItemWhereUniqueInput>>;
  set?: InputMaybe<Array<AvatarItemWhereUniqueInput>>;
  update?: InputMaybe<Array<AvatarItemUpdateWithWhereUniqueWithoutAvatarsInput>>;
  updateMany?: InputMaybe<Array<AvatarItemUpdateManyWithWhereWithoutAvatarsInput>>;
  upsert?: InputMaybe<Array<AvatarItemUpsertWithWhereUniqueWithoutAvatarsInput>>;
};

export type AvatarItemUpdateOneRequiredWithoutAcquiredItemsInput = {
  connect?: InputMaybe<AvatarItemWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AvatarItemCreateOrConnectWithoutAcquiredItemsInput>;
  create?: InputMaybe<AvatarItemCreateWithoutAcquiredItemsInput>;
  update?: InputMaybe<AvatarItemUpdateWithoutAcquiredItemsInput>;
  upsert?: InputMaybe<AvatarItemUpsertWithoutAcquiredItemsInput>;
};

export type AvatarItemUpdateOneWithoutAssetInput = {
  connect?: InputMaybe<AvatarItemWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AvatarItemCreateOrConnectWithoutAssetInput>;
  create?: InputMaybe<AvatarItemCreateWithoutAssetInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<AvatarItemUpdateWithoutAssetInput>;
  upsert?: InputMaybe<AvatarItemUpsertWithoutAssetInput>;
};

export type AvatarItemUpdateWithWhereUniqueWithoutAvatarsInput = {
  data: AvatarItemUpdateWithoutAvatarsInput;
  where: AvatarItemWhereUniqueInput;
};

export type AvatarItemUpdateWithoutAcquiredItemsInput = {
  accessoryItem?: InputMaybe<AccessoryItemUpdateOneWithoutItemInput>;
  asset?: InputMaybe<AssetUpdateOneRequiredWithoutAvatarItemsInput>;
  avatars?: InputMaybe<AvatarUpdateManyWithoutItemsInput>;
  bodyPart?: InputMaybe<EnumItemTypeFieldUpdateOperationsInput>;
  cashPrice?: InputMaybe<IntFieldUpdateOperationsInput>;
  collection?: InputMaybe<AvatarItemUpdatecollectionInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  faceItem?: InputMaybe<FaceItemUpdateOneWithoutItemInput>;
  hairItem?: InputMaybe<HairItemUpdateOneWithoutItemInput>;
  hardPrice?: InputMaybe<IntFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  publishDate?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  rarity?: InputMaybe<EnumItemRarityFieldUpdateOperationsInput>;
  skinItem?: InputMaybe<SkinItemUpdateOneWithoutItemInput>;
  softPrice?: InputMaybe<IntFieldUpdateOperationsInput>;
  status?: InputMaybe<EnumItemStatusFieldUpdateOperationsInput>;
  topsItem?: InputMaybe<TopsItemUpdateManyWithoutItemInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploadDate?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type AvatarItemUpdateWithoutAssetInput = {
  accessoryItem?: InputMaybe<AccessoryItemUpdateOneWithoutItemInput>;
  acquiredItems?: InputMaybe<AcquiredItemUpdateManyWithoutAvatarItemInput>;
  avatars?: InputMaybe<AvatarUpdateManyWithoutItemsInput>;
  bodyPart?: InputMaybe<EnumItemTypeFieldUpdateOperationsInput>;
  cashPrice?: InputMaybe<IntFieldUpdateOperationsInput>;
  collection?: InputMaybe<AvatarItemUpdatecollectionInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  faceItem?: InputMaybe<FaceItemUpdateOneWithoutItemInput>;
  hairItem?: InputMaybe<HairItemUpdateOneWithoutItemInput>;
  hardPrice?: InputMaybe<IntFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  publishDate?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  rarity?: InputMaybe<EnumItemRarityFieldUpdateOperationsInput>;
  skinItem?: InputMaybe<SkinItemUpdateOneWithoutItemInput>;
  softPrice?: InputMaybe<IntFieldUpdateOperationsInput>;
  status?: InputMaybe<EnumItemStatusFieldUpdateOperationsInput>;
  topsItem?: InputMaybe<TopsItemUpdateManyWithoutItemInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploadDate?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type AvatarItemUpdateWithoutAvatarsInput = {
  accessoryItem?: InputMaybe<AccessoryItemUpdateOneWithoutItemInput>;
  acquiredItems?: InputMaybe<AcquiredItemUpdateManyWithoutAvatarItemInput>;
  asset?: InputMaybe<AssetUpdateOneRequiredWithoutAvatarItemsInput>;
  bodyPart?: InputMaybe<EnumItemTypeFieldUpdateOperationsInput>;
  cashPrice?: InputMaybe<IntFieldUpdateOperationsInput>;
  collection?: InputMaybe<AvatarItemUpdatecollectionInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  faceItem?: InputMaybe<FaceItemUpdateOneWithoutItemInput>;
  hairItem?: InputMaybe<HairItemUpdateOneWithoutItemInput>;
  hardPrice?: InputMaybe<IntFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  publishDate?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  rarity?: InputMaybe<EnumItemRarityFieldUpdateOperationsInput>;
  skinItem?: InputMaybe<SkinItemUpdateOneWithoutItemInput>;
  softPrice?: InputMaybe<IntFieldUpdateOperationsInput>;
  status?: InputMaybe<EnumItemStatusFieldUpdateOperationsInput>;
  topsItem?: InputMaybe<TopsItemUpdateManyWithoutItemInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploadDate?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type AvatarItemUpdatecollectionInput = {
  push?: InputMaybe<Array<Scalars['String']>>;
  set?: InputMaybe<Array<Scalars['String']>>;
};

export type AvatarItemUpsertWithWhereUniqueWithoutAvatarsInput = {
  create: AvatarItemCreateWithoutAvatarsInput;
  update: AvatarItemUpdateWithoutAvatarsInput;
  where: AvatarItemWhereUniqueInput;
};

export type AvatarItemUpsertWithoutAcquiredItemsInput = {
  create: AvatarItemCreateWithoutAcquiredItemsInput;
  update: AvatarItemUpdateWithoutAcquiredItemsInput;
};

export type AvatarItemUpsertWithoutAssetInput = {
  create: AvatarItemCreateWithoutAssetInput;
  update: AvatarItemUpdateWithoutAssetInput;
};

export type AvatarItemWhereInput = {
  AND?: InputMaybe<Array<AvatarItemWhereInput>>;
  NOT?: InputMaybe<Array<AvatarItemWhereInput>>;
  OR?: InputMaybe<Array<AvatarItemWhereInput>>;
  accessoryItem?: InputMaybe<AccessoryItemRelationFilter>;
  acquiredItems?: InputMaybe<AcquiredItemListRelationFilter>;
  asset?: InputMaybe<AssetRelationFilter>;
  assetId?: InputMaybe<StringFilter>;
  avatars?: InputMaybe<AvatarListRelationFilter>;
  bodyPart?: InputMaybe<EnumItemTypeFilter>;
  cashPrice?: InputMaybe<IntFilter>;
  collection?: InputMaybe<StringNullableListFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringFilter>;
  faceItem?: InputMaybe<FaceItemRelationFilter>;
  hairItem?: InputMaybe<HairItemRelationFilter>;
  hardPrice?: InputMaybe<IntFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  publishDate?: InputMaybe<DateTimeFilter>;
  rarity?: InputMaybe<EnumItemRarityFilter>;
  skinItem?: InputMaybe<SkinItemRelationFilter>;
  softPrice?: InputMaybe<IntFilter>;
  status?: InputMaybe<EnumItemStatusFilter>;
  topsItem?: InputMaybe<TopsItemListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  uploadDate?: InputMaybe<DateTimeFilter>;
};

export type AvatarItemWhereUniqueInput = {
  assetId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
};

export type AvatarListRelationFilter = {
  every?: InputMaybe<AvatarWhereInput>;
  none?: InputMaybe<AvatarWhereInput>;
  some?: InputMaybe<AvatarWhereInput>;
};

export type AvatarOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export enum AvatarOrderByRelevanceFieldEnum {
  Id = 'id',
  StudentId = 'studentId'
}

export type AvatarOrderByRelevanceInput = {
  fields: Array<AvatarOrderByRelevanceFieldEnum>;
  search: Scalars['String'];
  sort: SortOrder;
};

export type AvatarOrderByWithRelationAndSearchRelevanceInput = {
  _relevance?: InputMaybe<AvatarOrderByRelevanceInput>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  items?: InputMaybe<AvatarItemOrderByRelationAggregateInput>;
  student?: InputMaybe<StudentOrderByWithRelationAndSearchRelevanceInput>;
  studentId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type AvatarRelationFilter = {
  is?: InputMaybe<AvatarWhereInput>;
  isNot?: InputMaybe<AvatarWhereInput>;
};

export type AvatarScalarWhereInput = {
  AND?: InputMaybe<Array<AvatarScalarWhereInput>>;
  NOT?: InputMaybe<Array<AvatarScalarWhereInput>>;
  OR?: InputMaybe<Array<AvatarScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  studentId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type AvatarUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type AvatarUpdateManyWithWhereWithoutItemsInput = {
  data: AvatarUpdateManyMutationInput;
  where: AvatarScalarWhereInput;
};

export type AvatarUpdateManyWithoutItemsInput = {
  connect?: InputMaybe<Array<AvatarWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AvatarCreateOrConnectWithoutItemsInput>>;
  create?: InputMaybe<Array<AvatarCreateWithoutItemsInput>>;
  delete?: InputMaybe<Array<AvatarWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<AvatarScalarWhereInput>>;
  disconnect?: InputMaybe<Array<AvatarWhereUniqueInput>>;
  set?: InputMaybe<Array<AvatarWhereUniqueInput>>;
  update?: InputMaybe<Array<AvatarUpdateWithWhereUniqueWithoutItemsInput>>;
  updateMany?: InputMaybe<Array<AvatarUpdateManyWithWhereWithoutItemsInput>>;
  upsert?: InputMaybe<Array<AvatarUpsertWithWhereUniqueWithoutItemsInput>>;
};

export type AvatarUpdateOneWithoutStudentInput = {
  connect?: InputMaybe<AvatarWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AvatarCreateOrConnectWithoutStudentInput>;
  create?: InputMaybe<AvatarCreateWithoutStudentInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<AvatarUpdateWithoutStudentInput>;
  upsert?: InputMaybe<AvatarUpsertWithoutStudentInput>;
};

export type AvatarUpdateWithWhereUniqueWithoutItemsInput = {
  data: AvatarUpdateWithoutItemsInput;
  where: AvatarWhereUniqueInput;
};

export type AvatarUpdateWithoutItemsInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  student?: InputMaybe<StudentUpdateOneRequiredWithoutAvatarInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type AvatarUpdateWithoutStudentInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  items?: InputMaybe<AvatarItemUpdateManyWithoutAvatarsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type AvatarUpsertWithWhereUniqueWithoutItemsInput = {
  create: AvatarCreateWithoutItemsInput;
  update: AvatarUpdateWithoutItemsInput;
  where: AvatarWhereUniqueInput;
};

export type AvatarUpsertWithoutStudentInput = {
  create: AvatarCreateWithoutStudentInput;
  update: AvatarUpdateWithoutStudentInput;
};

export type AvatarWhereInput = {
  AND?: InputMaybe<Array<AvatarWhereInput>>;
  NOT?: InputMaybe<Array<AvatarWhereInput>>;
  OR?: InputMaybe<Array<AvatarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  items?: InputMaybe<AvatarItemListRelationFilter>;
  student?: InputMaybe<StudentRelationFilter>;
  studentId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type AvatarWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  studentId?: InputMaybe<Scalars['String']>;
};

export type Balance = {
  __typename?: 'Balance';
  hardBalance: Scalars['String'];
  id: Scalars['ID'];
  softBalance: Scalars['String'];
  student: Student;
  studentId: Scalars['String'];
  updatedAt: Scalars['Date'];
};

export type BalanceCreateNestedOneWithoutStudentInput = {
  connect?: InputMaybe<BalanceWhereUniqueInput>;
  connectOrCreate?: InputMaybe<BalanceCreateOrConnectWithoutStudentInput>;
  create?: InputMaybe<BalanceCreateWithoutStudentInput>;
};

export type BalanceCreateOrConnectWithoutStudentInput = {
  create: BalanceCreateWithoutStudentInput;
  where: BalanceWhereUniqueInput;
};

export type BalanceCreateWithoutStudentInput = {
  hardBalance?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  softBalance?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export enum BalanceOrderByRelevanceFieldEnum {
  Id = 'id',
  StudentId = 'studentId'
}

export type BalanceOrderByRelevanceInput = {
  fields: Array<BalanceOrderByRelevanceFieldEnum>;
  search: Scalars['String'];
  sort: SortOrder;
};

export type BalanceOrderByWithRelationAndSearchRelevanceInput = {
  _relevance?: InputMaybe<BalanceOrderByRelevanceInput>;
  hardBalance?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  softBalance?: InputMaybe<SortOrder>;
  student?: InputMaybe<StudentOrderByWithRelationAndSearchRelevanceInput>;
  studentId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type BalanceRelationFilter = {
  is?: InputMaybe<BalanceWhereInput>;
  isNot?: InputMaybe<BalanceWhereInput>;
};

export type BalanceUpdateOneWithoutStudentInput = {
  connect?: InputMaybe<BalanceWhereUniqueInput>;
  connectOrCreate?: InputMaybe<BalanceCreateOrConnectWithoutStudentInput>;
  create?: InputMaybe<BalanceCreateWithoutStudentInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<BalanceUpdateWithoutStudentInput>;
  upsert?: InputMaybe<BalanceUpsertWithoutStudentInput>;
};

export type BalanceUpdateWithoutStudentInput = {
  hardBalance?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  softBalance?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type BalanceUpsertWithoutStudentInput = {
  create: BalanceCreateWithoutStudentInput;
  update: BalanceUpdateWithoutStudentInput;
};

export type BalanceWhereInput = {
  AND?: InputMaybe<Array<BalanceWhereInput>>;
  NOT?: InputMaybe<Array<BalanceWhereInput>>;
  OR?: InputMaybe<Array<BalanceWhereInput>>;
  hardBalance?: InputMaybe<BigIntFilter>;
  id?: InputMaybe<StringFilter>;
  softBalance?: InputMaybe<BigIntFilter>;
  student?: InputMaybe<StudentRelationFilter>;
  studentId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type BalanceWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  studentId?: InputMaybe<Scalars['String']>;
};

export type BigIntFieldUpdateOperationsInput = {
  decrement?: InputMaybe<Scalars['String']>;
  divide?: InputMaybe<Scalars['String']>;
  increment?: InputMaybe<Scalars['String']>;
  multiply?: InputMaybe<Scalars['String']>;
  set?: InputMaybe<Scalars['String']>;
};

export type BigIntFilter = {
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedBigIntFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
};

export type Block = {
  __typename?: 'Block';
  AssessmentBlock?: Maybe<Array<AssessmentBlock>>;
  _count: BlockCount;
  attachmentBlock?: Maybe<AttachmentBlock>;
  blockType: BlockType;
  challengeBlock?: Maybe<ChallengeBlock>;
  checkpoint: Checkpoint;
  checkpointId: Scalars['String'];
  createdAt: Scalars['Date'];
  deleted?: Maybe<Scalars['Date']>;
  id: Scalars['ID'];
  mediaBlock?: Maybe<MediaBlock>;
  order: Scalars['Int'];
  questionBlock?: Maybe<QuestionBlock>;
  textBlock?: Maybe<TextBlock>;
  updatedAt: Scalars['Date'];
};

export type BlockCount = {
  __typename?: 'BlockCount';
  AssessmentBlock: Scalars['Int'];
};

export type BlockCreateManyCheckpointInput = {
  blockType?: InputMaybe<BlockType>;
  createdAt?: InputMaybe<Scalars['Date']>;
  deleted?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  order: Scalars['Int'];
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type BlockCreateManyCheckpointInputEnvelope = {
  data: Array<BlockCreateManyCheckpointInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type BlockCreateNestedManyWithoutCheckpointInput = {
  connect?: InputMaybe<Array<BlockWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<BlockCreateOrConnectWithoutCheckpointInput>>;
  create?: InputMaybe<Array<BlockCreateWithoutCheckpointInput>>;
  createMany?: InputMaybe<BlockCreateManyCheckpointInputEnvelope>;
};

export type BlockCreateNestedOneWithoutAssessmentBlockInput = {
  connect?: InputMaybe<BlockWhereUniqueInput>;
  connectOrCreate?: InputMaybe<BlockCreateOrConnectWithoutAssessmentBlockInput>;
  create?: InputMaybe<BlockCreateWithoutAssessmentBlockInput>;
};

export type BlockCreateNestedOneWithoutAttachmentBlockInput = {
  connect?: InputMaybe<BlockWhereUniqueInput>;
  connectOrCreate?: InputMaybe<BlockCreateOrConnectWithoutAttachmentBlockInput>;
  create?: InputMaybe<BlockCreateWithoutAttachmentBlockInput>;
};

export type BlockCreateNestedOneWithoutChallengeBlockInput = {
  connect?: InputMaybe<BlockWhereUniqueInput>;
  connectOrCreate?: InputMaybe<BlockCreateOrConnectWithoutChallengeBlockInput>;
  create?: InputMaybe<BlockCreateWithoutChallengeBlockInput>;
};

export type BlockCreateNestedOneWithoutMediaBlockInput = {
  connect?: InputMaybe<BlockWhereUniqueInput>;
  connectOrCreate?: InputMaybe<BlockCreateOrConnectWithoutMediaBlockInput>;
  create?: InputMaybe<BlockCreateWithoutMediaBlockInput>;
};

export type BlockCreateNestedOneWithoutQuestionBlockInput = {
  connect?: InputMaybe<BlockWhereUniqueInput>;
  connectOrCreate?: InputMaybe<BlockCreateOrConnectWithoutQuestionBlockInput>;
  create?: InputMaybe<BlockCreateWithoutQuestionBlockInput>;
};

export type BlockCreateOrConnectWithoutAssessmentBlockInput = {
  create: BlockCreateWithoutAssessmentBlockInput;
  where: BlockWhereUniqueInput;
};

export type BlockCreateOrConnectWithoutAttachmentBlockInput = {
  create: BlockCreateWithoutAttachmentBlockInput;
  where: BlockWhereUniqueInput;
};

export type BlockCreateOrConnectWithoutChallengeBlockInput = {
  create: BlockCreateWithoutChallengeBlockInput;
  where: BlockWhereUniqueInput;
};

export type BlockCreateOrConnectWithoutCheckpointInput = {
  create: BlockCreateWithoutCheckpointInput;
  where: BlockWhereUniqueInput;
};

export type BlockCreateOrConnectWithoutMediaBlockInput = {
  create: BlockCreateWithoutMediaBlockInput;
  where: BlockWhereUniqueInput;
};

export type BlockCreateOrConnectWithoutQuestionBlockInput = {
  create: BlockCreateWithoutQuestionBlockInput;
  where: BlockWhereUniqueInput;
};

export type BlockCreateWithoutAssessmentBlockInput = {
  attachmentBlock?: InputMaybe<AttachmentBlockCreateNestedOneWithoutBlockInput>;
  blockType?: InputMaybe<BlockType>;
  challengeBlock?: InputMaybe<ChallengeBlockCreateNestedOneWithoutBlockInput>;
  checkpoint: CheckpointCreateNestedOneWithoutBlocksInput;
  createdAt?: InputMaybe<Scalars['Date']>;
  deleted?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  mediaBlock?: InputMaybe<MediaBlockCreateNestedOneWithoutBlockInput>;
  order: Scalars['Int'];
  questionBlock?: InputMaybe<QuestionBlockCreateNestedOneWithoutBlockInput>;
  textBlock?: InputMaybe<TextBlockCreateNestedOneWithoutBlockInput>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type BlockCreateWithoutAttachmentBlockInput = {
  AssessmentBlock?: InputMaybe<AssessmentBlockCreateNestedManyWithoutQuestionInput>;
  blockType?: InputMaybe<BlockType>;
  challengeBlock?: InputMaybe<ChallengeBlockCreateNestedOneWithoutBlockInput>;
  checkpoint: CheckpointCreateNestedOneWithoutBlocksInput;
  createdAt?: InputMaybe<Scalars['Date']>;
  deleted?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  mediaBlock?: InputMaybe<MediaBlockCreateNestedOneWithoutBlockInput>;
  order: Scalars['Int'];
  questionBlock?: InputMaybe<QuestionBlockCreateNestedOneWithoutBlockInput>;
  textBlock?: InputMaybe<TextBlockCreateNestedOneWithoutBlockInput>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type BlockCreateWithoutChallengeBlockInput = {
  AssessmentBlock?: InputMaybe<AssessmentBlockCreateNestedManyWithoutQuestionInput>;
  attachmentBlock?: InputMaybe<AttachmentBlockCreateNestedOneWithoutBlockInput>;
  blockType?: InputMaybe<BlockType>;
  checkpoint: CheckpointCreateNestedOneWithoutBlocksInput;
  createdAt?: InputMaybe<Scalars['Date']>;
  deleted?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  mediaBlock?: InputMaybe<MediaBlockCreateNestedOneWithoutBlockInput>;
  order: Scalars['Int'];
  questionBlock?: InputMaybe<QuestionBlockCreateNestedOneWithoutBlockInput>;
  textBlock?: InputMaybe<TextBlockCreateNestedOneWithoutBlockInput>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type BlockCreateWithoutCheckpointInput = {
  AssessmentBlock?: InputMaybe<AssessmentBlockCreateNestedManyWithoutQuestionInput>;
  attachmentBlock?: InputMaybe<AttachmentBlockCreateNestedOneWithoutBlockInput>;
  blockType?: InputMaybe<BlockType>;
  challengeBlock?: InputMaybe<ChallengeBlockCreateNestedOneWithoutBlockInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  deleted?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  mediaBlock?: InputMaybe<MediaBlockCreateNestedOneWithoutBlockInput>;
  order: Scalars['Int'];
  questionBlock?: InputMaybe<QuestionBlockCreateNestedOneWithoutBlockInput>;
  textBlock?: InputMaybe<TextBlockCreateNestedOneWithoutBlockInput>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type BlockCreateWithoutMediaBlockInput = {
  AssessmentBlock?: InputMaybe<AssessmentBlockCreateNestedManyWithoutQuestionInput>;
  attachmentBlock?: InputMaybe<AttachmentBlockCreateNestedOneWithoutBlockInput>;
  blockType?: InputMaybe<BlockType>;
  challengeBlock?: InputMaybe<ChallengeBlockCreateNestedOneWithoutBlockInput>;
  checkpoint: CheckpointCreateNestedOneWithoutBlocksInput;
  createdAt?: InputMaybe<Scalars['Date']>;
  deleted?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  order: Scalars['Int'];
  questionBlock?: InputMaybe<QuestionBlockCreateNestedOneWithoutBlockInput>;
  textBlock?: InputMaybe<TextBlockCreateNestedOneWithoutBlockInput>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type BlockCreateWithoutQuestionBlockInput = {
  AssessmentBlock?: InputMaybe<AssessmentBlockCreateNestedManyWithoutQuestionInput>;
  attachmentBlock?: InputMaybe<AttachmentBlockCreateNestedOneWithoutBlockInput>;
  blockType?: InputMaybe<BlockType>;
  challengeBlock?: InputMaybe<ChallengeBlockCreateNestedOneWithoutBlockInput>;
  checkpoint: CheckpointCreateNestedOneWithoutBlocksInput;
  createdAt?: InputMaybe<Scalars['Date']>;
  deleted?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  mediaBlock?: InputMaybe<MediaBlockCreateNestedOneWithoutBlockInput>;
  order: Scalars['Int'];
  textBlock?: InputMaybe<TextBlockCreateNestedOneWithoutBlockInput>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export enum BlockGeneralType {
  Attachment = 'ATTACHMENT',
  Challenge = 'CHALLENGE',
  Media = 'MEDIA',
  Text = 'TEXT'
}

export type BlockListRelationFilter = {
  every?: InputMaybe<BlockWhereInput>;
  none?: InputMaybe<BlockWhereInput>;
  some?: InputMaybe<BlockWhereInput>;
};

export type BlockOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export enum BlockOrderByRelevanceFieldEnum {
  CheckpointId = 'checkpointId',
  Id = 'id'
}

export type BlockOrderByRelevanceInput = {
  fields: Array<BlockOrderByRelevanceFieldEnum>;
  search: Scalars['String'];
  sort: SortOrder;
};

export type BlockOrderByWithRelationAndSearchRelevanceInput = {
  AssessmentBlock?: InputMaybe<AssessmentBlockOrderByRelationAggregateInput>;
  _relevance?: InputMaybe<BlockOrderByRelevanceInput>;
  attachmentBlock?: InputMaybe<AttachmentBlockOrderByWithRelationAndSearchRelevanceInput>;
  blockType?: InputMaybe<SortOrder>;
  challengeBlock?: InputMaybe<ChallengeBlockOrderByWithRelationAndSearchRelevanceInput>;
  checkpoint?: InputMaybe<CheckpointOrderByWithRelationAndSearchRelevanceInput>;
  checkpointId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  deleted?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  mediaBlock?: InputMaybe<MediaBlockOrderByWithRelationAndSearchRelevanceInput>;
  order?: InputMaybe<SortOrder>;
  questionBlock?: InputMaybe<QuestionBlockOrderByWithRelationAndSearchRelevanceInput>;
  textBlock?: InputMaybe<TextBlockOrderByWithRelationAndSearchRelevanceInput>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type BlockRelationFilter = {
  is?: InputMaybe<BlockWhereInput>;
  isNot?: InputMaybe<BlockWhereInput>;
};

export enum BlockScalarFieldEnum {
  BlockType = 'blockType',
  CheckpointId = 'checkpointId',
  CreatedAt = 'createdAt',
  Deleted = 'deleted',
  Id = 'id',
  Order = 'order',
  UpdatedAt = 'updatedAt'
}

export type BlockScalarWhereInput = {
  AND?: InputMaybe<Array<BlockScalarWhereInput>>;
  NOT?: InputMaybe<Array<BlockScalarWhereInput>>;
  OR?: InputMaybe<Array<BlockScalarWhereInput>>;
  blockType?: InputMaybe<EnumBlockTypeFilter>;
  checkpointId?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  deleted?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<StringFilter>;
  order?: InputMaybe<IntFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export enum BlockType {
  Attachment = 'ATTACHMENT',
  Challenge = 'CHALLENGE',
  Media = 'MEDIA',
  Question = 'QUESTION',
  Text = 'TEXT'
}

export type BlockUncheckedCreateNestedManyWithoutCheckpointInput = {
  connect?: InputMaybe<Array<BlockWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<BlockCreateOrConnectWithoutCheckpointInput>>;
  create?: InputMaybe<Array<BlockCreateWithoutCheckpointInput>>;
  createMany?: InputMaybe<BlockCreateManyCheckpointInputEnvelope>;
};

export type BlockUpdateManyMutationInput = {
  blockType?: InputMaybe<EnumBlockTypeFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deleted?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  order?: InputMaybe<IntFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type BlockUpdateManyWithWhereWithoutCheckpointInput = {
  data: BlockUpdateManyMutationInput;
  where: BlockScalarWhereInput;
};

export type BlockUpdateManyWithoutCheckpointInput = {
  connect?: InputMaybe<Array<BlockWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<BlockCreateOrConnectWithoutCheckpointInput>>;
  create?: InputMaybe<Array<BlockCreateWithoutCheckpointInput>>;
  createMany?: InputMaybe<BlockCreateManyCheckpointInputEnvelope>;
  delete?: InputMaybe<Array<BlockWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<BlockScalarWhereInput>>;
  disconnect?: InputMaybe<Array<BlockWhereUniqueInput>>;
  set?: InputMaybe<Array<BlockWhereUniqueInput>>;
  update?: InputMaybe<Array<BlockUpdateWithWhereUniqueWithoutCheckpointInput>>;
  updateMany?: InputMaybe<Array<BlockUpdateManyWithWhereWithoutCheckpointInput>>;
  upsert?: InputMaybe<Array<BlockUpsertWithWhereUniqueWithoutCheckpointInput>>;
};

export type BlockUpdateOneRequiredWithoutAssessmentBlockInput = {
  connect?: InputMaybe<BlockWhereUniqueInput>;
  connectOrCreate?: InputMaybe<BlockCreateOrConnectWithoutAssessmentBlockInput>;
  create?: InputMaybe<BlockCreateWithoutAssessmentBlockInput>;
  update?: InputMaybe<BlockUpdateWithoutAssessmentBlockInput>;
  upsert?: InputMaybe<BlockUpsertWithoutAssessmentBlockInput>;
};

export type BlockUpdateOneRequiredWithoutAttachmentBlockInput = {
  connect?: InputMaybe<BlockWhereUniqueInput>;
  connectOrCreate?: InputMaybe<BlockCreateOrConnectWithoutAttachmentBlockInput>;
  create?: InputMaybe<BlockCreateWithoutAttachmentBlockInput>;
  update?: InputMaybe<BlockUpdateWithoutAttachmentBlockInput>;
  upsert?: InputMaybe<BlockUpsertWithoutAttachmentBlockInput>;
};

export type BlockUpdateOneRequiredWithoutMediaBlockInput = {
  connect?: InputMaybe<BlockWhereUniqueInput>;
  connectOrCreate?: InputMaybe<BlockCreateOrConnectWithoutMediaBlockInput>;
  create?: InputMaybe<BlockCreateWithoutMediaBlockInput>;
  update?: InputMaybe<BlockUpdateWithoutMediaBlockInput>;
  upsert?: InputMaybe<BlockUpsertWithoutMediaBlockInput>;
};

export type BlockUpdateOneWithoutChallengeBlockInput = {
  connect?: InputMaybe<BlockWhereUniqueInput>;
  connectOrCreate?: InputMaybe<BlockCreateOrConnectWithoutChallengeBlockInput>;
  create?: InputMaybe<BlockCreateWithoutChallengeBlockInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<BlockUpdateWithoutChallengeBlockInput>;
  upsert?: InputMaybe<BlockUpsertWithoutChallengeBlockInput>;
};

export type BlockUpdateOneWithoutQuestionBlockInput = {
  connect?: InputMaybe<BlockWhereUniqueInput>;
  connectOrCreate?: InputMaybe<BlockCreateOrConnectWithoutQuestionBlockInput>;
  create?: InputMaybe<BlockCreateWithoutQuestionBlockInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<BlockUpdateWithoutQuestionBlockInput>;
  upsert?: InputMaybe<BlockUpsertWithoutQuestionBlockInput>;
};

export type BlockUpdateWithWhereUniqueWithoutCheckpointInput = {
  data: BlockUpdateWithoutCheckpointInput;
  where: BlockWhereUniqueInput;
};

export type BlockUpdateWithoutAssessmentBlockInput = {
  attachmentBlock?: InputMaybe<AttachmentBlockUpdateOneWithoutBlockInput>;
  blockType?: InputMaybe<EnumBlockTypeFieldUpdateOperationsInput>;
  challengeBlock?: InputMaybe<ChallengeBlockUpdateOneWithoutBlockInput>;
  checkpoint?: InputMaybe<CheckpointUpdateOneRequiredWithoutBlocksInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deleted?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  mediaBlock?: InputMaybe<MediaBlockUpdateOneWithoutBlockInput>;
  order?: InputMaybe<IntFieldUpdateOperationsInput>;
  questionBlock?: InputMaybe<QuestionBlockUpdateOneWithoutBlockInput>;
  textBlock?: InputMaybe<TextBlockUpdateOneWithoutBlockInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type BlockUpdateWithoutAttachmentBlockInput = {
  AssessmentBlock?: InputMaybe<AssessmentBlockUpdateManyWithoutQuestionInput>;
  blockType?: InputMaybe<EnumBlockTypeFieldUpdateOperationsInput>;
  challengeBlock?: InputMaybe<ChallengeBlockUpdateOneWithoutBlockInput>;
  checkpoint?: InputMaybe<CheckpointUpdateOneRequiredWithoutBlocksInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deleted?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  mediaBlock?: InputMaybe<MediaBlockUpdateOneWithoutBlockInput>;
  order?: InputMaybe<IntFieldUpdateOperationsInput>;
  questionBlock?: InputMaybe<QuestionBlockUpdateOneWithoutBlockInput>;
  textBlock?: InputMaybe<TextBlockUpdateOneWithoutBlockInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type BlockUpdateWithoutChallengeBlockInput = {
  AssessmentBlock?: InputMaybe<AssessmentBlockUpdateManyWithoutQuestionInput>;
  attachmentBlock?: InputMaybe<AttachmentBlockUpdateOneWithoutBlockInput>;
  blockType?: InputMaybe<EnumBlockTypeFieldUpdateOperationsInput>;
  checkpoint?: InputMaybe<CheckpointUpdateOneRequiredWithoutBlocksInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deleted?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  mediaBlock?: InputMaybe<MediaBlockUpdateOneWithoutBlockInput>;
  order?: InputMaybe<IntFieldUpdateOperationsInput>;
  questionBlock?: InputMaybe<QuestionBlockUpdateOneWithoutBlockInput>;
  textBlock?: InputMaybe<TextBlockUpdateOneWithoutBlockInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type BlockUpdateWithoutCheckpointInput = {
  AssessmentBlock?: InputMaybe<AssessmentBlockUpdateManyWithoutQuestionInput>;
  attachmentBlock?: InputMaybe<AttachmentBlockUpdateOneWithoutBlockInput>;
  blockType?: InputMaybe<EnumBlockTypeFieldUpdateOperationsInput>;
  challengeBlock?: InputMaybe<ChallengeBlockUpdateOneWithoutBlockInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deleted?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  mediaBlock?: InputMaybe<MediaBlockUpdateOneWithoutBlockInput>;
  order?: InputMaybe<IntFieldUpdateOperationsInput>;
  questionBlock?: InputMaybe<QuestionBlockUpdateOneWithoutBlockInput>;
  textBlock?: InputMaybe<TextBlockUpdateOneWithoutBlockInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type BlockUpdateWithoutMediaBlockInput = {
  AssessmentBlock?: InputMaybe<AssessmentBlockUpdateManyWithoutQuestionInput>;
  attachmentBlock?: InputMaybe<AttachmentBlockUpdateOneWithoutBlockInput>;
  blockType?: InputMaybe<EnumBlockTypeFieldUpdateOperationsInput>;
  challengeBlock?: InputMaybe<ChallengeBlockUpdateOneWithoutBlockInput>;
  checkpoint?: InputMaybe<CheckpointUpdateOneRequiredWithoutBlocksInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deleted?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  order?: InputMaybe<IntFieldUpdateOperationsInput>;
  questionBlock?: InputMaybe<QuestionBlockUpdateOneWithoutBlockInput>;
  textBlock?: InputMaybe<TextBlockUpdateOneWithoutBlockInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type BlockUpdateWithoutQuestionBlockInput = {
  AssessmentBlock?: InputMaybe<AssessmentBlockUpdateManyWithoutQuestionInput>;
  attachmentBlock?: InputMaybe<AttachmentBlockUpdateOneWithoutBlockInput>;
  blockType?: InputMaybe<EnumBlockTypeFieldUpdateOperationsInput>;
  challengeBlock?: InputMaybe<ChallengeBlockUpdateOneWithoutBlockInput>;
  checkpoint?: InputMaybe<CheckpointUpdateOneRequiredWithoutBlocksInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deleted?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  mediaBlock?: InputMaybe<MediaBlockUpdateOneWithoutBlockInput>;
  order?: InputMaybe<IntFieldUpdateOperationsInput>;
  textBlock?: InputMaybe<TextBlockUpdateOneWithoutBlockInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type BlockUpsertWithWhereUniqueWithoutCheckpointInput = {
  create: BlockCreateWithoutCheckpointInput;
  update: BlockUpdateWithoutCheckpointInput;
  where: BlockWhereUniqueInput;
};

export type BlockUpsertWithoutAssessmentBlockInput = {
  create: BlockCreateWithoutAssessmentBlockInput;
  update: BlockUpdateWithoutAssessmentBlockInput;
};

export type BlockUpsertWithoutAttachmentBlockInput = {
  create: BlockCreateWithoutAttachmentBlockInput;
  update: BlockUpdateWithoutAttachmentBlockInput;
};

export type BlockUpsertWithoutChallengeBlockInput = {
  create: BlockCreateWithoutChallengeBlockInput;
  update: BlockUpdateWithoutChallengeBlockInput;
};

export type BlockUpsertWithoutMediaBlockInput = {
  create: BlockCreateWithoutMediaBlockInput;
  update: BlockUpdateWithoutMediaBlockInput;
};

export type BlockUpsertWithoutQuestionBlockInput = {
  create: BlockCreateWithoutQuestionBlockInput;
  update: BlockUpdateWithoutQuestionBlockInput;
};

export type BlockWhereInput = {
  AND?: InputMaybe<Array<BlockWhereInput>>;
  AssessmentBlock?: InputMaybe<AssessmentBlockListRelationFilter>;
  NOT?: InputMaybe<Array<BlockWhereInput>>;
  OR?: InputMaybe<Array<BlockWhereInput>>;
  attachmentBlock?: InputMaybe<AttachmentBlockRelationFilter>;
  blockType?: InputMaybe<EnumBlockTypeFilter>;
  challengeBlock?: InputMaybe<ChallengeBlockRelationFilter>;
  checkpoint?: InputMaybe<CheckpointRelationFilter>;
  checkpointId?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  deleted?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<StringFilter>;
  mediaBlock?: InputMaybe<MediaBlockRelationFilter>;
  order?: InputMaybe<IntFilter>;
  questionBlock?: InputMaybe<QuestionBlockRelationFilter>;
  textBlock?: InputMaybe<TextBlockRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type BlockWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export enum BodyPartSide {
  Left = 'LEFT',
  Main = 'MAIN',
  Right = 'RIGHT'
}

export type BoolFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['Boolean']>;
};

export type BoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<NestedBoolFilter>;
};

export type Category = {
  __typename?: 'Category';
  _count: CategoryCount;
  activeImgUrl?: Maybe<Scalars['String']>;
  courses?: Maybe<Array<Course>>;
  createdAt: Scalars['Date'];
  forumPosts?: Maybe<Array<ForumPost>>;
  id: Scalars['ID'];
  inactiveImgUrl?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  updatedAt: Scalars['Date'];
};

export type CategoryCount = {
  __typename?: 'CategoryCount';
  courses: Scalars['Int'];
  forumPosts: Scalars['Int'];
};

export type CategoryCreateNestedOneWithoutCoursesInput = {
  connect?: InputMaybe<CategoryWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CategoryCreateOrConnectWithoutCoursesInput>;
  create?: InputMaybe<CategoryCreateWithoutCoursesInput>;
};

export type CategoryCreateNestedOneWithoutForumPostsInput = {
  connect?: InputMaybe<CategoryWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CategoryCreateOrConnectWithoutForumPostsInput>;
  create?: InputMaybe<CategoryCreateWithoutForumPostsInput>;
};

export type CategoryCreateOrConnectWithoutCoursesInput = {
  create: CategoryCreateWithoutCoursesInput;
  where: CategoryWhereUniqueInput;
};

export type CategoryCreateOrConnectWithoutForumPostsInput = {
  create: CategoryCreateWithoutForumPostsInput;
  where: CategoryWhereUniqueInput;
};

export type CategoryCreateWithoutCoursesInput = {
  activeImgUrl?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['Date']>;
  forumPosts?: InputMaybe<ForumPostCreateNestedManyWithoutCategoryInput>;
  id?: InputMaybe<Scalars['String']>;
  inactiveImgUrl?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type CategoryCreateWithoutForumPostsInput = {
  activeImgUrl?: InputMaybe<Scalars['String']>;
  courses?: InputMaybe<CourseCreateNestedManyWithoutCategoryInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  inactiveImgUrl?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export enum CategoryOrderByRelevanceFieldEnum {
  ActiveImgUrl = 'activeImgUrl',
  Id = 'id',
  InactiveImgUrl = 'inactiveImgUrl',
  Name = 'name'
}

export type CategoryOrderByRelevanceInput = {
  fields: Array<CategoryOrderByRelevanceFieldEnum>;
  search: Scalars['String'];
  sort: SortOrder;
};

export type CategoryOrderByWithRelationAndSearchRelevanceInput = {
  _relevance?: InputMaybe<CategoryOrderByRelevanceInput>;
  activeImgUrl?: InputMaybe<SortOrder>;
  courses?: InputMaybe<CourseOrderByRelationAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  forumPosts?: InputMaybe<ForumPostOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  inactiveImgUrl?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type CategoryRelationFilter = {
  is?: InputMaybe<CategoryWhereInput>;
  isNot?: InputMaybe<CategoryWhereInput>;
};

export enum CategoryScalarFieldEnum {
  ActiveImgUrl = 'activeImgUrl',
  CreatedAt = 'createdAt',
  Id = 'id',
  InactiveImgUrl = 'inactiveImgUrl',
  Name = 'name',
  UpdatedAt = 'updatedAt'
}

export type CategoryUpdateOneRequiredWithoutForumPostsInput = {
  connect?: InputMaybe<CategoryWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CategoryCreateOrConnectWithoutForumPostsInput>;
  create?: InputMaybe<CategoryCreateWithoutForumPostsInput>;
  update?: InputMaybe<CategoryUpdateWithoutForumPostsInput>;
  upsert?: InputMaybe<CategoryUpsertWithoutForumPostsInput>;
};

export type CategoryUpdateOneWithoutCoursesInput = {
  connect?: InputMaybe<CategoryWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CategoryCreateOrConnectWithoutCoursesInput>;
  create?: InputMaybe<CategoryCreateWithoutCoursesInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<CategoryUpdateWithoutCoursesInput>;
  upsert?: InputMaybe<CategoryUpsertWithoutCoursesInput>;
};

export type CategoryUpdateWithoutCoursesInput = {
  activeImgUrl?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  forumPosts?: InputMaybe<ForumPostUpdateManyWithoutCategoryInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  inactiveImgUrl?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type CategoryUpdateWithoutForumPostsInput = {
  activeImgUrl?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  courses?: InputMaybe<CourseUpdateManyWithoutCategoryInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  inactiveImgUrl?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type CategoryUpsertWithoutCoursesInput = {
  create: CategoryCreateWithoutCoursesInput;
  update: CategoryUpdateWithoutCoursesInput;
};

export type CategoryUpsertWithoutForumPostsInput = {
  create: CategoryCreateWithoutForumPostsInput;
  update: CategoryUpdateWithoutForumPostsInput;
};

export type CategoryWhereInput = {
  AND?: InputMaybe<Array<CategoryWhereInput>>;
  NOT?: InputMaybe<Array<CategoryWhereInput>>;
  OR?: InputMaybe<Array<CategoryWhereInput>>;
  activeImgUrl?: InputMaybe<StringNullableFilter>;
  courses?: InputMaybe<CourseListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  forumPosts?: InputMaybe<ForumPostListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  inactiveImgUrl?: InputMaybe<StringNullableFilter>;
  name?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type CategoryWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type Challenge = {
  __typename?: 'Challenge';
  _count: ChallengeCount;
  asset: Asset;
  assetId: Scalars['String'];
  challengeBlock: ChallengeBlock;
  challengeBlockId: Scalars['String'];
  comments?: Maybe<Array<ChallengeComment>>;
  createdAt: Scalars['Date'];
  creator: Student;
  creatorId: Scalars['String'];
  deleted?: Maybe<Scalars['Date']>;
  id: Scalars['ID'];
  likes?: Maybe<Array<ChallengeLike>>;
  reports?: Maybe<Array<ChallengeReport>>;
  updatedAt: Scalars['Date'];
};

export type ChallengeBlock = {
  __typename?: 'ChallengeBlock';
  _count: ChallengeBlockCount;
  block?: Maybe<Block>;
  challengeGallery?: Maybe<Array<Challenge>>;
  createdAt: Scalars['Date'];
  deleted?: Maybe<Scalars['Date']>;
  id: Scalars['ID'];
  updatedAt: Scalars['Date'];
};

export type ChallengeBlockCount = {
  __typename?: 'ChallengeBlockCount';
  challengeGallery: Scalars['Int'];
};

export type ChallengeBlockCreateNestedOneWithoutBlockInput = {
  connect?: InputMaybe<ChallengeBlockWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ChallengeBlockCreateOrConnectWithoutBlockInput>;
  create?: InputMaybe<ChallengeBlockCreateWithoutBlockInput>;
};

export type ChallengeBlockCreateNestedOneWithoutChallengeGalleryInput = {
  connect?: InputMaybe<ChallengeBlockWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ChallengeBlockCreateOrConnectWithoutChallengeGalleryInput>;
  create?: InputMaybe<ChallengeBlockCreateWithoutChallengeGalleryInput>;
};

export type ChallengeBlockCreateOrConnectWithoutBlockInput = {
  create: ChallengeBlockCreateWithoutBlockInput;
  where: ChallengeBlockWhereUniqueInput;
};

export type ChallengeBlockCreateOrConnectWithoutChallengeGalleryInput = {
  create: ChallengeBlockCreateWithoutChallengeGalleryInput;
  where: ChallengeBlockWhereUniqueInput;
};

export type ChallengeBlockCreateWithoutBlockInput = {
  challengeGallery?: InputMaybe<ChallengeCreateNestedManyWithoutChallengeBlockInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  deleted?: InputMaybe<Scalars['Date']>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type ChallengeBlockCreateWithoutChallengeGalleryInput = {
  block?: InputMaybe<BlockCreateNestedOneWithoutChallengeBlockInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  deleted?: InputMaybe<Scalars['Date']>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export enum ChallengeBlockOrderByRelevanceFieldEnum {
  Id = 'id'
}

export type ChallengeBlockOrderByRelevanceInput = {
  fields: Array<ChallengeBlockOrderByRelevanceFieldEnum>;
  search: Scalars['String'];
  sort: SortOrder;
};

export type ChallengeBlockOrderByWithRelationAndSearchRelevanceInput = {
  _relevance?: InputMaybe<ChallengeBlockOrderByRelevanceInput>;
  block?: InputMaybe<BlockOrderByWithRelationAndSearchRelevanceInput>;
  challengeGallery?: InputMaybe<ChallengeOrderByRelationAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  deleted?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ChallengeBlockRelationFilter = {
  is?: InputMaybe<ChallengeBlockWhereInput>;
  isNot?: InputMaybe<ChallengeBlockWhereInput>;
};

export type ChallengeBlockUncheckedCreateNestedOneWithoutBlockInput = {
  connect?: InputMaybe<ChallengeBlockWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ChallengeBlockCreateOrConnectWithoutBlockInput>;
  create?: InputMaybe<ChallengeBlockCreateWithoutBlockInput>;
};

export type ChallengeBlockUpdateOneRequiredWithoutChallengeGalleryInput = {
  connect?: InputMaybe<ChallengeBlockWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ChallengeBlockCreateOrConnectWithoutChallengeGalleryInput>;
  create?: InputMaybe<ChallengeBlockCreateWithoutChallengeGalleryInput>;
  update?: InputMaybe<ChallengeBlockUpdateWithoutChallengeGalleryInput>;
  upsert?: InputMaybe<ChallengeBlockUpsertWithoutChallengeGalleryInput>;
};

export type ChallengeBlockUpdateOneWithoutBlockInput = {
  connect?: InputMaybe<ChallengeBlockWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ChallengeBlockCreateOrConnectWithoutBlockInput>;
  create?: InputMaybe<ChallengeBlockCreateWithoutBlockInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<ChallengeBlockUpdateWithoutBlockInput>;
  upsert?: InputMaybe<ChallengeBlockUpsertWithoutBlockInput>;
};

export type ChallengeBlockUpdateWithoutBlockInput = {
  challengeGallery?: InputMaybe<ChallengeUpdateManyWithoutChallengeBlockInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deleted?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type ChallengeBlockUpdateWithoutChallengeGalleryInput = {
  block?: InputMaybe<BlockUpdateOneWithoutChallengeBlockInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deleted?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type ChallengeBlockUpsertWithoutBlockInput = {
  create: ChallengeBlockCreateWithoutBlockInput;
  update: ChallengeBlockUpdateWithoutBlockInput;
};

export type ChallengeBlockUpsertWithoutChallengeGalleryInput = {
  create: ChallengeBlockCreateWithoutChallengeGalleryInput;
  update: ChallengeBlockUpdateWithoutChallengeGalleryInput;
};

export type ChallengeBlockWhereInput = {
  AND?: InputMaybe<Array<ChallengeBlockWhereInput>>;
  NOT?: InputMaybe<Array<ChallengeBlockWhereInput>>;
  OR?: InputMaybe<Array<ChallengeBlockWhereInput>>;
  block?: InputMaybe<BlockRelationFilter>;
  challengeGallery?: InputMaybe<ChallengeListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  deleted?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type ChallengeBlockWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type ChallengeComment = {
  __typename?: 'ChallengeComment';
  challengeGallerId: Scalars['String'];
  challengeGallery: Challenge;
  commenter: User;
  commenterId: Scalars['String'];
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  text: Scalars['String'];
};

export type ChallengeCommentCreateManyChallengeGalleryInput = {
  commenterId: Scalars['String'];
  createdAt?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  text: Scalars['String'];
};

export type ChallengeCommentCreateManyChallengeGalleryInputEnvelope = {
  data: Array<ChallengeCommentCreateManyChallengeGalleryInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ChallengeCommentCreateManyCommenterInput = {
  challengeGallerId: Scalars['String'];
  createdAt?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  text: Scalars['String'];
};

export type ChallengeCommentCreateManyCommenterInputEnvelope = {
  data: Array<ChallengeCommentCreateManyCommenterInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ChallengeCommentCreateNestedManyWithoutChallengeGalleryInput = {
  connect?: InputMaybe<Array<ChallengeCommentWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ChallengeCommentCreateOrConnectWithoutChallengeGalleryInput>>;
  create?: InputMaybe<Array<ChallengeCommentCreateWithoutChallengeGalleryInput>>;
  createMany?: InputMaybe<ChallengeCommentCreateManyChallengeGalleryInputEnvelope>;
};

export type ChallengeCommentCreateNestedManyWithoutCommenterInput = {
  connect?: InputMaybe<Array<ChallengeCommentWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ChallengeCommentCreateOrConnectWithoutCommenterInput>>;
  create?: InputMaybe<Array<ChallengeCommentCreateWithoutCommenterInput>>;
  createMany?: InputMaybe<ChallengeCommentCreateManyCommenterInputEnvelope>;
};

export type ChallengeCommentCreateOrConnectWithoutChallengeGalleryInput = {
  create: ChallengeCommentCreateWithoutChallengeGalleryInput;
  where: ChallengeCommentWhereUniqueInput;
};

export type ChallengeCommentCreateOrConnectWithoutCommenterInput = {
  create: ChallengeCommentCreateWithoutCommenterInput;
  where: ChallengeCommentWhereUniqueInput;
};

export type ChallengeCommentCreateWithoutChallengeGalleryInput = {
  commenter: UserCreateNestedOneWithoutChallengeCommentsInput;
  createdAt?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  text: Scalars['String'];
};

export type ChallengeCommentCreateWithoutCommenterInput = {
  challengeGallery: ChallengeCreateNestedOneWithoutCommentsInput;
  createdAt?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  text: Scalars['String'];
};

export type ChallengeCommentListRelationFilter = {
  every?: InputMaybe<ChallengeCommentWhereInput>;
  none?: InputMaybe<ChallengeCommentWhereInput>;
  some?: InputMaybe<ChallengeCommentWhereInput>;
};

export type ChallengeCommentOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export enum ChallengeCommentOrderByRelevanceFieldEnum {
  ChallengeGallerId = 'challengeGallerId',
  CommenterId = 'commenterId',
  Id = 'id',
  Text = 'text'
}

export type ChallengeCommentOrderByRelevanceInput = {
  fields: Array<ChallengeCommentOrderByRelevanceFieldEnum>;
  search: Scalars['String'];
  sort: SortOrder;
};

export type ChallengeCommentOrderByWithRelationAndSearchRelevanceInput = {
  _relevance?: InputMaybe<ChallengeCommentOrderByRelevanceInput>;
  challengeGallerId?: InputMaybe<SortOrder>;
  challengeGallery?: InputMaybe<ChallengeOrderByWithRelationAndSearchRelevanceInput>;
  commenter?: InputMaybe<UserOrderByWithRelationAndSearchRelevanceInput>;
  commenterId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  text?: InputMaybe<SortOrder>;
};

export enum ChallengeCommentScalarFieldEnum {
  ChallengeGallerId = 'challengeGallerId',
  CommenterId = 'commenterId',
  CreatedAt = 'createdAt',
  Id = 'id',
  Text = 'text'
}

export type ChallengeCommentScalarWhereInput = {
  AND?: InputMaybe<Array<ChallengeCommentScalarWhereInput>>;
  NOT?: InputMaybe<Array<ChallengeCommentScalarWhereInput>>;
  OR?: InputMaybe<Array<ChallengeCommentScalarWhereInput>>;
  challengeGallerId?: InputMaybe<StringFilter>;
  commenterId?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  text?: InputMaybe<StringFilter>;
};

export type ChallengeCommentUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  text?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type ChallengeCommentUpdateManyWithWhereWithoutChallengeGalleryInput = {
  data: ChallengeCommentUpdateManyMutationInput;
  where: ChallengeCommentScalarWhereInput;
};

export type ChallengeCommentUpdateManyWithWhereWithoutCommenterInput = {
  data: ChallengeCommentUpdateManyMutationInput;
  where: ChallengeCommentScalarWhereInput;
};

export type ChallengeCommentUpdateManyWithoutChallengeGalleryInput = {
  connect?: InputMaybe<Array<ChallengeCommentWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ChallengeCommentCreateOrConnectWithoutChallengeGalleryInput>>;
  create?: InputMaybe<Array<ChallengeCommentCreateWithoutChallengeGalleryInput>>;
  createMany?: InputMaybe<ChallengeCommentCreateManyChallengeGalleryInputEnvelope>;
  delete?: InputMaybe<Array<ChallengeCommentWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ChallengeCommentScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ChallengeCommentWhereUniqueInput>>;
  set?: InputMaybe<Array<ChallengeCommentWhereUniqueInput>>;
  update?: InputMaybe<Array<ChallengeCommentUpdateWithWhereUniqueWithoutChallengeGalleryInput>>;
  updateMany?: InputMaybe<Array<ChallengeCommentUpdateManyWithWhereWithoutChallengeGalleryInput>>;
  upsert?: InputMaybe<Array<ChallengeCommentUpsertWithWhereUniqueWithoutChallengeGalleryInput>>;
};

export type ChallengeCommentUpdateManyWithoutCommenterInput = {
  connect?: InputMaybe<Array<ChallengeCommentWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ChallengeCommentCreateOrConnectWithoutCommenterInput>>;
  create?: InputMaybe<Array<ChallengeCommentCreateWithoutCommenterInput>>;
  createMany?: InputMaybe<ChallengeCommentCreateManyCommenterInputEnvelope>;
  delete?: InputMaybe<Array<ChallengeCommentWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ChallengeCommentScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ChallengeCommentWhereUniqueInput>>;
  set?: InputMaybe<Array<ChallengeCommentWhereUniqueInput>>;
  update?: InputMaybe<Array<ChallengeCommentUpdateWithWhereUniqueWithoutCommenterInput>>;
  updateMany?: InputMaybe<Array<ChallengeCommentUpdateManyWithWhereWithoutCommenterInput>>;
  upsert?: InputMaybe<Array<ChallengeCommentUpsertWithWhereUniqueWithoutCommenterInput>>;
};

export type ChallengeCommentUpdateWithWhereUniqueWithoutChallengeGalleryInput = {
  data: ChallengeCommentUpdateWithoutChallengeGalleryInput;
  where: ChallengeCommentWhereUniqueInput;
};

export type ChallengeCommentUpdateWithWhereUniqueWithoutCommenterInput = {
  data: ChallengeCommentUpdateWithoutCommenterInput;
  where: ChallengeCommentWhereUniqueInput;
};

export type ChallengeCommentUpdateWithoutChallengeGalleryInput = {
  commenter?: InputMaybe<UserUpdateOneRequiredWithoutChallengeCommentsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  text?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type ChallengeCommentUpdateWithoutCommenterInput = {
  challengeGallery?: InputMaybe<ChallengeUpdateOneRequiredWithoutCommentsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  text?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type ChallengeCommentUpsertWithWhereUniqueWithoutChallengeGalleryInput = {
  create: ChallengeCommentCreateWithoutChallengeGalleryInput;
  update: ChallengeCommentUpdateWithoutChallengeGalleryInput;
  where: ChallengeCommentWhereUniqueInput;
};

export type ChallengeCommentUpsertWithWhereUniqueWithoutCommenterInput = {
  create: ChallengeCommentCreateWithoutCommenterInput;
  update: ChallengeCommentUpdateWithoutCommenterInput;
  where: ChallengeCommentWhereUniqueInput;
};

export type ChallengeCommentWhereInput = {
  AND?: InputMaybe<Array<ChallengeCommentWhereInput>>;
  NOT?: InputMaybe<Array<ChallengeCommentWhereInput>>;
  OR?: InputMaybe<Array<ChallengeCommentWhereInput>>;
  challengeGallerId?: InputMaybe<StringFilter>;
  challengeGallery?: InputMaybe<ChallengeRelationFilter>;
  commenter?: InputMaybe<UserRelationFilter>;
  commenterId?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  text?: InputMaybe<StringFilter>;
};

export type ChallengeCommentWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type ChallengeCount = {
  __typename?: 'ChallengeCount';
  comments: Scalars['Int'];
  likes: Scalars['Int'];
  reports: Scalars['Int'];
};

export type ChallengeCreateManyChallengeBlockInput = {
  assetId: Scalars['String'];
  createdAt?: InputMaybe<Scalars['Date']>;
  creatorId: Scalars['String'];
  deleted?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type ChallengeCreateManyChallengeBlockInputEnvelope = {
  data: Array<ChallengeCreateManyChallengeBlockInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ChallengeCreateManyCreatorInput = {
  assetId: Scalars['String'];
  challengeBlockId: Scalars['String'];
  createdAt?: InputMaybe<Scalars['Date']>;
  deleted?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type ChallengeCreateManyCreatorInputEnvelope = {
  data: Array<ChallengeCreateManyCreatorInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ChallengeCreateNestedManyWithoutChallengeBlockInput = {
  connect?: InputMaybe<Array<ChallengeWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ChallengeCreateOrConnectWithoutChallengeBlockInput>>;
  create?: InputMaybe<Array<ChallengeCreateWithoutChallengeBlockInput>>;
  createMany?: InputMaybe<ChallengeCreateManyChallengeBlockInputEnvelope>;
};

export type ChallengeCreateNestedManyWithoutCreatorInput = {
  connect?: InputMaybe<Array<ChallengeWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ChallengeCreateOrConnectWithoutCreatorInput>>;
  create?: InputMaybe<Array<ChallengeCreateWithoutCreatorInput>>;
  createMany?: InputMaybe<ChallengeCreateManyCreatorInputEnvelope>;
};

export type ChallengeCreateNestedOneWithoutAssetInput = {
  connect?: InputMaybe<ChallengeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ChallengeCreateOrConnectWithoutAssetInput>;
  create?: InputMaybe<ChallengeCreateWithoutAssetInput>;
};

export type ChallengeCreateNestedOneWithoutCommentsInput = {
  connect?: InputMaybe<ChallengeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ChallengeCreateOrConnectWithoutCommentsInput>;
  create?: InputMaybe<ChallengeCreateWithoutCommentsInput>;
};

export type ChallengeCreateNestedOneWithoutLikesInput = {
  connect?: InputMaybe<ChallengeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ChallengeCreateOrConnectWithoutLikesInput>;
  create?: InputMaybe<ChallengeCreateWithoutLikesInput>;
};

export type ChallengeCreateNestedOneWithoutReportsInput = {
  connect?: InputMaybe<ChallengeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ChallengeCreateOrConnectWithoutReportsInput>;
  create?: InputMaybe<ChallengeCreateWithoutReportsInput>;
};

export type ChallengeCreateOrConnectWithoutAssetInput = {
  create: ChallengeCreateWithoutAssetInput;
  where: ChallengeWhereUniqueInput;
};

export type ChallengeCreateOrConnectWithoutChallengeBlockInput = {
  create: ChallengeCreateWithoutChallengeBlockInput;
  where: ChallengeWhereUniqueInput;
};

export type ChallengeCreateOrConnectWithoutCommentsInput = {
  create: ChallengeCreateWithoutCommentsInput;
  where: ChallengeWhereUniqueInput;
};

export type ChallengeCreateOrConnectWithoutCreatorInput = {
  create: ChallengeCreateWithoutCreatorInput;
  where: ChallengeWhereUniqueInput;
};

export type ChallengeCreateOrConnectWithoutLikesInput = {
  create: ChallengeCreateWithoutLikesInput;
  where: ChallengeWhereUniqueInput;
};

export type ChallengeCreateOrConnectWithoutReportsInput = {
  create: ChallengeCreateWithoutReportsInput;
  where: ChallengeWhereUniqueInput;
};

export type ChallengeCreateWithoutAssetInput = {
  challengeBlock: ChallengeBlockCreateNestedOneWithoutChallengeGalleryInput;
  comments?: InputMaybe<ChallengeCommentCreateNestedManyWithoutChallengeGalleryInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  creator: StudentCreateNestedOneWithoutChallengeGalleryInput;
  deleted?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<ChallengeLikeCreateNestedManyWithoutChallengeInput>;
  reports?: InputMaybe<ChallengeReportCreateNestedManyWithoutChallengeInput>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type ChallengeCreateWithoutChallengeBlockInput = {
  asset: AssetCreateNestedOneWithoutChallengeInput;
  comments?: InputMaybe<ChallengeCommentCreateNestedManyWithoutChallengeGalleryInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  creator: StudentCreateNestedOneWithoutChallengeGalleryInput;
  deleted?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<ChallengeLikeCreateNestedManyWithoutChallengeInput>;
  reports?: InputMaybe<ChallengeReportCreateNestedManyWithoutChallengeInput>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type ChallengeCreateWithoutCommentsInput = {
  asset: AssetCreateNestedOneWithoutChallengeInput;
  challengeBlock: ChallengeBlockCreateNestedOneWithoutChallengeGalleryInput;
  createdAt?: InputMaybe<Scalars['Date']>;
  creator: StudentCreateNestedOneWithoutChallengeGalleryInput;
  deleted?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<ChallengeLikeCreateNestedManyWithoutChallengeInput>;
  reports?: InputMaybe<ChallengeReportCreateNestedManyWithoutChallengeInput>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type ChallengeCreateWithoutCreatorInput = {
  asset: AssetCreateNestedOneWithoutChallengeInput;
  challengeBlock: ChallengeBlockCreateNestedOneWithoutChallengeGalleryInput;
  comments?: InputMaybe<ChallengeCommentCreateNestedManyWithoutChallengeGalleryInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  deleted?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<ChallengeLikeCreateNestedManyWithoutChallengeInput>;
  reports?: InputMaybe<ChallengeReportCreateNestedManyWithoutChallengeInput>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type ChallengeCreateWithoutLikesInput = {
  asset: AssetCreateNestedOneWithoutChallengeInput;
  challengeBlock: ChallengeBlockCreateNestedOneWithoutChallengeGalleryInput;
  comments?: InputMaybe<ChallengeCommentCreateNestedManyWithoutChallengeGalleryInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  creator: StudentCreateNestedOneWithoutChallengeGalleryInput;
  deleted?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  reports?: InputMaybe<ChallengeReportCreateNestedManyWithoutChallengeInput>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type ChallengeCreateWithoutReportsInput = {
  asset: AssetCreateNestedOneWithoutChallengeInput;
  challengeBlock: ChallengeBlockCreateNestedOneWithoutChallengeGalleryInput;
  comments?: InputMaybe<ChallengeCommentCreateNestedManyWithoutChallengeGalleryInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  creator: StudentCreateNestedOneWithoutChallengeGalleryInput;
  deleted?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<ChallengeLikeCreateNestedManyWithoutChallengeInput>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type ChallengeLike = {
  __typename?: 'ChallengeLike';
  challenge: Challenge;
  challengeId: Scalars['String'];
  liker: User;
  likerId: Scalars['String'];
};

export type ChallengeLikeCreateManyChallengeInput = {
  likerId: Scalars['String'];
};

export type ChallengeLikeCreateManyChallengeInputEnvelope = {
  data: Array<ChallengeLikeCreateManyChallengeInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ChallengeLikeCreateManyLikerInput = {
  challengeId: Scalars['String'];
};

export type ChallengeLikeCreateManyLikerInputEnvelope = {
  data: Array<ChallengeLikeCreateManyLikerInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ChallengeLikeCreateNestedManyWithoutChallengeInput = {
  connect?: InputMaybe<Array<ChallengeLikeWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ChallengeLikeCreateOrConnectWithoutChallengeInput>>;
  create?: InputMaybe<Array<ChallengeLikeCreateWithoutChallengeInput>>;
  createMany?: InputMaybe<ChallengeLikeCreateManyChallengeInputEnvelope>;
};

export type ChallengeLikeCreateNestedManyWithoutLikerInput = {
  connect?: InputMaybe<Array<ChallengeLikeWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ChallengeLikeCreateOrConnectWithoutLikerInput>>;
  create?: InputMaybe<Array<ChallengeLikeCreateWithoutLikerInput>>;
  createMany?: InputMaybe<ChallengeLikeCreateManyLikerInputEnvelope>;
};

export type ChallengeLikeCreateOrConnectWithoutChallengeInput = {
  create: ChallengeLikeCreateWithoutChallengeInput;
  where: ChallengeLikeWhereUniqueInput;
};

export type ChallengeLikeCreateOrConnectWithoutLikerInput = {
  create: ChallengeLikeCreateWithoutLikerInput;
  where: ChallengeLikeWhereUniqueInput;
};

export type ChallengeLikeCreateWithoutChallengeInput = {
  liker: UserCreateNestedOneWithoutChallengeLikesInput;
};

export type ChallengeLikeCreateWithoutLikerInput = {
  challenge: ChallengeCreateNestedOneWithoutLikesInput;
};

export type ChallengeLikeLikerIdChallengeIdCompoundUniqueInput = {
  challengeId: Scalars['String'];
  likerId: Scalars['String'];
};

export type ChallengeLikeListRelationFilter = {
  every?: InputMaybe<ChallengeLikeWhereInput>;
  none?: InputMaybe<ChallengeLikeWhereInput>;
  some?: InputMaybe<ChallengeLikeWhereInput>;
};

export type ChallengeLikeOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type ChallengeLikeScalarWhereInput = {
  AND?: InputMaybe<Array<ChallengeLikeScalarWhereInput>>;
  NOT?: InputMaybe<Array<ChallengeLikeScalarWhereInput>>;
  OR?: InputMaybe<Array<ChallengeLikeScalarWhereInput>>;
  challengeId?: InputMaybe<StringFilter>;
  likerId?: InputMaybe<StringFilter>;
};

export type ChallengeLikeUncheckedUpdateManyWithoutChallengeLikesInput = {
  challengeId?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type ChallengeLikeUncheckedUpdateManyWithoutLikesInput = {
  likerId?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type ChallengeLikeUpdateManyWithWhereWithoutChallengeInput = {
  data: ChallengeLikeUncheckedUpdateManyWithoutLikesInput;
  where: ChallengeLikeScalarWhereInput;
};

export type ChallengeLikeUpdateManyWithWhereWithoutLikerInput = {
  data: ChallengeLikeUncheckedUpdateManyWithoutChallengeLikesInput;
  where: ChallengeLikeScalarWhereInput;
};

export type ChallengeLikeUpdateManyWithoutChallengeInput = {
  connect?: InputMaybe<Array<ChallengeLikeWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ChallengeLikeCreateOrConnectWithoutChallengeInput>>;
  create?: InputMaybe<Array<ChallengeLikeCreateWithoutChallengeInput>>;
  createMany?: InputMaybe<ChallengeLikeCreateManyChallengeInputEnvelope>;
  delete?: InputMaybe<Array<ChallengeLikeWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ChallengeLikeScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ChallengeLikeWhereUniqueInput>>;
  set?: InputMaybe<Array<ChallengeLikeWhereUniqueInput>>;
  update?: InputMaybe<Array<ChallengeLikeUpdateWithWhereUniqueWithoutChallengeInput>>;
  updateMany?: InputMaybe<Array<ChallengeLikeUpdateManyWithWhereWithoutChallengeInput>>;
  upsert?: InputMaybe<Array<ChallengeLikeUpsertWithWhereUniqueWithoutChallengeInput>>;
};

export type ChallengeLikeUpdateManyWithoutLikerInput = {
  connect?: InputMaybe<Array<ChallengeLikeWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ChallengeLikeCreateOrConnectWithoutLikerInput>>;
  create?: InputMaybe<Array<ChallengeLikeCreateWithoutLikerInput>>;
  createMany?: InputMaybe<ChallengeLikeCreateManyLikerInputEnvelope>;
  delete?: InputMaybe<Array<ChallengeLikeWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ChallengeLikeScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ChallengeLikeWhereUniqueInput>>;
  set?: InputMaybe<Array<ChallengeLikeWhereUniqueInput>>;
  update?: InputMaybe<Array<ChallengeLikeUpdateWithWhereUniqueWithoutLikerInput>>;
  updateMany?: InputMaybe<Array<ChallengeLikeUpdateManyWithWhereWithoutLikerInput>>;
  upsert?: InputMaybe<Array<ChallengeLikeUpsertWithWhereUniqueWithoutLikerInput>>;
};

export type ChallengeLikeUpdateWithWhereUniqueWithoutChallengeInput = {
  data: ChallengeLikeUpdateWithoutChallengeInput;
  where: ChallengeLikeWhereUniqueInput;
};

export type ChallengeLikeUpdateWithWhereUniqueWithoutLikerInput = {
  data: ChallengeLikeUpdateWithoutLikerInput;
  where: ChallengeLikeWhereUniqueInput;
};

export type ChallengeLikeUpdateWithoutChallengeInput = {
  liker?: InputMaybe<UserUpdateOneRequiredWithoutChallengeLikesInput>;
};

export type ChallengeLikeUpdateWithoutLikerInput = {
  challenge?: InputMaybe<ChallengeUpdateOneRequiredWithoutLikesInput>;
};

export type ChallengeLikeUpsertWithWhereUniqueWithoutChallengeInput = {
  create: ChallengeLikeCreateWithoutChallengeInput;
  update: ChallengeLikeUpdateWithoutChallengeInput;
  where: ChallengeLikeWhereUniqueInput;
};

export type ChallengeLikeUpsertWithWhereUniqueWithoutLikerInput = {
  create: ChallengeLikeCreateWithoutLikerInput;
  update: ChallengeLikeUpdateWithoutLikerInput;
  where: ChallengeLikeWhereUniqueInput;
};

export type ChallengeLikeWhereInput = {
  AND?: InputMaybe<Array<ChallengeLikeWhereInput>>;
  NOT?: InputMaybe<Array<ChallengeLikeWhereInput>>;
  OR?: InputMaybe<Array<ChallengeLikeWhereInput>>;
  challenge?: InputMaybe<ChallengeRelationFilter>;
  challengeId?: InputMaybe<StringFilter>;
  liker?: InputMaybe<UserRelationFilter>;
  likerId?: InputMaybe<StringFilter>;
};

export type ChallengeLikeWhereUniqueInput = {
  likerId_challengeId?: InputMaybe<ChallengeLikeLikerIdChallengeIdCompoundUniqueInput>;
};

export type ChallengeListRelationFilter = {
  every?: InputMaybe<ChallengeWhereInput>;
  none?: InputMaybe<ChallengeWhereInput>;
  some?: InputMaybe<ChallengeWhereInput>;
};

export type ChallengeOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export enum ChallengeOrderByRelevanceFieldEnum {
  AssetId = 'assetId',
  ChallengeBlockId = 'challengeBlockId',
  CreatorId = 'creatorId',
  Id = 'id'
}

export type ChallengeOrderByRelevanceInput = {
  fields: Array<ChallengeOrderByRelevanceFieldEnum>;
  search: Scalars['String'];
  sort: SortOrder;
};

export type ChallengeOrderByWithRelationAndSearchRelevanceInput = {
  _relevance?: InputMaybe<ChallengeOrderByRelevanceInput>;
  asset?: InputMaybe<AssetOrderByWithRelationAndSearchRelevanceInput>;
  assetId?: InputMaybe<SortOrder>;
  challengeBlock?: InputMaybe<ChallengeBlockOrderByWithRelationAndSearchRelevanceInput>;
  challengeBlockId?: InputMaybe<SortOrder>;
  comments?: InputMaybe<ChallengeCommentOrderByRelationAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  creator?: InputMaybe<StudentOrderByWithRelationAndSearchRelevanceInput>;
  creatorId?: InputMaybe<SortOrder>;
  deleted?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  likes?: InputMaybe<ChallengeLikeOrderByRelationAggregateInput>;
  reports?: InputMaybe<ChallengeReportOrderByRelationAggregateInput>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ChallengeRelationFilter = {
  is?: InputMaybe<ChallengeWhereInput>;
  isNot?: InputMaybe<ChallengeWhereInput>;
};

export type ChallengeReport = {
  __typename?: 'ChallengeReport';
  challenge: Challenge;
  challengeId: Scalars['String'];
  report: Scalars['String'];
  reporter: User;
  reporterId: Scalars['String'];
};

export type ChallengeReportCreateManyChallengeInput = {
  report: Scalars['String'];
  reporterId: Scalars['String'];
};

export type ChallengeReportCreateManyChallengeInputEnvelope = {
  data: Array<ChallengeReportCreateManyChallengeInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ChallengeReportCreateManyReporterInput = {
  challengeId: Scalars['String'];
  report: Scalars['String'];
};

export type ChallengeReportCreateManyReporterInputEnvelope = {
  data: Array<ChallengeReportCreateManyReporterInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ChallengeReportCreateNestedManyWithoutChallengeInput = {
  connect?: InputMaybe<Array<ChallengeReportWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ChallengeReportCreateOrConnectWithoutChallengeInput>>;
  create?: InputMaybe<Array<ChallengeReportCreateWithoutChallengeInput>>;
  createMany?: InputMaybe<ChallengeReportCreateManyChallengeInputEnvelope>;
};

export type ChallengeReportCreateNestedManyWithoutReporterInput = {
  connect?: InputMaybe<Array<ChallengeReportWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ChallengeReportCreateOrConnectWithoutReporterInput>>;
  create?: InputMaybe<Array<ChallengeReportCreateWithoutReporterInput>>;
  createMany?: InputMaybe<ChallengeReportCreateManyReporterInputEnvelope>;
};

export type ChallengeReportCreateOrConnectWithoutChallengeInput = {
  create: ChallengeReportCreateWithoutChallengeInput;
  where: ChallengeReportWhereUniqueInput;
};

export type ChallengeReportCreateOrConnectWithoutReporterInput = {
  create: ChallengeReportCreateWithoutReporterInput;
  where: ChallengeReportWhereUniqueInput;
};

export type ChallengeReportCreateWithoutChallengeInput = {
  report: Scalars['String'];
  reporter: UserCreateNestedOneWithoutChallengeReportsInput;
};

export type ChallengeReportCreateWithoutReporterInput = {
  challenge: ChallengeCreateNestedOneWithoutReportsInput;
  report: Scalars['String'];
};

export type ChallengeReportListRelationFilter = {
  every?: InputMaybe<ChallengeReportWhereInput>;
  none?: InputMaybe<ChallengeReportWhereInput>;
  some?: InputMaybe<ChallengeReportWhereInput>;
};

export type ChallengeReportOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type ChallengeReportReporterIdChallengeIdCompoundUniqueInput = {
  challengeId: Scalars['String'];
  reporterId: Scalars['String'];
};

export type ChallengeReportScalarWhereInput = {
  AND?: InputMaybe<Array<ChallengeReportScalarWhereInput>>;
  NOT?: InputMaybe<Array<ChallengeReportScalarWhereInput>>;
  OR?: InputMaybe<Array<ChallengeReportScalarWhereInput>>;
  challengeId?: InputMaybe<StringFilter>;
  report?: InputMaybe<StringFilter>;
  reporterId?: InputMaybe<StringFilter>;
};

export type ChallengeReportUpdateManyMutationInput = {
  report?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type ChallengeReportUpdateManyWithWhereWithoutChallengeInput = {
  data: ChallengeReportUpdateManyMutationInput;
  where: ChallengeReportScalarWhereInput;
};

export type ChallengeReportUpdateManyWithWhereWithoutReporterInput = {
  data: ChallengeReportUpdateManyMutationInput;
  where: ChallengeReportScalarWhereInput;
};

export type ChallengeReportUpdateManyWithoutChallengeInput = {
  connect?: InputMaybe<Array<ChallengeReportWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ChallengeReportCreateOrConnectWithoutChallengeInput>>;
  create?: InputMaybe<Array<ChallengeReportCreateWithoutChallengeInput>>;
  createMany?: InputMaybe<ChallengeReportCreateManyChallengeInputEnvelope>;
  delete?: InputMaybe<Array<ChallengeReportWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ChallengeReportScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ChallengeReportWhereUniqueInput>>;
  set?: InputMaybe<Array<ChallengeReportWhereUniqueInput>>;
  update?: InputMaybe<Array<ChallengeReportUpdateWithWhereUniqueWithoutChallengeInput>>;
  updateMany?: InputMaybe<Array<ChallengeReportUpdateManyWithWhereWithoutChallengeInput>>;
  upsert?: InputMaybe<Array<ChallengeReportUpsertWithWhereUniqueWithoutChallengeInput>>;
};

export type ChallengeReportUpdateManyWithoutReporterInput = {
  connect?: InputMaybe<Array<ChallengeReportWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ChallengeReportCreateOrConnectWithoutReporterInput>>;
  create?: InputMaybe<Array<ChallengeReportCreateWithoutReporterInput>>;
  createMany?: InputMaybe<ChallengeReportCreateManyReporterInputEnvelope>;
  delete?: InputMaybe<Array<ChallengeReportWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ChallengeReportScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ChallengeReportWhereUniqueInput>>;
  set?: InputMaybe<Array<ChallengeReportWhereUniqueInput>>;
  update?: InputMaybe<Array<ChallengeReportUpdateWithWhereUniqueWithoutReporterInput>>;
  updateMany?: InputMaybe<Array<ChallengeReportUpdateManyWithWhereWithoutReporterInput>>;
  upsert?: InputMaybe<Array<ChallengeReportUpsertWithWhereUniqueWithoutReporterInput>>;
};

export type ChallengeReportUpdateWithWhereUniqueWithoutChallengeInput = {
  data: ChallengeReportUpdateWithoutChallengeInput;
  where: ChallengeReportWhereUniqueInput;
};

export type ChallengeReportUpdateWithWhereUniqueWithoutReporterInput = {
  data: ChallengeReportUpdateWithoutReporterInput;
  where: ChallengeReportWhereUniqueInput;
};

export type ChallengeReportUpdateWithoutChallengeInput = {
  report?: InputMaybe<StringFieldUpdateOperationsInput>;
  reporter?: InputMaybe<UserUpdateOneRequiredWithoutChallengeReportsInput>;
};

export type ChallengeReportUpdateWithoutReporterInput = {
  challenge?: InputMaybe<ChallengeUpdateOneRequiredWithoutReportsInput>;
  report?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type ChallengeReportUpsertWithWhereUniqueWithoutChallengeInput = {
  create: ChallengeReportCreateWithoutChallengeInput;
  update: ChallengeReportUpdateWithoutChallengeInput;
  where: ChallengeReportWhereUniqueInput;
};

export type ChallengeReportUpsertWithWhereUniqueWithoutReporterInput = {
  create: ChallengeReportCreateWithoutReporterInput;
  update: ChallengeReportUpdateWithoutReporterInput;
  where: ChallengeReportWhereUniqueInput;
};

export type ChallengeReportWhereInput = {
  AND?: InputMaybe<Array<ChallengeReportWhereInput>>;
  NOT?: InputMaybe<Array<ChallengeReportWhereInput>>;
  OR?: InputMaybe<Array<ChallengeReportWhereInput>>;
  challenge?: InputMaybe<ChallengeRelationFilter>;
  challengeId?: InputMaybe<StringFilter>;
  report?: InputMaybe<StringFilter>;
  reporter?: InputMaybe<UserRelationFilter>;
  reporterId?: InputMaybe<StringFilter>;
};

export type ChallengeReportWhereUniqueInput = {
  reporterId_challengeId?: InputMaybe<ChallengeReportReporterIdChallengeIdCompoundUniqueInput>;
};

export enum ChallengeScalarFieldEnum {
  AssetId = 'assetId',
  ChallengeBlockId = 'challengeBlockId',
  CreatedAt = 'createdAt',
  CreatorId = 'creatorId',
  Deleted = 'deleted',
  Id = 'id',
  UpdatedAt = 'updatedAt'
}

export type ChallengeScalarWhereInput = {
  AND?: InputMaybe<Array<ChallengeScalarWhereInput>>;
  NOT?: InputMaybe<Array<ChallengeScalarWhereInput>>;
  OR?: InputMaybe<Array<ChallengeScalarWhereInput>>;
  assetId?: InputMaybe<StringFilter>;
  challengeBlockId?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  creatorId?: InputMaybe<StringFilter>;
  deleted?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type ChallengeUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deleted?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type ChallengeUpdateManyWithWhereWithoutChallengeBlockInput = {
  data: ChallengeUpdateManyMutationInput;
  where: ChallengeScalarWhereInput;
};

export type ChallengeUpdateManyWithWhereWithoutCreatorInput = {
  data: ChallengeUpdateManyMutationInput;
  where: ChallengeScalarWhereInput;
};

export type ChallengeUpdateManyWithoutChallengeBlockInput = {
  connect?: InputMaybe<Array<ChallengeWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ChallengeCreateOrConnectWithoutChallengeBlockInput>>;
  create?: InputMaybe<Array<ChallengeCreateWithoutChallengeBlockInput>>;
  createMany?: InputMaybe<ChallengeCreateManyChallengeBlockInputEnvelope>;
  delete?: InputMaybe<Array<ChallengeWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ChallengeScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ChallengeWhereUniqueInput>>;
  set?: InputMaybe<Array<ChallengeWhereUniqueInput>>;
  update?: InputMaybe<Array<ChallengeUpdateWithWhereUniqueWithoutChallengeBlockInput>>;
  updateMany?: InputMaybe<Array<ChallengeUpdateManyWithWhereWithoutChallengeBlockInput>>;
  upsert?: InputMaybe<Array<ChallengeUpsertWithWhereUniqueWithoutChallengeBlockInput>>;
};

export type ChallengeUpdateManyWithoutCreatorInput = {
  connect?: InputMaybe<Array<ChallengeWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ChallengeCreateOrConnectWithoutCreatorInput>>;
  create?: InputMaybe<Array<ChallengeCreateWithoutCreatorInput>>;
  createMany?: InputMaybe<ChallengeCreateManyCreatorInputEnvelope>;
  delete?: InputMaybe<Array<ChallengeWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ChallengeScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ChallengeWhereUniqueInput>>;
  set?: InputMaybe<Array<ChallengeWhereUniqueInput>>;
  update?: InputMaybe<Array<ChallengeUpdateWithWhereUniqueWithoutCreatorInput>>;
  updateMany?: InputMaybe<Array<ChallengeUpdateManyWithWhereWithoutCreatorInput>>;
  upsert?: InputMaybe<Array<ChallengeUpsertWithWhereUniqueWithoutCreatorInput>>;
};

export type ChallengeUpdateOneRequiredWithoutCommentsInput = {
  connect?: InputMaybe<ChallengeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ChallengeCreateOrConnectWithoutCommentsInput>;
  create?: InputMaybe<ChallengeCreateWithoutCommentsInput>;
  update?: InputMaybe<ChallengeUpdateWithoutCommentsInput>;
  upsert?: InputMaybe<ChallengeUpsertWithoutCommentsInput>;
};

export type ChallengeUpdateOneRequiredWithoutLikesInput = {
  connect?: InputMaybe<ChallengeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ChallengeCreateOrConnectWithoutLikesInput>;
  create?: InputMaybe<ChallengeCreateWithoutLikesInput>;
  update?: InputMaybe<ChallengeUpdateWithoutLikesInput>;
  upsert?: InputMaybe<ChallengeUpsertWithoutLikesInput>;
};

export type ChallengeUpdateOneRequiredWithoutReportsInput = {
  connect?: InputMaybe<ChallengeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ChallengeCreateOrConnectWithoutReportsInput>;
  create?: InputMaybe<ChallengeCreateWithoutReportsInput>;
  update?: InputMaybe<ChallengeUpdateWithoutReportsInput>;
  upsert?: InputMaybe<ChallengeUpsertWithoutReportsInput>;
};

export type ChallengeUpdateOneWithoutAssetInput = {
  connect?: InputMaybe<ChallengeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ChallengeCreateOrConnectWithoutAssetInput>;
  create?: InputMaybe<ChallengeCreateWithoutAssetInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<ChallengeUpdateWithoutAssetInput>;
  upsert?: InputMaybe<ChallengeUpsertWithoutAssetInput>;
};

export type ChallengeUpdateWithWhereUniqueWithoutChallengeBlockInput = {
  data: ChallengeUpdateWithoutChallengeBlockInput;
  where: ChallengeWhereUniqueInput;
};

export type ChallengeUpdateWithWhereUniqueWithoutCreatorInput = {
  data: ChallengeUpdateWithoutCreatorInput;
  where: ChallengeWhereUniqueInput;
};

export type ChallengeUpdateWithoutAssetInput = {
  challengeBlock?: InputMaybe<ChallengeBlockUpdateOneRequiredWithoutChallengeGalleryInput>;
  comments?: InputMaybe<ChallengeCommentUpdateManyWithoutChallengeGalleryInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  creator?: InputMaybe<StudentUpdateOneRequiredWithoutChallengeGalleryInput>;
  deleted?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  likes?: InputMaybe<ChallengeLikeUpdateManyWithoutChallengeInput>;
  reports?: InputMaybe<ChallengeReportUpdateManyWithoutChallengeInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type ChallengeUpdateWithoutChallengeBlockInput = {
  asset?: InputMaybe<AssetUpdateOneRequiredWithoutChallengeInput>;
  comments?: InputMaybe<ChallengeCommentUpdateManyWithoutChallengeGalleryInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  creator?: InputMaybe<StudentUpdateOneRequiredWithoutChallengeGalleryInput>;
  deleted?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  likes?: InputMaybe<ChallengeLikeUpdateManyWithoutChallengeInput>;
  reports?: InputMaybe<ChallengeReportUpdateManyWithoutChallengeInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type ChallengeUpdateWithoutCommentsInput = {
  asset?: InputMaybe<AssetUpdateOneRequiredWithoutChallengeInput>;
  challengeBlock?: InputMaybe<ChallengeBlockUpdateOneRequiredWithoutChallengeGalleryInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  creator?: InputMaybe<StudentUpdateOneRequiredWithoutChallengeGalleryInput>;
  deleted?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  likes?: InputMaybe<ChallengeLikeUpdateManyWithoutChallengeInput>;
  reports?: InputMaybe<ChallengeReportUpdateManyWithoutChallengeInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type ChallengeUpdateWithoutCreatorInput = {
  asset?: InputMaybe<AssetUpdateOneRequiredWithoutChallengeInput>;
  challengeBlock?: InputMaybe<ChallengeBlockUpdateOneRequiredWithoutChallengeGalleryInput>;
  comments?: InputMaybe<ChallengeCommentUpdateManyWithoutChallengeGalleryInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deleted?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  likes?: InputMaybe<ChallengeLikeUpdateManyWithoutChallengeInput>;
  reports?: InputMaybe<ChallengeReportUpdateManyWithoutChallengeInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type ChallengeUpdateWithoutLikesInput = {
  asset?: InputMaybe<AssetUpdateOneRequiredWithoutChallengeInput>;
  challengeBlock?: InputMaybe<ChallengeBlockUpdateOneRequiredWithoutChallengeGalleryInput>;
  comments?: InputMaybe<ChallengeCommentUpdateManyWithoutChallengeGalleryInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  creator?: InputMaybe<StudentUpdateOneRequiredWithoutChallengeGalleryInput>;
  deleted?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  reports?: InputMaybe<ChallengeReportUpdateManyWithoutChallengeInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type ChallengeUpdateWithoutReportsInput = {
  asset?: InputMaybe<AssetUpdateOneRequiredWithoutChallengeInput>;
  challengeBlock?: InputMaybe<ChallengeBlockUpdateOneRequiredWithoutChallengeGalleryInput>;
  comments?: InputMaybe<ChallengeCommentUpdateManyWithoutChallengeGalleryInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  creator?: InputMaybe<StudentUpdateOneRequiredWithoutChallengeGalleryInput>;
  deleted?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  likes?: InputMaybe<ChallengeLikeUpdateManyWithoutChallengeInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type ChallengeUpsertWithWhereUniqueWithoutChallengeBlockInput = {
  create: ChallengeCreateWithoutChallengeBlockInput;
  update: ChallengeUpdateWithoutChallengeBlockInput;
  where: ChallengeWhereUniqueInput;
};

export type ChallengeUpsertWithWhereUniqueWithoutCreatorInput = {
  create: ChallengeCreateWithoutCreatorInput;
  update: ChallengeUpdateWithoutCreatorInput;
  where: ChallengeWhereUniqueInput;
};

export type ChallengeUpsertWithoutAssetInput = {
  create: ChallengeCreateWithoutAssetInput;
  update: ChallengeUpdateWithoutAssetInput;
};

export type ChallengeUpsertWithoutCommentsInput = {
  create: ChallengeCreateWithoutCommentsInput;
  update: ChallengeUpdateWithoutCommentsInput;
};

export type ChallengeUpsertWithoutLikesInput = {
  create: ChallengeCreateWithoutLikesInput;
  update: ChallengeUpdateWithoutLikesInput;
};

export type ChallengeUpsertWithoutReportsInput = {
  create: ChallengeCreateWithoutReportsInput;
  update: ChallengeUpdateWithoutReportsInput;
};

export type ChallengeWhereInput = {
  AND?: InputMaybe<Array<ChallengeWhereInput>>;
  NOT?: InputMaybe<Array<ChallengeWhereInput>>;
  OR?: InputMaybe<Array<ChallengeWhereInput>>;
  asset?: InputMaybe<AssetRelationFilter>;
  assetId?: InputMaybe<StringFilter>;
  challengeBlock?: InputMaybe<ChallengeBlockRelationFilter>;
  challengeBlockId?: InputMaybe<StringFilter>;
  comments?: InputMaybe<ChallengeCommentListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  creator?: InputMaybe<StudentRelationFilter>;
  creatorId?: InputMaybe<StringFilter>;
  deleted?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<StringFilter>;
  likes?: InputMaybe<ChallengeLikeListRelationFilter>;
  reports?: InputMaybe<ChallengeReportListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type ChallengeWhereUniqueInput = {
  assetId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
};

export type ChangePasswordInput = {
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};

export type CharacterCatalog = {
  __typename?: 'CharacterCatalog';
  bottom?: Maybe<Array<Scalars['JSON']>>;
  catalogType: CharacterCatalogType;
  createdAt: Scalars['Date'];
  face?: Maybe<Scalars['JSON']>;
  hair?: Maybe<Scalars['JSON']>;
  id: Scalars['ID'];
  itemCatalog?: Maybe<ItemCatalog>;
  itemCatalogId?: Maybe<Scalars['String']>;
  shoes?: Maybe<Array<Scalars['JSON']>>;
  skin?: Maybe<Scalars['JSON']>;
  tops?: Maybe<Scalars['JSON']>;
  updatedAt: Scalars['Date'];
};

export type CharacterCatalogListRelationFilter = {
  every?: InputMaybe<CharacterCatalogWhereInput>;
  none?: InputMaybe<CharacterCatalogWhereInput>;
  some?: InputMaybe<CharacterCatalogWhereInput>;
};

export type CharacterCatalogOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export enum CharacterCatalogOrderByRelevanceFieldEnum {
  Id = 'id',
  ItemCatalogId = 'itemCatalogId'
}

export type CharacterCatalogOrderByRelevanceInput = {
  fields: Array<CharacterCatalogOrderByRelevanceFieldEnum>;
  search: Scalars['String'];
  sort: SortOrder;
};

export type CharacterCatalogOrderByWithRelationAndSearchRelevanceInput = {
  _relevance?: InputMaybe<CharacterCatalogOrderByRelevanceInput>;
  bottom?: InputMaybe<SortOrder>;
  catalogType?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  face?: InputMaybe<SortOrder>;
  hair?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  itemCatalog?: InputMaybe<ItemCatalogOrderByWithRelationAndSearchRelevanceInput>;
  itemCatalogId?: InputMaybe<SortOrder>;
  shoes?: InputMaybe<SortOrder>;
  skin?: InputMaybe<SortOrder>;
  tops?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum CharacterCatalogScalarFieldEnum {
  Bottom = 'bottom',
  CatalogType = 'catalogType',
  CreatedAt = 'createdAt',
  Face = 'face',
  Hair = 'hair',
  Id = 'id',
  ItemCatalogId = 'itemCatalogId',
  Shoes = 'shoes',
  Skin = 'skin',
  Tops = 'tops',
  UpdatedAt = 'updatedAt'
}

export enum CharacterCatalogType {
  Bottom = 'BOTTOM',
  Face = 'FACE',
  Hair = 'HAIR',
  Shoes = 'SHOES',
  Skin = 'SKIN',
  Tops = 'TOPS'
}

export type CharacterCatalogWhereInput = {
  AND?: InputMaybe<Array<CharacterCatalogWhereInput>>;
  NOT?: InputMaybe<Array<CharacterCatalogWhereInput>>;
  OR?: InputMaybe<Array<CharacterCatalogWhereInput>>;
  bottom?: InputMaybe<JsonNullableListFilter>;
  catalogType?: InputMaybe<EnumCharacterCatalogTypeFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  face?: InputMaybe<JsonNullableFilter>;
  hair?: InputMaybe<JsonNullableFilter>;
  id?: InputMaybe<StringFilter>;
  itemCatalog?: InputMaybe<ItemCatalogRelationFilter>;
  itemCatalogId?: InputMaybe<StringNullableFilter>;
  shoes?: InputMaybe<JsonNullableListFilter>;
  skin?: InputMaybe<JsonNullableFilter>;
  tops?: InputMaybe<JsonNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type CharacterCatalogWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type Checkpoint = {
  __typename?: 'Checkpoint';
  _count: CheckpointCount;
  blocks?: Maybe<Array<Block>>;
  course?: Maybe<Course>;
  courseId?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  deleted?: Maybe<Scalars['Date']>;
  description?: Maybe<Scalars['String']>;
  duration: Scalars['Int'];
  enabled: Scalars['Boolean'];
  enrolledCheckpoints?: Maybe<Array<EnrolledCheckpoint>>;
  id: Scalars['ID'];
  image?: Maybe<Asset>;
  imageId?: Maybe<Scalars['String']>;
  order: Scalars['Int'];
  parentCheckPoint?: Maybe<Checkpoint>;
  parentCheckpointId?: Maybe<Scalars['String']>;
  subCheckpoints?: Maybe<Array<Checkpoint>>;
  title: Scalars['String'];
  type: TopicType;
  updatedAt: Scalars['Date'];
};

export type CheckpointCount = {
  __typename?: 'CheckpointCount';
  blocks: Scalars['Int'];
  enrolledCheckpoints: Scalars['Int'];
  subCheckpoints: Scalars['Int'];
};

export type CheckpointCreateManyCourseInput = {
  createdAt?: InputMaybe<Scalars['Date']>;
  deleted?: InputMaybe<Scalars['Date']>;
  description?: InputMaybe<Scalars['String']>;
  duration?: InputMaybe<Scalars['Int']>;
  enabled?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['String']>;
  imageId?: InputMaybe<Scalars['String']>;
  order: Scalars['Int'];
  parentCheckpointId?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  type?: InputMaybe<TopicType>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type CheckpointCreateManyCourseInputEnvelope = {
  data: Array<CheckpointCreateManyCourseInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type CheckpointCreateManyParentCheckPointInput = {
  courseId?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['Date']>;
  deleted?: InputMaybe<Scalars['Date']>;
  description?: InputMaybe<Scalars['String']>;
  duration?: InputMaybe<Scalars['Int']>;
  enabled?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['String']>;
  imageId?: InputMaybe<Scalars['String']>;
  order: Scalars['Int'];
  title: Scalars['String'];
  type?: InputMaybe<TopicType>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type CheckpointCreateManyParentCheckPointInputEnvelope = {
  data: Array<CheckpointCreateManyParentCheckPointInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type CheckpointCreateNestedManyWithoutCourseInput = {
  connect?: InputMaybe<Array<CheckpointWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<CheckpointCreateOrConnectWithoutCourseInput>>;
  create?: InputMaybe<Array<CheckpointCreateWithoutCourseInput>>;
  createMany?: InputMaybe<CheckpointCreateManyCourseInputEnvelope>;
};

export type CheckpointCreateNestedManyWithoutParentCheckPointInput = {
  connect?: InputMaybe<Array<CheckpointWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<CheckpointCreateOrConnectWithoutParentCheckPointInput>>;
  create?: InputMaybe<Array<CheckpointCreateWithoutParentCheckPointInput>>;
  createMany?: InputMaybe<CheckpointCreateManyParentCheckPointInputEnvelope>;
};

export type CheckpointCreateNestedOneWithoutBlocksInput = {
  connect?: InputMaybe<CheckpointWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CheckpointCreateOrConnectWithoutBlocksInput>;
  create?: InputMaybe<CheckpointCreateWithoutBlocksInput>;
};

export type CheckpointCreateNestedOneWithoutEnrolledCheckpointsInput = {
  connect?: InputMaybe<CheckpointWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CheckpointCreateOrConnectWithoutEnrolledCheckpointsInput>;
  create?: InputMaybe<CheckpointCreateWithoutEnrolledCheckpointsInput>;
};

export type CheckpointCreateNestedOneWithoutImageInput = {
  connect?: InputMaybe<CheckpointWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CheckpointCreateOrConnectWithoutImageInput>;
  create?: InputMaybe<CheckpointCreateWithoutImageInput>;
};

export type CheckpointCreateNestedOneWithoutSubCheckpointsInput = {
  connect?: InputMaybe<CheckpointWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CheckpointCreateOrConnectWithoutSubCheckpointsInput>;
  create?: InputMaybe<CheckpointCreateWithoutSubCheckpointsInput>;
};

export type CheckpointCreateOrConnectWithoutBlocksInput = {
  create: CheckpointCreateWithoutBlocksInput;
  where: CheckpointWhereUniqueInput;
};

export type CheckpointCreateOrConnectWithoutCourseInput = {
  create: CheckpointCreateWithoutCourseInput;
  where: CheckpointWhereUniqueInput;
};

export type CheckpointCreateOrConnectWithoutEnrolledCheckpointsInput = {
  create: CheckpointCreateWithoutEnrolledCheckpointsInput;
  where: CheckpointWhereUniqueInput;
};

export type CheckpointCreateOrConnectWithoutImageInput = {
  create: CheckpointCreateWithoutImageInput;
  where: CheckpointWhereUniqueInput;
};

export type CheckpointCreateOrConnectWithoutParentCheckPointInput = {
  create: CheckpointCreateWithoutParentCheckPointInput;
  where: CheckpointWhereUniqueInput;
};

export type CheckpointCreateOrConnectWithoutSubCheckpointsInput = {
  create: CheckpointCreateWithoutSubCheckpointsInput;
  where: CheckpointWhereUniqueInput;
};

export type CheckpointCreateWithoutBlocksInput = {
  course?: InputMaybe<CourseCreateNestedOneWithoutCheckpointsInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  deleted?: InputMaybe<Scalars['Date']>;
  description?: InputMaybe<Scalars['String']>;
  duration?: InputMaybe<Scalars['Int']>;
  enabled?: InputMaybe<Scalars['Boolean']>;
  enrolledCheckpoints?: InputMaybe<EnrolledCheckpointCreateNestedManyWithoutCheckpointInput>;
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<AssetCreateNestedOneWithoutCheckpointImageInput>;
  order: Scalars['Int'];
  parentCheckPoint?: InputMaybe<CheckpointCreateNestedOneWithoutSubCheckpointsInput>;
  subCheckpoints?: InputMaybe<CheckpointCreateNestedManyWithoutParentCheckPointInput>;
  title: Scalars['String'];
  type?: InputMaybe<TopicType>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type CheckpointCreateWithoutCourseInput = {
  blocks?: InputMaybe<BlockCreateNestedManyWithoutCheckpointInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  deleted?: InputMaybe<Scalars['Date']>;
  description?: InputMaybe<Scalars['String']>;
  duration?: InputMaybe<Scalars['Int']>;
  enabled?: InputMaybe<Scalars['Boolean']>;
  enrolledCheckpoints?: InputMaybe<EnrolledCheckpointCreateNestedManyWithoutCheckpointInput>;
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<AssetCreateNestedOneWithoutCheckpointImageInput>;
  order: Scalars['Int'];
  parentCheckPoint?: InputMaybe<CheckpointCreateNestedOneWithoutSubCheckpointsInput>;
  subCheckpoints?: InputMaybe<CheckpointCreateNestedManyWithoutParentCheckPointInput>;
  title: Scalars['String'];
  type?: InputMaybe<TopicType>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type CheckpointCreateWithoutEnrolledCheckpointsInput = {
  blocks?: InputMaybe<BlockCreateNestedManyWithoutCheckpointInput>;
  course?: InputMaybe<CourseCreateNestedOneWithoutCheckpointsInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  deleted?: InputMaybe<Scalars['Date']>;
  description?: InputMaybe<Scalars['String']>;
  duration?: InputMaybe<Scalars['Int']>;
  enabled?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<AssetCreateNestedOneWithoutCheckpointImageInput>;
  order: Scalars['Int'];
  parentCheckPoint?: InputMaybe<CheckpointCreateNestedOneWithoutSubCheckpointsInput>;
  subCheckpoints?: InputMaybe<CheckpointCreateNestedManyWithoutParentCheckPointInput>;
  title: Scalars['String'];
  type?: InputMaybe<TopicType>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type CheckpointCreateWithoutImageInput = {
  blocks?: InputMaybe<BlockCreateNestedManyWithoutCheckpointInput>;
  course?: InputMaybe<CourseCreateNestedOneWithoutCheckpointsInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  deleted?: InputMaybe<Scalars['Date']>;
  description?: InputMaybe<Scalars['String']>;
  duration?: InputMaybe<Scalars['Int']>;
  enabled?: InputMaybe<Scalars['Boolean']>;
  enrolledCheckpoints?: InputMaybe<EnrolledCheckpointCreateNestedManyWithoutCheckpointInput>;
  id?: InputMaybe<Scalars['String']>;
  order: Scalars['Int'];
  parentCheckPoint?: InputMaybe<CheckpointCreateNestedOneWithoutSubCheckpointsInput>;
  subCheckpoints?: InputMaybe<CheckpointCreateNestedManyWithoutParentCheckPointInput>;
  title: Scalars['String'];
  type?: InputMaybe<TopicType>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type CheckpointCreateWithoutParentCheckPointInput = {
  blocks?: InputMaybe<BlockCreateNestedManyWithoutCheckpointInput>;
  course?: InputMaybe<CourseCreateNestedOneWithoutCheckpointsInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  deleted?: InputMaybe<Scalars['Date']>;
  description?: InputMaybe<Scalars['String']>;
  duration?: InputMaybe<Scalars['Int']>;
  enabled?: InputMaybe<Scalars['Boolean']>;
  enrolledCheckpoints?: InputMaybe<EnrolledCheckpointCreateNestedManyWithoutCheckpointInput>;
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<AssetCreateNestedOneWithoutCheckpointImageInput>;
  order: Scalars['Int'];
  subCheckpoints?: InputMaybe<CheckpointCreateNestedManyWithoutParentCheckPointInput>;
  title: Scalars['String'];
  type?: InputMaybe<TopicType>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type CheckpointCreateWithoutSubCheckpointsInput = {
  blocks?: InputMaybe<BlockCreateNestedManyWithoutCheckpointInput>;
  course?: InputMaybe<CourseCreateNestedOneWithoutCheckpointsInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  deleted?: InputMaybe<Scalars['Date']>;
  description?: InputMaybe<Scalars['String']>;
  duration?: InputMaybe<Scalars['Int']>;
  enabled?: InputMaybe<Scalars['Boolean']>;
  enrolledCheckpoints?: InputMaybe<EnrolledCheckpointCreateNestedManyWithoutCheckpointInput>;
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<AssetCreateNestedOneWithoutCheckpointImageInput>;
  order: Scalars['Int'];
  parentCheckPoint?: InputMaybe<CheckpointCreateNestedOneWithoutSubCheckpointsInput>;
  title: Scalars['String'];
  type?: InputMaybe<TopicType>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type CheckpointListRelationFilter = {
  every?: InputMaybe<CheckpointWhereInput>;
  none?: InputMaybe<CheckpointWhereInput>;
  some?: InputMaybe<CheckpointWhereInput>;
};

export type CheckpointOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export enum CheckpointOrderByRelevanceFieldEnum {
  CourseId = 'courseId',
  Description = 'description',
  Id = 'id',
  ImageId = 'imageId',
  ParentCheckpointId = 'parentCheckpointId',
  Title = 'title'
}

export type CheckpointOrderByRelevanceInput = {
  fields: Array<CheckpointOrderByRelevanceFieldEnum>;
  search: Scalars['String'];
  sort: SortOrder;
};

export type CheckpointOrderByWithRelationAndSearchRelevanceInput = {
  _relevance?: InputMaybe<CheckpointOrderByRelevanceInput>;
  blocks?: InputMaybe<BlockOrderByRelationAggregateInput>;
  course?: InputMaybe<CourseOrderByWithRelationAndSearchRelevanceInput>;
  courseId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  deleted?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  duration?: InputMaybe<SortOrder>;
  enabled?: InputMaybe<SortOrder>;
  enrolledCheckpoints?: InputMaybe<EnrolledCheckpointOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  image?: InputMaybe<AssetOrderByWithRelationAndSearchRelevanceInput>;
  imageId?: InputMaybe<SortOrder>;
  order?: InputMaybe<SortOrder>;
  parentCheckPoint?: InputMaybe<CheckpointOrderByWithRelationAndSearchRelevanceInput>;
  parentCheckpointId?: InputMaybe<SortOrder>;
  subCheckpoints?: InputMaybe<CheckpointOrderByRelationAggregateInput>;
  title?: InputMaybe<SortOrder>;
  type?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type CheckpointRelationFilter = {
  is?: InputMaybe<CheckpointWhereInput>;
  isNot?: InputMaybe<CheckpointWhereInput>;
};

export enum CheckpointScalarFieldEnum {
  CourseId = 'courseId',
  CreatedAt = 'createdAt',
  Deleted = 'deleted',
  Description = 'description',
  Duration = 'duration',
  Enabled = 'enabled',
  Id = 'id',
  ImageId = 'imageId',
  Order = 'order',
  ParentCheckpointId = 'parentCheckpointId',
  Title = 'title',
  Type = 'type',
  UpdatedAt = 'updatedAt'
}

export type CheckpointScalarWhereInput = {
  AND?: InputMaybe<Array<CheckpointScalarWhereInput>>;
  NOT?: InputMaybe<Array<CheckpointScalarWhereInput>>;
  OR?: InputMaybe<Array<CheckpointScalarWhereInput>>;
  courseId?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  deleted?: InputMaybe<DateTimeNullableFilter>;
  description?: InputMaybe<StringNullableFilter>;
  duration?: InputMaybe<IntFilter>;
  enabled?: InputMaybe<BoolFilter>;
  id?: InputMaybe<StringFilter>;
  imageId?: InputMaybe<StringNullableFilter>;
  order?: InputMaybe<IntFilter>;
  parentCheckpointId?: InputMaybe<StringNullableFilter>;
  title?: InputMaybe<StringFilter>;
  type?: InputMaybe<EnumTopicTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type CheckpointUncheckedCreateNestedManyWithoutParentCheckPointInput = {
  connect?: InputMaybe<Array<CheckpointWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<CheckpointCreateOrConnectWithoutParentCheckPointInput>>;
  create?: InputMaybe<Array<CheckpointCreateWithoutParentCheckPointInput>>;
  createMany?: InputMaybe<CheckpointCreateManyParentCheckPointInputEnvelope>;
};

export type CheckpointUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deleted?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  duration?: InputMaybe<IntFieldUpdateOperationsInput>;
  enabled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  order?: InputMaybe<IntFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  type?: InputMaybe<EnumTopicTypeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type CheckpointUpdateManyWithWhereWithoutCourseInput = {
  data: CheckpointUpdateManyMutationInput;
  where: CheckpointScalarWhereInput;
};

export type CheckpointUpdateManyWithWhereWithoutParentCheckPointInput = {
  data: CheckpointUpdateManyMutationInput;
  where: CheckpointScalarWhereInput;
};

export type CheckpointUpdateManyWithoutCourseInput = {
  connect?: InputMaybe<Array<CheckpointWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<CheckpointCreateOrConnectWithoutCourseInput>>;
  create?: InputMaybe<Array<CheckpointCreateWithoutCourseInput>>;
  createMany?: InputMaybe<CheckpointCreateManyCourseInputEnvelope>;
  delete?: InputMaybe<Array<CheckpointWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<CheckpointScalarWhereInput>>;
  disconnect?: InputMaybe<Array<CheckpointWhereUniqueInput>>;
  set?: InputMaybe<Array<CheckpointWhereUniqueInput>>;
  update?: InputMaybe<Array<CheckpointUpdateWithWhereUniqueWithoutCourseInput>>;
  updateMany?: InputMaybe<Array<CheckpointUpdateManyWithWhereWithoutCourseInput>>;
  upsert?: InputMaybe<Array<CheckpointUpsertWithWhereUniqueWithoutCourseInput>>;
};

export type CheckpointUpdateManyWithoutParentCheckPointInput = {
  connect?: InputMaybe<Array<CheckpointWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<CheckpointCreateOrConnectWithoutParentCheckPointInput>>;
  create?: InputMaybe<Array<CheckpointCreateWithoutParentCheckPointInput>>;
  createMany?: InputMaybe<CheckpointCreateManyParentCheckPointInputEnvelope>;
  delete?: InputMaybe<Array<CheckpointWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<CheckpointScalarWhereInput>>;
  disconnect?: InputMaybe<Array<CheckpointWhereUniqueInput>>;
  set?: InputMaybe<Array<CheckpointWhereUniqueInput>>;
  update?: InputMaybe<Array<CheckpointUpdateWithWhereUniqueWithoutParentCheckPointInput>>;
  updateMany?: InputMaybe<Array<CheckpointUpdateManyWithWhereWithoutParentCheckPointInput>>;
  upsert?: InputMaybe<Array<CheckpointUpsertWithWhereUniqueWithoutParentCheckPointInput>>;
};

export type CheckpointUpdateOneRequiredWithoutBlocksInput = {
  connect?: InputMaybe<CheckpointWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CheckpointCreateOrConnectWithoutBlocksInput>;
  create?: InputMaybe<CheckpointCreateWithoutBlocksInput>;
  update?: InputMaybe<CheckpointUpdateWithoutBlocksInput>;
  upsert?: InputMaybe<CheckpointUpsertWithoutBlocksInput>;
};

export type CheckpointUpdateOneWithoutEnrolledCheckpointsInput = {
  connect?: InputMaybe<CheckpointWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CheckpointCreateOrConnectWithoutEnrolledCheckpointsInput>;
  create?: InputMaybe<CheckpointCreateWithoutEnrolledCheckpointsInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<CheckpointUpdateWithoutEnrolledCheckpointsInput>;
  upsert?: InputMaybe<CheckpointUpsertWithoutEnrolledCheckpointsInput>;
};

export type CheckpointUpdateOneWithoutImageInput = {
  connect?: InputMaybe<CheckpointWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CheckpointCreateOrConnectWithoutImageInput>;
  create?: InputMaybe<CheckpointCreateWithoutImageInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<CheckpointUpdateWithoutImageInput>;
  upsert?: InputMaybe<CheckpointUpsertWithoutImageInput>;
};

export type CheckpointUpdateOneWithoutSubCheckpointsInput = {
  connect?: InputMaybe<CheckpointWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CheckpointCreateOrConnectWithoutSubCheckpointsInput>;
  create?: InputMaybe<CheckpointCreateWithoutSubCheckpointsInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<CheckpointUpdateWithoutSubCheckpointsInput>;
  upsert?: InputMaybe<CheckpointUpsertWithoutSubCheckpointsInput>;
};

export type CheckpointUpdateWithWhereUniqueWithoutCourseInput = {
  data: CheckpointUpdateWithoutCourseInput;
  where: CheckpointWhereUniqueInput;
};

export type CheckpointUpdateWithWhereUniqueWithoutParentCheckPointInput = {
  data: CheckpointUpdateWithoutParentCheckPointInput;
  where: CheckpointWhereUniqueInput;
};

export type CheckpointUpdateWithoutBlocksInput = {
  course?: InputMaybe<CourseUpdateOneWithoutCheckpointsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deleted?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  duration?: InputMaybe<IntFieldUpdateOperationsInput>;
  enabled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  enrolledCheckpoints?: InputMaybe<EnrolledCheckpointUpdateManyWithoutCheckpointInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  image?: InputMaybe<AssetUpdateOneWithoutCheckpointImageInput>;
  order?: InputMaybe<IntFieldUpdateOperationsInput>;
  parentCheckPoint?: InputMaybe<CheckpointUpdateOneWithoutSubCheckpointsInput>;
  subCheckpoints?: InputMaybe<CheckpointUpdateManyWithoutParentCheckPointInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  type?: InputMaybe<EnumTopicTypeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type CheckpointUpdateWithoutCourseInput = {
  blocks?: InputMaybe<BlockUpdateManyWithoutCheckpointInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deleted?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  duration?: InputMaybe<IntFieldUpdateOperationsInput>;
  enabled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  enrolledCheckpoints?: InputMaybe<EnrolledCheckpointUpdateManyWithoutCheckpointInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  image?: InputMaybe<AssetUpdateOneWithoutCheckpointImageInput>;
  order?: InputMaybe<IntFieldUpdateOperationsInput>;
  parentCheckPoint?: InputMaybe<CheckpointUpdateOneWithoutSubCheckpointsInput>;
  subCheckpoints?: InputMaybe<CheckpointUpdateManyWithoutParentCheckPointInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  type?: InputMaybe<EnumTopicTypeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type CheckpointUpdateWithoutEnrolledCheckpointsInput = {
  blocks?: InputMaybe<BlockUpdateManyWithoutCheckpointInput>;
  course?: InputMaybe<CourseUpdateOneWithoutCheckpointsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deleted?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  duration?: InputMaybe<IntFieldUpdateOperationsInput>;
  enabled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  image?: InputMaybe<AssetUpdateOneWithoutCheckpointImageInput>;
  order?: InputMaybe<IntFieldUpdateOperationsInput>;
  parentCheckPoint?: InputMaybe<CheckpointUpdateOneWithoutSubCheckpointsInput>;
  subCheckpoints?: InputMaybe<CheckpointUpdateManyWithoutParentCheckPointInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  type?: InputMaybe<EnumTopicTypeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type CheckpointUpdateWithoutImageInput = {
  blocks?: InputMaybe<BlockUpdateManyWithoutCheckpointInput>;
  course?: InputMaybe<CourseUpdateOneWithoutCheckpointsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deleted?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  duration?: InputMaybe<IntFieldUpdateOperationsInput>;
  enabled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  enrolledCheckpoints?: InputMaybe<EnrolledCheckpointUpdateManyWithoutCheckpointInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  order?: InputMaybe<IntFieldUpdateOperationsInput>;
  parentCheckPoint?: InputMaybe<CheckpointUpdateOneWithoutSubCheckpointsInput>;
  subCheckpoints?: InputMaybe<CheckpointUpdateManyWithoutParentCheckPointInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  type?: InputMaybe<EnumTopicTypeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type CheckpointUpdateWithoutParentCheckPointInput = {
  blocks?: InputMaybe<BlockUpdateManyWithoutCheckpointInput>;
  course?: InputMaybe<CourseUpdateOneWithoutCheckpointsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deleted?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  duration?: InputMaybe<IntFieldUpdateOperationsInput>;
  enabled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  enrolledCheckpoints?: InputMaybe<EnrolledCheckpointUpdateManyWithoutCheckpointInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  image?: InputMaybe<AssetUpdateOneWithoutCheckpointImageInput>;
  order?: InputMaybe<IntFieldUpdateOperationsInput>;
  subCheckpoints?: InputMaybe<CheckpointUpdateManyWithoutParentCheckPointInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  type?: InputMaybe<EnumTopicTypeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type CheckpointUpdateWithoutSubCheckpointsInput = {
  blocks?: InputMaybe<BlockUpdateManyWithoutCheckpointInput>;
  course?: InputMaybe<CourseUpdateOneWithoutCheckpointsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deleted?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  duration?: InputMaybe<IntFieldUpdateOperationsInput>;
  enabled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  enrolledCheckpoints?: InputMaybe<EnrolledCheckpointUpdateManyWithoutCheckpointInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  image?: InputMaybe<AssetUpdateOneWithoutCheckpointImageInput>;
  order?: InputMaybe<IntFieldUpdateOperationsInput>;
  parentCheckPoint?: InputMaybe<CheckpointUpdateOneWithoutSubCheckpointsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  type?: InputMaybe<EnumTopicTypeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type CheckpointUpsertWithWhereUniqueWithoutCourseInput = {
  create: CheckpointCreateWithoutCourseInput;
  update: CheckpointUpdateWithoutCourseInput;
  where: CheckpointWhereUniqueInput;
};

export type CheckpointUpsertWithWhereUniqueWithoutParentCheckPointInput = {
  create: CheckpointCreateWithoutParentCheckPointInput;
  update: CheckpointUpdateWithoutParentCheckPointInput;
  where: CheckpointWhereUniqueInput;
};

export type CheckpointUpsertWithoutBlocksInput = {
  create: CheckpointCreateWithoutBlocksInput;
  update: CheckpointUpdateWithoutBlocksInput;
};

export type CheckpointUpsertWithoutEnrolledCheckpointsInput = {
  create: CheckpointCreateWithoutEnrolledCheckpointsInput;
  update: CheckpointUpdateWithoutEnrolledCheckpointsInput;
};

export type CheckpointUpsertWithoutImageInput = {
  create: CheckpointCreateWithoutImageInput;
  update: CheckpointUpdateWithoutImageInput;
};

export type CheckpointUpsertWithoutSubCheckpointsInput = {
  create: CheckpointCreateWithoutSubCheckpointsInput;
  update: CheckpointUpdateWithoutSubCheckpointsInput;
};

export type CheckpointWhereInput = {
  AND?: InputMaybe<Array<CheckpointWhereInput>>;
  NOT?: InputMaybe<Array<CheckpointWhereInput>>;
  OR?: InputMaybe<Array<CheckpointWhereInput>>;
  blocks?: InputMaybe<BlockListRelationFilter>;
  course?: InputMaybe<CourseRelationFilter>;
  courseId?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  deleted?: InputMaybe<DateTimeNullableFilter>;
  description?: InputMaybe<StringNullableFilter>;
  duration?: InputMaybe<IntFilter>;
  enabled?: InputMaybe<BoolFilter>;
  enrolledCheckpoints?: InputMaybe<EnrolledCheckpointListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  image?: InputMaybe<AssetRelationFilter>;
  imageId?: InputMaybe<StringNullableFilter>;
  order?: InputMaybe<IntFilter>;
  parentCheckPoint?: InputMaybe<CheckpointRelationFilter>;
  parentCheckpointId?: InputMaybe<StringNullableFilter>;
  subCheckpoints?: InputMaybe<CheckpointListRelationFilter>;
  title?: InputMaybe<StringFilter>;
  type?: InputMaybe<EnumTopicTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type CheckpointWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  imageId?: InputMaybe<Scalars['String']>;
};

export type Course = {
  __typename?: 'Course';
  _count: CourseCount;
  banners?: Maybe<Array<Asset>>;
  category?: Maybe<Category>;
  categoryId?: Maybe<Scalars['String']>;
  checkpoints?: Maybe<Array<Checkpoint>>;
  courseReviews?: Maybe<Array<CourseReview>>;
  createdAt: Scalars['Date'];
  deleted?: Maybe<Scalars['Date']>;
  description: Scalars['String'];
  duration: Scalars['Int'];
  enrolledCourses?: Maybe<Array<EnrolledCourse>>;
  id: Scalars['ID'];
  level: Level;
  published: Scalars['Boolean'];
  rating: Scalars['Decimal'];
  state: State;
  tags?: Maybe<Array<Scalars['String']>>;
  teacher: Teacher;
  teacherId: Scalars['String'];
  thumbnail?: Maybe<Asset>;
  thumbnailId?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt: Scalars['Date'];
};


export type CourseEnrolledCoursesArgs = {
  cursor?: InputMaybe<EnrolledCourseWhereUniqueInput>;
  distinct?: InputMaybe<Array<EnrolledCourseScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<EnrolledCourseOrderByWithRelationAndSearchRelevanceInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<EnrolledCourseWhereInput>;
};

export enum CourseAssetType {
  Banner = 'BANNER',
  Thumbnail = 'THUMBNAIL'
}

export type CourseCount = {
  __typename?: 'CourseCount';
  banners: Scalars['Int'];
  checkpoints: Scalars['Int'];
  courseReviews: Scalars['Int'];
  enrolledCourses: Scalars['Int'];
};

export type CourseCreateManyCategoryInput = {
  createdAt?: InputMaybe<Scalars['Date']>;
  deleted?: InputMaybe<Scalars['Date']>;
  description: Scalars['String'];
  duration?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['String']>;
  level: Level;
  published?: InputMaybe<Scalars['Boolean']>;
  rating?: InputMaybe<Scalars['Decimal']>;
  state?: InputMaybe<State>;
  tags?: InputMaybe<CourseCreatetagsInput>;
  teacherId: Scalars['String'];
  thumbnailId?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type CourseCreateManyCategoryInputEnvelope = {
  data: Array<CourseCreateManyCategoryInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type CourseCreateManyTeacherInput = {
  categoryId?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['Date']>;
  deleted?: InputMaybe<Scalars['Date']>;
  description: Scalars['String'];
  duration?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['String']>;
  level: Level;
  published?: InputMaybe<Scalars['Boolean']>;
  rating?: InputMaybe<Scalars['Decimal']>;
  state?: InputMaybe<State>;
  tags?: InputMaybe<CourseCreatetagsInput>;
  thumbnailId?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type CourseCreateManyTeacherInputEnvelope = {
  data: Array<CourseCreateManyTeacherInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type CourseCreateNestedManyWithoutCategoryInput = {
  connect?: InputMaybe<Array<CourseWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<CourseCreateOrConnectWithoutCategoryInput>>;
  create?: InputMaybe<Array<CourseCreateWithoutCategoryInput>>;
  createMany?: InputMaybe<CourseCreateManyCategoryInputEnvelope>;
};

export type CourseCreateNestedManyWithoutTeacherInput = {
  connect?: InputMaybe<Array<CourseWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<CourseCreateOrConnectWithoutTeacherInput>>;
  create?: InputMaybe<Array<CourseCreateWithoutTeacherInput>>;
  createMany?: InputMaybe<CourseCreateManyTeacherInputEnvelope>;
};

export type CourseCreateNestedOneWithoutBannersInput = {
  connect?: InputMaybe<CourseWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CourseCreateOrConnectWithoutBannersInput>;
  create?: InputMaybe<CourseCreateWithoutBannersInput>;
};

export type CourseCreateNestedOneWithoutCheckpointsInput = {
  connect?: InputMaybe<CourseWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CourseCreateOrConnectWithoutCheckpointsInput>;
  create?: InputMaybe<CourseCreateWithoutCheckpointsInput>;
};

export type CourseCreateNestedOneWithoutCourseReviewsInput = {
  connect?: InputMaybe<CourseWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CourseCreateOrConnectWithoutCourseReviewsInput>;
  create?: InputMaybe<CourseCreateWithoutCourseReviewsInput>;
};

export type CourseCreateNestedOneWithoutEnrolledCoursesInput = {
  connect?: InputMaybe<CourseWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CourseCreateOrConnectWithoutEnrolledCoursesInput>;
  create?: InputMaybe<CourseCreateWithoutEnrolledCoursesInput>;
};

export type CourseCreateNestedOneWithoutThumbnailInput = {
  connect?: InputMaybe<CourseWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CourseCreateOrConnectWithoutThumbnailInput>;
  create?: InputMaybe<CourseCreateWithoutThumbnailInput>;
};

export type CourseCreateOrConnectWithoutBannersInput = {
  create: CourseCreateWithoutBannersInput;
  where: CourseWhereUniqueInput;
};

export type CourseCreateOrConnectWithoutCategoryInput = {
  create: CourseCreateWithoutCategoryInput;
  where: CourseWhereUniqueInput;
};

export type CourseCreateOrConnectWithoutCheckpointsInput = {
  create: CourseCreateWithoutCheckpointsInput;
  where: CourseWhereUniqueInput;
};

export type CourseCreateOrConnectWithoutCourseReviewsInput = {
  create: CourseCreateWithoutCourseReviewsInput;
  where: CourseWhereUniqueInput;
};

export type CourseCreateOrConnectWithoutEnrolledCoursesInput = {
  create: CourseCreateWithoutEnrolledCoursesInput;
  where: CourseWhereUniqueInput;
};

export type CourseCreateOrConnectWithoutTeacherInput = {
  create: CourseCreateWithoutTeacherInput;
  where: CourseWhereUniqueInput;
};

export type CourseCreateOrConnectWithoutThumbnailInput = {
  create: CourseCreateWithoutThumbnailInput;
  where: CourseWhereUniqueInput;
};

export type CourseCreateWithoutBannersInput = {
  category?: InputMaybe<CategoryCreateNestedOneWithoutCoursesInput>;
  checkpoints?: InputMaybe<CheckpointCreateNestedManyWithoutCourseInput>;
  courseReviews?: InputMaybe<CourseReviewCreateNestedManyWithoutCourseInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  deleted?: InputMaybe<Scalars['Date']>;
  description: Scalars['String'];
  duration?: InputMaybe<Scalars['Int']>;
  enrolledCourses?: InputMaybe<EnrolledCourseCreateNestedManyWithoutCourseInput>;
  id?: InputMaybe<Scalars['String']>;
  level: Level;
  published?: InputMaybe<Scalars['Boolean']>;
  rating?: InputMaybe<Scalars['Decimal']>;
  state?: InputMaybe<State>;
  tags?: InputMaybe<CourseCreatetagsInput>;
  teacher: TeacherCreateNestedOneWithoutCourseInput;
  thumbnail?: InputMaybe<AssetCreateNestedOneWithoutThumbnailCourseInput>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type CourseCreateWithoutCategoryInput = {
  banners?: InputMaybe<AssetCreateNestedManyWithoutBannerCourseInput>;
  checkpoints?: InputMaybe<CheckpointCreateNestedManyWithoutCourseInput>;
  courseReviews?: InputMaybe<CourseReviewCreateNestedManyWithoutCourseInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  deleted?: InputMaybe<Scalars['Date']>;
  description: Scalars['String'];
  duration?: InputMaybe<Scalars['Int']>;
  enrolledCourses?: InputMaybe<EnrolledCourseCreateNestedManyWithoutCourseInput>;
  id?: InputMaybe<Scalars['String']>;
  level: Level;
  published?: InputMaybe<Scalars['Boolean']>;
  rating?: InputMaybe<Scalars['Decimal']>;
  state?: InputMaybe<State>;
  tags?: InputMaybe<CourseCreatetagsInput>;
  teacher: TeacherCreateNestedOneWithoutCourseInput;
  thumbnail?: InputMaybe<AssetCreateNestedOneWithoutThumbnailCourseInput>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type CourseCreateWithoutCheckpointsInput = {
  banners?: InputMaybe<AssetCreateNestedManyWithoutBannerCourseInput>;
  category?: InputMaybe<CategoryCreateNestedOneWithoutCoursesInput>;
  courseReviews?: InputMaybe<CourseReviewCreateNestedManyWithoutCourseInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  deleted?: InputMaybe<Scalars['Date']>;
  description: Scalars['String'];
  duration?: InputMaybe<Scalars['Int']>;
  enrolledCourses?: InputMaybe<EnrolledCourseCreateNestedManyWithoutCourseInput>;
  id?: InputMaybe<Scalars['String']>;
  level: Level;
  published?: InputMaybe<Scalars['Boolean']>;
  rating?: InputMaybe<Scalars['Decimal']>;
  state?: InputMaybe<State>;
  tags?: InputMaybe<CourseCreatetagsInput>;
  teacher: TeacherCreateNestedOneWithoutCourseInput;
  thumbnail?: InputMaybe<AssetCreateNestedOneWithoutThumbnailCourseInput>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type CourseCreateWithoutCourseReviewsInput = {
  banners?: InputMaybe<AssetCreateNestedManyWithoutBannerCourseInput>;
  category?: InputMaybe<CategoryCreateNestedOneWithoutCoursesInput>;
  checkpoints?: InputMaybe<CheckpointCreateNestedManyWithoutCourseInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  deleted?: InputMaybe<Scalars['Date']>;
  description: Scalars['String'];
  duration?: InputMaybe<Scalars['Int']>;
  enrolledCourses?: InputMaybe<EnrolledCourseCreateNestedManyWithoutCourseInput>;
  id?: InputMaybe<Scalars['String']>;
  level: Level;
  published?: InputMaybe<Scalars['Boolean']>;
  rating?: InputMaybe<Scalars['Decimal']>;
  state?: InputMaybe<State>;
  tags?: InputMaybe<CourseCreatetagsInput>;
  teacher: TeacherCreateNestedOneWithoutCourseInput;
  thumbnail?: InputMaybe<AssetCreateNestedOneWithoutThumbnailCourseInput>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type CourseCreateWithoutEnrolledCoursesInput = {
  banners?: InputMaybe<AssetCreateNestedManyWithoutBannerCourseInput>;
  category?: InputMaybe<CategoryCreateNestedOneWithoutCoursesInput>;
  checkpoints?: InputMaybe<CheckpointCreateNestedManyWithoutCourseInput>;
  courseReviews?: InputMaybe<CourseReviewCreateNestedManyWithoutCourseInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  deleted?: InputMaybe<Scalars['Date']>;
  description: Scalars['String'];
  duration?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['String']>;
  level: Level;
  published?: InputMaybe<Scalars['Boolean']>;
  rating?: InputMaybe<Scalars['Decimal']>;
  state?: InputMaybe<State>;
  tags?: InputMaybe<CourseCreatetagsInput>;
  teacher: TeacherCreateNestedOneWithoutCourseInput;
  thumbnail?: InputMaybe<AssetCreateNestedOneWithoutThumbnailCourseInput>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type CourseCreateWithoutTeacherInput = {
  banners?: InputMaybe<AssetCreateNestedManyWithoutBannerCourseInput>;
  category?: InputMaybe<CategoryCreateNestedOneWithoutCoursesInput>;
  checkpoints?: InputMaybe<CheckpointCreateNestedManyWithoutCourseInput>;
  courseReviews?: InputMaybe<CourseReviewCreateNestedManyWithoutCourseInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  deleted?: InputMaybe<Scalars['Date']>;
  description: Scalars['String'];
  duration?: InputMaybe<Scalars['Int']>;
  enrolledCourses?: InputMaybe<EnrolledCourseCreateNestedManyWithoutCourseInput>;
  id?: InputMaybe<Scalars['String']>;
  level: Level;
  published?: InputMaybe<Scalars['Boolean']>;
  rating?: InputMaybe<Scalars['Decimal']>;
  state?: InputMaybe<State>;
  tags?: InputMaybe<CourseCreatetagsInput>;
  thumbnail?: InputMaybe<AssetCreateNestedOneWithoutThumbnailCourseInput>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type CourseCreateWithoutThumbnailInput = {
  banners?: InputMaybe<AssetCreateNestedManyWithoutBannerCourseInput>;
  category?: InputMaybe<CategoryCreateNestedOneWithoutCoursesInput>;
  checkpoints?: InputMaybe<CheckpointCreateNestedManyWithoutCourseInput>;
  courseReviews?: InputMaybe<CourseReviewCreateNestedManyWithoutCourseInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  deleted?: InputMaybe<Scalars['Date']>;
  description: Scalars['String'];
  duration?: InputMaybe<Scalars['Int']>;
  enrolledCourses?: InputMaybe<EnrolledCourseCreateNestedManyWithoutCourseInput>;
  id?: InputMaybe<Scalars['String']>;
  level: Level;
  published?: InputMaybe<Scalars['Boolean']>;
  rating?: InputMaybe<Scalars['Decimal']>;
  state?: InputMaybe<State>;
  tags?: InputMaybe<CourseCreatetagsInput>;
  teacher: TeacherCreateNestedOneWithoutCourseInput;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type CourseCreatetagsInput = {
  set: Array<Scalars['String']>;
};

export type CourseListRelationFilter = {
  every?: InputMaybe<CourseWhereInput>;
  none?: InputMaybe<CourseWhereInput>;
  some?: InputMaybe<CourseWhereInput>;
};

export type CourseOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export enum CourseOrderByRelevanceFieldEnum {
  CategoryId = 'categoryId',
  Description = 'description',
  Id = 'id',
  Tags = 'tags',
  TeacherId = 'teacherId',
  ThumbnailId = 'thumbnailId',
  Title = 'title'
}

export type CourseOrderByRelevanceInput = {
  fields: Array<CourseOrderByRelevanceFieldEnum>;
  search: Scalars['String'];
  sort: SortOrder;
};

export type CourseOrderByWithRelationAndSearchRelevanceInput = {
  _relevance?: InputMaybe<CourseOrderByRelevanceInput>;
  banners?: InputMaybe<AssetOrderByRelationAggregateInput>;
  category?: InputMaybe<CategoryOrderByWithRelationAndSearchRelevanceInput>;
  categoryId?: InputMaybe<SortOrder>;
  checkpoints?: InputMaybe<CheckpointOrderByRelationAggregateInput>;
  courseReviews?: InputMaybe<CourseReviewOrderByRelationAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  deleted?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  duration?: InputMaybe<SortOrder>;
  enrolledCourses?: InputMaybe<EnrolledCourseOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  level?: InputMaybe<SortOrder>;
  published?: InputMaybe<SortOrder>;
  rating?: InputMaybe<SortOrder>;
  state?: InputMaybe<SortOrder>;
  tags?: InputMaybe<SortOrder>;
  teacher?: InputMaybe<TeacherOrderByWithRelationAndSearchRelevanceInput>;
  teacherId?: InputMaybe<SortOrder>;
  thumbnail?: InputMaybe<AssetOrderByWithRelationAndSearchRelevanceInput>;
  thumbnailId?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type CourseRelationFilter = {
  is?: InputMaybe<CourseWhereInput>;
  isNot?: InputMaybe<CourseWhereInput>;
};

export type CourseReview = {
  __typename?: 'CourseReview';
  comment: Scalars['String'];
  course: Course;
  courseId: Scalars['String'];
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  score: Scalars['Int'];
  user: User;
  userId: Scalars['String'];
};

export type CourseReviewCourseIdUserIdCompoundUniqueInput = {
  courseId: Scalars['String'];
  userId: Scalars['String'];
};

export type CourseReviewCreateManyCourseInput = {
  comment: Scalars['String'];
  createdAt?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  score: Scalars['Int'];
  userId: Scalars['String'];
};

export type CourseReviewCreateManyCourseInputEnvelope = {
  data: Array<CourseReviewCreateManyCourseInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type CourseReviewCreateManyUserInput = {
  comment: Scalars['String'];
  courseId: Scalars['String'];
  createdAt?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  score: Scalars['Int'];
};

export type CourseReviewCreateManyUserInputEnvelope = {
  data: Array<CourseReviewCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type CourseReviewCreateNestedManyWithoutCourseInput = {
  connect?: InputMaybe<Array<CourseReviewWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<CourseReviewCreateOrConnectWithoutCourseInput>>;
  create?: InputMaybe<Array<CourseReviewCreateWithoutCourseInput>>;
  createMany?: InputMaybe<CourseReviewCreateManyCourseInputEnvelope>;
};

export type CourseReviewCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<CourseReviewWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<CourseReviewCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<CourseReviewCreateWithoutUserInput>>;
  createMany?: InputMaybe<CourseReviewCreateManyUserInputEnvelope>;
};

export type CourseReviewCreateOrConnectWithoutCourseInput = {
  create: CourseReviewCreateWithoutCourseInput;
  where: CourseReviewWhereUniqueInput;
};

export type CourseReviewCreateOrConnectWithoutUserInput = {
  create: CourseReviewCreateWithoutUserInput;
  where: CourseReviewWhereUniqueInput;
};

export type CourseReviewCreateWithoutCourseInput = {
  comment: Scalars['String'];
  createdAt?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  score: Scalars['Int'];
  user: UserCreateNestedOneWithoutCourseReviewsInput;
};

export type CourseReviewCreateWithoutUserInput = {
  comment: Scalars['String'];
  course: CourseCreateNestedOneWithoutCourseReviewsInput;
  createdAt?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  score: Scalars['Int'];
};

export type CourseReviewListRelationFilter = {
  every?: InputMaybe<CourseReviewWhereInput>;
  none?: InputMaybe<CourseReviewWhereInput>;
  some?: InputMaybe<CourseReviewWhereInput>;
};

export type CourseReviewOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export enum CourseReviewOrderByRelevanceFieldEnum {
  Comment = 'comment',
  CourseId = 'courseId',
  Id = 'id',
  UserId = 'userId'
}

export type CourseReviewOrderByRelevanceInput = {
  fields: Array<CourseReviewOrderByRelevanceFieldEnum>;
  search: Scalars['String'];
  sort: SortOrder;
};

export type CourseReviewOrderByWithRelationAndSearchRelevanceInput = {
  _relevance?: InputMaybe<CourseReviewOrderByRelevanceInput>;
  comment?: InputMaybe<SortOrder>;
  course?: InputMaybe<CourseOrderByWithRelationAndSearchRelevanceInput>;
  courseId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  score?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationAndSearchRelevanceInput>;
  userId?: InputMaybe<SortOrder>;
};

export enum CourseReviewScalarFieldEnum {
  Comment = 'comment',
  CourseId = 'courseId',
  CreatedAt = 'createdAt',
  Id = 'id',
  Score = 'score',
  UserId = 'userId'
}

export type CourseReviewScalarWhereInput = {
  AND?: InputMaybe<Array<CourseReviewScalarWhereInput>>;
  NOT?: InputMaybe<Array<CourseReviewScalarWhereInput>>;
  OR?: InputMaybe<Array<CourseReviewScalarWhereInput>>;
  comment?: InputMaybe<StringFilter>;
  courseId?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  score?: InputMaybe<IntFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type CourseReviewUpdateManyMutationInput = {
  comment?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  score?: InputMaybe<IntFieldUpdateOperationsInput>;
};

export type CourseReviewUpdateManyWithWhereWithoutCourseInput = {
  data: CourseReviewUpdateManyMutationInput;
  where: CourseReviewScalarWhereInput;
};

export type CourseReviewUpdateManyWithWhereWithoutUserInput = {
  data: CourseReviewUpdateManyMutationInput;
  where: CourseReviewScalarWhereInput;
};

export type CourseReviewUpdateManyWithoutCourseInput = {
  connect?: InputMaybe<Array<CourseReviewWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<CourseReviewCreateOrConnectWithoutCourseInput>>;
  create?: InputMaybe<Array<CourseReviewCreateWithoutCourseInput>>;
  createMany?: InputMaybe<CourseReviewCreateManyCourseInputEnvelope>;
  delete?: InputMaybe<Array<CourseReviewWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<CourseReviewScalarWhereInput>>;
  disconnect?: InputMaybe<Array<CourseReviewWhereUniqueInput>>;
  set?: InputMaybe<Array<CourseReviewWhereUniqueInput>>;
  update?: InputMaybe<Array<CourseReviewUpdateWithWhereUniqueWithoutCourseInput>>;
  updateMany?: InputMaybe<Array<CourseReviewUpdateManyWithWhereWithoutCourseInput>>;
  upsert?: InputMaybe<Array<CourseReviewUpsertWithWhereUniqueWithoutCourseInput>>;
};

export type CourseReviewUpdateManyWithoutUserInput = {
  connect?: InputMaybe<Array<CourseReviewWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<CourseReviewCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<CourseReviewCreateWithoutUserInput>>;
  createMany?: InputMaybe<CourseReviewCreateManyUserInputEnvelope>;
  delete?: InputMaybe<Array<CourseReviewWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<CourseReviewScalarWhereInput>>;
  disconnect?: InputMaybe<Array<CourseReviewWhereUniqueInput>>;
  set?: InputMaybe<Array<CourseReviewWhereUniqueInput>>;
  update?: InputMaybe<Array<CourseReviewUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<CourseReviewUpdateManyWithWhereWithoutUserInput>>;
  upsert?: InputMaybe<Array<CourseReviewUpsertWithWhereUniqueWithoutUserInput>>;
};

export type CourseReviewUpdateWithWhereUniqueWithoutCourseInput = {
  data: CourseReviewUpdateWithoutCourseInput;
  where: CourseReviewWhereUniqueInput;
};

export type CourseReviewUpdateWithWhereUniqueWithoutUserInput = {
  data: CourseReviewUpdateWithoutUserInput;
  where: CourseReviewWhereUniqueInput;
};

export type CourseReviewUpdateWithoutCourseInput = {
  comment?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  score?: InputMaybe<IntFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutCourseReviewsInput>;
};

export type CourseReviewUpdateWithoutUserInput = {
  comment?: InputMaybe<StringFieldUpdateOperationsInput>;
  course?: InputMaybe<CourseUpdateOneRequiredWithoutCourseReviewsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  score?: InputMaybe<IntFieldUpdateOperationsInput>;
};

export type CourseReviewUpsertWithWhereUniqueWithoutCourseInput = {
  create: CourseReviewCreateWithoutCourseInput;
  update: CourseReviewUpdateWithoutCourseInput;
  where: CourseReviewWhereUniqueInput;
};

export type CourseReviewUpsertWithWhereUniqueWithoutUserInput = {
  create: CourseReviewCreateWithoutUserInput;
  update: CourseReviewUpdateWithoutUserInput;
  where: CourseReviewWhereUniqueInput;
};

export type CourseReviewWhereInput = {
  AND?: InputMaybe<Array<CourseReviewWhereInput>>;
  NOT?: InputMaybe<Array<CourseReviewWhereInput>>;
  OR?: InputMaybe<Array<CourseReviewWhereInput>>;
  comment?: InputMaybe<StringFilter>;
  course?: InputMaybe<CourseRelationFilter>;
  courseId?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  score?: InputMaybe<IntFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type CourseReviewWhereUniqueInput = {
  courseId_userId?: InputMaybe<CourseReviewCourseIdUserIdCompoundUniqueInput>;
  id?: InputMaybe<Scalars['String']>;
};

export enum CourseScalarFieldEnum {
  CategoryId = 'categoryId',
  CreatedAt = 'createdAt',
  Deleted = 'deleted',
  Description = 'description',
  Duration = 'duration',
  Id = 'id',
  Level = 'level',
  Published = 'published',
  Rating = 'rating',
  State = 'state',
  Tags = 'tags',
  TeacherId = 'teacherId',
  ThumbnailId = 'thumbnailId',
  Title = 'title',
  UpdatedAt = 'updatedAt'
}

export type CourseScalarWhereInput = {
  AND?: InputMaybe<Array<CourseScalarWhereInput>>;
  NOT?: InputMaybe<Array<CourseScalarWhereInput>>;
  OR?: InputMaybe<Array<CourseScalarWhereInput>>;
  categoryId?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  deleted?: InputMaybe<DateTimeNullableFilter>;
  description?: InputMaybe<StringFilter>;
  duration?: InputMaybe<IntFilter>;
  id?: InputMaybe<StringFilter>;
  level?: InputMaybe<EnumLevelFilter>;
  published?: InputMaybe<BoolFilter>;
  rating?: InputMaybe<DecimalFilter>;
  state?: InputMaybe<EnumStateFilter>;
  tags?: InputMaybe<StringNullableListFilter>;
  teacherId?: InputMaybe<StringFilter>;
  thumbnailId?: InputMaybe<StringNullableFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type CourseUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deleted?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  duration?: InputMaybe<IntFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  level?: InputMaybe<EnumLevelFieldUpdateOperationsInput>;
  published?: InputMaybe<BoolFieldUpdateOperationsInput>;
  rating?: InputMaybe<DecimalFieldUpdateOperationsInput>;
  state?: InputMaybe<EnumStateFieldUpdateOperationsInput>;
  tags?: InputMaybe<CourseUpdatetagsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type CourseUpdateManyWithWhereWithoutCategoryInput = {
  data: CourseUpdateManyMutationInput;
  where: CourseScalarWhereInput;
};

export type CourseUpdateManyWithWhereWithoutTeacherInput = {
  data: CourseUpdateManyMutationInput;
  where: CourseScalarWhereInput;
};

export type CourseUpdateManyWithoutCategoryInput = {
  connect?: InputMaybe<Array<CourseWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<CourseCreateOrConnectWithoutCategoryInput>>;
  create?: InputMaybe<Array<CourseCreateWithoutCategoryInput>>;
  createMany?: InputMaybe<CourseCreateManyCategoryInputEnvelope>;
  delete?: InputMaybe<Array<CourseWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<CourseScalarWhereInput>>;
  disconnect?: InputMaybe<Array<CourseWhereUniqueInput>>;
  set?: InputMaybe<Array<CourseWhereUniqueInput>>;
  update?: InputMaybe<Array<CourseUpdateWithWhereUniqueWithoutCategoryInput>>;
  updateMany?: InputMaybe<Array<CourseUpdateManyWithWhereWithoutCategoryInput>>;
  upsert?: InputMaybe<Array<CourseUpsertWithWhereUniqueWithoutCategoryInput>>;
};

export type CourseUpdateManyWithoutTeacherInput = {
  connect?: InputMaybe<Array<CourseWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<CourseCreateOrConnectWithoutTeacherInput>>;
  create?: InputMaybe<Array<CourseCreateWithoutTeacherInput>>;
  createMany?: InputMaybe<CourseCreateManyTeacherInputEnvelope>;
  delete?: InputMaybe<Array<CourseWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<CourseScalarWhereInput>>;
  disconnect?: InputMaybe<Array<CourseWhereUniqueInput>>;
  set?: InputMaybe<Array<CourseWhereUniqueInput>>;
  update?: InputMaybe<Array<CourseUpdateWithWhereUniqueWithoutTeacherInput>>;
  updateMany?: InputMaybe<Array<CourseUpdateManyWithWhereWithoutTeacherInput>>;
  upsert?: InputMaybe<Array<CourseUpsertWithWhereUniqueWithoutTeacherInput>>;
};

export type CourseUpdateOneRequiredWithoutCourseReviewsInput = {
  connect?: InputMaybe<CourseWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CourseCreateOrConnectWithoutCourseReviewsInput>;
  create?: InputMaybe<CourseCreateWithoutCourseReviewsInput>;
  update?: InputMaybe<CourseUpdateWithoutCourseReviewsInput>;
  upsert?: InputMaybe<CourseUpsertWithoutCourseReviewsInput>;
};

export type CourseUpdateOneRequiredWithoutEnrolledCoursesInput = {
  connect?: InputMaybe<CourseWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CourseCreateOrConnectWithoutEnrolledCoursesInput>;
  create?: InputMaybe<CourseCreateWithoutEnrolledCoursesInput>;
  update?: InputMaybe<CourseUpdateWithoutEnrolledCoursesInput>;
  upsert?: InputMaybe<CourseUpsertWithoutEnrolledCoursesInput>;
};

export type CourseUpdateOneWithoutBannersInput = {
  connect?: InputMaybe<CourseWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CourseCreateOrConnectWithoutBannersInput>;
  create?: InputMaybe<CourseCreateWithoutBannersInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<CourseUpdateWithoutBannersInput>;
  upsert?: InputMaybe<CourseUpsertWithoutBannersInput>;
};

export type CourseUpdateOneWithoutCheckpointsInput = {
  connect?: InputMaybe<CourseWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CourseCreateOrConnectWithoutCheckpointsInput>;
  create?: InputMaybe<CourseCreateWithoutCheckpointsInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<CourseUpdateWithoutCheckpointsInput>;
  upsert?: InputMaybe<CourseUpsertWithoutCheckpointsInput>;
};

export type CourseUpdateOneWithoutThumbnailInput = {
  connect?: InputMaybe<CourseWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CourseCreateOrConnectWithoutThumbnailInput>;
  create?: InputMaybe<CourseCreateWithoutThumbnailInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<CourseUpdateWithoutThumbnailInput>;
  upsert?: InputMaybe<CourseUpsertWithoutThumbnailInput>;
};

export type CourseUpdateWithWhereUniqueWithoutCategoryInput = {
  data: CourseUpdateWithoutCategoryInput;
  where: CourseWhereUniqueInput;
};

export type CourseUpdateWithWhereUniqueWithoutTeacherInput = {
  data: CourseUpdateWithoutTeacherInput;
  where: CourseWhereUniqueInput;
};

export type CourseUpdateWithoutBannersInput = {
  category?: InputMaybe<CategoryUpdateOneWithoutCoursesInput>;
  checkpoints?: InputMaybe<CheckpointUpdateManyWithoutCourseInput>;
  courseReviews?: InputMaybe<CourseReviewUpdateManyWithoutCourseInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deleted?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  duration?: InputMaybe<IntFieldUpdateOperationsInput>;
  enrolledCourses?: InputMaybe<EnrolledCourseUpdateManyWithoutCourseInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  level?: InputMaybe<EnumLevelFieldUpdateOperationsInput>;
  published?: InputMaybe<BoolFieldUpdateOperationsInput>;
  rating?: InputMaybe<DecimalFieldUpdateOperationsInput>;
  state?: InputMaybe<EnumStateFieldUpdateOperationsInput>;
  tags?: InputMaybe<CourseUpdatetagsInput>;
  teacher?: InputMaybe<TeacherUpdateOneRequiredWithoutCourseInput>;
  thumbnail?: InputMaybe<AssetUpdateOneWithoutThumbnailCourseInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type CourseUpdateWithoutCategoryInput = {
  banners?: InputMaybe<AssetUpdateManyWithoutBannerCourseInput>;
  checkpoints?: InputMaybe<CheckpointUpdateManyWithoutCourseInput>;
  courseReviews?: InputMaybe<CourseReviewUpdateManyWithoutCourseInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deleted?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  duration?: InputMaybe<IntFieldUpdateOperationsInput>;
  enrolledCourses?: InputMaybe<EnrolledCourseUpdateManyWithoutCourseInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  level?: InputMaybe<EnumLevelFieldUpdateOperationsInput>;
  published?: InputMaybe<BoolFieldUpdateOperationsInput>;
  rating?: InputMaybe<DecimalFieldUpdateOperationsInput>;
  state?: InputMaybe<EnumStateFieldUpdateOperationsInput>;
  tags?: InputMaybe<CourseUpdatetagsInput>;
  teacher?: InputMaybe<TeacherUpdateOneRequiredWithoutCourseInput>;
  thumbnail?: InputMaybe<AssetUpdateOneWithoutThumbnailCourseInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type CourseUpdateWithoutCheckpointsInput = {
  banners?: InputMaybe<AssetUpdateManyWithoutBannerCourseInput>;
  category?: InputMaybe<CategoryUpdateOneWithoutCoursesInput>;
  courseReviews?: InputMaybe<CourseReviewUpdateManyWithoutCourseInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deleted?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  duration?: InputMaybe<IntFieldUpdateOperationsInput>;
  enrolledCourses?: InputMaybe<EnrolledCourseUpdateManyWithoutCourseInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  level?: InputMaybe<EnumLevelFieldUpdateOperationsInput>;
  published?: InputMaybe<BoolFieldUpdateOperationsInput>;
  rating?: InputMaybe<DecimalFieldUpdateOperationsInput>;
  state?: InputMaybe<EnumStateFieldUpdateOperationsInput>;
  tags?: InputMaybe<CourseUpdatetagsInput>;
  teacher?: InputMaybe<TeacherUpdateOneRequiredWithoutCourseInput>;
  thumbnail?: InputMaybe<AssetUpdateOneWithoutThumbnailCourseInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type CourseUpdateWithoutCourseReviewsInput = {
  banners?: InputMaybe<AssetUpdateManyWithoutBannerCourseInput>;
  category?: InputMaybe<CategoryUpdateOneWithoutCoursesInput>;
  checkpoints?: InputMaybe<CheckpointUpdateManyWithoutCourseInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deleted?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  duration?: InputMaybe<IntFieldUpdateOperationsInput>;
  enrolledCourses?: InputMaybe<EnrolledCourseUpdateManyWithoutCourseInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  level?: InputMaybe<EnumLevelFieldUpdateOperationsInput>;
  published?: InputMaybe<BoolFieldUpdateOperationsInput>;
  rating?: InputMaybe<DecimalFieldUpdateOperationsInput>;
  state?: InputMaybe<EnumStateFieldUpdateOperationsInput>;
  tags?: InputMaybe<CourseUpdatetagsInput>;
  teacher?: InputMaybe<TeacherUpdateOneRequiredWithoutCourseInput>;
  thumbnail?: InputMaybe<AssetUpdateOneWithoutThumbnailCourseInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type CourseUpdateWithoutEnrolledCoursesInput = {
  banners?: InputMaybe<AssetUpdateManyWithoutBannerCourseInput>;
  category?: InputMaybe<CategoryUpdateOneWithoutCoursesInput>;
  checkpoints?: InputMaybe<CheckpointUpdateManyWithoutCourseInput>;
  courseReviews?: InputMaybe<CourseReviewUpdateManyWithoutCourseInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deleted?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  duration?: InputMaybe<IntFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  level?: InputMaybe<EnumLevelFieldUpdateOperationsInput>;
  published?: InputMaybe<BoolFieldUpdateOperationsInput>;
  rating?: InputMaybe<DecimalFieldUpdateOperationsInput>;
  state?: InputMaybe<EnumStateFieldUpdateOperationsInput>;
  tags?: InputMaybe<CourseUpdatetagsInput>;
  teacher?: InputMaybe<TeacherUpdateOneRequiredWithoutCourseInput>;
  thumbnail?: InputMaybe<AssetUpdateOneWithoutThumbnailCourseInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type CourseUpdateWithoutTeacherInput = {
  banners?: InputMaybe<AssetUpdateManyWithoutBannerCourseInput>;
  category?: InputMaybe<CategoryUpdateOneWithoutCoursesInput>;
  checkpoints?: InputMaybe<CheckpointUpdateManyWithoutCourseInput>;
  courseReviews?: InputMaybe<CourseReviewUpdateManyWithoutCourseInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deleted?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  duration?: InputMaybe<IntFieldUpdateOperationsInput>;
  enrolledCourses?: InputMaybe<EnrolledCourseUpdateManyWithoutCourseInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  level?: InputMaybe<EnumLevelFieldUpdateOperationsInput>;
  published?: InputMaybe<BoolFieldUpdateOperationsInput>;
  rating?: InputMaybe<DecimalFieldUpdateOperationsInput>;
  state?: InputMaybe<EnumStateFieldUpdateOperationsInput>;
  tags?: InputMaybe<CourseUpdatetagsInput>;
  thumbnail?: InputMaybe<AssetUpdateOneWithoutThumbnailCourseInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type CourseUpdateWithoutThumbnailInput = {
  banners?: InputMaybe<AssetUpdateManyWithoutBannerCourseInput>;
  category?: InputMaybe<CategoryUpdateOneWithoutCoursesInput>;
  checkpoints?: InputMaybe<CheckpointUpdateManyWithoutCourseInput>;
  courseReviews?: InputMaybe<CourseReviewUpdateManyWithoutCourseInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deleted?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  duration?: InputMaybe<IntFieldUpdateOperationsInput>;
  enrolledCourses?: InputMaybe<EnrolledCourseUpdateManyWithoutCourseInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  level?: InputMaybe<EnumLevelFieldUpdateOperationsInput>;
  published?: InputMaybe<BoolFieldUpdateOperationsInput>;
  rating?: InputMaybe<DecimalFieldUpdateOperationsInput>;
  state?: InputMaybe<EnumStateFieldUpdateOperationsInput>;
  tags?: InputMaybe<CourseUpdatetagsInput>;
  teacher?: InputMaybe<TeacherUpdateOneRequiredWithoutCourseInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type CourseUpdatetagsInput = {
  push?: InputMaybe<Array<Scalars['String']>>;
  set?: InputMaybe<Array<Scalars['String']>>;
};

export type CourseUpsertWithWhereUniqueWithoutCategoryInput = {
  create: CourseCreateWithoutCategoryInput;
  update: CourseUpdateWithoutCategoryInput;
  where: CourseWhereUniqueInput;
};

export type CourseUpsertWithWhereUniqueWithoutTeacherInput = {
  create: CourseCreateWithoutTeacherInput;
  update: CourseUpdateWithoutTeacherInput;
  where: CourseWhereUniqueInput;
};

export type CourseUpsertWithoutBannersInput = {
  create: CourseCreateWithoutBannersInput;
  update: CourseUpdateWithoutBannersInput;
};

export type CourseUpsertWithoutCheckpointsInput = {
  create: CourseCreateWithoutCheckpointsInput;
  update: CourseUpdateWithoutCheckpointsInput;
};

export type CourseUpsertWithoutCourseReviewsInput = {
  create: CourseCreateWithoutCourseReviewsInput;
  update: CourseUpdateWithoutCourseReviewsInput;
};

export type CourseUpsertWithoutEnrolledCoursesInput = {
  create: CourseCreateWithoutEnrolledCoursesInput;
  update: CourseUpdateWithoutEnrolledCoursesInput;
};

export type CourseUpsertWithoutThumbnailInput = {
  create: CourseCreateWithoutThumbnailInput;
  update: CourseUpdateWithoutThumbnailInput;
};

export type CourseWhereInput = {
  AND?: InputMaybe<Array<CourseWhereInput>>;
  NOT?: InputMaybe<Array<CourseWhereInput>>;
  OR?: InputMaybe<Array<CourseWhereInput>>;
  banners?: InputMaybe<AssetListRelationFilter>;
  category?: InputMaybe<CategoryRelationFilter>;
  categoryId?: InputMaybe<StringNullableFilter>;
  checkpoints?: InputMaybe<CheckpointListRelationFilter>;
  courseReviews?: InputMaybe<CourseReviewListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  deleted?: InputMaybe<DateTimeNullableFilter>;
  description?: InputMaybe<StringFilter>;
  duration?: InputMaybe<IntFilter>;
  enrolledCourses?: InputMaybe<EnrolledCourseListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  level?: InputMaybe<EnumLevelFilter>;
  published?: InputMaybe<BoolFilter>;
  rating?: InputMaybe<DecimalFilter>;
  state?: InputMaybe<EnumStateFilter>;
  tags?: InputMaybe<StringNullableListFilter>;
  teacher?: InputMaybe<TeacherRelationFilter>;
  teacherId?: InputMaybe<StringFilter>;
  thumbnail?: InputMaybe<AssetRelationFilter>;
  thumbnailId?: InputMaybe<StringNullableFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type CourseWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  thumbnailId?: InputMaybe<Scalars['String']>;
};

export type CreateAcquiredItemInput = {
  id: Scalars['String'];
};

export type CreateAddressInput = {
  address1?: InputMaybe<Scalars['String']>;
  address2?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  postalCode?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
};

export type CreateAvatarItemSessionInput = {
  avatarItemId: Scalars['String'];
};

export type CreateBlockInput = {
  AssessmentBlock?: InputMaybe<AssessmentBlockUncheckedCreateNestedManyWithoutQuestionInput>;
  attachmentBlock?: InputMaybe<AttachmentBlockUncheckedCreateNestedOneWithoutBlockInput>;
  blockType: BlockGeneralType;
  challengeBlock?: InputMaybe<ChallengeBlockUncheckedCreateNestedOneWithoutBlockInput>;
  checkpointId: Scalars['String'];
  deleted?: InputMaybe<Scalars['Date']>;
  mediaBlock?: InputMaybe<MediaBlockUncheckedCreateNestedOneWithoutBlockInput>;
  questionBlock?: InputMaybe<QuestionBlockUncheckedCreateNestedOneWithoutBlockInput>;
  textBlock?: InputMaybe<TextBlockUncheckedCreateNestedOneWithoutBlockInput>;
};

export type CreateCategoryInput = {
  activeImgUrl?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  inactiveImgUrl?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type CreateChallengeComment = {
  challengeId: Scalars['String'];
  text: Scalars['String'];
};

export type CreateChallengeReport = {
  challengeId: Scalars['String'];
  report: Scalars['String'];
};

export type CreateChatDto = {
  name: Scalars['String'];
  userId: Scalars['String'];
};

export type CreateCheckpointBlockInput = {
  assetId?: InputMaybe<Scalars['String']>;
  blockType: BlockGeneralType;
  id?: InputMaybe<Scalars['String']>;
  order: Scalars['Int'];
  text?: InputMaybe<Scalars['String']>;
};

export type CreateCheckpointInput = {
  blocks?: InputMaybe<BlockUncheckedCreateNestedManyWithoutCheckpointInput>;
  courseId?: InputMaybe<Scalars['String']>;
  deleted?: InputMaybe<Scalars['Date']>;
  description?: InputMaybe<Scalars['String']>;
  duration?: InputMaybe<Scalars['Int']>;
  enabled?: InputMaybe<Scalars['Boolean']>;
  enrolledCheckpoints?: InputMaybe<EnrolledCheckpointUncheckedCreateNestedManyWithoutCheckpointInput>;
  imageId?: InputMaybe<Scalars['String']>;
  parentCheckpointId?: InputMaybe<Scalars['String']>;
  subCheckpoints?: InputMaybe<CheckpointUncheckedCreateNestedManyWithoutParentCheckPointInput>;
  title: Scalars['String'];
  type?: InputMaybe<TopicType>;
};

export type CreateChildInput = {
  bio?: InputMaybe<Scalars['String']>;
  birthDate?: InputMaybe<Scalars['Date']>;
  email?: InputMaybe<Scalars['String']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  loginPattern: Scalars['String'];
  username: Scalars['String'];
};

export type CreateCourseInput = {
  banners?: InputMaybe<Array<Scalars['String']>>;
  category?: InputMaybe<CategoryCreateNestedOneWithoutCoursesInput>;
  courseReviews?: InputMaybe<CourseReviewCreateNestedManyWithoutCourseInput>;
  deleted?: InputMaybe<Scalars['Date']>;
  description: Scalars['String'];
  duration?: InputMaybe<Scalars['Int']>;
  enrolledCourses?: InputMaybe<EnrolledCourseCreateNestedManyWithoutCourseInput>;
  level: Level;
  published?: InputMaybe<Scalars['Boolean']>;
  rating?: InputMaybe<Scalars['Decimal']>;
  state?: InputMaybe<State>;
  tags?: InputMaybe<CourseCreatetagsInput>;
  thumbnail?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type CreateCourseReviewInput = {
  comment: Scalars['String'];
  courseId: Scalars['String'];
  createdAt?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  score: Scalars['Int'];
};

export type CreateEnrolledCourseInput = {
  AssessmentUser?: InputMaybe<AssessmentUserUncheckedCreateNestedManyWithoutEnrollCourseInput>;
  id: Scalars['String'];
  lastTimeChecked?: InputMaybe<Scalars['Date']>;
  progress?: InputMaybe<Scalars['Int']>;
};

export type CreateNotificationInput = {
  input: CreateOneNotificationInput;
  targetUser?: InputMaybe<FindManyUserInput>;
};

export type CreateOneNotificationInput = {
  createdAt?: InputMaybe<Scalars['Date']>;
  href?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  message: Scalars['String'];
  thumbnail?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  type?: InputMaybe<NotificationType>;
  userNotifications?: InputMaybe<UserNotificationCreateNestedManyWithoutNotificationInput>;
};

export type CreatePostInput = {
  categoryId: Scalars['String'];
  parentPostId?: InputMaybe<Scalars['String']>;
  text: Scalars['String'];
};

export type CreateQuestionBlockInput = {
  AssessmentBlock?: InputMaybe<AssessmentBlockUncheckedCreateNestedManyWithoutQuestionInput>;
  attachmentBlock?: InputMaybe<AttachmentBlockUncheckedCreateNestedOneWithoutBlockInput>;
  challengeBlock?: InputMaybe<ChallengeBlockUncheckedCreateNestedOneWithoutBlockInput>;
  checkpointId: Scalars['String'];
  deleted?: InputMaybe<Scalars['Date']>;
  mediaBlock?: InputMaybe<MediaBlockUncheckedCreateNestedOneWithoutBlockInput>;
  questionBlock?: InputMaybe<QuestionBlockUncheckedCreateNestedOneWithoutBlockInput>;
  quizType: QuizType;
  textBlock?: InputMaybe<TextBlockUncheckedCreateNestedOneWithoutBlockInput>;
};

export type CreateSessionInput = {
  priceId: Scalars['String'];
  quantity: Scalars['Int'];
};

export type CreateSubscriptionSessionInput = {
  priceId: Scalars['String'];
};

export type DateTimeFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['Date']>;
};

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['Date']>;
  gt?: InputMaybe<Scalars['Date']>;
  gte?: InputMaybe<Scalars['Date']>;
  in?: InputMaybe<Array<Scalars['Date']>>;
  lt?: InputMaybe<Scalars['Date']>;
  lte?: InputMaybe<Scalars['Date']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['Date']>>;
};

export type DateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['Date']>;
  gt?: InputMaybe<Scalars['Date']>;
  gte?: InputMaybe<Scalars['Date']>;
  in?: InputMaybe<Array<Scalars['Date']>>;
  lt?: InputMaybe<Scalars['Date']>;
  lte?: InputMaybe<Scalars['Date']>;
  not?: InputMaybe<NestedDateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Date']>>;
};

export type DecimalFieldUpdateOperationsInput = {
  decrement?: InputMaybe<Scalars['Decimal']>;
  divide?: InputMaybe<Scalars['Decimal']>;
  increment?: InputMaybe<Scalars['Decimal']>;
  multiply?: InputMaybe<Scalars['Decimal']>;
  set?: InputMaybe<Scalars['Decimal']>;
};

export type DecimalFilter = {
  equals?: InputMaybe<Scalars['Decimal']>;
  gt?: InputMaybe<Scalars['Decimal']>;
  gte?: InputMaybe<Scalars['Decimal']>;
  in?: InputMaybe<Array<Scalars['Decimal']>>;
  lt?: InputMaybe<Scalars['Decimal']>;
  lte?: InputMaybe<Scalars['Decimal']>;
  not?: InputMaybe<NestedDecimalFilter>;
  notIn?: InputMaybe<Array<Scalars['Decimal']>>;
};

export type EnrolledCheckpoint = {
  __typename?: 'EnrolledCheckpoint';
  AssessmentUser?: Maybe<Array<AssessmentUser>>;
  _count: EnrolledCheckpointCount;
  checkpoint?: Maybe<Checkpoint>;
  checkpointId?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  enrolledCourse?: Maybe<EnrolledCourse>;
  enrolledCourseId?: Maybe<Scalars['String']>;
  enrolledStudentId?: Maybe<Scalars['String']>;
  expLogs?: Maybe<Array<ExpLog>>;
  id: Scalars['ID'];
  lastTimeChecked?: Maybe<Scalars['Date']>;
  state: EnrolledState;
  updatedAt: Scalars['Date'];
};

export type EnrolledCheckpointCount = {
  __typename?: 'EnrolledCheckpointCount';
  AssessmentUser: Scalars['Int'];
  expLogs: Scalars['Int'];
};

export type EnrolledCheckpointCreateManyCheckpointInput = {
  createdAt?: InputMaybe<Scalars['Date']>;
  enrolledCourseId?: InputMaybe<Scalars['String']>;
  enrolledStudentId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  lastTimeChecked?: InputMaybe<Scalars['Date']>;
  state?: InputMaybe<EnrolledState>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type EnrolledCheckpointCreateManyCheckpointInputEnvelope = {
  data: Array<EnrolledCheckpointCreateManyCheckpointInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type EnrolledCheckpointCreateManyEnrolledCourseInput = {
  checkpointId?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  lastTimeChecked?: InputMaybe<Scalars['Date']>;
  state?: InputMaybe<EnrolledState>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type EnrolledCheckpointCreateManyEnrolledCourseInputEnvelope = {
  data: Array<EnrolledCheckpointCreateManyEnrolledCourseInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type EnrolledCheckpointCreateNestedManyWithoutCheckpointInput = {
  connect?: InputMaybe<Array<EnrolledCheckpointWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<EnrolledCheckpointCreateOrConnectWithoutCheckpointInput>>;
  create?: InputMaybe<Array<EnrolledCheckpointCreateWithoutCheckpointInput>>;
  createMany?: InputMaybe<EnrolledCheckpointCreateManyCheckpointInputEnvelope>;
};

export type EnrolledCheckpointCreateNestedManyWithoutEnrolledCourseInput = {
  connect?: InputMaybe<Array<EnrolledCheckpointWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<EnrolledCheckpointCreateOrConnectWithoutEnrolledCourseInput>>;
  create?: InputMaybe<Array<EnrolledCheckpointCreateWithoutEnrolledCourseInput>>;
  createMany?: InputMaybe<EnrolledCheckpointCreateManyEnrolledCourseInputEnvelope>;
};

export type EnrolledCheckpointCreateNestedOneWithoutAssessmentUserInput = {
  connect?: InputMaybe<EnrolledCheckpointWhereUniqueInput>;
  connectOrCreate?: InputMaybe<EnrolledCheckpointCreateOrConnectWithoutAssessmentUserInput>;
  create?: InputMaybe<EnrolledCheckpointCreateWithoutAssessmentUserInput>;
};

export type EnrolledCheckpointCreateNestedOneWithoutExpLogsInput = {
  connect?: InputMaybe<EnrolledCheckpointWhereUniqueInput>;
  connectOrCreate?: InputMaybe<EnrolledCheckpointCreateOrConnectWithoutExpLogsInput>;
  create?: InputMaybe<EnrolledCheckpointCreateWithoutExpLogsInput>;
};

export type EnrolledCheckpointCreateOrConnectWithoutAssessmentUserInput = {
  create: EnrolledCheckpointCreateWithoutAssessmentUserInput;
  where: EnrolledCheckpointWhereUniqueInput;
};

export type EnrolledCheckpointCreateOrConnectWithoutCheckpointInput = {
  create: EnrolledCheckpointCreateWithoutCheckpointInput;
  where: EnrolledCheckpointWhereUniqueInput;
};

export type EnrolledCheckpointCreateOrConnectWithoutEnrolledCourseInput = {
  create: EnrolledCheckpointCreateWithoutEnrolledCourseInput;
  where: EnrolledCheckpointWhereUniqueInput;
};

export type EnrolledCheckpointCreateOrConnectWithoutExpLogsInput = {
  create: EnrolledCheckpointCreateWithoutExpLogsInput;
  where: EnrolledCheckpointWhereUniqueInput;
};

export type EnrolledCheckpointCreateWithoutAssessmentUserInput = {
  checkpoint?: InputMaybe<CheckpointCreateNestedOneWithoutEnrolledCheckpointsInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  enrolledCourse?: InputMaybe<EnrolledCourseCreateNestedOneWithoutCheckpointsInput>;
  expLogs?: InputMaybe<ExpLogCreateNestedManyWithoutCheckpointInput>;
  id?: InputMaybe<Scalars['String']>;
  lastTimeChecked?: InputMaybe<Scalars['Date']>;
  state?: InputMaybe<EnrolledState>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type EnrolledCheckpointCreateWithoutCheckpointInput = {
  AssessmentUser?: InputMaybe<AssessmentUserCreateNestedManyWithoutEnrolledCheckpointInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  enrolledCourse?: InputMaybe<EnrolledCourseCreateNestedOneWithoutCheckpointsInput>;
  expLogs?: InputMaybe<ExpLogCreateNestedManyWithoutCheckpointInput>;
  id?: InputMaybe<Scalars['String']>;
  lastTimeChecked?: InputMaybe<Scalars['Date']>;
  state?: InputMaybe<EnrolledState>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type EnrolledCheckpointCreateWithoutEnrolledCourseInput = {
  AssessmentUser?: InputMaybe<AssessmentUserCreateNestedManyWithoutEnrolledCheckpointInput>;
  checkpoint?: InputMaybe<CheckpointCreateNestedOneWithoutEnrolledCheckpointsInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  expLogs?: InputMaybe<ExpLogCreateNestedManyWithoutCheckpointInput>;
  id?: InputMaybe<Scalars['String']>;
  lastTimeChecked?: InputMaybe<Scalars['Date']>;
  state?: InputMaybe<EnrolledState>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type EnrolledCheckpointCreateWithoutExpLogsInput = {
  AssessmentUser?: InputMaybe<AssessmentUserCreateNestedManyWithoutEnrolledCheckpointInput>;
  checkpoint?: InputMaybe<CheckpointCreateNestedOneWithoutEnrolledCheckpointsInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  enrolledCourse?: InputMaybe<EnrolledCourseCreateNestedOneWithoutCheckpointsInput>;
  id?: InputMaybe<Scalars['String']>;
  lastTimeChecked?: InputMaybe<Scalars['Date']>;
  state?: InputMaybe<EnrolledState>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type EnrolledCheckpointEnrolledCourseIdEnrolledStudentIdCheckpointIdCompoundUniqueInput = {
  checkpointId: Scalars['String'];
  enrolledCourseId: Scalars['String'];
  enrolledStudentId: Scalars['String'];
};

export type EnrolledCheckpointListRelationFilter = {
  every?: InputMaybe<EnrolledCheckpointWhereInput>;
  none?: InputMaybe<EnrolledCheckpointWhereInput>;
  some?: InputMaybe<EnrolledCheckpointWhereInput>;
};

export type EnrolledCheckpointOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export enum EnrolledCheckpointOrderByRelevanceFieldEnum {
  CheckpointId = 'checkpointId',
  EnrolledCourseId = 'enrolledCourseId',
  EnrolledStudentId = 'enrolledStudentId',
  Id = 'id'
}

export type EnrolledCheckpointOrderByRelevanceInput = {
  fields: Array<EnrolledCheckpointOrderByRelevanceFieldEnum>;
  search: Scalars['String'];
  sort: SortOrder;
};

export type EnrolledCheckpointOrderByWithRelationAndSearchRelevanceInput = {
  AssessmentUser?: InputMaybe<AssessmentUserOrderByRelationAggregateInput>;
  _relevance?: InputMaybe<EnrolledCheckpointOrderByRelevanceInput>;
  checkpoint?: InputMaybe<CheckpointOrderByWithRelationAndSearchRelevanceInput>;
  checkpointId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  enrolledCourse?: InputMaybe<EnrolledCourseOrderByWithRelationAndSearchRelevanceInput>;
  enrolledCourseId?: InputMaybe<SortOrder>;
  enrolledStudentId?: InputMaybe<SortOrder>;
  expLogs?: InputMaybe<ExpLogOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  lastTimeChecked?: InputMaybe<SortOrder>;
  state?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type EnrolledCheckpointRelationFilter = {
  is?: InputMaybe<EnrolledCheckpointWhereInput>;
  isNot?: InputMaybe<EnrolledCheckpointWhereInput>;
};

export enum EnrolledCheckpointScalarFieldEnum {
  CheckpointId = 'checkpointId',
  CreatedAt = 'createdAt',
  EnrolledCourseId = 'enrolledCourseId',
  EnrolledStudentId = 'enrolledStudentId',
  Id = 'id',
  LastTimeChecked = 'lastTimeChecked',
  State = 'state',
  UpdatedAt = 'updatedAt'
}

export type EnrolledCheckpointScalarWhereInput = {
  AND?: InputMaybe<Array<EnrolledCheckpointScalarWhereInput>>;
  NOT?: InputMaybe<Array<EnrolledCheckpointScalarWhereInput>>;
  OR?: InputMaybe<Array<EnrolledCheckpointScalarWhereInput>>;
  checkpointId?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  enrolledCourseId?: InputMaybe<StringNullableFilter>;
  enrolledStudentId?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  lastTimeChecked?: InputMaybe<DateTimeNullableFilter>;
  state?: InputMaybe<EnumEnrolledStateFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type EnrolledCheckpointUncheckedCreateNestedManyWithoutCheckpointInput = {
  connect?: InputMaybe<Array<EnrolledCheckpointWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<EnrolledCheckpointCreateOrConnectWithoutCheckpointInput>>;
  create?: InputMaybe<Array<EnrolledCheckpointCreateWithoutCheckpointInput>>;
  createMany?: InputMaybe<EnrolledCheckpointCreateManyCheckpointInputEnvelope>;
};

export type EnrolledCheckpointUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  lastTimeChecked?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  state?: InputMaybe<EnumEnrolledStateFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type EnrolledCheckpointUpdateManyWithWhereWithoutCheckpointInput = {
  data: EnrolledCheckpointUpdateManyMutationInput;
  where: EnrolledCheckpointScalarWhereInput;
};

export type EnrolledCheckpointUpdateManyWithWhereWithoutEnrolledCourseInput = {
  data: EnrolledCheckpointUpdateManyMutationInput;
  where: EnrolledCheckpointScalarWhereInput;
};

export type EnrolledCheckpointUpdateManyWithoutCheckpointInput = {
  connect?: InputMaybe<Array<EnrolledCheckpointWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<EnrolledCheckpointCreateOrConnectWithoutCheckpointInput>>;
  create?: InputMaybe<Array<EnrolledCheckpointCreateWithoutCheckpointInput>>;
  createMany?: InputMaybe<EnrolledCheckpointCreateManyCheckpointInputEnvelope>;
  delete?: InputMaybe<Array<EnrolledCheckpointWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<EnrolledCheckpointScalarWhereInput>>;
  disconnect?: InputMaybe<Array<EnrolledCheckpointWhereUniqueInput>>;
  set?: InputMaybe<Array<EnrolledCheckpointWhereUniqueInput>>;
  update?: InputMaybe<Array<EnrolledCheckpointUpdateWithWhereUniqueWithoutCheckpointInput>>;
  updateMany?: InputMaybe<Array<EnrolledCheckpointUpdateManyWithWhereWithoutCheckpointInput>>;
  upsert?: InputMaybe<Array<EnrolledCheckpointUpsertWithWhereUniqueWithoutCheckpointInput>>;
};

export type EnrolledCheckpointUpdateManyWithoutEnrolledCourseInput = {
  connect?: InputMaybe<Array<EnrolledCheckpointWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<EnrolledCheckpointCreateOrConnectWithoutEnrolledCourseInput>>;
  create?: InputMaybe<Array<EnrolledCheckpointCreateWithoutEnrolledCourseInput>>;
  createMany?: InputMaybe<EnrolledCheckpointCreateManyEnrolledCourseInputEnvelope>;
  delete?: InputMaybe<Array<EnrolledCheckpointWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<EnrolledCheckpointScalarWhereInput>>;
  disconnect?: InputMaybe<Array<EnrolledCheckpointWhereUniqueInput>>;
  set?: InputMaybe<Array<EnrolledCheckpointWhereUniqueInput>>;
  update?: InputMaybe<Array<EnrolledCheckpointUpdateWithWhereUniqueWithoutEnrolledCourseInput>>;
  updateMany?: InputMaybe<Array<EnrolledCheckpointUpdateManyWithWhereWithoutEnrolledCourseInput>>;
  upsert?: InputMaybe<Array<EnrolledCheckpointUpsertWithWhereUniqueWithoutEnrolledCourseInput>>;
};

export type EnrolledCheckpointUpdateOneRequiredWithoutAssessmentUserInput = {
  connect?: InputMaybe<EnrolledCheckpointWhereUniqueInput>;
  connectOrCreate?: InputMaybe<EnrolledCheckpointCreateOrConnectWithoutAssessmentUserInput>;
  create?: InputMaybe<EnrolledCheckpointCreateWithoutAssessmentUserInput>;
  update?: InputMaybe<EnrolledCheckpointUpdateWithoutAssessmentUserInput>;
  upsert?: InputMaybe<EnrolledCheckpointUpsertWithoutAssessmentUserInput>;
};

export type EnrolledCheckpointUpdateOneWithoutExpLogsInput = {
  connect?: InputMaybe<EnrolledCheckpointWhereUniqueInput>;
  connectOrCreate?: InputMaybe<EnrolledCheckpointCreateOrConnectWithoutExpLogsInput>;
  create?: InputMaybe<EnrolledCheckpointCreateWithoutExpLogsInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<EnrolledCheckpointUpdateWithoutExpLogsInput>;
  upsert?: InputMaybe<EnrolledCheckpointUpsertWithoutExpLogsInput>;
};

export type EnrolledCheckpointUpdateWithWhereUniqueWithoutCheckpointInput = {
  data: EnrolledCheckpointUpdateWithoutCheckpointInput;
  where: EnrolledCheckpointWhereUniqueInput;
};

export type EnrolledCheckpointUpdateWithWhereUniqueWithoutEnrolledCourseInput = {
  data: EnrolledCheckpointUpdateWithoutEnrolledCourseInput;
  where: EnrolledCheckpointWhereUniqueInput;
};

export type EnrolledCheckpointUpdateWithoutAssessmentUserInput = {
  checkpoint?: InputMaybe<CheckpointUpdateOneWithoutEnrolledCheckpointsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  enrolledCourse?: InputMaybe<EnrolledCourseUpdateOneWithoutCheckpointsInput>;
  expLogs?: InputMaybe<ExpLogUpdateManyWithoutCheckpointInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  lastTimeChecked?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  state?: InputMaybe<EnumEnrolledStateFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type EnrolledCheckpointUpdateWithoutCheckpointInput = {
  AssessmentUser?: InputMaybe<AssessmentUserUpdateManyWithoutEnrolledCheckpointInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  enrolledCourse?: InputMaybe<EnrolledCourseUpdateOneWithoutCheckpointsInput>;
  expLogs?: InputMaybe<ExpLogUpdateManyWithoutCheckpointInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  lastTimeChecked?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  state?: InputMaybe<EnumEnrolledStateFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type EnrolledCheckpointUpdateWithoutEnrolledCourseInput = {
  AssessmentUser?: InputMaybe<AssessmentUserUpdateManyWithoutEnrolledCheckpointInput>;
  checkpoint?: InputMaybe<CheckpointUpdateOneWithoutEnrolledCheckpointsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  expLogs?: InputMaybe<ExpLogUpdateManyWithoutCheckpointInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  lastTimeChecked?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  state?: InputMaybe<EnumEnrolledStateFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type EnrolledCheckpointUpdateWithoutExpLogsInput = {
  AssessmentUser?: InputMaybe<AssessmentUserUpdateManyWithoutEnrolledCheckpointInput>;
  checkpoint?: InputMaybe<CheckpointUpdateOneWithoutEnrolledCheckpointsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  enrolledCourse?: InputMaybe<EnrolledCourseUpdateOneWithoutCheckpointsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  lastTimeChecked?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  state?: InputMaybe<EnumEnrolledStateFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type EnrolledCheckpointUpsertWithWhereUniqueWithoutCheckpointInput = {
  create: EnrolledCheckpointCreateWithoutCheckpointInput;
  update: EnrolledCheckpointUpdateWithoutCheckpointInput;
  where: EnrolledCheckpointWhereUniqueInput;
};

export type EnrolledCheckpointUpsertWithWhereUniqueWithoutEnrolledCourseInput = {
  create: EnrolledCheckpointCreateWithoutEnrolledCourseInput;
  update: EnrolledCheckpointUpdateWithoutEnrolledCourseInput;
  where: EnrolledCheckpointWhereUniqueInput;
};

export type EnrolledCheckpointUpsertWithoutAssessmentUserInput = {
  create: EnrolledCheckpointCreateWithoutAssessmentUserInput;
  update: EnrolledCheckpointUpdateWithoutAssessmentUserInput;
};

export type EnrolledCheckpointUpsertWithoutExpLogsInput = {
  create: EnrolledCheckpointCreateWithoutExpLogsInput;
  update: EnrolledCheckpointUpdateWithoutExpLogsInput;
};

export type EnrolledCheckpointWhereInput = {
  AND?: InputMaybe<Array<EnrolledCheckpointWhereInput>>;
  AssessmentUser?: InputMaybe<AssessmentUserListRelationFilter>;
  NOT?: InputMaybe<Array<EnrolledCheckpointWhereInput>>;
  OR?: InputMaybe<Array<EnrolledCheckpointWhereInput>>;
  checkpoint?: InputMaybe<CheckpointRelationFilter>;
  checkpointId?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  enrolledCourse?: InputMaybe<EnrolledCourseRelationFilter>;
  enrolledCourseId?: InputMaybe<StringNullableFilter>;
  enrolledStudentId?: InputMaybe<StringNullableFilter>;
  expLogs?: InputMaybe<ExpLogListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  lastTimeChecked?: InputMaybe<DateTimeNullableFilter>;
  state?: InputMaybe<EnumEnrolledStateFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type EnrolledCheckpointWhereUniqueInput = {
  enrolledCourseId_enrolledStudentId_checkpointId?: InputMaybe<EnrolledCheckpointEnrolledCourseIdEnrolledStudentIdCheckpointIdCompoundUniqueInput>;
  id?: InputMaybe<Scalars['String']>;
};

export type EnrolledCourse = {
  __typename?: 'EnrolledCourse';
  AssessmentUser?: Maybe<Array<AssessmentUser>>;
  _count: EnrolledCourseCount;
  checkpoints?: Maybe<Array<EnrolledCheckpoint>>;
  course: Course;
  createdAt: Scalars['Date'];
  id: Scalars['String'];
  lastTimeChecked?: Maybe<Scalars['Date']>;
  progress: Scalars['Int'];
  state: EnrolledState;
  student: Student;
  studentId: Scalars['String'];
  updatedAt: Scalars['Date'];
};


export type EnrolledCourseCheckpointsArgs = {
  cursor?: InputMaybe<EnrolledCheckpointWhereUniqueInput>;
  distinct?: InputMaybe<Array<EnrolledCheckpointScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<EnrolledCheckpointOrderByWithRelationAndSearchRelevanceInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<EnrolledCheckpointWhereInput>;
};

export type EnrolledCourseCount = {
  __typename?: 'EnrolledCourseCount';
  AssessmentUser: Scalars['Int'];
  checkpoints: Scalars['Int'];
};

export type EnrolledCourseCreateManyCourseInput = {
  createdAt?: InputMaybe<Scalars['Date']>;
  lastTimeChecked?: InputMaybe<Scalars['Date']>;
  progress?: InputMaybe<Scalars['Int']>;
  state?: InputMaybe<EnrolledState>;
  studentId: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type EnrolledCourseCreateManyCourseInputEnvelope = {
  data: Array<EnrolledCourseCreateManyCourseInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type EnrolledCourseCreateManyStudentInput = {
  createdAt?: InputMaybe<Scalars['Date']>;
  id: Scalars['String'];
  lastTimeChecked?: InputMaybe<Scalars['Date']>;
  progress?: InputMaybe<Scalars['Int']>;
  state?: InputMaybe<EnrolledState>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type EnrolledCourseCreateManyStudentInputEnvelope = {
  data: Array<EnrolledCourseCreateManyStudentInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type EnrolledCourseCreateNestedManyWithoutCourseInput = {
  connect?: InputMaybe<Array<EnrolledCourseWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<EnrolledCourseCreateOrConnectWithoutCourseInput>>;
  create?: InputMaybe<Array<EnrolledCourseCreateWithoutCourseInput>>;
  createMany?: InputMaybe<EnrolledCourseCreateManyCourseInputEnvelope>;
};

export type EnrolledCourseCreateNestedManyWithoutStudentInput = {
  connect?: InputMaybe<Array<EnrolledCourseWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<EnrolledCourseCreateOrConnectWithoutStudentInput>>;
  create?: InputMaybe<Array<EnrolledCourseCreateWithoutStudentInput>>;
  createMany?: InputMaybe<EnrolledCourseCreateManyStudentInputEnvelope>;
};

export type EnrolledCourseCreateNestedOneWithoutAssessmentUserInput = {
  connect?: InputMaybe<EnrolledCourseWhereUniqueInput>;
  connectOrCreate?: InputMaybe<EnrolledCourseCreateOrConnectWithoutAssessmentUserInput>;
  create?: InputMaybe<EnrolledCourseCreateWithoutAssessmentUserInput>;
};

export type EnrolledCourseCreateNestedOneWithoutCheckpointsInput = {
  connect?: InputMaybe<EnrolledCourseWhereUniqueInput>;
  connectOrCreate?: InputMaybe<EnrolledCourseCreateOrConnectWithoutCheckpointsInput>;
  create?: InputMaybe<EnrolledCourseCreateWithoutCheckpointsInput>;
};

export type EnrolledCourseCreateOrConnectWithoutAssessmentUserInput = {
  create: EnrolledCourseCreateWithoutAssessmentUserInput;
  where: EnrolledCourseWhereUniqueInput;
};

export type EnrolledCourseCreateOrConnectWithoutCheckpointsInput = {
  create: EnrolledCourseCreateWithoutCheckpointsInput;
  where: EnrolledCourseWhereUniqueInput;
};

export type EnrolledCourseCreateOrConnectWithoutCourseInput = {
  create: EnrolledCourseCreateWithoutCourseInput;
  where: EnrolledCourseWhereUniqueInput;
};

export type EnrolledCourseCreateOrConnectWithoutStudentInput = {
  create: EnrolledCourseCreateWithoutStudentInput;
  where: EnrolledCourseWhereUniqueInput;
};

export type EnrolledCourseCreateWithoutAssessmentUserInput = {
  checkpoints?: InputMaybe<EnrolledCheckpointCreateNestedManyWithoutEnrolledCourseInput>;
  course: CourseCreateNestedOneWithoutEnrolledCoursesInput;
  createdAt?: InputMaybe<Scalars['Date']>;
  lastTimeChecked?: InputMaybe<Scalars['Date']>;
  progress?: InputMaybe<Scalars['Int']>;
  state?: InputMaybe<EnrolledState>;
  student: StudentCreateNestedOneWithoutEnrolledCoursesInput;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type EnrolledCourseCreateWithoutCheckpointsInput = {
  AssessmentUser?: InputMaybe<AssessmentUserCreateNestedManyWithoutEnrollCourseInput>;
  course: CourseCreateNestedOneWithoutEnrolledCoursesInput;
  createdAt?: InputMaybe<Scalars['Date']>;
  lastTimeChecked?: InputMaybe<Scalars['Date']>;
  progress?: InputMaybe<Scalars['Int']>;
  state?: InputMaybe<EnrolledState>;
  student: StudentCreateNestedOneWithoutEnrolledCoursesInput;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type EnrolledCourseCreateWithoutCourseInput = {
  AssessmentUser?: InputMaybe<AssessmentUserCreateNestedManyWithoutEnrollCourseInput>;
  checkpoints?: InputMaybe<EnrolledCheckpointCreateNestedManyWithoutEnrolledCourseInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  lastTimeChecked?: InputMaybe<Scalars['Date']>;
  progress?: InputMaybe<Scalars['Int']>;
  state?: InputMaybe<EnrolledState>;
  student: StudentCreateNestedOneWithoutEnrolledCoursesInput;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type EnrolledCourseCreateWithoutStudentInput = {
  AssessmentUser?: InputMaybe<AssessmentUserCreateNestedManyWithoutEnrollCourseInput>;
  checkpoints?: InputMaybe<EnrolledCheckpointCreateNestedManyWithoutEnrolledCourseInput>;
  course: CourseCreateNestedOneWithoutEnrolledCoursesInput;
  createdAt?: InputMaybe<Scalars['Date']>;
  lastTimeChecked?: InputMaybe<Scalars['Date']>;
  progress?: InputMaybe<Scalars['Int']>;
  state?: InputMaybe<EnrolledState>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type EnrolledCourseListRelationFilter = {
  every?: InputMaybe<EnrolledCourseWhereInput>;
  none?: InputMaybe<EnrolledCourseWhereInput>;
  some?: InputMaybe<EnrolledCourseWhereInput>;
};

export type EnrolledCourseOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export enum EnrolledCourseOrderByRelevanceFieldEnum {
  Id = 'id',
  StudentId = 'studentId'
}

export type EnrolledCourseOrderByRelevanceInput = {
  fields: Array<EnrolledCourseOrderByRelevanceFieldEnum>;
  search: Scalars['String'];
  sort: SortOrder;
};

export type EnrolledCourseOrderByWithRelationAndSearchRelevanceInput = {
  AssessmentUser?: InputMaybe<AssessmentUserOrderByRelationAggregateInput>;
  _relevance?: InputMaybe<EnrolledCourseOrderByRelevanceInput>;
  checkpoints?: InputMaybe<EnrolledCheckpointOrderByRelationAggregateInput>;
  course?: InputMaybe<CourseOrderByWithRelationAndSearchRelevanceInput>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  lastTimeChecked?: InputMaybe<SortOrder>;
  progress?: InputMaybe<SortOrder>;
  state?: InputMaybe<SortOrder>;
  student?: InputMaybe<StudentOrderByWithRelationAndSearchRelevanceInput>;
  studentId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type EnrolledCourseRelationFilter = {
  is?: InputMaybe<EnrolledCourseWhereInput>;
  isNot?: InputMaybe<EnrolledCourseWhereInput>;
};

export enum EnrolledCourseScalarFieldEnum {
  CreatedAt = 'createdAt',
  Id = 'id',
  LastTimeChecked = 'lastTimeChecked',
  Progress = 'progress',
  State = 'state',
  StudentId = 'studentId',
  UpdatedAt = 'updatedAt'
}

export type EnrolledCourseScalarWhereInput = {
  AND?: InputMaybe<Array<EnrolledCourseScalarWhereInput>>;
  NOT?: InputMaybe<Array<EnrolledCourseScalarWhereInput>>;
  OR?: InputMaybe<Array<EnrolledCourseScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  lastTimeChecked?: InputMaybe<DateTimeNullableFilter>;
  progress?: InputMaybe<IntFilter>;
  state?: InputMaybe<EnumEnrolledStateFilter>;
  studentId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type EnrolledCourseStudentIdIdCompoundUniqueInput = {
  id: Scalars['String'];
  studentId: Scalars['String'];
};

export type EnrolledCourseUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  lastTimeChecked?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  progress?: InputMaybe<IntFieldUpdateOperationsInput>;
  state?: InputMaybe<EnumEnrolledStateFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type EnrolledCourseUpdateManyWithWhereWithoutCourseInput = {
  data: EnrolledCourseUpdateManyMutationInput;
  where: EnrolledCourseScalarWhereInput;
};

export type EnrolledCourseUpdateManyWithWhereWithoutStudentInput = {
  data: EnrolledCourseUpdateManyMutationInput;
  where: EnrolledCourseScalarWhereInput;
};

export type EnrolledCourseUpdateManyWithoutCourseInput = {
  connect?: InputMaybe<Array<EnrolledCourseWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<EnrolledCourseCreateOrConnectWithoutCourseInput>>;
  create?: InputMaybe<Array<EnrolledCourseCreateWithoutCourseInput>>;
  createMany?: InputMaybe<EnrolledCourseCreateManyCourseInputEnvelope>;
  delete?: InputMaybe<Array<EnrolledCourseWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<EnrolledCourseScalarWhereInput>>;
  disconnect?: InputMaybe<Array<EnrolledCourseWhereUniqueInput>>;
  set?: InputMaybe<Array<EnrolledCourseWhereUniqueInput>>;
  update?: InputMaybe<Array<EnrolledCourseUpdateWithWhereUniqueWithoutCourseInput>>;
  updateMany?: InputMaybe<Array<EnrolledCourseUpdateManyWithWhereWithoutCourseInput>>;
  upsert?: InputMaybe<Array<EnrolledCourseUpsertWithWhereUniqueWithoutCourseInput>>;
};

export type EnrolledCourseUpdateManyWithoutStudentInput = {
  connect?: InputMaybe<Array<EnrolledCourseWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<EnrolledCourseCreateOrConnectWithoutStudentInput>>;
  create?: InputMaybe<Array<EnrolledCourseCreateWithoutStudentInput>>;
  createMany?: InputMaybe<EnrolledCourseCreateManyStudentInputEnvelope>;
  delete?: InputMaybe<Array<EnrolledCourseWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<EnrolledCourseScalarWhereInput>>;
  disconnect?: InputMaybe<Array<EnrolledCourseWhereUniqueInput>>;
  set?: InputMaybe<Array<EnrolledCourseWhereUniqueInput>>;
  update?: InputMaybe<Array<EnrolledCourseUpdateWithWhereUniqueWithoutStudentInput>>;
  updateMany?: InputMaybe<Array<EnrolledCourseUpdateManyWithWhereWithoutStudentInput>>;
  upsert?: InputMaybe<Array<EnrolledCourseUpsertWithWhereUniqueWithoutStudentInput>>;
};

export type EnrolledCourseUpdateOneRequiredWithoutAssessmentUserInput = {
  connect?: InputMaybe<EnrolledCourseWhereUniqueInput>;
  connectOrCreate?: InputMaybe<EnrolledCourseCreateOrConnectWithoutAssessmentUserInput>;
  create?: InputMaybe<EnrolledCourseCreateWithoutAssessmentUserInput>;
  update?: InputMaybe<EnrolledCourseUpdateWithoutAssessmentUserInput>;
  upsert?: InputMaybe<EnrolledCourseUpsertWithoutAssessmentUserInput>;
};

export type EnrolledCourseUpdateOneWithoutCheckpointsInput = {
  connect?: InputMaybe<EnrolledCourseWhereUniqueInput>;
  connectOrCreate?: InputMaybe<EnrolledCourseCreateOrConnectWithoutCheckpointsInput>;
  create?: InputMaybe<EnrolledCourseCreateWithoutCheckpointsInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<EnrolledCourseUpdateWithoutCheckpointsInput>;
  upsert?: InputMaybe<EnrolledCourseUpsertWithoutCheckpointsInput>;
};

export type EnrolledCourseUpdateWithWhereUniqueWithoutCourseInput = {
  data: EnrolledCourseUpdateWithoutCourseInput;
  where: EnrolledCourseWhereUniqueInput;
};

export type EnrolledCourseUpdateWithWhereUniqueWithoutStudentInput = {
  data: EnrolledCourseUpdateWithoutStudentInput;
  where: EnrolledCourseWhereUniqueInput;
};

export type EnrolledCourseUpdateWithoutAssessmentUserInput = {
  checkpoints?: InputMaybe<EnrolledCheckpointUpdateManyWithoutEnrolledCourseInput>;
  course?: InputMaybe<CourseUpdateOneRequiredWithoutEnrolledCoursesInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  lastTimeChecked?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  progress?: InputMaybe<IntFieldUpdateOperationsInput>;
  state?: InputMaybe<EnumEnrolledStateFieldUpdateOperationsInput>;
  student?: InputMaybe<StudentUpdateOneRequiredWithoutEnrolledCoursesInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type EnrolledCourseUpdateWithoutCheckpointsInput = {
  AssessmentUser?: InputMaybe<AssessmentUserUpdateManyWithoutEnrollCourseInput>;
  course?: InputMaybe<CourseUpdateOneRequiredWithoutEnrolledCoursesInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  lastTimeChecked?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  progress?: InputMaybe<IntFieldUpdateOperationsInput>;
  state?: InputMaybe<EnumEnrolledStateFieldUpdateOperationsInput>;
  student?: InputMaybe<StudentUpdateOneRequiredWithoutEnrolledCoursesInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type EnrolledCourseUpdateWithoutCourseInput = {
  AssessmentUser?: InputMaybe<AssessmentUserUpdateManyWithoutEnrollCourseInput>;
  checkpoints?: InputMaybe<EnrolledCheckpointUpdateManyWithoutEnrolledCourseInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  lastTimeChecked?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  progress?: InputMaybe<IntFieldUpdateOperationsInput>;
  state?: InputMaybe<EnumEnrolledStateFieldUpdateOperationsInput>;
  student?: InputMaybe<StudentUpdateOneRequiredWithoutEnrolledCoursesInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type EnrolledCourseUpdateWithoutStudentInput = {
  AssessmentUser?: InputMaybe<AssessmentUserUpdateManyWithoutEnrollCourseInput>;
  checkpoints?: InputMaybe<EnrolledCheckpointUpdateManyWithoutEnrolledCourseInput>;
  course?: InputMaybe<CourseUpdateOneRequiredWithoutEnrolledCoursesInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  lastTimeChecked?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  progress?: InputMaybe<IntFieldUpdateOperationsInput>;
  state?: InputMaybe<EnumEnrolledStateFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type EnrolledCourseUpsertWithWhereUniqueWithoutCourseInput = {
  create: EnrolledCourseCreateWithoutCourseInput;
  update: EnrolledCourseUpdateWithoutCourseInput;
  where: EnrolledCourseWhereUniqueInput;
};

export type EnrolledCourseUpsertWithWhereUniqueWithoutStudentInput = {
  create: EnrolledCourseCreateWithoutStudentInput;
  update: EnrolledCourseUpdateWithoutStudentInput;
  where: EnrolledCourseWhereUniqueInput;
};

export type EnrolledCourseUpsertWithoutAssessmentUserInput = {
  create: EnrolledCourseCreateWithoutAssessmentUserInput;
  update: EnrolledCourseUpdateWithoutAssessmentUserInput;
};

export type EnrolledCourseUpsertWithoutCheckpointsInput = {
  create: EnrolledCourseCreateWithoutCheckpointsInput;
  update: EnrolledCourseUpdateWithoutCheckpointsInput;
};

export type EnrolledCourseWhereInput = {
  AND?: InputMaybe<Array<EnrolledCourseWhereInput>>;
  AssessmentUser?: InputMaybe<AssessmentUserListRelationFilter>;
  NOT?: InputMaybe<Array<EnrolledCourseWhereInput>>;
  OR?: InputMaybe<Array<EnrolledCourseWhereInput>>;
  checkpoints?: InputMaybe<EnrolledCheckpointListRelationFilter>;
  course?: InputMaybe<CourseRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  lastTimeChecked?: InputMaybe<DateTimeNullableFilter>;
  progress?: InputMaybe<IntFilter>;
  state?: InputMaybe<EnumEnrolledStateFilter>;
  student?: InputMaybe<StudentRelationFilter>;
  studentId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type EnrolledCourseWhereUniqueInput = {
  studentId_id?: InputMaybe<EnrolledCourseStudentIdIdCompoundUniqueInput>;
};

export enum EnrolledState {
  Complete = 'COMPLETE',
  Incomplete = 'INCOMPLETE',
  NotStarted = 'NOT_STARTED'
}

export type EnumAccessoryCatalogTypeFilter = {
  equals?: InputMaybe<AccessoryCatalogType>;
  in?: InputMaybe<Array<AccessoryCatalogType>>;
  not?: InputMaybe<NestedEnumAccessoryCatalogTypeFilter>;
  notIn?: InputMaybe<Array<AccessoryCatalogType>>;
};

export type EnumAccessoryTypeFieldUpdateOperationsInput = {
  set?: InputMaybe<AccessoryType>;
};

export type EnumAccessoryTypeFilter = {
  equals?: InputMaybe<AccessoryType>;
  in?: InputMaybe<Array<AccessoryType>>;
  not?: InputMaybe<NestedEnumAccessoryTypeFilter>;
  notIn?: InputMaybe<Array<AccessoryType>>;
};

export type EnumAnswerQuantityTypeFieldUpdateOperationsInput = {
  set?: InputMaybe<AnswerQuantityType>;
};

export type EnumAnswerQuantityTypeFilter = {
  equals?: InputMaybe<AnswerQuantityType>;
  in?: InputMaybe<Array<AnswerQuantityType>>;
  not?: InputMaybe<NestedEnumAnswerQuantityTypeFilter>;
  notIn?: InputMaybe<Array<AnswerQuantityType>>;
};

export type EnumAnswerTypeFieldUpdateOperationsInput = {
  set?: InputMaybe<AnswerType>;
};

export type EnumAnswerTypeFilter = {
  equals?: InputMaybe<AnswerType>;
  in?: InputMaybe<Array<AnswerType>>;
  not?: InputMaybe<NestedEnumAnswerTypeFilter>;
  notIn?: InputMaybe<Array<AnswerType>>;
};

export type EnumAssessmentQuestionResultFieldUpdateOperationsInput = {
  set?: InputMaybe<AssessmentQuestionResult>;
};

export type EnumAssessmentQuestionResultFilter = {
  equals?: InputMaybe<AssessmentQuestionResult>;
  in?: InputMaybe<Array<AssessmentQuestionResult>>;
  not?: InputMaybe<NestedEnumAssessmentQuestionResultFilter>;
  notIn?: InputMaybe<Array<AssessmentQuestionResult>>;
};

export type EnumAssessmentQuestionStatusFieldUpdateOperationsInput = {
  set?: InputMaybe<AssessmentQuestionStatus>;
};

export type EnumAssessmentQuestionStatusFilter = {
  equals?: InputMaybe<AssessmentQuestionStatus>;
  in?: InputMaybe<Array<AssessmentQuestionStatus>>;
  not?: InputMaybe<NestedEnumAssessmentQuestionStatusFilter>;
  notIn?: InputMaybe<Array<AssessmentQuestionStatus>>;
};

export type EnumAvatarAssetCatelogTypeFieldUpdateOperationsInput = {
  set?: InputMaybe<AvatarAssetCatelogType>;
};

export type EnumAvatarAssetCatelogTypeFilter = {
  equals?: InputMaybe<AvatarAssetCatelogType>;
  in?: InputMaybe<Array<AvatarAssetCatelogType>>;
  not?: InputMaybe<NestedEnumAvatarAssetCatelogTypeFilter>;
  notIn?: InputMaybe<Array<AvatarAssetCatelogType>>;
};

export type EnumAvatarAssetColourTypeFieldUpdateOperationsInput = {
  set?: InputMaybe<AvatarAssetColourType>;
};

export type EnumAvatarAssetColourTypeFilter = {
  equals?: InputMaybe<AvatarAssetColourType>;
  in?: InputMaybe<Array<AvatarAssetColourType>>;
  not?: InputMaybe<NestedEnumAvatarAssetColourTypeFilter>;
  notIn?: InputMaybe<Array<AvatarAssetColourType>>;
};

export type EnumBlockTypeFieldUpdateOperationsInput = {
  set?: InputMaybe<BlockType>;
};

export type EnumBlockTypeFilter = {
  equals?: InputMaybe<BlockType>;
  in?: InputMaybe<Array<BlockType>>;
  not?: InputMaybe<NestedEnumBlockTypeFilter>;
  notIn?: InputMaybe<Array<BlockType>>;
};

export type EnumBodyPartSideFieldUpdateOperationsInput = {
  set?: InputMaybe<BodyPartSide>;
};

export type EnumBodyPartSideFilter = {
  equals?: InputMaybe<BodyPartSide>;
  in?: InputMaybe<Array<BodyPartSide>>;
  not?: InputMaybe<NestedEnumBodyPartSideFilter>;
  notIn?: InputMaybe<Array<BodyPartSide>>;
};

export type EnumCharacterCatalogTypeFilter = {
  equals?: InputMaybe<CharacterCatalogType>;
  in?: InputMaybe<Array<CharacterCatalogType>>;
  not?: InputMaybe<NestedEnumCharacterCatalogTypeFilter>;
  notIn?: InputMaybe<Array<CharacterCatalogType>>;
};

export type EnumEnrolledStateFieldUpdateOperationsInput = {
  set?: InputMaybe<EnrolledState>;
};

export type EnumEnrolledStateFilter = {
  equals?: InputMaybe<EnrolledState>;
  in?: InputMaybe<Array<EnrolledState>>;
  not?: InputMaybe<NestedEnumEnrolledStateFilter>;
  notIn?: InputMaybe<Array<EnrolledState>>;
};

export type EnumExpRewardTypeFieldUpdateOperationsInput = {
  set?: InputMaybe<ExpRewardType>;
};

export type EnumExpRewardTypeFilter = {
  equals?: InputMaybe<ExpRewardType>;
  in?: InputMaybe<Array<ExpRewardType>>;
  not?: InputMaybe<NestedEnumExpRewardTypeFilter>;
  notIn?: InputMaybe<Array<ExpRewardType>>;
};

export type EnumFaceTypeFieldUpdateOperationsInput = {
  set?: InputMaybe<FaceType>;
};

export type EnumFaceTypeFilter = {
  equals?: InputMaybe<FaceType>;
  in?: InputMaybe<Array<FaceType>>;
  not?: InputMaybe<NestedEnumFaceTypeFilter>;
  notIn?: InputMaybe<Array<FaceType>>;
};

export type EnumFileTypeFieldUpdateOperationsInput = {
  set?: InputMaybe<FileType>;
};

export type EnumFileTypeFilter = {
  equals?: InputMaybe<FileType>;
  in?: InputMaybe<Array<FileType>>;
  not?: InputMaybe<NestedEnumFileTypeFilter>;
  notIn?: InputMaybe<Array<FileType>>;
};

export type EnumFriendStatusFieldUpdateOperationsInput = {
  set?: InputMaybe<FriendStatus>;
};

export type EnumFriendStatusFilter = {
  equals?: InputMaybe<FriendStatus>;
  in?: InputMaybe<Array<FriendStatus>>;
  not?: InputMaybe<NestedEnumFriendStatusFilter>;
  notIn?: InputMaybe<Array<FriendStatus>>;
};

export type EnumGenderNullableFilter = {
  equals?: InputMaybe<Gender>;
  in?: InputMaybe<Array<Gender>>;
  not?: InputMaybe<NestedEnumGenderNullableFilter>;
  notIn?: InputMaybe<Array<Gender>>;
};

export type EnumHairTypeFieldUpdateOperationsInput = {
  set?: InputMaybe<HairType>;
};

export type EnumHairTypeFilter = {
  equals?: InputMaybe<HairType>;
  in?: InputMaybe<Array<HairType>>;
  not?: InputMaybe<NestedEnumHairTypeFilter>;
  notIn?: InputMaybe<Array<HairType>>;
};

export type EnumHandAssetOrientationFieldUpdateOperationsInput = {
  set?: InputMaybe<HandAssetOrientation>;
};

export type EnumHandAssetOrientationFilter = {
  equals?: InputMaybe<HandAssetOrientation>;
  in?: InputMaybe<Array<HandAssetOrientation>>;
  not?: InputMaybe<NestedEnumHandAssetOrientationFilter>;
  notIn?: InputMaybe<Array<HandAssetOrientation>>;
};

export type EnumItemCatalogTypeFieldUpdateOperationsInput = {
  set?: InputMaybe<ItemCatalogType>;
};

export type EnumItemCatalogTypeFilter = {
  equals?: InputMaybe<ItemCatalogType>;
  in?: InputMaybe<Array<ItemCatalogType>>;
  not?: InputMaybe<NestedEnumItemCatalogTypeFilter>;
  notIn?: InputMaybe<Array<ItemCatalogType>>;
};

export type EnumItemRarityFieldUpdateOperationsInput = {
  set?: InputMaybe<ItemRarity>;
};

export type EnumItemRarityFilter = {
  equals?: InputMaybe<ItemRarity>;
  in?: InputMaybe<Array<ItemRarity>>;
  not?: InputMaybe<NestedEnumItemRarityFilter>;
  notIn?: InputMaybe<Array<ItemRarity>>;
};

export type EnumItemStatusFieldUpdateOperationsInput = {
  set?: InputMaybe<ItemStatus>;
};

export type EnumItemStatusFilter = {
  equals?: InputMaybe<ItemStatus>;
  in?: InputMaybe<Array<ItemStatus>>;
  not?: InputMaybe<NestedEnumItemStatusFilter>;
  notIn?: InputMaybe<Array<ItemStatus>>;
};

export type EnumItemTypeFieldUpdateOperationsInput = {
  set?: InputMaybe<ItemType>;
};

export type EnumItemTypeFilter = {
  equals?: InputMaybe<ItemType>;
  in?: InputMaybe<Array<ItemType>>;
  not?: InputMaybe<NestedEnumItemTypeFilter>;
  notIn?: InputMaybe<Array<ItemType>>;
};

export type EnumLevelFieldUpdateOperationsInput = {
  set?: InputMaybe<Level>;
};

export type EnumLevelFilter = {
  equals?: InputMaybe<Level>;
  in?: InputMaybe<Array<Level>>;
  not?: InputMaybe<NestedEnumLevelFilter>;
  notIn?: InputMaybe<Array<Level>>;
};

export type EnumNotificationCategoryFieldUpdateOperationsInput = {
  set?: InputMaybe<NotificationCategory>;
};

export type EnumNotificationCategoryFilter = {
  equals?: InputMaybe<NotificationCategory>;
  in?: InputMaybe<Array<NotificationCategory>>;
  not?: InputMaybe<NestedEnumNotificationCategoryFilter>;
  notIn?: InputMaybe<Array<NotificationCategory>>;
};

export type EnumNotificationSettingTypeFieldUpdateOperationsInput = {
  set?: InputMaybe<NotificationSettingType>;
};

export type EnumNotificationSettingTypeFilter = {
  equals?: InputMaybe<NotificationSettingType>;
  in?: InputMaybe<Array<NotificationSettingType>>;
  not?: InputMaybe<NestedEnumNotificationSettingTypeFilter>;
  notIn?: InputMaybe<Array<NotificationSettingType>>;
};

export type EnumNotificationTypeFieldUpdateOperationsInput = {
  set?: InputMaybe<NotificationType>;
};

export type EnumNotificationTypeFilter = {
  equals?: InputMaybe<NotificationType>;
  in?: InputMaybe<Array<NotificationType>>;
  not?: InputMaybe<NestedEnumNotificationTypeFilter>;
  notIn?: InputMaybe<Array<NotificationType>>;
};

export type EnumParentStatusFieldUpdateOperationsInput = {
  set?: InputMaybe<ParentStatus>;
};

export type EnumParentStatusFilter = {
  equals?: InputMaybe<ParentStatus>;
  in?: InputMaybe<Array<ParentStatus>>;
  not?: InputMaybe<NestedEnumParentStatusFilter>;
  notIn?: InputMaybe<Array<ParentStatus>>;
};

export type EnumQuizTypeFieldUpdateOperationsInput = {
  set?: InputMaybe<QuizType>;
};

export type EnumQuizTypeFilter = {
  equals?: InputMaybe<QuizType>;
  in?: InputMaybe<Array<QuizType>>;
  not?: InputMaybe<NestedEnumQuizTypeFilter>;
  notIn?: InputMaybe<Array<QuizType>>;
};

export type EnumReactionEmojiFieldUpdateOperationsInput = {
  set?: InputMaybe<ReactionEmoji>;
};

export type EnumReactionEmojiFilter = {
  equals?: InputMaybe<ReactionEmoji>;
  in?: InputMaybe<Array<ReactionEmoji>>;
  not?: InputMaybe<NestedEnumReactionEmojiFilter>;
  notIn?: InputMaybe<Array<ReactionEmoji>>;
};

export type EnumRoleFieldUpdateOperationsInput = {
  set?: InputMaybe<Role>;
};

export type EnumRoleFilter = {
  equals?: InputMaybe<Role>;
  in?: InputMaybe<Array<Role>>;
  not?: InputMaybe<NestedEnumRoleFilter>;
  notIn?: InputMaybe<Array<Role>>;
};

export type EnumSkinTypeFieldUpdateOperationsInput = {
  set?: InputMaybe<SkinType>;
};

export type EnumSkinTypeFilter = {
  equals?: InputMaybe<SkinType>;
  in?: InputMaybe<Array<SkinType>>;
  not?: InputMaybe<NestedEnumSkinTypeFilter>;
  notIn?: InputMaybe<Array<SkinType>>;
};

export type EnumStateFieldUpdateOperationsInput = {
  set?: InputMaybe<State>;
};

export type EnumStateFilter = {
  equals?: InputMaybe<State>;
  in?: InputMaybe<Array<State>>;
  not?: InputMaybe<NestedEnumStateFilter>;
  notIn?: InputMaybe<Array<State>>;
};

export type EnumStripeProductTypeFilter = {
  equals?: InputMaybe<StripeProductType>;
  in?: InputMaybe<Array<StripeProductType>>;
  not?: InputMaybe<NestedEnumStripeProductTypeFilter>;
  notIn?: InputMaybe<Array<StripeProductType>>;
};

export type EnumTopicTypeFieldUpdateOperationsInput = {
  set?: InputMaybe<TopicType>;
};

export type EnumTopicTypeFilter = {
  equals?: InputMaybe<TopicType>;
  in?: InputMaybe<Array<TopicType>>;
  not?: InputMaybe<NestedEnumTopicTypeFilter>;
  notIn?: InputMaybe<Array<TopicType>>;
};

export type EnumTopsTypeFieldUpdateOperationsInput = {
  set?: InputMaybe<TopsType>;
};

export type EnumTopsTypeFilter = {
  equals?: InputMaybe<TopsType>;
  in?: InputMaybe<Array<TopsType>>;
  not?: InputMaybe<NestedEnumTopsTypeFilter>;
  notIn?: InputMaybe<Array<TopsType>>;
};

export type ExpLog = {
  __typename?: 'ExpLog';
  checkpoint?: Maybe<EnrolledCheckpoint>;
  checkpointId?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  expGained: Scalars['Int'];
  id: Scalars['ID'];
  rewardType: ExpRewardType;
  streak?: Maybe<Scalars['Int']>;
  student: Student;
  studentId: Scalars['String'];
};

export type ExpLogCreateManyCheckpointInput = {
  createdAt?: InputMaybe<Scalars['Date']>;
  expGained: Scalars['Int'];
  id?: InputMaybe<Scalars['String']>;
  rewardType: ExpRewardType;
  streak?: InputMaybe<Scalars['Int']>;
  studentId: Scalars['String'];
};

export type ExpLogCreateManyCheckpointInputEnvelope = {
  data: Array<ExpLogCreateManyCheckpointInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ExpLogCreateManyStudentInput = {
  checkpointId?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['Date']>;
  expGained: Scalars['Int'];
  id?: InputMaybe<Scalars['String']>;
  rewardType: ExpRewardType;
  streak?: InputMaybe<Scalars['Int']>;
};

export type ExpLogCreateManyStudentInputEnvelope = {
  data: Array<ExpLogCreateManyStudentInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ExpLogCreateNestedManyWithoutCheckpointInput = {
  connect?: InputMaybe<Array<ExpLogWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ExpLogCreateOrConnectWithoutCheckpointInput>>;
  create?: InputMaybe<Array<ExpLogCreateWithoutCheckpointInput>>;
  createMany?: InputMaybe<ExpLogCreateManyCheckpointInputEnvelope>;
};

export type ExpLogCreateNestedManyWithoutStudentInput = {
  connect?: InputMaybe<Array<ExpLogWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ExpLogCreateOrConnectWithoutStudentInput>>;
  create?: InputMaybe<Array<ExpLogCreateWithoutStudentInput>>;
  createMany?: InputMaybe<ExpLogCreateManyStudentInputEnvelope>;
};

export type ExpLogCreateOrConnectWithoutCheckpointInput = {
  create: ExpLogCreateWithoutCheckpointInput;
  where: ExpLogWhereUniqueInput;
};

export type ExpLogCreateOrConnectWithoutStudentInput = {
  create: ExpLogCreateWithoutStudentInput;
  where: ExpLogWhereUniqueInput;
};

export type ExpLogCreateWithoutCheckpointInput = {
  createdAt?: InputMaybe<Scalars['Date']>;
  expGained: Scalars['Int'];
  id?: InputMaybe<Scalars['String']>;
  rewardType: ExpRewardType;
  streak?: InputMaybe<Scalars['Int']>;
  student: StudentCreateNestedOneWithoutExpLogInput;
};

export type ExpLogCreateWithoutStudentInput = {
  checkpoint?: InputMaybe<EnrolledCheckpointCreateNestedOneWithoutExpLogsInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  expGained: Scalars['Int'];
  id?: InputMaybe<Scalars['String']>;
  rewardType: ExpRewardType;
  streak?: InputMaybe<Scalars['Int']>;
};

export type ExpLogListRelationFilter = {
  every?: InputMaybe<ExpLogWhereInput>;
  none?: InputMaybe<ExpLogWhereInput>;
  some?: InputMaybe<ExpLogWhereInput>;
};

export type ExpLogOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type ExpLogScalarWhereInput = {
  AND?: InputMaybe<Array<ExpLogScalarWhereInput>>;
  NOT?: InputMaybe<Array<ExpLogScalarWhereInput>>;
  OR?: InputMaybe<Array<ExpLogScalarWhereInput>>;
  checkpointId?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  expGained?: InputMaybe<IntFilter>;
  id?: InputMaybe<StringFilter>;
  rewardType?: InputMaybe<EnumExpRewardTypeFilter>;
  streak?: InputMaybe<IntNullableFilter>;
  studentId?: InputMaybe<StringFilter>;
};

export type ExpLogUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  expGained?: InputMaybe<IntFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  rewardType?: InputMaybe<EnumExpRewardTypeFieldUpdateOperationsInput>;
  streak?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
};

export type ExpLogUpdateManyWithWhereWithoutCheckpointInput = {
  data: ExpLogUpdateManyMutationInput;
  where: ExpLogScalarWhereInput;
};

export type ExpLogUpdateManyWithWhereWithoutStudentInput = {
  data: ExpLogUpdateManyMutationInput;
  where: ExpLogScalarWhereInput;
};

export type ExpLogUpdateManyWithoutCheckpointInput = {
  connect?: InputMaybe<Array<ExpLogWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ExpLogCreateOrConnectWithoutCheckpointInput>>;
  create?: InputMaybe<Array<ExpLogCreateWithoutCheckpointInput>>;
  createMany?: InputMaybe<ExpLogCreateManyCheckpointInputEnvelope>;
  delete?: InputMaybe<Array<ExpLogWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ExpLogScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ExpLogWhereUniqueInput>>;
  set?: InputMaybe<Array<ExpLogWhereUniqueInput>>;
  update?: InputMaybe<Array<ExpLogUpdateWithWhereUniqueWithoutCheckpointInput>>;
  updateMany?: InputMaybe<Array<ExpLogUpdateManyWithWhereWithoutCheckpointInput>>;
  upsert?: InputMaybe<Array<ExpLogUpsertWithWhereUniqueWithoutCheckpointInput>>;
};

export type ExpLogUpdateManyWithoutStudentInput = {
  connect?: InputMaybe<Array<ExpLogWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ExpLogCreateOrConnectWithoutStudentInput>>;
  create?: InputMaybe<Array<ExpLogCreateWithoutStudentInput>>;
  createMany?: InputMaybe<ExpLogCreateManyStudentInputEnvelope>;
  delete?: InputMaybe<Array<ExpLogWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ExpLogScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ExpLogWhereUniqueInput>>;
  set?: InputMaybe<Array<ExpLogWhereUniqueInput>>;
  update?: InputMaybe<Array<ExpLogUpdateWithWhereUniqueWithoutStudentInput>>;
  updateMany?: InputMaybe<Array<ExpLogUpdateManyWithWhereWithoutStudentInput>>;
  upsert?: InputMaybe<Array<ExpLogUpsertWithWhereUniqueWithoutStudentInput>>;
};

export type ExpLogUpdateWithWhereUniqueWithoutCheckpointInput = {
  data: ExpLogUpdateWithoutCheckpointInput;
  where: ExpLogWhereUniqueInput;
};

export type ExpLogUpdateWithWhereUniqueWithoutStudentInput = {
  data: ExpLogUpdateWithoutStudentInput;
  where: ExpLogWhereUniqueInput;
};

export type ExpLogUpdateWithoutCheckpointInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  expGained?: InputMaybe<IntFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  rewardType?: InputMaybe<EnumExpRewardTypeFieldUpdateOperationsInput>;
  streak?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  student?: InputMaybe<StudentUpdateOneRequiredWithoutExpLogInput>;
};

export type ExpLogUpdateWithoutStudentInput = {
  checkpoint?: InputMaybe<EnrolledCheckpointUpdateOneWithoutExpLogsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  expGained?: InputMaybe<IntFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  rewardType?: InputMaybe<EnumExpRewardTypeFieldUpdateOperationsInput>;
  streak?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
};

export type ExpLogUpsertWithWhereUniqueWithoutCheckpointInput = {
  create: ExpLogCreateWithoutCheckpointInput;
  update: ExpLogUpdateWithoutCheckpointInput;
  where: ExpLogWhereUniqueInput;
};

export type ExpLogUpsertWithWhereUniqueWithoutStudentInput = {
  create: ExpLogCreateWithoutStudentInput;
  update: ExpLogUpdateWithoutStudentInput;
  where: ExpLogWhereUniqueInput;
};

export type ExpLogWhereInput = {
  AND?: InputMaybe<Array<ExpLogWhereInput>>;
  NOT?: InputMaybe<Array<ExpLogWhereInput>>;
  OR?: InputMaybe<Array<ExpLogWhereInput>>;
  checkpoint?: InputMaybe<EnrolledCheckpointRelationFilter>;
  checkpointId?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  expGained?: InputMaybe<IntFilter>;
  id?: InputMaybe<StringFilter>;
  rewardType?: InputMaybe<EnumExpRewardTypeFilter>;
  streak?: InputMaybe<IntNullableFilter>;
  student?: InputMaybe<StudentRelationFilter>;
  studentId?: InputMaybe<StringFilter>;
};

export type ExpLogWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export enum ExpRewardType {
  Completion = 'COMPLETION',
  Streak = 'STREAK'
}

export type FaceItem = {
  __typename?: 'FaceItem';
  faceType: FaceType;
  id: Scalars['ID'];
  item: AvatarItem;
};

export type FaceItemCreateNestedOneWithoutItemInput = {
  connect?: InputMaybe<FaceItemWhereUniqueInput>;
  connectOrCreate?: InputMaybe<FaceItemCreateOrConnectWithoutItemInput>;
  create?: InputMaybe<FaceItemCreateWithoutItemInput>;
};

export type FaceItemCreateOrConnectWithoutItemInput = {
  create: FaceItemCreateWithoutItemInput;
  where: FaceItemWhereUniqueInput;
};

export type FaceItemCreateWithoutItemInput = {
  faceType: FaceType;
};

export enum FaceItemOrderByRelevanceFieldEnum {
  Id = 'id'
}

export type FaceItemOrderByRelevanceInput = {
  fields: Array<FaceItemOrderByRelevanceFieldEnum>;
  search: Scalars['String'];
  sort: SortOrder;
};

export type FaceItemOrderByWithRelationAndSearchRelevanceInput = {
  _relevance?: InputMaybe<FaceItemOrderByRelevanceInput>;
  faceType?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  item?: InputMaybe<AvatarItemOrderByWithRelationAndSearchRelevanceInput>;
};

export type FaceItemRelationFilter = {
  is?: InputMaybe<FaceItemWhereInput>;
  isNot?: InputMaybe<FaceItemWhereInput>;
};

export type FaceItemUpdateOneWithoutItemInput = {
  connect?: InputMaybe<FaceItemWhereUniqueInput>;
  connectOrCreate?: InputMaybe<FaceItemCreateOrConnectWithoutItemInput>;
  create?: InputMaybe<FaceItemCreateWithoutItemInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<FaceItemUpdateWithoutItemInput>;
  upsert?: InputMaybe<FaceItemUpsertWithoutItemInput>;
};

export type FaceItemUpdateWithoutItemInput = {
  faceType?: InputMaybe<EnumFaceTypeFieldUpdateOperationsInput>;
};

export type FaceItemUpsertWithoutItemInput = {
  create: FaceItemCreateWithoutItemInput;
  update: FaceItemUpdateWithoutItemInput;
};

export type FaceItemWhereInput = {
  AND?: InputMaybe<Array<FaceItemWhereInput>>;
  NOT?: InputMaybe<Array<FaceItemWhereInput>>;
  OR?: InputMaybe<Array<FaceItemWhereInput>>;
  faceType?: InputMaybe<EnumFaceTypeFilter>;
  id?: InputMaybe<StringFilter>;
  item?: InputMaybe<AvatarItemRelationFilter>;
};

export type FaceItemWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export enum FaceType {
  Cheeck = 'CHEECK',
  Ears = 'EARS',
  Eyes = 'EYES',
  Mouth = 'MOUTH',
  Nose = 'NOSE',
  Shape = 'SHAPE'
}

export enum FileType {
  Audio = 'AUDIO',
  Documents = 'DOCUMENTS',
  Image = 'IMAGE',
  Others = 'OTHERS',
  Video = 'VIDEO'
}

export type FindManyUserInput = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationAndSearchRelevanceInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};

export type ForumPost = {
  __typename?: 'ForumPost';
  Asset?: Maybe<Array<Asset>>;
  ForumReaction?: Maybe<Array<ForumReaction>>;
  UserForumReaction?: Maybe<Array<UserForumReaction>>;
  _count: ForumPostCount;
  bookmarks?: Maybe<Array<ForumPostBookmark>>;
  category: Category;
  categoryId: Scalars['String'];
  commentCount: Scalars['Int'];
  comments?: Maybe<Array<ForumPost>>;
  createdAt: Scalars['Date'];
  deleted?: Maybe<Scalars['Date']>;
  id: Scalars['ID'];
  isSubComment: Scalars['Boolean'];
  parentPost?: Maybe<ForumPost>;
  parentPostId?: Maybe<Scalars['String']>;
  reportCount: Scalars['Int'];
  reports?: Maybe<Array<ForumReport>>;
  text: Scalars['String'];
  updatedAt: Scalars['Date'];
  user: User;
  userId: Scalars['String'];
};

export type ForumPostBookmark = {
  __typename?: 'ForumPostBookmark';
  id: Scalars['ID'];
  post: ForumPost;
  postId: Scalars['String'];
  user: User;
  userId: Scalars['String'];
};

export type ForumPostBookmarkCreateManyPostInput = {
  id?: InputMaybe<Scalars['String']>;
  userId: Scalars['String'];
};

export type ForumPostBookmarkCreateManyPostInputEnvelope = {
  data: Array<ForumPostBookmarkCreateManyPostInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ForumPostBookmarkCreateManyUserInput = {
  id?: InputMaybe<Scalars['String']>;
  postId: Scalars['String'];
};

export type ForumPostBookmarkCreateManyUserInputEnvelope = {
  data: Array<ForumPostBookmarkCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ForumPostBookmarkCreateNestedManyWithoutPostInput = {
  connect?: InputMaybe<Array<ForumPostBookmarkWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ForumPostBookmarkCreateOrConnectWithoutPostInput>>;
  create?: InputMaybe<Array<ForumPostBookmarkCreateWithoutPostInput>>;
  createMany?: InputMaybe<ForumPostBookmarkCreateManyPostInputEnvelope>;
};

export type ForumPostBookmarkCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<ForumPostBookmarkWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ForumPostBookmarkCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<ForumPostBookmarkCreateWithoutUserInput>>;
  createMany?: InputMaybe<ForumPostBookmarkCreateManyUserInputEnvelope>;
};

export type ForumPostBookmarkCreateOrConnectWithoutPostInput = {
  create: ForumPostBookmarkCreateWithoutPostInput;
  where: ForumPostBookmarkWhereUniqueInput;
};

export type ForumPostBookmarkCreateOrConnectWithoutUserInput = {
  create: ForumPostBookmarkCreateWithoutUserInput;
  where: ForumPostBookmarkWhereUniqueInput;
};

export type ForumPostBookmarkCreateWithoutPostInput = {
  id?: InputMaybe<Scalars['String']>;
  user: UserCreateNestedOneWithoutForumPostBookmarksInput;
};

export type ForumPostBookmarkCreateWithoutUserInput = {
  id?: InputMaybe<Scalars['String']>;
  post: ForumPostCreateNestedOneWithoutBookmarksInput;
};

export type ForumPostBookmarkListRelationFilter = {
  every?: InputMaybe<ForumPostBookmarkWhereInput>;
  none?: InputMaybe<ForumPostBookmarkWhereInput>;
  some?: InputMaybe<ForumPostBookmarkWhereInput>;
};

export type ForumPostBookmarkOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export enum ForumPostBookmarkOrderByRelevanceFieldEnum {
  Id = 'id',
  PostId = 'postId',
  UserId = 'userId'
}

export type ForumPostBookmarkOrderByRelevanceInput = {
  fields: Array<ForumPostBookmarkOrderByRelevanceFieldEnum>;
  search: Scalars['String'];
  sort: SortOrder;
};

export type ForumPostBookmarkOrderByWithRelationAndSearchRelevanceInput = {
  _relevance?: InputMaybe<ForumPostBookmarkOrderByRelevanceInput>;
  id?: InputMaybe<SortOrder>;
  post?: InputMaybe<ForumPostOrderByWithRelationAndSearchRelevanceInput>;
  postId?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationAndSearchRelevanceInput>;
  userId?: InputMaybe<SortOrder>;
};

export enum ForumPostBookmarkScalarFieldEnum {
  Id = 'id',
  PostId = 'postId',
  UserId = 'userId'
}

export type ForumPostBookmarkScalarWhereInput = {
  AND?: InputMaybe<Array<ForumPostBookmarkScalarWhereInput>>;
  NOT?: InputMaybe<Array<ForumPostBookmarkScalarWhereInput>>;
  OR?: InputMaybe<Array<ForumPostBookmarkScalarWhereInput>>;
  id?: InputMaybe<StringFilter>;
  postId?: InputMaybe<StringFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type ForumPostBookmarkUpdateManyMutationInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type ForumPostBookmarkUpdateManyWithWhereWithoutPostInput = {
  data: ForumPostBookmarkUpdateManyMutationInput;
  where: ForumPostBookmarkScalarWhereInput;
};

export type ForumPostBookmarkUpdateManyWithWhereWithoutUserInput = {
  data: ForumPostBookmarkUpdateManyMutationInput;
  where: ForumPostBookmarkScalarWhereInput;
};

export type ForumPostBookmarkUpdateManyWithoutPostInput = {
  connect?: InputMaybe<Array<ForumPostBookmarkWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ForumPostBookmarkCreateOrConnectWithoutPostInput>>;
  create?: InputMaybe<Array<ForumPostBookmarkCreateWithoutPostInput>>;
  createMany?: InputMaybe<ForumPostBookmarkCreateManyPostInputEnvelope>;
  delete?: InputMaybe<Array<ForumPostBookmarkWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ForumPostBookmarkScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ForumPostBookmarkWhereUniqueInput>>;
  set?: InputMaybe<Array<ForumPostBookmarkWhereUniqueInput>>;
  update?: InputMaybe<Array<ForumPostBookmarkUpdateWithWhereUniqueWithoutPostInput>>;
  updateMany?: InputMaybe<Array<ForumPostBookmarkUpdateManyWithWhereWithoutPostInput>>;
  upsert?: InputMaybe<Array<ForumPostBookmarkUpsertWithWhereUniqueWithoutPostInput>>;
};

export type ForumPostBookmarkUpdateManyWithoutUserInput = {
  connect?: InputMaybe<Array<ForumPostBookmarkWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ForumPostBookmarkCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<ForumPostBookmarkCreateWithoutUserInput>>;
  createMany?: InputMaybe<ForumPostBookmarkCreateManyUserInputEnvelope>;
  delete?: InputMaybe<Array<ForumPostBookmarkWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ForumPostBookmarkScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ForumPostBookmarkWhereUniqueInput>>;
  set?: InputMaybe<Array<ForumPostBookmarkWhereUniqueInput>>;
  update?: InputMaybe<Array<ForumPostBookmarkUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<ForumPostBookmarkUpdateManyWithWhereWithoutUserInput>>;
  upsert?: InputMaybe<Array<ForumPostBookmarkUpsertWithWhereUniqueWithoutUserInput>>;
};

export type ForumPostBookmarkUpdateWithWhereUniqueWithoutPostInput = {
  data: ForumPostBookmarkUpdateWithoutPostInput;
  where: ForumPostBookmarkWhereUniqueInput;
};

export type ForumPostBookmarkUpdateWithWhereUniqueWithoutUserInput = {
  data: ForumPostBookmarkUpdateWithoutUserInput;
  where: ForumPostBookmarkWhereUniqueInput;
};

export type ForumPostBookmarkUpdateWithoutPostInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutForumPostBookmarksInput>;
};

export type ForumPostBookmarkUpdateWithoutUserInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  post?: InputMaybe<ForumPostUpdateOneRequiredWithoutBookmarksInput>;
};

export type ForumPostBookmarkUpsertWithWhereUniqueWithoutPostInput = {
  create: ForumPostBookmarkCreateWithoutPostInput;
  update: ForumPostBookmarkUpdateWithoutPostInput;
  where: ForumPostBookmarkWhereUniqueInput;
};

export type ForumPostBookmarkUpsertWithWhereUniqueWithoutUserInput = {
  create: ForumPostBookmarkCreateWithoutUserInput;
  update: ForumPostBookmarkUpdateWithoutUserInput;
  where: ForumPostBookmarkWhereUniqueInput;
};

export type ForumPostBookmarkWhereInput = {
  AND?: InputMaybe<Array<ForumPostBookmarkWhereInput>>;
  NOT?: InputMaybe<Array<ForumPostBookmarkWhereInput>>;
  OR?: InputMaybe<Array<ForumPostBookmarkWhereInput>>;
  id?: InputMaybe<StringFilter>;
  post?: InputMaybe<ForumPostRelationFilter>;
  postId?: InputMaybe<StringFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type ForumPostBookmarkWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type ForumPostCount = {
  __typename?: 'ForumPostCount';
  Asset: Scalars['Int'];
  ForumReaction: Scalars['Int'];
  UserForumReaction: Scalars['Int'];
  bookmarks: Scalars['Int'];
  comments: Scalars['Int'];
  reports: Scalars['Int'];
};

export type ForumPostCreateManyCategoryInput = {
  commentCount?: InputMaybe<Scalars['Int']>;
  createdAt?: InputMaybe<Scalars['Date']>;
  deleted?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  isSubComment?: InputMaybe<Scalars['Boolean']>;
  parentPostId?: InputMaybe<Scalars['String']>;
  reportCount?: InputMaybe<Scalars['Int']>;
  text: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['Date']>;
  userId: Scalars['String'];
};

export type ForumPostCreateManyCategoryInputEnvelope = {
  data: Array<ForumPostCreateManyCategoryInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ForumPostCreateManyParentPostInput = {
  categoryId: Scalars['String'];
  commentCount?: InputMaybe<Scalars['Int']>;
  createdAt?: InputMaybe<Scalars['Date']>;
  deleted?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  isSubComment?: InputMaybe<Scalars['Boolean']>;
  reportCount?: InputMaybe<Scalars['Int']>;
  text: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['Date']>;
  userId: Scalars['String'];
};

export type ForumPostCreateManyParentPostInputEnvelope = {
  data: Array<ForumPostCreateManyParentPostInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ForumPostCreateManyUserInput = {
  categoryId: Scalars['String'];
  commentCount?: InputMaybe<Scalars['Int']>;
  createdAt?: InputMaybe<Scalars['Date']>;
  deleted?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  isSubComment?: InputMaybe<Scalars['Boolean']>;
  parentPostId?: InputMaybe<Scalars['String']>;
  reportCount?: InputMaybe<Scalars['Int']>;
  text: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type ForumPostCreateManyUserInputEnvelope = {
  data: Array<ForumPostCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ForumPostCreateNestedManyWithoutCategoryInput = {
  connect?: InputMaybe<Array<ForumPostWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ForumPostCreateOrConnectWithoutCategoryInput>>;
  create?: InputMaybe<Array<ForumPostCreateWithoutCategoryInput>>;
  createMany?: InputMaybe<ForumPostCreateManyCategoryInputEnvelope>;
};

export type ForumPostCreateNestedManyWithoutParentPostInput = {
  connect?: InputMaybe<Array<ForumPostWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ForumPostCreateOrConnectWithoutParentPostInput>>;
  create?: InputMaybe<Array<ForumPostCreateWithoutParentPostInput>>;
  createMany?: InputMaybe<ForumPostCreateManyParentPostInputEnvelope>;
};

export type ForumPostCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<ForumPostWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ForumPostCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<ForumPostCreateWithoutUserInput>>;
  createMany?: InputMaybe<ForumPostCreateManyUserInputEnvelope>;
};

export type ForumPostCreateNestedOneWithoutAssetInput = {
  connect?: InputMaybe<ForumPostWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ForumPostCreateOrConnectWithoutAssetInput>;
  create?: InputMaybe<ForumPostCreateWithoutAssetInput>;
};

export type ForumPostCreateNestedOneWithoutBookmarksInput = {
  connect?: InputMaybe<ForumPostWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ForumPostCreateOrConnectWithoutBookmarksInput>;
  create?: InputMaybe<ForumPostCreateWithoutBookmarksInput>;
};

export type ForumPostCreateNestedOneWithoutCommentsInput = {
  connect?: InputMaybe<ForumPostWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ForumPostCreateOrConnectWithoutCommentsInput>;
  create?: InputMaybe<ForumPostCreateWithoutCommentsInput>;
};

export type ForumPostCreateNestedOneWithoutForumReactionInput = {
  connect?: InputMaybe<ForumPostWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ForumPostCreateOrConnectWithoutForumReactionInput>;
  create?: InputMaybe<ForumPostCreateWithoutForumReactionInput>;
};

export type ForumPostCreateNestedOneWithoutReportsInput = {
  connect?: InputMaybe<ForumPostWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ForumPostCreateOrConnectWithoutReportsInput>;
  create?: InputMaybe<ForumPostCreateWithoutReportsInput>;
};

export type ForumPostCreateNestedOneWithoutUserForumReactionInput = {
  connect?: InputMaybe<ForumPostWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ForumPostCreateOrConnectWithoutUserForumReactionInput>;
  create?: InputMaybe<ForumPostCreateWithoutUserForumReactionInput>;
};

export type ForumPostCreateOrConnectWithoutAssetInput = {
  create: ForumPostCreateWithoutAssetInput;
  where: ForumPostWhereUniqueInput;
};

export type ForumPostCreateOrConnectWithoutBookmarksInput = {
  create: ForumPostCreateWithoutBookmarksInput;
  where: ForumPostWhereUniqueInput;
};

export type ForumPostCreateOrConnectWithoutCategoryInput = {
  create: ForumPostCreateWithoutCategoryInput;
  where: ForumPostWhereUniqueInput;
};

export type ForumPostCreateOrConnectWithoutCommentsInput = {
  create: ForumPostCreateWithoutCommentsInput;
  where: ForumPostWhereUniqueInput;
};

export type ForumPostCreateOrConnectWithoutForumReactionInput = {
  create: ForumPostCreateWithoutForumReactionInput;
  where: ForumPostWhereUniqueInput;
};

export type ForumPostCreateOrConnectWithoutParentPostInput = {
  create: ForumPostCreateWithoutParentPostInput;
  where: ForumPostWhereUniqueInput;
};

export type ForumPostCreateOrConnectWithoutReportsInput = {
  create: ForumPostCreateWithoutReportsInput;
  where: ForumPostWhereUniqueInput;
};

export type ForumPostCreateOrConnectWithoutUserForumReactionInput = {
  create: ForumPostCreateWithoutUserForumReactionInput;
  where: ForumPostWhereUniqueInput;
};

export type ForumPostCreateOrConnectWithoutUserInput = {
  create: ForumPostCreateWithoutUserInput;
  where: ForumPostWhereUniqueInput;
};

export type ForumPostCreateWithoutAssetInput = {
  ForumReaction?: InputMaybe<ForumReactionCreateNestedManyWithoutPostInput>;
  UserForumReaction?: InputMaybe<UserForumReactionCreateNestedManyWithoutPostInput>;
  bookmarks?: InputMaybe<ForumPostBookmarkCreateNestedManyWithoutPostInput>;
  category: CategoryCreateNestedOneWithoutForumPostsInput;
  commentCount?: InputMaybe<Scalars['Int']>;
  comments?: InputMaybe<ForumPostCreateNestedManyWithoutParentPostInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  deleted?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  isSubComment?: InputMaybe<Scalars['Boolean']>;
  parentPost?: InputMaybe<ForumPostCreateNestedOneWithoutCommentsInput>;
  reportCount?: InputMaybe<Scalars['Int']>;
  reports?: InputMaybe<ForumReportCreateNestedManyWithoutPostInput>;
  text: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['Date']>;
  user: UserCreateNestedOneWithoutForumPostsInput;
};

export type ForumPostCreateWithoutBookmarksInput = {
  Asset?: InputMaybe<AssetCreateNestedManyWithoutForumPostInput>;
  ForumReaction?: InputMaybe<ForumReactionCreateNestedManyWithoutPostInput>;
  UserForumReaction?: InputMaybe<UserForumReactionCreateNestedManyWithoutPostInput>;
  category: CategoryCreateNestedOneWithoutForumPostsInput;
  commentCount?: InputMaybe<Scalars['Int']>;
  comments?: InputMaybe<ForumPostCreateNestedManyWithoutParentPostInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  deleted?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  isSubComment?: InputMaybe<Scalars['Boolean']>;
  parentPost?: InputMaybe<ForumPostCreateNestedOneWithoutCommentsInput>;
  reportCount?: InputMaybe<Scalars['Int']>;
  reports?: InputMaybe<ForumReportCreateNestedManyWithoutPostInput>;
  text: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['Date']>;
  user: UserCreateNestedOneWithoutForumPostsInput;
};

export type ForumPostCreateWithoutCategoryInput = {
  Asset?: InputMaybe<AssetCreateNestedManyWithoutForumPostInput>;
  ForumReaction?: InputMaybe<ForumReactionCreateNestedManyWithoutPostInput>;
  UserForumReaction?: InputMaybe<UserForumReactionCreateNestedManyWithoutPostInput>;
  bookmarks?: InputMaybe<ForumPostBookmarkCreateNestedManyWithoutPostInput>;
  commentCount?: InputMaybe<Scalars['Int']>;
  comments?: InputMaybe<ForumPostCreateNestedManyWithoutParentPostInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  deleted?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  isSubComment?: InputMaybe<Scalars['Boolean']>;
  parentPost?: InputMaybe<ForumPostCreateNestedOneWithoutCommentsInput>;
  reportCount?: InputMaybe<Scalars['Int']>;
  reports?: InputMaybe<ForumReportCreateNestedManyWithoutPostInput>;
  text: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['Date']>;
  user: UserCreateNestedOneWithoutForumPostsInput;
};

export type ForumPostCreateWithoutCommentsInput = {
  Asset?: InputMaybe<AssetCreateNestedManyWithoutForumPostInput>;
  ForumReaction?: InputMaybe<ForumReactionCreateNestedManyWithoutPostInput>;
  UserForumReaction?: InputMaybe<UserForumReactionCreateNestedManyWithoutPostInput>;
  bookmarks?: InputMaybe<ForumPostBookmarkCreateNestedManyWithoutPostInput>;
  category: CategoryCreateNestedOneWithoutForumPostsInput;
  commentCount?: InputMaybe<Scalars['Int']>;
  createdAt?: InputMaybe<Scalars['Date']>;
  deleted?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  isSubComment?: InputMaybe<Scalars['Boolean']>;
  parentPost?: InputMaybe<ForumPostCreateNestedOneWithoutCommentsInput>;
  reportCount?: InputMaybe<Scalars['Int']>;
  reports?: InputMaybe<ForumReportCreateNestedManyWithoutPostInput>;
  text: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['Date']>;
  user: UserCreateNestedOneWithoutForumPostsInput;
};

export type ForumPostCreateWithoutForumReactionInput = {
  Asset?: InputMaybe<AssetCreateNestedManyWithoutForumPostInput>;
  UserForumReaction?: InputMaybe<UserForumReactionCreateNestedManyWithoutPostInput>;
  bookmarks?: InputMaybe<ForumPostBookmarkCreateNestedManyWithoutPostInput>;
  category: CategoryCreateNestedOneWithoutForumPostsInput;
  commentCount?: InputMaybe<Scalars['Int']>;
  comments?: InputMaybe<ForumPostCreateNestedManyWithoutParentPostInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  deleted?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  isSubComment?: InputMaybe<Scalars['Boolean']>;
  parentPost?: InputMaybe<ForumPostCreateNestedOneWithoutCommentsInput>;
  reportCount?: InputMaybe<Scalars['Int']>;
  reports?: InputMaybe<ForumReportCreateNestedManyWithoutPostInput>;
  text: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['Date']>;
  user: UserCreateNestedOneWithoutForumPostsInput;
};

export type ForumPostCreateWithoutParentPostInput = {
  Asset?: InputMaybe<AssetCreateNestedManyWithoutForumPostInput>;
  ForumReaction?: InputMaybe<ForumReactionCreateNestedManyWithoutPostInput>;
  UserForumReaction?: InputMaybe<UserForumReactionCreateNestedManyWithoutPostInput>;
  bookmarks?: InputMaybe<ForumPostBookmarkCreateNestedManyWithoutPostInput>;
  category: CategoryCreateNestedOneWithoutForumPostsInput;
  commentCount?: InputMaybe<Scalars['Int']>;
  comments?: InputMaybe<ForumPostCreateNestedManyWithoutParentPostInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  deleted?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  isSubComment?: InputMaybe<Scalars['Boolean']>;
  reportCount?: InputMaybe<Scalars['Int']>;
  reports?: InputMaybe<ForumReportCreateNestedManyWithoutPostInput>;
  text: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['Date']>;
  user: UserCreateNestedOneWithoutForumPostsInput;
};

export type ForumPostCreateWithoutReportsInput = {
  Asset?: InputMaybe<AssetCreateNestedManyWithoutForumPostInput>;
  ForumReaction?: InputMaybe<ForumReactionCreateNestedManyWithoutPostInput>;
  UserForumReaction?: InputMaybe<UserForumReactionCreateNestedManyWithoutPostInput>;
  bookmarks?: InputMaybe<ForumPostBookmarkCreateNestedManyWithoutPostInput>;
  category: CategoryCreateNestedOneWithoutForumPostsInput;
  commentCount?: InputMaybe<Scalars['Int']>;
  comments?: InputMaybe<ForumPostCreateNestedManyWithoutParentPostInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  deleted?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  isSubComment?: InputMaybe<Scalars['Boolean']>;
  parentPost?: InputMaybe<ForumPostCreateNestedOneWithoutCommentsInput>;
  reportCount?: InputMaybe<Scalars['Int']>;
  text: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['Date']>;
  user: UserCreateNestedOneWithoutForumPostsInput;
};

export type ForumPostCreateWithoutUserForumReactionInput = {
  Asset?: InputMaybe<AssetCreateNestedManyWithoutForumPostInput>;
  ForumReaction?: InputMaybe<ForumReactionCreateNestedManyWithoutPostInput>;
  bookmarks?: InputMaybe<ForumPostBookmarkCreateNestedManyWithoutPostInput>;
  category: CategoryCreateNestedOneWithoutForumPostsInput;
  commentCount?: InputMaybe<Scalars['Int']>;
  comments?: InputMaybe<ForumPostCreateNestedManyWithoutParentPostInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  deleted?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  isSubComment?: InputMaybe<Scalars['Boolean']>;
  parentPost?: InputMaybe<ForumPostCreateNestedOneWithoutCommentsInput>;
  reportCount?: InputMaybe<Scalars['Int']>;
  reports?: InputMaybe<ForumReportCreateNestedManyWithoutPostInput>;
  text: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['Date']>;
  user: UserCreateNestedOneWithoutForumPostsInput;
};

export type ForumPostCreateWithoutUserInput = {
  Asset?: InputMaybe<AssetCreateNestedManyWithoutForumPostInput>;
  ForumReaction?: InputMaybe<ForumReactionCreateNestedManyWithoutPostInput>;
  UserForumReaction?: InputMaybe<UserForumReactionCreateNestedManyWithoutPostInput>;
  bookmarks?: InputMaybe<ForumPostBookmarkCreateNestedManyWithoutPostInput>;
  category: CategoryCreateNestedOneWithoutForumPostsInput;
  commentCount?: InputMaybe<Scalars['Int']>;
  comments?: InputMaybe<ForumPostCreateNestedManyWithoutParentPostInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  deleted?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  isSubComment?: InputMaybe<Scalars['Boolean']>;
  parentPost?: InputMaybe<ForumPostCreateNestedOneWithoutCommentsInput>;
  reportCount?: InputMaybe<Scalars['Int']>;
  reports?: InputMaybe<ForumReportCreateNestedManyWithoutPostInput>;
  text: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type ForumPostListRelationFilter = {
  every?: InputMaybe<ForumPostWhereInput>;
  none?: InputMaybe<ForumPostWhereInput>;
  some?: InputMaybe<ForumPostWhereInput>;
};

export type ForumPostOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export enum ForumPostOrderByRelevanceFieldEnum {
  CategoryId = 'categoryId',
  Id = 'id',
  ParentPostId = 'parentPostId',
  Text = 'text',
  UserId = 'userId'
}

export type ForumPostOrderByRelevanceInput = {
  fields: Array<ForumPostOrderByRelevanceFieldEnum>;
  search: Scalars['String'];
  sort: SortOrder;
};

export type ForumPostOrderByWithRelationAndSearchRelevanceInput = {
  Asset?: InputMaybe<AssetOrderByRelationAggregateInput>;
  ForumReaction?: InputMaybe<ForumReactionOrderByRelationAggregateInput>;
  UserForumReaction?: InputMaybe<UserForumReactionOrderByRelationAggregateInput>;
  _relevance?: InputMaybe<ForumPostOrderByRelevanceInput>;
  bookmarks?: InputMaybe<ForumPostBookmarkOrderByRelationAggregateInput>;
  category?: InputMaybe<CategoryOrderByWithRelationAndSearchRelevanceInput>;
  categoryId?: InputMaybe<SortOrder>;
  commentCount?: InputMaybe<SortOrder>;
  comments?: InputMaybe<ForumPostOrderByRelationAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  deleted?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isSubComment?: InputMaybe<SortOrder>;
  parentPost?: InputMaybe<ForumPostOrderByWithRelationAndSearchRelevanceInput>;
  parentPostId?: InputMaybe<SortOrder>;
  reportCount?: InputMaybe<SortOrder>;
  reports?: InputMaybe<ForumReportOrderByRelationAggregateInput>;
  text?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationAndSearchRelevanceInput>;
  userId?: InputMaybe<SortOrder>;
};

export type ForumPostReactionDto = {
  __typename?: 'ForumPostReactionDto';
  post: ForumPost;
  reaction?: Maybe<UserForumReaction>;
};

export type ForumPostRelationFilter = {
  is?: InputMaybe<ForumPostWhereInput>;
  isNot?: InputMaybe<ForumPostWhereInput>;
};

export enum ForumPostScalarFieldEnum {
  CategoryId = 'categoryId',
  CommentCount = 'commentCount',
  CreatedAt = 'createdAt',
  Deleted = 'deleted',
  Id = 'id',
  IsSubComment = 'isSubComment',
  ParentPostId = 'parentPostId',
  ReportCount = 'reportCount',
  Text = 'text',
  UpdatedAt = 'updatedAt',
  UserId = 'userId'
}

export type ForumPostScalarWhereInput = {
  AND?: InputMaybe<Array<ForumPostScalarWhereInput>>;
  NOT?: InputMaybe<Array<ForumPostScalarWhereInput>>;
  OR?: InputMaybe<Array<ForumPostScalarWhereInput>>;
  categoryId?: InputMaybe<StringFilter>;
  commentCount?: InputMaybe<IntFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  deleted?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<StringFilter>;
  isSubComment?: InputMaybe<BoolFilter>;
  parentPostId?: InputMaybe<StringNullableFilter>;
  reportCount?: InputMaybe<IntFilter>;
  text?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type ForumPostUpdateManyMutationInput = {
  commentCount?: InputMaybe<IntFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deleted?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isSubComment?: InputMaybe<BoolFieldUpdateOperationsInput>;
  reportCount?: InputMaybe<IntFieldUpdateOperationsInput>;
  text?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type ForumPostUpdateManyWithWhereWithoutCategoryInput = {
  data: ForumPostUpdateManyMutationInput;
  where: ForumPostScalarWhereInput;
};

export type ForumPostUpdateManyWithWhereWithoutParentPostInput = {
  data: ForumPostUpdateManyMutationInput;
  where: ForumPostScalarWhereInput;
};

export type ForumPostUpdateManyWithWhereWithoutUserInput = {
  data: ForumPostUpdateManyMutationInput;
  where: ForumPostScalarWhereInput;
};

export type ForumPostUpdateManyWithoutCategoryInput = {
  connect?: InputMaybe<Array<ForumPostWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ForumPostCreateOrConnectWithoutCategoryInput>>;
  create?: InputMaybe<Array<ForumPostCreateWithoutCategoryInput>>;
  createMany?: InputMaybe<ForumPostCreateManyCategoryInputEnvelope>;
  delete?: InputMaybe<Array<ForumPostWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ForumPostScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ForumPostWhereUniqueInput>>;
  set?: InputMaybe<Array<ForumPostWhereUniqueInput>>;
  update?: InputMaybe<Array<ForumPostUpdateWithWhereUniqueWithoutCategoryInput>>;
  updateMany?: InputMaybe<Array<ForumPostUpdateManyWithWhereWithoutCategoryInput>>;
  upsert?: InputMaybe<Array<ForumPostUpsertWithWhereUniqueWithoutCategoryInput>>;
};

export type ForumPostUpdateManyWithoutParentPostInput = {
  connect?: InputMaybe<Array<ForumPostWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ForumPostCreateOrConnectWithoutParentPostInput>>;
  create?: InputMaybe<Array<ForumPostCreateWithoutParentPostInput>>;
  createMany?: InputMaybe<ForumPostCreateManyParentPostInputEnvelope>;
  delete?: InputMaybe<Array<ForumPostWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ForumPostScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ForumPostWhereUniqueInput>>;
  set?: InputMaybe<Array<ForumPostWhereUniqueInput>>;
  update?: InputMaybe<Array<ForumPostUpdateWithWhereUniqueWithoutParentPostInput>>;
  updateMany?: InputMaybe<Array<ForumPostUpdateManyWithWhereWithoutParentPostInput>>;
  upsert?: InputMaybe<Array<ForumPostUpsertWithWhereUniqueWithoutParentPostInput>>;
};

export type ForumPostUpdateManyWithoutUserInput = {
  connect?: InputMaybe<Array<ForumPostWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ForumPostCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<ForumPostCreateWithoutUserInput>>;
  createMany?: InputMaybe<ForumPostCreateManyUserInputEnvelope>;
  delete?: InputMaybe<Array<ForumPostWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ForumPostScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ForumPostWhereUniqueInput>>;
  set?: InputMaybe<Array<ForumPostWhereUniqueInput>>;
  update?: InputMaybe<Array<ForumPostUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<ForumPostUpdateManyWithWhereWithoutUserInput>>;
  upsert?: InputMaybe<Array<ForumPostUpsertWithWhereUniqueWithoutUserInput>>;
};

export type ForumPostUpdateOneRequiredWithoutBookmarksInput = {
  connect?: InputMaybe<ForumPostWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ForumPostCreateOrConnectWithoutBookmarksInput>;
  create?: InputMaybe<ForumPostCreateWithoutBookmarksInput>;
  update?: InputMaybe<ForumPostUpdateWithoutBookmarksInput>;
  upsert?: InputMaybe<ForumPostUpsertWithoutBookmarksInput>;
};

export type ForumPostUpdateOneRequiredWithoutForumReactionInput = {
  connect?: InputMaybe<ForumPostWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ForumPostCreateOrConnectWithoutForumReactionInput>;
  create?: InputMaybe<ForumPostCreateWithoutForumReactionInput>;
  update?: InputMaybe<ForumPostUpdateWithoutForumReactionInput>;
  upsert?: InputMaybe<ForumPostUpsertWithoutForumReactionInput>;
};

export type ForumPostUpdateOneRequiredWithoutReportsInput = {
  connect?: InputMaybe<ForumPostWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ForumPostCreateOrConnectWithoutReportsInput>;
  create?: InputMaybe<ForumPostCreateWithoutReportsInput>;
  update?: InputMaybe<ForumPostUpdateWithoutReportsInput>;
  upsert?: InputMaybe<ForumPostUpsertWithoutReportsInput>;
};

export type ForumPostUpdateOneRequiredWithoutUserForumReactionInput = {
  connect?: InputMaybe<ForumPostWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ForumPostCreateOrConnectWithoutUserForumReactionInput>;
  create?: InputMaybe<ForumPostCreateWithoutUserForumReactionInput>;
  update?: InputMaybe<ForumPostUpdateWithoutUserForumReactionInput>;
  upsert?: InputMaybe<ForumPostUpsertWithoutUserForumReactionInput>;
};

export type ForumPostUpdateOneWithoutAssetInput = {
  connect?: InputMaybe<ForumPostWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ForumPostCreateOrConnectWithoutAssetInput>;
  create?: InputMaybe<ForumPostCreateWithoutAssetInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<ForumPostUpdateWithoutAssetInput>;
  upsert?: InputMaybe<ForumPostUpsertWithoutAssetInput>;
};

export type ForumPostUpdateOneWithoutCommentsInput = {
  connect?: InputMaybe<ForumPostWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ForumPostCreateOrConnectWithoutCommentsInput>;
  create?: InputMaybe<ForumPostCreateWithoutCommentsInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<ForumPostUpdateWithoutCommentsInput>;
  upsert?: InputMaybe<ForumPostUpsertWithoutCommentsInput>;
};

export type ForumPostUpdateWithWhereUniqueWithoutCategoryInput = {
  data: ForumPostUpdateWithoutCategoryInput;
  where: ForumPostWhereUniqueInput;
};

export type ForumPostUpdateWithWhereUniqueWithoutParentPostInput = {
  data: ForumPostUpdateWithoutParentPostInput;
  where: ForumPostWhereUniqueInput;
};

export type ForumPostUpdateWithWhereUniqueWithoutUserInput = {
  data: ForumPostUpdateWithoutUserInput;
  where: ForumPostWhereUniqueInput;
};

export type ForumPostUpdateWithoutAssetInput = {
  ForumReaction?: InputMaybe<ForumReactionUpdateManyWithoutPostInput>;
  UserForumReaction?: InputMaybe<UserForumReactionUpdateManyWithoutPostInput>;
  bookmarks?: InputMaybe<ForumPostBookmarkUpdateManyWithoutPostInput>;
  category?: InputMaybe<CategoryUpdateOneRequiredWithoutForumPostsInput>;
  commentCount?: InputMaybe<IntFieldUpdateOperationsInput>;
  comments?: InputMaybe<ForumPostUpdateManyWithoutParentPostInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deleted?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isSubComment?: InputMaybe<BoolFieldUpdateOperationsInput>;
  parentPost?: InputMaybe<ForumPostUpdateOneWithoutCommentsInput>;
  reportCount?: InputMaybe<IntFieldUpdateOperationsInput>;
  reports?: InputMaybe<ForumReportUpdateManyWithoutPostInput>;
  text?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutForumPostsInput>;
};

export type ForumPostUpdateWithoutBookmarksInput = {
  Asset?: InputMaybe<AssetUpdateManyWithoutForumPostInput>;
  ForumReaction?: InputMaybe<ForumReactionUpdateManyWithoutPostInput>;
  UserForumReaction?: InputMaybe<UserForumReactionUpdateManyWithoutPostInput>;
  category?: InputMaybe<CategoryUpdateOneRequiredWithoutForumPostsInput>;
  commentCount?: InputMaybe<IntFieldUpdateOperationsInput>;
  comments?: InputMaybe<ForumPostUpdateManyWithoutParentPostInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deleted?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isSubComment?: InputMaybe<BoolFieldUpdateOperationsInput>;
  parentPost?: InputMaybe<ForumPostUpdateOneWithoutCommentsInput>;
  reportCount?: InputMaybe<IntFieldUpdateOperationsInput>;
  reports?: InputMaybe<ForumReportUpdateManyWithoutPostInput>;
  text?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutForumPostsInput>;
};

export type ForumPostUpdateWithoutCategoryInput = {
  Asset?: InputMaybe<AssetUpdateManyWithoutForumPostInput>;
  ForumReaction?: InputMaybe<ForumReactionUpdateManyWithoutPostInput>;
  UserForumReaction?: InputMaybe<UserForumReactionUpdateManyWithoutPostInput>;
  bookmarks?: InputMaybe<ForumPostBookmarkUpdateManyWithoutPostInput>;
  commentCount?: InputMaybe<IntFieldUpdateOperationsInput>;
  comments?: InputMaybe<ForumPostUpdateManyWithoutParentPostInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deleted?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isSubComment?: InputMaybe<BoolFieldUpdateOperationsInput>;
  parentPost?: InputMaybe<ForumPostUpdateOneWithoutCommentsInput>;
  reportCount?: InputMaybe<IntFieldUpdateOperationsInput>;
  reports?: InputMaybe<ForumReportUpdateManyWithoutPostInput>;
  text?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutForumPostsInput>;
};

export type ForumPostUpdateWithoutCommentsInput = {
  Asset?: InputMaybe<AssetUpdateManyWithoutForumPostInput>;
  ForumReaction?: InputMaybe<ForumReactionUpdateManyWithoutPostInput>;
  UserForumReaction?: InputMaybe<UserForumReactionUpdateManyWithoutPostInput>;
  bookmarks?: InputMaybe<ForumPostBookmarkUpdateManyWithoutPostInput>;
  category?: InputMaybe<CategoryUpdateOneRequiredWithoutForumPostsInput>;
  commentCount?: InputMaybe<IntFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deleted?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isSubComment?: InputMaybe<BoolFieldUpdateOperationsInput>;
  parentPost?: InputMaybe<ForumPostUpdateOneWithoutCommentsInput>;
  reportCount?: InputMaybe<IntFieldUpdateOperationsInput>;
  reports?: InputMaybe<ForumReportUpdateManyWithoutPostInput>;
  text?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutForumPostsInput>;
};

export type ForumPostUpdateWithoutForumReactionInput = {
  Asset?: InputMaybe<AssetUpdateManyWithoutForumPostInput>;
  UserForumReaction?: InputMaybe<UserForumReactionUpdateManyWithoutPostInput>;
  bookmarks?: InputMaybe<ForumPostBookmarkUpdateManyWithoutPostInput>;
  category?: InputMaybe<CategoryUpdateOneRequiredWithoutForumPostsInput>;
  commentCount?: InputMaybe<IntFieldUpdateOperationsInput>;
  comments?: InputMaybe<ForumPostUpdateManyWithoutParentPostInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deleted?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isSubComment?: InputMaybe<BoolFieldUpdateOperationsInput>;
  parentPost?: InputMaybe<ForumPostUpdateOneWithoutCommentsInput>;
  reportCount?: InputMaybe<IntFieldUpdateOperationsInput>;
  reports?: InputMaybe<ForumReportUpdateManyWithoutPostInput>;
  text?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutForumPostsInput>;
};

export type ForumPostUpdateWithoutParentPostInput = {
  Asset?: InputMaybe<AssetUpdateManyWithoutForumPostInput>;
  ForumReaction?: InputMaybe<ForumReactionUpdateManyWithoutPostInput>;
  UserForumReaction?: InputMaybe<UserForumReactionUpdateManyWithoutPostInput>;
  bookmarks?: InputMaybe<ForumPostBookmarkUpdateManyWithoutPostInput>;
  category?: InputMaybe<CategoryUpdateOneRequiredWithoutForumPostsInput>;
  commentCount?: InputMaybe<IntFieldUpdateOperationsInput>;
  comments?: InputMaybe<ForumPostUpdateManyWithoutParentPostInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deleted?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isSubComment?: InputMaybe<BoolFieldUpdateOperationsInput>;
  reportCount?: InputMaybe<IntFieldUpdateOperationsInput>;
  reports?: InputMaybe<ForumReportUpdateManyWithoutPostInput>;
  text?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutForumPostsInput>;
};

export type ForumPostUpdateWithoutReportsInput = {
  Asset?: InputMaybe<AssetUpdateManyWithoutForumPostInput>;
  ForumReaction?: InputMaybe<ForumReactionUpdateManyWithoutPostInput>;
  UserForumReaction?: InputMaybe<UserForumReactionUpdateManyWithoutPostInput>;
  bookmarks?: InputMaybe<ForumPostBookmarkUpdateManyWithoutPostInput>;
  category?: InputMaybe<CategoryUpdateOneRequiredWithoutForumPostsInput>;
  commentCount?: InputMaybe<IntFieldUpdateOperationsInput>;
  comments?: InputMaybe<ForumPostUpdateManyWithoutParentPostInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deleted?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isSubComment?: InputMaybe<BoolFieldUpdateOperationsInput>;
  parentPost?: InputMaybe<ForumPostUpdateOneWithoutCommentsInput>;
  reportCount?: InputMaybe<IntFieldUpdateOperationsInput>;
  text?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutForumPostsInput>;
};

export type ForumPostUpdateWithoutUserForumReactionInput = {
  Asset?: InputMaybe<AssetUpdateManyWithoutForumPostInput>;
  ForumReaction?: InputMaybe<ForumReactionUpdateManyWithoutPostInput>;
  bookmarks?: InputMaybe<ForumPostBookmarkUpdateManyWithoutPostInput>;
  category?: InputMaybe<CategoryUpdateOneRequiredWithoutForumPostsInput>;
  commentCount?: InputMaybe<IntFieldUpdateOperationsInput>;
  comments?: InputMaybe<ForumPostUpdateManyWithoutParentPostInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deleted?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isSubComment?: InputMaybe<BoolFieldUpdateOperationsInput>;
  parentPost?: InputMaybe<ForumPostUpdateOneWithoutCommentsInput>;
  reportCount?: InputMaybe<IntFieldUpdateOperationsInput>;
  reports?: InputMaybe<ForumReportUpdateManyWithoutPostInput>;
  text?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutForumPostsInput>;
};

export type ForumPostUpdateWithoutUserInput = {
  Asset?: InputMaybe<AssetUpdateManyWithoutForumPostInput>;
  ForumReaction?: InputMaybe<ForumReactionUpdateManyWithoutPostInput>;
  UserForumReaction?: InputMaybe<UserForumReactionUpdateManyWithoutPostInput>;
  bookmarks?: InputMaybe<ForumPostBookmarkUpdateManyWithoutPostInput>;
  category?: InputMaybe<CategoryUpdateOneRequiredWithoutForumPostsInput>;
  commentCount?: InputMaybe<IntFieldUpdateOperationsInput>;
  comments?: InputMaybe<ForumPostUpdateManyWithoutParentPostInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deleted?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isSubComment?: InputMaybe<BoolFieldUpdateOperationsInput>;
  parentPost?: InputMaybe<ForumPostUpdateOneWithoutCommentsInput>;
  reportCount?: InputMaybe<IntFieldUpdateOperationsInput>;
  reports?: InputMaybe<ForumReportUpdateManyWithoutPostInput>;
  text?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type ForumPostUpsertWithWhereUniqueWithoutCategoryInput = {
  create: ForumPostCreateWithoutCategoryInput;
  update: ForumPostUpdateWithoutCategoryInput;
  where: ForumPostWhereUniqueInput;
};

export type ForumPostUpsertWithWhereUniqueWithoutParentPostInput = {
  create: ForumPostCreateWithoutParentPostInput;
  update: ForumPostUpdateWithoutParentPostInput;
  where: ForumPostWhereUniqueInput;
};

export type ForumPostUpsertWithWhereUniqueWithoutUserInput = {
  create: ForumPostCreateWithoutUserInput;
  update: ForumPostUpdateWithoutUserInput;
  where: ForumPostWhereUniqueInput;
};

export type ForumPostUpsertWithoutAssetInput = {
  create: ForumPostCreateWithoutAssetInput;
  update: ForumPostUpdateWithoutAssetInput;
};

export type ForumPostUpsertWithoutBookmarksInput = {
  create: ForumPostCreateWithoutBookmarksInput;
  update: ForumPostUpdateWithoutBookmarksInput;
};

export type ForumPostUpsertWithoutCommentsInput = {
  create: ForumPostCreateWithoutCommentsInput;
  update: ForumPostUpdateWithoutCommentsInput;
};

export type ForumPostUpsertWithoutForumReactionInput = {
  create: ForumPostCreateWithoutForumReactionInput;
  update: ForumPostUpdateWithoutForumReactionInput;
};

export type ForumPostUpsertWithoutReportsInput = {
  create: ForumPostCreateWithoutReportsInput;
  update: ForumPostUpdateWithoutReportsInput;
};

export type ForumPostUpsertWithoutUserForumReactionInput = {
  create: ForumPostCreateWithoutUserForumReactionInput;
  update: ForumPostUpdateWithoutUserForumReactionInput;
};

export type ForumPostWhereInput = {
  AND?: InputMaybe<Array<ForumPostWhereInput>>;
  Asset?: InputMaybe<AssetListRelationFilter>;
  ForumReaction?: InputMaybe<ForumReactionListRelationFilter>;
  NOT?: InputMaybe<Array<ForumPostWhereInput>>;
  OR?: InputMaybe<Array<ForumPostWhereInput>>;
  UserForumReaction?: InputMaybe<UserForumReactionListRelationFilter>;
  bookmarks?: InputMaybe<ForumPostBookmarkListRelationFilter>;
  category?: InputMaybe<CategoryRelationFilter>;
  categoryId?: InputMaybe<StringFilter>;
  commentCount?: InputMaybe<IntFilter>;
  comments?: InputMaybe<ForumPostListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  deleted?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<StringFilter>;
  isSubComment?: InputMaybe<BoolFilter>;
  parentPost?: InputMaybe<ForumPostRelationFilter>;
  parentPostId?: InputMaybe<StringNullableFilter>;
  reportCount?: InputMaybe<IntFilter>;
  reports?: InputMaybe<ForumReportListRelationFilter>;
  text?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type ForumPostWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type ForumReaction = {
  __typename?: 'ForumReaction';
  UserForumReaction?: Maybe<Array<UserForumReaction>>;
  _count: ForumReactionCount;
  count: Scalars['Int'];
  emoji: ReactionEmoji;
  id: Scalars['ID'];
  post: ForumPost;
  postId: Scalars['String'];
};

export type ForumReactionCount = {
  __typename?: 'ForumReactionCount';
  UserForumReaction: Scalars['Int'];
};

export type ForumReactionCreateManyPostInput = {
  count?: InputMaybe<Scalars['Int']>;
  emoji: ReactionEmoji;
  id?: InputMaybe<Scalars['String']>;
};

export type ForumReactionCreateManyPostInputEnvelope = {
  data: Array<ForumReactionCreateManyPostInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ForumReactionCreateNestedManyWithoutPostInput = {
  connect?: InputMaybe<Array<ForumReactionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ForumReactionCreateOrConnectWithoutPostInput>>;
  create?: InputMaybe<Array<ForumReactionCreateWithoutPostInput>>;
  createMany?: InputMaybe<ForumReactionCreateManyPostInputEnvelope>;
};

export type ForumReactionCreateNestedOneWithoutUserForumReactionInput = {
  connect?: InputMaybe<ForumReactionWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ForumReactionCreateOrConnectWithoutUserForumReactionInput>;
  create?: InputMaybe<ForumReactionCreateWithoutUserForumReactionInput>;
};

export type ForumReactionCreateOrConnectWithoutPostInput = {
  create: ForumReactionCreateWithoutPostInput;
  where: ForumReactionWhereUniqueInput;
};

export type ForumReactionCreateOrConnectWithoutUserForumReactionInput = {
  create: ForumReactionCreateWithoutUserForumReactionInput;
  where: ForumReactionWhereUniqueInput;
};

export type ForumReactionCreateWithoutPostInput = {
  UserForumReaction?: InputMaybe<UserForumReactionCreateNestedManyWithoutReactionInput>;
  count?: InputMaybe<Scalars['Int']>;
  emoji: ReactionEmoji;
  id?: InputMaybe<Scalars['String']>;
};

export type ForumReactionCreateWithoutUserForumReactionInput = {
  count?: InputMaybe<Scalars['Int']>;
  emoji: ReactionEmoji;
  id?: InputMaybe<Scalars['String']>;
  post: ForumPostCreateNestedOneWithoutForumReactionInput;
};

export type ForumReactionListRelationFilter = {
  every?: InputMaybe<ForumReactionWhereInput>;
  none?: InputMaybe<ForumReactionWhereInput>;
  some?: InputMaybe<ForumReactionWhereInput>;
};

export type ForumReactionOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type ForumReactionPostIdEmojiCompoundUniqueInput = {
  emoji: ReactionEmoji;
  postId: Scalars['String'];
};

export type ForumReactionRelationFilter = {
  is?: InputMaybe<ForumReactionWhereInput>;
  isNot?: InputMaybe<ForumReactionWhereInput>;
};

export type ForumReactionScalarWhereInput = {
  AND?: InputMaybe<Array<ForumReactionScalarWhereInput>>;
  NOT?: InputMaybe<Array<ForumReactionScalarWhereInput>>;
  OR?: InputMaybe<Array<ForumReactionScalarWhereInput>>;
  count?: InputMaybe<IntFilter>;
  emoji?: InputMaybe<EnumReactionEmojiFilter>;
  id?: InputMaybe<StringFilter>;
  postId?: InputMaybe<StringFilter>;
};

export type ForumReactionUpdateManyMutationInput = {
  count?: InputMaybe<IntFieldUpdateOperationsInput>;
  emoji?: InputMaybe<EnumReactionEmojiFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type ForumReactionUpdateManyWithWhereWithoutPostInput = {
  data: ForumReactionUpdateManyMutationInput;
  where: ForumReactionScalarWhereInput;
};

export type ForumReactionUpdateManyWithoutPostInput = {
  connect?: InputMaybe<Array<ForumReactionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ForumReactionCreateOrConnectWithoutPostInput>>;
  create?: InputMaybe<Array<ForumReactionCreateWithoutPostInput>>;
  createMany?: InputMaybe<ForumReactionCreateManyPostInputEnvelope>;
  delete?: InputMaybe<Array<ForumReactionWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ForumReactionScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ForumReactionWhereUniqueInput>>;
  set?: InputMaybe<Array<ForumReactionWhereUniqueInput>>;
  update?: InputMaybe<Array<ForumReactionUpdateWithWhereUniqueWithoutPostInput>>;
  updateMany?: InputMaybe<Array<ForumReactionUpdateManyWithWhereWithoutPostInput>>;
  upsert?: InputMaybe<Array<ForumReactionUpsertWithWhereUniqueWithoutPostInput>>;
};

export type ForumReactionUpdateOneRequiredWithoutUserForumReactionInput = {
  connect?: InputMaybe<ForumReactionWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ForumReactionCreateOrConnectWithoutUserForumReactionInput>;
  create?: InputMaybe<ForumReactionCreateWithoutUserForumReactionInput>;
  update?: InputMaybe<ForumReactionUpdateWithoutUserForumReactionInput>;
  upsert?: InputMaybe<ForumReactionUpsertWithoutUserForumReactionInput>;
};

export type ForumReactionUpdateWithWhereUniqueWithoutPostInput = {
  data: ForumReactionUpdateWithoutPostInput;
  where: ForumReactionWhereUniqueInput;
};

export type ForumReactionUpdateWithoutPostInput = {
  UserForumReaction?: InputMaybe<UserForumReactionUpdateManyWithoutReactionInput>;
  count?: InputMaybe<IntFieldUpdateOperationsInput>;
  emoji?: InputMaybe<EnumReactionEmojiFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type ForumReactionUpdateWithoutUserForumReactionInput = {
  count?: InputMaybe<IntFieldUpdateOperationsInput>;
  emoji?: InputMaybe<EnumReactionEmojiFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  post?: InputMaybe<ForumPostUpdateOneRequiredWithoutForumReactionInput>;
};

export type ForumReactionUpsertWithWhereUniqueWithoutPostInput = {
  create: ForumReactionCreateWithoutPostInput;
  update: ForumReactionUpdateWithoutPostInput;
  where: ForumReactionWhereUniqueInput;
};

export type ForumReactionUpsertWithoutUserForumReactionInput = {
  create: ForumReactionCreateWithoutUserForumReactionInput;
  update: ForumReactionUpdateWithoutUserForumReactionInput;
};

export type ForumReactionWhereInput = {
  AND?: InputMaybe<Array<ForumReactionWhereInput>>;
  NOT?: InputMaybe<Array<ForumReactionWhereInput>>;
  OR?: InputMaybe<Array<ForumReactionWhereInput>>;
  UserForumReaction?: InputMaybe<UserForumReactionListRelationFilter>;
  count?: InputMaybe<IntFilter>;
  emoji?: InputMaybe<EnumReactionEmojiFilter>;
  id?: InputMaybe<StringFilter>;
  post?: InputMaybe<ForumPostRelationFilter>;
  postId?: InputMaybe<StringFilter>;
};

export type ForumReactionWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  postId_emoji?: InputMaybe<ForumReactionPostIdEmojiCompoundUniqueInput>;
};

export type ForumReport = {
  __typename?: 'ForumReport';
  id: Scalars['ID'];
  post: ForumPost;
  postId: Scalars['String'];
  user: User;
  userId: Scalars['String'];
};

export type ForumReportCreateInput = {
  id?: InputMaybe<Scalars['String']>;
  post: ForumPostCreateNestedOneWithoutReportsInput;
  user: UserCreateNestedOneWithoutForumReportsInput;
};

export type ForumReportCreateManyPostInput = {
  id?: InputMaybe<Scalars['String']>;
  userId: Scalars['String'];
};

export type ForumReportCreateManyPostInputEnvelope = {
  data: Array<ForumReportCreateManyPostInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ForumReportCreateManyUserInput = {
  id?: InputMaybe<Scalars['String']>;
  postId: Scalars['String'];
};

export type ForumReportCreateManyUserInputEnvelope = {
  data: Array<ForumReportCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ForumReportCreateNestedManyWithoutPostInput = {
  connect?: InputMaybe<Array<ForumReportWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ForumReportCreateOrConnectWithoutPostInput>>;
  create?: InputMaybe<Array<ForumReportCreateWithoutPostInput>>;
  createMany?: InputMaybe<ForumReportCreateManyPostInputEnvelope>;
};

export type ForumReportCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<ForumReportWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ForumReportCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<ForumReportCreateWithoutUserInput>>;
  createMany?: InputMaybe<ForumReportCreateManyUserInputEnvelope>;
};

export type ForumReportCreateOrConnectWithoutPostInput = {
  create: ForumReportCreateWithoutPostInput;
  where: ForumReportWhereUniqueInput;
};

export type ForumReportCreateOrConnectWithoutUserInput = {
  create: ForumReportCreateWithoutUserInput;
  where: ForumReportWhereUniqueInput;
};

export type ForumReportCreateWithoutPostInput = {
  id?: InputMaybe<Scalars['String']>;
  user: UserCreateNestedOneWithoutForumReportsInput;
};

export type ForumReportCreateWithoutUserInput = {
  id?: InputMaybe<Scalars['String']>;
  post: ForumPostCreateNestedOneWithoutReportsInput;
};

export type ForumReportListRelationFilter = {
  every?: InputMaybe<ForumReportWhereInput>;
  none?: InputMaybe<ForumReportWhereInput>;
  some?: InputMaybe<ForumReportWhereInput>;
};

export type ForumReportOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export enum ForumReportOrderByRelevanceFieldEnum {
  Id = 'id',
  PostId = 'postId',
  UserId = 'userId'
}

export type ForumReportOrderByRelevanceInput = {
  fields: Array<ForumReportOrderByRelevanceFieldEnum>;
  search: Scalars['String'];
  sort: SortOrder;
};

export type ForumReportOrderByWithRelationAndSearchRelevanceInput = {
  _relevance?: InputMaybe<ForumReportOrderByRelevanceInput>;
  id?: InputMaybe<SortOrder>;
  post?: InputMaybe<ForumPostOrderByWithRelationAndSearchRelevanceInput>;
  postId?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationAndSearchRelevanceInput>;
  userId?: InputMaybe<SortOrder>;
};

export type ForumReportPostIdUserIdCompoundUniqueInput = {
  postId: Scalars['String'];
  userId: Scalars['String'];
};

export enum ForumReportScalarFieldEnum {
  Id = 'id',
  PostId = 'postId',
  UserId = 'userId'
}

export type ForumReportScalarWhereInput = {
  AND?: InputMaybe<Array<ForumReportScalarWhereInput>>;
  NOT?: InputMaybe<Array<ForumReportScalarWhereInput>>;
  OR?: InputMaybe<Array<ForumReportScalarWhereInput>>;
  id?: InputMaybe<StringFilter>;
  postId?: InputMaybe<StringFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type ForumReportUpdateManyMutationInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type ForumReportUpdateManyWithWhereWithoutPostInput = {
  data: ForumReportUpdateManyMutationInput;
  where: ForumReportScalarWhereInput;
};

export type ForumReportUpdateManyWithWhereWithoutUserInput = {
  data: ForumReportUpdateManyMutationInput;
  where: ForumReportScalarWhereInput;
};

export type ForumReportUpdateManyWithoutPostInput = {
  connect?: InputMaybe<Array<ForumReportWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ForumReportCreateOrConnectWithoutPostInput>>;
  create?: InputMaybe<Array<ForumReportCreateWithoutPostInput>>;
  createMany?: InputMaybe<ForumReportCreateManyPostInputEnvelope>;
  delete?: InputMaybe<Array<ForumReportWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ForumReportScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ForumReportWhereUniqueInput>>;
  set?: InputMaybe<Array<ForumReportWhereUniqueInput>>;
  update?: InputMaybe<Array<ForumReportUpdateWithWhereUniqueWithoutPostInput>>;
  updateMany?: InputMaybe<Array<ForumReportUpdateManyWithWhereWithoutPostInput>>;
  upsert?: InputMaybe<Array<ForumReportUpsertWithWhereUniqueWithoutPostInput>>;
};

export type ForumReportUpdateManyWithoutUserInput = {
  connect?: InputMaybe<Array<ForumReportWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ForumReportCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<ForumReportCreateWithoutUserInput>>;
  createMany?: InputMaybe<ForumReportCreateManyUserInputEnvelope>;
  delete?: InputMaybe<Array<ForumReportWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ForumReportScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ForumReportWhereUniqueInput>>;
  set?: InputMaybe<Array<ForumReportWhereUniqueInput>>;
  update?: InputMaybe<Array<ForumReportUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<ForumReportUpdateManyWithWhereWithoutUserInput>>;
  upsert?: InputMaybe<Array<ForumReportUpsertWithWhereUniqueWithoutUserInput>>;
};

export type ForumReportUpdateWithWhereUniqueWithoutPostInput = {
  data: ForumReportUpdateWithoutPostInput;
  where: ForumReportWhereUniqueInput;
};

export type ForumReportUpdateWithWhereUniqueWithoutUserInput = {
  data: ForumReportUpdateWithoutUserInput;
  where: ForumReportWhereUniqueInput;
};

export type ForumReportUpdateWithoutPostInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutForumReportsInput>;
};

export type ForumReportUpdateWithoutUserInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  post?: InputMaybe<ForumPostUpdateOneRequiredWithoutReportsInput>;
};

export type ForumReportUpsertWithWhereUniqueWithoutPostInput = {
  create: ForumReportCreateWithoutPostInput;
  update: ForumReportUpdateWithoutPostInput;
  where: ForumReportWhereUniqueInput;
};

export type ForumReportUpsertWithWhereUniqueWithoutUserInput = {
  create: ForumReportCreateWithoutUserInput;
  update: ForumReportUpdateWithoutUserInput;
  where: ForumReportWhereUniqueInput;
};

export type ForumReportWhereInput = {
  AND?: InputMaybe<Array<ForumReportWhereInput>>;
  NOT?: InputMaybe<Array<ForumReportWhereInput>>;
  OR?: InputMaybe<Array<ForumReportWhereInput>>;
  id?: InputMaybe<StringFilter>;
  post?: InputMaybe<ForumPostRelationFilter>;
  postId?: InputMaybe<StringFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type ForumReportWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  postId_userId?: InputMaybe<ForumReportPostIdUserIdCompoundUniqueInput>;
};

export type FriendShip = {
  __typename?: 'FriendShip';
  createdAt: Scalars['Date'];
  friendStatus: FriendStatus;
  requestee: Student;
  requesteeId: Scalars['String'];
  requester: Student;
  requesterId: Scalars['String'];
};

export type FriendShipCreateManyRequesteeInput = {
  createdAt?: InputMaybe<Scalars['Date']>;
  friendStatus?: InputMaybe<FriendStatus>;
  requesterId: Scalars['String'];
};

export type FriendShipCreateManyRequesteeInputEnvelope = {
  data: Array<FriendShipCreateManyRequesteeInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type FriendShipCreateManyRequesterInput = {
  createdAt?: InputMaybe<Scalars['Date']>;
  friendStatus?: InputMaybe<FriendStatus>;
  requesteeId: Scalars['String'];
};

export type FriendShipCreateManyRequesterInputEnvelope = {
  data: Array<FriendShipCreateManyRequesterInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type FriendShipCreateNestedManyWithoutRequesteeInput = {
  connect?: InputMaybe<Array<FriendShipWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<FriendShipCreateOrConnectWithoutRequesteeInput>>;
  create?: InputMaybe<Array<FriendShipCreateWithoutRequesteeInput>>;
  createMany?: InputMaybe<FriendShipCreateManyRequesteeInputEnvelope>;
};

export type FriendShipCreateNestedManyWithoutRequesterInput = {
  connect?: InputMaybe<Array<FriendShipWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<FriendShipCreateOrConnectWithoutRequesterInput>>;
  create?: InputMaybe<Array<FriendShipCreateWithoutRequesterInput>>;
  createMany?: InputMaybe<FriendShipCreateManyRequesterInputEnvelope>;
};

export type FriendShipCreateOrConnectWithoutRequesteeInput = {
  create: FriendShipCreateWithoutRequesteeInput;
  where: FriendShipWhereUniqueInput;
};

export type FriendShipCreateOrConnectWithoutRequesterInput = {
  create: FriendShipCreateWithoutRequesterInput;
  where: FriendShipWhereUniqueInput;
};

export type FriendShipCreateWithoutRequesteeInput = {
  createdAt?: InputMaybe<Scalars['Date']>;
  friendStatus?: InputMaybe<FriendStatus>;
  requester: StudentCreateNestedOneWithoutFriendsRequesterInput;
};

export type FriendShipCreateWithoutRequesterInput = {
  createdAt?: InputMaybe<Scalars['Date']>;
  friendStatus?: InputMaybe<FriendStatus>;
  requestee: StudentCreateNestedOneWithoutFriendsRequesteeInput;
};

export type FriendShipListRelationFilter = {
  every?: InputMaybe<FriendShipWhereInput>;
  none?: InputMaybe<FriendShipWhereInput>;
  some?: InputMaybe<FriendShipWhereInput>;
};

export type FriendShipOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export enum FriendShipOrderByRelevanceFieldEnum {
  RequesteeId = 'requesteeId',
  RequesterId = 'requesterId'
}

export type FriendShipOrderByRelevanceInput = {
  fields: Array<FriendShipOrderByRelevanceFieldEnum>;
  search: Scalars['String'];
  sort: SortOrder;
};

export type FriendShipOrderByWithRelationAndSearchRelevanceInput = {
  _relevance?: InputMaybe<FriendShipOrderByRelevanceInput>;
  createdAt?: InputMaybe<SortOrder>;
  friendStatus?: InputMaybe<SortOrder>;
  requestee?: InputMaybe<StudentOrderByWithRelationAndSearchRelevanceInput>;
  requesteeId?: InputMaybe<SortOrder>;
  requester?: InputMaybe<StudentOrderByWithRelationAndSearchRelevanceInput>;
  requesterId?: InputMaybe<SortOrder>;
};

export type FriendShipRequesterIdRequesteeIdCompoundUniqueInput = {
  requesteeId: Scalars['String'];
  requesterId: Scalars['String'];
};

export enum FriendShipScalarFieldEnum {
  CreatedAt = 'createdAt',
  FriendStatus = 'friendStatus',
  RequesteeId = 'requesteeId',
  RequesterId = 'requesterId'
}

export type FriendShipScalarWhereInput = {
  AND?: InputMaybe<Array<FriendShipScalarWhereInput>>;
  NOT?: InputMaybe<Array<FriendShipScalarWhereInput>>;
  OR?: InputMaybe<Array<FriendShipScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  friendStatus?: InputMaybe<EnumFriendStatusFilter>;
  requesteeId?: InputMaybe<StringFilter>;
  requesterId?: InputMaybe<StringFilter>;
};

export type FriendShipUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  friendStatus?: InputMaybe<EnumFriendStatusFieldUpdateOperationsInput>;
};

export type FriendShipUpdateManyWithWhereWithoutRequesteeInput = {
  data: FriendShipUpdateManyMutationInput;
  where: FriendShipScalarWhereInput;
};

export type FriendShipUpdateManyWithWhereWithoutRequesterInput = {
  data: FriendShipUpdateManyMutationInput;
  where: FriendShipScalarWhereInput;
};

export type FriendShipUpdateManyWithoutRequesteeInput = {
  connect?: InputMaybe<Array<FriendShipWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<FriendShipCreateOrConnectWithoutRequesteeInput>>;
  create?: InputMaybe<Array<FriendShipCreateWithoutRequesteeInput>>;
  createMany?: InputMaybe<FriendShipCreateManyRequesteeInputEnvelope>;
  delete?: InputMaybe<Array<FriendShipWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<FriendShipScalarWhereInput>>;
  disconnect?: InputMaybe<Array<FriendShipWhereUniqueInput>>;
  set?: InputMaybe<Array<FriendShipWhereUniqueInput>>;
  update?: InputMaybe<Array<FriendShipUpdateWithWhereUniqueWithoutRequesteeInput>>;
  updateMany?: InputMaybe<Array<FriendShipUpdateManyWithWhereWithoutRequesteeInput>>;
  upsert?: InputMaybe<Array<FriendShipUpsertWithWhereUniqueWithoutRequesteeInput>>;
};

export type FriendShipUpdateManyWithoutRequesterInput = {
  connect?: InputMaybe<Array<FriendShipWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<FriendShipCreateOrConnectWithoutRequesterInput>>;
  create?: InputMaybe<Array<FriendShipCreateWithoutRequesterInput>>;
  createMany?: InputMaybe<FriendShipCreateManyRequesterInputEnvelope>;
  delete?: InputMaybe<Array<FriendShipWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<FriendShipScalarWhereInput>>;
  disconnect?: InputMaybe<Array<FriendShipWhereUniqueInput>>;
  set?: InputMaybe<Array<FriendShipWhereUniqueInput>>;
  update?: InputMaybe<Array<FriendShipUpdateWithWhereUniqueWithoutRequesterInput>>;
  updateMany?: InputMaybe<Array<FriendShipUpdateManyWithWhereWithoutRequesterInput>>;
  upsert?: InputMaybe<Array<FriendShipUpsertWithWhereUniqueWithoutRequesterInput>>;
};

export type FriendShipUpdateWithWhereUniqueWithoutRequesteeInput = {
  data: FriendShipUpdateWithoutRequesteeInput;
  where: FriendShipWhereUniqueInput;
};

export type FriendShipUpdateWithWhereUniqueWithoutRequesterInput = {
  data: FriendShipUpdateWithoutRequesterInput;
  where: FriendShipWhereUniqueInput;
};

export type FriendShipUpdateWithoutRequesteeInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  friendStatus?: InputMaybe<EnumFriendStatusFieldUpdateOperationsInput>;
  requester?: InputMaybe<StudentUpdateOneRequiredWithoutFriendsRequesterInput>;
};

export type FriendShipUpdateWithoutRequesterInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  friendStatus?: InputMaybe<EnumFriendStatusFieldUpdateOperationsInput>;
  requestee?: InputMaybe<StudentUpdateOneRequiredWithoutFriendsRequesteeInput>;
};

export type FriendShipUpsertWithWhereUniqueWithoutRequesteeInput = {
  create: FriendShipCreateWithoutRequesteeInput;
  update: FriendShipUpdateWithoutRequesteeInput;
  where: FriendShipWhereUniqueInput;
};

export type FriendShipUpsertWithWhereUniqueWithoutRequesterInput = {
  create: FriendShipCreateWithoutRequesterInput;
  update: FriendShipUpdateWithoutRequesterInput;
  where: FriendShipWhereUniqueInput;
};

export type FriendShipWhereInput = {
  AND?: InputMaybe<Array<FriendShipWhereInput>>;
  NOT?: InputMaybe<Array<FriendShipWhereInput>>;
  OR?: InputMaybe<Array<FriendShipWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  friendStatus?: InputMaybe<EnumFriendStatusFilter>;
  requestee?: InputMaybe<StudentRelationFilter>;
  requesteeId?: InputMaybe<StringFilter>;
  requester?: InputMaybe<StudentRelationFilter>;
  requesterId?: InputMaybe<StringFilter>;
};

export type FriendShipWhereUniqueInput = {
  requesterId_requesteeId?: InputMaybe<FriendShipRequesterIdRequesteeIdCompoundUniqueInput>;
};

export enum FriendStatus {
  Accepted = 'ACCEPTED',
  Declined = 'DECLINED',
  Neutral = 'NEUTRAL',
  Pending = 'PENDING'
}

export enum Gender {
  F = 'F',
  M = 'M',
  Others = 'OTHERS'
}

export type HairAvatarAsset = {
  __typename?: 'HairAvatarAsset';
  avatarAssetCatelog: AvatarAssetCatelog;
  avatarAssetCatelogId: Scalars['String'];
  createdAt: Scalars['Date'];
  hairColour: AvatarAssetColour;
  hairColourId: Scalars['String'];
  hairType: HairType;
  id: Scalars['ID'];
  imgUrl: Scalars['String'];
  label: Scalars['String'];
  updatedAt: Scalars['Date'];
};

export type HairAvatarAssetCreateInput = {
  avatarAssetCatelog: AvatarAssetCatelogCreateNestedOneWithoutHairAvatarAssetInput;
  createdAt?: InputMaybe<Scalars['Date']>;
  hairColour: AvatarAssetColourCreateNestedOneWithoutHairAvatarAssetInput;
  hairType: HairType;
  id?: InputMaybe<Scalars['String']>;
  imgUrl: Scalars['String'];
  label: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type HairAvatarAssetCreateManyAvatarAssetCatelogInput = {
  createdAt?: InputMaybe<Scalars['Date']>;
  hairColourId: Scalars['String'];
  hairType: HairType;
  id?: InputMaybe<Scalars['String']>;
  imgUrl: Scalars['String'];
  label: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type HairAvatarAssetCreateManyAvatarAssetCatelogInputEnvelope = {
  data: Array<HairAvatarAssetCreateManyAvatarAssetCatelogInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type HairAvatarAssetCreateManyHairColourInput = {
  avatarAssetCatelogId: Scalars['String'];
  createdAt?: InputMaybe<Scalars['Date']>;
  hairType: HairType;
  id?: InputMaybe<Scalars['String']>;
  imgUrl: Scalars['String'];
  label: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type HairAvatarAssetCreateManyHairColourInputEnvelope = {
  data: Array<HairAvatarAssetCreateManyHairColourInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type HairAvatarAssetCreateManyInput = {
  avatarAssetCatelogId: Scalars['String'];
  createdAt?: InputMaybe<Scalars['Date']>;
  hairColourId: Scalars['String'];
  hairType: HairType;
  id?: InputMaybe<Scalars['String']>;
  imgUrl: Scalars['String'];
  label: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type HairAvatarAssetCreateNestedManyWithoutAvatarAssetCatelogInput = {
  connect?: InputMaybe<Array<HairAvatarAssetWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<HairAvatarAssetCreateOrConnectWithoutAvatarAssetCatelogInput>>;
  create?: InputMaybe<Array<HairAvatarAssetCreateWithoutAvatarAssetCatelogInput>>;
  createMany?: InputMaybe<HairAvatarAssetCreateManyAvatarAssetCatelogInputEnvelope>;
};

export type HairAvatarAssetCreateNestedManyWithoutHairColourInput = {
  connect?: InputMaybe<Array<HairAvatarAssetWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<HairAvatarAssetCreateOrConnectWithoutHairColourInput>>;
  create?: InputMaybe<Array<HairAvatarAssetCreateWithoutHairColourInput>>;
  createMany?: InputMaybe<HairAvatarAssetCreateManyHairColourInputEnvelope>;
};

export type HairAvatarAssetCreateOrConnectWithoutAvatarAssetCatelogInput = {
  create: HairAvatarAssetCreateWithoutAvatarAssetCatelogInput;
  where: HairAvatarAssetWhereUniqueInput;
};

export type HairAvatarAssetCreateOrConnectWithoutHairColourInput = {
  create: HairAvatarAssetCreateWithoutHairColourInput;
  where: HairAvatarAssetWhereUniqueInput;
};

export type HairAvatarAssetCreateWithoutAvatarAssetCatelogInput = {
  createdAt?: InputMaybe<Scalars['Date']>;
  hairColour: AvatarAssetColourCreateNestedOneWithoutHairAvatarAssetInput;
  hairType: HairType;
  id?: InputMaybe<Scalars['String']>;
  imgUrl: Scalars['String'];
  label: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type HairAvatarAssetCreateWithoutHairColourInput = {
  avatarAssetCatelog: AvatarAssetCatelogCreateNestedOneWithoutHairAvatarAssetInput;
  createdAt?: InputMaybe<Scalars['Date']>;
  hairType: HairType;
  id?: InputMaybe<Scalars['String']>;
  imgUrl: Scalars['String'];
  label: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type HairAvatarAssetListRelationFilter = {
  every?: InputMaybe<HairAvatarAssetWhereInput>;
  none?: InputMaybe<HairAvatarAssetWhereInput>;
  some?: InputMaybe<HairAvatarAssetWhereInput>;
};

export type HairAvatarAssetOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export enum HairAvatarAssetOrderByRelevanceFieldEnum {
  AvatarAssetCatelogId = 'avatarAssetCatelogId',
  HairColourId = 'hairColourId',
  Id = 'id',
  ImgUrl = 'imgUrl',
  Label = 'label'
}

export type HairAvatarAssetOrderByRelevanceInput = {
  fields: Array<HairAvatarAssetOrderByRelevanceFieldEnum>;
  search: Scalars['String'];
  sort: SortOrder;
};

export type HairAvatarAssetOrderByWithRelationAndSearchRelevanceInput = {
  _relevance?: InputMaybe<HairAvatarAssetOrderByRelevanceInput>;
  avatarAssetCatelog?: InputMaybe<AvatarAssetCatelogOrderByWithRelationAndSearchRelevanceInput>;
  avatarAssetCatelogId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  hairColour?: InputMaybe<AvatarAssetColourOrderByWithRelationAndSearchRelevanceInput>;
  hairColourId?: InputMaybe<SortOrder>;
  hairType?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  imgUrl?: InputMaybe<SortOrder>;
  label?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum HairAvatarAssetScalarFieldEnum {
  AvatarAssetCatelogId = 'avatarAssetCatelogId',
  CreatedAt = 'createdAt',
  HairColourId = 'hairColourId',
  HairType = 'hairType',
  Id = 'id',
  ImgUrl = 'imgUrl',
  Label = 'label',
  UpdatedAt = 'updatedAt'
}

export type HairAvatarAssetScalarWhereInput = {
  AND?: InputMaybe<Array<HairAvatarAssetScalarWhereInput>>;
  NOT?: InputMaybe<Array<HairAvatarAssetScalarWhereInput>>;
  OR?: InputMaybe<Array<HairAvatarAssetScalarWhereInput>>;
  avatarAssetCatelogId?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  hairColourId?: InputMaybe<StringFilter>;
  hairType?: InputMaybe<EnumHairTypeFilter>;
  id?: InputMaybe<StringFilter>;
  imgUrl?: InputMaybe<StringFilter>;
  label?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type HairAvatarAssetUpdateInput = {
  avatarAssetCatelog?: InputMaybe<AvatarAssetCatelogUpdateOneRequiredWithoutHairAvatarAssetInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  hairColour?: InputMaybe<AvatarAssetColourUpdateOneRequiredWithoutHairAvatarAssetInput>;
  hairType?: InputMaybe<EnumHairTypeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  imgUrl?: InputMaybe<StringFieldUpdateOperationsInput>;
  label?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type HairAvatarAssetUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  hairType?: InputMaybe<EnumHairTypeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  imgUrl?: InputMaybe<StringFieldUpdateOperationsInput>;
  label?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type HairAvatarAssetUpdateManyWithWhereWithoutAvatarAssetCatelogInput = {
  data: HairAvatarAssetUpdateManyMutationInput;
  where: HairAvatarAssetScalarWhereInput;
};

export type HairAvatarAssetUpdateManyWithWhereWithoutHairColourInput = {
  data: HairAvatarAssetUpdateManyMutationInput;
  where: HairAvatarAssetScalarWhereInput;
};

export type HairAvatarAssetUpdateManyWithoutAvatarAssetCatelogInput = {
  connect?: InputMaybe<Array<HairAvatarAssetWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<HairAvatarAssetCreateOrConnectWithoutAvatarAssetCatelogInput>>;
  create?: InputMaybe<Array<HairAvatarAssetCreateWithoutAvatarAssetCatelogInput>>;
  createMany?: InputMaybe<HairAvatarAssetCreateManyAvatarAssetCatelogInputEnvelope>;
  delete?: InputMaybe<Array<HairAvatarAssetWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<HairAvatarAssetScalarWhereInput>>;
  disconnect?: InputMaybe<Array<HairAvatarAssetWhereUniqueInput>>;
  set?: InputMaybe<Array<HairAvatarAssetWhereUniqueInput>>;
  update?: InputMaybe<Array<HairAvatarAssetUpdateWithWhereUniqueWithoutAvatarAssetCatelogInput>>;
  updateMany?: InputMaybe<Array<HairAvatarAssetUpdateManyWithWhereWithoutAvatarAssetCatelogInput>>;
  upsert?: InputMaybe<Array<HairAvatarAssetUpsertWithWhereUniqueWithoutAvatarAssetCatelogInput>>;
};

export type HairAvatarAssetUpdateManyWithoutHairColourInput = {
  connect?: InputMaybe<Array<HairAvatarAssetWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<HairAvatarAssetCreateOrConnectWithoutHairColourInput>>;
  create?: InputMaybe<Array<HairAvatarAssetCreateWithoutHairColourInput>>;
  createMany?: InputMaybe<HairAvatarAssetCreateManyHairColourInputEnvelope>;
  delete?: InputMaybe<Array<HairAvatarAssetWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<HairAvatarAssetScalarWhereInput>>;
  disconnect?: InputMaybe<Array<HairAvatarAssetWhereUniqueInput>>;
  set?: InputMaybe<Array<HairAvatarAssetWhereUniqueInput>>;
  update?: InputMaybe<Array<HairAvatarAssetUpdateWithWhereUniqueWithoutHairColourInput>>;
  updateMany?: InputMaybe<Array<HairAvatarAssetUpdateManyWithWhereWithoutHairColourInput>>;
  upsert?: InputMaybe<Array<HairAvatarAssetUpsertWithWhereUniqueWithoutHairColourInput>>;
};

export type HairAvatarAssetUpdateWithWhereUniqueWithoutAvatarAssetCatelogInput = {
  data: HairAvatarAssetUpdateWithoutAvatarAssetCatelogInput;
  where: HairAvatarAssetWhereUniqueInput;
};

export type HairAvatarAssetUpdateWithWhereUniqueWithoutHairColourInput = {
  data: HairAvatarAssetUpdateWithoutHairColourInput;
  where: HairAvatarAssetWhereUniqueInput;
};

export type HairAvatarAssetUpdateWithoutAvatarAssetCatelogInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  hairColour?: InputMaybe<AvatarAssetColourUpdateOneRequiredWithoutHairAvatarAssetInput>;
  hairType?: InputMaybe<EnumHairTypeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  imgUrl?: InputMaybe<StringFieldUpdateOperationsInput>;
  label?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type HairAvatarAssetUpdateWithoutHairColourInput = {
  avatarAssetCatelog?: InputMaybe<AvatarAssetCatelogUpdateOneRequiredWithoutHairAvatarAssetInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  hairType?: InputMaybe<EnumHairTypeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  imgUrl?: InputMaybe<StringFieldUpdateOperationsInput>;
  label?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type HairAvatarAssetUpsertWithWhereUniqueWithoutAvatarAssetCatelogInput = {
  create: HairAvatarAssetCreateWithoutAvatarAssetCatelogInput;
  update: HairAvatarAssetUpdateWithoutAvatarAssetCatelogInput;
  where: HairAvatarAssetWhereUniqueInput;
};

export type HairAvatarAssetUpsertWithWhereUniqueWithoutHairColourInput = {
  create: HairAvatarAssetCreateWithoutHairColourInput;
  update: HairAvatarAssetUpdateWithoutHairColourInput;
  where: HairAvatarAssetWhereUniqueInput;
};

export type HairAvatarAssetWhereInput = {
  AND?: InputMaybe<Array<HairAvatarAssetWhereInput>>;
  NOT?: InputMaybe<Array<HairAvatarAssetWhereInput>>;
  OR?: InputMaybe<Array<HairAvatarAssetWhereInput>>;
  avatarAssetCatelog?: InputMaybe<AvatarAssetCatelogRelationFilter>;
  avatarAssetCatelogId?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  hairColour?: InputMaybe<AvatarAssetColourRelationFilter>;
  hairColourId?: InputMaybe<StringFilter>;
  hairType?: InputMaybe<EnumHairTypeFilter>;
  id?: InputMaybe<StringFilter>;
  imgUrl?: InputMaybe<StringFilter>;
  label?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type HairAvatarAssetWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  imgUrl?: InputMaybe<Scalars['String']>;
};

export type HairColourAvatarAsset = {
  __typename?: 'HairColourAvatarAsset';
  back?: Maybe<Array<HairAvatarAsset>>;
  bangs?: Maybe<Array<HairAvatarAsset>>;
  colour: AvatarAssetColour;
};

export type HairItem = {
  __typename?: 'HairItem';
  hairType: HairType;
  id: Scalars['ID'];
  item: AvatarItem;
};

export type HairItemCreateNestedOneWithoutItemInput = {
  connect?: InputMaybe<HairItemWhereUniqueInput>;
  connectOrCreate?: InputMaybe<HairItemCreateOrConnectWithoutItemInput>;
  create?: InputMaybe<HairItemCreateWithoutItemInput>;
};

export type HairItemCreateOrConnectWithoutItemInput = {
  create: HairItemCreateWithoutItemInput;
  where: HairItemWhereUniqueInput;
};

export type HairItemCreateWithoutItemInput = {
  hairType: HairType;
};

export enum HairItemOrderByRelevanceFieldEnum {
  Id = 'id'
}

export type HairItemOrderByRelevanceInput = {
  fields: Array<HairItemOrderByRelevanceFieldEnum>;
  search: Scalars['String'];
  sort: SortOrder;
};

export type HairItemOrderByWithRelationAndSearchRelevanceInput = {
  _relevance?: InputMaybe<HairItemOrderByRelevanceInput>;
  hairType?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  item?: InputMaybe<AvatarItemOrderByWithRelationAndSearchRelevanceInput>;
};

export type HairItemRelationFilter = {
  is?: InputMaybe<HairItemWhereInput>;
  isNot?: InputMaybe<HairItemWhereInput>;
};

export type HairItemUpdateOneWithoutItemInput = {
  connect?: InputMaybe<HairItemWhereUniqueInput>;
  connectOrCreate?: InputMaybe<HairItemCreateOrConnectWithoutItemInput>;
  create?: InputMaybe<HairItemCreateWithoutItemInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<HairItemUpdateWithoutItemInput>;
  upsert?: InputMaybe<HairItemUpsertWithoutItemInput>;
};

export type HairItemUpdateWithoutItemInput = {
  hairType?: InputMaybe<EnumHairTypeFieldUpdateOperationsInput>;
};

export type HairItemUpsertWithoutItemInput = {
  create: HairItemCreateWithoutItemInput;
  update: HairItemUpdateWithoutItemInput;
};

export type HairItemWhereInput = {
  AND?: InputMaybe<Array<HairItemWhereInput>>;
  NOT?: InputMaybe<Array<HairItemWhereInput>>;
  OR?: InputMaybe<Array<HairItemWhereInput>>;
  hairType?: InputMaybe<EnumHairTypeFilter>;
  id?: InputMaybe<StringFilter>;
  item?: InputMaybe<AvatarItemRelationFilter>;
};

export type HairItemWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export enum HairType {
  Back = 'BACK',
  Bangs = 'BANGS'
}

export enum HandAssetOrientation {
  BendBottom = 'BEND_BOTTOM',
  BendTop = 'BEND_TOP',
  Down = 'DOWN',
  Up = 'UP'
}

export type HandRelatedAvatarAsset = {
  __typename?: 'HandRelatedAvatarAsset';
  avatarAssetCatelog?: Maybe<AvatarAssetCatelog>;
  avatarAssetCatelogId?: Maybe<Scalars['String']>;
  handAssetOrientation: HandAssetOrientation;
  handSide: BodyPartSide;
  id: Scalars['ID'];
  imgUrl: Scalars['String'];
  label: Scalars['String'];
};

export type HandRelatedAvatarAssetCreateManyAvatarAssetCatelogInput = {
  handAssetOrientation: HandAssetOrientation;
  handSide: BodyPartSide;
  id?: InputMaybe<Scalars['String']>;
  imgUrl: Scalars['String'];
  label: Scalars['String'];
};

export type HandRelatedAvatarAssetCreateManyAvatarAssetCatelogInputEnvelope = {
  data: Array<HandRelatedAvatarAssetCreateManyAvatarAssetCatelogInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type HandRelatedAvatarAssetCreateNestedManyWithoutAvatarAssetCatelogInput = {
  connect?: InputMaybe<Array<HandRelatedAvatarAssetWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<HandRelatedAvatarAssetCreateOrConnectWithoutAvatarAssetCatelogInput>>;
  create?: InputMaybe<Array<HandRelatedAvatarAssetCreateWithoutAvatarAssetCatelogInput>>;
  createMany?: InputMaybe<HandRelatedAvatarAssetCreateManyAvatarAssetCatelogInputEnvelope>;
};

export type HandRelatedAvatarAssetCreateOrConnectWithoutAvatarAssetCatelogInput = {
  create: HandRelatedAvatarAssetCreateWithoutAvatarAssetCatelogInput;
  where: HandRelatedAvatarAssetWhereUniqueInput;
};

export type HandRelatedAvatarAssetCreateWithoutAvatarAssetCatelogInput = {
  handAssetOrientation: HandAssetOrientation;
  handSide: BodyPartSide;
  id?: InputMaybe<Scalars['String']>;
  imgUrl: Scalars['String'];
  label: Scalars['String'];
};

export type HandRelatedAvatarAssetListRelationFilter = {
  every?: InputMaybe<HandRelatedAvatarAssetWhereInput>;
  none?: InputMaybe<HandRelatedAvatarAssetWhereInput>;
  some?: InputMaybe<HandRelatedAvatarAssetWhereInput>;
};

export type HandRelatedAvatarAssetOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type HandRelatedAvatarAssetScalarWhereInput = {
  AND?: InputMaybe<Array<HandRelatedAvatarAssetScalarWhereInput>>;
  NOT?: InputMaybe<Array<HandRelatedAvatarAssetScalarWhereInput>>;
  OR?: InputMaybe<Array<HandRelatedAvatarAssetScalarWhereInput>>;
  avatarAssetCatelogId?: InputMaybe<StringNullableFilter>;
  handAssetOrientation?: InputMaybe<EnumHandAssetOrientationFilter>;
  handSide?: InputMaybe<EnumBodyPartSideFilter>;
  id?: InputMaybe<StringFilter>;
  imgUrl?: InputMaybe<StringFilter>;
  label?: InputMaybe<StringFilter>;
};

export type HandRelatedAvatarAssetUpdateManyMutationInput = {
  handAssetOrientation?: InputMaybe<EnumHandAssetOrientationFieldUpdateOperationsInput>;
  handSide?: InputMaybe<EnumBodyPartSideFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  imgUrl?: InputMaybe<StringFieldUpdateOperationsInput>;
  label?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type HandRelatedAvatarAssetUpdateManyWithWhereWithoutAvatarAssetCatelogInput = {
  data: HandRelatedAvatarAssetUpdateManyMutationInput;
  where: HandRelatedAvatarAssetScalarWhereInput;
};

export type HandRelatedAvatarAssetUpdateManyWithoutAvatarAssetCatelogInput = {
  connect?: InputMaybe<Array<HandRelatedAvatarAssetWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<HandRelatedAvatarAssetCreateOrConnectWithoutAvatarAssetCatelogInput>>;
  create?: InputMaybe<Array<HandRelatedAvatarAssetCreateWithoutAvatarAssetCatelogInput>>;
  createMany?: InputMaybe<HandRelatedAvatarAssetCreateManyAvatarAssetCatelogInputEnvelope>;
  delete?: InputMaybe<Array<HandRelatedAvatarAssetWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<HandRelatedAvatarAssetScalarWhereInput>>;
  disconnect?: InputMaybe<Array<HandRelatedAvatarAssetWhereUniqueInput>>;
  set?: InputMaybe<Array<HandRelatedAvatarAssetWhereUniqueInput>>;
  update?: InputMaybe<Array<HandRelatedAvatarAssetUpdateWithWhereUniqueWithoutAvatarAssetCatelogInput>>;
  updateMany?: InputMaybe<Array<HandRelatedAvatarAssetUpdateManyWithWhereWithoutAvatarAssetCatelogInput>>;
  upsert?: InputMaybe<Array<HandRelatedAvatarAssetUpsertWithWhereUniqueWithoutAvatarAssetCatelogInput>>;
};

export type HandRelatedAvatarAssetUpdateWithWhereUniqueWithoutAvatarAssetCatelogInput = {
  data: HandRelatedAvatarAssetUpdateWithoutAvatarAssetCatelogInput;
  where: HandRelatedAvatarAssetWhereUniqueInput;
};

export type HandRelatedAvatarAssetUpdateWithoutAvatarAssetCatelogInput = {
  handAssetOrientation?: InputMaybe<EnumHandAssetOrientationFieldUpdateOperationsInput>;
  handSide?: InputMaybe<EnumBodyPartSideFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  imgUrl?: InputMaybe<StringFieldUpdateOperationsInput>;
  label?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type HandRelatedAvatarAssetUpsertWithWhereUniqueWithoutAvatarAssetCatelogInput = {
  create: HandRelatedAvatarAssetCreateWithoutAvatarAssetCatelogInput;
  update: HandRelatedAvatarAssetUpdateWithoutAvatarAssetCatelogInput;
  where: HandRelatedAvatarAssetWhereUniqueInput;
};

export type HandRelatedAvatarAssetWhereInput = {
  AND?: InputMaybe<Array<HandRelatedAvatarAssetWhereInput>>;
  NOT?: InputMaybe<Array<HandRelatedAvatarAssetWhereInput>>;
  OR?: InputMaybe<Array<HandRelatedAvatarAssetWhereInput>>;
  avatarAssetCatelog?: InputMaybe<AvatarAssetCatelogRelationFilter>;
  avatarAssetCatelogId?: InputMaybe<StringNullableFilter>;
  handAssetOrientation?: InputMaybe<EnumHandAssetOrientationFilter>;
  handSide?: InputMaybe<EnumBodyPartSideFilter>;
  id?: InputMaybe<StringFilter>;
  imgUrl?: InputMaybe<StringFilter>;
  label?: InputMaybe<StringFilter>;
};

export type HandRelatedAvatarAssetWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  imgUrl?: InputMaybe<Scalars['String']>;
};

export type IntFieldUpdateOperationsInput = {
  decrement?: InputMaybe<Scalars['Int']>;
  divide?: InputMaybe<Scalars['Int']>;
  increment?: InputMaybe<Scalars['Int']>;
  multiply?: InputMaybe<Scalars['Int']>;
  set?: InputMaybe<Scalars['Int']>;
};

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type IntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type ItemCatalog = {
  __typename?: 'ItemCatalog';
  _count: ItemCatalogCount;
  accessories?: Maybe<Array<AccessoryCatalog>>;
  characters?: Maybe<Array<CharacterCatalog>>;
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  itemCatalogType: ItemCatalogType;
  name: Scalars['String'];
  updatedAt: Scalars['Date'];
};

export type ItemCatalogCount = {
  __typename?: 'ItemCatalogCount';
  accessories: Scalars['Int'];
  characters: Scalars['Int'];
};

export enum ItemCatalogOrderByRelevanceFieldEnum {
  Id = 'id',
  Name = 'name'
}

export type ItemCatalogOrderByRelevanceInput = {
  fields: Array<ItemCatalogOrderByRelevanceFieldEnum>;
  search: Scalars['String'];
  sort: SortOrder;
};

export type ItemCatalogOrderByWithRelationAndSearchRelevanceInput = {
  _relevance?: InputMaybe<ItemCatalogOrderByRelevanceInput>;
  accessories?: InputMaybe<AccessoryCatalogOrderByRelationAggregateInput>;
  characters?: InputMaybe<CharacterCatalogOrderByRelationAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  itemCatalogType?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ItemCatalogRelationFilter = {
  is?: InputMaybe<ItemCatalogWhereInput>;
  isNot?: InputMaybe<ItemCatalogWhereInput>;
};

export enum ItemCatalogType {
  Accessory = 'ACCESSORY',
  Background = 'BACKGROUND',
  Character = 'CHARACTER'
}

export type ItemCatalogWhereInput = {
  AND?: InputMaybe<Array<ItemCatalogWhereInput>>;
  NOT?: InputMaybe<Array<ItemCatalogWhereInput>>;
  OR?: InputMaybe<Array<ItemCatalogWhereInput>>;
  accessories?: InputMaybe<AccessoryCatalogListRelationFilter>;
  characters?: InputMaybe<CharacterCatalogListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  itemCatalogType?: InputMaybe<EnumItemCatalogTypeFilter>;
  name?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export enum ItemRarity {
  Common = 'COMMON',
  Epic = 'EPIC',
  Rare = 'RARE'
}

export enum ItemStatus {
  Draft = 'DRAFT',
  Published = 'PUBLISHED'
}

export enum ItemType {
  Accessory = 'ACCESSORY',
  Arm = 'ARM',
  Bottom = 'BOTTOM',
  Face = 'FACE',
  Hair = 'HAIR',
  Hand = 'HAND',
  Shoes = 'SHOES',
  Skin = 'SKIN',
  Tops = 'TOPS'
}

export type JsonNullableFilter = {
  equals?: InputMaybe<Scalars['JSON']>;
  not?: InputMaybe<Scalars['JSON']>;
};

export type JsonNullableListFilter = {
  equals?: InputMaybe<Array<Scalars['JSON']>>;
  has?: InputMaybe<Scalars['JSON']>;
  hasEvery?: InputMaybe<Array<Scalars['JSON']>>;
  hasSome?: InputMaybe<Array<Scalars['JSON']>>;
  isEmpty?: InputMaybe<Scalars['Boolean']>;
};

export enum Level {
  Advanced = 'ADVANCED',
  Beginner = 'BEGINNER',
  Intermediate = 'INTERMEDIATE'
}

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  role: Role;
};

export type LoginStudentInput = {
  loginPattern: Scalars['String'];
  username: Scalars['String'];
};

export type MatchingPair = {
  __typename?: 'MatchingPair';
  deleted?: Maybe<Scalars['Date']>;
  id: Scalars['ID'];
  pair?: Maybe<Array<Scalars['String']>>;
  question?: Maybe<QuestionBlock>;
  questionId?: Maybe<Scalars['String']>;
};

export type MatchingPairCreateManyQuestionInput = {
  deleted?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  pair?: InputMaybe<MatchingPairCreatepairInput>;
};

export type MatchingPairCreateManyQuestionInputEnvelope = {
  data: Array<MatchingPairCreateManyQuestionInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type MatchingPairCreateNestedManyWithoutQuestionInput = {
  connect?: InputMaybe<Array<MatchingPairWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MatchingPairCreateOrConnectWithoutQuestionInput>>;
  create?: InputMaybe<Array<MatchingPairCreateWithoutQuestionInput>>;
  createMany?: InputMaybe<MatchingPairCreateManyQuestionInputEnvelope>;
};

export type MatchingPairCreateOrConnectWithoutQuestionInput = {
  create: MatchingPairCreateWithoutQuestionInput;
  where: MatchingPairWhereUniqueInput;
};

export type MatchingPairCreateWithoutQuestionInput = {
  deleted?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  pair?: InputMaybe<MatchingPairCreatepairInput>;
};

export type MatchingPairCreatepairInput = {
  set: Array<Scalars['String']>;
};

export type MatchingPairListRelationFilter = {
  every?: InputMaybe<MatchingPairWhereInput>;
  none?: InputMaybe<MatchingPairWhereInput>;
  some?: InputMaybe<MatchingPairWhereInput>;
};

export type MatchingPairOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type MatchingPairScalarWhereInput = {
  AND?: InputMaybe<Array<MatchingPairScalarWhereInput>>;
  NOT?: InputMaybe<Array<MatchingPairScalarWhereInput>>;
  OR?: InputMaybe<Array<MatchingPairScalarWhereInput>>;
  deleted?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<StringFilter>;
  pair?: InputMaybe<StringNullableListFilter>;
  questionId?: InputMaybe<StringNullableFilter>;
};

export type MatchingPairUpdateManyMutationInput = {
  deleted?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  pair?: InputMaybe<MatchingPairUpdatepairInput>;
};

export type MatchingPairUpdateManyWithWhereWithoutQuestionInput = {
  data: MatchingPairUpdateManyMutationInput;
  where: MatchingPairScalarWhereInput;
};

export type MatchingPairUpdateManyWithoutQuestionInput = {
  connect?: InputMaybe<Array<MatchingPairWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MatchingPairCreateOrConnectWithoutQuestionInput>>;
  create?: InputMaybe<Array<MatchingPairCreateWithoutQuestionInput>>;
  createMany?: InputMaybe<MatchingPairCreateManyQuestionInputEnvelope>;
  delete?: InputMaybe<Array<MatchingPairWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<MatchingPairScalarWhereInput>>;
  disconnect?: InputMaybe<Array<MatchingPairWhereUniqueInput>>;
  set?: InputMaybe<Array<MatchingPairWhereUniqueInput>>;
  update?: InputMaybe<Array<MatchingPairUpdateWithWhereUniqueWithoutQuestionInput>>;
  updateMany?: InputMaybe<Array<MatchingPairUpdateManyWithWhereWithoutQuestionInput>>;
  upsert?: InputMaybe<Array<MatchingPairUpsertWithWhereUniqueWithoutQuestionInput>>;
};

export type MatchingPairUpdateWithWhereUniqueWithoutQuestionInput = {
  data: MatchingPairUpdateWithoutQuestionInput;
  where: MatchingPairWhereUniqueInput;
};

export type MatchingPairUpdateWithoutQuestionInput = {
  deleted?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  pair?: InputMaybe<MatchingPairUpdatepairInput>;
};

export type MatchingPairUpdatepairInput = {
  push?: InputMaybe<Array<Scalars['String']>>;
  set?: InputMaybe<Array<Scalars['String']>>;
};

export type MatchingPairUpsertWithWhereUniqueWithoutQuestionInput = {
  create: MatchingPairCreateWithoutQuestionInput;
  update: MatchingPairUpdateWithoutQuestionInput;
  where: MatchingPairWhereUniqueInput;
};

export type MatchingPairWhereInput = {
  AND?: InputMaybe<Array<MatchingPairWhereInput>>;
  NOT?: InputMaybe<Array<MatchingPairWhereInput>>;
  OR?: InputMaybe<Array<MatchingPairWhereInput>>;
  deleted?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<StringFilter>;
  pair?: InputMaybe<StringNullableListFilter>;
  question?: InputMaybe<QuestionBlockRelationFilter>;
  questionId?: InputMaybe<StringNullableFilter>;
};

export type MatchingPairWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type MediaBlock = {
  __typename?: 'MediaBlock';
  asset?: Maybe<Asset>;
  assetId?: Maybe<Scalars['String']>;
  block: Block;
  createdAt: Scalars['Date'];
  deleted?: Maybe<Scalars['Date']>;
  id: Scalars['ID'];
  updatedAt: Scalars['Date'];
};

export type MediaBlockCreateNestedOneWithoutAssetInput = {
  connect?: InputMaybe<MediaBlockWhereUniqueInput>;
  connectOrCreate?: InputMaybe<MediaBlockCreateOrConnectWithoutAssetInput>;
  create?: InputMaybe<MediaBlockCreateWithoutAssetInput>;
};

export type MediaBlockCreateNestedOneWithoutBlockInput = {
  connect?: InputMaybe<MediaBlockWhereUniqueInput>;
  connectOrCreate?: InputMaybe<MediaBlockCreateOrConnectWithoutBlockInput>;
  create?: InputMaybe<MediaBlockCreateWithoutBlockInput>;
};

export type MediaBlockCreateOrConnectWithoutAssetInput = {
  create: MediaBlockCreateWithoutAssetInput;
  where: MediaBlockWhereUniqueInput;
};

export type MediaBlockCreateOrConnectWithoutBlockInput = {
  create: MediaBlockCreateWithoutBlockInput;
  where: MediaBlockWhereUniqueInput;
};

export type MediaBlockCreateWithoutAssetInput = {
  block: BlockCreateNestedOneWithoutMediaBlockInput;
  createdAt?: InputMaybe<Scalars['Date']>;
  deleted?: InputMaybe<Scalars['Date']>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type MediaBlockCreateWithoutBlockInput = {
  asset?: InputMaybe<AssetCreateNestedOneWithoutMediaBlockInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  deleted?: InputMaybe<Scalars['Date']>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export enum MediaBlockOrderByRelevanceFieldEnum {
  AssetId = 'assetId',
  Id = 'id'
}

export type MediaBlockOrderByRelevanceInput = {
  fields: Array<MediaBlockOrderByRelevanceFieldEnum>;
  search: Scalars['String'];
  sort: SortOrder;
};

export type MediaBlockOrderByWithRelationAndSearchRelevanceInput = {
  _relevance?: InputMaybe<MediaBlockOrderByRelevanceInput>;
  asset?: InputMaybe<AssetOrderByWithRelationAndSearchRelevanceInput>;
  assetId?: InputMaybe<SortOrder>;
  block?: InputMaybe<BlockOrderByWithRelationAndSearchRelevanceInput>;
  createdAt?: InputMaybe<SortOrder>;
  deleted?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type MediaBlockRelationFilter = {
  is?: InputMaybe<MediaBlockWhereInput>;
  isNot?: InputMaybe<MediaBlockWhereInput>;
};

export type MediaBlockUncheckedCreateNestedOneWithoutBlockInput = {
  connect?: InputMaybe<MediaBlockWhereUniqueInput>;
  connectOrCreate?: InputMaybe<MediaBlockCreateOrConnectWithoutBlockInput>;
  create?: InputMaybe<MediaBlockCreateWithoutBlockInput>;
};

export type MediaBlockUpdateOneWithoutAssetInput = {
  connect?: InputMaybe<MediaBlockWhereUniqueInput>;
  connectOrCreate?: InputMaybe<MediaBlockCreateOrConnectWithoutAssetInput>;
  create?: InputMaybe<MediaBlockCreateWithoutAssetInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<MediaBlockUpdateWithoutAssetInput>;
  upsert?: InputMaybe<MediaBlockUpsertWithoutAssetInput>;
};

export type MediaBlockUpdateOneWithoutBlockInput = {
  connect?: InputMaybe<MediaBlockWhereUniqueInput>;
  connectOrCreate?: InputMaybe<MediaBlockCreateOrConnectWithoutBlockInput>;
  create?: InputMaybe<MediaBlockCreateWithoutBlockInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<MediaBlockUpdateWithoutBlockInput>;
  upsert?: InputMaybe<MediaBlockUpsertWithoutBlockInput>;
};

export type MediaBlockUpdateWithoutAssetInput = {
  block?: InputMaybe<BlockUpdateOneRequiredWithoutMediaBlockInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deleted?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type MediaBlockUpdateWithoutBlockInput = {
  asset?: InputMaybe<AssetUpdateOneWithoutMediaBlockInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deleted?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type MediaBlockUpsertWithoutAssetInput = {
  create: MediaBlockCreateWithoutAssetInput;
  update: MediaBlockUpdateWithoutAssetInput;
};

export type MediaBlockUpsertWithoutBlockInput = {
  create: MediaBlockCreateWithoutBlockInput;
  update: MediaBlockUpdateWithoutBlockInput;
};

export type MediaBlockWhereInput = {
  AND?: InputMaybe<Array<MediaBlockWhereInput>>;
  NOT?: InputMaybe<Array<MediaBlockWhereInput>>;
  OR?: InputMaybe<Array<MediaBlockWhereInput>>;
  asset?: InputMaybe<AssetRelationFilter>;
  assetId?: InputMaybe<StringNullableFilter>;
  block?: InputMaybe<BlockRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  deleted?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type MediaBlockWhereUniqueInput = {
  assetId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptOrDeclineFriend: FriendShip;
  acquireItem: AcquiredItem;
  addChild: Student;
  adminAddChild: Student;
  adminChangePassword: User;
  adminDeleteCourse: Course;
  adminLoginAs: Token;
  adminUpdateChild: Student;
  adminUpdateUser: User;
  adminUploadTeacherProfile: Teacher;
  changeParentPassword: Parent;
  changeTeacherPassword: Teacher;
  checkoutAvatarItem: Scalars['String'];
  checkoutNovaGemPackage: Scalars['String'];
  checkoutSubscriptionPlan: Scalars['String'];
  commentChallenge: Challenge;
  completeCheckpoint: EnrolledCourse;
  createAddress: Address;
  createAssessmentBlock: AssessmentBlock;
  createAssessmentUser: AssessmentUser;
  createAvatarAssetCatalog: AvatarAssetCatelog;
  createAvatarAssetColour: AvatarAssetColour;
  createCategory: Category;
  createCheckpoint: Checkpoint;
  createCourse: Course;
  createCourseReview: CourseReview;
  createGenericBlock: Block;
  createGroupChat: Scalars['JSON'];
  createHairAvatarAsset: HairAvatarAsset;
  createManyAssessmentBlock: Scalars['Int'];
  createManyAssessmentUser: Scalars['Int'];
  createManyHairAvatarAsset: HairAvatarAsset;
  createManySkinAvatarAsset: SkinAvatarAsset;
  createNormalAvatarAsset: NormalAvatarAsset;
  createNotification: Notification;
  createOneBookmark: ForumPostBookmark;
  createOneForumReport: ForumReport;
  createOnePost: ForumPost;
  createQuestionBlock: Block;
  createSkinAvatarAsset: SkinAvatarAsset;
  createUser: User;
  createUserNotificationSetting: Scalars['Int'];
  deleteAssessmentBlock: AssessmentBlock;
  deleteAssessmentUser: AssessmentUser;
  deleteAvatarAssetCatalog: AvatarAssetCatelog;
  deleteAvatarAssetColour: AvatarAssetColour;
  deleteChallenge: Challenge;
  deleteChallengeComment: Scalars['String'];
  deleteHairAvatarAsset: HairAvatarAsset;
  deleteManyAssessmentBlock: Scalars['Int'];
  deleteManyAssessmentUser: Scalars['Int'];
  deleteManySubtitles: Scalars['Int'];
  deleteNormalAvatarAsset: NormalAvatarAsset;
  deleteOneBookmark: Scalars['String'];
  deleteOnePost: ForumPost;
  deleteOneSubtitles: Subtitles;
  deleteSkinAvatarAsset: SkinAvatarAsset;
  deleteUser: User;
  enrollCourse: EnrolledCourse;
  equipItem: Avatar;
  equipLegacyItem: UserAvatar;
  forgotPassword: Response;
  login: Auth;
  loginStudent: Auth;
  notificationMarkAllAsRead: UserNotification;
  notificationMarkAsRead: UserNotification;
  refreshToken: Token;
  removeBlock: Block;
  removeCategory: Category;
  removeCheckpoint: Checkpoint;
  removeChild: Student;
  removeCourse: Course;
  removeManyBlock: Array<Block>;
  reportChallenge: Challenge;
  requestFriend: FriendShip;
  resendVerifyEmail: Scalars['Boolean'];
  resetPassword: User;
  saveUserAvatar: NewUserAvatarDto;
  signup: Auth;
  startCheckpoint: EnrolledCourse;
  updateAddress: Address;
  updateAssessmentBlock: AssessmentBlock;
  updateAssessmentUser: AssessmentUser;
  updateAvatarAssetCatalog: AvatarAssetCatelog;
  updateAvatarAssetColour: AvatarAssetColour;
  updateBlockOrder: Array<Block>;
  updateCategory: Category;
  updateCheckpoint: Checkpoint;
  updateCheckpointBlocks: Checkpoint;
  updateCheckpointCreateManyBlocks: Checkpoint;
  updateCheckpointCreateManyQuestionBlocks: Checkpoint;
  updateChild: Student;
  updateCourse: Course;
  updateHairAvatarAsset: HairAvatarAsset;
  updateLikeChallenge: Challenge;
  updateManyAssessmentBlock: Scalars['Int'];
  updateManyAssessmentUser: Scalars['Int'];
  updateManyQuestionsBlock: Block;
  updateManySubtitles: Scalars['Int'];
  updateNormalAvatarAsset: NormalAvatarAsset;
  updateOnePost: ForumPost;
  updateOneSubtitles: Subtitles;
  updateParent: Parent;
  updateSkinAvatarAsset: SkinAvatarAsset;
  updateStudentDetails: Student;
  updateTeacherDetails: Teacher;
  updateTextBlock: Block;
  updateUser: User;
  updateUserNotificationSetting: Scalars['Int'];
  uploadAvatarAsset: Scalars['String'];
  uploadBlockAsset: Asset;
  uploadBlockAssetBulk: Array<Block>;
  uploadChallenge: Challenge;
  uploadCourseAsset: Asset;
  uploadImageAsset: Checkpoint;
  uploadQuestionBlockAsset: Asset;
  uploadQuestionSelectionAssetBulk: Array<Asset>;
  uploadStudentAvatarImage: Student;
  uploadTeacherBanner: Teacher;
  uploadTeacherProfile: Teacher;
  userReact: UserForumReaction;
  verifyEmail: Auth;
};


export type MutationAcceptOrDeclineFriendArgs = {
  id: Scalars['String'];
  status: FriendStatus;
};


export type MutationAcquireItemArgs = {
  data: CreateAcquiredItemInput;
};


export type MutationAddChildArgs = {
  data: CreateChildInput;
};


export type MutationAdminAddChildArgs = {
  data: CreateChildInput;
  parentEmail: Scalars['String'];
};


export type MutationAdminChangePasswordArgs = {
  data: AdminChangePasswordInput;
};


export type MutationAdminDeleteCourseArgs = {
  where: CourseWhereUniqueInput;
};


export type MutationAdminLoginAsArgs = {
  data: AdminLoginAsInput;
};


export type MutationAdminUpdateChildArgs = {
  data: AdminUpdateChildDetailsInput;
  id: Scalars['String'];
};


export type MutationAdminUpdateUserArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};


export type MutationAdminUploadTeacherProfileArgs = {
  file: Scalars['Upload'];
  id: Scalars['String'];
};


export type MutationChangeParentPasswordArgs = {
  data: ChangePasswordInput;
};


export type MutationChangeTeacherPasswordArgs = {
  data: ChangePasswordInput;
};


export type MutationCheckoutAvatarItemArgs = {
  childId: Scalars['String'];
  data: Array<CreateAvatarItemSessionInput>;
};


export type MutationCheckoutNovaGemPackageArgs = {
  childId: Scalars['String'];
  data: Array<CreateSessionInput>;
};


export type MutationCheckoutSubscriptionPlanArgs = {
  data: CreateSubscriptionSessionInput;
};


export type MutationCommentChallengeArgs = {
  data: CreateChallengeComment;
};


export type MutationCompleteCheckpointArgs = {
  id: Scalars['String'];
};


export type MutationCreateAddressArgs = {
  data: CreateAddressInput;
};


export type MutationCreateAssessmentBlockArgs = {
  data: AssessmentBlockCreateInput;
};


export type MutationCreateAssessmentUserArgs = {
  data: AssessmentUserCreateInput;
};


export type MutationCreateAvatarAssetCatalogArgs = {
  data: AvatarAssetCatelogCreateInput;
};


export type MutationCreateAvatarAssetColourArgs = {
  data: AvatarAssetColourCreateInput;
};


export type MutationCreateCategoryArgs = {
  data: CreateCategoryInput;
};


export type MutationCreateCheckpointArgs = {
  data: CreateCheckpointInput;
};


export type MutationCreateCourseArgs = {
  data: CreateCourseInput;
};


export type MutationCreateCourseReviewArgs = {
  data: CreateCourseReviewInput;
};


export type MutationCreateGenericBlockArgs = {
  data: CreateBlockInput;
};


export type MutationCreateGroupChatArgs = {
  data: CreateChatDto;
};


export type MutationCreateHairAvatarAssetArgs = {
  data: HairAvatarAssetCreateInput;
};


export type MutationCreateManyAssessmentBlockArgs = {
  data: Array<AssessmentBlockCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};


export type MutationCreateManyAssessmentUserArgs = {
  data: Array<AssessmentUserCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};


export type MutationCreateManyHairAvatarAssetArgs = {
  data: Array<HairAvatarAssetCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};


export type MutationCreateManySkinAvatarAssetArgs = {
  data: Array<SkinAvatarAssetCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};


export type MutationCreateNormalAvatarAssetArgs = {
  data: NormalAvatarAssetCreateInput;
};


export type MutationCreateNotificationArgs = {
  data: CreateNotificationInput;
};


export type MutationCreateOneBookmarkArgs = {
  postId: Scalars['String'];
};


export type MutationCreateOneForumReportArgs = {
  data: ForumReportCreateInput;
};


export type MutationCreateOnePostArgs = {
  data: CreatePostInput;
};


export type MutationCreateQuestionBlockArgs = {
  data: CreateQuestionBlockInput;
};


export type MutationCreateSkinAvatarAssetArgs = {
  data: SkinAvatarAssetCreateInput;
};


export type MutationCreateUserArgs = {
  data: UserCreateInput;
};


export type MutationCreateUserNotificationSettingArgs = {
  userId: Scalars['String'];
};


export type MutationDeleteAssessmentBlockArgs = {
  where: AssessmentBlockWhereUniqueInput;
};


export type MutationDeleteAssessmentUserArgs = {
  where: AssessmentUserWhereUniqueInput;
};


export type MutationDeleteAvatarAssetCatalogArgs = {
  where: AvatarAssetCatelogWhereUniqueInput;
};


export type MutationDeleteAvatarAssetColourArgs = {
  where: AvatarAssetColourWhereUniqueInput;
};


export type MutationDeleteChallengeArgs = {
  id: Scalars['String'];
};


export type MutationDeleteChallengeCommentArgs = {
  commentId: Scalars['String'];
};


export type MutationDeleteHairAvatarAssetArgs = {
  where: HairAvatarAssetWhereUniqueInput;
};


export type MutationDeleteManyAssessmentBlockArgs = {
  where?: InputMaybe<AssessmentBlockWhereInput>;
};


export type MutationDeleteManyAssessmentUserArgs = {
  where?: InputMaybe<AssessmentUserWhereInput>;
};


export type MutationDeleteManySubtitlesArgs = {
  where?: InputMaybe<SubtitlesWhereInput>;
};


export type MutationDeleteNormalAvatarAssetArgs = {
  where: NormalAvatarAssetWhereUniqueInput;
};


export type MutationDeleteOneBookmarkArgs = {
  bookmarkId: Scalars['String'];
};


export type MutationDeleteOnePostArgs = {
  id: Scalars['String'];
};


export type MutationDeleteOneSubtitlesArgs = {
  where: SubtitlesWhereUniqueInput;
};


export type MutationDeleteSkinAvatarAssetArgs = {
  where: SkinAvatarAssetWhereUniqueInput;
};


export type MutationDeleteUserArgs = {
  where: UserWhereUniqueInput;
};


export type MutationEnrollCourseArgs = {
  data: CreateEnrolledCourseInput;
};


export type MutationEquipItemArgs = {
  id: Scalars['String'];
};


export type MutationEquipLegacyItemArgs = {
  data: UpdateUserAvatar;
};


export type MutationForgotPasswordArgs = {
  data: ResetSendEmailInput;
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationLoginStudentArgs = {
  data: LoginStudentInput;
};


export type MutationNotificationMarkAsReadArgs = {
  notificationId: Scalars['String'];
};


export type MutationRefreshTokenArgs = {
  token: Scalars['String'];
};


export type MutationRemoveBlockArgs = {
  id: Scalars['String'];
};


export type MutationRemoveCategoryArgs = {
  where: CategoryWhereUniqueInput;
};


export type MutationRemoveCheckpointArgs = {
  id: Scalars['String'];
};


export type MutationRemoveChildArgs = {
  id: Scalars['String'];
};


export type MutationRemoveCourseArgs = {
  where: CourseWhereUniqueInput;
};


export type MutationRemoveManyBlockArgs = {
  ids: Array<Scalars['String']>;
};


export type MutationReportChallengeArgs = {
  data: CreateChallengeReport;
};


export type MutationRequestFriendArgs = {
  id: Scalars['String'];
};


export type MutationResendVerifyEmailArgs = {
  email: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  data: ResetPasswordInput;
};


export type MutationSaveUserAvatarArgs = {
  avatarJsonString: Scalars['String'];
};


export type MutationSignupArgs = {
  data: SignupInput;
};


export type MutationStartCheckpointArgs = {
  enrolledCourseId: Scalars['String'];
  id: Scalars['String'];
};


export type MutationUpdateAddressArgs = {
  data: UpdateAddressInput;
};


export type MutationUpdateAssessmentBlockArgs = {
  data: AssessmentBlockUpdateInput;
  where: AssessmentBlockWhereUniqueInput;
};


export type MutationUpdateAssessmentUserArgs = {
  data: AssessmentUserUpdateInput;
  where: AssessmentUserWhereUniqueInput;
};


export type MutationUpdateAvatarAssetCatalogArgs = {
  data: AvatarAssetCatelogUpdateInput;
  where: AvatarAssetCatelogWhereUniqueInput;
};


export type MutationUpdateAvatarAssetColourArgs = {
  data: AvatarAssetColourUpdateInput;
  where: AvatarAssetColourWhereUniqueInput;
};


export type MutationUpdateBlockOrderArgs = {
  data: Array<UpdateBlockManyOrderInput>;
};


export type MutationUpdateCategoryArgs = {
  data: UpdateCategoryInput;
  id: Scalars['String'];
};


export type MutationUpdateCheckpointArgs = {
  data: UpdateCheckpointInput;
  id: Scalars['String'];
};


export type MutationUpdateCheckpointBlocksArgs = {
  data: UpdateCheckpointBlocksInput;
  id: Scalars['String'];
};


export type MutationUpdateCheckpointCreateManyBlocksArgs = {
  data: UpdateCheckpointCreateManyBlocksInput;
  id: Scalars['String'];
};


export type MutationUpdateCheckpointCreateManyQuestionBlocksArgs = {
  data: UpdateCheckpointManyQuestionsBlockInput;
  id: Scalars['String'];
};


export type MutationUpdateChildArgs = {
  data: UpdateChildDetailsInput;
  id: Scalars['String'];
};


export type MutationUpdateCourseArgs = {
  data: UpdateCourseInput;
  id: Scalars['String'];
};


export type MutationUpdateHairAvatarAssetArgs = {
  data: HairAvatarAssetUpdateInput;
  where: HairAvatarAssetWhereUniqueInput;
};


export type MutationUpdateLikeChallengeArgs = {
  id: Scalars['String'];
};


export type MutationUpdateManyAssessmentBlockArgs = {
  data: AssessmentBlockUpdateManyMutationInput;
  where?: InputMaybe<AssessmentBlockWhereInput>;
};


export type MutationUpdateManyAssessmentUserArgs = {
  data: AssessmentUserUpdateManyMutationInput;
  where?: InputMaybe<AssessmentUserWhereInput>;
};


export type MutationUpdateManyQuestionsBlockArgs = {
  data: Array<UpdateQuestionBlockInput>;
};


export type MutationUpdateManySubtitlesArgs = {
  data: SubtitlesUpdateManyMutationInput;
  where?: InputMaybe<SubtitlesWhereInput>;
};


export type MutationUpdateNormalAvatarAssetArgs = {
  data: NormalAvatarAssetUpdateInput;
  where: NormalAvatarAssetWhereUniqueInput;
};


export type MutationUpdateOnePostArgs = {
  data: UpdatePostInput;
  id: Scalars['String'];
};


export type MutationUpdateOneSubtitlesArgs = {
  data: SubtitlesUpdateInput;
  where: SubtitlesWhereUniqueInput;
};


export type MutationUpdateParentArgs = {
  data: UpdateParentInput;
};


export type MutationUpdateSkinAvatarAssetArgs = {
  data: SkinAvatarAssetUpdateInput;
  where: SkinAvatarAssetWhereUniqueInput;
};


export type MutationUpdateStudentDetailsArgs = {
  data: UpdateStudentDetailsInput;
};


export type MutationUpdateTeacherDetailsArgs = {
  data: UpdateTeacherDetailsInput;
};


export type MutationUpdateTextBlockArgs = {
  data: UpdateTextBlockInput;
  id: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
};


export type MutationUpdateUserNotificationSettingArgs = {
  enableNotification: Scalars['Boolean'];
};


export type MutationUploadAvatarAssetArgs = {
  assetType: AvatarAssetCatelogTypes;
  file: Scalars['Upload'];
};


export type MutationUploadBlockAssetArgs = {
  file: Scalars['Upload'];
  id: Scalars['String'];
  subs?: InputMaybe<Array<SubtitleUploadInput>>;
};


export type MutationUploadBlockAssetBulkArgs = {
  files: Array<UploadBlockAsset>;
};


export type MutationUploadChallengeArgs = {
  file: Scalars['Upload'];
  id: Scalars['String'];
};


export type MutationUploadCourseAssetArgs = {
  courseAssetType: CourseAssetType;
  file: Scalars['Upload'];
};


export type MutationUploadImageAssetArgs = {
  file: Scalars['Upload'];
  id: Scalars['String'];
};


export type MutationUploadQuestionBlockAssetArgs = {
  file: Scalars['Upload'];
  id: Scalars['String'];
};


export type MutationUploadQuestionSelectionAssetBulkArgs = {
  files: Array<UploadBlockAsset>;
};


export type MutationUploadStudentAvatarImageArgs = {
  file: Scalars['Upload'];
};


export type MutationUploadTeacherBannerArgs = {
  file: Scalars['Upload'];
};


export type MutationUploadTeacherProfileArgs = {
  file: Scalars['Upload'];
};


export type MutationUserReactArgs = {
  data: UserReactInput;
};


export type MutationVerifyEmailArgs = {
  token: Scalars['String'];
};

export type NestedBigIntFilter = {
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedBigIntFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
};

export type NestedBoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<NestedBoolFilter>;
};

export type NestedDateTimeFilter = {
  equals?: InputMaybe<Scalars['Date']>;
  gt?: InputMaybe<Scalars['Date']>;
  gte?: InputMaybe<Scalars['Date']>;
  in?: InputMaybe<Array<Scalars['Date']>>;
  lt?: InputMaybe<Scalars['Date']>;
  lte?: InputMaybe<Scalars['Date']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['Date']>>;
};

export type NestedDateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['Date']>;
  gt?: InputMaybe<Scalars['Date']>;
  gte?: InputMaybe<Scalars['Date']>;
  in?: InputMaybe<Array<Scalars['Date']>>;
  lt?: InputMaybe<Scalars['Date']>;
  lte?: InputMaybe<Scalars['Date']>;
  not?: InputMaybe<NestedDateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Date']>>;
};

export type NestedDecimalFilter = {
  equals?: InputMaybe<Scalars['Decimal']>;
  gt?: InputMaybe<Scalars['Decimal']>;
  gte?: InputMaybe<Scalars['Decimal']>;
  in?: InputMaybe<Array<Scalars['Decimal']>>;
  lt?: InputMaybe<Scalars['Decimal']>;
  lte?: InputMaybe<Scalars['Decimal']>;
  not?: InputMaybe<NestedDecimalFilter>;
  notIn?: InputMaybe<Array<Scalars['Decimal']>>;
};

export type NestedEnumAccessoryCatalogTypeFilter = {
  equals?: InputMaybe<AccessoryCatalogType>;
  in?: InputMaybe<Array<AccessoryCatalogType>>;
  not?: InputMaybe<NestedEnumAccessoryCatalogTypeFilter>;
  notIn?: InputMaybe<Array<AccessoryCatalogType>>;
};

export type NestedEnumAccessoryTypeFilter = {
  equals?: InputMaybe<AccessoryType>;
  in?: InputMaybe<Array<AccessoryType>>;
  not?: InputMaybe<NestedEnumAccessoryTypeFilter>;
  notIn?: InputMaybe<Array<AccessoryType>>;
};

export type NestedEnumAnswerQuantityTypeFilter = {
  equals?: InputMaybe<AnswerQuantityType>;
  in?: InputMaybe<Array<AnswerQuantityType>>;
  not?: InputMaybe<NestedEnumAnswerQuantityTypeFilter>;
  notIn?: InputMaybe<Array<AnswerQuantityType>>;
};

export type NestedEnumAnswerTypeFilter = {
  equals?: InputMaybe<AnswerType>;
  in?: InputMaybe<Array<AnswerType>>;
  not?: InputMaybe<NestedEnumAnswerTypeFilter>;
  notIn?: InputMaybe<Array<AnswerType>>;
};

export type NestedEnumAssessmentQuestionResultFilter = {
  equals?: InputMaybe<AssessmentQuestionResult>;
  in?: InputMaybe<Array<AssessmentQuestionResult>>;
  not?: InputMaybe<NestedEnumAssessmentQuestionResultFilter>;
  notIn?: InputMaybe<Array<AssessmentQuestionResult>>;
};

export type NestedEnumAssessmentQuestionStatusFilter = {
  equals?: InputMaybe<AssessmentQuestionStatus>;
  in?: InputMaybe<Array<AssessmentQuestionStatus>>;
  not?: InputMaybe<NestedEnumAssessmentQuestionStatusFilter>;
  notIn?: InputMaybe<Array<AssessmentQuestionStatus>>;
};

export type NestedEnumAvatarAssetCatelogTypeFilter = {
  equals?: InputMaybe<AvatarAssetCatelogType>;
  in?: InputMaybe<Array<AvatarAssetCatelogType>>;
  not?: InputMaybe<NestedEnumAvatarAssetCatelogTypeFilter>;
  notIn?: InputMaybe<Array<AvatarAssetCatelogType>>;
};

export type NestedEnumAvatarAssetColourTypeFilter = {
  equals?: InputMaybe<AvatarAssetColourType>;
  in?: InputMaybe<Array<AvatarAssetColourType>>;
  not?: InputMaybe<NestedEnumAvatarAssetColourTypeFilter>;
  notIn?: InputMaybe<Array<AvatarAssetColourType>>;
};

export type NestedEnumBlockTypeFilter = {
  equals?: InputMaybe<BlockType>;
  in?: InputMaybe<Array<BlockType>>;
  not?: InputMaybe<NestedEnumBlockTypeFilter>;
  notIn?: InputMaybe<Array<BlockType>>;
};

export type NestedEnumBodyPartSideFilter = {
  equals?: InputMaybe<BodyPartSide>;
  in?: InputMaybe<Array<BodyPartSide>>;
  not?: InputMaybe<NestedEnumBodyPartSideFilter>;
  notIn?: InputMaybe<Array<BodyPartSide>>;
};

export type NestedEnumCharacterCatalogTypeFilter = {
  equals?: InputMaybe<CharacterCatalogType>;
  in?: InputMaybe<Array<CharacterCatalogType>>;
  not?: InputMaybe<NestedEnumCharacterCatalogTypeFilter>;
  notIn?: InputMaybe<Array<CharacterCatalogType>>;
};

export type NestedEnumEnrolledStateFilter = {
  equals?: InputMaybe<EnrolledState>;
  in?: InputMaybe<Array<EnrolledState>>;
  not?: InputMaybe<NestedEnumEnrolledStateFilter>;
  notIn?: InputMaybe<Array<EnrolledState>>;
};

export type NestedEnumExpRewardTypeFilter = {
  equals?: InputMaybe<ExpRewardType>;
  in?: InputMaybe<Array<ExpRewardType>>;
  not?: InputMaybe<NestedEnumExpRewardTypeFilter>;
  notIn?: InputMaybe<Array<ExpRewardType>>;
};

export type NestedEnumFaceTypeFilter = {
  equals?: InputMaybe<FaceType>;
  in?: InputMaybe<Array<FaceType>>;
  not?: InputMaybe<NestedEnumFaceTypeFilter>;
  notIn?: InputMaybe<Array<FaceType>>;
};

export type NestedEnumFileTypeFilter = {
  equals?: InputMaybe<FileType>;
  in?: InputMaybe<Array<FileType>>;
  not?: InputMaybe<NestedEnumFileTypeFilter>;
  notIn?: InputMaybe<Array<FileType>>;
};

export type NestedEnumFriendStatusFilter = {
  equals?: InputMaybe<FriendStatus>;
  in?: InputMaybe<Array<FriendStatus>>;
  not?: InputMaybe<NestedEnumFriendStatusFilter>;
  notIn?: InputMaybe<Array<FriendStatus>>;
};

export type NestedEnumGenderNullableFilter = {
  equals?: InputMaybe<Gender>;
  in?: InputMaybe<Array<Gender>>;
  not?: InputMaybe<NestedEnumGenderNullableFilter>;
  notIn?: InputMaybe<Array<Gender>>;
};

export type NestedEnumHairTypeFilter = {
  equals?: InputMaybe<HairType>;
  in?: InputMaybe<Array<HairType>>;
  not?: InputMaybe<NestedEnumHairTypeFilter>;
  notIn?: InputMaybe<Array<HairType>>;
};

export type NestedEnumHandAssetOrientationFilter = {
  equals?: InputMaybe<HandAssetOrientation>;
  in?: InputMaybe<Array<HandAssetOrientation>>;
  not?: InputMaybe<NestedEnumHandAssetOrientationFilter>;
  notIn?: InputMaybe<Array<HandAssetOrientation>>;
};

export type NestedEnumItemCatalogTypeFilter = {
  equals?: InputMaybe<ItemCatalogType>;
  in?: InputMaybe<Array<ItemCatalogType>>;
  not?: InputMaybe<NestedEnumItemCatalogTypeFilter>;
  notIn?: InputMaybe<Array<ItemCatalogType>>;
};

export type NestedEnumItemRarityFilter = {
  equals?: InputMaybe<ItemRarity>;
  in?: InputMaybe<Array<ItemRarity>>;
  not?: InputMaybe<NestedEnumItemRarityFilter>;
  notIn?: InputMaybe<Array<ItemRarity>>;
};

export type NestedEnumItemStatusFilter = {
  equals?: InputMaybe<ItemStatus>;
  in?: InputMaybe<Array<ItemStatus>>;
  not?: InputMaybe<NestedEnumItemStatusFilter>;
  notIn?: InputMaybe<Array<ItemStatus>>;
};

export type NestedEnumItemTypeFilter = {
  equals?: InputMaybe<ItemType>;
  in?: InputMaybe<Array<ItemType>>;
  not?: InputMaybe<NestedEnumItemTypeFilter>;
  notIn?: InputMaybe<Array<ItemType>>;
};

export type NestedEnumLevelFilter = {
  equals?: InputMaybe<Level>;
  in?: InputMaybe<Array<Level>>;
  not?: InputMaybe<NestedEnumLevelFilter>;
  notIn?: InputMaybe<Array<Level>>;
};

export type NestedEnumNotificationCategoryFilter = {
  equals?: InputMaybe<NotificationCategory>;
  in?: InputMaybe<Array<NotificationCategory>>;
  not?: InputMaybe<NestedEnumNotificationCategoryFilter>;
  notIn?: InputMaybe<Array<NotificationCategory>>;
};

export type NestedEnumNotificationSettingTypeFilter = {
  equals?: InputMaybe<NotificationSettingType>;
  in?: InputMaybe<Array<NotificationSettingType>>;
  not?: InputMaybe<NestedEnumNotificationSettingTypeFilter>;
  notIn?: InputMaybe<Array<NotificationSettingType>>;
};

export type NestedEnumNotificationTypeFilter = {
  equals?: InputMaybe<NotificationType>;
  in?: InputMaybe<Array<NotificationType>>;
  not?: InputMaybe<NestedEnumNotificationTypeFilter>;
  notIn?: InputMaybe<Array<NotificationType>>;
};

export type NestedEnumParentStatusFilter = {
  equals?: InputMaybe<ParentStatus>;
  in?: InputMaybe<Array<ParentStatus>>;
  not?: InputMaybe<NestedEnumParentStatusFilter>;
  notIn?: InputMaybe<Array<ParentStatus>>;
};

export type NestedEnumQuizTypeFilter = {
  equals?: InputMaybe<QuizType>;
  in?: InputMaybe<Array<QuizType>>;
  not?: InputMaybe<NestedEnumQuizTypeFilter>;
  notIn?: InputMaybe<Array<QuizType>>;
};

export type NestedEnumReactionEmojiFilter = {
  equals?: InputMaybe<ReactionEmoji>;
  in?: InputMaybe<Array<ReactionEmoji>>;
  not?: InputMaybe<NestedEnumReactionEmojiFilter>;
  notIn?: InputMaybe<Array<ReactionEmoji>>;
};

export type NestedEnumRoleFilter = {
  equals?: InputMaybe<Role>;
  in?: InputMaybe<Array<Role>>;
  not?: InputMaybe<NestedEnumRoleFilter>;
  notIn?: InputMaybe<Array<Role>>;
};

export type NestedEnumSkinTypeFilter = {
  equals?: InputMaybe<SkinType>;
  in?: InputMaybe<Array<SkinType>>;
  not?: InputMaybe<NestedEnumSkinTypeFilter>;
  notIn?: InputMaybe<Array<SkinType>>;
};

export type NestedEnumStateFilter = {
  equals?: InputMaybe<State>;
  in?: InputMaybe<Array<State>>;
  not?: InputMaybe<NestedEnumStateFilter>;
  notIn?: InputMaybe<Array<State>>;
};

export type NestedEnumStripeProductTypeFilter = {
  equals?: InputMaybe<StripeProductType>;
  in?: InputMaybe<Array<StripeProductType>>;
  not?: InputMaybe<NestedEnumStripeProductTypeFilter>;
  notIn?: InputMaybe<Array<StripeProductType>>;
};

export type NestedEnumTopicTypeFilter = {
  equals?: InputMaybe<TopicType>;
  in?: InputMaybe<Array<TopicType>>;
  not?: InputMaybe<NestedEnumTopicTypeFilter>;
  notIn?: InputMaybe<Array<TopicType>>;
};

export type NestedEnumTopsTypeFilter = {
  equals?: InputMaybe<TopsType>;
  in?: InputMaybe<Array<TopsType>>;
  not?: InputMaybe<NestedEnumTopsTypeFilter>;
  notIn?: InputMaybe<Array<TopsType>>;
};

export type NestedIntFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type NestedIntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  search?: InputMaybe<Scalars['String']>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type NestedStringNullableFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  search?: InputMaybe<Scalars['String']>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type NewUserAvatarDto = {
  __typename?: 'NewUserAvatarDto';
  body?: Maybe<SkinAvatarAsset>;
  bottom?: Maybe<NormalAvatarAsset>;
  cheeks?: Maybe<NormalAvatarAsset>;
  ears?: Maybe<SkinAvatarAsset>;
  eyes?: Maybe<NormalAvatarAsset>;
  eyesAccessory?: Maybe<NormalAvatarAsset>;
  faceAccessory?: Maybe<NormalAvatarAsset>;
  hairBack?: Maybe<HairAvatarAsset>;
  hairBangs?: Maybe<HairAvatarAsset>;
  hairColour?: Maybe<AvatarAssetColour>;
  head?: Maybe<SkinAvatarAsset>;
  headAccessory?: Maybe<NormalAvatarAsset>;
  horns?: Maybe<SkinAvatarAsset>;
  itemAccessory?: Maybe<NormalAvatarAsset>;
  jacket?: Maybe<NormalAvatarAsset>;
  mouth?: Maybe<NormalAvatarAsset>;
  nose: NormalAvatarAsset;
  pet?: Maybe<NormalAvatarAsset>;
  shadow: NormalAvatarAsset;
  shirt?: Maybe<NormalAvatarAsset>;
  shoes?: Maybe<NormalAvatarAsset>;
  skinColour?: Maybe<AvatarAssetColour>;
  topAccessory?: Maybe<NormalAvatarAsset>;
};

export type NormalAvatarAsset = {
  __typename?: 'NormalAvatarAsset';
  avatarAssetCatalog?: Maybe<AvatarAssetCatelog>;
  avatarAssetCatelogId?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  imgUrl: Scalars['String'];
  isOuterMost: Scalars['Boolean'];
  label: Scalars['String'];
  updatedAt: Scalars['Date'];
};

export type NormalAvatarAssetCreateInput = {
  avatarAssetCatalog?: InputMaybe<AvatarAssetCatelogCreateNestedOneWithoutNormalAvatarAssetInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  imgUrl: Scalars['String'];
  isOuterMost?: InputMaybe<Scalars['Boolean']>;
  label: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type NormalAvatarAssetCreateManyAvatarAssetCatalogInput = {
  createdAt?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  imgUrl: Scalars['String'];
  isOuterMost?: InputMaybe<Scalars['Boolean']>;
  label: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type NormalAvatarAssetCreateManyAvatarAssetCatalogInputEnvelope = {
  data: Array<NormalAvatarAssetCreateManyAvatarAssetCatalogInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type NormalAvatarAssetCreateNestedManyWithoutAvatarAssetCatalogInput = {
  connect?: InputMaybe<Array<NormalAvatarAssetWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<NormalAvatarAssetCreateOrConnectWithoutAvatarAssetCatalogInput>>;
  create?: InputMaybe<Array<NormalAvatarAssetCreateWithoutAvatarAssetCatalogInput>>;
  createMany?: InputMaybe<NormalAvatarAssetCreateManyAvatarAssetCatalogInputEnvelope>;
};

export type NormalAvatarAssetCreateOrConnectWithoutAvatarAssetCatalogInput = {
  create: NormalAvatarAssetCreateWithoutAvatarAssetCatalogInput;
  where: NormalAvatarAssetWhereUniqueInput;
};

export type NormalAvatarAssetCreateWithoutAvatarAssetCatalogInput = {
  createdAt?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  imgUrl: Scalars['String'];
  isOuterMost?: InputMaybe<Scalars['Boolean']>;
  label: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type NormalAvatarAssetListRelationFilter = {
  every?: InputMaybe<NormalAvatarAssetWhereInput>;
  none?: InputMaybe<NormalAvatarAssetWhereInput>;
  some?: InputMaybe<NormalAvatarAssetWhereInput>;
};

export type NormalAvatarAssetOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export enum NormalAvatarAssetOrderByRelevanceFieldEnum {
  AvatarAssetCatelogId = 'avatarAssetCatelogId',
  Id = 'id',
  ImgUrl = 'imgUrl',
  Label = 'label'
}

export type NormalAvatarAssetOrderByRelevanceInput = {
  fields: Array<NormalAvatarAssetOrderByRelevanceFieldEnum>;
  search: Scalars['String'];
  sort: SortOrder;
};

export type NormalAvatarAssetOrderByWithRelationAndSearchRelevanceInput = {
  _relevance?: InputMaybe<NormalAvatarAssetOrderByRelevanceInput>;
  avatarAssetCatalog?: InputMaybe<AvatarAssetCatelogOrderByWithRelationAndSearchRelevanceInput>;
  avatarAssetCatelogId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  imgUrl?: InputMaybe<SortOrder>;
  isOuterMost?: InputMaybe<SortOrder>;
  label?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum NormalAvatarAssetScalarFieldEnum {
  AvatarAssetCatelogId = 'avatarAssetCatelogId',
  CreatedAt = 'createdAt',
  Id = 'id',
  ImgUrl = 'imgUrl',
  IsOuterMost = 'isOuterMost',
  Label = 'label',
  UpdatedAt = 'updatedAt'
}

export type NormalAvatarAssetScalarWhereInput = {
  AND?: InputMaybe<Array<NormalAvatarAssetScalarWhereInput>>;
  NOT?: InputMaybe<Array<NormalAvatarAssetScalarWhereInput>>;
  OR?: InputMaybe<Array<NormalAvatarAssetScalarWhereInput>>;
  avatarAssetCatelogId?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  imgUrl?: InputMaybe<StringFilter>;
  isOuterMost?: InputMaybe<BoolFilter>;
  label?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type NormalAvatarAssetUpdateInput = {
  avatarAssetCatalog?: InputMaybe<AvatarAssetCatelogUpdateOneWithoutNormalAvatarAssetInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  imgUrl?: InputMaybe<StringFieldUpdateOperationsInput>;
  isOuterMost?: InputMaybe<BoolFieldUpdateOperationsInput>;
  label?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type NormalAvatarAssetUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  imgUrl?: InputMaybe<StringFieldUpdateOperationsInput>;
  isOuterMost?: InputMaybe<BoolFieldUpdateOperationsInput>;
  label?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type NormalAvatarAssetUpdateManyWithWhereWithoutAvatarAssetCatalogInput = {
  data: NormalAvatarAssetUpdateManyMutationInput;
  where: NormalAvatarAssetScalarWhereInput;
};

export type NormalAvatarAssetUpdateManyWithoutAvatarAssetCatalogInput = {
  connect?: InputMaybe<Array<NormalAvatarAssetWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<NormalAvatarAssetCreateOrConnectWithoutAvatarAssetCatalogInput>>;
  create?: InputMaybe<Array<NormalAvatarAssetCreateWithoutAvatarAssetCatalogInput>>;
  createMany?: InputMaybe<NormalAvatarAssetCreateManyAvatarAssetCatalogInputEnvelope>;
  delete?: InputMaybe<Array<NormalAvatarAssetWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<NormalAvatarAssetScalarWhereInput>>;
  disconnect?: InputMaybe<Array<NormalAvatarAssetWhereUniqueInput>>;
  set?: InputMaybe<Array<NormalAvatarAssetWhereUniqueInput>>;
  update?: InputMaybe<Array<NormalAvatarAssetUpdateWithWhereUniqueWithoutAvatarAssetCatalogInput>>;
  updateMany?: InputMaybe<Array<NormalAvatarAssetUpdateManyWithWhereWithoutAvatarAssetCatalogInput>>;
  upsert?: InputMaybe<Array<NormalAvatarAssetUpsertWithWhereUniqueWithoutAvatarAssetCatalogInput>>;
};

export type NormalAvatarAssetUpdateWithWhereUniqueWithoutAvatarAssetCatalogInput = {
  data: NormalAvatarAssetUpdateWithoutAvatarAssetCatalogInput;
  where: NormalAvatarAssetWhereUniqueInput;
};

export type NormalAvatarAssetUpdateWithoutAvatarAssetCatalogInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  imgUrl?: InputMaybe<StringFieldUpdateOperationsInput>;
  isOuterMost?: InputMaybe<BoolFieldUpdateOperationsInput>;
  label?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type NormalAvatarAssetUpsertWithWhereUniqueWithoutAvatarAssetCatalogInput = {
  create: NormalAvatarAssetCreateWithoutAvatarAssetCatalogInput;
  update: NormalAvatarAssetUpdateWithoutAvatarAssetCatalogInput;
  where: NormalAvatarAssetWhereUniqueInput;
};

export type NormalAvatarAssetWhereInput = {
  AND?: InputMaybe<Array<NormalAvatarAssetWhereInput>>;
  NOT?: InputMaybe<Array<NormalAvatarAssetWhereInput>>;
  OR?: InputMaybe<Array<NormalAvatarAssetWhereInput>>;
  avatarAssetCatalog?: InputMaybe<AvatarAssetCatelogRelationFilter>;
  avatarAssetCatelogId?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  imgUrl?: InputMaybe<StringFilter>;
  isOuterMost?: InputMaybe<BoolFilter>;
  label?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type NormalAvatarAssetWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  imgUrl?: InputMaybe<Scalars['String']>;
};

export type Notification = {
  __typename?: 'Notification';
  _count: NotificationCount;
  createdAt: Scalars['Date'];
  href?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  message: Scalars['String'];
  thumbnail?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  type: NotificationType;
  userNotifications?: Maybe<Array<UserNotification>>;
};

export enum NotificationCategory {
  Enroll = 'ENROLL',
  ForumComment = 'FORUM_COMMENT',
  FriendRequest = 'FRIEND_REQUEST'
}

export type NotificationCount = {
  __typename?: 'NotificationCount';
  userNotifications: Scalars['Int'];
};

export type NotificationCreateNestedOneWithoutUserNotificationsInput = {
  connect?: InputMaybe<NotificationWhereUniqueInput>;
  connectOrCreate?: InputMaybe<NotificationCreateOrConnectWithoutUserNotificationsInput>;
  create?: InputMaybe<NotificationCreateWithoutUserNotificationsInput>;
};

export type NotificationCreateOrConnectWithoutUserNotificationsInput = {
  create: NotificationCreateWithoutUserNotificationsInput;
  where: NotificationWhereUniqueInput;
};

export type NotificationCreateWithoutUserNotificationsInput = {
  createdAt?: InputMaybe<Scalars['Date']>;
  href?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  message: Scalars['String'];
  thumbnail?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  type?: InputMaybe<NotificationType>;
};

export type NotificationRelationFilter = {
  is?: InputMaybe<NotificationWhereInput>;
  isNot?: InputMaybe<NotificationWhereInput>;
};

export enum NotificationSettingType {
  Email = 'EMAIL',
  Push = 'PUSH',
  Sms = 'SMS'
}

export enum NotificationType {
  FriendRequest = 'FRIEND_REQUEST',
  Message = 'MESSAGE'
}

export type NotificationUpdateOneRequiredWithoutUserNotificationsInput = {
  connect?: InputMaybe<NotificationWhereUniqueInput>;
  connectOrCreate?: InputMaybe<NotificationCreateOrConnectWithoutUserNotificationsInput>;
  create?: InputMaybe<NotificationCreateWithoutUserNotificationsInput>;
  update?: InputMaybe<NotificationUpdateWithoutUserNotificationsInput>;
  upsert?: InputMaybe<NotificationUpsertWithoutUserNotificationsInput>;
};

export type NotificationUpdateWithoutUserNotificationsInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  href?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  message?: InputMaybe<StringFieldUpdateOperationsInput>;
  thumbnail?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  type?: InputMaybe<EnumNotificationTypeFieldUpdateOperationsInput>;
};

export type NotificationUpsertWithoutUserNotificationsInput = {
  create: NotificationCreateWithoutUserNotificationsInput;
  update: NotificationUpdateWithoutUserNotificationsInput;
};

export type NotificationWhereInput = {
  AND?: InputMaybe<Array<NotificationWhereInput>>;
  NOT?: InputMaybe<Array<NotificationWhereInput>>;
  OR?: InputMaybe<Array<NotificationWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  href?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  message?: InputMaybe<StringFilter>;
  thumbnail?: InputMaybe<StringNullableFilter>;
  title?: InputMaybe<StringFilter>;
  type?: InputMaybe<EnumNotificationTypeFilter>;
  userNotifications?: InputMaybe<UserNotificationListRelationFilter>;
};

export type NotificationWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type NovaGemPackage = {
  __typename?: 'NovaGemPackage';
  createdAt: Scalars['Date'];
  gemAmount: Scalars['Decimal'];
  id: Scalars['ID'];
  stripeProduct: StripeProduct;
  updatedAt: Scalars['Date'];
};

export enum NovaGemPackageOrderByRelevanceFieldEnum {
  Id = 'id'
}

export type NovaGemPackageOrderByRelevanceInput = {
  fields: Array<NovaGemPackageOrderByRelevanceFieldEnum>;
  search: Scalars['String'];
  sort: SortOrder;
};

export type NovaGemPackageOrderByWithRelationAndSearchRelevanceInput = {
  _relevance?: InputMaybe<NovaGemPackageOrderByRelevanceInput>;
  createdAt?: InputMaybe<SortOrder>;
  gemAmount?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  stripeProduct?: InputMaybe<StripeProductOrderByWithRelationAndSearchRelevanceInput>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type NovaGemPackageRelationFilter = {
  is?: InputMaybe<NovaGemPackageWhereInput>;
  isNot?: InputMaybe<NovaGemPackageWhereInput>;
};

export type NovaGemPackageWhereInput = {
  AND?: InputMaybe<Array<NovaGemPackageWhereInput>>;
  NOT?: InputMaybe<Array<NovaGemPackageWhereInput>>;
  OR?: InputMaybe<Array<NovaGemPackageWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  gemAmount?: InputMaybe<DecimalFilter>;
  id?: InputMaybe<StringFilter>;
  stripeProduct?: InputMaybe<StripeProductRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type NullableDateTimeFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['Date']>;
};

export type NullableEnumGenderFieldUpdateOperationsInput = {
  set?: InputMaybe<Gender>;
};

export type NullableIntFieldUpdateOperationsInput = {
  decrement?: InputMaybe<Scalars['Int']>;
  divide?: InputMaybe<Scalars['Int']>;
  increment?: InputMaybe<Scalars['Int']>;
  multiply?: InputMaybe<Scalars['Int']>;
  set?: InputMaybe<Scalars['Int']>;
};

export type NullableStringFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['String']>;
};

export type Parent = {
  __typename?: 'Parent';
  _count: ParentCount;
  children?: Maybe<Array<Student>>;
  createdAt: Scalars['Date'];
  email: Scalars['String'];
  id: Scalars['ID'];
  password: Scalars['String'];
  status: ParentStatus;
  updatedAt: Scalars['Date'];
  user: User;
};

export type ParentCount = {
  __typename?: 'ParentCount';
  children: Scalars['Int'];
};

export type ParentCreateNestedOneWithoutChildrenInput = {
  connect?: InputMaybe<ParentWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ParentCreateOrConnectWithoutChildrenInput>;
  create?: InputMaybe<ParentCreateWithoutChildrenInput>;
};

export type ParentCreateNestedOneWithoutUserInput = {
  connect?: InputMaybe<ParentWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ParentCreateOrConnectWithoutUserInput>;
  create?: InputMaybe<ParentCreateWithoutUserInput>;
};

export type ParentCreateOrConnectWithoutChildrenInput = {
  create: ParentCreateWithoutChildrenInput;
  where: ParentWhereUniqueInput;
};

export type ParentCreateOrConnectWithoutUserInput = {
  create: ParentCreateWithoutUserInput;
  where: ParentWhereUniqueInput;
};

export type ParentCreateWithoutChildrenInput = {
  createdAt?: InputMaybe<Scalars['Date']>;
  email: Scalars['String'];
  password: Scalars['String'];
  status?: InputMaybe<ParentStatus>;
  updatedAt?: InputMaybe<Scalars['Date']>;
  user: UserCreateNestedOneWithoutParentInput;
};

export type ParentCreateWithoutUserInput = {
  children?: InputMaybe<StudentCreateNestedManyWithoutParentInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  email: Scalars['String'];
  password: Scalars['String'];
  status?: InputMaybe<ParentStatus>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export enum ParentOrderByRelevanceFieldEnum {
  Email = 'email',
  Id = 'id',
  Password = 'password'
}

export type ParentOrderByRelevanceInput = {
  fields: Array<ParentOrderByRelevanceFieldEnum>;
  search: Scalars['String'];
  sort: SortOrder;
};

export type ParentOrderByWithRelationAndSearchRelevanceInput = {
  _relevance?: InputMaybe<ParentOrderByRelevanceInput>;
  children?: InputMaybe<StudentOrderByRelationAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  password?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationAndSearchRelevanceInput>;
};

export type ParentRelationFilter = {
  is?: InputMaybe<ParentWhereInput>;
  isNot?: InputMaybe<ParentWhereInput>;
};

export enum ParentStatus {
  Unverified = 'UNVERIFIED',
  Verified = 'VERIFIED'
}

export type ParentUpdateOneRequiredWithoutChildrenInput = {
  connect?: InputMaybe<ParentWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ParentCreateOrConnectWithoutChildrenInput>;
  create?: InputMaybe<ParentCreateWithoutChildrenInput>;
  update?: InputMaybe<ParentUpdateWithoutChildrenInput>;
  upsert?: InputMaybe<ParentUpsertWithoutChildrenInput>;
};

export type ParentUpdateOneWithoutUserInput = {
  connect?: InputMaybe<ParentWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ParentCreateOrConnectWithoutUserInput>;
  create?: InputMaybe<ParentCreateWithoutUserInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<ParentUpdateWithoutUserInput>;
  upsert?: InputMaybe<ParentUpsertWithoutUserInput>;
};

export type ParentUpdateWithoutChildrenInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  status?: InputMaybe<EnumParentStatusFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutParentInput>;
};

export type ParentUpdateWithoutUserInput = {
  children?: InputMaybe<StudentUpdateManyWithoutParentInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  status?: InputMaybe<EnumParentStatusFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type ParentUpsertWithoutChildrenInput = {
  create: ParentCreateWithoutChildrenInput;
  update: ParentUpdateWithoutChildrenInput;
};

export type ParentUpsertWithoutUserInput = {
  create: ParentCreateWithoutUserInput;
  update: ParentUpdateWithoutUserInput;
};

export type ParentWhereInput = {
  AND?: InputMaybe<Array<ParentWhereInput>>;
  NOT?: InputMaybe<Array<ParentWhereInput>>;
  OR?: InputMaybe<Array<ParentWhereInput>>;
  children?: InputMaybe<StudentListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  email?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  password?: InputMaybe<StringFilter>;
  status?: InputMaybe<EnumParentStatusFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
};

export type ParentWhereUniqueInput = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  accessoriesCatalog: Array<AccessoryCatalog>;
  acquiredItem: AcquiredItem;
  acquiredItems: Array<AcquiredItem>;
  adminCountChallenge: Scalars['Int'];
  adminCountCourse: Scalars['Int'];
  adminCountUser: Scalars['Int'];
  adminFindManyUsers: Array<User>;
  adminFindUniqueUser: User;
  avatar: Avatar;
  avatarAssetCatalogCount: Scalars['Int'];
  avatarItem: AvatarItem;
  avatarItems: Array<AvatarItem>;
  block: Block;
  blocks: Array<Block>;
  categories: Array<Category>;
  category: Category;
  challenge: Challenge;
  challengeComments: Array<ChallengeComment>;
  challenges: Array<Challenge>;
  charactersCatalogs: Array<CharacterCatalog>;
  checkoutSessionDetails: Scalars['JSON'];
  checkpoint: Checkpoint;
  checkpoints: Array<Checkpoint>;
  child: Student;
  children: Array<Student>;
  countCourseReviews: Scalars['Int'];
  course: Course;
  courseChallenges: Array<Challenge>;
  courses: Array<Course>;
  enrolledCourse?: Maybe<EnrolledCourse>;
  enrolledCourses: Array<EnrolledCourse>;
  findAllFriends: Array<FriendShip>;
  findAllUsers: Scalars['JSON'];
  findChallenges: Array<Challenge>;
  findManyAssessmentBlock: Array<AssessmentBlock>;
  findManyAssessmentUser: Array<AssessmentUser>;
  findManyAvatarAssetCatalog: Array<AvatarAssetCatelog>;
  findManyAvatarAssetCategory: Array<AvatarAssetCategory>;
  findManyAvatarAssetColour: AvatarAssetColour;
  findManyBookmarks: Array<ForumPostBookmark>;
  findManyCourseReviews: Array<CourseReview>;
  findManyForumReport: Array<ForumReport>;
  findManyHairAvatarAsset: HairAvatarAsset;
  findManyNormalAvatarAsset: NormalAvatarAsset;
  findManyPosts: Array<ForumPost>;
  findManyPostsAndReactions: Array<ForumPostReactionDto>;
  findManySkinAvatarAsset: SkinAvatarAsset;
  findManySubtitles: Array<Subtitles>;
  findManyUsers: Array<User>;
  findOneAssessmentBlock: AssessmentBlock;
  findOneAssessmentUser: AssessmentUser;
  findOneAvatarAssetCatalog: AvatarAssetCatelog;
  findOneAvatarAssetCategory: AvatarAssetCategory;
  findOneAvatarAssetColour: AvatarAssetColour;
  findOneBookmark: ForumPostBookmark;
  findOneForumReport: ForumReport;
  findOneFriend?: Maybe<FriendShip>;
  findOneHairAvatarAsset: HairAvatarAsset;
  findOneNormalAvatarAsset: NormalAvatarAsset;
  findOnePosts: ForumPost;
  findOneSkinAvatarAsset: SkinAvatarAsset;
  findOneTransactionHistoryDetail: Scalars['JSON'];
  forumPostsCount: Scalars['Int'];
  forumReportCount: Scalars['Int'];
  generateRandomAvatar: NewUserAvatarDto;
  getCatalog: AvatarAssetCatalogDto;
  getSelfEnrolledCheckpoint?: Maybe<EnrolledCourse>;
  getUserAvatar: NewUserAvatarDto;
  me: User;
  myCourses: Array<Course>;
  notificationListAll: Array<UserNotification>;
  notificationListAllUnread: Array<UserNotification>;
  parentSubscriptions: Array<StripeSubscription>;
  purchaseItem: AcquiredItem;
  removeFriend: FriendShip;
  resetAccessoryCatalog: Array<AccessoryCatalog>;
  resetCatalog: Array<ItemCatalog>;
  resetCharacterCatalog: Array<CharacterCatalog>;
  shopItems: Array<AvatarItem>;
  stripeProducts: Array<StripeProduct>;
  teacher: Teacher;
  user: User;
  userNotificationSetting: UserNotificationSetting;
  userNotificationSettings: Array<UserNotificationSetting>;
};


export type QueryAccessoriesCatalogArgs = {
  cursor?: InputMaybe<AccessoryCatalogWhereUniqueInput>;
  distinct?: InputMaybe<Array<AccessoryCatalogScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AccessoryCatalogOrderByWithRelationAndSearchRelevanceInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AccessoryCatalogWhereInput>;
};


export type QueryAcquiredItemArgs = {
  where: AcquiredItemWhereUniqueInput;
};


export type QueryAcquiredItemsArgs = {
  cursor?: InputMaybe<AcquiredItemWhereUniqueInput>;
  distinct?: InputMaybe<Array<AcquiredItemScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AcquiredItemOrderByWithRelationAndSearchRelevanceInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AcquiredItemWhereInput>;
};


export type QueryAdminCountChallengeArgs = {
  cursor?: InputMaybe<ChallengeWhereUniqueInput>;
  distinct?: InputMaybe<Array<ChallengeScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ChallengeOrderByWithRelationAndSearchRelevanceInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ChallengeWhereInput>;
};


export type QueryAdminCountCourseArgs = {
  cursor?: InputMaybe<CourseWhereUniqueInput>;
  distinct?: InputMaybe<Array<CourseScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<CourseOrderByWithRelationAndSearchRelevanceInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CourseWhereInput>;
};


export type QueryAdminCountUserArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationAndSearchRelevanceInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};


export type QueryAdminFindManyUsersArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationAndSearchRelevanceInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};


export type QueryAdminFindUniqueUserArgs = {
  where: UserWhereUniqueInput;
};


export type QueryAvatarAssetCatalogCountArgs = {
  cursor?: InputMaybe<AvatarAssetCatelogWhereUniqueInput>;
  distinct?: InputMaybe<Array<AvatarAssetCatelogScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AvatarAssetCatelogOrderByWithRelationAndSearchRelevanceInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AvatarAssetCatelogWhereInput>;
};


export type QueryAvatarItemArgs = {
  where: AvatarItemWhereUniqueInput;
};


export type QueryAvatarItemsArgs = {
  cursor?: InputMaybe<AvatarItemWhereUniqueInput>;
  distinct?: InputMaybe<Array<AvatarItemScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AvatarItemOrderByWithRelationAndSearchRelevanceInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AvatarItemWhereInput>;
};


export type QueryBlockArgs = {
  where: BlockWhereUniqueInput;
};


export type QueryBlocksArgs = {
  cursor?: InputMaybe<BlockWhereUniqueInput>;
  distinct?: InputMaybe<Array<BlockScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<BlockOrderByWithRelationAndSearchRelevanceInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<BlockWhereInput>;
};


export type QueryCategoriesArgs = {
  cursor?: InputMaybe<CategoryWhereUniqueInput>;
  distinct?: InputMaybe<Array<CategoryScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<CategoryOrderByWithRelationAndSearchRelevanceInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CategoryWhereInput>;
};


export type QueryCategoryArgs = {
  where: CategoryWhereUniqueInput;
};


export type QueryChallengeArgs = {
  id: Scalars['String'];
};


export type QueryChallengeCommentsArgs = {
  cursor?: InputMaybe<ChallengeCommentWhereUniqueInput>;
  distinct?: InputMaybe<Array<ChallengeCommentScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ChallengeCommentOrderByWithRelationAndSearchRelevanceInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ChallengeCommentWhereInput>;
};


export type QueryChallengesArgs = {
  cursor?: InputMaybe<ChallengeWhereUniqueInput>;
  distinct?: InputMaybe<Array<ChallengeScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ChallengeOrderByWithRelationAndSearchRelevanceInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ChallengeWhereInput>;
};


export type QueryCharactersCatalogsArgs = {
  cursor?: InputMaybe<CharacterCatalogWhereUniqueInput>;
  distinct?: InputMaybe<Array<CharacterCatalogScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<CharacterCatalogOrderByWithRelationAndSearchRelevanceInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CharacterCatalogWhereInput>;
};


export type QueryCheckoutSessionDetailsArgs = {
  checkoutSessionId: Scalars['String'];
};


export type QueryCheckpointArgs = {
  where: CheckpointWhereUniqueInput;
};


export type QueryCheckpointsArgs = {
  cursor?: InputMaybe<CheckpointWhereUniqueInput>;
  distinct?: InputMaybe<Array<CheckpointScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<CheckpointOrderByWithRelationAndSearchRelevanceInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CheckpointWhereInput>;
};


export type QueryChildArgs = {
  id: Scalars['String'];
};


export type QueryCountCourseReviewsArgs = {
  courseId: Scalars['String'];
};


export type QueryCourseArgs = {
  where: CourseWhereUniqueInput;
};


export type QueryCourseChallengesArgs = {
  courseId: Scalars['String'];
};


export type QueryCoursesArgs = {
  cursor?: InputMaybe<CourseWhereUniqueInput>;
  distinct?: InputMaybe<Array<CourseScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<CourseOrderByWithRelationAndSearchRelevanceInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CourseWhereInput>;
};


export type QueryEnrolledCourseArgs = {
  where?: InputMaybe<WhereEnrolledCourse>;
};


export type QueryEnrolledCoursesArgs = {
  cursor?: InputMaybe<EnrolledCourseWhereUniqueInput>;
  distinct?: InputMaybe<Array<EnrolledCourseScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<EnrolledCourseOrderByWithRelationAndSearchRelevanceInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<EnrolledCourseWhereInput>;
};


export type QueryFindAllFriendsArgs = {
  cursor?: InputMaybe<FriendShipWhereUniqueInput>;
  distinct?: InputMaybe<Array<FriendShipScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<FriendShipOrderByWithRelationAndSearchRelevanceInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<FriendShipWhereInput>;
};


export type QueryFindChallengesArgs = {
  cursor?: InputMaybe<ChallengeWhereUniqueInput>;
  distinct?: InputMaybe<Array<ChallengeScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ChallengeOrderByWithRelationAndSearchRelevanceInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ChallengeWhereInput>;
};


export type QueryFindManyAssessmentBlockArgs = {
  cursor?: InputMaybe<AssessmentBlockWhereUniqueInput>;
  distinct?: InputMaybe<Array<AssessmentBlockScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AssessmentBlockOrderByWithRelationAndSearchRelevanceInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AssessmentBlockWhereInput>;
};


export type QueryFindManyAssessmentUserArgs = {
  cursor?: InputMaybe<AssessmentUserWhereUniqueInput>;
  distinct?: InputMaybe<Array<AssessmentUserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AssessmentUserOrderByWithRelationAndSearchRelevanceInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AssessmentUserWhereInput>;
};


export type QueryFindManyAvatarAssetCatalogArgs = {
  cursor?: InputMaybe<AvatarAssetCatelogWhereUniqueInput>;
  distinct?: InputMaybe<Array<AvatarAssetCatelogScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AvatarAssetCatelogOrderByWithRelationAndSearchRelevanceInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AvatarAssetCatelogWhereInput>;
};


export type QueryFindManyAvatarAssetCategoryArgs = {
  cursor?: InputMaybe<AvatarAssetCategoryWhereUniqueInput>;
  distinct?: InputMaybe<Array<AvatarAssetCategoryScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AvatarAssetCategoryOrderByWithRelationAndSearchRelevanceInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AvatarAssetCategoryWhereInput>;
};


export type QueryFindManyAvatarAssetColourArgs = {
  cursor?: InputMaybe<AvatarAssetColourWhereUniqueInput>;
  distinct?: InputMaybe<Array<AvatarAssetColourScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AvatarAssetColourOrderByWithRelationAndSearchRelevanceInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AvatarAssetColourWhereInput>;
};


export type QueryFindManyBookmarksArgs = {
  cursor?: InputMaybe<ForumPostBookmarkWhereUniqueInput>;
  distinct?: InputMaybe<Array<ForumPostBookmarkScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ForumPostBookmarkOrderByWithRelationAndSearchRelevanceInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ForumPostBookmarkWhereInput>;
};


export type QueryFindManyCourseReviewsArgs = {
  cursor?: InputMaybe<CourseReviewWhereUniqueInput>;
  distinct?: InputMaybe<Array<CourseReviewScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<CourseReviewOrderByWithRelationAndSearchRelevanceInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CourseReviewWhereInput>;
};


export type QueryFindManyForumReportArgs = {
  cursor?: InputMaybe<ForumReportWhereUniqueInput>;
  distinct?: InputMaybe<Array<ForumReportScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ForumReportOrderByWithRelationAndSearchRelevanceInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ForumReportWhereInput>;
};


export type QueryFindManyHairAvatarAssetArgs = {
  cursor?: InputMaybe<HairAvatarAssetWhereUniqueInput>;
  distinct?: InputMaybe<Array<HairAvatarAssetScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<HairAvatarAssetOrderByWithRelationAndSearchRelevanceInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<HairAvatarAssetWhereInput>;
};


export type QueryFindManyNormalAvatarAssetArgs = {
  cursor?: InputMaybe<NormalAvatarAssetWhereUniqueInput>;
  distinct?: InputMaybe<Array<NormalAvatarAssetScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<NormalAvatarAssetOrderByWithRelationAndSearchRelevanceInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<NormalAvatarAssetWhereInput>;
};


export type QueryFindManyPostsArgs = {
  cursor?: InputMaybe<ForumPostWhereUniqueInput>;
  distinct?: InputMaybe<Array<ForumPostScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ForumPostOrderByWithRelationAndSearchRelevanceInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ForumPostWhereInput>;
};


export type QueryFindManyPostsAndReactionsArgs = {
  cursor?: InputMaybe<ForumPostWhereUniqueInput>;
  distinct?: InputMaybe<Array<ForumPostScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ForumPostOrderByWithRelationAndSearchRelevanceInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ForumPostWhereInput>;
};


export type QueryFindManySkinAvatarAssetArgs = {
  cursor?: InputMaybe<SkinAvatarAssetWhereUniqueInput>;
  distinct?: InputMaybe<Array<SkinAvatarAssetScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<SkinAvatarAssetOrderByWithRelationAndSearchRelevanceInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SkinAvatarAssetWhereInput>;
};


export type QueryFindManySubtitlesArgs = {
  cursor?: InputMaybe<SubtitlesWhereUniqueInput>;
  distinct?: InputMaybe<Array<SubtitlesScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<SubtitlesOrderByWithRelationAndSearchRelevanceInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SubtitlesWhereInput>;
};


export type QueryFindManyUsersArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationAndSearchRelevanceInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};


export type QueryFindOneAssessmentBlockArgs = {
  cursor?: InputMaybe<AssessmentBlockWhereUniqueInput>;
  distinct?: InputMaybe<Array<AssessmentBlockScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AssessmentBlockOrderByWithRelationAndSearchRelevanceInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AssessmentBlockWhereInput>;
};


export type QueryFindOneAssessmentUserArgs = {
  cursor?: InputMaybe<AssessmentUserWhereUniqueInput>;
  distinct?: InputMaybe<Array<AssessmentUserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AssessmentUserOrderByWithRelationAndSearchRelevanceInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AssessmentUserWhereInput>;
};


export type QueryFindOneAvatarAssetCatalogArgs = {
  cursor?: InputMaybe<AvatarAssetCatelogWhereUniqueInput>;
  distinct?: InputMaybe<Array<AvatarAssetCatelogScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AvatarAssetCatelogOrderByWithRelationAndSearchRelevanceInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AvatarAssetCatelogWhereInput>;
};


export type QueryFindOneAvatarAssetCategoryArgs = {
  cursor?: InputMaybe<AvatarAssetCategoryWhereUniqueInput>;
  distinct?: InputMaybe<Array<AvatarAssetCategoryScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AvatarAssetCategoryOrderByWithRelationAndSearchRelevanceInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AvatarAssetCategoryWhereInput>;
};


export type QueryFindOneAvatarAssetColourArgs = {
  cursor?: InputMaybe<AvatarAssetColourWhereUniqueInput>;
  distinct?: InputMaybe<Array<AvatarAssetColourScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AvatarAssetColourOrderByWithRelationAndSearchRelevanceInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AvatarAssetColourWhereInput>;
};


export type QueryFindOneBookmarkArgs = {
  bookmarkId: Scalars['String'];
};


export type QueryFindOneForumReportArgs = {
  where: ForumReportWhereUniqueInput;
};


export type QueryFindOneFriendArgs = {
  id: Scalars['String'];
};


export type QueryFindOneHairAvatarAssetArgs = {
  cursor?: InputMaybe<HairAvatarAssetWhereUniqueInput>;
  distinct?: InputMaybe<Array<HairAvatarAssetScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<HairAvatarAssetOrderByWithRelationAndSearchRelevanceInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<HairAvatarAssetWhereInput>;
};


export type QueryFindOneNormalAvatarAssetArgs = {
  cursor?: InputMaybe<NormalAvatarAssetWhereUniqueInput>;
  distinct?: InputMaybe<Array<NormalAvatarAssetScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<NormalAvatarAssetOrderByWithRelationAndSearchRelevanceInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<NormalAvatarAssetWhereInput>;
};


export type QueryFindOnePostsArgs = {
  where: ForumPostWhereUniqueInput;
};


export type QueryFindOneSkinAvatarAssetArgs = {
  cursor?: InputMaybe<SkinAvatarAssetWhereUniqueInput>;
  distinct?: InputMaybe<Array<SkinAvatarAssetScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<SkinAvatarAssetOrderByWithRelationAndSearchRelevanceInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SkinAvatarAssetWhereInput>;
};


export type QueryFindOneTransactionHistoryDetailArgs = {
  id: Scalars['String'];
};


export type QueryForumPostsCountArgs = {
  cursor?: InputMaybe<ForumPostWhereUniqueInput>;
  distinct?: InputMaybe<Array<ForumPostScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ForumPostOrderByWithRelationAndSearchRelevanceInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ForumPostWhereInput>;
};


export type QueryForumReportCountArgs = {
  cursor?: InputMaybe<ForumReportWhereUniqueInput>;
  distinct?: InputMaybe<Array<ForumReportScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ForumReportOrderByWithRelationAndSearchRelevanceInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ForumReportWhereInput>;
};


export type QueryGetCatalogArgs = {
  cursor?: InputMaybe<AvatarAssetCategoryWhereUniqueInput>;
  distinct?: InputMaybe<Array<AvatarAssetCategoryScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AvatarAssetCategoryOrderByWithRelationAndSearchRelevanceInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AvatarAssetCategoryWhereInput>;
};


export type QueryGetSelfEnrolledCheckpointArgs = {
  checkpointId: Scalars['String'];
  courseId: Scalars['String'];
};


export type QueryMyCoursesArgs = {
  cursor?: InputMaybe<CourseWhereUniqueInput>;
  distinct?: InputMaybe<Array<CourseScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<CourseOrderByWithRelationAndSearchRelevanceInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CourseWhereInput>;
};


export type QueryParentSubscriptionsArgs = {
  cursor?: InputMaybe<StripeSubscriptionWhereUniqueInput>;
  distinct?: InputMaybe<Array<StripeSubscriptionScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<StripeSubscriptionOrderByWithRelationAndSearchRelevanceInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<StripeSubscriptionWhereInput>;
};


export type QueryPurchaseItemArgs = {
  chosenPrice: ShopCurrencyType;
  id: Scalars['String'];
};


export type QueryRemoveFriendArgs = {
  id: Scalars['String'];
};


export type QueryShopItemsArgs = {
  cursor?: InputMaybe<AvatarItemWhereUniqueInput>;
  distinct?: InputMaybe<Array<AvatarItemScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AvatarItemOrderByWithRelationAndSearchRelevanceInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AvatarItemWhereInput>;
};


export type QueryStripeProductsArgs = {
  cursor?: InputMaybe<StripeProductWhereUniqueInput>;
  distinct?: InputMaybe<Array<StripeProductScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<StripeProductOrderByWithRelationAndSearchRelevanceInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<StripeProductWhereInput>;
};


export type QueryTeacherArgs = {
  id: Scalars['String'];
};


export type QueryUserArgs = {
  id: Scalars['String'];
};


export type QueryUserNotificationSettingArgs = {
  where: UserNotificationSettingWhereUniqueInput;
};


export type QueryUserNotificationSettingsArgs = {
  cursor?: InputMaybe<UserNotificationSettingWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserNotificationSettingScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserNotificationSettingOrderByWithRelationAndSearchRelevanceInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserNotificationSettingWhereInput>;
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export type QuestionBlock = {
  __typename?: 'QuestionBlock';
  _count: QuestionBlockCount;
  answerQuantityType: AnswerQuantityType;
  answerType: AnswerType;
  asset?: Maybe<Asset>;
  assetId?: Maybe<Scalars['String']>;
  block?: Maybe<Block>;
  createdAt: Scalars['Date'];
  deleted?: Maybe<Scalars['Date']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  mediaAsset?: Maybe<Asset>;
  mediaAssetId?: Maybe<Scalars['String']>;
  pairs?: Maybe<Array<MatchingPair>>;
  quizType: QuizType;
  selections?: Maybe<Array<QuestionSelection>>;
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Date'];
};

export type QuestionBlockCount = {
  __typename?: 'QuestionBlockCount';
  pairs: Scalars['Int'];
  selections: Scalars['Int'];
};

export type QuestionBlockCreateNestedOneWithoutAssetInput = {
  connect?: InputMaybe<QuestionBlockWhereUniqueInput>;
  connectOrCreate?: InputMaybe<QuestionBlockCreateOrConnectWithoutAssetInput>;
  create?: InputMaybe<QuestionBlockCreateWithoutAssetInput>;
};

export type QuestionBlockCreateNestedOneWithoutBlockInput = {
  connect?: InputMaybe<QuestionBlockWhereUniqueInput>;
  connectOrCreate?: InputMaybe<QuestionBlockCreateOrConnectWithoutBlockInput>;
  create?: InputMaybe<QuestionBlockCreateWithoutBlockInput>;
};

export type QuestionBlockCreateNestedOneWithoutMediaAssetInput = {
  connect?: InputMaybe<QuestionBlockWhereUniqueInput>;
  connectOrCreate?: InputMaybe<QuestionBlockCreateOrConnectWithoutMediaAssetInput>;
  create?: InputMaybe<QuestionBlockCreateWithoutMediaAssetInput>;
};

export type QuestionBlockCreateNestedOneWithoutSelectionsInput = {
  connect?: InputMaybe<QuestionBlockWhereUniqueInput>;
  connectOrCreate?: InputMaybe<QuestionBlockCreateOrConnectWithoutSelectionsInput>;
  create?: InputMaybe<QuestionBlockCreateWithoutSelectionsInput>;
};

export type QuestionBlockCreateOrConnectWithoutAssetInput = {
  create: QuestionBlockCreateWithoutAssetInput;
  where: QuestionBlockWhereUniqueInput;
};

export type QuestionBlockCreateOrConnectWithoutBlockInput = {
  create: QuestionBlockCreateWithoutBlockInput;
  where: QuestionBlockWhereUniqueInput;
};

export type QuestionBlockCreateOrConnectWithoutMediaAssetInput = {
  create: QuestionBlockCreateWithoutMediaAssetInput;
  where: QuestionBlockWhereUniqueInput;
};

export type QuestionBlockCreateOrConnectWithoutSelectionsInput = {
  create: QuestionBlockCreateWithoutSelectionsInput;
  where: QuestionBlockWhereUniqueInput;
};

export type QuestionBlockCreateWithoutAssetInput = {
  answerQuantityType?: InputMaybe<AnswerQuantityType>;
  answerType?: InputMaybe<AnswerType>;
  block?: InputMaybe<BlockCreateNestedOneWithoutQuestionBlockInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  deleted?: InputMaybe<Scalars['Date']>;
  description?: InputMaybe<Scalars['String']>;
  mediaAsset?: InputMaybe<AssetCreateNestedOneWithoutQuestionMediaBlockInput>;
  pairs?: InputMaybe<MatchingPairCreateNestedManyWithoutQuestionInput>;
  quizType?: InputMaybe<QuizType>;
  selections?: InputMaybe<QuestionSelectionCreateNestedManyWithoutQuestionInput>;
  title?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type QuestionBlockCreateWithoutBlockInput = {
  answerQuantityType?: InputMaybe<AnswerQuantityType>;
  answerType?: InputMaybe<AnswerType>;
  asset?: InputMaybe<AssetCreateNestedOneWithoutQuestionBlockInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  deleted?: InputMaybe<Scalars['Date']>;
  description?: InputMaybe<Scalars['String']>;
  mediaAsset?: InputMaybe<AssetCreateNestedOneWithoutQuestionMediaBlockInput>;
  pairs?: InputMaybe<MatchingPairCreateNestedManyWithoutQuestionInput>;
  quizType?: InputMaybe<QuizType>;
  selections?: InputMaybe<QuestionSelectionCreateNestedManyWithoutQuestionInput>;
  title?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type QuestionBlockCreateWithoutMediaAssetInput = {
  answerQuantityType?: InputMaybe<AnswerQuantityType>;
  answerType?: InputMaybe<AnswerType>;
  asset?: InputMaybe<AssetCreateNestedOneWithoutQuestionBlockInput>;
  block?: InputMaybe<BlockCreateNestedOneWithoutQuestionBlockInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  deleted?: InputMaybe<Scalars['Date']>;
  description?: InputMaybe<Scalars['String']>;
  pairs?: InputMaybe<MatchingPairCreateNestedManyWithoutQuestionInput>;
  quizType?: InputMaybe<QuizType>;
  selections?: InputMaybe<QuestionSelectionCreateNestedManyWithoutQuestionInput>;
  title?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type QuestionBlockCreateWithoutSelectionsInput = {
  answerQuantityType?: InputMaybe<AnswerQuantityType>;
  answerType?: InputMaybe<AnswerType>;
  asset?: InputMaybe<AssetCreateNestedOneWithoutQuestionBlockInput>;
  block?: InputMaybe<BlockCreateNestedOneWithoutQuestionBlockInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  deleted?: InputMaybe<Scalars['Date']>;
  description?: InputMaybe<Scalars['String']>;
  mediaAsset?: InputMaybe<AssetCreateNestedOneWithoutQuestionMediaBlockInput>;
  pairs?: InputMaybe<MatchingPairCreateNestedManyWithoutQuestionInput>;
  quizType?: InputMaybe<QuizType>;
  title?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export enum QuestionBlockOrderByRelevanceFieldEnum {
  AssetId = 'assetId',
  Description = 'description',
  Id = 'id',
  MediaAssetId = 'mediaAssetId',
  Title = 'title'
}

export type QuestionBlockOrderByRelevanceInput = {
  fields: Array<QuestionBlockOrderByRelevanceFieldEnum>;
  search: Scalars['String'];
  sort: SortOrder;
};

export type QuestionBlockOrderByWithRelationAndSearchRelevanceInput = {
  _relevance?: InputMaybe<QuestionBlockOrderByRelevanceInput>;
  answerQuantityType?: InputMaybe<SortOrder>;
  answerType?: InputMaybe<SortOrder>;
  asset?: InputMaybe<AssetOrderByWithRelationAndSearchRelevanceInput>;
  assetId?: InputMaybe<SortOrder>;
  block?: InputMaybe<BlockOrderByWithRelationAndSearchRelevanceInput>;
  createdAt?: InputMaybe<SortOrder>;
  deleted?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  mediaAsset?: InputMaybe<AssetOrderByWithRelationAndSearchRelevanceInput>;
  mediaAssetId?: InputMaybe<SortOrder>;
  pairs?: InputMaybe<MatchingPairOrderByRelationAggregateInput>;
  quizType?: InputMaybe<SortOrder>;
  selections?: InputMaybe<QuestionSelectionOrderByRelationAggregateInput>;
  title?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type QuestionBlockRelationFilter = {
  is?: InputMaybe<QuestionBlockWhereInput>;
  isNot?: InputMaybe<QuestionBlockWhereInput>;
};

export type QuestionBlockUncheckedCreateNestedOneWithoutBlockInput = {
  connect?: InputMaybe<QuestionBlockWhereUniqueInput>;
  connectOrCreate?: InputMaybe<QuestionBlockCreateOrConnectWithoutBlockInput>;
  create?: InputMaybe<QuestionBlockCreateWithoutBlockInput>;
};

export type QuestionBlockUpdateOneWithoutAssetInput = {
  connect?: InputMaybe<QuestionBlockWhereUniqueInput>;
  connectOrCreate?: InputMaybe<QuestionBlockCreateOrConnectWithoutAssetInput>;
  create?: InputMaybe<QuestionBlockCreateWithoutAssetInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<QuestionBlockUpdateWithoutAssetInput>;
  upsert?: InputMaybe<QuestionBlockUpsertWithoutAssetInput>;
};

export type QuestionBlockUpdateOneWithoutBlockInput = {
  connect?: InputMaybe<QuestionBlockWhereUniqueInput>;
  connectOrCreate?: InputMaybe<QuestionBlockCreateOrConnectWithoutBlockInput>;
  create?: InputMaybe<QuestionBlockCreateWithoutBlockInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<QuestionBlockUpdateWithoutBlockInput>;
  upsert?: InputMaybe<QuestionBlockUpsertWithoutBlockInput>;
};

export type QuestionBlockUpdateOneWithoutMediaAssetInput = {
  connect?: InputMaybe<QuestionBlockWhereUniqueInput>;
  connectOrCreate?: InputMaybe<QuestionBlockCreateOrConnectWithoutMediaAssetInput>;
  create?: InputMaybe<QuestionBlockCreateWithoutMediaAssetInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<QuestionBlockUpdateWithoutMediaAssetInput>;
  upsert?: InputMaybe<QuestionBlockUpsertWithoutMediaAssetInput>;
};

export type QuestionBlockUpdateOneWithoutSelectionsInput = {
  connect?: InputMaybe<QuestionBlockWhereUniqueInput>;
  connectOrCreate?: InputMaybe<QuestionBlockCreateOrConnectWithoutSelectionsInput>;
  create?: InputMaybe<QuestionBlockCreateWithoutSelectionsInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<QuestionBlockUpdateWithoutSelectionsInput>;
  upsert?: InputMaybe<QuestionBlockUpsertWithoutSelectionsInput>;
};

export type QuestionBlockUpdateWithoutAssetInput = {
  answerQuantityType?: InputMaybe<EnumAnswerQuantityTypeFieldUpdateOperationsInput>;
  answerType?: InputMaybe<EnumAnswerTypeFieldUpdateOperationsInput>;
  block?: InputMaybe<BlockUpdateOneWithoutQuestionBlockInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deleted?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  mediaAsset?: InputMaybe<AssetUpdateOneWithoutQuestionMediaBlockInput>;
  pairs?: InputMaybe<MatchingPairUpdateManyWithoutQuestionInput>;
  quizType?: InputMaybe<EnumQuizTypeFieldUpdateOperationsInput>;
  selections?: InputMaybe<QuestionSelectionUpdateManyWithoutQuestionInput>;
  title?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type QuestionBlockUpdateWithoutBlockInput = {
  answerQuantityType?: InputMaybe<EnumAnswerQuantityTypeFieldUpdateOperationsInput>;
  answerType?: InputMaybe<EnumAnswerTypeFieldUpdateOperationsInput>;
  asset?: InputMaybe<AssetUpdateOneWithoutQuestionBlockInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deleted?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  mediaAsset?: InputMaybe<AssetUpdateOneWithoutQuestionMediaBlockInput>;
  pairs?: InputMaybe<MatchingPairUpdateManyWithoutQuestionInput>;
  quizType?: InputMaybe<EnumQuizTypeFieldUpdateOperationsInput>;
  selections?: InputMaybe<QuestionSelectionUpdateManyWithoutQuestionInput>;
  title?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type QuestionBlockUpdateWithoutMediaAssetInput = {
  answerQuantityType?: InputMaybe<EnumAnswerQuantityTypeFieldUpdateOperationsInput>;
  answerType?: InputMaybe<EnumAnswerTypeFieldUpdateOperationsInput>;
  asset?: InputMaybe<AssetUpdateOneWithoutQuestionBlockInput>;
  block?: InputMaybe<BlockUpdateOneWithoutQuestionBlockInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deleted?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  pairs?: InputMaybe<MatchingPairUpdateManyWithoutQuestionInput>;
  quizType?: InputMaybe<EnumQuizTypeFieldUpdateOperationsInput>;
  selections?: InputMaybe<QuestionSelectionUpdateManyWithoutQuestionInput>;
  title?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type QuestionBlockUpdateWithoutSelectionsInput = {
  answerQuantityType?: InputMaybe<EnumAnswerQuantityTypeFieldUpdateOperationsInput>;
  answerType?: InputMaybe<EnumAnswerTypeFieldUpdateOperationsInput>;
  asset?: InputMaybe<AssetUpdateOneWithoutQuestionBlockInput>;
  block?: InputMaybe<BlockUpdateOneWithoutQuestionBlockInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deleted?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  mediaAsset?: InputMaybe<AssetUpdateOneWithoutQuestionMediaBlockInput>;
  pairs?: InputMaybe<MatchingPairUpdateManyWithoutQuestionInput>;
  quizType?: InputMaybe<EnumQuizTypeFieldUpdateOperationsInput>;
  title?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type QuestionBlockUpsertWithoutAssetInput = {
  create: QuestionBlockCreateWithoutAssetInput;
  update: QuestionBlockUpdateWithoutAssetInput;
};

export type QuestionBlockUpsertWithoutBlockInput = {
  create: QuestionBlockCreateWithoutBlockInput;
  update: QuestionBlockUpdateWithoutBlockInput;
};

export type QuestionBlockUpsertWithoutMediaAssetInput = {
  create: QuestionBlockCreateWithoutMediaAssetInput;
  update: QuestionBlockUpdateWithoutMediaAssetInput;
};

export type QuestionBlockUpsertWithoutSelectionsInput = {
  create: QuestionBlockCreateWithoutSelectionsInput;
  update: QuestionBlockUpdateWithoutSelectionsInput;
};

export type QuestionBlockWhereInput = {
  AND?: InputMaybe<Array<QuestionBlockWhereInput>>;
  NOT?: InputMaybe<Array<QuestionBlockWhereInput>>;
  OR?: InputMaybe<Array<QuestionBlockWhereInput>>;
  answerQuantityType?: InputMaybe<EnumAnswerQuantityTypeFilter>;
  answerType?: InputMaybe<EnumAnswerTypeFilter>;
  asset?: InputMaybe<AssetRelationFilter>;
  assetId?: InputMaybe<StringNullableFilter>;
  block?: InputMaybe<BlockRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  deleted?: InputMaybe<DateTimeNullableFilter>;
  description?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  mediaAsset?: InputMaybe<AssetRelationFilter>;
  mediaAssetId?: InputMaybe<StringNullableFilter>;
  pairs?: InputMaybe<MatchingPairListRelationFilter>;
  quizType?: InputMaybe<EnumQuizTypeFilter>;
  selections?: InputMaybe<QuestionSelectionListRelationFilter>;
  title?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type QuestionBlockWhereUniqueInput = {
  assetId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  mediaAssetId?: InputMaybe<Scalars['String']>;
};

export type QuestionSelection = {
  __typename?: 'QuestionSelection';
  asset?: Maybe<Asset>;
  assetId?: Maybe<Scalars['String']>;
  deleted?: Maybe<Scalars['Date']>;
  id: Scalars['ID'];
  isCorrect: Scalars['Boolean'];
  order: Scalars['Int'];
  question?: Maybe<QuestionBlock>;
  questionId?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
};

export type QuestionSelectionCreateManyQuestionInput = {
  assetId?: InputMaybe<Scalars['String']>;
  deleted?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  isCorrect?: InputMaybe<Scalars['Boolean']>;
  order?: InputMaybe<Scalars['Int']>;
  text?: InputMaybe<Scalars['String']>;
};

export type QuestionSelectionCreateManyQuestionInputEnvelope = {
  data: Array<QuestionSelectionCreateManyQuestionInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type QuestionSelectionCreateNestedManyWithoutQuestionInput = {
  connect?: InputMaybe<Array<QuestionSelectionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<QuestionSelectionCreateOrConnectWithoutQuestionInput>>;
  create?: InputMaybe<Array<QuestionSelectionCreateWithoutQuestionInput>>;
  createMany?: InputMaybe<QuestionSelectionCreateManyQuestionInputEnvelope>;
};

export type QuestionSelectionCreateNestedOneWithoutAssetInput = {
  connect?: InputMaybe<QuestionSelectionWhereUniqueInput>;
  connectOrCreate?: InputMaybe<QuestionSelectionCreateOrConnectWithoutAssetInput>;
  create?: InputMaybe<QuestionSelectionCreateWithoutAssetInput>;
};

export type QuestionSelectionCreateOrConnectWithoutAssetInput = {
  create: QuestionSelectionCreateWithoutAssetInput;
  where: QuestionSelectionWhereUniqueInput;
};

export type QuestionSelectionCreateOrConnectWithoutQuestionInput = {
  create: QuestionSelectionCreateWithoutQuestionInput;
  where: QuestionSelectionWhereUniqueInput;
};

export type QuestionSelectionCreateWithoutAssetInput = {
  deleted?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  isCorrect?: InputMaybe<Scalars['Boolean']>;
  order?: InputMaybe<Scalars['Int']>;
  question?: InputMaybe<QuestionBlockCreateNestedOneWithoutSelectionsInput>;
  text?: InputMaybe<Scalars['String']>;
};

export type QuestionSelectionCreateWithoutQuestionInput = {
  asset?: InputMaybe<AssetCreateNestedOneWithoutQuestionSelectionInput>;
  deleted?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  isCorrect?: InputMaybe<Scalars['Boolean']>;
  order?: InputMaybe<Scalars['Int']>;
  text?: InputMaybe<Scalars['String']>;
};

export type QuestionSelectionListRelationFilter = {
  every?: InputMaybe<QuestionSelectionWhereInput>;
  none?: InputMaybe<QuestionSelectionWhereInput>;
  some?: InputMaybe<QuestionSelectionWhereInput>;
};

export type QuestionSelectionOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export enum QuestionSelectionOrderByRelevanceFieldEnum {
  AssetId = 'assetId',
  Id = 'id',
  QuestionId = 'questionId',
  Text = 'text'
}

export type QuestionSelectionOrderByRelevanceInput = {
  fields: Array<QuestionSelectionOrderByRelevanceFieldEnum>;
  search: Scalars['String'];
  sort: SortOrder;
};

export type QuestionSelectionOrderByWithRelationAndSearchRelevanceInput = {
  _relevance?: InputMaybe<QuestionSelectionOrderByRelevanceInput>;
  asset?: InputMaybe<AssetOrderByWithRelationAndSearchRelevanceInput>;
  assetId?: InputMaybe<SortOrder>;
  deleted?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isCorrect?: InputMaybe<SortOrder>;
  order?: InputMaybe<SortOrder>;
  question?: InputMaybe<QuestionBlockOrderByWithRelationAndSearchRelevanceInput>;
  questionId?: InputMaybe<SortOrder>;
  text?: InputMaybe<SortOrder>;
};

export type QuestionSelectionRelationFilter = {
  is?: InputMaybe<QuestionSelectionWhereInput>;
  isNot?: InputMaybe<QuestionSelectionWhereInput>;
};

export type QuestionSelectionScalarWhereInput = {
  AND?: InputMaybe<Array<QuestionSelectionScalarWhereInput>>;
  NOT?: InputMaybe<Array<QuestionSelectionScalarWhereInput>>;
  OR?: InputMaybe<Array<QuestionSelectionScalarWhereInput>>;
  assetId?: InputMaybe<StringNullableFilter>;
  deleted?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<StringFilter>;
  isCorrect?: InputMaybe<BoolFilter>;
  order?: InputMaybe<IntFilter>;
  questionId?: InputMaybe<StringNullableFilter>;
  text?: InputMaybe<StringNullableFilter>;
};

export type QuestionSelectionUpdateManyMutationInput = {
  deleted?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isCorrect?: InputMaybe<BoolFieldUpdateOperationsInput>;
  order?: InputMaybe<IntFieldUpdateOperationsInput>;
  text?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type QuestionSelectionUpdateManyWithWhereWithoutQuestionInput = {
  data: QuestionSelectionUpdateManyMutationInput;
  where: QuestionSelectionScalarWhereInput;
};

export type QuestionSelectionUpdateManyWithoutQuestionInput = {
  connect?: InputMaybe<Array<QuestionSelectionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<QuestionSelectionCreateOrConnectWithoutQuestionInput>>;
  create?: InputMaybe<Array<QuestionSelectionCreateWithoutQuestionInput>>;
  createMany?: InputMaybe<QuestionSelectionCreateManyQuestionInputEnvelope>;
  delete?: InputMaybe<Array<QuestionSelectionWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<QuestionSelectionScalarWhereInput>>;
  disconnect?: InputMaybe<Array<QuestionSelectionWhereUniqueInput>>;
  set?: InputMaybe<Array<QuestionSelectionWhereUniqueInput>>;
  update?: InputMaybe<Array<QuestionSelectionUpdateWithWhereUniqueWithoutQuestionInput>>;
  updateMany?: InputMaybe<Array<QuestionSelectionUpdateManyWithWhereWithoutQuestionInput>>;
  upsert?: InputMaybe<Array<QuestionSelectionUpsertWithWhereUniqueWithoutQuestionInput>>;
};

export type QuestionSelectionUpdateOneWithoutAssetInput = {
  connect?: InputMaybe<QuestionSelectionWhereUniqueInput>;
  connectOrCreate?: InputMaybe<QuestionSelectionCreateOrConnectWithoutAssetInput>;
  create?: InputMaybe<QuestionSelectionCreateWithoutAssetInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<QuestionSelectionUpdateWithoutAssetInput>;
  upsert?: InputMaybe<QuestionSelectionUpsertWithoutAssetInput>;
};

export type QuestionSelectionUpdateWithWhereUniqueWithoutQuestionInput = {
  data: QuestionSelectionUpdateWithoutQuestionInput;
  where: QuestionSelectionWhereUniqueInput;
};

export type QuestionSelectionUpdateWithoutAssetInput = {
  deleted?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isCorrect?: InputMaybe<BoolFieldUpdateOperationsInput>;
  order?: InputMaybe<IntFieldUpdateOperationsInput>;
  question?: InputMaybe<QuestionBlockUpdateOneWithoutSelectionsInput>;
  text?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type QuestionSelectionUpdateWithoutQuestionInput = {
  asset?: InputMaybe<AssetUpdateOneWithoutQuestionSelectionInput>;
  deleted?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isCorrect?: InputMaybe<BoolFieldUpdateOperationsInput>;
  order?: InputMaybe<IntFieldUpdateOperationsInput>;
  text?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type QuestionSelectionUpsertWithWhereUniqueWithoutQuestionInput = {
  create: QuestionSelectionCreateWithoutQuestionInput;
  update: QuestionSelectionUpdateWithoutQuestionInput;
  where: QuestionSelectionWhereUniqueInput;
};

export type QuestionSelectionUpsertWithoutAssetInput = {
  create: QuestionSelectionCreateWithoutAssetInput;
  update: QuestionSelectionUpdateWithoutAssetInput;
};

export type QuestionSelectionWhereInput = {
  AND?: InputMaybe<Array<QuestionSelectionWhereInput>>;
  NOT?: InputMaybe<Array<QuestionSelectionWhereInput>>;
  OR?: InputMaybe<Array<QuestionSelectionWhereInput>>;
  asset?: InputMaybe<AssetRelationFilter>;
  assetId?: InputMaybe<StringNullableFilter>;
  deleted?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<StringFilter>;
  isCorrect?: InputMaybe<BoolFilter>;
  order?: InputMaybe<IntFilter>;
  question?: InputMaybe<QuestionBlockRelationFilter>;
  questionId?: InputMaybe<StringNullableFilter>;
  text?: InputMaybe<StringNullableFilter>;
};

export type QuestionSelectionWhereUniqueInput = {
  assetId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
};

export enum QuizType {
  DragDrop = 'DRAG_DROP',
  Hearing = 'HEARING',
  Matching = 'MATCHING',
  Objective = 'OBJECTIVE'
}

export enum ReactionEmoji {
  Celebrate = 'CELEBRATE',
  Clap = 'CLAP',
  Heart = 'HEART',
  Laugh = 'LAUGH',
  Like = 'LIKE',
  Relaxed = 'RELAXED',
  Smile = 'SMILE'
}

export enum ReactionEmojies {
  Celebrate = 'CELEBRATE',
  Clap = 'CLAP',
  Heart = 'HEART',
  Laugh = 'LAUGH',
  Like = 'LIKE',
  Relaxed = 'RELAXED',
  Smile = 'SMILE'
}

export type ResetPasswordInput = {
  password: Scalars['String'];
  token: Scalars['String'];
};

export type ResetSendEmailInput = {
  email: Scalars['String'];
};

export type Response = {
  __typename?: 'Response';
  message: Scalars['String'];
};

export enum Role {
  Admin = 'ADMIN',
  Parent = 'PARENT',
  Student = 'STUDENT',
  Superadmin = 'SUPERADMIN',
  Teacher = 'TEACHER'
}

export enum ShopCurrencyType {
  Cash = 'CASH',
  Hard = 'HARD',
  Soft = 'SOFT'
}

export type SignupInput = {
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  role: Role;
};

export type SkinAvatarAsset = {
  __typename?: 'SkinAvatarAsset';
  avatarAssetCatelog?: Maybe<AvatarAssetCatelog>;
  avatarAssetCatelogId?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  imgUrl: Scalars['String'];
  isHalfBody: Scalars['Boolean'];
  label: Scalars['String'];
  skinColour: AvatarAssetColour;
  skinColourId: Scalars['String'];
  updatedAt: Scalars['Date'];
};

export type SkinAvatarAssetCreateInput = {
  avatarAssetCatelog?: InputMaybe<AvatarAssetCatelogCreateNestedOneWithoutSkinAvatarAssetInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  imgUrl: Scalars['String'];
  isHalfBody?: InputMaybe<Scalars['Boolean']>;
  label: Scalars['String'];
  skinColour: AvatarAssetColourCreateNestedOneWithoutSkinAvatarAssetInput;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type SkinAvatarAssetCreateManyAvatarAssetCatelogInput = {
  createdAt?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  imgUrl: Scalars['String'];
  isHalfBody?: InputMaybe<Scalars['Boolean']>;
  label: Scalars['String'];
  skinColourId: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type SkinAvatarAssetCreateManyAvatarAssetCatelogInputEnvelope = {
  data: Array<SkinAvatarAssetCreateManyAvatarAssetCatelogInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type SkinAvatarAssetCreateManyInput = {
  avatarAssetCatelogId?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  imgUrl: Scalars['String'];
  isHalfBody?: InputMaybe<Scalars['Boolean']>;
  label: Scalars['String'];
  skinColourId: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type SkinAvatarAssetCreateManySkinColourInput = {
  avatarAssetCatelogId?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  imgUrl: Scalars['String'];
  isHalfBody?: InputMaybe<Scalars['Boolean']>;
  label: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type SkinAvatarAssetCreateManySkinColourInputEnvelope = {
  data: Array<SkinAvatarAssetCreateManySkinColourInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type SkinAvatarAssetCreateNestedManyWithoutAvatarAssetCatelogInput = {
  connect?: InputMaybe<Array<SkinAvatarAssetWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<SkinAvatarAssetCreateOrConnectWithoutAvatarAssetCatelogInput>>;
  create?: InputMaybe<Array<SkinAvatarAssetCreateWithoutAvatarAssetCatelogInput>>;
  createMany?: InputMaybe<SkinAvatarAssetCreateManyAvatarAssetCatelogInputEnvelope>;
};

export type SkinAvatarAssetCreateNestedManyWithoutSkinColourInput = {
  connect?: InputMaybe<Array<SkinAvatarAssetWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<SkinAvatarAssetCreateOrConnectWithoutSkinColourInput>>;
  create?: InputMaybe<Array<SkinAvatarAssetCreateWithoutSkinColourInput>>;
  createMany?: InputMaybe<SkinAvatarAssetCreateManySkinColourInputEnvelope>;
};

export type SkinAvatarAssetCreateOrConnectWithoutAvatarAssetCatelogInput = {
  create: SkinAvatarAssetCreateWithoutAvatarAssetCatelogInput;
  where: SkinAvatarAssetWhereUniqueInput;
};

export type SkinAvatarAssetCreateOrConnectWithoutSkinColourInput = {
  create: SkinAvatarAssetCreateWithoutSkinColourInput;
  where: SkinAvatarAssetWhereUniqueInput;
};

export type SkinAvatarAssetCreateWithoutAvatarAssetCatelogInput = {
  createdAt?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  imgUrl: Scalars['String'];
  isHalfBody?: InputMaybe<Scalars['Boolean']>;
  label: Scalars['String'];
  skinColour: AvatarAssetColourCreateNestedOneWithoutSkinAvatarAssetInput;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type SkinAvatarAssetCreateWithoutSkinColourInput = {
  avatarAssetCatelog?: InputMaybe<AvatarAssetCatelogCreateNestedOneWithoutSkinAvatarAssetInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  imgUrl: Scalars['String'];
  isHalfBody?: InputMaybe<Scalars['Boolean']>;
  label: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type SkinAvatarAssetListRelationFilter = {
  every?: InputMaybe<SkinAvatarAssetWhereInput>;
  none?: InputMaybe<SkinAvatarAssetWhereInput>;
  some?: InputMaybe<SkinAvatarAssetWhereInput>;
};

export type SkinAvatarAssetOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export enum SkinAvatarAssetOrderByRelevanceFieldEnum {
  AvatarAssetCatelogId = 'avatarAssetCatelogId',
  Id = 'id',
  ImgUrl = 'imgUrl',
  Label = 'label',
  SkinColourId = 'skinColourId'
}

export type SkinAvatarAssetOrderByRelevanceInput = {
  fields: Array<SkinAvatarAssetOrderByRelevanceFieldEnum>;
  search: Scalars['String'];
  sort: SortOrder;
};

export type SkinAvatarAssetOrderByWithRelationAndSearchRelevanceInput = {
  _relevance?: InputMaybe<SkinAvatarAssetOrderByRelevanceInput>;
  avatarAssetCatelog?: InputMaybe<AvatarAssetCatelogOrderByWithRelationAndSearchRelevanceInput>;
  avatarAssetCatelogId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  imgUrl?: InputMaybe<SortOrder>;
  isHalfBody?: InputMaybe<SortOrder>;
  label?: InputMaybe<SortOrder>;
  skinColour?: InputMaybe<AvatarAssetColourOrderByWithRelationAndSearchRelevanceInput>;
  skinColourId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum SkinAvatarAssetScalarFieldEnum {
  AvatarAssetCatelogId = 'avatarAssetCatelogId',
  CreatedAt = 'createdAt',
  Id = 'id',
  ImgUrl = 'imgUrl',
  IsHalfBody = 'isHalfBody',
  Label = 'label',
  SkinColourId = 'skinColourId',
  UpdatedAt = 'updatedAt'
}

export type SkinAvatarAssetScalarWhereInput = {
  AND?: InputMaybe<Array<SkinAvatarAssetScalarWhereInput>>;
  NOT?: InputMaybe<Array<SkinAvatarAssetScalarWhereInput>>;
  OR?: InputMaybe<Array<SkinAvatarAssetScalarWhereInput>>;
  avatarAssetCatelogId?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  imgUrl?: InputMaybe<StringFilter>;
  isHalfBody?: InputMaybe<BoolFilter>;
  label?: InputMaybe<StringFilter>;
  skinColourId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type SkinAvatarAssetUpdateInput = {
  avatarAssetCatelog?: InputMaybe<AvatarAssetCatelogUpdateOneWithoutSkinAvatarAssetInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  imgUrl?: InputMaybe<StringFieldUpdateOperationsInput>;
  isHalfBody?: InputMaybe<BoolFieldUpdateOperationsInput>;
  label?: InputMaybe<StringFieldUpdateOperationsInput>;
  skinColour?: InputMaybe<AvatarAssetColourUpdateOneRequiredWithoutSkinAvatarAssetInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type SkinAvatarAssetUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  imgUrl?: InputMaybe<StringFieldUpdateOperationsInput>;
  isHalfBody?: InputMaybe<BoolFieldUpdateOperationsInput>;
  label?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type SkinAvatarAssetUpdateManyWithWhereWithoutAvatarAssetCatelogInput = {
  data: SkinAvatarAssetUpdateManyMutationInput;
  where: SkinAvatarAssetScalarWhereInput;
};

export type SkinAvatarAssetUpdateManyWithWhereWithoutSkinColourInput = {
  data: SkinAvatarAssetUpdateManyMutationInput;
  where: SkinAvatarAssetScalarWhereInput;
};

export type SkinAvatarAssetUpdateManyWithoutAvatarAssetCatelogInput = {
  connect?: InputMaybe<Array<SkinAvatarAssetWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<SkinAvatarAssetCreateOrConnectWithoutAvatarAssetCatelogInput>>;
  create?: InputMaybe<Array<SkinAvatarAssetCreateWithoutAvatarAssetCatelogInput>>;
  createMany?: InputMaybe<SkinAvatarAssetCreateManyAvatarAssetCatelogInputEnvelope>;
  delete?: InputMaybe<Array<SkinAvatarAssetWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<SkinAvatarAssetScalarWhereInput>>;
  disconnect?: InputMaybe<Array<SkinAvatarAssetWhereUniqueInput>>;
  set?: InputMaybe<Array<SkinAvatarAssetWhereUniqueInput>>;
  update?: InputMaybe<Array<SkinAvatarAssetUpdateWithWhereUniqueWithoutAvatarAssetCatelogInput>>;
  updateMany?: InputMaybe<Array<SkinAvatarAssetUpdateManyWithWhereWithoutAvatarAssetCatelogInput>>;
  upsert?: InputMaybe<Array<SkinAvatarAssetUpsertWithWhereUniqueWithoutAvatarAssetCatelogInput>>;
};

export type SkinAvatarAssetUpdateManyWithoutSkinColourInput = {
  connect?: InputMaybe<Array<SkinAvatarAssetWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<SkinAvatarAssetCreateOrConnectWithoutSkinColourInput>>;
  create?: InputMaybe<Array<SkinAvatarAssetCreateWithoutSkinColourInput>>;
  createMany?: InputMaybe<SkinAvatarAssetCreateManySkinColourInputEnvelope>;
  delete?: InputMaybe<Array<SkinAvatarAssetWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<SkinAvatarAssetScalarWhereInput>>;
  disconnect?: InputMaybe<Array<SkinAvatarAssetWhereUniqueInput>>;
  set?: InputMaybe<Array<SkinAvatarAssetWhereUniqueInput>>;
  update?: InputMaybe<Array<SkinAvatarAssetUpdateWithWhereUniqueWithoutSkinColourInput>>;
  updateMany?: InputMaybe<Array<SkinAvatarAssetUpdateManyWithWhereWithoutSkinColourInput>>;
  upsert?: InputMaybe<Array<SkinAvatarAssetUpsertWithWhereUniqueWithoutSkinColourInput>>;
};

export type SkinAvatarAssetUpdateWithWhereUniqueWithoutAvatarAssetCatelogInput = {
  data: SkinAvatarAssetUpdateWithoutAvatarAssetCatelogInput;
  where: SkinAvatarAssetWhereUniqueInput;
};

export type SkinAvatarAssetUpdateWithWhereUniqueWithoutSkinColourInput = {
  data: SkinAvatarAssetUpdateWithoutSkinColourInput;
  where: SkinAvatarAssetWhereUniqueInput;
};

export type SkinAvatarAssetUpdateWithoutAvatarAssetCatelogInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  imgUrl?: InputMaybe<StringFieldUpdateOperationsInput>;
  isHalfBody?: InputMaybe<BoolFieldUpdateOperationsInput>;
  label?: InputMaybe<StringFieldUpdateOperationsInput>;
  skinColour?: InputMaybe<AvatarAssetColourUpdateOneRequiredWithoutSkinAvatarAssetInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type SkinAvatarAssetUpdateWithoutSkinColourInput = {
  avatarAssetCatelog?: InputMaybe<AvatarAssetCatelogUpdateOneWithoutSkinAvatarAssetInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  imgUrl?: InputMaybe<StringFieldUpdateOperationsInput>;
  isHalfBody?: InputMaybe<BoolFieldUpdateOperationsInput>;
  label?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type SkinAvatarAssetUpsertWithWhereUniqueWithoutAvatarAssetCatelogInput = {
  create: SkinAvatarAssetCreateWithoutAvatarAssetCatelogInput;
  update: SkinAvatarAssetUpdateWithoutAvatarAssetCatelogInput;
  where: SkinAvatarAssetWhereUniqueInput;
};

export type SkinAvatarAssetUpsertWithWhereUniqueWithoutSkinColourInput = {
  create: SkinAvatarAssetCreateWithoutSkinColourInput;
  update: SkinAvatarAssetUpdateWithoutSkinColourInput;
  where: SkinAvatarAssetWhereUniqueInput;
};

export type SkinAvatarAssetWhereInput = {
  AND?: InputMaybe<Array<SkinAvatarAssetWhereInput>>;
  NOT?: InputMaybe<Array<SkinAvatarAssetWhereInput>>;
  OR?: InputMaybe<Array<SkinAvatarAssetWhereInput>>;
  avatarAssetCatelog?: InputMaybe<AvatarAssetCatelogRelationFilter>;
  avatarAssetCatelogId?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  imgUrl?: InputMaybe<StringFilter>;
  isHalfBody?: InputMaybe<BoolFilter>;
  label?: InputMaybe<StringFilter>;
  skinColour?: InputMaybe<AvatarAssetColourRelationFilter>;
  skinColourId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type SkinAvatarAssetWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  imgUrl?: InputMaybe<Scalars['String']>;
};

export type SkinColourAvatarAsset = {
  __typename?: 'SkinColourAvatarAsset';
  colour: AvatarAssetColour;
  fullBody?: Maybe<Array<SkinAvatarAsset>>;
  halfBody?: Maybe<Array<SkinAvatarAsset>>;
  withCatelog?: Maybe<Array<SkinAvatarAsset>>;
};

export type SkinItem = {
  __typename?: 'SkinItem';
  id: Scalars['ID'];
  item: AvatarItem;
  skinType: SkinType;
};

export type SkinItemCreateNestedOneWithoutItemInput = {
  connect?: InputMaybe<SkinItemWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SkinItemCreateOrConnectWithoutItemInput>;
  create?: InputMaybe<SkinItemCreateWithoutItemInput>;
};

export type SkinItemCreateOrConnectWithoutItemInput = {
  create: SkinItemCreateWithoutItemInput;
  where: SkinItemWhereUniqueInput;
};

export type SkinItemCreateWithoutItemInput = {
  skinType: SkinType;
};

export enum SkinItemOrderByRelevanceFieldEnum {
  Id = 'id'
}

export type SkinItemOrderByRelevanceInput = {
  fields: Array<SkinItemOrderByRelevanceFieldEnum>;
  search: Scalars['String'];
  sort: SortOrder;
};

export type SkinItemOrderByWithRelationAndSearchRelevanceInput = {
  _relevance?: InputMaybe<SkinItemOrderByRelevanceInput>;
  id?: InputMaybe<SortOrder>;
  item?: InputMaybe<AvatarItemOrderByWithRelationAndSearchRelevanceInput>;
  skinType?: InputMaybe<SortOrder>;
};

export type SkinItemRelationFilter = {
  is?: InputMaybe<SkinItemWhereInput>;
  isNot?: InputMaybe<SkinItemWhereInput>;
};

export type SkinItemUpdateOneWithoutItemInput = {
  connect?: InputMaybe<SkinItemWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SkinItemCreateOrConnectWithoutItemInput>;
  create?: InputMaybe<SkinItemCreateWithoutItemInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<SkinItemUpdateWithoutItemInput>;
  upsert?: InputMaybe<SkinItemUpsertWithoutItemInput>;
};

export type SkinItemUpdateWithoutItemInput = {
  skinType?: InputMaybe<EnumSkinTypeFieldUpdateOperationsInput>;
};

export type SkinItemUpsertWithoutItemInput = {
  create: SkinItemCreateWithoutItemInput;
  update: SkinItemUpdateWithoutItemInput;
};

export type SkinItemWhereInput = {
  AND?: InputMaybe<Array<SkinItemWhereInput>>;
  NOT?: InputMaybe<Array<SkinItemWhereInput>>;
  OR?: InputMaybe<Array<SkinItemWhereInput>>;
  id?: InputMaybe<StringFilter>;
  item?: InputMaybe<AvatarItemRelationFilter>;
  skinType?: InputMaybe<EnumSkinTypeFilter>;
};

export type SkinItemWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export enum SkinType {
  Colour = 'COLOUR',
  Horns = 'HORNS'
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export enum State {
  Draft = 'DRAFT',
  Published = 'PUBLISHED',
  Rejected = 'REJECTED',
  Review = 'REVIEW'
}

export type StringFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['String']>;
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  search?: InputMaybe<Scalars['String']>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  search?: InputMaybe<Scalars['String']>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type StringNullableListFilter = {
  equals?: InputMaybe<Array<Scalars['String']>>;
  has?: InputMaybe<Scalars['String']>;
  hasEvery?: InputMaybe<Array<Scalars['String']>>;
  hasSome?: InputMaybe<Array<Scalars['String']>>;
  isEmpty?: InputMaybe<Scalars['Boolean']>;
};

export type StripeCustomer = {
  __typename?: 'StripeCustomer';
  _count: StripeCustomerCount;
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  stripePaymentTransactions?: Maybe<Array<StripePaymentTransaction>>;
  stripeSubscriptions?: Maybe<Array<StripeSubscription>>;
  updatedAt: Scalars['Date'];
  user: User;
  userId: Scalars['String'];
};

export type StripeCustomerCount = {
  __typename?: 'StripeCustomerCount';
  stripePaymentTransactions: Scalars['Int'];
  stripeSubscriptions: Scalars['Int'];
};

export type StripeCustomerCreateNestedOneWithoutUserInput = {
  connect?: InputMaybe<StripeCustomerWhereUniqueInput>;
  connectOrCreate?: InputMaybe<StripeCustomerCreateOrConnectWithoutUserInput>;
  create?: InputMaybe<StripeCustomerCreateWithoutUserInput>;
};

export type StripeCustomerCreateOrConnectWithoutUserInput = {
  create: StripeCustomerCreateWithoutUserInput;
  where: StripeCustomerWhereUniqueInput;
};

export type StripeCustomerCreateWithoutUserInput = {
  createdAt?: InputMaybe<Scalars['Date']>;
  id: Scalars['String'];
  stripePaymentTransactions?: InputMaybe<StripePaymentTransactionCreateNestedManyWithoutCustomerInput>;
  stripeSubscriptions?: InputMaybe<StripeSubscriptionCreateNestedManyWithoutCustomerInput>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export enum StripeCustomerOrderByRelevanceFieldEnum {
  Id = 'id',
  UserId = 'userId'
}

export type StripeCustomerOrderByRelevanceInput = {
  fields: Array<StripeCustomerOrderByRelevanceFieldEnum>;
  search: Scalars['String'];
  sort: SortOrder;
};

export type StripeCustomerOrderByWithRelationAndSearchRelevanceInput = {
  _relevance?: InputMaybe<StripeCustomerOrderByRelevanceInput>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  stripePaymentTransactions?: InputMaybe<StripePaymentTransactionOrderByRelationAggregateInput>;
  stripeSubscriptions?: InputMaybe<StripeSubscriptionOrderByRelationAggregateInput>;
  updatedAt?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationAndSearchRelevanceInput>;
  userId?: InputMaybe<SortOrder>;
};

export type StripeCustomerRelationFilter = {
  is?: InputMaybe<StripeCustomerWhereInput>;
  isNot?: InputMaybe<StripeCustomerWhereInput>;
};

export type StripeCustomerUpdateOneWithoutUserInput = {
  connect?: InputMaybe<StripeCustomerWhereUniqueInput>;
  connectOrCreate?: InputMaybe<StripeCustomerCreateOrConnectWithoutUserInput>;
  create?: InputMaybe<StripeCustomerCreateWithoutUserInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<StripeCustomerUpdateWithoutUserInput>;
  upsert?: InputMaybe<StripeCustomerUpsertWithoutUserInput>;
};

export type StripeCustomerUpdateWithoutUserInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  stripePaymentTransactions?: InputMaybe<StripePaymentTransactionUpdateManyWithoutCustomerInput>;
  stripeSubscriptions?: InputMaybe<StripeSubscriptionUpdateManyWithoutCustomerInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type StripeCustomerUpsertWithoutUserInput = {
  create: StripeCustomerCreateWithoutUserInput;
  update: StripeCustomerUpdateWithoutUserInput;
};

export type StripeCustomerWhereInput = {
  AND?: InputMaybe<Array<StripeCustomerWhereInput>>;
  NOT?: InputMaybe<Array<StripeCustomerWhereInput>>;
  OR?: InputMaybe<Array<StripeCustomerWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  stripePaymentTransactions?: InputMaybe<StripePaymentTransactionListRelationFilter>;
  stripeSubscriptions?: InputMaybe<StripeSubscriptionListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type StripeCustomerWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type StripePaymentTransaction = {
  __typename?: 'StripePaymentTransaction';
  amount: Scalars['String'];
  createdAt: Scalars['Date'];
  currency: Scalars['String'];
  customer: StripeCustomer;
  customerId: Scalars['String'];
  id: Scalars['ID'];
  updatedAt: Scalars['Date'];
};

export type StripePaymentTransactionCreateManyCustomerInput = {
  amount: Scalars['String'];
  createdAt?: InputMaybe<Scalars['Date']>;
  currency: Scalars['String'];
  id: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type StripePaymentTransactionCreateManyCustomerInputEnvelope = {
  data: Array<StripePaymentTransactionCreateManyCustomerInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type StripePaymentTransactionCreateNestedManyWithoutCustomerInput = {
  connect?: InputMaybe<Array<StripePaymentTransactionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<StripePaymentTransactionCreateOrConnectWithoutCustomerInput>>;
  create?: InputMaybe<Array<StripePaymentTransactionCreateWithoutCustomerInput>>;
  createMany?: InputMaybe<StripePaymentTransactionCreateManyCustomerInputEnvelope>;
};

export type StripePaymentTransactionCreateOrConnectWithoutCustomerInput = {
  create: StripePaymentTransactionCreateWithoutCustomerInput;
  where: StripePaymentTransactionWhereUniqueInput;
};

export type StripePaymentTransactionCreateWithoutCustomerInput = {
  amount: Scalars['String'];
  createdAt?: InputMaybe<Scalars['Date']>;
  currency: Scalars['String'];
  id: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type StripePaymentTransactionListRelationFilter = {
  every?: InputMaybe<StripePaymentTransactionWhereInput>;
  none?: InputMaybe<StripePaymentTransactionWhereInput>;
  some?: InputMaybe<StripePaymentTransactionWhereInput>;
};

export type StripePaymentTransactionOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type StripePaymentTransactionScalarWhereInput = {
  AND?: InputMaybe<Array<StripePaymentTransactionScalarWhereInput>>;
  NOT?: InputMaybe<Array<StripePaymentTransactionScalarWhereInput>>;
  OR?: InputMaybe<Array<StripePaymentTransactionScalarWhereInput>>;
  amount?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  currency?: InputMaybe<StringFilter>;
  customerId?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type StripePaymentTransactionUpdateManyMutationInput = {
  amount?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  currency?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type StripePaymentTransactionUpdateManyWithWhereWithoutCustomerInput = {
  data: StripePaymentTransactionUpdateManyMutationInput;
  where: StripePaymentTransactionScalarWhereInput;
};

export type StripePaymentTransactionUpdateManyWithoutCustomerInput = {
  connect?: InputMaybe<Array<StripePaymentTransactionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<StripePaymentTransactionCreateOrConnectWithoutCustomerInput>>;
  create?: InputMaybe<Array<StripePaymentTransactionCreateWithoutCustomerInput>>;
  createMany?: InputMaybe<StripePaymentTransactionCreateManyCustomerInputEnvelope>;
  delete?: InputMaybe<Array<StripePaymentTransactionWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<StripePaymentTransactionScalarWhereInput>>;
  disconnect?: InputMaybe<Array<StripePaymentTransactionWhereUniqueInput>>;
  set?: InputMaybe<Array<StripePaymentTransactionWhereUniqueInput>>;
  update?: InputMaybe<Array<StripePaymentTransactionUpdateWithWhereUniqueWithoutCustomerInput>>;
  updateMany?: InputMaybe<Array<StripePaymentTransactionUpdateManyWithWhereWithoutCustomerInput>>;
  upsert?: InputMaybe<Array<StripePaymentTransactionUpsertWithWhereUniqueWithoutCustomerInput>>;
};

export type StripePaymentTransactionUpdateWithWhereUniqueWithoutCustomerInput = {
  data: StripePaymentTransactionUpdateWithoutCustomerInput;
  where: StripePaymentTransactionWhereUniqueInput;
};

export type StripePaymentTransactionUpdateWithoutCustomerInput = {
  amount?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  currency?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type StripePaymentTransactionUpsertWithWhereUniqueWithoutCustomerInput = {
  create: StripePaymentTransactionCreateWithoutCustomerInput;
  update: StripePaymentTransactionUpdateWithoutCustomerInput;
  where: StripePaymentTransactionWhereUniqueInput;
};

export type StripePaymentTransactionWhereInput = {
  AND?: InputMaybe<Array<StripePaymentTransactionWhereInput>>;
  NOT?: InputMaybe<Array<StripePaymentTransactionWhereInput>>;
  OR?: InputMaybe<Array<StripePaymentTransactionWhereInput>>;
  amount?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  currency?: InputMaybe<StringFilter>;
  customer?: InputMaybe<StripeCustomerRelationFilter>;
  customerId?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type StripePaymentTransactionWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type StripePrice = {
  __typename?: 'StripePrice';
  amount: Scalars['Decimal'];
  currency: Scalars['String'];
  id: Scalars['String'];
  product: StripeProduct;
  productId: Scalars['String'];
};

export type StripePriceListRelationFilter = {
  every?: InputMaybe<StripePriceWhereInput>;
  none?: InputMaybe<StripePriceWhereInput>;
  some?: InputMaybe<StripePriceWhereInput>;
};

export type StripePriceOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type StripePriceWhereInput = {
  AND?: InputMaybe<Array<StripePriceWhereInput>>;
  NOT?: InputMaybe<Array<StripePriceWhereInput>>;
  OR?: InputMaybe<Array<StripePriceWhereInput>>;
  amount?: InputMaybe<DecimalFilter>;
  currency?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  product?: InputMaybe<StripeProductRelationFilter>;
  productId?: InputMaybe<StringFilter>;
};

export type StripeProduct = {
  __typename?: 'StripeProduct';
  _count: StripeProductCount;
  createdAt: Scalars['Date'];
  id: Scalars['String'];
  name: Scalars['String'];
  novaGemPackage?: Maybe<NovaGemPackage>;
  prices?: Maybe<Array<StripePrice>>;
  productType: StripeProductType;
  subscrptionPlan?: Maybe<StripeSubscriptionPlan>;
  updatedAt: Scalars['Date'];
};

export type StripeProductCount = {
  __typename?: 'StripeProductCount';
  prices: Scalars['Int'];
};

export enum StripeProductOrderByRelevanceFieldEnum {
  Id = 'id',
  Name = 'name'
}

export type StripeProductOrderByRelevanceInput = {
  fields: Array<StripeProductOrderByRelevanceFieldEnum>;
  search: Scalars['String'];
  sort: SortOrder;
};

export type StripeProductOrderByWithRelationAndSearchRelevanceInput = {
  _relevance?: InputMaybe<StripeProductOrderByRelevanceInput>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  novaGemPackage?: InputMaybe<NovaGemPackageOrderByWithRelationAndSearchRelevanceInput>;
  prices?: InputMaybe<StripePriceOrderByRelationAggregateInput>;
  productType?: InputMaybe<SortOrder>;
  subscrptionPlan?: InputMaybe<StripeSubscriptionPlanOrderByWithRelationAndSearchRelevanceInput>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type StripeProductRelationFilter = {
  is?: InputMaybe<StripeProductWhereInput>;
  isNot?: InputMaybe<StripeProductWhereInput>;
};

export enum StripeProductScalarFieldEnum {
  CreatedAt = 'createdAt',
  Id = 'id',
  Name = 'name',
  ProductType = 'productType',
  UpdatedAt = 'updatedAt'
}

export enum StripeProductType {
  Novagem = 'NOVAGEM',
  Subsription = 'SUBSRIPTION'
}

export type StripeProductWhereInput = {
  AND?: InputMaybe<Array<StripeProductWhereInput>>;
  NOT?: InputMaybe<Array<StripeProductWhereInput>>;
  OR?: InputMaybe<Array<StripeProductWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  novaGemPackage?: InputMaybe<NovaGemPackageRelationFilter>;
  prices?: InputMaybe<StripePriceListRelationFilter>;
  productType?: InputMaybe<EnumStripeProductTypeFilter>;
  subscrptionPlan?: InputMaybe<StripeSubscriptionPlanRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type StripeProductWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type StripeSubscription = {
  __typename?: 'StripeSubscription';
  createdAt: Scalars['Date'];
  customer: StripeCustomer;
  customerId: Scalars['String'];
  id: Scalars['ID'];
  periodEnd?: Maybe<Scalars['Date']>;
  periodStart?: Maybe<Scalars['Date']>;
  updatedAt: Scalars['Date'];
};

export type StripeSubscriptionCreateManyCustomerInput = {
  createdAt?: InputMaybe<Scalars['Date']>;
  id: Scalars['String'];
  periodEnd?: InputMaybe<Scalars['Date']>;
  periodStart?: InputMaybe<Scalars['Date']>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type StripeSubscriptionCreateManyCustomerInputEnvelope = {
  data: Array<StripeSubscriptionCreateManyCustomerInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type StripeSubscriptionCreateNestedManyWithoutCustomerInput = {
  connect?: InputMaybe<Array<StripeSubscriptionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<StripeSubscriptionCreateOrConnectWithoutCustomerInput>>;
  create?: InputMaybe<Array<StripeSubscriptionCreateWithoutCustomerInput>>;
  createMany?: InputMaybe<StripeSubscriptionCreateManyCustomerInputEnvelope>;
};

export type StripeSubscriptionCreateOrConnectWithoutCustomerInput = {
  create: StripeSubscriptionCreateWithoutCustomerInput;
  where: StripeSubscriptionWhereUniqueInput;
};

export type StripeSubscriptionCreateWithoutCustomerInput = {
  createdAt?: InputMaybe<Scalars['Date']>;
  id: Scalars['String'];
  periodEnd?: InputMaybe<Scalars['Date']>;
  periodStart?: InputMaybe<Scalars['Date']>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type StripeSubscriptionListRelationFilter = {
  every?: InputMaybe<StripeSubscriptionWhereInput>;
  none?: InputMaybe<StripeSubscriptionWhereInput>;
  some?: InputMaybe<StripeSubscriptionWhereInput>;
};

export type StripeSubscriptionOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export enum StripeSubscriptionOrderByRelevanceFieldEnum {
  CustomerId = 'customerId',
  Id = 'id'
}

export type StripeSubscriptionOrderByRelevanceInput = {
  fields: Array<StripeSubscriptionOrderByRelevanceFieldEnum>;
  search: Scalars['String'];
  sort: SortOrder;
};

export type StripeSubscriptionOrderByWithRelationAndSearchRelevanceInput = {
  _relevance?: InputMaybe<StripeSubscriptionOrderByRelevanceInput>;
  createdAt?: InputMaybe<SortOrder>;
  customer?: InputMaybe<StripeCustomerOrderByWithRelationAndSearchRelevanceInput>;
  customerId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  periodEnd?: InputMaybe<SortOrder>;
  periodStart?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type StripeSubscriptionPlan = {
  __typename?: 'StripeSubscriptionPlan';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  stripeProduct: StripeProduct;
  updatedAt: Scalars['Date'];
};

export enum StripeSubscriptionPlanOrderByRelevanceFieldEnum {
  Id = 'id'
}

export type StripeSubscriptionPlanOrderByRelevanceInput = {
  fields: Array<StripeSubscriptionPlanOrderByRelevanceFieldEnum>;
  search: Scalars['String'];
  sort: SortOrder;
};

export type StripeSubscriptionPlanOrderByWithRelationAndSearchRelevanceInput = {
  _relevance?: InputMaybe<StripeSubscriptionPlanOrderByRelevanceInput>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  stripeProduct?: InputMaybe<StripeProductOrderByWithRelationAndSearchRelevanceInput>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type StripeSubscriptionPlanRelationFilter = {
  is?: InputMaybe<StripeSubscriptionPlanWhereInput>;
  isNot?: InputMaybe<StripeSubscriptionPlanWhereInput>;
};

export type StripeSubscriptionPlanWhereInput = {
  AND?: InputMaybe<Array<StripeSubscriptionPlanWhereInput>>;
  NOT?: InputMaybe<Array<StripeSubscriptionPlanWhereInput>>;
  OR?: InputMaybe<Array<StripeSubscriptionPlanWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  stripeProduct?: InputMaybe<StripeProductRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export enum StripeSubscriptionScalarFieldEnum {
  CreatedAt = 'createdAt',
  CustomerId = 'customerId',
  Id = 'id',
  PeriodEnd = 'periodEnd',
  PeriodStart = 'periodStart',
  UpdatedAt = 'updatedAt'
}

export type StripeSubscriptionScalarWhereInput = {
  AND?: InputMaybe<Array<StripeSubscriptionScalarWhereInput>>;
  NOT?: InputMaybe<Array<StripeSubscriptionScalarWhereInput>>;
  OR?: InputMaybe<Array<StripeSubscriptionScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  customerId?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  periodEnd?: InputMaybe<DateTimeNullableFilter>;
  periodStart?: InputMaybe<DateTimeNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type StripeSubscriptionUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  periodEnd?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  periodStart?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type StripeSubscriptionUpdateManyWithWhereWithoutCustomerInput = {
  data: StripeSubscriptionUpdateManyMutationInput;
  where: StripeSubscriptionScalarWhereInput;
};

export type StripeSubscriptionUpdateManyWithoutCustomerInput = {
  connect?: InputMaybe<Array<StripeSubscriptionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<StripeSubscriptionCreateOrConnectWithoutCustomerInput>>;
  create?: InputMaybe<Array<StripeSubscriptionCreateWithoutCustomerInput>>;
  createMany?: InputMaybe<StripeSubscriptionCreateManyCustomerInputEnvelope>;
  delete?: InputMaybe<Array<StripeSubscriptionWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<StripeSubscriptionScalarWhereInput>>;
  disconnect?: InputMaybe<Array<StripeSubscriptionWhereUniqueInput>>;
  set?: InputMaybe<Array<StripeSubscriptionWhereUniqueInput>>;
  update?: InputMaybe<Array<StripeSubscriptionUpdateWithWhereUniqueWithoutCustomerInput>>;
  updateMany?: InputMaybe<Array<StripeSubscriptionUpdateManyWithWhereWithoutCustomerInput>>;
  upsert?: InputMaybe<Array<StripeSubscriptionUpsertWithWhereUniqueWithoutCustomerInput>>;
};

export type StripeSubscriptionUpdateWithWhereUniqueWithoutCustomerInput = {
  data: StripeSubscriptionUpdateWithoutCustomerInput;
  where: StripeSubscriptionWhereUniqueInput;
};

export type StripeSubscriptionUpdateWithoutCustomerInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  periodEnd?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  periodStart?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type StripeSubscriptionUpsertWithWhereUniqueWithoutCustomerInput = {
  create: StripeSubscriptionCreateWithoutCustomerInput;
  update: StripeSubscriptionUpdateWithoutCustomerInput;
  where: StripeSubscriptionWhereUniqueInput;
};

export type StripeSubscriptionWhereInput = {
  AND?: InputMaybe<Array<StripeSubscriptionWhereInput>>;
  NOT?: InputMaybe<Array<StripeSubscriptionWhereInput>>;
  OR?: InputMaybe<Array<StripeSubscriptionWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  customer?: InputMaybe<StripeCustomerRelationFilter>;
  customerId?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  periodEnd?: InputMaybe<DateTimeNullableFilter>;
  periodStart?: InputMaybe<DateTimeNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type StripeSubscriptionWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type Student = {
  __typename?: 'Student';
  AssessmentUser?: Maybe<Array<AssessmentUser>>;
  EXP: Scalars['Int'];
  _count: StudentCount;
  avatar?: Maybe<Avatar>;
  avatarImage?: Maybe<Asset>;
  avatarImageId?: Maybe<Scalars['String']>;
  balance?: Maybe<Balance>;
  bio?: Maybe<Scalars['String']>;
  birthDate?: Maybe<Scalars['Date']>;
  challengeGallery?: Maybe<Array<Challenge>>;
  createdAt: Scalars['Date'];
  email?: Maybe<Scalars['String']>;
  enrolledCourses?: Maybe<Array<EnrolledCourse>>;
  expLog?: Maybe<Array<ExpLog>>;
  friendsRequestee?: Maybe<Array<FriendShip>>;
  friendsRequester?: Maybe<Array<FriendShip>>;
  id: Scalars['ID'];
  legacyAvatar?: Maybe<UserAvatar>;
  loginPattern: Scalars['String'];
  newAvatar?: Maybe<Scalars['JSON']>;
  parent: Parent;
  parentId: Scalars['String'];
  updatedAt: Scalars['Date'];
  user: User;
  username: Scalars['String'];
};


export type StudentEnrolledCoursesArgs = {
  cursor?: InputMaybe<EnrolledCourseWhereUniqueInput>;
  distinct?: InputMaybe<Array<EnrolledCourseScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<EnrolledCourseOrderByWithRelationAndSearchRelevanceInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<EnrolledCourseWhereInput>;
};

export type StudentCount = {
  __typename?: 'StudentCount';
  AssessmentUser: Scalars['Int'];
  challengeGallery: Scalars['Int'];
  enrolledCourses: Scalars['Int'];
  expLog: Scalars['Int'];
  friendsRequestee: Scalars['Int'];
  friendsRequester: Scalars['Int'];
};

export type StudentCreateManyParentInput = {
  EXP?: InputMaybe<Scalars['Int']>;
  avatarImageId?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  birthDate?: InputMaybe<Scalars['Date']>;
  createdAt?: InputMaybe<Scalars['Date']>;
  email?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  loginPattern: Scalars['String'];
  newAvatar?: InputMaybe<Scalars['JSON']>;
  updatedAt?: InputMaybe<Scalars['Date']>;
  username: Scalars['String'];
};

export type StudentCreateManyParentInputEnvelope = {
  data: Array<StudentCreateManyParentInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type StudentCreateNestedManyWithoutParentInput = {
  connect?: InputMaybe<Array<StudentWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<StudentCreateOrConnectWithoutParentInput>>;
  create?: InputMaybe<Array<StudentCreateWithoutParentInput>>;
  createMany?: InputMaybe<StudentCreateManyParentInputEnvelope>;
};

export type StudentCreateNestedOneWithoutAssessmentUserInput = {
  connect?: InputMaybe<StudentWhereUniqueInput>;
  connectOrCreate?: InputMaybe<StudentCreateOrConnectWithoutAssessmentUserInput>;
  create?: InputMaybe<StudentCreateWithoutAssessmentUserInput>;
};

export type StudentCreateNestedOneWithoutAvatarImageInput = {
  connect?: InputMaybe<StudentWhereUniqueInput>;
  connectOrCreate?: InputMaybe<StudentCreateOrConnectWithoutAvatarImageInput>;
  create?: InputMaybe<StudentCreateWithoutAvatarImageInput>;
};

export type StudentCreateNestedOneWithoutAvatarInput = {
  connect?: InputMaybe<StudentWhereUniqueInput>;
  connectOrCreate?: InputMaybe<StudentCreateOrConnectWithoutAvatarInput>;
  create?: InputMaybe<StudentCreateWithoutAvatarInput>;
};

export type StudentCreateNestedOneWithoutChallengeGalleryInput = {
  connect?: InputMaybe<StudentWhereUniqueInput>;
  connectOrCreate?: InputMaybe<StudentCreateOrConnectWithoutChallengeGalleryInput>;
  create?: InputMaybe<StudentCreateWithoutChallengeGalleryInput>;
};

export type StudentCreateNestedOneWithoutEnrolledCoursesInput = {
  connect?: InputMaybe<StudentWhereUniqueInput>;
  connectOrCreate?: InputMaybe<StudentCreateOrConnectWithoutEnrolledCoursesInput>;
  create?: InputMaybe<StudentCreateWithoutEnrolledCoursesInput>;
};

export type StudentCreateNestedOneWithoutExpLogInput = {
  connect?: InputMaybe<StudentWhereUniqueInput>;
  connectOrCreate?: InputMaybe<StudentCreateOrConnectWithoutExpLogInput>;
  create?: InputMaybe<StudentCreateWithoutExpLogInput>;
};

export type StudentCreateNestedOneWithoutFriendsRequesteeInput = {
  connect?: InputMaybe<StudentWhereUniqueInput>;
  connectOrCreate?: InputMaybe<StudentCreateOrConnectWithoutFriendsRequesteeInput>;
  create?: InputMaybe<StudentCreateWithoutFriendsRequesteeInput>;
};

export type StudentCreateNestedOneWithoutFriendsRequesterInput = {
  connect?: InputMaybe<StudentWhereUniqueInput>;
  connectOrCreate?: InputMaybe<StudentCreateOrConnectWithoutFriendsRequesterInput>;
  create?: InputMaybe<StudentCreateWithoutFriendsRequesterInput>;
};

export type StudentCreateNestedOneWithoutUserInput = {
  connect?: InputMaybe<StudentWhereUniqueInput>;
  connectOrCreate?: InputMaybe<StudentCreateOrConnectWithoutUserInput>;
  create?: InputMaybe<StudentCreateWithoutUserInput>;
};

export type StudentCreateOrConnectWithoutAssessmentUserInput = {
  create: StudentCreateWithoutAssessmentUserInput;
  where: StudentWhereUniqueInput;
};

export type StudentCreateOrConnectWithoutAvatarImageInput = {
  create: StudentCreateWithoutAvatarImageInput;
  where: StudentWhereUniqueInput;
};

export type StudentCreateOrConnectWithoutAvatarInput = {
  create: StudentCreateWithoutAvatarInput;
  where: StudentWhereUniqueInput;
};

export type StudentCreateOrConnectWithoutChallengeGalleryInput = {
  create: StudentCreateWithoutChallengeGalleryInput;
  where: StudentWhereUniqueInput;
};

export type StudentCreateOrConnectWithoutEnrolledCoursesInput = {
  create: StudentCreateWithoutEnrolledCoursesInput;
  where: StudentWhereUniqueInput;
};

export type StudentCreateOrConnectWithoutExpLogInput = {
  create: StudentCreateWithoutExpLogInput;
  where: StudentWhereUniqueInput;
};

export type StudentCreateOrConnectWithoutFriendsRequesteeInput = {
  create: StudentCreateWithoutFriendsRequesteeInput;
  where: StudentWhereUniqueInput;
};

export type StudentCreateOrConnectWithoutFriendsRequesterInput = {
  create: StudentCreateWithoutFriendsRequesterInput;
  where: StudentWhereUniqueInput;
};

export type StudentCreateOrConnectWithoutParentInput = {
  create: StudentCreateWithoutParentInput;
  where: StudentWhereUniqueInput;
};

export type StudentCreateOrConnectWithoutUserInput = {
  create: StudentCreateWithoutUserInput;
  where: StudentWhereUniqueInput;
};

export type StudentCreateWithoutAssessmentUserInput = {
  EXP?: InputMaybe<Scalars['Int']>;
  avatar?: InputMaybe<AvatarCreateNestedOneWithoutStudentInput>;
  avatarImage?: InputMaybe<AssetCreateNestedOneWithoutAvatarImageInput>;
  balance?: InputMaybe<BalanceCreateNestedOneWithoutStudentInput>;
  bio?: InputMaybe<Scalars['String']>;
  birthDate?: InputMaybe<Scalars['Date']>;
  challengeGallery?: InputMaybe<ChallengeCreateNestedManyWithoutCreatorInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  email?: InputMaybe<Scalars['String']>;
  enrolledCourses?: InputMaybe<EnrolledCourseCreateNestedManyWithoutStudentInput>;
  expLog?: InputMaybe<ExpLogCreateNestedManyWithoutStudentInput>;
  friendsRequestee?: InputMaybe<FriendShipCreateNestedManyWithoutRequesteeInput>;
  friendsRequester?: InputMaybe<FriendShipCreateNestedManyWithoutRequesterInput>;
  legacyAvatar?: InputMaybe<UserAvatarCreateNestedOneWithoutUserInput>;
  loginPattern: Scalars['String'];
  newAvatar?: InputMaybe<Scalars['JSON']>;
  parent: ParentCreateNestedOneWithoutChildrenInput;
  updatedAt?: InputMaybe<Scalars['Date']>;
  user: UserCreateNestedOneWithoutStudentInput;
  username: Scalars['String'];
};

export type StudentCreateWithoutAvatarImageInput = {
  AssessmentUser?: InputMaybe<AssessmentUserCreateNestedManyWithoutStudentInput>;
  EXP?: InputMaybe<Scalars['Int']>;
  avatar?: InputMaybe<AvatarCreateNestedOneWithoutStudentInput>;
  balance?: InputMaybe<BalanceCreateNestedOneWithoutStudentInput>;
  bio?: InputMaybe<Scalars['String']>;
  birthDate?: InputMaybe<Scalars['Date']>;
  challengeGallery?: InputMaybe<ChallengeCreateNestedManyWithoutCreatorInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  email?: InputMaybe<Scalars['String']>;
  enrolledCourses?: InputMaybe<EnrolledCourseCreateNestedManyWithoutStudentInput>;
  expLog?: InputMaybe<ExpLogCreateNestedManyWithoutStudentInput>;
  friendsRequestee?: InputMaybe<FriendShipCreateNestedManyWithoutRequesteeInput>;
  friendsRequester?: InputMaybe<FriendShipCreateNestedManyWithoutRequesterInput>;
  legacyAvatar?: InputMaybe<UserAvatarCreateNestedOneWithoutUserInput>;
  loginPattern: Scalars['String'];
  newAvatar?: InputMaybe<Scalars['JSON']>;
  parent: ParentCreateNestedOneWithoutChildrenInput;
  updatedAt?: InputMaybe<Scalars['Date']>;
  user: UserCreateNestedOneWithoutStudentInput;
  username: Scalars['String'];
};

export type StudentCreateWithoutAvatarInput = {
  AssessmentUser?: InputMaybe<AssessmentUserCreateNestedManyWithoutStudentInput>;
  EXP?: InputMaybe<Scalars['Int']>;
  avatarImage?: InputMaybe<AssetCreateNestedOneWithoutAvatarImageInput>;
  balance?: InputMaybe<BalanceCreateNestedOneWithoutStudentInput>;
  bio?: InputMaybe<Scalars['String']>;
  birthDate?: InputMaybe<Scalars['Date']>;
  challengeGallery?: InputMaybe<ChallengeCreateNestedManyWithoutCreatorInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  email?: InputMaybe<Scalars['String']>;
  enrolledCourses?: InputMaybe<EnrolledCourseCreateNestedManyWithoutStudentInput>;
  expLog?: InputMaybe<ExpLogCreateNestedManyWithoutStudentInput>;
  friendsRequestee?: InputMaybe<FriendShipCreateNestedManyWithoutRequesteeInput>;
  friendsRequester?: InputMaybe<FriendShipCreateNestedManyWithoutRequesterInput>;
  legacyAvatar?: InputMaybe<UserAvatarCreateNestedOneWithoutUserInput>;
  loginPattern: Scalars['String'];
  newAvatar?: InputMaybe<Scalars['JSON']>;
  parent: ParentCreateNestedOneWithoutChildrenInput;
  updatedAt?: InputMaybe<Scalars['Date']>;
  user: UserCreateNestedOneWithoutStudentInput;
  username: Scalars['String'];
};

export type StudentCreateWithoutChallengeGalleryInput = {
  AssessmentUser?: InputMaybe<AssessmentUserCreateNestedManyWithoutStudentInput>;
  EXP?: InputMaybe<Scalars['Int']>;
  avatar?: InputMaybe<AvatarCreateNestedOneWithoutStudentInput>;
  avatarImage?: InputMaybe<AssetCreateNestedOneWithoutAvatarImageInput>;
  balance?: InputMaybe<BalanceCreateNestedOneWithoutStudentInput>;
  bio?: InputMaybe<Scalars['String']>;
  birthDate?: InputMaybe<Scalars['Date']>;
  createdAt?: InputMaybe<Scalars['Date']>;
  email?: InputMaybe<Scalars['String']>;
  enrolledCourses?: InputMaybe<EnrolledCourseCreateNestedManyWithoutStudentInput>;
  expLog?: InputMaybe<ExpLogCreateNestedManyWithoutStudentInput>;
  friendsRequestee?: InputMaybe<FriendShipCreateNestedManyWithoutRequesteeInput>;
  friendsRequester?: InputMaybe<FriendShipCreateNestedManyWithoutRequesterInput>;
  legacyAvatar?: InputMaybe<UserAvatarCreateNestedOneWithoutUserInput>;
  loginPattern: Scalars['String'];
  newAvatar?: InputMaybe<Scalars['JSON']>;
  parent: ParentCreateNestedOneWithoutChildrenInput;
  updatedAt?: InputMaybe<Scalars['Date']>;
  user: UserCreateNestedOneWithoutStudentInput;
  username: Scalars['String'];
};

export type StudentCreateWithoutEnrolledCoursesInput = {
  AssessmentUser?: InputMaybe<AssessmentUserCreateNestedManyWithoutStudentInput>;
  EXP?: InputMaybe<Scalars['Int']>;
  avatar?: InputMaybe<AvatarCreateNestedOneWithoutStudentInput>;
  avatarImage?: InputMaybe<AssetCreateNestedOneWithoutAvatarImageInput>;
  balance?: InputMaybe<BalanceCreateNestedOneWithoutStudentInput>;
  bio?: InputMaybe<Scalars['String']>;
  birthDate?: InputMaybe<Scalars['Date']>;
  challengeGallery?: InputMaybe<ChallengeCreateNestedManyWithoutCreatorInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  email?: InputMaybe<Scalars['String']>;
  expLog?: InputMaybe<ExpLogCreateNestedManyWithoutStudentInput>;
  friendsRequestee?: InputMaybe<FriendShipCreateNestedManyWithoutRequesteeInput>;
  friendsRequester?: InputMaybe<FriendShipCreateNestedManyWithoutRequesterInput>;
  legacyAvatar?: InputMaybe<UserAvatarCreateNestedOneWithoutUserInput>;
  loginPattern: Scalars['String'];
  newAvatar?: InputMaybe<Scalars['JSON']>;
  parent: ParentCreateNestedOneWithoutChildrenInput;
  updatedAt?: InputMaybe<Scalars['Date']>;
  user: UserCreateNestedOneWithoutStudentInput;
  username: Scalars['String'];
};

export type StudentCreateWithoutExpLogInput = {
  AssessmentUser?: InputMaybe<AssessmentUserCreateNestedManyWithoutStudentInput>;
  EXP?: InputMaybe<Scalars['Int']>;
  avatar?: InputMaybe<AvatarCreateNestedOneWithoutStudentInput>;
  avatarImage?: InputMaybe<AssetCreateNestedOneWithoutAvatarImageInput>;
  balance?: InputMaybe<BalanceCreateNestedOneWithoutStudentInput>;
  bio?: InputMaybe<Scalars['String']>;
  birthDate?: InputMaybe<Scalars['Date']>;
  challengeGallery?: InputMaybe<ChallengeCreateNestedManyWithoutCreatorInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  email?: InputMaybe<Scalars['String']>;
  enrolledCourses?: InputMaybe<EnrolledCourseCreateNestedManyWithoutStudentInput>;
  friendsRequestee?: InputMaybe<FriendShipCreateNestedManyWithoutRequesteeInput>;
  friendsRequester?: InputMaybe<FriendShipCreateNestedManyWithoutRequesterInput>;
  legacyAvatar?: InputMaybe<UserAvatarCreateNestedOneWithoutUserInput>;
  loginPattern: Scalars['String'];
  newAvatar?: InputMaybe<Scalars['JSON']>;
  parent: ParentCreateNestedOneWithoutChildrenInput;
  updatedAt?: InputMaybe<Scalars['Date']>;
  user: UserCreateNestedOneWithoutStudentInput;
  username: Scalars['String'];
};

export type StudentCreateWithoutFriendsRequesteeInput = {
  AssessmentUser?: InputMaybe<AssessmentUserCreateNestedManyWithoutStudentInput>;
  EXP?: InputMaybe<Scalars['Int']>;
  avatar?: InputMaybe<AvatarCreateNestedOneWithoutStudentInput>;
  avatarImage?: InputMaybe<AssetCreateNestedOneWithoutAvatarImageInput>;
  balance?: InputMaybe<BalanceCreateNestedOneWithoutStudentInput>;
  bio?: InputMaybe<Scalars['String']>;
  birthDate?: InputMaybe<Scalars['Date']>;
  challengeGallery?: InputMaybe<ChallengeCreateNestedManyWithoutCreatorInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  email?: InputMaybe<Scalars['String']>;
  enrolledCourses?: InputMaybe<EnrolledCourseCreateNestedManyWithoutStudentInput>;
  expLog?: InputMaybe<ExpLogCreateNestedManyWithoutStudentInput>;
  friendsRequester?: InputMaybe<FriendShipCreateNestedManyWithoutRequesterInput>;
  legacyAvatar?: InputMaybe<UserAvatarCreateNestedOneWithoutUserInput>;
  loginPattern: Scalars['String'];
  newAvatar?: InputMaybe<Scalars['JSON']>;
  parent: ParentCreateNestedOneWithoutChildrenInput;
  updatedAt?: InputMaybe<Scalars['Date']>;
  user: UserCreateNestedOneWithoutStudentInput;
  username: Scalars['String'];
};

export type StudentCreateWithoutFriendsRequesterInput = {
  AssessmentUser?: InputMaybe<AssessmentUserCreateNestedManyWithoutStudentInput>;
  EXP?: InputMaybe<Scalars['Int']>;
  avatar?: InputMaybe<AvatarCreateNestedOneWithoutStudentInput>;
  avatarImage?: InputMaybe<AssetCreateNestedOneWithoutAvatarImageInput>;
  balance?: InputMaybe<BalanceCreateNestedOneWithoutStudentInput>;
  bio?: InputMaybe<Scalars['String']>;
  birthDate?: InputMaybe<Scalars['Date']>;
  challengeGallery?: InputMaybe<ChallengeCreateNestedManyWithoutCreatorInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  email?: InputMaybe<Scalars['String']>;
  enrolledCourses?: InputMaybe<EnrolledCourseCreateNestedManyWithoutStudentInput>;
  expLog?: InputMaybe<ExpLogCreateNestedManyWithoutStudentInput>;
  friendsRequestee?: InputMaybe<FriendShipCreateNestedManyWithoutRequesteeInput>;
  legacyAvatar?: InputMaybe<UserAvatarCreateNestedOneWithoutUserInput>;
  loginPattern: Scalars['String'];
  newAvatar?: InputMaybe<Scalars['JSON']>;
  parent: ParentCreateNestedOneWithoutChildrenInput;
  updatedAt?: InputMaybe<Scalars['Date']>;
  user: UserCreateNestedOneWithoutStudentInput;
  username: Scalars['String'];
};

export type StudentCreateWithoutParentInput = {
  AssessmentUser?: InputMaybe<AssessmentUserCreateNestedManyWithoutStudentInput>;
  EXP?: InputMaybe<Scalars['Int']>;
  avatar?: InputMaybe<AvatarCreateNestedOneWithoutStudentInput>;
  avatarImage?: InputMaybe<AssetCreateNestedOneWithoutAvatarImageInput>;
  balance?: InputMaybe<BalanceCreateNestedOneWithoutStudentInput>;
  bio?: InputMaybe<Scalars['String']>;
  birthDate?: InputMaybe<Scalars['Date']>;
  challengeGallery?: InputMaybe<ChallengeCreateNestedManyWithoutCreatorInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  email?: InputMaybe<Scalars['String']>;
  enrolledCourses?: InputMaybe<EnrolledCourseCreateNestedManyWithoutStudentInput>;
  expLog?: InputMaybe<ExpLogCreateNestedManyWithoutStudentInput>;
  friendsRequestee?: InputMaybe<FriendShipCreateNestedManyWithoutRequesteeInput>;
  friendsRequester?: InputMaybe<FriendShipCreateNestedManyWithoutRequesterInput>;
  legacyAvatar?: InputMaybe<UserAvatarCreateNestedOneWithoutUserInput>;
  loginPattern: Scalars['String'];
  newAvatar?: InputMaybe<Scalars['JSON']>;
  updatedAt?: InputMaybe<Scalars['Date']>;
  user: UserCreateNestedOneWithoutStudentInput;
  username: Scalars['String'];
};

export type StudentCreateWithoutUserInput = {
  AssessmentUser?: InputMaybe<AssessmentUserCreateNestedManyWithoutStudentInput>;
  EXP?: InputMaybe<Scalars['Int']>;
  avatar?: InputMaybe<AvatarCreateNestedOneWithoutStudentInput>;
  avatarImage?: InputMaybe<AssetCreateNestedOneWithoutAvatarImageInput>;
  balance?: InputMaybe<BalanceCreateNestedOneWithoutStudentInput>;
  bio?: InputMaybe<Scalars['String']>;
  birthDate?: InputMaybe<Scalars['Date']>;
  challengeGallery?: InputMaybe<ChallengeCreateNestedManyWithoutCreatorInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  email?: InputMaybe<Scalars['String']>;
  enrolledCourses?: InputMaybe<EnrolledCourseCreateNestedManyWithoutStudentInput>;
  expLog?: InputMaybe<ExpLogCreateNestedManyWithoutStudentInput>;
  friendsRequestee?: InputMaybe<FriendShipCreateNestedManyWithoutRequesteeInput>;
  friendsRequester?: InputMaybe<FriendShipCreateNestedManyWithoutRequesterInput>;
  legacyAvatar?: InputMaybe<UserAvatarCreateNestedOneWithoutUserInput>;
  loginPattern: Scalars['String'];
  newAvatar?: InputMaybe<Scalars['JSON']>;
  parent: ParentCreateNestedOneWithoutChildrenInput;
  updatedAt?: InputMaybe<Scalars['Date']>;
  username: Scalars['String'];
};

export type StudentListRelationFilter = {
  every?: InputMaybe<StudentWhereInput>;
  none?: InputMaybe<StudentWhereInput>;
  some?: InputMaybe<StudentWhereInput>;
};

export type StudentOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export enum StudentOrderByRelevanceFieldEnum {
  AvatarImageId = 'avatarImageId',
  Bio = 'bio',
  Email = 'email',
  Id = 'id',
  LoginPattern = 'loginPattern',
  ParentId = 'parentId',
  Username = 'username'
}

export type StudentOrderByRelevanceInput = {
  fields: Array<StudentOrderByRelevanceFieldEnum>;
  search: Scalars['String'];
  sort: SortOrder;
};

export type StudentOrderByWithRelationAndSearchRelevanceInput = {
  AssessmentUser?: InputMaybe<AssessmentUserOrderByRelationAggregateInput>;
  EXP?: InputMaybe<SortOrder>;
  _relevance?: InputMaybe<StudentOrderByRelevanceInput>;
  avatar?: InputMaybe<AvatarOrderByWithRelationAndSearchRelevanceInput>;
  avatarImage?: InputMaybe<AssetOrderByWithRelationAndSearchRelevanceInput>;
  avatarImageId?: InputMaybe<SortOrder>;
  balance?: InputMaybe<BalanceOrderByWithRelationAndSearchRelevanceInput>;
  bio?: InputMaybe<SortOrder>;
  birthDate?: InputMaybe<SortOrder>;
  challengeGallery?: InputMaybe<ChallengeOrderByRelationAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  enrolledCourses?: InputMaybe<EnrolledCourseOrderByRelationAggregateInput>;
  expLog?: InputMaybe<ExpLogOrderByRelationAggregateInput>;
  friendsRequestee?: InputMaybe<FriendShipOrderByRelationAggregateInput>;
  friendsRequester?: InputMaybe<FriendShipOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  legacyAvatar?: InputMaybe<UserAvatarOrderByWithRelationAndSearchRelevanceInput>;
  loginPattern?: InputMaybe<SortOrder>;
  newAvatar?: InputMaybe<SortOrder>;
  parent?: InputMaybe<ParentOrderByWithRelationAndSearchRelevanceInput>;
  parentId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationAndSearchRelevanceInput>;
  username?: InputMaybe<SortOrder>;
};

export type StudentRelationFilter = {
  is?: InputMaybe<StudentWhereInput>;
  isNot?: InputMaybe<StudentWhereInput>;
};

export type StudentScalarWhereInput = {
  AND?: InputMaybe<Array<StudentScalarWhereInput>>;
  EXP?: InputMaybe<IntFilter>;
  NOT?: InputMaybe<Array<StudentScalarWhereInput>>;
  OR?: InputMaybe<Array<StudentScalarWhereInput>>;
  avatarImageId?: InputMaybe<StringNullableFilter>;
  bio?: InputMaybe<StringNullableFilter>;
  birthDate?: InputMaybe<DateTimeNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  email?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  loginPattern?: InputMaybe<StringFilter>;
  newAvatar?: InputMaybe<JsonNullableFilter>;
  parentId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  username?: InputMaybe<StringFilter>;
};

export type StudentUpdateManyMutationInput = {
  EXP?: InputMaybe<IntFieldUpdateOperationsInput>;
  bio?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  birthDate?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  loginPattern?: InputMaybe<StringFieldUpdateOperationsInput>;
  newAvatar?: InputMaybe<Scalars['JSON']>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  username?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type StudentUpdateManyWithWhereWithoutParentInput = {
  data: StudentUpdateManyMutationInput;
  where: StudentScalarWhereInput;
};

export type StudentUpdateManyWithoutParentInput = {
  connect?: InputMaybe<Array<StudentWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<StudentCreateOrConnectWithoutParentInput>>;
  create?: InputMaybe<Array<StudentCreateWithoutParentInput>>;
  createMany?: InputMaybe<StudentCreateManyParentInputEnvelope>;
  delete?: InputMaybe<Array<StudentWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<StudentScalarWhereInput>>;
  disconnect?: InputMaybe<Array<StudentWhereUniqueInput>>;
  set?: InputMaybe<Array<StudentWhereUniqueInput>>;
  update?: InputMaybe<Array<StudentUpdateWithWhereUniqueWithoutParentInput>>;
  updateMany?: InputMaybe<Array<StudentUpdateManyWithWhereWithoutParentInput>>;
  upsert?: InputMaybe<Array<StudentUpsertWithWhereUniqueWithoutParentInput>>;
};

export type StudentUpdateOneRequiredWithoutAssessmentUserInput = {
  connect?: InputMaybe<StudentWhereUniqueInput>;
  connectOrCreate?: InputMaybe<StudentCreateOrConnectWithoutAssessmentUserInput>;
  create?: InputMaybe<StudentCreateWithoutAssessmentUserInput>;
  update?: InputMaybe<StudentUpdateWithoutAssessmentUserInput>;
  upsert?: InputMaybe<StudentUpsertWithoutAssessmentUserInput>;
};

export type StudentUpdateOneRequiredWithoutAvatarInput = {
  connect?: InputMaybe<StudentWhereUniqueInput>;
  connectOrCreate?: InputMaybe<StudentCreateOrConnectWithoutAvatarInput>;
  create?: InputMaybe<StudentCreateWithoutAvatarInput>;
  update?: InputMaybe<StudentUpdateWithoutAvatarInput>;
  upsert?: InputMaybe<StudentUpsertWithoutAvatarInput>;
};

export type StudentUpdateOneRequiredWithoutChallengeGalleryInput = {
  connect?: InputMaybe<StudentWhereUniqueInput>;
  connectOrCreate?: InputMaybe<StudentCreateOrConnectWithoutChallengeGalleryInput>;
  create?: InputMaybe<StudentCreateWithoutChallengeGalleryInput>;
  update?: InputMaybe<StudentUpdateWithoutChallengeGalleryInput>;
  upsert?: InputMaybe<StudentUpsertWithoutChallengeGalleryInput>;
};

export type StudentUpdateOneRequiredWithoutEnrolledCoursesInput = {
  connect?: InputMaybe<StudentWhereUniqueInput>;
  connectOrCreate?: InputMaybe<StudentCreateOrConnectWithoutEnrolledCoursesInput>;
  create?: InputMaybe<StudentCreateWithoutEnrolledCoursesInput>;
  update?: InputMaybe<StudentUpdateWithoutEnrolledCoursesInput>;
  upsert?: InputMaybe<StudentUpsertWithoutEnrolledCoursesInput>;
};

export type StudentUpdateOneRequiredWithoutExpLogInput = {
  connect?: InputMaybe<StudentWhereUniqueInput>;
  connectOrCreate?: InputMaybe<StudentCreateOrConnectWithoutExpLogInput>;
  create?: InputMaybe<StudentCreateWithoutExpLogInput>;
  update?: InputMaybe<StudentUpdateWithoutExpLogInput>;
  upsert?: InputMaybe<StudentUpsertWithoutExpLogInput>;
};

export type StudentUpdateOneRequiredWithoutFriendsRequesteeInput = {
  connect?: InputMaybe<StudentWhereUniqueInput>;
  connectOrCreate?: InputMaybe<StudentCreateOrConnectWithoutFriendsRequesteeInput>;
  create?: InputMaybe<StudentCreateWithoutFriendsRequesteeInput>;
  update?: InputMaybe<StudentUpdateWithoutFriendsRequesteeInput>;
  upsert?: InputMaybe<StudentUpsertWithoutFriendsRequesteeInput>;
};

export type StudentUpdateOneRequiredWithoutFriendsRequesterInput = {
  connect?: InputMaybe<StudentWhereUniqueInput>;
  connectOrCreate?: InputMaybe<StudentCreateOrConnectWithoutFriendsRequesterInput>;
  create?: InputMaybe<StudentCreateWithoutFriendsRequesterInput>;
  update?: InputMaybe<StudentUpdateWithoutFriendsRequesterInput>;
  upsert?: InputMaybe<StudentUpsertWithoutFriendsRequesterInput>;
};

export type StudentUpdateOneWithoutAvatarImageInput = {
  connect?: InputMaybe<StudentWhereUniqueInput>;
  connectOrCreate?: InputMaybe<StudentCreateOrConnectWithoutAvatarImageInput>;
  create?: InputMaybe<StudentCreateWithoutAvatarImageInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<StudentUpdateWithoutAvatarImageInput>;
  upsert?: InputMaybe<StudentUpsertWithoutAvatarImageInput>;
};

export type StudentUpdateOneWithoutUserInput = {
  connect?: InputMaybe<StudentWhereUniqueInput>;
  connectOrCreate?: InputMaybe<StudentCreateOrConnectWithoutUserInput>;
  create?: InputMaybe<StudentCreateWithoutUserInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<StudentUpdateWithoutUserInput>;
  upsert?: InputMaybe<StudentUpsertWithoutUserInput>;
};

export type StudentUpdateWithWhereUniqueWithoutParentInput = {
  data: StudentUpdateWithoutParentInput;
  where: StudentWhereUniqueInput;
};

export type StudentUpdateWithoutAssessmentUserInput = {
  EXP?: InputMaybe<IntFieldUpdateOperationsInput>;
  avatar?: InputMaybe<AvatarUpdateOneWithoutStudentInput>;
  avatarImage?: InputMaybe<AssetUpdateOneWithoutAvatarImageInput>;
  balance?: InputMaybe<BalanceUpdateOneWithoutStudentInput>;
  bio?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  birthDate?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  challengeGallery?: InputMaybe<ChallengeUpdateManyWithoutCreatorInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  enrolledCourses?: InputMaybe<EnrolledCourseUpdateManyWithoutStudentInput>;
  expLog?: InputMaybe<ExpLogUpdateManyWithoutStudentInput>;
  friendsRequestee?: InputMaybe<FriendShipUpdateManyWithoutRequesteeInput>;
  friendsRequester?: InputMaybe<FriendShipUpdateManyWithoutRequesterInput>;
  legacyAvatar?: InputMaybe<UserAvatarUpdateOneWithoutUserInput>;
  loginPattern?: InputMaybe<StringFieldUpdateOperationsInput>;
  newAvatar?: InputMaybe<Scalars['JSON']>;
  parent?: InputMaybe<ParentUpdateOneRequiredWithoutChildrenInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutStudentInput>;
  username?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type StudentUpdateWithoutAvatarImageInput = {
  AssessmentUser?: InputMaybe<AssessmentUserUpdateManyWithoutStudentInput>;
  EXP?: InputMaybe<IntFieldUpdateOperationsInput>;
  avatar?: InputMaybe<AvatarUpdateOneWithoutStudentInput>;
  balance?: InputMaybe<BalanceUpdateOneWithoutStudentInput>;
  bio?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  birthDate?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  challengeGallery?: InputMaybe<ChallengeUpdateManyWithoutCreatorInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  enrolledCourses?: InputMaybe<EnrolledCourseUpdateManyWithoutStudentInput>;
  expLog?: InputMaybe<ExpLogUpdateManyWithoutStudentInput>;
  friendsRequestee?: InputMaybe<FriendShipUpdateManyWithoutRequesteeInput>;
  friendsRequester?: InputMaybe<FriendShipUpdateManyWithoutRequesterInput>;
  legacyAvatar?: InputMaybe<UserAvatarUpdateOneWithoutUserInput>;
  loginPattern?: InputMaybe<StringFieldUpdateOperationsInput>;
  newAvatar?: InputMaybe<Scalars['JSON']>;
  parent?: InputMaybe<ParentUpdateOneRequiredWithoutChildrenInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutStudentInput>;
  username?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type StudentUpdateWithoutAvatarInput = {
  AssessmentUser?: InputMaybe<AssessmentUserUpdateManyWithoutStudentInput>;
  EXP?: InputMaybe<IntFieldUpdateOperationsInput>;
  avatarImage?: InputMaybe<AssetUpdateOneWithoutAvatarImageInput>;
  balance?: InputMaybe<BalanceUpdateOneWithoutStudentInput>;
  bio?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  birthDate?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  challengeGallery?: InputMaybe<ChallengeUpdateManyWithoutCreatorInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  enrolledCourses?: InputMaybe<EnrolledCourseUpdateManyWithoutStudentInput>;
  expLog?: InputMaybe<ExpLogUpdateManyWithoutStudentInput>;
  friendsRequestee?: InputMaybe<FriendShipUpdateManyWithoutRequesteeInput>;
  friendsRequester?: InputMaybe<FriendShipUpdateManyWithoutRequesterInput>;
  legacyAvatar?: InputMaybe<UserAvatarUpdateOneWithoutUserInput>;
  loginPattern?: InputMaybe<StringFieldUpdateOperationsInput>;
  newAvatar?: InputMaybe<Scalars['JSON']>;
  parent?: InputMaybe<ParentUpdateOneRequiredWithoutChildrenInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutStudentInput>;
  username?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type StudentUpdateWithoutChallengeGalleryInput = {
  AssessmentUser?: InputMaybe<AssessmentUserUpdateManyWithoutStudentInput>;
  EXP?: InputMaybe<IntFieldUpdateOperationsInput>;
  avatar?: InputMaybe<AvatarUpdateOneWithoutStudentInput>;
  avatarImage?: InputMaybe<AssetUpdateOneWithoutAvatarImageInput>;
  balance?: InputMaybe<BalanceUpdateOneWithoutStudentInput>;
  bio?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  birthDate?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  enrolledCourses?: InputMaybe<EnrolledCourseUpdateManyWithoutStudentInput>;
  expLog?: InputMaybe<ExpLogUpdateManyWithoutStudentInput>;
  friendsRequestee?: InputMaybe<FriendShipUpdateManyWithoutRequesteeInput>;
  friendsRequester?: InputMaybe<FriendShipUpdateManyWithoutRequesterInput>;
  legacyAvatar?: InputMaybe<UserAvatarUpdateOneWithoutUserInput>;
  loginPattern?: InputMaybe<StringFieldUpdateOperationsInput>;
  newAvatar?: InputMaybe<Scalars['JSON']>;
  parent?: InputMaybe<ParentUpdateOneRequiredWithoutChildrenInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutStudentInput>;
  username?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type StudentUpdateWithoutEnrolledCoursesInput = {
  AssessmentUser?: InputMaybe<AssessmentUserUpdateManyWithoutStudentInput>;
  EXP?: InputMaybe<IntFieldUpdateOperationsInput>;
  avatar?: InputMaybe<AvatarUpdateOneWithoutStudentInput>;
  avatarImage?: InputMaybe<AssetUpdateOneWithoutAvatarImageInput>;
  balance?: InputMaybe<BalanceUpdateOneWithoutStudentInput>;
  bio?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  birthDate?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  challengeGallery?: InputMaybe<ChallengeUpdateManyWithoutCreatorInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  expLog?: InputMaybe<ExpLogUpdateManyWithoutStudentInput>;
  friendsRequestee?: InputMaybe<FriendShipUpdateManyWithoutRequesteeInput>;
  friendsRequester?: InputMaybe<FriendShipUpdateManyWithoutRequesterInput>;
  legacyAvatar?: InputMaybe<UserAvatarUpdateOneWithoutUserInput>;
  loginPattern?: InputMaybe<StringFieldUpdateOperationsInput>;
  newAvatar?: InputMaybe<Scalars['JSON']>;
  parent?: InputMaybe<ParentUpdateOneRequiredWithoutChildrenInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutStudentInput>;
  username?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type StudentUpdateWithoutExpLogInput = {
  AssessmentUser?: InputMaybe<AssessmentUserUpdateManyWithoutStudentInput>;
  EXP?: InputMaybe<IntFieldUpdateOperationsInput>;
  avatar?: InputMaybe<AvatarUpdateOneWithoutStudentInput>;
  avatarImage?: InputMaybe<AssetUpdateOneWithoutAvatarImageInput>;
  balance?: InputMaybe<BalanceUpdateOneWithoutStudentInput>;
  bio?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  birthDate?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  challengeGallery?: InputMaybe<ChallengeUpdateManyWithoutCreatorInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  enrolledCourses?: InputMaybe<EnrolledCourseUpdateManyWithoutStudentInput>;
  friendsRequestee?: InputMaybe<FriendShipUpdateManyWithoutRequesteeInput>;
  friendsRequester?: InputMaybe<FriendShipUpdateManyWithoutRequesterInput>;
  legacyAvatar?: InputMaybe<UserAvatarUpdateOneWithoutUserInput>;
  loginPattern?: InputMaybe<StringFieldUpdateOperationsInput>;
  newAvatar?: InputMaybe<Scalars['JSON']>;
  parent?: InputMaybe<ParentUpdateOneRequiredWithoutChildrenInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutStudentInput>;
  username?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type StudentUpdateWithoutFriendsRequesteeInput = {
  AssessmentUser?: InputMaybe<AssessmentUserUpdateManyWithoutStudentInput>;
  EXP?: InputMaybe<IntFieldUpdateOperationsInput>;
  avatar?: InputMaybe<AvatarUpdateOneWithoutStudentInput>;
  avatarImage?: InputMaybe<AssetUpdateOneWithoutAvatarImageInput>;
  balance?: InputMaybe<BalanceUpdateOneWithoutStudentInput>;
  bio?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  birthDate?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  challengeGallery?: InputMaybe<ChallengeUpdateManyWithoutCreatorInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  enrolledCourses?: InputMaybe<EnrolledCourseUpdateManyWithoutStudentInput>;
  expLog?: InputMaybe<ExpLogUpdateManyWithoutStudentInput>;
  friendsRequester?: InputMaybe<FriendShipUpdateManyWithoutRequesterInput>;
  legacyAvatar?: InputMaybe<UserAvatarUpdateOneWithoutUserInput>;
  loginPattern?: InputMaybe<StringFieldUpdateOperationsInput>;
  newAvatar?: InputMaybe<Scalars['JSON']>;
  parent?: InputMaybe<ParentUpdateOneRequiredWithoutChildrenInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutStudentInput>;
  username?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type StudentUpdateWithoutFriendsRequesterInput = {
  AssessmentUser?: InputMaybe<AssessmentUserUpdateManyWithoutStudentInput>;
  EXP?: InputMaybe<IntFieldUpdateOperationsInput>;
  avatar?: InputMaybe<AvatarUpdateOneWithoutStudentInput>;
  avatarImage?: InputMaybe<AssetUpdateOneWithoutAvatarImageInput>;
  balance?: InputMaybe<BalanceUpdateOneWithoutStudentInput>;
  bio?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  birthDate?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  challengeGallery?: InputMaybe<ChallengeUpdateManyWithoutCreatorInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  enrolledCourses?: InputMaybe<EnrolledCourseUpdateManyWithoutStudentInput>;
  expLog?: InputMaybe<ExpLogUpdateManyWithoutStudentInput>;
  friendsRequestee?: InputMaybe<FriendShipUpdateManyWithoutRequesteeInput>;
  legacyAvatar?: InputMaybe<UserAvatarUpdateOneWithoutUserInput>;
  loginPattern?: InputMaybe<StringFieldUpdateOperationsInput>;
  newAvatar?: InputMaybe<Scalars['JSON']>;
  parent?: InputMaybe<ParentUpdateOneRequiredWithoutChildrenInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutStudentInput>;
  username?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type StudentUpdateWithoutParentInput = {
  AssessmentUser?: InputMaybe<AssessmentUserUpdateManyWithoutStudentInput>;
  EXP?: InputMaybe<IntFieldUpdateOperationsInput>;
  avatar?: InputMaybe<AvatarUpdateOneWithoutStudentInput>;
  avatarImage?: InputMaybe<AssetUpdateOneWithoutAvatarImageInput>;
  balance?: InputMaybe<BalanceUpdateOneWithoutStudentInput>;
  bio?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  birthDate?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  challengeGallery?: InputMaybe<ChallengeUpdateManyWithoutCreatorInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  enrolledCourses?: InputMaybe<EnrolledCourseUpdateManyWithoutStudentInput>;
  expLog?: InputMaybe<ExpLogUpdateManyWithoutStudentInput>;
  friendsRequestee?: InputMaybe<FriendShipUpdateManyWithoutRequesteeInput>;
  friendsRequester?: InputMaybe<FriendShipUpdateManyWithoutRequesterInput>;
  legacyAvatar?: InputMaybe<UserAvatarUpdateOneWithoutUserInput>;
  loginPattern?: InputMaybe<StringFieldUpdateOperationsInput>;
  newAvatar?: InputMaybe<Scalars['JSON']>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutStudentInput>;
  username?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type StudentUpdateWithoutUserInput = {
  AssessmentUser?: InputMaybe<AssessmentUserUpdateManyWithoutStudentInput>;
  EXP?: InputMaybe<IntFieldUpdateOperationsInput>;
  avatar?: InputMaybe<AvatarUpdateOneWithoutStudentInput>;
  avatarImage?: InputMaybe<AssetUpdateOneWithoutAvatarImageInput>;
  balance?: InputMaybe<BalanceUpdateOneWithoutStudentInput>;
  bio?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  birthDate?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  challengeGallery?: InputMaybe<ChallengeUpdateManyWithoutCreatorInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  enrolledCourses?: InputMaybe<EnrolledCourseUpdateManyWithoutStudentInput>;
  expLog?: InputMaybe<ExpLogUpdateManyWithoutStudentInput>;
  friendsRequestee?: InputMaybe<FriendShipUpdateManyWithoutRequesteeInput>;
  friendsRequester?: InputMaybe<FriendShipUpdateManyWithoutRequesterInput>;
  legacyAvatar?: InputMaybe<UserAvatarUpdateOneWithoutUserInput>;
  loginPattern?: InputMaybe<StringFieldUpdateOperationsInput>;
  newAvatar?: InputMaybe<Scalars['JSON']>;
  parent?: InputMaybe<ParentUpdateOneRequiredWithoutChildrenInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  username?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type StudentUpsertWithWhereUniqueWithoutParentInput = {
  create: StudentCreateWithoutParentInput;
  update: StudentUpdateWithoutParentInput;
  where: StudentWhereUniqueInput;
};

export type StudentUpsertWithoutAssessmentUserInput = {
  create: StudentCreateWithoutAssessmentUserInput;
  update: StudentUpdateWithoutAssessmentUserInput;
};

export type StudentUpsertWithoutAvatarImageInput = {
  create: StudentCreateWithoutAvatarImageInput;
  update: StudentUpdateWithoutAvatarImageInput;
};

export type StudentUpsertWithoutAvatarInput = {
  create: StudentCreateWithoutAvatarInput;
  update: StudentUpdateWithoutAvatarInput;
};

export type StudentUpsertWithoutChallengeGalleryInput = {
  create: StudentCreateWithoutChallengeGalleryInput;
  update: StudentUpdateWithoutChallengeGalleryInput;
};

export type StudentUpsertWithoutEnrolledCoursesInput = {
  create: StudentCreateWithoutEnrolledCoursesInput;
  update: StudentUpdateWithoutEnrolledCoursesInput;
};

export type StudentUpsertWithoutExpLogInput = {
  create: StudentCreateWithoutExpLogInput;
  update: StudentUpdateWithoutExpLogInput;
};

export type StudentUpsertWithoutFriendsRequesteeInput = {
  create: StudentCreateWithoutFriendsRequesteeInput;
  update: StudentUpdateWithoutFriendsRequesteeInput;
};

export type StudentUpsertWithoutFriendsRequesterInput = {
  create: StudentCreateWithoutFriendsRequesterInput;
  update: StudentUpdateWithoutFriendsRequesterInput;
};

export type StudentUpsertWithoutUserInput = {
  create: StudentCreateWithoutUserInput;
  update: StudentUpdateWithoutUserInput;
};

export type StudentWhereInput = {
  AND?: InputMaybe<Array<StudentWhereInput>>;
  AssessmentUser?: InputMaybe<AssessmentUserListRelationFilter>;
  EXP?: InputMaybe<IntFilter>;
  NOT?: InputMaybe<Array<StudentWhereInput>>;
  OR?: InputMaybe<Array<StudentWhereInput>>;
  avatar?: InputMaybe<AvatarRelationFilter>;
  avatarImage?: InputMaybe<AssetRelationFilter>;
  avatarImageId?: InputMaybe<StringNullableFilter>;
  balance?: InputMaybe<BalanceRelationFilter>;
  bio?: InputMaybe<StringNullableFilter>;
  birthDate?: InputMaybe<DateTimeNullableFilter>;
  challengeGallery?: InputMaybe<ChallengeListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  email?: InputMaybe<StringNullableFilter>;
  enrolledCourses?: InputMaybe<EnrolledCourseListRelationFilter>;
  expLog?: InputMaybe<ExpLogListRelationFilter>;
  friendsRequestee?: InputMaybe<FriendShipListRelationFilter>;
  friendsRequester?: InputMaybe<FriendShipListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  legacyAvatar?: InputMaybe<UserAvatarRelationFilter>;
  loginPattern?: InputMaybe<StringFilter>;
  newAvatar?: InputMaybe<JsonNullableFilter>;
  parent?: InputMaybe<ParentRelationFilter>;
  parentId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  username?: InputMaybe<StringFilter>;
};

export type StudentWhereUniqueInput = {
  avatarImageId?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type SubtitleUploadInput = {
  fileUpload: Scalars['Upload'];
  language: Scalars['String'];
};

export type Subtitles = {
  __typename?: 'Subtitles';
  id: Scalars['ID'];
  language: Scalars['String'];
  url: Scalars['String'];
  video: Asset;
  videoId: Scalars['String'];
};

export type SubtitlesCreateManyVideoInput = {
  id?: InputMaybe<Scalars['String']>;
  language: Scalars['String'];
  url: Scalars['String'];
};

export type SubtitlesCreateManyVideoInputEnvelope = {
  data: Array<SubtitlesCreateManyVideoInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type SubtitlesCreateNestedManyWithoutVideoInput = {
  connect?: InputMaybe<Array<SubtitlesWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<SubtitlesCreateOrConnectWithoutVideoInput>>;
  create?: InputMaybe<Array<SubtitlesCreateWithoutVideoInput>>;
  createMany?: InputMaybe<SubtitlesCreateManyVideoInputEnvelope>;
};

export type SubtitlesCreateOrConnectWithoutVideoInput = {
  create: SubtitlesCreateWithoutVideoInput;
  where: SubtitlesWhereUniqueInput;
};

export type SubtitlesCreateWithoutVideoInput = {
  id?: InputMaybe<Scalars['String']>;
  language: Scalars['String'];
  url: Scalars['String'];
};

export type SubtitlesListRelationFilter = {
  every?: InputMaybe<SubtitlesWhereInput>;
  none?: InputMaybe<SubtitlesWhereInput>;
  some?: InputMaybe<SubtitlesWhereInput>;
};

export type SubtitlesOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export enum SubtitlesOrderByRelevanceFieldEnum {
  Id = 'id',
  Language = 'language',
  Url = 'url',
  VideoId = 'videoId'
}

export type SubtitlesOrderByRelevanceInput = {
  fields: Array<SubtitlesOrderByRelevanceFieldEnum>;
  search: Scalars['String'];
  sort: SortOrder;
};

export type SubtitlesOrderByWithRelationAndSearchRelevanceInput = {
  _relevance?: InputMaybe<SubtitlesOrderByRelevanceInput>;
  id?: InputMaybe<SortOrder>;
  language?: InputMaybe<SortOrder>;
  url?: InputMaybe<SortOrder>;
  video?: InputMaybe<AssetOrderByWithRelationAndSearchRelevanceInput>;
  videoId?: InputMaybe<SortOrder>;
};

export enum SubtitlesScalarFieldEnum {
  Id = 'id',
  Language = 'language',
  Url = 'url',
  VideoId = 'videoId'
}

export type SubtitlesScalarWhereInput = {
  AND?: InputMaybe<Array<SubtitlesScalarWhereInput>>;
  NOT?: InputMaybe<Array<SubtitlesScalarWhereInput>>;
  OR?: InputMaybe<Array<SubtitlesScalarWhereInput>>;
  id?: InputMaybe<StringFilter>;
  language?: InputMaybe<StringFilter>;
  url?: InputMaybe<StringFilter>;
  videoId?: InputMaybe<StringFilter>;
};

export type SubtitlesUpdateInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  language?: InputMaybe<StringFieldUpdateOperationsInput>;
  url?: InputMaybe<StringFieldUpdateOperationsInput>;
  video?: InputMaybe<AssetUpdateOneRequiredWithoutSubtitlesInput>;
};

export type SubtitlesUpdateManyMutationInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  language?: InputMaybe<StringFieldUpdateOperationsInput>;
  url?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type SubtitlesUpdateManyWithWhereWithoutVideoInput = {
  data: SubtitlesUpdateManyMutationInput;
  where: SubtitlesScalarWhereInput;
};

export type SubtitlesUpdateManyWithoutVideoInput = {
  connect?: InputMaybe<Array<SubtitlesWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<SubtitlesCreateOrConnectWithoutVideoInput>>;
  create?: InputMaybe<Array<SubtitlesCreateWithoutVideoInput>>;
  createMany?: InputMaybe<SubtitlesCreateManyVideoInputEnvelope>;
  delete?: InputMaybe<Array<SubtitlesWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<SubtitlesScalarWhereInput>>;
  disconnect?: InputMaybe<Array<SubtitlesWhereUniqueInput>>;
  set?: InputMaybe<Array<SubtitlesWhereUniqueInput>>;
  update?: InputMaybe<Array<SubtitlesUpdateWithWhereUniqueWithoutVideoInput>>;
  updateMany?: InputMaybe<Array<SubtitlesUpdateManyWithWhereWithoutVideoInput>>;
  upsert?: InputMaybe<Array<SubtitlesUpsertWithWhereUniqueWithoutVideoInput>>;
};

export type SubtitlesUpdateWithWhereUniqueWithoutVideoInput = {
  data: SubtitlesUpdateWithoutVideoInput;
  where: SubtitlesWhereUniqueInput;
};

export type SubtitlesUpdateWithoutVideoInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  language?: InputMaybe<StringFieldUpdateOperationsInput>;
  url?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type SubtitlesUpsertWithWhereUniqueWithoutVideoInput = {
  create: SubtitlesCreateWithoutVideoInput;
  update: SubtitlesUpdateWithoutVideoInput;
  where: SubtitlesWhereUniqueInput;
};

export type SubtitlesWhereInput = {
  AND?: InputMaybe<Array<SubtitlesWhereInput>>;
  NOT?: InputMaybe<Array<SubtitlesWhereInput>>;
  OR?: InputMaybe<Array<SubtitlesWhereInput>>;
  id?: InputMaybe<StringFilter>;
  language?: InputMaybe<StringFilter>;
  url?: InputMaybe<StringFilter>;
  video?: InputMaybe<AssetRelationFilter>;
  videoId?: InputMaybe<StringFilter>;
};

export type SubtitlesWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type Teacher = {
  __typename?: 'Teacher';
  Course?: Maybe<Array<Course>>;
  _count: TeacherCount;
  address?: Maybe<Address>;
  addressId?: Maybe<Scalars['String']>;
  banner?: Maybe<Asset>;
  bannerId?: Maybe<Scalars['String']>;
  certificates?: Maybe<Scalars['JSON']>;
  createdAt: Scalars['Date'];
  education?: Maybe<Scalars['JSON']>;
  email: Scalars['String'];
  experiences?: Maybe<Scalars['JSON']>;
  gender?: Maybe<Gender>;
  id: Scalars['ID'];
  introduction?: Maybe<Scalars['String']>;
  jobTitle?: Maybe<Scalars['String']>;
  langauges?: Maybe<Scalars['JSON']>;
  languages?: Maybe<Array<Scalars['String']>>;
  nationality?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
  photo?: Maybe<Asset>;
  photoId?: Maybe<Scalars['String']>;
  profilePicture?: Maybe<Scalars['String']>;
  skills?: Maybe<Array<Scalars['String']>>;
  updatedAt: Scalars['Date'];
  user: User;
};

export type TeacherCount = {
  __typename?: 'TeacherCount';
  Course: Scalars['Int'];
};

export type TeacherCreateNestedOneWithoutBannerInput = {
  connect?: InputMaybe<TeacherWhereUniqueInput>;
  connectOrCreate?: InputMaybe<TeacherCreateOrConnectWithoutBannerInput>;
  create?: InputMaybe<TeacherCreateWithoutBannerInput>;
};

export type TeacherCreateNestedOneWithoutCourseInput = {
  connect?: InputMaybe<TeacherWhereUniqueInput>;
  connectOrCreate?: InputMaybe<TeacherCreateOrConnectWithoutCourseInput>;
  create?: InputMaybe<TeacherCreateWithoutCourseInput>;
};

export type TeacherCreateNestedOneWithoutPhotoInput = {
  connect?: InputMaybe<TeacherWhereUniqueInput>;
  connectOrCreate?: InputMaybe<TeacherCreateOrConnectWithoutPhotoInput>;
  create?: InputMaybe<TeacherCreateWithoutPhotoInput>;
};

export type TeacherCreateNestedOneWithoutUserInput = {
  connect?: InputMaybe<TeacherWhereUniqueInput>;
  connectOrCreate?: InputMaybe<TeacherCreateOrConnectWithoutUserInput>;
  create?: InputMaybe<TeacherCreateWithoutUserInput>;
};

export type TeacherCreateOrConnectWithoutBannerInput = {
  create: TeacherCreateWithoutBannerInput;
  where: TeacherWhereUniqueInput;
};

export type TeacherCreateOrConnectWithoutCourseInput = {
  create: TeacherCreateWithoutCourseInput;
  where: TeacherWhereUniqueInput;
};

export type TeacherCreateOrConnectWithoutPhotoInput = {
  create: TeacherCreateWithoutPhotoInput;
  where: TeacherWhereUniqueInput;
};

export type TeacherCreateOrConnectWithoutUserInput = {
  create: TeacherCreateWithoutUserInput;
  where: TeacherWhereUniqueInput;
};

export type TeacherCreateWithoutBannerInput = {
  Course?: InputMaybe<CourseCreateNestedManyWithoutTeacherInput>;
  address?: InputMaybe<AddressCreateNestedOneWithoutTeacherInput>;
  certificates?: InputMaybe<Scalars['JSON']>;
  createdAt?: InputMaybe<Scalars['Date']>;
  education?: InputMaybe<Scalars['JSON']>;
  email: Scalars['String'];
  experiences?: InputMaybe<Scalars['JSON']>;
  gender?: InputMaybe<Gender>;
  introduction?: InputMaybe<Scalars['String']>;
  jobTitle?: InputMaybe<Scalars['String']>;
  langauges?: InputMaybe<Scalars['JSON']>;
  languages?: InputMaybe<TeacherCreatelanguagesInput>;
  nationality?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  phoneNumber?: InputMaybe<Scalars['String']>;
  photo?: InputMaybe<AssetCreateNestedOneWithoutTeacherPhotoInput>;
  profilePicture?: InputMaybe<Scalars['String']>;
  skills?: InputMaybe<TeacherCreateskillsInput>;
  updatedAt?: InputMaybe<Scalars['Date']>;
  user: UserCreateNestedOneWithoutTeacherInput;
};

export type TeacherCreateWithoutCourseInput = {
  address?: InputMaybe<AddressCreateNestedOneWithoutTeacherInput>;
  banner?: InputMaybe<AssetCreateNestedOneWithoutTeacherBannerInput>;
  certificates?: InputMaybe<Scalars['JSON']>;
  createdAt?: InputMaybe<Scalars['Date']>;
  education?: InputMaybe<Scalars['JSON']>;
  email: Scalars['String'];
  experiences?: InputMaybe<Scalars['JSON']>;
  gender?: InputMaybe<Gender>;
  introduction?: InputMaybe<Scalars['String']>;
  jobTitle?: InputMaybe<Scalars['String']>;
  langauges?: InputMaybe<Scalars['JSON']>;
  languages?: InputMaybe<TeacherCreatelanguagesInput>;
  nationality?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  phoneNumber?: InputMaybe<Scalars['String']>;
  photo?: InputMaybe<AssetCreateNestedOneWithoutTeacherPhotoInput>;
  profilePicture?: InputMaybe<Scalars['String']>;
  skills?: InputMaybe<TeacherCreateskillsInput>;
  updatedAt?: InputMaybe<Scalars['Date']>;
  user: UserCreateNestedOneWithoutTeacherInput;
};

export type TeacherCreateWithoutPhotoInput = {
  Course?: InputMaybe<CourseCreateNestedManyWithoutTeacherInput>;
  address?: InputMaybe<AddressCreateNestedOneWithoutTeacherInput>;
  banner?: InputMaybe<AssetCreateNestedOneWithoutTeacherBannerInput>;
  certificates?: InputMaybe<Scalars['JSON']>;
  createdAt?: InputMaybe<Scalars['Date']>;
  education?: InputMaybe<Scalars['JSON']>;
  email: Scalars['String'];
  experiences?: InputMaybe<Scalars['JSON']>;
  gender?: InputMaybe<Gender>;
  introduction?: InputMaybe<Scalars['String']>;
  jobTitle?: InputMaybe<Scalars['String']>;
  langauges?: InputMaybe<Scalars['JSON']>;
  languages?: InputMaybe<TeacherCreatelanguagesInput>;
  nationality?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  phoneNumber?: InputMaybe<Scalars['String']>;
  profilePicture?: InputMaybe<Scalars['String']>;
  skills?: InputMaybe<TeacherCreateskillsInput>;
  updatedAt?: InputMaybe<Scalars['Date']>;
  user: UserCreateNestedOneWithoutTeacherInput;
};

export type TeacherCreateWithoutUserInput = {
  Course?: InputMaybe<CourseCreateNestedManyWithoutTeacherInput>;
  address?: InputMaybe<AddressCreateNestedOneWithoutTeacherInput>;
  banner?: InputMaybe<AssetCreateNestedOneWithoutTeacherBannerInput>;
  certificates?: InputMaybe<Scalars['JSON']>;
  createdAt?: InputMaybe<Scalars['Date']>;
  education?: InputMaybe<Scalars['JSON']>;
  email: Scalars['String'];
  experiences?: InputMaybe<Scalars['JSON']>;
  gender?: InputMaybe<Gender>;
  introduction?: InputMaybe<Scalars['String']>;
  jobTitle?: InputMaybe<Scalars['String']>;
  langauges?: InputMaybe<Scalars['JSON']>;
  languages?: InputMaybe<TeacherCreatelanguagesInput>;
  nationality?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  phoneNumber?: InputMaybe<Scalars['String']>;
  photo?: InputMaybe<AssetCreateNestedOneWithoutTeacherPhotoInput>;
  profilePicture?: InputMaybe<Scalars['String']>;
  skills?: InputMaybe<TeacherCreateskillsInput>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type TeacherCreatelanguagesInput = {
  set: Array<Scalars['String']>;
};

export type TeacherCreateskillsInput = {
  set: Array<Scalars['String']>;
};

export enum TeacherOrderByRelevanceFieldEnum {
  AddressId = 'addressId',
  BannerId = 'bannerId',
  Email = 'email',
  Id = 'id',
  Introduction = 'introduction',
  JobTitle = 'jobTitle',
  Languages = 'languages',
  Nationality = 'nationality',
  Password = 'password',
  PhoneNumber = 'phoneNumber',
  PhotoId = 'photoId',
  ProfilePicture = 'profilePicture',
  Skills = 'skills'
}

export type TeacherOrderByRelevanceInput = {
  fields: Array<TeacherOrderByRelevanceFieldEnum>;
  search: Scalars['String'];
  sort: SortOrder;
};

export type TeacherOrderByWithRelationAndSearchRelevanceInput = {
  Course?: InputMaybe<CourseOrderByRelationAggregateInput>;
  _relevance?: InputMaybe<TeacherOrderByRelevanceInput>;
  address?: InputMaybe<AddressOrderByWithRelationAndSearchRelevanceInput>;
  addressId?: InputMaybe<SortOrder>;
  banner?: InputMaybe<AssetOrderByWithRelationAndSearchRelevanceInput>;
  bannerId?: InputMaybe<SortOrder>;
  certificates?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  education?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  experiences?: InputMaybe<SortOrder>;
  gender?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  introduction?: InputMaybe<SortOrder>;
  jobTitle?: InputMaybe<SortOrder>;
  langauges?: InputMaybe<SortOrder>;
  languages?: InputMaybe<SortOrder>;
  nationality?: InputMaybe<SortOrder>;
  password?: InputMaybe<SortOrder>;
  phoneNumber?: InputMaybe<SortOrder>;
  photo?: InputMaybe<AssetOrderByWithRelationAndSearchRelevanceInput>;
  photoId?: InputMaybe<SortOrder>;
  profilePicture?: InputMaybe<SortOrder>;
  skills?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationAndSearchRelevanceInput>;
};

export type TeacherRelationFilter = {
  is?: InputMaybe<TeacherWhereInput>;
  isNot?: InputMaybe<TeacherWhereInput>;
};

export type TeacherUpdateOneRequiredWithoutCourseInput = {
  connect?: InputMaybe<TeacherWhereUniqueInput>;
  connectOrCreate?: InputMaybe<TeacherCreateOrConnectWithoutCourseInput>;
  create?: InputMaybe<TeacherCreateWithoutCourseInput>;
  update?: InputMaybe<TeacherUpdateWithoutCourseInput>;
  upsert?: InputMaybe<TeacherUpsertWithoutCourseInput>;
};

export type TeacherUpdateOneWithoutBannerInput = {
  connect?: InputMaybe<TeacherWhereUniqueInput>;
  connectOrCreate?: InputMaybe<TeacherCreateOrConnectWithoutBannerInput>;
  create?: InputMaybe<TeacherCreateWithoutBannerInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<TeacherUpdateWithoutBannerInput>;
  upsert?: InputMaybe<TeacherUpsertWithoutBannerInput>;
};

export type TeacherUpdateOneWithoutPhotoInput = {
  connect?: InputMaybe<TeacherWhereUniqueInput>;
  connectOrCreate?: InputMaybe<TeacherCreateOrConnectWithoutPhotoInput>;
  create?: InputMaybe<TeacherCreateWithoutPhotoInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<TeacherUpdateWithoutPhotoInput>;
  upsert?: InputMaybe<TeacherUpsertWithoutPhotoInput>;
};

export type TeacherUpdateOneWithoutUserInput = {
  connect?: InputMaybe<TeacherWhereUniqueInput>;
  connectOrCreate?: InputMaybe<TeacherCreateOrConnectWithoutUserInput>;
  create?: InputMaybe<TeacherCreateWithoutUserInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<TeacherUpdateWithoutUserInput>;
  upsert?: InputMaybe<TeacherUpsertWithoutUserInput>;
};

export type TeacherUpdateWithoutBannerInput = {
  Course?: InputMaybe<CourseUpdateManyWithoutTeacherInput>;
  address?: InputMaybe<AddressUpdateOneWithoutTeacherInput>;
  certificates?: InputMaybe<Scalars['JSON']>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  education?: InputMaybe<Scalars['JSON']>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  experiences?: InputMaybe<Scalars['JSON']>;
  gender?: InputMaybe<NullableEnumGenderFieldUpdateOperationsInput>;
  introduction?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  jobTitle?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  langauges?: InputMaybe<Scalars['JSON']>;
  languages?: InputMaybe<TeacherUpdatelanguagesInput>;
  nationality?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  phoneNumber?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  photo?: InputMaybe<AssetUpdateOneWithoutTeacherPhotoInput>;
  profilePicture?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  skills?: InputMaybe<TeacherUpdateskillsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutTeacherInput>;
};

export type TeacherUpdateWithoutCourseInput = {
  address?: InputMaybe<AddressUpdateOneWithoutTeacherInput>;
  banner?: InputMaybe<AssetUpdateOneWithoutTeacherBannerInput>;
  certificates?: InputMaybe<Scalars['JSON']>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  education?: InputMaybe<Scalars['JSON']>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  experiences?: InputMaybe<Scalars['JSON']>;
  gender?: InputMaybe<NullableEnumGenderFieldUpdateOperationsInput>;
  introduction?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  jobTitle?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  langauges?: InputMaybe<Scalars['JSON']>;
  languages?: InputMaybe<TeacherUpdatelanguagesInput>;
  nationality?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  phoneNumber?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  photo?: InputMaybe<AssetUpdateOneWithoutTeacherPhotoInput>;
  profilePicture?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  skills?: InputMaybe<TeacherUpdateskillsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutTeacherInput>;
};

export type TeacherUpdateWithoutPhotoInput = {
  Course?: InputMaybe<CourseUpdateManyWithoutTeacherInput>;
  address?: InputMaybe<AddressUpdateOneWithoutTeacherInput>;
  banner?: InputMaybe<AssetUpdateOneWithoutTeacherBannerInput>;
  certificates?: InputMaybe<Scalars['JSON']>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  education?: InputMaybe<Scalars['JSON']>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  experiences?: InputMaybe<Scalars['JSON']>;
  gender?: InputMaybe<NullableEnumGenderFieldUpdateOperationsInput>;
  introduction?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  jobTitle?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  langauges?: InputMaybe<Scalars['JSON']>;
  languages?: InputMaybe<TeacherUpdatelanguagesInput>;
  nationality?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  phoneNumber?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  profilePicture?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  skills?: InputMaybe<TeacherUpdateskillsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutTeacherInput>;
};

export type TeacherUpdateWithoutUserInput = {
  Course?: InputMaybe<CourseUpdateManyWithoutTeacherInput>;
  address?: InputMaybe<AddressUpdateOneWithoutTeacherInput>;
  banner?: InputMaybe<AssetUpdateOneWithoutTeacherBannerInput>;
  certificates?: InputMaybe<Scalars['JSON']>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  education?: InputMaybe<Scalars['JSON']>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  experiences?: InputMaybe<Scalars['JSON']>;
  gender?: InputMaybe<NullableEnumGenderFieldUpdateOperationsInput>;
  introduction?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  jobTitle?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  langauges?: InputMaybe<Scalars['JSON']>;
  languages?: InputMaybe<TeacherUpdatelanguagesInput>;
  nationality?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  phoneNumber?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  photo?: InputMaybe<AssetUpdateOneWithoutTeacherPhotoInput>;
  profilePicture?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  skills?: InputMaybe<TeacherUpdateskillsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type TeacherUpdatelanguagesInput = {
  push?: InputMaybe<Array<Scalars['String']>>;
  set?: InputMaybe<Array<Scalars['String']>>;
};

export type TeacherUpdateskillsInput = {
  push?: InputMaybe<Array<Scalars['String']>>;
  set?: InputMaybe<Array<Scalars['String']>>;
};

export type TeacherUpsertWithoutBannerInput = {
  create: TeacherCreateWithoutBannerInput;
  update: TeacherUpdateWithoutBannerInput;
};

export type TeacherUpsertWithoutCourseInput = {
  create: TeacherCreateWithoutCourseInput;
  update: TeacherUpdateWithoutCourseInput;
};

export type TeacherUpsertWithoutPhotoInput = {
  create: TeacherCreateWithoutPhotoInput;
  update: TeacherUpdateWithoutPhotoInput;
};

export type TeacherUpsertWithoutUserInput = {
  create: TeacherCreateWithoutUserInput;
  update: TeacherUpdateWithoutUserInput;
};

export type TeacherWhereInput = {
  AND?: InputMaybe<Array<TeacherWhereInput>>;
  Course?: InputMaybe<CourseListRelationFilter>;
  NOT?: InputMaybe<Array<TeacherWhereInput>>;
  OR?: InputMaybe<Array<TeacherWhereInput>>;
  address?: InputMaybe<AddressRelationFilter>;
  addressId?: InputMaybe<StringNullableFilter>;
  banner?: InputMaybe<AssetRelationFilter>;
  bannerId?: InputMaybe<StringNullableFilter>;
  certificates?: InputMaybe<JsonNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  education?: InputMaybe<JsonNullableFilter>;
  email?: InputMaybe<StringFilter>;
  experiences?: InputMaybe<JsonNullableFilter>;
  gender?: InputMaybe<EnumGenderNullableFilter>;
  id?: InputMaybe<StringFilter>;
  introduction?: InputMaybe<StringNullableFilter>;
  jobTitle?: InputMaybe<StringNullableFilter>;
  langauges?: InputMaybe<JsonNullableFilter>;
  languages?: InputMaybe<StringNullableListFilter>;
  nationality?: InputMaybe<StringNullableFilter>;
  password?: InputMaybe<StringFilter>;
  phoneNumber?: InputMaybe<StringNullableFilter>;
  photo?: InputMaybe<AssetRelationFilter>;
  photoId?: InputMaybe<StringNullableFilter>;
  profilePicture?: InputMaybe<StringNullableFilter>;
  skills?: InputMaybe<StringNullableListFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
};

export type TeacherWhereUniqueInput = {
  addressId?: InputMaybe<Scalars['String']>;
  bannerId?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  photoId?: InputMaybe<Scalars['String']>;
};

export type Team = {
  __typename?: 'Team';
  _count: TeamCount;
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['Date'];
  users?: Maybe<Array<User>>;
};

export type TeamCount = {
  __typename?: 'TeamCount';
  users: Scalars['Int'];
};

export type TeamCreateNestedOneWithoutUsersInput = {
  connect?: InputMaybe<TeamWhereUniqueInput>;
  connectOrCreate?: InputMaybe<TeamCreateOrConnectWithoutUsersInput>;
  create?: InputMaybe<TeamCreateWithoutUsersInput>;
};

export type TeamCreateOrConnectWithoutUsersInput = {
  create: TeamCreateWithoutUsersInput;
  where: TeamWhereUniqueInput;
};

export type TeamCreateWithoutUsersInput = {
  createdAt?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export enum TeamOrderByRelevanceFieldEnum {
  Id = 'id',
  Name = 'name'
}

export type TeamOrderByRelevanceInput = {
  fields: Array<TeamOrderByRelevanceFieldEnum>;
  search: Scalars['String'];
  sort: SortOrder;
};

export type TeamOrderByWithRelationAndSearchRelevanceInput = {
  _relevance?: InputMaybe<TeamOrderByRelevanceInput>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  users?: InputMaybe<UserOrderByRelationAggregateInput>;
};

export type TeamRelationFilter = {
  is?: InputMaybe<TeamWhereInput>;
  isNot?: InputMaybe<TeamWhereInput>;
};

export type TeamUpdateOneRequiredWithoutUsersInput = {
  connect?: InputMaybe<TeamWhereUniqueInput>;
  connectOrCreate?: InputMaybe<TeamCreateOrConnectWithoutUsersInput>;
  create?: InputMaybe<TeamCreateWithoutUsersInput>;
  update?: InputMaybe<TeamUpdateWithoutUsersInput>;
  upsert?: InputMaybe<TeamUpsertWithoutUsersInput>;
};

export type TeamUpdateWithoutUsersInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type TeamUpsertWithoutUsersInput = {
  create: TeamCreateWithoutUsersInput;
  update: TeamUpdateWithoutUsersInput;
};

export type TeamWhereInput = {
  AND?: InputMaybe<Array<TeamWhereInput>>;
  NOT?: InputMaybe<Array<TeamWhereInput>>;
  OR?: InputMaybe<Array<TeamWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  users?: InputMaybe<UserListRelationFilter>;
};

export type TeamWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type TextBlock = {
  __typename?: 'TextBlock';
  block: Block;
  createdAt: Scalars['Date'];
  deleted?: Maybe<Scalars['Date']>;
  id: Scalars['ID'];
  text?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Date'];
};

export type TextBlockCreateNestedOneWithoutBlockInput = {
  connect?: InputMaybe<TextBlockWhereUniqueInput>;
  connectOrCreate?: InputMaybe<TextBlockCreateOrConnectWithoutBlockInput>;
  create?: InputMaybe<TextBlockCreateWithoutBlockInput>;
};

export type TextBlockCreateOrConnectWithoutBlockInput = {
  create: TextBlockCreateWithoutBlockInput;
  where: TextBlockWhereUniqueInput;
};

export type TextBlockCreateWithoutBlockInput = {
  createdAt?: InputMaybe<Scalars['Date']>;
  deleted?: InputMaybe<Scalars['Date']>;
  text?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export enum TextBlockOrderByRelevanceFieldEnum {
  Id = 'id',
  Text = 'text'
}

export type TextBlockOrderByRelevanceInput = {
  fields: Array<TextBlockOrderByRelevanceFieldEnum>;
  search: Scalars['String'];
  sort: SortOrder;
};

export type TextBlockOrderByWithRelationAndSearchRelevanceInput = {
  _relevance?: InputMaybe<TextBlockOrderByRelevanceInput>;
  block?: InputMaybe<BlockOrderByWithRelationAndSearchRelevanceInput>;
  createdAt?: InputMaybe<SortOrder>;
  deleted?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  text?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type TextBlockRelationFilter = {
  is?: InputMaybe<TextBlockWhereInput>;
  isNot?: InputMaybe<TextBlockWhereInput>;
};

export type TextBlockUncheckedCreateNestedOneWithoutBlockInput = {
  connect?: InputMaybe<TextBlockWhereUniqueInput>;
  connectOrCreate?: InputMaybe<TextBlockCreateOrConnectWithoutBlockInput>;
  create?: InputMaybe<TextBlockCreateWithoutBlockInput>;
};

export type TextBlockUpdateOneWithoutBlockInput = {
  connect?: InputMaybe<TextBlockWhereUniqueInput>;
  connectOrCreate?: InputMaybe<TextBlockCreateOrConnectWithoutBlockInput>;
  create?: InputMaybe<TextBlockCreateWithoutBlockInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<TextBlockUpdateWithoutBlockInput>;
  upsert?: InputMaybe<TextBlockUpsertWithoutBlockInput>;
};

export type TextBlockUpdateWithoutBlockInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deleted?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  text?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type TextBlockUpsertWithoutBlockInput = {
  create: TextBlockCreateWithoutBlockInput;
  update: TextBlockUpdateWithoutBlockInput;
};

export type TextBlockWhereInput = {
  AND?: InputMaybe<Array<TextBlockWhereInput>>;
  NOT?: InputMaybe<Array<TextBlockWhereInput>>;
  OR?: InputMaybe<Array<TextBlockWhereInput>>;
  block?: InputMaybe<BlockRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  deleted?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<StringFilter>;
  text?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type TextBlockWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type Token = {
  __typename?: 'Token';
  /** JWT access token */
  accessToken: Scalars['String'];
  /** JWT refresh token */
  refreshToken: Scalars['String'];
};

export enum TopicType {
  Challenge = 'CHALLENGE',
  End = 'END',
  Introduction = 'INTRODUCTION',
  Lesson = 'LESSON',
  Quiz = 'QUIZ'
}

export type TopsItem = {
  __typename?: 'TopsItem';
  id: Scalars['ID'];
  item: AvatarItem;
  topsType: TopsType;
};

export type TopsItemCreateManyItemInput = {
  topsType: TopsType;
};

export type TopsItemCreateManyItemInputEnvelope = {
  data: Array<TopsItemCreateManyItemInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type TopsItemCreateNestedManyWithoutItemInput = {
  connect?: InputMaybe<Array<TopsItemWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<TopsItemCreateOrConnectWithoutItemInput>>;
  create?: InputMaybe<Array<TopsItemCreateWithoutItemInput>>;
  createMany?: InputMaybe<TopsItemCreateManyItemInputEnvelope>;
};

export type TopsItemCreateOrConnectWithoutItemInput = {
  create: TopsItemCreateWithoutItemInput;
  where: TopsItemWhereUniqueInput;
};

export type TopsItemCreateWithoutItemInput = {
  topsType: TopsType;
};

export type TopsItemListRelationFilter = {
  every?: InputMaybe<TopsItemWhereInput>;
  none?: InputMaybe<TopsItemWhereInput>;
  some?: InputMaybe<TopsItemWhereInput>;
};

export type TopsItemOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type TopsItemScalarWhereInput = {
  AND?: InputMaybe<Array<TopsItemScalarWhereInput>>;
  NOT?: InputMaybe<Array<TopsItemScalarWhereInput>>;
  OR?: InputMaybe<Array<TopsItemScalarWhereInput>>;
  id?: InputMaybe<StringFilter>;
  topsType?: InputMaybe<EnumTopsTypeFilter>;
};

export type TopsItemUpdateManyMutationInput = {
  topsType?: InputMaybe<EnumTopsTypeFieldUpdateOperationsInput>;
};

export type TopsItemUpdateManyWithWhereWithoutItemInput = {
  data: TopsItemUpdateManyMutationInput;
  where: TopsItemScalarWhereInput;
};

export type TopsItemUpdateManyWithoutItemInput = {
  connect?: InputMaybe<Array<TopsItemWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<TopsItemCreateOrConnectWithoutItemInput>>;
  create?: InputMaybe<Array<TopsItemCreateWithoutItemInput>>;
  createMany?: InputMaybe<TopsItemCreateManyItemInputEnvelope>;
  delete?: InputMaybe<Array<TopsItemWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<TopsItemScalarWhereInput>>;
  disconnect?: InputMaybe<Array<TopsItemWhereUniqueInput>>;
  set?: InputMaybe<Array<TopsItemWhereUniqueInput>>;
  update?: InputMaybe<Array<TopsItemUpdateWithWhereUniqueWithoutItemInput>>;
  updateMany?: InputMaybe<Array<TopsItemUpdateManyWithWhereWithoutItemInput>>;
  upsert?: InputMaybe<Array<TopsItemUpsertWithWhereUniqueWithoutItemInput>>;
};

export type TopsItemUpdateWithWhereUniqueWithoutItemInput = {
  data: TopsItemUpdateWithoutItemInput;
  where: TopsItemWhereUniqueInput;
};

export type TopsItemUpdateWithoutItemInput = {
  topsType?: InputMaybe<EnumTopsTypeFieldUpdateOperationsInput>;
};

export type TopsItemUpsertWithWhereUniqueWithoutItemInput = {
  create: TopsItemCreateWithoutItemInput;
  update: TopsItemUpdateWithoutItemInput;
  where: TopsItemWhereUniqueInput;
};

export type TopsItemWhereInput = {
  AND?: InputMaybe<Array<TopsItemWhereInput>>;
  NOT?: InputMaybe<Array<TopsItemWhereInput>>;
  OR?: InputMaybe<Array<TopsItemWhereInput>>;
  id?: InputMaybe<StringFilter>;
  item?: InputMaybe<AvatarItemRelationFilter>;
  topsType?: InputMaybe<EnumTopsTypeFilter>;
};

export type TopsItemWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export enum TopsType {
  Jacket = 'JACKET',
  Shirt = 'SHIRT'
}

export type UpdatSelectionInput = {
  asset?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  isCorrect?: InputMaybe<Scalars['Boolean']>;
  order?: InputMaybe<Scalars['Int']>;
  text?: InputMaybe<Scalars['String']>;
};

export type UpdateAddressInput = {
  address1?: InputMaybe<Scalars['String']>;
  address2?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  postalCode?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
};

export type UpdateBlockInput = {
  assetId?: InputMaybe<Scalars['String']>;
  blockType: BlockGeneralType;
  id: Scalars['String'];
  text?: InputMaybe<Scalars['String']>;
};

export type UpdateBlockManyOrderInput = {
  id: Scalars['String'];
  order: Scalars['Int'];
};

export type UpdateCategoryInput = {
  activeImgUrl?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  inactiveImgUrl?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type UpdateCheckpointBlocksInput = {
  blocks: Array<UpdateBlockInput>;
};

export type UpdateCheckpointCreateManyBlocksInput = {
  blocks: Array<CreateCheckpointBlockInput>;
};

export type UpdateCheckpointInput = {
  blocks?: InputMaybe<BlockUncheckedCreateNestedManyWithoutCheckpointInput>;
  courseId?: InputMaybe<Scalars['String']>;
  deleted?: InputMaybe<Scalars['Date']>;
  description?: InputMaybe<Scalars['String']>;
  duration?: InputMaybe<Scalars['Int']>;
  enabled?: InputMaybe<Scalars['Boolean']>;
  enrolledCheckpoints?: InputMaybe<EnrolledCheckpointUncheckedCreateNestedManyWithoutCheckpointInput>;
  imageId?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Scalars['Int']>;
  parentCheckpointId?: InputMaybe<Scalars['String']>;
  subCheckpoints?: InputMaybe<CheckpointUncheckedCreateNestedManyWithoutParentCheckPointInput>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<TopicType>;
};

export type UpdateCheckpointManyQuestionsBlockInput = {
  questionBlocks: Array<UpsertCheckpointQuestionBlockInput>;
};

export type UpdateChildDetailsInput = {
  bio?: InputMaybe<Scalars['String']>;
  birthDate?: InputMaybe<Scalars['Date']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  loginPattern?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type UpdateCourseInput = {
  banners?: InputMaybe<AssetCreateNestedManyWithoutBannerCourseInput>;
  category?: InputMaybe<CategoryCreateNestedOneWithoutCoursesInput>;
  checkpoints?: InputMaybe<CheckpointCreateNestedManyWithoutCourseInput>;
  courseReviews?: InputMaybe<CourseReviewCreateNestedManyWithoutCourseInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  deleted?: InputMaybe<Scalars['Date']>;
  description?: InputMaybe<Scalars['String']>;
  duration?: InputMaybe<Scalars['Int']>;
  enrolledCourses?: InputMaybe<EnrolledCourseCreateNestedManyWithoutCourseInput>;
  id?: InputMaybe<Scalars['String']>;
  level?: InputMaybe<Level>;
  published?: InputMaybe<Scalars['Boolean']>;
  rating?: InputMaybe<Scalars['Decimal']>;
  state?: InputMaybe<State>;
  tags?: InputMaybe<CourseCreatetagsInput>;
  teacher?: InputMaybe<TeacherCreateNestedOneWithoutCourseInput>;
  thumbnail?: InputMaybe<AssetCreateNestedOneWithoutThumbnailCourseInput>;
  title?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type UpdatePairInput = {
  id?: InputMaybe<Scalars['String']>;
  pair?: InputMaybe<Array<Scalars['String']>>;
};

export type UpdateParentInput = {
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<EnumParentStatusFieldUpdateOperationsInput>;
};

export type UpdatePostInput = {
  assetId?: InputMaybe<Scalars['String']>;
  categoryId?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
};

export type UpdateQuestionBlockInput = {
  answerQuantityType?: InputMaybe<AnswerQuantityType>;
  answerType?: InputMaybe<AnswerType>;
  assetId?: InputMaybe<Scalars['String']>;
  checkpointId?: InputMaybe<Scalars['String']>;
  deleted?: InputMaybe<Scalars['Date']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  mediaAssetId?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Scalars['Int']>;
  pairs?: InputMaybe<Array<UpdatePairInput>>;
  quizType?: InputMaybe<QuizType>;
  selections?: InputMaybe<Array<UpdatSelectionInput>>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateStudentDetailsInput = {
  bio?: InputMaybe<Scalars['String']>;
  birthDate?: InputMaybe<Scalars['Date']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  loginPattern?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type UpdateTeacherDetailsInput = {
  address?: InputMaybe<AddressCreateWithoutTeacherInput>;
  banner?: InputMaybe<AssetUpdateOneWithoutTeacherBannerInput>;
  certificates?: InputMaybe<Scalars['JSON']>;
  education?: InputMaybe<Scalars['JSON']>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  experiences?: InputMaybe<Scalars['JSON']>;
  firstName?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<NullableEnumGenderFieldUpdateOperationsInput>;
  introduction?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  jobTitle?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  langauges?: InputMaybe<Scalars['JSON']>;
  languages?: InputMaybe<TeacherUpdatelanguagesInput>;
  lastName?: InputMaybe<Scalars['String']>;
  nationality?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  phoneNumber?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  photo?: InputMaybe<AssetUpdateOneWithoutTeacherPhotoInput>;
  profilePicture?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  skills?: InputMaybe<TeacherUpdateskillsInput>;
};

export type UpdateTextBlockInput = {
  text: Scalars['String'];
};

export type UpdateUserAvatar = {
  accessoryItems?: InputMaybe<Scalars['JSON']>;
  body?: InputMaybe<Scalars['String']>;
  bottom?: InputMaybe<Scalars['String']>;
  faceItems?: InputMaybe<Scalars['JSON']>;
  hairBack?: InputMaybe<Scalars['String']>;
  hairBangs?: InputMaybe<Scalars['String']>;
  hairColor?: InputMaybe<Scalars['String']>;
  head?: InputMaybe<Scalars['String']>;
  horns?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  jacket?: InputMaybe<Scalars['String']>;
  leftHand?: InputMaybe<Scalars['String']>;
  rightHand?: InputMaybe<Scalars['String']>;
  shirt?: InputMaybe<Scalars['String']>;
  shoes?: InputMaybe<Scalars['String']>;
  skinColor?: InputMaybe<Scalars['String']>;
};

export type UpdateUserInput = {
  UserForumReaction?: InputMaybe<UserForumReactionUpdateManyWithoutUserInput>;
  acquiredItems?: InputMaybe<AcquiredItemUpdateManyWithoutUserInput>;
  admin?: InputMaybe<AdminUpdateOneWithoutUserInput>;
  challengeComments?: InputMaybe<ChallengeCommentUpdateManyWithoutCommenterInput>;
  challengeLikes?: InputMaybe<ChallengeLikeUpdateManyWithoutLikerInput>;
  challengeReports?: InputMaybe<ChallengeReportUpdateManyWithoutReporterInput>;
  courseReviews?: InputMaybe<CourseReviewUpdateManyWithoutUserInput>;
  firstName?: InputMaybe<StringFieldUpdateOperationsInput>;
  forumPostBookmarks?: InputMaybe<ForumPostBookmarkUpdateManyWithoutUserInput>;
  forumPosts?: InputMaybe<ForumPostUpdateManyWithoutUserInput>;
  forumReports?: InputMaybe<ForumReportUpdateManyWithoutUserInput>;
  lastLogin?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  lastName?: InputMaybe<StringFieldUpdateOperationsInput>;
  onboarded?: InputMaybe<BoolFieldUpdateOperationsInput>;
  parent?: InputMaybe<ParentUpdateOneWithoutUserInput>;
  stripeCustomer?: InputMaybe<StripeCustomerUpdateOneWithoutUserInput>;
  teacher?: InputMaybe<TeacherUpdateOneWithoutUserInput>;
  team?: InputMaybe<TeamUpdateOneRequiredWithoutUsersInput>;
  userNotificationSettings?: InputMaybe<UserNotificationSettingUpdateManyWithoutUserInput>;
  userNotifications?: InputMaybe<UserNotificationUpdateManyWithoutUserInput>;
  verified?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type UploadBlockAsset = {
  fileUpload: Scalars['Upload'];
  id: Scalars['String'];
  subColumn?: InputMaybe<Scalars['String']>;
  subtitles?: InputMaybe<Array<SubtitleUploadInput>>;
};

export type UpsertCheckpointQuestionBlockInput = {
  answerQuantityType?: InputMaybe<AnswerQuantityType>;
  answerType?: InputMaybe<AnswerType>;
  assetId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  mediaAsset?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Scalars['Int']>;
  pairs?: InputMaybe<Array<UpdatePairInput>>;
  quizType: QuizType;
  selections?: InputMaybe<Array<UpdatSelectionInput>>;
  title?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  UserForumReaction?: Maybe<Array<UserForumReaction>>;
  _count: UserCount;
  acquiredItems?: Maybe<Array<AcquiredItem>>;
  admin?: Maybe<Admin>;
  challengeComments?: Maybe<Array<ChallengeComment>>;
  challengeLikes?: Maybe<Array<ChallengeLike>>;
  challengeReports?: Maybe<Array<ChallengeReport>>;
  courseReviews?: Maybe<Array<CourseReview>>;
  createdAt: Scalars['Date'];
  firstName: Scalars['String'];
  forumPostBookmarks?: Maybe<Array<ForumPostBookmark>>;
  forumPosts?: Maybe<Array<ForumPost>>;
  forumReports?: Maybe<Array<ForumReport>>;
  id: Scalars['ID'];
  lastLogin?: Maybe<Scalars['Date']>;
  lastName: Scalars['String'];
  onboarded: Scalars['Boolean'];
  parent?: Maybe<Parent>;
  role: Role;
  stripeCustomer?: Maybe<StripeCustomer>;
  student?: Maybe<Student>;
  teacher?: Maybe<Teacher>;
  team: Team;
  teamId: Scalars['String'];
  updatedAt: Scalars['Date'];
  userNotificationSettings?: Maybe<Array<UserNotificationSetting>>;
  userNotifications?: Maybe<Array<UserNotification>>;
  verified: Scalars['Boolean'];
};

export type UserAvatar = {
  __typename?: 'UserAvatar';
  accessoryItems?: Maybe<Scalars['JSON']>;
  body: Scalars['String'];
  bottom: Scalars['String'];
  faceItems?: Maybe<Scalars['JSON']>;
  hairBack: Scalars['String'];
  hairBangs: Scalars['String'];
  hairColor: Scalars['String'];
  head: Scalars['String'];
  horns: Scalars['String'];
  id: Scalars['ID'];
  jacket: Scalars['String'];
  leftHand: Scalars['String'];
  rightHand: Scalars['String'];
  shirt: Scalars['String'];
  shoes: Scalars['String'];
  skinColor: Scalars['String'];
  updatedAt: Scalars['Date'];
  user: Student;
  userId: Scalars['String'];
};

export type UserAvatarCreateNestedOneWithoutUserInput = {
  connect?: InputMaybe<UserAvatarWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserAvatarCreateOrConnectWithoutUserInput>;
  create?: InputMaybe<UserAvatarCreateWithoutUserInput>;
};

export type UserAvatarCreateOrConnectWithoutUserInput = {
  create: UserAvatarCreateWithoutUserInput;
  where: UserAvatarWhereUniqueInput;
};

export type UserAvatarCreateWithoutUserInput = {
  accessoryItems?: InputMaybe<Scalars['JSON']>;
  body?: InputMaybe<Scalars['String']>;
  bottom?: InputMaybe<Scalars['String']>;
  faceItems?: InputMaybe<Scalars['JSON']>;
  hairBack?: InputMaybe<Scalars['String']>;
  hairBangs?: InputMaybe<Scalars['String']>;
  hairColor?: InputMaybe<Scalars['String']>;
  head?: InputMaybe<Scalars['String']>;
  horns?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  jacket?: InputMaybe<Scalars['String']>;
  leftHand?: InputMaybe<Scalars['String']>;
  rightHand?: InputMaybe<Scalars['String']>;
  shirt?: InputMaybe<Scalars['String']>;
  shoes?: InputMaybe<Scalars['String']>;
  skinColor?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export enum UserAvatarOrderByRelevanceFieldEnum {
  Body = 'body',
  Bottom = 'bottom',
  HairBack = 'hairBack',
  HairBangs = 'hairBangs',
  HairColor = 'hairColor',
  Head = 'head',
  Horns = 'horns',
  Id = 'id',
  Jacket = 'jacket',
  LeftHand = 'leftHand',
  RightHand = 'rightHand',
  Shirt = 'shirt',
  Shoes = 'shoes',
  SkinColor = 'skinColor',
  UserId = 'userId'
}

export type UserAvatarOrderByRelevanceInput = {
  fields: Array<UserAvatarOrderByRelevanceFieldEnum>;
  search: Scalars['String'];
  sort: SortOrder;
};

export type UserAvatarOrderByWithRelationAndSearchRelevanceInput = {
  _relevance?: InputMaybe<UserAvatarOrderByRelevanceInput>;
  accessoryItems?: InputMaybe<SortOrder>;
  body?: InputMaybe<SortOrder>;
  bottom?: InputMaybe<SortOrder>;
  faceItems?: InputMaybe<SortOrder>;
  hairBack?: InputMaybe<SortOrder>;
  hairBangs?: InputMaybe<SortOrder>;
  hairColor?: InputMaybe<SortOrder>;
  head?: InputMaybe<SortOrder>;
  horns?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  jacket?: InputMaybe<SortOrder>;
  leftHand?: InputMaybe<SortOrder>;
  rightHand?: InputMaybe<SortOrder>;
  shirt?: InputMaybe<SortOrder>;
  shoes?: InputMaybe<SortOrder>;
  skinColor?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  user?: InputMaybe<StudentOrderByWithRelationAndSearchRelevanceInput>;
  userId?: InputMaybe<SortOrder>;
};

export type UserAvatarRelationFilter = {
  is?: InputMaybe<UserAvatarWhereInput>;
  isNot?: InputMaybe<UserAvatarWhereInput>;
};

export type UserAvatarUpdateOneWithoutUserInput = {
  connect?: InputMaybe<UserAvatarWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserAvatarCreateOrConnectWithoutUserInput>;
  create?: InputMaybe<UserAvatarCreateWithoutUserInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<UserAvatarUpdateWithoutUserInput>;
  upsert?: InputMaybe<UserAvatarUpsertWithoutUserInput>;
};

export type UserAvatarUpdateWithoutUserInput = {
  accessoryItems?: InputMaybe<Scalars['JSON']>;
  body?: InputMaybe<StringFieldUpdateOperationsInput>;
  bottom?: InputMaybe<StringFieldUpdateOperationsInput>;
  faceItems?: InputMaybe<Scalars['JSON']>;
  hairBack?: InputMaybe<StringFieldUpdateOperationsInput>;
  hairBangs?: InputMaybe<StringFieldUpdateOperationsInput>;
  hairColor?: InputMaybe<StringFieldUpdateOperationsInput>;
  head?: InputMaybe<StringFieldUpdateOperationsInput>;
  horns?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  jacket?: InputMaybe<StringFieldUpdateOperationsInput>;
  leftHand?: InputMaybe<StringFieldUpdateOperationsInput>;
  rightHand?: InputMaybe<StringFieldUpdateOperationsInput>;
  shirt?: InputMaybe<StringFieldUpdateOperationsInput>;
  shoes?: InputMaybe<StringFieldUpdateOperationsInput>;
  skinColor?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type UserAvatarUpsertWithoutUserInput = {
  create: UserAvatarCreateWithoutUserInput;
  update: UserAvatarUpdateWithoutUserInput;
};

export type UserAvatarWhereInput = {
  AND?: InputMaybe<Array<UserAvatarWhereInput>>;
  NOT?: InputMaybe<Array<UserAvatarWhereInput>>;
  OR?: InputMaybe<Array<UserAvatarWhereInput>>;
  accessoryItems?: InputMaybe<JsonNullableFilter>;
  body?: InputMaybe<StringFilter>;
  bottom?: InputMaybe<StringFilter>;
  faceItems?: InputMaybe<JsonNullableFilter>;
  hairBack?: InputMaybe<StringFilter>;
  hairBangs?: InputMaybe<StringFilter>;
  hairColor?: InputMaybe<StringFilter>;
  head?: InputMaybe<StringFilter>;
  horns?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  jacket?: InputMaybe<StringFilter>;
  leftHand?: InputMaybe<StringFilter>;
  rightHand?: InputMaybe<StringFilter>;
  shirt?: InputMaybe<StringFilter>;
  shoes?: InputMaybe<StringFilter>;
  skinColor?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<StudentRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type UserAvatarWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type UserCount = {
  __typename?: 'UserCount';
  UserForumReaction: Scalars['Int'];
  acquiredItems: Scalars['Int'];
  challengeComments: Scalars['Int'];
  challengeLikes: Scalars['Int'];
  challengeReports: Scalars['Int'];
  courseReviews: Scalars['Int'];
  forumPostBookmarks: Scalars['Int'];
  forumPosts: Scalars['Int'];
  forumReports: Scalars['Int'];
  userNotificationSettings: Scalars['Int'];
  userNotifications: Scalars['Int'];
};

export type UserCreateInput = {
  UserForumReaction?: InputMaybe<UserForumReactionCreateNestedManyWithoutUserInput>;
  acquiredItems?: InputMaybe<AcquiredItemCreateNestedManyWithoutUserInput>;
  admin?: InputMaybe<AdminCreateNestedOneWithoutUserInput>;
  challengeComments?: InputMaybe<ChallengeCommentCreateNestedManyWithoutCommenterInput>;
  challengeLikes?: InputMaybe<ChallengeLikeCreateNestedManyWithoutLikerInput>;
  challengeReports?: InputMaybe<ChallengeReportCreateNestedManyWithoutReporterInput>;
  courseReviews?: InputMaybe<CourseReviewCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  firstName: Scalars['String'];
  forumPostBookmarks?: InputMaybe<ForumPostBookmarkCreateNestedManyWithoutUserInput>;
  forumPosts?: InputMaybe<ForumPostCreateNestedManyWithoutUserInput>;
  forumReports?: InputMaybe<ForumReportCreateNestedManyWithoutUserInput>;
  id?: InputMaybe<Scalars['String']>;
  lastLogin?: InputMaybe<Scalars['Date']>;
  lastName: Scalars['String'];
  onboarded?: InputMaybe<Scalars['Boolean']>;
  parent?: InputMaybe<ParentCreateNestedOneWithoutUserInput>;
  role: Role;
  stripeCustomer?: InputMaybe<StripeCustomerCreateNestedOneWithoutUserInput>;
  student?: InputMaybe<StudentCreateNestedOneWithoutUserInput>;
  teacher?: InputMaybe<TeacherCreateNestedOneWithoutUserInput>;
  team: TeamCreateNestedOneWithoutUsersInput;
  updatedAt?: InputMaybe<Scalars['Date']>;
  userNotificationSettings?: InputMaybe<UserNotificationSettingCreateNestedManyWithoutUserInput>;
  userNotifications?: InputMaybe<UserNotificationCreateNestedManyWithoutUserInput>;
  verified?: InputMaybe<Scalars['Boolean']>;
};

export type UserCreateNestedOneWithoutAcquiredItemsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutAcquiredItemsInput>;
  create?: InputMaybe<UserCreateWithoutAcquiredItemsInput>;
};

export type UserCreateNestedOneWithoutChallengeCommentsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutChallengeCommentsInput>;
  create?: InputMaybe<UserCreateWithoutChallengeCommentsInput>;
};

export type UserCreateNestedOneWithoutChallengeLikesInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutChallengeLikesInput>;
  create?: InputMaybe<UserCreateWithoutChallengeLikesInput>;
};

export type UserCreateNestedOneWithoutChallengeReportsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutChallengeReportsInput>;
  create?: InputMaybe<UserCreateWithoutChallengeReportsInput>;
};

export type UserCreateNestedOneWithoutCourseReviewsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutCourseReviewsInput>;
  create?: InputMaybe<UserCreateWithoutCourseReviewsInput>;
};

export type UserCreateNestedOneWithoutForumPostBookmarksInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutForumPostBookmarksInput>;
  create?: InputMaybe<UserCreateWithoutForumPostBookmarksInput>;
};

export type UserCreateNestedOneWithoutForumPostsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutForumPostsInput>;
  create?: InputMaybe<UserCreateWithoutForumPostsInput>;
};

export type UserCreateNestedOneWithoutForumReportsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutForumReportsInput>;
  create?: InputMaybe<UserCreateWithoutForumReportsInput>;
};

export type UserCreateNestedOneWithoutParentInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutParentInput>;
  create?: InputMaybe<UserCreateWithoutParentInput>;
};

export type UserCreateNestedOneWithoutStudentInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutStudentInput>;
  create?: InputMaybe<UserCreateWithoutStudentInput>;
};

export type UserCreateNestedOneWithoutTeacherInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutTeacherInput>;
  create?: InputMaybe<UserCreateWithoutTeacherInput>;
};

export type UserCreateNestedOneWithoutUserForumReactionInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutUserForumReactionInput>;
  create?: InputMaybe<UserCreateWithoutUserForumReactionInput>;
};

export type UserCreateNestedOneWithoutUserNotificationsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutUserNotificationsInput>;
  create?: InputMaybe<UserCreateWithoutUserNotificationsInput>;
};

export type UserCreateOrConnectWithoutAcquiredItemsInput = {
  create: UserCreateWithoutAcquiredItemsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutChallengeCommentsInput = {
  create: UserCreateWithoutChallengeCommentsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutChallengeLikesInput = {
  create: UserCreateWithoutChallengeLikesInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutChallengeReportsInput = {
  create: UserCreateWithoutChallengeReportsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutCourseReviewsInput = {
  create: UserCreateWithoutCourseReviewsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutForumPostBookmarksInput = {
  create: UserCreateWithoutForumPostBookmarksInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutForumPostsInput = {
  create: UserCreateWithoutForumPostsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutForumReportsInput = {
  create: UserCreateWithoutForumReportsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutParentInput = {
  create: UserCreateWithoutParentInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutStudentInput = {
  create: UserCreateWithoutStudentInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutTeacherInput = {
  create: UserCreateWithoutTeacherInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutUserForumReactionInput = {
  create: UserCreateWithoutUserForumReactionInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutUserNotificationsInput = {
  create: UserCreateWithoutUserNotificationsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateWithoutAcquiredItemsInput = {
  UserForumReaction?: InputMaybe<UserForumReactionCreateNestedManyWithoutUserInput>;
  admin?: InputMaybe<AdminCreateNestedOneWithoutUserInput>;
  challengeComments?: InputMaybe<ChallengeCommentCreateNestedManyWithoutCommenterInput>;
  challengeLikes?: InputMaybe<ChallengeLikeCreateNestedManyWithoutLikerInput>;
  challengeReports?: InputMaybe<ChallengeReportCreateNestedManyWithoutReporterInput>;
  courseReviews?: InputMaybe<CourseReviewCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  firstName: Scalars['String'];
  forumPostBookmarks?: InputMaybe<ForumPostBookmarkCreateNestedManyWithoutUserInput>;
  forumPosts?: InputMaybe<ForumPostCreateNestedManyWithoutUserInput>;
  forumReports?: InputMaybe<ForumReportCreateNestedManyWithoutUserInput>;
  id?: InputMaybe<Scalars['String']>;
  lastLogin?: InputMaybe<Scalars['Date']>;
  lastName: Scalars['String'];
  onboarded?: InputMaybe<Scalars['Boolean']>;
  parent?: InputMaybe<ParentCreateNestedOneWithoutUserInput>;
  role: Role;
  stripeCustomer?: InputMaybe<StripeCustomerCreateNestedOneWithoutUserInput>;
  student?: InputMaybe<StudentCreateNestedOneWithoutUserInput>;
  teacher?: InputMaybe<TeacherCreateNestedOneWithoutUserInput>;
  team: TeamCreateNestedOneWithoutUsersInput;
  updatedAt?: InputMaybe<Scalars['Date']>;
  userNotificationSettings?: InputMaybe<UserNotificationSettingCreateNestedManyWithoutUserInput>;
  userNotifications?: InputMaybe<UserNotificationCreateNestedManyWithoutUserInput>;
  verified?: InputMaybe<Scalars['Boolean']>;
};

export type UserCreateWithoutChallengeCommentsInput = {
  UserForumReaction?: InputMaybe<UserForumReactionCreateNestedManyWithoutUserInput>;
  acquiredItems?: InputMaybe<AcquiredItemCreateNestedManyWithoutUserInput>;
  admin?: InputMaybe<AdminCreateNestedOneWithoutUserInput>;
  challengeLikes?: InputMaybe<ChallengeLikeCreateNestedManyWithoutLikerInput>;
  challengeReports?: InputMaybe<ChallengeReportCreateNestedManyWithoutReporterInput>;
  courseReviews?: InputMaybe<CourseReviewCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  firstName: Scalars['String'];
  forumPostBookmarks?: InputMaybe<ForumPostBookmarkCreateNestedManyWithoutUserInput>;
  forumPosts?: InputMaybe<ForumPostCreateNestedManyWithoutUserInput>;
  forumReports?: InputMaybe<ForumReportCreateNestedManyWithoutUserInput>;
  id?: InputMaybe<Scalars['String']>;
  lastLogin?: InputMaybe<Scalars['Date']>;
  lastName: Scalars['String'];
  onboarded?: InputMaybe<Scalars['Boolean']>;
  parent?: InputMaybe<ParentCreateNestedOneWithoutUserInput>;
  role: Role;
  stripeCustomer?: InputMaybe<StripeCustomerCreateNestedOneWithoutUserInput>;
  student?: InputMaybe<StudentCreateNestedOneWithoutUserInput>;
  teacher?: InputMaybe<TeacherCreateNestedOneWithoutUserInput>;
  team: TeamCreateNestedOneWithoutUsersInput;
  updatedAt?: InputMaybe<Scalars['Date']>;
  userNotificationSettings?: InputMaybe<UserNotificationSettingCreateNestedManyWithoutUserInput>;
  userNotifications?: InputMaybe<UserNotificationCreateNestedManyWithoutUserInput>;
  verified?: InputMaybe<Scalars['Boolean']>;
};

export type UserCreateWithoutChallengeLikesInput = {
  UserForumReaction?: InputMaybe<UserForumReactionCreateNestedManyWithoutUserInput>;
  acquiredItems?: InputMaybe<AcquiredItemCreateNestedManyWithoutUserInput>;
  admin?: InputMaybe<AdminCreateNestedOneWithoutUserInput>;
  challengeComments?: InputMaybe<ChallengeCommentCreateNestedManyWithoutCommenterInput>;
  challengeReports?: InputMaybe<ChallengeReportCreateNestedManyWithoutReporterInput>;
  courseReviews?: InputMaybe<CourseReviewCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  firstName: Scalars['String'];
  forumPostBookmarks?: InputMaybe<ForumPostBookmarkCreateNestedManyWithoutUserInput>;
  forumPosts?: InputMaybe<ForumPostCreateNestedManyWithoutUserInput>;
  forumReports?: InputMaybe<ForumReportCreateNestedManyWithoutUserInput>;
  id?: InputMaybe<Scalars['String']>;
  lastLogin?: InputMaybe<Scalars['Date']>;
  lastName: Scalars['String'];
  onboarded?: InputMaybe<Scalars['Boolean']>;
  parent?: InputMaybe<ParentCreateNestedOneWithoutUserInput>;
  role: Role;
  stripeCustomer?: InputMaybe<StripeCustomerCreateNestedOneWithoutUserInput>;
  student?: InputMaybe<StudentCreateNestedOneWithoutUserInput>;
  teacher?: InputMaybe<TeacherCreateNestedOneWithoutUserInput>;
  team: TeamCreateNestedOneWithoutUsersInput;
  updatedAt?: InputMaybe<Scalars['Date']>;
  userNotificationSettings?: InputMaybe<UserNotificationSettingCreateNestedManyWithoutUserInput>;
  userNotifications?: InputMaybe<UserNotificationCreateNestedManyWithoutUserInput>;
  verified?: InputMaybe<Scalars['Boolean']>;
};

export type UserCreateWithoutChallengeReportsInput = {
  UserForumReaction?: InputMaybe<UserForumReactionCreateNestedManyWithoutUserInput>;
  acquiredItems?: InputMaybe<AcquiredItemCreateNestedManyWithoutUserInput>;
  admin?: InputMaybe<AdminCreateNestedOneWithoutUserInput>;
  challengeComments?: InputMaybe<ChallengeCommentCreateNestedManyWithoutCommenterInput>;
  challengeLikes?: InputMaybe<ChallengeLikeCreateNestedManyWithoutLikerInput>;
  courseReviews?: InputMaybe<CourseReviewCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  firstName: Scalars['String'];
  forumPostBookmarks?: InputMaybe<ForumPostBookmarkCreateNestedManyWithoutUserInput>;
  forumPosts?: InputMaybe<ForumPostCreateNestedManyWithoutUserInput>;
  forumReports?: InputMaybe<ForumReportCreateNestedManyWithoutUserInput>;
  id?: InputMaybe<Scalars['String']>;
  lastLogin?: InputMaybe<Scalars['Date']>;
  lastName: Scalars['String'];
  onboarded?: InputMaybe<Scalars['Boolean']>;
  parent?: InputMaybe<ParentCreateNestedOneWithoutUserInput>;
  role: Role;
  stripeCustomer?: InputMaybe<StripeCustomerCreateNestedOneWithoutUserInput>;
  student?: InputMaybe<StudentCreateNestedOneWithoutUserInput>;
  teacher?: InputMaybe<TeacherCreateNestedOneWithoutUserInput>;
  team: TeamCreateNestedOneWithoutUsersInput;
  updatedAt?: InputMaybe<Scalars['Date']>;
  userNotificationSettings?: InputMaybe<UserNotificationSettingCreateNestedManyWithoutUserInput>;
  userNotifications?: InputMaybe<UserNotificationCreateNestedManyWithoutUserInput>;
  verified?: InputMaybe<Scalars['Boolean']>;
};

export type UserCreateWithoutCourseReviewsInput = {
  UserForumReaction?: InputMaybe<UserForumReactionCreateNestedManyWithoutUserInput>;
  acquiredItems?: InputMaybe<AcquiredItemCreateNestedManyWithoutUserInput>;
  admin?: InputMaybe<AdminCreateNestedOneWithoutUserInput>;
  challengeComments?: InputMaybe<ChallengeCommentCreateNestedManyWithoutCommenterInput>;
  challengeLikes?: InputMaybe<ChallengeLikeCreateNestedManyWithoutLikerInput>;
  challengeReports?: InputMaybe<ChallengeReportCreateNestedManyWithoutReporterInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  firstName: Scalars['String'];
  forumPostBookmarks?: InputMaybe<ForumPostBookmarkCreateNestedManyWithoutUserInput>;
  forumPosts?: InputMaybe<ForumPostCreateNestedManyWithoutUserInput>;
  forumReports?: InputMaybe<ForumReportCreateNestedManyWithoutUserInput>;
  id?: InputMaybe<Scalars['String']>;
  lastLogin?: InputMaybe<Scalars['Date']>;
  lastName: Scalars['String'];
  onboarded?: InputMaybe<Scalars['Boolean']>;
  parent?: InputMaybe<ParentCreateNestedOneWithoutUserInput>;
  role: Role;
  stripeCustomer?: InputMaybe<StripeCustomerCreateNestedOneWithoutUserInput>;
  student?: InputMaybe<StudentCreateNestedOneWithoutUserInput>;
  teacher?: InputMaybe<TeacherCreateNestedOneWithoutUserInput>;
  team: TeamCreateNestedOneWithoutUsersInput;
  updatedAt?: InputMaybe<Scalars['Date']>;
  userNotificationSettings?: InputMaybe<UserNotificationSettingCreateNestedManyWithoutUserInput>;
  userNotifications?: InputMaybe<UserNotificationCreateNestedManyWithoutUserInput>;
  verified?: InputMaybe<Scalars['Boolean']>;
};

export type UserCreateWithoutForumPostBookmarksInput = {
  UserForumReaction?: InputMaybe<UserForumReactionCreateNestedManyWithoutUserInput>;
  acquiredItems?: InputMaybe<AcquiredItemCreateNestedManyWithoutUserInput>;
  admin?: InputMaybe<AdminCreateNestedOneWithoutUserInput>;
  challengeComments?: InputMaybe<ChallengeCommentCreateNestedManyWithoutCommenterInput>;
  challengeLikes?: InputMaybe<ChallengeLikeCreateNestedManyWithoutLikerInput>;
  challengeReports?: InputMaybe<ChallengeReportCreateNestedManyWithoutReporterInput>;
  courseReviews?: InputMaybe<CourseReviewCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  firstName: Scalars['String'];
  forumPosts?: InputMaybe<ForumPostCreateNestedManyWithoutUserInput>;
  forumReports?: InputMaybe<ForumReportCreateNestedManyWithoutUserInput>;
  id?: InputMaybe<Scalars['String']>;
  lastLogin?: InputMaybe<Scalars['Date']>;
  lastName: Scalars['String'];
  onboarded?: InputMaybe<Scalars['Boolean']>;
  parent?: InputMaybe<ParentCreateNestedOneWithoutUserInput>;
  role: Role;
  stripeCustomer?: InputMaybe<StripeCustomerCreateNestedOneWithoutUserInput>;
  student?: InputMaybe<StudentCreateNestedOneWithoutUserInput>;
  teacher?: InputMaybe<TeacherCreateNestedOneWithoutUserInput>;
  team: TeamCreateNestedOneWithoutUsersInput;
  updatedAt?: InputMaybe<Scalars['Date']>;
  userNotificationSettings?: InputMaybe<UserNotificationSettingCreateNestedManyWithoutUserInput>;
  userNotifications?: InputMaybe<UserNotificationCreateNestedManyWithoutUserInput>;
  verified?: InputMaybe<Scalars['Boolean']>;
};

export type UserCreateWithoutForumPostsInput = {
  UserForumReaction?: InputMaybe<UserForumReactionCreateNestedManyWithoutUserInput>;
  acquiredItems?: InputMaybe<AcquiredItemCreateNestedManyWithoutUserInput>;
  admin?: InputMaybe<AdminCreateNestedOneWithoutUserInput>;
  challengeComments?: InputMaybe<ChallengeCommentCreateNestedManyWithoutCommenterInput>;
  challengeLikes?: InputMaybe<ChallengeLikeCreateNestedManyWithoutLikerInput>;
  challengeReports?: InputMaybe<ChallengeReportCreateNestedManyWithoutReporterInput>;
  courseReviews?: InputMaybe<CourseReviewCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  firstName: Scalars['String'];
  forumPostBookmarks?: InputMaybe<ForumPostBookmarkCreateNestedManyWithoutUserInput>;
  forumReports?: InputMaybe<ForumReportCreateNestedManyWithoutUserInput>;
  id?: InputMaybe<Scalars['String']>;
  lastLogin?: InputMaybe<Scalars['Date']>;
  lastName: Scalars['String'];
  onboarded?: InputMaybe<Scalars['Boolean']>;
  parent?: InputMaybe<ParentCreateNestedOneWithoutUserInput>;
  role: Role;
  stripeCustomer?: InputMaybe<StripeCustomerCreateNestedOneWithoutUserInput>;
  student?: InputMaybe<StudentCreateNestedOneWithoutUserInput>;
  teacher?: InputMaybe<TeacherCreateNestedOneWithoutUserInput>;
  team: TeamCreateNestedOneWithoutUsersInput;
  updatedAt?: InputMaybe<Scalars['Date']>;
  userNotificationSettings?: InputMaybe<UserNotificationSettingCreateNestedManyWithoutUserInput>;
  userNotifications?: InputMaybe<UserNotificationCreateNestedManyWithoutUserInput>;
  verified?: InputMaybe<Scalars['Boolean']>;
};

export type UserCreateWithoutForumReportsInput = {
  UserForumReaction?: InputMaybe<UserForumReactionCreateNestedManyWithoutUserInput>;
  acquiredItems?: InputMaybe<AcquiredItemCreateNestedManyWithoutUserInput>;
  admin?: InputMaybe<AdminCreateNestedOneWithoutUserInput>;
  challengeComments?: InputMaybe<ChallengeCommentCreateNestedManyWithoutCommenterInput>;
  challengeLikes?: InputMaybe<ChallengeLikeCreateNestedManyWithoutLikerInput>;
  challengeReports?: InputMaybe<ChallengeReportCreateNestedManyWithoutReporterInput>;
  courseReviews?: InputMaybe<CourseReviewCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  firstName: Scalars['String'];
  forumPostBookmarks?: InputMaybe<ForumPostBookmarkCreateNestedManyWithoutUserInput>;
  forumPosts?: InputMaybe<ForumPostCreateNestedManyWithoutUserInput>;
  id?: InputMaybe<Scalars['String']>;
  lastLogin?: InputMaybe<Scalars['Date']>;
  lastName: Scalars['String'];
  onboarded?: InputMaybe<Scalars['Boolean']>;
  parent?: InputMaybe<ParentCreateNestedOneWithoutUserInput>;
  role: Role;
  stripeCustomer?: InputMaybe<StripeCustomerCreateNestedOneWithoutUserInput>;
  student?: InputMaybe<StudentCreateNestedOneWithoutUserInput>;
  teacher?: InputMaybe<TeacherCreateNestedOneWithoutUserInput>;
  team: TeamCreateNestedOneWithoutUsersInput;
  updatedAt?: InputMaybe<Scalars['Date']>;
  userNotificationSettings?: InputMaybe<UserNotificationSettingCreateNestedManyWithoutUserInput>;
  userNotifications?: InputMaybe<UserNotificationCreateNestedManyWithoutUserInput>;
  verified?: InputMaybe<Scalars['Boolean']>;
};

export type UserCreateWithoutParentInput = {
  UserForumReaction?: InputMaybe<UserForumReactionCreateNestedManyWithoutUserInput>;
  acquiredItems?: InputMaybe<AcquiredItemCreateNestedManyWithoutUserInput>;
  admin?: InputMaybe<AdminCreateNestedOneWithoutUserInput>;
  challengeComments?: InputMaybe<ChallengeCommentCreateNestedManyWithoutCommenterInput>;
  challengeLikes?: InputMaybe<ChallengeLikeCreateNestedManyWithoutLikerInput>;
  challengeReports?: InputMaybe<ChallengeReportCreateNestedManyWithoutReporterInput>;
  courseReviews?: InputMaybe<CourseReviewCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  firstName: Scalars['String'];
  forumPostBookmarks?: InputMaybe<ForumPostBookmarkCreateNestedManyWithoutUserInput>;
  forumPosts?: InputMaybe<ForumPostCreateNestedManyWithoutUserInput>;
  forumReports?: InputMaybe<ForumReportCreateNestedManyWithoutUserInput>;
  id?: InputMaybe<Scalars['String']>;
  lastLogin?: InputMaybe<Scalars['Date']>;
  lastName: Scalars['String'];
  onboarded?: InputMaybe<Scalars['Boolean']>;
  role: Role;
  stripeCustomer?: InputMaybe<StripeCustomerCreateNestedOneWithoutUserInput>;
  student?: InputMaybe<StudentCreateNestedOneWithoutUserInput>;
  teacher?: InputMaybe<TeacherCreateNestedOneWithoutUserInput>;
  team: TeamCreateNestedOneWithoutUsersInput;
  updatedAt?: InputMaybe<Scalars['Date']>;
  userNotificationSettings?: InputMaybe<UserNotificationSettingCreateNestedManyWithoutUserInput>;
  userNotifications?: InputMaybe<UserNotificationCreateNestedManyWithoutUserInput>;
  verified?: InputMaybe<Scalars['Boolean']>;
};

export type UserCreateWithoutStudentInput = {
  UserForumReaction?: InputMaybe<UserForumReactionCreateNestedManyWithoutUserInput>;
  acquiredItems?: InputMaybe<AcquiredItemCreateNestedManyWithoutUserInput>;
  admin?: InputMaybe<AdminCreateNestedOneWithoutUserInput>;
  challengeComments?: InputMaybe<ChallengeCommentCreateNestedManyWithoutCommenterInput>;
  challengeLikes?: InputMaybe<ChallengeLikeCreateNestedManyWithoutLikerInput>;
  challengeReports?: InputMaybe<ChallengeReportCreateNestedManyWithoutReporterInput>;
  courseReviews?: InputMaybe<CourseReviewCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  firstName: Scalars['String'];
  forumPostBookmarks?: InputMaybe<ForumPostBookmarkCreateNestedManyWithoutUserInput>;
  forumPosts?: InputMaybe<ForumPostCreateNestedManyWithoutUserInput>;
  forumReports?: InputMaybe<ForumReportCreateNestedManyWithoutUserInput>;
  id?: InputMaybe<Scalars['String']>;
  lastLogin?: InputMaybe<Scalars['Date']>;
  lastName: Scalars['String'];
  onboarded?: InputMaybe<Scalars['Boolean']>;
  parent?: InputMaybe<ParentCreateNestedOneWithoutUserInput>;
  role: Role;
  stripeCustomer?: InputMaybe<StripeCustomerCreateNestedOneWithoutUserInput>;
  teacher?: InputMaybe<TeacherCreateNestedOneWithoutUserInput>;
  team: TeamCreateNestedOneWithoutUsersInput;
  updatedAt?: InputMaybe<Scalars['Date']>;
  userNotificationSettings?: InputMaybe<UserNotificationSettingCreateNestedManyWithoutUserInput>;
  userNotifications?: InputMaybe<UserNotificationCreateNestedManyWithoutUserInput>;
  verified?: InputMaybe<Scalars['Boolean']>;
};

export type UserCreateWithoutTeacherInput = {
  UserForumReaction?: InputMaybe<UserForumReactionCreateNestedManyWithoutUserInput>;
  acquiredItems?: InputMaybe<AcquiredItemCreateNestedManyWithoutUserInput>;
  admin?: InputMaybe<AdminCreateNestedOneWithoutUserInput>;
  challengeComments?: InputMaybe<ChallengeCommentCreateNestedManyWithoutCommenterInput>;
  challengeLikes?: InputMaybe<ChallengeLikeCreateNestedManyWithoutLikerInput>;
  challengeReports?: InputMaybe<ChallengeReportCreateNestedManyWithoutReporterInput>;
  courseReviews?: InputMaybe<CourseReviewCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  firstName: Scalars['String'];
  forumPostBookmarks?: InputMaybe<ForumPostBookmarkCreateNestedManyWithoutUserInput>;
  forumPosts?: InputMaybe<ForumPostCreateNestedManyWithoutUserInput>;
  forumReports?: InputMaybe<ForumReportCreateNestedManyWithoutUserInput>;
  id?: InputMaybe<Scalars['String']>;
  lastLogin?: InputMaybe<Scalars['Date']>;
  lastName: Scalars['String'];
  onboarded?: InputMaybe<Scalars['Boolean']>;
  parent?: InputMaybe<ParentCreateNestedOneWithoutUserInput>;
  role: Role;
  stripeCustomer?: InputMaybe<StripeCustomerCreateNestedOneWithoutUserInput>;
  student?: InputMaybe<StudentCreateNestedOneWithoutUserInput>;
  team: TeamCreateNestedOneWithoutUsersInput;
  updatedAt?: InputMaybe<Scalars['Date']>;
  userNotificationSettings?: InputMaybe<UserNotificationSettingCreateNestedManyWithoutUserInput>;
  userNotifications?: InputMaybe<UserNotificationCreateNestedManyWithoutUserInput>;
  verified?: InputMaybe<Scalars['Boolean']>;
};

export type UserCreateWithoutUserForumReactionInput = {
  acquiredItems?: InputMaybe<AcquiredItemCreateNestedManyWithoutUserInput>;
  admin?: InputMaybe<AdminCreateNestedOneWithoutUserInput>;
  challengeComments?: InputMaybe<ChallengeCommentCreateNestedManyWithoutCommenterInput>;
  challengeLikes?: InputMaybe<ChallengeLikeCreateNestedManyWithoutLikerInput>;
  challengeReports?: InputMaybe<ChallengeReportCreateNestedManyWithoutReporterInput>;
  courseReviews?: InputMaybe<CourseReviewCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  firstName: Scalars['String'];
  forumPostBookmarks?: InputMaybe<ForumPostBookmarkCreateNestedManyWithoutUserInput>;
  forumPosts?: InputMaybe<ForumPostCreateNestedManyWithoutUserInput>;
  forumReports?: InputMaybe<ForumReportCreateNestedManyWithoutUserInput>;
  id?: InputMaybe<Scalars['String']>;
  lastLogin?: InputMaybe<Scalars['Date']>;
  lastName: Scalars['String'];
  onboarded?: InputMaybe<Scalars['Boolean']>;
  parent?: InputMaybe<ParentCreateNestedOneWithoutUserInput>;
  role: Role;
  stripeCustomer?: InputMaybe<StripeCustomerCreateNestedOneWithoutUserInput>;
  student?: InputMaybe<StudentCreateNestedOneWithoutUserInput>;
  teacher?: InputMaybe<TeacherCreateNestedOneWithoutUserInput>;
  team: TeamCreateNestedOneWithoutUsersInput;
  updatedAt?: InputMaybe<Scalars['Date']>;
  userNotificationSettings?: InputMaybe<UserNotificationSettingCreateNestedManyWithoutUserInput>;
  userNotifications?: InputMaybe<UserNotificationCreateNestedManyWithoutUserInput>;
  verified?: InputMaybe<Scalars['Boolean']>;
};

export type UserCreateWithoutUserNotificationsInput = {
  UserForumReaction?: InputMaybe<UserForumReactionCreateNestedManyWithoutUserInput>;
  acquiredItems?: InputMaybe<AcquiredItemCreateNestedManyWithoutUserInput>;
  admin?: InputMaybe<AdminCreateNestedOneWithoutUserInput>;
  challengeComments?: InputMaybe<ChallengeCommentCreateNestedManyWithoutCommenterInput>;
  challengeLikes?: InputMaybe<ChallengeLikeCreateNestedManyWithoutLikerInput>;
  challengeReports?: InputMaybe<ChallengeReportCreateNestedManyWithoutReporterInput>;
  courseReviews?: InputMaybe<CourseReviewCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['Date']>;
  firstName: Scalars['String'];
  forumPostBookmarks?: InputMaybe<ForumPostBookmarkCreateNestedManyWithoutUserInput>;
  forumPosts?: InputMaybe<ForumPostCreateNestedManyWithoutUserInput>;
  forumReports?: InputMaybe<ForumReportCreateNestedManyWithoutUserInput>;
  id?: InputMaybe<Scalars['String']>;
  lastLogin?: InputMaybe<Scalars['Date']>;
  lastName: Scalars['String'];
  onboarded?: InputMaybe<Scalars['Boolean']>;
  parent?: InputMaybe<ParentCreateNestedOneWithoutUserInput>;
  role: Role;
  stripeCustomer?: InputMaybe<StripeCustomerCreateNestedOneWithoutUserInput>;
  student?: InputMaybe<StudentCreateNestedOneWithoutUserInput>;
  teacher?: InputMaybe<TeacherCreateNestedOneWithoutUserInput>;
  team: TeamCreateNestedOneWithoutUsersInput;
  updatedAt?: InputMaybe<Scalars['Date']>;
  userNotificationSettings?: InputMaybe<UserNotificationSettingCreateNestedManyWithoutUserInput>;
  verified?: InputMaybe<Scalars['Boolean']>;
};

export type UserForumReaction = {
  __typename?: 'UserForumReaction';
  id: Scalars['ID'];
  post: ForumPost;
  postId: Scalars['String'];
  reaction: ForumReaction;
  reactionId: Scalars['String'];
  user: User;
  userId: Scalars['String'];
};

export type UserForumReactionCreateManyPostInput = {
  id?: InputMaybe<Scalars['String']>;
  reactionId: Scalars['String'];
  userId: Scalars['String'];
};

export type UserForumReactionCreateManyPostInputEnvelope = {
  data: Array<UserForumReactionCreateManyPostInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type UserForumReactionCreateManyReactionInput = {
  id?: InputMaybe<Scalars['String']>;
  postId: Scalars['String'];
  userId: Scalars['String'];
};

export type UserForumReactionCreateManyReactionInputEnvelope = {
  data: Array<UserForumReactionCreateManyReactionInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type UserForumReactionCreateManyUserInput = {
  id?: InputMaybe<Scalars['String']>;
  postId: Scalars['String'];
  reactionId: Scalars['String'];
};

export type UserForumReactionCreateManyUserInputEnvelope = {
  data: Array<UserForumReactionCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type UserForumReactionCreateNestedManyWithoutPostInput = {
  connect?: InputMaybe<Array<UserForumReactionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserForumReactionCreateOrConnectWithoutPostInput>>;
  create?: InputMaybe<Array<UserForumReactionCreateWithoutPostInput>>;
  createMany?: InputMaybe<UserForumReactionCreateManyPostInputEnvelope>;
};

export type UserForumReactionCreateNestedManyWithoutReactionInput = {
  connect?: InputMaybe<Array<UserForumReactionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserForumReactionCreateOrConnectWithoutReactionInput>>;
  create?: InputMaybe<Array<UserForumReactionCreateWithoutReactionInput>>;
  createMany?: InputMaybe<UserForumReactionCreateManyReactionInputEnvelope>;
};

export type UserForumReactionCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<UserForumReactionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserForumReactionCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<UserForumReactionCreateWithoutUserInput>>;
  createMany?: InputMaybe<UserForumReactionCreateManyUserInputEnvelope>;
};

export type UserForumReactionCreateOrConnectWithoutPostInput = {
  create: UserForumReactionCreateWithoutPostInput;
  where: UserForumReactionWhereUniqueInput;
};

export type UserForumReactionCreateOrConnectWithoutReactionInput = {
  create: UserForumReactionCreateWithoutReactionInput;
  where: UserForumReactionWhereUniqueInput;
};

export type UserForumReactionCreateOrConnectWithoutUserInput = {
  create: UserForumReactionCreateWithoutUserInput;
  where: UserForumReactionWhereUniqueInput;
};

export type UserForumReactionCreateWithoutPostInput = {
  id?: InputMaybe<Scalars['String']>;
  reaction: ForumReactionCreateNestedOneWithoutUserForumReactionInput;
  user: UserCreateNestedOneWithoutUserForumReactionInput;
};

export type UserForumReactionCreateWithoutReactionInput = {
  id?: InputMaybe<Scalars['String']>;
  post: ForumPostCreateNestedOneWithoutUserForumReactionInput;
  user: UserCreateNestedOneWithoutUserForumReactionInput;
};

export type UserForumReactionCreateWithoutUserInput = {
  id?: InputMaybe<Scalars['String']>;
  post: ForumPostCreateNestedOneWithoutUserForumReactionInput;
  reaction: ForumReactionCreateNestedOneWithoutUserForumReactionInput;
};

export type UserForumReactionListRelationFilter = {
  every?: InputMaybe<UserForumReactionWhereInput>;
  none?: InputMaybe<UserForumReactionWhereInput>;
  some?: InputMaybe<UserForumReactionWhereInput>;
};

export type UserForumReactionOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type UserForumReactionScalarWhereInput = {
  AND?: InputMaybe<Array<UserForumReactionScalarWhereInput>>;
  NOT?: InputMaybe<Array<UserForumReactionScalarWhereInput>>;
  OR?: InputMaybe<Array<UserForumReactionScalarWhereInput>>;
  id?: InputMaybe<StringFilter>;
  postId?: InputMaybe<StringFilter>;
  reactionId?: InputMaybe<StringFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type UserForumReactionUpdateManyMutationInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type UserForumReactionUpdateManyWithWhereWithoutPostInput = {
  data: UserForumReactionUpdateManyMutationInput;
  where: UserForumReactionScalarWhereInput;
};

export type UserForumReactionUpdateManyWithWhereWithoutReactionInput = {
  data: UserForumReactionUpdateManyMutationInput;
  where: UserForumReactionScalarWhereInput;
};

export type UserForumReactionUpdateManyWithWhereWithoutUserInput = {
  data: UserForumReactionUpdateManyMutationInput;
  where: UserForumReactionScalarWhereInput;
};

export type UserForumReactionUpdateManyWithoutPostInput = {
  connect?: InputMaybe<Array<UserForumReactionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserForumReactionCreateOrConnectWithoutPostInput>>;
  create?: InputMaybe<Array<UserForumReactionCreateWithoutPostInput>>;
  createMany?: InputMaybe<UserForumReactionCreateManyPostInputEnvelope>;
  delete?: InputMaybe<Array<UserForumReactionWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<UserForumReactionScalarWhereInput>>;
  disconnect?: InputMaybe<Array<UserForumReactionWhereUniqueInput>>;
  set?: InputMaybe<Array<UserForumReactionWhereUniqueInput>>;
  update?: InputMaybe<Array<UserForumReactionUpdateWithWhereUniqueWithoutPostInput>>;
  updateMany?: InputMaybe<Array<UserForumReactionUpdateManyWithWhereWithoutPostInput>>;
  upsert?: InputMaybe<Array<UserForumReactionUpsertWithWhereUniqueWithoutPostInput>>;
};

export type UserForumReactionUpdateManyWithoutReactionInput = {
  connect?: InputMaybe<Array<UserForumReactionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserForumReactionCreateOrConnectWithoutReactionInput>>;
  create?: InputMaybe<Array<UserForumReactionCreateWithoutReactionInput>>;
  createMany?: InputMaybe<UserForumReactionCreateManyReactionInputEnvelope>;
  delete?: InputMaybe<Array<UserForumReactionWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<UserForumReactionScalarWhereInput>>;
  disconnect?: InputMaybe<Array<UserForumReactionWhereUniqueInput>>;
  set?: InputMaybe<Array<UserForumReactionWhereUniqueInput>>;
  update?: InputMaybe<Array<UserForumReactionUpdateWithWhereUniqueWithoutReactionInput>>;
  updateMany?: InputMaybe<Array<UserForumReactionUpdateManyWithWhereWithoutReactionInput>>;
  upsert?: InputMaybe<Array<UserForumReactionUpsertWithWhereUniqueWithoutReactionInput>>;
};

export type UserForumReactionUpdateManyWithoutUserInput = {
  connect?: InputMaybe<Array<UserForumReactionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserForumReactionCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<UserForumReactionCreateWithoutUserInput>>;
  createMany?: InputMaybe<UserForumReactionCreateManyUserInputEnvelope>;
  delete?: InputMaybe<Array<UserForumReactionWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<UserForumReactionScalarWhereInput>>;
  disconnect?: InputMaybe<Array<UserForumReactionWhereUniqueInput>>;
  set?: InputMaybe<Array<UserForumReactionWhereUniqueInput>>;
  update?: InputMaybe<Array<UserForumReactionUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<UserForumReactionUpdateManyWithWhereWithoutUserInput>>;
  upsert?: InputMaybe<Array<UserForumReactionUpsertWithWhereUniqueWithoutUserInput>>;
};

export type UserForumReactionUpdateWithWhereUniqueWithoutPostInput = {
  data: UserForumReactionUpdateWithoutPostInput;
  where: UserForumReactionWhereUniqueInput;
};

export type UserForumReactionUpdateWithWhereUniqueWithoutReactionInput = {
  data: UserForumReactionUpdateWithoutReactionInput;
  where: UserForumReactionWhereUniqueInput;
};

export type UserForumReactionUpdateWithWhereUniqueWithoutUserInput = {
  data: UserForumReactionUpdateWithoutUserInput;
  where: UserForumReactionWhereUniqueInput;
};

export type UserForumReactionUpdateWithoutPostInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  reaction?: InputMaybe<ForumReactionUpdateOneRequiredWithoutUserForumReactionInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutUserForumReactionInput>;
};

export type UserForumReactionUpdateWithoutReactionInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  post?: InputMaybe<ForumPostUpdateOneRequiredWithoutUserForumReactionInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutUserForumReactionInput>;
};

export type UserForumReactionUpdateWithoutUserInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  post?: InputMaybe<ForumPostUpdateOneRequiredWithoutUserForumReactionInput>;
  reaction?: InputMaybe<ForumReactionUpdateOneRequiredWithoutUserForumReactionInput>;
};

export type UserForumReactionUpsertWithWhereUniqueWithoutPostInput = {
  create: UserForumReactionCreateWithoutPostInput;
  update: UserForumReactionUpdateWithoutPostInput;
  where: UserForumReactionWhereUniqueInput;
};

export type UserForumReactionUpsertWithWhereUniqueWithoutReactionInput = {
  create: UserForumReactionCreateWithoutReactionInput;
  update: UserForumReactionUpdateWithoutReactionInput;
  where: UserForumReactionWhereUniqueInput;
};

export type UserForumReactionUpsertWithWhereUniqueWithoutUserInput = {
  create: UserForumReactionCreateWithoutUserInput;
  update: UserForumReactionUpdateWithoutUserInput;
  where: UserForumReactionWhereUniqueInput;
};

export type UserForumReactionUserIdPostIdCompoundUniqueInput = {
  postId: Scalars['String'];
  userId: Scalars['String'];
};

export type UserForumReactionWhereInput = {
  AND?: InputMaybe<Array<UserForumReactionWhereInput>>;
  NOT?: InputMaybe<Array<UserForumReactionWhereInput>>;
  OR?: InputMaybe<Array<UserForumReactionWhereInput>>;
  id?: InputMaybe<StringFilter>;
  post?: InputMaybe<ForumPostRelationFilter>;
  postId?: InputMaybe<StringFilter>;
  reaction?: InputMaybe<ForumReactionRelationFilter>;
  reactionId?: InputMaybe<StringFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type UserForumReactionWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  userId_postId?: InputMaybe<UserForumReactionUserIdPostIdCompoundUniqueInput>;
};

export type UserListRelationFilter = {
  every?: InputMaybe<UserWhereInput>;
  none?: InputMaybe<UserWhereInput>;
  some?: InputMaybe<UserWhereInput>;
};

export type UserNotification = {
  __typename?: 'UserNotification';
  createdAt: Scalars['Date'];
  notification: Notification;
  notificationId: Scalars['String'];
  read: Scalars['Boolean'];
  user: User;
  userId: Scalars['String'];
};

export type UserNotificationCreateManyNotificationInput = {
  createdAt?: InputMaybe<Scalars['Date']>;
  read?: InputMaybe<Scalars['Boolean']>;
  userId: Scalars['String'];
};

export type UserNotificationCreateManyNotificationInputEnvelope = {
  data: Array<UserNotificationCreateManyNotificationInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type UserNotificationCreateManyUserInput = {
  createdAt?: InputMaybe<Scalars['Date']>;
  notificationId: Scalars['String'];
  read?: InputMaybe<Scalars['Boolean']>;
};

export type UserNotificationCreateManyUserInputEnvelope = {
  data: Array<UserNotificationCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type UserNotificationCreateNestedManyWithoutNotificationInput = {
  connect?: InputMaybe<Array<UserNotificationWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserNotificationCreateOrConnectWithoutNotificationInput>>;
  create?: InputMaybe<Array<UserNotificationCreateWithoutNotificationInput>>;
  createMany?: InputMaybe<UserNotificationCreateManyNotificationInputEnvelope>;
};

export type UserNotificationCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<UserNotificationWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserNotificationCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<UserNotificationCreateWithoutUserInput>>;
  createMany?: InputMaybe<UserNotificationCreateManyUserInputEnvelope>;
};

export type UserNotificationCreateOrConnectWithoutNotificationInput = {
  create: UserNotificationCreateWithoutNotificationInput;
  where: UserNotificationWhereUniqueInput;
};

export type UserNotificationCreateOrConnectWithoutUserInput = {
  create: UserNotificationCreateWithoutUserInput;
  where: UserNotificationWhereUniqueInput;
};

export type UserNotificationCreateWithoutNotificationInput = {
  createdAt?: InputMaybe<Scalars['Date']>;
  read?: InputMaybe<Scalars['Boolean']>;
  user: UserCreateNestedOneWithoutUserNotificationsInput;
};

export type UserNotificationCreateWithoutUserInput = {
  createdAt?: InputMaybe<Scalars['Date']>;
  notification: NotificationCreateNestedOneWithoutUserNotificationsInput;
  read?: InputMaybe<Scalars['Boolean']>;
};

export type UserNotificationListRelationFilter = {
  every?: InputMaybe<UserNotificationWhereInput>;
  none?: InputMaybe<UserNotificationWhereInput>;
  some?: InputMaybe<UserNotificationWhereInput>;
};

export type UserNotificationOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type UserNotificationScalarWhereInput = {
  AND?: InputMaybe<Array<UserNotificationScalarWhereInput>>;
  NOT?: InputMaybe<Array<UserNotificationScalarWhereInput>>;
  OR?: InputMaybe<Array<UserNotificationScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  notificationId?: InputMaybe<StringFilter>;
  read?: InputMaybe<BoolFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type UserNotificationSetting = {
  __typename?: 'UserNotificationSetting';
  allowed: Scalars['Boolean'];
  category: NotificationCategory;
  createdAt: Scalars['Date'];
  id: Scalars['String'];
  notificationType: NotificationSettingType;
  updatedAt: Scalars['Date'];
  user: User;
};

export type UserNotificationSettingCreateManyUserInput = {
  allowed?: InputMaybe<Scalars['Boolean']>;
  category: NotificationCategory;
  createdAt?: InputMaybe<Scalars['Date']>;
  notificationType: NotificationSettingType;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type UserNotificationSettingCreateManyUserInputEnvelope = {
  data: Array<UserNotificationSettingCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type UserNotificationSettingCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<UserNotificationSettingWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserNotificationSettingCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<UserNotificationSettingCreateWithoutUserInput>>;
  createMany?: InputMaybe<UserNotificationSettingCreateManyUserInputEnvelope>;
};

export type UserNotificationSettingCreateOrConnectWithoutUserInput = {
  create: UserNotificationSettingCreateWithoutUserInput;
  where: UserNotificationSettingWhereUniqueInput;
};

export type UserNotificationSettingCreateWithoutUserInput = {
  allowed?: InputMaybe<Scalars['Boolean']>;
  category: NotificationCategory;
  createdAt?: InputMaybe<Scalars['Date']>;
  notificationType: NotificationSettingType;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type UserNotificationSettingIdCategoryNotificationTypeCompoundUniqueInput = {
  category: NotificationCategory;
  id: Scalars['String'];
  notificationType: NotificationSettingType;
};

export type UserNotificationSettingListRelationFilter = {
  every?: InputMaybe<UserNotificationSettingWhereInput>;
  none?: InputMaybe<UserNotificationSettingWhereInput>;
  some?: InputMaybe<UserNotificationSettingWhereInput>;
};

export type UserNotificationSettingOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export enum UserNotificationSettingOrderByRelevanceFieldEnum {
  Id = 'id'
}

export type UserNotificationSettingOrderByRelevanceInput = {
  fields: Array<UserNotificationSettingOrderByRelevanceFieldEnum>;
  search: Scalars['String'];
  sort: SortOrder;
};

export type UserNotificationSettingOrderByWithRelationAndSearchRelevanceInput = {
  _relevance?: InputMaybe<UserNotificationSettingOrderByRelevanceInput>;
  allowed?: InputMaybe<SortOrder>;
  category?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  notificationType?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationAndSearchRelevanceInput>;
};

export enum UserNotificationSettingScalarFieldEnum {
  Allowed = 'allowed',
  Category = 'category',
  CreatedAt = 'createdAt',
  Id = 'id',
  NotificationType = 'notificationType',
  UpdatedAt = 'updatedAt'
}

export type UserNotificationSettingScalarWhereInput = {
  AND?: InputMaybe<Array<UserNotificationSettingScalarWhereInput>>;
  NOT?: InputMaybe<Array<UserNotificationSettingScalarWhereInput>>;
  OR?: InputMaybe<Array<UserNotificationSettingScalarWhereInput>>;
  allowed?: InputMaybe<BoolFilter>;
  category?: InputMaybe<EnumNotificationCategoryFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  notificationType?: InputMaybe<EnumNotificationSettingTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type UserNotificationSettingUpdateManyMutationInput = {
  allowed?: InputMaybe<BoolFieldUpdateOperationsInput>;
  category?: InputMaybe<EnumNotificationCategoryFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  notificationType?: InputMaybe<EnumNotificationSettingTypeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type UserNotificationSettingUpdateManyWithWhereWithoutUserInput = {
  data: UserNotificationSettingUpdateManyMutationInput;
  where: UserNotificationSettingScalarWhereInput;
};

export type UserNotificationSettingUpdateManyWithoutUserInput = {
  connect?: InputMaybe<Array<UserNotificationSettingWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserNotificationSettingCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<UserNotificationSettingCreateWithoutUserInput>>;
  createMany?: InputMaybe<UserNotificationSettingCreateManyUserInputEnvelope>;
  delete?: InputMaybe<Array<UserNotificationSettingWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<UserNotificationSettingScalarWhereInput>>;
  disconnect?: InputMaybe<Array<UserNotificationSettingWhereUniqueInput>>;
  set?: InputMaybe<Array<UserNotificationSettingWhereUniqueInput>>;
  update?: InputMaybe<Array<UserNotificationSettingUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<UserNotificationSettingUpdateManyWithWhereWithoutUserInput>>;
  upsert?: InputMaybe<Array<UserNotificationSettingUpsertWithWhereUniqueWithoutUserInput>>;
};

export type UserNotificationSettingUpdateWithWhereUniqueWithoutUserInput = {
  data: UserNotificationSettingUpdateWithoutUserInput;
  where: UserNotificationSettingWhereUniqueInput;
};

export type UserNotificationSettingUpdateWithoutUserInput = {
  allowed?: InputMaybe<BoolFieldUpdateOperationsInput>;
  category?: InputMaybe<EnumNotificationCategoryFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  notificationType?: InputMaybe<EnumNotificationSettingTypeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type UserNotificationSettingUpsertWithWhereUniqueWithoutUserInput = {
  create: UserNotificationSettingCreateWithoutUserInput;
  update: UserNotificationSettingUpdateWithoutUserInput;
  where: UserNotificationSettingWhereUniqueInput;
};

export type UserNotificationSettingWhereInput = {
  AND?: InputMaybe<Array<UserNotificationSettingWhereInput>>;
  NOT?: InputMaybe<Array<UserNotificationSettingWhereInput>>;
  OR?: InputMaybe<Array<UserNotificationSettingWhereInput>>;
  allowed?: InputMaybe<BoolFilter>;
  category?: InputMaybe<EnumNotificationCategoryFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  notificationType?: InputMaybe<EnumNotificationSettingTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
};

export type UserNotificationSettingWhereUniqueInput = {
  id_category_notificationType?: InputMaybe<UserNotificationSettingIdCategoryNotificationTypeCompoundUniqueInput>;
};

export type UserNotificationUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  read?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type UserNotificationUpdateManyWithWhereWithoutUserInput = {
  data: UserNotificationUpdateManyMutationInput;
  where: UserNotificationScalarWhereInput;
};

export type UserNotificationUpdateManyWithoutUserInput = {
  connect?: InputMaybe<Array<UserNotificationWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserNotificationCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<UserNotificationCreateWithoutUserInput>>;
  createMany?: InputMaybe<UserNotificationCreateManyUserInputEnvelope>;
  delete?: InputMaybe<Array<UserNotificationWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<UserNotificationScalarWhereInput>>;
  disconnect?: InputMaybe<Array<UserNotificationWhereUniqueInput>>;
  set?: InputMaybe<Array<UserNotificationWhereUniqueInput>>;
  update?: InputMaybe<Array<UserNotificationUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<UserNotificationUpdateManyWithWhereWithoutUserInput>>;
  upsert?: InputMaybe<Array<UserNotificationUpsertWithWhereUniqueWithoutUserInput>>;
};

export type UserNotificationUpdateWithWhereUniqueWithoutUserInput = {
  data: UserNotificationUpdateWithoutUserInput;
  where: UserNotificationWhereUniqueInput;
};

export type UserNotificationUpdateWithoutUserInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  notification?: InputMaybe<NotificationUpdateOneRequiredWithoutUserNotificationsInput>;
  read?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type UserNotificationUpsertWithWhereUniqueWithoutUserInput = {
  create: UserNotificationCreateWithoutUserInput;
  update: UserNotificationUpdateWithoutUserInput;
  where: UserNotificationWhereUniqueInput;
};

export type UserNotificationUserIdNotificationIdCompoundUniqueInput = {
  notificationId: Scalars['String'];
  userId: Scalars['String'];
};

export type UserNotificationWhereInput = {
  AND?: InputMaybe<Array<UserNotificationWhereInput>>;
  NOT?: InputMaybe<Array<UserNotificationWhereInput>>;
  OR?: InputMaybe<Array<UserNotificationWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  notification?: InputMaybe<NotificationRelationFilter>;
  notificationId?: InputMaybe<StringFilter>;
  read?: InputMaybe<BoolFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type UserNotificationWhereUniqueInput = {
  userId_notificationId?: InputMaybe<UserNotificationUserIdNotificationIdCompoundUniqueInput>;
};

export type UserOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export enum UserOrderByRelevanceFieldEnum {
  FirstName = 'firstName',
  Id = 'id',
  LastName = 'lastName',
  TeamId = 'teamId'
}

export type UserOrderByRelevanceInput = {
  fields: Array<UserOrderByRelevanceFieldEnum>;
  search: Scalars['String'];
  sort: SortOrder;
};

export type UserOrderByWithRelationAndSearchRelevanceInput = {
  UserForumReaction?: InputMaybe<UserForumReactionOrderByRelationAggregateInput>;
  _relevance?: InputMaybe<UserOrderByRelevanceInput>;
  acquiredItems?: InputMaybe<AcquiredItemOrderByRelationAggregateInput>;
  admin?: InputMaybe<AdminOrderByWithRelationAndSearchRelevanceInput>;
  challengeComments?: InputMaybe<ChallengeCommentOrderByRelationAggregateInput>;
  challengeLikes?: InputMaybe<ChallengeLikeOrderByRelationAggregateInput>;
  challengeReports?: InputMaybe<ChallengeReportOrderByRelationAggregateInput>;
  courseReviews?: InputMaybe<CourseReviewOrderByRelationAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  firstName?: InputMaybe<SortOrder>;
  forumPostBookmarks?: InputMaybe<ForumPostBookmarkOrderByRelationAggregateInput>;
  forumPosts?: InputMaybe<ForumPostOrderByRelationAggregateInput>;
  forumReports?: InputMaybe<ForumReportOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  lastLogin?: InputMaybe<SortOrder>;
  lastName?: InputMaybe<SortOrder>;
  onboarded?: InputMaybe<SortOrder>;
  parent?: InputMaybe<ParentOrderByWithRelationAndSearchRelevanceInput>;
  role?: InputMaybe<SortOrder>;
  stripeCustomer?: InputMaybe<StripeCustomerOrderByWithRelationAndSearchRelevanceInput>;
  student?: InputMaybe<StudentOrderByWithRelationAndSearchRelevanceInput>;
  teacher?: InputMaybe<TeacherOrderByWithRelationAndSearchRelevanceInput>;
  team?: InputMaybe<TeamOrderByWithRelationAndSearchRelevanceInput>;
  teamId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  userNotificationSettings?: InputMaybe<UserNotificationSettingOrderByRelationAggregateInput>;
  userNotifications?: InputMaybe<UserNotificationOrderByRelationAggregateInput>;
  verified?: InputMaybe<SortOrder>;
};

export type UserReactInput = {
  emoji: ReactionEmojies;
  isDelete?: InputMaybe<Scalars['Boolean']>;
  postId: Scalars['String'];
};

export type UserRelationFilter = {
  is?: InputMaybe<UserWhereInput>;
  isNot?: InputMaybe<UserWhereInput>;
};

export enum UserScalarFieldEnum {
  CreatedAt = 'createdAt',
  FirstName = 'firstName',
  Id = 'id',
  LastLogin = 'lastLogin',
  LastName = 'lastName',
  Onboarded = 'onboarded',
  Role = 'role',
  TeamId = 'teamId',
  UpdatedAt = 'updatedAt',
  Verified = 'verified'
}

export type UserUpdateInput = {
  UserForumReaction?: InputMaybe<UserForumReactionUpdateManyWithoutUserInput>;
  acquiredItems?: InputMaybe<AcquiredItemUpdateManyWithoutUserInput>;
  admin?: InputMaybe<AdminUpdateOneWithoutUserInput>;
  challengeComments?: InputMaybe<ChallengeCommentUpdateManyWithoutCommenterInput>;
  challengeLikes?: InputMaybe<ChallengeLikeUpdateManyWithoutLikerInput>;
  challengeReports?: InputMaybe<ChallengeReportUpdateManyWithoutReporterInput>;
  courseReviews?: InputMaybe<CourseReviewUpdateManyWithoutUserInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  firstName?: InputMaybe<StringFieldUpdateOperationsInput>;
  forumPostBookmarks?: InputMaybe<ForumPostBookmarkUpdateManyWithoutUserInput>;
  forumPosts?: InputMaybe<ForumPostUpdateManyWithoutUserInput>;
  forumReports?: InputMaybe<ForumReportUpdateManyWithoutUserInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  lastLogin?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  lastName?: InputMaybe<StringFieldUpdateOperationsInput>;
  onboarded?: InputMaybe<BoolFieldUpdateOperationsInput>;
  parent?: InputMaybe<ParentUpdateOneWithoutUserInput>;
  role?: InputMaybe<EnumRoleFieldUpdateOperationsInput>;
  stripeCustomer?: InputMaybe<StripeCustomerUpdateOneWithoutUserInput>;
  student?: InputMaybe<StudentUpdateOneWithoutUserInput>;
  teacher?: InputMaybe<TeacherUpdateOneWithoutUserInput>;
  team?: InputMaybe<TeamUpdateOneRequiredWithoutUsersInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  userNotificationSettings?: InputMaybe<UserNotificationSettingUpdateManyWithoutUserInput>;
  userNotifications?: InputMaybe<UserNotificationUpdateManyWithoutUserInput>;
  verified?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type UserUpdateOneRequiredWithoutAcquiredItemsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutAcquiredItemsInput>;
  create?: InputMaybe<UserCreateWithoutAcquiredItemsInput>;
  update?: InputMaybe<UserUpdateWithoutAcquiredItemsInput>;
  upsert?: InputMaybe<UserUpsertWithoutAcquiredItemsInput>;
};

export type UserUpdateOneRequiredWithoutChallengeCommentsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutChallengeCommentsInput>;
  create?: InputMaybe<UserCreateWithoutChallengeCommentsInput>;
  update?: InputMaybe<UserUpdateWithoutChallengeCommentsInput>;
  upsert?: InputMaybe<UserUpsertWithoutChallengeCommentsInput>;
};

export type UserUpdateOneRequiredWithoutChallengeLikesInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutChallengeLikesInput>;
  create?: InputMaybe<UserCreateWithoutChallengeLikesInput>;
  update?: InputMaybe<UserUpdateWithoutChallengeLikesInput>;
  upsert?: InputMaybe<UserUpsertWithoutChallengeLikesInput>;
};

export type UserUpdateOneRequiredWithoutChallengeReportsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutChallengeReportsInput>;
  create?: InputMaybe<UserCreateWithoutChallengeReportsInput>;
  update?: InputMaybe<UserUpdateWithoutChallengeReportsInput>;
  upsert?: InputMaybe<UserUpsertWithoutChallengeReportsInput>;
};

export type UserUpdateOneRequiredWithoutCourseReviewsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutCourseReviewsInput>;
  create?: InputMaybe<UserCreateWithoutCourseReviewsInput>;
  update?: InputMaybe<UserUpdateWithoutCourseReviewsInput>;
  upsert?: InputMaybe<UserUpsertWithoutCourseReviewsInput>;
};

export type UserUpdateOneRequiredWithoutForumPostBookmarksInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutForumPostBookmarksInput>;
  create?: InputMaybe<UserCreateWithoutForumPostBookmarksInput>;
  update?: InputMaybe<UserUpdateWithoutForumPostBookmarksInput>;
  upsert?: InputMaybe<UserUpsertWithoutForumPostBookmarksInput>;
};

export type UserUpdateOneRequiredWithoutForumPostsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutForumPostsInput>;
  create?: InputMaybe<UserCreateWithoutForumPostsInput>;
  update?: InputMaybe<UserUpdateWithoutForumPostsInput>;
  upsert?: InputMaybe<UserUpsertWithoutForumPostsInput>;
};

export type UserUpdateOneRequiredWithoutForumReportsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutForumReportsInput>;
  create?: InputMaybe<UserCreateWithoutForumReportsInput>;
  update?: InputMaybe<UserUpdateWithoutForumReportsInput>;
  upsert?: InputMaybe<UserUpsertWithoutForumReportsInput>;
};

export type UserUpdateOneRequiredWithoutParentInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutParentInput>;
  create?: InputMaybe<UserCreateWithoutParentInput>;
  update?: InputMaybe<UserUpdateWithoutParentInput>;
  upsert?: InputMaybe<UserUpsertWithoutParentInput>;
};

export type UserUpdateOneRequiredWithoutStudentInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutStudentInput>;
  create?: InputMaybe<UserCreateWithoutStudentInput>;
  update?: InputMaybe<UserUpdateWithoutStudentInput>;
  upsert?: InputMaybe<UserUpsertWithoutStudentInput>;
};

export type UserUpdateOneRequiredWithoutTeacherInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutTeacherInput>;
  create?: InputMaybe<UserCreateWithoutTeacherInput>;
  update?: InputMaybe<UserUpdateWithoutTeacherInput>;
  upsert?: InputMaybe<UserUpsertWithoutTeacherInput>;
};

export type UserUpdateOneRequiredWithoutUserForumReactionInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutUserForumReactionInput>;
  create?: InputMaybe<UserCreateWithoutUserForumReactionInput>;
  update?: InputMaybe<UserUpdateWithoutUserForumReactionInput>;
  upsert?: InputMaybe<UserUpsertWithoutUserForumReactionInput>;
};

export type UserUpdateWithoutAcquiredItemsInput = {
  UserForumReaction?: InputMaybe<UserForumReactionUpdateManyWithoutUserInput>;
  admin?: InputMaybe<AdminUpdateOneWithoutUserInput>;
  challengeComments?: InputMaybe<ChallengeCommentUpdateManyWithoutCommenterInput>;
  challengeLikes?: InputMaybe<ChallengeLikeUpdateManyWithoutLikerInput>;
  challengeReports?: InputMaybe<ChallengeReportUpdateManyWithoutReporterInput>;
  courseReviews?: InputMaybe<CourseReviewUpdateManyWithoutUserInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  firstName?: InputMaybe<StringFieldUpdateOperationsInput>;
  forumPostBookmarks?: InputMaybe<ForumPostBookmarkUpdateManyWithoutUserInput>;
  forumPosts?: InputMaybe<ForumPostUpdateManyWithoutUserInput>;
  forumReports?: InputMaybe<ForumReportUpdateManyWithoutUserInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  lastLogin?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  lastName?: InputMaybe<StringFieldUpdateOperationsInput>;
  onboarded?: InputMaybe<BoolFieldUpdateOperationsInput>;
  parent?: InputMaybe<ParentUpdateOneWithoutUserInput>;
  role?: InputMaybe<EnumRoleFieldUpdateOperationsInput>;
  stripeCustomer?: InputMaybe<StripeCustomerUpdateOneWithoutUserInput>;
  student?: InputMaybe<StudentUpdateOneWithoutUserInput>;
  teacher?: InputMaybe<TeacherUpdateOneWithoutUserInput>;
  team?: InputMaybe<TeamUpdateOneRequiredWithoutUsersInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  userNotificationSettings?: InputMaybe<UserNotificationSettingUpdateManyWithoutUserInput>;
  userNotifications?: InputMaybe<UserNotificationUpdateManyWithoutUserInput>;
  verified?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutChallengeCommentsInput = {
  UserForumReaction?: InputMaybe<UserForumReactionUpdateManyWithoutUserInput>;
  acquiredItems?: InputMaybe<AcquiredItemUpdateManyWithoutUserInput>;
  admin?: InputMaybe<AdminUpdateOneWithoutUserInput>;
  challengeLikes?: InputMaybe<ChallengeLikeUpdateManyWithoutLikerInput>;
  challengeReports?: InputMaybe<ChallengeReportUpdateManyWithoutReporterInput>;
  courseReviews?: InputMaybe<CourseReviewUpdateManyWithoutUserInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  firstName?: InputMaybe<StringFieldUpdateOperationsInput>;
  forumPostBookmarks?: InputMaybe<ForumPostBookmarkUpdateManyWithoutUserInput>;
  forumPosts?: InputMaybe<ForumPostUpdateManyWithoutUserInput>;
  forumReports?: InputMaybe<ForumReportUpdateManyWithoutUserInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  lastLogin?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  lastName?: InputMaybe<StringFieldUpdateOperationsInput>;
  onboarded?: InputMaybe<BoolFieldUpdateOperationsInput>;
  parent?: InputMaybe<ParentUpdateOneWithoutUserInput>;
  role?: InputMaybe<EnumRoleFieldUpdateOperationsInput>;
  stripeCustomer?: InputMaybe<StripeCustomerUpdateOneWithoutUserInput>;
  student?: InputMaybe<StudentUpdateOneWithoutUserInput>;
  teacher?: InputMaybe<TeacherUpdateOneWithoutUserInput>;
  team?: InputMaybe<TeamUpdateOneRequiredWithoutUsersInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  userNotificationSettings?: InputMaybe<UserNotificationSettingUpdateManyWithoutUserInput>;
  userNotifications?: InputMaybe<UserNotificationUpdateManyWithoutUserInput>;
  verified?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutChallengeLikesInput = {
  UserForumReaction?: InputMaybe<UserForumReactionUpdateManyWithoutUserInput>;
  acquiredItems?: InputMaybe<AcquiredItemUpdateManyWithoutUserInput>;
  admin?: InputMaybe<AdminUpdateOneWithoutUserInput>;
  challengeComments?: InputMaybe<ChallengeCommentUpdateManyWithoutCommenterInput>;
  challengeReports?: InputMaybe<ChallengeReportUpdateManyWithoutReporterInput>;
  courseReviews?: InputMaybe<CourseReviewUpdateManyWithoutUserInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  firstName?: InputMaybe<StringFieldUpdateOperationsInput>;
  forumPostBookmarks?: InputMaybe<ForumPostBookmarkUpdateManyWithoutUserInput>;
  forumPosts?: InputMaybe<ForumPostUpdateManyWithoutUserInput>;
  forumReports?: InputMaybe<ForumReportUpdateManyWithoutUserInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  lastLogin?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  lastName?: InputMaybe<StringFieldUpdateOperationsInput>;
  onboarded?: InputMaybe<BoolFieldUpdateOperationsInput>;
  parent?: InputMaybe<ParentUpdateOneWithoutUserInput>;
  role?: InputMaybe<EnumRoleFieldUpdateOperationsInput>;
  stripeCustomer?: InputMaybe<StripeCustomerUpdateOneWithoutUserInput>;
  student?: InputMaybe<StudentUpdateOneWithoutUserInput>;
  teacher?: InputMaybe<TeacherUpdateOneWithoutUserInput>;
  team?: InputMaybe<TeamUpdateOneRequiredWithoutUsersInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  userNotificationSettings?: InputMaybe<UserNotificationSettingUpdateManyWithoutUserInput>;
  userNotifications?: InputMaybe<UserNotificationUpdateManyWithoutUserInput>;
  verified?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutChallengeReportsInput = {
  UserForumReaction?: InputMaybe<UserForumReactionUpdateManyWithoutUserInput>;
  acquiredItems?: InputMaybe<AcquiredItemUpdateManyWithoutUserInput>;
  admin?: InputMaybe<AdminUpdateOneWithoutUserInput>;
  challengeComments?: InputMaybe<ChallengeCommentUpdateManyWithoutCommenterInput>;
  challengeLikes?: InputMaybe<ChallengeLikeUpdateManyWithoutLikerInput>;
  courseReviews?: InputMaybe<CourseReviewUpdateManyWithoutUserInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  firstName?: InputMaybe<StringFieldUpdateOperationsInput>;
  forumPostBookmarks?: InputMaybe<ForumPostBookmarkUpdateManyWithoutUserInput>;
  forumPosts?: InputMaybe<ForumPostUpdateManyWithoutUserInput>;
  forumReports?: InputMaybe<ForumReportUpdateManyWithoutUserInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  lastLogin?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  lastName?: InputMaybe<StringFieldUpdateOperationsInput>;
  onboarded?: InputMaybe<BoolFieldUpdateOperationsInput>;
  parent?: InputMaybe<ParentUpdateOneWithoutUserInput>;
  role?: InputMaybe<EnumRoleFieldUpdateOperationsInput>;
  stripeCustomer?: InputMaybe<StripeCustomerUpdateOneWithoutUserInput>;
  student?: InputMaybe<StudentUpdateOneWithoutUserInput>;
  teacher?: InputMaybe<TeacherUpdateOneWithoutUserInput>;
  team?: InputMaybe<TeamUpdateOneRequiredWithoutUsersInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  userNotificationSettings?: InputMaybe<UserNotificationSettingUpdateManyWithoutUserInput>;
  userNotifications?: InputMaybe<UserNotificationUpdateManyWithoutUserInput>;
  verified?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutCourseReviewsInput = {
  UserForumReaction?: InputMaybe<UserForumReactionUpdateManyWithoutUserInput>;
  acquiredItems?: InputMaybe<AcquiredItemUpdateManyWithoutUserInput>;
  admin?: InputMaybe<AdminUpdateOneWithoutUserInput>;
  challengeComments?: InputMaybe<ChallengeCommentUpdateManyWithoutCommenterInput>;
  challengeLikes?: InputMaybe<ChallengeLikeUpdateManyWithoutLikerInput>;
  challengeReports?: InputMaybe<ChallengeReportUpdateManyWithoutReporterInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  firstName?: InputMaybe<StringFieldUpdateOperationsInput>;
  forumPostBookmarks?: InputMaybe<ForumPostBookmarkUpdateManyWithoutUserInput>;
  forumPosts?: InputMaybe<ForumPostUpdateManyWithoutUserInput>;
  forumReports?: InputMaybe<ForumReportUpdateManyWithoutUserInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  lastLogin?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  lastName?: InputMaybe<StringFieldUpdateOperationsInput>;
  onboarded?: InputMaybe<BoolFieldUpdateOperationsInput>;
  parent?: InputMaybe<ParentUpdateOneWithoutUserInput>;
  role?: InputMaybe<EnumRoleFieldUpdateOperationsInput>;
  stripeCustomer?: InputMaybe<StripeCustomerUpdateOneWithoutUserInput>;
  student?: InputMaybe<StudentUpdateOneWithoutUserInput>;
  teacher?: InputMaybe<TeacherUpdateOneWithoutUserInput>;
  team?: InputMaybe<TeamUpdateOneRequiredWithoutUsersInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  userNotificationSettings?: InputMaybe<UserNotificationSettingUpdateManyWithoutUserInput>;
  userNotifications?: InputMaybe<UserNotificationUpdateManyWithoutUserInput>;
  verified?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutForumPostBookmarksInput = {
  UserForumReaction?: InputMaybe<UserForumReactionUpdateManyWithoutUserInput>;
  acquiredItems?: InputMaybe<AcquiredItemUpdateManyWithoutUserInput>;
  admin?: InputMaybe<AdminUpdateOneWithoutUserInput>;
  challengeComments?: InputMaybe<ChallengeCommentUpdateManyWithoutCommenterInput>;
  challengeLikes?: InputMaybe<ChallengeLikeUpdateManyWithoutLikerInput>;
  challengeReports?: InputMaybe<ChallengeReportUpdateManyWithoutReporterInput>;
  courseReviews?: InputMaybe<CourseReviewUpdateManyWithoutUserInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  firstName?: InputMaybe<StringFieldUpdateOperationsInput>;
  forumPosts?: InputMaybe<ForumPostUpdateManyWithoutUserInput>;
  forumReports?: InputMaybe<ForumReportUpdateManyWithoutUserInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  lastLogin?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  lastName?: InputMaybe<StringFieldUpdateOperationsInput>;
  onboarded?: InputMaybe<BoolFieldUpdateOperationsInput>;
  parent?: InputMaybe<ParentUpdateOneWithoutUserInput>;
  role?: InputMaybe<EnumRoleFieldUpdateOperationsInput>;
  stripeCustomer?: InputMaybe<StripeCustomerUpdateOneWithoutUserInput>;
  student?: InputMaybe<StudentUpdateOneWithoutUserInput>;
  teacher?: InputMaybe<TeacherUpdateOneWithoutUserInput>;
  team?: InputMaybe<TeamUpdateOneRequiredWithoutUsersInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  userNotificationSettings?: InputMaybe<UserNotificationSettingUpdateManyWithoutUserInput>;
  userNotifications?: InputMaybe<UserNotificationUpdateManyWithoutUserInput>;
  verified?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutForumPostsInput = {
  UserForumReaction?: InputMaybe<UserForumReactionUpdateManyWithoutUserInput>;
  acquiredItems?: InputMaybe<AcquiredItemUpdateManyWithoutUserInput>;
  admin?: InputMaybe<AdminUpdateOneWithoutUserInput>;
  challengeComments?: InputMaybe<ChallengeCommentUpdateManyWithoutCommenterInput>;
  challengeLikes?: InputMaybe<ChallengeLikeUpdateManyWithoutLikerInput>;
  challengeReports?: InputMaybe<ChallengeReportUpdateManyWithoutReporterInput>;
  courseReviews?: InputMaybe<CourseReviewUpdateManyWithoutUserInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  firstName?: InputMaybe<StringFieldUpdateOperationsInput>;
  forumPostBookmarks?: InputMaybe<ForumPostBookmarkUpdateManyWithoutUserInput>;
  forumReports?: InputMaybe<ForumReportUpdateManyWithoutUserInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  lastLogin?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  lastName?: InputMaybe<StringFieldUpdateOperationsInput>;
  onboarded?: InputMaybe<BoolFieldUpdateOperationsInput>;
  parent?: InputMaybe<ParentUpdateOneWithoutUserInput>;
  role?: InputMaybe<EnumRoleFieldUpdateOperationsInput>;
  stripeCustomer?: InputMaybe<StripeCustomerUpdateOneWithoutUserInput>;
  student?: InputMaybe<StudentUpdateOneWithoutUserInput>;
  teacher?: InputMaybe<TeacherUpdateOneWithoutUserInput>;
  team?: InputMaybe<TeamUpdateOneRequiredWithoutUsersInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  userNotificationSettings?: InputMaybe<UserNotificationSettingUpdateManyWithoutUserInput>;
  userNotifications?: InputMaybe<UserNotificationUpdateManyWithoutUserInput>;
  verified?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutForumReportsInput = {
  UserForumReaction?: InputMaybe<UserForumReactionUpdateManyWithoutUserInput>;
  acquiredItems?: InputMaybe<AcquiredItemUpdateManyWithoutUserInput>;
  admin?: InputMaybe<AdminUpdateOneWithoutUserInput>;
  challengeComments?: InputMaybe<ChallengeCommentUpdateManyWithoutCommenterInput>;
  challengeLikes?: InputMaybe<ChallengeLikeUpdateManyWithoutLikerInput>;
  challengeReports?: InputMaybe<ChallengeReportUpdateManyWithoutReporterInput>;
  courseReviews?: InputMaybe<CourseReviewUpdateManyWithoutUserInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  firstName?: InputMaybe<StringFieldUpdateOperationsInput>;
  forumPostBookmarks?: InputMaybe<ForumPostBookmarkUpdateManyWithoutUserInput>;
  forumPosts?: InputMaybe<ForumPostUpdateManyWithoutUserInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  lastLogin?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  lastName?: InputMaybe<StringFieldUpdateOperationsInput>;
  onboarded?: InputMaybe<BoolFieldUpdateOperationsInput>;
  parent?: InputMaybe<ParentUpdateOneWithoutUserInput>;
  role?: InputMaybe<EnumRoleFieldUpdateOperationsInput>;
  stripeCustomer?: InputMaybe<StripeCustomerUpdateOneWithoutUserInput>;
  student?: InputMaybe<StudentUpdateOneWithoutUserInput>;
  teacher?: InputMaybe<TeacherUpdateOneWithoutUserInput>;
  team?: InputMaybe<TeamUpdateOneRequiredWithoutUsersInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  userNotificationSettings?: InputMaybe<UserNotificationSettingUpdateManyWithoutUserInput>;
  userNotifications?: InputMaybe<UserNotificationUpdateManyWithoutUserInput>;
  verified?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutParentInput = {
  UserForumReaction?: InputMaybe<UserForumReactionUpdateManyWithoutUserInput>;
  acquiredItems?: InputMaybe<AcquiredItemUpdateManyWithoutUserInput>;
  admin?: InputMaybe<AdminUpdateOneWithoutUserInput>;
  challengeComments?: InputMaybe<ChallengeCommentUpdateManyWithoutCommenterInput>;
  challengeLikes?: InputMaybe<ChallengeLikeUpdateManyWithoutLikerInput>;
  challengeReports?: InputMaybe<ChallengeReportUpdateManyWithoutReporterInput>;
  courseReviews?: InputMaybe<CourseReviewUpdateManyWithoutUserInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  firstName?: InputMaybe<StringFieldUpdateOperationsInput>;
  forumPostBookmarks?: InputMaybe<ForumPostBookmarkUpdateManyWithoutUserInput>;
  forumPosts?: InputMaybe<ForumPostUpdateManyWithoutUserInput>;
  forumReports?: InputMaybe<ForumReportUpdateManyWithoutUserInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  lastLogin?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  lastName?: InputMaybe<StringFieldUpdateOperationsInput>;
  onboarded?: InputMaybe<BoolFieldUpdateOperationsInput>;
  role?: InputMaybe<EnumRoleFieldUpdateOperationsInput>;
  stripeCustomer?: InputMaybe<StripeCustomerUpdateOneWithoutUserInput>;
  student?: InputMaybe<StudentUpdateOneWithoutUserInput>;
  teacher?: InputMaybe<TeacherUpdateOneWithoutUserInput>;
  team?: InputMaybe<TeamUpdateOneRequiredWithoutUsersInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  userNotificationSettings?: InputMaybe<UserNotificationSettingUpdateManyWithoutUserInput>;
  userNotifications?: InputMaybe<UserNotificationUpdateManyWithoutUserInput>;
  verified?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutStudentInput = {
  UserForumReaction?: InputMaybe<UserForumReactionUpdateManyWithoutUserInput>;
  acquiredItems?: InputMaybe<AcquiredItemUpdateManyWithoutUserInput>;
  admin?: InputMaybe<AdminUpdateOneWithoutUserInput>;
  challengeComments?: InputMaybe<ChallengeCommentUpdateManyWithoutCommenterInput>;
  challengeLikes?: InputMaybe<ChallengeLikeUpdateManyWithoutLikerInput>;
  challengeReports?: InputMaybe<ChallengeReportUpdateManyWithoutReporterInput>;
  courseReviews?: InputMaybe<CourseReviewUpdateManyWithoutUserInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  firstName?: InputMaybe<StringFieldUpdateOperationsInput>;
  forumPostBookmarks?: InputMaybe<ForumPostBookmarkUpdateManyWithoutUserInput>;
  forumPosts?: InputMaybe<ForumPostUpdateManyWithoutUserInput>;
  forumReports?: InputMaybe<ForumReportUpdateManyWithoutUserInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  lastLogin?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  lastName?: InputMaybe<StringFieldUpdateOperationsInput>;
  onboarded?: InputMaybe<BoolFieldUpdateOperationsInput>;
  parent?: InputMaybe<ParentUpdateOneWithoutUserInput>;
  role?: InputMaybe<EnumRoleFieldUpdateOperationsInput>;
  stripeCustomer?: InputMaybe<StripeCustomerUpdateOneWithoutUserInput>;
  teacher?: InputMaybe<TeacherUpdateOneWithoutUserInput>;
  team?: InputMaybe<TeamUpdateOneRequiredWithoutUsersInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  userNotificationSettings?: InputMaybe<UserNotificationSettingUpdateManyWithoutUserInput>;
  userNotifications?: InputMaybe<UserNotificationUpdateManyWithoutUserInput>;
  verified?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutTeacherInput = {
  UserForumReaction?: InputMaybe<UserForumReactionUpdateManyWithoutUserInput>;
  acquiredItems?: InputMaybe<AcquiredItemUpdateManyWithoutUserInput>;
  admin?: InputMaybe<AdminUpdateOneWithoutUserInput>;
  challengeComments?: InputMaybe<ChallengeCommentUpdateManyWithoutCommenterInput>;
  challengeLikes?: InputMaybe<ChallengeLikeUpdateManyWithoutLikerInput>;
  challengeReports?: InputMaybe<ChallengeReportUpdateManyWithoutReporterInput>;
  courseReviews?: InputMaybe<CourseReviewUpdateManyWithoutUserInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  firstName?: InputMaybe<StringFieldUpdateOperationsInput>;
  forumPostBookmarks?: InputMaybe<ForumPostBookmarkUpdateManyWithoutUserInput>;
  forumPosts?: InputMaybe<ForumPostUpdateManyWithoutUserInput>;
  forumReports?: InputMaybe<ForumReportUpdateManyWithoutUserInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  lastLogin?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  lastName?: InputMaybe<StringFieldUpdateOperationsInput>;
  onboarded?: InputMaybe<BoolFieldUpdateOperationsInput>;
  parent?: InputMaybe<ParentUpdateOneWithoutUserInput>;
  role?: InputMaybe<EnumRoleFieldUpdateOperationsInput>;
  stripeCustomer?: InputMaybe<StripeCustomerUpdateOneWithoutUserInput>;
  student?: InputMaybe<StudentUpdateOneWithoutUserInput>;
  team?: InputMaybe<TeamUpdateOneRequiredWithoutUsersInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  userNotificationSettings?: InputMaybe<UserNotificationSettingUpdateManyWithoutUserInput>;
  userNotifications?: InputMaybe<UserNotificationUpdateManyWithoutUserInput>;
  verified?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutUserForumReactionInput = {
  acquiredItems?: InputMaybe<AcquiredItemUpdateManyWithoutUserInput>;
  admin?: InputMaybe<AdminUpdateOneWithoutUserInput>;
  challengeComments?: InputMaybe<ChallengeCommentUpdateManyWithoutCommenterInput>;
  challengeLikes?: InputMaybe<ChallengeLikeUpdateManyWithoutLikerInput>;
  challengeReports?: InputMaybe<ChallengeReportUpdateManyWithoutReporterInput>;
  courseReviews?: InputMaybe<CourseReviewUpdateManyWithoutUserInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  firstName?: InputMaybe<StringFieldUpdateOperationsInput>;
  forumPostBookmarks?: InputMaybe<ForumPostBookmarkUpdateManyWithoutUserInput>;
  forumPosts?: InputMaybe<ForumPostUpdateManyWithoutUserInput>;
  forumReports?: InputMaybe<ForumReportUpdateManyWithoutUserInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  lastLogin?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  lastName?: InputMaybe<StringFieldUpdateOperationsInput>;
  onboarded?: InputMaybe<BoolFieldUpdateOperationsInput>;
  parent?: InputMaybe<ParentUpdateOneWithoutUserInput>;
  role?: InputMaybe<EnumRoleFieldUpdateOperationsInput>;
  stripeCustomer?: InputMaybe<StripeCustomerUpdateOneWithoutUserInput>;
  student?: InputMaybe<StudentUpdateOneWithoutUserInput>;
  teacher?: InputMaybe<TeacherUpdateOneWithoutUserInput>;
  team?: InputMaybe<TeamUpdateOneRequiredWithoutUsersInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  userNotificationSettings?: InputMaybe<UserNotificationSettingUpdateManyWithoutUserInput>;
  userNotifications?: InputMaybe<UserNotificationUpdateManyWithoutUserInput>;
  verified?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type UserUpsertWithoutAcquiredItemsInput = {
  create: UserCreateWithoutAcquiredItemsInput;
  update: UserUpdateWithoutAcquiredItemsInput;
};

export type UserUpsertWithoutChallengeCommentsInput = {
  create: UserCreateWithoutChallengeCommentsInput;
  update: UserUpdateWithoutChallengeCommentsInput;
};

export type UserUpsertWithoutChallengeLikesInput = {
  create: UserCreateWithoutChallengeLikesInput;
  update: UserUpdateWithoutChallengeLikesInput;
};

export type UserUpsertWithoutChallengeReportsInput = {
  create: UserCreateWithoutChallengeReportsInput;
  update: UserUpdateWithoutChallengeReportsInput;
};

export type UserUpsertWithoutCourseReviewsInput = {
  create: UserCreateWithoutCourseReviewsInput;
  update: UserUpdateWithoutCourseReviewsInput;
};

export type UserUpsertWithoutForumPostBookmarksInput = {
  create: UserCreateWithoutForumPostBookmarksInput;
  update: UserUpdateWithoutForumPostBookmarksInput;
};

export type UserUpsertWithoutForumPostsInput = {
  create: UserCreateWithoutForumPostsInput;
  update: UserUpdateWithoutForumPostsInput;
};

export type UserUpsertWithoutForumReportsInput = {
  create: UserCreateWithoutForumReportsInput;
  update: UserUpdateWithoutForumReportsInput;
};

export type UserUpsertWithoutParentInput = {
  create: UserCreateWithoutParentInput;
  update: UserUpdateWithoutParentInput;
};

export type UserUpsertWithoutStudentInput = {
  create: UserCreateWithoutStudentInput;
  update: UserUpdateWithoutStudentInput;
};

export type UserUpsertWithoutTeacherInput = {
  create: UserCreateWithoutTeacherInput;
  update: UserUpdateWithoutTeacherInput;
};

export type UserUpsertWithoutUserForumReactionInput = {
  create: UserCreateWithoutUserForumReactionInput;
  update: UserUpdateWithoutUserForumReactionInput;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  UserForumReaction?: InputMaybe<UserForumReactionListRelationFilter>;
  acquiredItems?: InputMaybe<AcquiredItemListRelationFilter>;
  admin?: InputMaybe<AdminRelationFilter>;
  challengeComments?: InputMaybe<ChallengeCommentListRelationFilter>;
  challengeLikes?: InputMaybe<ChallengeLikeListRelationFilter>;
  challengeReports?: InputMaybe<ChallengeReportListRelationFilter>;
  courseReviews?: InputMaybe<CourseReviewListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  firstName?: InputMaybe<StringFilter>;
  forumPostBookmarks?: InputMaybe<ForumPostBookmarkListRelationFilter>;
  forumPosts?: InputMaybe<ForumPostListRelationFilter>;
  forumReports?: InputMaybe<ForumReportListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  lastLogin?: InputMaybe<DateTimeNullableFilter>;
  lastName?: InputMaybe<StringFilter>;
  onboarded?: InputMaybe<BoolFilter>;
  parent?: InputMaybe<ParentRelationFilter>;
  role?: InputMaybe<EnumRoleFilter>;
  stripeCustomer?: InputMaybe<StripeCustomerRelationFilter>;
  student?: InputMaybe<StudentRelationFilter>;
  teacher?: InputMaybe<TeacherRelationFilter>;
  team?: InputMaybe<TeamRelationFilter>;
  teamId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userNotificationSettings?: InputMaybe<UserNotificationSettingListRelationFilter>;
  userNotifications?: InputMaybe<UserNotificationListRelationFilter>;
  verified?: InputMaybe<BoolFilter>;
};

export type UserWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type WhereEnrolledCourse = {
  id: Scalars['String'];
};

export type CourseDataFragment = { __typename?: 'Course', id: string, title: string, description: string, duration: number, level: Level, state: State, published: boolean, category?: { __typename?: 'Category', id: string, name: string } | null | undefined, thumbnail?: { __typename?: 'Asset', id: string, url: string } | null | undefined, teacher: { __typename?: 'Teacher', user: { __typename?: 'User', firstName: string, lastName: string } }, checkpoints?: Array<{ __typename?: 'Checkpoint', parentCheckpointId?: string | null | undefined, id: string, order: number, title: string, type: TopicType, description?: string | null | undefined, courseId?: string | null | undefined, parentCheckPoint?: { __typename?: 'Checkpoint', id: string, title: string, parentCheckPoint?: { __typename?: 'Checkpoint', id: string, title: string } | null | undefined } | null | undefined, subCheckpoints?: Array<{ __typename?: 'Checkpoint', parentCheckpointId?: string | null | undefined, id: string, order: number, title: string, type: TopicType, description?: string | null | undefined, courseId?: string | null | undefined, parentCheckPoint?: { __typename?: 'Checkpoint', id: string, title: string, courseId?: string | null | undefined } | null | undefined, subCheckpoints?: Array<{ __typename?: 'Checkpoint', id: string, title: string }> | null | undefined, image?: { __typename?: 'Asset', id: string, name: string, url: string } | null | undefined, _count: { __typename?: 'CheckpointCount', subCheckpoints: number } }> | null | undefined, image?: { __typename?: 'Asset', id: string, name: string, url: string } | null | undefined, _count: { __typename?: 'CheckpointCount', subCheckpoints: number } }> | null | undefined };

export type BasicCheckpointDataFragment = { __typename?: 'Checkpoint', id: string, order: number, title: string, type: TopicType, description?: string | null | undefined, courseId?: string | null | undefined, image?: { __typename?: 'Asset', id: string, name: string, url: string } | null | undefined, _count: { __typename?: 'CheckpointCount', subCheckpoints: number } };

export type CheckpointDataFragment = { __typename?: 'Checkpoint', parentCheckpointId?: string | null | undefined, id: string, order: number, title: string, type: TopicType, description?: string | null | undefined, courseId?: string | null | undefined, parentCheckPoint?: { __typename?: 'Checkpoint', id: string, title: string, parentCheckPoint?: { __typename?: 'Checkpoint', id: string, title: string } | null | undefined } | null | undefined, subCheckpoints?: Array<{ __typename?: 'Checkpoint', parentCheckpointId?: string | null | undefined, id: string, order: number, title: string, type: TopicType, description?: string | null | undefined, courseId?: string | null | undefined, parentCheckPoint?: { __typename?: 'Checkpoint', id: string, title: string, courseId?: string | null | undefined } | null | undefined, subCheckpoints?: Array<{ __typename?: 'Checkpoint', id: string, title: string }> | null | undefined, image?: { __typename?: 'Asset', id: string, name: string, url: string } | null | undefined, _count: { __typename?: 'CheckpointCount', subCheckpoints: number } }> | null | undefined, image?: { __typename?: 'Asset', id: string, name: string, url: string } | null | undefined, _count: { __typename?: 'CheckpointCount', subCheckpoints: number } };

export type BlockDataFragment = { __typename?: 'Checkpoint', blocks?: Array<{ __typename?: 'Block', id: string, blockType: BlockType, order: number, textBlock?: { __typename?: 'TextBlock', id: string, text?: string | null | undefined } | null | undefined, attachmentBlock?: { __typename?: 'AttachmentBlock', id: string, assetId?: string | null | undefined, asset?: { __typename?: 'Asset', id: string, fileType: FileType, url: string, name: string } | null | undefined } | null | undefined, mediaBlock?: { __typename?: 'MediaBlock', id: string, assetId?: string | null | undefined, asset?: { __typename?: 'Asset', id: string, fileType: FileType, url: string, name: string } | null | undefined } | null | undefined, questionBlock?: { __typename?: 'QuestionBlock', id: string, title?: string | null | undefined, quizType: QuizType, answerType: AnswerType, answerQuantityType: AnswerQuantityType, pairs?: Array<{ __typename?: 'MatchingPair', id: string, pair?: Array<string> | null | undefined }> | null | undefined, selections?: Array<{ __typename?: 'QuestionSelection', id: string, isCorrect: boolean, text?: string | null | undefined, asset?: { __typename?: 'Asset', id: string, fileType: FileType, url: string, name: string } | null | undefined }> | null | undefined, asset?: { __typename?: 'Asset', id: string, fileType: FileType, url: string, name: string } | null | undefined } | null | undefined }> | null | undefined };

export type AssetDataFragment = { __typename?: 'Asset', id: string, fileType: FileType, url: string, name: string };

export type UserFieldFragment = { __typename?: 'User', id: string, role: Role, createdAt: any, firstName: string, lastName: string, lastLogin?: any | null | undefined, verified: boolean, team: { __typename?: 'Team', name: string } };

export type ParentFieldFragment = { __typename?: 'Parent', status: ParentStatus, email: string };

export type TeacherFieldFragment = { __typename?: 'Teacher', email: string, gender?: Gender | null | undefined, introduction?: string | null | undefined, nationality?: string | null | undefined, phoneNumber?: string | null | undefined, profilePicture?: string | null | undefined, addressId?: string | null | undefined, jobTitle?: string | null | undefined, photo?: { __typename?: 'Asset', url: string } | null | undefined };

export type StudentFieldFragment = { __typename?: 'Student', username: string, loginPattern: string, bio?: string | null | undefined, email?: string | null | undefined, parentId: string };

export type CheckpointFieldFragment = { __typename?: 'Checkpoint', courseId?: string | null | undefined, createdAt: any, deleted?: any | null | undefined, description?: string | null | undefined, duration: number, enabled: boolean, id: string, imageId?: string | null | undefined, order: number, parentCheckpointId?: string | null | undefined, title: string, type: TopicType, updatedAt: any };

export type CourseFieldFragment = { __typename?: 'Course', id: string, title: string, published: boolean, state: State, createdAt: any, updatedAt: any, thumbnail?: { __typename?: 'Asset', url: string } | null | undefined, teacher: { __typename?: 'Teacher', id: string, photo?: { __typename?: 'Asset', url: string } | null | undefined, user: { __typename?: 'User', firstName: string, lastName: string, teamId: string, role: Role } } };

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'Auth', accessToken: string, refreshToken: string } };

export type LoginStudentMutationVariables = Exact<{
  data: LoginStudentInput;
}>;


export type LoginStudentMutation = { __typename?: 'Mutation', loginStudent: { __typename?: 'Auth', accessToken: string, refreshToken: string } };

export type SignupMutationVariables = Exact<{
  data: SignupInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'Auth', accessToken: string, refreshToken: string, user: { __typename?: 'User', id: string, firstName: string, lastName: string } } };

export type AddChildMutationVariables = Exact<{
  data: CreateChildInput;
}>;


export type AddChildMutation = { __typename?: 'Mutation', addChild: { __typename?: 'Student', user: { __typename?: 'User', firstName: string, lastName: string, role: Role } } };

export type ForgotPasswordMutationVariables = Exact<{
  data: ResetSendEmailInput;
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: { __typename?: 'Response', message: string } };

export type ResetPasswordMutationVariables = Exact<{
  data: ResetPasswordInput;
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename?: 'User', role: Role } };

export type AdminLoginAsMutationVariables = Exact<{
  data: AdminLoginAsInput;
}>;


export type AdminLoginAsMutation = { __typename?: 'Mutation', adminLoginAs: { __typename?: 'Token', accessToken: string } };

export type CreateAvatarAssetCatalogMutationVariables = Exact<{
  data: AvatarAssetCatelogCreateInput;
}>;


export type CreateAvatarAssetCatalogMutation = { __typename?: 'Mutation', createAvatarAssetCatalog: { __typename?: 'AvatarAssetCatelog', id: string, label: string, imgUrl: string, type: AvatarAssetCatelogType } };

export type UpdateAvatarAssetCatalogMutationVariables = Exact<{
  data: AvatarAssetCatelogUpdateInput;
  where: AvatarAssetCatelogWhereUniqueInput;
}>;


export type UpdateAvatarAssetCatalogMutation = { __typename?: 'Mutation', updateAvatarAssetCatalog: { __typename?: 'AvatarAssetCatelog', id: string, label: string, imgUrl: string, type: AvatarAssetCatelogType } };

export type DeleteAvatarAssetCatalogMutationVariables = Exact<{
  where: AvatarAssetCatelogWhereUniqueInput;
}>;


export type DeleteAvatarAssetCatalogMutation = { __typename?: 'Mutation', deleteAvatarAssetCatalog: { __typename?: 'AvatarAssetCatelog', id: string, label: string, type: AvatarAssetCatelogType } };

export type UploadAvatarAssetMutationVariables = Exact<{
  assetType: AvatarAssetCatelogTypes;
  file: Scalars['Upload'];
}>;


export type UploadAvatarAssetMutation = { __typename?: 'Mutation', uploadAvatarAsset: string };

export type DeleteNormalAvatarAssetMutationVariables = Exact<{
  where: NormalAvatarAssetWhereUniqueInput;
}>;


export type DeleteNormalAvatarAssetMutation = { __typename?: 'Mutation', deleteNormalAvatarAsset: { __typename?: 'NormalAvatarAsset', id: string, imgUrl: string, label: string } };

export type DeleteHairAvatarAssetMutationVariables = Exact<{
  where: HairAvatarAssetWhereUniqueInput;
}>;


export type DeleteHairAvatarAssetMutation = { __typename?: 'Mutation', deleteHairAvatarAsset: { __typename?: 'HairAvatarAsset', id: string, imgUrl: string, label: string } };

export type DeleteSkinAvatarAssetMutationVariables = Exact<{
  where: SkinAvatarAssetWhereUniqueInput;
}>;


export type DeleteSkinAvatarAssetMutation = { __typename?: 'Mutation', deleteSkinAvatarAsset: { __typename?: 'SkinAvatarAsset', id: string, imgUrl: string, label: string } };

export type EditNormalAvatarAssetMutationVariables = Exact<{
  data: NormalAvatarAssetUpdateInput;
  where: NormalAvatarAssetWhereUniqueInput;
}>;


export type EditNormalAvatarAssetMutation = { __typename?: 'Mutation', updateNormalAvatarAsset: { __typename?: 'NormalAvatarAsset', id: string, imgUrl: string, label: string } };

export type EditSkinAvatarAssetMutationVariables = Exact<{
  data: SkinAvatarAssetUpdateInput;
  where: SkinAvatarAssetWhereUniqueInput;
}>;


export type EditSkinAvatarAssetMutation = { __typename?: 'Mutation', updateSkinAvatarAsset: { __typename?: 'SkinAvatarAsset', id: string, imgUrl: string, label: string } };

export type EditHairAvatarAssetMutationVariables = Exact<{
  data: HairAvatarAssetUpdateInput;
  where: HairAvatarAssetWhereUniqueInput;
}>;


export type EditHairAvatarAssetMutation = { __typename?: 'Mutation', updateHairAvatarAsset: { __typename?: 'HairAvatarAsset', id: string, imgUrl: string, label: string } };

export type DeleteChallengeCommentMutationVariables = Exact<{
  commentId: Scalars['String'];
}>;


export type DeleteChallengeCommentMutation = { __typename?: 'Mutation', deleteChallengeComment: string };

export type UpdateCourseMutationVariables = Exact<{
  data: UpdateCourseInput;
  id: Scalars['String'];
}>;


export type UpdateCourseMutation = { __typename?: 'Mutation', updateCourse: { __typename?: 'Course', id: string, title: string, published: boolean, state: State, createdAt: any, updatedAt: any, thumbnail?: { __typename?: 'Asset', url: string } | null | undefined, teacher: { __typename?: 'Teacher', id: string, photo?: { __typename?: 'Asset', url: string } | null | undefined, user: { __typename?: 'User', firstName: string, lastName: string, teamId: string, role: Role } } } };

export type UploadCourseAssetMutationVariables = Exact<{
  courseAssetType: CourseAssetType;
  file: Scalars['Upload'];
}>;


export type UploadCourseAssetMutation = { __typename?: 'Mutation', uploadCourseAsset: { __typename?: 'Asset', id: string, name: string, url: string } };

export type AdminDeleteCourseMutationVariables = Exact<{
  where: CourseWhereUniqueInput;
}>;


export type AdminDeleteCourseMutation = { __typename?: 'Mutation', adminDeleteCourse: { __typename?: 'Course', id: string, title: string } };

export type CreatePostMutationVariables = Exact<{
  parentPostId?: InputMaybe<Scalars['String']>;
  categoryId: Scalars['String'];
  text: Scalars['String'];
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createOnePost: { __typename?: 'ForumPost', id: string, text: string } };

export type DeletePostMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deleteOnePost: { __typename?: 'ForumPost', id: string, userId: string, text: string, parentPostId?: string | null | undefined } };

export type UpdatePostMutationVariables = Exact<{
  data: UpdatePostInput;
  id: Scalars['String'];
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updateOnePost: { __typename?: 'ForumPost', id: string, userId: string, text: string } };

export type AdminUpdateChildMutationVariables = Exact<{
  data: AdminUpdateChildDetailsInput;
  id: Scalars['String'];
}>;


export type AdminUpdateChildMutation = { __typename?: 'Mutation', adminUpdateChild: { __typename?: 'Student', id: string, user: { __typename?: 'User', firstName: string, lastName: string } } };

export type RemoveChildMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type RemoveChildMutation = { __typename?: 'Mutation', removeChild: { __typename?: 'Student', id: string } };

export type ChangeParentPasswordMutationVariables = Exact<{
  data: ChangePasswordInput;
}>;


export type ChangeParentPasswordMutation = { __typename?: 'Mutation', changeParentPassword: { __typename?: 'Parent', id: string } };

export type ChangeTeacherPasswordMutationVariables = Exact<{
  data: ChangePasswordInput;
}>;


export type ChangeTeacherPasswordMutation = { __typename?: 'Mutation', changeTeacherPassword: { __typename?: 'Teacher', id: string } };

export type UpdateTeacherMutationVariables = Exact<{
  data: UpdateTeacherDetailsInput;
}>;


export type UpdateTeacherMutation = { __typename?: 'Mutation', updateTeacherDetails: { __typename?: 'Teacher', id: string } };

export type AdminUpdateUserMutationVariables = Exact<{
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
}>;


export type AdminUpdateUserMutation = { __typename?: 'Mutation', adminUpdateUser: { __typename?: 'User', id: string, role: Role, createdAt: any, firstName: string, lastName: string, lastLogin?: any | null | undefined, verified: boolean, team: { __typename?: 'Team', name: string } } };

export type DeleteUserMutationVariables = Exact<{
  where: UserWhereUniqueInput;
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: { __typename?: 'User', id: string, role: Role, createdAt: any, firstName: string, lastName: string, lastLogin?: any | null | undefined, verified: boolean, team: { __typename?: 'Team', name: string } } };

export type CreateUserMutationVariables = Exact<{
  data: UserCreateInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, role: Role, createdAt: any, firstName: string, lastName: string, lastLogin?: any | null | undefined, verified: boolean, team: { __typename?: 'Team', name: string } } };

export type AdminUploadTeacherProfileMutationVariables = Exact<{
  file: Scalars['Upload'];
  id: Scalars['String'];
}>;


export type AdminUploadTeacherProfileMutation = { __typename?: 'Mutation', adminUploadTeacherProfile: { __typename?: 'Teacher', email: string, gender?: Gender | null | undefined, introduction?: string | null | undefined, nationality?: string | null | undefined, phoneNumber?: string | null | undefined, profilePicture?: string | null | undefined, addressId?: string | null | undefined, jobTitle?: string | null | undefined, photo?: { __typename?: 'Asset', url: string } | null | undefined } };

export type AdminChangePasswordMutationVariables = Exact<{
  data: AdminChangePasswordInput;
}>;


export type AdminChangePasswordMutation = { __typename?: 'Mutation', adminChangePassword: { __typename?: 'User', id: string, role: Role, createdAt: any, firstName: string, lastName: string, lastLogin?: any | null | undefined, verified: boolean, team: { __typename?: 'Team', name: string } } };

export type AdminAddChildMutationVariables = Exact<{
  data: CreateChildInput;
  parentEmail: Scalars['String'];
}>;


export type AdminAddChildMutation = { __typename?: 'Mutation', adminAddChild: { __typename?: 'Student', id: string, user: { __typename?: 'User', firstName: string, lastName: string } } };

export type FindManyAvatarAssetCatalogQueryVariables = Exact<{
  cursor?: InputMaybe<AvatarAssetCatelogWhereUniqueInput>;
  distinct?: InputMaybe<Array<AvatarAssetCatelogScalarFieldEnum> | AvatarAssetCatelogScalarFieldEnum>;
  orderBy?: InputMaybe<Array<AvatarAssetCatelogOrderByWithRelationAndSearchRelevanceInput> | AvatarAssetCatelogOrderByWithRelationAndSearchRelevanceInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AvatarAssetCatelogWhereInput>;
}>;


export type FindManyAvatarAssetCatalogQuery = { __typename?: 'Query', findManyAvatarAssetCatalog: Array<{ __typename?: 'AvatarAssetCatelog', id: string, label: string, imgUrl: string, type: AvatarAssetCatelogType, createdAt: any, updatedAt: any, isActive: boolean, avatarAssetCategory: { __typename?: 'AvatarAssetCategory', label: string, id: string } }> };

export type FindManyAvatarAssetCategoryQueryVariables = Exact<{
  cursor?: InputMaybe<AvatarAssetCategoryWhereUniqueInput>;
  distinct?: InputMaybe<Array<AvatarAssetCategoryScalarFieldEnum> | AvatarAssetCategoryScalarFieldEnum>;
  orderBy?: InputMaybe<Array<AvatarAssetCategoryOrderByWithRelationAndSearchRelevanceInput> | AvatarAssetCategoryOrderByWithRelationAndSearchRelevanceInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AvatarAssetCategoryWhereInput>;
}>;


export type FindManyAvatarAssetCategoryQuery = { __typename?: 'Query', findManyAvatarAssetCategory: Array<{ __typename?: 'AvatarAssetCategory', id: string, label: string, subCategories?: Array<{ __typename?: 'AvatarAssetCategory', id: string, label: string }> | null | undefined }> };

export type FindUniqueAvatarAssetCategoryQueryVariables = Exact<{
  cursor?: InputMaybe<AvatarAssetCategoryWhereUniqueInput>;
  distinct?: InputMaybe<Array<AvatarAssetCategoryScalarFieldEnum> | AvatarAssetCategoryScalarFieldEnum>;
  orderBy?: InputMaybe<Array<AvatarAssetCategoryOrderByWithRelationAndSearchRelevanceInput> | AvatarAssetCategoryOrderByWithRelationAndSearchRelevanceInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AvatarAssetCategoryWhereInput>;
}>;


export type FindUniqueAvatarAssetCategoryQuery = { __typename?: 'Query', findOneAvatarAssetCategory: { __typename?: 'AvatarAssetCategory', id: string, label: string, subCategories?: Array<{ __typename?: 'AvatarAssetCategory', id: string, label: string }> | null | undefined } };

export type FindUniqueAvatarAssetCatalogQueryVariables = Exact<{
  cursor?: InputMaybe<AvatarAssetCatelogWhereUniqueInput>;
  distinct?: InputMaybe<Array<AvatarAssetCatelogScalarFieldEnum> | AvatarAssetCatelogScalarFieldEnum>;
  orderBy?: InputMaybe<Array<AvatarAssetCatelogOrderByWithRelationAndSearchRelevanceInput> | AvatarAssetCatelogOrderByWithRelationAndSearchRelevanceInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AvatarAssetCatelogWhereInput>;
}>;


export type FindUniqueAvatarAssetCatalogQuery = { __typename?: 'Query', findOneAvatarAssetCatalog: { __typename?: 'AvatarAssetCatelog', id: string, label: string, imgUrl: string, type: AvatarAssetCatelogType, isActive: boolean, createdAt: any, updatedAt: any, avatarAssetCategory: { __typename?: 'AvatarAssetCategory', id: string, label: string, type: ItemCatalogType, parentCategory?: { __typename?: 'AvatarAssetCategory', id: string, label: string } | null | undefined, subCategories?: Array<{ __typename?: 'AvatarAssetCategory', id: string, label: string }> | null | undefined }, normalAvatarAsset?: Array<{ __typename?: 'NormalAvatarAsset', avatarAssetCatelogId?: string | null | undefined, id: string, imgUrl: string, label: string, isOuterMost: boolean, createdAt: any, updatedAt: any }> | null | undefined, skinAvatarAsset?: Array<{ __typename?: 'SkinAvatarAsset', avatarAssetCatelogId?: string | null | undefined, id: string, imgUrl: string, label: string, skinColourId: string, isHalfBody: boolean, createdAt: any, updatedAt: any }> | null | undefined, hairAvatarAsset?: Array<{ __typename?: 'HairAvatarAsset', avatarAssetCatelogId: string, hairColourId: string, id: string, imgUrl: string, label: string, hairType: HairType, createdAt: any, updatedAt: any }> | null | undefined } };

export type AvatarAssetCatalogCountQueryVariables = Exact<{
  cursor?: InputMaybe<AvatarAssetCatelogWhereUniqueInput>;
  distinct?: InputMaybe<Array<AvatarAssetCatelogScalarFieldEnum> | AvatarAssetCatelogScalarFieldEnum>;
  orderBy?: InputMaybe<Array<AvatarAssetCatelogOrderByWithRelationAndSearchRelevanceInput> | AvatarAssetCatelogOrderByWithRelationAndSearchRelevanceInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AvatarAssetCatelogWhereInput>;
}>;


export type AvatarAssetCatalogCountQuery = { __typename?: 'Query', avatarAssetCatalogCount: number };

export type AllCatalogOptionsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AvatarAssetCategoryWhereInput>;
}>;


export type AllCatalogOptionsQuery = { __typename?: 'Query', getCatalog: { __typename?: 'AvatarAssetCatalogDto', categoryCatelog: Array<{ __typename?: 'AvatarAssetCategory', type: ItemCatalogType, id: string, label: string, parentCategory?: { __typename?: 'AvatarAssetCategory', label: string } | null | undefined, subCategories?: Array<{ __typename?: 'AvatarAssetCategory', label: string }> | null | undefined, avatarAssetCatelog?: Array<{ __typename?: 'AvatarAssetCatelog', type: AvatarAssetCatelogType, imgUrl: string, label: string, id: string, normalAvatarAsset?: Array<{ __typename?: 'NormalAvatarAsset', imgUrl: string, label: string }> | null | undefined, hairAvatarAsset?: Array<{ __typename?: 'HairAvatarAsset', imgUrl: string, label: string, hairColour: { __typename?: 'AvatarAssetColour', label: string } }> | null | undefined }> | null | undefined }> } };

export type FindOneNormalAvatarAssetQueryVariables = Exact<{
  cursor?: InputMaybe<NormalAvatarAssetWhereUniqueInput>;
  distinct?: InputMaybe<Array<NormalAvatarAssetScalarFieldEnum> | NormalAvatarAssetScalarFieldEnum>;
  orderBy?: InputMaybe<Array<NormalAvatarAssetOrderByWithRelationAndSearchRelevanceInput> | NormalAvatarAssetOrderByWithRelationAndSearchRelevanceInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<NormalAvatarAssetWhereInput>;
}>;


export type FindOneNormalAvatarAssetQuery = { __typename?: 'Query', findOneNormalAvatarAsset: { __typename?: 'NormalAvatarAsset', avatarAssetCatelogId?: string | null | undefined, id: string, imgUrl: string, label: string, isOuterMost: boolean, createdAt: any, updatedAt: any } };

export type FindOneSkinAvatarAssetQueryVariables = Exact<{
  cursor?: InputMaybe<SkinAvatarAssetWhereUniqueInput>;
  distinct?: InputMaybe<Array<SkinAvatarAssetScalarFieldEnum> | SkinAvatarAssetScalarFieldEnum>;
  orderBy?: InputMaybe<Array<SkinAvatarAssetOrderByWithRelationAndSearchRelevanceInput> | SkinAvatarAssetOrderByWithRelationAndSearchRelevanceInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SkinAvatarAssetWhereInput>;
}>;


export type FindOneSkinAvatarAssetQuery = { __typename?: 'Query', findOneSkinAvatarAsset: { __typename?: 'SkinAvatarAsset', avatarAssetCatelogId?: string | null | undefined, id: string, imgUrl: string, label: string, skinColourId: string, isHalfBody: boolean, createdAt: any, updatedAt: any } };

export type FindOneHairAvatarAssetQueryVariables = Exact<{
  cursor?: InputMaybe<HairAvatarAssetWhereUniqueInput>;
  distinct?: InputMaybe<Array<HairAvatarAssetScalarFieldEnum> | HairAvatarAssetScalarFieldEnum>;
  orderBy?: InputMaybe<Array<HairAvatarAssetOrderByWithRelationAndSearchRelevanceInput> | HairAvatarAssetOrderByWithRelationAndSearchRelevanceInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<HairAvatarAssetWhereInput>;
}>;


export type FindOneHairAvatarAssetQuery = { __typename?: 'Query', findOneHairAvatarAsset: { __typename?: 'HairAvatarAsset', avatarAssetCatelogId: string, hairColourId: string, id: string, imgUrl: string, label: string, hairType: HairType, createdAt: any, updatedAt: any } };

export type AvatarAssetColourFragment = { __typename?: 'AvatarAssetColour', assetType: AvatarAssetColourType, colourImgUrl: string, id: string, label: string };

export type HairAvatarAssetFragment = { __typename?: 'HairAvatarAsset', avatarAssetCatelogId: string, hairColourId: string, id: string, imgUrl: string, label: string, hairType: HairType, createdAt: any, updatedAt: any };

export type SkinAvatarAssetFragment = { __typename?: 'SkinAvatarAsset', avatarAssetCatelogId?: string | null | undefined, id: string, imgUrl: string, label: string, skinColourId: string, isHalfBody: boolean, createdAt: any, updatedAt: any };

export type NormalAvatarAssetFragment = { __typename?: 'NormalAvatarAsset', avatarAssetCatelogId?: string | null | undefined, id: string, imgUrl: string, label: string, isOuterMost: boolean, createdAt: any, updatedAt: any };

export type NewUserAvatarFragment = { __typename?: 'NewUserAvatarDto', body?: { __typename?: 'SkinAvatarAsset', avatarAssetCatelogId?: string | null | undefined, id: string, imgUrl: string, label: string, skinColourId: string, isHalfBody: boolean, createdAt: any, updatedAt: any } | null | undefined, ears?: { __typename?: 'SkinAvatarAsset', avatarAssetCatelogId?: string | null | undefined, id: string, imgUrl: string, label: string, skinColourId: string, isHalfBody: boolean, createdAt: any, updatedAt: any } | null | undefined, head?: { __typename?: 'SkinAvatarAsset', avatarAssetCatelogId?: string | null | undefined, id: string, imgUrl: string, label: string, skinColourId: string, isHalfBody: boolean, createdAt: any, updatedAt: any } | null | undefined, horns?: { __typename?: 'SkinAvatarAsset', avatarAssetCatelogId?: string | null | undefined, id: string, imgUrl: string, label: string, skinColourId: string, isHalfBody: boolean, createdAt: any, updatedAt: any } | null | undefined, bottom?: { __typename?: 'NormalAvatarAsset', avatarAssetCatelogId?: string | null | undefined, id: string, imgUrl: string, label: string, isOuterMost: boolean, createdAt: any, updatedAt: any } | null | undefined, cheeks?: { __typename?: 'NormalAvatarAsset', avatarAssetCatelogId?: string | null | undefined, id: string, imgUrl: string, label: string, isOuterMost: boolean, createdAt: any, updatedAt: any } | null | undefined, eyes?: { __typename?: 'NormalAvatarAsset', avatarAssetCatelogId?: string | null | undefined, id: string, imgUrl: string, label: string, isOuterMost: boolean, createdAt: any, updatedAt: any } | null | undefined, eyesAccessory?: { __typename?: 'NormalAvatarAsset', avatarAssetCatelogId?: string | null | undefined, id: string, imgUrl: string, label: string, isOuterMost: boolean, createdAt: any, updatedAt: any } | null | undefined, headAccessory?: { __typename?: 'NormalAvatarAsset', avatarAssetCatelogId?: string | null | undefined, id: string, imgUrl: string, label: string, isOuterMost: boolean, createdAt: any, updatedAt: any } | null | undefined, mouth?: { __typename?: 'NormalAvatarAsset', avatarAssetCatelogId?: string | null | undefined, id: string, imgUrl: string, label: string, isOuterMost: boolean, createdAt: any, updatedAt: any } | null | undefined, nose: { __typename?: 'NormalAvatarAsset', avatarAssetCatelogId?: string | null | undefined, id: string, imgUrl: string, label: string, isOuterMost: boolean, createdAt: any, updatedAt: any }, pet?: { __typename?: 'NormalAvatarAsset', avatarAssetCatelogId?: string | null | undefined, id: string, imgUrl: string, label: string, isOuterMost: boolean, createdAt: any, updatedAt: any } | null | undefined, hairBack?: { __typename?: 'HairAvatarAsset', avatarAssetCatelogId: string, hairColourId: string, id: string, imgUrl: string, label: string, hairType: HairType, createdAt: any, updatedAt: any } | null | undefined, hairBangs?: { __typename?: 'HairAvatarAsset', avatarAssetCatelogId: string, hairColourId: string, id: string, imgUrl: string, label: string, hairType: HairType, createdAt: any, updatedAt: any } | null | undefined, shoes?: { __typename?: 'NormalAvatarAsset', avatarAssetCatelogId?: string | null | undefined, id: string, imgUrl: string, label: string, isOuterMost: boolean, createdAt: any, updatedAt: any } | null | undefined, hairColour?: { __typename?: 'AvatarAssetColour', assetType: AvatarAssetColourType, colourImgUrl: string, id: string, label: string } | null | undefined, skinColour?: { __typename?: 'AvatarAssetColour', assetType: AvatarAssetColourType, colourImgUrl: string, id: string, label: string } | null | undefined, itemAccessory?: { __typename?: 'NormalAvatarAsset', avatarAssetCatelogId?: string | null | undefined, id: string, imgUrl: string, label: string, isOuterMost: boolean, createdAt: any, updatedAt: any } | null | undefined, faceAccessory?: { __typename?: 'NormalAvatarAsset', avatarAssetCatelogId?: string | null | undefined, id: string, imgUrl: string, label: string, isOuterMost: boolean, createdAt: any, updatedAt: any } | null | undefined, topAccessory?: { __typename?: 'NormalAvatarAsset', avatarAssetCatelogId?: string | null | undefined, id: string, imgUrl: string, label: string, isOuterMost: boolean, createdAt: any, updatedAt: any } | null | undefined, jacket?: { __typename?: 'NormalAvatarAsset', avatarAssetCatelogId?: string | null | undefined, id: string, imgUrl: string, label: string, isOuterMost: boolean, createdAt: any, updatedAt: any } | null | undefined, shirt?: { __typename?: 'NormalAvatarAsset', avatarAssetCatelogId?: string | null | undefined, id: string, imgUrl: string, label: string, isOuterMost: boolean, createdAt: any, updatedAt: any } | null | undefined, shadow: { __typename?: 'NormalAvatarAsset', avatarAssetCatelogId?: string | null | undefined, id: string, imgUrl: string, label: string, isOuterMost: boolean, createdAt: any, updatedAt: any } };

export type FindManyChallengesQueryVariables = Exact<{
  cursor?: InputMaybe<ChallengeWhereUniqueInput>;
  distinct?: InputMaybe<Array<ChallengeScalarFieldEnum> | ChallengeScalarFieldEnum>;
  orderBy?: InputMaybe<Array<ChallengeOrderByWithRelationAndSearchRelevanceInput> | ChallengeOrderByWithRelationAndSearchRelevanceInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ChallengeWhereInput>;
}>;


export type FindManyChallengesQuery = { __typename?: 'Query', challenges: Array<{ __typename?: 'Challenge', id: string, createdAt: any, asset: { __typename?: 'Asset', url: string }, challengeBlock: { __typename?: 'ChallengeBlock', block?: { __typename?: 'Block', checkpoint: { __typename?: 'Checkpoint', title: string, course?: { __typename?: 'Course', title: string } | null | undefined } } | null | undefined }, creator: { __typename?: 'Student', id: string, user: { __typename?: 'User', firstName: string } } }> };

export type FindOneChallengeQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type FindOneChallengeQuery = { __typename?: 'Query', challenge: { __typename?: 'Challenge', id: string, createdAt: any, asset: { __typename?: 'Asset', name: string, url: string }, challengeBlock: { __typename?: 'ChallengeBlock', block?: { __typename?: 'Block', checkpoint: { __typename?: 'Checkpoint', title: string, course?: { __typename?: 'Course', title: string } | null | undefined } } | null | undefined }, creator: { __typename?: 'Student', id: string, avatarImage?: { __typename?: 'Asset', url: string } | null | undefined, user: { __typename?: 'User', firstName: string, lastName: string, createdAt: any } } } };

export type AdminCountChallengeQueryVariables = Exact<{
  cursor?: InputMaybe<ChallengeWhereUniqueInput>;
  distinct?: InputMaybe<Array<ChallengeScalarFieldEnum> | ChallengeScalarFieldEnum>;
  orderBy?: InputMaybe<Array<ChallengeOrderByWithRelationAndSearchRelevanceInput> | ChallengeOrderByWithRelationAndSearchRelevanceInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ChallengeWhereInput>;
}>;


export type AdminCountChallengeQuery = { __typename?: 'Query', adminCountChallenge: number };

export type FindChallengeCommentsQueryVariables = Exact<{
  cursor?: InputMaybe<ChallengeCommentWhereUniqueInput>;
  distinct?: InputMaybe<Array<ChallengeCommentScalarFieldEnum> | ChallengeCommentScalarFieldEnum>;
  orderBy?: InputMaybe<Array<ChallengeCommentOrderByWithRelationAndSearchRelevanceInput> | ChallengeCommentOrderByWithRelationAndSearchRelevanceInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ChallengeCommentWhereInput>;
}>;


export type FindChallengeCommentsQuery = { __typename?: 'Query', challengeComments: Array<{ __typename?: 'ChallengeComment', id: string, text: string, commenterId: string, createdAt: any, commenter: { __typename?: 'User', firstName: string, lastName: string, student?: { __typename?: 'Student', avatarImage?: { __typename?: 'Asset', url: string } | null | undefined } | null | undefined } }> };

export type FindManyCheckpointsQueryVariables = Exact<{
  cursor?: InputMaybe<CheckpointWhereUniqueInput>;
  distinct?: InputMaybe<Array<CheckpointScalarFieldEnum> | CheckpointScalarFieldEnum>;
  orderBy?: InputMaybe<Array<CheckpointOrderByWithRelationAndSearchRelevanceInput> | CheckpointOrderByWithRelationAndSearchRelevanceInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CheckpointWhereInput>;
}>;


export type FindManyCheckpointsQuery = { __typename?: 'Query', checkpoints: Array<{ __typename?: 'Checkpoint', courseId?: string | null | undefined, createdAt: any, deleted?: any | null | undefined, description?: string | null | undefined, duration: number, enabled: boolean, id: string, imageId?: string | null | undefined, order: number, parentCheckpointId?: string | null | undefined, title: string, type: TopicType, updatedAt: any }> };

export type FindManyCoursesQueryVariables = Exact<{
  cursor?: InputMaybe<CourseWhereUniqueInput>;
  distinct?: InputMaybe<Array<CourseScalarFieldEnum> | CourseScalarFieldEnum>;
  orderBy?: InputMaybe<Array<CourseOrderByWithRelationAndSearchRelevanceInput> | CourseOrderByWithRelationAndSearchRelevanceInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CourseWhereInput>;
}>;


export type FindManyCoursesQuery = { __typename?: 'Query', courses: Array<{ __typename?: 'Course', id: string, title: string, published: boolean, state: State, createdAt: any, updatedAt: any, thumbnail?: { __typename?: 'Asset', url: string } | null | undefined, teacher: { __typename?: 'Teacher', id: string, photo?: { __typename?: 'Asset', url: string } | null | undefined, user: { __typename?: 'User', firstName: string, lastName: string, teamId: string, role: Role } } }> };

export type AdminCountCourseQueryVariables = Exact<{
  cursor?: InputMaybe<CourseWhereUniqueInput>;
  distinct?: InputMaybe<Array<CourseScalarFieldEnum> | CourseScalarFieldEnum>;
  orderBy?: InputMaybe<Array<CourseOrderByWithRelationAndSearchRelevanceInput> | CourseOrderByWithRelationAndSearchRelevanceInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CourseWhereInput>;
}>;


export type AdminCountCourseQuery = { __typename?: 'Query', adminCountCourse: number };

export type FindUniqueCourseQueryVariables = Exact<{
  where: CourseWhereUniqueInput;
}>;


export type FindUniqueCourseQuery = { __typename?: 'Query', course: { __typename?: 'Course', state: State, published: boolean, title: string, teacherId: string, teacher: { __typename?: 'Teacher', createdAt: any, user: { __typename?: 'User', firstName: string, lastName: string }, photo?: { __typename?: 'Asset', url: string } | null | undefined }, thumbnail?: { __typename?: 'Asset', url: string } | null | undefined } };

export type FindAllPostQueryVariables = Exact<{
  cursor?: InputMaybe<ForumPostWhereUniqueInput>;
  distinct?: InputMaybe<Array<ForumPostScalarFieldEnum> | ForumPostScalarFieldEnum>;
  orderBy?: InputMaybe<Array<ForumPostOrderByWithRelationAndSearchRelevanceInput> | ForumPostOrderByWithRelationAndSearchRelevanceInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ForumPostWhereInput>;
}>;


export type FindAllPostQuery = { __typename?: 'Query', findManyPosts: Array<{ __typename?: 'ForumPost', id: string, userId: string, text: string, reportCount: number, parentPostId?: string | null | undefined, isSubComment: boolean, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, teamId: string, role: Role, firstName: string, lastName: string }, category: { __typename?: 'Category', id: string, name: string } }> };

export type FindAllCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllCategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', name: string, id: string }> };

export type FindUniquePostQueryVariables = Exact<{
  where: ForumPostWhereUniqueInput;
}>;


export type FindUniquePostQuery = { __typename?: 'Query', findOnePosts: { __typename?: 'ForumPost', id: string, userId: string, categoryId: string, text: string, parentPostId?: string | null | undefined, isSubComment: boolean, category: { __typename?: 'Category', id: string, name: string }, user: { __typename?: 'User', id: string, firstName: string, lastName: string, role: Role, createdAt: any }, comments?: Array<{ __typename?: 'ForumPost', id: string, text: string, isSubComment: boolean, createdAt: any, updatedAt: any, user: { __typename?: 'User', firstName: string, lastName: string } }> | null | undefined, ForumReaction?: Array<{ __typename?: 'ForumReaction', id: string, count: number, emoji: ReactionEmoji }> | null | undefined } };

export type CountForumPostsQueryVariables = Exact<{
  cursor?: InputMaybe<ForumPostWhereUniqueInput>;
  distinct?: InputMaybe<Array<ForumPostScalarFieldEnum> | ForumPostScalarFieldEnum>;
  orderBy?: InputMaybe<Array<ForumPostOrderByWithRelationAndSearchRelevanceInput> | ForumPostOrderByWithRelationAndSearchRelevanceInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ForumPostWhereInput>;
}>;


export type CountForumPostsQuery = { __typename?: 'Query', forumPostsCount: number };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, firstName: string, lastName: string, role: Role, verified: boolean, parent?: { __typename?: 'Parent', email: string, children?: Array<{ __typename?: 'Student', id: string, username: string, birthDate?: any | null | undefined, loginPattern: string, user: { __typename?: 'User', firstName: string, lastName: string } }> | null | undefined } | null | undefined, teacher?: { __typename?: 'Teacher', user: { __typename?: 'User', firstName: string, lastName: string } } | null | undefined, admin?: { __typename?: 'Admin', email: string } | null | undefined } };

export type ChildQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ChildQuery = { __typename?: 'Query', child: { __typename?: 'Student', id: string, username: string, birthDate?: any | null | undefined, loginPattern: string, bio?: string | null | undefined, email?: string | null | undefined, user: { __typename?: 'User', firstName: string, lastName: string } } };

export type TeacherQueryVariables = Exact<{ [key: string]: never; }>;


export type TeacherQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, firstName: string, lastName: string, role: Role, teacher?: { __typename?: 'Teacher', email: string, gender?: Gender | null | undefined, nationality?: string | null | undefined, experiences?: any | null | undefined, education?: any | null | undefined, certificates?: any | null | undefined, jobTitle?: string | null | undefined, introduction?: string | null | undefined, phoneNumber?: string | null | undefined, address?: { __typename?: 'Address', address1?: string | null | undefined, address2?: string | null | undefined, city?: string | null | undefined, postalCode?: string | null | undefined, country?: string | null | undefined } | null | undefined } | null | undefined } };

export type StudentQueryVariables = Exact<{ [key: string]: never; }>;


export type StudentQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, firstName: string, lastName: string, role: Role, student?: { __typename?: 'Student', bio?: string | null | undefined, birthDate?: any | null | undefined, email?: string | null | undefined, username: string, enrolledCourses?: Array<{ __typename?: 'EnrolledCourse', progress: number, createdAt: any, course: { __typename?: 'Course', id: string, title: string, description: string, duration: number, level: Level, state: State, published: boolean, category?: { __typename?: 'Category', id: string, name: string } | null | undefined, thumbnail?: { __typename?: 'Asset', id: string, url: string } | null | undefined, teacher: { __typename?: 'Teacher', user: { __typename?: 'User', firstName: string, lastName: string } }, checkpoints?: Array<{ __typename?: 'Checkpoint', parentCheckpointId?: string | null | undefined, id: string, order: number, title: string, type: TopicType, description?: string | null | undefined, courseId?: string | null | undefined, parentCheckPoint?: { __typename?: 'Checkpoint', id: string, title: string, parentCheckPoint?: { __typename?: 'Checkpoint', id: string, title: string } | null | undefined } | null | undefined, subCheckpoints?: Array<{ __typename?: 'Checkpoint', parentCheckpointId?: string | null | undefined, id: string, order: number, title: string, type: TopicType, description?: string | null | undefined, courseId?: string | null | undefined, parentCheckPoint?: { __typename?: 'Checkpoint', id: string, title: string, courseId?: string | null | undefined } | null | undefined, subCheckpoints?: Array<{ __typename?: 'Checkpoint', id: string, title: string }> | null | undefined, image?: { __typename?: 'Asset', id: string, name: string, url: string } | null | undefined, _count: { __typename?: 'CheckpointCount', subCheckpoints: number } }> | null | undefined, image?: { __typename?: 'Asset', id: string, name: string, url: string } | null | undefined, _count: { __typename?: 'CheckpointCount', subCheckpoints: number } }> | null | undefined } }> | null | undefined, legacyAvatar?: { __typename?: 'UserAvatar', skinColor: string, hairColor: string, faceItems?: any | null | undefined, accessoryItems?: any | null | undefined, hairBack: string, hairBangs: string, body: string, head: string, horns: string, leftHand: string, rightHand: string, shirt: string, jacket: string, bottom: string, shoes: string } | null | undefined } | null | undefined } };

export type ParentReportQueryVariables = Exact<{ [key: string]: never; }>;


export type ParentReportQuery = { __typename?: 'Query', me: { __typename?: 'User', parent?: { __typename?: 'Parent', children?: Array<{ __typename?: 'Student', id: string, username: string, enrolledCourses?: Array<{ __typename?: 'EnrolledCourse', progress: number, createdAt: any, course: { __typename?: 'Course', id: string, title: string, duration: number, thumbnail?: { __typename?: 'Asset', url: string } | null | undefined } }> | null | undefined }> | null | undefined } | null | undefined } };

export type ChildReportQueryVariables = Exact<{
  id: Scalars['String'];
  where?: InputMaybe<EnrolledCourseWhereInput>;
}>;


export type ChildReportQuery = { __typename?: 'Query', child: { __typename?: 'Student', id: string, username: string, enrolledCourses?: Array<{ __typename?: 'EnrolledCourse', progress: number, createdAt: any, course: { __typename?: 'Course', id: string, title: string, duration: number, thumbnail?: { __typename?: 'Asset', url: string } | null | undefined } }> | null | undefined } };

export type TeacherReportQueryVariables = Exact<{
  where?: InputMaybe<EnrolledCourseWhereInput>;
}>;


export type TeacherReportQuery = { __typename?: 'Query', me: { __typename?: 'User', teacher?: { __typename?: 'Teacher', Course?: Array<{ __typename?: 'Course', id: string, title: string, level: Level, thumbnail?: { __typename?: 'Asset', url: string } | null | undefined, enrolledCourses?: Array<{ __typename?: 'EnrolledCourse', createdAt: any }> | null | undefined, _count: { __typename?: 'CourseCount', enrolledCourses: number } }> | null | undefined } | null | undefined } };

export type AdminFindUniqueUserQueryVariables = Exact<{
  where: UserWhereUniqueInput;
}>;


export type AdminFindUniqueUserQuery = { __typename?: 'Query', adminFindUniqueUser: { __typename?: 'User', id: string, role: Role, createdAt: any, firstName: string, lastName: string, lastLogin?: any | null | undefined, verified: boolean, parent?: { __typename?: 'Parent', status: ParentStatus, email: string } | null | undefined, teacher?: { __typename?: 'Teacher', email: string, gender?: Gender | null | undefined, introduction?: string | null | undefined, nationality?: string | null | undefined, phoneNumber?: string | null | undefined, profilePicture?: string | null | undefined, addressId?: string | null | undefined, jobTitle?: string | null | undefined, photo?: { __typename?: 'Asset', url: string } | null | undefined } | null | undefined, student?: { __typename?: 'Student', parentId: string, username: string, loginPattern: string, bio?: string | null | undefined, email?: string | null | undefined, parent: { __typename?: 'Parent', id: string, email: string } } | null | undefined, team: { __typename?: 'Team', name: string } } };

export type AdminFindManyUsersQueryVariables = Exact<{
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum> | UserScalarFieldEnum>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationAndSearchRelevanceInput> | UserOrderByWithRelationAndSearchRelevanceInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
}>;


export type AdminFindManyUsersQuery = { __typename?: 'Query', adminFindManyUsers: Array<{ __typename?: 'User', id: string, role: Role, createdAt: any, firstName: string, lastName: string, lastLogin?: any | null | undefined, verified: boolean, parent?: { __typename?: 'Parent', status: ParentStatus, email: string } | null | undefined, teacher?: { __typename?: 'Teacher', email: string, gender?: Gender | null | undefined, introduction?: string | null | undefined, nationality?: string | null | undefined, phoneNumber?: string | null | undefined, profilePicture?: string | null | undefined, addressId?: string | null | undefined, jobTitle?: string | null | undefined, photo?: { __typename?: 'Asset', url: string } | null | undefined } | null | undefined, student?: { __typename?: 'Student', username: string, loginPattern: string, bio?: string | null | undefined, email?: string | null | undefined, parentId: string, enrolledCourses?: Array<{ __typename?: 'EnrolledCourse', progress: number }> | null | undefined, avatarImage?: { __typename?: 'Asset', url: string } | null | undefined } | null | undefined, team: { __typename?: 'Team', name: string } }> };

export type AdminCountUserQueryVariables = Exact<{
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum> | UserScalarFieldEnum>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationAndSearchRelevanceInput> | UserOrderByWithRelationAndSearchRelevanceInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
}>;


export type AdminCountUserQuery = { __typename?: 'Query', adminCountUser: number };

export const BasicCheckpointDataFragmentDoc = gql`
    fragment basicCheckpointData on Checkpoint {
  id
  order
  title
  type
  description
  courseId
  image {
    id
    name
    url
  }
  _count {
    subCheckpoints
  }
}
    `;
export const CheckpointDataFragmentDoc = gql`
    fragment checkpointData on Checkpoint {
  ...basicCheckpointData
  parentCheckPoint {
    id
    title
    parentCheckPoint {
      id
      title
    }
  }
  parentCheckpointId
  subCheckpoints {
    ...basicCheckpointData
    parentCheckPoint {
      id
      title
      courseId
    }
    parentCheckpointId
    subCheckpoints {
      id
      title
    }
  }
}
    ${BasicCheckpointDataFragmentDoc}`;
export const CourseDataFragmentDoc = gql`
    fragment courseData on Course {
  id
  title
  description
  duration
  level
  category {
    id
    name
  }
  thumbnail {
    id
    url
  }
  teacher {
    user {
      firstName
      lastName
    }
  }
  state
  published
  checkpoints {
    ...checkpointData
  }
}
    ${CheckpointDataFragmentDoc}`;
export const AssetDataFragmentDoc = gql`
    fragment assetData on Asset {
  id
  fileType
  url
  name
}
    `;
export const BlockDataFragmentDoc = gql`
    fragment blockData on Checkpoint {
  blocks {
    id
    blockType
    order
    textBlock {
      id
      text
    }
    attachmentBlock {
      id
      assetId
      asset {
        ...assetData
      }
    }
    mediaBlock {
      id
      assetId
      asset {
        ...assetData
      }
    }
    questionBlock {
      id
      title
      quizType
      answerType
      answerQuantityType
      pairs {
        id
        pair
      }
      selections {
        id
        asset {
          ...assetData
        }
        isCorrect
        text
      }
      asset {
        ...assetData
      }
    }
  }
}
    ${AssetDataFragmentDoc}`;
export const UserFieldFragmentDoc = gql`
    fragment userField on User {
  id
  role
  createdAt
  firstName
  lastName
  lastLogin
  team {
    name
  }
  verified
}
    `;
export const ParentFieldFragmentDoc = gql`
    fragment parentField on Parent {
  status
  email
}
    `;
export const TeacherFieldFragmentDoc = gql`
    fragment teacherField on Teacher {
  email
  gender
  introduction
  nationality
  phoneNumber
  profilePicture
  addressId
  jobTitle
  photo {
    url
  }
}
    `;
export const StudentFieldFragmentDoc = gql`
    fragment studentField on Student {
  username
  loginPattern
  bio
  email
  parentId
}
    `;
export const CheckpointFieldFragmentDoc = gql`
    fragment checkpointField on Checkpoint {
  courseId
  createdAt
  deleted
  description
  duration
  enabled
  id
  imageId
  order
  parentCheckpointId
  title
  type
  updatedAt
}
    `;
export const CourseFieldFragmentDoc = gql`
    fragment courseField on Course {
  id
  thumbnail {
    url
  }
  title
  teacher {
    id
    photo {
      url
    }
    user {
      firstName
      lastName
      teamId
      role
    }
  }
  published
  state
  createdAt
  updatedAt
}
    `;
export const SkinAvatarAssetFragmentDoc = gql`
    fragment skinAvatarAsset on SkinAvatarAsset {
  avatarAssetCatelogId
  id
  imgUrl
  label
  skinColourId
  isHalfBody
  createdAt
  updatedAt
}
    `;
export const NormalAvatarAssetFragmentDoc = gql`
    fragment normalAvatarAsset on NormalAvatarAsset {
  avatarAssetCatelogId
  id
  imgUrl
  label
  isOuterMost
  createdAt
  updatedAt
}
    `;
export const HairAvatarAssetFragmentDoc = gql`
    fragment hairAvatarAsset on HairAvatarAsset {
  avatarAssetCatelogId
  hairColourId
  id
  imgUrl
  label
  hairType
  createdAt
  updatedAt
}
    `;
export const AvatarAssetColourFragmentDoc = gql`
    fragment avatarAssetColour on AvatarAssetColour {
  assetType
  colourImgUrl
  id
  label
}
    `;
export const NewUserAvatarFragmentDoc = gql`
    fragment newUserAvatar on NewUserAvatarDto {
  body {
    ...skinAvatarAsset
  }
  ears {
    ...skinAvatarAsset
  }
  head {
    ...skinAvatarAsset
  }
  horns {
    ...skinAvatarAsset
  }
  bottom {
    ...normalAvatarAsset
  }
  cheeks {
    ...normalAvatarAsset
  }
  eyes {
    ...normalAvatarAsset
  }
  eyesAccessory {
    ...normalAvatarAsset
  }
  headAccessory {
    ...normalAvatarAsset
  }
  mouth {
    ...normalAvatarAsset
  }
  nose {
    ...normalAvatarAsset
  }
  pet {
    ...normalAvatarAsset
  }
  hairBack {
    ...hairAvatarAsset
  }
  hairBangs {
    ...hairAvatarAsset
  }
  shoes {
    ...normalAvatarAsset
  }
  hairColour {
    ...avatarAssetColour
  }
  skinColour {
    ...avatarAssetColour
  }
  itemAccessory {
    ...normalAvatarAsset
  }
  faceAccessory {
    ...normalAvatarAsset
  }
  topAccessory {
    ...normalAvatarAsset
  }
  jacket {
    ...normalAvatarAsset
  }
  shirt {
    ...normalAvatarAsset
  }
  shadow {
    ...normalAvatarAsset
  }
}
    ${SkinAvatarAssetFragmentDoc}
${NormalAvatarAssetFragmentDoc}
${HairAvatarAssetFragmentDoc}
${AvatarAssetColourFragmentDoc}`;
export const LoginDocument = gql`
    mutation login($data: LoginInput!) {
  login(data: $data) {
    accessToken
    refreshToken
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LoginStudentDocument = gql`
    mutation loginStudent($data: LoginStudentInput!) {
  loginStudent(data: $data) {
    accessToken
    refreshToken
  }
}
    `;
export type LoginStudentMutationFn = Apollo.MutationFunction<LoginStudentMutation, LoginStudentMutationVariables>;

/**
 * __useLoginStudentMutation__
 *
 * To run a mutation, you first call `useLoginStudentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginStudentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginStudentMutation, { data, loading, error }] = useLoginStudentMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginStudentMutation(baseOptions?: Apollo.MutationHookOptions<LoginStudentMutation, LoginStudentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginStudentMutation, LoginStudentMutationVariables>(LoginStudentDocument, options);
      }
export type LoginStudentMutationHookResult = ReturnType<typeof useLoginStudentMutation>;
export type LoginStudentMutationResult = Apollo.MutationResult<LoginStudentMutation>;
export type LoginStudentMutationOptions = Apollo.BaseMutationOptions<LoginStudentMutation, LoginStudentMutationVariables>;
export const SignupDocument = gql`
    mutation signup($data: SignupInput!) {
  signup(data: $data) {
    accessToken
    refreshToken
    user {
      id
      firstName
      lastName
    }
  }
}
    `;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const AddChildDocument = gql`
    mutation addChild($data: CreateChildInput!) {
  addChild(data: $data) {
    user {
      firstName
      lastName
      role
    }
  }
}
    `;
export type AddChildMutationFn = Apollo.MutationFunction<AddChildMutation, AddChildMutationVariables>;

/**
 * __useAddChildMutation__
 *
 * To run a mutation, you first call `useAddChildMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddChildMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addChildMutation, { data, loading, error }] = useAddChildMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddChildMutation(baseOptions?: Apollo.MutationHookOptions<AddChildMutation, AddChildMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddChildMutation, AddChildMutationVariables>(AddChildDocument, options);
      }
export type AddChildMutationHookResult = ReturnType<typeof useAddChildMutation>;
export type AddChildMutationResult = Apollo.MutationResult<AddChildMutation>;
export type AddChildMutationOptions = Apollo.BaseMutationOptions<AddChildMutation, AddChildMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation forgotPassword($data: ResetSendEmailInput!) {
  forgotPassword(data: $data) {
    message
  }
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation resetPassword($data: ResetPasswordInput!) {
  resetPassword(data: $data) {
    role
  }
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const AdminLoginAsDocument = gql`
    mutation adminLoginAs($data: AdminLoginAsInput!) {
  adminLoginAs(data: $data) {
    accessToken
  }
}
    `;
export type AdminLoginAsMutationFn = Apollo.MutationFunction<AdminLoginAsMutation, AdminLoginAsMutationVariables>;

/**
 * __useAdminLoginAsMutation__
 *
 * To run a mutation, you first call `useAdminLoginAsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminLoginAsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminLoginAsMutation, { data, loading, error }] = useAdminLoginAsMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAdminLoginAsMutation(baseOptions?: Apollo.MutationHookOptions<AdminLoginAsMutation, AdminLoginAsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminLoginAsMutation, AdminLoginAsMutationVariables>(AdminLoginAsDocument, options);
      }
export type AdminLoginAsMutationHookResult = ReturnType<typeof useAdminLoginAsMutation>;
export type AdminLoginAsMutationResult = Apollo.MutationResult<AdminLoginAsMutation>;
export type AdminLoginAsMutationOptions = Apollo.BaseMutationOptions<AdminLoginAsMutation, AdminLoginAsMutationVariables>;
export const CreateAvatarAssetCatalogDocument = gql`
    mutation createAvatarAssetCatalog($data: AvatarAssetCatelogCreateInput!) {
  createAvatarAssetCatalog(data: $data) {
    id
    label
    imgUrl
    type
  }
}
    `;
export type CreateAvatarAssetCatalogMutationFn = Apollo.MutationFunction<CreateAvatarAssetCatalogMutation, CreateAvatarAssetCatalogMutationVariables>;

/**
 * __useCreateAvatarAssetCatalogMutation__
 *
 * To run a mutation, you first call `useCreateAvatarAssetCatalogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAvatarAssetCatalogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAvatarAssetCatalogMutation, { data, loading, error }] = useCreateAvatarAssetCatalogMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateAvatarAssetCatalogMutation(baseOptions?: Apollo.MutationHookOptions<CreateAvatarAssetCatalogMutation, CreateAvatarAssetCatalogMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAvatarAssetCatalogMutation, CreateAvatarAssetCatalogMutationVariables>(CreateAvatarAssetCatalogDocument, options);
      }
export type CreateAvatarAssetCatalogMutationHookResult = ReturnType<typeof useCreateAvatarAssetCatalogMutation>;
export type CreateAvatarAssetCatalogMutationResult = Apollo.MutationResult<CreateAvatarAssetCatalogMutation>;
export type CreateAvatarAssetCatalogMutationOptions = Apollo.BaseMutationOptions<CreateAvatarAssetCatalogMutation, CreateAvatarAssetCatalogMutationVariables>;
export const UpdateAvatarAssetCatalogDocument = gql`
    mutation updateAvatarAssetCatalog($data: AvatarAssetCatelogUpdateInput!, $where: AvatarAssetCatelogWhereUniqueInput!) {
  updateAvatarAssetCatalog(data: $data, where: $where) {
    id
    label
    imgUrl
    type
  }
}
    `;
export type UpdateAvatarAssetCatalogMutationFn = Apollo.MutationFunction<UpdateAvatarAssetCatalogMutation, UpdateAvatarAssetCatalogMutationVariables>;

/**
 * __useUpdateAvatarAssetCatalogMutation__
 *
 * To run a mutation, you first call `useUpdateAvatarAssetCatalogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAvatarAssetCatalogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAvatarAssetCatalogMutation, { data, loading, error }] = useUpdateAvatarAssetCatalogMutation({
 *   variables: {
 *      data: // value for 'data'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUpdateAvatarAssetCatalogMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAvatarAssetCatalogMutation, UpdateAvatarAssetCatalogMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAvatarAssetCatalogMutation, UpdateAvatarAssetCatalogMutationVariables>(UpdateAvatarAssetCatalogDocument, options);
      }
export type UpdateAvatarAssetCatalogMutationHookResult = ReturnType<typeof useUpdateAvatarAssetCatalogMutation>;
export type UpdateAvatarAssetCatalogMutationResult = Apollo.MutationResult<UpdateAvatarAssetCatalogMutation>;
export type UpdateAvatarAssetCatalogMutationOptions = Apollo.BaseMutationOptions<UpdateAvatarAssetCatalogMutation, UpdateAvatarAssetCatalogMutationVariables>;
export const DeleteAvatarAssetCatalogDocument = gql`
    mutation deleteAvatarAssetCatalog($where: AvatarAssetCatelogWhereUniqueInput!) {
  deleteAvatarAssetCatalog(where: $where) {
    id
    label
    type
  }
}
    `;
export type DeleteAvatarAssetCatalogMutationFn = Apollo.MutationFunction<DeleteAvatarAssetCatalogMutation, DeleteAvatarAssetCatalogMutationVariables>;

/**
 * __useDeleteAvatarAssetCatalogMutation__
 *
 * To run a mutation, you first call `useDeleteAvatarAssetCatalogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAvatarAssetCatalogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAvatarAssetCatalogMutation, { data, loading, error }] = useDeleteAvatarAssetCatalogMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useDeleteAvatarAssetCatalogMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAvatarAssetCatalogMutation, DeleteAvatarAssetCatalogMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAvatarAssetCatalogMutation, DeleteAvatarAssetCatalogMutationVariables>(DeleteAvatarAssetCatalogDocument, options);
      }
export type DeleteAvatarAssetCatalogMutationHookResult = ReturnType<typeof useDeleteAvatarAssetCatalogMutation>;
export type DeleteAvatarAssetCatalogMutationResult = Apollo.MutationResult<DeleteAvatarAssetCatalogMutation>;
export type DeleteAvatarAssetCatalogMutationOptions = Apollo.BaseMutationOptions<DeleteAvatarAssetCatalogMutation, DeleteAvatarAssetCatalogMutationVariables>;
export const UploadAvatarAssetDocument = gql`
    mutation uploadAvatarAsset($assetType: AvatarAssetCatelogTypes!, $file: Upload!) {
  uploadAvatarAsset(assetType: $assetType, file: $file)
}
    `;
export type UploadAvatarAssetMutationFn = Apollo.MutationFunction<UploadAvatarAssetMutation, UploadAvatarAssetMutationVariables>;

/**
 * __useUploadAvatarAssetMutation__
 *
 * To run a mutation, you first call `useUploadAvatarAssetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadAvatarAssetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadAvatarAssetMutation, { data, loading, error }] = useUploadAvatarAssetMutation({
 *   variables: {
 *      assetType: // value for 'assetType'
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUploadAvatarAssetMutation(baseOptions?: Apollo.MutationHookOptions<UploadAvatarAssetMutation, UploadAvatarAssetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadAvatarAssetMutation, UploadAvatarAssetMutationVariables>(UploadAvatarAssetDocument, options);
      }
export type UploadAvatarAssetMutationHookResult = ReturnType<typeof useUploadAvatarAssetMutation>;
export type UploadAvatarAssetMutationResult = Apollo.MutationResult<UploadAvatarAssetMutation>;
export type UploadAvatarAssetMutationOptions = Apollo.BaseMutationOptions<UploadAvatarAssetMutation, UploadAvatarAssetMutationVariables>;
export const DeleteNormalAvatarAssetDocument = gql`
    mutation deleteNormalAvatarAsset($where: NormalAvatarAssetWhereUniqueInput!) {
  deleteNormalAvatarAsset(where: $where) {
    id
    imgUrl
    label
  }
}
    `;
export type DeleteNormalAvatarAssetMutationFn = Apollo.MutationFunction<DeleteNormalAvatarAssetMutation, DeleteNormalAvatarAssetMutationVariables>;

/**
 * __useDeleteNormalAvatarAssetMutation__
 *
 * To run a mutation, you first call `useDeleteNormalAvatarAssetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteNormalAvatarAssetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteNormalAvatarAssetMutation, { data, loading, error }] = useDeleteNormalAvatarAssetMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useDeleteNormalAvatarAssetMutation(baseOptions?: Apollo.MutationHookOptions<DeleteNormalAvatarAssetMutation, DeleteNormalAvatarAssetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteNormalAvatarAssetMutation, DeleteNormalAvatarAssetMutationVariables>(DeleteNormalAvatarAssetDocument, options);
      }
export type DeleteNormalAvatarAssetMutationHookResult = ReturnType<typeof useDeleteNormalAvatarAssetMutation>;
export type DeleteNormalAvatarAssetMutationResult = Apollo.MutationResult<DeleteNormalAvatarAssetMutation>;
export type DeleteNormalAvatarAssetMutationOptions = Apollo.BaseMutationOptions<DeleteNormalAvatarAssetMutation, DeleteNormalAvatarAssetMutationVariables>;
export const DeleteHairAvatarAssetDocument = gql`
    mutation deleteHairAvatarAsset($where: HairAvatarAssetWhereUniqueInput!) {
  deleteHairAvatarAsset(where: $where) {
    id
    imgUrl
    label
  }
}
    `;
export type DeleteHairAvatarAssetMutationFn = Apollo.MutationFunction<DeleteHairAvatarAssetMutation, DeleteHairAvatarAssetMutationVariables>;

/**
 * __useDeleteHairAvatarAssetMutation__
 *
 * To run a mutation, you first call `useDeleteHairAvatarAssetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteHairAvatarAssetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteHairAvatarAssetMutation, { data, loading, error }] = useDeleteHairAvatarAssetMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useDeleteHairAvatarAssetMutation(baseOptions?: Apollo.MutationHookOptions<DeleteHairAvatarAssetMutation, DeleteHairAvatarAssetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteHairAvatarAssetMutation, DeleteHairAvatarAssetMutationVariables>(DeleteHairAvatarAssetDocument, options);
      }
export type DeleteHairAvatarAssetMutationHookResult = ReturnType<typeof useDeleteHairAvatarAssetMutation>;
export type DeleteHairAvatarAssetMutationResult = Apollo.MutationResult<DeleteHairAvatarAssetMutation>;
export type DeleteHairAvatarAssetMutationOptions = Apollo.BaseMutationOptions<DeleteHairAvatarAssetMutation, DeleteHairAvatarAssetMutationVariables>;
export const DeleteSkinAvatarAssetDocument = gql`
    mutation deleteSkinAvatarAsset($where: SkinAvatarAssetWhereUniqueInput!) {
  deleteSkinAvatarAsset(where: $where) {
    id
    imgUrl
    label
  }
}
    `;
export type DeleteSkinAvatarAssetMutationFn = Apollo.MutationFunction<DeleteSkinAvatarAssetMutation, DeleteSkinAvatarAssetMutationVariables>;

/**
 * __useDeleteSkinAvatarAssetMutation__
 *
 * To run a mutation, you first call `useDeleteSkinAvatarAssetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSkinAvatarAssetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSkinAvatarAssetMutation, { data, loading, error }] = useDeleteSkinAvatarAssetMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useDeleteSkinAvatarAssetMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSkinAvatarAssetMutation, DeleteSkinAvatarAssetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSkinAvatarAssetMutation, DeleteSkinAvatarAssetMutationVariables>(DeleteSkinAvatarAssetDocument, options);
      }
export type DeleteSkinAvatarAssetMutationHookResult = ReturnType<typeof useDeleteSkinAvatarAssetMutation>;
export type DeleteSkinAvatarAssetMutationResult = Apollo.MutationResult<DeleteSkinAvatarAssetMutation>;
export type DeleteSkinAvatarAssetMutationOptions = Apollo.BaseMutationOptions<DeleteSkinAvatarAssetMutation, DeleteSkinAvatarAssetMutationVariables>;
export const EditNormalAvatarAssetDocument = gql`
    mutation editNormalAvatarAsset($data: NormalAvatarAssetUpdateInput!, $where: NormalAvatarAssetWhereUniqueInput!) {
  updateNormalAvatarAsset(data: $data, where: $where) {
    id
    imgUrl
    label
  }
}
    `;
export type EditNormalAvatarAssetMutationFn = Apollo.MutationFunction<EditNormalAvatarAssetMutation, EditNormalAvatarAssetMutationVariables>;

/**
 * __useEditNormalAvatarAssetMutation__
 *
 * To run a mutation, you first call `useEditNormalAvatarAssetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditNormalAvatarAssetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editNormalAvatarAssetMutation, { data, loading, error }] = useEditNormalAvatarAssetMutation({
 *   variables: {
 *      data: // value for 'data'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useEditNormalAvatarAssetMutation(baseOptions?: Apollo.MutationHookOptions<EditNormalAvatarAssetMutation, EditNormalAvatarAssetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditNormalAvatarAssetMutation, EditNormalAvatarAssetMutationVariables>(EditNormalAvatarAssetDocument, options);
      }
export type EditNormalAvatarAssetMutationHookResult = ReturnType<typeof useEditNormalAvatarAssetMutation>;
export type EditNormalAvatarAssetMutationResult = Apollo.MutationResult<EditNormalAvatarAssetMutation>;
export type EditNormalAvatarAssetMutationOptions = Apollo.BaseMutationOptions<EditNormalAvatarAssetMutation, EditNormalAvatarAssetMutationVariables>;
export const EditSkinAvatarAssetDocument = gql`
    mutation editSkinAvatarAsset($data: SkinAvatarAssetUpdateInput!, $where: SkinAvatarAssetWhereUniqueInput!) {
  updateSkinAvatarAsset(data: $data, where: $where) {
    id
    imgUrl
    label
  }
}
    `;
export type EditSkinAvatarAssetMutationFn = Apollo.MutationFunction<EditSkinAvatarAssetMutation, EditSkinAvatarAssetMutationVariables>;

/**
 * __useEditSkinAvatarAssetMutation__
 *
 * To run a mutation, you first call `useEditSkinAvatarAssetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditSkinAvatarAssetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editSkinAvatarAssetMutation, { data, loading, error }] = useEditSkinAvatarAssetMutation({
 *   variables: {
 *      data: // value for 'data'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useEditSkinAvatarAssetMutation(baseOptions?: Apollo.MutationHookOptions<EditSkinAvatarAssetMutation, EditSkinAvatarAssetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditSkinAvatarAssetMutation, EditSkinAvatarAssetMutationVariables>(EditSkinAvatarAssetDocument, options);
      }
export type EditSkinAvatarAssetMutationHookResult = ReturnType<typeof useEditSkinAvatarAssetMutation>;
export type EditSkinAvatarAssetMutationResult = Apollo.MutationResult<EditSkinAvatarAssetMutation>;
export type EditSkinAvatarAssetMutationOptions = Apollo.BaseMutationOptions<EditSkinAvatarAssetMutation, EditSkinAvatarAssetMutationVariables>;
export const EditHairAvatarAssetDocument = gql`
    mutation editHairAvatarAsset($data: HairAvatarAssetUpdateInput!, $where: HairAvatarAssetWhereUniqueInput!) {
  updateHairAvatarAsset(data: $data, where: $where) {
    id
    imgUrl
    label
  }
}
    `;
export type EditHairAvatarAssetMutationFn = Apollo.MutationFunction<EditHairAvatarAssetMutation, EditHairAvatarAssetMutationVariables>;

/**
 * __useEditHairAvatarAssetMutation__
 *
 * To run a mutation, you first call `useEditHairAvatarAssetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditHairAvatarAssetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editHairAvatarAssetMutation, { data, loading, error }] = useEditHairAvatarAssetMutation({
 *   variables: {
 *      data: // value for 'data'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useEditHairAvatarAssetMutation(baseOptions?: Apollo.MutationHookOptions<EditHairAvatarAssetMutation, EditHairAvatarAssetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditHairAvatarAssetMutation, EditHairAvatarAssetMutationVariables>(EditHairAvatarAssetDocument, options);
      }
export type EditHairAvatarAssetMutationHookResult = ReturnType<typeof useEditHairAvatarAssetMutation>;
export type EditHairAvatarAssetMutationResult = Apollo.MutationResult<EditHairAvatarAssetMutation>;
export type EditHairAvatarAssetMutationOptions = Apollo.BaseMutationOptions<EditHairAvatarAssetMutation, EditHairAvatarAssetMutationVariables>;
export const DeleteChallengeCommentDocument = gql`
    mutation deleteChallengeComment($commentId: String!) {
  deleteChallengeComment(commentId: $commentId)
}
    `;
export type DeleteChallengeCommentMutationFn = Apollo.MutationFunction<DeleteChallengeCommentMutation, DeleteChallengeCommentMutationVariables>;

/**
 * __useDeleteChallengeCommentMutation__
 *
 * To run a mutation, you first call `useDeleteChallengeCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteChallengeCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteChallengeCommentMutation, { data, loading, error }] = useDeleteChallengeCommentMutation({
 *   variables: {
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useDeleteChallengeCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteChallengeCommentMutation, DeleteChallengeCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteChallengeCommentMutation, DeleteChallengeCommentMutationVariables>(DeleteChallengeCommentDocument, options);
      }
export type DeleteChallengeCommentMutationHookResult = ReturnType<typeof useDeleteChallengeCommentMutation>;
export type DeleteChallengeCommentMutationResult = Apollo.MutationResult<DeleteChallengeCommentMutation>;
export type DeleteChallengeCommentMutationOptions = Apollo.BaseMutationOptions<DeleteChallengeCommentMutation, DeleteChallengeCommentMutationVariables>;
export const UpdateCourseDocument = gql`
    mutation updateCourse($data: UpdateCourseInput!, $id: String!) {
  updateCourse(data: $data, id: $id) {
    ...courseField
  }
}
    ${CourseFieldFragmentDoc}`;
export type UpdateCourseMutationFn = Apollo.MutationFunction<UpdateCourseMutation, UpdateCourseMutationVariables>;

/**
 * __useUpdateCourseMutation__
 *
 * To run a mutation, you first call `useUpdateCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCourseMutation, { data, loading, error }] = useUpdateCourseMutation({
 *   variables: {
 *      data: // value for 'data'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateCourseMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCourseMutation, UpdateCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCourseMutation, UpdateCourseMutationVariables>(UpdateCourseDocument, options);
      }
export type UpdateCourseMutationHookResult = ReturnType<typeof useUpdateCourseMutation>;
export type UpdateCourseMutationResult = Apollo.MutationResult<UpdateCourseMutation>;
export type UpdateCourseMutationOptions = Apollo.BaseMutationOptions<UpdateCourseMutation, UpdateCourseMutationVariables>;
export const UploadCourseAssetDocument = gql`
    mutation uploadCourseAsset($courseAssetType: CourseAssetType!, $file: Upload!) {
  uploadCourseAsset(courseAssetType: $courseAssetType, file: $file) {
    id
    name
    url
  }
}
    `;
export type UploadCourseAssetMutationFn = Apollo.MutationFunction<UploadCourseAssetMutation, UploadCourseAssetMutationVariables>;

/**
 * __useUploadCourseAssetMutation__
 *
 * To run a mutation, you first call `useUploadCourseAssetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadCourseAssetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadCourseAssetMutation, { data, loading, error }] = useUploadCourseAssetMutation({
 *   variables: {
 *      courseAssetType: // value for 'courseAssetType'
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUploadCourseAssetMutation(baseOptions?: Apollo.MutationHookOptions<UploadCourseAssetMutation, UploadCourseAssetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadCourseAssetMutation, UploadCourseAssetMutationVariables>(UploadCourseAssetDocument, options);
      }
export type UploadCourseAssetMutationHookResult = ReturnType<typeof useUploadCourseAssetMutation>;
export type UploadCourseAssetMutationResult = Apollo.MutationResult<UploadCourseAssetMutation>;
export type UploadCourseAssetMutationOptions = Apollo.BaseMutationOptions<UploadCourseAssetMutation, UploadCourseAssetMutationVariables>;
export const AdminDeleteCourseDocument = gql`
    mutation adminDeleteCourse($where: CourseWhereUniqueInput!) {
  adminDeleteCourse(where: $where) {
    id
    title
  }
}
    `;
export type AdminDeleteCourseMutationFn = Apollo.MutationFunction<AdminDeleteCourseMutation, AdminDeleteCourseMutationVariables>;

/**
 * __useAdminDeleteCourseMutation__
 *
 * To run a mutation, you first call `useAdminDeleteCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminDeleteCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminDeleteCourseMutation, { data, loading, error }] = useAdminDeleteCourseMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useAdminDeleteCourseMutation(baseOptions?: Apollo.MutationHookOptions<AdminDeleteCourseMutation, AdminDeleteCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminDeleteCourseMutation, AdminDeleteCourseMutationVariables>(AdminDeleteCourseDocument, options);
      }
export type AdminDeleteCourseMutationHookResult = ReturnType<typeof useAdminDeleteCourseMutation>;
export type AdminDeleteCourseMutationResult = Apollo.MutationResult<AdminDeleteCourseMutation>;
export type AdminDeleteCourseMutationOptions = Apollo.BaseMutationOptions<AdminDeleteCourseMutation, AdminDeleteCourseMutationVariables>;
export const CreatePostDocument = gql`
    mutation createPost($parentPostId: String, $categoryId: String!, $text: String!) {
  createOnePost(
    data: {parentPostId: $parentPostId, categoryId: $categoryId, text: $text}
  ) {
    id
    text
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      parentPostId: // value for 'parentPostId'
 *      categoryId: // value for 'categoryId'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const DeletePostDocument = gql`
    mutation deletePost($id: String!) {
  deleteOnePost(id: $id) {
    id
    userId
    text
    parentPostId
  }
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const UpdatePostDocument = gql`
    mutation updatePost($data: UpdatePostInput!, $id: String!) {
  updateOnePost(data: $data, id: $id) {
    id
    userId
    text
  }
}
    `;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      data: // value for 'data'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, options);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const AdminUpdateChildDocument = gql`
    mutation adminUpdateChild($data: AdminUpdateChildDetailsInput!, $id: String!) {
  adminUpdateChild(data: $data, id: $id) {
    id
    user {
      firstName
      lastName
    }
  }
}
    `;
export type AdminUpdateChildMutationFn = Apollo.MutationFunction<AdminUpdateChildMutation, AdminUpdateChildMutationVariables>;

/**
 * __useAdminUpdateChildMutation__
 *
 * To run a mutation, you first call `useAdminUpdateChildMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminUpdateChildMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminUpdateChildMutation, { data, loading, error }] = useAdminUpdateChildMutation({
 *   variables: {
 *      data: // value for 'data'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAdminUpdateChildMutation(baseOptions?: Apollo.MutationHookOptions<AdminUpdateChildMutation, AdminUpdateChildMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminUpdateChildMutation, AdminUpdateChildMutationVariables>(AdminUpdateChildDocument, options);
      }
export type AdminUpdateChildMutationHookResult = ReturnType<typeof useAdminUpdateChildMutation>;
export type AdminUpdateChildMutationResult = Apollo.MutationResult<AdminUpdateChildMutation>;
export type AdminUpdateChildMutationOptions = Apollo.BaseMutationOptions<AdminUpdateChildMutation, AdminUpdateChildMutationVariables>;
export const RemoveChildDocument = gql`
    mutation removeChild($id: String!) {
  removeChild(id: $id) {
    id
  }
}
    `;
export type RemoveChildMutationFn = Apollo.MutationFunction<RemoveChildMutation, RemoveChildMutationVariables>;

/**
 * __useRemoveChildMutation__
 *
 * To run a mutation, you first call `useRemoveChildMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveChildMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeChildMutation, { data, loading, error }] = useRemoveChildMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveChildMutation(baseOptions?: Apollo.MutationHookOptions<RemoveChildMutation, RemoveChildMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveChildMutation, RemoveChildMutationVariables>(RemoveChildDocument, options);
      }
export type RemoveChildMutationHookResult = ReturnType<typeof useRemoveChildMutation>;
export type RemoveChildMutationResult = Apollo.MutationResult<RemoveChildMutation>;
export type RemoveChildMutationOptions = Apollo.BaseMutationOptions<RemoveChildMutation, RemoveChildMutationVariables>;
export const ChangeParentPasswordDocument = gql`
    mutation changeParentPassword($data: ChangePasswordInput!) {
  changeParentPassword(data: $data) {
    id
  }
}
    `;
export type ChangeParentPasswordMutationFn = Apollo.MutationFunction<ChangeParentPasswordMutation, ChangeParentPasswordMutationVariables>;

/**
 * __useChangeParentPasswordMutation__
 *
 * To run a mutation, you first call `useChangeParentPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeParentPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeParentPasswordMutation, { data, loading, error }] = useChangeParentPasswordMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChangeParentPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangeParentPasswordMutation, ChangeParentPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeParentPasswordMutation, ChangeParentPasswordMutationVariables>(ChangeParentPasswordDocument, options);
      }
export type ChangeParentPasswordMutationHookResult = ReturnType<typeof useChangeParentPasswordMutation>;
export type ChangeParentPasswordMutationResult = Apollo.MutationResult<ChangeParentPasswordMutation>;
export type ChangeParentPasswordMutationOptions = Apollo.BaseMutationOptions<ChangeParentPasswordMutation, ChangeParentPasswordMutationVariables>;
export const ChangeTeacherPasswordDocument = gql`
    mutation changeTeacherPassword($data: ChangePasswordInput!) {
  changeTeacherPassword(data: $data) {
    id
  }
}
    `;
export type ChangeTeacherPasswordMutationFn = Apollo.MutationFunction<ChangeTeacherPasswordMutation, ChangeTeacherPasswordMutationVariables>;

/**
 * __useChangeTeacherPasswordMutation__
 *
 * To run a mutation, you first call `useChangeTeacherPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeTeacherPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeTeacherPasswordMutation, { data, loading, error }] = useChangeTeacherPasswordMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChangeTeacherPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangeTeacherPasswordMutation, ChangeTeacherPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeTeacherPasswordMutation, ChangeTeacherPasswordMutationVariables>(ChangeTeacherPasswordDocument, options);
      }
export type ChangeTeacherPasswordMutationHookResult = ReturnType<typeof useChangeTeacherPasswordMutation>;
export type ChangeTeacherPasswordMutationResult = Apollo.MutationResult<ChangeTeacherPasswordMutation>;
export type ChangeTeacherPasswordMutationOptions = Apollo.BaseMutationOptions<ChangeTeacherPasswordMutation, ChangeTeacherPasswordMutationVariables>;
export const UpdateTeacherDocument = gql`
    mutation updateTeacher($data: UpdateTeacherDetailsInput!) {
  updateTeacherDetails(data: $data) {
    id
  }
}
    `;
export type UpdateTeacherMutationFn = Apollo.MutationFunction<UpdateTeacherMutation, UpdateTeacherMutationVariables>;

/**
 * __useUpdateTeacherMutation__
 *
 * To run a mutation, you first call `useUpdateTeacherMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTeacherMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTeacherMutation, { data, loading, error }] = useUpdateTeacherMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateTeacherMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTeacherMutation, UpdateTeacherMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTeacherMutation, UpdateTeacherMutationVariables>(UpdateTeacherDocument, options);
      }
export type UpdateTeacherMutationHookResult = ReturnType<typeof useUpdateTeacherMutation>;
export type UpdateTeacherMutationResult = Apollo.MutationResult<UpdateTeacherMutation>;
export type UpdateTeacherMutationOptions = Apollo.BaseMutationOptions<UpdateTeacherMutation, UpdateTeacherMutationVariables>;
export const AdminUpdateUserDocument = gql`
    mutation adminUpdateUser($data: UserUpdateInput!, $where: UserWhereUniqueInput!) {
  adminUpdateUser(data: $data, where: $where) {
    ...userField
  }
}
    ${UserFieldFragmentDoc}`;
export type AdminUpdateUserMutationFn = Apollo.MutationFunction<AdminUpdateUserMutation, AdminUpdateUserMutationVariables>;

/**
 * __useAdminUpdateUserMutation__
 *
 * To run a mutation, you first call `useAdminUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminUpdateUserMutation, { data, loading, error }] = useAdminUpdateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useAdminUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<AdminUpdateUserMutation, AdminUpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminUpdateUserMutation, AdminUpdateUserMutationVariables>(AdminUpdateUserDocument, options);
      }
export type AdminUpdateUserMutationHookResult = ReturnType<typeof useAdminUpdateUserMutation>;
export type AdminUpdateUserMutationResult = Apollo.MutationResult<AdminUpdateUserMutation>;
export type AdminUpdateUserMutationOptions = Apollo.BaseMutationOptions<AdminUpdateUserMutation, AdminUpdateUserMutationVariables>;
export const DeleteUserDocument = gql`
    mutation deleteUser($where: UserWhereUniqueInput!) {
  deleteUser(where: $where) {
    ...userField
  }
}
    ${UserFieldFragmentDoc}`;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const CreateUserDocument = gql`
    mutation createUser($data: UserCreateInput!) {
  createUser(data: $data) {
    ...userField
  }
}
    ${UserFieldFragmentDoc}`;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const AdminUploadTeacherProfileDocument = gql`
    mutation adminUploadTeacherProfile($file: Upload!, $id: String!) {
  adminUploadTeacherProfile(file: $file, id: $id) {
    ...teacherField
  }
}
    ${TeacherFieldFragmentDoc}`;
export type AdminUploadTeacherProfileMutationFn = Apollo.MutationFunction<AdminUploadTeacherProfileMutation, AdminUploadTeacherProfileMutationVariables>;

/**
 * __useAdminUploadTeacherProfileMutation__
 *
 * To run a mutation, you first call `useAdminUploadTeacherProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminUploadTeacherProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminUploadTeacherProfileMutation, { data, loading, error }] = useAdminUploadTeacherProfileMutation({
 *   variables: {
 *      file: // value for 'file'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAdminUploadTeacherProfileMutation(baseOptions?: Apollo.MutationHookOptions<AdminUploadTeacherProfileMutation, AdminUploadTeacherProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminUploadTeacherProfileMutation, AdminUploadTeacherProfileMutationVariables>(AdminUploadTeacherProfileDocument, options);
      }
export type AdminUploadTeacherProfileMutationHookResult = ReturnType<typeof useAdminUploadTeacherProfileMutation>;
export type AdminUploadTeacherProfileMutationResult = Apollo.MutationResult<AdminUploadTeacherProfileMutation>;
export type AdminUploadTeacherProfileMutationOptions = Apollo.BaseMutationOptions<AdminUploadTeacherProfileMutation, AdminUploadTeacherProfileMutationVariables>;
export const AdminChangePasswordDocument = gql`
    mutation adminChangePassword($data: AdminChangePasswordInput!) {
  adminChangePassword(data: $data) {
    ...userField
  }
}
    ${UserFieldFragmentDoc}`;
export type AdminChangePasswordMutationFn = Apollo.MutationFunction<AdminChangePasswordMutation, AdminChangePasswordMutationVariables>;

/**
 * __useAdminChangePasswordMutation__
 *
 * To run a mutation, you first call `useAdminChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminChangePasswordMutation, { data, loading, error }] = useAdminChangePasswordMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAdminChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<AdminChangePasswordMutation, AdminChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminChangePasswordMutation, AdminChangePasswordMutationVariables>(AdminChangePasswordDocument, options);
      }
export type AdminChangePasswordMutationHookResult = ReturnType<typeof useAdminChangePasswordMutation>;
export type AdminChangePasswordMutationResult = Apollo.MutationResult<AdminChangePasswordMutation>;
export type AdminChangePasswordMutationOptions = Apollo.BaseMutationOptions<AdminChangePasswordMutation, AdminChangePasswordMutationVariables>;
export const AdminAddChildDocument = gql`
    mutation adminAddChild($data: CreateChildInput!, $parentEmail: String!) {
  adminAddChild(data: $data, parentEmail: $parentEmail) {
    id
    user {
      firstName
      lastName
    }
  }
}
    `;
export type AdminAddChildMutationFn = Apollo.MutationFunction<AdminAddChildMutation, AdminAddChildMutationVariables>;

/**
 * __useAdminAddChildMutation__
 *
 * To run a mutation, you first call `useAdminAddChildMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminAddChildMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminAddChildMutation, { data, loading, error }] = useAdminAddChildMutation({
 *   variables: {
 *      data: // value for 'data'
 *      parentEmail: // value for 'parentEmail'
 *   },
 * });
 */
export function useAdminAddChildMutation(baseOptions?: Apollo.MutationHookOptions<AdminAddChildMutation, AdminAddChildMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminAddChildMutation, AdminAddChildMutationVariables>(AdminAddChildDocument, options);
      }
export type AdminAddChildMutationHookResult = ReturnType<typeof useAdminAddChildMutation>;
export type AdminAddChildMutationResult = Apollo.MutationResult<AdminAddChildMutation>;
export type AdminAddChildMutationOptions = Apollo.BaseMutationOptions<AdminAddChildMutation, AdminAddChildMutationVariables>;
export const FindManyAvatarAssetCatalogDocument = gql`
    query findManyAvatarAssetCatalog($cursor: AvatarAssetCatelogWhereUniqueInput, $distinct: [AvatarAssetCatelogScalarFieldEnum!], $orderBy: [AvatarAssetCatelogOrderByWithRelationAndSearchRelevanceInput!], $skip: Int, $take: Int, $where: AvatarAssetCatelogWhereInput) {
  findManyAvatarAssetCatalog(
    cursor: $cursor
    distinct: $distinct
    orderBy: $orderBy
    skip: $skip
    take: $take
    where: $where
  ) {
    id
    label
    imgUrl
    type
    createdAt
    updatedAt
    isActive
    avatarAssetCategory {
      label
      id
    }
  }
}
    `;

/**
 * __useFindManyAvatarAssetCatalogQuery__
 *
 * To run a query within a React component, call `useFindManyAvatarAssetCatalogQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindManyAvatarAssetCatalogQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindManyAvatarAssetCatalogQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      distinct: // value for 'distinct'
 *      orderBy: // value for 'orderBy'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useFindManyAvatarAssetCatalogQuery(baseOptions?: Apollo.QueryHookOptions<FindManyAvatarAssetCatalogQuery, FindManyAvatarAssetCatalogQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindManyAvatarAssetCatalogQuery, FindManyAvatarAssetCatalogQueryVariables>(FindManyAvatarAssetCatalogDocument, options);
      }
export function useFindManyAvatarAssetCatalogLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindManyAvatarAssetCatalogQuery, FindManyAvatarAssetCatalogQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindManyAvatarAssetCatalogQuery, FindManyAvatarAssetCatalogQueryVariables>(FindManyAvatarAssetCatalogDocument, options);
        }
export type FindManyAvatarAssetCatalogQueryHookResult = ReturnType<typeof useFindManyAvatarAssetCatalogQuery>;
export type FindManyAvatarAssetCatalogLazyQueryHookResult = ReturnType<typeof useFindManyAvatarAssetCatalogLazyQuery>;
export type FindManyAvatarAssetCatalogQueryResult = Apollo.QueryResult<FindManyAvatarAssetCatalogQuery, FindManyAvatarAssetCatalogQueryVariables>;
export const FindManyAvatarAssetCategoryDocument = gql`
    query findManyAvatarAssetCategory($cursor: AvatarAssetCategoryWhereUniqueInput, $distinct: [AvatarAssetCategoryScalarFieldEnum!], $orderBy: [AvatarAssetCategoryOrderByWithRelationAndSearchRelevanceInput!], $skip: Int, $take: Int, $where: AvatarAssetCategoryWhereInput) {
  findManyAvatarAssetCategory(
    cursor: $cursor
    distinct: $distinct
    orderBy: $orderBy
    skip: $skip
    take: $take
    where: $where
  ) {
    id
    label
    subCategories {
      id
      label
    }
  }
}
    `;

/**
 * __useFindManyAvatarAssetCategoryQuery__
 *
 * To run a query within a React component, call `useFindManyAvatarAssetCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindManyAvatarAssetCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindManyAvatarAssetCategoryQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      distinct: // value for 'distinct'
 *      orderBy: // value for 'orderBy'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useFindManyAvatarAssetCategoryQuery(baseOptions?: Apollo.QueryHookOptions<FindManyAvatarAssetCategoryQuery, FindManyAvatarAssetCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindManyAvatarAssetCategoryQuery, FindManyAvatarAssetCategoryQueryVariables>(FindManyAvatarAssetCategoryDocument, options);
      }
export function useFindManyAvatarAssetCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindManyAvatarAssetCategoryQuery, FindManyAvatarAssetCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindManyAvatarAssetCategoryQuery, FindManyAvatarAssetCategoryQueryVariables>(FindManyAvatarAssetCategoryDocument, options);
        }
export type FindManyAvatarAssetCategoryQueryHookResult = ReturnType<typeof useFindManyAvatarAssetCategoryQuery>;
export type FindManyAvatarAssetCategoryLazyQueryHookResult = ReturnType<typeof useFindManyAvatarAssetCategoryLazyQuery>;
export type FindManyAvatarAssetCategoryQueryResult = Apollo.QueryResult<FindManyAvatarAssetCategoryQuery, FindManyAvatarAssetCategoryQueryVariables>;
export const FindUniqueAvatarAssetCategoryDocument = gql`
    query findUniqueAvatarAssetCategory($cursor: AvatarAssetCategoryWhereUniqueInput, $distinct: [AvatarAssetCategoryScalarFieldEnum!], $orderBy: [AvatarAssetCategoryOrderByWithRelationAndSearchRelevanceInput!], $skip: Int, $take: Int, $where: AvatarAssetCategoryWhereInput) {
  findOneAvatarAssetCategory(
    cursor: $cursor
    distinct: $distinct
    orderBy: $orderBy
    skip: $skip
    take: $take
    where: $where
  ) {
    id
    label
    subCategories {
      id
      label
    }
  }
}
    `;

/**
 * __useFindUniqueAvatarAssetCategoryQuery__
 *
 * To run a query within a React component, call `useFindUniqueAvatarAssetCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUniqueAvatarAssetCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUniqueAvatarAssetCategoryQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      distinct: // value for 'distinct'
 *      orderBy: // value for 'orderBy'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useFindUniqueAvatarAssetCategoryQuery(baseOptions?: Apollo.QueryHookOptions<FindUniqueAvatarAssetCategoryQuery, FindUniqueAvatarAssetCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindUniqueAvatarAssetCategoryQuery, FindUniqueAvatarAssetCategoryQueryVariables>(FindUniqueAvatarAssetCategoryDocument, options);
      }
export function useFindUniqueAvatarAssetCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindUniqueAvatarAssetCategoryQuery, FindUniqueAvatarAssetCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindUniqueAvatarAssetCategoryQuery, FindUniqueAvatarAssetCategoryQueryVariables>(FindUniqueAvatarAssetCategoryDocument, options);
        }
export type FindUniqueAvatarAssetCategoryQueryHookResult = ReturnType<typeof useFindUniqueAvatarAssetCategoryQuery>;
export type FindUniqueAvatarAssetCategoryLazyQueryHookResult = ReturnType<typeof useFindUniqueAvatarAssetCategoryLazyQuery>;
export type FindUniqueAvatarAssetCategoryQueryResult = Apollo.QueryResult<FindUniqueAvatarAssetCategoryQuery, FindUniqueAvatarAssetCategoryQueryVariables>;
export const FindUniqueAvatarAssetCatalogDocument = gql`
    query findUniqueAvatarAssetCatalog($cursor: AvatarAssetCatelogWhereUniqueInput, $distinct: [AvatarAssetCatelogScalarFieldEnum!], $orderBy: [AvatarAssetCatelogOrderByWithRelationAndSearchRelevanceInput!], $skip: Int, $take: Int, $where: AvatarAssetCatelogWhereInput) {
  findOneAvatarAssetCatalog(
    cursor: $cursor
    distinct: $distinct
    orderBy: $orderBy
    skip: $skip
    take: $take
    where: $where
  ) {
    id
    label
    imgUrl
    type
    isActive
    createdAt
    updatedAt
    avatarAssetCategory {
      id
      label
      type
      parentCategory {
        id
        label
      }
      subCategories {
        id
        label
      }
    }
    normalAvatarAsset {
      ...normalAvatarAsset
    }
    skinAvatarAsset {
      ...skinAvatarAsset
    }
    hairAvatarAsset {
      ...hairAvatarAsset
    }
  }
}
    ${NormalAvatarAssetFragmentDoc}
${SkinAvatarAssetFragmentDoc}
${HairAvatarAssetFragmentDoc}`;

/**
 * __useFindUniqueAvatarAssetCatalogQuery__
 *
 * To run a query within a React component, call `useFindUniqueAvatarAssetCatalogQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUniqueAvatarAssetCatalogQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUniqueAvatarAssetCatalogQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      distinct: // value for 'distinct'
 *      orderBy: // value for 'orderBy'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useFindUniqueAvatarAssetCatalogQuery(baseOptions?: Apollo.QueryHookOptions<FindUniqueAvatarAssetCatalogQuery, FindUniqueAvatarAssetCatalogQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindUniqueAvatarAssetCatalogQuery, FindUniqueAvatarAssetCatalogQueryVariables>(FindUniqueAvatarAssetCatalogDocument, options);
      }
export function useFindUniqueAvatarAssetCatalogLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindUniqueAvatarAssetCatalogQuery, FindUniqueAvatarAssetCatalogQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindUniqueAvatarAssetCatalogQuery, FindUniqueAvatarAssetCatalogQueryVariables>(FindUniqueAvatarAssetCatalogDocument, options);
        }
export type FindUniqueAvatarAssetCatalogQueryHookResult = ReturnType<typeof useFindUniqueAvatarAssetCatalogQuery>;
export type FindUniqueAvatarAssetCatalogLazyQueryHookResult = ReturnType<typeof useFindUniqueAvatarAssetCatalogLazyQuery>;
export type FindUniqueAvatarAssetCatalogQueryResult = Apollo.QueryResult<FindUniqueAvatarAssetCatalogQuery, FindUniqueAvatarAssetCatalogQueryVariables>;
export const AvatarAssetCatalogCountDocument = gql`
    query AvatarAssetCatalogCount($cursor: AvatarAssetCatelogWhereUniqueInput, $distinct: [AvatarAssetCatelogScalarFieldEnum!], $orderBy: [AvatarAssetCatelogOrderByWithRelationAndSearchRelevanceInput!], $skip: Int, $take: Int, $where: AvatarAssetCatelogWhereInput) {
  avatarAssetCatalogCount(
    cursor: $cursor
    distinct: $distinct
    orderBy: $orderBy
    skip: $skip
    take: $take
    where: $where
  )
}
    `;

/**
 * __useAvatarAssetCatalogCountQuery__
 *
 * To run a query within a React component, call `useAvatarAssetCatalogCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useAvatarAssetCatalogCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAvatarAssetCatalogCountQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      distinct: // value for 'distinct'
 *      orderBy: // value for 'orderBy'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useAvatarAssetCatalogCountQuery(baseOptions?: Apollo.QueryHookOptions<AvatarAssetCatalogCountQuery, AvatarAssetCatalogCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AvatarAssetCatalogCountQuery, AvatarAssetCatalogCountQueryVariables>(AvatarAssetCatalogCountDocument, options);
      }
export function useAvatarAssetCatalogCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AvatarAssetCatalogCountQuery, AvatarAssetCatalogCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AvatarAssetCatalogCountQuery, AvatarAssetCatalogCountQueryVariables>(AvatarAssetCatalogCountDocument, options);
        }
export type AvatarAssetCatalogCountQueryHookResult = ReturnType<typeof useAvatarAssetCatalogCountQuery>;
export type AvatarAssetCatalogCountLazyQueryHookResult = ReturnType<typeof useAvatarAssetCatalogCountLazyQuery>;
export type AvatarAssetCatalogCountQueryResult = Apollo.QueryResult<AvatarAssetCatalogCountQuery, AvatarAssetCatalogCountQueryVariables>;
export const AllCatalogOptionsDocument = gql`
    query allCatalogOptions($skip: Int, $take: Int, $where: AvatarAssetCategoryWhereInput) {
  getCatalog(skip: $skip, take: $take, where: $where) {
    categoryCatelog {
      type
      parentCategory {
        label
      }
      subCategories {
        label
      }
      id
      label
      avatarAssetCatelog {
        type
        imgUrl
        label
        id
        normalAvatarAsset {
          imgUrl
          label
        }
        hairAvatarAsset {
          imgUrl
          label
          hairColour {
            label
          }
        }
      }
    }
  }
}
    `;

/**
 * __useAllCatalogOptionsQuery__
 *
 * To run a query within a React component, call `useAllCatalogOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllCatalogOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllCatalogOptionsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useAllCatalogOptionsQuery(baseOptions?: Apollo.QueryHookOptions<AllCatalogOptionsQuery, AllCatalogOptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllCatalogOptionsQuery, AllCatalogOptionsQueryVariables>(AllCatalogOptionsDocument, options);
      }
export function useAllCatalogOptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllCatalogOptionsQuery, AllCatalogOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllCatalogOptionsQuery, AllCatalogOptionsQueryVariables>(AllCatalogOptionsDocument, options);
        }
export type AllCatalogOptionsQueryHookResult = ReturnType<typeof useAllCatalogOptionsQuery>;
export type AllCatalogOptionsLazyQueryHookResult = ReturnType<typeof useAllCatalogOptionsLazyQuery>;
export type AllCatalogOptionsQueryResult = Apollo.QueryResult<AllCatalogOptionsQuery, AllCatalogOptionsQueryVariables>;
export const FindOneNormalAvatarAssetDocument = gql`
    query findOneNormalAvatarAsset($cursor: NormalAvatarAssetWhereUniqueInput, $distinct: [NormalAvatarAssetScalarFieldEnum!], $orderBy: [NormalAvatarAssetOrderByWithRelationAndSearchRelevanceInput!], $skip: Int, $take: Int, $where: NormalAvatarAssetWhereInput) {
  findOneNormalAvatarAsset(
    cursor: $cursor
    distinct: $distinct
    orderBy: $orderBy
    skip: $skip
    take: $take
    where: $where
  ) {
    ...normalAvatarAsset
  }
}
    ${NormalAvatarAssetFragmentDoc}`;

/**
 * __useFindOneNormalAvatarAssetQuery__
 *
 * To run a query within a React component, call `useFindOneNormalAvatarAssetQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindOneNormalAvatarAssetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindOneNormalAvatarAssetQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      distinct: // value for 'distinct'
 *      orderBy: // value for 'orderBy'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useFindOneNormalAvatarAssetQuery(baseOptions?: Apollo.QueryHookOptions<FindOneNormalAvatarAssetQuery, FindOneNormalAvatarAssetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindOneNormalAvatarAssetQuery, FindOneNormalAvatarAssetQueryVariables>(FindOneNormalAvatarAssetDocument, options);
      }
export function useFindOneNormalAvatarAssetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindOneNormalAvatarAssetQuery, FindOneNormalAvatarAssetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindOneNormalAvatarAssetQuery, FindOneNormalAvatarAssetQueryVariables>(FindOneNormalAvatarAssetDocument, options);
        }
export type FindOneNormalAvatarAssetQueryHookResult = ReturnType<typeof useFindOneNormalAvatarAssetQuery>;
export type FindOneNormalAvatarAssetLazyQueryHookResult = ReturnType<typeof useFindOneNormalAvatarAssetLazyQuery>;
export type FindOneNormalAvatarAssetQueryResult = Apollo.QueryResult<FindOneNormalAvatarAssetQuery, FindOneNormalAvatarAssetQueryVariables>;
export const FindOneSkinAvatarAssetDocument = gql`
    query findOneSkinAvatarAsset($cursor: SkinAvatarAssetWhereUniqueInput, $distinct: [SkinAvatarAssetScalarFieldEnum!], $orderBy: [SkinAvatarAssetOrderByWithRelationAndSearchRelevanceInput!], $skip: Int, $take: Int, $where: SkinAvatarAssetWhereInput) {
  findOneSkinAvatarAsset(
    cursor: $cursor
    distinct: $distinct
    orderBy: $orderBy
    skip: $skip
    take: $take
    where: $where
  ) {
    ...skinAvatarAsset
  }
}
    ${SkinAvatarAssetFragmentDoc}`;

/**
 * __useFindOneSkinAvatarAssetQuery__
 *
 * To run a query within a React component, call `useFindOneSkinAvatarAssetQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindOneSkinAvatarAssetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindOneSkinAvatarAssetQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      distinct: // value for 'distinct'
 *      orderBy: // value for 'orderBy'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useFindOneSkinAvatarAssetQuery(baseOptions?: Apollo.QueryHookOptions<FindOneSkinAvatarAssetQuery, FindOneSkinAvatarAssetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindOneSkinAvatarAssetQuery, FindOneSkinAvatarAssetQueryVariables>(FindOneSkinAvatarAssetDocument, options);
      }
export function useFindOneSkinAvatarAssetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindOneSkinAvatarAssetQuery, FindOneSkinAvatarAssetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindOneSkinAvatarAssetQuery, FindOneSkinAvatarAssetQueryVariables>(FindOneSkinAvatarAssetDocument, options);
        }
export type FindOneSkinAvatarAssetQueryHookResult = ReturnType<typeof useFindOneSkinAvatarAssetQuery>;
export type FindOneSkinAvatarAssetLazyQueryHookResult = ReturnType<typeof useFindOneSkinAvatarAssetLazyQuery>;
export type FindOneSkinAvatarAssetQueryResult = Apollo.QueryResult<FindOneSkinAvatarAssetQuery, FindOneSkinAvatarAssetQueryVariables>;
export const FindOneHairAvatarAssetDocument = gql`
    query findOneHairAvatarAsset($cursor: HairAvatarAssetWhereUniqueInput, $distinct: [HairAvatarAssetScalarFieldEnum!], $orderBy: [HairAvatarAssetOrderByWithRelationAndSearchRelevanceInput!], $skip: Int, $take: Int, $where: HairAvatarAssetWhereInput) {
  findOneHairAvatarAsset(
    cursor: $cursor
    distinct: $distinct
    orderBy: $orderBy
    skip: $skip
    take: $take
    where: $where
  ) {
    ...hairAvatarAsset
  }
}
    ${HairAvatarAssetFragmentDoc}`;

/**
 * __useFindOneHairAvatarAssetQuery__
 *
 * To run a query within a React component, call `useFindOneHairAvatarAssetQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindOneHairAvatarAssetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindOneHairAvatarAssetQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      distinct: // value for 'distinct'
 *      orderBy: // value for 'orderBy'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useFindOneHairAvatarAssetQuery(baseOptions?: Apollo.QueryHookOptions<FindOneHairAvatarAssetQuery, FindOneHairAvatarAssetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindOneHairAvatarAssetQuery, FindOneHairAvatarAssetQueryVariables>(FindOneHairAvatarAssetDocument, options);
      }
export function useFindOneHairAvatarAssetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindOneHairAvatarAssetQuery, FindOneHairAvatarAssetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindOneHairAvatarAssetQuery, FindOneHairAvatarAssetQueryVariables>(FindOneHairAvatarAssetDocument, options);
        }
export type FindOneHairAvatarAssetQueryHookResult = ReturnType<typeof useFindOneHairAvatarAssetQuery>;
export type FindOneHairAvatarAssetLazyQueryHookResult = ReturnType<typeof useFindOneHairAvatarAssetLazyQuery>;
export type FindOneHairAvatarAssetQueryResult = Apollo.QueryResult<FindOneHairAvatarAssetQuery, FindOneHairAvatarAssetQueryVariables>;
export const FindManyChallengesDocument = gql`
    query findManyChallenges($cursor: ChallengeWhereUniqueInput, $distinct: [ChallengeScalarFieldEnum!], $orderBy: [ChallengeOrderByWithRelationAndSearchRelevanceInput!], $skip: Int, $take: Int, $where: ChallengeWhereInput) {
  challenges(
    cursor: $cursor
    distinct: $distinct
    orderBy: $orderBy
    skip: $skip
    take: $take
    where: $where
  ) {
    id
    asset {
      url
    }
    challengeBlock {
      block {
        checkpoint {
          title
          course {
            title
          }
        }
      }
    }
    creator {
      id
      user {
        firstName
      }
    }
    createdAt
  }
}
    `;

/**
 * __useFindManyChallengesQuery__
 *
 * To run a query within a React component, call `useFindManyChallengesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindManyChallengesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindManyChallengesQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      distinct: // value for 'distinct'
 *      orderBy: // value for 'orderBy'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useFindManyChallengesQuery(baseOptions?: Apollo.QueryHookOptions<FindManyChallengesQuery, FindManyChallengesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindManyChallengesQuery, FindManyChallengesQueryVariables>(FindManyChallengesDocument, options);
      }
export function useFindManyChallengesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindManyChallengesQuery, FindManyChallengesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindManyChallengesQuery, FindManyChallengesQueryVariables>(FindManyChallengesDocument, options);
        }
export type FindManyChallengesQueryHookResult = ReturnType<typeof useFindManyChallengesQuery>;
export type FindManyChallengesLazyQueryHookResult = ReturnType<typeof useFindManyChallengesLazyQuery>;
export type FindManyChallengesQueryResult = Apollo.QueryResult<FindManyChallengesQuery, FindManyChallengesQueryVariables>;
export const FindOneChallengeDocument = gql`
    query findOneChallenge($id: String!) {
  challenge(id: $id) {
    id
    asset {
      name
      url
    }
    challengeBlock {
      block {
        checkpoint {
          title
          course {
            title
          }
        }
      }
    }
    creator {
      id
      avatarImage {
        url
      }
      user {
        firstName
        lastName
        createdAt
      }
    }
    createdAt
  }
}
    `;

/**
 * __useFindOneChallengeQuery__
 *
 * To run a query within a React component, call `useFindOneChallengeQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindOneChallengeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindOneChallengeQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindOneChallengeQuery(baseOptions: Apollo.QueryHookOptions<FindOneChallengeQuery, FindOneChallengeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindOneChallengeQuery, FindOneChallengeQueryVariables>(FindOneChallengeDocument, options);
      }
export function useFindOneChallengeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindOneChallengeQuery, FindOneChallengeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindOneChallengeQuery, FindOneChallengeQueryVariables>(FindOneChallengeDocument, options);
        }
export type FindOneChallengeQueryHookResult = ReturnType<typeof useFindOneChallengeQuery>;
export type FindOneChallengeLazyQueryHookResult = ReturnType<typeof useFindOneChallengeLazyQuery>;
export type FindOneChallengeQueryResult = Apollo.QueryResult<FindOneChallengeQuery, FindOneChallengeQueryVariables>;
export const AdminCountChallengeDocument = gql`
    query adminCountChallenge($cursor: ChallengeWhereUniqueInput, $distinct: [ChallengeScalarFieldEnum!], $orderBy: [ChallengeOrderByWithRelationAndSearchRelevanceInput!], $skip: Int, $take: Int, $where: ChallengeWhereInput) {
  adminCountChallenge(
    cursor: $cursor
    distinct: $distinct
    orderBy: $orderBy
    skip: $skip
    take: $take
    where: $where
  )
}
    `;

/**
 * __useAdminCountChallengeQuery__
 *
 * To run a query within a React component, call `useAdminCountChallengeQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminCountChallengeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminCountChallengeQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      distinct: // value for 'distinct'
 *      orderBy: // value for 'orderBy'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useAdminCountChallengeQuery(baseOptions?: Apollo.QueryHookOptions<AdminCountChallengeQuery, AdminCountChallengeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdminCountChallengeQuery, AdminCountChallengeQueryVariables>(AdminCountChallengeDocument, options);
      }
export function useAdminCountChallengeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminCountChallengeQuery, AdminCountChallengeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdminCountChallengeQuery, AdminCountChallengeQueryVariables>(AdminCountChallengeDocument, options);
        }
export type AdminCountChallengeQueryHookResult = ReturnType<typeof useAdminCountChallengeQuery>;
export type AdminCountChallengeLazyQueryHookResult = ReturnType<typeof useAdminCountChallengeLazyQuery>;
export type AdminCountChallengeQueryResult = Apollo.QueryResult<AdminCountChallengeQuery, AdminCountChallengeQueryVariables>;
export const FindChallengeCommentsDocument = gql`
    query findChallengeComments($cursor: ChallengeCommentWhereUniqueInput, $distinct: [ChallengeCommentScalarFieldEnum!], $orderBy: [ChallengeCommentOrderByWithRelationAndSearchRelevanceInput!], $skip: Int, $take: Int, $where: ChallengeCommentWhereInput) {
  challengeComments(
    cursor: $cursor
    distinct: $distinct
    orderBy: $orderBy
    skip: $skip
    take: $take
    where: $where
  ) {
    id
    text
    commenterId
    commenter {
      firstName
      lastName
      student {
        avatarImage {
          url
        }
      }
    }
    createdAt
  }
}
    `;

/**
 * __useFindChallengeCommentsQuery__
 *
 * To run a query within a React component, call `useFindChallengeCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindChallengeCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindChallengeCommentsQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      distinct: // value for 'distinct'
 *      orderBy: // value for 'orderBy'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useFindChallengeCommentsQuery(baseOptions?: Apollo.QueryHookOptions<FindChallengeCommentsQuery, FindChallengeCommentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindChallengeCommentsQuery, FindChallengeCommentsQueryVariables>(FindChallengeCommentsDocument, options);
      }
export function useFindChallengeCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindChallengeCommentsQuery, FindChallengeCommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindChallengeCommentsQuery, FindChallengeCommentsQueryVariables>(FindChallengeCommentsDocument, options);
        }
export type FindChallengeCommentsQueryHookResult = ReturnType<typeof useFindChallengeCommentsQuery>;
export type FindChallengeCommentsLazyQueryHookResult = ReturnType<typeof useFindChallengeCommentsLazyQuery>;
export type FindChallengeCommentsQueryResult = Apollo.QueryResult<FindChallengeCommentsQuery, FindChallengeCommentsQueryVariables>;
export const FindManyCheckpointsDocument = gql`
    query findManyCheckpoints($cursor: CheckpointWhereUniqueInput, $distinct: [CheckpointScalarFieldEnum!], $orderBy: [CheckpointOrderByWithRelationAndSearchRelevanceInput!], $skip: Int, $take: Int, $where: CheckpointWhereInput) {
  checkpoints(
    cursor: $cursor
    distinct: $distinct
    orderBy: $orderBy
    skip: $skip
    take: $take
    where: $where
  ) {
    ...checkpointField
  }
}
    ${CheckpointFieldFragmentDoc}`;

/**
 * __useFindManyCheckpointsQuery__
 *
 * To run a query within a React component, call `useFindManyCheckpointsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindManyCheckpointsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindManyCheckpointsQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      distinct: // value for 'distinct'
 *      orderBy: // value for 'orderBy'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useFindManyCheckpointsQuery(baseOptions?: Apollo.QueryHookOptions<FindManyCheckpointsQuery, FindManyCheckpointsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindManyCheckpointsQuery, FindManyCheckpointsQueryVariables>(FindManyCheckpointsDocument, options);
      }
export function useFindManyCheckpointsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindManyCheckpointsQuery, FindManyCheckpointsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindManyCheckpointsQuery, FindManyCheckpointsQueryVariables>(FindManyCheckpointsDocument, options);
        }
export type FindManyCheckpointsQueryHookResult = ReturnType<typeof useFindManyCheckpointsQuery>;
export type FindManyCheckpointsLazyQueryHookResult = ReturnType<typeof useFindManyCheckpointsLazyQuery>;
export type FindManyCheckpointsQueryResult = Apollo.QueryResult<FindManyCheckpointsQuery, FindManyCheckpointsQueryVariables>;
export const FindManyCoursesDocument = gql`
    query findManyCourses($cursor: CourseWhereUniqueInput, $distinct: [CourseScalarFieldEnum!], $orderBy: [CourseOrderByWithRelationAndSearchRelevanceInput!], $skip: Int, $take: Int, $where: CourseWhereInput) {
  courses(
    cursor: $cursor
    distinct: $distinct
    orderBy: $orderBy
    skip: $skip
    take: $take
    where: $where
  ) {
    ...courseField
  }
}
    ${CourseFieldFragmentDoc}`;

/**
 * __useFindManyCoursesQuery__
 *
 * To run a query within a React component, call `useFindManyCoursesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindManyCoursesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindManyCoursesQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      distinct: // value for 'distinct'
 *      orderBy: // value for 'orderBy'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useFindManyCoursesQuery(baseOptions?: Apollo.QueryHookOptions<FindManyCoursesQuery, FindManyCoursesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindManyCoursesQuery, FindManyCoursesQueryVariables>(FindManyCoursesDocument, options);
      }
export function useFindManyCoursesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindManyCoursesQuery, FindManyCoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindManyCoursesQuery, FindManyCoursesQueryVariables>(FindManyCoursesDocument, options);
        }
export type FindManyCoursesQueryHookResult = ReturnType<typeof useFindManyCoursesQuery>;
export type FindManyCoursesLazyQueryHookResult = ReturnType<typeof useFindManyCoursesLazyQuery>;
export type FindManyCoursesQueryResult = Apollo.QueryResult<FindManyCoursesQuery, FindManyCoursesQueryVariables>;
export const AdminCountCourseDocument = gql`
    query adminCountCourse($cursor: CourseWhereUniqueInput, $distinct: [CourseScalarFieldEnum!], $orderBy: [CourseOrderByWithRelationAndSearchRelevanceInput!], $skip: Int, $take: Int, $where: CourseWhereInput) {
  adminCountCourse(
    cursor: $cursor
    distinct: $distinct
    orderBy: $orderBy
    skip: $skip
    take: $take
    where: $where
  )
}
    `;

/**
 * __useAdminCountCourseQuery__
 *
 * To run a query within a React component, call `useAdminCountCourseQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminCountCourseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminCountCourseQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      distinct: // value for 'distinct'
 *      orderBy: // value for 'orderBy'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useAdminCountCourseQuery(baseOptions?: Apollo.QueryHookOptions<AdminCountCourseQuery, AdminCountCourseQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdminCountCourseQuery, AdminCountCourseQueryVariables>(AdminCountCourseDocument, options);
      }
export function useAdminCountCourseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminCountCourseQuery, AdminCountCourseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdminCountCourseQuery, AdminCountCourseQueryVariables>(AdminCountCourseDocument, options);
        }
export type AdminCountCourseQueryHookResult = ReturnType<typeof useAdminCountCourseQuery>;
export type AdminCountCourseLazyQueryHookResult = ReturnType<typeof useAdminCountCourseLazyQuery>;
export type AdminCountCourseQueryResult = Apollo.QueryResult<AdminCountCourseQuery, AdminCountCourseQueryVariables>;
export const FindUniqueCourseDocument = gql`
    query findUniqueCourse($where: CourseWhereUniqueInput!) {
  course(where: $where) {
    state
    published
    title
    teacherId
    teacher {
      user {
        firstName
        lastName
      }
      photo {
        url
      }
      createdAt
    }
    thumbnail {
      url
    }
  }
}
    `;

/**
 * __useFindUniqueCourseQuery__
 *
 * To run a query within a React component, call `useFindUniqueCourseQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUniqueCourseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUniqueCourseQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useFindUniqueCourseQuery(baseOptions: Apollo.QueryHookOptions<FindUniqueCourseQuery, FindUniqueCourseQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindUniqueCourseQuery, FindUniqueCourseQueryVariables>(FindUniqueCourseDocument, options);
      }
export function useFindUniqueCourseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindUniqueCourseQuery, FindUniqueCourseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindUniqueCourseQuery, FindUniqueCourseQueryVariables>(FindUniqueCourseDocument, options);
        }
export type FindUniqueCourseQueryHookResult = ReturnType<typeof useFindUniqueCourseQuery>;
export type FindUniqueCourseLazyQueryHookResult = ReturnType<typeof useFindUniqueCourseLazyQuery>;
export type FindUniqueCourseQueryResult = Apollo.QueryResult<FindUniqueCourseQuery, FindUniqueCourseQueryVariables>;
export const FindAllPostDocument = gql`
    query findAllPost($cursor: ForumPostWhereUniqueInput, $distinct: [ForumPostScalarFieldEnum!], $orderBy: [ForumPostOrderByWithRelationAndSearchRelevanceInput!], $skip: Int, $take: Int, $where: ForumPostWhereInput) {
  findManyPosts(
    cursor: $cursor
    distinct: $distinct
    orderBy: $orderBy
    skip: $skip
    take: $take
    where: $where
  ) {
    id
    userId
    text
    reportCount
    user {
      id
      teamId
      role
      firstName
      lastName
    }
    category {
      id
      name
    }
    parentPostId
    isSubComment
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useFindAllPostQuery__
 *
 * To run a query within a React component, call `useFindAllPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllPostQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      distinct: // value for 'distinct'
 *      orderBy: // value for 'orderBy'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useFindAllPostQuery(baseOptions?: Apollo.QueryHookOptions<FindAllPostQuery, FindAllPostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllPostQuery, FindAllPostQueryVariables>(FindAllPostDocument, options);
      }
export function useFindAllPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllPostQuery, FindAllPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllPostQuery, FindAllPostQueryVariables>(FindAllPostDocument, options);
        }
export type FindAllPostQueryHookResult = ReturnType<typeof useFindAllPostQuery>;
export type FindAllPostLazyQueryHookResult = ReturnType<typeof useFindAllPostLazyQuery>;
export type FindAllPostQueryResult = Apollo.QueryResult<FindAllPostQuery, FindAllPostQueryVariables>;
export const FindAllCategoriesDocument = gql`
    query findAllCategories {
  categories {
    name
    id
  }
}
    `;

/**
 * __useFindAllCategoriesQuery__
 *
 * To run a query within a React component, call `useFindAllCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindAllCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<FindAllCategoriesQuery, FindAllCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllCategoriesQuery, FindAllCategoriesQueryVariables>(FindAllCategoriesDocument, options);
      }
export function useFindAllCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllCategoriesQuery, FindAllCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllCategoriesQuery, FindAllCategoriesQueryVariables>(FindAllCategoriesDocument, options);
        }
export type FindAllCategoriesQueryHookResult = ReturnType<typeof useFindAllCategoriesQuery>;
export type FindAllCategoriesLazyQueryHookResult = ReturnType<typeof useFindAllCategoriesLazyQuery>;
export type FindAllCategoriesQueryResult = Apollo.QueryResult<FindAllCategoriesQuery, FindAllCategoriesQueryVariables>;
export const FindUniquePostDocument = gql`
    query findUniquePost($where: ForumPostWhereUniqueInput!) {
  findOnePosts(where: $where) {
    id
    userId
    categoryId
    text
    category {
      id
      name
    }
    parentPostId
    user {
      id
      firstName
      lastName
      role
      createdAt
    }
    comments {
      id
      text
      isSubComment
      createdAt
      updatedAt
      user {
        firstName
        lastName
      }
    }
    ForumReaction {
      id
      count
      emoji
    }
    isSubComment
  }
}
    `;

/**
 * __useFindUniquePostQuery__
 *
 * To run a query within a React component, call `useFindUniquePostQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUniquePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUniquePostQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useFindUniquePostQuery(baseOptions: Apollo.QueryHookOptions<FindUniquePostQuery, FindUniquePostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindUniquePostQuery, FindUniquePostQueryVariables>(FindUniquePostDocument, options);
      }
export function useFindUniquePostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindUniquePostQuery, FindUniquePostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindUniquePostQuery, FindUniquePostQueryVariables>(FindUniquePostDocument, options);
        }
export type FindUniquePostQueryHookResult = ReturnType<typeof useFindUniquePostQuery>;
export type FindUniquePostLazyQueryHookResult = ReturnType<typeof useFindUniquePostLazyQuery>;
export type FindUniquePostQueryResult = Apollo.QueryResult<FindUniquePostQuery, FindUniquePostQueryVariables>;
export const CountForumPostsDocument = gql`
    query countForumPosts($cursor: ForumPostWhereUniqueInput, $distinct: [ForumPostScalarFieldEnum!], $orderBy: [ForumPostOrderByWithRelationAndSearchRelevanceInput!], $skip: Int, $take: Int, $where: ForumPostWhereInput) {
  forumPostsCount(
    cursor: $cursor
    distinct: $distinct
    orderBy: $orderBy
    skip: $skip
    take: $take
    where: $where
  )
}
    `;

/**
 * __useCountForumPostsQuery__
 *
 * To run a query within a React component, call `useCountForumPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCountForumPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountForumPostsQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      distinct: // value for 'distinct'
 *      orderBy: // value for 'orderBy'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useCountForumPostsQuery(baseOptions?: Apollo.QueryHookOptions<CountForumPostsQuery, CountForumPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CountForumPostsQuery, CountForumPostsQueryVariables>(CountForumPostsDocument, options);
      }
export function useCountForumPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CountForumPostsQuery, CountForumPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CountForumPostsQuery, CountForumPostsQueryVariables>(CountForumPostsDocument, options);
        }
export type CountForumPostsQueryHookResult = ReturnType<typeof useCountForumPostsQuery>;
export type CountForumPostsLazyQueryHookResult = ReturnType<typeof useCountForumPostsLazyQuery>;
export type CountForumPostsQueryResult = Apollo.QueryResult<CountForumPostsQuery, CountForumPostsQueryVariables>;
export const MeDocument = gql`
    query me {
  me {
    id
    firstName
    lastName
    role
    parent {
      email
      children {
        id
        username
        birthDate
        loginPattern
        user {
          firstName
          lastName
        }
      }
    }
    teacher {
      user {
        firstName
        lastName
      }
    }
    admin {
      email
    }
    verified
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const ChildDocument = gql`
    query child($id: String!) {
  child(id: $id) {
    id
    username
    birthDate
    loginPattern
    bio
    email
    user {
      firstName
      lastName
    }
  }
}
    `;

/**
 * __useChildQuery__
 *
 * To run a query within a React component, call `useChildQuery` and pass it any options that fit your needs.
 * When your component renders, `useChildQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChildQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useChildQuery(baseOptions: Apollo.QueryHookOptions<ChildQuery, ChildQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChildQuery, ChildQueryVariables>(ChildDocument, options);
      }
export function useChildLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChildQuery, ChildQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChildQuery, ChildQueryVariables>(ChildDocument, options);
        }
export type ChildQueryHookResult = ReturnType<typeof useChildQuery>;
export type ChildLazyQueryHookResult = ReturnType<typeof useChildLazyQuery>;
export type ChildQueryResult = Apollo.QueryResult<ChildQuery, ChildQueryVariables>;
export const TeacherDocument = gql`
    query teacher {
  me {
    id
    firstName
    lastName
    role
    teacher {
      email
      gender
      nationality
      experiences
      education
      certificates
      jobTitle
      introduction
      phoneNumber
      address {
        address1
        address2
        city
        postalCode
        country
      }
    }
  }
}
    `;

/**
 * __useTeacherQuery__
 *
 * To run a query within a React component, call `useTeacherQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeacherQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeacherQuery({
 *   variables: {
 *   },
 * });
 */
export function useTeacherQuery(baseOptions?: Apollo.QueryHookOptions<TeacherQuery, TeacherQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TeacherQuery, TeacherQueryVariables>(TeacherDocument, options);
      }
export function useTeacherLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeacherQuery, TeacherQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TeacherQuery, TeacherQueryVariables>(TeacherDocument, options);
        }
export type TeacherQueryHookResult = ReturnType<typeof useTeacherQuery>;
export type TeacherLazyQueryHookResult = ReturnType<typeof useTeacherLazyQuery>;
export type TeacherQueryResult = Apollo.QueryResult<TeacherQuery, TeacherQueryVariables>;
export const StudentDocument = gql`
    query student {
  me {
    id
    firstName
    lastName
    role
    student {
      bio
      birthDate
      email
      username
      enrolledCourses {
        progress
        createdAt
        course {
          ...courseData
        }
      }
      legacyAvatar {
        skinColor
        hairColor
        faceItems
        accessoryItems
        hairBack
        hairBangs
        body
        head
        horns
        leftHand
        rightHand
        shirt
        jacket
        bottom
        shoes
      }
    }
  }
}
    ${CourseDataFragmentDoc}`;

/**
 * __useStudentQuery__
 *
 * To run a query within a React component, call `useStudentQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentQuery({
 *   variables: {
 *   },
 * });
 */
export function useStudentQuery(baseOptions?: Apollo.QueryHookOptions<StudentQuery, StudentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StudentQuery, StudentQueryVariables>(StudentDocument, options);
      }
export function useStudentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StudentQuery, StudentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StudentQuery, StudentQueryVariables>(StudentDocument, options);
        }
export type StudentQueryHookResult = ReturnType<typeof useStudentQuery>;
export type StudentLazyQueryHookResult = ReturnType<typeof useStudentLazyQuery>;
export type StudentQueryResult = Apollo.QueryResult<StudentQuery, StudentQueryVariables>;
export const ParentReportDocument = gql`
    query parentReport {
  me {
    parent {
      children {
        id
        username
        enrolledCourses {
          course {
            id
            title
            duration
            thumbnail {
              url
            }
          }
          progress
          createdAt
        }
      }
    }
  }
}
    `;

/**
 * __useParentReportQuery__
 *
 * To run a query within a React component, call `useParentReportQuery` and pass it any options that fit your needs.
 * When your component renders, `useParentReportQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useParentReportQuery({
 *   variables: {
 *   },
 * });
 */
export function useParentReportQuery(baseOptions?: Apollo.QueryHookOptions<ParentReportQuery, ParentReportQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ParentReportQuery, ParentReportQueryVariables>(ParentReportDocument, options);
      }
export function useParentReportLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ParentReportQuery, ParentReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ParentReportQuery, ParentReportQueryVariables>(ParentReportDocument, options);
        }
export type ParentReportQueryHookResult = ReturnType<typeof useParentReportQuery>;
export type ParentReportLazyQueryHookResult = ReturnType<typeof useParentReportLazyQuery>;
export type ParentReportQueryResult = Apollo.QueryResult<ParentReportQuery, ParentReportQueryVariables>;
export const ChildReportDocument = gql`
    query childReport($id: String!, $where: EnrolledCourseWhereInput) {
  child(id: $id) {
    id
    username
    enrolledCourses(where: $where) {
      progress
      createdAt
      course {
        id
        title
        duration
        thumbnail {
          url
        }
      }
    }
  }
}
    `;

/**
 * __useChildReportQuery__
 *
 * To run a query within a React component, call `useChildReportQuery` and pass it any options that fit your needs.
 * When your component renders, `useChildReportQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChildReportQuery({
 *   variables: {
 *      id: // value for 'id'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useChildReportQuery(baseOptions: Apollo.QueryHookOptions<ChildReportQuery, ChildReportQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChildReportQuery, ChildReportQueryVariables>(ChildReportDocument, options);
      }
export function useChildReportLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChildReportQuery, ChildReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChildReportQuery, ChildReportQueryVariables>(ChildReportDocument, options);
        }
export type ChildReportQueryHookResult = ReturnType<typeof useChildReportQuery>;
export type ChildReportLazyQueryHookResult = ReturnType<typeof useChildReportLazyQuery>;
export type ChildReportQueryResult = Apollo.QueryResult<ChildReportQuery, ChildReportQueryVariables>;
export const TeacherReportDocument = gql`
    query teacherReport($where: EnrolledCourseWhereInput) {
  me {
    teacher {
      Course {
        id
        title
        level
        thumbnail {
          url
        }
        enrolledCourses(where: $where) {
          createdAt
        }
        _count {
          enrolledCourses
        }
      }
    }
  }
}
    `;

/**
 * __useTeacherReportQuery__
 *
 * To run a query within a React component, call `useTeacherReportQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeacherReportQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeacherReportQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useTeacherReportQuery(baseOptions?: Apollo.QueryHookOptions<TeacherReportQuery, TeacherReportQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TeacherReportQuery, TeacherReportQueryVariables>(TeacherReportDocument, options);
      }
export function useTeacherReportLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeacherReportQuery, TeacherReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TeacherReportQuery, TeacherReportQueryVariables>(TeacherReportDocument, options);
        }
export type TeacherReportQueryHookResult = ReturnType<typeof useTeacherReportQuery>;
export type TeacherReportLazyQueryHookResult = ReturnType<typeof useTeacherReportLazyQuery>;
export type TeacherReportQueryResult = Apollo.QueryResult<TeacherReportQuery, TeacherReportQueryVariables>;
export const AdminFindUniqueUserDocument = gql`
    query adminFindUniqueUser($where: UserWhereUniqueInput!) {
  adminFindUniqueUser(where: $where) {
    ...userField
    parent {
      ...parentField
    }
    teacher {
      ...teacherField
      photo {
        url
      }
    }
    student {
      ...studentField
      parentId
      parent {
        id
        email
      }
    }
  }
}
    ${UserFieldFragmentDoc}
${ParentFieldFragmentDoc}
${TeacherFieldFragmentDoc}
${StudentFieldFragmentDoc}`;

/**
 * __useAdminFindUniqueUserQuery__
 *
 * To run a query within a React component, call `useAdminFindUniqueUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminFindUniqueUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminFindUniqueUserQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useAdminFindUniqueUserQuery(baseOptions: Apollo.QueryHookOptions<AdminFindUniqueUserQuery, AdminFindUniqueUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdminFindUniqueUserQuery, AdminFindUniqueUserQueryVariables>(AdminFindUniqueUserDocument, options);
      }
export function useAdminFindUniqueUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminFindUniqueUserQuery, AdminFindUniqueUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdminFindUniqueUserQuery, AdminFindUniqueUserQueryVariables>(AdminFindUniqueUserDocument, options);
        }
export type AdminFindUniqueUserQueryHookResult = ReturnType<typeof useAdminFindUniqueUserQuery>;
export type AdminFindUniqueUserLazyQueryHookResult = ReturnType<typeof useAdminFindUniqueUserLazyQuery>;
export type AdminFindUniqueUserQueryResult = Apollo.QueryResult<AdminFindUniqueUserQuery, AdminFindUniqueUserQueryVariables>;
export const AdminFindManyUsersDocument = gql`
    query adminFindManyUsers($cursor: UserWhereUniqueInput, $distinct: [UserScalarFieldEnum!], $orderBy: [UserOrderByWithRelationAndSearchRelevanceInput!], $skip: Int, $take: Int, $where: UserWhereInput) {
  adminFindManyUsers(
    cursor: $cursor
    distinct: $distinct
    orderBy: $orderBy
    skip: $skip
    take: $take
    where: $where
  ) {
    ...userField
    parent {
      ...parentField
    }
    teacher {
      ...teacherField
      photo {
        url
      }
    }
    student {
      ...studentField
      enrolledCourses {
        progress
      }
      avatarImage {
        url
      }
    }
  }
}
    ${UserFieldFragmentDoc}
${ParentFieldFragmentDoc}
${TeacherFieldFragmentDoc}
${StudentFieldFragmentDoc}`;

/**
 * __useAdminFindManyUsersQuery__
 *
 * To run a query within a React component, call `useAdminFindManyUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminFindManyUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminFindManyUsersQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      distinct: // value for 'distinct'
 *      orderBy: // value for 'orderBy'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useAdminFindManyUsersQuery(baseOptions?: Apollo.QueryHookOptions<AdminFindManyUsersQuery, AdminFindManyUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdminFindManyUsersQuery, AdminFindManyUsersQueryVariables>(AdminFindManyUsersDocument, options);
      }
export function useAdminFindManyUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminFindManyUsersQuery, AdminFindManyUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdminFindManyUsersQuery, AdminFindManyUsersQueryVariables>(AdminFindManyUsersDocument, options);
        }
export type AdminFindManyUsersQueryHookResult = ReturnType<typeof useAdminFindManyUsersQuery>;
export type AdminFindManyUsersLazyQueryHookResult = ReturnType<typeof useAdminFindManyUsersLazyQuery>;
export type AdminFindManyUsersQueryResult = Apollo.QueryResult<AdminFindManyUsersQuery, AdminFindManyUsersQueryVariables>;
export const AdminCountUserDocument = gql`
    query adminCountUser($cursor: UserWhereUniqueInput, $distinct: [UserScalarFieldEnum!], $orderBy: [UserOrderByWithRelationAndSearchRelevanceInput!], $skip: Int, $take: Int, $where: UserWhereInput) {
  adminCountUser(
    cursor: $cursor
    distinct: $distinct
    orderBy: $orderBy
    skip: $skip
    take: $take
    where: $where
  )
}
    `;

/**
 * __useAdminCountUserQuery__
 *
 * To run a query within a React component, call `useAdminCountUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminCountUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminCountUserQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      distinct: // value for 'distinct'
 *      orderBy: // value for 'orderBy'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useAdminCountUserQuery(baseOptions?: Apollo.QueryHookOptions<AdminCountUserQuery, AdminCountUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdminCountUserQuery, AdminCountUserQueryVariables>(AdminCountUserDocument, options);
      }
export function useAdminCountUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminCountUserQuery, AdminCountUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdminCountUserQuery, AdminCountUserQueryVariables>(AdminCountUserDocument, options);
        }
export type AdminCountUserQueryHookResult = ReturnType<typeof useAdminCountUserQuery>;
export type AdminCountUserLazyQueryHookResult = ReturnType<typeof useAdminCountUserLazyQuery>;
export type AdminCountUserQueryResult = Apollo.QueryResult<AdminCountUserQuery, AdminCountUserQueryVariables>;

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    
export const namedOperations = {
  Query: {
    findManyAvatarAssetCatalog: 'findManyAvatarAssetCatalog',
    findManyAvatarAssetCategory: 'findManyAvatarAssetCategory',
    findUniqueAvatarAssetCategory: 'findUniqueAvatarAssetCategory',
    findUniqueAvatarAssetCatalog: 'findUniqueAvatarAssetCatalog',
    AvatarAssetCatalogCount: 'AvatarAssetCatalogCount',
    allCatalogOptions: 'allCatalogOptions',
    findOneNormalAvatarAsset: 'findOneNormalAvatarAsset',
    findOneSkinAvatarAsset: 'findOneSkinAvatarAsset',
    findOneHairAvatarAsset: 'findOneHairAvatarAsset',
    findManyChallenges: 'findManyChallenges',
    findOneChallenge: 'findOneChallenge',
    adminCountChallenge: 'adminCountChallenge',
    findChallengeComments: 'findChallengeComments',
    findManyCheckpoints: 'findManyCheckpoints',
    findManyCourses: 'findManyCourses',
    adminCountCourse: 'adminCountCourse',
    findUniqueCourse: 'findUniqueCourse',
    findAllPost: 'findAllPost',
    findAllCategories: 'findAllCategories',
    findUniquePost: 'findUniquePost',
    countForumPosts: 'countForumPosts',
    me: 'me',
    child: 'child',
    teacher: 'teacher',
    student: 'student',
    parentReport: 'parentReport',
    childReport: 'childReport',
    teacherReport: 'teacherReport',
    adminFindUniqueUser: 'adminFindUniqueUser',
    adminFindManyUsers: 'adminFindManyUsers',
    adminCountUser: 'adminCountUser'
  },
  Mutation: {
    login: 'login',
    loginStudent: 'loginStudent',
    signup: 'signup',
    addChild: 'addChild',
    forgotPassword: 'forgotPassword',
    resetPassword: 'resetPassword',
    adminLoginAs: 'adminLoginAs',
    createAvatarAssetCatalog: 'createAvatarAssetCatalog',
    updateAvatarAssetCatalog: 'updateAvatarAssetCatalog',
    deleteAvatarAssetCatalog: 'deleteAvatarAssetCatalog',
    uploadAvatarAsset: 'uploadAvatarAsset',
    deleteNormalAvatarAsset: 'deleteNormalAvatarAsset',
    deleteHairAvatarAsset: 'deleteHairAvatarAsset',
    deleteSkinAvatarAsset: 'deleteSkinAvatarAsset',
    editNormalAvatarAsset: 'editNormalAvatarAsset',
    editSkinAvatarAsset: 'editSkinAvatarAsset',
    editHairAvatarAsset: 'editHairAvatarAsset',
    deleteChallengeComment: 'deleteChallengeComment',
    updateCourse: 'updateCourse',
    uploadCourseAsset: 'uploadCourseAsset',
    adminDeleteCourse: 'adminDeleteCourse',
    createPost: 'createPost',
    deletePost: 'deletePost',
    updatePost: 'updatePost',
    adminUpdateChild: 'adminUpdateChild',
    removeChild: 'removeChild',
    changeParentPassword: 'changeParentPassword',
    changeTeacherPassword: 'changeTeacherPassword',
    updateTeacher: 'updateTeacher',
    adminUpdateUser: 'adminUpdateUser',
    deleteUser: 'deleteUser',
    createUser: 'createUser',
    adminUploadTeacherProfile: 'adminUploadTeacherProfile',
    adminChangePassword: 'adminChangePassword',
    adminAddChild: 'adminAddChild'
  },
  Fragment: {
    courseData: 'courseData',
    basicCheckpointData: 'basicCheckpointData',
    checkpointData: 'checkpointData',
    blockData: 'blockData',
    assetData: 'assetData',
    userField: 'userField',
    parentField: 'parentField',
    teacherField: 'teacherField',
    studentField: 'studentField',
    checkpointField: 'checkpointField',
    courseField: 'courseField',
    avatarAssetColour: 'avatarAssetColour',
    hairAvatarAsset: 'hairAvatarAsset',
    skinAvatarAsset: 'skinAvatarAsset',
    normalAvatarAsset: 'normalAvatarAsset',
    newUserAvatar: 'newUserAvatar'
  }
}