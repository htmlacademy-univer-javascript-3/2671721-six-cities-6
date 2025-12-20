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
  getFavoritePlaceCards,
  selectIsError,
  selectIsFavoriteStatusError,
  getIsFavoriteStatusError,
  getIsError
} from './offers-selectors';
import { mockInitialState } from '../../utils/mocks';
import { Reducer } from '../../utils/const';

describe('Offers selectors', () => {
  describe('Simple selectors', () => {
    it('should return active city from state', () => {
      const result = selectActiveCity({ [Reducer.Offers]: mockInitialState.offers });
      expect(result).toBe(mockInitialState.offers.activeCity);
    });

    it('should return place cards from state', () => {
      const result = selectPlaceCards({ [Reducer.Offers]: mockInitialState.offers });
      expect(result).toEqual(mockInitialState.offers.placeCards);
    });

    it('should return favorite place cards from state', () => {
      const result = selectFavoritePlaceCards({ [Reducer.Offers]: mockInitialState.offers });
      expect(result).toEqual(mockInitialState.offers.placeCards);
    });


    it('should return active sorting type from state', () => {
      const result = selectActiveSortingType({ [Reducer.Offers]: mockInitialState.offers });
      expect(result).toBe(mockInitialState.offers.activeSortingType);
    });

    it('should return loading status from state', () => {
      const result = selectIsLoading({ [Reducer.Offers]: mockInitialState.offers });
      expect(result).toBe(mockInitialState.offers.isLoading);
    });

    it('should return error status from state', () => {
      const result = selectIsError({ [Reducer.Offers]: mockInitialState.offers });
      expect(result).toBe(mockInitialState.offers.isError);
    });

    it('should return error favorite status from state', () => {
      const result = selectIsFavoriteStatusError({ [Reducer.Offers]: mockInitialState.offers });
      expect(result).toBe(mockInitialState.offers.isFavoriteStatusError);
    });

    it('should return active place card id from state', () => {
      const result = selectActivePlaceCardId({ [Reducer.Offers]: mockInitialState.offers });
      expect(result).toBe(mockInitialState.offers.activePlaceCardId);
    });

    it('should return offer id from state', () => {
      const result = selectOfferId({ [Reducer.Offers]: mockInitialState.offers });
      expect(result).toBe(mockInitialState.offers.offerId);
    });

    it('should return offer data from state', () => {
      const result = selectOfferData({ [Reducer.Offers]: mockInitialState.offers });
      expect(result).toEqual(mockInitialState.offers.offerData);
    });

    it('should return nearby offers from state', () => {
      const result = selectNearbyOffers({ [Reducer.Offers]: mockInitialState.offers });
      expect(result).toEqual(mockInitialState.offers.nearbyOffers);
    });
  });

  describe('CreateSelector selectors', () => {
    it('should return active city using createSelector', () => {
      const result = getActiveCity({ [Reducer.Offers]: mockInitialState.offers });
      expect(result).toBe(mockInitialState.offers.activeCity);
    });

    it('should return place cards using createSelector', () => {
      const result = getPlaceCards({ [Reducer.Offers]: mockInitialState.offers });
      expect(result).toEqual(mockInitialState.offers.placeCards);
    });

    it('should return favorite place cards using createSelector', () => {
      const result = getFavoritePlaceCards({ [Reducer.Offers]: mockInitialState.offers });
      expect(result).toEqual(mockInitialState.offers.placeCards);
    });

    it('should return active sorting type using createSelector', () => {
      const result = getActiveSortingType({ [Reducer.Offers]: mockInitialState.offers });
      expect(result).toBe(mockInitialState.offers.activeSortingType);
    });

    it('should return loading status using createSelector', () => {
      const result = getIsLoading({ [Reducer.Offers]: mockInitialState.offers });
      expect(result).toBe(mockInitialState.offers.isLoading);
    });

    it('should return error status using createSelector', () => {
      const result = getIsError({ [Reducer.Offers]: mockInitialState.offers });
      expect(result).toBe(mockInitialState.offers.isError);
    });

    it('should return error favorite status using createSelector', () => {
      const result = getIsFavoriteStatusError({ [Reducer.Offers]: mockInitialState.offers });
      expect(result).toBe(mockInitialState.offers.isFavoriteStatusError);
    });

    it('should return active place card id using createSelector', () => {
      const result = getActivePlaceCardId({ [Reducer.Offers]: mockInitialState.offers });
      expect(result).toBe(mockInitialState.offers.activePlaceCardId);
    });

    it('should return offer id using createSelector', () => {
      const result = getOfferId({ [Reducer.Offers]: mockInitialState.offers });
      expect(result).toBe(mockInitialState.offers.offerId);
    });

    it('should return offer data using createSelector', () => {
      const result = getOfferData({ [Reducer.Offers]: mockInitialState.offers });
      expect(result).toEqual(mockInitialState.offers.offerData);
    });

    it('should return nearby offers using createSelector', () => {
      const result = getNearbyOffers({ [Reducer.Offers]: mockInitialState.offers });
      expect(result).toEqual(mockInitialState.offers.nearbyOffers);
    });

    it('should return offer data using createSelector', () => {
      const result = getCurrentOffer({ [Reducer.Offers]: mockInitialState.offers });
      expect(result).toEqual(mockInitialState.offers.offerData);
    });
  });
});
