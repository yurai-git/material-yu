import { useRuntimeConfig, useState } from '#app';
import type { ModuleOptions } from '../../module';

export const useMaterialYu = () => {
  const config = useRuntimeConfig().public.materialYu as ModuleOptions;
  const myGlobalState = useState('material-yu:my-global-state', () => 'default value');

  const setMyGlobalState = (value: string) => {
    myGlobalState.value = value;
  };

  return {
    config,
    myGlobalState,
    setMyGlobalState,
  };
};
