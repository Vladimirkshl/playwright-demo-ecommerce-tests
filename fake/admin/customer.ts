import { IAddress } from '@constants/geo/address';
import { Country, MAP_COUNTRY_STATE } from '@constants/geo/geo';
import { ICustomer } from '@constants/solomono/order';
import { FakeSimple } from '@fake/fake-simple';
import { Utils } from '@utils/utils';

export const getFakeCustomer = (): ICustomer => {
  return {
    firstName: FakeSimple.firstName(),
    lastName: FakeSimple.lastName(),
    email: FakeSimple.email(),
    phoneNumber: FakeSimple.phoneNumber(),
    address: getFakeAddress(),
  };
};

// TODO: replace the function
const getFakeAddress = (): IAddress => {
  const country = Utils.getRandomValue(Country);
  const states = MAP_COUNTRY_STATE[country];

  return {
    streetAddress: FakeSimple.streetAddress(),
    city: FakeSimple.city(),
    state: states ? Utils.getRandomMember(states) : FakeSimple.state(),
    zipCode: FakeSimple.zipCode(),
    country,
  };
};
