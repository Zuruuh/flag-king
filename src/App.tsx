import { type Component, Suspense, For, createEffect } from 'solid-js';
import { createCountriesResource } from './countries';
import { css } from '../styled-system/css';
import Country from './Country';

const App: Component = () => {
  const [countries] = createCountriesResource();

  createEffect(() => console.log(countries()));

  return (
    <Suspense fallback={<span>Loading...</span>}>
      <ul class={css({ display: 'flex', flexWrap: 'wrap', gap: '1' })}>
        <For each={countries()}>
          {(item) => (
            <Country
              name={item.name}
              code={item.code}
              normalizedName={item.normalizedName}
            />
          )}
        </For>
      </ul>
    </Suspense>
  );
};

export default App;
