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
  updateTodo?: Maybe<Todo>;
  deleteTodo?: Maybe<Todo>;
  partialUpdateTodo?: Maybe<Todo>;
};


export type MutationCreateTodoArgs = {
  data: TodoInput;
};


export type MutationUpdateTodoArgs = {
  id: Scalars['ID'];
  data: TodoInput;
};


export type MutationDeleteTodoArgs = {
  id: Scalars['ID'];
};


export type MutationPartialUpdateTodoArgs = {
  id: Scalars['ID'];
  data: PartialUpdateTodoInput;
};

export type PartialUpdateTodoInput = {
  task?: InputMaybe<Scalars['String']>;
  completed?: InputMaybe<Scalars['Boolean']>;
};

export type Query = {
  __typename?: 'Query';
  findTodoByID?: Maybe<Todo>;
  allTodos: TodoPage;
};


export type QueryFindTodoByIdArgs = {
  id: Scalars['ID'];
};


export type QueryAllTodosArgs = {
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

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    AllTodos(variables?: AllTodosQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AllTodosQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AllTodosQuery>(AllTodosDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AllTodos');
    },
    CreateTodo(variables: CreateTodoMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateTodoMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateTodoMutation>(CreateTodoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateTodo');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;