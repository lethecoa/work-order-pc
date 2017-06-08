import config from "./config";

const storage = window.localStorage;
const prefix = config.storage_prefix;

module.exports = {
	set( key, value ) {
		try {
			value = JSON.stringify( value );
		} catch ( e ) {
			value = value;
		}

		storage.setItem( this.prefix + key, value );
	},
	get( key ) {
		var value = storage.getItem( this.prefix + key );
		if ( value !== null ) {
			try {
				value = JSON.parse( value );
			} catch ( e ) {
				value = value;
			}
		}
		return value;
	},
	remove( key ) {
		storage.removeItem( this.prefix + key );
	}
}