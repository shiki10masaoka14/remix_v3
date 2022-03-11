import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  Long: any;
  Time: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  createTodo: Todo;
  createPeople: People;
  partialUpdateTodo?: Maybe<Todo>;
  deletePeople?: Maybe<People>;
  deleteTodo?: Maybe<Todo>;
  updatePeople?: Maybe<People>;
  partialUpdatePeople?: Maybe<People>;
  updateTodo?: Maybe<Todo>;
};


export type MutationCreateTodoArgs = {
  data: TodoInput;
};


export type MutationCreatePeopleArgs = {
  data: PeopleInput;
};


export type MutationPartialUpdateTodoArgs = {
  id: Scalars['ID'];
  data: PartialUpdateTodoInput;
};


export type MutationDeletePeopleArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteTodoArgs = {
  id: Scalars['ID'];
};


export type MutationUpdatePeopleArgs = {
  id: Scalars['ID'];
  data: PeopleInput;
};


export type MutationPartialUpdatePeopleArgs = {
  id: Scalars['ID'];
  data: PartialUpdatePeopleInput;
};


export type MutationUpdateTodoArgs = {
  id: Scalars['ID'];
  data: TodoInput;
};

export type PartialUpdatePeopleInput = {
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
};

export type PartialUpdateTodoInput = {
  task?: InputMaybe<Scalars['String']>;
  completed?: InputMaybe<Scalars['Boolean']>;
};

export type People = {
  __typename?: 'People';
  _id: Scalars['ID'];
  _ts: Scalars['Long'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type PeopleInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type PeoplePage = {
  __typename?: 'PeoplePage';
  data: Array<Maybe<People>>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  findTodoByID?: Maybe<Todo>;
  findPeopleByID?: Maybe<People>;
  allTodos: TodoPage;
  allPeople: PeoplePage;
};


export type QueryFindTodoByIdArgs = {
  id: Scalars['ID'];
};


export type QueryFindPeopleByIdArgs = {
  id: Scalars['ID'];
};


export type QueryAllTodosArgs = {
  _size?: InputMaybe<Scalars['Int']>;
  _cursor?: InputMaybe<Scalars['String']>;
};


export type QueryAllPeopleArgs = {
  _size?: InputMaybe<Scalars['Int']>;
  _cursor?: InputMaybe<Scalars['String']>;
};

export type Todo = {
  __typename?: 'Todo';
  _id: Scalars['ID'];
  _ts: Scalars['Long'];
  task: Scalars['String'];
  completed: Scalars['Boolean'];
};

export type TodoInput = {
  task: Scalars['String'];
  completed: Scalars['Boolean'];
};

export type TodoPage = {
  __typename?: 'TodoPage';
  data: Array<Maybe<Todo>>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};

export type AllTodosQueryVariables = Exact<{ [key: string]: never; }>;


export type AllTodosQuery = { __typename?: 'Query', allTodos: { __typename?: 'TodoPage', data: Array<{ __typename?: 'Todo', _id: string, task: string, completed: boolean } | null> } };

export type CreateTodoMutationVariables = Exact<{
  data: TodoInput;
}>;


export type CreateTodoMutation = { __typename?: 'Mutation', createTodo: { __typename?: 'Todo', _id: string, task: string, completed: boolean } };

export type PartialUpdateTodoMutationVariables = Exact<{
  id: Scalars['ID'];
  data: PartialUpdateTodoInput;
}>;


export type PartialUpdateTodoMutation = { __typename?: 'Mutation', partialUpdateTodo?: { __typename?: 'Todo', _id: string, task: string, completed: boolean } | null };

export type DeleteTodoMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteTodoMutation = { __typename?: 'Mutation', deleteTodo?: { __typename?: 'Todo', _id: string } | null };

export type AllPeopleQueryVariables = Exact<{ [key: string]: never; }>;


export type AllPeopleQuery = { __typename?: 'Query', allPeople: { __typename?: 'PeoplePage', data: Array<{ __typename?: 'People', _id: string, firstName: string, lastName: string } | null> } };

export type CreatePeopleMutationVariables = Exact<{
  data: PeopleInput;
}>;


export type CreatePeopleMutation = { __typename?: 'Mutation', createPeople: { __typename?: 'People', _id: string } };

export type DeletePeopleMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeletePeopleMutation = { __typename?: 'Mutation', deletePeople?: { __typename?: 'People', _id: string } | null };


export const AllTodosDocument = gql`
    query AllTodos {
  allTodos {
    data {
      _id
      task
      completed
    }
  }
}
    `;
export const CreateTodoDocument = gql`
    mutation CreateTodo($data: TodoInput!) {
  createTodo(data: $data) {
    _id
    task
    completed
  }
}
    `;
export const PartialUpdateTodoDocument = gql`
    mutation PartialUpdateTodo($id: ID!, $data: PartialUpdateTodoInput!) {
  partialUpdateTodo(id: $id, data: $data) {
    _id
    task
    completed
  }
}
    `;
export const DeleteTodoDocument = gql`
    mutation DeleteTodo($id: ID!) {
  deleteTodo(id: $id) {
    _id
  }
}
    `;
export const AllPeopleDocument = gql`
    query AllPeople {
  allPeople {
    data {
      _id
      firstName
      lastName
    }
  }
}
    `;
export const CreatePeopleDocument = gql`
    mutation CreatePeople($data: PeopleInput!) {
  createPeople(data: $data) {
    _id
  }
}
    `;
export const DeletePeopleDocument = gql`
    mutation DeletePeople($id: ID!) {
  deletePeople(id: $id) {
    _id
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    AllTodos(variables?: AllTodosQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AllTodosQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AllTodosQuery>(AllTodosDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AllTodos');
    },
    CreateTodo(variables: CreateTodoMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateTodoMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateTodoMutation>(CreateTodoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateTodo');
    },
    PartialUpdateTodo(variables: PartialUpdateTodoMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PartialUpdateTodoMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<PartialUpdateTodoMutation>(PartialUpdateTodoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'PartialUpdateTodo');
    },
    DeleteTodo(variables: DeleteTodoMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteTodoMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteTodoMutation>(DeleteTodoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteTodo');
    },
    AllPeople(variables?: AllPeopleQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AllPeopleQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AllPeopleQuery>(AllPeopleDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AllPeople');
    },
    CreatePeople(variables: CreatePeopleMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreatePeopleMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreatePeopleMutation>(CreatePeopleDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreatePeople');
    },
    DeletePeople(variables: DeletePeopleMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeletePeopleMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeletePeopleMutation>(DeletePeopleDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeletePeople');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;