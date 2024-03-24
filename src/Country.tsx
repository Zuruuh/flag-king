import { createEffect, createSignal, type Component } from 'solid-js';
import { css } from '../styled-system/css';
import { normalizeCountryName } from './utils';
import { distance as levenshtein } from 'fastest-levenshtein/mod';
import { clsx } from 'clsx';

export interface CountryProps {
  name: string;
  code: string;
  normalizedName: string;
}

const Country: Component<CountryProps> = (props) => {
  const [guess, setGuess] = createSignal('');
  const normalizedGuess = () => normalizeCountryName(guess());
  const distance = () => levenshtein(normalizedGuess(), props.normalizedName);

  createEffect(() => console.log(normalizedGuess()));
  createEffect(() => console.log(distance()));

  return (
    <li
      class={css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      })}
    >
      <img
        class={css({ height: '180px', padding: 2 })}
        width="280"
        height="180"
        alt=":)"
        data-debug={props.normalizedName}
        src={`https://flagcdn.com/${props.code}.svg`}
      />
      <input
        class={clsx(
          css({
            borderColor: 'black',
            borderWidth: 1,
            width: '70%',
          }),
          distance() === 0 ? css({ color: 'green' }) : '',
          distance() > 0 && distance() <= 2 ? css({ color: 'amber.500' }) : '',
        )}
        oninput={(e) => setGuess(e.target.value)}
        readonly={distance() === 0}
        onfocusout={(e) => {
          if (distance() !== 0) {
            e.target.value = '';
            setGuess('');
          }
        }}
      />
    </li>
  );
};

export default Country;
