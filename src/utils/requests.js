export function deleteHTTP(url) {
    fetch(url, {method: 'DELETE'}).then((r) => r.json());
}
export function postHTTP(url, argBody) {
    fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(argBody),
    }).then((r) => r.json());
}
export function patchHTTP(url, argBody) {
    fetch(url, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(argBody),
    }).then((r) => r.json());
}
export function getHTTPData(url) {
    const promise = fetch(url).then((r) => r.json());
    return promise;
}
