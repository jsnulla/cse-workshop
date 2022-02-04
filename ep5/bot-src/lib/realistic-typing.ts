import { ElementHandle } from 'puppeteer';

type Realism = 'TYPO' | 'CLEARALL';

const TypeRealistic = async (
  elementHandle: ElementHandle,
  input: string,
  minDelay: number = 25,
  maxDelay: number = 150
) => {
  const realismType: Realism =
    Math.round(Math.random()) == 0 ? 'TYPO' : 'CLEARALL';
  let typoIndex = Math.floor(Math.random() * (input.length - 1));

  for (let i = 0; i < input.length; i++) {
    const realisticDelay = Math.floor(Math.random() * maxDelay) + minDelay;

    if (i == typoIndex) {
      if (realismType === 'TYPO') {
        await elementHandle.type(Math.random().toString(36).slice(2, 3), {
          delay: realisticDelay,
        });
        await elementHandle.press('Backspace', { delay: realisticDelay });
        await elementHandle.type(input[i], {
          delay: realisticDelay,
        });
      } else if (realismType === 'CLEARALL') {
        for (let j = 0; j < i; j++) {
          await elementHandle.press('Backspace', { delay: realisticDelay });
        }
        typoIndex = -1;
        i = 0;
      }
    } else {
      await elementHandle.type(input[i], {
        delay: realisticDelay,
      });
    }
  }
};

export default TypeRealistic;
