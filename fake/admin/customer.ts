import { IAddress } from '@constants/geo/address';
import { Country, MAP_COUNTRY_STATE } from '@constants/geo/geo';
import { ICustomer, IDifferentBillingAddress } from '@constants/solomono/order';
import { FakeSimple } from '@fake/fake-simple';
import { Utils } from '@utils/utils';

export const getFakeCustomer = (): ICustomer => {
  const firstName = FakeSimple.firstName();
  const lastName = FakeSimple.lastName();
  const differentBillingAddress: IDifferentBillingAddress = 
    FakeSimple.boolean() ? { isDifferentBillingAddress: true, address: Utils.createAddressFull(getFakeAddress()) } : 
      { isDifferentBillingAddress: false }; 

  return {
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
    email: FakeSimple.email(),  
    phoneNumber: FakeSimple.phoneNumber(),
    address: Utils.createAddressFull(getFakeAddress()),
    differentBillingAddress,
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
