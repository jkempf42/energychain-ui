/*
* energyUse-Simulate recording of energy use to blockchain
 */

const energyDB = new Map();

energyDB.set(1,[
    { date: "July 2021",
      consumption: 1353.17,
      gridExport:106.35,
      gridImport:409.75
    },
    { date: "August 2021",
      consumption:1559.52,
      gridExport:85.96,
      gridImport:531.84
    },
    { date: "September 2021",
      consumption:2519.83,
      gridExport:270.13,
      gridImport:992.73
    },
    { date: "October 2021",
      consumption:1351.71,
      gridExport:318.32,
      gridImport:711.33
    },
    { date: "November 2021",
      consumption:2530.45,
      gridExport:449.92,
      gridImport:1343.96
    },
    { date: "December 2021",
      consumption:3335.5,
      gridExport:624.62,
      gridImport:1841.72
    },
    { date: "January 2022",
      consumption:1133.27,
      gridExport:211.2,
      gridImport:587.03
    },
    { date: "Feburary 2022",
      consumption:2091.66,
      gridExport:488.83,
      gridImport:1064.78
    },
    { date: "March 2022",
      consumption:3068.94,
      gridExport:841.15,
      gridImport:1520.53
    },
    { date: "April 2022",
      consumption:4196.46,
      gridExport:1278.99,
      gridImport:2068.44
    },
    { date: "May 2022",
      consumption:1226.59,
      gridExport:518.98,
      gridImport:571.57
    },
    { date: "June 2022",
      consumption:2668.49,
      gridExport:776.7,
      gridImport:1228.95
    },
    { date: "July 2022",
      consumption:4018.77,
      gridExport:1061.86,
      gridImport:1829.03
    }]);

energyDB.set(2,[
    { date: "July 2021",
      consumption: 264.5,
      gridExport: 29.64,
      gridImport: 9.34
    },
    { date: "August 2021",
      consumption: 708.88,
      gridExport: 291.17,
      gridImport: 188.89
    },
    { date: "September 2021",
      consumption: 580.98,
      gridExport: 197.21,
      gridImport: 190.62
    },
    { date: "October 2021",
      consumption: 751.59,
      gridExport: 182.7,
      gridImport: 284.17
    },
    { date: "November 2021",
      consumption: 655.15,
      gridExport: 64.26,
      gridImport: 302.95
    },
    { date: "December 2021",
      consumption: 671.44,
      gridExport: 46.24,
      gridImport:452.27
    },
    { date: "January 2022",
      consumption: 967.49,
      gridExport: 140.32,
      gridImport: 473.78
    },
    { date: "Feburary 2022",
      consumption: 535.63,
      gridExport: 160.84,
      gridImport: 181.76
    },
    { date: "March 2022",
      consumption: 574.13,
      gridExport: 221.83,
      gridImport: 172.78
    },
    { date: "April 2022",
      consumption: 557.4,
      gridExport: 289.37,
      gridImport: 136.75
    },
    { date: "May 2022",
      consumption: 710.78,
      gridExport: 317.94,
      gridImport: 189.44
    },
    { date: "June 2022",
      consumption: 537.8,
      gridExport: 277.71,
      gridImport: 84.9
    },
    { date: "July 2022",
      consumption: 383.31,
      gridExport: 182.83,
      gridImport: 47.73
    }]);

energyDB.set(3,[
    { date: "August 2021",
      consumption: 223.92,
      gridExport: 134.95,
      gridImport: 5.49
    },
    { date: "September 2021",
      consumption: 219.95,
      gridExport: 204.73,
      gridImport: 79.48
    },
    { date: "October 2021",
      consumption: 294.82,
      gridExport: 112.83,
      gridImport: 30.77
    },
    { date: "November 2021",
      consumption: 259.88,
      gridExport: 28.84,
      gridImport: 44.37
    },
    { date: "December 2021",
      consumption: 321.5,
      gridExport: 4.09,
      gridImport: 145.49
    },
    { date: "January 2022",
      consumption: 294.54,
      gridExport: 51.7,
      gridImport: 47.73
    },
    { date: "Feburary 2022",
      consumption: 239.87,
      gridExport: 106.86,
      gridImport: 11.06
    },
    { date: "March 2022",
      consumption: 237.72,
      gridExport: 157.82,
      gridImport: 38.47
    },
    { date: "April 2022",
      consumption: 219.77,
      gridExport: 217.75,
      gridImport: 4.45
    },
    { date: "May 2022",
      consumption: 277.29,
      gridExport: 245.38,
      gridImport: 9.49
    },
    { date: "June 2022",
      consumption: 236.35,
      gridExport: 224.68,
      gridImport: 3.24
    },
    { date: "July 2022",
      consumption: 227.89,
      gridExport: 27.24,
      gridImport: 0.04
    }]);

/*
* calculateCost-Calculate cost based on consumption and PPA rate
 */

function calculateCost(con,rate) {
    return (Math.floor(con * rate * 100) / 100);
}

/*
 *getYearlyEnergyCost - Return one year's worth of energy costs on a 
 * monthly basis for user as an array of objects suitable for displaying.
 */

function getYearlyEnergyUsage(user) {

   let ret =[];
   let pastMap = new Map();

    if( !user.adminUser ) {
	let data = energyDB.get(user.userNumber)
	let ppaRate = user.ppaRate;
	let last = data.length - 1;

	/*Get cost data*/
	for( let i = 0; i <= last; i++ ) {
	    let cost = calculateCost(data[i].consumption,ppaRate);

	    ret[i] = { month: data[i].date,
		       cost: cost
	    };
	}

	/*Get past due map*/
	for( let i = user.pastDueMonths; i > 0; i-- ) {
	    pastMap.set(data[last - i].date,ret[i].cost);

	}
    }
    
    return [ret, pastMap];
}

/*
* getCustomerAccountStatus-Return the current customer bill owned and
* an indication if any bill is past due
*/
	   
function getCustomerAccountStatus(users) {

    let status = [];
    let past = new Map();
    let i = 0;

    users.forEach((user, key) => {

	if( !user.adminUser ) {
	    let ppaRate = user.ppaRate;
	    let pastDue = user.pastDueMonths;
	    let data = energyDB.get(user.userNumber);
	    let k = data.length -1;
	    let balance = 0;

	    while ( pastDue >= 0 ) {
		balance = balance + calculateCost(data[k-pastDue].consumption,
						  ppaRate);
		pastDue--;
	    }

	    status[i] = { name: user.name,
			  cost: balance
	    };

	    if( user.pastDueMonths ) {
		past.set(user.name,status[i]);
	    }

	    i++;
	}
    });

    return [status, past];
    
};


/*
 * getEscrowAccountStatus - return the monthly balances of
 * the escrow account. We include an initial endowment to
 * handle any initial customer arreares */

const initialEndowment = 1000.00
const escrowPercent = 0.05

var  monthlyBalance = [
    { date: "July 2021",
      balance: 0,
      pastDue: false
    },	
    { date: "August 2021",
      balance: 0,
      pastDue: false
    },	

    { date: "September 2021",
      balance: 0,
      pastDue: false
    },	

    { date: "October 2021",
      balance: 0,
      pastDue: false
    },	

    { date: "November 2021",
      balance: 0,
      pastDue: false
    },	

    { date: "December 2021",
      balance: 0,
      pastDue: false
    },	

    { date: "January 2022",
      balance: 0,
      pastDue: false
    },	

    { date: "Feburary 2022",
      balance: 0,
      pastDue: false
    },	

    { date: "March 2022",
      balance: 0,
      pastDue: false
    },	

    { date: "April 2022",
      balance: 0,
      pastDue: false
    },	

    { date: "May 2022",
      balance: 0,
      pastDue: false
    },	

    { date: "June 2022",
      balance: 0,
      pastDue: false
    },	

    { date: "July 2022",
      balance: 0,
      pastDue: false
    }	
];


function getEscrowAccountBalances(users) {

    let userCharges = new Map();
    let pastDueMaps = new Map();
    let ret = [];

    /*Get each user's yearly costs by month and past due map*/

    users.forEach((user, key) => {

	if( !user.adminUser ) {	
	    ret = getYearlyEnergyUsage(user);
	    userCharges.set(key,ret[0]);
	    pastDueMaps.set(key,ret[1]);
	}

    });

     
    /*Go through the year and calculate user's contribution
     * to escrow. Mark any past due months. 
     */
    
    for ( let j = 0; j < monthlyBalance.length; j++) {
	let thisMonth = monthlyBalance[j];

	thisMonth.balance = ( j === 0 ? initialEndowment :
			         monthlyBalance[j-1].balance);

	/*Now go through the users*/

	users.forEach((user, key) => {
	    if( !user.adminUser ) {
		let consumption = userCharges.get(key); 
		let pastDueMap = pastDueMaps.get(key);

		if( j < consumption.length ) {
		    
		    let escrowMonthly = calculateCost(consumption[j].cost,user.ppaRate);
		    /*Determine if the bill is past due*/

		    if( pastDueMap.get(thisMonth.date) ) {
			escrowMonthly = calculateCost(-1,escrowMonthly);
			thisMonth.pastDue = true;
		    } else {
			escrowMonthly = calculateCost(escrowMonthly,escrowPercent);
		    }

		    thisMonth.balance =
			Math.floor((thisMonth.balance + escrowMonthly) * 100) /100;

		}
	    }
	});
    }
					    
    return monthlyBalance;

}

module.exports = { funct01: getYearlyEnergyUsage,
		   funct02: getCustomerAccountStatus,
		   funct03: getEscrowAccountBalances
};


					
