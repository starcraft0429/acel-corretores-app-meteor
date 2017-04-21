// ========================================================================================= //
// BrokersManager API configurations
// ========================================================================================= //

const BROKERS_MANAGER_API_URL = `${process.env.BROKERS_MANAGER_API_URL || `http://dev-tomcat.sciensa.click:8081`}`;
const BROJERS_MANAGER_API_SRV = '/brokersmanager/service/brokerscontacts/';
const BROKERS_MANAGER_API_ENDPOINT = BROKERS_MANAGER_API_URL + BROJERS_MANAGER_API_SRV;
const BROKERS_MANAGER_API_TIMEOUT = 1800;

Meteor.methods({

	/**
	 * FIXME: Fix tomcat accepted headers
	 * Create broker - {API}/createbroker
	 * @param brokerId (int) ?
	 * @param brokerName (string) ?
	 * @response 200: true / 500: throw error
 	 */
	'uploads.setBroker': function () {
		const userId = this.userId;
		if (!userId)
			throw new Meteor.Error('400', ErrorMsgs.userNotFound);

		const user = Meteor.users.findOne(userId);
		const brokerId = (((user || {}).services || {}).facebook || {}).id;
		const brokerName = user.profile.name || '';
		const url = BROKERS_MANAGER_API_ENDPOINT + 'createbroker';
		let response = '';

		if(!brokerId)
			throw new Meteor.Error('500', ErrorMsgs.userWithoutFacebook);

		try {
			console.log('uploads.setBroker', url, brokerId, brokerName);
			response = HTTP.post(
				url,
				{ params: { brokerId: brokerId, brokerName: brokerName } },
			);
		}
		catch (e) {
			console.log(e);
			throw new Meteor.Error('500', ErrorMsgs.APIError);
		}

		if(response) {
			return true;
		}
	},

	'uploads.customerInsert': function(customers) {
		const userId = this.userId;
		if (!userId)
			throw new Meteor.Error('400', ErrorMsgs.userNotFound);

			return customers.map(customer => {
				let customerQuery = { name: customer.name, surname: customer.surname, originId: customer.originId };
				if (!Customers.findOne(customerQuery)) {
					return Customers.insert(customer);
				} else {
					return Customers.upsert(customer, customer);
				}
			});
	}

});
