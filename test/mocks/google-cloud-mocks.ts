/**
 * Mock implementations for Google Cloud services
 */
import { vi } from 'vitest';
import { createMockLogEntries, createMockIamPolicy, createMockSpannerSchema } from '../utils/test-helpers.js';

// Mock @google-cloud/logging
export const mockLoggingClient = {
  getEntries: vi.fn().mockResolvedValue([createMockLogEntries(), {}, {}]),
  createSink: vi.fn().mockResolvedValue([{ name: 'test-sink' }]),
  getSinks: vi.fn().mockResolvedValue([[], {}, {}]),
};

vi.mock('@google-cloud/logging', () => ({
  Logging: vi.fn(() => mockLoggingClient),
}));

// Mock @google-cloud/monitoring
export const mockMonitoringClient = {
  listTimeSeries: vi.fn().mockResolvedValue([[], {}, {}]),
  listMetricDescriptors: vi.fn().mockResolvedValue([[], {}, {}]),
  createTimeSeries: vi.fn().mockResolvedValue([{}]),
};

vi.mock('@google-cloud/monitoring', () => ({
  default: { MetricServiceClient: vi.fn(() => mockMonitoringClient) },
  MetricServiceClient: vi.fn(() => mockMonitoringClient),
}));

// Mock @google-cloud/spanner
export const mockSpannerClient = {
  instance: vi.fn(() => ({
    database: vi.fn(() => ({
      run: vi.fn().mockResolvedValue([[], {}]),
      runStream: vi.fn().mockReturnValue({
        on: vi.fn(),
        pipe: vi.fn(),
      }),
      getSchema: vi.fn().mockResolvedValue([createMockSpannerSchema()]),
    })),
  })),
};

vi.mock('@google-cloud/spanner', () => ({
  Spanner: vi.fn(() => mockSpannerClient),
}));

// Mock @google-cloud/resource-manager
export const mockResourceManagerClient = {
  getIamPolicy: vi.fn().mockResolvedValue([createMockIamPolicy()]),
  setIamPolicy: vi.fn().mockResolvedValue([createMockIamPolicy()]),
  testIamPermissions: vi.fn().mockResolvedValue([{ permissions: ['test.permission'] }]),
};

vi.mock('@google-cloud/resource-manager', () => ({
  ProjectsClient: vi.fn(() => mockResourceManagerClient),
}));

// Mock google-auth-library
export const mockAuthClient = {
  getAccessToken: vi.fn().mockResolvedValue({ token: 'mock-token' }),
  getProjectId: vi.fn().mockResolvedValue('test-project'),
  authorize: vi.fn().mockResolvedValue(undefined),
};

vi.mock('google-auth-library', () => ({
  GoogleAuth: vi.fn(() => mockAuthClient),
}));

// Mock @modelcontextprotocol/sdk
export const mockMcpServer = {
  registerTool: vi.fn(),
  resource: vi.fn(),
  prompt: vi.fn(),
  registerPrompt: vi.fn(),
  connect: vi.fn(),
  on: vi.fn(),
  off: vi.fn(),
};

vi.mock('@modelcontextprotocol/sdk/server/mcp.js', () => ({
  McpServer: vi.fn(() => mockMcpServer),
  ResourceTemplate: vi.fn(),
}));

vi.mock('@modelcontextprotocol/sdk/server/stdio.js', () => ({
  StdioServerTransport: vi.fn(),
}));