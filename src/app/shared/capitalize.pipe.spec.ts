import { CapitalizePipe } from './capitalize.pipe';

describe('Capitalize Pipe', () => {
  const pipe = new CapitalizePipe();

  it('transform single word', () => {
    expect(pipe.transform('kaja')).toBe('Kaja');
  });


  it('transform multi words', () => {
    expect(pipe.transform('kaja mohan')).toBe('Kaja mohan');
  });


});
