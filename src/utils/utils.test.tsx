import { IPlaceCard, SortingType } from '../types/app';
import { AUTH_TOKEN_KEY_NAME, CITIES, Path, ResponseCode } from './const';
import {
  groupPlaceCardsByCity,
  calculateRatingPercent,
  getDate,
  getSortingFunction,
  getToken,
  saveToken,
  dropToken,
  isResponseCode,
  isPath,
  convertOfferToPlaceCard,
  isValidPassword,
  getRandomCity,
  extractActionsTypes,
} from './utils';
import { mockOffer, mockPlaceCard } from './mocks';
import { Action } from '@reduxjs/toolkit';

describe('Utility Functions', () => {
  describe('groupPlaceCardsByCity', () => {
    it('should group place cards by city name', () => {
      const places: IPlaceCard[] = [
        mockPlaceCard,
        {
          ...mockPlaceCard,
          city: {
            ...mockPlaceCard.city,
            name: 'Cologne',
          }
        },
        mockPlaceCard,
      ];

      const result = groupPlaceCardsByCity(places);

      expect(result).toEqual({
        Paris: [places[0], places[2]],
        Cologne: [places[1]]
      });
    });

    it('should return empty object for empty array', () => {
      const result = groupPlaceCardsByCity([]);
      expect(result).toEqual({});
    });
  });

  describe('calculateRatingPercent', () => {
    it('should calculate correct percentage for rating', () => {
      expect(calculateRatingPercent(5)).toBe(100);
      expect(calculateRatingPercent(4.8)).toBe(100);
      expect(calculateRatingPercent(3)).toBe(60);
      expect(calculateRatingPercent(2.2)).toBe(40);
      expect(calculateRatingPercent(0)).toBe(0);
    });
  });

  describe('getDate', () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2024-01-01T00:00:00Z'));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should format date correctly', () => {
      expect(getDate('2024-03-15')).toBe('March 2024');
      expect(getDate('2024/03/15')).toBe('March 2024');
      expect(getDate('2024-03-15T12:00:00Z')).toBe('March 2024');

    });

    it('should throw error', () => {
      const result = getDate('invalid-date');

      expect(typeof result).toBe('string');
      expect(result).toContain('Invalid Date');
    });
  });

  describe('getSortingFunction', () => {
    const places: IPlaceCard[] = [
      {
        ...mockPlaceCard,
        price: 100,
        rating: 4,
      },
      {
        ...mockPlaceCard,
        price: 200,
        rating: 3
      }
    ];

    it('should return high to low price sorting function', () => {
      const sortFn = getSortingFunction(SortingType.HighToLow);
      const sortedPlaces = [...places].sort(sortFn);

      expect(sortedPlaces[0].price).toBe(200);
      expect(sortedPlaces[1].price).toBe(100);
    });

    it('should return low to high price sorting function', () => {
      const sortFn = getSortingFunction(SortingType.LowToHigh);
      const sortedPlaces = [...places].sort(sortFn);

      expect(sortedPlaces[0].price).toBe(100);
      expect(sortedPlaces[1].price).toBe(200);
    });

    it('should return top rating sorting function', () => {
      const sortFn = getSortingFunction(SortingType.TopRated);
      const sortedPlaces = [...places].sort(sortFn);

      expect(sortedPlaces[0].rating).toBe(4);
      expect(sortedPlaces[1].rating).toBe(3);
    });

    it('should handle empty arrays', () => {
      const sortFn = getSortingFunction(SortingType.HighToLow);
      const sortedPlaces: IPlaceCard[] = [].sort(sortFn);

      expect(sortedPlaces).toEqual([]);
    });
  });

  describe('Token Management Functions', () => {
    const mockToken = 'test-token-123';

    beforeEach(() => {
      localStorage.clear();
    });

    describe('getToken', () => {
      it('should return token from localStorage', () => {
        localStorage.setItem(AUTH_TOKEN_KEY_NAME, mockToken);
        expect(getToken()).toBe(mockToken);
      });

      it('should return empty string when token is not present', () => {
        expect(getToken()).toBe('');
      });

      it('should handle null value from localStorage', () => {
        vi.spyOn(Storage.prototype, 'getItem').mockReturnValueOnce(null);
        expect(getToken()).toBe('');
      });

      it('should handle other AUTH_TOKEN_KEY_NAME values', () => {
        localStorage.setItem('different-key', 'different-token');
        expect(getToken()).toBe('');

        localStorage.setItem(AUTH_TOKEN_KEY_NAME, 'new-token');
        expect(getToken()).toBe('new-token');
      });
    });

    describe('saveToken', () => {
      it('should save token to localStorage', () => {
        saveToken(mockToken);
        expect(localStorage.getItem(AUTH_TOKEN_KEY_NAME)).toBe(mockToken);
      });

      it('should overwrite existing token', () => {
        localStorage.setItem(AUTH_TOKEN_KEY_NAME, 'old-token');
        saveToken(mockToken);
        expect(localStorage.getItem(AUTH_TOKEN_KEY_NAME)).toBe(mockToken);
      });

      it('should handle empty string token', () => {
        saveToken('');
        expect(localStorage.getItem(AUTH_TOKEN_KEY_NAME)).toBe('');
      });

      it('should use correct key name', () => {
        saveToken(mockToken);
        const keys = Object.keys(localStorage);
        expect(keys).toContain(AUTH_TOKEN_KEY_NAME);
        expect(keys.length).toBe(1);
      });
    });

    describe('dropToken', () => {
      it('should remove token from localStorage', () => {
        localStorage.setItem(AUTH_TOKEN_KEY_NAME, mockToken);
        expect(localStorage.getItem(AUTH_TOKEN_KEY_NAME)).toBe(mockToken);

        dropToken();
        expect(localStorage.getItem(AUTH_TOKEN_KEY_NAME)).toBeNull();
      });

      it('should not throw error when token does not exist', () => {
        expect(() => dropToken()).not.toThrow();
      });

      it('should remove only auth token', () => {
        localStorage.setItem(AUTH_TOKEN_KEY_NAME, mockToken);
        localStorage.setItem('other-key', 'other-value');

        dropToken();

        expect(localStorage.getItem(AUTH_TOKEN_KEY_NAME)).toBeNull();
        expect(localStorage.getItem('other-key')).toBe('other-value');
      });
    });
  });

  describe('Type Guard Functions', () => {
    describe('isResponseCode', () => {
      it('should return true for valid ResponseCode values', () => {
        expect(isResponseCode(ResponseCode.Ok)).toBe(true);
        expect(isResponseCode(ResponseCode.Created)).toBe(true);
        expect(isResponseCode(ResponseCode.ServerError)).toBe(true);
        expect(isResponseCode(ResponseCode.Unauthorized)).toBe(true);
        expect(isResponseCode(ResponseCode.InvalidRequest)).toBe(true);
      });

      it('should return false for invalid values', () => {
        expect(isResponseCode(0)).toBe(false);
        expect(isResponseCode(null)).toBe(false);
        expect(isResponseCode('200')).toBe(false);
      });
    });

    describe('isPath', () => {
      it('should return true for valid Path values', () => {
        Object.values(Path).forEach((path) => {
          expect(isPath(path)).toBe(true);
        });
      });

      it('should return false for invalid values', () => {
        expect(isPath('/invalid-path')).toBe(false);
        expect(isPath('')).toBe(false);
        expect(isPath(null)).toBe(false);
      });
    });
  });

  describe('isValidPassword', () => {
    it('should return true for valid Password values', () => {
      expect(isValidPassword('test32')).toBe(true);
    });

    it('should return false for invalid Password values', () => {
      expect(isValidPassword('')).toBe(false);
      expect(isValidPassword('fndsnfidnis')).toBe(false);
      expect(isValidPassword('32442342')).toBe(false);
    });
  });

  describe('convertOfferToPlaceCard', () => {
    it('should correctly convert offer to place card with all properties', () => {
      const result = convertOfferToPlaceCard(mockOffer);

      expect(result).toEqual({
        id: mockOffer.id,
        title: mockOffer.title,
        type: mockOffer.type,
        price: mockOffer.price,
        city: {
          name: mockOffer.city.name,
          location: {
            latitude: mockOffer.city.location.latitude,
            longitude: mockOffer.city.location.longitude,
            zoom: mockOffer.city.location.zoom
          }
        },
        location: {
          latitude: mockOffer.location.latitude,
          longitude: mockOffer.location.longitude,
          zoom: mockOffer.location.zoom
        },
        isFavorite: mockOffer.isFavorite,
        isPremium: mockOffer.isPremium,
        rating: mockOffer.rating,
        previewImage: mockOffer.images[0]
      });
    });
  });

  describe('getRandomCity', () => {
    it('should return one of 6 cities', () => {
      expect(CITIES.includes(getRandomCity())).toBeTruthy();
    });
  });

  describe('extractActionsTypes', () => {
    it('should extract types from array of actions', () => {
      const actions: Action<string>[] = [
        { type: 'ACTION_1' },
        { type: 'ACTION_2' }
      ];

      const result = extractActionsTypes(actions);

      expect(result).toEqual(['ACTION_1', 'ACTION_2']);
    });
  });
});
