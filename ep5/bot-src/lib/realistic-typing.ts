import { ElementHandle } from 'puppeteer';

type Realism = 'TYPO' | 'CLEARALL';
type Options = {
  minimumDelay?: number;
  maximumDelay?: number;
  minimumTypos?: number;
  maximumTypos?: number;
};

const TypeRealistic = async (
  elementHandle: ElementHandle,
  input: string,
  options?: Options
) => {
  const realismType: Realism =
    Math.round(Math.random()) == 0 ? 'TYPO' : 'CLEARALL';
  const defaultOptions: Options = {
    minimumDelay: 25,
    maximumDelay: 125,
    minimumTypos: 1,
    maximumTypos: 1,
  };
  if (options.maximumTypos > input.length)
    options.maximumTypos = input.length - 1;
  const combinedOptions = Object.assign(defaultOptions, options);

  let typoIndexes: number[] = [];
  const numberOfTypos =
    Math.floor(Math.random() * combinedOptions.maximumTypos) +
    combinedOptions.minimumTypos;
  for (let i = 0; i < numberOfTypos; i++) {
    typoIndexes.push(Math.floor(Math.random() * (input.length - 1)));
  }

  for (let i = 0; i < input.length; i++) {
    if (typoIndexes.includes(i)) {
      switch (realismType) {
        case 'TYPO':
          await elementHandle.type(Math.random().toString(36).slice(2, 3), {
            delay: computeDelay(combinedOptions),
          });
          await elementHandle.press('Backspace', {
            delay: computeDelay(combinedOptions),
          });
          await elementHandle.type(input[i], {
            delay: computeDelay(combinedOptions),
          });
          break;
        case 'CLEARALL':
          for (let j = 0; j < i; j++) {
            await elementHandle.press('Backspace', {
              delay: Math.floor(Math.random() * 50) + 25,
            });
          }
          typoIndexes = [];
          i = -1;
          break;
        default:
          await elementHandle.type(Math.random().toString(36).slice(2, 3), {
            delay: computeDelay(combinedOptions),
          });
          break;
      }
    } else {
      await elementHandle.type(input[i], {
        delay: computeDelay(combinedOptions),
      });
    }
  }
};

const computeDelay = (options: Options) => {
  return (
    Math.floor(Math.random() * options.maximumDelay) + options.minimumDelay
  );
};

export default TypeRealistic;
