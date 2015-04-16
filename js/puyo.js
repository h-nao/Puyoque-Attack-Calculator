$(function(){
	calc();
});

$(".user-input").change(function(){
	calc();
});

function calc() {
	$("#tower-b").val(getTowerBounus($("#tower").val()));
	$("#chain-b").val(getChainBounus($("#chain").val()));
	
	var pc = $("#puyo-cnt").val();
	var co = $("#conc").val();
	var sc = $("#sep-cnt").val();
	var ls = $("#l-skill").val();
	var ss = $("#s-skill").val();
	var tb = $("#tower-b").val();
	var cb = $("#chain-b").val();
	var cm = $("#comb").val();
	$("#base-mult").val(getBaseMultiplier(pc,co,sc,cb));
	$("#last-mult").val(getLastMultiplier($("#base-mult").val(),ls,ss,tb,cm));
	
	$("#base-attack-pw").val(($("#attack-pw").val() * $("#base-mult").val()).toFixed());
	$("#last-attack-pw").val(($("#attack-pw").val() * $("#last-mult").val()).toFixed());
	$("#total-attack-pw").val($("#last-attack-pw").val() * 6);
}

function getBaseMultiplier(pc,co,sc,cb) {
	return ((1 + (pc - 4) * 0.15 * co) * sc * cb).toFixed(2);
}

function getLastMultiplier(atk,ls,ss,tb,cm) {
	return (atk * ls * ss * tb * cm).toFixed(2);
}

function getTowerBounus(towerFloor) {
	if(towerFloor >= 400) {
		var b1 = Math.floor(towerFloor / 100) * 0.1;
		var b2 = (towerFloor % 100) * 0.001;
		return (1 + 1 + b1 + b2).toFixed(2);
	}
	if(towerFloor >= 300) {
		return (1 + 1.2 + ((towerFloor % 100) * 0.002)).toFixed(2);
	}
	if(towerFloor >= 200) {
		return (1 + 0.9 + ((towerFloor % 100) * 0.003)).toFixed(2);
	}
	if(towerFloor >= 100) {
		return (1 + 0.5 + ((towerFloor % 100) * 0.004)).toFixed(2);
	}
	return (1 + ((towerFloor % 100) * 0.005)).toFixed(2);
}

function getChainBounus(chainCount) {
	if(chainCount < 5) {
		return Math.sqrt(chainCount).toFixed(2);
	}
	return (Math.sqrt(4) + (0.2 * (chainCount-4))).toFixed(2);
}
