import { Sopatizador } from '../sopatizador';
test('Random Letter', () => {
  let sopatizador = new Sopatizador();

  expect(typeof sopatizador.getLetter()).toBe('string');
});

test('Verify Availability ', () => {
  let sopatizador = new Sopatizador();
  let positions: Array<Object> = [
    {
      x: '0',
      y: '0',
    },
    {
      x: '1',
      y: '2',
    },
  ];

  expect(typeof sopatizador.verifyAvailability(positions)).toBe('boolean');
});
