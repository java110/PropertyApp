import {hasSession} from '../api/Java110SessionApi.js'

export function onLoad(options){
	
	hasSession();
}