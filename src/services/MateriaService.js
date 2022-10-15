import http from '../http-common';

class MateriaService {
    getAll() {
        return http.get('/materia');
    }
    
    get(id) {
        return http.get(`/materia/${id}`);
    }
    
    create(data) {
        return http.post('/materia', data);
    }
    edit(id) {
        return http.get(`/materia/${id}`);
    }
    
    update(id, data) {
        return http.put(`/materia/${id}`, data);
    }
    
    delete(id) {
        return http.delete(`/materia/${id}`);
    }
    
    deleteAll() {
        return http.delete(`/materia`);
    }
    
    findByTitle(title) {
        return http.get(`/materia?title=${title}`);
    }
    }

export default new MateriaService();