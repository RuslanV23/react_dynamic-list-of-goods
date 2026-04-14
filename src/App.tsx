import React, { useState } from 'react';
import './App.scss';
import { GoodsList } from './GoodsList';

import { getAll, get5First, getRedGoods } from './api/goods';
import { Good } from './types/Good';
// or
// import * as goodsAPI from './api/goods';

const filterFunction = {
  All: getAll,
  Fivefirst: get5First,
  Red: getRedGoods,
};

type Filter = 'All' | 'Fivefirst' | 'Red';

export const App: React.FC = () => {
  const [goods, setGoods] = useState<Good[]>([]);
  const [, setFilter] = useState<Filter>('All');

  const handleChangeFilter = (newFilter: Filter) => {
    setFilter(newFilter);
    filterFunction[newFilter]().then(setGoods);
  };

  return (
    <div className="App">
      <h1>Dynamic list of Goods</h1>

      <button
        type="button"
        data-cy="all-button"
        onClick={() => handleChangeFilter('All')}
      >
        Load all goods
      </button>

      <button
        type="button"
        data-cy="first-five-button"
        onClick={() => handleChangeFilter('Fivefirst')}
      >
        Load 5 first goods
      </button>

      <button
        type="button"
        data-cy="red-button"
        onClick={() => handleChangeFilter('Red')}
      >
        Load red goods
      </button>

      <GoodsList goods={goods} />
    </div>
  );
};
