import http from '../http-common';

class PersonaService {
  getAll() {
    return http.get('/persona');
  }

  get(id) {
    return http.get(`/persona/${id}`);
  }

  create(data) {
    return http.post('/persona', data);
  }

  update(id, data) {
    return http.put(`/persona/${id}`, data);
  }

  delete(id) {
    return http.delete(`/persona/${id}`);
  }

  deleteAll() {
    return http.delete(`/persona`);
  }

  findByTitle(title) {
    return http.get(`/persona?title=${title}`);
  }
}

export default new PersonaService();