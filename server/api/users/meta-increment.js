/**
 * Method Post Routes stack
 */
const postRoutes = Picker.filter(function(req, res) {
	return req.method == "POST";
});

/**
 * User Meta Products endpoint
 * @param modifier (int) (Optional)
 * @return boolean
 */
postRoutes.route('/users/:id/product/:productName/meta-increment/:modifier?', (params, req, res, next) => {
	req.headers = { ...req.headers, 'Content-Type': 'application/json' };

	const _end = res.end;

	//Params check
	if(!params.id && !params.productName) {
		res.statusCode = 400;
		_end.call(res, JSON.stringify({error:'Bad Request'}), encoding, callback);
	}

	const queryUser = {
		$or: [
			{'services.facebook.id': params.id},
			{_id: params.id}
		]
	};

	//Bind Meteor async call @ res.end
	res.end = Meteor.bindEnvironment((data, encoding, callback) => {
		if (Meteor.users.findOne(queryUser)) {

			if (Products.findOne({systemName: params.productName})) {

				Meteor.users.update(
					queryUser,
					{
						$inc: {
							['profile.metas.' + params.productName]: (parseInt(params.modifier) || 1)
						}
					},
					(err, response) => {
						if (response) {
							_end.call(res, JSON.stringify({status: 'ok'}), encoding, callback);
						}
						else {
							res.statusCode = 400;
							_end.call(res, JSON.stringify({error: 'Update Error'}), encoding, callback);
						}
					}
				);
			}
			else {
				res.statusCode = 400;
				_end.call(res, JSON.stringify({error: 'Invalid Product'}), encoding, callback);
			}
		}
		else {
			res.statusCode = 400;
			_end.call(res, JSON.stringify({error:  'Invalid User'}), encoding, callback);
		}
	});

	res.end();
});
