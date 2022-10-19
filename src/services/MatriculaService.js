import http from '../http-common';

class MatriculaService {
    getAll() {
        return http.get('/matricula');
    }
    
    get(id) {
        return http.get(`/matricula/${id}`);
    }
    
    create(data) {
        return http.post('/matricula', data);
    }
    edit(id) {
        return http.get(`/matricula/${id}`);
    }
    
    update(id, data) {
        return http.put(`/matricula/${id}`, data);
    }
    
    delete(id) {
        return http.delete(`/matricula/${id}`);
    }
    
    deleteAll() {
        return http.delete(`/matricula`);
    }
    
    findByTitle(title) {
        return http.get(`/matricula?title=${title}`);
    }
}

export default new MatriculaService();
