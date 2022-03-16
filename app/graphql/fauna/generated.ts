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
  updatePizza?: Maybe<Pizza>;
  partialUpdatePizza?: Maybe<Pizza>;
  partialUpdateTodo?: Maybe<Todo>;
  deletePizza?: Maybe<Pizza>;
  deletePeople?: Maybe<People>;
  deleteTodo?: Maybe<Todo>;
  updatePeople?: Maybe<People>;
  partialUpdatePeople?: Maybe<People>;
  createPizza: Pizza;
  updateTodo?: Maybe<Todo>;
};


export type MutationCreateTodoArgs = {
  data: TodoInput;
};


export type MutationCreatePeopleArgs = {
  data: PeopleInput;
};


export type MutationUpdatePizzaArgs = {
  id: Scalars['ID'];
  data: PizzaInput;
};


export type MutationPartialUpdatePizzaArgs = {
  id: Scalars['ID'];
  data: PartialUpdatePizzaInput;
};


export type MutationPartialUpdateTodoArgs = {
  id: Scalars['ID'];
  data: PartialUpdateTodoInput;
};


export type MutationDeletePizzaArgs = {
  id: Scalars['ID'];
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


export type MutationCreatePizzaArgs = {
  data: PizzaInput;
};


export type MutationUpdateTodoArgs = {
  id: Scalars['ID'];
  data: TodoInput;
};

export type PartialUpdatePeopleInput = {
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
};

export type PartialUpdatePizzaInput = {
  base?: InputMaybe<Scalars['String']>;
  toppings?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
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

export type Pizza = {
  __typename?: 'Pizza';
  _id: Scalars['ID'];
  _ts: Scalars['Long'];
  base?: Maybe<Scalars['String']>;
  toppings?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type PizzaInput = {
  base?: InputMaybe<Scalars['String']>;
  toppings?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type PizzaPage = {
  __typename?: 'PizzaPage';
  data: Array<Maybe<Pizza>>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  allPeople: PeoplePage;
  allTodos: TodoPage;
  findPizzaByID?: Maybe<Pizza>;
  findTodoByID?: Maybe<Todo>;
  allPizza: PizzaPage;
  findPeopleByID?: Maybe<People>;
};


export type QueryAllPeopleArgs = {
  _size?: InputMaybe<Scalars['Int']>;
  _cursor?: InputMaybe<Scalars['String']>;
};


export type QueryAllTodosArgs = {
  _size?: InputMaybe<Scalars['Int']>;
  _cursor?: InputMaybe<Scalars['String']>;
};


export type QueryFindPizzaByIdArgs = {
  id: Scalars['ID'];
};


export type QueryFindTodoByIdArgs = {
  id: Scalars['ID'];
};


export type QueryAllPizzaArgs = {
  _size?: InputMaybe<Scalars['Int']>;
  _cursor?: InputMaybe<Scalars['String']>;
};


export type QueryFindPeopleByIdArgs = {
  id: Scalars['ID'];
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

export type CreatePizzaMutationVariables = Exact<{
  data: PizzaInput;
}>;


export type CreatePizzaMutation = { __typename?: 'Mutation', createPizza: { __typename?: 'Pizza', _id: string } };

export type PartialUpdatePizzaMutationVariables = Exact<{
  id: Scalars['ID'];
  data: PartialUpdatePizzaInput;
}>;


export type PartialUpdatePizzaMutation = { __typename?: 'Mutation', partialUpdatePizza?: { __typename?: 'Pizza', _id: string } | null };

export type FindPizzaByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type FindPizzaByIdQuery = { __typename?: 'Query', findPizzaByID?: { __typename?: 'Pizza', _id: string, base?: string | null, toppings?: Array<string | null> | null } | null };

export type DeletePizzaMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeletePizzaMutation = { __typename?: 'Mutation', deletePizza?: { __typename?: 'Pizza', _id: string } | null };


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
export const CreatePizzaDocument = gql`
    mutation CreatePizza($data: PizzaInput!) {
  createPizza(data: $data) {
    _id
  }
}
    `;
export const PartialUpdatePizzaDocument = gql`
    mutation PartialUpdatePizza($id: ID!, $data: PartialUpdatePizzaInput!) {
  partialUpdatePizza(id: $id, data: $data) {
    _id
  }
}
    `;
export const FindPizzaByIdDocument = gql`
    query FindPizzaByID($id: ID!) {
  findPizzaByID(id: $id) {
    _id
    base
    toppings
  }
}
    `;
export const DeletePizzaDocument = gql`
    mutation DeletePizza($id: ID!) {
  deletePizza(id: $id) {
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
    },
    CreatePizza(variables: CreatePizzaMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreatePizzaMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreatePizzaMutation>(CreatePizzaDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreatePizza');
    },
    PartialUpdatePizza(variables: PartialUpdatePizzaMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PartialUpdatePizzaMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<PartialUpdatePizzaMutation>(PartialUpdatePizzaDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'PartialUpdatePizza');
    },
    FindPizzaByID(variables: FindPizzaByIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<FindPizzaByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FindPizzaByIdQuery>(FindPizzaByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'FindPizzaByID');
    },
    DeletePizza(variables: DeletePizzaMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeletePizzaMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeletePizzaMutation>(DeletePizzaDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeletePizza');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;