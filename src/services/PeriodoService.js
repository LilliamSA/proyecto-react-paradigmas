import http from '../http-common';

class PeriodoService {
    getAll() {
        return http.get('/periodo');
    }

    get(id) {
        return http.get(`/periodo/${id}`);
    }

    create(data) {
        return http.post('/periodo', data);
    }
    edit(id) {
        return http.get(`/periodo/${id}`);
    }

    update(id, data) {
        return http.put(`/periodo/${id}`, data);
    }

    delete(id) {
        return http.delete(`/periodo/${id}`);
    }

    deleteAll() {
        return http.delete(`/periodo`);
    }

    findByTitle(title) {
        return http.get(`/periodo?title=${title}`);
    }

    findById(id) {
        return http.get(`/periodo/${id}`);
    }

    deletePeriodo = (id) => {
        return http.delete(`/periodo/verificar/${id}`);
    }
}


export default new PeriodoService();