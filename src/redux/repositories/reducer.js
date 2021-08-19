import { createReducer } from '@reduxjs/toolkit';

import {
  actionAddRepository,
  actionRemoveRepository,
  actionUpdateRepository,
  actionSortRepository,
  actionGetRepository,
} from './actions.js';

const initialState = { repositoriesHome: [] };

const reducerRepositories = createReducer(initialState, {
  [actionAddRepository]: (state, { payload }) => {
    const repositoryAdd = [...state, payload];
    return repositoryAdd;
  },

  [actionRemoveRepository]: (state, { payload }) => {
    const repositoryRemove = [
      ...state.filter(repository => repository.id !== payload),
    ];
    return repositoryRemove;
  },

  [actionUpdateRepository]: (state, { payload }) => {
    let index;
    state.repositoriesHome.find((repository, i) => {
      if (repository.id === payload) index = i;
    });
    const repositories = JSON.parse(JSON.stringify(state));
    repositories.repositoriesHome[index]['selected'] = !repositories
      .repositoriesHome[index]['selected'];
    return repositories;
  },

  [actionSortRepository]: (_, { payload }) => {
    return { repositoriesHome: payload };
  },

  [actionGetRepository]: (state, { payload }) => {
    if (state.repositoriesHome.length === 0)
      return { repositoriesHome: [{ ...payload, selected: false }] };

    const repositories = state.repositoriesHome.map(repository => {
      if (repository.id === payload.id)
        return { ...payload, selected: repository.selected };

      return { ...repository, selected: false };
    });

    return { repositoriesHome: repositories };
  },
});

export default reducerRepositories;
