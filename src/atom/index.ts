import { atom } from "jotai";
import { LocationType, SearchType, StoreType } from "@/interface";

const DEFAULT_LAT = "37.497625203";
const DEFAULT_LNG = "127.03088379";
const DEFAULT_ZOOM = 3;

const mapState = atom(null);

const currentStoreState = atom<StoreType | null>(null);

const locationState = atom<LocationType>({
  lat: DEFAULT_LAT,
  lng: DEFAULT_LNG,
  zoom: DEFAULT_ZOOM,
});

const searchState = atom<SearchType | null>(null);

export {
  mapState,
  currentStoreState,
  locationState,
  searchState
};