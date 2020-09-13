
import { stringify } from 'query-string';
import { fetchUtils } from 'ra-core';
export default (apiUrl, httpClient = fetchUtils.fetchJson) => {
    return ({
        getList: (resource, params) => {
            const { page, perPage, field, order } = params
            console.log(params)
            if (field) {
                params.filter.$sort = (order === 'DESC' ? '-' : '') + field
            }
            if (params.filter.q != null) {
                params.filter.$term = params.filter.q
                delete params.filter.q
            }
            const query = Object.assign(
                fetchUtils.flattenObject(params.filter),
                { $limit: perPage, $page: page },
                field ? { $sort: (order === 'DESC' ? '-' : '') + (field === 'id' ? '_id' : field) } : {} // optional field sort
            )
            const url = `${apiUrl}/${resource}?${stringify(query)}`;
            

            return httpClient(url).then(({ headers, json }) => {
                return {
                    data: json.docs.map(d => (d.id = d._id) && delete d._id && d),
                    total: json.items.total,
                };
            });
        },

        getOne: (resource, params) => httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
            data: json,
        })),

        getMany: (resource, params) => {
            const query = {
                id: params.ids,
            };
            const url = `${apiUrl}/${resource}?${stringify(query)}`;
            return httpClient(url).then(({ json }) => ({ data: json }));
        },

        getManyReference: (resource, params) => {
            const { page, perPage } = params.pagination;
            const { field, order } = params.sort;
            const query = {
                ...fetchUtils.flattenObject(params.filter),
                [params.target]: params.id,
                _sort: field,
                _order: order,
                _start: (page - 1) * perPage,
                _end: page * perPage,
            };
            const url = `${apiUrl}/${resource}?${stringify(query)}`;

            return httpClient(url).then(({ headers, json }) => {
                if (!headers.has('x-total-count')) {
                    throw new Error(
                        'The X-Total-Count header is missing in the HTTP Response. The jsonServer Data Provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare X-Total-Count in the Access-Control-Expose-Headers header?'
                    );
                }
                return {
                    data: json,
                    total: parseInt(
                        headers.get('x-total-count').split('/').pop(),
                        10
                    ),
                };
            });
        },

        update: (resource, params) => httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json })),

        // json-server doesn't handle filters on UPDATE route, so we fallback to calling UPDATE n times instead
        updateMany: (resource, params) => Promise.all(
            params.ids.map(id => httpClient(`${apiUrl}/${resource}/${id}`, {
                method: 'PUT',
                body: JSON.stringify(params.data),
            })
            )
        ).then(responses => ({ data: responses.map(({ json }) => json.id) })),

        create: (resource, params) => httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: { ...params.data, id: json.id },
        })),

        delete: (resource, params) => httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
        }).then(({ json }) => ({ data: json })),

        // json-server doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
        deleteMany: (resource, params) => Promise.all(
            params.ids.map(id => httpClient(`${apiUrl}/${resource}/${id}`, {
                method: 'DELETE',
            })
            )
        ).then(responses => ({ data: responses.map(({ json }) => json.id) })),
    });
};