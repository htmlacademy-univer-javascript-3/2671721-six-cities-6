import { City, SortingType } from '../../common/types/app.ts';
import { OffersState } from './offers-reducer.ts';
import {
  getActiveCity,
  getActiveSortingType,
  getIsLoading,
  getActivePlaceCardId,
  getOfferId,
  getOfferData,
  getNearbyOffers,
  getPlaceCards,
  getCurrentOffer,
  selectActiveCity,
  selectPlaceCards,
  selectActiveSortingType,
  selectIsLoading,
  selectActivePlaceCardId,
  selectOfferId,
  selectOfferData,
  selectNearbyOffers,
  selectFavoritePlaceCards,
  getFavoritePlaceCards
} from './offers-selectors.ts';
import { mockOffer, mockPlaceCard } from '../../common/utils/mocks.ts';
import { Reducer } from '../../common/utils/const.ts';

describe('Offers selectors', () => {
  const mockState: OffersState = {
    activeCity: City.PARIS,
    placeCards: [mockPlaceCard],
    favoritePlaceCards: [mockPlaceCard],
    activeSortingType: SortingType.POPULAR,
    isLoading: false,
    activePlaceCardId: '1',
    offerId: '1',
    offerData: mockOffer,
    nearbyOffers: [mockPlaceCard],
  };

  describe('Simple selectors', () => {
    it('should return active city from state', () => {
      const result = selectActiveCity({ [Reducer.OFFERS]: mockState });
      expect(result).toBe(mockState.activeCity);
    });

    it('should return place cards from state', () => {
      const result = selectPlaceCards({ [Reducer.OFFERS]: mockState });
      expect(result).toEqual(mockState.placeCards);
    });

    it('should return favorite place cards from state', () => {
      const result = selectFavoritePlaceCards({ [Reducer.OFFERS]: mockState });
      expect(result).toEqual(mockState.placeCards);
    });


    it('should return active sorting type from state', () => {
      const result = selectActiveSortingType({ [Reducer.OFFERS]: mockState });
      expect(result).toBe(mockState.activeSortingType);
    });

    it('should return loading status from state', () => {
      const result = selectIsLoading({ [Reducer.OFFERS]: mockState });
      expect(result).toBe(mockState.isLoading);
    });

    it('should return active place card id from state', () => {
      const result = selectActivePlaceCardId({ [Reducer.OFFERS]: mockState });
      expect(result).toBe(mockState.activePlaceCardId);
    });

    it('should return offer id from state', () => {
      const result = selectOfferId({ [Reducer.OFFERS]: mockState });
      expect(result).toBe(mockState.offerId);
    });

    it('should return offer data from state', () => {
      const result = selectOfferData({ [Reducer.OFFERS]: mockState });
      expect(result).toEqual(mockState.offerData);
    });

    it('should return nearby offers from state', () => {
      const result = selectNearbyOffers({ [Reducer.OFFERS]: mockState });
      expect(result).toEqual(mockState.nearbyOffers);
    });
  });

  describe('CreateSelector selectors', () => {
    it('should return active city using createSelector', () => {
      const result = getActiveCity({ [Reducer.OFFERS]: mockState });
      expect(result).toBe(mockState.activeCity);
    });

    it('should return place cards using createSelector', () => {
      const result = getPlaceCards({ [Reducer.OFFERS]: mockState });
      expect(result).toEqual(mockState.placeCards);
    });

    it('should return favorite place cards using createSelector', () => {
      const result = getFavoritePlaceCards({ [Reducer.OFFERS]: mockState });
      expect(result).toEqual(mockState.placeCards);
    });

    it('should return active sorting type using createSelector', () => {
      const result = getActiveSortingType({ [Reducer.OFFERS]: mockState });
      expect(result).toBe(mockState.activeSortingType);
    });

    it('should return loading status using createSelector', () => {
      const result = getIsLoading({ [Reducer.OFFERS]: mockState });
      expect(result).toBe(mockState.isLoading);
    });

    it('should return active place card id using createSelector', () => {
      const result = getActivePlaceCardId({ [Reducer.OFFERS]: mockState });
      expect(result).toBe(mockState.activePlaceCardId);
    });

    it('should return offer id using createSelector', () => {
      const result = getOfferId({ [Reducer.OFFERS]: mockState });
      expect(result).toBe(mockState.offerId);
    });

    it('should return offer data using createSelector', () => {
      const result = getOfferData({ [Reducer.OFFERS]: mockState });
      expect(result).toEqual(mockState.offerData);
    });

    it('should return nearby offers using createSelector', () => {
      const result = getNearbyOffers({ [Reducer.OFFERS]: mockState });
      expect(result).toEqual(mockState.nearbyOffers);
    });

    it('should return offer data using createSelector', () => {
      const result = getCurrentOffer({ [Reducer.OFFERS]: mockState });
      expect(result).toEqual(mockState.offerData);
    });
  });
});
