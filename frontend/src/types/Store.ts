import { AuthStore } from "./Auth";
import { BaseStore } from "./BaseStore";
import { CatalogStore } from "./Catalog";
import { ProgressStore } from "./Progress";

export interface ZustandStore
  extends AuthStore,
    ProgressStore,
    BaseStore,
    CatalogStore {
  onboarding: boolean;
  onboardStep: number;
  setOnboarding: (onboarding: boolean) => void;
  setOnboardStep: (onboardStep: number) => void;
}
