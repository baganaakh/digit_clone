import React from "react";

import CustomStore from 'devextreme/data/custom_store';

const token = process.env.REACT_APP_TOKEN;

function isNotEmpty(value) {
    return value !== undefined && value !== null && value !== '';
}
  
function handleErrors(response) {
if (!response.ok) {
    throw Error(response.statusText);
}
return response;
}

const backendStore = ({ entityName, pathName, entityId}) => {
    var path = pathName || 'content';
    var entryId = entityId || '';
    var url = '';

    const store = new CustomStore({
        //type: 'odata',
        key: '_id',
        load: function(loadOptions) {
            
          let params = '?';
          [
            // 'skip',
            // 'take',
            // 'requireTotalCount',
            // 'requireGroupCount',
            // 'sort',
            // 'filter',
            // 'totalSummary',
            // 'group',
            // 'groupSummary',
            'searchBy',
            'search'
          ].forEach(function(i) {
            if (i in loadOptions && isNotEmpty(loadOptions[i]))
                //{ params += `${i}=${JSON.stringify(loadOptions[i])}&`; }
                { params += `${i}=${loadOptions[i]}&`; }
          });
          params = params.slice(0, -1);

          if (isNotEmpty(loadOptions) )
            url = `${process.env.REACT_APP_BACKEND_API}/api/${entityName}${params}`;
          else if (isNotEmpty(entryId))
            url = `${process.env.REACT_APP_BACKEND_API}/api/${entityName}/${entryId}`;

            //console.debug(' URL ' + url + ' params ' + JSON.stringify(loadOptions))

          return fetch(url)
            .then(response => response.json())
            .then((data) => {
                if ('items' in data)
                    return {
                        data: data.items,
                        totalCount: data.total || 0,
                        summary: data.summary,
                        groupCount: data.groupCount
                    };
                else
                    return {
                        key: data._id,
                        data: data,
                        totalCount: data.total || 1,
                        summary: data.summary,
                        groupCount: data.groupCount
                    };
            })
            .catch(() => { throw 'Data Loading Error'; });
        },
        insert: (values) => {
          console.debug('Insert value: ' + values);
      
          return fetch(`${process.env.REACT_APP_BACKEND_API}/api/${entityName}/create`, {
                method: 'POST',
                body: JSON.stringify(values),
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(handleErrors)
            .then(response => response.json())
            .then(data => {
                return data
            })
            //.then(handleErrors)
            .catch((e) => { throw 'Error: '+ e });
        },
        remove: (key) => {
            return fetch(`${process.env.REACT_APP_BACKEND_API}/api/${entityName}/${encodeURIComponent(key)}/delete`, {
                method: 'DELETE',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(handleErrors)
            .then(response => response.json())
            .then(data => {
                return data
            })
            .catch((e) => { throw 'Error: ' + e });
        },
        update: (key, values) => {
            console.debug('backStore update : key ' + key + ' values ' + JSON.stringify(values));
            var postData = values;
            return fetch(`${process.env.REACT_APP_BACKEND_API}/api/${entityName}/${encodeURIComponent(key)}/patch`, {
                method: 'PATCH',
                body: JSON.stringify(postData),
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(handleErrors)
            .then(response => response.json())
            .then(data => {
                return data
            })
            .catch((e) => { throw 'Error: '+ e });
        },
        attach: (key, values) => {
            console.debug('backendStore attach : key ' + key + ' values ' + JSON.stringify(values));
            var postData = values;
            return fetch(`${process.env.REACT_APP_BACKEND_API}/api/${entityName}/${encodeURIComponent(key)}/attach`, {
                method: 'PATCH',
                body: JSON.stringify(postData),
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(handleErrors)
            .then(response => response.json())
            .then(data => {
                return data
            })
            .catch((e) => { throw 'Error: '+ e });
        },
        byKey: (key, values) => {
                console.debug('byKey: ' + key + ' lookup data ' + JSON.stringify(values));
                return fetch(`${process.env.REACT_APP_BACKEND_API}/api/${entityName}/${encodeURIComponent(key)}`, {
                //return fetch(`${process.env.REACT_APP_BACKEND_API}/api/${entityName}`, {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(handleErrors)
            .then(response => response.json())
            .then((data) => {
                //console.debug(' returned items { data: ' + JSON.stringify(data) + ' }');
                return { data: data, status: { succeeded: true } };

                /*if ('items' in data) {
                    console.debug(' returned items ' + JSON.stringify(data.items));
                    return {
                        data: data.items,
                    };
                }
                else {
                    console.debug(' returned  ' + JSON.stringify(data));
                    return {
                        data: data,
                    };
                }*/
            })
            .catch(() => { throw 'Data Loading Error'; });
        }
      });
    
    return store;
}

export default backendStore;