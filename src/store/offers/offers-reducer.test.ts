import { City, SortingType } from '../../common/types/app.ts';
import {
  setActiveCityAction,
  setActivePlaceCardId,
  setActiveSortingTypeAction, setFavoritePlaceCards,
  setFavoriteStatus,
  setLoading,
  setNearbyOffers,
  setOfferData,
  setPlaceCards
} from './offers-actions.ts';
import { offersReducer, OffersState } from './offers-reducer.ts';
import { mockOffer, mockPlaceCard } from '../../common/utils/mocks.ts';

describe('Offers Reducer', () => {
  const initialState: OffersState = {
    activeCity: City.PARIS,
    placeCards: [mockPlaceCard],
    favoritePlaceCards: [mockPlaceCard],
    activeSortingType: SortingType.POPULAR,
    isLoading: false,
    activePlaceCardId: null,
    offerId: null,
    offerData: null,
    nearbyOffers: [],
  };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = initialState;

    const result = offersReducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      ...initialState,
      placeCards: [],
      favoritePlaceCards: []
    };

    const result = offersReducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set active city with "setActiveCityAction" action', () => {
    const newCity = City.AMSTERDAM;
    const expectedState = { ...initialState, activeCity: newCity };

    const result = offersReducer(initialState, setActiveCityAction(newCity));

    expect(result).toEqual(expectedState);
  });

  it('should set active sorting type with "setActiveSortingTypeAction" action', () => {
    const newSortingType = SortingType.HIGH_TO_LOW;
    const expectedState = { ...initialState, activeSortingType: newSortingType };

    const result = offersReducer(initialState, setActiveSortingTypeAction(newSortingType));

    expect(result).toEqual(expectedState);
  });

  it('should set active place card id with "setActivePlaceCardId" action', () => {
    const placeCardId = 'test-id';
    const expectedState = { ...initialState, activePlaceCardId: placeCardId };

    const result = offersReducer(initialState, setActivePlaceCardId(placeCardId));

    expect(result).toEqual(expectedState);
  });

  it('should set loading status with "setLoading" action', () => {
    const isLoading = true;
    const expectedState = { ...initialState, isLoading };

    const result = offersReducer(initialState, setLoading(isLoading));

    expect(result).toEqual(expectedState);
  });

  it('should set place cards with "setPlaceCards" action', () => {
    const placeCards = [mockPlaceCard];
    const expectedState = { ...initialState, placeCards };

    const result = offersReducer(initialState, setPlaceCards(placeCards));

    expect(result).toEqual(expectedState);
  });

  it('should set favorite place cards with "setFavoritePlaceCards" action', () => {
    const placeCards = [mockPlaceCard];
    const expectedState = { ...initialState, placeCards };

    const result = offersReducer(initialState, setFavoritePlaceCards(placeCards));

    expect(result).toEqual(expectedState);
  });

  it('should set offer data with "setOfferData" action', () => {
    const offerData = mockOffer;
    const expectedState = { ...initialState, offerData };

    const result = offersReducer(initialState, setOfferData(offerData));

    expect(result).toEqual(expectedState);
  });

  it('should set nearby offers with "setNearbyOffers" action', () => {
    const nearbyOffers = [mockPlaceCard];
    const expectedState = { ...initialState, nearbyOffers };

    const result = offersReducer(initialState, setNearbyOffers(nearbyOffers));

    expect(result).toEqual(expectedState);
  });

  it('should update favorite status for existing card with "setFavoriteStatus" action', () => {
    const payload = {
      ...mockOffer,
      isFavorite: true,
    };
    const expectedState = {
      ...initialState,
      placeCards: [{
        ...mockPlaceCard,
        isFavorite: true,
      }],
    };

    const result = offersReducer(initialState, setFavoriteStatus(payload));

    expect(result).toEqual(expectedState);
  });
});
