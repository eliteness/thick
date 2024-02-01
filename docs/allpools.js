function $(_) {return document.getElementById(_);}
let provider= {};
let signer= {};
let STATE = {
	ts: T_X,
	tb: T_Y
};
let CACHE = {
	oldinp: [,],
	ACTIVEI: 0
}

CHAINDATA = {
	250 : {
		logo: "https://ftm.guru/icons/ftm.svg"
	},
	42161 : {
		logo: "https://ftm.guru/icons/arb1.svg"
	},
	42161 : {
		logo: "https://ftm.guru/icons/base.svg"
	}
}
window.addEventListener('load',async function() {
	//PRE
	pre_stats();
	console.log("waitin for 3 secs..");
	$("cw_m").innerHTML = "Connecting.. Please wait."
	setTimeout(async () => { await basetrip(); }, 3000);
	arf();
}, false);

BL = {
	250:	"0x5a054233e59323e7a58f6b7dae86e6992f1f92e2",
	42161:	"0xc4c807aee35f75c891cb51ef982c98371b1362b4",
	8453:	"0xb62f6095f2afd00702fb79570c9f1aa730510fc4"
}

BUCKETDECIMALS = {
	250: { 0:6, 1:12, 2:6, 3:12 },
	42161: { 0:12, 1:12 },
	8453: { 0:12, 1:12 }
}

MAXORDERBOOKSIZE = 2500;

async function basetrip() {
	//MAIN
	if(!(window.ethereum)){$("cw_m").innerHTML = "Wallet wasn't detected!";console.log("Wallet wasn't detected!");/*notice("<h3>Wallet wasn't detected!</h3>Please make sure that your device and browser have an active Web3 wallet like MetaMask installed and running.<br><br>Visit <a href='https://metamask.io' target='_blank'>metamask.io</a> to install MetaMask wallet.");*/provider = new ethers.providers.JsonRpcProvider(RPC_URL); dexstats();return}
	else if(!Number(window.ethereum.chainId)==CHAINID){$("cw_m").innerHTML = "Wrong network! Please Switch to "+CHAINID;provider = new ethers.providers.JsonRpcProvider(RPC_URL); dexstats();notice("<h3>Wrong network!</h3>Please Switch to Chain #"+CHAINID+"<btr"+ CHAIN_NAME+ "</u> Blockchain.");}
	else if(//typeOf window.ethereum == Object &&Number(window.ethereum.chainId)
		Number(window.ethereum.chainId)==CHAINID)
	{
		console.log("Recognized Ethereum Chain:", window.ethereum.chainId,CHAINID);
		provider = new ethers.providers.Web3Provider(window.ethereum)
		signer = provider.getSigner();
		if(!(window.ethereum.selectedAddress==null)){console.log("Found old wallet:", window.ethereum.selectedAddress);cw();}
		else{console.log("Didnt find a connected wallet!");cw();}
		//chkAppr(tokes[1][0])
		gubs();
	}
	else //if(Number(window.ethereum.chainId)==CHAINID)
	{
		console.log("Couldn't find Ethereum Provider - ",CHAINID,window.ethereum.chainId)
		if((typeof Number(window.ethereum.chainId) == "number")){$("cw_m").innerHTML = "Wrong network! Switch from " + Number(window.ethereum.chainId)+" to "+CHAINID}
		provider = new ethers.providers.JsonRpcProvider(RPC_URL);
		//signer = provider.getSigner()
		dexstats();
		$("connect").innerHTML=`Wallet not found.<br><br><button onclick="window.location.reload()" id="btn-connect">Retry?</button>`;
	}
	if(Number(window.ethereum.chainId) != null && Number(window.ethereum.chainId!=CHAINID && CHAINID!=-2))
	{
		notice(`<h3>Wrong Network!</h3>You are connectedd to Chain ID ${Number(window.ethereum.chainId)}<br>Please Switch to ${CHAIN_NAME}`);
		_newch = "test";
		console.log("1: switching chain: ",window.ethereum.chainId, CHAINID, _newch);
		_newch = window.ethereum.request({
    		method: "wallet_addEthereumChain",
    		params: [{
        		chainId: "0x"+(CHAINID).toString(16),
        		rpcUrls: [RPC_URL],
        		chainName: CHAIN_NAME,
        		nativeCurrency: {
            		name: CHAIN_GAS,
            		symbol: CHAIN_GAS,
            		decimals: 18
        		},
        		blockExplorerUrls: [EXPLORE]
    		}]
		});
		console.log("2: switching chain: ",window.ethereum.chainId, CHAINID, _newch);
		_newch = await _newch;
		console.log("3: switching chain: ",window.ethereum.chainId, CHAINID, _newch);
		if( _newch == null) { window.location.reload(); }
		console.log("4: switching chain: ",window.ethereum.chainId, CHAINID, _newch);
		notice(`<h3>Wrong Network!</h3>Please Switch to ${CHAIN_NAME}`);
		console.log("5: switching chain: ",window.ethereum.chainId, CHAINID, _newch);
	}
	//DrefreshFarm()
	//arf()
	//paintBook()
	cw()
	dexstats()
	gubs()
}



/*
function fornum(n,d)
{
	_n=(Number(n)/10**Number(d));
	n_=_n;
	if(_n>1e18){n_=(_n/1e18).toFixed(4)+" Qt."}
	else if(_n>1e15){n_=(_n/1e15).toFixed(4)+" Qd."}
	else if(_n>1e12){n_=(_n/1e12).toFixed(4)+" Tn."}
	else if(_n>1e9){n_=(_n/1e9).toFixed(4)+" Bn."}
	else if(_n>1e6){n_=(_n/1e6).toFixed(4)+" Mn."}
	else if(_n>1e3){n_=(_n/1e3).toFixed(4)+" Th."}
	else if(_n>0){n_=(_n/1e0).toFixed(5)+""}
	return(n_);
}
*/
function fornum(n,d)
{
	_n=(Number(n)/10**Number(d));
	n_=_n;
	if(_n>1e18){n_=(_n/1e18).toFixed(3)+"Qt"}
	else if(_n>1e15){n_=(_n/1e15).toFixed(3)+"Qd"}
	else if(_n>1e12){n_=(_n/1e12).toFixed(3)+"T"}
	else if(_n>1e9){n_=(_n/1e9).toFixed(3)+"B"}
	else if(_n>1e6){n_=(_n/1e6).toFixed(3)+"M"}
	else if(_n>1e3){n_=(_n/1e3).toFixed(3)+"K"}
	else if(_n>1e1){n_=(_n/1e0).toFixed(3)+""}
	else if(_n>1e0){n_=(_n/1e0).toFixed(5)+""}
	else if(_n>0.0){n_=(_n/1e0).toFixed(8)+""}
	return(n_);
}

async function cw()
{
	let cs = await cw2(); cs?console.log("Good to Transact", cs):cw2();
	//cw2();
}
async function cw2()
{
	if(!(window.ethereum)){$("cw_m").innerHTML="Metamask not detected! Trying a refresh";console.log("Metamask not found!");window.location.reload();return(0)}
	if(!(Number(window.ethereum.chainId)==CHAINID)){$("cw_m").innerHTML="Wrong network detected! Please switch to chain ID", CHAINID, "and refresh this page.";return(0)}
	if(typeof provider == "undefined"){$("cw_m").innerHTML="Provider not detected! Trying a refresh";console.log("Provider not found!");window.location.reload();return(0)}
	/*
	if(!
		(isFinite(Number(accounts[0])))
		|| (isFinite(Number(window.ethereum.selectedAddress)))
	){console.log("NAAAAAAAAAAAAAAAAA");window.location.reload();}
	*/

	//004
	window.ethereum
	.request({ method: 'eth_requestAccounts' })
	.then(r=>{console.log("004: Success:",r);})	//re-curse to end curse, maybe..
	.catch((error) => {	console.error("004 - Failure", r, error); });


	//005
	const accounts = await window.ethereum.request({ method: 'eth_accounts' });
	if(Number(accounts[0])>0){console.log("005: Success - ", accounts)}
	else{console.log("005: Failure", accounts)}


	/*006
	const en6 = await window.ethereum.enable()
	if(Number(en6[0]) > 0){console.log("006 - Success",en6)}
	else{console.log("006 - Failure", en6)}
	*/


	/*003
	try {
      console.log("attempting cw()")
      const addresses = await provider.request({ method: "eth_requestAccounts" });
      console.log("addresses:",addresses)
    } catch (e) {
      console.log("error in request", e);
      window.location.reload(true);
    }
    */

    //002
    //try{await provider.send("eth_requestAccounts", []);console.log("CWE:",e);}//await window.ethereum.enable();
	//catch(e){console.log("CWE:",e);window.location.reload(true)}
	console.log("doing the paints");
	gubs();
	$("cw").innerHTML= (window.ethereum.selectedAddress).substr(0,10) +"..."+(window.ethereum.selectedAddress).substr(34);
	/*if(window.ethereum.chainId==250) {
		(new ethers.Contract("0x14ffd1fa75491595c6fd22de8218738525892101",["function getNames(address) public view returns(string[] memory)"],provider)).getNames(window.ethereum.selectedAddress).then(rn=>
		{
			if(rn.length>0){
				$("cw").innerHTML="<span id='cw_ns'>hi, <span style=''>"+rn[0]+"</span> 👋</span>";
				$("cw_ns").onclick="notice(`<h3>GM, ${rn[0]}</h3>${DAPPNAME} is connected to your wallet<br><a href='${EXPLORE}/address/${window.ethereum.selectedAddress}' target='_blank'>${window.ethereum.selectedAddress}</a>`)"
			}
			else{
				$("cw").innerHTML= "<span id='cw_ns'>"+(window.ethereum.selectedAddress).substr(0,10) +"..."+(window.ethereum.selectedAddress).substr(34)+"</span>";
				$("cw").onclick="notice(`${DAPPNAME} is connected to your wallet<br><a href='${EXPLORE}/address/${window.ethereum.selectedAddress}' target='_blank'>${window.ethereum.selectedAddress}</a>`)"
			}
		})
	}*/
	$("cw_m").innerHTML=""
	$("connect").style.display="none";
	$("switch").style.display="block";
	//farm_1_f_chappro()
	//arf();
	return(1);
}
function fornum2(n,d)
{
	_n=(Number(n)/10**Number(d));
	n_=_n;
	if(_n>1e18){n_=(_n/1e18).toFixed(4)+" Quintillion"}
	else if(_n>1e15){n_=(_n/1e15).toFixed(4)+" Quadrillion"}
	else if(_n>1e12){n_=(_n/1e12).toFixed(4)+" Trillion"}
	else if(_n>1e9){n_=(_n/1e9).toFixed(4)+" Billion"}
	else if(_n>1e6){n_=(_n/1e6).toFixed(4)+" Million"}
	else if(_n>1e3){n_=(_n/1e3).toFixed(4)+" Thousand"}
	else if(_n>1){n_=(_n/1e0).toFixed(8)+""}
	return(n_);
}

function sortit(n,_maintable,_trName,_tdName) {
  var t, r, z, i, x, y, v, b, c = 0;
  t = document.getElementById(_maintable);//.getElementsByTagName("tbody")[0];
  z = true;
  b = "a";
  while (z) {
    z = false;
    r = t.getElementsByClassName(_trName);
    for (i = 0; i < (r.length - 1); i++) {
      v = false;
      x = (r[i].getElementsByClassName(_tdName)[n].textContent).replace(/,| |\.|\$|%/g,'');
      if(isFinite(x)){x=Number(x)}else{x=x.toLowerCase()}
      y = (r[i + 1].getElementsByClassName(_tdName)[n].textContent).replace(/,| |\.|\$|%/g,'');
      if(isFinite(y)){y=Number(y)}else{y=y.toLowerCase()}
      if (b == "a") {
        if ((x) > (y)) {
          v= true;
          break;
        }
      } else if (b == "d") {
        if ((x) < (y)) {
          v = true;
          break;
        }
      }
    }
    if (v) {
      r[i].parentNode.insertBefore(r[i + 1], r[i]);
      z = true;
      c ++;
    } else {
      if (c == 0 && b == "a") {
        b = "d";
        z = true;
      }
    }
  }
    var t, r, z, i, x, y, v, b, c = 0;
}


/*
function arf(){
	var xfr = setInterval(function() {
		console.log("refreshing farm stats", Date.now() );
		try { if( ethers.utils.isAddress(window.ethereum.selectedAddress) ) {gubs();} }
		catch(e) { console.log('hmm..'); }
		priceFinder()
	}, 15000);
}
*/

async function arf(){
	return;
	////////

	let o = INITIAL; let c=0; let t=T_X.address; let d1=Date.now()
	var xfr = setInterval(
		async function(){
			;
		},
		2000
	);
}

async function gubs() {
	gubs_ts = new ethers.Contract(STATE.ts.address, ["function balanceOf(address) public view returns(uint)"], signer);
	gubs_tb = new ethers.Contract(STATE.tb.address, ["function balanceOf(address) public view returns(uint)"], signer);
	bal = await Promise.all([
		gubs_ts.balanceOf(window.ethereum.selectedAddress),
		gubs_tb.balanceOf(window.ethereum.selectedAddress),
	]);
	_ub_s = (bal[0]/10**STATE.ts.decimals).toFixed(STATE.ts.decimals);
	_ub_b = (bal[1]/10**STATE.tb.decimals).toFixed(STATE.tb.decimals);
	$("amount-sold-balance").innerHTML = `<span onclick='$("amount-sold-input").value=${_ub_s}'>Balance: `+ _ub_s +" "+ STATE.ts.symbol+"</span>";
	$("amount-bought-balance").innerHTML = `<span onclick="">Balance: `+ _ub_b +" "+ STATE.tb.symbol+"</span>";
}


function notice(c) {
	window.location = "#note";
	$("content1").innerHTML = c;
	console.log(c);
}


ROUTER = {
	address: "0xB9A64ab6b91F5c7a78c2360CfF759dE8a8a450d5",
	ABI: [{"inputs": [{"internalType": "contract ILBFactory","name": "factory","type": "address"},{"internalType": "contract IJoeFactory","name": "factoryV1","type": "address"},{"internalType": "contract ILBLegacyFactory","name": "legacyFactory","type": "address"},{"internalType": "contract ILBLegacyRouter","name": "legacyRouter","type": "address"},{"internalType": "contract IWNATIVE","name": "wnative","type": "address"}],"stateMutability": "nonpayable","type": "constructor"},{"inputs": [],"name": "AddressHelper__CallFailed","type": "error"},{"inputs": [],"name": "AddressHelper__NonContract","type": "error"},{"inputs": [],"name": "JoeLibrary__InsufficientAmount","type": "error"},{"inputs": [],"name": "JoeLibrary__InsufficientLiquidity","type": "error"},{"inputs": [{"internalType": "uint256","name": "amountSlippage","type": "uint256"}],"name": "LBRouter__AmountSlippageBPTooBig","type": "error"},{"inputs": [{"internalType": "uint256","name": "amountXMin","type": "uint256"},{"internalType": "uint256","name": "amountX","type": "uint256"},{"internalType": "uint256","name": "amountYMin","type": "uint256"},{"internalType": "uint256","name": "amountY","type": "uint256"}],"name": "LBRouter__AmountSlippageCaught","type": "error"},{"inputs": [{"internalType": "uint256","name": "id","type": "uint256"}],"name": "LBRouter__BinReserveOverflows","type": "error"},{"inputs": [],"name": "LBRouter__BrokenSwapSafetyCheck","type": "error"},{"inputs": [{"internalType": "uint256","name": "deadline","type": "uint256"},{"internalType": "uint256","name": "currentTimestamp","type": "uint256"}],"name": "LBRouter__DeadlineExceeded","type": "error"},{"inputs": [{"internalType": "address","name": "recipient","type": "address"},{"internalType": "uint256","name": "amount","type": "uint256"}],"name": "LBRouter__FailedToSendNATIVE","type": "error"},{"inputs": [{"internalType": "uint256","name": "idDesired","type": "uint256"},{"internalType": "uint256","name": "idSlippage","type": "uint256"}],"name": "LBRouter__IdDesiredOverflows","type": "error"},{"inputs": [{"internalType": "int256","name": "id","type": "int256"}],"name": "LBRouter__IdOverflows","type": "error"},{"inputs": [{"internalType": "uint256","name": "activeIdDesired","type": "uint256"},{"internalType": "uint256","name": "idSlippage","type": "uint256"},{"internalType": "uint256","name": "activeId","type": "uint256"}],"name": "LBRouter__IdSlippageCaught","type": "error"},{"inputs": [{"internalType": "uint256","name": "amountOutMin","type": "uint256"},{"internalType": "uint256","name": "amountOut","type": "uint256"}],"name": "LBRouter__InsufficientAmountOut","type": "error"},{"inputs": [{"internalType": "address","name": "wrongToken","type": "address"}],"name": "LBRouter__InvalidTokenPath","type": "error"},{"inputs": [{"internalType": "uint256","name": "version","type": "uint256"}],"name": "LBRouter__InvalidVersion","type": "error"},{"inputs": [],"name": "LBRouter__LengthsMismatch","type": "error"},{"inputs": [{"internalType": "uint256","name": "amountInMax","type": "uint256"},{"internalType": "uint256","name": "amountIn","type": "uint256"}],"name": "LBRouter__MaxAmountInExceeded","type": "error"},{"inputs": [],"name": "LBRouter__NotFactoryOwner","type": "error"},{"inputs": [{"internalType": "address","name": "tokenX","type": "address"},{"internalType": "address","name": "tokenY","type": "address"},{"internalType": "uint256","name": "binStep","type": "uint256"}],"name": "LBRouter__PairNotCreated","type": "error"},{"inputs": [],"name": "LBRouter__SenderIsNotWNATIVE","type": "error"},{"inputs": [{"internalType": "uint256","name": "id","type": "uint256"}],"name": "LBRouter__SwapOverflows","type": "error"},{"inputs": [{"internalType": "uint256","name": "excess","type": "uint256"}],"name": "LBRouter__TooMuchTokensIn","type": "error"},{"inputs": [{"internalType": "uint256","name": "amount","type": "uint256"},{"internalType": "uint256","name": "reserve","type": "uint256"}],"name": "LBRouter__WrongAmounts","type": "error"},{"inputs": [{"internalType": "address","name": "tokenX","type": "address"},{"internalType": "address","name": "tokenY","type": "address"},{"internalType": "uint256","name": "amountX","type": "uint256"},{"internalType": "uint256","name": "amountY","type": "uint256"},{"internalType": "uint256","name": "msgValue","type": "uint256"}],"name": "LBRouter__WrongNativeLiquidityParameters","type": "error"},{"inputs": [],"name": "LBRouter__WrongTokenOrder","type": "error"},{"inputs": [],"name": "TokenHelper__TransferFailed","type": "error"},{"inputs": [{"components": [{"internalType": "contract IERC20","name": "tokenX","type": "address"},{"internalType": "contract IERC20","name": "tokenY","type": "address"},{"internalType": "uint256","name": "binStep","type": "uint256"},{"internalType": "uint256","name": "amountX","type": "uint256"},{"internalType": "uint256","name": "amountY","type": "uint256"},{"internalType": "uint256","name": "amountXMin","type": "uint256"},{"internalType": "uint256","name": "amountYMin","type": "uint256"},{"internalType": "uint256","name": "activeIdDesired","type": "uint256"},{"internalType": "uint256","name": "idSlippage","type": "uint256"},{"internalType": "int256[]","name": "deltaIds","type": "int256[]"},{"internalType": "uint256[]","name": "distributionX","type": "uint256[]"},{"internalType": "uint256[]","name": "distributionY","type": "uint256[]"},{"internalType": "address","name": "to","type": "address"},{"internalType": "address","name": "refundTo","type": "address"},{"internalType": "uint256","name": "deadline","type": "uint256"}],"internalType": "struct ILBRouter.LiquidityParameters","name": "liquidityParameters","type": "tuple"}],"name": "addLiquidity","outputs": [{"internalType": "uint256","name": "amountXAdded","type": "uint256"},{"internalType": "uint256","name": "amountYAdded","type": "uint256"},{"internalType": "uint256","name": "amountXLeft","type": "uint256"},{"internalType": "uint256","name": "amountYLeft","type": "uint256"},{"internalType": "uint256[]","name": "depositIds","type": "uint256[]"},{"internalType": "uint256[]","name": "liquidityMinted","type": "uint256[]"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"components": [{"internalType": "contract IERC20","name": "tokenX","type": "address"},{"internalType": "contract IERC20","name": "tokenY","type": "address"},{"internalType": "uint256","name": "binStep","type": "uint256"},{"internalType": "uint256","name": "amountX","type": "uint256"},{"internalType": "uint256","name": "amountY","type": "uint256"},{"internalType": "uint256","name": "amountXMin","type": "uint256"},{"internalType": "uint256","name": "amountYMin","type": "uint256"},{"internalType": "uint256","name": "activeIdDesired","type": "uint256"},{"internalType": "uint256","name": "idSlippage","type": "uint256"},{"internalType": "int256[]","name": "deltaIds","type": "int256[]"},{"internalType": "uint256[]","name": "distributionX","type": "uint256[]"},{"internalType": "uint256[]","name": "distributionY","type": "uint256[]"},{"internalType": "address","name": "to","type": "address"},{"internalType": "address","name": "refundTo","type": "address"},{"internalType": "uint256","name": "deadline","type": "uint256"}],"internalType": "struct ILBRouter.LiquidityParameters","name": "liquidityParameters","type": "tuple"}],"name": "addLiquidityNATIVE","outputs": [{"internalType": "uint256","name": "amountXAdded","type": "uint256"},{"internalType": "uint256","name": "amountYAdded","type": "uint256"},{"internalType": "uint256","name": "amountXLeft","type": "uint256"},{"internalType": "uint256","name": "amountYLeft","type": "uint256"},{"internalType": "uint256[]","name": "depositIds","type": "uint256[]"},{"internalType": "uint256[]","name": "liquidityMinted","type": "uint256[]"}],"stateMutability": "payable","type": "function"},{"inputs": [{"internalType": "contract IERC20","name": "tokenX","type": "address"},{"internalType": "contract IERC20","name": "tokenY","type": "address"},{"internalType": "uint24","name": "activeId","type": "uint24"},{"internalType": "uint16","name": "binStep","type": "uint16"}],"name": "createLBPair","outputs": [{"internalType": "contract ILBPair","name": "pair","type": "address"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "getFactory","outputs": [{"internalType": "contract ILBFactory","name": "lbFactory","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "contract ILBPair","name": "pair","type": "address"},{"internalType": "uint256","name": "price","type": "uint256"}],"name": "getIdFromPrice","outputs": [{"internalType": "uint24","name": "","type": "uint24"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "getLegacyFactory","outputs": [{"internalType": "contract ILBLegacyFactory","name": "legacyLBfactory","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "getLegacyRouter","outputs": [{"internalType": "contract ILBLegacyRouter","name": "legacyRouter","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "contract ILBPair","name": "pair","type": "address"},{"internalType": "uint24","name": "id","type": "uint24"}],"name": "getPriceFromId","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "contract ILBPair","name": "pair","type": "address"},{"internalType": "uint128","name": "amountOut","type": "uint128"},{"internalType": "bool","name": "swapForY","type": "bool"}],"name": "getSwapIn","outputs": [{"internalType": "uint128","name": "amountIn","type": "uint128"},{"internalType": "uint128","name": "amountOutLeft","type": "uint128"},{"internalType": "uint128","name": "fee","type": "uint128"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "contract ILBPair","name": "pair","type": "address"},{"internalType": "uint128","name": "amountIn","type": "uint128"},{"internalType": "bool","name": "swapForY","type": "bool"}],"name": "getSwapOut","outputs": [{"internalType": "uint128","name": "amountInLeft","type": "uint128"},{"internalType": "uint128","name": "amountOut","type": "uint128"},{"internalType": "uint128","name": "fee","type": "uint128"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "getV1Factory","outputs": [{"internalType": "contract IJoeFactory","name": "factoryV1","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "getWNATIVE","outputs": [{"internalType": "contract IWNATIVE","name": "wnative","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "contract IERC20","name": "tokenX","type": "address"},{"internalType": "contract IERC20","name": "tokenY","type": "address"},{"internalType": "uint16","name": "binStep","type": "uint16"},{"internalType": "uint256","name": "amountXMin","type": "uint256"},{"internalType": "uint256","name": "amountYMin","type": "uint256"},{"internalType": "uint256[]","name": "ids","type": "uint256[]"},{"internalType": "uint256[]","name": "amounts","type": "uint256[]"},{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256","name": "deadline","type": "uint256"}],"name": "removeLiquidity","outputs": [{"internalType": "uint256","name": "amountX","type": "uint256"},{"internalType": "uint256","name": "amountY","type": "uint256"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "contract IERC20","name": "token","type": "address"},{"internalType": "uint16","name": "binStep","type": "uint16"},{"internalType": "uint256","name": "amountTokenMin","type": "uint256"},{"internalType": "uint256","name": "amountNATIVEMin","type": "uint256"},{"internalType": "uint256[]","name": "ids","type": "uint256[]"},{"internalType": "uint256[]","name": "amounts","type": "uint256[]"},{"internalType": "address payable","name": "to","type": "address"},{"internalType": "uint256","name": "deadline","type": "uint256"}],"name": "removeLiquidityNATIVE","outputs": [{"internalType": "uint256","name": "amountToken","type": "uint256"},{"internalType": "uint256","name": "amountNATIVE","type": "uint256"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "amountOutMin","type": "uint256"},{"components": [{"internalType": "uint256[]","name": "pairBinSteps","type": "uint256[]"},{"internalType": "enum ILBRouter.Version[]","name": "versions","type": "uint8[]"},{"internalType": "contract IERC20[]","name": "tokenPath","type": "address[]"}],"internalType": "struct ILBRouter.Path","name": "path","type": "tuple"},{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256","name": "deadline","type": "uint256"}],"name": "swapExactNATIVEForTokens","outputs": [{"internalType": "uint256","name": "amountOut","type": "uint256"}],"stateMutability": "payable","type": "function"},{"inputs": [{"internalType": "uint256","name": "amountOutMin","type": "uint256"},{"components": [{"internalType": "uint256[]","name": "pairBinSteps","type": "uint256[]"},{"internalType": "enum ILBRouter.Version[]","name": "versions","type": "uint8[]"},{"internalType": "contract IERC20[]","name": "tokenPath","type": "address[]"}],"internalType": "struct ILBRouter.Path","name": "path","type": "tuple"},{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256","name": "deadline","type": "uint256"}],"name": "swapExactNATIVEForTokensSupportingFeeOnTransferTokens","outputs": [{"internalType": "uint256","name": "amountOut","type": "uint256"}],"stateMutability": "payable","type": "function"},{"inputs": [{"internalType": "uint256","name": "amountIn","type": "uint256"},{"internalType": "uint256","name": "amountOutMinNATIVE","type": "uint256"},{"components": [{"internalType": "uint256[]","name": "pairBinSteps","type": "uint256[]"},{"internalType": "enum ILBRouter.Version[]","name": "versions","type": "uint8[]"},{"internalType": "contract IERC20[]","name": "tokenPath","type": "address[]"}],"internalType": "struct ILBRouter.Path","name": "path","type": "tuple"},{"internalType": "address payable","name": "to","type": "address"},{"internalType": "uint256","name": "deadline","type": "uint256"}],"name": "swapExactTokensForNATIVE","outputs": [{"internalType": "uint256","name": "amountOut","type": "uint256"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "amountIn","type": "uint256"},{"internalType": "uint256","name": "amountOutMinNATIVE","type": "uint256"},{"components": [{"internalType": "uint256[]","name": "pairBinSteps","type": "uint256[]"},{"internalType": "enum ILBRouter.Version[]","name": "versions","type": "uint8[]"},{"internalType": "contract IERC20[]","name": "tokenPath","type": "address[]"}],"internalType": "struct ILBRouter.Path","name": "path","type": "tuple"},{"internalType": "address payable","name": "to","type": "address"},{"internalType": "uint256","name": "deadline","type": "uint256"}],"name": "swapExactTokensForNATIVESupportingFeeOnTransferTokens","outputs": [{"internalType": "uint256","name": "amountOut","type": "uint256"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "amountIn","type": "uint256"},{"internalType": "uint256","name": "amountOutMin","type": "uint256"},{"components": [{"internalType": "uint256[]","name": "pairBinSteps","type": "uint256[]"},{"internalType": "enum ILBRouter.Version[]","name": "versions","type": "uint8[]"},{"internalType": "contract IERC20[]","name": "tokenPath","type": "address[]"}],"internalType": "struct ILBRouter.Path","name": "path","type": "tuple"},{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256","name": "deadline","type": "uint256"}],"name": "swapExactTokensForTokens","outputs": [{"internalType": "uint256","name": "amountOut","type": "uint256"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "amountIn","type": "uint256"},{"internalType": "uint256","name": "amountOutMin","type": "uint256"},{"components": [{"internalType": "uint256[]","name": "pairBinSteps","type": "uint256[]"},{"internalType": "enum ILBRouter.Version[]","name": "versions","type": "uint8[]"},{"internalType": "contract IERC20[]","name": "tokenPath","type": "address[]"}],"internalType": "struct ILBRouter.Path","name": "path","type": "tuple"},{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256","name": "deadline","type": "uint256"}],"name": "swapExactTokensForTokensSupportingFeeOnTransferTokens","outputs": [{"internalType": "uint256","name": "amountOut","type": "uint256"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "amountOut","type": "uint256"},{"components": [{"internalType": "uint256[]","name": "pairBinSteps","type": "uint256[]"},{"internalType": "enum ILBRouter.Version[]","name": "versions","type": "uint8[]"},{"internalType": "contract IERC20[]","name": "tokenPath","type": "address[]"}],"internalType": "struct ILBRouter.Path","name": "path","type": "tuple"},{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256","name": "deadline","type": "uint256"}],"name": "swapNATIVEForExactTokens","outputs": [{"internalType": "uint256[]","name": "amountsIn","type": "uint256[]"}],"stateMutability": "payable","type": "function"},{"inputs": [{"internalType": "uint256","name": "amountNATIVEOut","type": "uint256"},{"internalType": "uint256","name": "amountInMax","type": "uint256"},{"components": [{"internalType": "uint256[]","name": "pairBinSteps","type": "uint256[]"},{"internalType": "enum ILBRouter.Version[]","name": "versions","type": "uint8[]"},{"internalType": "contract IERC20[]","name": "tokenPath","type": "address[]"}],"internalType": "struct ILBRouter.Path","name": "path","type": "tuple"},{"internalType": "address payable","name": "to","type": "address"},{"internalType": "uint256","name": "deadline","type": "uint256"}],"name": "swapTokensForExactNATIVE","outputs": [{"internalType": "uint256[]","name": "amountsIn","type": "uint256[]"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "amountOut","type": "uint256"},{"internalType": "uint256","name": "amountInMax","type": "uint256"},{"components": [{"internalType": "uint256[]","name": "pairBinSteps","type": "uint256[]"},{"internalType": "enum ILBRouter.Version[]","name": "versions","type": "uint8[]"},{"internalType": "contract IERC20[]","name": "tokenPath","type": "address[]"}],"internalType": "struct ILBRouter.Path","name": "path","type": "tuple"},{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256","name": "deadline","type": "uint256"}],"name": "swapTokensForExactTokens","outputs": [{"internalType": "uint256[]","name": "amountsIn","type": "uint256[]"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "contract IERC20","name": "token","type": "address"},{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256","name": "amount","type": "uint256"}],"name": "sweep","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "contract ILBToken","name": "lbToken","type": "address"},{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256[]","name": "ids","type": "uint256[]"},{"internalType": "uint256[]","name": "amounts","type": "uint256[]"}],"name": "sweepLBToken","outputs": [],"stateMutability": "nonpayable","type": "function"},{"stateMutability": "payable","type": "receive"}],
}



function pairSelectionMenu() {
	notice(`
		<h2>Select a Pair to Trade</h2>
		<div style="" class="pairSelectionMenuContainer">
			<h2 class="pairSelectionMenu">
				<a href="250-0">
					<div><img src="https://ftm.guru/icons/mc.USDC.png"><img src="https://ftm.guru/icons/mc.USDT.png"></div>
					<div>
						<div>mc.USDC/mc.fUSDT</div>
						<div><img src="https://ftm.guru/icons/ftm.svg"> #0 - Fantom Opera</div>
					</div>
				</a>
				<a href="250-1">
					<div><img src="https://ftm.guru/icons/ftm.svg"><img src="https://ftm.guru/icons/mc.USDC.png"></div>
					<div>
						<div>WFTM/mc.USDC</div>
						<div><img src="https://ftm.guru/icons/ftm.svg"> #1 - Fantom Opera</div>
					</div>
				</a>
				<a href="42161-0">
					<div><img src="https://ftm.guru/icons/eth.svg"><img src="https://ftm.guru/icons/usdc.svg"></div>
					<div>
						<div>WETH/USDC.e</div>
						<div><img src="https://ftm.guru/icons/arb1.svg"> #0 - Arbitrum One</div>
					</div>
				</a>
				<a href="42161-1">
					<div><img src="https://ftm.guru/icons/eth.svg"><img src="https://ftm.guru/icons/usdc.svg"></div>
					<div>
						<div>WETH/USDC</div>
						<div><img src="https://ftm.guru/icons/arb1.svg"> #1 - Arbitrum One</div>
					</div>
				</a>
				<a href="250-2">
					<div><img src="https://ftm.guru/icons/lz.USDC.png"><img src="https://ftm.guru/icons/axl.USDC.png"></div>
					<div>
						<div>lz.USDC/axlUSDC</div>
						<div><img src="https://ftm.guru/icons/ftm.svg"> #2 - Fantom Opera</div>
					</div>
				</a>
				<a href="250-3">
					<div><img src="https://ftm.guru/icons/ftm.svg"><img src="https://ftm.guru/icons/axl.USDC.png"></div>
					<div>
						<div>wFTM/axlUSDC</div>
						<div><img src="https://ftm.guru/icons/ftm.svg"> #2 - Fantom Opera</div>
					</div>
				</a>
				<a href="8453-0">
					<div><img src="https://ftm.guru/icons/eth.svg"><img src="https://ftm.guru/icons/axl.USDC.png"></div>
					<div>
						<div>wETH/axlUSDC</div>
						<div><img src="https://ftm.guru/icons/base.svg"> #0 - Base</div>
					</div>
				</a>
				<a href="8453-1">
					<div><img src="https://ftm.guru/icons/eth.svg"><img src="https://ftm.guru/icons/usdc.svg"></div>
					<div>
						<div>wETH/USDbC</div>
						<div><img src="https://ftm.guru/icons/base.svg"> #1 - Base</div>
					</div>
				</a>
			</h2>
		</div>
	`);
}

async function libPH_getIdFromPrice(_id, _step) {
	fa2=new ethers.providers.JsonRpcProvider("https://rpc.testnet.fantom.network");
	PH = new ethers.Contract("0xc8f66ab5619fc637c2d51abb0d24781b3f29e6c6",[{"inputs":[],"name":"SafeCast__Exceeds24Bits","type":"error"},{"inputs":[],"name":"Uint128x128Math__LogUnderflow","type":"error"},{"inputs":[{"internalType":"uint256","name":"x","type":"uint256"},{"internalType":"int256","name":"y","type":"int256"}],"name":"Uint128x128Math__PowUnderflow","type":"error"},{"inputs":[],"name":"Uint256x256Math__MulDivOverflow","type":"error"},{"inputs":[],"name":"Uint256x256Math__MulShiftOverflow","type":"error"},{"inputs":[{"internalType":"uint256","name":"price128x128","type":"uint256"}],"name":"convert128x128PriceToDecimal","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"price","type":"uint256"}],"name":"convertDecimalPriceTo128x128","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint16","name":"binStep","type":"uint16"}],"name":"getBase","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint24","name":"id","type":"uint24"}],"name":"getExponent","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"uint16","name":"binStep","type":"uint16"}],"name":"getIdFromPrice","outputs":[{"internalType":"uint24","name":"id","type":"uint24"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint24","name":"id","type":"uint24"},{"internalType":"uint16","name":"binStep","type":"uint16"}],"name":"getPriceFromId","outputs":[{"internalType":"uint256","name":"price","type":"uint256"}],"stateMutability":"pure","type":"function"}],fa2);
	_price_raw = await PH.getIdFromPrice(_id,_step);
}

function e3lib_Num_to_hex32(_num) {
	_dec = (_num % 1) ;
	_dec32 = ethers.utils.hexZeroPad("0x" + ( _dec * 16**32 ).toString(16) , 16 );
	_int = Math.floor(_num);
	_int32 = ethers.utils.hexZeroPad("0x" + _int.toString(16) , 16);
	return _int32 + _dec32.substr(2);
}

function e3lib_hex32_to_num(_hex) {
	_hex = ethers.utils.hexZeroPad( _hex.toString(16) , 32);
	_int = Number(_hex.substr(0,34));
	_dec = Number("0x"+_hex.substr(34,32))/16**32;
	return (_int + _dec);
}

function e3lib_gen(mid,step,count){
	let ra=[];
	for(i=0-count;i<=0+count;i++) {
		ra.push( mid + i*step )
	}
	return ra
}

function e3lib_spread_uniform(n) {
	if(n%2==0) throw new Error("Should be odd-lengthed!");
	let m = ((n+1)/2)-1;
	let b = BigInt(Math.floor(1e18/(m+1)));
	let x=[], y=[];
	for(let i=0;i<n;i++) {
		if(i<m) {
			x[i] = b;
			y[i] = 0;
		}
		else if(i==m) {
			x[i] = b;
			y[i] = b;
		}
		else if(i>m) {
			x[i] = 0;
			y[i] = b;
		}
	}
	return {x:x,y:y}
}

function e3lib_gen_ids(_start,_end) {
	let _rarr=[];
	for (let i=_start;i<=_end;i++) {
		_rarr.push(i);
	}
	return _rarr;
}

function e3lib_gen_dist(_isx, _kind, _size, _zeros) {
	_rarr=[];
	if(_kind=='flat') {
		if(_isx){
			for(let i=0;i<_size;i++){
				i < _zeros
				? _rarr.push(0)
				: _rarr.push(BigInt(Math.floor( 1e18 / Math.ceil(_size-_zeros) )));
			}
		}
		else {
			for(let i=0;i<_size;i++){
				i < _size - _zeros
				? _rarr.push(BigInt(Math.floor( 1e18 / Math.ceil(_size-_zeros) )))
				: _rarr.push(0) ;
			}
		}
	}
	else if(_kind == 'bogpro') {
		_rarr = _isx
			? ["0","0","0","0","0","0","0","0","0","0","0","0","0","0","41211048977914000","82422097955828100","81733364405671000","80598240676066400","79035503085190000","77070709389239300","74735503559369100","72066768416207000","69105657812196500","65896543800024600","62485916310631600","58921273239094500","55250037548078800","51518535181979400","47771063452128600"]
			: ["47771063452128600","51518535181979400","55250037548078800","58921273239094500","62485916310631600","65896543800024600","69105657812196500","72066768416207000","74735503559369100","77070709389239300","79035503085190000","80598240676066400","81733364405671000","82422097955828100","41211048977914000","0","0","0","0","0","0","0","0","0","0","0","0","0","0"]
		;
	}
	else if(_kind == 'cbd') {
		_rarr = _isx
			? ["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","29755270020154500","59510540040309100","59013259498679400","58193675578387300","57065345187862800","55646721580678200","53960652389436200","52033767809535700","49895781813860300","47578731985577300","45116185061827900","42542435551692800","39891723861428700","37197498326338900","34491742564713800","31804385831372300","29162809782220400","26591460507005900","24111570084459900","21740987486925100","19494114608220600","17381939670544900","15412157402808900","13589363247419300","11915307473221600","10389194434459100","9008012267419790","7766878975915517","6659392019927108","5677970071259770","4814177413491765","4059023421017415","3403231542769610","2837474143462068","2352571339581980"]
			: ["2352571339581980","2837474143462068","3403231542769610","4059023421017415","4814177413491765","5677970071259770","6659392019927108","7766878975915517","9008012267419790","10389194434459100","11915307473221600","13589363247419300","15412157402808900","17381939670544900","19494114608220600","21740987486925100","24111570084459900","26591460507005900","29162809782220400","31804385831372300","34491742564713800","37197498326338900","39891723861428700","42542435551692800","45116185061827900","47578731985577300","49895781813860300","52033767809535700","53960652389436200","55646721580678200","57065345187862800","58193675578387300","59013259498679400","59510540040309100","29755270020154500","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"]
		;
	}
	else if(_kind == 'ffc') {
		_rarr = _isx
			? ["0","0",BigInt(0.4e18),BigInt(0.35e18),BigInt(0.25e18)]
			: [BigInt(0.2e18),BigInt(0.375e18),BigInt(0.425e18),"0","0"]
		;
	}
	return _rarr;
}




PAIRABI =
[{"inputs":[{"internalType":"contract ILBFactory","name":"factory_","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"AddressHelper__CallFailed","type":"error"},{"inputs":[],"name":"AddressHelper__NonContract","type":"error"},{"inputs":[{"internalType":"uint24","name":"id","type":"uint24"}],"name":"BinHelper__CompositionFactorFlawed","type":"error"},{"inputs":[],"name":"BinHelper__LiquidityOverflow","type":"error"},{"inputs":[],"name":"FeeHelper__FeeTooLarge","type":"error"},{"inputs":[],"name":"LBPair__AddressZero","type":"error"},{"inputs":[],"name":"LBPair__AlreadyInitialized","type":"error"},{"inputs":[],"name":"LBPair__EmptyMarketConfigs","type":"error"},{"inputs":[],"name":"LBPair__FlashLoanCallbackFailed","type":"error"},{"inputs":[],"name":"LBPair__FlashLoanInsufficientAmount","type":"error"},{"inputs":[],"name":"LBPair__InsufficientAmountIn","type":"error"},{"inputs":[],"name":"LBPair__InsufficientAmountOut","type":"error"},{"inputs":[],"name":"LBPair__InvalidInput","type":"error"},{"inputs":[],"name":"LBPair__InvalidStaticFeeParameters","type":"error"},{"inputs":[],"name":"LBPair__MaxTotalFeeExceeded","type":"error"},{"inputs":[],"name":"LBPair__OnlyFactory","type":"error"},{"inputs":[],"name":"LBPair__OnlyProtocolFeeRecipient","type":"error"},{"inputs":[],"name":"LBPair__OutOfLiquidity","type":"error"},{"inputs":[],"name":"LBPair__TokenNotSupported","type":"error"},{"inputs":[{"internalType":"uint24","name":"id","type":"uint24"}],"name":"LBPair__ZeroAmount","type":"error"},{"inputs":[{"internalType":"uint24","name":"id","type":"uint24"}],"name":"LBPair__ZeroAmountsOut","type":"error"},{"inputs":[],"name":"LBPair__ZeroBorrowAmount","type":"error"},{"inputs":[{"internalType":"uint24","name":"id","type":"uint24"}],"name":"LBPair__ZeroShares","type":"error"},{"inputs":[],"name":"LBToken__AddressThisOrZero","type":"error"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"LBToken__BurnExceedsBalance","type":"error"},{"inputs":[],"name":"LBToken__InvalidLength","type":"error"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"LBToken__SelfApproval","type":"error"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"LBToken__SpenderNotApproved","type":"error"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"LBToken__TransferExceedsBalance","type":"error"},{"inputs":[],"name":"LiquidityConfigurations__InvalidConfig","type":"error"},{"inputs":[],"name":"OracleHelper__InvalidOracleId","type":"error"},{"inputs":[],"name":"OracleHelper__LookUpTimestampTooOld","type":"error"},{"inputs":[],"name":"OracleHelper__NewLengthTooSmall","type":"error"},{"inputs":[],"name":"PackedUint128Math__AddOverflow","type":"error"},{"inputs":[],"name":"PackedUint128Math__MultiplierTooLarge","type":"error"},{"inputs":[],"name":"PackedUint128Math__SubUnderflow","type":"error"},{"inputs":[],"name":"PairParametersHelper__InvalidParameter","type":"error"},{"inputs":[],"name":"ReentrancyGuard__ReentrantCall","type":"error"},{"inputs":[],"name":"SafeCast__Exceeds128Bits","type":"error"},{"inputs":[],"name":"SafeCast__Exceeds24Bits","type":"error"},{"inputs":[],"name":"SafeCast__Exceeds40Bits","type":"error"},{"inputs":[],"name":"TokenHelper__TransferFailed","type":"error"},{"inputs":[],"name":"Uint128x128Math__LogUnderflow","type":"error"},{"inputs":[{"internalType":"uint256","name":"x","type":"uint256"},{"internalType":"int256","name":"y","type":"int256"}],"name":"Uint128x128Math__PowUnderflow","type":"error"},{"inputs":[],"name":"Uint256x256Math__MulDivOverflow","type":"error"},{"inputs":[],"name":"Uint256x256Math__MulShiftOverflow","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"feeRecipient","type":"address"},{"indexed":false,"internalType":"bytes32","name":"protocolFees","type":"bytes32"}],"name":"CollectedProtocolFees","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint24","name":"id","type":"uint24"},{"indexed":false,"internalType":"bytes32","name":"totalFees","type":"bytes32"},{"indexed":false,"internalType":"bytes32","name":"protocolFees","type":"bytes32"}],"name":"CompositionFees","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"indexed":false,"internalType":"bytes32[]","name":"amounts","type":"bytes32[]"}],"name":"DepositedToBins","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"contract ILBFlashLoanCallback","name":"receiver","type":"address"},{"indexed":false,"internalType":"uint24","name":"activeId","type":"uint24"},{"indexed":false,"internalType":"bytes32","name":"amounts","type":"bytes32"},{"indexed":false,"internalType":"bytes32","name":"totalFees","type":"bytes32"},{"indexed":false,"internalType":"bytes32","name":"protocolFees","type":"bytes32"}],"name":"FlashLoan","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint24","name":"idReference","type":"uint24"},{"indexed":false,"internalType":"uint24","name":"volatilityReference","type":"uint24"}],"name":"ForcedDecay","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint16","name":"oracleLength","type":"uint16"}],"name":"OracleLengthIncreased","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint16","name":"baseFactor","type":"uint16"},{"indexed":false,"internalType":"uint16","name":"filterPeriod","type":"uint16"},{"indexed":false,"internalType":"uint16","name":"decayPeriod","type":"uint16"},{"indexed":false,"internalType":"uint16","name":"reductionFactor","type":"uint16"},{"indexed":false,"internalType":"uint24","name":"variableFeeControl","type":"uint24"},{"indexed":false,"internalType":"uint16","name":"protocolShare","type":"uint16"},{"indexed":false,"internalType":"uint24","name":"maxVolatilityAccumulator","type":"uint24"}],"name":"StaticFeeParametersSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint24","name":"id","type":"uint24"},{"indexed":false,"internalType":"bytes32","name":"amountsIn","type":"bytes32"},{"indexed":false,"internalType":"bytes32","name":"amountsOut","type":"bytes32"},{"indexed":false,"internalType":"uint24","name":"volatilityAccumulator","type":"uint24"},{"indexed":false,"internalType":"bytes32","name":"totalFees","type":"bytes32"},{"indexed":false,"internalType":"bytes32","name":"protocolFees","type":"bytes32"}],"name":"Swap","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"indexed":false,"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"name":"TransferBatch","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"indexed":false,"internalType":"bytes32[]","name":"amounts","type":"bytes32[]"}],"name":"WithdrawnFromBins","type":"event"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"approveForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"accounts","type":"address[]"},{"internalType":"uint256[]","name":"ids","type":"uint256[]"}],"name":"balanceOfBatch","outputs":[{"internalType":"uint256[]","name":"batchBalances","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"name":"batchTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"internalType":"uint256[]","name":"amountsToBurn","type":"uint256[]"}],"name":"burn","outputs":[{"internalType":"bytes32[]","name":"amounts","type":"bytes32[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"collectProtocolFees","outputs":[{"internalType":"bytes32","name":"collectedProtocolFees","type":"bytes32"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract ILBFlashLoanCallback","name":"receiver","type":"address"},{"internalType":"bytes32","name":"amounts","type":"bytes32"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"flashLoan","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"forceDecay","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getActiveId","outputs":[{"internalType":"uint24","name":"activeId","type":"uint24"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint24","name":"id","type":"uint24"}],"name":"getBin","outputs":[{"internalType":"uint128","name":"binReserveX","type":"uint128"},{"internalType":"uint128","name":"binReserveY","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBinStep","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"getFactory","outputs":[{"internalType":"contract ILBFactory","name":"factory","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"price","type":"uint256"}],"name":"getIdFromPrice","outputs":[{"internalType":"uint24","name":"id","type":"uint24"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"bool","name":"swapForY","type":"bool"},{"internalType":"uint24","name":"id","type":"uint24"}],"name":"getNextNonEmptyBin","outputs":[{"internalType":"uint24","name":"nextId","type":"uint24"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOracleParameters","outputs":[{"internalType":"uint8","name":"sampleLifetime","type":"uint8"},{"internalType":"uint16","name":"size","type":"uint16"},{"internalType":"uint16","name":"activeSize","type":"uint16"},{"internalType":"uint40","name":"lastUpdated","type":"uint40"},{"internalType":"uint40","name":"firstTimestamp","type":"uint40"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint40","name":"lookupTimestamp","type":"uint40"}],"name":"getOracleSampleAt","outputs":[{"internalType":"uint64","name":"cumulativeId","type":"uint64"},{"internalType":"uint64","name":"cumulativeVolatility","type":"uint64"},{"internalType":"uint64","name":"cumulativeBinCrossed","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint24","name":"id","type":"uint24"}],"name":"getPriceFromId","outputs":[{"internalType":"uint256","name":"price","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"getProtocolFees","outputs":[{"internalType":"uint128","name":"protocolFeeX","type":"uint128"},{"internalType":"uint128","name":"protocolFeeY","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint128","name":"reserveX","type":"uint128"},{"internalType":"uint128","name":"reserveY","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getStaticFeeParameters","outputs":[{"internalType":"uint16","name":"baseFactor","type":"uint16"},{"internalType":"uint16","name":"filterPeriod","type":"uint16"},{"internalType":"uint16","name":"decayPeriod","type":"uint16"},{"internalType":"uint16","name":"reductionFactor","type":"uint16"},{"internalType":"uint24","name":"variableFeeControl","type":"uint24"},{"internalType":"uint16","name":"protocolShare","type":"uint16"},{"internalType":"uint24","name":"maxVolatilityAccumulator","type":"uint24"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint128","name":"amountOut","type":"uint128"},{"internalType":"bool","name":"swapForY","type":"bool"}],"name":"getSwapIn","outputs":[{"internalType":"uint128","name":"amountIn","type":"uint128"},{"internalType":"uint128","name":"amountOutLeft","type":"uint128"},{"internalType":"uint128","name":"fee","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint128","name":"amountIn","type":"uint128"},{"internalType":"bool","name":"swapForY","type":"bool"}],"name":"getSwapOut","outputs":[{"internalType":"uint128","name":"amountInLeft","type":"uint128"},{"internalType":"uint128","name":"amountOut","type":"uint128"},{"internalType":"uint128","name":"fee","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTokenX","outputs":[{"internalType":"contract IERC20","name":"tokenX","type":"address"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"getTokenY","outputs":[{"internalType":"contract IERC20","name":"tokenY","type":"address"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"getVariableFeeParameters","outputs":[{"internalType":"uint24","name":"volatilityAccumulator","type":"uint24"},{"internalType":"uint24","name":"volatilityReference","type":"uint24"},{"internalType":"uint24","name":"idReference","type":"uint24"},{"internalType":"uint40","name":"timeOfLastUpdate","type":"uint40"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"newLength","type":"uint16"}],"name":"increaseOracleLength","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"baseFactor","type":"uint16"},{"internalType":"uint16","name":"filterPeriod","type":"uint16"},{"internalType":"uint16","name":"decayPeriod","type":"uint16"},{"internalType":"uint16","name":"reductionFactor","type":"uint16"},{"internalType":"uint24","name":"variableFeeControl","type":"uint24"},{"internalType":"uint16","name":"protocolShare","type":"uint16"},{"internalType":"uint24","name":"maxVolatilityAccumulator","type":"uint24"},{"internalType":"uint24","name":"activeId","type":"uint24"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes32[]","name":"liquidityConfigs","type":"bytes32[]"},{"internalType":"address","name":"refundTo","type":"address"}],"name":"mint","outputs":[{"internalType":"bytes32","name":"amountsReceived","type":"bytes32"},{"internalType":"bytes32","name":"amountsLeft","type":"bytes32"},{"internalType":"uint256[]","name":"liquidityMinted","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"baseFactor","type":"uint16"},{"internalType":"uint16","name":"filterPeriod","type":"uint16"},{"internalType":"uint16","name":"decayPeriod","type":"uint16"},{"internalType":"uint16","name":"reductionFactor","type":"uint16"},{"internalType":"uint24","name":"variableFeeControl","type":"uint24"},{"internalType":"uint16","name":"protocolShare","type":"uint16"},{"internalType":"uint24","name":"maxVolatilityAccumulator","type":"uint24"}],"name":"setStaticFeeParameters","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"swapForY","type":"bool"},{"internalType":"address","name":"to","type":"address"}],"name":"swap","outputs":[{"internalType":"bytes32","name":"amountsOut","type":"bytes32"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];

TOKENS ={
	250: {
		mc_usdc: {
			n: "axlUSDC",
			s: "axlUSDC",
			d: 6,
			a: "0x1b6382dbdea11d97f24495c9a90b7c88469134a4"
		}
	}
};
POOLS = {
	250 : [
		{	//0
			i: 0,
			b: 1,
			f: 1,
			a: "0xce765688FeBE127A4300aE5bA96365FAF35Bdeed",
			t: [ TOKENS[250].mc_usdc, TOKENS[250].mc_usdc ],
		},
		{	//0
			i: 0,
			b: 1,
			f: 1,
			a: "0x7d9E70a53753700dA71b7F110F49BA8A4605FCE0",
			t: [ TOKENS[250].mc_usdc, TOKENS[250].mc_usdc ],
		},
	],
	42161 : [
		{
			i: 0,
			b: 1,
			f: 1,
			a: "0xfc569fb4cA89fcb393cc78aF902Eab99738De71b",
			t: [ TOKENS[250].mc_usdc, TOKENS[250].mc_usdc ],
		},
	],
	8453 : [
		{
			i: 0,
			b: 1,
			f: 1,
			a: "0xB78daA6D74fE0E23e5C95446CfaDbaDc63205CFc",
			t: [ TOKENS[250].mc_usdc, TOKENS[250].mc_usdc ],
		},
	]
};

async function dexstats() {
	;
	return;
}


async function pre_stats() {
	console.log("pre-stat'ing");
	prepro = new ethers.providers.JsonRpcProvider(RPC_URL);

	FANTOM = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/fantom");
	BASE = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/base");
	ARB1 = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/arbitrum");


	FTM_AXLUSDC = new ethers.Contract( "0x1b6382dbdea11d97f24495c9a90b7c88469134a4", ["function balanceOf(address) public view returns (uint256)"], FANTOM )
	FTM_LZUSDC  = new ethers.Contract( "0x28a92dde19D9989F39A49905d7C9C2FAc7799bDf", ["function balanceOf(address) public view returns (uint256)"], FANTOM );
	FTM_WFTM    = new ethers.Contract( "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83", ["function balanceOf(address) public view returns (uint256)"], FANTOM );
	ARB_USDCE   = new ethers.Contract( "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8", ["function balanceOf(address) public view returns (uint256)"], ARB1 );
	ARB_WETH    = new ethers.Contract( "0x82af49447d8a07e3bd95bd0d56f35241523fbab1", ["function balanceOf(address) public view returns (uint256)"], ARB1 );
	BASE_USDBC  = new ethers.Contract( "0xd9aaec86b65d86f6a7b5b1b0c42ffa531710b6ca", ["function balanceOf(address) public view returns (uint256)"], BASE );
	BASE_WETH   = new ethers.Contract( "0x4200000000000000000000000000000000000006", ["function balanceOf(address) public view returns (uint256)"], BASE );
/*
	_P_250_0 = new ethers.Contract(POOLS[250][0].a, PAIRABI, FANTOM);
	_P_250_1 = new ethers.Contract(POOLS[250][1].a, PAIRABI, FANTOM);
	_P_250_2 = new ethers.Contract(POOLS[250][2].a, PAIRABI, FANTOM);
	_P_250_3 = new ethers.Contract(POOLS[250][3].a, PAIRABI, FANTOM);
	_P_42161_0 = new ethers.Contract(POOLS[42161][0].a, PAIRABI, ARB1);
	_P_42161_1 = new ethers.Contract(POOLS[42161][1].a, PAIRABI, ARB1);
	_P_8453_0 = new ethers.Contract(POOLS[8453][0].a, PAIRABI, BASE);
	_P_8453_1 = new ethers.Contract(POOLS[8453][1].a, PAIRABI, BASE);
	_P_8453_2 = new ethers.Contract(POOLS[8453][2].a, PAIRABI, BASE);


	_gr = await Promise.all([
		_P_250_0.getReserves(),
		_P_250_1.getReserves(),
		_P_250_2.getReserves(),
		_P_250_3.getReserves(),
		_P_42161_0.getReserves(),
		_P_42161_1.getReserves(),
		_P_8453_0.getReserves(),
		_P_8453_1.getReserves(),
		_P_8453_2.getReserves()
	]);

	$("250-0-gr0").innerHTML = ( Number( _gr[0][0] ) / 1e06 ).toLocaleString();
	$("250-0-gr1").innerHTML = ( Number( _gr[0][1] ) / 1e06 ).toLocaleString();

	$("250-1-gr0").innerHTML = ( Number( _gr[1][0] ) / 1e18 ).toLocaleString();
	$("250-1-gr1").innerHTML = ( Number( _gr[1][1] ) / 1e06 ).toLocaleString();

	$("250-2-gr0").innerHTML = ( Number( _gr[2][0] ) / 1e06 ).toLocaleString();
	$("250-2-gr1").innerHTML = ( Number( _gr[2][1] ) / 1e06 ).toLocaleString();

	$("250-3-gr0").innerHTML = ( Number( _gr[3][0] ) / 1e18 ).toLocaleString();
	$("250-3-gr1").innerHTML = ( Number( _gr[3][1] ) / 1e06 ).toLocaleString();

	$("42161-0-gr0").innerHTML = ( Number( _gr[4][0] ) / 1e18 ).toLocaleString();
	$("42161-0-gr1").innerHTML = ( Number( _gr[4][1] ) / 1e06 ).toLocaleString();

	$("42161-1-gr0").innerHTML = ( Number( _gr[5][0] ) / 1e18 ).toLocaleString();
	$("42161-1-gr1").innerHTML = ( Number( _gr[5][1] ) / 1e06 ).toLocaleString();

	$("8453-0-gr0").innerHTML = ( Number( _gr[6][0] ) / 1e18 ).toLocaleString();
	$("8453-0-gr1").innerHTML = ( Number( _gr[6][1] ) / 1e06 ).toLocaleString();

	$("8453-1-gr0").innerHTML = ( Number( _gr[7][0] ) / 1e18 ).toLocaleString();
	$("8453-1-gr1").innerHTML = ( Number( _gr[7][1] ) / 1e06 ).toLocaleString();

	$("8453-2-gr0").innerHTML = ( Number( _gr[8][0] ) / 1e06 ).toLocaleString();
	$("8453-2-gr1").innerHTML = ( Number( _gr[8][1] ) / 1e06 ).toLocaleString();


	_cgd = await (await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=fantom%2Cethereum&order=id_asc&per_page=100&page=1&sparkline=false&price_change_percentage=30d&locale=en")).json();

	$("250-0-tvl").innerHTML = "$" + Number( ( Number( _gr[0][0] ) / 1e06 + Number( _gr[0][1] ) / 1e06 ).toFixed() ).toLocaleString();
	$("250-1-tvl").innerHTML = "$" + Number( ( Number( _gr[1][0] ) / 1e18 * _cgd[1].current_price + Number( _gr[1][1] ) / 1e06 ).toFixed() ).toLocaleString();
	$("250-2-tvl").innerHTML = "$" + Number( ( Number( _gr[2][0] ) / 1e06 + Number( _gr[2][1] ) / 1e06 ).toFixed() ).toLocaleString();
	$("250-3-tvl").innerHTML = "$" + Number( ( Number( _gr[3][0] ) / 1e18 * _cgd[1].current_price + Number( _gr[3][1] ) / 1e06 ).toFixed() ).toLocaleString();

	$("42161-0-tvl").innerHTML = "$" + Number( ( Number( _gr[4][0] ) / 1e18 * _cgd[0].current_price + Number( _gr[4][1] ) / 1e06 ).toFixed() ).toLocaleString();
	$("42161-1-tvl").innerHTML = "$" + Number( ( Number( _gr[5][0] ) / 1e18 * _cgd[0].current_price + Number( _gr[5][1] ) / 1e06 ).toFixed() ).toLocaleString();

	$("8453-0-tvl").innerHTML = "$" + Number( ( Number( _gr[6][0] ) / 1e18 * _cgd[0].current_price + Number( _gr[6][1] ) / 1e06 ).toFixed() ).toLocaleString();
	$("8453-1-tvl").innerHTML = "$" + Number( ( Number( _gr[7][0] ) / 1e18 * _cgd[0].current_price + Number( _gr[7][1] ) / 1e06 ).toFixed() ).toLocaleString();
	$("8453-2-tvl").innerHTML = "$" + Number( ( Number( _gr[8][0] ) / 1e06 * 1                     + Number( _gr[8][1] ) / 1e06 ).toFixed() ).toLocaleString();


*/


	_gr = await Promise.all([
		FTM_WFTM.balanceOf(POOLS[250][0].a),
		FTM_LZUSDC.balanceOf(POOLS[250][0].a),
		ARB_WETH.balanceOf(POOLS[42161][0].a),
		ARB_USDCE.balanceOf(POOLS[42161][0].a),
		BASE_WETH.balanceOf(POOLS[8453][0].a),
		BASE_USDBC.balanceOf(POOLS[8453][0].a),
		FTM_AXLUSDC.balanceOf(POOLS[250][1].a),
		FTM_WFTM.balanceOf(POOLS[250][1].a),
	]);


	$("250-0-gr0").innerHTML = ( Number( _gr[0] ) / 1e18 ).toLocaleString();
	$("250-0-gr1").innerHTML = ( Number( _gr[1] ) / 1e06 ).toLocaleString();


	$("42161-0-gr0").innerHTML = ( Number( _gr[2] ) / 1e18 ).toLocaleString();
	$("42161-0-gr1").innerHTML = ( Number( _gr[3] ) / 1e06 ).toLocaleString();

	$("8453-0-gr0").innerHTML = ( Number( _gr[4] ) / 1e18 ).toLocaleString();
	$("8453-0-gr1").innerHTML = ( Number( _gr[5] ) / 1e06 ).toLocaleString();

	$("250-1-gr0").innerHTML = ( Number( _gr[6] ) / 1e06 ).toLocaleString();
	$("250-1-gr1").innerHTML = ( Number( _gr[7] ) / 1e18 ).toLocaleString();


	_cgd = await (await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum%2Cfantom&order=id_asc&per_page=100&page=1&sparkline=false&price_change_percentage=30d&locale=en")).json();


	$("250-0-tvl").innerHTML   = "$" + Number( ( Number( _gr[0] ) / 1e18 * _cgd[1].current_price + Number( _gr[1] ) / 1e06 ).toFixed() ).toLocaleString();
	$("42161-0-tvl").innerHTML = "$" + Number( ( Number( _gr[2] ) / 1e18 * _cgd[0].current_price + Number( _gr[3] ) / 1e06 ).toFixed() ).toLocaleString();
	$("8453-0-tvl").innerHTML  = "$" + Number( ( Number( _gr[4] ) / 1e18 * _cgd[0].current_price + Number( _gr[5] ) / 1e06 ).toFixed() ).toLocaleString();
	$("250-1-tvl").innerHTML   = "$" + Number( ( Number( _gr[6] ) / 1e06 + _cgd[1].current_price * Number( _gr[7] ) / 1e18 ).toFixed() ).toLocaleString();


	sortit(3,"allpools","allpools-row","allpools-item");
	sortit(3,"allpools","allpools-row","allpools-item");

	console.log("pre-stat'd");
	return;
}









