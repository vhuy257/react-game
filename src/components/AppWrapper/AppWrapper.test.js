import { render, screen } from '@testing-library/react';
import AppWrapper from './AppWrapper';
import { LoadAllGame, LoadJackPost } from '../../service/GameService';

test('render app', () => {
  render(<AppWrapper />);
});

describe('#Load all games using Async', () => {
  it('should load game data', async() => {
    const data = await LoadAllGame();
    expect(data.data).not.toBe(undefined);
  })
})

describe('#Load all jackpots using Async', () => {
  it('should load jackpots data', async() => {
    const data = await LoadJackPost();
    expect(data.data).not.toBe(undefined);
  })
})