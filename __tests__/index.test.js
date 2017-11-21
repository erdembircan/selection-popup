const popup = require('../index');

describe('delete-folder', () => {
  it('should export module correctly', () => {
    expect(typeof popup).toBe('function');
  });
});
