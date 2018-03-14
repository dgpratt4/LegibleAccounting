import { JSONAPIRequest } from './util/Request.js';
import Auth from './Auth.js';

class AccountsAPI {
    getAll(active) {
		if (!Auth.token) {
            return Promise.reject();
        }

        // determine if searching active accounts
        var requestURL = '/api/accounts/';
        if (active === true || active === false) {
            requestURL += '?is_active=' + (active ? 'true' : 'false');
        }

        return fetch(new JSONAPIRequest(requestURL, Auth.token), {
            method: 'GET'
        })
            .then(response => response.ok ? Promise.resolve(response) : Promise.reject(response))
            .then(response => response.json())
            .then((response) => {
                return Promise.resolve(response);
            })
            .catch((response) => {
                // Consider how to handle this?
                return Promise.reject(response);
            });
    }

    getOne(id) {
        if (!Auth.token) {
            return Promise.reject();
        }

        return fetch(new JSONAPIRequest(`/api/accounts/${id}/`, Auth.token), {
            method: 'GET'
        })
            .then(response => response.ok ? Promise.resolve(response) : Promise.reject(response))
            .then(response => response.json())
            .then((response) => {
                return Promise.resolve(response);
            })
            .catch((response) => {
                // Consider how to handle this?
                return Promise.reject(response);
            });
    }

    search(active, searchString, fieldNames, isAscending) {
    	if (!Auth.token) {
            return Promise.reject();
        }

        var requestURL = '/api/accounts/';
        let parts = [];

		// determine if searching active accounts
        if (active) {
            parts.push('is_active=true');
        }

        // determine if doing a text based search
        if (searchString) {
            parts.push('search=' + searchString);
        }

        // determine if there are any sorting requirements
        if (Array.isArray(fieldNames)) {
            if (isAscending) {
                fieldNames = fieldNames.map(fieldName => '-' + fieldName);
            }

            parts.push('ordering=' + fieldNames.join(','));
        }

        // actually search
        requestURL += '?' + parts.join('&');
        return fetch(new JSONAPIRequest(requestURL, Auth.token), {
            method: 'GET'
        })
            .then(response => response.ok ? Promise.resolve(response) : Promise.reject(response))
            .then(response => response.json())
            .then((response) => {
                return Promise.resolve(response);
            })
            .catch((response) => {
                // Consider how to handle this?
                return Promise.reject(response);
            });
    }

    create(data) {
        if (!Auth.token) {
            return Promise.reject();
        }

        return fetch(new JSONAPIRequest('/api/accounts/', Auth.token), {
            method: 'POST',
            body: JSON.stringify(data)
        })
          .then(response => response.ok ? Promise.resolve(response) : Promise.reject(response))
          .then(response => response = response.json())
          .then((response) => {
            return Promise.resolve(response);
          })
          .catch((response) => {
            return Promise.reject(response);
          });
    }

    update(data) {
        if (!Auth.token) {
            return Promise.reject();
        }

        return fetch(new JSONAPIRequest(`/api/accounts/${data.id}/`, Auth.token), {
            method: 'PUT',
            body: JSON.stringify(data)
        })
          .then(response => response.ok ? Promise.resolve(response) : Promise.reject(response))
          .then(response => response = response.json())
          .then((response) => {
            return Promise.resolve(response);
          })
          .catch((response) => {
            return Promise.reject(response);
          });
    }
}

export default new AccountsAPI();
