/*
* users-User database
*/

const users = new Map();

users.set('luis', { name: "Luis Martinez",
		    address: "8672 E Young Ave, Parlier, CA 93648",
		    battery: 10.0,
		    reserve: 2.0,
                    ppaRate: 0.23,
		    userNumber: 1,
		    pastDueMonths: 1
});
users.set('chauncy', { name: "Chauncy Laubach",
		       address: "8561 S Smyrna Ave, Parlier, CA 93648",
		       battery: 15.0,
		       reserve: 2.5,
                       ppaRate: 0.23,
		       userNumber: 2,
		       pastDueMonths: 0
		     });
users.set('angel', { name: "Angel Ramon",
		     address: "8580 S Wrico Ave, Parlier, CA 93648",
		     battery: 15.0,
		     reserve: 3.0,
		     ppaRate: 0.23,
		     userNumber: 3,
		     pastDueMonths: 0
});

users.set('stephen', { name: 'Stephen Honikman',
		       adminUser: true
});


/*
 * selected: Shared object for passing selected user between modules.
 */



module.exports = { selected: null, users: users };

