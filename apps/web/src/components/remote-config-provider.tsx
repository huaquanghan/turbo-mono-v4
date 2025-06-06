'use client';
import React from 'react';
import { useRemoteConfig } from '@rp/remote-config/client';

const RemoteConfigContext = React.createContext<Record<string, any> | null>(null);

interface Props {
  appId: string;
  children: React.ReactNode;
}

export function RemoteConfigProvider({ appId, children }: Props) {
  const config = useRemoteConfig(appId);
  return (
    <RemoteConfigContext.Provider value={config}>
      {children}
    </RemoteConfigContext.Provider>
  );
}

export function useRemoteConfigContext() {
  const ctx = React.useContext(RemoteConfigContext);
  if (ctx === null) {
    throw new Error('RemoteConfigProvider is missing');
  }
  return ctx;
}
