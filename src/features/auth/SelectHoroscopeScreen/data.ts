import { fbt } from 'fbt';

export const DEFAULT_YEAR = 2020;

export default [
  {
    icon: require('./assets/aries.png'),
    name: () => fbt('Aries', 'horoscope name'),
    start: new Date(DEFAULT_YEAR, 2, 21),
    end: new Date(DEFAULT_YEAR, 3, 19),
  },
  {
    icon: require('./assets/taurus.png'),
    name: () => fbt('Taurus', 'horoscope name'),
    start: new Date(DEFAULT_YEAR, 3, 20),
    end: new Date(DEFAULT_YEAR, 4, 20),
  },
  {
    icon: require('./assets/gemini.png'),
    name: () => fbt('Gemini', 'horoscope name'),
    start: new Date(DEFAULT_YEAR, 4, 21),
    end: new Date(DEFAULT_YEAR, 5, 20),
  },
  {
    icon: require('./assets/cancer.png'),
    name: () => fbt('Cancer', 'horoscope name'),
    start: new Date(DEFAULT_YEAR, 5, 21),
    end: new Date(DEFAULT_YEAR, 6, 22),
  },
  {
    icon: require('./assets/leo.png'),
    name: () => fbt('Leo', 'horoscope name'),
    start: new Date(DEFAULT_YEAR, 6, 23),
    end: new Date(DEFAULT_YEAR, 7, 22),
  },
  {
    icon: require('./assets/virgo.png'),
    name: () => fbt('Virgo', 'horoscope name'),
    start: new Date(DEFAULT_YEAR, 7, 23),
    end: new Date(DEFAULT_YEAR, 8, 22),
  },
  {
    icon: require('./assets/libra.png'),
    name: () => fbt('Libra', 'horoscope name'),
    start: new Date(DEFAULT_YEAR, 8, 23),
    end: new Date(DEFAULT_YEAR, 9, 22),
  },
  {
    icon: require('./assets/scorpio.png'),
    name: () => fbt('Scorpio', 'horoscope name'),
    start: new Date(DEFAULT_YEAR, 9, 23),
    end: new Date(DEFAULT_YEAR, 10, 21),
  },
  {
    icon: require('./assets/saggitarius.png'),
    name: () => fbt('Saggitarius', 'horoscope name'),
    start: new Date(DEFAULT_YEAR, 10, 22),
    end: new Date(DEFAULT_YEAR, 11, 21),
  },
  {
    icon: require('./assets/capricorn.png'),
    name: () => fbt('Capricorn', 'horoscope name'),
    start: new Date(DEFAULT_YEAR, 11, 22),
    end: new Date(DEFAULT_YEAR, 12, 19),
  },
  {
    icon: require('./assets/aquarius.png'),
    name: () => fbt('Aquarius', 'horoscope name'),
    start: new Date(DEFAULT_YEAR, 12, 20),
    end: new Date(DEFAULT_YEAR, 13, 18),
  },
  {
    icon: require('./assets/pisces.png'),
    name: () => fbt('Pisces', 'horoscope name'),
    start: new Date(DEFAULT_YEAR, 13, 14),
    end: new Date(DEFAULT_YEAR, 14, 20),
  },
];
