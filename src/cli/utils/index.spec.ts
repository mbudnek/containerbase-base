import { describe, expect, test, vi } from 'vitest';
import { cliMode } from '.';

const procMocks = vi.hoisted(() => ({ argv0: '', env: {} }));
vi.mock('node:process', () => procMocks);

describe('index', () => {
  test('cliMode', async () => {
    expect(cliMode()).toBeNull();
    procMocks.argv0 = 'install-tool';
    expect((await import('.')).cliMode()).toBe('install-tool');
    procMocks.argv0 = 'prepare-tool';
    expect((await import('.')).cliMode()).toBe('prepare-tool');
    procMocks.argv0 = 'containerbase-cli';
    expect((await import('.')).cliMode()).toBe('containerbase-cli');
  });
});