import { City, SortingType } from '../../types/app';
import {
  setActiveCity,
  setActivePlaceCardId,
  setActiveSortingTypeAction,
  setFavoritePlaceCards,
  setFavoriteStatus, setFavoriteStatusError,
  setLoading,
  setNearbyOffers,
  setOfferData, setOfferError,
  setPlaceCards
} from './offers-actions';
import { offersReducer } from './offers-reducer';
import { mockInitialState, mockOffer, mockPlaceCard } from '../../utils/mocks';

describe('Offers Reducer', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = mockInitialState.offers;

    const result = offersReducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      ...mockInitialState.offers,
      placeCards: [],
      favoritePlaceCards: []
    };

    const result = offersReducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set active city with "setActiveCity" action', () => {
    const newCity = City.Amsterdam;
    const expectedState = { ...mockInitialState.offers, activeCity: newCity };

    const result = offersReducer(mockInitialState.offers, setActiveCity(newCity));

    expect(result).toEqual(expectedState);
  });

  it('should set active sorting type with "setActiveSortingTypeAction" action', () => {
    const newSortingType = SortingType.HighToLow;
    const expectedState = { ...mockInitialState.offers, activeSortingType: newSortingType };

    const result = offersReducer(mockInitialState.offers, setActiveSortingTypeAction(newSortingType));

    expect(result).toEqual(expectedState);
  });

  it('should set active place card id with "setActivePlaceCardId" action', () => {
    const placeCardId = 'test-id';
    const expectedState = { ...mockInitialState.offers, activePlaceCardId: placeCardId };

    const result = offersReducer(mockInitialState.offers, setActivePlaceCardId(placeCardId));

    expect(result).toEqual(expectedState);
  });

  it('should set loading status with "setLoading" action', () => {
    const isLoading = true;
    const expectedState = { ...mockInitialState.offers, isLoading };

    const result = offersReducer(mockInitialState.offers, setLoading(isLoading));

    expect(result).toEqual(expectedState);
  });

  it('should set loading status with "setOfferError" action', () => {
    const isError = true;
    const expectedState = { ...mockInitialState.offers, isError };

    const result = offersReducer(mockInitialState.offers, setOfferError(isError));

    expect(result).toEqual(expectedState);
  });

  it('should set loading status with "setFavoriteStatusError" action', () => {
    const isFavoriteStatusError = true;
    const expectedState = { ...mockInitialState.offers, isFavoriteStatusError };

    const result = offersReducer(mockInitialState.offers, setFavoriteStatusError(isFavoriteStatusError));

    expect(result).toEqual(expectedState);
  });

  it('should set place cards with "setPlaceCards" action', () => {
    const placeCards = [mockPlaceCard];
    const expectedState = { ...mockInitialState.offers, placeCards };

    const result = offersReducer(mockInitialState.offers, setPlaceCards(placeCards));

    expect(result).toEqual(expectedState);
  });

  it('should set favorite place cards with "setFavoritePlaceCards" action', () => {
    const favoritePlaceCards = [mockPlaceCard];
    const expectedState = { ...mockInitialState.offers, favoritePlaceCards };

    const result = offersReducer(mockInitialState.offers, setFavoritePlaceCards(favoritePlaceCards));

    expect(result).toEqual(expectedState);
  });

  it('should set offer data with "setOfferData" action', () => {
    const offerData = mockOffer;
    const expectedState = { ...mockInitialState.offers, offerData };

    const result = offersReducer(mockInitialState.offers, setOfferData(offerData));

    expect(result).toEqual(expectedState);
  });

  it('should set nearby offers with "setNearbyOffers" action', () => {
    const nearbyOffers = [mockPlaceCard];
    const expectedState = { ...mockInitialState.offers, nearbyOffers };

    const result = offersReducer(mockInitialState.offers, setNearbyOffers(nearbyOffers));

    expect(result).toEqual(expectedState);
  });

  it('should update favorite status for existing card with "setFavoriteStatus" action', () => {
    const payload = {
      ...mockOffer,
      isFavorite: true,
    };
    const expectedState = {
      ...mockInitialState.offers,
      placeCards: [{
        ...mockPlaceCard,
        isFavorite: true,
      }],
    };

    const result = offersReducer(mockInitialState.offers, setFavoriteStatus(payload));

    expect(result).toEqual(expectedState);
  });
});
